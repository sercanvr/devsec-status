import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, ChevronRight, CornerDownLeft } from 'lucide-react';
import { TechEntry } from '../types/tech';
import languagesData from '../data/languages.json';
import frameworksData from '../data/frameworks.json';
import databasesData from '../data/databases.json';
import securityData from '../data/security-tools.json';
import { sanitizeText } from '../lib/sanitize';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
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
        const q = query.toLowerCase().trim();
        const name = item.name.toLowerCase();
        const cat = item.category.toLowerCase();
        const subCat = item.subCategory ? item.subCategory.toLowerCase() : '';
        const creator = item.creator ? item.creator.name.toLowerCase() : '';
        return name.includes(q) || cat.includes(q) || subCat.includes(q) || creator.includes(q);
      })
    : allItems.slice(0, 8); // Default top items

  const handleSelectItem = (item: TechEntry & { page: 'software' | 'security' }) => {
    onClose();

    // Check if target element exists on current page
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-[#CEFF00]', 'scale-[1.02]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#CEFF00]', 'scale-[1.02]');
      }, 2500);
    } else {
      // Navigate to target page then scroll
      const targetUrl = item.page === 'security' ? `/security#${item.id}` : `/#${item.id}`;
      window.location.href = targetUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#ECECEC] dark:bg-[#141414] rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-foreground animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t('nav.software')} & ${t('nav.security')}... (e.g. Python, React, Ghidra)`}
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
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-neutral-200/50 dark:divide-neutral-800/50">
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
                    className="w-7 h-7 object-contain shrink-0 group-hover:scale-110 transition-transform"
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
            <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
              No technology found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900/80 border-t border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3.5 h-3.5 text-[#CEFF00]" /> Select item to scroll
          </span>
          <span>Shortcut: ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
