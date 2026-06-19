import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database State
const appState = {
  daycares: [
    {
      id: "dc_1",
      name: "Château des Bout'choux",
      city: "Montréal",
      plan: "Premium",
      status: "active",
      owner: "Sophie Tremblay",
      email: "sophie@chateauboutchoux.ca",
      phone: "514-555-1234",
      capacity: 80,
      enrolled: 74,
      waitlistCount: 15,
      createdAt: "2024-01-15T08:00:00Z"
    },
    {
      id: "dc_2",
      name: "Garderie Étoile Polaire",
      city: "Québec",
      plan: "Premium",
      status: "active",
      owner: "Jean-Pierre Roy",
      email: "jp@etoilepolaire.ca",
      phone: "418-555-5678",
      capacity: 50,
      enrolled: 48,
      waitlistCount: 22,
      createdAt: "2024-03-20T09:30:00Z"
    },
    {
      id: "dc_3",
      name: "Le Jardin Enchanté",
      city: "Laval",
      plan: "Starter",
      status: "pending_payment",
      owner: "Chantal Gagnon",
      email: "chantal@jardinencante.ca",
      phone: "450-555-9012",
      capacity: 60,
      enrolled: 54,
      waitlistCount: 8,
      createdAt: "2025-02-10T11:00:00Z"
    },
    {
      id: "dc_4",
      name: "Les Petits Papillons",
      city: "Sherbrooke",
      plan: "Starter",
      status: "active",
      owner: "Marc Lévesque",
      email: "marc@lespetitspapillons.ca",
      phone: "819-555-3456",
      capacity: 40,
      enrolled: 30,
      waitlistCount: 3,
      createdAt: "2025-05-01T14:15:00Z"
    }
  ],
  auditLogs: [
    { id: "log_1", action: "Paiement mensuel Stripe", details: "Garderie Étoile Polaire - Réussi (180,00 $)", ip: "192.168.1.50", timestamp: "Il y a 14 minutes" },
    { id: "log_2", action: "Mise à jour formulaire confidentialité", details: "Château des Bout'choux - Politique de confidentialité approuvée", ip: "24.48.0.1", timestamp: "Il y a 2 heures" },
    { id: "log_3", action: "Connexion réussie", details: "Admin securite@garderiehub.ca", ip: "184.161.2.14", timestamp: "Il y a 5 heures" }
  ],
  contacts: [
    { 
      id: "c_1", 
      firstName: "Emilie", 
      lastName: "Côté", 
      daycareName: "L'univers des Découvertes", 
      city: "Gatineau", 
      email: "emilie@universdecouvertes.ca", 
      phone: "819-555-7788", 
      preferredContact: "email", 
      message: "Bonjour, j'aimerais recevoir une soumission personnalisée pour mes deux installations de 45 places chacune.", 
      status: "unread", 
      createdAt: "2026-06-18T10:00:00Z" 
    }
  ],
  messages: [
    { id: "m_1", parentName: "Alexandre Dupuis", text: "Est-ce qu'Emma a bien pris son repas de midi? Elle semblait un peu fatiguée ce matin.", time: "11:32" },
    { id: "m_2", parentName: "Mme Chantal (Éducatrice)", text: "Oui, Emma a vidé son assiette et dort paisiblement en ce moment!", time: "11:45" },
    { id: "m_3", parentName: "Alexandre Dupuis", text: "Super, merci!", time: "11:50" }
  ],
  emails: [
    { id: "e_1", to: "direction@etoilepolaire.ca", subject: "Alerte Document Expire - Vaccin DcaT", sentAt: "Aujourd'hui, 09:12", status: "sent" }
  ],
  settings: {
    systemLocked: false,
    mfaEnabled: true,
    recaptchaEnabled: true,
    allowedIpsOnly: false,
  },
  failedLogins: [
    { id: "fl_1", email: "fraud@hacker.com", ip: "203.0.113.5", timestamp: "Il y a 1 jour" }
  ]
};

// API Endpoints
app.get('/api/state', (req, res) => {
  res.json(appState);
});

app.post('/api/contacts', (req, res) => {
  const newContact = {
    id: "c_" + Date.now(),
    ...req.body,
    status: 'unread',
    createdAt: new Date().toISOString()
  };
  appState.contacts.push(newContact);
  appState.auditLogs.unshift({
    id: "log_" + Date.now(),
    action: "Nouvelle demande démo",
    details: `${newContact.daycareName} (${newContact.city})`,
    ip: req.ip || "127.0.0.1",
    timestamp: "À l'instant"
  });
  res.json({ success: true, contact: newContact });
});

app.post('/api/daycares', (req, res) => {
  const newDc = {
    id: "dc_" + Date.now(),
    waitlistCount: 0,
    enrolled: Math.floor(Math.random() * 20) + 10,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  appState.daycares.push(newDc);
  appState.auditLogs.unshift({
    id: "log_" + Date.now(),
    action: "Inscription Garderie",
    details: `${newDc.name} - Plan ${newDc.plan}`,
    ip: req.ip || "127.0.0.1",
    timestamp: "À l'instant"
  });
  res.json({ success: true, daycare: newDc });
});

app.put('/api/daycares/:id', (req, res) => {
  const index = appState.daycares.findIndex(d => d.id === req.params.id);
  if (index !== -1) {
    appState.daycares[index] = { ...appState.daycares[index], ...req.body };
    appState.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Modification Garderie",
      details: `${appState.daycares[index].name} mis à jour`,
      ip: req.ip || "127.0.0.1",
      timestamp: "À l'instant"
    });
    res.json({ success: true, daycare: appState.daycares[index] });
  } else {
    res.status(404).json({ error: "Non trouvé" });
  }
});

app.delete('/api/daycares/:id', (req, res) => {
  const index = appState.daycares.findIndex(d => d.id === req.params.id);
  if (index !== -1) {
    const deleted = appState.daycares[index];
    appState.daycares.splice(index, 1);
    appState.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Résiliation Garderie",
      details: `${deleted.name} supprimée du réseau`,
      ip: req.ip || "127.0.0.1",
      timestamp: "À l'instant"
    });
    res.json({ success: true, id: req.params.id });
  } else {
    res.status(404).json({ error: "Non trouvé" });
  }
});

app.post('/api/messages', (req, res) => {
  const newMsg = {
    id: "msg_" + Date.now(),
    parentName: req.body.parentName || "Parent",
    text: req.body.text,
    time: new Date().toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })
  };
  appState.messages.push(newMsg);
  res.json({ success: true, message: newMsg });
});

app.post('/api/settings', (req, res) => {
  appState.settings = { ...appState.settings, ...req.body };
  appState.auditLogs.unshift({
    id: "log_" + Date.now(),
    action: "Paramètres modifiés",
    details: "Mise à jour de la sécurité",
    ip: req.ip || "127.0.0.1",
    timestamp: "À l'instant"
  });
  res.json({ success: true, settings: appState.settings });
});

app.post('/api/logins/fail', (req, res) => {
  const { email, ip } = req.body;
  const newFail = {
    id: "fl_" + Date.now(),
    email: email || "inconnu",
    ip: ip || req.ip || "127.0.0.1",
    timestamp: "À l'instant"
  };
  appState.failedLogins.unshift(newFail);
  appState.auditLogs.unshift({
    id: "log_" + Date.now(),
    action: "Échec connexion",
    details: `Tentative frauduleuse de: ${email}`,
    ip: ip || req.ip || "127.0.0.1",
    timestamp: "À l'instant"
  });
  res.json({ success: true, failedLogin: newFail });
});

// Serve frontend assets
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // In development, integrate Vite programmatically
  import('vite').then((vite) => {
    vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    }).then((viteDevServer) => {
      app.use(viteDevServer.middlewares);
      app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        
        // Skip API routes just in case
        if (url.startsWith('/api')) {
          return next();
        }

        try {
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
          template = await viteDevServer.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e) {
          viteDevServer.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    });
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Unified server started on http://0.0.0.0:${PORT}`);
});
