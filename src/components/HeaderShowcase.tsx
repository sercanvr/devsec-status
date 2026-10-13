import React, { useMemo } from 'react';
import {
  Code2,
  Layers,
  Database,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  GitFork,
  PieChart as PieChartIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WorldMap } from './WorldMap';
import { formatNumber } from '../lib/formatNumber';
import { TechEntry } from '../types/tech';

import rawLanguages from '../data/languages.json';
import rawFrameworks from '../data/frameworks.json';
import rawDatabases from '../data/databases.json';
import rawSecurityTools from '../data/security-tools.json';

interface HeaderShowcaseProps {
  mode?: 'software' | 'security';
}

export const HeaderShowcase: React.FC<HeaderShowcaseProps> = ({ mode = 'software' }) => {
  const { t, i18n } = useTranslation();

  // Dynamically compute real metrics from dataset files for Software mode
  const languagesData = rawLanguages as TechEntry[];
  const frameworksData = rawFrameworks as TechEntry[];
  const databasesData = rawDatabases as TechEntry[];
  const securityToolsData = rawSecurityTools as TechEntry[];

  const totalLanguageStars = useMemo(
    () => languagesData.reduce((acc, item) => acc + (item.popularity?.totalStars || 0), 0),
    [languagesData]
  );
  const topVolumeLanguage = useMemo(
    () => [...languagesData].sort((a, b) => b.popularity.totalRepos - a.popularity.totalRepos)[0],
    [languagesData]
  );
  const topStarredLanguage = useMemo(
    () => [...languagesData].sort((a, b) => b.popularity.totalStars - a.popularity.totalStars)[0],
    [languagesData]
  );

  const totalFrameworkStars = useMemo(
    () => frameworksData.reduce((acc, item) => acc + (item.popularity?.totalStars || 0), 0),
    [frameworksData]
  );
  const totalFrameworkMomentum = useMemo(
    () => frameworksData.reduce((acc, item) => acc + (item.momentum?.newReposLast30Days || 0), 0),
    [frameworksData]
  );
  const topFramework = useMemo(
    () => [...frameworksData].sort((a, b) => b.popularity.totalStars - a.popularity.totalStars)[0],
    [frameworksData]
  );

  const totalDatabaseStars = useMemo(
    () => databasesData.reduce((acc, item) => acc + (item.popularity?.totalStars || 0), 0),
    [databasesData]
  );
  const totalDatabaseMomentum = useMemo(
    () => databasesData.reduce((acc, item) => acc + (item.momentum?.newReposLast30Days || 0), 0),
    [databasesData]
  );
  const topDatabase = useMemo(
    () => [...databasesData].sort((a, b) => b.popularity.totalStars - a.popularity.totalStars)[0],
    [databasesData]
  );

  // Security mode metrics
  const totalSecurityStars = useMemo(
    () => securityToolsData.reduce((acc, item) => acc + (item.popularity?.totalStars || 0), 0),
    [securityToolsData]
  );
  const totalSecurityRepos = useMemo(
    () => securityToolsData.reduce((acc, item) => acc + (item.popularity?.totalRepos || 0), 0),
    [securityToolsData]
  );
  const totalSecurityMomentum = useMemo(
    () => securityToolsData.reduce((acc, item) => acc + (item.momentum?.newReposLast30Days || 0), 0),
    [securityToolsData]
  );
  const topSecurityTool = useMemo(
    () => [...securityToolsData].sort((a, b) => b.popularity.totalStars - a.popularity.totalStars)[0],
    [securityToolsData]
  );

  if (mode === 'security') {
    return (
      <div className="w-full py-4 sm:py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-1.5 rounded-[30px] bg-neutral-200/70 dark:bg-white/[0.06] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-md card-layered-shadow isolate overflow-hidden">
          <div className="relative rounded-[24px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-5 sm:p-6 lg:p-7">
            <WorldMap lineColor="#10B981" className="opacity-70 dark:opacity-60" />

            <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10 gap-6 lg:gap-8 items-start">
              {/* Col 1: Offensive Security */}
              <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secOffensiveBadge')}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ghidra • Metasploit</span>
                    </div>
                  </div>

                  <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                          <PieChartIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                            {t('showcase.totalStars')}
                          </div>
                          <div className="font-bold text-sm text-foreground">
                            {formatNumber(totalSecurityStars, i18n.language)} ★
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {securityToolsData.length} Tools
                      </span>
                    </div>

                    <div className="pt-3.5 text-center">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                        {t('showcase.secOffensiveTitle')}
                      </h3>
                      <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                        <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                          {t('showcase.secOffensiveDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 2: Defensive & SAST */}
              <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6 pt-5 lg:pt-0">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('showcase.secDefensiveBadge')}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <GitFork className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>Trivy • Nuclei</span>
                    </div>
                  </div>

                  <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                          <PieChartIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                            {t('showcase.secVulnScan')}
                          </div>
                          <div className="font-bold text-sm text-foreground">
                            {formatNumber(totalSecurityRepos, i18n.language)} Repos
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20">
                        +{formatNumber(totalSecurityMomentum, i18n.language)} (30d)
                      </span>
                    </div>

                    <div className="pt-3.5 text-center">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                        {t('showcase.secDefensiveTitle')}
                      </h3>
                      <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                        <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                          {t('showcase.secDefensiveDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: SecOps Stack Hub */}
              <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6 pt-5 lg:pt-0">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secStackBadge')}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>OWASP ZAP • Nmap</span>
                    </div>
                  </div>

                  <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                          <PieChartIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                            {t('showcase.top1')}
                          </div>
                          <div className="font-bold text-sm text-foreground">
                            {topSecurityTool?.name} • {formatNumber(topSecurityTool?.popularity.totalStars || 0, i18n.language)} ★
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {t('table.openSource')}
                      </span>
                    </div>

                    <div className="pt-3.5 text-center">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                        {t('showcase.secStackTitle')}
                      </h3>
                      <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                        <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                          {t('showcase.secStackDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Software Page Showcase (Programlama Dilleri, Frameworkler, Veritabanları)
  return (
    <div className="w-full py-4 sm:py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="p-1.5 rounded-[30px] bg-neutral-200/70 dark:bg-white/[0.06] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-md card-layered-shadow transition-colors duration-200 isolate overflow-hidden">
        <div className="relative rounded-[24px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-5 sm:p-6 lg:p-7">
          <WorldMap lineColor="#E36A17" className="opacity-70 dark:opacity-60" />

          <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10 gap-6 lg:gap-8 items-start">
            {/* Column 1: Programlama Dilleri */}
            <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6">
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Code2 className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topLanguageBadge')}:</span>
                      <span className="text-[#0066FF] font-bold">
                        {topVolumeLanguage ? `${topVolumeLanguage.name} (${formatNumber(topVolumeLanguage.popularity.totalRepos, i18n.language)})` : 'Python'}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('showcase.topStarredLanguageBadge')}:</span>
                      <span className="text-emerald-500 font-normal">
                        {topStarredLanguage ? `${topStarredLanguage.name} • ${formatNumber(topStarredLanguage.popularity.totalStars, i18n.language)} ★` : 'C • 251k+ ★'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.totalStars')}
                        </div>
                        <div className="font-bold text-sm text-foreground">
                          {formatNumber(totalLanguageStars, i18n.language)} ★
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-[#0066FF] border border-blue-500/20">
                      {languagesData.length} {t('sections.languages')}
                    </span>
                  </div>

                  <div className="pt-3.5 text-center">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                      {t('sections.languages')}
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                      <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.languagesDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Framework & Kütüphaneler */}
            <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6 pt-5 lg:pt-0">
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topFrameworkBadge')}:</span>
                      <span className="text-[#0066FF] font-bold">{topFramework?.name || 'React'}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <GitFork className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('showcase.top1')}:</span>
                      <span className="text-emerald-500 font-normal">
                        {topFramework ? `${formatNumber(topFramework.popularity.totalStars, i18n.language)} ★` : '230k+ ★'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.totalStars')}
                        </div>
                        <div className="font-bold text-sm text-foreground">
                          {formatNumber(totalFrameworkStars, i18n.language)} ★
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-neutral-400">{t('showcase.momentum')}</div>
                      <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        +{formatNumber(totalFrameworkMomentum, i18n.language)} (30d)
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 text-center">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                      {t('sections.frameworks')}
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                      <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.frameworksDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Veritabanları */}
            <div className="flex flex-col items-center text-center justify-start space-y-4 lg:px-6 pt-5 lg:pt-0">
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Database className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topDatabaseBadge')}:</span>
                      <span className="text-[#0066FF] font-bold">{topDatabase?.name || 'Supabase'}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-400/80 dark:border-white/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('showcase.top1')}:</span>
                      <span className="text-emerald-500 font-normal">
                        {topDatabase ? `${formatNumber(topDatabase.popularity.totalStars, i18n.language)} ★` : '110k+ ★'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-neutral-400/80 dark:border-white/20 shadow-lg shadow-black/5 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300/60 dark:border-white/10">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.totalDatabases')}
                        </div>
                        <div className="font-bold text-sm text-foreground">
                          {formatNumber(totalDatabaseStars, i18n.language)} ★
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-neutral-400">{t('showcase.momentum')}</div>
                      <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        +{formatNumber(totalDatabaseMomentum, i18n.language)} (30d)
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 text-center">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-50 drop-shadow-sm">
                      {t('sections.databases')}
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center mt-1">
                      <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.databasesDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
