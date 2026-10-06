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

  // Minimalist 3D isometric topographic elevation / map mesh background
  const renderBackgroundMesh = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.16] dark:opacity-[0.10]"
        viewBox="0 0 1200 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0066FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
          <pattern id="isoDots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1" fill="#0066FF" fillOpacity="0.3" />
          </pattern>
        </defs>

        {/* 3D Isometric Elevation Contours / Topo Map Lines */}
        <path
          d="M -100 360 C 200 340, 350 220, 600 240 C 850 260, 950 140, 1300 120"
          stroke="url(#mapGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M -100 400 C 180 380, 380 260, 620 280 C 860 300, 980 180, 1300 160"
          stroke="url(#mapGradient)"
          strokeWidth="2"
        />
        <path
          d="M -100 440 C 160 420, 410 300, 640 320 C 870 340, 1010 220, 1300 200"
          stroke="url(#mapGradient)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Isometric Coordinate Ridge Lines */}
        <path
          d="M 250 80 L 450 240 L 450 420"
          stroke="#0066FF"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <path
          d="M 600 40 L 800 200 L 800 400"
          stroke="#0066FF"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <path
          d="M 950 20 L 1150 180 L 1150 380"
          stroke="#0066FF"
          strokeWidth="1"
          strokeOpacity="0.35"
        />

        {/* Subtle grid pattern background */}
        <rect width="100%" height="100%" fill="url(#isoDots)" />
      </svg>
    </div>
  );

  // Modern Layered Gradient Button matching user's custom design spec
  const renderCtaButton = (label: string, targetId: string) => (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="bg-gradient-to-b from-blue-400/35 dark:from-blue-500/30 to-transparent p-[3px] rounded-[16px] shadow-sm">
        <button
          onClick={() => scrollToSection(targetId)}
          className="group p-[3px] rounded-[12px] bg-gradient-to-b from-[#0066FF] to-[#0052CC] shadow-[0_2px_8px_rgba(0,102,255,0.35)] active:shadow-[0_1px_3px_rgba(0,102,255,0.4)] active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="bg-gradient-to-b from-white/20 to-transparent rounded-[8px] px-5 py-2 flex items-center justify-center gap-2">
            <span className="font-semibold text-xs text-white tracking-wide">{label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>
      </div>
    </div>
  );

  if (mode === 'security') {
    return (
      <div className="w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Luxury Frosted-Glass Outer Frame / Distinctive High Contrast Border */}
        <div className="p-2 sm:p-2.5 rounded-[36px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-2xl shadow-2xl">
          <div className="relative rounded-[28px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8">
            {renderBackgroundMesh()}

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800 relative z-10 gap-8 lg:gap-0">
              {/* Col 1: Offensive Security - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6">
                <div className="space-y-4 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secOffensiveBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ghidra • Metasploit</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
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
                    <h3 className="font-serif font-bold text-xl text-foreground">
                      {t('showcase.secOffensiveTitle')}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.secOffensiveDesc')}
                    </p>
                  </div>
                </div>

                {renderCtaButton(t('showcase.exploreSecurity'), 'section-security')}
              </div>

              {/* Col 2: Defensive & SAST - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
                <div className="space-y-4 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('showcase.secDefensiveBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <GitFork className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>Trivy • Nuclei</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
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
                    <h3 className="font-serif font-bold text-xl text-foreground">
                      {t('showcase.secDefensiveTitle')}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.secDefensiveDesc')}
                    </p>
                  </div>
                </div>

                {renderCtaButton(t('showcase.exploreSecurity'), 'section-security')}
              </div>

              {/* Col 3: SecOps Stack Hub - Centered */}
              <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
                <div className="space-y-4 w-full flex flex-col items-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{t('showcase.secStackBadge')}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>OWASP ZAP • Nmap</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
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
                    <h3 className="font-serif font-bold text-xl text-foreground">
                      {t('showcase.secStackTitle')}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
                      {t('showcase.secStackDesc')}
                    </p>
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
    <div className="w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Luxury Frosted-Glass Outer Frame / Distinctive High Contrast Border */}
      <div className="p-2 sm:p-2.5 rounded-[36px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/90 dark:border-white/[0.14] backdrop-blur-2xl shadow-2xl transition-all">
        <div className="relative rounded-[28px] bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10">
          {renderBackgroundMesh()}

          {/* 3 Columns Showcase Grid - All Centered */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/90 dark:divide-neutral-800 relative z-10 gap-8 lg:gap-0">
            {/* =========================================================================
                Column 1: Programlama Dilleri (Language Top 1: Python / C) - CENTERED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6">
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Top Mini Badges: Top 1 Language */}
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <Code2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{t('showcase.topLanguageBadge')}</span>
                    <span className="text-[#0066FF] font-bold">Python</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('showcase.top1')}</span>
                    <span className="text-emerald-500 font-normal">251k+ ★</span>
                  </div>
                </div>

                {/* Floating Metric Card - Centered */}
                <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
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

                {/* Title & Description - Centered */}
                <div className="pt-1">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                    {t('sections.languages')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-sm mx-auto">
                    {t('showcase.languagesDesc')}
                  </p>
                </div>
              </div>

              {/* Integrated Layered Gradient Button - Centered */}
              {renderCtaButton(t('showcase.exploreLanguages'), 'section-languages')}
            </div>

            {/* =========================================================================
                Column 2: Framework & Kütüphaneler (Framework Top 1: React) - CENTERED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Top Mini Badges: Top 1 Framework */}
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{t('showcase.topFrameworkBadge')}</span>
                    <span className="text-[#0066FF] font-bold">React</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <GitFork className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t('showcase.top1')}</span>
                    <span className="text-emerald-500 font-normal">230k+ ★</span>
                  </div>
                </div>

                {/* Floating Metric Card - Centered */}
                <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
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

                {/* Title & Description - Centered */}
                <div className="pt-1">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                    {t('sections.frameworks')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-sm mx-auto">
                    {t('showcase.frameworksDesc')}
                  </p>
                </div>
              </div>

              {/* Integrated Layered Gradient Button - Centered */}
              {renderCtaButton(t('showcase.exploreFrameworks'), 'section-frameworks')}
            </div>

            {/* =========================================================================
                Column 3: Veritabanları & Altyapı (Database Top 1: PostgreSQL) - CENTERED
            ========================================================================= */}
            <div className="flex flex-col items-center text-center justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Top Mini Badges: Top 1 Database */}
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <Database className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{t('showcase.topDatabaseBadge')}</span>
                    <span className="text-[#0066FF] font-bold">PostgreSQL</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('showcase.top1')}</span>
                    <span className="text-emerald-500 font-normal">140k+ ★</span>
                  </div>
                </div>

                {/* Floating Metric Card - Matching Columns 1 & 2 */}
                <div className="w-full max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
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

                {/* Title & Description - Centered */}
                <div className="pt-1">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                    {t('sections.databases')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-sm mx-auto">
                    {t('showcase.databasesDesc')}
                  </p>
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
