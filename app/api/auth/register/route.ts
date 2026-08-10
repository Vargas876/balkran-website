import { NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Nombre requerido').max(120),
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
  turnstileToken: z.string().min(1).max(2048).optional().nullable(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit(ip, 'register', {
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
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Datos inválidos.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken, ip, request.headers.get('host'));
  if (!turnstileOk) {
    return NextResponse.json(
      { error: 'Verificación de seguridad fallida. Recarga e intenta de nuevo.' },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json(
      { error: 'Ya existe una cuenta con este correo electrónico.' },
      { status: 409 }
    );
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash,
      role: 'CUSTOMER',
      isActive: false,
    },
  });

  return NextResponse.json(
    {
      message:
        'Tu cuenta fue creada. Un administrador debe aprobarla antes de que puedas iniciar sesión.',
    },
    { status: 201 }
  );
}
