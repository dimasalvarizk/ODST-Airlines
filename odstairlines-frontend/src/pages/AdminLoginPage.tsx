import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { authService } from '../services/api';
import logoOdst from '../assets/LogoOdst.png';
import heroBg from '../assets/hero.jpg';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../data/adminTranslations';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToSite?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    try {
      return localStorage.getItem('odst_admin_remember') === 'true';
    } catch {
      return false;
    }
  });

  const [emailOrUsername, setEmailOrUsername] = useState<string>(() => {
    try {
      return localStorage.getItem('odst_admin_saved_user') || '';
    } catch {
      return '';
    }
  });

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Multilingual state for Admin Login
  const [adminLang] = useState<AdminLanguage>(() => {
    try {
      const saved = localStorage.getItem('odst_admin_lang');
      if (saved === 'id' || saved === 'en' || saved === 'ar') {
        return saved;
      }
    } catch {}
    return 'en';
  });

  const t = ADMIN_TRANSLATIONS[adminLang]?.loginPage || ADMIN_TRANSLATIONS.en.loginPage;

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
        try {
          if (rememberMe) {
            localStorage.setItem('odst_admin_remember', 'true');
            localStorage.setItem('odst_admin_saved_user', emailOrUsername.trim());
          } else {
            localStorage.removeItem('odst_admin_remember');
            localStorage.removeItem('odst_admin_saved_user');
          }
        } catch {}
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
    <div dir="ltr" className="min-h-screen relative text-slate-100 flex items-center justify-center font-sans antialiased selection:bg-[#E87729] selection:text-white overflow-hidden bg-[#070B1E] p-4">
      {/* Background Hero Image - High Performance GPU */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroBg}
          alt="ODST Airlines Aviation Background"
          className="w-full h-full object-cover object-[center_35%] select-none opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B1E]/95 via-[#070B1E]/80 to-[#070B1E]/95"></div>
      </div>

      {/* Center Box */}
      <main className="relative z-10 w-full max-w-sm sm:max-w-[420px]">
        <div className="w-full bg-[#0B112C] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/90 space-y-6 text-left backdrop-blur-md">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img
                src={logoOdst}
                alt="ODST Airlines"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-lg transition-transform duration-200"
              />
            </div>
            <h1 className="text-xl font-bold text-white text-center tracking-tight">{t.title}</h1>
            <p className="text-xs text-slate-400 text-center max-w-xs mx-auto leading-relaxed">{t.subtitle}</p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 outline-none focus:border-[#E87729] focus:ring-1 focus:ring-[#E87729] font-mono text-xs transition-colors text-left"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 outline-none focus:border-[#E87729] focus:ring-1 focus:ring-[#E87729] font-mono text-xs transition-colors text-left"
              />
            </div>

            {/* Remember Me / Simpan Login */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#E87729] focus:ring-1 focus:ring-[#E87729] focus:ring-offset-0 cursor-pointer accent-[#E87729]"
                />
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                  {t.rememberMe || 'Remember me on this device'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#E87729] hover:bg-[#D5681E] font-semibold text-xs text-white transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-lg shadow-[#E87729]/25 active:scale-[0.98]"
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
    </div>
  );
};
