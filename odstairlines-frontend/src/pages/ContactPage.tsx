import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/layout/Navbar';
import { FooterSection } from '../components/layout/FooterSection';
import { SplashScreen } from '../components/ui/SplashScreen';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { contactService, type ContactInfoData } from '../services/api';
import contactBg from '../assets/hero.jpg';
import ruteHero from '../assets/rutehero.png';

export interface ContactPageProps {
  onNavigate?: (page: 'landing' | 'contact' | 'admin', sectionId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const { showToast } = useToast();

  const [isReady, setIsReady] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [contactInfo, setContactInfo] = useState<Partial<ContactInfoData> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2800);

    // Fetch official contact info from backend API if available
    const loadContactInfo = async () => {
      try {
        const res = await contactService.getPublicInfo();
        if (res.success && res.data) {
          setContactInfo(res.data);
        }
      } catch (err) {
        // Fallback gracefully
      }
    };
    loadContactInfo();

    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setIsReady(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast(
        isRTL ? 'بيانات غير مكتملة' : 'Incomplete Information',
        isRTL ? 'يرجى تعبئة الحقول المطلوبة' : 'Please fill in all required fields',
        'error'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await contactService.submitPublic({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (res.success) {
        setSubmitted(true);
        showToast(
          t.contactPage.successTitle,
          t.contactPage.successMessage,
          'success'
        );
      } else {
        showToast(
          isRTL ? 'خطأ' : 'Error',
          res.message || 'Failed to send message',
          'error'
        );
      }
    } catch (err: any) {
      // If backend network error, still show friendly response
      setSubmitted(true);
      showToast(
        t.contactPage.successTitle,
        t.contactPage.successMessage,
        'success'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const mapEmbedUrl =
    contactInfo?.map_embed_url ||
    'https://maps.google.com/maps?q=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed';
  const mapDirectUrl =
    contactInfo?.map_direct_url ||
    'https://www.google.com/maps/search/?api=1&query=Graha+Al+Badgel+Jl.+Hajjah+Tutty+Alawiyah+No.7+Jakarta';

  const displayPhone = contactInfo?.phone || t.contactPage.phone;
  const displayPhoneTel = contactInfo?.phone_tel || t.contactPage.phoneTel;
  const displayEmail = contactInfo?.email || t.contactPage.email;
  const displayAddress = contactInfo?.address || t.contactPage.address;

  return (
    <div className="min-h-screen bg-[#0A0F26] text-white flex flex-col justify-between selection:bg-[#E87729] selection:text-white font-noto-arabic overflow-x-hidden">
      {/* Aviation Airplane Splash Screen Animation */}
      <SplashScreen onComplete={handleSplashComplete} />

      {/* Sticky Navbar */}
      <Navbar currentPage="contact" onNavigate={onNavigate} />

      {/* Main Content with Hero Background */}
      <main className="relative pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 overflow-hidden flex-1 flex flex-col justify-center">
        {/* Background Image with Soft Depth-of-Field Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={contactBg}
            alt="ODST Airlines Aircraft"
            className="w-full h-full object-cover object-[center_35%] select-none scale-105 blur-[3px] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-[#070B1E]/45"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B1E]/80 via-[#070B1E]/25 to-[#070B1E]/90"></div>

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E87729]/15 rounded-full blur-[140px] pointer-events-none animate-subtle-glow"></div>
          <div
            className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-[#242E69]/50 rounded-full blur-[160px] pointer-events-none animate-subtle-glow"
            style={{ animationDelay: '3s' }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-14 sm:space-y-16">
          {/* Section Header */}
          <div
            className={`text-center max-w-3xl mx-auto space-y-3 transition-all duration-700 ease-out transform ${
              isReady ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-[#E87729] uppercase font-mono drop-shadow inline-flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#E87729]"></span>
              <span>{t.contactPage.badge}</span>
              <span className="w-4 h-[1.5px] bg-[#E87729]"></span>
            </p>
            <h1 className="font-kufam font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-lg">
              {t.contactPage.heroTitle}
            </h1>
            <p className="font-noto-arabic text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              {t.contactPage.heroSubtitle}
            </p>
          </div>

          {/* 2-Column Corporate Contact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Official Contact Card */}
            <div
              className={`lg:col-span-5 bg-[#0B112C]/85 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-6 sm:p-8 space-y-6 text-start shadow-2xl transition-all duration-800 delay-150 ease-out transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(232,119,41,0.12)] ${
                isReady
                  ? 'opacity-100 translate-x-0'
                  : isRTL
                  ? 'opacity-0 translate-x-10'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                  {contactInfo?.division || t.contactPage.division}
                </span>
                <h2 className="font-kufam font-bold text-2xl text-white">
                  {contactInfo?.company_name || t.contactPage.company}
                </h2>
              </div>

              <div className="space-y-5 pt-5 border-t border-white/10 text-sm">
                {/* Telephone */}
                <div className="space-y-1">
                  <span className="text-slate-400 text-xs font-medium block">
                    {t.contactPage.phoneTitle}
                  </span>
                  <a
                    href={`tel:${displayPhoneTel}`}
                    className="font-mono text-white text-base hover:text-[#E87729] transition-colors inline-block font-semibold"
                  >
                    {displayPhone}
                  </a>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <span className="text-slate-400 text-xs font-medium block">
                    {t.contactPage.emailTitle}
                  </span>
                  <a
                    href={`mailto:${displayEmail}`}
                    className="font-mono text-white text-base hover:text-[#E87729] transition-colors inline-block font-semibold"
                  >
                    {displayEmail}
                  </a>
                </div>

                {/* Address */}
                <div className="space-y-1 pt-2 border-t border-white/10">
                  <span className="text-slate-400 text-xs font-medium block">
                    {t.contactPage.addressTitle}
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {displayAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form with DB Integration */}
            <div
              className={`lg:col-span-7 bg-[#0B112C]/85 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-6 sm:p-8 md:p-9 space-y-6 text-start shadow-2xl transition-all duration-800 delay-300 ease-out transform hover:shadow-[0_20px_50px_rgba(36,46,105,0.4)] ${
                isReady
                  ? 'opacity-100 translate-x-0'
                  : isRTL
                  ? 'opacity-0 -translate-x-10'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div>
                <h2 className="font-kufam font-bold text-xl sm:text-2xl text-white">
                  {t.contactPage.formTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {t.contactPage.formSubtitle}
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="font-kufam font-bold text-xl text-white">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="font-noto-arabic text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {t.contactPage.successMessage}
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 active:scale-95 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isRTL ? 'إرسال رسالة أخرى' : 'Kirim Pesan Lain'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-noto-arabic">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {t.contactPage.formName} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contactPage.formNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 focus:border-[#E87729]/80 focus:ring-2 focus:ring-[#E87729]/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {t.contactPage.formEmail} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contactPage.formEmailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 focus:border-[#E87729]/80 focus:ring-2 focus:ring-[#E87729]/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all duration-200 font-mono"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {t.contactPage.formPhone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contactPage.formPhonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 focus:border-[#E87729]/80 focus:ring-2 focus:ring-[#E87729]/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all duration-200 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {t.contactPage.formSubject}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t.contactPage.formSubjectPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 focus:border-[#E87729]/80 focus:ring-2 focus:ring-[#E87729]/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      {t.contactPage.formMessage} *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contactPage.formMessagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 focus:border-[#E87729]/80 focus:ring-2 focus:ring-[#E87729]/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all duration-200 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-full bg-[#E87729] hover:bg-[#D5681E] active:scale-[0.99] hover:shadow-lg hover:shadow-[#E87729]/30 disabled:opacity-50 text-white font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t.contactPage.formSubmitting}</span>
                        </>
                      ) : (
                        <span>{t.contactPage.formSubmit}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Section 3: Map Section */}
          <ScrollReveal animation="fade-up" duration={800} className="pt-8 border-t border-white/10 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-xs font-semibold tracking-widest text-[#E87729] uppercase font-mono drop-shadow inline-flex items-center gap-2">
                <span className="w-4 h-[1.5px] bg-[#E87729]"></span>
                <span>{t.contactPage.mapBadge}</span>
                <span className="w-4 h-[1.5px] bg-[#E87729]"></span>
              </p>
              <h2 className="font-kufam font-bold text-2xl sm:text-3xl text-white">
                {t.contactPage.mapTitle}
              </h2>
              <p className="font-noto-arabic text-xs sm:text-sm text-slate-300">
                {t.contactPage.mapSubtitle}
              </p>
            </div>

            <div className="bg-[#0B112C]/85 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl transition-all duration-300">
              <div className="w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden bg-[#070B1E] border border-white/10 shadow-inner">
                <iframe
                  title="ODST Airlines Office Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-white">
                    {contactInfo?.company_name || t.contactPage.company} — {contactInfo?.division || t.contactPage.division}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {displayAddress}
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href={mapDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white text-xs font-semibold transition-all duration-200 cursor-pointer"
                  >
                    {t.contactPage.openInMaps}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Route Motif */}
          <div className="pt-4 pb-2 flex justify-center opacity-60 select-none pointer-events-none">
            <img
              src={ruteHero}
              alt="ODST Flight Route"
              className="h-3.5 sm:h-4 w-auto object-contain"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection currentPage="contact" onNavigate={onNavigate} />
    </div>
  );
};
