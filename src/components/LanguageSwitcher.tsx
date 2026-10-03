import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Earth, Check } from 'lucide-react';

const languages = [
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative inline-block text-left group" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 text-xs font-semibold border border-neutral-300/60 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-200 transition-colors"
        aria-label="Select Language"
      >
        <Earth className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
        <span>{currentLang.label}</span>
      </button>

      {/* Instant Hover Tooltip */}
      {!isOpen && (
        <div className="hidden group-hover:block absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 bg-[#CEFF00] text-[#141414] font-bold text-xs px-3 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#CEFF00]" />
          {t('nav.changeLanguage')}
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((lang) => {
            const isActive = i18n.language.startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? 'bg-[#CEFF00]/10 text-foreground font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {lang.label}
                  </span>
                  <span>{lang.name}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-[#CEFF00]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

