import { Lang } from '@/lib/i18n';

export const locales: Record<Lang, Intl.LocalesArgument> = {
  es: 'es-CO',
  en: 'en-US',
  fr: 'fr-FR',
};

export function formatFecha(iso: string, lang: Lang = 'es'): string {
  return new Date(iso).toLocaleDateString(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}