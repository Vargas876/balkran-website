/**
 * Escapa HTML y transforma **negritas** y saltos de línea para render seguro.
 * Se aplica server-side a la salida del LLM antes de llegar al cliente.
 */
export function sanitizeReply(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s<>"',.;:!?)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#ff7a1a] underline">$1</a>')
    .replace(/\/(pqrs|productos(?:\/[a-z0-9-]+)?|manuales|preguntas-frecuentes|garantias-y-devoluciones|politica-datos-personales|terminos-y-condiciones-tienda|eventos(?:\/[a-z0-9-]+)?|certificaciones|nosotros|contacto)\b/g, '<a href="/$1" target="_blank" rel="noopener noreferrer" class="text-[#ff7a1a] underline">/$1</a>')
    .replace(/\n/g, '<br/>');
}