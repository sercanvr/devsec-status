import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      aria-label={t('nav.themeToggle')}
      title={t('nav.themeToggle')}
      className="p-2.5 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-[#CEFF00] hover:text-[#141414] dark:hover:bg-[#CEFF00] dark:hover:text-[#141414] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CEFF00] border border-neutral-300/60 dark:border-neutral-700/60"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#CEFF00] hover:text-[#141414] transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-800 transition-colors" />
      )}
    </button>
  );
};
