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

export const TechTable: React.FC<TechTableProps> = ({ id, title, icon, entries }) => {
  const [sortBy, setSortBy] = useState<string>('name');

  // Compute maximum stars dynamically for accurate scaling
  const maxStars = useMemo(() => {
    return Math.max(...entries.map((item) => item.popularity.totalStars), 1);
  }, [entries]);

  // Sort entries
  const processedEntries = useMemo(() => {
    const result = [...entries];

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
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
    { value: 'name', label: 'İsim (A-Z)' },
    { value: 'stars', label: 'En Çok Yıldız' },
    { value: 'momentum', label: 'En Yüksek İvme' },
    { value: 'ecosystem', label: 'Ekosistem Hacmi' },
    { value: 'year', label: 'Çıkış Yılı' },
  ];

  return (
    <section id={id} className="w-full space-y-4 pt-2">
      {/* Luxury Frosted-Glass Outer Frame / Border */}
      <div className="p-2 sm:p-2.5 rounded-[36px] bg-neutral-200/50 dark:bg-white/[0.04] border border-neutral-300/80 dark:border-white/[0.08] backdrop-blur-2xl shadow-2xl transition-all">
        {/* Table Container Card */}
        <div className="bg-white dark:bg-[#141414] border border-neutral-200/90 dark:border-neutral-800/90 rounded-[28px] overflow-hidden transition-colors duration-200 shadow-inner">
          {/* Table Top Header Bar: Title + Single Sort Dropdown */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/60 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-[#CEFF00]/10 text-[#0066FF] dark:text-[#CEFF00] shrink-0">
                  {icon}
                </div>
              )}
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <span>{sanitizeText(title)}</span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {processedEntries.length}
                </span>
              </h2>
            </div>

            {/* Single Sort Dropdown Matching LanguageSwitcher UI */}
            <div className="flex items-center gap-2.5 ml-auto">
              <CustomDropdown
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                icon={<ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />}
                ariaLabel="Sıralama Ölçütü"
              />
            </div>
          </div>

          {/* Desktop & Laptop Fintech Table View */}
          <div className="hidden md:block w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-neutral-200/80 dark:border-neutral-800/80 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-50/80 dark:bg-neutral-900/70">
                  <th className="py-3 px-3 sm:px-4">TEKNOLOJİ</th>
                  <th className="py-3 px-2">GELİŞTİRİCİ</th>
                  <th className="py-3 px-1.5 text-center">TÜR</th>
                  <th className="py-3 px-2 text-left">POPÜLARİTE & YILDIZ BARI</th>
                  <th className="py-3 px-2 text-center">İVMELENME</th>
                  <th className="py-3 px-2 text-center">GÜNCEL SÜRÜM</th>
                  <th className="py-3 px-1.5 text-center">TOPLULUK</th>
                  <th className="py-3 px-2 text-center">EKOSİSTEM HACMİ</th>
                  <th className="py-3 px-2.5 text-center">GİTHUB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 text-xs">
                {processedEntries.map((entry) => (
                  <TableRow key={entry.id} entry={entry} maxStars={maxStars} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Small Screen Fintech Cards View (< md) */}
          <div className="md:hidden divide-y divide-neutral-200/70 dark:divide-neutral-800/70 p-3 sm:p-4 space-y-3">
            {processedEntries.map((entry) => (
              <MobileCard key={entry.id} entry={entry} maxStars={maxStars} />
            ))}
          </div>

          {/* Empty Fallback */}
          {processedEntries.length === 0 && (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400 text-xs">
              Kritere uygun teknoloji bulunamadı.
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
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanCreatorName = entry.creator
    ? sanitizeText(entry.creator.name).replace(/\s*\(.*?\)/g, '').trim()
    : 'Açık Kaynak';
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';

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
      className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
    >
      {/* 1. Teknoloji (Item Name) - Enlarged Logo in Blurred High-Contrast Square */}
      <td className="py-3 px-3 sm:px-4">
        <div className="flex items-center gap-2.5">
          {/* Logo container: dark in light theme, light in dark theme, blurred */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-neutral-900/10 dark:bg-white/[0.10] border border-neutral-900/15 dark:border-white/[0.15] backdrop-blur-md p-1 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 filter drop-shadow-xs"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
              }}
            />
          </div>
          <div>
            <div className="font-bold text-sm text-foreground group-hover:text-[#0066FF] dark:group-hover:text-[#CEFF00] transition-colors whitespace-nowrap">
              {cleanName}
            </div>
          </div>
        </div>
      </td>

      {/* 2. Geliştirici (Creator + Full Gün Ay Yıl Date) */}
      <td className="py-3 px-2">
        <div className="flex items-center gap-1.5">
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
            <div className="font-semibold text-xs text-foreground truncate max-w-[105px] sm:max-w-[125px]">
              {cleanCreatorName}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate max-w-[105px]">
              {cleanReleaseDate || 'Maintainer'}
            </div>
          </div>
        </div>
      </td>

      {/* 3. Tür (Type Pill) */}
      <td className="py-3 px-1.5 text-center">
        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] border border-blue-500/20 whitespace-nowrap">
          {entry.category}
        </span>
      </td>

      {/* 4. Popülarite & Kapsül Barı */}
      <td className="py-3 px-2">
        <div className="space-y-1 w-32 sm:w-36 lg:w-40">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px]">
            <span className="font-mono font-bold text-foreground flex items-center gap-1">
              <span className="text-amber-500 font-normal">★</span>
              <span>{formattedStars}</span>
            </span>
            <span className="font-mono font-bold text-neutral-500 dark:text-neutral-400">
              {Math.round(percentage)}%
            </span>
          </div>
          <SegmentedProgressBar percentage={percentage} totalSegments={16} />
        </div>
      </td>

      {/* 5. İvmelenme */}
      <td className="py-3 px-2 text-center">
        <div className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap">
          <TrendingUp className="w-3 h-3" />
          <span>+{formattedNewRepos}</span>
        </div>
      </td>

      {/* 6. GÜNCEL SÜRÜM */}
      <td className="py-3 px-2 text-center">
        <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-200/60 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-300/60 dark:border-neutral-700 whitespace-nowrap max-w-[110px] truncate inline-block">
          {cleanVersion}
        </span>
      </td>

      {/* 7. TOPLULUK & KATKIDA BULUNANLAR (Directly in Column) */}
      <td className="py-3 px-1.5 text-center overflow-visible">
        <div className="flex items-center justify-center -space-x-1.5 overflow-visible">
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
                  className="h-5.5 w-5.5 sm:h-6 sm:w-6 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover bg-neutral-800"
                  src={c.avatar_url}
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
      <td className="py-3 px-2 text-center">
        <div className="space-y-0.5 text-center">
          <div className="font-mono font-bold text-xs text-foreground flex items-center justify-center gap-1">
            <GitFork className="w-3 h-3 text-neutral-400" />
            <span>{formattedTotalRepos}</span>
          </div>
          {entry.momentum.topStarredNewRepo && (
            <div className="text-[10px] text-amber-500 font-mono flex items-center justify-center gap-0.5 truncate max-w-[110px] mx-auto">
              <Sparkles className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate">{entry.momentum.topStarredNewRepo.stars} ★</span>
            </div>
          )}
        </div>
      </td>

      {/* 9. GİTHUB (Direct Link) */}
      <td className="py-3 px-2.5 text-center whitespace-nowrap">
        <a
          href={cleanGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cleanName} GitHub`}
          title={`${cleanName} GitHub`}
          className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-[#0066FF] hover:text-white dark:bg-neutral-800 dark:hover:bg-[#CEFF00] dark:hover:text-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-neutral-700 transition-colors shadow-2xs"
        >
          <span className="text-[11px]">Git</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </td>
    </tr>
  );
};

const MobileCard: React.FC<TableRowProps> = ({ entry, maxStars }) => {
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanCreatorName = entry.creator
    ? sanitizeText(entry.creator.name).replace(/\s*\(.*?\)/g, '').trim()
    : 'Açık Kaynak';
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : 'v1.0.0';

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
      className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800 space-y-3.5 transition-colors"
    >
      {/* Top: Blurred Icon Container + Name */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900/10 dark:bg-white/[0.10] border border-neutral-900/15 dark:border-white/[0.15] backdrop-blur-md p-1.5 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              width={34}
              height={34}
              className="w-8 h-8 object-contain shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">{cleanName}</h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] border border-blue-500/20">
          {entry.category}
        </span>
      </div>

      {/* Creator & Güncel Sürüm Info */}
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
          <span className="text-neutral-700 dark:text-neutral-200 font-medium">
            {cleanCreatorName}
          </span>
          <span className="text-[10px] text-neutral-400">({cleanReleaseDate})</span>
        </div>
        <span className="font-mono text-[10px] bg-neutral-200/70 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300 font-semibold border border-neutral-300/60 dark:border-neutral-700">
          {cleanVersion}
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
                src={c.avatar_url}
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
            {formattedTotalRepos} depo
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+{formattedNewRepos}</span>
          </div>

          <a
            href={cleanGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-300/80 dark:border-neutral-700"
            aria-label="GitHub"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
