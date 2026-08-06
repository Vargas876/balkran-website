import { NextResponse } from 'next/server';
import { createHash, randomBytes } from 'node:crypto';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail, getBaseUrl, isEmailConfigured } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

const forgotSchema = z.object({
  email: z.string().email().max(254),
  turnstileToken: z.string().min(1).max(2048).optional().nullable(),
});

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = await checkRateLimit(ip, 'forgot-password', {
    windowSeconds: 60,
    max: 5,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
      { status: 429 }
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: 'El envío de correos no está configurado.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = forgotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Correo inválido.' }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: 'Verificación de seguridad fallida. Recarga e intenta de nuevo.' },
      { status: 400 }
    );
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Respuesta idéntica haya o no un usuario (evita enumeración).
  if (user) {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt,
      },
    });

    const resetUrl = `${getBaseUrl()}/recuperar/${token}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  }

  return NextResponse.json({
    message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.',
  });
}
