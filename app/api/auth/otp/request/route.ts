import { NextResponse } from 'next/server';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import {
  generateOtp,
  OTP_EXPIRATION_MS,
} from '@/lib/otp';
import { sendOtpEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(6).max(128),
  turnstileToken: z.string().max(2048).optional().nullable(),
});

// Hash dummy para igualar el tiempo de bcrypt cuando el usuario no existe.
const DUMMY_HASH =
  '$2b$12$AhpQ/1JJrnbyj2MnbogqR.vk9umMIGHVN4LE9c1HqssjtivD8sSR2';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

async function isLockedOut(email: string): Promise<boolean> {
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MS);
  const count = await prisma.loginAttempt.count({
    where: { email, success: false, createdAt: { gte: since } },
  });
  return count >= MAX_FAILED_ATTEMPTS;
}

/**
 * Paso 1 de 2 del login con 2FA: valida credenciales + Turnstile.
 * Si son correctas, genera un código OTP, lo guarda (hash) y lo envía
 * por correo. Devuelve 200 solo cuando el código fue despachado.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit(ip, 'otp-request', {
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
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(
    parsed.data.turnstileToken,
    ip,
    request.headers.get('host')
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { error: 'Verificación de seguridad fallida. Recarga e intenta de nuevo.' },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  if (await isLockedOut(normalizedEmail)) {
    return NextResponse.json(
      { error: 'Demasiados intentos fallidos. Espera unos minutos.' },
      { status: 403 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  const valid = user
    ? await compare(password, user.passwordHash)
    : await compare(password, DUMMY_HASH);

  if (!user || !valid) {
    await prisma.loginAttempt.create({
      data: { email: normalizedEmail, ip, success: false },
    });
    return NextResponse.json(
      { error: 'Credenciales inválidas. Verifica tu correo y contraseña.' },
      { status: 401 }
    );
  }

  if (!user.isActive) {
    return NextResponse.json(
      { error: 'Tu cuenta está pendiente de aprobación por un administrador.' },
      { status: 403 }
    );
  }

  await prisma.loginAttempt.create({
    data: { email: normalizedEmail, ip, success: true },
  });

  // Anula intentos OTP previos del mismo correo.
  await prisma.otpChallenge.deleteMany({ where: { email: normalizedEmail } });

  const { code, codeHash } = generateOtp();
  await prisma.otpChallenge.create({
    data: {
      email: normalizedEmail,
      codeHash,
      expiresAt: new Date(Date.now() + OTP_EXPIRATION_MS),
      attempts: 0,
    },
  });

  // Envío no bloqueante: si el correo falla, sigue habiendo un reto activo.
  sendOtpEmail(normalizedEmail, code).catch((err) => {
    console.error('Error enviando OTP (no bloqueante):', err);
  });

  return NextResponse.json(
    { ok: true, emailMasked: maskEmail(normalizedEmail) },
    { status: 200 }
  );
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return 'tu correo';
  const head = user.slice(0, 2);
  const tail = user.slice(-1);
  return `${head}${'•'.repeat(Math.max(3, user.length - 3))}${tail}@${domain}`;
}