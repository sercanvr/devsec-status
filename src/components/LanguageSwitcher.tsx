import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="relative inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 ml-2 text-slate-400 dark:text-slate-500 hidden sm:block" />
      <div className="flex gap-0.5 ml-1">
        {languages.map((lang) => {
          const isActive = i18n.language.startsWith(lang.code);
          return (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              title={`${t('nav.selectLanguage')}: ${lang.label}`}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
