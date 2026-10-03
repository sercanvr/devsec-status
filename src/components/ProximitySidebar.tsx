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
    { id: 'section-languages', label: 'Diller' },
    { id: 'section-frameworks', label: 'Frameworkler' },
    { id: 'section-databases', label: 'Veritabanları' },
    { id: 'section-security', label: 'Güvenlik' },
  ],
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      aria-label="Proximity Navigation Minimap"
      className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center gap-1 py-1">
        {Array.from({ length: 18 }).map((_, index) => {
          const matchedSectionIndex = Math.floor((index / 18) * sections.length);
          const matchedSection = sections[matchedSectionIndex];
          const isActive = matchedSection && activeSection === matchedSection.id;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={index}
              onClick={() => matchedSection && scrollToSection(matchedSection.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={matchedSection?.label}
            >
              <div
                className={`h-0.5 transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 bg-[#CEFF00] shadow-sm shadow-[#CEFF00]'
                    : isHovered
                    ? 'w-6 bg-neutral-300 dark:bg-neutral-300'
                    : index % 4 === 0
                    ? 'w-5 bg-neutral-500/80 dark:bg-neutral-400/80'
                    : 'w-3 bg-neutral-600/40 dark:bg-neutral-600/50'
                }`}
              />
              {/* Tooltip on hover */}
              {isHovered && matchedSection && (
                <span className="absolute left-10 px-2 py-1 rounded bg-neutral-900 text-[#CEFF00] text-[11px] font-mono whitespace-nowrap shadow-lg border border-neutral-700 animate-fade-in pointer-events-none">
                  {matchedSection.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
