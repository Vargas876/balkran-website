import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido y debe ser una cadena válida.' },
        { status: 400 }
      );
    }

    // ponytail: Stub inicial para integración del Agente de IA en Fase 2.
    return NextResponse.json({
      status: 'success',
      agent: 'Balkran AI Assistant (Stub Fase 1)',
      reply: `Hola. Recibí tu consulta sobre Balkran: "${message}". Este endpoint está preparado para conectarse con la base de conocimiento y Supabase en la Fase 2.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error procesando la solicitud del agente.' },
      { status: 500 }
    );
  }
}
