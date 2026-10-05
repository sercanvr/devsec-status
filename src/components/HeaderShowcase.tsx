import React from 'react';
import { useTranslation } from 'react-i18next';
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

  if (mode === 'security') {
    return (
      <div className="w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8">
          {/* Blueprint vector road/highway background graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sec-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0066FF" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sec-grid)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800 relative z-10 gap-6 lg:gap-0">
            {/* Col 1: Offensive Security */}
            <div className="flex flex-col justify-between space-y-5 lg:px-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Saldırı & Keşif</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ghidra • Metasploit</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Araştırma Hacmi</div>
                      <div className="font-bold text-sm text-foreground">420,000+ Yıldız</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    +%32 İvme
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Ofansif Güvenlik Araçları</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    Tersine mühendislik, sızma testleri ve exploit araştırmalarında kullanılan açık kaynak araçların topluluk momentumu.
                  </p>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('section-security')}
                className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Araçları Keşfet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Col 2: Defensive & SAST */}
            <div className="flex flex-col justify-between space-y-5 lg:px-6 pt-6 lg:pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Savunma & SAST</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700">
                    <GitFork className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Trivy • Nuclei</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Zafiyet Taraması</div>
                      <div className="font-bold text-sm text-foreground">85,000+ Günlük Repo</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20">
                    +48%
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Defansif & Statik Analiz</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    Konteyner tarama, kod zafiyeti tespiti (SAST/DAST) ve güvenli yazılım geliştirme döngüsü araçları.
                  </p>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('section-security')}
                className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Taramaları İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Col 3: SecOps Stack Hub */}
            <div className="flex flex-col justify-between space-y-5 lg:px-6 pt-6 lg:pt-0">
              <div className="space-y-4">
                {/* Circular Partner Hub (Image 1 Style) */}
                <div className="relative w-44 h-28 mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 border-2 border-[#0066FF] shadow-lg flex items-center justify-center z-10">
                    <ShieldCheck className="w-6 h-6 text-[#0066FF]" />
                  </div>
                  <div className="absolute top-1 left-2 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[9px] font-bold">
                    ZAP
                  </div>
                  <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[9px] font-bold">
                    Nmap
                  </div>
                  <div className="absolute bottom-1 left-6 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[9px] font-bold">
                    Trivy
                  </div>
                  <div className="absolute bottom-1 right-6 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[9px] font-bold">
                    Nuclei
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">Siber Güvenlik Yığını</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    Etik güvenlik araştırmalarında, CI/CD pipeline korumasında ve CTF süreçlerinde kullanılan küresel araçlar.
                  </p>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('section-security')}
                className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Yığını İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Software Page Showcase (Birebir Image 1 Tasarımı)
  return (
    <div className="w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Card with Blueprint / Grid Line Graphics (Image 1) */}
      <div className="relative rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10">
        {/* Subtle blueprint highway vector lines & grid in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Architectural Road Lines Vector (Electric Blue from Image 1) */}
          <svg
            className="absolute top-0 right-0 w-full h-full opacity-[0.14] dark:opacity-[0.08]"
            viewBox="0 0 1200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 500 0 C 530 80, 560 120, 600 200 C 640 280, 700 360, 750 400"
              stroke="#0066FF"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 480 0 C 510 80, 540 120, 580 200 C 620 280, 680 360, 730 400"
              stroke="#0066FF"
              strokeWidth="8"
            />
            <path
              d="M 0 350 C 300 320, 500 180, 900 80 C 1050 40, 1150 20, 1200 0"
              stroke="#0066FF"
              strokeWidth="12"
            />
            {/* Grid pattern */}
            <defs>
              <pattern id="soft-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#soft-grid)" />
          </svg>
        </div>

        {/* 3 Columns Showcase Grid (Image 1 Structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/90 dark:divide-neutral-800 relative z-10 gap-8 lg:gap-0">
          {/* =========================================================================
              Column 1: Capacity for Carrier Sales -> Programlama Dilleri Ekosistemi
          ========================================================================= */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6">
            <div className="space-y-4">
              {/* Top Mini Badges (Image 1: Carriers 979 / Saved Time 129 Hr) */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  <Code2 className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>24 Çekirdek Dil</span>
                  <span className="text-neutral-400 font-normal">| %100 Açık</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Python #1</span>
                  <span className="text-emerald-500 font-normal">62k+ ★</span>
                </div>
              </div>

              {/* Floating Pill/Card (Image 1: Revenue $176,513 Margin 25.5%) */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                    <PieChartIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Toplam Yıldız</div>
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

              {/* Title & Description */}
              <div className="pt-1">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                  Programlama Dilleri
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Sistem, web, veri bilimi ve yapay zekâda en çok tercih edilen 24 çekirdek dilin gerçek zamanlı GitHub kullanım, repo hacmi ve popülarite ivmesi.
                </p>
              </div>
            </div>

            {/* Pill CTA Button (Image 1: Learn More >) */}
            <button
              onClick={() => scrollToSection('section-languages')}
              className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer group"
            >
              <span>Dilleri İncele</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* =========================================================================
              Column 2: Advantage for Shipper Sales -> Framework & Kütüphane Gücü
          ========================================================================= */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
            <div className="space-y-4">
              {/* Top Mini Badges (Image 1: Bids 979 / Loads 99) */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>11 Framework</span>
                  <span className="text-neutral-400 font-normal">| Web & App</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  <GitFork className="w-3.5 h-3.5 text-emerald-500" />
                  <span>5.2M+ Repolar</span>
                  <span className="text-emerald-500 font-normal">+49%</span>
                </div>
              </div>

              {/* Floating Pill/Card (Image 1: Revenue $176,513 (+%49) Gross Margin: 10.5%) */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-[#0066FF]">
                    <PieChartIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Toplam Etkileşim</div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-foreground">2,120,490</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        +%49
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-neutral-400">Brüt İvme</div>
                  <div className="text-xs font-bold font-mono text-foreground">%10.5</div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="pt-1">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                  Framework & Kütüphaneler
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  React, Next.js, FastAPI ve Vue gibi modern uygulama geliştirme kütüphanelerinin gerçek zamanlı geliştirici kabul oranları ve sürüm ivmelenme metrikleri.
                </p>
              </div>
            </div>

            {/* Pill CTA Button (Image 1: Learn More >) */}
            <button
              onClick={() => scrollToSection('section-frameworks')}
              className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer group"
            >
              <span>Framework'leri İncele</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* =========================================================================
              Column 3: Our Tech Stack -> Modern Teknoloji & Veritabanı Yığını
          ========================================================================= */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 pt-6 lg:pt-0">
            <div className="space-y-4">
              {/* Circular Partner Logo Hub (Birebir Image 1: Our Tech Stack Hub) */}
              <div className="relative w-48 h-28 mx-auto flex items-center justify-center">
                {/* Center Hub Circle with DevSec Logo */}
                <div className="w-14 h-14 rounded-full bg-white dark:bg-neutral-800 border-2 border-[#0066FF] shadow-xl flex items-center justify-center z-10 p-2">
                  <img
                    src="/icons/devsec-icon.webp"
                    alt="DevSec"
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Orbital Satellite 1: PostgreSQL (Top Left) */}
                <div
                  className="absolute top-0 left-2 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 hover:scale-110 transition-transform"
                  title="PostgreSQL"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                    alt="PostgreSQL"
                    className="w-5 h-5 object-contain"
                  />
                </div>

                {/* Orbital Satellite 2: Redis (Top Right) */}
                <div
                  className="absolute top-0 right-2 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 hover:scale-110 transition-transform"
                  title="Redis"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
                    alt="Redis"
                    className="w-5 h-5 object-contain"
                  />
                </div>

                {/* Orbital Satellite 3: Supabase (Bottom Left) */}
                <div
                  className="absolute bottom-0 left-4 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 hover:scale-110 transition-transform"
                  title="Supabase"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
                    alt="Supabase"
                    className="w-5 h-5 object-contain"
                  />
                </div>

                {/* Orbital Satellite 4: MongoDB (Bottom Right) */}
                <div
                  className="absolute bottom-0 right-4 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1.5 hover:scale-110 transition-transform"
                  title="MongoDB"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                    alt="MongoDB"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div className="pt-1">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                  Veritabanları & Altyapı
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  İlişkisel, NoSQL, in-memory ve arama motoru veritabanlarının kurumsal mimarilerdeki aktif kabul oranları ve canlı repo istatistikleri.
                </p>
              </div>
            </div>

            {/* Pill CTA Button (Image 1: Learn More >) */}
            <button
              onClick={() => scrollToSection('section-databases')}
              className="w-full sm:w-auto self-start mt-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer group"
            >
              <span>Veritabanlarını İncele</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
