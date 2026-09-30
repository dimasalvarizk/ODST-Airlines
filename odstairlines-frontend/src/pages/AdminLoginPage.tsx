import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { authService } from '../services/api';
import logoOdst from '../assets/LogoOdst.png';
import heroBg from '../assets/hero.jpg';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../data/adminTranslations';
import { AdminLanguageSwitcher } from '../components/admin/AdminLanguageSwitcher';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToSite?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Multilingual state for Admin Login
  const [adminLang, setAdminLang] = useState<AdminLanguage>(() => {
    try {
      const saved = localStorage.getItem('odst_admin_lang');
      if (saved === 'id' || saved === 'en' || saved === 'ar') {
        return saved;
      }
    } catch {}
    return 'id';
  });

  const handleAdminLangChange = (newLang: AdminLanguage) => {
    setAdminLang(newLang);
    try {
      localStorage.setItem('odst_admin_lang', newLang);
    } catch {}
  };

  const t = ADMIN_TRANSLATIONS[adminLang].loginPage;

  // Force LTR direction on admin portal
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = adminLang;
  }, [adminLang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrUsername.trim() || !password.trim()) {
      setErrorMessage(t.fillFields);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(emailOrUsername, password);
      if (response.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(response.message || 'Kredensial login tidak valid.');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Gagal terhubung ke database backend.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="ltr" className="min-h-screen relative text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-[#E87729] selection:text-white overflow-hidden bg-[#070B1E]">
      {/* Background Hero Image - High Performance GPU */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="ODST Airlines Aviation Background"
          className="w-full h-full object-cover object-[center_35%] select-none opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B1E]/95 via-[#070B1E]/80 to-[#070B1E]/95"></div>
      </div>

      {/* Top Header with Language Switcher */}
      <header className="relative z-10 px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#070B1E]/95">
        <div className="flex items-center gap-3">
          <img src={logoOdst} alt="ODST Airlines" className="h-7 w-auto object-contain" />
          <div className="h-4 w-px bg-white/20 mx-1"></div>
          <span className="text-xs font-medium text-slate-300">{t.portalSubtitle}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <AdminLanguageSwitcher currentLang={adminLang} onChangeLang={handleAdminLangChange} />
        </div>
      </header>

      {/* Center Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0B112C] border border-white/15 rounded-xl p-6 sm:p-7 shadow-2xl shadow-black/80 space-y-5 text-left">
          <div>
            <h1 className="text-lg font-semibold text-white">{t.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{t.subtitle}</p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
            <div className="space-y-1.5">
              <label className="block font-medium text-slate-300">{t.emailOrUsername}</label>
              <input
                type="text"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder={t.emailOrUsername}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 outline-none focus:border-[#E87729] focus:ring-1 focus:ring-[#E87729] font-mono text-xs transition-colors text-left"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-medium text-slate-300">{t.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 outline-none focus:border-[#E87729] focus:ring-1 focus:ring-[#E87729] font-mono text-xs transition-colors text-left"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#E87729] hover:bg-[#D5681E] font-medium text-xs text-white transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md shadow-[#E87729]/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.verifying}</span>
                </>
              ) : (
                <span>{t.signIn}</span>
              )}
            </button>
          </form>
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-slate-400 border-t border-white/10 bg-[#070B1E]">
        © {new Date().getFullYear()} ODST Airlines. {t.copyright}
      </footer>
    </div>
  );
};
