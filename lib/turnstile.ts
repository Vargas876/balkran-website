const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ?? '';

const SITE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** True si Turnstile está configurado (tiene clave pública y secreta). */
export function isTurnstileEnabled(): boolean {
  return Boolean(SITE_KEY && SECRET_KEY);
}

/**
 * Verifica un token de Cloudflare Turnstile contra la API de Cloudflare.
 * Si Turnstile NO está configurado, devuelve `true` (feature apagada, no bloquea).
 * Si está configurado pero el token falta o es inválido, devuelve `false`.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  ip?: string
): Promise<boolean> {
  if (!isTurnstileEnabled()) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret: SECRET_KEY,
    response: token,
    remoteip: ip ?? '',
  });

  try {
    const res = await fetch(SITE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}