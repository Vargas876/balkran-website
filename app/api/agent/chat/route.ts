import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'node:fs';
import Groq from 'groq-sdk';
import { prisma } from '@/lib/prisma';
import { buildKnowledge, getProductByName } from '@/lib/knowledge';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const GROQ_API_KEY = loadEnvValue('GROQ_API_KEY');
const GROQ_MODEL = loadEnvValue('GROQ_MODEL') ?? 'llama-3.3-70b-versatile';

interface ChatBody {
  message: string;
  sessionId?: string;
  lang?: string;
}

interface HistoryMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const lang = (body.lang || 'es') === 'en' ? 'en' : (body.lang || 'es') === 'fr' ? 'fr' : 'es';

    if (!message) {
      return NextResponse.json({ error: 'Mensaje requerido.' }, { status: 400 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY no configurada en el servidor. Agrega la variable en Vercel.' },
        { status: 500 }
      );
    }

    const sessionId = (body.sessionId || 'anon').slice(0, 100);

    const knowledge = await buildKnowledge();
    const productMatch = await getProductByName(message);

    const recent = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 10,
      select: { role: true, content: true },
    });

    const history: HistoryMsg[] = recent.map((m) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: m.content,
    }));

    const systemPrompt = `
Eres VOLT, el asistente virtual oficial de Balkran (BALKRAN INC S.A.S. BIC), una empresa colombiana de cercas eléctricas y energizadores para el sector agropecuario.
RESPONDE SIEMPRE EN EL IDIOMA DEL CLIENTE. El idioma actual del cliente es: ${lang === 'en' ? 'INGLÉS (English)' : lang === 'fr' ? 'FRANCÉS (Français)' : 'ESPAÑOL'}. Si no estás seguro, usa ese idioma indicado.
Tu tono es amigable, cercano y profesional. Sé conciso pero completo, con un uso moderado de emojis relacionados con el tema (⚡🌾🐄). Evita emojis genéricos.
Los nombres de productos y términos técnicos (energizador, impulsador, cerca eléctrica) puedes traducirlos: energizer, electric fence, etc.

INFORMACIÓN DE LA EMPRESA:
${knowledge.company}

PREGUNTAS FRECUENTES:
${knowledge.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n')}

CATÁLOGO DE PRODUCTOS:
${knowledge.products
  .map((p) => `- ${p.nombre} (${p.categoria}, ${p.linea}) | Alcance: ${p.alcance || 'n/d'} | Precio: ${p.precio} | /productos/${p.slug}`)
  .join('\n')}

Si el cliente pregunta por un producto y coincide con algo del catálogo, respóndele con su información y sugiérele el enlace. Si pregunta por precio, da el de la lista o indica "consultar". Si no estás seguro o la pregunta requiere un humano (precios exactos, compra, cotización), sugiere contactar por WhatsApp +57 311 450 8064 o los correos oficiales.
`;

    const messages: any[] = [{ role: 'system', content: systemPrompt }];

    if (productMatch) {
      messages.push({
        role: 'system',
        content: `[CONTEXTO ADICIONAL] El cliente probablemente pregunta por el producto "${productMatch.nombre}" (alcance ${productMatch.alcance || 'n/d'}, precio ${productMatch.precio}). Úsalo si es relevante.`,
      });
    }

    if (history.length > 0) {
      messages.push(...history);
    }

    messages.push({ role: 'user', content: message });

    const groq = new Groq({ apiKey: GROQ_API_KEY });

    let reply = '';
    try {
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 700,
      });
      reply = completion.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';
    } catch (e) {
      const errText = e instanceof Error ? e.message : String(e);
      if (/429|quota|rate|limit/i.test(errText)) {
        return NextResponse.json(
          { error: 'Límite de uso de la IA alcanzado. Intenta en unos minutos.', usedQuota: true },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: 'Error consultando la IA.', detail: errText },
        { status: 500 }
      );
    }

    await prisma.chatMessage.create({ data: { sessionId, role: 'user', content: message } });
    await prisma.chatMessage.create({ data: { sessionId, role: 'assistant', content: reply } });

    return NextResponse.json({
      status: 'success',
      agent: 'Volt',
      reply,
    });
  } catch (error) {
    console.error('Error en /api/agent/chat:', error);
    return NextResponse.json({ error: 'Error procesando la solicitud.' }, { status: 500 });
  }
}