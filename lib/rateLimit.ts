import { prisma } from '@/lib/prisma';

export interface RateLimitResult {
  ok: boolean;
  remaining?: number;
  resetAt?: Date;
}

interface WindowOptions {
  /** Ventana de tiempo en segundos */
  windowSeconds: number;
  /** Máximo de llamadas permitidas por ventana */
  max: number;
}

function windowStart(now: Date, windowSeconds: number): Date {
  const ms = Math.floor(now.getTime() / (windowSeconds * 1000)) * (windowSeconds * 1000);
  return new Date(ms);
}

/**
 * Rate limit en BD por IP + acción. Usa una clave de ventana discreta
 * (p. ej. "2026-08-06T00:05:00" para ventanas de 60s) para permitir
 * conteos con `upsert` atómico sin depender de un cache compartido.
 */
export async function checkRateLimit(
  ip: string,
  action: string,
  { windowSeconds, max }: WindowOptions
): Promise<RateLimitResult> {
  const now = new Date();
  const window = windowStart(now, windowSeconds);
  const resetAt = new Date(window.getTime() + windowSeconds * 1000);

  const row = await prisma.apiRateLimit.upsert({
    where: { ip_action_window: { ip, action, window } },
    update: { count: { increment: 1 } },
    create: { ip, action, window, count: 1 },
  });

  return {
    ok: row.count <= max,
    remaining: Math.max(0, max - row.count),
    resetAt,
  };
}

/** Limpia ventanas viejas para evitar crecimiento infinito de la tabla. */
export async function cleanupRateLimits(retentionHours = 24): Promise<void> {
  const cutoff = new Date(Date.now() - retentionHours * 3600 * 1000);
  await prisma.apiRateLimit.deleteMany({ where: { createdAt: { lt: cutoff } } });
}

export function getClientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim().slice(0, 64);
  return 'unknown';
}
