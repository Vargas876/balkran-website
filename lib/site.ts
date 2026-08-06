import { readFileSync, existsSync } from 'node:fs';

function loadEnvValue(key: string): string | undefined {
  if (existsSync('.env')) {
    const contents = readFileSync('.env', 'utf8');
    const match = contents.match(new RegExp(`^${key}="([^"]+)"`, 'm'));
    if (match) return match[1];
  }
  return process.env[key];
}

// Dominio canónico del sitio. Verifica el más específico primero.
const candidates = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.SITE_URL,
  loadEnvValue('NEXT_PUBLIC_SITE_URL'),
  loadEnvValue('SITE_URL'),
  loadEnvValue('AUTH_URL'),
  process.env.NEXTAUTH_URL,
];

/** URL base del sitio para metadatos, sitemap, canonical y OG. Sin barra final. */
export function getSiteUrl(): string {
  const found = candidates.find((c) => c && c.trim().length > 0);
  const url = (found ?? 'http://localhost:3000').replace(/\/$/, '');
  // En Vercel, VERCEL_URL apunta al dominio de despliegue
  if (process.env.VERCEL_URL && !found) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return url;
}