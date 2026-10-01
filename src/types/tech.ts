export interface TechCreator {
  name: string;          // e.g. "Guido van Rossum" or "Meta"
  avatarUrl: string;     // e.g. "https://github.com/gvanrossum.png" or org avatar
  type: "person" | "organization";
  releaseDate: string;   // e.g. "20 Şubat 1991"
  latestVersion?: string; // e.g. "v3.13.2" or "ES2026"
}

export interface TechEntry {
  id: string;
  name: string;
  category: "language" | "framework" | "library" | "security-tool";
  iconUrl: string;
  githubUrl: string;
  creator: TechCreator;
  popularity: {
    totalRepos: number;
    totalStars: number;
  };
  momentum: {
    newReposLast30Days: number;
    topStarredNewRepo: { name: string; stars: number } | null;
  };
  lastUpdated: string; // ISO timestamp
}
