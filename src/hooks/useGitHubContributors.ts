import { useMemo } from 'react';
import { TechContributor } from '../types/tech';
import { DEFAULT_AVATAR } from '../lib/avatar';

export type Contributor = TechContributor;

function ensureAvatarSize(url: string, size = 64): string {
  if (!url) return DEFAULT_AVATAR;
  if (url.includes('github.com/github.png')) return DEFAULT_AVATAR;
  if (url.includes('githubusercontent.com') || url.includes('github.com')) {
    const separator = url.includes('?') ? '&' : '?';
    if (!url.includes('s=') && !url.includes('size=')) {
      return `${url}${separator}size=${size}`;
    }
  }
  return url;
}

function isPlaceholderLogin(login: string): boolean {
  if (!login) return true;
  const l = login.toLowerCase();
  return (
    l.endsWith('-lead') ||
    l.endsWith('-core') ||
    l.endsWith('-team') ||
    l.includes('-contrib-') ||
    l === 'forensics-core' ||
    l === 'github'
  );
}

/**
 * Returns verified contributors from pre-populated datasets.
 * Filters out synthetic placeholders (-lead, -core, -team) and falls back to
 * legitimate project maintainers/owners without runtime network bottlenecks.
 */
export function useGitHubContributors(
  githubUrl: string,
  initialContributors?: Contributor[]
): Contributor[] {
  return useMemo(() => {
    if (initialContributors && initialContributors.length > 0) {
      const valid = initialContributors.filter((c) => !isPlaceholderLogin(c.login));
      if (valid.length > 0) {
        return valid.map((c) => ({
          ...c,
          avatar_url: ensureAvatarSize(c.avatar_url),
        }));
      }
    }

    try {
      const urlObj = new URL(githubUrl);
      if (urlObj.hostname === 'github.com') {
        const parts = urlObj.pathname.split('/').filter(Boolean);
        if (parts.length >= 1) {
          const owner = parts[0];
          return [
            {
              login: owner,
              avatar_url: `https://github.com/${owner}.png?size=64`,
              html_url: `https://github.com/${owner}`,
            },
          ];
        }
      }
    } catch {
      // Ignore URL parsing errors
    }

    return [];
  }, [githubUrl, initialContributors]);
}
