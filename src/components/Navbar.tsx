import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import devsecLogo from '../assets/icons/devsec-logo.webp';

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

  // Lock background scroll when mobile menu or search modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchModalOpen]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-4 z-50 my-3">
        {/* Luxury Frosted-Glass Outer Frame matching table frames */}
        <div className="p-1 rounded-[22px] bg-neutral-200/60 dark:bg-white/[0.05] border border-neutral-300/80 dark:border-white/[0.12] backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 transition-colors duration-200">
          <header className="w-full rounded-[18px] border border-neutral-300/80 dark:border-white/[0.12] bg-[#DFDFDF]/80 dark:bg-[#1E1E1E]/85 backdrop-blur-xl backdrop-saturate-150 shadow-sm transition-colors duration-200 relative">
            {/* Subtle bottom-to-top neutral gradient accent */}
            <div className="absolute inset-0 rounded-[18px] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/[0.04] dark:to-transparent pointer-events-none z-0" />

            <div className="px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-3 relative z-10">
            {/* Left: Logo (Page reload on click) */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center group focus:outline-none rounded-lg p-0.5 shrink-0 cursor-pointer hover:opacity-70 transition-none"
            >
              <img
                src={devsecLogo}
                alt="DevSec Status"
                width={102}
                height={36}
                fetchPriority="high"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] shrink-0"
              />
            </a>

            {/* Center: Navigation Links (Desktop & Tablet) - Centered Exactly */}
            <nav className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center gap-1 bg-neutral-300/85 dark:bg-neutral-900/80 p-1 rounded-xl border border-neutral-400/80 dark:border-neutral-800/80 shadow-inner z-10">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center justify-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] shadow-sm font-bold'
                      : 'text-neutral-900 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="text-[13px] font-bold text-[#141414] dark:text-[#141414] shrink-0 select-none leading-none -mr-0.5">⛶</span>
                    )}
                    <span>{t('nav.software')}</span>
                  </>
                )}
              </NavLink>

              <span className="w-px h-4 bg-neutral-500/70 dark:bg-neutral-600 shrink-0 mx-0.5" />

              <NavLink
                to="/security"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] shadow-sm font-bold'
                      : 'text-neutral-900 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="text-[13px] font-bold text-[#141414] dark:text-[#141414] shrink-0 select-none leading-none -mr-0.5">⛶</span>
                    )}
                    <span>{t('nav.security')}</span>
                  </>
                )}
              </NavLink>
            </nav>

            {/* Right: Search Bar, Language Switcher, Theme Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 relative z-30">
              {/* Search Bar Trigger Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center justify-center gap-2 px-2.5 sm:px-3 h-9 lg:w-44 rounded-xl bg-neutral-300/85 dark:bg-neutral-800/80 border border-neutral-400/80 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-[#CEFF00]/50 transition-colors text-xs font-mono group shrink-0"
                title="Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-[#CEFF00] transition-colors shrink-0" />
                <span className="hidden lg:inline font-medium">{t('nav.search')}</span>
                <kbd className="hidden lg:inline-block ml-auto px-1.5 py-0.5 rounded bg-neutral-400/40 dark:bg-neutral-900 text-[10px] text-neutral-800 dark:text-neutral-400 border border-neutral-400/60 dark:border-neutral-700">
                  ⌘K
                </kbd>
              </button>

              {/* LanguageSwitcher & ThemeToggle visible on desktop/tablet (md+) */}
              <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
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
    </div>

      {/* Mobile Navigation Drawer - FULLSCREEN & INSTANT DROPDOWNS */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] bg-[#ECECEC] dark:bg-[#141414] text-foreground p-6 flex flex-col justify-between overflow-y-auto"
        >
          <div className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
            {/* Mobile Menu Top Row */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-300 dark:border-neutral-800">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center hover:opacity-70 transition-none"
              >
                <img
                  src={devsecLogo}
                  alt="DevSec Status"
                  width={102}
                  height={36}
                  className="h-8 sm:h-9 w-auto object-contain shrink-0"
                />
              </NavLink>

              {/* Close Button with Subtle Crimson Color */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-mono"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#CEFF00]" /> {t('nav.search')}
              </span>
            </button>

            {/* Navigation Links List */}
            <div className="flex flex-col space-y-2 pt-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-none ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] font-bold shadow-md'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-900/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="text-base font-bold text-[#141414] dark:text-[#141414] shrink-0 select-none leading-none">⛶</span>
                    )}
                    <span>{t('nav.software')}</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/security"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-none ${
                    isActive
                      ? 'bg-[#CEFF00] text-[#141414] font-bold shadow-md'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-900/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="text-base font-bold text-[#141414] dark:text-[#141414] shrink-0 select-none leading-none">⛶</span>
                    )}
                    <span>{t('nav.security')}</span>
                  </>
                )}
              </NavLink>
            </div>

            {/* Thin Horizontal Divider Line Under Security */}
            <hr className="border-t border-neutral-300 dark:border-neutral-800/90 my-2 w-full" />

            {/* Language & Theme Controls with Interactive Dropdowns */}
            <div className="flex flex-col gap-3 w-full items-center">
              <LanguageSwitcher
                mobileMode
                onSelectLanguage={() => setMobileMenuOpen(false)}
              />
              <ThemeToggle
                mobileMode
                onToggleTheme={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>

          {/* Drawer Bottom Floor Copyright */}
          <div className="pt-6 pb-2 text-center mt-auto">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              © 2026 DevSec Status
            </span>
          </div>
        </div>
      )}

      {/* Search Command Palette Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onItemSelect={() => {
          setSearchModalOpen(false);
          setMobileMenuOpen(false);
        }}
      />
    </>
  );
};
