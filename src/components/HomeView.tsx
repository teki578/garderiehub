import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Sparkles, Plus, Trash2, Layers, ExternalLink, Smile, Baby, 
  FileText, Activity, ArrowRight, MapPin, Mail, Phone, Shield,
  RefreshCw, TrendingUp, Users, Zap, Star, ChevronRight, Check,
  Globe, CreditCard, MessageSquare, Bell
} from 'lucide-react';

interface Daycare {
  id: string;
  name: string;
  city: string;
  capacity: number;
  enrolled: number;
  waitlistCount?: number;
  owner: string;
  email: string;
  phone: string;
  plan: 'Starter' | 'Premium';
  status: 'active' | 'pending_payment';
  createdAt: string;
}

interface HomeViewProps {
  setCurrentView: (view: string) => void;
}

export default function HomeView({ setCurrentView }: HomeViewProps) {
  const { language } = useLanguage();
  const [activePortalTab, setActivePortalTab] = useState<'hub' | 'public'>('hub');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [daycares, setDaycares] = useState<Daycare[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newDaycare, setNewDaycare] = useState({
    name: '',
    city: '',
    capacity: 20,
    owner: '',
    email: '',
    phone: '',
    plan: 'Premium' as 'Starter' | 'Premium',
    status: 'active' as 'active' | 'pending_payment'
  });

  const fetchDaycares = async () => {
    try {
      const response = await fetch('/api/daycares');
      if (response.ok) {
        const data = await response.json();
        setDaycares(data);
      }
    } catch (err) {
      const local = localStorage.getItem('garderiehub_daycares');
      if (local) {
        setDaycares(JSON.parse(local));
      } else {
        const defaultList: Daycare[] = [
          {
            id: 'dc-1',
            name: "Garderie Étoile Polaire ⭐️",
            city: "Montréal",
            capacity: 35,
            enrolled: 32,
            waitlistCount: 8,
            owner: "Chantal Lavoie",
            email: "chantal@etoilepolaire.ca",
            phone: "514-555-1234",
            plan: 'Premium',
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 'dc-2',
            name: "Château des Bout'choux 🏰",
            city: "Laval",
            capacity: 15,
            enrolled: 12,
            waitlistCount: 5,
            owner: "Mounir Ben Jelloun",
            email: "mounir@boutchouxlaval.ca",
            phone: "450-555-9876",
            plan: 'Starter',
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 'dc-3',
            name: "Milieu Familial Mélissa 🐰",
            city: "Longueuil",
            capacity: 9,
            enrolled: 9,
            waitlistCount: 3,
            owner: "Mélissa Gagnon",
            email: "melgagnon@coop.ca",
            phone: "450-555-4321",
            plan: 'Starter',
            status: 'pending_payment',
            createdAt: new Date().toISOString()
          },
          {
            id: 'dc-4',
            name: "CPE Les Petits Explorateurs 🔭",
            city: "Québec",
            capacity: 60,
            enrolled: 54,
            waitlistCount: 14,
            owner: "Brigitte Rousseau",
            email: "brigitte@explorateurs.ca",
            phone: "418-555-6789",
            plan: 'Premium',
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ];
        setDaycares(defaultList);
        localStorage.setItem('garderiehub_daycares', JSON.stringify(defaultList));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDaycares();
  }, []);

  useEffect(() => {
    if (!loading && daycares.length > 0) {
      localStorage.setItem('garderiehub_daycares', JSON.stringify(daycares));
    }
  }, [daycares, loading]);

  const handleAddDaycare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDaycare.name || !newDaycare.city || !newDaycare.owner) return;
    try {
      const response = await fetch('/api/daycares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDaycare)
      });
      if (response.ok) {
        setNewDaycare({ name: '', city: '', capacity: 20, owner: '', email: '', phone: '', plan: 'Premium', status: 'active' });
        setShowAddForm(false);
        fetchDaycares();
      }
    } catch (err) {
      const mockDc: Daycare = {
        id: "dc_" + Date.now(),
        ...newDaycare,
        enrolled: Math.floor(Math.random() * 5) + 5,
        waitlistCount: Math.floor(Math.random() * 8) + 2,
        createdAt: new Date().toISOString()
      };
      setDaycares([...daycares, mockDc]);
      setNewDaycare({ name: '', city: '', capacity: 20, owner: '', email: '', phone: '', plan: 'Premium', status: 'active' });
      setShowAddForm(false);
    }
  };

  const handleDeleteDaycare = async (id: string, name: string) => {
    if (!confirm(`Voulez-vous vraiment résilier la garderie "${name}" ?`)) return;
    try {
      const response = await fetch(`/api/daycares/${id}`, { method: 'DELETE' });
      if (response.ok) fetchDaycares();
    } catch (err) {
      const updated = daycares.filter(d => d.id !== id);
      setDaycares(updated);
      localStorage.setItem('garderiehub_daycares', JSON.stringify(updated));
    }
  };

  const totalDaycares = daycares.length;
  const totalEnrolled = daycares.reduce((sum, d) => sum + d.enrolled, 0);
  const totalCapacity = daycares.reduce((sum, d) => sum + d.capacity, 0);
  const totalWaitlist = daycares.reduce((sum, d) => sum + (d.waitlistCount || 0), 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  const metrics = [
    { 
      icon: <Users size={20} className="stroke-[2.5]" />,
      label: language === 'fr' ? 'Garderies Signées' : 'Signed Daycares',
      value: totalDaycares,
      sub: language === 'fr' ? 'installations actives' : 'active installations',
      color: 'amber',
      bg: 'from-amber-400/10 via-amber-100/30 to-transparent dark:from-amber-950/20 dark:via-slate-900',
      border: 'border-amber-200 dark:border-amber-900/30',
      iconBg: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
    },
    { 
      icon: <Baby size={20} className="stroke-[2.5]" />,
      label: language === 'fr' ? 'Enfants Inscrits' : 'Children Enrolled',
      value: totalEnrolled,
      sub: `${language === 'fr' ? 'Capacité' : 'Capacity'}: ${totalCapacity}`,
      color: 'teal',
      bg: 'from-teal-400/10 via-teal-100/30 to-transparent dark:from-teal-950/20 dark:via-slate-900',
      border: 'border-teal-200 dark:border-teal-900/30',
      iconBg: 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
    },
    { 
      icon: <FileText size={20} className="stroke-[2.5]" />,
      label: language === 'fr' ? "Listes d'attente" : 'Waitlist',
      value: totalWaitlist,
      sub: language === 'fr' ? 'enfants enregistrés' : 'registered children',
      color: 'sky',
      bg: 'from-sky-400/10 via-sky-100/30 to-transparent dark:from-sky-950/20 dark:via-slate-900',
      border: 'border-sky-200 dark:border-sky-900/30',
      iconBg: 'bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300'
    },
    { 
      icon: <TrendingUp size={20} className="stroke-[2.5]" />,
      label: language === 'fr' ? "Taux d'occupation" : 'Occupancy Rate',
      value: `${occupancyRate}%`,
      sub: 'Sécurité SHA-256',
      color: 'emerald',
      bg: 'from-emerald-400/10 via-emerald-100/30 to-transparent dark:from-emerald-950/20 dark:via-slate-900',
      border: 'border-emerald-200 dark:border-emerald-900/30',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
    },
  ];

  return (
    <div 
      id="gh-redesigned-home" 
      className={`font-sans tracking-tight min-h-screen transition-all duration-300 ${
        textSize === 'large' ? 'text-sm' : 'text-xs'
      } bg-gradient-to-b from-amber-50/80 via-orange-50/20 to-slate-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100`}
    >
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden hero-grid-bg border-b border-amber-100/60 dark:border-slate-800/60">
        {/* Background decoration */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="space-y-4 animate-fade-in-up">
              {/* Owner badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 font-black rounded-full text-[10px] tracking-wider uppercase font-mono shadow-sm">
                  <Smile size={11} />
                  {language === 'fr' ? 'Portail Privé' : 'Private Hub'}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                  → PROPRIÉTAIRE: KING LENNS
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-mono font-bold border border-emerald-200 dark:border-emerald-900/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {language === 'fr' ? 'Système Actif' : 'System Active'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                {language === 'fr' ? (
                  <>Bienvenue dans ton<br /><span className="text-amber-500">Hub de Gestion</span> 🧸</>
                ) : (
                  <>Welcome to your<br /><span className="text-amber-500">Management Hub</span> 🧸</>
                )}
              </h1>
              
              <p className="text-slate-500 dark:text-slate-400 font-light text-sm max-w-xl leading-relaxed">
                {language === 'fr'
                  ? "Ton espace privé pour superviser, configurer et administrer toutes les garderies partenaires. Simple, chaleureux et conçu pour être accessible."
                  : "Your private space to supervise, configure and administer all partner daycares. Simple, warm and designed for accessibility."}
              </p>

              {/* Quick action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('demo')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-xl text-xs transition-all shadow-md hover:shadow-amber-300/40 hover:shadow-lg active:scale-[0.97] cursor-pointer"
                >
                  <Zap size={13} className="fill-amber-950" />
                  {language === 'fr' ? 'Lancer Simulateur' : 'Launch Simulator'}
                </button>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
                >
                  <MessageSquare size={12} />
                  {language === 'fr' ? 'Contacter Support' : 'Contact Support'}
                </button>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              {/* Text size */}
              <button
                onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-sm text-[11px]"
                title="Agrandir le texte"
              >
                <span className="text-amber-500 font-black">A</span>
                <span className="text-amber-500 font-black text-[14px] leading-none">A+</span>
                <span className="text-slate-400 dark:text-slate-500">|</span>
                <span>{textSize === 'large' ? 'Normal' : 'Grand'}</span>
              </button>

              {/* View Toggle */}
              <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                <button
                  onClick={() => setActivePortalTab('hub')}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePortalTab === 'hub' 
                      ? 'bg-amber-400 text-amber-950 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Layers size={12} />
                  {language === 'fr' ? `Mon Espace (${totalDaycares})` : `My Hub (${totalDaycares})`}
                </button>
                <button
                  onClick={() => setActivePortalTab('public')}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePortalTab === 'public' 
                      ? 'bg-amber-400 text-amber-950 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Sparkles size={12} />
                  {language === 'fr' ? 'Démo Marketing' : 'Marketing Demo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ===== HUB TAB ===== */}
        {activePortalTab === 'hub' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
              {metrics.map((m, i) => (
                <div 
                  key={i}
                  className={`bg-gradient-to-br ${m.bg} p-6 rounded-3xl border ${m.border} shadow-sm hover:shadow-md card-glow transition-all duration-300 hover:scale-[1.02] animate-fade-in-up flex items-center gap-4`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={`h-12 w-12 rounded-2xl ${m.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                    {m.icon}
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono mb-0.5">{m.label}</span>
                    <span className="block text-2xl font-display font-black text-slate-900 dark:text-white leading-none">{m.value}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 block">{m.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Daycares list */}
              <div className="lg:col-span-2 space-y-5">
                
                {/* List header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-display font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      🏫 {language === 'fr' ? 'Mes Partenaires Actifs' : 'My Active Partners'}
                    </h2>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {language === 'fr' ? 'Toutes les installations sous contrat' : 'All contracted installations'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-amber-400 hover:bg-slate-800 dark:hover:bg-amber-500 text-white dark:text-amber-950 rounded-xl text-[11px] font-bold transition cursor-pointer shadow-sm"
                  >
                    <Plus size={13} />
                    {language === 'fr' ? 'Nouvelle Signature' : 'New Contract'}
                  </button>
                </div>

                {loading ? (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <RefreshCw className="animate-spin mx-auto mb-3 text-amber-400" size={24} />
                    <span className="text-slate-400 text-xs">{language === 'fr' ? 'Chargement...' : 'Loading...'}</span>
                  </div>
                ) : daycares.length === 0 ? (
                  <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-amber-300/60 text-slate-500">
                    <Smile size={32} className="mx-auto text-amber-400 mb-3 animate-float" />
                    <p className="font-bold text-sm">{language === 'fr' ? 'Aucune garderie enregistrée !' : 'No daycares registered!'}</p>
                    <p className="text-xs text-slate-400 mt-1">{language === 'fr' ? 'Créez votre première signature.' : 'Create your first contract.'}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {daycares.map((dc, idx) => (
                      <div 
                        key={dc.id}
                        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-md hover:border-amber-400/40 dark:hover:border-amber-500/30 card-glow transition-all duration-300 flex flex-col justify-between gap-4 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                      >
                        <div className="space-y-3">
                          {/* Card header */}
                          <div className="flex justify-between items-start">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/20 flex items-center justify-center text-lg shadow-sm">
                              🧸
                            </div>
                            <div className="flex gap-1.5 flex-wrap justify-end">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase ${
                                dc.status === 'active' 
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              }`}>
                                {dc.status === 'active' ? (language === 'fr' ? 'Active' : 'Active') : (language === 'fr' ? 'Essai' : 'Trial')}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[9px] font-mono font-bold text-slate-600 dark:text-slate-300">
                                {dc.plan}
                              </span>
                            </div>
                          </div>

                          {/* Name & city */}
                          <div>
                            <h4 className="font-display font-black text-[13px] text-slate-900 dark:text-white line-clamp-1">{dc.name}</h4>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={10} className="text-amber-500" /> {dc.city}, QC
                            </span>
                          </div>

                          {/* Stats mini */}
                          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800/70">
                            <div>
                              <span className="block text-[9px] text-slate-400 font-mono tracking-wider uppercase">{language === 'fr' ? 'Enfants' : 'Children'}</span>
                              <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">{dc.enrolled}/{dc.capacity} {language === 'fr' ? 'places' : 'spots'}</span>
                            </div>
                            <div>
                              <span className="block text-[9px] text-slate-400 font-mono tracking-wider uppercase">{language === 'fr' ? "Attente" : 'Waitlist'}</span>
                              <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">{(dc.waitlistCount || 0)} {language === 'fr' ? 'inscrits' : 'listed'}</span>
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="text-[10px] space-y-1 text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <span className="block font-bold text-slate-700 dark:text-slate-300">{language === 'fr' ? 'Direction :' : 'Director:'} {dc.owner}</span>
                            <span className="flex items-center gap-1"><Mail size={9} /> {dc.email}</span>
                            <span className="flex items-center gap-1"><Phone size={9} /> {dc.phone}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                          <button
                            onClick={() => setCurrentView('demo')}
                            className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <ExternalLink size={11} />
                            {language === 'fr' ? 'Portail' : 'Portal'}
                          </button>
                          <button
                            onClick={() => handleDeleteDaycare(dc.id, dc.name)}
                            className="px-3 py-2 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 border border-rose-200 dark:border-rose-900/40 cursor-pointer"
                          >
                            <Trash2 size={11} />
                            {language === 'fr' ? 'Résilier' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                
                {/* Info card */}
                <div className="p-5 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-indigo-950/15 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                    🍀
                  </div>
                  <h4 className="font-display font-black text-[13px] text-indigo-950 dark:text-indigo-200">
                    {language === 'fr' ? 'Comment ça marche ?' : 'How does it work?'}
                  </h4>
                  <p className="text-[11px] text-indigo-900/70 dark:text-indigo-300/60 leading-relaxed font-light">
                    {language === 'fr'
                      ? "Chaque fois que tu signes un contrat avec une garderie, ajoute son profil ici. Notre système génère automatiquement son site public, son formulaire d'inscription et sa console privée."
                      : "Each time you sign a contract with a daycare, add their profile here. Our system automatically generates their public site, registration form and private console."}
                  </p>
                  <button
                    onClick={() => setCurrentView('demo')}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer mt-1"
                  >
                    {language === 'fr' ? 'Tester le simulateur' : 'Test the simulator'}
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Quick navigation cards */}
                <div className="space-y-2.5">
                  {[
                    { icon: <Globe size={14} />, label: language === 'fr' ? 'Fonctionnalités' : 'Features', sub: language === 'fr' ? 'Voir tous les modules' : 'See all modules', view: 'features', color: 'text-amber-600 dark:text-amber-400' },
                    { icon: <CreditCard size={14} />, label: language === 'fr' ? 'Tarifs & Plans' : 'Pricing & Plans', sub: language === 'fr' ? 'Starter $39 · Premium $149' : 'Starter $39 · Premium $149', view: 'pricing', color: 'text-sky-600 dark:text-sky-400' },
                    { icon: <Shield size={14} />, label: language === 'fr' ? 'Sécurité & Loi 25' : 'Security & Law 25', sub: language === 'fr' ? 'Conformité et audit' : 'Compliance & audit', view: 'legal', color: 'text-emerald-600 dark:text-emerald-400' },
                    { icon: <Bell size={14} />, label: language === 'fr' ? 'Contacter Support' : 'Contact Support', sub: language === 'fr' ? 'Nous envoyer un message' : 'Send us a message', view: 'contact', color: 'text-rose-600 dark:text-rose-400' },
                  ].map((item) => (
                    <button
                      key={item.view}
                      onClick={() => setCurrentView(item.view)}
                      className="w-full text-left p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/50 hover:shadow-sm transition-all cursor-pointer group flex items-center gap-3"
                    >
                      <div className={`${item.color} shrink-0`}>{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[11.5px] font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 truncate">{item.sub}</span>
                      </div>
                      <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Add form */}
                {showAddForm && (
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-fade-in-up">
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="font-display font-black text-slate-900 dark:text-white text-[13px]">✒️ {language === 'fr' ? 'Signer une Nouvelle Garderie' : 'New Daycare Contract'}</h4>
                      <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5">{language === 'fr' ? "Enregistre l'entente d'adhésion" : 'Register the membership agreement'}</p>
                    </div>
                    <form onSubmit={handleAddDaycare} className="space-y-3 text-xs">
                      {[
                        { label: language === 'fr' ? 'Nom de la garderie' : 'Daycare Name', field: 'name', type: 'text', placeholder: 'ex: Le Nid des Petits Anges', required: true },
                        { label: language === 'fr' ? 'Ville du Québec' : 'Quebec City', field: 'city', type: 'text', placeholder: 'ex: Gatineau', required: true },
                        { label: language === 'fr' ? 'Responsable / Direction' : 'Director', field: 'owner', type: 'text', placeholder: 'ex: Mélanie Tremblay', required: true },
                        { label: language === 'fr' ? "Courriel" : 'Email', field: 'email', type: 'email', placeholder: 'ex: direction@nid.ca', required: true },
                        { label: language === 'fr' ? 'Téléphone' : 'Phone', field: 'phone', type: 'tel', placeholder: 'ex: 450-555-7890', required: true },
                      ].map((f) => (
                        <div key={f.field}>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 font-mono">{f.label}</label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={(newDaycare as any)[f.field]}
                            onChange={(e) => setNewDaycare({...newDaycare, [f.field]: e.target.value})}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 dark:text-white transition text-[11px]"
                            required={f.required}
                          />
                        </div>
                      ))}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 font-mono">{language === 'fr' ? 'Forfait' : 'Plan'}</label>
                          <select
                            value={newDaycare.plan}
                            onChange={(e) => setNewDaycare({...newDaycare, plan: e.target.value as 'Starter' | 'Premium'})}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-400/40 dark:text-white transition text-[11px] cursor-pointer"
                          >
                            <option value="Starter">Starter ($39)</option>
                            <option value="Premium">Premium ($149)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 font-mono">{language === 'fr' ? 'Capacité' : 'Capacity'}</label>
                          <input
                            type="number"
                            value={newDaycare.capacity}
                            onChange={(e) => setNewDaycare({...newDaycare, capacity: Number(e.target.value) || 20})}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-400/40 dark:text-white transition text-[11px]"
                            min={5}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-[11.5px] font-black shadow-sm hover:shadow-md active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Check size={13} />
                        {language === 'fr' ? "Confirmer l'adhésion" : 'Confirm Contract'}
                      </button>
                    </form>
                  </div>
                )}
                
              </div>
            </div>

          </div>
        )}

        {/* ===== PUBLIC MARKETING TAB ===== */}
        {activePortalTab === 'public' && (
          <div className="space-y-16 animate-fade-in font-sans">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto py-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 font-black rounded-full text-[10px] font-mono tracking-wider mb-4">
                <Star size={11} className="fill-amber-500 text-amber-500" />
                {language === 'fr' ? 'APERÇU DES PRODUITS' : 'PRODUCT OVERVIEW'}
              </span>
              <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mt-3 leading-tight">
                {language === 'fr' 
                  ? 'La plateforme préférée des milieux familiaux au Québec'
                  : 'The preferred platform for Quebec daycares'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 font-light leading-relaxed max-w-xl mx-auto">
                {language === 'fr'
                  ? "Voici les piliers fonctionnels que GarderieHub met à la disposition des garderies sous votre marque."
                  : "Here are the functional pillars that GarderieHub puts at the disposal of daycares under your brand."}
              </p>
            </div>

            {/* Feature pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
              {[
                { 
                  icon: '🎁', bg: 'bg-amber-100 dark:bg-amber-950/40',
                  title: language === 'fr' ? "Page d'attente instantanée" : 'Instant Waitlist Page',
                  desc: language === 'fr'
                    ? "Un mini site internet chaleureux déployé instantanément. Les parents s'inscrivent en 30 secondes pour rejoindre la waitlist."
                    : "A warm mini website deployed instantly. Parents register in 30 seconds to join the waitlist."
                },
                { 
                  icon: '📋', bg: 'bg-teal-100 dark:bg-teal-950/40',
                  title: language === 'fr' ? 'Vigilance Dossiers Médicaux' : 'Medical Records Monitoring',
                  desc: language === 'fr'
                    ? "Les dossiers de vaccination, protocoles d'urgences et fiches d'allergies sont cryptés avec pré-alertes d'expiration automatiques."
                    : "Vaccination records, emergency protocols and allergy forms are encrypted with automatic expiry pre-alerts."
                },
                { 
                  icon: '💳', bg: 'bg-rose-100 dark:bg-rose-950/40',
                  title: language === 'fr' ? 'Facturation & Relevé 24' : 'Billing & Tax Receipts',
                  desc: language === 'fr'
                    ? "Prélèvements préautorisés via Stripe. En fin d'année, les reçus fiscaux et relevés 24 québécois sont générés en un seul clic."
                    : "Pre-authorized withdrawals via Stripe. At year-end, tax receipts and Quebec Relevé 24 are generated in one click."
                }
              ].map((card, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800 p-7 shadow-sm hover:shadow-md hover:border-amber-300/50 card-glow transition-all hover:scale-[1.01] space-y-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`h-11 w-11 ${card.bg} rounded-2xl flex items-center justify-center text-xl shadow-sm`}>{card.icon}</div>
                  <h3 className="font-display font-black text-slate-900 dark:text-white text-[13px]">{card.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11.5px] leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA banner */}
            <div className="p-8 sm:p-12 bg-slate-950 text-white rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
              <div className="absolute inset-0 opacity-10 hero-grid-bg" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 text-center md:text-left relative">
                <span className="text-amber-400 font-mono text-[9px] uppercase tracking-wider font-bold">{language === 'fr' ? 'Un outil à ta couleur' : 'Your own branded tool'}</span>
                <h3 className="text-xl sm:text-2xl font-display font-black">{language === 'fr' ? 'Prêt à tester la simulation ?' : 'Ready to test the simulation?'}</h3>
                <p className="text-xs text-slate-400 font-light max-w-lg leading-relaxed">
                  {language === 'fr'
                    ? "Lancez le Simulateur Live pour tester les notifications aux parents, le portail parent et l'édition de site en temps réel."
                    : "Launch the Live Simulator to test parent notifications, the parent portal and real-time site editing."}
                </p>
              </div>
              <button
                onClick={() => setCurrentView('demo')}
                className="relative px-6 py-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl text-xs transition-all active:scale-[0.97] shrink-0 shadow-lg hover:shadow-amber-400/30 cursor-pointer flex items-center gap-2"
              >
                <Zap size={14} className="fill-amber-950" />
                {language === 'fr' ? 'Lancer le Simulateur Live 🚀' : 'Launch Live Simulator 🚀'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
