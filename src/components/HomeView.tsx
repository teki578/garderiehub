import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Sparkles, Plus, Trash2, Layers, ExternalLink, Smile, Check, Baby, 
  FileText, Activity, ArrowRight, Heart, MapPin, Mail, Phone, Users, Shield, RefreshCw
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
  const { language, t } = useLanguage();
  const [activePortalTab, setActivePortalTab] = useState<'hub' | 'public'>('hub');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  // Daycares state loaded from backend
  const [daycares, setDaycares] = useState<Daycare[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New daycare form state
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
      console.log("Using memory list fallback for client side development");
      // Fallback local memory values for the UI preview
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
            owner: "Mounir Ben Jelloun",
            email: "mounir@boutchouxlaval.ca",
            phone: "450-555-9876",
            plan: 'Starter',
            status: 'active',
            createdAt: new Date().toISOString()
          },
          {
            id: 'dc-3',
            name: "Milieu Familial Mélissa & Lapinous 🐰",
            city: "Longueuil",
            capacity: 9,
            enrolled: 9,
            owner: "Mélissa Gagnon",
            email: "melgagnon@coop.ca",
            phone: "450-555-4321",
            plan: 'Starter',
            status: 'pending_payment',
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

  // Save fallback daycares helper
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDaycare)
      });
      if (response.ok) {
        setNewDaycare({
          name: '',
          city: '',
          capacity: 20,
          owner: '',
          email: '',
          phone: '',
          plan: 'Premium',
          status: 'active'
        });
        fetchDaycares();
      }
    } catch (err) {
      // client add mock
      const mockDc: Daycare = {
        id: "dc_" + Date.now(),
        ...newDaycare,
        enrolled: Math.floor(Math.random() * 5) + 5,
        waitlistCount: Math.floor(Math.random() * 8) + 2,
        createdAt: new Date().toISOString()
      };
      setDaycares([...daycares, mockDc]);
      setNewDaycare({
        name: '',
        city: '',
        capacity: 20,
        owner: '',
        email: '',
        phone: '',
        plan: 'Premium',
        status: 'active'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteDaycare = async (id: string, name: string) => {
    if (!confirm(`Voulez-vous vraiment résilier la garderie "${name}" de votre espace de gestion ?`)) return;
    try {
      const response = await fetch(`/api/daycares/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchDaycares();
      }
    } catch (err) {
      const updated = daycares.filter(d => d.id !== id);
      setDaycares(updated);
      localStorage.setItem('garderiehub_daycares', JSON.stringify(updated));
    }
  };

  // Metrics helper
  const totalDaycares = daycares.length;
  const totalEnrolled = daycares.reduce((sum, d) => sum + d.enrolled, 0);
  const totalCapacity = daycares.reduce((sum, d) => sum + d.capacity, 0);
  const totalWaitlist = daycares.reduce((sum, d) => sum + (d.waitlistCount || 0), 0);

  return (
    <div 
      id="gh-redesigned-home" 
      className={`font-sans tracking-tight min-h-screen transition-all duration-300 ${
        textSize === 'large' ? 'text-sm' : 'text-xs'
      } bg-gradient-to-b from-amber-50/60 via-orange-50/35 to-teal-50/35 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 pt-20 pb-28`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP GREETING & PORTAL MODE TOGGLES */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-amber-200/50 dark:border-slate-805/80 shadow-sm transition-colors duration-200">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-amber-950 font-bold rounded-full text-[10px] tracking-wider uppercase font-mono animate-bounce flex items-center gap-1">
                <Smile size={12} /> Mon Portail Privé
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">&gt; PROPRIÉTAIRE: KING LENNS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
              Bienvenue dans ton Hub de Gestion 🧸
            </h1>
            <p className="text-slate-500 dark:text-slate-450 font-light text-xs sm:text-sm max-w-2xl leading-relaxed">
              C'est ton espace à toi pour superviser, configurer et administrer toutes les garderies que tu signes sous contrat. Plus simple, plus chaleureux et conçu pour être accessible !
            </p>
          </div>

          {/* ACCESSIBILITY & CONTROLS RAIL */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto self-stretch md:self-auto justify-end">
            {/* Font Zoom Controller */}
            <button
              onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 active:scale-[0.96] transition flex items-center gap-1.5 cursor-pointer shadow-3xs"
              title="Agrandir ou rétablir la taille du texte pour une meilleure visibilité"
            >
              <Smile size={14} className="text-amber-500" />
              <span>{textSize === 'large' ? 'Texte Normal' : 'Grand Texte A+'}</span>
            </button>

            {/* Hub vs Public Toggle */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex border border-slate-200/40 dark:border-slate-705">
              <button
                onClick={() => setActivePortalTab('hub')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePortalTab === 'hub' 
                    ? 'bg-amber-400 text-amber-950 shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <Layers size={13} />
                <span>Mon Espace ({totalDaycares})</span>
              </button>
              <button
                onClick={() => setActivePortalTab('public')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePortalTab === 'public' 
                    ? 'bg-amber-400 text-amber-950 shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <Sparkles size={13} />
                <span>Démo Marketing</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================= PORTAL MODE: KING LENNS HUB ======================= */}
        {activePortalTab === 'hub' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* METRICS ROW (LOVABLE BENTO STATS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-gradient-to-br from-amber-400/10 via-amber-100/50 to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border border-amber-200 dark:border-amber-900/30 shadow-3xs flex items-center gap-4.5 hover:scale-[1.01] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-amber-400/20 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 flex items-center justify-center font-bold">
                  <Smile size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Garderies Signées</span>
                  <span className="block text-3xl font-display font-black text-slate-900 dark:text-white transition-colors">{totalDaycares}</span>
                  <span className="text-[10px] text-amber-805 dark:text-amber-400 font-medium">installations actives</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-400/10 via-teal-100/50 to-white dark:from-teal-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border border-teal-200 dark:border-teal-900/30 shadow-3xs flex items-center gap-4.5 hover:scale-[1.01] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-teal-400/20 dark:bg-teal-950/60 text-teal-950 dark:text-teal-200 flex items-center justify-center font-bold">
                  <Baby size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Enfants Inscrits</span>
                  <span className="block text-3xl font-display font-black text-slate-900 dark:text-white transition-colors">{totalEnrolled}</span>
                  <span className="text-[10px] text-teal-800 dark:text-teal-400 font-medium">Capacité totale de {totalCapacity}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-400/10 via-sky-100/50 to-white dark:from-sky-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border border-sky-200 dark:border-sky-900/30 shadow-3xs flex items-center gap-4.5 hover:scale-[1.01] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-sky-200/50 dark:bg-sky-950/45 text-sky-950 dark:text-sky-200 flex items-center justify-center font-bold">
                  <FileText size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Listes d'attente</span>
                  <span className="block text-3xl font-display font-black text-slate-900 dark:text-white transition-colors">{totalWaitlist}</span>
                  <span className="text-[10px] text-sky-800 dark:text-sky-400 font-medium">enfants enregistrés</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-400/10 via-rose-100/50 to-white dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border border-rose-200 dark:border-rose-900/30 shadow-3xs flex items-center gap-4.5 hover:scale-[1.01] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-rose-200/50 dark:bg-rose-955/45 text-rose-950 dark:text-rose-200 flex items-center justify-center font-bold">
                  <Activity size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Chiffrement</span>
                  <span className="block text-3xl font-display font-black text-emerald-600 dark:text-emerald-400 transition-colors">100%</span>
                  <span className="text-[10px] text-rose-800 dark:text-rose-400 font-medium">Sécurité SHA-256</span>
                </div>
              </div>

            </div>

            {/* GARDERIES LIST AND CREATOR FLEXBOX */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* PRIMARY LIST OF DAYCARES */}
              <div className="lg:col-span-2 space-y-6">
                
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
                  <div>
                    <h3 className="font-display font-black text-slate-900 dark:text-white text-sm flex items-center gap-1.5 transition-colors">
                      Schoolhouse 🏫 Mes Partenaires Actifs
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Toutes les installations que tu as signées et validées sur ta plateforme.</p>
                  </div>

                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 dark:bg-amber-400 dark:text-amber-950 dark:hover:bg-amber-500 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Nouvelle Signature</span>
                  </button>
                </div>

                {loading ? (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-450">
                    <RefreshCw className="animate-spin mx-auto mb-3" size={24} />
                    <span>Chargement de tes données privées...</span>
                  </div>
                ) : daycares.length === 0 ? (
                  <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-amber-300/60 text-slate-500">
                    <Smile size={32} className="mx-auto text-amber-400 mb-3" />
                    <p className="font-bold text-sm">Aucune garderie n'est enregistrée pour l'instant !</p>
                    <p className="text-xs text-slate-400 mt-1">Créez votre toute première signature de garderie en utilisant le bouton à droite.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {daycares.map((dc) => (
                      <div 
                        key={dc.id}
                        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-3xs hover:shadow-2xs hover:border-amber-400/50 dark:hover:border-amber-450/60 transition duration-300 flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3.5">
                          {/* Card header */}
                          <div className="flex justify-between items-start gap-2">
                            <div className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-950/45 flex items-center justify-center text-lg shadow-3xs">
                              🧸
                            </div>
                            <div className="flex gap-1.5">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase ${
                                dc.status === 'active' 
                                  ? 'bg-emerald-100 text-emerald-850 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-250 dark:border-emerald-850' 
                                  : 'bg-amber-100 text-amber-850 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-250 dark:border-amber-850'
                              }`}>
                                {dc.status === 'active' ? 'Active' : 'Attente paiement'}
                              </span>
                              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[9px] font-mono font-bold text-slate-600 dark:text-slate-300">
                                {dc.plan}
                              </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div>
                            <h4 className="font-display font-black text-sm text-slate-900 dark:text-white line-clamp-1 leading-snug">{dc.name}</h4>
                            <span className="text-[11px] text-slate-400 dark:text-slate-450 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-amber-500" /> {dc.city}, QC
                            </span>
                          </div>

                          {/* Stats mini grid */}
                          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-950/55 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-[10.5px]">
                            <div>
                              <span className="block text-slate-400 dark:text-slate-500 text-[9px] font-mono tracking-wider">Enfants</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{dc.enrolled} / {dc.capacity} places</span>
                            </div>
                            <div>
                              <span className="block text-slate-400 dark:text-slate-500 text-[9px] font-mono tracking-wider">Liste d'Attente</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{(dc.waitlistCount || 0)} inscrits</span>
                            </div>
                          </div>

                          {/* Owner Metadata contact card */}
                          <div className="text-[10px] space-y-1 text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                            <span className="block font-bold text-slate-705 dark:text-slate-300">Direction : {dc.owner}</span>
                            <span className="flex items-center gap-1"><Mail size={10} /> {dc.email}</span>
                            <span className="flex items-center gap-1"><Phone size={10} /> {dc.phone}</span>
                          </div>
                        </div>

                        {/* Actions buttons */}
                        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                          <button
                            onClick={() => {
                              setCurrentView('demo');
                            }}
                            className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-3xs cursor-pointer"
                          >
                            <ExternalLink size={12} />
                            <span>Ouvrir Portail</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteDaycare(dc.id, dc.name)}
                            className="px-3 py-2 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-450 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-rose-250 dark:border-rose-900/40 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Résilier</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SIDEBAR: NEW SIGNATURE / CONTRACTED DAYCARE FORM */}
              <div className="space-y-6">
                
                {/* INFORMATIVE EXPLANATORY BENTO CARD */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-indigo-950/15 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-3xs space-y-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
                    🍀
                  </div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">Comment ça marche ?</h4>
                  <p className="text-[11px] text-indigo-900/80 dark:text-indigo-305/70 leading-relaxed font-light">
                    Chaque fois que tu signes un contrat avec un nouveau milieu de garde ou CPE, ajoute son profil ici. 
                    Notre système lui génère automatiquement son propre site internet public, son formulaire d'inscription parents ainsi que sa console privée optimisée !
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentView('demo')}
                      className="text-[11px] text-indigo-700 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Tester le simulateur public</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* CREATOR CONTAINER */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-3xs space-y-4">
                  <div className="pb-3 border-b border-slate-100 dark:border-slate-800 font-display">
                    <h4 className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">✒️ Signer une Nouvelle Garderie</h4>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5">Enregistre l'entente d'adhésion d'une nouvelle structure.</p>
                  </div>

                  <form onSubmit={handleAddDaycare} className="space-y-3.5 text-xs text-left">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Nom de la garderie</label>
                      <input
                        type="text"
                        placeholder="ex: Le Nid des Petits Anges"
                        value={newDaycare.name}
                        onChange={(e) => setNewDaycare({...newDaycare, name: e.target.value})}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Ville du Québec</label>
                        <input
                          type="text"
                          placeholder="ex: Gatineau"
                          value={newDaycare.city}
                          onChange={(e) => setNewDaycare({...newDaycare, city: e.target.value})}
                          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Capacité enfants</label>
                        <input
                          type="number"
                          value={newDaycare.capacity}
                          onChange={(e) => setNewDaycare({...newDaycare, capacity: Number(e.target.value) || 20})}
                          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                          min={5}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Responsable / Direction</label>
                      <input
                        type="text"
                        placeholder="ex: Mélanie Tremblay"
                        value={newDaycare.owner}
                        onChange={(e) => setNewDaycare({...newDaycare, owner: e.target.value})}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Courriel de l'Éducatrice</label>
                      <input
                        type="email"
                        placeholder="ex: direction@nidanis.ca"
                        value={newDaycare.email}
                        onChange={(e) => setNewDaycare({...newDaycare, email: e.target.value})}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-955 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Téléphone direct</label>
                      <input
                        type="tel"
                        placeholder="ex: 450-555-7890"
                        value={newDaycare.phone}
                        onChange={(e) => setNewDaycare({...newDaycare, phone: e.target.value})}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-955 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-slate-950 dark:text-white transition"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">Forfait d'adhésion</label>
                        <select
                          value={newDaycare.plan}
                          onChange={(e) => setNewDaycare({...newDaycare, plan: e.target.value as 'Starter' | 'Premium'})}
                          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-white dark:text-white transition cursor-pointer"
                        >
                          <option value="Starter">Starter (Familial)</option>
                          <option value="Premium">Premium (CPE / Install)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1">État comptable</label>
                        <select
                          value={newDaycare.status}
                          onChange={(e) => setNewDaycare({...newDaycare, status: e.target.value as 'active' | 'pending_payment'})}
                          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white dark:focus:bg-white dark:text-white transition cursor-pointer"
                        >
                          <option value="active">Active (Abonné)</option>
                          <option value="pending_payment">En attente (Essai)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm active:scale-[0.98] transition cursor-pointer"
                    >
                      Confirmer l'adhésion et signer
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ======================= PORTAL MODE: PUBLIC MARKETING VIEW ======================= */}
        {activePortalTab === 'public' && (
          <div className="space-y-16 animate-fade-in font-sans">
            <div className="text-center max-w-3xl mx-auto py-12">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold rounded-full text-[10px] font-mono tracking-wider">
                APERÇU DES PRODUITS / PUBLIC SITES
              </span>
              <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mt-4 leading-tight transition-colors">
                La plateforme préférée des milieux familiaux et installations au Québec
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
                Voici les piliers fonctionnels que GarderieHub met à la disposition des garderies sous votre marque. Tout est conçu pour inspirer confiance aux parents et libérer les garderies de la paperasse complexe.
              </p>
            </div>

            {/* THREE FRIENDLY PILLARS OF VALUE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200/50 dark:border-slate-805 p-7 shadow-3xs hover:scale-[1.01] transition space-y-4">
                <div className="h-10 w-10 bg-amber-100 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center text-lg shadow-4xs">🎁</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Page d'attente instantanée</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Un mini site internet chaleureux est déployé instantanément. Les parents s'inscrivent dessus bilinguement en 30 secondes pour rejoindre la waitlist.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200/50 dark:border-slate-805 p-7 shadow-3xs hover:scale-[1.01] transition space-y-4">
                <div className="h-10 w-10 bg-teal-100 dark:bg-teal-950/40 rounded-2xl flex items-center justify-center text-lg shadow-4xs">📋</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Vigilance Dossiers Médicaux</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Chassez les rappels manuels ! Les dossiers de vaccination d'enfants, protocoles d'urgences d'allergies et fiches d'urgences sont cryptés avec pré-alertes d'expiration de 30 jours.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200/50 dark:border-slate-805 p-7 shadow-3xs hover:scale-[1.01] transition space-y-4">
                <div className="h-10 w-10 bg-rose-100 dark:bg-rose-950/40 rounded-2xl flex items-center justify-center text-lg shadow-4xs">💳</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Facturation & Impôts Relevé 24</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Déclenchez des prélèvements préautorisés automatiques via Stripe. En fin d'année, les reçus fiscaux et relevés 24 québécois sont pré-remplis et générés en un seul clic !
                </p>
              </div>

            </div>

            {/* REDESIGNED CALL TO ACTION FOR PUBLIC PRESENCE */}
            <div className="p-8 sm:p-12 bg-slate-950 text-white rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
              <div className="space-y-3 text-center md:text-left">
                <span className="text-amber-400 font-mono text-[9px] uppercase tracking-wider font-bold">Un outil à ta couleur</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold">Prêt à tester la simulation d'un site membre ?</h3>
                <p className="text-xs text-slate-400 font-light max-w-lg leading-relaxed">
                  Lancez le Simulateur Live pour tester les notifications instantanées aux parents, le portail parent sur téléphone simulé, et l'édition de site en temps réel.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('demo')}
                className="px-6 py-4.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl text-xs transition active:scale-[0.98] shrink-0 shadow-md cursor-pointer"
              >
                Lancer le Simulateur Live 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
