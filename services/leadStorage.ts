import { Lead } from '../types.ts';

const LEADS_STORAGE_KEY = 'bizflow_leads';
export const LEADS_UPDATED_EVENT = 'bizflow_leads_updated';

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
  link.setAttribute('download', `bizflow_leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
