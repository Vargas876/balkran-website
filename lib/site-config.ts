import { prisma } from '@/lib/prisma';

export type SiteConfigMap = Record<string, string>;

// Valores por defecto del sitio (se usan cuando la BD aún no tiene el valor).
export const SITE_CONFIG_DEFAULTS: Record<string, string> = {
  whatsapp: '573114508064',
  telefono: '+57 311 450 8064',
  email: 'ventas@cercasbalkran.com',
  direccion: 'Medellín, Colombia',
  instagram: '',
  facebook: 'https://www.facebook.com/CercasBalkran',
  tiktok: '',
  horario: 'Lun a Vie 8am - 6pm',
};

let cached: SiteConfigMap | null = null;

/** Limpia la caché en memoria (se llama tras guardar configuración). */
export function clearSiteConfigCache() {
  cached = null;
}

/** Lee la configuración del sitio desde la BD, fusionada con los defaults. */
export async function getSiteConfigCached(): Promise<SiteConfigMap> {
  if (cached) return cached;
  const entries = await prisma.siteConfig.findMany();
  const db: SiteConfigMap = Object.fromEntries(
    entries.map((e) => [e.key, e.value])
  );
  cached = { ...SITE_CONFIG_DEFAULTS, ...db };
  return cached;
}

/** Lee la configuración SIN caché (para el panel admin después de guardar). */
export async function getSiteConfigFresh(): Promise<SiteConfigMap> {
  const entries = await prisma.siteConfig.findMany();
  const db: SiteConfigMap = Object.fromEntries(
    entries.map((e) => [e.key, e.value])
  );
  return { ...SITE_CONFIG_DEFAULTS, ...db };
}