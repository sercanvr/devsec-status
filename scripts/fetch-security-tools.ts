import fs from 'fs';
import path from 'path';

interface CuratedItem {
  id: string;
  name: string;
  category: "security-tool";
  repo: string;
  iconUrl: string;
}

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSecurityToolsData() {
  console.log('Fetching open-source security tool metrics from curated list...');
  const listPath = path.resolve(process.cwd(), 'scripts/curated-lists/security-tools.json');
  const items: CuratedItem[] = JSON.parse(fs.readFileSync(listPath, 'utf-8'));
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

  for (const item of items) {
    try {
      // 1. Fetch repo details
      const repoRes = await fetch(`https://api.github.com/repos/${item.repo}`, { headers });
      const repoData = await repoRes.json() as any;
      const totalStars = repoData.stargazers_count || 0;

      await delay(2000);

      // 2. Search related repos
      const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(item.name)}`, { headers });
      const searchData = await searchRes.json() as any;
      const totalRepos = searchData.total_count || 0;

      await delay(2000);

      // 3. Search new repos last 30 days
      const momentumRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`${item.name} created:>${dateStr}`)}&sort=stars&order=desc`, { headers });
      const momentumData = await momentumRes.json() as any;
      const newReposLast30Days = momentumData.total_count || 0;
      const topRepo = momentumData.items && momentumData.items.length > 0 ? momentumData.items[0] : null;

      results.push({
        id: item.id,
        name: item.name,
        category: 'security-tool',
        iconUrl: item.iconUrl,
        githubUrl: `https://github.com/${item.repo}`,
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

      console.log(`Successfully fetched metrics for ${item.name}`);
    } catch (err) {
      console.error(`Failed to fetch metrics for ${item.name}:`, err);
    }
  }

  if (results.length > 0) {
    const outputPath = path.resolve(process.cwd(), 'src/data/security-tools.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Updated ${outputPath}`);
  }
}

fetchSecurityToolsData();
