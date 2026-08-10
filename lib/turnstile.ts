const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY ?? '';

const SITE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** True si Turnstile está configurado (tiene clave pública y secreta). */
export function isTurnstileEnabled(): boolean {
  return Boolean(SITE_KEY && SECRET_KEY);
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

/** True si la request viene de un host local (dev/testing). Permite E2E local sin romper producción. */
export function isLocalHost(host?: string | null): boolean {
  if (!host) return false;
  const base = host.split(':')[0].toLowerCase();
  return LOCAL_HOSTS.has(base);
}

/**
 * Verifica un token de Cloudflare Turnstile contra la API de Cloudflare.
 * Si Turnstile NO está configurado, devuelve `true` (feature apagada, no bloquea).
 * Si el host es local (dev/testing), devuelve `true` (bypass local).
 * Si está configurado pero el token falta o es inválido, devuelve `false`.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  ip?: string,
  host?: string | null
): Promise<boolean> {
  if (!isTurnstileEnabled()) return true;
  if (isLocalHost(host)) return true;
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