import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'node:fs';
import Groq from 'groq-sdk';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

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

const CATEGORIA_LABELS: Record<string, string> = {
  ENERGIZADORES: 'Energizador para cerca eléctrica',
  KITS_SOLARES: 'Kit solar de energización',
  ACCESORIOS: 'Accesorio para cerca eléctrica',
};

export async function POST(request: Request) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    if (!(['SUPER_ADMIN', 'ADMIN', 'EDITOR'] as string[]).includes(role ?? '')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'La IA no está configurada en el servidor.' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as Record<string, string>;
    const nombre = String(body.nombre || '').trim().slice(0, 120);
    const categoria = String(body.categoria || 'ENERGIZADORES');
    const linea = String(body.linea || '').trim().slice(0, 120);
    const subtitulo = String(body.subtitulo || '').trim().slice(0, 200);
    const alcance = String(body.alcance || '').trim().slice(0, 60);
    const alimentacion = String(body.alimentacion || '').trim().slice(0, 120);
    const ideal_para = String(body.ideal_para || '').trim().slice(0, 200);

    if (!nombre) {
      return NextResponse.json({ error: 'Ingresa al menos el nombre del producto.' }, { status: 400 });
    }

    const tipo = CATEGORIA_LABELS[categoria] ?? 'Producto para cerca eléctrica';

    const groq = new Groq({ apiKey: GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 350,
      messages: [
        {
          role: 'system',
          content:
            'Eres un redactor profesional de e-commerce para BAALKRAN (BALKRAN INC S.A.S. BIC), empresa colombiana de energizadores y cercas eléctricas para el sector agropecuario. Redacta UNA descripción de producto comercial, persuasiva y profesional, de 3 a 5 oraciones, en español de Colombia. Usa únicamente texto, sin emojis. Puedes mencionar brevemente el alcance, el tipo de alimentación y para qué animales/usos es ideal si esos datos se proporcionan. No inventes datos que no se den. NO uses encabezados ni listas: entrega solo un párrafo de texto plano.',
        },
        {
          role: 'user',
          content: `Producto: ${nombre}${linea ? ` (línea: ${linea})` : ''}. Tipo: ${tipo}.${subtitulo ? ` Propuesta de subtítulo: ${subtitulo}.` : ''}${alcance ? ` Alcance: ${alcance}.` : ''}${alimentacion ? ` Alimentación: ${alimentacion}.` : ''}${ideal_para ? ` Ideal para: ${ideal_para}.` : ''}. Genera la descripción comercial.`,
        },
      ],
    });

    const descripcion =
      completion.choices?.[0]?.message?.content?.trim() ||
      'Descripción generada automáticamente por la IA de Balkran.';

    return NextResponse.json({ descripcion });
  } catch (error) {
    const errText = error instanceof Error ? error.message : String(error);
    console.error('Error generando descripción con IA:', errText);
    if (/429|quota|rate|limit/i.test(errText)) {
      return NextResponse.json(
        { error: 'Límite de uso de la IA alcanzado. Intenta en unos minutos.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: 'Error generando la descripción. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}