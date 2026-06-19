import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Globe, FileText, CreditCard, Users, MessageSquare, ShieldCheck, Key } from 'lucide-react';

export default function FeaturesView() {
  const { t } = useLanguage();

  return (
    <div id="gh-features-view" className="font-sans text-slate-800 dark:text-slate-150 bg-slate-50/50 dark:bg-slate-950 pt-24 pb-28 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in font-sans">
          <h1 className="text-3xl sm:text-4xl lg:text-5.5xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-none mb-4">
            {t('featuresPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {t('featuresPage.subtitle')}
          </p>
        </div>

        {/* Features Content Grid */}
        <div className="space-y-28">
          
          {/* Section 1 - Web Site & Waitlist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <Globe size={11} /> MODULE SITE INTERNET
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section1Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section1Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 font-medium font-sans">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Génération instantanée sans coder</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Formulaire bilingue intégré et hautement sécurisé</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Export instantané sous-domaine complet</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs space-y-4 font-sans font-light">
              <div className="border border-slate-200 dark:border-slate-750 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/70">
                <h3 className="text-[10px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <span>En direct de votre site public</span>
                </h3>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Académie des p'tits hiboux 🦉</div>
                <div className="text-[11px] text-slate-400 mt-1">Montréal, QC &bull; Places disponibles: 0</div>
                
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[10.5px] font-medium text-slate-700 dark:text-slate-300 mb-2">Rejoindre la liste d'attente (Waitlist)</div>
                  <div className="flex gap-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-700 rounded-lg p-2.5 flex-1 text-[10px] text-slate-400">
                      Entrez votre courriel...
                    </div>
                    <div className="bg-amber-400 text-amber-950 font-black px-4 rounded-lg flex items-center justify-center text-[11px] shadow-3xs">
                      S'inscrire
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2 - Medical Records */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <FileText size={11} /> DOSSIERS & DOCUMENTS
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section2Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section2Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-305 font-medium">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Alertes automatisées par courriel 30 jours à l'avance</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Tri sélectif des autorisations de médicaments</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Téléchargement sécurisé crypté de bout en bout</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs space-y-4 lg:order-1 font-sans">
              <div className="border border-slate-200 dark:border-slate-750 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/70">
                <h3 className="text-[10px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Alerte document à renouveler</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/50 dark:border-slate-750 shadow-3xs">
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Vaccin DcaT-Polio (Emma G.)</div>
                      <div className="text-[9.5px] text-slate-450 dark:text-slate-400">Parent: Chloé G.</div>
                    </div>
                    <span className="text-[8.5px] font-mono text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900">Expira: 12 Jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 - Invoicing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <CreditCard size={11} /> FACTURATION STRIPE
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section3Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section3Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-305 font-medium">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Prélèvement préautorisé bilingue Stripe</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Escalades de paiement sans friction d'équipe</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Conciliation bancaire automatique</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs relative overflow-hidden font-sans">
              <div className="h-44 bg-slate-950 rounded-xl p-5 text-white flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8.5px] text-slate-400 tracking-widest block font-bold font-mono">FACTURATION RÉCURRENTE</span>
                    <span className="text-base font-bold tracking-tight">Stripe Direct Debit</span>
                  </div>
                  <ShieldCheck size={24} className="text-emerald-400" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-405">
                    <span>Prochain run programmé :</span>
                    <span className="font-mono text-slate-200 font-bold">22 Juin 2026</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-3/4 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10.5px] text-slate-400 font-semibold font-mono">
                    <span>94 Parents abonnés</span>
                    <span className="text-emerald-450 font-bold text-emerald-400">14 200,00 $ / mois</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 - Parent Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center font-sans">
            <div className="space-y-5 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <Users size={11} /> PORTAIL FAMILLES
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section4Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section4Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-305 font-medium">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Interface adaptative mobile autonome</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Saisie directe des contraintes d'allergies</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Messagerie simplifiée de l'éducatrice</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs space-y-4 lg:order-1 font-sans">
              <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800 font-sans">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-7 w-7 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs font-mono">C</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Portail Papa de Catherine</h4>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-450 flex items-center gap-0.5 font-mono font-bold">&bull; Connecté au téléphone</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-205 dark:border-slate-750 shadow-3xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mx-auto mb-1.5" />
                    <span className="text-[8.5px] font-bold text-slate-650 dark:text-slate-300 block leading-tight font-sans">Reçus fiscaux Relevé 24</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-205 dark:border-slate-750 shadow-3xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-400 mx-auto mb-1.5" />
                    <span className="text-[8.5px] font-bold text-slate-650 dark:text-slate-300 block leading-tight font-sans">Fiche Médicale</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-205 dark:border-slate-750 shadow-3xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-450 mx-auto mb-1.5" />
                    <span className="text-[8.5px] font-bold text-slate-650 dark:text-slate-305 block leading-tight font-sans">Absence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 - Messaging */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center font-sans">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <MessageSquare size={11} /> CLAVARDAGE & APPELS
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section5Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section5Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-305 font-medium">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Annonces d'urgences de tempêtes</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Notifications instantanées poussées</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Archives immutables pour référence légale</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs space-y-4">
              <div className="space-y-2.5 max-w-sm mx-auto font-sans">
                <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded text-xs text-slate-700 dark:text-slate-300 max-w-[80%] rounded-tl-none font-sans font-light">
                  "Bonjour Mme Chantal, est-ce que Catherine a bien fait sa sieste de l'après-midi ?"
                </div>
                <div className="bg-slate-950 p-2.5 rounded text-xs text-white max-w-[80%] ml-auto rounded-tr-none font-sans font-light">
                  "Oui absolument, un dodo réparateur de 1h30. Elle est de superbe humeur !"
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 - Law 25 Secure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9.5px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 border border-slate-350/30 uppercase">
                <ShieldCheck size={11} /> PROTECTION & CONFIDENTIALITÉ
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t('featuresPage.section6Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans font-light">
                {t('featuresPage.section6Desc')}
              </p>
              <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-305 font-medium">
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Chiffrement AES-256 complet au repos</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Serveurs physiques réglementés hébergés au Québec</li>
                <li className="flex items-center gap-2.5"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Journal de transparence de support immutable</li>
              </ul>
            </div>
            
            {/* Visual Illustration */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-3xs space-y-3 lg:order-1 font-mono">
              <div className="p-4 bg-slate-950 text-slate-300 text-[9px] rounded border border-slate-900 space-y-2">
                <div className="text-emerald-400 font-bold tracking-wider flex items-center gap-1">
                  <Key size={11} /> [SECURE CRYPTO ENGINE ACTIVE]
                </div>
                <div>&gt; Checking cryptographic keys... OK</div>
                <div>&gt; Storage location: Montréal, QC (Zone Canada-East)</div>
                <div>&gt; Secure immutable double entry audit... OK</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
