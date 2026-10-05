import fs from 'fs';
import path from 'path';

interface TechEntry {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  iconUrl: string;
  githubUrl: string;
  creator?: {
    name: string;
    avatarUrl: string;
    type: "person" | "organization";
    releaseDate: string;
    latestVersion: string;
  } | null;
  popularity: {
    totalRepos: number;
    totalStars: number;
  };
  momentum: {
    newReposLast30Days: number;
    topStarredNewRepo: { name: string; stars: number } | null;
  };
  lastUpdated: string;
  contributors?: any;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function extractRepoFullName(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {}
  return null;
}

async function fetchSecurityToolsData() {
  console.log('Fetching open-source security tool metrics from src/data/security-tools.json...');
  const jsonPath = path.resolve(process.cwd(), 'src/data/security-tools.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    return;
  }

  const items: TechEntry[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
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
    const repoFullName = extractRepoFullName(item.githubUrl);
    if (!repoFullName) continue;

    try {
      // 1. Fetch repo details for stargazers_count
      const repoRes = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
      if (repoRes.ok) {
        const repoData = await repoRes.json() as any;
        if (typeof repoData.stargazers_count === 'number') {
          item.popularity.totalStars = repoData.stargazers_count;
        }
      }

      await delay(1200);

      // 2. Search related repos
      const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(item.name)}`, { headers });
      if (searchRes.ok) {
        const searchData = await searchRes.json() as any;
        if (typeof searchData.total_count === 'number' && searchData.total_count > 0) {
          item.popularity.totalRepos = searchData.total_count;
        }
      }

      await delay(1200);

      // 3. Search momentum last 30 days
      const momentumRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`${item.name} created:>${dateStr}`)}&sort=stars&order=desc`, { headers });
      if (momentumRes.ok) {
        const momentumData = await momentumRes.json() as any;
        if (typeof momentumData.total_count === 'number') {
          item.momentum.newReposLast30Days = momentumData.total_count;
        }
        if (momentumData.items && momentumData.items.length > 0) {
          item.momentum.topStarredNewRepo = {
            name: momentumData.items[0].full_name,
            stars: momentumData.items[0].stargazers_count
          };
        }
      }

      item.lastUpdated = new Date().toISOString();
      console.log(`Successfully updated metrics for ${item.name} (${item.popularity.totalStars} stars)`);
    } catch (err) {
      console.error(`Error updating metrics for ${item.name}:`, err);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2));
  console.log(`Successfully preserved schema and updated metrics in ${jsonPath}`);
}

fetchSecurityToolsData();
