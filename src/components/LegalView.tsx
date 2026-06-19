import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ShieldCheck, Calendar, AlertTriangle, HelpCircle, ChevronRight, ChevronDown, Lock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LegalView() {
  const { t, language } = useLanguage();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  // Simulated incident ledger state kept inside the Q&A page as an interactive demo!
  const [incidents, setIncidents] = useState([
    { id: "inc_1", date: "2026-06-12", title: { fr: "Tentative d'accès bloquée", en: "Blocked brute-force attempt" }, severity: "Basse", action: { fr: "IP bannie après 3 échecs", en: "IP banned after 3 failed attempts" }, status: { fr: "Résolu", en: "Resolved" } },
    { id: "inc_2", date: "2026-05-30", title: { fr: "Rupture de liaison DNS", en: "DNS connection outage" }, severity: "Moyenne", action: { fr: "Bascule sur serveur CDN de secours", en: "Routed through fallback CDN server" }, status: { fr: "Résolu", en: "Resolved" } }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [incidentForm, setIncidentForm] = useState({
    title: '',
    severity: 'Basse',
    details: ''
  });

  const handleReportIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentForm.title.trim()) return;

    const newIncident = {
      id: "inc_" + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: { fr: incidentForm.title, en: incidentForm.title },
      severity: incidentForm.severity,
      action: { 
        fr: "Saisie journalisée: " + incidentForm.details.substring(0, 30) + "...", 
        en: "Log entry: " + incidentForm.details.substring(0, 30) + "..." 
      },
      status: { fr: "Crypté & Consigné", en: "Encrypted & Saved" }
    };

    setIncidents([newIncident, ...incidents]);
    setIncidentForm({ title: '', severity: 'Basse', details: '' });
    setModalOpen(false);
    alert(language === 'fr' 
      ? "Saisie sécurisée enregistrée avec succès dans le grand livre cryptographique." 
      : "Secure entry successfully registered in the cryptographic ledger."
    );
  };

  const qaContent = {
    fr: {
      title: "Réglementation & Sécurité",
      subtitle: "Foire aux questions concernant la protection de la vie privée, notre architecture conforme et vos droits.",
      questions: [
        {
          q: "1. Comment la responsabilité civile et la politique de confidentialité sont-elles coordonnées ?",
          a: "Chaque service de garde affilié à GarderieHub désigne un responsable délégué à la protection des données (DPO) pour superviser localement la récolte d'informations de l'installation. Par défaut, cette charge incombe à la direction de la garderie. Nous mettons à votre disposition des modèles de chartes d'utilisation et des audits réguliers pour configurer vos procédures de façon conforme sur simple activation.",
          icon: <ShieldCheck size={18} className="text-slate-700" />
        },
        {
          q: "2. Quelles informations personnelles sont collectées et quelles sont les limites ?",
          a: "Nous prônons la récolte de données minimale. Notre système limite strictement les fiches à l'identité civique légale de l'enfant, l'historique d'immunisation préventive exigé par la Direction de la Santé Publique et les coordonnées directes des parents. Aucun identifiant cybernétique ou profil biométrique n'est analysé ou conservé.",
          icon: <Calendar size={18} className="text-slate-700" />
        },
        {
          q: "3. Quel protocole de chiffrement est appliqué sur les dossiers médicaux ?",
          a: "Tous les dossiers de santé et informations sensibles transmis à travers les formulaires d'inscriptions bilingues sont instantanément cryptés avec l'algorithme AES-256 bits de niveau industriel au repos. De plus, ils sont exclusivement hébergés au Canada sur des grappes infonuagiques isolées géographiquement dans la province de Québec.",
          icon: <Lock size={18} className="text-slate-700" />
        },
        {
          q: "4. Politique de non-conservation : Comment s'applique le droit à l'oubli ?",
          a: "Nous appliquons une politique de suppression absolue. Tout compte ou dossier d'un enfant inactif ou retiré de son milieu d'accueil depuis plus de 5 ans fait l'objet d'un processus automatique d'élimination bilingue, supprimant ainsi définitivement toute empreinte numérique de nos grappes de stockage de production et de sauvegarde.",
          icon: <RefreshCw size={18} className="text-slate-700" />
        },
        {
          q: "5. Comment fonctionne le registre légal d'incidents de sécurité ?",
          a: "La transparence est primordiale. En cas d'événement technique hors de l'ordinaire, notre plateforme met à disposition un registre immuable centralisé permettant de consigner instantanément l'heure, la nature de la menace éventuelle et l'ensemble des contre-mesures appliquées de concert avec les autorités compétentes.",
          icon: <AlertTriangle size={18} className="text-slate-700" />
        },
        {
          q: "6. Comment est structuré le double consentement numérique des parents ?",
          a: "Les parents de votre installation de services de garde disposent en tout temps de la pleine maîtrise de leurs renseignements. Une signature numérique par double opt-in est requise avant le partage de toute fiche de santé d'urgence ou d'autorisation. Une copie scellée et datée peut être révoquée ou exportée sur simple demande.",
          icon: <CheckCircle2 size={18} className="text-slate-700" />
        }
      ],
      registryTitle: "Registre cyber-sécurité et audit de transparence",
      registryDesc: "Suivi en temps réel des actions de sécurité système, des sauvegardes programmées et des événements diagnostiqués.",
      btnReport: "Consigner un incident",
      colDate: "Date d'enregistrement",
      colType: "Type / Saisie",
      colThreat: "Menace",
      colAction: "Mesure prise",
      colStatus: "Statut",
      modalTitle: "Nouvel Incident de Sécurité",
      modalDesc: "Rapport d'incident chiffré consigné au journal de sécurité.",
      labelTitle: "Titre de l'incident",
      labelSeverity: "Niveau d'alerte",
      labelDetails: "Description technique & atténuation",
      btnCancel: "Annuler",
      btnSubmit: "Consigner chiffré"
    },
    en: {
      title: "Regulation & Privacy Q&A",
      subtitle: "Frequently asked questions about privacy policies, our secure architecture, and parent rights.",
      questions: [
        {
          q: "1. How are officer responsibilities and privacy policies coordinated?",
          a: "Each daycare center using GarderieHub designates a person responsible for personal data protection (DPO) to oversee the facility's data collection. By default, this is assigned to the daycare director. We provide pre-filled model privacy policies and routine compliance guidance ready to deploy with one click.",
          icon: <ShieldCheck size={18} className="text-slate-700" />
        },
        {
          q: "2. What personal information is collected, and what are the limits?",
          a: "We practice strict data minimization. Our platform only gathers legal identity, immunization histories required by Public Health, and parental contact details. We never capture, analyze, or log biometric files or unneeded telemetry.",
          icon: <Calendar size={18} className="text-slate-700" />
        },
        {
          q: "3. What encryption standard protects active medical records?",
          a: "All medical files and emergency cards submitted through our online registration forms are immediately secured with AES-256 encryption at rest. They are safely hosted within Canadian borders, strictly residing in localized physical data centers in the Quebec province.",
          icon: <Lock size={18} className="text-slate-700" />
        },
        {
          q: "4. Automated non-retention: How does the right to be forgotten work?",
          a: "We enforce an absolute purge policy. Any child portfolio or account that has been inactive or withdrawn from the facility for more than 5 years is automatically and permanently wiped from our server clusters, destroying all digital footprints.",
          icon: <RefreshCw size={18} className="text-slate-700" />
        },
        {
          q: "5. How does the secure threat incident ledger function?",
          a: "Transparency is key. If any technical anomaly or security question arises, our dashboard provides a shared, immutable log database to record the timestamp, precise threat severity, and immediate counter-measures implemented to guarantee safety.",
          icon: <AlertTriangle size={18} className="text-slate-700" />
        },
        {
          q: "6. How is parental double-consent verified?",
          a: "Parents maintain full ownership of their data at all times. A secure double opt-in consent flow is mandated before unlocking medical emergency files or contracts. This consent history can be updated, exported, or fully revoked immediately.",
          icon: <CheckCircle2 size={18} className="text-slate-700" />
        }
      ],
      registryTitle: "Cybersecurity & Security Incident Register",
      registryDesc: "Real-time records of server events, backup statuses, and reported system threats.",
      btnReport: "Log a security event",
      colDate: "Logged Date",
      colType: "Type / Incident",
      colThreat: "Severity",
      colAction: "Immediate Mitigation",
      colStatus: "Status",
      modalTitle: "New Security Incident Entry",
      modalDesc: "Encrypted threat report logged to the systems ledger.",
      labelTitle: "Incident overview",
      labelSeverity: "Severity scale",
      labelDetails: "Technical details & mitigation steps taken",
      btnCancel: "Cancel",
      btnSubmit: "Log Encrypted"
    }
  };

  const currentQA = language === 'fr' ? qaContent.fr : qaContent.en;

  return (
    <div id="gh-legal-qa-view" className="font-sans text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-950 pt-24 pb-28 min-h-screen transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in space-y-3">
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 dark:text-white tracking-tight leading-none">
            {currentQA.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
            {currentQA.subtitle}
          </p>
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-4 mb-20">
          {currentQA.questions.map((item, index) => {
            const isOpen = activeQuestion === index;
            return (
              <div 
                key={index} 
                className={`bg-white dark:bg-slate-900 rounded-xl border transition-all duration-300 overflow-hidden shadow-2xs ${
                  isOpen ? 'border-slate-400 dark:border-slate-700' : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705'
                }`}
              >
                <button
                  onClick={() => setActiveQuestion(isOpen ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700">
                      {item.icon}
                    </div>
                    <span className="font-display font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-normal">
                      {item.q}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-6 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                    <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-300 leading-relaxed font-light pl-11">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Simulated Registry Box */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-205 dark:border-slate-800 shadow-3xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm">{currentQA.registryTitle}</h3>
              <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1">{currentQA.registryDesc}</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-slate-950 hover:bg-slate-900 dark:bg-amber-400 dark:hover:bg-amber-500 text-white dark:text-amber-950 rounded-lg text-xs font-black px-4.5 py-2.5 transition active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer border border-transparent shadow-2xs shrink-0 font-sans"
            >
              <ShieldCheck size={14} className="text-emerald-450" />
              <span>{currentQA.btnReport}</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase font-semibold tracking-wider text-[9px] font-mono">
                  <th className="p-4">{currentQA.colDate}</th>
                  <th className="p-4">{currentQA.colType}</th>
                  <th className="p-4">{currentQA.colThreat}</th>
                  <th className="p-4">{currentQA.colAction}</th>
                  <th className="p-4">{currentQA.colStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-slate-450 font-mono">
                        <Calendar size={12} />
                        <span>{inc.date}</span>
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {language === 'fr' ? inc.title.fr : inc.title.en}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-semibold ${
                        inc.severity === 'Basse' ? 'bg-slate-100 text-slate-700' : 'bg-rose-50 text-rose-650 border border-rose-100/65'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="p-4 text-slate-550 font-light font-sans">
                      {language === 'fr' ? inc.action.fr : inc.action.en}
                    </td>
                    <td className="p-4 text-emerald-600 font-bold whitespace-nowrap">
                      <span>✓ {language === 'fr' ? inc.status.fr : inc.status.en}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* NEW EVENT REPORT MODAL DIALOG */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-lg overflow-hidden animate-fade-in font-sans">
            <div className="bg-slate-950 p-5 text-white flex justify-between items-center pr-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{currentQA.modalTitle}</span>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer text-lg leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleReportIncident} className="p-6 space-y-4 text-xs">
              <p className="text-[11px] text-slate-500 leading-normal font-light mb-2">{currentQA.modalDesc}</p>
              
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">{currentQA.labelTitle}</label>
                <input
                  type="text"
                  placeholder={language === 'fr' ? "ex: Activité réseau suspecte" : "e.g. Suspected network threat"}
                  value={incidentForm.title}
                  onChange={(e) => setIncidentForm({...incidentForm, title: e.target.value})}
                  className="w-full text-xs border border-slate-200 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">{currentQA.labelSeverity}</label>
                <select
                  value={incidentForm.severity}
                  onChange={(e) => setIncidentForm({...incidentForm, severity: e.target.value})}
                  className="w-full text-xs border border-slate-200 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white cursor-pointer transition"
                >
                  <option value="Basse">{language === 'fr' ? "Basse (Alerte diagnostique)" : "Low (Diagnostic warning)"}</option>
                  <option value="Moyenne">{language === 'fr' ? "Moyenne (Alerte confirmée)" : "Medium (Confirmed alert)"}</option>
                  <option value="Élevée">{language === 'fr' ? "Élevée (Menace éventuelle)" : "High (Potential threat)"}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">{currentQA.labelDetails}</label>
                <textarea
                  rows={3}
                  placeholder={language === 'fr' ? "Actions entreprises pour atténuer..." : "Fixes applied to mitigate..."}
                  value={incidentForm.details}
                  onChange={(e) => setIncidentForm({...incidentForm, details: e.target.value})}
                  className="w-full text-xs border border-slate-200 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:bg-white resize-none transition"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  {currentQA.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer transition"
                >
                  {currentQA.btnSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
