import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Users, Calendar, CreditCard, ShieldAlert, CheckCircle2, AlertTriangle, 
  Trash2, RefreshCw, Smartphone, Layout, Key, MessageSquare, Send, Bell
} from 'lucide-react';

interface Daycare {
  id: string;
  name: string;
  city: string;
  plan: 'Starter' | 'Premium';
  status: 'active' | 'pending_payment';
  owner: string;
  email: string;
  phone: string;
  capacity: number;
  enrolled: number;
  waitlistCount: number;
  createdAt: string;
}

interface AuditLog {
  id: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  daycareName: string;
  city: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone';
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

interface Message {
  id: string;
  parentName: string;
  text: string;
  time: string;
}

export default function DemoView() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'admin' | 'editor'>('admin');
  const [adminSubTab, setAdminSubTab] = useState<'enrolled' | 'waitlist' | 'docs' | 'payments' | 'chat'>('enrolled');
  
  // App Backend State
  const [daycares, setDaycares] = useState<Daycare[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Chat input
  const [chatInput, setChatInput] = useState('');
  
  // Page Customizer (Editor state)
  const [editorState, setEditorState] = useState({
    title: "Château des Bout'choux",
    subtitle: "Le meilleur service de garde en milieu familial certifié de Montréal.",
    logoUrl: "🏰",
    notifyParents: true
  });

  // Fetch application State from node server
  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        setDaycares(data.daycares || []);
        setAuditLogs(data.auditLogs || []);
        setContacts(data.contacts || []);
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.warn("API Server offline, loading sandbox fallback state.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  // Sandbox fallback when server is building
  const localEnrolledChildren = [
    { id: "kid_1", name: "Emma Gagnon", parent: "Chloé Gagnon", allergies: language === 'fr' ? "Arachides (Sévère)" : "Peanuts (Severe)", phone: "514-555-4512", status: language === 'fr' ? "Complété" : "Completed" },
    { id: "kid_2", name: "Liam Tremblay", parent: "Sophie Tremblay", allergies: language === 'fr' ? "Aucune" : "None", phone: "514-555-1234", status: language === 'fr' ? "Complété" : "Completed" },
    { id: "kid_3", name: "Gabriel Roy", parent: "Jean-Pierre Roy", allergies: language === 'fr' ? "Lactose" : "Lactose", phone: "418-555-5678", status: language === 'fr' ? "En attente - Rappel requis" : "Pending - Reminder needed" },
    { id: "kid_4", name: "Sophie Levesque", parent: "Marc Lévesque", allergies: language === 'fr' ? "Aucune" : "None", phone: "819-555-3456", status: language === 'fr' ? "Complété" : "Completed" }
  ];

  const localWaitlistRequests = [
    { id: "wl_1", childName: "Alice Bouchard", parentName: "Chantal Bouchard", phone: "450-555-9012", expectedAge: language === 'fr' ? "Poupon (11 mois)" : "Infant (11 months)", city: "Laval" },
    { id: "wl_2", childName: "Charles Dupuis", parentName: "Alexandre Dupuis", phone: "514-555-8932", expectedAge: language === 'fr' ? "Grand Poupon (18 mois)" : "Toddler (18 months)", city: "Montréal" },
    { id: "wl_3", childName: "Noémie Côté", parentName: "Emilie Côté", phone: "819-555-7788", expectedAge: language === 'fr' ? "Préscolaire (3 ans)" : "Preschooler (3 years)", city: "Gatineau" }
  ];

  const [waitlist, setWaitlist] = useState(localWaitlistRequests);

  const handleWaitlistEnroll = (id: string, name: string) => {
    setWaitlist(waitlist.filter(w => w.id !== id));
    // Trigger local audit updates
    const newLog: AuditLog = {
      id: "log_" + Date.now(),
      action: language === 'fr' ? "Inscription" : "Enrollment",
      details: language === 'fr' 
        ? `${name} a été enregistré avec succès en tant que grand poupon`
        : `${name} has been successfully registered as toddler`,
      ip: "192.168.1.10",
      timestamp: language === 'fr' ? "À l'instant" : "Just now"
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // Chat send action
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chatInput, parentName: language === 'fr' ? "Direction (PortailGarderie)" : "Management (GarderieHub)" })
      });
      if (response.ok) {
        setChatInput('');
        fetchState();
      }
    } catch (e) {
      // Offline fallback
      const mockMsg: Message = {
        id: "msg_fallback_" + Date.now(),
        parentName: language === 'fr' ? "Direction (PortailGarderie)" : "Management (GarderieHub)",
        text: chatInput,
        time: new Date().toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, mockMsg]);
      setChatInput('');
    }
  };

  return (
    <div id="gh-demo-view" className="font-sans text-slate-800 bg-slate-50/50 pt-16 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight mb-2.5">
            {t('demoPage.title')}
          </h1>
          <p className="text-sm text-slate-500 font-sans font-light max-w-xl mx-auto leading-relaxed">
            {t('demoPage.subtitle')}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8 border-b border-slate-200/80">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('admin')}
              className={`pb-4 text-[11px] font-bold uppercase tracking-wider relative transition cursor-pointer ${
                activeTab === 'admin' ? 'text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-600 font-normal'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Smartphone size={13} />
                <span>{t('demoPage.viewDashboard')}</span>
              </span>
              {activeTab === 'admin' && <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-950 rounded-full animate-fade-in" />}
            </button>
            
            <button
              onClick={() => setActiveTab('editor')}
              className={`pb-4 text-[11px] font-bold uppercase tracking-wider relative transition cursor-pointer ${
                activeTab === 'editor' ? 'text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-600 font-normal'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layout size={13} />
                <span>{t('demoPage.viewClient')}</span>
              </span>
              {activeTab === 'editor' && <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-950 rounded-full animate-fade-in" />}
            </button>
          </div>
        </div>

        {/* Loading wrapper */}
        {loading ? (
          <div className="text-center py-20 bg-white border border-slate-200/70 rounded shadow-3xs">
            <RefreshCw className="animate-spin text-slate-900 mx-auto mb-3" size={24} />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('common.loading')}</span>
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeTab === 'admin' ? (
              // ADMIN CONTROL CENTER PANEL
              <div className="space-y-8">
                
                {/* Visual Overview metrics cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
                  <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded border border-slate-200/50 bg-slate-50/50 text-slate-700 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">{t('demoPage.overview.metricKids')}</span>
                      <span className="text-lg font-semibold text-slate-900 leading-none">202 / 240</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded border border-slate-200/50 bg-slate-50/50 text-slate-700 flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">{t('demoPage.overview.metricWaitlist')}</span>
                      <span className="text-lg font-semibold text-slate-900 leading-none">{waitlist.length + (contacts.length * 2)}</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded border border-slate-200/50 bg-slate-50/50 text-slate-700 flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">{t('demoPage.overview.metricRev')}</span>
                      <span className="text-lg font-semibold text-slate-900 leading-none">28 400 $</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded border border-rose-200/80 shadow-3xs flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded border border-rose-200/50 bg-rose-50/40 text-rose-600 flex items-center justify-center">
                      <ShieldAlert size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] text-rose-500 font-bold uppercase tracking-wider block leading-none mb-1">{t('demoPage.overview.metricAlerts')}</span>
                      <span className="text-lg font-semibold text-rose-700 leading-none">1 active</span>
                    </div>
                  </div>
                </div>

                {/* SubTab navigation */}
                <div className="bg-white border border-slate-200/70 rounded shadow-3xs overflow-hidden">
                  <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/40">
                    <button
                      onClick={() => setAdminSubTab('enrolled')}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-tight relative border-r border-slate-200 transition cursor-pointer ${
                        adminSubTab === 'enrolled' ? 'bg-white text-slate-950 font-semibold border-b-[1.5px] border-slate-950' : 'text-slate-450 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'fr' ? 'Dossiers Enfants' : 'Children Files'}
                    </button>
                    <button
                      onClick={() => setAdminSubTab('waitlist')}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-tight relative border-r border-slate-200 transition cursor-pointer ${
                        adminSubTab === 'waitlist' ? 'bg-white text-slate-950 font-semibold border-b-[1.5px] border-slate-950' : 'text-slate-455 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'fr' ? "Liste d'Attente" : 'Waitlist'} ({waitlist.length})
                    </button>
                    <button
                      onClick={() => setAdminSubTab('docs')}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-tight relative border-r border-slate-200 transition cursor-pointer ${
                        adminSubTab === 'docs' ? 'bg-white text-slate-950 font-semibold border-b-[1.5px] border-slate-950' : 'text-slate-455 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'fr' ? 'Alertes Vaccins' : 'Vaccine Alerts'}
                    </button>
                    <button
                      onClick={() => setAdminSubTab('payments')}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-tight relative border-r border-slate-200 transition cursor-pointer ${
                        adminSubTab === 'payments' ? 'bg-white text-slate-950 font-semibold border-b-[1.5px] border-slate-950' : 'text-slate-455 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'fr' ? 'Suivi Facturation' : 'Stripe Payments'}
                    </button>
                    <button
                      onClick={() => setAdminSubTab('chat')}
                      className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-tight relative border-r border-slate-200 transition cursor-pointer ${
                        adminSubTab === 'chat' ? 'bg-white text-slate-950 font-semibold border-b-[1.5px] border-slate-950' : 'text-slate-455 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'fr' ? 'Clavardage Sécurisé' : 'Secure Live Chat'}
                    </button>
                  </div>

                  {/* Active view component table */}
                  <div className="p-6">
                    
                    {/* ENROLLED TAB CLIENT */}
                    {adminSubTab === 'enrolled' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-sm text-slate-900 tracking-tight">{t('demoPage.children.title')}</h3>
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                            {language === 'fr' ? '4 enfants inscrits préchargés' : '4 active preloaded children'}
                          </span>
                        </div>
                        <div className="overflow-x-auto rounded border border-slate-200/70">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase font-bold tracking-wider text-[9px]">
                                <th className="p-4">{t('demoPage.children.colName')}</th>
                                <th className="p-4">{t('demoPage.children.colParent')}</th>
                                <th className="p-4">{t('demoPage.children.colAllergies')}</th>
                                <th className="p-4">{t('demoPage.children.colContact')}</th>
                                <th className="p-4">{t('demoPage.children.colStatus')}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {localEnrolledChildren.map((kid) => (
                                <tr key={kid.id} className="hover:bg-slate-50/40">
                                  <td className="p-4 font-semibold text-slate-950">{kid.name}</td>
                                  <td className="p-4 font-light text-slate-600">{kid.parent}</td>
                                  <td className="p-4">
                                    {kid.allergies && kid.allergies !== 'Aucune' && kid.allergies !== 'None' ? (
                                      <span className="text-rose-650 bg-rose-50/60 px-2.5 py-0.5 rounded font-bold border border-rose-100/60 text-[10px]">{kid.allergies}</span>
                                    ) : (
                                      <span className="text-slate-400 font-light">--</span>
                                    )}
                                  </td>
                                  <td className="p-4 font-mono text-slate-550">{kid.phone}</td>
                                  <td className="p-4">
                                    <span className="inline-flex items-center gap-1 font-bold text-emerald-650">
                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                      <span className="font-medium text-[11px]">{kid.status}</span>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* WAITLIST ADOPT ELEMENT */}
                    {adminSubTab === 'waitlist' && (
                      <div className="space-y-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-sm text-slate-900 tracking-tight">{t('demoPage.waitlist.title')}</h3>
                          <p className="text-xs text-slate-550 leading-relaxed mt-1 font-light">{t('demoPage.waitlist.desc')}</p>
                        </div>
                        {waitlist.length === 0 ? (
                          <div className="text-center py-8 bg-slate-50 rounded border border-dashed border-slate-205">
                            <CheckCircle2 size={22} className="text-slate-400 mx-auto mb-2" />
                            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                              {language === 'fr' ? 'Toutes les demandes ont été traitées !' : 'All requests have been processed!'}
                            </span>
                          </div>
                        ) : (
                          <div className="overflow-x-auto rounded border border-slate-200/70">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase font-bold tracking-wider text-[9px]">
                                  <th className="p-4">{language === 'fr' ? 'Enfant & Parent' : 'Child & Parent'}</th>
                                  <th className="p-4">{language === 'fr' ? 'Âge requis' : 'Expected Age'}</th>
                                  <th className="p-4">{language === 'fr' ? 'Téléphone' : 'Phone'}</th>
                                  <th className="p-4">{language === 'fr' ? 'Ville' : 'City'}</th>
                                  <th className="p-4 text-right">{language === 'fr' ? 'Actions' : 'Actions'}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {waitlist.map((item) => (
                                  <tr key={item.id} className="hover:bg-slate-50/40">
                                    <td className="p-4">
                                      <span className="font-semibold text-slate-950 block">{item.childName}</span>
                                      <span className="text-slate-450 text-[10px] font-light block">Parent: {item.parentName}</span>
                                    </td>
                                    <td className="p-4 text-slate-600 font-light">{item.expectedAge}</td>
                                    <td className="p-4 font-mono text-slate-550">{item.phone}</td>
                                    <td className="p-4 text-slate-600 font-light">{item.city}</td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                      <button
                                        onClick={() => handleWaitlistEnroll(item.id, item.childName)}
                                        className="h-7 inline-flex items-center justify-center px-3 py-1 bg-slate-950 hover:bg-slate-900 text-white rounded text-[10px] font-medium transition cursor-pointer"
                                      >
                                        {t('demoPage.waitlist.btnApprove')}
                                      </button>
                                      <button
                                        onClick={() => setWaitlist(waitlist.filter(w => w.id !== item.id))}
                                        className="h-7 inline-flex items-center justify-center px-3 py-1 bg-white hover:bg-rose-50 text-rose-600 rounded text-[10px] font-medium transition cursor-pointer border border-rose-100"
                                      >
                                        {t('demoPage.waitlist.btnDecline')}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MEDICAL VACCINES VIGILANCE */}
                    {adminSubTab === 'docs' && (
                      <div className="space-y-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-sm text-slate-900 tracking-tight">{t('demoPage.docs.title')}</h3>
                          <p className="text-xs text-slate-550 mt-1 font-light">{t('demoPage.docs.desc')}</p>
                        </div>
                        <div className="overflow-x-auto rounded border border-slate-200/70">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-slate-455 uppercase font-bold tracking-wider text-[9px]">
                                <th className="p-4">{language === 'fr' ? "Dossier de l'Enfant" : "Child's File"}</th>
                                <th className="p-4">{t('demoPage.docs.colDocName')}</th>
                                <th className="p-4">{t('demoPage.docs.colExpiry')}</th>
                                <th className="p-4">{language === 'fr' ? 'Sûreté Médicale' : 'Medical Vigilance'}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              <tr className="hover:bg-slate-50/40">
                                <td className="p-4 font-semibold text-slate-950">Emma Gagnon</td>
                                <td className="p-4 font-light text-slate-650">{language === 'fr' ? "Carnet de vaccination dTaP-Polio" : "dTpa-Polio Vaccine Book"}</td>
                                <td className="p-4">
                                  <span className="inline-flex items-center gap-1 text-rose-600 font-semibold bg-rose-50/55 border border-rose-100 px-2 rounded text-[10.5px]">
                                    <AlertTriangle size={12} />
                                    <span>{t('demoPage.docs.expired')} ({language === 'fr' ? 'Rappel' : 'Booster'} 12j)</span>
                                  </span>
                                </td>
                                <td className="p-4">
                                  <button
                                    onClick={() => alert(language === 'fr' ? "Un courriel de renouvellement chiffré a été envoyé aux parents d'Emma !" : "A secure renewal request has been sent to Emma's parents!")}
                                    className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-[10.5px] font-medium rounded cursor-pointer transition"
                                  >
                                    {language === 'fr' ? 'Relancer le parent' : 'Nudge Parent'}
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-slate-50/40">
                                <td className="p-4 font-semibold text-slate-950">Gabriel Roy</td>
                                <td className="p-4 font-light text-slate-650">{language === 'fr' ? "Fiche d'allergie alimentaire certifiée" : "Certified Food Allergy Sheet"}</td>
                                <td className="p-4">
                                  <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[10.5px]">
                                    <span>{t('demoPage.docs.expiringSoon')} (35j)</span>
                                  </span>
                                </td>
                                <td className="p-4">
                                  <button
                                    onClick={() => alert(language === 'fr' ? "Courriel d'approbation périodique envoyé !" : "Periodic approval email successfully sent!")}
                                    className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 text-[10.5px] font-medium rounded cursor-pointer transition"
                                  >
                                    {language === 'fr' ? 'Déclarer conforme' : 'Approve Record'}
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* RECURRING STRIPE TRACKER */}
                    {adminSubTab === 'payments' && (
                      <div className="space-y-4">
                        <div className="bg-slate-950 p-5 rounded text-white flex justify-between items-center relative overflow-hidden border border-slate-900 shadow-xs">
                          <div className="absolute top-0 right-0 h-24 w-24 bg-slate-800/10 rounded-full blur-2xl" />
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold tracking-wider block font-sans uppercase mb-1">{t('demoPage.payments.mrr')}</span>
                            <span className="text-xl font-semibold text-emerald-400 font-mono">28 400,00 $ <span className="text-xs text-white/50 font-normal font-sans">{language === 'fr' ? 'CAD / mois' : 'CAD / month'}</span></span>
                          </div>
                          <span className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 rounded text-slate-350 font-mono font-semibold">
                            {language === 'fr' ? 'Passerelle de paiement active' : 'Secure Encrypted Gateway Active'}
                          </span>
                        </div>

                        <div className="overflow-x-auto rounded border border-slate-200/70">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase font-bold tracking-wider text-[9px]">
                                <th className="p-4">{t('demoPage.payments.colInvoice')}</th>
                                <th className="p-4">{language === 'fr' ? 'Parent responsable' : 'Responsible Parent'}</th>
                                <th className="p-4">{t('demoPage.payments.colAmount')}</th>
                                <th className="p-4">{language === 'fr' ? 'Fréquence' : 'Payment Schedule'}</th>
                                <th className="p-4">{language === 'fr' ? 'Statut du dépôt' : 'Payout Status'}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                              <tr className="hover:bg-slate-50/40">
                                <td className="p-4 font-mono text-slate-450">#INV-2026-085</td>
                                <td className="p-4 font-semibold text-slate-950">Chloé Gagnon</td>
                                <td className="p-4 font-semibold text-slate-900">180,00 $</td>
                                <td className="p-4 font-light text-slate-550">{language === 'fr' ? 'Aux deux semaines (TPA)' : 'Bi-weekly direct debit'}</td>
                                <td className="p-4">
                                  <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-semibold">{t('demoPage.payments.statusPaid')}</span>
                                </td>
                              </tr>
                              <tr className="hover:bg-slate-50/40">
                                <td className="p-4 font-mono text-slate-450">#INV-2026-084</td>
                                <td className="p-4 font-semibold text-slate-950">Jean-Pierre Roy</td>
                                <td className="p-4 font-semibold text-slate-900">360,00 $</td>
                                <td className="p-4 font-light text-slate-550">{language === 'fr' ? 'Prélèvement bancaire direct' : 'Monthly bank transfer'}</td>
                                <td className="p-4">
                                  <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-semibold">{t('demoPage.payments.statusPaid')}</span>
                                </td>
                              </tr>
                              <tr className="hover:bg-slate-50/40">
                                <td className="p-4 font-mono text-slate-450">#INV-2026-083</td>
                                <td className="p-4 font-semibold text-slate-950">Chantal Gagnon</td>
                                <td className="p-4 font-semibold text-slate-900">180,00 $</td>
                                <td className="p-4 font-light text-slate-550">{language === 'fr' ? 'Forfait de base automatisé' : 'Basic plan automated'}</td>
                                <td className="p-4">
                                  <span className="text-amber-700 font-mono text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-semibold">{t('demoPage.payments.statusPending')}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* ENCRYPTED LEGAL CHAT LOG */}
                    {adminSubTab === 'chat' && (
                      <div className="space-y-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-sm text-slate-900 tracking-tight">{t('demoPage.chat.title')}</h3>
                          <p className="text-xs text-slate-550 mt-1 font-light">{t('demoPage.chat.desc')}</p>
                        </div>

                        {/* Interactive messages screen */}
                        <div className="h-64 bg-slate-50 border border-slate-200/80 p-4 overflow-y-auto space-y-3 rounded">
                          {messages.map((m) => (
                            <div key={m.id} className={`max-w-[80%] p-3 rounded ${
                              m.parentName.includes('Direction') || m.parentName.includes('Éducatrice')
                                ? 'bg-slate-950 text-white ml-auto'
                                : 'bg-white border border-slate-200 text-slate-800'
                            }`}>
                              <span className="block text-[8px] opacity-70 font-bold uppercase tracking-wider mb-0.5">{m.parentName} &bull; {m.time}</span>
                              <p className="text-xs leading-relaxed font-light">{m.text}</p>
                            </div>
                          ))}
                        </div>

                        {/* Chat input builder form */}
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder={t('demoPage.chat.inputPlaceholder')}
                            className="flex-1 bg-white border border-slate-200 rounded px-4 py-2.5 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="bg-slate-950 hover:bg-slate-900 text-white h-9.5 px-4 rounded flex items-center justify-center transition cursor-pointer text-xs font-semibold"
                          >
                            <Send size={12} />
                          </button>
                        </form>
                      </div>
                    )}

                  </div>
                </div>

                {/* Audit Logs Trail module - Security */}
                <div className="bg-slate-950 text-slate-300 p-6 rounded-2xl border border-slate-800/90 relative overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white tracking-widest font-mono uppercase flex items-center gap-1.5">
                      <Key size={13} className="text-emerald-400" />
                      <span>{t('demoPage.siteEditor.liveLogs')}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">🛡️ SHA-256 CRYPTO ACTIVE</span>
                  </div>

                  <div className="space-y-3 font-mono text-[10px] uppercase">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex flex-col sm:flex-row justify-between border-b border-slate-800/50 pb-2 gap-1 font-light">
                        <div>
                          <span className="text-amber-400 font-semibold pr-2">[{log.action}]</span>
                          <span className="text-slate-100">{log.details}</span>
                        </div>
                        <div className="text-slate-400 flex gap-4 text-right">
                          <span>IP: {log.ip}</span>
                          <span className="text-slate-300 font-semibold">{log.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              // PUBLIC WEBSITE PREVIEW & EDITOR CONTROLS
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                {/* Visual Editor Inputs (Col spans 2) */}
                <div className="lg:col-span-2 bg-white rounded p-6 border border-slate-200/80 space-y-6 shadow-xs">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-slate-900 tracking-tight">{t('demoPage.siteEditor.title')}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Personnalisez l'extérieur de votre site internet de garderie pour voir instantanément le rendu pour les parents.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        {t('demoPage.siteEditor.labelTitle')}
                      </label>
                      <input
                        type="text"
                        value={editorState.title}
                        onChange={(e) => setEditorState({ ...editorState, title: e.target.value })}
                        className="w-full text-xs border border-slate-200 rounded p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        {t('demoPage.siteEditor.labelSubtitle')}
                      </label>
                      <textarea
                        rows={2}
                        value={editorState.subtitle}
                        onChange={(e) => setEditorState({ ...editorState, subtitle: e.target.value })}
                        className="w-full text-xs border border-slate-200 rounded p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white resize-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        {t('demoPage.siteEditor.labelLogoUrl')}
                      </label>
                      <div className="flex gap-2">
                        {['🏰', '🧸', '🌟', '🌳', '🎒'].map((logo) => (
                          <button
                            key={logo}
                            onClick={() => setEditorState({ ...editorState, logoUrl: logo })}
                            className={`h-9 w-9 rounded flex items-center justify-center text-sm border cursor-pointer select-none transition ${
                              editorState.logoUrl === logo ? 'bg-slate-100 border-slate-950 text-slate-950' : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            {logo}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell size={14} className="text-slate-400" />
                        <div>
                          <span className="block text-xs font-semibold text-slate-800 leading-relaxed">{t('demoPage.siteEditor.notifySetting')}</span>
                          <span className="block text-[10px] text-slate-400 font-light">Synchronisation bilingue cryptée</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={editorState.notifyParents}
                        onChange={(e) => setEditorState({ ...editorState, notifyParents: e.target.checked })}
                        className="h-4 w-4 text-slate-950 border-slate-300 rounded focus:ring-slate-950 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated External Website (Col spans 3) */}
                <div className="lg:col-span-3 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block ml-1">
                    {t('demoPage.siteEditor.previewTitle')}
                  </span>
                  
                  <div className="bg-white rounded border border-slate-200 shadow-xs overflow-hidden relative">
                    
                    {/* Public Header bar */}
                    <div className="bg-slate-950 border-b border-slate-900 p-4 text-white flex justify-between items-center pr-6">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{editorState.logoUrl}</span>
                        <span className="font-semibold text-xs tracking-tight">{editorState.title}</span>
                      </div>
                      <span className="text-[8px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {language === 'fr' ? 'Portail Public' : 'Public Portal'}
                      </span>
                    </div>

                    {/* Exterior Landing Preview Area */}
                    <div className="p-8 text-center bg-slate-50/50 py-12">
                      <div className="h-10 w-10 rounded-full bg-slate-100/50 text-slate-900 flex items-center justify-center mx-auto text-lg mb-4 border border-slate-200/50 shadow-2xs">
                        {editorState.logoUrl}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-3 max-w-lg mx-auto">
                        {language === 'fr' ? 'Inscriptions Ouvertes' : 'Open Registration'} - {editorState.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light max-w-md mx-auto mb-6">
                        {editorState.subtitle}
                      </p>

                      {/* Dynamic simulation form inside target */}
                      <div className="bg-white max-w-sm mx-auto p-4 rounded border border-slate-200/80 text-left space-y-3">
                        <h5 className="text-[10px] font-bold text-slate-800 tracking-wider uppercase mb-1 flex items-center justify-between">
                          <span>{language === 'fr' ? "Rejoindre la liste d'attente" : 'Join the waitlist'}</span>
                          <span className="text-[9px] text-slate-400 font-mono font-semibold uppercase tracking-wider">
                            {language === 'fr' ? 'Sécurisé' : 'Secure'}
                          </span>
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-slate-450 font-medium block mb-1">{language === 'fr' ? "Nom de l'enfant" : 'Child name'}</span>
                            <input type="text" placeholder="Gabriel" className="w-full bg-slate-50 border border-slate-200/60 p-2 rounded text-[10px]" disabled />
                          </div>
                          <div>
                            <span className="text-slate-450 font-medium block mb-1">{language === 'fr' ? 'Date souhaitée' : 'Expected start'}</span>
                            <input type="text" placeholder={language === 'fr' ? 'Septembre 2026' : 'September 2026'} className="w-full bg-slate-50 border border-slate-200/60 p-2 rounded text-[10px]" disabled />
                          </div>
                        </div>
                        <button className="w-full text-center py-2 bg-slate-950 text-white rounded text-[10px] font-medium transition cursor-not-allowed uppercase tracking-wider">
                          {language === 'fr' ? 'Soumettre ma préinscription (Simulation)' : 'Submit pre-registration'}
                        </button>
                      </div>
                    </div>

                    {/* Security stamp footer */}
                    <div className="p-3 bg-slate-100/30 text-center border-t border-slate-100 text-[9px] font-bold text-slate-400 tracking-wider flex items-center justify-center gap-1.5 uppercase font-mono">
                      {language === 'fr' ? (
                        <span>🛡️ CONFORME AUX NORMES DE LA LOI 25 QUÉBEC &bull; EXPÉDIÉ AES-256</span>
                      ) : (
                        <span>🛡️ COMPLIANT WITH QUEBEC BILL 25 GUIDELINES &bull; AES-256 ENCRYPTED</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
