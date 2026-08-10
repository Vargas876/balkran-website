import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { sendInquiryNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

const consultaSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().trim().max(40).optional().nullable(),
  tipo: z.string().trim().min(1).max(40),
  message: z.string().trim().min(5).max(5000),
  aceptaDatos: z.literal(true),
  turnstileToken: z.string().max(2048).optional().nullable(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit(ip, 'consulta-pqrs', {
    windowSeconds: 60,
    max: 5,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = consultaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Algunos campos son inválidos.' }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken, ip, request.headers.get('host'));
  if (!turnstileOk) {
    return NextResponse.json(
      { error: 'Verificación de seguridad fallida. Recarga e intenta de nuevo.' },
      { status: 400 }
    );
  }

  const { name, email, phone, tipo, message } = parsed.data;

  const inquiry = await prisma.inquiry.create({
    data: {
      name,
      email,
      phone: phone || null,
      message,
      tipo,
    },
  });

  // Notifica por correo a Balkran (no bloquea la respuesta si el envío falla).
  sendInquiryNotification({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    tipo: inquiry.tipo,
    message: inquiry.message,
  }).catch((err) => {
    console.error('Error en notificación PQR (no bloqueante):', err);
  });

  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}
