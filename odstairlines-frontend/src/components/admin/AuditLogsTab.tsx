import React, { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { auditService, type AuditLogItem } from '../../services/api';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../../data/adminTranslations';

interface AuditLogsTabProps {
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  adminLang?: AdminLanguage;
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({ showToast, adminLang = 'id' }) => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleFilter, setModuleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const t = ADMIN_TRANSLATIONS[adminLang].auditLogs;

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await auditService.getLogs({
        page,
        limit: 15,
        module: moduleFilter,
        search,
      });

      if (res.success) {
        setLogs(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setTotalRecords(res.meta?.totalRecords || 0);
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, moduleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const getModuleBadge = (module: string) => {
    switch (module) {
      case 'countdown':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">{t.moduleCountdown}</span>;
      case 'contact':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300">{t.moduleContact}</span>;
      case 'contact_info':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300">{t.moduleContactInfo}</span>;
      case 'auth':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">{t.moduleAuth}</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">{module}</span>;
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-base font-semibold text-white">{t.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.refresh}</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={moduleFilter}
            onChange={(e) => {
              setModuleFilter(e.target.value);
              setPage(1);
            }}
            className="px-2.5 py-1.5 rounded-md bg-[#0B112C] border border-white/15 text-white text-xs outline-none focus:border-[#E87729]"
          >
            <option value="all">{t.allModules}</option>
            <option value="countdown">{t.moduleCountdown}</option>
            <option value="contact">{t.moduleContact}</option>
            <option value="contact_info">{t.moduleContactInfo}</option>
            <option value="auth">{t.moduleAuth}</option>
          </select>
          <span className="text-xs text-slate-400 font-mono">({totalRecords} {t.rows})</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative min-w-[220px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 rounded-md bg-[#0B112C] border border-white/15 focus:border-[#E87729] text-white placeholder-slate-400 text-xs outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </form>
      </div>

      {/* Table */}
      <div className="bg-[#0B112C]/95 border border-white/10 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-black/40 text-slate-300 text-[11px] font-medium border-b border-white/10">
              <tr>
                <th className="py-3 px-4">{t.time}</th>
                <th className="py-3 px-4">{t.module}</th>
                <th className="py-3 px-4">{t.action}</th>
                <th className="py-3 px-4">{t.admin}</th>
                <th className="py-3 px-4">{t.ipAddress}</th>
                <th className="py-3 px-4">{t.changeDetails}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-4 h-4 animate-spin mx-auto text-[#E87729] mb-1" />
                    <span>{t.loading}</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    {t.noLogsFound}
                  </td>
                </tr>
              ) : (
                logs.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {new Date(item.created_at).toLocaleDateString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      {getModuleBadge(item.module)}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-white whitespace-nowrap">
                      {item.action}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-slate-300">
                      {item.admin_email || 'System'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                      {item.ip_address || '—'}
                    </td>
                    <td className="py-2.5 px-4 max-w-sm">
                      {item.details ? (
                        <pre className="p-1.5 rounded bg-black/40 border border-white/10 text-[10px] text-slate-300 font-mono whitespace-pre-wrap max-h-16 overflow-y-auto">
                          {typeof item.details === 'object' ? JSON.stringify(item.details) : item.details}
                        </pre>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 bg-black/20">
            <span>{t.page} {page} {t.of} {totalPages}</span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 border border-white/10 disabled:opacity-40 text-slate-300 cursor-pointer"
              >
                {t.prev}
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 border border-white/10 disabled:opacity-40 text-slate-300 cursor-pointer"
              >
                {t.next}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
