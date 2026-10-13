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

const DATA_FILES = [
  'languages.json',
  'frameworks.json',
  'databases.json',
  'security-tools.json',
  'ai-tools.json',
  'ai-infrastructure.json',
  'linux-distros.json',
  'security-distros.json',
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function extractRepoFullName(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== 'github.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {}
  return null;
}

export async function updateEntryMetrics(
  item: TechEntry,
  headers: Record<string, string>,
  dateStr: string
): Promise<boolean> {
  const repoFullName = extractRepoFullName(item.githubUrl);

  // If not hosted on GitHub or not a repo (e.g. GitLab, custom website, or org profile)
  if (!repoFullName) {
    item.popularity = { totalRepos: 0, totalStars: 0 };
    item.momentum = { newReposLast30Days: 0, topStarredNewRepo: null };
    item.lastUpdated = new Date().toISOString();
    console.log(`  [NON-GITHUB] Skipped metrics for ${item.name} (${item.githubUrl}) -> N/A`);
    return false;
  }

  try {
    // 1. Fetch repo details for stargazers_count
    const repoRes = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
    if (repoRes.ok) {
      const repoData = await repoRes.json() as any;
      if (typeof repoData.stargazers_count === 'number') {
        item.popularity.totalStars = repoData.stargazers_count;
      }
    } else {
      console.warn(`  Warning: Repo API returned ${repoRes.status} for ${repoFullName}`);
    }

    await delay(1200);

    // 2. Search related repos for ecosystem volume
    const searchQuery = item.category === 'language' || item.category === 'superset'
      ? `language:${item.name.toLowerCase()}`
      : item.name;

    const searchRes = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}`,
      { headers }
    );
    if (searchRes.ok) {
      const searchData = await searchRes.json() as any;
      if (typeof searchData.total_count === 'number') {
        item.popularity.totalRepos = searchData.total_count;
      }
    } else {
      console.warn(`  Warning: Search API returned ${searchRes.status} for ${searchQuery}`);
    }

    await delay(1200);

    // 3. Search momentum in last 30 days
    const momentumRes = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(`${searchQuery} created:>${dateStr}`)}&sort=stars&order=desc`,
      { headers }
    );
    if (momentumRes.ok) {
      const momentumData = await momentumRes.json() as any;
      if (typeof momentumData.total_count === 'number') {
        item.momentum.newReposLast30Days = momentumData.total_count;
      }
      if (momentumData.items && momentumData.items.length > 0) {
        item.momentum.topStarredNewRepo = {
          name: momentumData.items[0].full_name,
          stars: momentumData.items[0].stargazers_count,
        };
      }
    } else {
      console.warn(`  Warning: Momentum Search API returned ${momentumRes.status} for ${searchQuery}`);
    }

    item.lastUpdated = new Date().toISOString();
    console.log(`  [UPDATED] ${item.name}: ${item.popularity.totalStars} stars, ${item.popularity.totalRepos} repos, +${item.momentum.newReposLast30Days} momentum`);
    return true;
  } catch (err) {
    console.error(`  [ERROR] Failed to fetch metrics for ${item.name}:`, err);
    return false;
  }
}

async function runFetchAll() {
  const targetFileArg = process.argv.find((a) => a.startsWith('--file='));
  const targetFile = targetFileArg ? targetFileArg.split('=')[1] : null;

  const targetIdArg = process.argv.find((a) => a.startsWith('--id='));
  const targetId = targetIdArg ? targetIdArg.split('=')[1] : null;

  const filesToProcess = targetFile ? [targetFile] : DATA_FILES;
  console.log(`Starting automated metric refresh across ${filesToProcess.length} dataset files...`);

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

  for (const filename of filesToProcess) {
    const jsonPath = path.resolve(process.cwd(), 'src/data', filename);
    if (!fs.existsSync(jsonPath)) {
      console.error(`File not found: ${jsonPath}`);
      continue;
    }

    console.log(`\nProcessing ${filename}...`);
    const items: TechEntry[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    for (const item of items) {
      if (targetId && item.id !== targetId) {
        continue;
      }
      await updateEntryMetrics(item, headers, dateStr);
    }

    fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2));
    console.log(`Saved updated metrics to ${filename}`);
  }

  console.log('\nAll dataset metrics successfully processed.');
}

if (process.argv[1]?.includes('fetch-all')) {
  runFetchAll();
}
