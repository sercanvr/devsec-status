import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Star,
  GitFork,
  Sparkles,
  Calendar,
  Tag,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { TechEntry } from '../types/tech';
import { sanitizeText, sanitizeUrl } from '../lib/sanitize';
import { SegmentedProgressBar } from './SegmentedProgressBar';
import { useGitHubContributors } from '../hooks/useGitHubContributors';

interface TechTableProps {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  entries: TechEntry[];
}

export const TechTable: React.FC<TechTableProps> = ({ id, title, icon, entries }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'trending'>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'momentum' | 'name'>('stars');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Compute maximum stars dynamically for accurate scaling
  const maxStars = useMemo(() => {
    return Math.max(...entries.map((item) => item.popularity.totalStars), 1);
  }, [entries]);

  // Filter & Sort entries
  const processedEntries = useMemo(() => {
    let result = [...entries];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
          (item.creator && item.creator.name.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (selectedStatus === 'trending') {
      result = result.filter((item) => item.momentum.newReposLast30Days > 50);
    }

    // Sort
    if (sortBy === 'stars') {
      result.sort((a, b) => b.popularity.totalStars - a.popularity.totalStars);
    } else if (sortBy === 'momentum') {
      result.sort((a, b) => b.momentum.newReposLast30Days - a.momentum.newReposLast30Days);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [entries, searchQuery, selectedStatus, sortBy]);

  const toggleExpand = (entryId: string) => {
    setExpandedId((prev) => (prev === entryId ? null : entryId));
  };

  return (
    <section id={id} className="w-full space-y-4 pt-2">
      {/* Table Container Card (Image 3 Aesthetic) */}
      <div className="bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl shadow-xl shadow-black/5 overflow-hidden transition-colors duration-200">
        {/* Table Top Header Bar: Title + Status + Filters */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-neutral-200/80 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-[#CEFF00]/10 text-[#0066FF] dark:text-[#CEFF00] shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <span>{sanitizeText(title)}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {processedEntries.length}
                </span>
              </h2>
            </div>
          </div>

          {/* Controls Bar: Search & Status & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={t('nav.search') || 'Ara...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 sm:w-44 pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF] dark:focus:ring-[#CEFF00] transition-all"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                aria-label="Filter by Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0066FF] dark:focus:ring-[#CEFF00]"
              >
                <option value="all">Tüm Durumlar (All)</option>
                <option value="active">Aktif (Active)</option>
                <option value="trending">Trending (&gt;50 Repo)</option>
              </select>
              <Filter className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                aria-label="Sort Order"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0066FF] dark:focus:ring-[#CEFF00]"
              >
                <option value="stars">En Çok Yıldız</option>
                <option value="momentum">En Yüksek İvme</option>
                <option value="name">İsim (A-Z)</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Desktop & Laptop Fintech Table View (Hidden on mobile < md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200/80 dark:border-neutral-800/80 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-50/70 dark:bg-neutral-900/60">
                <th className="py-3 px-5 sm:px-6">Teknoloji</th>
                <th className="py-3 px-4">Geliştirici</th>
                <th className="py-3 px-3">Tür</th>
                <th className="py-3 px-5 min-w-[220px]">Popülarite & Yıldız Barı</th>
                <th className="py-3 px-4 text-center">İvmelenme</th>
                <th className="py-3 px-4 text-center">Sürüm</th>
                <th className="py-3 px-4 text-center">Durum</th>
                <th className="py-3 px-5 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 text-xs">
              {processedEntries.map((entry) => (
                <TableRow
                  key={entry.id}
                  entry={entry}
                  maxStars={maxStars}
                  isExpanded={expandedId === entry.id}
                  onToggleExpand={() => toggleExpand(entry.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Small Screen Fintech Cards View (< md) */}
        <div className="md:hidden divide-y divide-neutral-200/70 dark:divide-neutral-800/70 p-3 sm:p-4 space-y-3">
          {processedEntries.map((entry) => (
            <MobileCard
              key={entry.id}
              entry={entry}
              maxStars={maxStars}
              isExpanded={expandedId === entry.id}
              onToggleExpand={() => toggleExpand(entry.id)}
            />
          ))}
        </div>

        {/* Empty Search Fallback */}
        {processedEntries.length === 0 && (
          <div className="py-12 text-center text-neutral-500 dark:text-neutral-400 text-xs">
            Aradığınız kritere uygun teknoloji bulunamadı.
          </div>
        )}
      </div>
    </section>
  );
};

interface TableRowProps {
  entry: TechEntry;
  maxStars: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  entry,
  maxStars,
  isExpanded,
  onToggleExpand,
}) => {
  const { t } = useTranslation();
  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanSubCategory = entry.subCategory ? sanitizeText(entry.subCategory) : '';
  const cleanCreatorName = entry.creator ? sanitizeText(entry.creator.name) : 'Açık Kaynak';
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';

  const percentage = Math.min(
    100,
    Math.max(5, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );
  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedMaxStars = new Intl.NumberFormat().format(maxStars);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);

  return (
    <>
      <tr
        id={entry.id}
        className={`group hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors ${
          isExpanded ? 'bg-neutral-50/80 dark:bg-neutral-800/50' : ''
        }`}
      >
        {/* 1. Teknoloji (Item Name) */}
        <td className="py-3.5 px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-2 flex items-center justify-center shrink-0 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs">
              <img
                src={entry.iconUrl}
                alt={cleanName}
                width={28}
                height={28}
                className="w-7 h-7 object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                }}
              />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-foreground group-hover:text-[#0066FF] dark:group-hover:text-[#CEFF00] transition-colors">
                {cleanName}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[140px] sm:max-w-[180px]">
                {cleanSubCategory || entry.category}
              </div>
            </div>
          </div>
        </td>

        {/* 2. Geliştirici (Customer / Creator in Image 3) */}
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            {entry.creator?.avatarUrl ? (
              <img
                src={entry.creator.avatarUrl}
                alt={cleanCreatorName}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] font-bold flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0">
                {cleanName.slice(0, 1)}
              </div>
            )}
            <div>
              <div className="font-semibold text-xs text-foreground truncate max-w-[120px]">
                {cleanCreatorName}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {cleanReleaseDate || 'Maintainer'}
              </div>
            </div>
          </div>
        </td>

        {/* 3. Tür (Type Pill in Image 2) */}
        <td className="py-3.5 px-3">
          <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] border border-blue-500/20 whitespace-nowrap">
            {entry.category}
          </span>
        </td>

        {/* 4. Popülarite & Segmented Bar (Image 2 & 4 Limit Usage) */}
        <td className="py-3.5 px-5">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-mono font-bold text-foreground">
                {formattedStars}{' '}
                <span className="text-neutral-400 font-normal">/ {formattedMaxStars}</span>
              </span>
              <span className="font-mono font-bold text-neutral-600 dark:text-neutral-300">
                {Math.round(percentage)}%
              </span>
            </div>
            <SegmentedProgressBar percentage={percentage} totalSegments={20} />
          </div>
        </td>

        {/* 5. İvmelenme (Transactions) */}
        <td className="py-3.5 px-4 text-center">
          <div className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap">
            <TrendingUp className="w-3 h-3" />
            <span>+{formattedNewRepos}</span>
          </div>
        </td>

        {/* 6. Sürüm (Expires) */}
        <td className="py-3.5 px-4 text-center">
          <span className="font-mono text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-300/60 dark:border-neutral-700 whitespace-nowrap">
            {cleanVersion}
          </span>
        </td>

        {/* 7. Durum (Status Pill with dot) */}
        <td className="py-3.5 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aktif</span>
          </span>
        </td>

        {/* 8. Aksiyon (Action Buttons) */}
        <td className="py-3.5 px-5 text-right whitespace-nowrap">
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={onToggleExpand}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                isExpanded
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-xs'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400'
              }`}
            >
              <span>Detaylar</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <a
              href={cleanGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cleanName} GitHub`}
              className="p-1.5 rounded-xl bg-neutral-100 hover:bg-[#0066FF] hover:text-white dark:bg-neutral-800 dark:hover:bg-[#CEFF00] dark:hover:text-neutral-900 text-neutral-500 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </td>
      </tr>

      {/* Expanded Row Detail Drawer */}
      {isExpanded && (
        <tr className="bg-neutral-100/70 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200">
          <td colSpan={8} className="p-4 sm:p-5">
            <RowDetails entry={entry} />
          </td>
        </tr>
      )}
    </>
  );
};

const MobileCard: React.FC<TableRowProps> = ({
  entry,
  maxStars,
  isExpanded,
  onToggleExpand,
}) => {
  const { t } = useTranslation();
  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanSubCategory = entry.subCategory ? sanitizeText(entry.subCategory) : '';
  const cleanCreatorName = entry.creator ? sanitizeText(entry.creator.name) : 'Açık Kaynak';
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';

  const percentage = Math.min(
    100,
    Math.max(5, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );
  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedMaxStars = new Intl.NumberFormat().format(maxStars);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);

  return (
    <div
      id={entry.id}
      className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 space-y-3 transition-colors"
    >
      {/* Top: Icon + Name + Category + Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1.5 flex items-center justify-center shrink-0 border border-neutral-200 dark:border-neutral-700">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">{cleanName}</h3>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
              {cleanSubCategory || entry.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Aktif
          </span>
        </div>
      </div>

      {/* Creator Info */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-1.5">
          {entry.creator?.avatarUrl && (
            <img
              src={entry.creator.avatarUrl}
              alt={cleanCreatorName}
              width={18}
              height={18}
              className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 object-cover"
            />
          )}
          <span className="text-neutral-600 dark:text-neutral-300 font-medium">
            {cleanCreatorName}
          </span>
        </div>
        <span className="font-mono text-[10px] bg-neutral-200/70 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
          {cleanVersion}
        </span>
      </div>

      {/* Segmented Metric Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono font-bold text-foreground">
            {formattedStars}{' '}
            <span className="text-neutral-400 font-normal">/ {formattedMaxStars} ★</span>
          </span>
          <span className="font-mono font-bold text-neutral-600 dark:text-neutral-300">
            {Math.round(percentage)}%
          </span>
        </div>
        <SegmentedProgressBar percentage={percentage} totalSegments={18} />
      </div>

      {/* Footer & Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+{formattedNewRepos} yeni repo</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleExpand}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Kapat' : 'Detaylar'}
          </button>
          <a
            href={cleanGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            aria-label="GitHub"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <RowDetails entry={entry} />
        </div>
      )}
    </div>
  );
};

const RowDetails: React.FC<{ entry: TechEntry }> = ({ entry }) => {
  const { t } = useTranslation();
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/60 dark:bg-neutral-900/60 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      {/* Col 1: Contributors Stack */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          Topluluk & Katkıda Bulunanlar
        </span>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {contributors.slice(0, 4).map((c, idx) => (
              <a
                key={c.login + idx}
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title={c.login}
                className="inline-block transition-transform hover:-translate-y-1 relative"
              >
                <img
                  className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover bg-neutral-800"
                  src={c.avatar_url}
                  alt={c.login}
                  width={28}
                  height={28}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://github.com/github.png?size=64`;
                  }}
                />
              </a>
            ))}
          </div>
          <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
            4 Aktif Lider
          </span>
        </div>
      </div>

      {/* Col 2: Top Starred New Repo & Total Repos */}
      <div className="space-y-1 text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          Canlı Ekosistem Hacmi
        </span>
        <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
          <GitFork className="w-3.5 h-3.5 text-neutral-400" />
          <span>Toplam Depo: <strong>{new Intl.NumberFormat().format(entry.popularity.totalRepos)}</strong></span>
        </div>
        {entry.momentum.topStarredNewRepo && (
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate max-w-[240px]">
              Ayın Yıldızı: <strong>{sanitizeText(entry.momentum.topStarredNewRepo.name)}</strong> ({entry.momentum.topStarredNewRepo.stars} ★)
            </span>
          </div>
        )}
      </div>

      {/* Col 3: Direct Action */}
      <div className="flex items-center md:justify-end">
        <a
          href={cleanGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#CEFF00] dark:hover:bg-[#B8E600] text-white dark:text-[#141414] transition-colors shadow-md"
        >
          <span>GitHub Deposuna Git</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
