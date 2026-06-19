import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import HomeView from './components/HomeView.tsx';
import FeaturesView from './components/FeaturesView.tsx';
import PricingView from './components/PricingView.tsx';
import DemoView from './components/DemoView.tsx';
import LegalView from './components/LegalView.tsx';
import ContactView from './components/ContactView.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import Footer from './components/Footer.tsx';
import { useTheme } from './context/ThemeContext.tsx';

export default function App() {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('garderiehub_admin_logged') === 'true';
  });

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('garderiehub_admin_logged', 'true');
    // switch to demo tab when logged in so that the user instantly sees the admin panel features
    setCurrentView('demo'); 
    setIsAdminOpen(false);
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('garderiehub_admin_logged');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setCurrentView={setCurrentView} />;
      case 'features':
        return <FeaturesView />;
      case 'pricing':
        return <PricingView />;
      case 'demo':
        return <DemoView />;
      case 'legal':
        return <LegalView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50/10 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* Dynamic Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Dynamic Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Credential Overlay Admin panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
