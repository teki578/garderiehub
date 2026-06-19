import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Mail, Phone, CheckCircle, Clock } from 'lucide-react';

export default function ContactView() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    daycareName: '',
    city: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          daycareName: '',
          city: '',
          email: '',
          phone: '',
          preferredContact: 'email',
          message: ''
        });
      } else {
        setErrorMsg(language === 'fr' ? 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' : 'An error occurred while sending. Please try again.');
      }
    } catch (err) {
      setErrorMsg(language === 'fr' ? 'Impossible de joindre le serveur. Veuillez réessayer.' : 'Unable to reach the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="gh-contact-view" className="font-sans text-slate-800 bg-slate-50 pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Side Info Panel */}
          <div className="lg:col-span-2 bg-slate-900 text-slate-300 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 uppercase">
                {language === 'fr' ? 'Siège social Montréal' : 'Montreal Headquarters'}
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug font-sans">
                {language === 'fr' ? 'Une équipe québécoise à votre entière disposition' : 'A Quebec-based team at your service'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'fr' 
                  ? "Notre assistance technique bilingue est basée à Montréal et répond en moins de deux heures ouvrables pour toute question de conformité ou transition de paiement." 
                  : "Our bilingual technical assistance is based in Montreal and answers in less than two business hours for any compliance or payment transition questions."
                }
              </p>
            </div>
            
            <div className="space-y-4 pt-8 text-xs border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 text-indigo-400 flex items-center justify-center">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="block text-slate-500 font-medium text-[10px]">{language === 'fr' ? 'Courriel direct' : 'Direct Email'}</span>
                  <a href={language === 'fr' ? 'mailto:contact@portailgarderie.ca' : 'mailto:contact@garderiehub.ca'} className="font-semibold text-slate-250 hover:text-white transition">
                    {language === 'fr' ? 'contact@portailgarderie.ca' : 'contact@garderiehub.ca'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 text-indigo-400 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="block text-slate-500 font-medium text-[10px]">{language === 'fr' ? 'Appel gratuit' : 'Toll-Free'}</span>
                  <a href="tel:+18005550200" className="font-semibold text-slate-250 hover:text-white transition">1 (800) 555-0200</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center">
                  <Clock size={14} />
                </div>
                <div>
                  <span className="block text-slate-500 font-medium text-[10px]">{language === 'fr' ? 'Délai moyen de réponse' : 'Average Response Time'}</span>
                  <span className="font-semibold text-slate-250">{language === 'fr' ? 'Moins de deux heures' : 'Less than two hours'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-3 p-8 flex flex-col justify-center">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('contact.successDesc')}
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
                  >
                    {language === 'fr' ? 'Effectuer une autre soumission' : 'Make another submission'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-100">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.fName')}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Marie-Claude"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.lName')}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Roy"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.daycareName')}</label>
                    <input
                      type="text"
                      name="daycareName"
                      value={formData.daycareName}
                      onChange={handleChange}
                      placeholder="Garderie Des Petits Anges"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.city')}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Montréal"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('common.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="direction@petitsanges.ca"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="514-555-0199"
                      className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('contact.prefContact')}</label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white cursor-pointer font-medium"
                  >
                    <option value="email">{language === 'fr' ? 'Courriel' : 'Email'}</option>
                    <option value="phone">{language === 'fr' ? 'Téléphone' : 'Phone (Direct line)'}</option>
                    <option value="sms">{language === 'fr' ? 'SMS / Message texte' : 'SMS (Cellular text)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('common.message')}</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Saisissez vos questions ici..."
                    className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isSubmitting ? t('common.submitting') : t('contact.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
