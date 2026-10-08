import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ExternalLink,
  ChevronDown,
  TrendingUp,
  Sparkles,
  ArrowUpDown,
  Check,
  GitFork,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TechEntry } from '../types/tech';
import { sanitizeText, sanitizeUrl } from '../lib/sanitize';
import { SegmentedProgressBar } from './SegmentedProgressBar';
import { useGitHubContributors } from '../hooks/useGitHubContributors';
import { useGitHubRelease } from '../hooks/useGitHubRelease';
import { localizeDate } from '../lib/localizeDate';
import { getOptimizedAvatarUrl } from '../lib/avatar';
import { GlassBadge } from './GlassBadge';

/**
 * Ensures tags are displayed in standard English uppercase ASCII (I instead of Turkish dotted İ)
 */
export const formatAsciiTag = (val: string): string => {
  if (!val) return '';
  return val.toUpperCase().replace(/İ/g, 'I').replace(/ı/g, 'I');
};

interface TechTableProps {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  entries: TechEntry[];
}

interface DropdownOption {
  value: string;
  label: string;
}

const CustomDropdown: React.FC<{
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  ariaLabel: string;
}> = ({ value, options, onChange, icon, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 h-9 px-3.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 text-xs font-semibold border border-neutral-300/60 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer shadow-2xs hover:bg-neutral-300/60 dark:hover:bg-neutral-700/80"
        aria-label={ariaLabel}
      >
        <div className="flex items-center gap-1.5">
          {icon}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl bg-white dark:bg-neutral-900 border border-[#C7C7C7] dark:border-neutral-700 shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#CEFF00]/10 text-foreground font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-foreground'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#CEFF00]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
};

export const TechTable: React.FC<TechTableProps> = ({ id, title, icon, entries }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  // Default sort is ALWAYS 'stars' (En Çok Yıldız) as requested
  const [sortBy, setSortBy] = useState<string>('stars');

  // Compute maximum stars dynamically for accurate scaling
  const maxStars = useMemo(() => {
    return Math.max(...entries.map((item) => item.popularity.totalStars), 1);
  }, [entries]);

  // Sort entries
  const processedEntries = useMemo(() => {
    const result = [...entries];

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'stars') {
      result.sort((a, b) => b.popularity.totalStars - a.popularity.totalStars);
    } else if (sortBy === 'momentum') {
      result.sort((a, b) => b.momentum.newReposLast30Days - a.momentum.newReposLast30Days);
    } else if (sortBy === 'ecosystem') {
      result.sort((a, b) => b.popularity.totalRepos - a.popularity.totalRepos);
    } else if (sortBy === 'year') {
      const getYear = (item: TechEntry) => {
        const match = (item.creator?.releaseDate || '').match(/\b(19\d\d|20\d\d)\b/);
        return match ? parseInt(match[1], 10) : 0;
      };
      result.sort((a, b) => {
        const yearDiff = getYear(b) - getYear(a);
        return yearDiff !== 0 ? yearDiff : b.popularity.totalStars - a.popularity.totalStars;
      });
    }

    return result;
  }, [entries, sortBy]);

  const sortOptions: DropdownOption[] = [
    { value: 'name', label: t('table.sortName') },
    { value: 'stars', label: t('table.sortStars') },
    { value: 'momentum', label: t('table.sortMomentum') },
    { value: 'ecosystem', label: t('table.sortEcosystem') },
    { value: 'year', label: t('table.sortYear') },
  ];

  return (
    <section id={id} className="w-full space-y-4 pt-2 content-visibility-auto">
      {/* Luxury Frosted-Glass Outer Frame - Slimmer border, isolated from hover bugs */}
      <div className="p-1.5 rounded-[30px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-md shadow-2xl transition-colors duration-200 isolate">
        {/* Table Container Card */}
        <div className="bg-white dark:bg-[#141414] border border-neutral-200/90 dark:border-neutral-800/90 rounded-[24px] overflow-hidden transition-colors duration-200 shadow-inner">
          {/* Table Top Header Bar: Title + Single Sort Dropdown */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/60 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-[#CEFF00]/10 text-[#0066FF] dark:text-[#CEFF00] shrink-0">
                  {icon}
                </div>
              )}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight flex items-center gap-2.5 py-1 leading-normal">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 inline-block py-1">
                  {sanitizeText(title)}
                </span>
                <GlassBadge count={processedEntries.length} />
              </h2>
            </div>

            {/* Single Sort Dropdown Matching LanguageSwitcher UI */}
            <div className="flex items-center gap-2.5 ml-auto">
              <CustomDropdown
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                icon={<ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />}
                ariaLabel={t('table.sortAria')}
              />
            </div>
          </div>

          {/* Conditional Desktop Table vs Mobile Cards rendering to prevent 14,000+ duplicate DOM nodes */}
          {!isMobile ? (
            <div className="w-full overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-neutral-800/80 text-[10px] lg:text-[11px] font-semibold uppercase tracking-tight lg:tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-50/80 dark:bg-neutral-900/70">
                    <th className="py-2.5 lg:py-3 pl-2.5 pr-1 lg:pl-4 lg:pr-2 text-left">{t('table.technology')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-left">{t('table.creator')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-center">{t('table.type')}</th>
                    <th className="py-2.5 lg:py-3 px-1 lg:px-2 text-left">{t('table.popularity')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-center">{t('table.momentum')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-center">{t('table.latestVersion')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-center">{t('table.community')}</th>
                    <th className="py-2.5 lg:py-3 px-1 text-center">{t('table.ecosystem')}</th>
                    <th className="py-2.5 lg:py-3 px-1.5 lg:px-3 text-center">{t('table.github')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 text-xs">
                  {processedEntries.map((entry) => (
                    <TableRow key={entry.id} entry={entry} maxStars={maxStars} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-3 sm:p-4 space-y-3.5">
              {processedEntries.map((entry) => (
                <MobileCard key={entry.id} entry={entry} maxStars={maxStars} />
              ))}
            </div>
          )}

          {/* Empty Fallback */}
          {processedEntries.length === 0 && (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400 text-xs">
              {t('table.noResults')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface TableRowProps {
  entry: TechEntry;
  maxStars: number;
}

const TableRow: React.FC<TableRowProps> = ({ entry, maxStars }) => {
  const { t, i18n } = useTranslation();
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanCreatorName = entry.creator
    ? sanitizeText(entry.creator.name).replace(/\s*\(.*?\)/g, '').trim()
    : t('table.openSource');
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const localizedReleaseDate = localizeDate(cleanReleaseDate, i18n.language);
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';
  const liveVersion = useGitHubRelease(entry.githubUrl, cleanVersion);

  const percentage = Math.min(
    100,
    Math.max(5, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );
  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);
  const formattedTotalRepos = new Intl.NumberFormat().format(entry.popularity.totalRepos);

  return (
    <tr
      id={entry.id}
      className="group hover:bg-neutral-100/70 dark:hover:bg-neutral-800/40 transition-none cv-row cursor-default"
    >
      {/* 1. Teknoloji (Item Name) */}
      <td className="py-2.5 lg:py-3 pl-2.5 pr-1 lg:pl-4 lg:pr-2">
        <div className="flex items-center gap-2 lg:gap-2.5">
          <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-neutral-900/85 dark:bg-white/85 border border-neutral-700/60 dark:border-white/30 backdrop-blur-md p-1.5 flex items-center justify-center shrink-0 shadow-sm transition-none">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              width={32}
              height={32}
              loading="lazy"
              decoding="async"
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain shrink-0 filter drop-shadow-[0_1.5px_2.5px_rgba(255,255,255,0.55)] dark:drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.75)]"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.failed) {
                  img.dataset.failed = 'true';
                  img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                }
              }}
            />
          </div>
          <div>
            <div className="font-bold text-xs lg:text-sm text-foreground group-hover:text-[#0066FF] dark:group-hover:text-[#CEFF00] transition-none whitespace-nowrap">
              {cleanName}
            </div>
          </div>
        </div>
      </td>

      {/* 2. Geliştirici (Wrap without ellipsis when text is long) */}
      <td className="py-2.5 lg:py-3 px-1">
        <div className="flex items-center gap-1 lg:gap-1.5">
          {!avatarFailed && entry.creator?.avatarUrl ? (
            <img
              src={getOptimizedAvatarUrl(entry.creator.avatarUrl, 64)}
              alt={cleanCreatorName}
              width={30}
              height={30}
              loading="lazy"
              decoding="async"
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover aspect-square border border-neutral-300 dark:border-neutral-700 shrink-0"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] lg:text-[11px] font-bold flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0">
              {cleanName.slice(0, 1)}
            </div>
          )}
          <div>
            <div className="font-semibold text-[11px] lg:text-xs text-foreground whitespace-normal break-words leading-snug min-w-[90px] max-w-[140px] lg:max-w-[200px]">
              {cleanCreatorName}
            </div>
            <div className="text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-400 whitespace-normal break-words leading-tight mt-0.5 min-w-[90px] max-w-[140px] lg:max-w-[200px]">
              {localizedReleaseDate || t('table.maintainer')}
            </div>
          </div>
        </div>
      </td>

      {/* 3. Tür (Type Pill - Guaranteed English ASCII uppercase, no dotted İ) */}
      <td className="py-2.5 lg:py-3 px-1 text-center">
        <span
          lang="en"
          className="inline-flex items-center justify-center min-w-0 lg:min-w-[70px] px-1.5 lg:px-2 py-0.5 rounded-md text-[9px] lg:text-[10px] font-mono font-bold tracking-normal lg:tracking-wider bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] border border-blue-500/20 whitespace-nowrap"
        >
          {formatAsciiTag(entry.category)}
        </span>
      </td>

      {/* 4. Popülarite & Kapsül Barı */}
      <td className="py-2.5 lg:py-3 px-1 lg:px-2">
        <div className="space-y-1 w-20 md:w-22 lg:w-36">
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] lg:text-[11px]">
            <span className="font-mono font-bold text-foreground flex items-center gap-0.5 lg:gap-1">
              <span className="text-amber-500 font-normal">★</span>
              <span>{formattedStars}</span>
            </span>
            <span className="font-mono font-bold text-neutral-500 dark:text-neutral-400">
              {Math.round(percentage)}%
            </span>
          </div>
          <SegmentedProgressBar percentage={percentage} totalSegments={12} className="py-0.5" />
        </div>
      </td>

      {/* 5. İvmelenme */}
      <td className="py-2.5 lg:py-3 px-1 text-center overflow-visible">
        {entry.momentum.newReposLast30Days > 0 ? (
          <div className="inline-flex items-center gap-0.5 lg:gap-1 font-mono text-[10px] lg:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 lg:px-2.5 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap">
            <TrendingUp className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
            <span>+{formattedNewRepos}</span>
          </div>
        ) : (
          <div className="relative group/neutral inline-flex">
            <div
              className="inline-flex items-center justify-center gap-1 font-mono text-[9px] lg:text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 lg:px-2.5 py-0.5 rounded-md border border-amber-500/30 whitespace-nowrap cursor-default"
            >
              <span className="font-bold">±0</span>
              <span className="text-[9px] font-sans font-medium opacity-90 hidden sm:inline">{t('table.neutralBadge')}</span>
            </div>
            {/* Custom Styled Instant Tooltip */}
            <div className="hidden group-hover/neutral:block absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-[80] bg-[#CEFF00] text-[#141414] font-bold text-xs px-2.5 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#CEFF00]" />
              {t('table.neutralTooltip')}
            </div>
          </div>
        )}
      </td>

      {/* 6. GÜNCEL SÜRÜM */}
      <td className="py-2.5 lg:py-3 px-1 text-center">
        <span
          className="font-mono text-[9px] lg:text-[11px] font-bold text-white bg-orange-600 dark:bg-orange-500/90 px-1.5 lg:px-2 py-0.5 rounded-md border border-orange-700/60 dark:border-orange-400/50 whitespace-nowrap inline-block shadow-2xs max-w-[85px] lg:max-w-none truncate"
          title={liveVersion}
        >
          {liveVersion}
        </span>
      </td>

      {/* 7. TOPLULUK & KATKIDA BULUNANLAR */}
      <td className="py-2.5 lg:py-3 px-1 text-center overflow-visible">
        <div className="flex items-center justify-center -space-x-1 lg:-space-x-1.5 overflow-visible">
          {contributors.slice(0, 3).map((c, idx) => (
            <div key={c.login + idx} className="relative group/contributor inline-block hover:z-30">
              <a
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contributor: ${c.login}`}
                title={c.login}
                className="inline-block transition-transform duration-150 group-hover/contributor:-translate-y-1 relative"
              >
                <img
                  className="h-5 w-5 lg:h-6 lg:w-6 rounded-full ring-1.5 lg:ring-2 ring-white dark:ring-neutral-900 object-cover bg-neutral-800"
                  src={getOptimizedAvatarUrl(c.avatar_url, 48)}
                  alt={c.login}
                  width={24}
                  height={24}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://github.com/github.png?size=64`;
                  }}
                />
              </a>
              {/* Floating Instant Tooltip */}
              <div className="hidden group-hover/contributor:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#141414] dark:bg-neutral-800 text-white text-[10px] font-mono whitespace-nowrap shadow-lg border border-neutral-700 pointer-events-none z-40">
                {c.login}
              </div>
            </div>
          ))}
        </div>
      </td>

      {/* 8. CANLI EKOSİSTEM HACMİ */}
      <td className="py-2.5 lg:py-3 px-1 text-center">
        <div className="space-y-0.5 text-center">
          <div className="font-mono font-bold text-[10px] lg:text-xs text-foreground flex items-center justify-center gap-0.5 lg:gap-1">
            <GitFork className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-neutral-400" />
            <span>{formattedTotalRepos}</span>
          </div>
          {entry.momentum.topStarredNewRepo && (
            <div className="text-[9px] lg:text-[10px] text-amber-500 font-mono flex items-center justify-center gap-0.5 truncate max-w-[75px] lg:max-w-[110px] mx-auto">
              <Sparkles className="w-2 h-2 lg:w-2.5 lg:h-2.5 shrink-0" />
              <span className="truncate">{entry.momentum.topStarredNewRepo.stars} ★</span>
            </div>
          )}
        </div>
      </td>

      {/* 9. GİTHUB (Direct Link) */}
      <td className="py-2.5 lg:py-3 px-1.5 lg:px-3 text-center whitespace-nowrap">
        <a
          href={cleanGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cleanName} GitHub`}
          title={`${cleanName} GitHub`}
          className="inline-flex items-center justify-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl text-[10px] lg:text-xs font-semibold bg-neutral-100 hover:bg-[#0066FF] hover:text-white dark:bg-neutral-800 dark:hover:bg-[#CEFF00] dark:hover:text-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-300/80 dark:border-neutral-700 transition-none shadow-2xs whitespace-nowrap active:scale-95"
        >
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        </a>
      </td>
    </tr>
  );
};

const MobileCard: React.FC<TableRowProps> = ({ entry, maxStars }) => {
  const { t, i18n } = useTranslation();
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanCreatorName = entry.creator
    ? sanitizeText(entry.creator.name).replace(/\s*\(.*?\)/g, '').trim()
    : t('table.openSource');
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const localizedReleaseDate = localizeDate(cleanReleaseDate, i18n.language);
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';
  const liveVersion = useGitHubRelease(entry.githubUrl, cleanVersion);

  const percentage = Math.min(
    100,
    Math.max(5, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );
  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);
  const formattedTotalRepos = new Intl.NumberFormat().format(entry.popularity.totalRepos);

  return (
    <div
      id={entry.id}
      className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1E] border-[1.5px] border-neutral-300/90 dark:border-neutral-700 shadow-xs dark:shadow-md dark:shadow-black/40 space-y-3.5 transition-colors cv-card"
    >
      {/* Top: Blurred Icon Container + Name */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-neutral-900/85 dark:bg-white/85 border border-neutral-700/60 dark:border-white/30 backdrop-blur-md p-1.5 flex items-center justify-center shrink-0 shadow-sm">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              width={34}
              height={34}
              loading="lazy"
              decoding="async"
              className="w-8 h-8 object-contain shrink-0 filter drop-shadow-[0_1.5px_2.5px_rgba(255,255,255,0.55)] dark:drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.75)]"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.failed) {
                  img.dataset.failed = 'true';
                  img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                }
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">{cleanName}</h3>
          </div>
        </div>

        <span
          lang="en"
          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] border border-blue-500/20"
        >
          {formatAsciiTag(entry.category)}
        </span>
      </div>

      {/* Creator & Güncel Sürüm Info */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-1.5 flex-wrap max-w-[70%]">
          {!avatarFailed && entry.creator?.avatarUrl ? (
            <img
              src={getOptimizedAvatarUrl(entry.creator.avatarUrl, 48)}
              alt={cleanCreatorName}
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 object-cover shrink-0"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[9px] font-bold flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0">
              {cleanName.slice(0, 1)}
            </div>
          )}
          <span className="text-neutral-700 dark:text-neutral-200 font-medium whitespace-normal break-words">
            {cleanCreatorName}
          </span>
          {localizedReleaseDate && (
            <span className="text-[10px] text-neutral-400">({localizedReleaseDate})</span>
          )}
        </div>
        <span
          className="font-mono text-[10px] font-bold bg-orange-600 dark:bg-orange-500/90 text-white px-2 py-0.5 rounded-md border border-orange-700/60 dark:border-orange-400/50"
          title={liveVersion}
        >
          {liveVersion}
        </span>
      </div>

      {/* Segmented Metric Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono font-bold text-foreground flex items-center gap-1">
            <span className="text-amber-500 font-normal">★</span>
            <span>{formattedStars}</span>
          </span>
          <span className="font-mono font-bold text-neutral-500 dark:text-neutral-400">
            {Math.round(percentage)}%
          </span>
        </div>
        <SegmentedProgressBar percentage={percentage} totalSegments={18} />
      </div>

      {/* Contributors Stack & Ekosistem Hacmi */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {contributors.slice(0, 4).map((c, idx) => (
              <img
                key={c.login + idx}
                className="h-5 w-5 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover bg-neutral-800"
                src={getOptimizedAvatarUrl(c.avatar_url, 40)}
                alt={c.login}
                width={20}
                height={20}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://github.com/github.png?size=64`;
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            {formattedTotalRepos} repo
          </span>
        </div>

        <div className="flex items-center gap-2">
          {entry.momentum.newReposLast30Days > 0 ? (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+{formattedNewRepos}</span>
            </div>
          ) : (
            <div className="relative group/neutral inline-flex">
              <div
                className="flex items-center justify-center gap-1 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30 whitespace-nowrap cursor-default"
              >
                <span className="font-bold">±0</span>
                <span className="text-[9px] font-sans font-medium opacity-90">{t('table.neutralBadge')}</span>
              </div>
              {/* Custom Styled Instant Tooltip */}
              <div className="hidden group-hover/neutral:block absolute bottom-[calc(100%+8px)] right-0 sm:left-1/2 sm:-translate-x-1/2 z-[80] bg-[#CEFF00] text-[#141414] font-bold text-xs px-2.5 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
                <span className="absolute -bottom-1.5 right-4 sm:left-1/2 sm:-translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#CEFF00]" />
                {t('table.neutralTooltip')}
              </div>
            </div>
          )}

          <a
            href={cleanGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-neutral-100 hover:bg-[#0066FF] hover:text-white dark:bg-neutral-800 dark:hover:bg-[#CEFF00] dark:hover:text-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-300/80 dark:border-neutral-700 transition-none"
            aria-label="GitHub"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
