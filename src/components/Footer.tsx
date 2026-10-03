import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Database, ShieldCheck } from 'lucide-react';

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
    <footer className="w-full border-t border-neutral-300 dark:border-neutral-800/80 bg-[#ECECEC]/70 dark:bg-[#141414]/70 backdrop-blur-md pt-10 pb-6 mt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Column: Logo, Description & Copyright */}
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2">
            <img
              src="/icons/devsec-icon.png"
              alt="DevSec Status"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="font-serif font-bold text-lg tracking-tight text-foreground">
              DevSec <span className="text-[#CEFF00] font-mono text-sm">Status</span>
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
            Programlama dilleri, kütüphane/framework'ler ve açık kaynak siber güvenlik araçlarının canlı GitHub Search API metriklerini ve ivmelenme verilerini sunan bilgilendirme platformu.
          </p>
          <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 mt-1">
            © 2026 DevSec Status. {t('footer.rights')}
          </span>
        </div>

        {/* Center Column: Data Info Card */}
        <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-neutral-200/50 dark:bg-neutral-900/50 border border-neutral-300/60 dark:border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground mb-1">
            <Database className="w-4 h-4 text-[#CEFF00]" />
            <span>Veri ve Metrik Kaynağı</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
            Veriler GitHub Search API ve resmi veri tabanları kullanılarak otomatik olarak güncellenmektedir.
          </p>
        </div>

        {/* Right Column: Rainbow GitHub Star Button & Last Updated */}
        <div className="flex flex-col items-start md:items-end gap-3">
          {/* User's Rainbow GitHub Star Button */}
          <a
            href="https://github.com/sercanvr/devsec-status"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star DevSec Status on GitHub"
            className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
          >
            <div className="flex items-center">
              <svg className="size-4" viewBox="0 0 438.549 438.549">
                <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" fill="#fff" />
              </svg>
              <span className="ml-1.5 text-white inline font-semibold">Star on GitHub</span>
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm">
              <svg className="size-4 text-gray-400 transition-all duration-200 group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" fillRule="evenodd" />
              </svg>
              <span className="inline-block tabular-nums tracking-wider font-mono font-bold text-white">11</span>
            </div>
          </a>

          {/* Last Updated Badge */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#CEFF00]" />
            <span>{t('footer.lastUpdated')}: {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Embedded Aesthetic "Tech" Word at Bottom Center */}
      <div className="mt-8 pt-4 border-t border-neutral-300/40 dark:border-neutral-800/40 text-center select-none pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400/40 dark:text-neutral-600/40 font-bold">
          Tech
        </span>
      </div>
    </footer>
  );
};
