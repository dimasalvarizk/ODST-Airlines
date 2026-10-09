import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
} from 'lucide-react';
import { contactService, type ContactInquiry, type AuditLogItem } from '../../services/api';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../../data/adminTranslations';

interface InquiriesTabProps {
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  adminLang?: AdminLanguage;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({ showToast, adminLang = 'en' }) => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusCounts, setStatusCounts] = useState<any>({});

  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [selectedAuditHistory, setSelectedAuditHistory] = useState<AuditLogItem[]>([]);
  const [editStatus, setEditStatus] = useState<string>('new');
  const [editNotes, setEditNotes] = useState<string>('');
  const [savingStatus, setSavingStatus] = useState(false);

  const [inquiryToDelete, setInquiryToDelete] = useState<ContactInquiry | null>(null);
  const [deleting, setDeleting] = useState(false);

  const t = ADMIN_TRANSLATIONS[adminLang]?.inquiries || ADMIN_TRANSLATIONS.en.inquiries;

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAdminInquiries({
        page,
        limit: 10,
        status: statusFilter,
        search,
      });

      if (res.success) {
        setInquiries(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setStatusCounts(res.meta?.statusCounts || {});
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleOpenDetail = async (item: ContactInquiry) => {
    setSelectedInquiry(item);
    setEditStatus(item.status);
    setEditNotes(item.admin_notes || '');

    try {
      const res = await contactService.getAdminInquiryById(item.id);
      if (res.success && res.data) {
        setSelectedInquiry(res.data.inquiry);
        setSelectedAuditHistory(res.data.auditHistory || []);
        setEditStatus(res.data.inquiry.status);
        setEditNotes(res.data.inquiry.admin_notes || '');
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    setSavingStatus(true);
    try {
      const res = await contactService.updateStatus(selectedInquiry.id, {
        status: editStatus,
        admin_notes: editNotes,
      });

      if (res.success) {
        showToast('Success', t.updateSuccess, 'success');
        setSelectedInquiry(res.data);
        fetchInquiries();
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!inquiryToDelete) return;

    setDeleting(true);
    try {
      const res = await contactService.deleteInquiry(inquiryToDelete.id);
      if (res.success) {
        showToast('Success', t.deleteSuccess, 'success');
        setInquiryToDelete(null);
        if (selectedInquiry?.id === inquiryToDelete.id) {
          setSelectedInquiry(null);
        }
        fetchInquiries();
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300">{t.new}</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300">{t.in_progress}</span>;
      case 'replied':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/20 text-sky-300">{t.replied}</span>;
      case 'resolved':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/20 text-purple-300">{t.resolved}</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-slate-400">{t.archived}</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-slate-300">{status}</span>;
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
          onClick={fetchInquiries}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.refresh}</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: t.all, count: statusCounts.totalAll || 0 },
            { id: 'new', label: t.new, count: statusCounts.totalNew || 0 },
            { id: 'in_progress', label: t.in_progress, count: statusCounts.totalInProgress || 0 },
            { id: 'replied', label: t.replied, count: statusCounts.totalReplied || 0 },
            { id: 'resolved', label: t.resolved, count: statusCounts.totalResolved || 0 },
            { id: 'archived', label: t.archived, count: statusCounts.totalArchived || 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-[#E87729] text-white shadow-md shadow-[#E87729]/20'
                  : 'bg-[#0B112C] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 font-mono">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search */}
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
                <th className="py-3 px-4">{t.date}</th>
                <th className="py-3 px-4">{t.sender}</th>
                <th className="py-3 px-4">{t.subject}</th>
                <th className="py-3 px-4">{t.messageContent}</th>
                <th className="py-3 px-4">{t.status}</th>
                <th className="py-3 px-4 text-right">{t.actions}</th>
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
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    {t.noInquiriesFound}
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {new Date(item.created_at).toLocaleDateString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.email}</div>
                    </td>
                    <td className="py-3 px-4 max-w-[160px] truncate text-slate-200">
                      {item.subject || '—'}
                    </td>
                    <td className="py-3 px-4 max-w-[220px] truncate text-slate-300">
                      {item.message}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        title={t.viewDetail}
                        className="p-1 rounded bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setInquiryToDelete(item)}
                        title={t.delete}
                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B112C] border border-white/15 rounded-xl max-w-xl w-full p-5 space-y-4 shadow-2xl text-left my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">
                  {t.inquiryDetailTitle} #{selectedInquiry.id}
                </h3>
                {getStatusBadge(selectedInquiry.status)}
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sender */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-black/30 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">{t.name}</span>
                <span className="font-medium text-white">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.email}</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-mono text-sky-400 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.phone}</span>
                <span className="font-mono text-slate-300">{selectedInquiry.phone || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.time}</span>
                <span className="font-mono text-slate-300">
                  {new Date(selectedInquiry.created_at).toLocaleString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID')}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1 text-xs">
              <span className="text-slate-400 block">{t.subject}: <strong className="text-white font-medium">{selectedInquiry.subject || '—'}</strong></span>
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateStatus} className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">{t.changeStatus}</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-black/50 border border-white/15 text-white outline-none focus:border-[#E87729]"
                  >
                    <option value="new">{t.new} (New)</option>
                    <option value="in_progress">{t.in_progress} (In Progress)</option>
                    <option value="replied">{t.replied} (Replied)</option>
                    <option value="resolved">{t.resolved} (Resolved)</option>
                    <option value="archived">{t.archived} (Archived)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">{t.directContact}</label>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="px-2.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-center flex-1 font-medium flex items-center justify-center gap-1 shadow"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{t.sendEmail}</span>
                    </a>
                    {selectedInquiry.phone && (
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-center flex-1 font-medium flex items-center justify-center gap-1 shadow"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{t.callPhone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{t.internalNotes}</label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-2.5 py-1.5 rounded bg-black/50 border border-white/15 text-white outline-none focus:border-[#E87729] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={savingStatus}
                className="w-full py-2 rounded bg-[#E87729] hover:bg-[#D5681E] font-medium text-white transition-colors cursor-pointer shadow-md shadow-[#E87729]/20"
              >
                {savingStatus ? t.updating : t.saveStatusNotes}
              </button>
            </form>

            {/* Audit */}
            {selectedAuditHistory.length > 0 && (
              <div className="space-y-1 pt-1 text-[11px]">
                <span className="text-slate-400 font-medium">{t.inquiryAuditHistory}</span>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {selectedAuditHistory.map((log) => (
                    <div key={log.id} className="p-1.5 rounded bg-black/20 flex items-center justify-between text-slate-400">
                      <span>{log.action} ({log.admin_email})</span>
                      <span className="font-mono">{new Date(log.created_at).toLocaleTimeString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {inquiryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0B112C] border border-white/15 rounded-xl max-w-sm w-full p-5 space-y-3 text-left">
            <h3 className="font-semibold text-sm text-white">{t.deleteConfirmTitle}</h3>
            <p className="text-xs text-slate-300">
              {t.deleteConfirmDesc} <strong>{inquiryToDelete.name}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setInquiryToDelete(null)}
                className="px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/10 text-xs text-slate-300 cursor-pointer border border-white/5"
              >
                {t.cancel}
              </button>
              <button
                disabled={deleting}
                onClick={handleDelete}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-xs text-white font-medium cursor-pointer shadow"
              >
                {deleting ? t.deleting : t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
