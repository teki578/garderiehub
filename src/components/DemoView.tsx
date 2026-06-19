import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Baby, Clock, CreditCard, Stethoscope, MessageCircle, Send,
  CheckCircle, XCircle, Bell, Phone, Mail, AlertCircle,
  ChevronRight, Star, Heart, Smile, RefreshCw, Globe,
  Edit3, Image
} from 'lucide-react';

interface Message {
  id: string;
  parentName: string;
  text: string;
  time: string;
  isMe?: boolean;
}

// ---- Nav section config ----
type Section = 'children' | 'waitlist' | 'docs' | 'payments' | 'chat' | 'website';

interface NavItem {
  id: Section;
  icon: React.ReactNode;
  emoji: string;
  label: string;
  labelEn: string;
  color: string;
  bg: string;
  badge?: number;
}

export default function DemoView() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<Section>('children');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', parentName: 'Chloé G.', text: language === 'fr' ? 'Bonjour ! Est-ce que Emma a bien mangé aujourd\'hui ?' : 'Hello! Did Emma eat well today?', time: '8:32', isMe: false },
    { id: 'm2', parentName: 'Mme Chantal', text: language === 'fr' ? 'Oui ! Elle a tout mangé 😊 Elle joue dehors maintenant.' : 'Yes! She ate everything 😊 She\'s playing outside now.', time: '8:45', isMe: true },
    { id: 'm3', parentName: 'Jean-Pierre R.', text: language === 'fr' ? 'Gabriel sera absent vendredi.' : 'Gabriel will be absent Friday.', time: '9:10', isMe: false },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [waitlist, setWaitlist] = useState([
    { id: 'w1', child: 'Alice Bouchard', parent: 'Chantal Bouchard', age: language === 'fr' ? '11 mois 👶' : '11 months 👶', city: 'Laval', phone: '450-555-9012' },
    { id: 'w2', child: 'Charles Dupuis', parent: 'Alexandre Dupuis', age: language === 'fr' ? '18 mois 🧒' : '18 months 🧒', city: 'Montréal', phone: '514-555-8932' },
    { id: 'w3', child: 'Noémie Côté', parent: 'Emilie Côté', age: language === 'fr' ? '3 ans 🌟' : '3 years 🌟', city: 'Gatineau', phone: '819-555-7788' },
  ]);

  const [toasted, setToasted] = useState<string | null>(null);

  const [editorState, setEditorState] = useState({
    title: "Château des Bout'choux",
    subtitle: language === 'fr' ? "Le meilleur service de garde certifié de Montréal 🌟" : "The best certified childcare in Montreal 🌟",
    logo: "🏰",
    notifyParents: true
  });

  const showToast = (msg: string) => {
    setToasted(msg);
    setTimeout(() => setToasted(null), 3000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      parentName: language === 'fr' ? 'Mme Chantal (Vous)' : 'Ms. Chantal (You)',
      text: chatInput,
      time: new Date().toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    // Try API
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chatInput, parentName: 'Direction' })
      });
    } catch {}
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const children = [
    { id: 'k1', name: 'Emma Gagnon', age: '3 ans', parent: 'Chloé Gagnon', phone: '514-555-4512', allergy: language === 'fr' ? '🥜 Arachides' : '🥜 Peanuts', status: 'ok', avatar: '👧' },
    { id: 'k2', name: 'Liam Tremblay', age: '4 ans', parent: 'Sophie Tremblay', phone: '514-555-1234', allergy: null, status: 'ok', avatar: '👦' },
    { id: 'k3', name: 'Gabriel Roy', age: '2 ans', parent: 'Jean-Pierre Roy', phone: '418-555-5678', allergy: language === 'fr' ? '🥛 Lactose' : '🥛 Lactose', status: 'warning', avatar: '👶' },
    { id: 'k4', name: 'Sophie Lévesque', age: '3 ans', parent: 'Marc Lévesque', phone: '819-555-3456', allergy: null, status: 'ok', avatar: '👧' },
  ];

  const navItems: NavItem[] = [
    { id: 'children', emoji: '👧', icon: <Baby size={20}/>, label: 'Mes Enfants', labelEn: 'My Children', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50' },
    { id: 'waitlist', emoji: '⏳', icon: <Clock size={20}/>, label: "Liste d'attente", labelEn: 'Waitlist', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800/50', badge: waitlist.length },
    { id: 'docs', emoji: '💉', icon: <Stethoscope size={20}/>, label: 'Vaccins & Docs', labelEn: 'Vaccines & Docs', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/50', badge: 1 },
    { id: 'payments', emoji: '💳', icon: <CreditCard size={20}/>, label: 'Paiements', labelEn: 'Payments', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50' },
    { id: 'chat', emoji: '💬', icon: <MessageCircle size={20}/>, label: 'Messages', labelEn: 'Messages', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:border-violet-800/50', badge: 2 },
    { id: 'website', emoji: '🌐', icon: <Globe size={20}/>, label: 'Mon Site', labelEn: 'My Website', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800/50' },
  ];

  const activeNav = navItems.find(n => n.id === activeSection)!;

  return (
    <div id="gh-demo-view" className="min-h-screen bg-gradient-to-b from-amber-50/60 to-slate-50 dark:from-slate-950 dark:to-slate-900 font-sans pb-28">
      
      {/* Toast notification */}
      {toasted && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-fade-in-up">
          <CheckCircle size={14} />
          {toasted}
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 pt-8 pb-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-3 mb-1">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-md">
              🧸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-black text-slate-900 dark:text-white">
                  {language === 'fr' ? 'Espace Direction' : 'Management Space'}
                </h1>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[9px] font-black font-mono rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                  {language === 'fr' ? 'Simulateur' : 'Demo'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                {language === 'fr' ? "Garderie Étoile Polaire ⭐ · Montréal" : "Étoile Polaire Daycare ⭐ · Montreal"}
              </p>
            </div>
          </div>

          {/* Top stats bar - mobile friendly */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {[
              { emoji: '👶', val: '32', sub: language === 'fr' ? 'enfants' : 'children', color: 'text-amber-600' },
              { emoji: '⏳', val: String(waitlist.length), sub: language === 'fr' ? 'en attente' : 'waitlist', color: 'text-sky-600' },
              { emoji: '💰', val: '5 760$', sub: language === 'fr' ? 'ce mois' : 'this month', color: 'text-emerald-600' },
              { emoji: '⚠️', val: '1', sub: language === 'fr' ? 'alerte' : 'alert', color: 'text-rose-600' },
            ].map((s, i) => (
              <div key={i} className="flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
                <span className="text-base">{s.emoji}</span>
                <div>
                  <span className={`block text-base font-display font-black ${s.color}`}>{s.val}</span>
                  <span className="block text-[9px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex gap-4 lg:gap-6 items-start">

          {/* ===== SIDEBAR ICON NAV ===== */}
          <aside className="flex-shrink-0">
            {/* Mobile: horizontal scroll row; Desktop: vertical column */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex-shrink-0 flex flex-col lg:flex-row items-center lg:items-center gap-1.5 lg:gap-3 
                      px-3 lg:px-4 py-3 lg:py-3.5 rounded-2xl border transition-all cursor-pointer relative
                      ${isActive 
                        ? `${item.bg} ${item.color} border-current shadow-sm scale-[1.02]` 
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    style={{ minWidth: '72px' }}
                  >
                    {/* Badge */}
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-xl lg:text-base">{item.emoji}</span>
                    <span className={`text-[10px] lg:text-[11px] font-bold leading-tight text-center lg:text-left ${isActive ? '' : ''}`}>
                      {language === 'fr' ? item.label : item.labelEn}
                    </span>
                    <ChevronRight size={12} className="hidden lg:block ml-auto opacity-40" />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="flex-1 min-w-0">

            {/* Section header */}
            <div className={`flex items-center gap-3 mb-4 p-3.5 rounded-2xl border ${activeNav.bg}`}>
              <span className="text-2xl">{activeNav.emoji}</span>
              <div>
                <h2 className={`font-display font-black text-sm ${activeNav.color}`}>
                  {language === 'fr' ? activeNav.label : activeNav.labelEn}
                </h2>
              </div>
            </div>

            {/* ======================== CHILDREN SECTION ======================== */}
            {activeSection === 'children' && (
              <div className="space-y-3 animate-fade-in">
                {children.map((kid) => (
                  <div key={kid.id} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700/50 transition-all cursor-pointer group">
                    {/* Avatar */}
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${
                      kid.status === 'warning' 
                        ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50' 
                        : 'bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30'
                    }`}>
                      {kid.avatar}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-slate-900 dark:text-white text-sm">{kid.name}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{kid.age}</span>
                        {kid.status === 'warning' && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[9px] font-black rounded-full border border-amber-200 dark:border-amber-800 uppercase">
                            {language === 'fr' ? '⚠️ Rappel requis' : '⚠️ Reminder needed'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Heart size={10} className="text-rose-400" />
                          {kid.parent}
                        </span>
                        {kid.allergy && (
                          <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-full border border-rose-100 dark:border-rose-900/40 text-[9px] font-bold">
                            {kid.allergy}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <a href={`tel:${kid.phone}`} className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 flex items-center justify-center transition text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Phone size={13}/>
                      </a>
                      <button className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-sky-950/40 flex items-center justify-center transition text-slate-400 hover:text-sky-600 dark:hover:text-sky-400">
                        <Mail size={13}/>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add child CTA */}
                <button className="w-full p-4 border-2 border-dashed border-amber-300 dark:border-amber-700/40 rounded-2xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
                  <Smile size={16}/>
                  {language === 'fr' ? '+ Ajouter un enfant' : '+ Add a child'}
                </button>
              </div>
            )}

            {/* ======================== WAITLIST SECTION ======================== */}
            {activeSection === 'waitlist' && (
              <div className="space-y-3 animate-fade-in">
                {waitlist.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <CheckCircle size={36} className="text-emerald-400 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                      {language === 'fr' ? 'Toutes les demandes traitées ! 🎉' : 'All requests processed! 🎉'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'fr' ? 'Aucun enfant en attente.' : 'No children waiting.'}
                    </p>
                  </div>
                ) : (
                  waitlist.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-sky-100 dark:border-sky-900/30 p-4 shadow-sm animate-fade-in-up">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center text-xl flex-shrink-0">
                          {item.age.includes('mois') || item.age.includes('month') ? '👶' : item.age.includes('3 ans') || item.age.includes('3 year') ? '🧒' : '🌟'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-black text-slate-900 dark:text-white text-sm">{item.child}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                            <Heart size={9} className="text-rose-400"/> {item.parent}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 text-[10px] font-bold rounded-full border border-sky-100 dark:border-sky-900/40">
                              {item.age}
                            </span>
                            <span className="text-[10px] text-slate-400">📍 {item.city}</span>
                            <span className="text-[10px] text-slate-400">📞 {item.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                        <button
                          onClick={() => {
                            setWaitlist(prev => prev.filter(w => w.id !== item.id));
                            showToast(language === 'fr' ? `${item.child} inscrit(e) ! 🎉` : `${item.child} enrolled! 🎉`);
                          }}
                          className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <CheckCircle size={13}/>
                          {language === 'fr' ? '✅ Accepter' : '✅ Accept'}
                        </button>
                        <button
                          onClick={() => {
                            setWaitlist(prev => prev.filter(w => w.id !== item.id));
                            showToast(language === 'fr' ? 'Demande refusée.' : 'Request declined.');
                          }}
                          className="py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200 dark:border-slate-600"
                        >
                          <XCircle size={13}/>
                          {language === 'fr' ? '❌ Refuser' : '❌ Decline'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ======================== DOCS / VACCINES SECTION ======================== */}
            {activeSection === 'docs' && (
              <div className="space-y-3 animate-fade-in">
                {/* Urgent */}
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-xl flex-shrink-0">👧</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-slate-900 dark:text-white text-sm">Emma Gagnon</span>
                        <span className="px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black rounded-full uppercase animate-pulse">
                          {language === 'fr' ? '🚨 Expiré !' : '🚨 Expired!'}
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-700 dark:text-rose-300 font-medium mt-0.5">
                        {language === 'fr' ? '💉 Vaccin dTaP-Polio — Rappel dans 12 jours' : '💉 dTaP-Polio Vaccine — Booster in 12 days'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(language === 'fr' ? "📧 Rappel envoyé aux parents d'Emma !" : "📧 Reminder sent to Emma's parents!")}
                    className="mt-3 w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-[11px] rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Bell size={13}/>
                    {language === 'fr' ? '📨 Envoyer un rappel au parent' : '📨 Send reminder to parent'}
                  </button>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-xl flex-shrink-0">👶</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-slate-900 dark:text-white text-sm">Gabriel Roy</span>
                        <span className="px-2 py-0.5 bg-amber-400 text-amber-950 text-[9px] font-black rounded-full uppercase">
                          {language === 'fr' ? '⚠️ Bientôt' : '⚠️ Soon'}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                        {language === 'fr' ? '📋 Fiche allergie alimentaire — Expire dans 35 jours' : '📋 Food allergy sheet — Expires in 35 days'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(language === 'fr' ? "📧 Rappel envoyé aux parents de Gabriel !" : "📧 Reminder sent to Gabriel's parents!")}
                    className="mt-3 w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-[11px] rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Bell size={13}/>
                    {language === 'fr' ? '📨 Envoyer un rappel au parent' : '📨 Send reminder to parent'}
                  </button>
                </div>

                {/* All good */}
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-emerald-500 flex-shrink-0"/>
                    <div>
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {language === 'fr' ? 'Liam & Sophie — Tout est à jour ! ✅' : 'Liam & Sophie — All up to date! ✅'}
                      </p>
                      <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/70">
                        {language === 'fr' ? 'Aucun document à renouveler.' : 'No documents to renew.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAYMENTS SECTION ======================== */}
            {activeSection === 'payments' && (
              <div className="space-y-3 animate-fade-in">
                {/* MRR Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-md">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-100 mb-1">
                    {language === 'fr' ? '💰 Revenus ce mois' : '💰 Revenue this month'}
                  </p>
                  <p className="text-3xl font-display font-black">5 760 $</p>
                  <p className="text-emerald-100 text-[11px] mt-1 font-medium">
                    {language === 'fr' ? '32 familles · Paiements automatiques ✓' : '32 families · Automatic payments ✓'}
                  </p>
                </div>

                {/* Payments list */}
                {[
                  { name: 'Chloé Gagnon', child: 'Emma', amount: '180 $', date: '15 juin', status: 'paid', emoji: '👧' },
                  { name: 'Sophie Tremblay', child: 'Liam', amount: '180 $', date: '15 juin', status: 'paid', emoji: '👦' },
                  { name: 'Jean-Pierre Roy', child: 'Gabriel', amount: '360 $', date: '15 juin', status: 'paid', emoji: '👶' },
                  { name: 'Marc Lévesque', child: 'Sophie', amount: '180 $', date: '22 juin', status: 'pending', emoji: '👧' },
                ].map((p, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-4 flex items-center gap-3 shadow-sm">
                    <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-[12px]">{p.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{language === 'fr' ? 'Pour' : 'For'} {p.child} · {p.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-black text-slate-900 dark:text-white">{p.amount}</p>
                      <span className={`text-[9px] font-black rounded-full px-2 py-0.5 ${
                        p.status === 'paid' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                          : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {p.status === 'paid' ? (language === 'fr' ? '✅ Payé' : '✅ Paid') : (language === 'fr' ? '⏳ En attente' : '⏳ Pending')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ======================== CHAT SECTION ======================== */}
            {activeSection === 'chat' && (
              <div className="flex flex-col gap-3 animate-fade-in" style={{ height: '480px' }}>
                {/* Messages */}
                <div className="flex-1 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                        msg.isMe ? 'bg-violet-100 dark:bg-violet-950/40' : 'bg-amber-100 dark:bg-amber-950/40'
                      }`}>
                        {msg.isMe ? '👩‍🏫' : '👨‍👩‍👧'}
                      </div>
                      <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
                          msg.isMe 
                            ? 'bg-violet-500 text-white rounded-tr-none' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 px-1">
                          {msg.parentName} · {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef}/>
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={language === 'fr' ? '💬 Écrire un message...' : '💬 Write a message...'}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 dark:text-white focus:outline-none transition"
                  />
                  <button
                    type="submit"
                    className="h-12 w-12 bg-violet-500 hover:bg-violet-600 text-white rounded-2xl flex items-center justify-center transition shadow-sm cursor-pointer flex-shrink-0"
                  >
                    <Send size={16}/>
                  </button>
                </form>
              </div>
            )}

            {/* ======================== WEBSITE EDITOR ======================== */}
            {activeSection === 'website' && (
              <div className="space-y-4 animate-fade-in">
                {/* Editor controls */}
                <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Edit3 size={16} className="text-indigo-500"/>
                    <h3 className="font-display font-black text-slate-900 dark:text-white text-sm">
                      {language === 'fr' ? 'Personnaliser mon site' : 'Customize my site'}
                    </h3>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      {language === 'fr' ? '✏️ Nom de la garderie' : '✏️ Daycare name'}
                    </label>
                    <input
                      type="text"
                      value={editorState.title}
                      onChange={(e) => setEditorState({ ...editorState, title: e.target.value })}
                      className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 dark:text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      {language === 'fr' ? '💬 Message de bienvenue' : '💬 Welcome message'}
                    </label>
                    <textarea
                      rows={2}
                      value={editorState.subtitle}
                      onChange={(e) => setEditorState({ ...editorState, subtitle: e.target.value })}
                      className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 dark:text-white transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      {language === 'fr' ? '🎨 Logo de la garderie' : '🎨 Daycare logo'}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {['🏰', '🧸', '🌟', '🌈', '🦋', '🐻', '🌻', '🎒'].map((logo) => (
                        <button
                          key={logo}
                          onClick={() => setEditorState({ ...editorState, logo })}
                          className={`h-11 w-11 rounded-xl flex items-center justify-center text-xl border cursor-pointer transition ${
                            editorState.logo === logo 
                              ? 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-400 scale-110 shadow-sm' 
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-300'
                          }`}
                        >
                          {logo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notify toggle */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <Bell size={14} className="text-indigo-400"/>
                      <div>
                        <p className="text-[12px] font-bold text-slate-800 dark:text-slate-200">
                          {language === 'fr' ? 'Aviser les parents des changements' : 'Notify parents of changes'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditorState({ ...editorState, notifyParents: !editorState.notifyParents })}
                      className={`h-7 w-12 rounded-full transition-all relative cursor-pointer ${
                        editorState.notifyParents ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      <span className={`absolute top-1 h-5 w-5 bg-white rounded-full shadow transition-all ${
                        editorState.notifyParents ? 'right-1' : 'left-1'
                      }`}/>
                    </button>
                  </div>
                </div>

                {/* Live Preview */}
                <div>
                  <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? '👀 Aperçu en direct' : '👀 Live preview'}
                  </p>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white flex items-center gap-2">
                      <span className="text-2xl">{editorState.logo}</span>
                      <span className="font-black text-sm">{editorState.title}</span>
                    </div>
                    <div className="p-5 text-center">
                      <p className="text-lg mb-1">
                        {editorState.logo}
                      </p>
                      <h4 className="font-display font-black text-slate-900 dark:text-white text-base mb-2">
                        {language === 'fr' ? '📋 Rejoindre la liste d\'attente' : '📋 Join the waitlist'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-xs mx-auto mb-4">{editorState.subtitle}</p>
                      <div className="flex gap-2 max-w-xs mx-auto">
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-[11px] text-slate-400">
                          {language === 'fr' ? 'Votre courriel...' : 'Your email...'}
                        </div>
                        <div className="bg-indigo-500 text-white text-[11px] font-bold px-4 rounded-xl flex items-center cursor-default">
                          {language === 'fr' ? 'Rejoindre' : 'Join'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
