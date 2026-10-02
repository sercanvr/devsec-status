import fs from 'fs';
import path from 'path';

interface CuratedItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  repo: string;
  iconUrl: string;
}

interface TechEntry {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  iconUrl: string;
  githubUrl: string;
  creator?: any;
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

async function fetchDatabaseData() {
  console.log('Fetching database metrics from curated list...');
  const listPath = path.resolve(process.cwd(), 'scripts/curated-lists/databases.json');
  const existingPath = path.resolve(process.cwd(), 'src/data/databases.json');
  
  const items: CuratedItem[] = JSON.parse(fs.readFileSync(listPath, 'utf-8'));
  const existingData: TechEntry[] = fs.existsSync(existingPath) 
    ? JSON.parse(fs.readFileSync(existingPath, 'utf-8')) 
    : [];
  
  const existingMap = new Map(existingData.map(item => [item.id, item]));
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
      const existing = existingMap.get(item.id);
      let totalStars = existing?.popularity?.totalStars || 0;
      let totalRepos = existing?.popularity?.totalRepos || 0;
      let newReposLast30Days = existing?.momentum?.newReposLast30Days || 0;
      let topRepo = existing?.momentum?.topStarredNewRepo || null;

      // 1. Fetch repo details
      const repoRes = await fetch(`https://api.github.com/repos/${item.repo}`, { headers });
      if (repoRes.ok) {
        const repoData = await repoRes.json() as any;
        if (repoData.stargazers_count !== undefined) {
          totalStars = repoData.stargazers_count;
        }
      }

      await delay(2000);

      // 2. Search related repos
      const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(item.name)}`, { headers });
      if (searchRes.ok) {
        const searchData = await searchRes.json() as any;
        if (searchData.total_count !== undefined) {
          totalRepos = searchData.total_count;
        }
      }

      await delay(2000);

      // 3. Search new repos last 30 days
      const momentumRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`${item.name} created:>${dateStr}`)}&sort=stars&order=desc`, { headers });
      if (momentumRes.ok) {
        const momentumData = await momentumRes.json() as any;
        if (momentumData.total_count !== undefined) {
          newReposLast30Days = momentumData.total_count;
        }
        if (momentumData.items && momentumData.items.length > 0) {
          topRepo = { name: momentumData.items[0].full_name, stars: momentumData.items[0].stargazers_count };
        }
      }

      results.push({
        id: item.id,
        name: item.name,
        category: item.category,
        subCategory: item.subCategory,
        iconUrl: item.iconUrl,
        githubUrl: `https://github.com/${item.repo}`,
        creator: existing?.creator || null,
        popularity: {
          totalRepos,
          totalStars,
        },
        momentum: {
          newReposLast30Days,
          topStarredNewRepo: topRepo,
        },
        lastUpdated: new Date().toISOString(),
      });

      console.log(`Successfully fetched metrics for ${item.name}`);
    } catch (err) {
      console.error(`Failed to fetch metrics for ${item.name}:`, err);
      const existing = existingMap.get(item.id);
      if (existing) results.push(existing);
    }
  }

  if (results.length > 0) {
    fs.writeFileSync(existingPath, JSON.stringify(results, null, 2));
    console.log(`Updated ${existingPath}`);
  }
}

fetchDatabaseData();
