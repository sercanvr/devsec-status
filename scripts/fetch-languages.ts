import fs from 'fs';
import path from 'path';

interface TechEntry {
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
  lastUpdated: string;
}

const LANGUAGES_TO_FETCH = [
  { id: 'lang-python', name: 'Python', query: 'language:python', repo: 'python/cpython', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { id: 'lang-typescript', name: 'TypeScript', query: 'language:typescript', repo: 'microsoft/TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { id: 'lang-rust', name: 'Rust', query: 'language:rust', repo: 'rust-lang/rust', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
  { id: 'lang-go', name: 'Go', query: 'language:go', repo: 'golang/go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { id: 'lang-javascript', name: 'JavaScript', query: 'language:javascript', repo: 'v8/v8', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchLanguageData() {
  console.log('Fetching programming language metrics from GitHub API...');
  const results: TechEntry[] = [];
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'User-Agent': 'DevSec-Status-Bot',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

  for (const lang of LANGUAGES_TO_FETCH) {
    try {
      // 1. Search total repos
      const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(lang.query)}`, { headers });
      const searchData = await searchRes.json() as any;
      const totalRepos = searchData.total_count || 0;

      await delay(2000); // Rate-limit guard delay

      // 2. Fetch primary repo for total stars
      const repoRes = await fetch(`https://api.github.com/repos/${lang.repo}`, { headers });
      const repoData = await repoRes.json() as any;
      const totalStars = repoData.stargazers_count || 0;

      await delay(2000);

      // 3. Search new repos last 30 days
      const momentumRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`${lang.query} created:>${dateStr}`)}&sort=stars&order=desc`, { headers });
      const momentumData = await momentumRes.json() as any;
      const newReposLast30Days = momentumData.total_count || 0;
      const topRepo = momentumData.items && momentumData.items.length > 0 ? momentumData.items[0] : null;

      results.push({
        id: lang.id,
        name: lang.name,
        category: 'language',
        iconUrl: lang.iconUrl,
        githubUrl: `https://github.com/${lang.repo}`,
        popularity: {
          totalRepos,
          totalStars,
        },
        momentum: {
          newReposLast30Days,
          topStarredNewRepo: topRepo ? { name: topRepo.full_name, stars: topRepo.stargazers_count } : null,
        },
        lastUpdated: new Date().toISOString(),
      });

      console.log(`Successfully fetched metrics for ${lang.name}`);
    } catch (err) {
      console.error(`Failed to fetch metrics for ${lang.name}:`, err);
    }
  }

  if (results.length > 0) {
    const outputPath = path.resolve(process.cwd(), 'src/data/languages.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Updated ${outputPath}`);
  }
}

fetchLanguageData();
