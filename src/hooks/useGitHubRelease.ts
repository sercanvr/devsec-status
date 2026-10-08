/**
 * Custom hook to provide the latest release version.
 * Returns the reliable pre-populated version from static datasets.
 * Client-side runtime fetch is disabled to eliminate unauthenticated GitHub 403 Rate Limit errors (60 req/hour)
 * and prevent 200+ redundant network requests on initial page load.
 * Datasets are automatically refreshed server-side via scheduled GitHub Actions.
 */
export function useGitHubRelease(_githubUrl?: string, fallbackVersion?: string): string {
  return fallbackVersion || 'v1.0.0';
}
