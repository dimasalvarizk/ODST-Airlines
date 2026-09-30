import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { AdminLanguage } from '../../data/adminTranslations';
import { IndonesiaFlag, UKFlag, SaudiFlag } from '../common/Flags';

export interface AdminLanguageOption {
  code: AdminLanguage;
  label: string;
  short: string;
  FlagComponent: React.FC<{ className?: string }>;
}

export const ADMIN_LANGUAGE_CONFIG: AdminLanguageOption[] = [
  {
    code: 'id',
    label: 'Indonesia',
    short: 'ID',
    FlagComponent: IndonesiaFlag,
  },
  {
    code: 'en',
    label: 'English',
    short: 'EN',
    FlagComponent: UKFlag,
  },
  {
    code: 'ar',
    label: 'العربية',
    short: 'AR',
    FlagComponent: SaudiFlag,
  },
];

interface AdminLanguageSwitcherProps {
  currentLang: AdminLanguage;
  onChangeLang: (lang: AdminLanguage) => void;
  className?: string;
}

export const AdminLanguageSwitcher: React.FC<AdminLanguageSwitcherProps> = ({
  currentLang,
  onChangeLang,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    ADMIN_LANGUAGE_CONFIG.find((l) => l.code === currentLang) || ADMIN_LANGUAGE_CONFIG[0];
  const ActiveFlag = currentOption.FlagComponent;

  // Window click listener for outside dismissal
  useEffect(() => {
    if (!open) return;

    const handleWindowClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [open]);

  const selectLanguage = (code: AdminLanguage) => {
    onChangeLang(code);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        id="admin-language-trigger-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-all duration-150 cursor-pointer select-none active:scale-95 ${
          open
            ? 'bg-white/10 border-white/25 text-white'
            : 'bg-white/[0.05] hover:bg-white/10 border-white/10 text-slate-200 hover:text-white'
        }`}
      >
        <ActiveFlag className="w-4 h-2.5 pointer-events-none" />
        <span className="font-semibold text-xs tracking-wider pointer-events-none">
          {currentOption.short}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 pointer-events-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {open && (
        <div
          id="admin-language-dropdown-menu"
          className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[#0E1538] border border-white/15 shadow-2xl shadow-black/80 p-1 z-50 animate-in fade-in zoom-in-95 duration-100"
          role="listbox"
        >
          <div className="space-y-0.5">
            {ADMIN_LANGUAGE_CONFIG.map((lang) => {
              const ItemFlag = lang.FlagComponent;
              const isSelected = currentLang === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  id={`admin-lang-option-${lang.code}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectLanguage(lang.code);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left select-none ${
                    isSelected
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5 pointer-events-none">
                    <ItemFlag className="w-4 h-2.5" />
                    <span>{lang.label}</span>
                  </span>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#E87729] stroke-[2.5] pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
