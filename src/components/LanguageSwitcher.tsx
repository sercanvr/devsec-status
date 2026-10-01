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
    <div className="relative inline-flex items-center rounded-xl bg-neutral-200/70 dark:bg-neutral-800 p-1 text-xs font-semibold border border-neutral-300/60 dark:border-neutral-700/60">
      <Globe className="w-3.5 h-3.5 ml-2 text-neutral-500 dark:text-neutral-400 hidden sm:block" />
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
                  ? 'bg-[#CEFF00] text-[#141414] shadow-sm font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-foreground'
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
