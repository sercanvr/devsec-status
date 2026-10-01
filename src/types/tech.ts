export interface TechEntry {
  id: string;
  name: string;
  category: "language" | "framework" | "library" | "security-tool";
  iconUrl: string;
  githubUrl: string;
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
