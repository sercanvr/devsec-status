/**
 * Appends size constraints to GitHub avatar URLs to prevent downloading massive 400x400 uncompressed assets.
 * Reduces avatar payloads by ~98% (from ~100KB down to ~1.5KB each).
 */
export const getOptimizedAvatarUrl = (url?: string, size = 64): string => {
  if (!url) return '';

  // Local assets (e.g. /icons/...) require no query params
  if (url.startsWith('/')) {
    return url;
  }

  // Sirv CDN dynamic edge resizing (reduces multi-MB raw uploads down to ~2KB WebP/PNG on the edge)
  if (url.includes('.sirv.com/')) {
    if (!url.includes('w=')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${size}`;
    }
    return url;
  }

  // Handle https://github.com/<name>.png
  if (url.includes('github.com/') && url.endsWith('.png')) {
    return `${url}?size=${size}`;
  }

  // Handle https://avatars.githubusercontent.com/u/...
  if (url.includes('avatars.githubusercontent.com')) {
    if (!url.includes('s=') && !url.includes('size=')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}s=${size}`;
    }
  }

  return url;
};
