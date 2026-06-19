import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { HelpCircle, ChevronDown, Check } from 'lucide-react';

export default function PricingView() {
  const { t, language } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

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
      question: language === 'fr' ? "Qu’est-ce que la Loi 25 et pourquoi est-elle intégrée ?" : "What is Law 25 and why is it built-in?",
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
    }
  ];

  return (
    <div id="gh-pricing-view" className="font-sans text-slate-800 dark:text-slate-150 bg-slate-50/50 dark:bg-slate-950 pt-24 pb-28 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in font-sans">
          <h1 className="text-3xl sm:text-4xl lg:text-5.5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-none mb-4">
            {t('pricingPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-4">
            {t('pricingPage.subtitle')}
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
            {t('pricingPage.taxDisclaimer')}
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24 font-sans">
          
          {/* Starter Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-3xs relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 font-sans">
            <div>
              <div className="mb-6">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[9.5px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {t('pricingPage.starter')}
                </span>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('pricingPage.starterPrice')} $
                  </span>
                  <span className="ml-1 text-slate-500 dark:text-slate-400 text-xs font-mono">/ {t('common.daycare')} / mois</span>
                </div>
                <p className="mt-3 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {t('pricingPage.starterDesc')}
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <ul className="space-y-3.5">
                  {starterFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-650 dark:text-slate-300 leading-tight">
                      <Check size={14} className="text-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100/60 dark:border-slate-800">
              <button className="w-full text-center py-3 px-4 rounded-lg text-xs font-bold text-white bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 transition duration-150 cursor-pointer">
                {t('pricingPage.ctaFull')}
              </button>
            </div>
          </div>

          {/* Premium Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-amber-400 shadow-sm relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 font-sans">
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 px-3 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded-bl-lg">
              Recommandé ⭐
            </div>

            <div>
              <div className="mb-6">
                <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-250 text-[9.5px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {t('pricingPage.premium')}
                </span>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('pricingPage.premiumPrice')} $
                  </span>
                  <span className="ml-1 text-slate-500 dark:text-slate-400 text-xs font-mono">/ {t('common.daycare')} / mois</span>
                </div>
                <p className="mt-3 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {t('pricingPage.premiumDesc')}
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <ul className="space-y-3.5">
                  {premiumFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-650 dark:text-slate-300 leading-tight">
                      <Check size={14} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100/60 dark:border-slate-800">
              <button className="w-full text-center py-3 px-4 rounded-lg text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 transition duration-150 cursor-pointer">
                {t('pricingPage.ctaFull')}
              </button>
            </div>
          </div>

        </div>

        {/* Collapsible FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 dark:text-white tracking-tight text-center mb-10 flex items-center justify-center gap-2 font-sans">
            <HelpCircle size={20} className="text-amber-500" />
            <span>{t('pricingPage.faqTitle')}</span>
          </h2>
          <div className="space-y-4 font-sans">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-3xs transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 sm:px-6 py-4 flex justify-between items-center bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition cursor-pointer"
                >
                  <span className="font-semibold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      activeFaq === faq.id ? 'transform rotate-180 text-slate-900 dark:text-white' : ''
                    }`}
                  />
                </button>
                
                {activeFaq === faq.id && (
                  <div className="px-6 pb-4 text-xs text-slate-550 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-2.5 bg-slate-50/35 dark:bg-slate-950/25">
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
