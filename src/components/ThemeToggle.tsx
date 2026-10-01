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
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 animate-fade-in" />
      )}
    </button>
  );
};
