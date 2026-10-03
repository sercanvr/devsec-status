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
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Define dash structure: Title dashes interspaced with sub-item dashes
  // Total 18 dashes, with title bars at specific index points
  const totalDashes = 18;

  const getSectionForDashIndex = (index: number): { section: SectionItem; isTitle: boolean } => {
    const step = Math.floor(totalDashes / sections.length);
    const sectionIdx = Math.min(Math.floor(index / step), sections.length - 1);
    const isTitle = index % step === 0;
    return { section: sections[sectionIdx], isTitle };
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let currentActive = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            currentActive = i;
            break;
          }
        }
      }
      setActiveSectionIndex(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Active center dash index in the array of 18 dashes
  const step = Math.floor(totalDashes / sections.length);
  const activeDashCenter = activeSectionIndex * step;

  return (
    <div
      aria-label="Proximity Navigation Minimap"
      className="fixed left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start p-2.5 rounded-2xl bg-neutral-900/60 dark:bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 shadow-2xl transition-all duration-300 select-none"
    >
      <div className="flex flex-col items-start gap-1.5 py-1">
        {Array.from({ length: totalDashes }).map((_, index) => {
          const { section, isTitle } = getSectionForDashIndex(index);

          // Calculate proximity distance from active center dash
          const distance = Math.abs(index - activeDashCenter);
          const isHovered = hoveredIndex === index;

          // Sound wave proximity scaling logic:
          // Distance 0: Max expansion + bright green glow
          // Distance 1: Medium expansion + soft green
          // Distance 2: Slight expansion
          let widthClass = 'w-3.5 bg-neutral-600/50 dark:bg-neutral-600/60';
          let glowClass = '';

          if (distance === 0) {
            widthClass = 'w-9 bg-[#CEFF00]';
            glowClass = 'shadow-[0_0_10px_#CEFF00]';
          } else if (distance === 1) {
            widthClass = 'w-7 bg-[#CEFF00]/70';
            glowClass = 'shadow-[0_0_6px_rgba(206,255,0,0.4)]';
          } else if (distance === 2) {
            widthClass = 'w-5.5 bg-neutral-400 dark:bg-neutral-300';
          } else if (isTitle) {
            widthClass = 'w-6 bg-neutral-400/80 dark:bg-neutral-400/80';
          }

          if (isHovered) {
            widthClass = 'w-8 bg-white dark:bg-white';
            glowClass = 'shadow-[0_0_8px_rgba(255,255,255,0.6)]';
          }

          return (
            <button
              key={index}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-start py-0.5 focus:outline-none"
              aria-label={isTitle ? section.label : undefined}
            >
              <div
                className={`h-1 transition-all duration-300 rounded-full origin-left ${widthClass} ${glowClass}`}
              />

              {/* Tooltip ONLY for Section Title Bars on hover */}
              {isHovered && isTitle && (
                <span className="absolute left-11 px-2.5 py-1 rounded-md bg-neutral-900 text-[#CEFF00] text-[11px] font-mono whitespace-nowrap shadow-xl border border-neutral-700 animate-in fade-in slide-in-from-left-1 pointer-events-none z-50">
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

