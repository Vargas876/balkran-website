export type Lang = 'es' | 'en' | 'fr';

export type L10n = { es: string; en: string; fr: string };

export function pick(lang: Lang, value: L10n | undefined): string {
  if (!value) return '';
  return value[lang] || value.es || '';
}

export function pickOpt(lang: Lang, value: L10n | undefined): string | undefined {
  if (!value) return undefined;
  return value[lang] || value.es;
}
