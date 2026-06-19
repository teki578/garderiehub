import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { Globe, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Navbar({ currentView, setCurrentView, onOpenAdmin, isAdminLoggedIn, onLogoutAdmin }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navItems = [
    { id: 'home', label: language === 'fr' ? '📊 Espace Gestion' : '📊 Management Space' },
    { id: 'demo', label: language === 'fr' ? '🕹️ Simulateur Public' : '🕹️ Public Simulator' },
    { id: 'legal', label: language === 'fr' ? '💡 FAQ & Sécurité' : '💡 FAQ & Security' }
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/50 dark:border-slate-800/80 font-sans shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Friendly Logo Brand Block */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="h-9 w-9 bg-amber-400 text-amber-950 rounded-2xl flex items-center justify-center text-base shadow-3xs hover:scale-105 transition">
              🧸
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white block leading-none">
              {language === 'fr' ? (
                <>Portail<span className="text-amber-500 font-bold">Garderie</span></>
              ) : (
                <>Garderie<span className="text-amber-500 font-bold">Hub</span></>
              )}
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block tracking-tight leading-none mt-1 uppercase font-mono">
                Portail de King Lenns ✨
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs tracking-tight transition cursor-pointer relative h-16 flex items-center border-b-2 font-bold ${
                    isActive 
                      ? 'text-amber-600 dark:text-amber-400 border-amber-400 dark:border-amber-400' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Block */}
          <div className="hidden md:flex items-center gap-3">
            {/* Friendly Accessible Dark/Light Mode Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200/50 dark:border-slate-700 flex items-center justify-center shadow-3xs"
              title={theme === 'light' ? 'Mode Nuit' : 'Mode Jour'}
            >
              {theme === 'light' ? (
                <Moon size={14} className="text-amber-600 fill-amber-550" />
              ) : (
                <Sun size={14} className="text-amber-400 fill-amber-350" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-750 transition cursor-pointer"
            >
              <Globe size={12} className="text-slate-500 dark:text-slate-400" />
              <span>{language === 'fr' ? 'Anglais' : 'Français'}</span>
            </button>

            {/* Quick Portal Switcher CTA */}
            <button
              onClick={() => handleNavClick('demo')}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-black transition cursor-pointer shadow-3xs"
            >
              🕹️ {language === 'fr' ? 'Lancer Simulateur' : 'Launch Simulator'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            {/* Quick Mobile Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-750 dark:text-slate-350 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            >
              {language === 'fr' ? 'ANG' : 'FR'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none transition cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-amber-150 dark:border-slate-800 py-3.5 px-4 space-y-2 animate-fade-in font-sans">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive 
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-955 dark:text-amber-300' 
                    : 'text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('demo')}
              className="w-full text-center py-2.5 text-xs font-black text-amber-950 bg-amber-400 rounded-xl"
            >
              🕹️ {language === 'fr' ? 'Lancer Simulateur' : 'Launch Simulator'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
