import { useState, useEffect } from 'react';

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

// In-memory cache to prevent redundant API calls across component re-renders
const contributorsCache: Record<string, Contributor[]> = {};

export function useGitHubContributors(githubUrl: string): Contributor[] {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
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
        { login: owner, avatar_url: `https://github.com/${owner}.png`, html_url: `https://github.com/${owner}` },
        { login: `${repo}-contrib-1`, avatar_url: `https://github.com/${owner}.png`, html_url: githubUrl },
        { login: `${repo}-contrib-2`, avatar_url: `https://github.com/${repo}.png`, html_url: githubUrl },
        { login: `${repo}-contrib-3`, avatar_url: `https://github.com/github.png`, html_url: githubUrl },
      ];

      fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=4`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch contributors');
        })
        .then((data: any[]) => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            const list: Contributor[] = data.slice(0, 4).map((c) => ({
              login: c.login,
              avatar_url: c.avatar_url,
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
  }, [githubUrl]);

  return contributors;
}
