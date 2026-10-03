import React from 'react';
import { Contrast } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      aria-label={t('nav.themeToggle')}
      title={t('nav.themeToggle')}
      className="w-9 h-9 rounded-xl flex items-center justify-center bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300/60 dark:border-neutral-700/60 focus:outline-none shrink-0 transition-colors"
    >
      <Contrast className="w-4 h-4 text-neutral-800 dark:text-[#CEFF00]" />
    </button>
  );
};


