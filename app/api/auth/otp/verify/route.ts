import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import {
  verifyOtp,
  OTP_MAX_ATTEMPTS,
  createOtpSessionToken,
} from '@/lib/otp';

export const dynamic = 'force-dynamic';

const verifySchema = z.object({
  code: z.string().trim().length(6).regex(/^\d{6}$/),
  email: z.string().email().max(254),
});

/**
 * Paso 2 de 2: valida el código OTP contra el reto activo del correo.
 * Si coincide, emite un token firmado de corta vida que `authorize()`
 * aceptará en lugar de la contraseña (la contraseña ya fue validada en
 * el paso 1). El reto se consume (uso único).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit(ip, 'otp-verify', {
    windowSeconds: 60,
    max: 10,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en un minuto.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Código inválido.' }, { status: 400 });
  }

  const { code, email } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const challenge = await prisma.otpChallenge.findFirst({
    where: { email: normalizedEmail },
    orderBy: { createdAt: 'desc' },
  });

  if (!challenge) {
    return NextResponse.json(
      { error: 'No hay un código activo. Solicita uno nuevo.' },
      { status: 400 }
    );
  }

  if (challenge.expiresAt.getTime() < Date.now()) {
    await prisma.otpChallenge.delete({ where: { id: challenge.id } });
    return NextResponse.json(
      { error: 'El código expiró. Solicita uno nuevo.' },
      { status: 400 }
    );
  }

  if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
    await prisma.otpChallenge.delete({ where: { id: challenge.id } });
    return NextResponse.json(
      { error: 'Demasiados intentos. Solicita un código nuevo.' },
      { status: 400 }
    );
  }

  if (!verifyOtp(code, challenge.codeHash)) {
    await prisma.otpChallenge.update({
      where: { id: challenge.id },
      data: { attempts: { increment: 1 } },
    });
    return NextResponse.json(
      { error: 'Código incorrecto. Intenta de nuevo.' },
      { status: 400 }
    );
  }

  // Consume el reto (uso único) y emite el token para authorize().
  await prisma.otpChallenge.delete({ where: { id: challenge.id } });
  const sessionToken = await createOtpSessionToken(normalizedEmail);

  return NextResponse.json({ ok: true, otpToken: sessionToken }, { status: 200 });
}