import React, { useState, useEffect } from 'react';
import { RefreshCw, Save } from 'lucide-react';
import { contactService, type ContactInfoData } from '../../services/api';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../../data/adminTranslations';

interface ContactInfoTabProps {
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  adminLang?: AdminLanguage;
}

export const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ showToast, adminLang = 'en' }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const t = ADMIN_TRANSLATIONS[adminLang]?.contactInfo || ADMIN_TRANSLATIONS.en.contactInfo;

  const [formData, setFormData] = useState<Partial<ContactInfoData>>({
    company_name: 'ODST Airlines',
    division: 'Aviation & Charter',
    phone: '+62 81111 202220',
    phone_tel: '+6281111202220',
    email: 'info@odst.id',
    address: 'Graha Al Badgel Jl. Hajjah Tutty Alawiyah No.7, RT.2/RW.5, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, Indonesia 12740',
    map_embed_url: 'https://maps.google.com/maps?q=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed',
    map_direct_url: 'https://www.google.com/maps/search/?api=1&query=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta',
  });

  const fetchContactInfo = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAdminContactInfo();
      if (res.success && res.data) {
        setFormData(res.data);
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await contactService.updateContactInfo(formData);
      if (res.success) {
        showToast('Success', t.saveSuccess, 'success');
        setFormData(res.data);
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-[#E87729]" />
        <span>{t.loading}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-base font-semibold text-white">{t.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={fetchContactInfo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.refresh}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-7 bg-[#0B112C]/95 border border-white/10 rounded-xl p-5 space-y-4 shadow-lg">
          <form onSubmit={handleSave} className="space-y-4 text-xs text-left">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{t.companyName}</label>
                <input
                  type="text"
                  required
                  value={formData.company_name || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{t.division}</label>
                <input
                  type="text"
                  required
                  value={formData.division || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, division: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{t.displayPhone}</label>
                <input
                  type="text"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white font-mono outline-none focus:border-[#E87729]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">{t.linkPhone}</label>
                <input
                  type="text"
                  required
                  value={formData.phone_tel || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone_tel: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white font-mono outline-none focus:border-[#E87729]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">{t.officialEmail}</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white font-mono outline-none focus:border-[#E87729]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">{t.fullAddress}</label>
              <textarea
                rows={3}
                required
                value={formData.address || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white outline-none focus:border-[#E87729] resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">{t.mapUrl}</label>
              <input
                type="text"
                value={formData.map_embed_url || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, map_embed_url: e.target.value }))}
                className="w-full px-3 py-1.5 rounded bg-black/40 border border-white/15 text-white font-mono text-[11px] outline-none focus:border-[#E87729]"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-lg bg-[#E87729] hover:bg-[#D5681E] font-medium text-white transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-md shadow-[#E87729]/20"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.saving}</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.save}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B112C]/95 border border-white/10 rounded-xl p-5 space-y-3 text-xs shadow-lg">
            <span className="font-semibold text-slate-200 block">{t.previewCard}</span>

            <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block">
                  {formData.division}
                </span>
                <span className="font-semibold text-white text-sm block">
                  {formData.company_name}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div>
                  <span className="text-slate-400 text-[10px] block">{t.phone}</span>
                  <span className="text-white font-mono text-xs">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">{t.email}</span>
                  <span className="text-white font-mono text-xs">{formData.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">{t.address}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{formData.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
