import React, { useState, useEffect, memo } from 'react';
import { RefreshCw, Save } from 'lucide-react';
import { countdownService, type CountdownData, type AuditLogItem } from '../../services/api';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../../data/adminTranslations';
import { IndonesiaFlag, UKFlag, SaudiFlag } from '../common/Flags';

interface CountdownTabProps {
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  adminLang?: AdminLanguage;
}

// Lightweight isolated timer to avoid re-rendering parent form every second
const LiveTimerUnits = memo(({
  targetDate,
  isActive,
  daysLabel,
  hoursLabel,
  minutesLabel,
  secondsLabel,
}: {
  targetDate: string;
  isActive: boolean;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  secondsLabel: string;
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate || !isActive) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const calc = () => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate, isActive]);

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      {[
        { val: timeLeft.days, label: daysLabel },
        { val: timeLeft.hours, label: hoursLabel },
        { val: timeLeft.minutes, label: minutesLabel },
        { val: timeLeft.seconds, label: secondsLabel },
      ].map((u, i) => (
        <div key={i} className="w-14 h-14 rounded-lg bg-white/10 border border-white/10 flex flex-col items-center justify-center">
          <span className="text-base font-bold text-white font-mono">
            {isActive ? u.val : '—'}
          </span>
          <span className="text-[9px] text-slate-300">{u.label}</span>
        </div>
      ))}
    </div>
  );
});

export const CountdownTab: React.FC<CountdownTabProps> = ({ showToast, adminLang = 'en' }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [auditHistory, setAuditHistory] = useState<AuditLogItem[]>([]);
  const [selectedTextLang, setSelectedTextLang] = useState<'id' | 'en' | 'ar'>('en');
  const t = ADMIN_TRANSLATIONS[adminLang]?.countdown || ADMIN_TRANSLATIONS.en.countdown;

  const [formData, setFormData] = useState<Partial<CountdownData>>({
    target_date: '',
    is_active: true,
    label_id: 'Bersiap Lepas Landas',
    label_en: 'Prepare for Takeoff',
    label_ar: 'استعدوا للإقلاع',
    title_id: 'Hitung Mundur Dimulai',
    title_en: 'The Countdown Begins Here',
    title_ar: 'العدّ التنازلي يبدأ هنا',
    description_id: 'Jadwal peluncuran dan operasional perdana akan segera diumumkan melalui kanal resmi ODST.',
    description_en: 'Official launch dates and operations will be announced soon across ODST official channels.',
    description_ar: 'موعد الإطلاق وتفاصيله سيُعلن عنها قريباً عبر قنوات أوديست الرسمية.',
  });

  const fetchCountdownData = async () => {
    setLoading(true);
    try {
      const res = await countdownService.getAdmin();
      if (res.success && res.data) {
        const cd = res.data.countdown;
        let formattedDate = '';
        if (cd.target_date) {
          const dt = new Date(cd.target_date);
          const offset = dt.getTimezoneOffset() * 60000;
          formattedDate = new Date(dt.getTime() - offset).toISOString().slice(0, 16);
        }

        setFormData({
          ...cd,
          target_date: formattedDate,
        });
        setAuditHistory(res.data.auditHistory || []);
      }
    } catch (err: any) {
      showToast('Error', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountdownData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.target_date) {
      showToast('Validation Error', t.validationTargetDate, 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await countdownService.update(formData);
      if (res.success) {
        showToast('Success', t.saveSuccess, 'success');
        fetchCountdownData();
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

  const previewLang = selectedTextLang;
  const currentPreviewLabel =
    previewLang === 'ar'
      ? formData.label_ar || 'استعدوا للإقلاع'
      : previewLang === 'en'
      ? formData.label_en || 'Prepare for Takeoff'
      : formData.label_id || 'Bersiap Lepas Landas';

  const currentPreviewTitle =
    previewLang === 'ar'
      ? formData.title_ar || 'العدّ التنازلي يبدأ هنا'
      : previewLang === 'en'
      ? formData.title_en || 'The Countdown Begins Here'
      : formData.title_id || 'Hitung Mundur Dimulai';

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-base font-semibold text-white">{t.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{t.subtitle}</p>
        </div>
        <button
          onClick={fetchCountdownData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.refresh}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Compact Form with Language Tabs */}
        <div className="lg:col-span-7 bg-[#0B112C]/95 border border-white/10 rounded-xl p-5 space-y-4 shadow-lg">
          <form onSubmit={handleSave} className="space-y-4 text-xs text-left">
            {/* Status & Date */}
            <div className="p-3.5 rounded-lg bg-black/30 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-white block">{t.showCountdown}</span>
                  <span className="text-[11px] text-slate-400">{t.showCountdownDesc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.is_active)}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#E87729]"></div>
                </label>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <label className="block font-medium text-slate-300">{t.targetDate}</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.target_date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, target_date: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-md bg-black/40 border border-white/15 text-white font-mono outline-none focus:border-[#E87729]"
                />
              </div>
            </div>

            {/* Multilingual Text Customization with Sub-tabs */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  {t.multilingualCustomization}
                </span>

                {/* Sub-language Tab Switcher */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedTextLang('id')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      selectedTextLang === 'id'
                        ? 'bg-[#E87729] text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <IndonesiaFlag className="w-3.5 h-2.5" />
                    <span>Indonesia</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTextLang('en')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      selectedTextLang === 'en'
                        ? 'bg-[#E87729] text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UKFlag className="w-3.5 h-2.5" />
                    <span>English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTextLang('ar')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      selectedTextLang === 'ar'
                        ? 'bg-[#E87729] text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <SaudiFlag className="w-3.5 h-2.5" />
                    <span>العربية</span>
                  </button>
                </div>
              </div>

              {/* Active Sub-tab Content */}
              <div className="p-3.5 rounded-lg bg-black/20 border border-white/10 space-y-3">
                {selectedTextLang === 'id' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.label} (ID)</label>
                        <input
                          type="text"
                          value={formData.label_id || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, label_id: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.titleLabel} (ID)</label>
                        <input
                          type="text"
                          value={formData.title_id || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title_id: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block">{t.description} (ID)</label>
                      <textarea
                        rows={2}
                        value={formData.description_id || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description_id: e.target.value }))}
                        className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729] resize-none"
                      />
                    </div>
                  </>
                )}

                {selectedTextLang === 'en' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.label} (EN)</label>
                        <input
                          type="text"
                          value={formData.label_en || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, label_en: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.titleLabel} (EN)</label>
                        <input
                          type="text"
                          value={formData.title_en || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title_en: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block">{t.description} (EN)</label>
                      <textarea
                        rows={2}
                        value={formData.description_en || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description_en: e.target.value }))}
                        className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729] resize-none"
                      />
                    </div>
                  </>
                )}

                {selectedTextLang === 'ar' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.label} (AR)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={formData.label_ar || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, label_ar: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729] text-right"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 block">{t.titleLabel} (AR)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={formData.title_ar || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title_ar: e.target.value }))}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729] text-right"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block">{t.description} (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={formData.description_ar || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description_ar: e.target.value }))}
                        className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-[#E87729] resize-none text-right"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-lg bg-[#E87729] hover:bg-[#D5681E] font-medium text-xs text-white transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#E87729]/20"
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

        {/* Right Column: Preview & Audit */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Preview */}
          <div className="bg-[#0B112C]/95 border border-white/10 rounded-xl p-5 space-y-3 shadow-lg">
            <span className="text-xs font-semibold text-slate-200 block">{t.livePreview}</span>

            <div className="p-4 rounded-lg bg-[#1B2352] text-white text-center space-y-3 border border-white/15">
              <span className="text-[11px] text-slate-300 block font-medium">
                {currentPreviewLabel}
              </span>
              <h4 className="font-semibold text-base text-white">
                {currentPreviewTitle}
              </h4>

              {/* Isolated 1s Timer */}
              <LiveTimerUnits
                targetDate={formData.target_date || ''}
                isActive={Boolean(formData.is_active)}
                daysLabel={t.days}
                hoursLabel={t.hours}
                minutesLabel={t.minutes}
                secondsLabel={t.seconds}
              />

              <div className="pt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${formData.is_active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {formData.is_active ? t.statusActive : t.statusInactive}
                </span>
              </div>
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-[#0B112C]/95 border border-white/10 rounded-xl p-5 space-y-3 shadow-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {t.auditHistory}
            </h3>

            {auditHistory.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">{t.noAuditHistory}</p>
            ) : (
              <div className="divide-y divide-white/5 max-h-56 overflow-y-auto">
                {auditHistory.map((item) => (
                  <div key={item.id} className="py-2 space-y-0.5 text-xs text-left">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-medium text-white">{item.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.created_at).toLocaleDateString(adminLang === 'ar' ? 'ar-SA' : adminLang === 'en' ? 'en-US' : 'id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {item.admin_email} (IP: {item.ip_address})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
