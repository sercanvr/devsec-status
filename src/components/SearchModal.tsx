import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, ChevronRight, CornerDownLeft } from 'lucide-react';
import { TechEntry } from '../types/tech';
import languagesData from '../data/languages.json';
import frameworksData from '../data/frameworks.json';
import databasesData from '../data/databases.json';
import securityData from '../data/security-tools.json';
import { sanitizeText } from '../lib/sanitize';
import { highlightTechElement } from '../lib/highlight';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemSelect?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onItemSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine all technologies into a unified search list
  const allItems: (TechEntry & { page: 'software' | 'security' })[] = [
    ...(languagesData as TechEntry[]).map((item) => ({ ...item, page: 'software' as const })),
    ...(frameworksData as TechEntry[]).map((item) => ({ ...item, page: 'software' as const })),
    ...(databasesData as TechEntry[]).map((item) => ({ ...item, page: 'software' as const })),
    ...(securityData as TechEntry[]).map((item) => ({ ...item, page: 'security' as const })),
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = query.trim()
    ? allItems.filter((item) => {
        const rawQ = query.toLowerCase().trim();
        // Support searching by tags using #tag format
        if (rawQ.startsWith('#')) {
          const tag = rawQ.slice(1).trim();
          if (!tag) return true;
          const cat = item.category.toLowerCase();
          const subCat = item.subCategory ? item.subCategory.toLowerCase() : '';
          return (
            cat.includes(tag) ||
            subCat.includes(tag) ||
            (tag === 'software' && item.page === 'software') ||
            (tag === 'security' && item.page === 'security')
          );
        }
        const q = rawQ;
        const name = item.name.toLowerCase();
        const cat = item.category.toLowerCase();
        const subCat = item.subCategory ? item.subCategory.toLowerCase() : '';
        const creator = item.creator ? item.creator.name.toLowerCase() : '';
        return name.includes(q) || cat.includes(q) || subCat.includes(q) || creator.includes(q);
      })
    : allItems.slice(0, 8); // Default top items

  const handleSelectItem = (item: TechEntry & { page: 'software' | 'security' }) => {
    if (onItemSelect) {
      onItemSelect();
    } else {
      onClose();
    }

    const currentPath = window.location.pathname;
    const isTargetOnCurrentPage =
      (item.page === 'software' && (currentPath === '/' || currentPath === '')) ||
      (item.page === 'security' && currentPath.startsWith('/security'));

    if (isTargetOnCurrentPage) {
      setTimeout(() => {
        highlightTechElement(item.id);
      }, 100);
    } else {
      const targetPath = item.page === 'security' ? `/security#${item.id}` : `/#${item.id}`;
      navigate(targetPath);
      setTimeout(() => {
        highlightTechElement(item.id);
      }, 250);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1050] flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      {/* Luxury Frosted-Glass Outer Frame / Border - Distinct background & visible border */}
      <div
        className="w-full max-w-2xl p-2 sm:p-2.5 rounded-[32px] bg-neutral-300/70 dark:bg-neutral-800/80 border border-neutral-400/70 dark:border-neutral-600/70 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#ECECEC] dark:bg-[#141414] rounded-[24px] border border-neutral-300/90 dark:border-neutral-800/90 shadow-2xl overflow-hidden flex flex-col max-h-[75vh] text-foreground">
          {/* Search Input Bar */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Python"
            className="w-full bg-transparent text-base font-medium placeholder:text-neutral-400 focus:outline-none text-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-foreground mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shrink-0 ml-2 transition-colors cursor-pointer"
            title="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto custom-scrollbar p-2 space-y-1 divide-y divide-neutral-200/50 dark:divide-neutral-800/50">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800/70 transition-colors flex items-center justify-between group focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.iconUrl}
                    alt={item.name}
                    className="w-7 h-7 object-contain shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-foreground group-hover:text-[#CEFF00] transition-colors">
                        {sanitizeText(item.name)}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {item.category}
                      </span>
                    </div>
                    {item.creator && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {sanitizeText(item.creator.name)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    {item.popularity.totalStars.toLocaleString()} ★
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#CEFF00] transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-red-500 font-mono text-sm max-w-full overflow-hidden">
              <div className="font-semibold mb-1">{t('searchModal.noResultsFound')}</div>
              <div className="break-words break-all text-xs opacity-90 max-w-full px-2">
                "{query}"
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="relative px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900/80 border-t border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="w-3.5 h-3.5 text-[#CEFF00] shrink-0" />
            <span>{t('searchModal.selectToNavigate')}</span>
          </span>
          <span className="hidden lg:inline-flex items-center absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[10px] border border-neutral-300 dark:border-neutral-700">
            ESC
          </span>
          <span className="hidden lg:inline-block">{t('searchModal.shortcut')}</span>
        </div>
      </div>
    </div>
  </div>
);
};
