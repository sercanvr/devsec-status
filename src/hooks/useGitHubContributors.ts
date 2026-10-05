import { useState, useEffect } from 'react';
import { TechContributor } from '../types/tech';

export type Contributor = TechContributor;

// In-memory cache to prevent redundant API calls across component re-renders
const contributorsCache: Record<string, Contributor[]> = {};
let rateLimitHit = false;

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

export function useGitHubContributors(
  githubUrl: string,
  initialContributors?: Contributor[]
): Contributor[] {
  const [contributors, setContributors] = useState<Contributor[]>(() => {
    if (initialContributors && initialContributors.length > 0) {
      return initialContributors.map((c) => ({
        ...c,
        avatar_url: ensureAvatarSize(c.avatar_url),
      }));
    }
    return [];
  });

  useEffect(() => {
    // If preloaded contributors exist, don't execute any network requests!
    if (initialContributors && initialContributors.length > 0) {
      setContributors(
        initialContributors.map((c) => ({
          ...c,
          avatar_url: ensureAvatarSize(c.avatar_url),
        }))
      );
      return;
    }

    let isMounted = true;
    try {
      const urlObj = new URL(githubUrl);
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts.length < 2) return;

      const owner = parts[0];
      const repo = parts[1];
      const cacheKey = `${owner}/${repo}`;

      // Return cached contributors immediately if available
      if (contributorsCache[cacheKey]) {
        setContributors(contributorsCache[cacheKey]);
        return;
      }

      // Default fallback 4 contributors based on owner & repo
      const defaultFallback: Contributor[] = [
        { login: owner, avatar_url: `https://github.com/${owner}.png?size=64`, html_url: `https://github.com/${owner}` },
        { login: `${repo}-contrib-1`, avatar_url: `https://github.com/${owner}.png?size=64`, html_url: githubUrl },
        { login: `${repo}-contrib-2`, avatar_url: `https://github.com/${repo}.png?size=64`, html_url: githubUrl },
        { login: `${repo}-contrib-3`, avatar_url: `https://github.com/github.png?size=64`, html_url: githubUrl },
      ];

      // If rate limit was previously hit in this session, use fallback silently without spamming network
      if (rateLimitHit) {
        setContributors(defaultFallback);
        return;
      }

      fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=4`)
        .then((res) => {
          if (res.status === 403 || res.status === 429) {
            rateLimitHit = true;
            return null;
          }
          if (res.ok) return res.json();
          return null;
        })
        .then((data: any) => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            const list: Contributor[] = data.slice(0, 4).map((c: any) => ({
              login: c.login,
              avatar_url: ensureAvatarSize(c.avatar_url),
              html_url: c.html_url,
            }));
            contributorsCache[cacheKey] = list;
            setContributors(list);
          } else if (isMounted) {
            setContributors(defaultFallback);
          }
        })
        .catch(() => {
          if (isMounted) {
            setContributors(defaultFallback);
          }
        });
    } catch {
      // Fallback on invalid URL
    }

    return () => {
      isMounted = false;
    };
  }, [githubUrl, initialContributors]);

  return contributors;
}
