import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { Globe, Menu, X, Sun, Moon, Shield, ChevronDown, Zap } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Navbar({ currentView, setCurrentView, onOpenAdmin, isAdminLoggedIn, onLogoutAdmin }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navItems = [
    { id: 'home', label: language === 'fr' ? 'Espace Gestion' : 'Dashboard' },
    { id: 'features', label: language === 'fr' ? 'Fonctionnalités' : 'Features' },
    { id: 'pricing', label: language === 'fr' ? 'Tarifs' : 'Pricing' },
    { id: 'demo', label: language === 'fr' ? 'Simulateur' : 'Simulator' },
    { id: 'legal', label: language === 'fr' ? 'Sécurité' : 'Security' },
    { id: 'contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 font-sans ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-amber-200/60 dark:border-slate-800/80' 
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-100/40 dark:border-slate-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="h-9 w-9 bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 rounded-2xl flex items-center justify-center text-base shadow-md group-hover:scale-110 group-hover:shadow-amber-300/50 group-hover:shadow-lg transition-all duration-300">
              🧸
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white block leading-none transition-colors">
                {language === 'fr' ? (
                  <>Portail<span className="text-amber-500">Garderie</span></>
                ) : (
                  <>Garderie<span className="text-amber-500">Hub</span></>
                )}
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block tracking-tight leading-none mt-0.5 uppercase font-mono">
                {language === 'fr' ? 'Plateforme de King Lenns ✨' : 'King Lenns Platform ✨'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-[11.5px] font-bold rounded-lg transition-all duration-200 cursor-pointer relative ${
                    isActive 
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 flex items-center justify-center shadow-sm"
              title={theme === 'light' ? 'Mode Nuit' : 'Mode Jour'}
            >
              {theme === 'light' ? (
                <Moon size={14} className="text-amber-600" />
              ) : (
                <Sun size={14} className="text-amber-400" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition cursor-pointer shadow-sm"
            >
              <Globe size={11} className="text-slate-400" />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Admin / Security Badge */}
            {isAdminLoggedIn ? (
              <button
                onClick={onLogoutAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition cursor-pointer shadow-sm"
              >
                <Shield size={11} />
                <span>{language === 'fr' ? 'Admin Connecté' : 'Admin Active'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer shadow-sm"
              >
                <Shield size={11} className="text-slate-400" />
                <span>Admin</span>
              </button>
            )}

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('demo')}
              className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 rounded-xl text-[11.5px] font-black transition-all cursor-pointer shadow-md hover:shadow-amber-300/40 hover:shadow-lg active:scale-[0.97] flex items-center gap-1.5"
            >
              <Zap size={11} className="fill-amber-950" />
              {language === 'fr' ? 'Simulateur' : 'Live Demo'}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              {language === 'fr' ? 'EN' : 'FR'}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-amber-100 dark:border-slate-800 py-4 px-4 space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive 
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('demo')}
              className="w-full text-center py-3 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md"
            >
              🕹️ {language === 'fr' ? 'Lancer Simulateur' : 'Launch Simulator'}
            </button>
            {!isAdminLoggedIn && (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                🔒 Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
