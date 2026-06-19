import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Globe, FileText, CreditCard, Users, MessageSquare, ShieldCheck, Key, Zap, ArrowRight, Check } from 'lucide-react';

const features = (t: (k: string) => string, language: string) => [
  {
    id: 'website',
    icon: <Globe size={22} />,
    tag: 'MODULE SITE INTERNET',
    tagColor: 'text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/40',
    accentColor: 'bg-sky-500',
    title: t('featuresPage.section1Title'),
    desc: t('featuresPage.section1Desc'),
    bullets: [
      language === 'fr' ? 'Génération instantanée sans coder' : 'Instant generation without coding',
      language === 'fr' ? 'Formulaire bilingue intégré et sécurisé' : 'Integrated bilingual secure form',
      language === 'fr' ? 'Export sous-domaine complet' : 'Full subdomain export',
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center text-base">🦉</div>
          <div>
            <div className="text-[12px] font-black text-slate-900 dark:text-white">Académie des p'tits hiboux</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              académie-hiboux.garderiehub.ca
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Rejoindre la liste d'attente</div>
          <div className="flex gap-2">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 flex-1 text-[10.5px] text-slate-400">
              Entrez votre courriel...
            </div>
            <div className="bg-amber-400 text-amber-950 font-black px-4 rounded-lg flex items-center justify-center text-[11px] shadow-sm cursor-pointer whitespace-nowrap">
              S'inscrire
            </div>
          </div>
          <div className="mt-3 text-[9.5px] text-slate-400 font-mono text-center">
            🔒 Sécurisé SSL · Bilingue FR/EN · Aucun cookie tiers
          </div>
        </div>
      </div>
    ),
    reverse: false
  },
  {
    id: 'records',
    icon: <FileText size={22} />,
    tag: 'DOSSIERS & DOCUMENTS',
    tagColor: 'text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/40',
    accentColor: 'bg-rose-500',
    title: t('featuresPage.section2Title'),
    desc: t('featuresPage.section2Desc'),
    bullets: [
      language === 'fr' ? "Alertes automatiques 30 jours à l'avance" : 'Automatic alerts 30 days ahead',
      language === 'fr' ? 'Tri des autorisations de médicaments' : 'Medication authorization sorting',
      language === 'fr' ? 'Téléchargement crypté de bout en bout' : 'End-to-end encrypted download',
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm space-y-3">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          Alertes documents à renouveler
        </div>
        {[
          { name: 'Vaccin DcaT-Polio (Emma G.)', parent: 'Parent: Chloé G.', days: '12', color: 'rose' },
          { name: 'Fiche allergie (Théo M.)', parent: 'Parent: Lucas M.', days: '5', color: 'orange' },
          { name: 'Contrat annuel (Sofia B.)', parent: 'Parent: Ana B.', days: '28', color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-50/70 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/40">
            <div>
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
              <div className="text-[9.5px] text-slate-400">{item.parent}</div>
            </div>
            <span className={`text-[8.5px] font-mono font-black px-2 py-1 rounded-lg ${
              item.color === 'rose' ? 'text-rose-700 bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900' :
              item.color === 'orange' ? 'text-orange-700 bg-orange-100 dark:bg-orange-950/40 dark:text-orange-300 border border-orange-200 dark:border-orange-900' :
              'text-amber-700 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
            }`}>
              {item.days}j restants
            </span>
          </div>
        ))}
      </div>
    ),
    reverse: true
  },
  {
    id: 'billing',
    icon: <CreditCard size={22} />,
    tag: 'FACTURATION STRIPE',
    tagColor: 'text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/40',
    accentColor: 'bg-indigo-500',
    title: t('featuresPage.section3Title'),
    desc: t('featuresPage.section3Desc'),
    bullets: [
      language === 'fr' ? 'Prélèvement préautorisé bilingue Stripe' : 'Bilingual Stripe pre-authorized debit',
      language === 'fr' ? 'Escalades de paiement sans friction' : 'Frictionless payment escalations',
      language === 'fr' ? 'Conciliation bancaire automatique' : 'Automatic bank reconciliation',
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm">
        <div className="h-44 bg-slate-950 rounded-xl p-5 text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[8.5px] text-slate-400 tracking-widest block font-bold font-mono">FACTURATION RÉCURRENTE</span>
              <span className="text-base font-black tracking-tight">Stripe Direct Debit</span>
            </div>
            <ShieldCheck size={22} className="text-emerald-400" />
          </div>
          <div className="space-y-2.5">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Prochain run :</span>
              <span className="font-mono text-slate-200 font-bold">22 Juin 2026</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-3/4 rounded-full" />
            </div>
            <div className="flex justify-between text-[10.5px] font-semibold font-mono">
              <span className="text-slate-400">94 Parents abonnés</span>
              <span className="text-emerald-400 font-black">14 200,00 $ / mois</span>
            </div>
          </div>
        </div>
      </div>
    ),
    reverse: false
  },
  {
    id: 'parents',
    icon: <Users size={22} />,
    tag: 'PORTAIL FAMILLES',
    tagColor: 'text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/40',
    accentColor: 'bg-teal-500',
    title: t('featuresPage.section4Title'),
    desc: t('featuresPage.section4Desc'),
    bullets: [
      language === 'fr' ? 'Interface adaptative mobile autonome' : 'Standalone adaptive mobile interface',
      language === 'fr' ? "Saisie des contraintes d'allergies" : 'Allergy constraint input',
      language === 'fr' ? "Messagerie simplifiée de l'éducatrice" : "Simplified educator messaging",
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center text-sm font-black text-teal-700 dark:text-teal-300 font-mono">C</div>
          <div>
            <div className="text-[12px] font-black text-slate-900 dark:text-white">Portail Papa de Catherine</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connecté
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { color: 'amber', label: 'Relevé 24', icon: '🧾' },
            { color: 'teal', label: 'Fiche Médicale', icon: '💊' },
            { color: 'rose', label: 'Absence', icon: '📅' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/40 text-center">
              <div className="text-lg mb-1">{item.icon}</div>
              <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 block leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    reverse: true
  },
  {
    id: 'chat',
    icon: <MessageSquare size={22} />,
    tag: 'CLAVARDAGE & APPELS',
    tagColor: 'text-violet-700 dark:text-violet-300 bg-violet-100/80 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900/40',
    accentColor: 'bg-violet-500',
    title: t('featuresPage.section5Title'),
    desc: t('featuresPage.section5Desc'),
    bullets: [
      language === 'fr' ? "Annonces d'urgences de tempêtes" : 'Emergency storm announcements',
      language === 'fr' ? 'Notifications instantanées poussées' : 'Instant push notifications',
      language === 'fr' ? 'Archives immutables légales' : 'Immutable legal archives',
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm space-y-3">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Chat sécurisé — Garderie Étoile Polaire
        </div>
        <div className="space-y-2.5 max-w-full">
          {[
            { msg: "Bonjour ! Catherine a-t-elle bien fait sa sieste ?", side: 'left', sender: 'Papa de Catherine' },
            { msg: "Oui ! Un dodo de 1h30 très réparateur 😊 Elle est de superbe humeur !", side: 'right', sender: 'Mme Chantal' },
            { msg: "Merci beaucoup ! 🙏", side: 'left', sender: 'Papa de Catherine' },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.side === 'right' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-2.5 rounded-xl text-[11px] ${
                m.side === 'left' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none' 
                  : 'bg-slate-950 text-white rounded-tr-none'
              }`}>
                <div className="text-[8.5px] font-bold mb-1 opacity-60">{m.sender}</div>
                {m.msg}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    reverse: false
  },
  {
    id: 'security',
    icon: <ShieldCheck size={22} />,
    tag: 'PROTECTION & CONFIDENTIALITÉ',
    tagColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40',
    accentColor: 'bg-emerald-500',
    title: t('featuresPage.section6Title'),
    desc: t('featuresPage.section6Desc'),
    bullets: [
      language === 'fr' ? 'Chiffrement AES-256 complet au repos' : 'Full AES-256 encryption at rest',
      language === 'fr' ? 'Serveurs réglementés hébergés au Québec' : 'Regulated servers hosted in Quebec',
      language === 'fr' ? 'Journal de transparence immutable' : 'Immutable transparency log',
    ],
    visual: (
      <div className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm space-y-3">
        <div className="p-4 bg-slate-950 text-slate-300 text-[9.5px] rounded-xl border border-slate-900 space-y-2 font-mono">
          <div className="text-emerald-400 font-black tracking-wider flex items-center gap-1.5">
            <Key size={11} />
            [SECURE CRYPTO ENGINE ACTIVE]
          </div>
          <div className="text-slate-400">&gt; Checking cryptographic keys... <span className="text-emerald-400 font-bold">OK</span></div>
          <div className="text-slate-400">&gt; Storage: Montréal, QC (Canada-East)... <span className="text-emerald-400 font-bold">OK</span></div>
          <div className="text-slate-400">&gt; Immutable audit double entry... <span className="text-emerald-400 font-bold">OK</span></div>
          <div className="text-slate-400">&gt; Loi 25 compliance check... <span className="text-emerald-400 font-bold">PASS</span></div>
          <div className="text-slate-400">&gt; 2FA / TOTP active... <span className="text-emerald-400 font-bold">OK</span></div>
          <div className="text-amber-400 font-black mt-2 pt-2 border-t border-slate-800">✓ SYSTEM FULLY SECURED</div>
        </div>
      </div>
    ),
    reverse: true
  }
];

export default function FeaturesView() {
  const { t, language } = useLanguage();
  const featureList = features(t, language);

  return (
    <div id="gh-features-view" className="font-sans text-slate-800 dark:text-slate-100 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-200">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-slate-100 dark:border-slate-800/70 hero-grid-bg">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-3xl mx-auto space-y-5 animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 font-black rounded-full text-[10px] font-mono tracking-wider">
              <Zap size={10} className="fill-amber-600 dark:fill-amber-400" />
              {language === 'fr' ? '6 MODULES INTÉGRÉS' : '6 INTEGRATED MODULES'}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('featuresPage.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-light">
              {t('featuresPage.subtitle')}
            </p>
          </div>

          {/* Module pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {featureList.map((f) => (
              <a
                key={f.id}
                href={`#feature-${f.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10.5px] font-bold text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer shadow-sm"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${f.accentColor}`} />
                {f.tag.replace(' & ', ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Features Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">
        {featureList.map((feature, idx) => (
          <div 
            key={feature.id} 
            id={`feature-${feature.id}`}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center animate-fade-in-up`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* Text */}
            <div className={`space-y-5 ${feature.reverse ? 'lg:order-2' : ''}`}>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9.5px] font-mono font-bold border uppercase ${feature.tagColor}`}>
                {React.cloneElement(feature.icon as React.ReactElement, { size: 10 })}
                {feature.tag}
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {feature.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {feature.desc}
              </p>
              <ul className="space-y-3">
                {feature.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <span className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-amber-600 dark:text-amber-400 stroke-[3]" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className={`${feature.reverse ? 'lg:order-1' : ''}`}>
              {feature.visual}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
            {language === 'fr' ? 'Prêt à découvrir la plateforme ?' : 'Ready to discover the platform?'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-md mx-auto">
            {language === 'fr'
              ? 'Testez le simulateur interactif pour voir exactement ce que verront vos garderies partenaires.'
              : 'Test the interactive simulator to see exactly what your partner daycares will see.'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-xl text-xs transition-all shadow-md hover:shadow-amber-300/40 hover:shadow-lg active:scale-[0.97] cursor-pointer">
              <Zap size={13} className="fill-amber-950" />
              {language === 'fr' ? 'Lancer le Simulateur' : 'Launch Simulator'}
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs border border-slate-200 dark:border-slate-700 transition cursor-pointer">
              <ArrowRight size={12} />
              {language === 'fr' ? 'Voir les Tarifs' : 'View Pricing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
