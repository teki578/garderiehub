import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Lock, ArrowRight, ShieldCheck, Landmark, Plus, Settings, AlertOctagon, 
  UserX, ShieldAlert, Key, Globe, Layout, Shield
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

interface FailedLogin {
  id: string;
  email: string;
  ip: string;
  timestamp: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginSuccess: () => void;
}

export default function AdminPanel({ isOpen, onClose, isAdminLoggedIn, onLoginSuccess }: AdminPanelProps) {
  const { t } = useLanguage();
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Console state
  const [tab, setTab] = useState<'daycares' | 'limits' | 'logins'>('daycares');
  const [daycares, setDaycares] = useState<Daycare[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [failedLogins, setFailedLogins] = useState<FailedLogin[]>([]);
  
  // Security settings
  const [settings, setSettings] = useState({
    systemLocked: false,
    mfaEnabled: true,
    recaptchaEnabled: true,
    allowedIpsOnly: false,
  });

  // Daycare Builder Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDaycare, setNewDaycare] = useState({
    name: '',
    city: '',
    owner: '',
    email: '',
    phone: '',
    capacity: 40,
    plan: 'Starter' as 'Starter' | 'Premium',
    status: 'active' as 'active' | 'pending_payment'
  });

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        setDaycares(data.daycares || []);
        setAuditLogs(data.auditLogs || []);
        setFailedLogins(data.failedLogins || []);
        if (data.settings) setSettings(data.settings);
      }
    } catch (e) {
      console.warn("Express API offline - falling back to client simulation data", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle logins
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Let's allow test bypass passwords or real "admin" match
    const cleanMail = email.trim().toLowerCase();
    
    if (cleanMail === 'admin@garderiehub.ca' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setLoginError('Identifiant ou mot de passe invalide. Pour tester, cliquez sur le bouton de démo d\'authentification !');
      
      // Post client failed login attempt to Express backend for telemetry
      try {
        await fetch('/api/logins/fail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email || 'fraud@hacker.com', ip: '203.0.113.125' })
        });
        fetchAdminData();
      } catch (err) {
        console.warn("Mock registry failed attempt committed locally instead.");
      }
    }
  };

  const handleBypass = () => {
    onLoginSuccess();
  };

  // Add Daycare Action
  const handleAddDaycare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDaycare.name.trim()) return;

    try {
      const response = await fetch('/api/daycares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDaycare)
      });
      if (response.ok) {
        setShowAddForm(false);
        setNewDaycare({
          name: '',
          city: '',
          owner: '',
          email: '',
          phone: '',
          capacity: 40,
          plan: 'Starter',
          status: 'active'
        });
        fetchAdminData();
      }
    } catch (err) {
      // Offline fallback
      const mockDc: Daycare = {
        id: "dc_" + Date.now(),
        ...newDaycare,
        enrolled: Math.floor(Math.random() * 15) + 12,
        waitlistCount: 2,
        createdAt: new Date().toISOString()
      };
      setDaycares([...daycares, mockDc]);
      setShowAddForm(false);
    }
  };

  // Toggle Stripe or security settings in database
  const handleToggleSetting = async (key: keyof typeof settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      fetchAdminData();
    } catch (e) {
      console.warn("Setting updated locally only in offline mode");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4 font-sans font-light">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row animate-fade-in text-slate-800">
        
        {/* SIDEBAR LOGOUT BAR */}
        <div className="md:w-64 bg-slate-950 text-slate-400 p-6 flex flex-col justify-between border-r border-slate-900 font-sans">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-slate-400" />
              <div>
                <span className="font-display font-semibold text-xs text-white tracking-widest leading-none block">CONSOLE DE CONTROLE</span>
                <span className="text-[8px] font-bold text-slate-500 font-mono tracking-widest uppercase lg:mt-0.5 block">Secured by Leyton</span>
              </div>
            </div>

            {isAdminLoggedIn && (
              <div className="pt-6 border-t border-slate-900 space-y-1.5 font-sans">
                <button
                  onClick={() => setTab('daycares')}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
                    tab === 'daycares' ? 'bg-slate-900 border border-slate-800 text-white' : 'hover:bg-slate-900/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Landmark size={13} />
                  <span>Gérer les Garderies ({daycares.length})</span>
                </button>
                <button
                  onClick={() => setTab('limits')}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
                    tab === 'limits' ? 'bg-slate-900 border border-slate-800 text-white' : 'hover:bg-slate-900/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Settings size={13} />
                  <span>Limites de Sécurité</span>
                </button>
                <button
                  onClick={() => setTab('logins')}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
                    tab === 'logins' ? 'bg-slate-900 border border-slate-800 text-white' : 'hover:bg-slate-900/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserX size={13} />
                  <span>Tentatives Frauduleuses ({failedLogins.length})</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-900 text-xs font-sans">
            <button
              onClick={onClose}
              className="w-full text-center py-2 border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-300 font-medium rounded cursor-pointer transition mb-2"
            >
              Fermer Console
            </button>
            <span className="text-[9px] text-slate-650 text-center block font-mono">Souveraineté des Données &copy; 2026</span>
          </div>
        </div>

        {/* CONTAINER CONTENT AREA */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* STATE 1: SECURE AUTHENTICATION SCREEN */}
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto py-8 font-sans font-light">
              <div className="text-center mb-8">
                <div className="h-10 w-10 bg-slate-50 text-slate-950 rounded border border-slate-200/70 flex items-center justify-center mx-auto mb-3">
                  <Lock size={16} />
                </div>
                <h3 className="text-base font-display font-semibold text-slate-950 tracking-tight">Accès Administrateur Restreint</h3>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">Authentification hautement sécurisée requise pour la supervision globale du réseau.</p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50/50 text-rose-705 text-xs font-medium rounded border border-rose-200/50 mb-4 leading-normal font-sans">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-450 uppercase tracking-widest mb-1.5">Identifiant professionnel</label>
                  <input
                    type="email"
                    placeholder="admin@garderiehub.ca"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded p-2.5 bg-slate-50/40 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[9px] font-mono font-bold text-slate-450 uppercase tracking-widest">Mot de passe de sécurité</label>
                    <span className="text-[9px] text-slate-400 font-mono">Ex: admin123</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Saisir votre clé..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded p-2.5 bg-slate-50/40 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white"
                    required
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full text-center py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                  >
                    <span>Déverrouiller la Console</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={handleBypass}
                    className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/60 rounded text-xs font-semibold tracking-tight transition cursor-pointer font-sans"
                  >
                    ⚡ Mode Démo : Auto-Login (Bypass)
                  </button>
                </div>
              </form>
            </div>
          ) : (
            
            // STATE 2: ACTIVE CONTROL PANEL DESK
            <div className="space-y-6">
              
              {/* TAB 1: DAYCARES MANAGEMENT BLOCK */}
              {tab === 'daycares' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-display font-semibold text-slate-950 text-base leading-tight tracking-tight">Supervision du Réseau d'Installations</h4>
                      <p className="text-xs text-slate-500 leading-normal">Déclarez et validez les nouvelles garderies contractantes pour Stripe billing.</p>
                    </div>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 text-white rounded text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Ajouter une Garderie</span>
                    </button>
                  </div>

                  {/* Daycare Builder inputs form */}
                  {showAddForm && (
                    <form onSubmit={handleAddDaycare} className="bg-slate-50/70 p-5 rounded border border-slate-200/70 space-y-4 animate-fade-in text-xs font-medium">
                      <h5 className="text-[10px] font-mono tracking-wider text-slate-700 uppercase font-bold">Nouvel enregistrement de garderie</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Nom du milieu / de l'installation</label>
                          <input
                            type="text"
                            placeholder="Garderie Des Fleurs"
                            value={newDaycare.name}
                            onChange={(e) => setNewDaycare({...newDaycare, name: e.target.value})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Ville</label>
                          <input
                            type="text"
                            placeholder="Gatineau"
                            value={newDaycare.city}
                            onChange={(e) => setNewDaycare({...newDaycare, city: e.target.value})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Directeur / propriétaire légal</label>
                          <input
                            type="text"
                            placeholder="Isabelle Roy"
                            value={newDaycare.owner}
                            onChange={(e) => setNewDaycare({...newDaycare, owner: e.target.value})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Téléphone</label>
                          <input
                            type="tel"
                            placeholder="450-555-4512"
                            value={newDaycare.phone}
                            onChange={(e) => setNewDaycare({...newDaycare, phone: e.target.value})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Courriel</label>
                          <input
                            type="email"
                            placeholder="isabelle@fleurs.ca"
                            value={newDaycare.email}
                            onChange={(e) => setNewDaycare({...newDaycare, email: e.target.value})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Capacité enfants</label>
                          <input
                            type="number"
                            value={newDaycare.capacity}
                            onChange={(e) => setNewDaycare({...newDaycare, capacity: parseInt(e.target.value) || 40})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Forfait d'abonnement</label>
                          <select
                            value={newDaycare.plan}
                            onChange={(e) => setNewDaycare({...newDaycare, plan: e.target.value as 'Starter' | 'Premium'})}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded text-xs font-light cursor-pointer"
                          >
                            <option value="Starter">Starter (39 $/m)</option>
                            <option value="Premium">Premium Complexe (149 $/m)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 text-white rounded cursor-pointer"
                        >
                          Sauvegarder en BD
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Registered Daycares details table */}
                  <div className="overflow-x-auto rounded border border-slate-200/70 font-sans">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase font-bold tracking-wider text-[9px]">
                          <th className="p-4">Garderie locale</th>
                          <th className="p-4">Propriétaire</th>
                          <th className="p-4">Forfait</th>
                          <th className="p-4">Places enfants</th>
                          <th className="p-4">Statut de compte</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {daycares.map((dc) => (
                          <tr key={dc.id} className="hover:bg-slate-50/50">
                            <td className="p-4">
                              <span className="font-semibold text-slate-900 block">{dc.name}</span>
                              <span className="text-[10px] text-slate-450 font-normal">{dc.city} &bull; {dc.email}</span>
                            </td>
                            <td className="p-4">{dc.owner}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                dc.plan === 'Premium' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {dc.plan}
                              </span>
                            </td>
                            <td className="p-4">{dc.enrolled}/{dc.capacity} ({dc.waitlistCount} Waitlist)</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 font-bold ${
                                dc.status === 'active' ? 'text-emerald-650' : 'text-amber-655'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${dc.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                <span className="font-sans text-[11px] font-medium">{dc.status === 'active' ? 'Abonnement Actif' : 'Paiement Stripe suspendu'}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: SYSTEM SECURITY LIMITS SETTINGS */}
              {tab === 'limits' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display font-semibold text-slate-900 dark:text-white text-base leading-tight tracking-tight">Limites de Sécurité et Chiffrement de Données</h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-normal">Configurez les bannières d'accès et les garde-fous cryptographiques requis au Canada.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-950 text-xs text-sans">Double authentification obligatoire (MFA)</span>
                        <span className="block text-[10.5px] text-slate-400 font-light">Exiger un code bilingue envoyer par SMS/email à chaque connexion d'éducatrice.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.mfaEnabled}
                        onChange={() => handleToggleSetting('mfaEnabled')}
                        className="h-4.5 w-4.5 text-slate-900 border-slate-300 rounded cursor-pointer"
                      />
                    </div>

                    <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-950 text-xs text-sans">Système de Captcha Google Recaptcha v3</span>
                        <span className="block text-[10.5px] text-slate-400 font-light">Protéger les formulaires de pré-inscription pour empêcher toute force brute.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.recaptchaEnabled}
                        onChange={() => handleToggleSetting('recaptchaEnabled')}
                        className="h-4.5 w-4.5 text-slate-900 border-slate-300 rounded cursor-pointer"
                      />
                    </div>

                    <div className="bg-white p-5 rounded border border-slate-200/70 shadow-3xs flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-950 text-xs text-sans">Restriction par adresses IP (Garde-fou Leyton)</span>
                        <span className="block text-[10.5px] text-slate-450 font-sans font-light">Restreindre l'administration uniquement aux connexions autorisées du Québec.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.allowedIpsOnly}
                        onChange={() => handleToggleSetting('allowedIpsOnly')}
                        className="h-4.5 w-4.5 text-slate-900 border-slate-300 rounded cursor-pointer"
                      />
                    </div>

                    <div className="p-5 rounded bg-rose-50/50 border border-rose-200/55 flex justify-between items-center">
                      <div className="flex gap-3">
                        <AlertOctagon className="text-rose-600 flex-shrink-0 mt-0.5" size={16} />
                        <div>
                          <span className="block font-semibold text-rose-950 text-xs text-sans">VERROUILLAGE SOUVERAIN GÉNÉRAL (LOCKOUT ACTION)</span>
                          <span className="block text-[10.5px] text-rose-700 font-light leading-relaxed">
                            Mettre instantanément l'intégralité du cloud en maintenance (seules les requêtes d'incidents d'urgences restent actives).
                          </span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.systemLocked}
                        onChange={() => handleToggleSetting('systemLocked')}
                        className="h-4.5 w-4.5 text-rose-600 border-rose-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FRAUD STATS & FAILED LOGINS TRAIL */}
              {tab === 'logins' && (
                <div className="space-y-4 font-sans font-light">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-display font-semibold text-slate-900 dark:text-white text-base tracking-tight leading-none">Tentatives Frauduleuses bloquées</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mt-1">Journalisation des échecs d'adresses IP suspectées de forcer la barrière légale.</p>
                    </div>
                    <span className="text-[9px] bg-rose-50/60 border border-rose-200/40 px-2.5 py-1 text-rose-700 font-bold font-mono tracking-wider text-right uppercase rounded">LOI 25 DEPECHE ACTIVE</span>
                  </div>

                  {failedLogins.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded border border-dashed border-slate-205">
                      <ShieldCheck size={28} className="text-slate-400 mx-auto mb-2" />
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Aucun échec suspect enregistré récemment</span>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {failedLogins.map((fail) => (
                        <div key={fail.id} className="p-4 bg-slate-50/50 rounded border border-slate-200/75 flex justify-between items-center text-xs font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 bg-rose-50 border border-rose-100 text-rose-600 rounded flex items-center justify-center">
                              <ShieldAlert size={14} />
                            </div>
                            <div>
                              <span className="block text-slate-950 font-medium">Email utilisé : <span className="font-normal font-mono text-slate-550">{fail.email}</span></span>
                              <span className="block text-[10px] text-slate-450 -mt-0.5">Adresse IP : <span className="font-mono text-slate-500">{fail.ip}</span></span>
                            </div>
                          </div>
                          <span className="text-rose-600 text-[10px] font-mono font-bold uppercase">{fail.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
