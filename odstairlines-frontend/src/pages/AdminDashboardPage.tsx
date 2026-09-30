import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Clock,
  Inbox,
  Building,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { authService, type AdminUser } from '../services/api';
import logoOdst from '../assets/LogoOdst.png';
import heroBg from '../assets/hero.jpg';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../data/adminTranslations';
import { AdminLanguageSwitcher } from '../components/admin/AdminLanguageSwitcher';
import { OverviewTab } from '../components/admin/OverviewTab';
import { CountdownTab } from '../components/admin/CountdownTab';
import { InquiriesTab } from '../components/admin/InquiriesTab';
import { ContactInfoTab } from '../components/admin/ContactInfoTab';
import { AuditLogsTab } from '../components/admin/AuditLogsTab';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigateToSite?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser] = useState<AdminUser | null>(() => authService.getCurrentUser());

  // Multilingual state for Admin Dashboard
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

  const t = ADMIN_TRANSLATIONS[adminLang];

  // Enforce consistent direction on admin dashboard
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = adminLang;
  }, [adminLang]);

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Validation Error', t.passwordModal.mismatch, 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Validation Error', t.passwordModal.minLength, 'error');
      return;
    }

    setChangingPass(true);
    try {
      const res = await authService.changePassword(currentPassword, newPassword);
      if (res.success) {
        showToast('Success', t.passwordModal.success, 'success');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setChangingPass(false);
    }
  };

  const navItems = [
    { id: 'overview', label: t.nav.overview, icon: LayoutDashboard },
    { id: 'countdown', label: t.nav.countdown, icon: Clock },
    { id: 'inquiries', label: t.nav.inquiries, icon: Inbox },
    { id: 'contact_info', label: t.nav.contact_info, icon: Building },
    { id: 'audit_logs', label: t.nav.audit_logs, icon: ShieldCheck },
  ];

  return (
    <div dir="ltr" className="min-h-screen relative text-slate-100 flex font-sans antialiased text-left selection:bg-[#E87729] selection:text-white overflow-x-hidden bg-[#070B1E]">
      {/* Background Hero Image - High Performance GPU Optimized without heavy blur calculations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={heroBg}
          alt="ODST Background"
          className="w-full h-full object-cover object-[center_35%] select-none opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B1E]/95 via-[#070B1E]/80 to-[#070B1E]/95"></div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in-up">
          <div
            className={`px-4 py-3 rounded-lg border shadow-xl flex items-start gap-3 max-w-sm text-xs ${
              toast.type === 'success'
                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950 border-rose-500/40 text-rose-200'
                : 'bg-slate-900 border-white/15 text-slate-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="font-semibold block">{toast.title}</span>
              <span className="text-slate-300 leading-normal block">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-[#0B112C] border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-200 text-left ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logoOdst} alt="ODST Airlines" className="h-6 w-auto object-contain" />
            <div>
              <span className="font-semibold text-xs text-white block">{t.nav.brand}</span>
              <span className="text-[10px] text-slate-400 block">{t.nav.portalSubtitle}</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-400 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#E87729] text-white shadow-md shadow-[#E87729]/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User info & actions */}
        <div className="p-3 border-t border-white/10 bg-black/20 space-y-2 text-xs">
          <div className="px-2 py-1">
            <span className="text-white font-medium block truncate">{currentUser?.username || 'admin'}</span>
            <span className="text-slate-400 text-[11px] block truncate font-mono">{currentUser?.email || 'info@odst.id'}</span>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex-1 py-1.5 px-2 rounded bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white text-[11px] text-center transition-colors cursor-pointer border border-white/5"
            >
              {t.nav.changePassword}
            </button>
            <button
              onClick={handleLogout}
              className="py-1.5 px-2.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] text-center transition-colors cursor-pointer border border-rose-500/20"
            >
              {t.nav.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 text-left">
        {/* Top Navbar */}
        <header className="px-6 py-3.5 border-b border-white/10 bg-[#070B1E]/95 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded bg-white/[0.05] text-slate-300 hover:text-white lg:hidden cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-medium">
              {t.nav.adminPrefix} / <span className="text-white">{navItems.find((n) => n.id === activeTab)?.label}</span>
            </span>
          </div>

          {/* 3-Language Switcher (ID, EN, AR) */}
          <div className="flex items-center gap-2">
            <AdminLanguageSwitcher currentLang={adminLang} onChangeLang={handleAdminLangChange} />
          </div>
        </header>

        {/* Tab Body */}
        <main className="flex-1 p-5 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto text-left">
          {activeTab === 'overview' && (
            <OverviewTab
              onNavigateTab={(tab) => setActiveTab(tab)}
              showToast={showToast}
              adminLang={adminLang}
            />
          )}
          {activeTab === 'countdown' && (
            <CountdownTab
              showToast={showToast}
              adminLang={adminLang}
            />
          )}
          {activeTab === 'inquiries' && (
            <InquiriesTab
              showToast={showToast}
              adminLang={adminLang}
            />
          )}
          {activeTab === 'contact_info' && (
            <ContactInfoTab
              showToast={showToast}
              adminLang={adminLang}
            />
          )}
          {activeTab === 'audit_logs' && (
            <AuditLogsTab
              showToast={showToast}
              adminLang={adminLang}
            />
          )}
        </main>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0B112C] border border-white/15 rounded-xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-semibold text-sm text-white">{t.passwordModal.title}</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300">{t.passwordModal.currentPassword}</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">{t.passwordModal.newPassword}</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">{t.passwordModal.confirmPassword}</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729]"
                />
              </div>

              <button
                type="submit"
                disabled={changingPass}
                className="w-full py-2 rounded-lg bg-[#E87729] hover:bg-[#D5681E] font-medium text-white transition-colors cursor-pointer mt-1"
              >
                {changingPass ? t.passwordModal.saving : t.passwordModal.save}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
