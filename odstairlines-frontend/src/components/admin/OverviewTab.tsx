import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { dashboardService, type DashboardStats } from '../../services/api';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../../data/adminTranslations';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  adminLang?: AdminLanguage;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab, showToast, adminLang = 'en' }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const t = ADMIN_TRANSLATIONS[adminLang]?.overview || ADMIN_TRANSLATIONS.en.overview;

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await dashboardService.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-[#E87729]" />
        <span>{t.loading}</span>
      </div>
    );
  }

  const inquiries = stats?.inquiries || { total: 0, new: 0, inProgress: 0, resolved: 0, today: 0 };
  const countdown = stats?.countdown;
  const audits = stats?.audits || { total: 0 };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-[#0B112C]/95 border border-white/10 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-base font-semibold text-white">{t.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{t.subtitle}</p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.refresh}</span>
        </button>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Hitung Mundur */}
        <div className="p-4 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-2 shadow-lg">
          <span className="text-[11px] font-medium text-slate-400 block">{t.countdownStatus}</span>
          <div className="text-xl font-bold text-white font-mono">
            {countdown?.isActive ? (
              <span>
                {countdown.daysLeft} <span className="text-xs font-normal text-slate-400">{t.days}</span> {countdown.hoursLeft} <span className="text-xs font-normal text-slate-400">{t.hours}</span>
              </span>
            ) : (
              <span className="text-rose-400 text-sm font-sans">{t.disabled}</span>
            )}
          </div>
          <button
            onClick={() => onNavigateTab('countdown')}
            className="text-[11px] text-[#E87729] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer pt-1"
          >
            <span>{t.manageCountdown}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2: Pesan Baru */}
        <div className="p-4 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-2 shadow-lg">
          <span className="text-[11px] font-medium text-slate-400 block">{t.newInquiries}</span>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            {inquiries.new}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">{t.messages}</span>
          </div>
          <button
            onClick={() => onNavigateTab('inquiries')}
            className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer pt-1"
          >
            <span>{t.openInbox}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Total Inquiries */}
        <div className="p-4 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-2 shadow-lg">
          <span className="text-[11px] font-medium text-slate-400 block">{t.totalInquiries}</span>
          <div className="text-xl font-bold text-white font-mono">
            {inquiries.total}
          </div>
          <p className="text-[11px] text-slate-400">
            {t.processed}: {inquiries.inProgress} | {t.resolved}: {inquiries.resolved}
          </p>
        </div>

        {/* Card 4: Audit Logs */}
        <div className="p-4 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-2 shadow-lg">
          <span className="text-[11px] font-medium text-slate-400 block">{t.totalAuditLogs}</span>
          <div className="text-xl font-bold text-white font-mono">
            {audits.total}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">{t.activities}</span>
          </div>
          <button
            onClick={() => onNavigateTab('audit_logs')}
            className="text-[11px] text-sky-400 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer pt-1"
          >
            <span>{t.viewAuditLogs}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2-Column: Recent Inquiries & Recent Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Inquiries */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {t.recentInquiries}
            </h3>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs text-[#E87729] hover:underline font-medium cursor-pointer"
            >
              {t.viewAll}
            </button>
          </div>

          {stats?.recentInquiries?.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">{t.noInquiries}</p>
          ) : (
            <div className="divide-y divide-white/5">
              {stats?.recentInquiries?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateTab('inquiries')}
                  className="py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.03] px-2 rounded transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs text-white truncate">{item.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                          item.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.subject || item.message}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(item.created_at).toLocaleDateString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Audit Log */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#0B112C]/95 border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {t.recentAudit}
            </h3>
            <button
              onClick={() => onNavigateTab('audit_logs')}
              className="text-xs text-sky-400 hover:underline font-medium cursor-pointer"
            >
              {t.allLogs}
            </button>
          </div>

          {stats?.recentAudits?.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">{t.noAuditLogs}</p>
          ) : (
            <div className="divide-y divide-white/5">
              {stats?.recentAudits?.map((log) => (
                <div key={log.id} className="py-2 space-y-0.5 text-xs px-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(log.created_at).toLocaleTimeString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate font-mono">
                    {log.admin_email}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
