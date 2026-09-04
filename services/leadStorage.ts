import { Lead, ServicePricingItem, AnnouncementConfig, ActivityLog } from '../types.ts';

const LEADS_STORAGE_KEY = 'bizskoop_leads';
export const LEADS_UPDATED_EVENT = 'bizskoop_leads_updated';
export const PRICING_UPDATED_EVENT = 'bizskoop_pricing_updated';
export const ANNOUNCEMENT_UPDATED_EVENT = 'bizskoop_announcement_updated';
export const AUDIT_LOGS_KEY = 'bizskoop_audit_logs';
export const SITE_CONFIG_STORAGE_KEY = 'bizskoop_site_config';
export const SITE_CONFIG_UPDATED_EVENT = 'bizskoop_config_updated';

export interface SiteConfig {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  heroTitle: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  companyName: 'BIZSKOOP',
  phone: '+60 11-2424 4993',
  email: 'bizskoop@gmail.com',
  address: 'Level 09, Integra Tower, The Intermark 50400 Kuala Lumpur',
  whatsapp: '+601124244993',
  heroTitle: 'STRATEGIC CONSULTANCY'
};

// Auto-run migration to sanitize and wipe any legacy BIZFLOW / bizflow keys
export const runStorageMigration = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    // 1. Clean and migrate site config
    const legacyConfig = localStorage.getItem('bizflow_site_config');
    const existingConfig = localStorage.getItem(SITE_CONFIG_STORAGE_KEY) || legacyConfig;
    if (existingConfig) {
      try {
        const parsed = JSON.parse(existingConfig);
        const cleaned: SiteConfig = {
          companyName: (parsed.companyName && !/bizflow/i.test(parsed.companyName)) ? parsed.companyName : 'BIZSKOOP',
          phone: (parsed.phone && parsed.phone.includes('2424')) ? parsed.phone : DEFAULT_SITE_CONFIG.phone,
          email: (parsed.email && !/bizflow/i.test(parsed.email) && !/info@bizskoop/i.test(parsed.email)) ? parsed.email : DEFAULT_SITE_CONFIG.email,
          address: (parsed.address && parsed.address.includes('Integra')) ? parsed.address : DEFAULT_SITE_CONFIG.address,
          whatsapp: parsed.whatsapp || DEFAULT_SITE_CONFIG.whatsapp,
          heroTitle: parsed.heroTitle || DEFAULT_SITE_CONFIG.heroTitle,
        };
        localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(cleaned));
      } catch {
        localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONFIG));
      }
    } else {
      localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONFIG));
    }
    localStorage.removeItem('bizflow_site_config');

    // 2. Clean and migrate leads
    const legacyLeads = localStorage.getItem('bizflow_leads');
    if (legacyLeads && !localStorage.getItem(LEADS_STORAGE_KEY)) {
      localStorage.setItem(LEADS_STORAGE_KEY, legacyLeads);
    }
    localStorage.removeItem('bizflow_leads');

    // 3. Clean and migrate newsletter
    const legacyNews = localStorage.getItem('bizflow_newsletter_subscribers');
    if (legacyNews && !localStorage.getItem('bizskoop_newsletter_subscribers')) {
      localStorage.setItem('bizskoop_newsletter_subscribers', legacyNews);
    }
    localStorage.removeItem('bizflow_newsletter_subscribers');

    // 4. Clean and migrate pricing matrix
    const legacyPricing = localStorage.getItem('bizflow_pricing_matrix');
    if (legacyPricing && !localStorage.getItem('bizskoop_pricing_matrix')) {
      localStorage.setItem('bizskoop_pricing_matrix', legacyPricing);
    }
    localStorage.removeItem('bizflow_pricing_matrix');

    // 5. Clean and migrate announcement
    const legacyAnn = localStorage.getItem('bizflow_announcement');
    if (legacyAnn && !localStorage.getItem('bizskoop_announcement')) {
      localStorage.setItem('bizskoop_announcement', legacyAnn);
    }
    localStorage.removeItem('bizflow_announcement');

    // 6. Clean FAQs and PIN
    const legacyFAQs = localStorage.getItem('bizflow_custom_faqs');
    if (legacyFAQs && !localStorage.getItem('bizskoop_custom_faqs')) {
      localStorage.setItem('bizskoop_custom_faqs', legacyFAQs);
    }
    localStorage.removeItem('bizflow_custom_faqs');

    const legacyPin = localStorage.getItem('bizflow_admin_pin');
    if (legacyPin && !localStorage.getItem('bizskoop_admin_pin')) {
      localStorage.setItem('bizskoop_admin_pin', legacyPin);
    }
    localStorage.removeItem('bizflow_admin_pin');
    localStorage.removeItem('bizflow_audit_logs');
    sessionStorage.removeItem('bizflow_admin_auth');
  } catch (e) {
    console.error('Storage migration error:', e);
  }
};

// Immediate migration execution on import
runStorageMigration();

export const sanitizeAndGetSiteConfig = (): SiteConfig => {
  try {
    runStorageMigration();
    const raw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONFIG));
      return DEFAULT_SITE_CONFIG;
    }
    const parsed = JSON.parse(raw);
    const cleaned: SiteConfig = {
      companyName: (parsed.companyName && !/bizflow/i.test(parsed.companyName)) ? parsed.companyName : 'BIZSKOOP',
      phone: (parsed.phone && parsed.phone.includes('2424')) ? parsed.phone : DEFAULT_SITE_CONFIG.phone,
      email: (parsed.email && !/bizflow/i.test(parsed.email) && !/info@bizskoop/i.test(parsed.email)) ? parsed.email : DEFAULT_SITE_CONFIG.email,
      address: (parsed.address && parsed.address.includes('Integra')) ? parsed.address : DEFAULT_SITE_CONFIG.address,
      whatsapp: parsed.whatsapp || DEFAULT_SITE_CONFIG.whatsapp,
      heroTitle: parsed.heroTitle || DEFAULT_SITE_CONFIG.heroTitle,
    };
    localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(cleaned));
    return cleaned;
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
};

export const saveSiteConfig = (config: SiteConfig) => {
  try {
    const cleaned: SiteConfig = {
      ...config,
      companyName: (!config.companyName || /bizflow/i.test(config.companyName)) ? 'BIZSKOOP' : config.companyName,
      email: (!config.email || /bizflow/i.test(config.email)) ? 'bizskoop@gmail.com' : config.email,
    };
    localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(cleaned));
    localStorage.removeItem('bizflow_site_config');
    window.dispatchEvent(new Event(SITE_CONFIG_UPDATED_EVENT));
  } catch (e) {
    console.error('Failed to save site config', e);
  }
};

export const DEFAULT_PRICING_MATRIX: ServicePricingItem[] = [
  {
    id: 'price_incorp',
    serviceKey: 'incorporation',
    serviceName: 'Sdn Bhd Company Incorporation',
    category: 'Corporate Setup',
    basePriceMYR: 1499,
    governmentFeeMYR: 1010,
    processingTime: '2 - 3 Working Days',
    popularBadge: true,
    features: [
      'SSM Name Search & Reservation (1 Name)',
      'Digital Certificate of Incorporation (Form 9 / Section 17)',
      'Free 1st Year Company Secretary Appointment',
      'Electronic Statutory Registers & Minute Books',
      'Resolution for Corporate Bank Account Opening'
    ]
  },
  {
    id: 'price_sec',
    serviceKey: 'company-secretarial',
    serviceName: 'Named Company Secretary Retainer',
    category: 'Governance & Compliance',
    basePriceMYR: 90,
    governmentFeeMYR: 0,
    processingTime: 'Continuous Monthly',
    popularBadge: false,
    features: [
      'Licensed SSM Qualified Company Secretary',
      'Maintenance of Register of Members & Directors',
      'Annual Return (AR) Preparation & SSM Filing',
      'Preparation of Standard Board Resolutions',
      'Registered Office Address Facility'
    ]
  },
  {
    id: 'price_acct',
    serviceKey: 'accounting',
    serviceName: 'Accounting & Statutory Bookkeeping',
    category: 'Finance & Accounts',
    basePriceMYR: 450,
    governmentFeeMYR: 0,
    processingTime: 'Monthly / Quarterly Cycle',
    popularBadge: true,
    features: [
      'Monthly Balance Sheet, P&L, & General Ledger',
      'Bank Reconciliation & Accounts Payable/Receivable',
      'Cloud Accounting Setup (Xero / QuickBooks / SQL)',
      'SST-02 Filing & Tax Invoicing Support',
      'Year-End Audit Working Paper Preparation'
    ]
  },
  {
    id: 'price_tax',
    serviceKey: 'tax',
    serviceName: 'Corporate & Personal Tax Compliance',
    category: 'LHDN Taxation',
    basePriceMYR: 1200,
    governmentFeeMYR: 100,
    processingTime: '5 - 7 Working Days',
    popularBadge: false,
    features: [
      'Corporate Tax Return (Form C) Computation & e-Filing',
      'CP204 Tax Estimate Preparation & Amendment (CP204A)',
      'Director Form BE/B Personal Tax Filing',
      'Capital Allowance & Tax Incentive Maximization',
      'LHDN Audit Representation & Query Handling'
    ]
  },
  {
    id: 'price_visa',
    serviceKey: 'visa',
    serviceName: 'Employment Pass (EP I/II) & Expatriate Visa',
    category: 'Immigration & ESD',
    basePriceMYR: 2800,
    governmentFeeMYR: 1500,
    processingTime: '14 - 21 Working Days',
    popularBadge: true,
    features: [
      'MYXpats / ESD Company Account Registration',
      'EP Category I (RM10,000+) & EP Category II (RM5,000+) Filing',
      'Professional Visa Documentation & MIDA Support',
      'Dependent Pass (DP) & Long-Term Social Visit Pass',
      'End-to-end Passport Endorsement Escort'
    ]
  },
  {
    id: 'price_license',
    serviceKey: 'licensing',
    serviceName: 'Premise & DBKL Local Council Licensing',
    category: 'Local Permits',
    basePriceMYR: 1800,
    governmentFeeMYR: 800,
    processingTime: '10 - 14 Working Days',
    popularBadge: false,
    features: [
      'Premise Business License & Signboard License',
      'Bomba (Fire Department) Safety Compliance Clearance',
      'Health & Food Handling License for F&B/Retail',
      'WRT (Wholesale, Retail, Trade) Ministry of Domestic Trade Permit',
      'Local Council Site Inspection Coordination'
    ]
  }
];

export const DEFAULT_ANNOUNCEMENT: AnnouncementConfig = {
  enabled: true,
  message: '🇲🇾 2026 Malaysia Corporate Advisory: SSM Filing Deadlines & Fast-Track ESD Employment Pass Applications are now open.',
  ctaText: 'Book Free Consult',
  ctaUrl: 'contact',
  badgeText: 'EXECUTIVE UPDATE',
  theme: 'gold',
  marqueeEffect: true
};

export const getStoredPricingMatrix = (): ServicePricingItem[] => {
  try {
    const raw = localStorage.getItem('bizskoop_pricing_matrix');
    if (!raw) {
      localStorage.setItem('bizskoop_pricing_matrix', JSON.stringify(DEFAULT_PRICING_MATRIX));
      return DEFAULT_PRICING_MATRIX;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PRICING_MATRIX;
  } catch {
    return DEFAULT_PRICING_MATRIX;
  }
};

export const getStoredAnnouncement = (): AnnouncementConfig => {
  try {
    const raw = localStorage.getItem('bizskoop_announcement');
    if (!raw) {
      localStorage.setItem('bizskoop_announcement', JSON.stringify(DEFAULT_ANNOUNCEMENT));
      return DEFAULT_ANNOUNCEMENT;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
};

export const getStoredAuditLogs = (): ActivityLog[] => {
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const logAdminAudit = (action: string) => {
  try {
    const logs = getStoredAuditLogs();
    const newEntry: ActivityLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      action,
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...logs].slice(0, 50); // keep latest 50
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to log admin audit:', err);
  }
};

export const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead_1',
    fullName: 'David Lim',
    email: 'david.lim@techventures.sg',
    companyName: 'TechVentures Pte Ltd',
    phoneNumber: '+65 9123 4567',
    service: 'Company Secretarial',
    message: 'We are looking to expand our operations into Kuala Lumpur and incorporate a local Sdn Bhd. We need support with nominee directors and corporate banking setup.',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'unread'
  },
  {
    id: 'lead_2',
    fullName: 'Sarah Jenkins',
    email: 'sjenkins@globalinnovate.co',
    companyName: 'Global Innovate LLC',
    phoneNumber: '+1 415 555 2671',
    service: 'Immigration & Visa',
    message: 'Need urgent employment pass (EP Category II) assistance for 3 technical engineers relocating to Malaysia next month.',
    date: new Date(Date.now() - 3600000 * 8).toISOString(),
    status: 'unread'
  },
  {
    id: 'lead_3',
    fullName: 'Tan Sri Dato’ Rosli',
    email: 'rosli@dynamiccorp.my',
    companyName: 'Dynamic Holdings Bhd',
    phoneNumber: '+60 12 345 6789',
    service: 'Corporate Advisory',
    message: 'Inquiring about corporate structuring and advisory for an upcoming merger in the manufacturing sector.',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'in-progress'
  },
  {
    id: 'lead_4',
    fullName: 'Chen Wei',
    email: 'chenwei@cloudretail.cn',
    companyName: 'Cloud Retail China',
    phoneNumber: '+86 139 1234 5678',
    service: 'Business Licensing',
    message: 'Interested in retail licensing and WRT (Wholesale, Retail, Trade) permit application requirements for foreign-owned entities.',
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'resolved'
  }
];

export const getStoredLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return DEFAULT_LEADS;
  } catch (err) {
    console.error('Failed to read leads from localStorage:', err);
    return DEFAULT_LEADS;
  }
};

export const saveNewLead = (
  leadData: {
    fullName: string;
    email?: string;
    companyName?: string;
    phoneNumber?: string;
    service?: string;
    message?: string;
  }
): Lead => {
  const currentLeads = getStoredLeads();
  const newLead: Lead = {
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    fullName: leadData.fullName || 'Anonymous Prospect',
    email: leadData.email || 'N/A',
    companyName: leadData.companyName || 'Private Inquiry',
    phoneNumber: leadData.phoneNumber || 'N/A',
    service: leadData.service || 'General Consultation',
    message: leadData.message || 'No additional message provided.',
    date: new Date().toISOString(),
    status: 'unread'
  };

  const updatedLeads = [newLead, ...currentLeads];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT, { detail: newLead }));
  } catch (err) {
    console.error('Failed to write lead to localStorage:', err);
  }

  return newLead;
};

export const updateLeadStatus = (id: string, status: Lead['status']): Lead[] => {
  const currentLeads = getStoredLeads();
  const updatedLeads = currentLeads.map((l) => (l.id === id ? { ...l, status } : l));
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT));
  return updatedLeads;
};

export const deleteLeadById = (id: string): Lead[] => {
  const currentLeads = getStoredLeads();
  const updatedLeads = currentLeads.filter((l) => l.id !== id);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT));
  return updatedLeads;
};

export const clearAllStoredLeads = (): Lead[] => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
  window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT));
  return [];
};

export const createMockLead = (): Lead => {
  const mockNames = ['Amirul Hakim', 'Siti Nurhaliza', 'Rajesh Kanna', 'Jessica Tan', 'Kenji Sato', 'Elena Rostova'];
  const mockCompanies = ['Vanguard Solutions Sdn Bhd', 'Nexus Tech Labs', 'Apex Logistics Asia', 'Pacific Trade Group', 'Solaris Green Energy'];
  const mockServices = ['Company Secretarial', 'Tax Compliance', 'Accounting & Bookkeeping', 'Immigration & Visa', 'Business Licensing', 'Local Council Licensing', 'Buy/Sell Business', 'Corporate Services'];
  const mockMessages = [
    'Seeking assistance with registration of a new Sdn Bhd and opening corporate bank account with Maybank.',
    'Need corporate tax advisory for our foreign branch setup and cross-border transfer pricing.',
    'Urgent inquiry regarding Employment Pass (EP I/II) for 4 senior expatriate staff joining next quarter.',
    'Requesting quotation for full-year accounting, monthly payroll, and statutory bookkeeping services.',
    'Looking to apply for DBKL signboard license and premise permit for our new retail outlet in Bukit Bintang.'
  ];

  const randomIdx = Math.floor(Math.random() * mockNames.length);
  const name = mockNames[randomIdx];
  const email = name.toLowerCase().replace(/\s+/g, '.') + '@' + mockCompanies[randomIdx % mockCompanies.length].toLowerCase().split(' ')[0] + '.com';

  return saveNewLead({
    fullName: name,
    email,
    companyName: mockCompanies[randomIdx % mockCompanies.length],
    phoneNumber: '+60 1' + (2 + Math.floor(Math.random() * 8)) + ' ' + Math.floor(100 + Math.random() * 900) + ' ' + Math.floor(1000 + Math.random() * 9000),
    service: mockServices[Math.floor(Math.random() * mockServices.length)],
    message: mockMessages[Math.floor(Math.random() * mockMessages.length)]
  });
};

export const exportLeadsToCSV = (leads: Lead[]) => {
  const headers = ['ID', 'Full Name', 'Email', 'Company', 'Phone Number', 'Service', 'Message', 'Submission Date', 'Status'];
  const rows = leads.map((l) => [
    l.id,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.companyName || '').replace(/"/g, '""')}"`,
    `"${(l.phoneNumber || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${new Date(l.date).toLocaleString().replace(/"/g, '""')}"`,
    l.status
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `bizskoop_leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
