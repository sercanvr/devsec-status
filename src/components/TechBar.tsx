import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, GitFork, ExternalLink, TrendingUp, Sparkles, Calendar, Tag } from 'lucide-react';
import { TechEntry } from '../types/tech';
import { sanitizeText, sanitizeUrl } from '../lib/sanitize';
import { useGitHubContributors } from '../hooks/useGitHubContributors';
import { useGitHubRelease } from '../hooks/useGitHubRelease';

interface TechBarProps {
  entry: TechEntry;
  maxStars: number;
}

export const TechBar: React.FC<TechBarProps> = ({ entry, maxStars }) => {
  const { t } = useTranslation();
  const contributors = useGitHubContributors(entry.githubUrl, entry.contributors);

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);
  const cleanSubCategory = entry.subCategory ? sanitizeText(entry.subCategory) : '';
  const cleanCreatorName = entry.creator ? sanitizeText(entry.creator.name) : '';
  const cleanReleaseDate = entry.creator ? sanitizeText(entry.creator.releaseDate) : '';
  const cleanVersion = entry.creator && entry.creator.latestVersion ? sanitizeText(entry.creator.latestVersion) : '';
  const liveVersion = useGitHubRelease(entry.githubUrl, cleanVersion);

  const starPercentage = Math.min(
    100,
    Math.max(8, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );

  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedRepos = new Intl.NumberFormat().format(entry.popularity.totalRepos);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);

  const categoryLabel = t(`categories.${entry.category}`, entry.category);

  return (
    <div
      data-testid="tech-bar"
      className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3 group relative overflow-hidden"
    >
      {/* Top Row: Icon, Name, Creator Info, Category Badge, GitHub Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={entry.iconUrl}
            alt={cleanName}
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0 filter drop-shadow-sm transition-colors"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (!img.dataset.failed) {
                img.dataset.failed = 'true';
                img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
              }
            }}
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-foreground group-hover:text-[#CEFF00] transition-colors">
                {cleanName}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full tracking-wider bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold border border-neutral-300 dark:border-neutral-700">
                {categoryLabel}
              </span>
              {cleanSubCategory && (
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#CEFF00]/15 text-neutral-900 dark:text-[#CEFF00] font-semibold border border-[#CEFF00]/30">
                  {cleanSubCategory}
                </span>
              )}
            </div>

            {/* Educational Creator & Version Metadata Sub-row */}
            {entry.creator && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {/* Creator Avatar & Name */}
                <div className="flex items-center gap-1.5 font-medium">
                  <img
                    src={entry.creator.avatarUrl}
                    alt={cleanCreatorName}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 object-cover shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="text-foreground font-semibold">{cleanCreatorName}</span>
                </div>

                {/* Release Date */}
                {cleanReleaseDate && (
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{cleanReleaseDate}</span>
                  </div>
                )}

                {/* Latest Version */}
                {liveVersion && (
                  <div className="flex items-center gap-1 text-[11px]">
                    <Tag className="w-3 h-3 text-[#CEFF00] shrink-0" />
                    <span className="font-mono bg-neutral-200/70 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-foreground font-semibold">
                      {liveVersion}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* GitHub Link */}
        <a
          href={cleanGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cleanName} - ${t('techBar.viewOnGithub')}`}
          className="p-2 rounded-xl text-neutral-500 hover:text-[#141414] hover:bg-[#CEFF00] dark:text-neutral-400 dark:hover:text-[#141414] dark:hover:bg-[#CEFF00] transition-none flex items-center gap-1 text-xs font-medium shrink-0 self-start sm:self-center"
          title={t('techBar.viewOnGithub')}
        >
          <span className="hidden sm:inline font-sans">{t('techBar.viewOnGithub')}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Main Bar: Popularity Visual Progress */}
      <div className="space-y-1.5 mt-1">
        <div className="flex justify-between items-center text-xs text-neutral-600 dark:text-neutral-400">
          <span className="font-medium flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {t('techBar.popularity')}: <strong className="text-foreground font-mono">{formattedStars}</strong> {t('techBar.stars')}
          </span>
          <span className="font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {formattedRepos} {t('techBar.repos')}
          </span>
        </div>

        {/* Bar Graphic */}
        <div className="h-3 w-full bg-neutral-200/90 dark:bg-neutral-800/90 rounded-full overflow-hidden p-0.5 border border-neutral-300/60 dark:border-neutral-700/80">
          <div
            className="h-full rounded-full bg-[#CEFF00] transition-all duration-700 ease-out shadow-sm shadow-[#CEFF00]/50"
            style={{ width: `${starPercentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Row: Momentum Metrics & Contributor Avatars Stack */}
      <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-neutral-200 dark:border-neutral-800/80 gap-3">
        <div className="flex items-center gap-1.5 text-foreground dark:text-[#CEFF00] font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-[#CEFF00]" />
          <span>{t('techBar.momentum')}:</span>
          <span className="font-mono font-bold bg-[#CEFF00]/20 text-neutral-900 dark:text-[#CEFF00] px-2 py-0.5 rounded-md border border-[#CEFF00]/30">
            +{formattedNewRepos} {t('techBar.newRepos')}
          </span>
        </div>

        {/* Real Live 4 Contributor Avatars Stack */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-200/60 dark:bg-neutral-900/80 border border-neutral-300/60 dark:border-neutral-800 shrink-0">
          <div className="flex -space-x-2">
            {contributors.slice(0, 4).map((c, idx) => (
              <div key={c.login + idx} className="relative group/contributor inline-block hover:z-20">
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contributor: ${c.login}`}
                  className="inline-block transition-transform duration-150 group-hover/contributor:-translate-y-1 relative"
                >
                  <img
                    className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover bg-neutral-800"
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
                <div className="hidden group-hover/contributor:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#141414] dark:bg-neutral-800 text-white text-[10px] font-mono whitespace-nowrap shadow-lg border border-neutral-700 pointer-events-none z-30">
                  {c.login}
                </div>
              </div>
            ))}
          </div>
          <div className="h-3.5 w-px bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 font-mono">
            Contributors
          </span>
        </div>

        {entry.momentum.topStarredNewRepo && (
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-[11px] truncate max-w-full">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">
              {t('techBar.topStarred')}: <strong className="text-foreground font-mono">{sanitizeText(entry.momentum.topStarredNewRepo.name)}</strong> ({entry.momentum.topStarredNewRepo.stars} ★)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
