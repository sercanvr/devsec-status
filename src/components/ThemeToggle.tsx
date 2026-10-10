import React, { useState, useRef, useEffect } from 'react';
import { Contrast, Check } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  onToggleTheme?: () => void;
  mobileMode?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  onToggleTheme,
  mobileMode = false,
}) => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleSelectTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  if (mobileMode) {
    const currentThemeLabel = theme === 'dark' ? t('nav.darkTheme') : t('nav.lightTheme');

    return (
      <div className="relative flex flex-col items-center" ref={dropdownRef}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="w-56 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-sm font-medium transition-colors shadow-sm cursor-pointer"
          aria-label={t('nav.changeTheme')}
        >
          <div className="flex items-center gap-2.5">
            <Contrast className={`w-4 h-4 text-neutral-800 dark:text-neutral-200 transition-none ${theme === 'light' ? '-scale-x-100' : 'scale-x-100'}`} />
            <span>{currentThemeLabel}</span>
          </div>
          <Check className="w-4 h-4 text-[#CEFF00]" />
        </button>

        {isOpen && (
          <div className="w-56 mt-2 rounded-2xl bg-neutral-200/95 dark:bg-neutral-900/95 border border-neutral-300 dark:border-neutral-700 shadow-xl overflow-hidden py-1.5 z-50">
            <button
              onClick={() => handleSelectTheme('dark')}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors ${
                theme === 'dark'
                  ? 'bg-[#CEFF00]/15 text-foreground font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/60 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Contrast className="w-3.5 h-3.5 text-neutral-400 scale-x-100 transition-none" />
                <span>{t('nav.darkTheme')}</span>
              </div>
              {theme === 'dark' && <Check className="w-4 h-4 text-[#CEFF00]" />}
            </button>

            <button
              onClick={() => handleSelectTheme('light')}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors ${
                theme === 'light'
                  ? 'bg-[#CEFF00]/15 text-foreground font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/60 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Contrast className="w-3.5 h-3.5 text-neutral-400 -scale-x-100 transition-none" />
                <span>{t('nav.lightTheme')}</span>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-[#CEFF00]" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left group z-30">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleTheme();
          if (onToggleTheme) onToggleTheme();
        }}
        aria-label={t('nav.themeToggle')}
        className="w-16 sm:w-20 h-9 rounded-xl flex items-center justify-center gap-1.5 bg-neutral-300/85 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 border border-neutral-400/80 dark:border-neutral-700/60 focus:outline-none shrink-0 transition-none hover:text-black dark:hover:text-white"
      >
        <Contrast className={`w-4 h-4 text-neutral-900 dark:text-neutral-200 transition-none ${theme === 'light' ? '-scale-x-100' : 'scale-x-100'}`} />
      </button>

      {/* Instant Hover Tooltip shifted to match navbar frame */}
      <div className="hidden group-hover:block absolute top-[calc(100%+25px)] left-1/2 -translate-x-1/2 z-[70] bg-[#CEFF00] text-[#141414] font-bold text-xs px-3 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#CEFF00]" />
        {t('nav.changeTheme')}
      </div>
    </div>
  );
};


