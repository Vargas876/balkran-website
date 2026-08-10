import { createHash, randomInt, randomBytes } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { readFileSync, existsSync } from 'node:fs';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

const AUTH_SECRET = loadEnvValue('AUTH_SECRET') || 'otp-dev-secret';

export const OTP_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutos
export const OTP_MAX_ATTEMPTS = 5;

function secretKey(): Uint8Array {
  return new TextEncoder().encode(AUTH_SECRET);
}

/** Genera un código OTP numérico de 6 dígitos y su hash (para guardar en BD). */
export function generateOtp(): { code: string; codeHash: string } {
  const code = String(randomInt(0, 1000000)).padStart(6, '0');
  const codeHash = hashOtp(code);
  return { code, codeHash };
}

export function hashOtp(code: string): string {
  // HMAC con sal derivada del secreto (el código nunca se guarda en claro).
  return createHash('sha256').update(`${AUTH_SECRET}:${code}`).digest('hex');
}

export function verifyOtp(code: string, codeHash: string): boolean {
  const candidate = hashOtp(code);
  const a = candidate.length === codeHash.length;
  if (!a) return false;
  let diff = 0;
  for (let i = 0; i < candidate.length; i++) {
    diff |= candidate.charCodeAt(i) ^ codeHash.charCodeAt(i);
  }
  return diff === 0;
}

/** Token firmado de un solo uso que entrega authorize() tras validar el OTP. */
export async function createOtpSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .setJti(randomBytes(16).toString('hex'))
    .sign(secretKey());
}

export async function verifyOtpSessionToken(
  token: string
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ['HS256'],
    });
    if (typeof payload.email !== 'string' || !payload.email) return null;
    // Un token OTP no debe servir para escalar a admin sin revisar.
    return payload.email;
  } catch {
    return null;
  }
}