import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Code2, Menu, X, Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Ctrl+K or Cmd+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-4 z-50 my-3">
        <header className="w-full rounded-2xl border border-neutral-300/70 dark:border-neutral-800/80 bg-[#ECECEC]/90 dark:bg-[#141414]/90 backdrop-blur-xl shadow-xl transition-all duration-300">
          <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo (Page reload on click) */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center gap-2.5 group focus:outline-none rounded-lg p-0.5 shrink-0 cursor-pointer"
            >
              <img
                src="/icons/devsec-icon.png"
                alt="DevSec Status"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md shrink-0 transition-colors"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-foreground flex items-center gap-1">
                  DevSec <span className="text-[#CEFF00] font-mono text-xs sm:text-sm font-semibold">Status</span>
                </span>
              </div>
            </a>

            {/* Center: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-200/70 dark:bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-300/60 dark:border-neutral-800/80 shadow-inner">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] shadow-sm font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                <Code2 className="w-4 h-4" />
                {t('nav.software')}
              </NavLink>

              <NavLink
                to="/security"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] shadow-sm font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                <ShieldAlert className="w-4 h-4" />
                {t('nav.security')}
              </NavLink>
            </nav>

            {/* Right: Search Bar, Language Switcher, Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Bar Trigger Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 h-9 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300/70 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300 hover:text-foreground hover:border-[#CEFF00]/50 transition-colors text-xs font-mono group"
                title="Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#CEFF00] transition-colors" />
                <span className="hidden sm:inline">Ara</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-neutral-300 dark:bg-neutral-900 text-[10px] text-neutral-500 dark:text-neutral-400 border border-neutral-400/40 dark:border-neutral-700">
                  ⌘K
                </kbd>
              </button>

              {/* LanguageSwitcher & ThemeToggle visible on desktop (md+) */}
              <div className="hidden md:flex items-center gap-2.5">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              {/* Mobile hamburger menu toggle (visible < md) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Drawer - FULLSCREEN & IMMEDIATE (NO ANIMATION) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] bg-[#ECECEC] dark:bg-[#141414] text-foreground p-6 flex flex-col justify-start space-y-6 overflow-y-auto"
        >
          {/* Mobile Menu Top Row */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-300 dark:border-neutral-800">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <img
                src="/icons/devsec-icon.png"
                alt="DevSec Status"
                className="w-9 h-9 object-contain"
              />
              <span className="font-serif font-bold text-lg tracking-tight text-foreground">
                DevSec <span className="text-[#CEFF00] font-mono text-sm">Status</span>
              </span>
            </NavLink>

            {/* Close Button - Instant Close No Animation */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-mono"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#CEFF00]" /> Ara...
            </span>
            <span className="px-2 py-0.5 rounded bg-neutral-300 dark:bg-neutral-900 text-xs text-neutral-500">
              ⌘K
            </span>
          </button>

          {/* Navigation Links List */}
          <div className="flex flex-col space-y-3 pt-2">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-none ${
                  isActive
                    ? 'bg-[#CEFF00] text-[#141414] font-bold'
                    : 'text-neutral-800 dark:text-neutral-200 bg-neutral-200/50 dark:bg-neutral-900/50'
                }`
              }
            >
              <Code2 className="w-5 h-5" />
              {t('nav.software')}
            </NavLink>

            <NavLink
              to="/security"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-none ${
                  isActive
                    ? 'bg-[#CEFF00] text-[#141414] font-bold'
                    : 'text-neutral-800 dark:text-neutral-200 bg-neutral-200/50 dark:bg-neutral-900/50'
                }`
              }
            >
              <ShieldAlert className="w-5 h-5" />
              {t('nav.security')}
            </NavLink>
          </div>

          {/* Language & Theme Controls */}
          <div className="flex flex-col gap-3 pt-4 border-t border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-neutral-500">{t('nav.selectLanguage')}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-neutral-500">{t('nav.themeToggle')}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Search Command Palette Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};
