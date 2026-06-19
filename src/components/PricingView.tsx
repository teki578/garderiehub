import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { HelpCircle, ChevronDown, Check, Zap, Star, Shield, Users, FileText, CreditCard, MessageSquare, Globe } from 'lucide-react';

export default function PricingView() {
  const { t, language } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const starterFeatures = [
    t('pricingPage.feats.starter1'),
    t('pricingPage.feats.starter2'),
    t('pricingPage.feats.starter3'),
    t('pricingPage.feats.starter4'),
  ];

  const premiumFeatures = [
    t('pricingPage.feats.premium1'),
    t('pricingPage.feats.premium2'),
    t('pricingPage.feats.premium3'),
    t('pricingPage.feats.premium4'),
  ];

  const faqs = [
    {
      id: 'faq1',
      question: language === 'fr' ? "Qu'est-ce que la Loi 25 et pourquoi est-elle intégrée ?" : "What is Law 25 and why is it built-in?",
      answer: language === 'fr' 
        ? "La Loi 25 encadre la protection des données personnelles au Québec. GarderieHub crypte toutes les données d'enfants et comprend un journal de traces immutable conforme pour que vous n'ayez aucun souci avec les autorités."
        : "Law 25 regulates personal data protection in Quebec. GarderieHub encrypts all children data and includes an immutable audit log to keep you fully compliant."
    },
    {
      id: 'faq2',
      question: language === 'fr' ? "Y a-t-il une période d'essai gratuite ?" : "Is there a free trial?",
      answer: language === 'fr'
        ? "Oui ! Vous pouvez enregistrer n'importe quelle garderie sous le statut d'attente de paiement (Essai gratuit) afin de configurer l'ensemble des modules sans aucun frais de mise en route."
        : "Yes! You can register any daycare with trial status to configure all pages and tools without setup costs."
    },
    {
      id: 'faq3',
      question: language === 'fr' ? "Puis-je annuler mon forfait à tout moment ?" : "Can I cancel my plan anytime?",
      answer: language === 'fr'
        ? "Oui. Toutes vos ententes de signature de garderie sont résiliables sans engagement ni pénalité instantanément d'un simple clic depuis votre tableau de bord Espace Gestion."
        : "Yes. All daycare setups can be cancelled instantly with a single click from your Management space dashboard, without any locking commitment."
    },
    {
      id: 'faq4',
      question: language === 'fr' ? "Comment fonctionne la facturation Stripe ?" : "How does Stripe billing work?",
      answer: language === 'fr'
        ? "GarderieHub intègre Stripe pour les prélèvements préautorisés automatiques. Les parents entrent leur information bancaire une seule fois, et les paiements sont prélevés automatiquement selon la fréquence choisie par la garderie."
        : "GarderieHub integrates Stripe for automatic pre-authorized withdrawals. Parents enter their banking information once, and payments are automatically collected according to the frequency chosen by the daycare."
    }
  ];

  const includedInAll = [
    { icon: <Globe size={14} />, label: language === 'fr' ? 'Site public & formulaire waitlist' : 'Public site & waitlist form' },
    { icon: <Shield size={14} />, label: language === 'fr' ? 'Conformité Loi 25 incluse' : 'Law 25 compliance included' },
    { icon: <FileText size={14} />, label: language === 'fr' ? 'Dossiers médicaux cryptés' : 'Encrypted medical records' },
    { icon: <MessageSquare size={14} />, label: language === 'fr' ? 'Chat sécurisé parents' : 'Secure parent chat' },
    { icon: <CreditCard size={14} />, label: language === 'fr' ? 'Facturation Stripe' : 'Stripe billing' },
    { icon: <Users size={14} />, label: language === 'fr' ? 'Portail familles' : 'Family portal' },
  ];

  const starterMonthly = 39;
  const premiumMonthly = 149;
  const annualDiscount = 0.83; // 2 months free

  const starterPrice = billingCycle === 'annual' ? Math.round(starterMonthly * annualDiscount) : starterMonthly;
  const premiumPrice = billingCycle === 'annual' ? Math.round(premiumMonthly * annualDiscount) : premiumMonthly;

  return (
    <div id="gh-pricing-view" className="font-sans text-slate-800 dark:text-slate-100 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-200">
      
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-100 dark:border-slate-800/70 hero-grid-bg">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
          <div className="text-center max-w-3xl mx-auto space-y-5 animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 font-black rounded-full text-[10px] font-mono tracking-wider">
              <Star size={10} className="fill-amber-500 text-amber-500" />
              {language === 'fr' ? 'TARIFICATION SIMPLE ET TRANSPARENTE' : 'SIMPLE & TRANSPARENT PRICING'}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('pricingPage.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-light">
              {t('pricingPage.subtitle')}
            </p>
            
            {/* Billing toggle */}
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-[11.5px] font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {language === 'fr' ? 'Mensuel' : 'Monthly'}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-xl text-[11.5px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  billingCycle === 'annual' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {language === 'fr' ? 'Annuel' : 'Annual'}
                <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[9px] font-black rounded font-mono">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Included in all plans bar */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-5 mb-12 animate-fade-in-up">
          <div className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3 text-center">
            {language === 'fr' ? '✓ Inclus dans tous les forfaits' : '✓ Included in all plans'}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {includedInAll.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <span className="text-amber-500 shrink-0">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* Starter Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 animate-fade-in-up">
            <div>
              <div className="mb-6">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9.5px] font-mono font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {t('pricingPage.starter')}
                </span>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white">
                    {starterPrice}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-sm font-mono mb-1">
                    $ / {language === 'fr' ? 'garderie / mois' : 'daycare / mo'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="mt-1 text-[10.5px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    💰 {language === 'fr' ? '2 mois offerts par an' : '2 months free per year'}
                  </div>
                )}
                <p className="mt-3 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {t('pricingPage.starterDesc')}
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <ul className="space-y-3.5">
                  {starterFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-[11.5px] text-slate-600 dark:text-slate-300 leading-snug">
                      <Check size={14} className="text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button className="w-full text-center py-3.5 px-4 rounded-xl text-[12px] font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 transition cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98]">
                {t('pricingPage.ctaFull')}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-mono">
                {language === 'fr' ? 'Essai 14 jours · Sans carte bancaire' : '14-day trial · No credit card'}
              </p>
            </div>
          </div>

          {/* Premium Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-amber-400 shadow-lg relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-amber-200/20 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
            {/* Recommended badge */}
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1">
              <Star size={9} className="fill-amber-950" />
              {language === 'fr' ? 'Recommandé' : 'Recommended'}
            </div>

            {/* Glow bg */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="mb-6">
                <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[9.5px] font-mono font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {t('pricingPage.full')}
                </span>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white">
                    {premiumPrice}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-sm font-mono mb-1">
                    $ / {language === 'fr' ? 'garderie / mois' : 'daycare / mo'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="mt-1 text-[10.5px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    💰 {language === 'fr' ? '2 mois offerts par an' : '2 months free per year'}
                  </div>
                )}
                <p className="mt-3 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {t('pricingPage.fullDesc')}
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <ul className="space-y-3.5">
                  {premiumFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-[11.5px] text-slate-600 dark:text-slate-300 leading-snug">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-100 dark:border-slate-800">
              <button className="w-full text-center py-3.5 px-4 rounded-xl text-[12px] font-black text-amber-950 bg-amber-400 hover:bg-amber-500 transition cursor-pointer shadow-md hover:shadow-amber-300/40 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                <Zap size={13} className="fill-amber-950" />
                {t('pricingPage.ctaFull')}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-mono">
                {language === 'fr' ? 'Essai 14 jours · Sans carte bancaire' : '14-day trial · No credit card'}
              </p>
            </div>
          </div>

        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20">
          {[
            { icon: '🇨🇦', label: language === 'fr' ? 'Hébergé au Canada' : 'Hosted in Canada' },
            { icon: '🔒', label: language === 'fr' ? 'AES-256 chiffré' : 'AES-256 encrypted' },
            { icon: '📋', label: language === 'fr' ? 'Conforme Loi 25' : 'Law 25 compliant' },
            { icon: '⚡', label: language === 'fr' ? 'Uptime 99.9%' : '99.9% uptime' },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[10.5px] font-bold text-slate-600 dark:text-slate-400">{b.label}</span>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight text-center mb-10 flex items-center justify-center gap-2">
            <HelpCircle size={20} className="text-amber-500" />
            <span>{t('pricingPage.faqTitle')}</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 sm:px-6 py-4 flex justify-between items-center hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition cursor-pointer gap-4"
                >
                  <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white flex-1">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                      activeFaq === faq.id ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>
                
                {activeFaq === faq.id && (
                  <div className="px-6 pb-5 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 bg-slate-50/30 dark:bg-slate-950/20 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
