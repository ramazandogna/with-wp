import striptags from "striptags";

/**
 * Excerpt metnini HTML'den arındırır veya olduğu gibi döndürür.
 * @param html - HTML içeren metin
 * @param options - { raw: true } ise sadece düz metin döner, { raw: false } ise HTML döner
 */
export function getExcerpt(html: string, options?: { raw?: boolean }) {
  if (!html) return '';
  if (options?.raw === false) return html;
  return striptags(html);
}
