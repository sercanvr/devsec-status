import React from 'react';
import {
  Code2,
  Layers,
  Database,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  GitFork,
  ArrowRight,
  PieChart as PieChartIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WorldMap } from './WorldMap';

interface HeaderShowcaseProps {
  mode?: 'software' | 'security';
}

export const HeaderShowcase: React.FC<HeaderShowcaseProps> = ({ mode = 'software' }) => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };



  // Clean, sleek CTA Button with single gradient border and internal highlight (no ghost outer double border)
  const renderCtaButton = (label: string, targetId: string) => (
    <div className="flex justify-center items-center w-full mt-2.5">
      <button
        onClick={() => scrollToSection(targetId)}
        className="group p-[2px] rounded-[13px] bg-gradient-to-b from-[#0066FF] to-[#0052CC] shadow-[0_2px_10px_rgba(0,102,255,0.35)] hover:shadow-[0_4px_14px_rgba(0,102,255,0.45)] active:scale-[0.98] transition-all duration-150 cursor-pointer"
      >
        <div className="bg-gradient-to-b from-white/20 to-transparent rounded-[11px] px-5 py-2 flex items-center justify-center gap-2">
          <span className="font-semibold text-xs text-white tracking-wide">{label}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>
    </div>
  );

  if (mode === 'security') {
    return (
      <div className="w-full py-4 sm:py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Luxury Frosted-Glass Outer Frame - Slimmer border & padding */}
        <div className="p-1.5 rounded-[30px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-md shadow-2xl">
          <div className="relative rounded-[24px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-5 sm:p-6 lg:p-7">
            <WorldMap lineColor="#0066FF" className="absolute inset-0 pointer-events-none select-none opacity-45 dark:opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]" />

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800 relative z-10 gap-6 lg:gap-0">
              {/* Col 1: Offensive Security - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secOffensiveBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ghidra • Metasploit</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.secResearchVolume')}
                        </div>
                        <div className="font-bold text-sm text-foreground">420,000+ ★</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      +32%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                        {t('showcase.secOffensiveTitle')}
                      </span>
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.secOffensiveDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {renderCtaButton(t('showcase.exploreSecurity'), 'section-security')}
              </div>

              {/* Col 2: Defensive & SAST - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6 pt-5 lg:pt-0">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('showcase.secDefensiveBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <GitFork className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>Trivy • Nuclei</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.secVulnScan')}
                        </div>
                        <div className="font-bold text-sm text-foreground">85,000+ Repo</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      +48%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                        {t('showcase.secDefensiveTitle')}
                      </span>
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.secDefensiveDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {renderCtaButton(t('showcase.exploreSecurity'), 'section-security')}
              </div>

              {/* Col 3: SecOps Stack Hub - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6 pt-5 lg:pt-0">
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap min-h-[44px]">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secStackBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>OWASP ZAP • Nmap</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                        <PieChartIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                          {t('showcase.totalEcosystem')}
                        </div>
                        <div className="font-bold text-sm text-foreground">1,250,000+</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      +28%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                        {t('showcase.secStackTitle')}
                      </span>
                    </h3>
                    <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed max-w-sm mx-auto">
                        {t('showcase.secStackDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {renderCtaButton(t('showcase.exploreSecurity'), 'section-security')}
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
      {/* Luxury Frosted-Glass Outer Frame - Slimmer border & padding */}
      <div className="p-1.5 rounded-[30px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-md shadow-2xl transition-colors duration-200">
        <div className="relative rounded-[24px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-5 sm:p-6 lg:p-7">
          <WorldMap lineColor="#0066FF" className="absolute inset-0 pointer-events-none select-none opacity-45 dark:opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]" />

          {/* 3 Columns Showcase Grid - All Centered */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/90 dark:divide-neutral-800 relative z-10 gap-6 lg:gap-0">
            {/* =========================================================================
                Column 1: Programlama Dilleri (Language Top 1: Python) - CENTERED & BALANCED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6 h-full my-auto">
              <div className="space-y-3 w-full flex flex-col items-center">
                {/* Top Mini Badges: Balanced height across all columns */}
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <Code2 className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topLanguageBadge')}</span>
                      <span className="text-[#0066FF] font-bold">Python</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('showcase.top1')}</span>
                      <span className="text-emerald-500 font-normal">251k+ ★</span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Card - Centered with blur show-through */}
                <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                        {t('showcase.totalStars')}
                      </div>
                      <div className="font-bold text-sm text-foreground">1,480,210 ★</div>
                    </div>
                  </div>

                  {/* Mini Sparkline Chart */}
                  <div className="flex items-center gap-2">
                    <svg className="w-12 h-6 text-[#0066FF]" viewBox="0 0 50 25" fill="none">
                      <path
                        d="M 2 20 Q 15 18, 25 10 T 48 3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-[#0066FF] border border-blue-500/20">
                      +%25.5
                    </span>
                  </div>
                </div>

                {/* Title & Description - Centered & Balanced Height */}
                <div className="pt-0.5 w-full">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                      {t('sections.languages')}
                    </span>
                  </h3>
                  <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.languagesDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Integrated Layered Gradient Button - Centered */}
              {renderCtaButton(t('showcase.exploreLanguages'), 'section-languages')}
            </div>

            {/* =========================================================================
                Column 2: Framework & Kütüphaneler (Framework Top 1: React) - CENTERED & BALANCED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6 pt-5 lg:pt-0 h-full my-auto">
              <div className="space-y-3 w-full flex flex-col items-center">
                {/* Top Mini Badges: Balanced height across all columns */}
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topFrameworkBadge')}</span>
                      <span className="text-[#0066FF] font-bold">React</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <GitFork className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('showcase.top1')}</span>
                      <span className="text-emerald-500 font-normal">230k+ ★</span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Card - Centered with blur show-through */}
                <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                        {t('showcase.totalEngagements')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-foreground">2,120,490</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          +%49
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-neutral-400">{t('showcase.grossMomentum')}</div>
                    <div className="text-xs font-bold font-mono text-foreground">%10.5</div>
                  </div>
                </div>

                {/* Title & Description - Centered & Balanced Height */}
                <div className="pt-0.5 w-full">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                      {t('sections.frameworks')}
                    </span>
                  </h3>
                  <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.frameworksDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Integrated Layered Gradient Button - Centered */}
              {renderCtaButton(t('showcase.exploreFrameworks'), 'section-frameworks')}
            </div>

            {/* =========================================================================
                Column 3: Veritabanları & Altyapı (Database Top 1: PostgreSQL) - CENTERED & BALANCED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-4 lg:px-6 pt-5 lg:pt-0 h-full my-auto">
              <div className="space-y-3 w-full flex flex-col items-center">
                {/* Top Mini Badges: Balanced height across all columns */}
                <div className="min-h-[44px] flex items-center justify-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <Database className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.topDatabaseBadge')}</span>
                      <span className="text-[#0066FF] font-bold">PostgreSQL</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('showcase.top1')}</span>
                      <span className="text-emerald-500 font-normal">140k+ ★</span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Card - Matching Columns 1 & 2 */}
                <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-white/75 dark:bg-neutral-900/75 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                        {t('showcase.totalDatabases')}
                      </div>
                      <div className="font-bold text-sm text-foreground">890,400 ★</div>
                    </div>
                  </div>

                  {/* Mini Sparkline Chart */}
                  <div className="flex items-center gap-2">
                    <svg className="w-12 h-6 text-[#0066FF]" viewBox="0 0 50 25" fill="none">
                      <path
                        d="M 2 18 Q 15 15, 25 8 T 48 4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      +18.4%
                    </span>
                  </div>
                </div>

                {/* Title & Description - Centered & Balanced Height */}
                <div className="pt-0.5 w-full">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                      {t('sections.databases')}
                    </span>
                  </h3>
                  <div className="min-h-[46px] sm:min-h-[50px] flex items-center justify-center">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.databasesDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Integrated Layered Gradient Button - Centered */}
              {renderCtaButton(t('showcase.exploreDatabases'), 'section-databases')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
