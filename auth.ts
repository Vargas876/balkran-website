import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from '@/auth.config';
import { prisma } from '@/lib/prisma';
import { verifyTurnstileToken } from '@/lib/turnstile';

const credentialsSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(6).max(128),
});

// Hash dummy para igualar el tiempo de bcrypt cuando el usuario no existe
// (previene enumeración de usuarios por timing).
const DUMMY_HASH =
  '$2b$12$AhpQ/1JJrnbyj2MnbogqR.vk9umMIGHVN4LE9c1HqssjtivD8sSR2';

// Protección contra fuerza bruta / credential stuffing
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim().slice(0, 64);
  return 'unknown';
}

async function isLockedOut(email: string): Promise<boolean> {
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MS);
  const count = await prisma.loginAttempt.count({
    where: { email, success: false, createdAt: { gte: since } },
  });
  return count >= MAX_FAILED_ATTEMPTS;
}

async function recordLoginAttempt(email: string, ip: string, success: boolean) {
  await prisma.loginAttempt.create({
    data: { email: email.toLowerCase(), ip, success },
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        turnstileToken: { label: 'Turnstile', type: 'text' },
      },
      authorize: async (credentials, request) => {
        const ip = clientIp(request.headers);

        // Bloquea si Turnstile no está resuelto (falla cerrado por seguridad).
        const turnstileOk = await verifyTurnstileToken(
          typeof credentials?.turnstileToken === 'string'
            ? credentials.turnstileToken
            : null,
          ip
        );
        if (!turnstileOk) return null;

        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase();

        if (await isLockedOut(normalizedEmail)) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        // Siempre ejecuta bcrypt (sobre el hash del usuario o un dummy)
        // para no filtrar por tiempo si el correo existe o no.
        const valid = user
          ? await compare(password, user.passwordHash)
          : await compare(password, DUMMY_HASH);

        if (!user || !user.isActive || !valid) {
          await recordLoginAttempt(normalizedEmail, ip, false);
          return null;
        }

        await recordLoginAttempt(normalizedEmail, ip, true);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
