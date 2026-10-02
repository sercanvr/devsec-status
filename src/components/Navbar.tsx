import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Code2, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#CEFF00] rounded-lg p-1"
        >
          <img
            src="/icons/devsec-icon.png"
            alt="DevSec Status"
            className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
              DevSec <span className="text-[#CEFF00] font-mono text-sm font-semibold">Status</span>
            </span>
          </div>
        </NavLink>

        {/* Center: Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-300/50 dark:border-neutral-800/80 shadow-inner">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#CEFF00] text-[#141414] shadow-md shadow-[#CEFF00]/20 font-bold'
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
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#CEFF00] text-[#141414] shadow-md shadow-[#CEFF00]/20 font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`
            }
          >
            <ShieldAlert className="w-4 h-4" />
            {t('nav.security')}
          </NavLink>
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-300/50 dark:border-neutral-800/80 bg-[#ECECEC]/95 dark:bg-[#141414]/95 backdrop-blur-lg px-4 py-4 space-y-2 animate-fade-in">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#CEFF00] text-[#141414] font-bold shadow-sm'
                  : 'text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5'
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
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#CEFF00] text-[#141414] font-bold shadow-sm'
                  : 'text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5'
              }`
            }
          >
            <ShieldAlert className="w-5 h-5" />
            {t('nav.security')}
          </NavLink>
        </div>
      )}
    </header>
  );
};
