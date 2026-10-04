import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plug, Star } from 'lucide-react';

interface FooterProps {
  lastUpdated?: string;
}

export const Footer: React.FC<FooterProps> = ({ lastUpdated }) => {
  const { t } = useTranslation();

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '03.10.2026';

  return (
    <footer className="w-full bg-[#ECECEC] dark:bg-[#141414] transition-colors duration-200 pt-10 pb-0 mt-16 relative">
      {/* Background Fade-Out Gradient Above Footer (Sitenin arkaplanını footer öncesinde silikleştirir) */}
      <div className="absolute -top-24 sm:-top-32 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#ECECEC]/70 to-[#ECECEC] dark:via-[#141414]/70 dark:to-[#141414] pointer-events-none" />

      {/* Top Border with Concave Inverted Radius (Ters Kavis) at Corners */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10">
        {/* Left Corner Concave Inverted Radius (Mirrored from right corner) */}
        <svg
          className="absolute left-0 -top-8 w-8 h-8 pointer-events-none overflow-visible scale-x-[-1]"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 32 0 A 32 32 0 0 1 0 32 L 32 32 Z"
            className="fill-[#ECECEC] dark:fill-[#141414] transition-colors duration-200"
          />
          <path
            d="M 32 0 A 32 32 0 0 1 0 32"
            className="stroke-[#C7C7C7] dark:stroke-neutral-700 transition-colors duration-200"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="butt"
          />
        </svg>

        {/* Middle Horizontal Border Line */}
        <div className="absolute top-0 left-[31px] right-[31px] border-t-[1.5px] border-[#C7C7C7] dark:border-neutral-700 transition-colors duration-200" />

        {/* Right Corner Concave Inverted Radius */}
        <svg
          className="absolute right-0 -top-8 w-8 h-8 pointer-events-none overflow-visible"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 32 0 A 32 32 0 0 1 0 32 L 32 32 Z"
            className="fill-[#ECECEC] dark:fill-[#141414] transition-colors duration-200"
          />
          <path
            d="M 32 0 A 32 32 0 0 1 0 32"
            className="stroke-[#C7C7C7] dark:stroke-neutral-700 transition-colors duration-200"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="butt"
          />
        </svg>
      </div>

      {/* Desktop Grid Layout (lg+) */}
      <div className="hidden lg:grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid-cols-3 gap-8 items-stretch relative z-10">
        {/* Left Column: Logo, Description & Copyright */}
        <div className="flex flex-col justify-between h-full gap-3 text-left">
          <div className="flex flex-col gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center cursor-pointer hover:opacity-70 transition-none"
            >
              <img
                src="/icons/devsec-logo.png"
                alt="DevSec Status"
                className="h-8 w-auto object-contain shrink-0"
              />
            </a>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              Programlama dilleri, kütüphane/framework'ler<br className="hidden sm:inline" />
              ve açık kaynak siber güvenlik araçlarının canlı GitHub<br className="hidden sm:inline" />
              Search API metriklerini ve ivmelenme verilerini sunan<br className="hidden sm:inline" />
              bilgilendirme platformu.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 mt-2">
            © 2026 DevSec Status
          </span>
        </div>

        {/* Center Column: Data Info */}
        <div className="flex flex-col items-center justify-start text-center space-y-2 w-full mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            VERİ VE METRİK KAYNAĞI
          </span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm text-center">
            Veriler GitHub Search API ve resmi veri<br className="hidden sm:inline" />
            tabanları kullanılarak otomatik olarak<br className="hidden sm:inline" />
            güncellenmektedir.
          </p>
        </div>

        {/* Right Column: GitHub Star Button & Badges */}
        <div className="flex flex-col justify-between h-full items-end gap-4">
          <a
            href="https://github.com/sercanvr/devsec-status"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star DevSec Status on GitHub"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white dark:bg-neutral-800 dark:text-white hover:bg-white hover:text-[#141414] dark:hover:bg-white dark:hover:text-[#141414] border border-neutral-700 transition-colors shadow-md group"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 438.549 438.549">
              <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
            </svg>
            <span>Star on GitHub</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0 ml-0.5" />
          </a>

          <div className="flex flex-col items-end gap-1.5 mt-2 font-mono">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-sans font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>{t('footer.allContentUpToDate')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <Plug className="w-4 h-4 text-[#CEFF00]" />
              <span>{t('footer.lastUpdated')}: {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Stack Layout (< lg) */}
      <div className="lg:hidden max-w-xl mx-auto px-6 flex flex-col gap-6 text-left relative z-10">
        {/* 1. Logo & Description */}
        <div className="flex flex-col gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className="flex items-center cursor-pointer hover:opacity-70 transition-none"
          >
            <img
              src="/icons/devsec-logo.png"
              alt="DevSec Status"
              className="h-8 w-auto object-contain shrink-0"
            />
          </a>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Programlama dilleri, kütüphane/framework'ler ve açık kaynak siber güvenlik araçlarının canlı GitHub Search API metriklerini ve ivmelenme verilerini sunan bilgilendirme platformu.
          </p>
        </div>

        {/* 2. Data Info Header & Description */}
        <div className="flex flex-col space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            VERİ VE METRİK KAYNAĞI
          </span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Veriler GitHub Search API ve resmi veri tabanları kullanılarak otomatik olarak güncellenmektedir.
          </p>
        </div>

        {/* 3. Star on GitHub Button */}
        <div>
          <a
            href="https://github.com/sercanvr/devsec-status"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star DevSec Status on GitHub"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white dark:bg-neutral-800 dark:text-white hover:bg-white hover:text-[#141414] dark:hover:bg-white dark:hover:text-[#141414] border border-neutral-700 transition-colors shadow-md group"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 438.549 438.549">
              <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
            </svg>
            <span>Star on GitHub</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0 ml-0.5" />
          </a>
        </div>

        {/* 4. Badges (Status & Last Updated) */}
        <div className="flex flex-col gap-1.5 font-mono">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-sans font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>{t('footer.allContentUpToDate')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <Plug className="w-4 h-4 text-[#CEFF00]" />
            <span>{t('footer.lastUpdated')}: {formattedDate}</span>
          </div>
        </div>

        {/* 5. Copyright (WITHOUT trailing period) */}
        <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400">
          © 2026 DevSec Status
        </span>
      </div>

      {/* Giant Aesthetic "TECH" Typography Watermark at Bottom Floor */}
      <div className="mt-10 sm:mt-14 md:mt-16 text-center select-none pointer-events-none overflow-hidden leading-none w-full flex justify-center items-end relative">
        <span
          className="font-serif font-black text-[32vw] sm:text-[24vw] md:text-[20vw] uppercase text-neutral-400/25 dark:text-neutral-600/20 tracking-wider block leading-none translate-y-3 sm:translate-y-4 md:translate-y-5 w-full text-center"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 98%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 98%)',
          }}
        >
          TECH
        </span>
      </div>
    </footer>
  );
};

