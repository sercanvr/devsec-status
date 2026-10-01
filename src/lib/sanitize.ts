import DOMPurify from 'dompurify';

/**
 * Sanitizes input text/HTML to prevent XSS attacks (OWASP Top 10 compliance).
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // Strip all HTML tags, return plain text
    ALLOWED_ATTR: []
  }).trim();
}

/**
 * Validates and sanitizes URLs to ensure only valid http/https or relative paths are rendered.
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '#';
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
  } catch {
    // If relative path or invalid
    if (url.startsWith('/') || url.startsWith('./')) {
      return url;
    }
  }
  return '#';
}
