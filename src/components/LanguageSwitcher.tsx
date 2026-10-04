import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Earth, Check } from 'lucide-react';

const languages = [
  { code: 'tr', label: 'TR', name: 'Türkçe', flagUrl: '/icons/tr-flag.png' },
  { code: 'en', label: 'ENG', name: 'English', flagUrl: '/icons/usa-flag.png' },
  { code: 'de', label: 'DE', name: 'Deutsch', flagUrl: '/icons/de-flag.png' },
];

interface LanguageSwitcherProps {
  onSelectLanguage?: () => void;
  mobileMode?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onSelectLanguage,
  mobileMode = false,
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onSelectLanguage) {
      onSelectLanguage();
    }
  };

  if (mobileMode) {
    return (
      <div className="relative flex flex-col items-center" ref={dropdownRef}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="w-56 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-sm font-medium transition-colors shadow-sm cursor-pointer"
          aria-label={t('nav.changeLanguage')}
        >
          <div className="flex items-center gap-2.5">
            <Earth className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>{currentLang.name}</span>
          </div>
          <Check className="w-4 h-4 text-[#CEFF00]" />
        </button>

        {isOpen && (
          <div className="w-56 mt-2 rounded-2xl bg-neutral-200/95 dark:bg-neutral-900/95 border border-neutral-300 dark:border-neutral-700 shadow-xl overflow-hidden py-1.5 z-50">
            {languages.map((lang) => {
              const isActive = i18n.language.startsWith(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors ${
                    isActive
                      ? 'bg-[#CEFF00]/15 text-foreground font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300/60 dark:hover:bg-neutral-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={lang.flagUrl}
                      alt={lang.name}
                      className="w-[18px] h-[18px] object-cover rounded-full shadow-xs shrink-0 border border-black/10 dark:border-white/10"
                    />
                    <span className="text-xs">{lang.name}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-[#CEFF00]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left group z-30" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center gap-1.5 w-16 sm:w-20 h-9 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 text-xs font-semibold border border-neutral-300/60 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-200 transition-colors shrink-0"
        aria-label="Select Language"
      >
        <Earth className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
        <span>{currentLang.label}</span>
      </button>

      {/* Instant Hover Tooltip 2px below navbar */}
      {!isOpen && (
        <div className="hidden group-hover:block absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 z-[70] bg-[#CEFF00] text-[#141414] font-bold text-xs px-3 py-1 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#CEFF00]" />
          {t('nav.changeLanguage')}
        </div>
      )}

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+16px)] w-36 rounded-xl bg-white dark:bg-neutral-900 border border-[#C7C7C7] dark:border-neutral-700 shadow-2xl z-[70] overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((lang) => {
            const isActive = i18n.language.startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors ${
                  isActive
                    ? 'bg-[#CEFF00]/10 text-foreground font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={lang.flagUrl}
                    alt={lang.name}
                    className="w-[18px] h-[18px] object-cover rounded-full shadow-xs shrink-0 border border-black/10 dark:border-white/10"
                  />
                  <span>{lang.name}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-[#CEFF00] shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

