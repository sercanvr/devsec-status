import React, { useState, useEffect } from 'react';

interface SectionItem {
  id: string;
  label: string;
}

interface ProximitySidebarProps {
  sections?: SectionItem[];
}

export const ProximitySidebar: React.FC<ProximitySidebarProps> = ({
  sections = [
    { id: 'section-frameworks', label: 'Frameworkler' },
    { id: 'section-languages', label: 'Diller' },
    { id: 'section-databases', label: 'Veritabanları' },
    { id: 'section-security', label: 'Güvenlik' },
  ],
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Total dashes in minimap - increased for a longer vertical profile
  const totalDashes = 28;

  // Map each section to a single unique dash index evenly distributed across totalDashes
  const sectionTitleMap = React.useMemo(() => {
    const map = new Map<number, SectionItem>();
    if (!sections.length) return map;
    sections.forEach((sec, idx) => {
      const targetDash = Math.round((idx / Math.max(1, sections.length - 1)) * (totalDashes - 1));
      map.set(targetDash, sec);
    });
    return map;
  }, [sections, totalDashes]);

  const getSectionForDashIndex = (index: number): { section: SectionItem; isTitle: boolean } => {
    if (!sections.length) return { section: { id: '', label: '' }, isTitle: false };
    if (sectionTitleMap.has(index)) {
      return { section: sectionTitleMap.get(index)!, isTitle: true };
    }
    const ratio = index / (totalDashes - 1);
    const closestIdx = Math.min(Math.round(ratio * (sections.length - 1)), sections.length - 1);
    return { section: sections[closestIdx], isTitle: false };
  };

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
        setScrollProgress(progress);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  const scrollToDash = (index: number, sectionId: string, isTitle: boolean) => {
    const el = document.getElementById(sectionId);
    if (isTitle && el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } else {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = (index / (totalDashes - 1)) * totalScroll;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Active center dash index in the array of dashes, dynamically synchronized with scroll position
  const activeDashCenter = Math.min(totalDashes - 1, Math.max(0, Math.round(scrollProgress * (totalDashes - 1))));

  return (
    <div
      aria-label="Proximity Navigation Minimap"
      className="fixed left-2 lg:left-3 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start p-0 select-none pointer-events-auto"
    >
      <div className="flex flex-col items-start gap-1 py-1">
        {Array.from({ length: totalDashes }).map((_, index) => {
          const { section, isTitle } = getSectionForDashIndex(index);

          // Calculate proximity distance from active center dash
          const distance = Math.abs(index - activeDashCenter);
          const isHovered = hoveredIndex === index;

          let widthClass = 'w-6 bg-neutral-300/80 dark:bg-neutral-700/80';
          let glowClass = '';

          if (isHovered) {
            widthClass = 'w-16 bg-neutral-900 dark:bg-white';
            glowClass = 'shadow-sm dark:shadow-[0_0_5px_rgba(255,255,255,0.3)]';
          } else if (distance === 0) {
            widthClass = 'w-16 bg-[#3f6e00] dark:bg-[#CEFF00]';
            glowClass = 'shadow-[0_0_4px_rgba(63,110,0,0.25)] dark:shadow-[0_0_4px_rgba(206,255,0,0.35)]';
          } else if (distance === 1) {
            widthClass = 'w-12 bg-[#3f6e00]/85 dark:bg-[#CEFF00]/80';
            glowClass = 'dark:shadow-[0_0_2px_rgba(206,255,0,0.2)]';
          } else if (distance === 2) {
            widthClass = 'w-10 bg-[#3f6e00]/55 dark:bg-[#CEFF00]/50';
          } else if (distance === 3) {
            widthClass = 'w-8 bg-[#3f6e00]/30 dark:bg-[#CEFF00]/25';
          } else if (isTitle) {
            widthClass = 'w-9 bg-neutral-400 dark:bg-neutral-500';
          }

          return (
            <button
              key={index}
              onClick={() => scrollToDash(index, section.id, isTitle)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-start w-20 py-0.5 sm:py-1 cursor-pointer focus:outline-none"
              aria-label={isTitle ? section.label : undefined}
            >
              <div
                className={`h-0.5 transition-all duration-200 ease-out rounded-full origin-left ${widthClass} ${glowClass}`}
              />

              {/* Tooltip for Section Title Bars or Hovered Dash */}
              {isHovered && isTitle && (
                <span className="absolute left-20 px-2.5 py-1 rounded-md bg-neutral-900 text-[#CEFF00] dark:text-[#CEFF00] text-[11px] font-mono whitespace-nowrap shadow-xl border border-neutral-700 animate-in fade-in slide-in-from-left-1 pointer-events-none z-50">
                  {section.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

