import React, { useState } from 'react';
import { X, Bell, Mail, User, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { subscribeToNewsletter } from '../../services/mailchimp';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await subscribeToNewsletter({
      email: email.trim(),
      name: name.trim(),
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      showToast(
        t.modal.toastTitle,
        t.modal.toastDesc,
        'success'
      );
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName('');
        setEmail('');
        setErrorMessage(null);
      }, 2500);
    } else {
      setErrorMessage(result.error || 'Gagal mendaftar. Silakan coba lagi.');
      showToast(
        'Pendaftaran Gagal',
        result.error || 'Silakan periksa kembali email Anda.',
        'info'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A102E]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[24px] sm:rounded-[28px] bg-white text-[#242E69] p-5 sm:p-7 md:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 font-noto-arabic">
        <button
          onClick={onClose}
          className={`absolute top-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#242E69] transition-colors ${
            isRTL ? 'left-4' : 'right-4'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 sm:w-9 h-8 sm:h-9" />
            </div>
            <h3 className="font-noto-arabic font-bold text-xl sm:text-2xl text-[#242E69]">
              {t.modal.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              {t.modal.successDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-start">
            <div className="space-y-2">
              <h3 className="font-noto-arabic font-normal text-xl sm:text-2xl text-[#242E69] leading-snug">
                {t.modal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {t.modal.description}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {t.modal.nameLabel}
                </label>
                <div className="relative">
                  <User
                    className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? 'right-3.5' : 'left-3.5'
                    }`}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.modal.namePlaceholder}
                    className={`w-full py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#242E69] focus:outline-none focus:border-[#E87729] transition-colors ${
                      isRTL ? 'pr-10 pl-3.5 text-right' : 'pl-10 pr-3.5 text-left'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {t.modal.emailLabel}
                </label>
                <div className="relative">
                  <Mail
                    className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? 'right-3.5' : 'left-3.5'
                    }`}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.modal.emailPlaceholder}
                    className={`w-full py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#242E69] focus:outline-none focus:border-[#E87729] transition-colors ${
                      isRTL ? 'pr-10 pl-3.5 text-right' : 'pl-10 pr-3.5 text-left'
                    }`}
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#E87729] hover:bg-[#D5681E] disabled:opacity-65 disabled:cursor-not-allowed shadow-lg shadow-[#E87729]/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {t.nav.home === 'Beranda'
                        ? 'Mendaftarkan...'
                        : t.nav.home === 'الرئيسية'
                        ? 'جاري التسجيل...'
                        : 'Subscribing...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>{t.modal.submit}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
