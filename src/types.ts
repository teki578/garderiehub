export interface Daycare {
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

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

export interface Contact {
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

export interface Message {
  id: string;
  parentName: string;
  text: string;
  time: string;
}

export interface Email {
  id: string;
  to: string;
  subject: string;
  sentAt: string;
  status: string;
}

export interface FailedLogin {
  id: string;
  email: string;
  ip: string;
  timestamp: string;
}

export interface AppState {
  daycares: Daycare[];
  auditLogs: AuditLog[];
  contacts: Contact[];
  messages: Message[];
  emails: Email[];
  settings: {
    systemLocked: boolean;
    mfaEnabled: boolean;
    recaptchaEnabled: boolean;
    allowedIpsOnly: boolean;
  };
  failedLogins: FailedLogin[];
}
