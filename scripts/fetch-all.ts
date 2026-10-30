import fs from 'fs';
import path from 'path';

interface TechContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  type?: 'User' | 'Bot' | 'Organization';
}

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
    type: 'person' | 'organization';
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
  contributors?: TechContributor[];
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

async function fetchWithRetry(
  url: string,
  options: { headers: Record<string, string> },
  stats: { totalRequests: number; secondaryLimitHit: boolean },
  maxRetries = 1
): Promise<{ ok: boolean; status: number; data?: any; text?: string; isSecondaryLimit: boolean }> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    stats.totalRequests++;
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        return { ok: true, status: res.status, data, isSecondaryLimit: false };
      }

      const resText = await res.text().catch(() => '');
      const isSecLimit = res.status === 403 && (
        resText.toLowerCase().includes('secondary rate limit') ||
        resText.toLowerCase().includes('rate limit exceeded')
      );

      if (isSecLimit && attempt < maxRetries) {
        // Parse retry-after if provided or wait 45s backoff
        const retryAfterHeader = res.headers.get('retry-after');
        const waitSec = retryAfterHeader ? Math.min(Math.max(parseInt(retryAfterHeader, 10) || 45, 10), 60) : 45;
        console.warn(`  [RETRY] GitHub secondary rate limit hit on attempt ${attempt + 1}. Backing off for ${waitSec}s...`);
        await delay(waitSec * 1000);
        continue;
      }

      if (isSecLimit) {
        stats.secondaryLimitHit = true;
      }

      return { ok: false, status: res.status, text: resText, isSecondaryLimit: isSecLimit };
    } catch (err: any) {
      if (attempt < maxRetries) {
        console.warn(`  [RETRY] Network exception on attempt ${attempt + 1}: ${err?.message || err}. Waiting 5s...`);
        await delay(5000);
        continue;
      }
      return { ok: false, status: 0, text: err?.message || String(err), isSecondaryLimit: false };
    }
  }

  return { ok: false, status: 0, text: 'Max retries exhausted', isSecondaryLimit: false };
}

export function extractRepoFullName(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== 'github.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    // Must have at least owner/repo to be a repository, not an organization or user profile
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {}
  return null;
}

export interface FetchMetricsResult {
  status: 'updated' | 'skipped' | 'partial' | 'failed';
  requestsMade: number;
  error?: string;
}

export async function updateEntryMetrics(
  item: TechEntry,
  headers: Record<string, string>,
  dateStr: string,
  stats: { totalRequests: number; secondaryLimitHit: boolean }
): Promise<FetchMetricsResult> {
  const repoFullName = extractRepoFullName(item.githubUrl);

  // If not hosted on GitHub or not a repo (e.g. GitLab, custom website, or org profile)
  if (!repoFullName) {
    item.popularity = { totalRepos: 0, totalStars: 0 };
    item.momentum = { newReposLast30Days: 0, topStarredNewRepo: null };
    item.lastUpdated = new Date().toISOString();
    return { status: 'skipped', requestsMade: 0 };
  }

  let requestsMade = 0;
  let apiErrors = 0;

  try {
    // 1. Fetch repo details for stargazers_count
    requestsMade++;
    const repoRes = await fetchWithRetry(`https://api.github.com/repos/${repoFullName}`, { headers }, stats);
    
    if (repoRes.ok && repoRes.data) {
      if (typeof repoRes.data.stargazers_count === 'number') {
        item.popularity.totalStars = repoRes.data.stargazers_count;
      }
    } else {
      apiErrors++;
      console.warn(`  [WARN] Repo API HTTP ${repoRes.status} for ${repoFullName}: ${(repoRes.text || '').slice(0, 100)}`);
    }

    // Rate-limit spacing (2.1s delay between calls)
    await delay(2100);

    // 2. Search related repos for ecosystem volume
    const searchQuery =
      item.category === 'language' || item.category === 'superset'
        ? `language:${item.name.toLowerCase()}`
        : item.name;

    requestsMade++;
    const searchRes = await fetchWithRetry(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}`,
      { headers },
      stats
    );
    
    if (searchRes.ok && searchRes.data) {
      if (typeof searchRes.data.total_count === 'number') {
        item.popularity.totalRepos = searchRes.data.total_count;
      }
    } else {
      apiErrors++;
      console.warn(`  [WARN] Search API HTTP ${searchRes.status} for "${searchQuery}": ${(searchRes.text || '').slice(0, 100)}`);
    }

    await delay(2100);

    // 3. Search momentum in last 30 days
    requestsMade++;
    const momentumRes = await fetchWithRetry(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        `${searchQuery} created:>${dateStr}`
      )}&sort=stars&order=desc`,
      { headers },
      stats
    );
    
    if (momentumRes.ok && momentumRes.data) {
      if (typeof momentumRes.data.total_count === 'number') {
        item.momentum.newReposLast30Days = momentumRes.data.total_count;
      }
      if (momentumRes.data.items && momentumRes.data.items.length > 0) {
        item.momentum.topStarredNewRepo = {
          name: momentumRes.data.items[0].full_name,
          stars: momentumRes.data.items[0].stargazers_count,
        };
      }
    } else {
      apiErrors++;
      console.warn(`  [WARN] Momentum API HTTP ${momentumRes.status} for "${searchQuery}": ${(momentumRes.text || '').slice(0, 100)}`);
    }

    if (apiErrors === 0) {
      item.lastUpdated = new Date().toISOString();
      return { status: 'updated', requestsMade };
    } else if (apiErrors < 3) {
      // Partial update: preserve remaining metrics
      item.lastUpdated = new Date().toISOString();
      return { status: 'partial', requestsMade };
    } else {
      // Complete failure: existing values preserved intact
      return { status: 'failed', requestsMade };
    }
  } catch (err: any) {
    console.error(`  [ERROR] Network or fetch exception for ${item.name}:`, err?.message || err);
    return { status: 'failed', requestsMade, error: err?.message || String(err) };
  }
}

export async function runFetchAll() {
  const startTime = Date.now();
  const targetFileArg = process.argv.find((a) => a.startsWith('--file='));
  const targetFile = targetFileArg ? targetFileArg.split('=')[1] : null;

  const targetIdArg = process.argv.find((a) => a.startsWith('--id='));
  const targetId = targetIdArg ? targetIdArg.split('=')[1] : null;

  const filesToProcess = targetFile ? [targetFile] : DATA_FILES;
  console.log(`[START] Automated metric refresh across ${filesToProcess.length} dataset files...`);

  const token = process.env.GITHUB_TOKEN;
  console.log(`[AUTH] GITHUB_TOKEN configured: ${Boolean(token)}`);

  const headers: Record<string, string> = {
    'User-Agent': 'DevSec-Status-Bot',
    Accept: 'application/vnd.github+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

  const stats = {
    totalRequests: 0,
    secondaryLimitHit: false,
  };

  // Transaction buffer: load files in memory first
  const fileBuffers: Map<string, { path: string; items: TechEntry[] }> = new Map();
  let totalAttemptedGitHub = 0;
  let successCount = 0;
  let partialCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const filename of filesToProcess) {
    const jsonPath = path.resolve(process.cwd(), 'src/data', filename);
    if (!fs.existsSync(jsonPath)) {
      console.error(`[ERROR] File not found: ${jsonPath}`);
      continue;
    }

    const items: TechEntry[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    fileBuffers.set(filename, { path: jsonPath, items });

    console.log(`\n--- Processing ${filename} (${items.length} entries) ---`);

    for (const item of items) {
      if (targetId && item.id !== targetId) {
        continue;
      }

      const isRepo = Boolean(extractRepoFullName(item.githubUrl));
      if (isRepo) {
        totalAttemptedGitHub++;
      }

      const result = await updateEntryMetrics(item, headers, dateStr, stats);

      if (result.status === 'updated') {
        successCount++;
        console.log(`  ✓ [UPDATED] ${item.name} (${item.popularity.totalStars.toLocaleString()} ★, ${item.popularity.totalRepos.toLocaleString()} repos, +${item.momentum.newReposLast30Days} momentum)`);
      } else if (result.status === 'partial') {
        partialCount++;
        console.log(`  ⚠ [PARTIAL] ${item.name} (Previous values preserved where API failed)`);
      } else if (result.status === 'skipped') {
        skippedCount++;
        console.log(`  - [SKIPPED] ${item.name} (Not a GitHub repository -> N/A)`);
      } else {
        failedCount++;
        console.log(`  ✗ [FAILED]  ${item.name} (All prior values preserved)`);
      }

      // Early stop if secondary rate limit is detected to prevent temporary IP bans
      if (stats.secondaryLimitHit) {
        console.error('\n[ALERT] GitHub secondary rate limit hit! Terminating loop early.');
        break;
      }
    }

    if (stats.secondaryLimitHit) break;
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const failureRate = totalAttemptedGitHub > 0 ? failedCount / totalAttemptedGitHub : 0;

  console.log('\n================ RUN SUMMARY ================');
  console.log(`Duration:                ${durationSec}s`);
  console.log(`Total Requests Made:     ${stats.totalRequests}`);
  console.log(`GitHub Repos Attempted:  ${totalAttemptedGitHub}`);
  console.log(`Fully Updated:           ${successCount}`);
  console.log(`Partially Updated:       ${partialCount}`);
  console.log(`Skipped (External/Org):  ${skippedCount}`);
  console.log(`Failed (Preserved):      ${failedCount}`);
  console.log(`Failure Rate:            ${(failureRate * 100).toFixed(1)}%`);
  console.log(`Secondary Limit Hit:     ${stats.secondaryLimitHit}`);
  console.log('=============================================');

  // Safety Gate: abort if failure rate exceeds 20% or secondary rate limit was triggered
  const FAILURE_THRESHOLD = 0.20;
  if (failureRate > FAILURE_THRESHOLD || stats.secondaryLimitHit) {
    console.error(
      `\n[FATAL] Safety threshold exceeded (Failure Rate: ${(failureRate * 100).toFixed(1)}% > 20% or Secondary Limit Hit).`
    );
    console.error('[ABORT] No files were written to disk to protect data integrity and prevent zeroed/corrupted commits.');
    process.exit(1);
  }

  // Write files to disk transactionally only after passing safety gate
  for (const [filename, buffer] of fileBuffers.entries()) {
    fs.writeFileSync(buffer.path, JSON.stringify(buffer.items, null, 2) + '\n', 'utf-8');
    console.log(`[SAVED] Transaction committed to ${filename}`);
  }

  console.log('\n[SUCCESS] All datasets updated safely and committed to disk.');
}

if (process.argv[1]?.includes('fetch-all')) {
  runFetchAll().catch((err) => {
    console.error('[UNCAUGHT ERROR]', err);
    process.exit(1);
  });
}
