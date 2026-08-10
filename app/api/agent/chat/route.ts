import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'node:fs';
import Groq from 'groq-sdk';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { buildKnowledge, getProductByName } from '@/lib/knowledge';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { sanitizeReply } from '@/lib/sanitize';
import { verifyTurnstileToken } from '@/lib/turnstile';

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

const MAX_MESSAGE_LENGTH = 500;
const MAX_SESSION_ID_LENGTH = 64;
const MAX_HISTORY = 10;

const ERROR_TXT: Record<'es' | 'en' | 'fr', Record<string, string>> = {
  es: {
    rateLimit: 'Demasiadas consultas. Espera un momento antes de volver a preguntar.',
    messageRequired: 'Mensaje requerido.',
    notConfigured: 'El asistente no está configurado en el servidor.',
    turnstileFailed: 'Verificación de seguridad fallida. Recarga la página e intenta de nuevo.',
    fallbackReply: 'Lo siento, no pude generar una respuesta.',
    aiLimit: 'Límite de uso de la IA alcanzado. Intenta en unos minutos.',
    aiError: 'Error consultando la IA. Intenta de nuevo en unos minutos.',
    genericError: 'Error procesando la solicitud.',
  },
  en: {
    rateLimit: 'Too many requests. Wait a moment before asking again.',
    messageRequired: 'Message required.',
    notConfigured: 'The assistant is not configured on the server.',
    turnstileFailed: 'Security verification failed. Reload the page and try again.',
    fallbackReply: 'Sorry, I could not generate a response.',
    aiLimit: 'AI usage limit reached. Try again in a few minutes.',
    aiError: 'Error querying the AI. Try again in a few minutes.',
    genericError: 'Error processing the request.',
  },
  fr: {
    rateLimit: 'Trop de requêtes. Attendez un instant avant de redemander.',
    messageRequired: 'Message requis.',
    notConfigured: "L'assistant n'est pas configuré sur le serveur.",
    turnstileFailed: 'Échec de la vérification de sécurité. Rechargez la page et réessayez.',
    fallbackReply: "Désolé, je n'ai pas pu générer de réponse.",
    aiLimit: "Limite d'utilisation de l'IA atteinte. Réessayez dans quelques minutes.",
    aiError: "Erreur lors de l'interrogation de l'IA. Réessayez dans quelques minutes.",
    genericError: 'Erreur lors du traitement de la demande.',
  },
};

function pickLang(v: unknown): 'es' | 'en' | 'fr' {
  return v === 'en' ? 'en' : v === 'fr' ? 'fr' : 'es';
}

interface ChatBody {
  message: string;
  sessionId?: string;
  lang?: string;
  turnstileToken?: string;
}

interface HistoryMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    let body: ChatBody = { message: '' };
    let lang: 'es' | 'en' | 'fr' = 'es';
    try {
      body = await request.json();
      lang = pickLang(body.lang);
    } catch {
      // body inválido: se usa lang 'es' y se reporta como mensaje requerido.
    }
    const err = (key: string) => ERROR_TXT[lang][key] || ERROR_TXT.es[key];

    const limit = await checkRateLimit(ip, 'volt-chat', {
      windowSeconds: 60,
      max: 10,
    });
    if (!limit.ok) {
      return NextResponse.json(
        { error: err('rateLimit') },
        { status: 429 }
      );
    }

    const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : '';

    if (!message) {
      return NextResponse.json({ error: err('messageRequired') }, { status: 400 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: err('notConfigured') },
        { status: 500 }
      );
    }

    const sessionId = String(body.sessionId || 'anon').slice(0, MAX_SESSION_ID_LENGTH);

    const session = await auth();
    const includePrices = !!session?.user;
    const knowledge = await buildKnowledge(includePrices);
    const productMatch = await getProductByName(message, includePrices);

    // Solo exige Turnstile en el PRIMER mensaje de la sesión (evita fricción
    // en conversaciones largas, pero bloquea bots que comienzan a chatear).
    const firstMessage = (await prisma.chatMessage.count({ where: { sessionId } })) === 0;
    if (firstMessage) {
      const turnstileOk = await verifyTurnstileToken(body?.turnstileToken ?? null, ip, request.headers.get('host'));
      if (!turnstileOk) {
        return NextResponse.json(
          { error: err('turnstileFailed') },
          { status: 400 }
        );
      }
    }

    const recent = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: MAX_HISTORY,
      select: { role: true, content: true },
    });

    const history: HistoryMsg[] = recent.map((m) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: m.content,
    }));

    const systemPrompt = `
Eres VOLT, el asistente virtual oficial de Balkran (BALKRAN INC S.A.S. BIC), una empresa colombiana de cercas eléctricas y energizadores para el sector agropecuario.
RESPONDE SIEMPRE EN EL IDIOMA DEL CLIENTE. El idioma actual del cliente es: ${lang === 'en' ? 'INGLÉS (English)' : lang === 'fr' ? 'FRANCÉS (Français)' : 'ESPAÑOL'}. Si no estás seguro, usa ese idioma indicado.
Tu tono es amigable, cercano y profesional. Sé conciso pero completo. NO uses emojis en tus respuestas: usa únicamente texto.
Los nombres de productos y términos técnicos (energizador, impulsador, cerca eléctrica) puedes traducirlos: energizer, electric fence, etc.

INFORMACIÓN DE LA EMPRESA:
${knowledge.company}

PREGUNTAS FRECUENTES:
${knowledge.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n')}

CATÁLOGO DE PRODUCTOS:
${productMatch
  ? `- ${productMatch.nombre} (${knowledge.products.find((p) => p.slug === productMatch.slug)?.categoria || ''}, ${knowledge.products.find((p) => p.slug === productMatch.slug)?.linea || ''}) | Alcance: ${productMatch.alcance || 'n/d'} | Precio: ${productMatch.precio} | /productos/${productMatch.slug}`
  : knowledge.products
      .map((p) => `- ${p.nombre} (${p.categoria}, ${p.linea}) | Alcance: ${p.alcance || 'n/d'} | Precio: ${p.precio} | /productos/${p.slug}`)
      .join('\n')}

Si el cliente pregunta por un producto y coincide con algo del catálogo, respóndele con su información y sugiérele el enlace. Si pregunta por precio, da el de la lista o indica "consultar". Si no estás seguro o la pregunta requiere un humano (precios exactos, compra, cotización), sugiere contactar por WhatsApp +57 311 450 8064 o los correos oficiales.
${includePrices ? '' : 'IMPORTANTE: El cliente NO está registrado, por lo que NO debes revelar precios bajo ninguna circunstancia. Si te pregunta por el precio de un producto, respóndele que los precios están disponibles para clientes registrados, e invítalo a crear una cuenta en /registro o a contactar por WhatsApp +57 311 450 8064 para una cotización.'}

PÁGINAS DE LA WEB (usa SIEMPRE el enlace correspondiente cuando el tema de la pregunta coincida):
- PQRS (peticiones, quejas y reclamos): /pqrs
- Catálogo de productos: /productos
- Términos y condiciones de la tienda: /terminos-y-condiciones-tienda
- Garantías y devoluciones: /garantias-y-devoluciones
- Protección de datos personales (Habeas Data): /politica-datos-personales
- Preguntas frecuentes: /preguntas-frecuentes
- Manuales de usuario: /manuales
- Certificaciones: /certificaciones
- Eventos: /eventos
- Nosotros: /nosotros
- Contacto: /contacto

REGLAS OBLIGATORIAS SOBRE INFORMACIÓN (MUY IMPORTANTE):
1. Responde ÚNICAMENTE con información que esté disponible en: (a) la INFORMACIÓN DE LA EMPRESA, (b) las PREGUNTAS FRECUENTES, o (c) el CATÁLOGO DE PRODUCTOS incluidos arriba. No uses conocimiento externo ni datos de memoria.
2. Si la pregunta del cliente NO está cubierta por esa información (por ejemplo: disponibilidad de stock, precios exactos fuera de lista, financiación, contratos, garantías específicas, envíos internacionales detallados, o cualquier dato que no aparezca arriba): NO INVENTES. NO adivines. NO construyas una respuesta con supuestos.
3. En ese caso responde de forma clara y honesta que no cuentas con información oficial suficiente sobre ese tema, y ofrece llevar al cliente al canal de atención correspondiente: WhatsApp +57 311 450 8064, correos info@cercasbalkran.com / ventas@cercasbalkran.com / soporte@cercasbalkran.com, o la página /contacto.
4. Incluye SIEMPRE en tu respuesta el enlace de la página correspondiente al tema que pregunta el cliente (PQRS, productos, términos y condiciones, garantías, protección de datos, preguntas frecuentes, manuales, certificaciones, eventos, nosotros o contacto). Por ejemplo: si piden radicar una PQR indica el enlace /pqrs; si preguntan por garantías indica /garantias-y-devoluciones; si preguntan por términos indica /terminos-y-condiciones-tienda; si preguntan por protección de datos indica /politica-datos-personales; si preguntan por productos indica /productos.
Nunca inventes datos técnicos, precios, plazos, garantías, certificaciones, números de contacto ni direcciones. Responde solo con información del catálogo o de las preguntas frecuentes proporcionadas.
`;

    const messages: any[] = [{ role: 'system', content: systemPrompt }];

    if (productMatch) {
      messages.push({
        role: 'system',
        content: `[CONTEXTO ADICIONAL] El cliente probablemente pregunta por el producto "${productMatch.nombre}" (alcance ${productMatch.alcance || 'n/d'}, precio ${productMatch.precio}). Úsalo si es relevante y respóndele con su información.`,
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
        temperature: 0.3,
        max_tokens: 700,
      });
      reply = completion.choices?.[0]?.message?.content || err('fallbackReply');
    } catch (e) {
      const errText = e instanceof Error ? e.message : String(e);
      console.error('Error consultando Groq:', errText);
      if (/429|quota|rate|limit/i.test(errText)) {
        return NextResponse.json(
          { error: err('aiLimit') },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: err('aiError') },
        { status: 500 }
      );
    }

    await prisma.chatMessage.create({ data: { sessionId, role: 'user', content: message } });
    await prisma.chatMessage.create({ data: { sessionId, role: 'assistant', content: reply } });

    return NextResponse.json({
      status: 'success',
      agent: 'Volt',
      reply: sanitizeReply(reply),
    });
  } catch (error) {
    console.error('Error en /api/agent/chat:', error);
    return NextResponse.json({ error: ERROR_TXT.es.genericError }, { status: 500 });
  }
}
