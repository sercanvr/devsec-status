import React from 'react';
import { Contrast } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="relative inline-block text-left group">
      <button
        onClick={toggleTheme}
        aria-label={t('nav.themeToggle')}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300/60 dark:border-neutral-700/60 focus:outline-none shrink-0 transition-colors"
      >
        <Contrast className="w-4 h-4 text-neutral-800 dark:text-[#CEFF00]" />
      </button>

      {/* Instant Hover Tooltip */}
      <div className="hidden group-hover:block absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 bg-[#CEFF00] text-[#141414] font-bold text-xs px-3 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#CEFF00]" />
        {t('nav.changeTheme')}
      </div>
    </div>
  );
};


