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
    .replace(/\n/g, '<br/>');
}