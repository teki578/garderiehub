import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Shield, MapPin, Mail, Phone, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentView?: (view: string) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const { language } = useLanguage();

  const navigate = (view: string) => {
    if (setCurrentView) setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { label: language === 'fr' ? 'Fonctionnalités' : 'Features', view: 'features' },
    { label: language === 'fr' ? 'Tarifs' : 'Pricing', view: 'pricing' },
    { label: language === 'fr' ? 'Simulateur Live' : 'Live Simulator', view: 'demo' },
    { label: language === 'fr' ? 'Sécurité & FAQ' : 'Security & FAQ', view: 'legal' },
  ];

  const supportLinks = [
    { label: language === 'fr' ? 'Nous Contacter' : 'Contact Us', view: 'contact' },
    { label: language === 'fr' ? 'Mon Espace Gestion' : 'Dashboard', view: 'home' },
    { label: language === 'fr' ? 'Loi 25 & Conformité' : 'Law 25 Compliance', view: 'legal' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans">
      {/* Top footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-lg shadow-lg">
                🧸
              </div>
              <div>
                <span className="font-display font-black text-base text-white block leading-none">
                  {language === 'fr' ? (
                    <>Portail<span className="text-amber-400">Garderie</span></>
                  ) : (
                    <>Garderie<span className="text-amber-400">Hub</span></>
                  )}
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase tracking-wider mt-0.5">
                  {language === 'fr' ? 'Par King Lenns · Montréal, QC' : 'By King Lenns · Montreal, QC'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
              {language === 'fr'
                ? "La plateforme SaaS dédiée aux milieux familiaux et CPE du Québec. Gestion d'enfants, dossiers médicaux, facturation et communication — tout en un."
                : "The SaaS platform dedicated to Quebec's daycares and childcare centers. Children management, medical records, billing and communication — all in one."}
            </p>
            
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={12} className="text-amber-500 shrink-0" />
                <span>Montréal, Québec, Canada</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={12} className="text-amber-500 shrink-0" />
                <span>info@garderiehub.ca</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone size={12} className="text-amber-500 shrink-0" />
                <span>1-888-GARDERIE</span>
              </div>
            </div>

            {/* Security badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-mono font-bold text-emerald-400">
              <Shield size={12} />
              <span>{language === 'fr' ? 'Conforme Loi 25 · AES-256 · Canada-Est' : 'Law 25 Compliant · AES-256 · Canada-East'}</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              {language === 'fr' ? 'Plateforme' : 'Platform'}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => navigate(link.view)}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer font-medium flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              {language === 'fr' ? 'Assistance' : 'Support'}
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => navigate(link.view)}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer font-medium flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[10.5px] text-slate-600 font-medium">
            © {new Date().getFullYear()} {language === 'fr' ? 'PortailGarderie' : 'GarderieHub'} · {language === 'fr' ? 'Portail personnel de' : 'Personal platform by'} <span className="text-slate-400 font-bold">King Lenns</span>. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </span>
          <span className="text-[10.5px] text-slate-600 flex items-center gap-1.5">
            {language === 'fr' ? 'Fait avec' : 'Made with'} 
            <Heart size={10} className="text-rose-500 fill-rose-500" /> 
            {language === 'fr' ? 'pour nos tout-petits 👶' : 'for our little ones 👶'}
          </span>
        </div>
      </div>
    </footer>
  );
}
