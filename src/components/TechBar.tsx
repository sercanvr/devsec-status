import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, GitFork, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import { TechEntry } from '../types/tech';
import { sanitizeText, sanitizeUrl } from '../lib/sanitize';

interface TechBarProps {
  entry: TechEntry;
  maxStars: number;
}

export const TechBar: React.FC<TechBarProps> = ({ entry, maxStars }) => {
  const { t } = useTranslation();

  const cleanName = sanitizeText(entry.name);
  const cleanGithubUrl = sanitizeUrl(entry.githubUrl);

  const starPercentage = Math.min(
    100,
    Math.max(8, (entry.popularity.totalStars / (maxStars || 1)) * 100)
  );

  const formattedStars = new Intl.NumberFormat().format(entry.popularity.totalStars);
  const formattedRepos = new Intl.NumberFormat().format(entry.popularity.totalRepos);
  const formattedNewRepos = new Intl.NumberFormat().format(entry.momentum.newReposLast30Days);

  return (
    <div
      data-testid="tech-bar"
      className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3 group relative overflow-hidden"
    >
      {/* Top Row: Icon, Name, Category Badge, GitHub Link */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-2 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform duration-200">
            <img
              src={entry.iconUrl}
              alt={cleanName}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                // Fallback icon if image breaks
                (e.currentTarget as HTMLImageElement).src =
                  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                {cleanName}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-700">
                {entry.category}
              </span>
            </div>
          </div>
        </div>

        {/* GitHub Link */}
        <a
          href={cleanGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1 text-xs font-medium shrink-0"
          title={t('techBar.viewOnGithub')}
        >
          <span className="hidden sm:inline">{t('techBar.viewOnGithub')}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Main Bar: Popularity Visual Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {t('techBar.popularity')}: <strong className="text-slate-800 dark:text-slate-200 font-mono">{formattedStars}</strong> {t('techBar.stars')}
          </span>
          <span className="font-mono text-slate-400 flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {formattedRepos} {t('techBar.repos')}
          </span>
        </div>

        {/* Bar Graphic */}
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-700 ease-out shadow-sm shadow-cyan-500/50"
            style={{ width: `${starPercentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Row: Momentum Metrics */}
      <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800/60 gap-2">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{t('techBar.momentum')}:</span>
          <span className="font-mono font-bold bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md">
            +{formattedNewRepos} {t('techBar.newRepos')}
          </span>
        </div>

        {entry.momentum.topStarredNewRepo && (
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-full">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">
              {t('techBar.topStarred')}: <strong className="text-slate-700 dark:text-slate-300 font-mono">{sanitizeText(entry.momentum.topStarredNewRepo.name)}</strong> ({entry.momentum.topStarredNewRepo.stars} ★)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
