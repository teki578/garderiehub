import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Shield } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-amber-950 text-amber-200/70 text-xs py-10 border-t border-amber-900 font-sans font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer line */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-amber-900/40 pb-6 mb-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-amber-900 rounded-xl flex items-center justify-center text-amber-250 text-sm shadow-3xs">
              🧸
            </div>
            <span className="font-display font-black text-sm text-white tracking-tight">
              {language === 'fr' ? (
                <>Portail<span className="text-amber-400 font-bold">Garderie</span></>
              ) : (
                <>Garderie<span className="text-amber-400 font-bold">Hub</span></>
              )}
            </span>
          </div>
          
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400 flex items-center gap-1.5 text-center sm:text-right">
            <Shield size={11} className="text-amber-400" /> {language === 'fr' ? 'ESPACE PRIVÉ ET SÉCURISÉ' : 'SECURED PRIVATE HUB'} &bull; MONTREAL, QC
          </span>
        </div>

        {/* Lower copyright legal block */}
        <div className="flex flex-col sm:flex-row justify-between text-[10.5px] text-amber-300/40 gap-2 font-medium">
          <span>&copy; {new Date().getFullYear()} {language === 'fr' ? 'PortailGarderie' : 'GarderieHub'} &bull; {language === 'fr' ? 'Portail personnel de King Lenns' : 'King Lenns personal portal'}. Tous droits réservés.</span>
          <span>{language === 'fr' ? 'Fait avec amour pour nos tout-petits 👶' : 'Made with love for our toddlers 👶'}</span>
        </div>

      </div>
    </footer>
  );
}
