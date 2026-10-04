export interface TechCreator {
  name: string;          // e.g. "Guido van Rossum" or "Meta"
  avatarUrl: string;     // e.g. "https://github.com/gvanrossum.png" or org avatar
  type: "person" | "organization";
  releaseDate: string;   // e.g. "20 Şubat 1991"
  latestVersion?: string; // e.g. "v3.13.2" or "ES2026"
}

export type TechCategory = 
  | "language" 
  | "framework" 
  | "library" 
  | "security-tool" 
  | "superset" 
  | "query-language" 
  | "css-framework" 
  | "runtime" 
  | "rdbms" 
  | "nosql" 
  | "search-engine" 
  | "baas" 
  | "security-framework";

export interface TechContributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface TechEntry {
  id: string;
  name: string;
  category: TechCategory;
  subCategory?: string;  // e.g. "Reverse Engineering Framework", "Exploitation Scanner"
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
  contributors?: TechContributor[];
}
