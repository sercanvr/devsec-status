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

/**
 * Returns project contributors from pre-populated datasets.
 * Pre-rendered to eliminate client-side GitHub API rate limits.
 */
export function useGitHubContributors(
  githubUrl: string,
  initialContributors?: Contributor[]
): Contributor[] {
  return useMemo(() => {
    if (initialContributors && initialContributors.length > 0) {
      return initialContributors.map((c) => ({
        ...c,
        avatar_url: ensureAvatarSize(c.avatar_url),
      }));
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
              type: 'User',
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
