export const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23737373'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

/**
 * Appends size constraints to GitHub avatar URLs to prevent downloading massive 400x400 uncompressed assets.
 * Reduces avatar payloads by ~98% (from ~100KB down to ~1.5KB each).
 */
export const getOptimizedAvatarUrl = (url?: string, size = 64): string => {
  if (!url) return DEFAULT_AVATAR;

  // Local assets (e.g. /icons/...) require no query params
  if (url.startsWith('/')) {
    return url;
  }

  // Already a data URI
  if (url.startsWith('data:')) {
    return url;
  }

  // Generic github fallback that causes 302 redirects or 404s
  if (url.includes('github.com/github.png')) {
    return DEFAULT_AVATAR;
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
  if (url.includes('github.com/') && url.includes('.png')) {
    if (!url.includes('size=')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}size=${size}`;
    }
    return url;
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

