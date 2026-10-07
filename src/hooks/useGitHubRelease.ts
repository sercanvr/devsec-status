import { useState, useEffect } from 'react';

// In-memory cache for fetched release versions
const releaseCache: Record<string, string> = {};
let rateLimitHit = false;

/**
 * Custom hook to dynamically fetch the latest release tag from GitHub API
 * Falls back to the pre-populated version if offline, rate-limited, or not available.
 */
export function useGitHubRelease(githubUrl?: string, fallbackVersion?: string): string {
  const defaultVersion = fallbackVersion || 'v1.0.0';
  const [version, setVersion] = useState<string>(() => {
    if (!githubUrl) return defaultVersion;
    try {
      const url = new URL(githubUrl);
      if (url.hostname.includes('github.com')) {
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
          const key = `${parts[0]}/${parts[1]}`;
          if (releaseCache[key]) {
            return releaseCache[key];
          }
        }
      }
    } catch {
      // Ignore URL parse error
    }
    return defaultVersion;
  });

  useEffect(() => {
    if (!githubUrl) return;

    let isMounted = true;
    try {
      const url = new URL(githubUrl);
      if (!url.hostname.includes('github.com')) return;

      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length < 2) return;

      const owner = parts[0];
      const repo = parts[1];
      const cacheKey = `${owner}/${repo}`;

      if (releaseCache[cacheKey]) {
        setVersion(releaseCache[cacheKey]);
        return;
      }

      if (rateLimitHit) {
        return;
      }

      fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
        .then((res) => {
          if (res.status === 403 || res.status === 429) {
            rateLimitHit = true;
            return null;
          }
          if (res.ok) return res.json();
          // If no formal releases, try tags
          return fetch(`https://api.github.com/repos/${owner}/${repo}/tags?per_page=1`)
            .then((tagRes) => (tagRes.ok ? tagRes.json() : null));
        })
        .then((data: any) => {
          if (!isMounted || !data) return;

          let fetchedVersion = '';
          if (data.tag_name) {
            fetchedVersion = data.tag_name;
          } else if (Array.isArray(data) && data[0]?.name) {
            fetchedVersion = data[0].name;
          }

          if (fetchedVersion) {
            // Clean version tag: keep length reasonable
            const clean = fetchedVersion.trim().replace(/^release[-_]?/i, '');
            releaseCache[cacheKey] = clean;
            setVersion(clean);
          }
        })
        .catch(() => {
          // Silently retain fallback version
        });
    } catch {
      // Silently retain fallback version
    }

    return () => {
      isMounted = false;
    };
  }, [githubUrl, defaultVersion]);

  return version;
}
