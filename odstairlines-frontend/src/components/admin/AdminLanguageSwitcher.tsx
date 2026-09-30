import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { AdminLanguage } from '../../data/adminTranslations';
import { IndonesiaFlag, UKFlag, SaudiFlag } from '../common/Flags';

export interface AdminLanguageOption {
  code: AdminLanguage;
  label: string;
  short: string;
  flagNode: React.ReactNode;
}

export const ADMIN_LANGUAGE_CONFIG: {
  code: AdminLanguage;
  label: string;
  short: string;
  FlagComponent: React.FC<{ className?: string }>;
}[] = [
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

  const languages: AdminLanguageOption[] = [
    {
      code: 'id',
      label: 'Indonesia',
      short: 'ID',
      flagNode: <IndonesiaFlag className="w-4 h-2.5 shrink-0" />,
    },
    {
      code: 'en',
      label: 'English',
      short: 'EN',
      flagNode: <UKFlag className="w-4 h-2.5 shrink-0" />,
    },
    {
      code: 'ar',
      label: 'العربية',
      short: 'AR',
      flagNode: <SaudiFlag className="w-4 h-2.5 shrink-0" />,
    },
  ];

  const currentOption = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className={`relative inline-block text-left notranslate ${className}`} translate="no">
      {/* Trigger Button */}
      <button
        type="button"
        id="admin-language-trigger"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer select-none active:scale-95 ${
          open
            ? 'bg-white/10 border-white/25 text-white'
            : 'bg-white/[0.05] hover:bg-white/10 border-white/10 text-slate-200 hover:text-white'
        }`}
      >
        {currentOption.flagNode}
        <span className="font-semibold text-xs tracking-wider">{currentOption.short}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[#0E1538] border border-white/15 shadow-2xl shadow-black/80 p-1 z-50 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="space-y-0.5">
              {languages.map((lang) => {
                const isSelected = currentLang === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    id={`admin-lang-btn-${lang.code}`}
                    onClick={() => {
                      onChangeLang(lang.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left select-none ${
                      isSelected
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {lang.flagNode}
                      <span>{lang.label}</span>
                    </span>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#E87729] stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
