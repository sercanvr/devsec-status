/**
 * URL and Data Policy Enforcement
 * Centralized allowlists and validation for security, assets, and metadata integrity.
 */

export const ALLOWED_ICON_HOSTS = new Set([
  'cdn.simpleicons.org',
  'cdn.jsdelivr.net',
  'avatars.githubusercontent.com',
  'raw.githubusercontent.com',
  'github.com',
  'msercanvar.sirv.com',
]);

export const ALLOWED_AVATAR_HOSTS = new Set([
  'github.com',
  'avatars.githubusercontent.com',
  'msercanvar.sirv.com',
]);

export const ALLOWED_REPO_HOSTS = new Set([
  'github.com',
  'gitlab.com',
  'gitlab.tails.boum.org',
  'www.caine-live.net',
]);

export const ALLOWED_CATEGORIES = new Set([
  'language',
  'framework',
  'library',
  'security-tool',
  'superset',
  'query-language',
  'css-framework',
  'runtime',
  'rdbms',
  'nosql',
  'search-engine',
  'baas',
  'security-framework',
  'linux-distro',
  'ai-tool',
  'ai-infrastructure',
]);

export const ALLOWED_CREATOR_TYPES = new Set(['person', 'organization']);

/**
 * Validates local asset paths while rejecting protocol-relative (//evil.com)
 * or backslash (/\\evil.com) bypass vectors.
 */
export function isSafeLocalAsset(url: string): boolean {
  if (typeof url !== 'string') return false;
  return /^\/(?![\/\\])/.test(url);
}

/**
 * Validates icon URLs against trusted local asset paths or HTTPS allowed hosts.
 */
export function isAllowedIconUrl(url: string): boolean {
  if (isSafeLocalAsset(url)) return true;
  if (!url || !url.startsWith('https://')) return false;
  try {
    const host = new URL(url).hostname;
    return ALLOWED_ICON_HOSTS.has(host);
  } catch {
    return false;
  }
}

/**
 * Validates creator avatar URLs against HTTPS allowed hosts.
 */
export function isAllowedAvatarUrl(url: string): boolean {
  if (!url || !url.startsWith('https://')) return false;
  try {
    const host = new URL(url).hostname;
    return ALLOWED_AVATAR_HOSTS.has(host);
  } catch {
    return false;
  }
}

/**
 * Validates repository or source links against HTTPS allowed hosts.
 */
export function isAllowedRepoUrl(url: string): boolean {
  if (!url || !url.startsWith('https://')) return false;
  try {
    const host = new URL(url).hostname;
    return ALLOWED_REPO_HOSTS.has(host);
  } catch {
    return false;
  }
}

/**
 * Checks whether a URL points to an active GitHub repository (owner/repo).
 */
export function isGitHubRepo(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return false;
    const parts = parsed.pathname.split('/').filter(Boolean);
    return parts.length >= 2;
  } catch {
    return false;
  }
}
