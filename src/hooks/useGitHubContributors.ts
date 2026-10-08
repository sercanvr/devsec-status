import { useMemo } from 'react';
import { TechContributor } from '../types/tech';

export type Contributor = TechContributor;

function ensureAvatarSize(url: string, size = 64): string {
  if (!url) return 'https://github.com/github.png?size=64';
  if (url.includes('githubusercontent.com') || url.includes('github.com')) {
    const separator = url.includes('?') ? '&' : '?';
    if (!url.includes('s=') && !url.includes('size=')) {
      return `${url}${separator}size=${size}`;
    }
  }
  return url;
}

/**
 * Returns contributors from pre-populated datasets.
 * Client-side runtime fetch is disabled to eliminate 403 Rate Limit errors and network bottlenecks.
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
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const owner = parts[0];
        const repo = parts[1];
        return [
          { login: owner, avatar_url: `https://github.com/${owner}.png?size=64`, html_url: `https://github.com/${owner}` },
          { login: `${repo}-contrib-1`, avatar_url: `https://github.com/${owner}.png?size=64`, html_url: githubUrl },
          { login: `${repo}-contrib-2`, avatar_url: `https://github.com/${repo}.png?size=64`, html_url: githubUrl },
          { login: `${repo}-contrib-3`, avatar_url: `https://github.com/github.png?size=64`, html_url: githubUrl },
        ];
      }
    } catch {
      // Ignore URL parsing errors
    }

    return [];
  }, [githubUrl, initialContributors]);
}
