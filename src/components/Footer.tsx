import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface FooterProps {
  lastUpdated?: string;
}

export const Footer: React.FC<FooterProps> = ({ lastUpdated }) => {
  const { t } = useTranslation();

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : new Date().toLocaleDateString();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-500" />
          <span>
            © {new Date().getFullYear()} <strong>DevSec Status</strong>. {t('footer.rights')}
          </span>
        </div>

        <p className="text-center md:text-left text-[11px] max-w-md">
          {t('footer.disclaimer')}
        </p>

        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
          <RefreshCw className="w-3 h-3 text-emerald-500" />
          <span>{t('footer.lastUpdated')}: {formattedDate}</span>
        </div>
      </div>
    </footer>
  );
};
