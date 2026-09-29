import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/layout/Navbar';
import { FooterSection } from '../components/layout/FooterSection';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import contactBg from '../assets/_ANA3890.jpg';

export interface ContactPageProps {
  onNavigate?: (page: 'landing' | 'contact', sectionId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'charter',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCategorySelect = (catKey: string) => {
    setFormData(prev => ({ ...prev, category: catKey }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast(
        isRTL ? 'بيانات ناقصة' : 'Incomplete Form',
        isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        'error'
      );
      return;
    }

    setSubmitting(true);

    // Simulate reliable submission with API proxy readiness
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast(
        t.contactPage.successTitle,
        t.contactPage.successMessage,
        'success'
      );
    }, 900);
  };

  const categories = [
    { key: 'charter', label: t.contactPage.categories.charter },
    { key: 'hajjUmrah', label: t.contactPage.categories.hajjUmrah },
    { key: 'scheduled', label: t.contactPage.categories.scheduled },
    { key: 'agency', label: t.contactPage.categories.agency },
    { key: 'general', label: t.contactPage.categories.general },
  ];

  return (
    <div className="min-h-screen bg-[#0E1535] text-white flex flex-col justify-between selection:bg-[#E87729] selection:text-white font-noto-arabic">
      {/* Fixed Sticky Navbar */}
      <Navbar currentPage="contact" onNavigate={onNavigate} />

      {/* HERO SECTION WITH _ANA3890.JPG BACKGROUND */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        {/* Background Image Container with Premium Cinematic Aviation Treatment */}
        <div className="absolute inset-0 z-0">
          <img
            src={contactBg}
            alt="ODST Airlines Aircraft Fuselage Close Up"
            className="w-full h-full object-cover object-[center_35%] scale-105 filter brightness-90 select-none animate-in fade-in duration-1000"
          />
          {/* Multi-layer Dark Blue Glass Veil to make text razor-sharp */}
          <div className="absolute inset-0 bg-[#0B112C]/75 backdrop-blur-[1.5px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A102E]/90 via-[#0E1535]/70 to-[#0E1535]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E87729]/15 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Title Block */}
          <ScrollReveal animation="fade-up" duration={850} className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* Pre-title Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E87729] text-xs sm:text-sm font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-current text-[#E87729]" />
              <span>{t.contactPage.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-kufam font-black text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-white leading-[1.3] drop-shadow-lg tracking-tight">
              <span className="block">
                {t.contactPage.heroTitleLine1 || t.contactPage.heroTitle}
              </span>
              {t.contactPage.heroTitleLine2 && (
                <span className="block text-[#E87729] mt-1 sm:mt-2 drop-shadow-md">
                  {t.contactPage.heroTitleLine2}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="font-noto-arabic font-normal text-white/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.contactPage.heroSubtitle}
            </p>
          </ScrollReveal>

          {/* 3 OPERATIONAL HUBS & CONTACT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
            {/* Hub 1: Jakarta Indonesia */}
            <ScrollReveal animation="fade-up" delay={100} duration={800} className="h-full">
              <div className="p-6 sm:p-7 rounded-[28px] bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between group">
                <div className="space-y-4 text-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#E87729]/20 border border-[#E87729]/40 flex items-center justify-center text-[#E87729] shadow-inner group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-noto-arabic font-bold text-lg sm:text-xl text-white">
                    {t.contactPage.jakartaTitle}
                  </h3>
                  <p className="font-noto-arabic text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E87729] shrink-0 mt-0.5" />
                    <span>{t.contactPage.jakartaAddress}</span>
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 text-start">
                  <span className="inline-block text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
                    {t.contactPage.jakartaRole}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Hub 2: Madinah & Jeddah Saudi Arabia */}
            <ScrollReveal animation="fade-up" delay={200} duration={800} className="h-full">
              <div className="p-6 sm:p-7 rounded-[28px] bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between group">
                <div className="space-y-4 text-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#E87729]/20 border border-[#E87729]/40 flex items-center justify-center text-[#E87729] shadow-inner group-hover:scale-110 transition-transform">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="font-noto-arabic font-bold text-lg sm:text-xl text-white">
                    {t.contactPage.saudiTitle}
                  </h3>
                  <p className="font-noto-arabic text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E87729] shrink-0 mt-0.5" />
                    <span>{t.contactPage.saudiAddress}</span>
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 text-start">
                  <span className="inline-block text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-[#E87729]/20 text-[#E87729] border border-[#E87729]/30">
                    {t.contactPage.saudiRole}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Hub 3: Direct Airline Support Desk */}
            <ScrollReveal animation="fade-up" delay={300} duration={800} className="h-full">
              <div className="p-6 sm:p-7 rounded-[28px] bg-gradient-to-br from-[#1E285F]/90 to-[#131B45]/90 backdrop-blur-xl border border-[#E87729]/30 shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between group">
                <div className="space-y-4 text-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#E87729] flex items-center justify-center text-white shadow-lg shadow-[#E87729]/30 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-noto-arabic font-bold text-lg sm:text-xl text-white">
                    {t.contactPage.flightDeskTitle}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                    <a
                      href={`mailto:${t.contactPage.flightDeskEmail}`}
                      className="flex items-center gap-2 hover:text-[#E87729] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#E87729] shrink-0" />
                      <span className="font-mono">{t.contactPage.flightDeskEmail}</span>
                    </a>
                    <a
                      href="https://wa.me/6281119208888"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:text-[#E87729] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#E87729] shrink-0" />
                      <span className="font-mono">{t.contactPage.flightDeskPhone}</span>
                    </a>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 text-start flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-[#E87729] shrink-0" />
                  <span>{t.contactPage.flightDeskHours}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FLIGHT & CHARTER INQUIRY FORM SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct WhatsApp & Info Sidebar */}
          <ScrollReveal animation="fade-up" duration={850} className="lg:col-span-5 space-y-6 text-start">
            <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1E285F]/80 to-[#131B45]/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#E87729] tracking-widest uppercase">
                  ODST AIRLINES INDONESIA
                </span>
                <h3 className="font-kufam font-bold text-2xl sm:text-3xl text-white">
                  {t.contactPage.directChat}
                </h3>
                <p className="font-noto-arabic text-sm text-slate-300 leading-relaxed">
                  {t.contactPage.directChatSub}
                </p>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href="https://wa.me/6281119208888?text=Hello%20ODST%20Airlines,%20I%20would%20like%20to%20inquire%20about%20flights"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>{t.contactPage.whatsappButton}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Back to Home Link */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('landing', 'home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span>{t.contactPage.backToHome}</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Flight Inquiry Form */}
          <ScrollReveal animation="fade-up" delay={150} duration={850} className="lg:col-span-7">
            <div className="p-8 sm:p-10 md:p-12 rounded-[36px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-2xl space-y-8 text-start">
              <div className="space-y-2">
                <h2 className="font-kufam font-bold text-2xl sm:text-3xl text-white">
                  {t.contactPage.formTitle}
                </h2>
                <p className="font-noto-arabic text-sm text-slate-300">
                  {t.contactPage.formSubtitle}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#E87729]/15 border border-[#E87729]/40 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#E87729] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#E87729]/30">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-kufam font-bold text-2xl text-white">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="font-noto-arabic text-sm sm:text-base text-slate-200 max-w-md mx-auto">
                    {t.contactPage.successMessage}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'charter',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {isRTL ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-noto-arabic">
                  {/* Category Pills Selector */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      {t.contactPage.formCategory}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => handleCategorySelect(cat.key)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            formData.category === cat.key
                              ? 'bg-[#E87729] text-white shadow-md shadow-[#E87729]/30 border border-[#E87729]'
                              : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t.contactPage.formName} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contactPage.formNamePlaceholder}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E87729] focus:bg-white/15 text-white placeholder-slate-400 text-sm outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t.contactPage.formEmail} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contactPage.formEmailPlaceholder}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E87729] focus:bg-white/15 text-white placeholder-slate-400 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      {t.contactPage.formPhone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contactPage.formPhonePlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E87729] focus:bg-white/15 text-white placeholder-slate-400 text-sm outline-none transition-all font-mono"
                    />
                  </div>

                  {/* Message / Flight Details Textarea */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      {t.contactPage.formMessage} *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contactPage.formMessagePlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E87729] focus:bg-white/15 text-white placeholder-slate-400 text-sm outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-[#E87729] hover:bg-[#D5681E] disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-[#E87729]/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{submitting ? t.contactPage.formSubmitting : t.contactPage.formSubmit}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Footer */}
      <FooterSection currentPage="contact" onNavigate={onNavigate} />
    </div>
  );
};
