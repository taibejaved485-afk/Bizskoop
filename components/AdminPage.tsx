import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Inbox, 
  Settings, 
  HelpCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Plus, 
  Save, 
  Check, 
  X, 
  FileText, 
  Download, 
  Eye, 
  RefreshCw,
  TrendingUp,
  Users,
  Search,
  CheckSquare,
  LogOut,
  AlertCircle,
  Database,
  Upload,
  Copy,
  ExternalLink,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { getStoredLeads, LEADS_UPDATED_EVENT } from '../services/leadStorage.ts';
import { Lead } from '../types.ts';

interface SiteConfig {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  heroTitle: string;
}

interface CustomFAQ {
  id: string;
  service: string;
  question: string;
  answer: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  companyName: 'BIZFLOW',
  phone: '+60 3 2771 8000',
  email: 'info@bizflow.com',
  address: 'Level 09, Integra Tower, The Intermark, 348 Jalan Tun Razak, 50400 Kuala Lumpur, Malaysia',
  whatsapp: '+601124244993',
  heroTitle: 'STRATEGIC CONSULTANCY'
};

interface AdminPageProps {
  onClose: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'site-config' | 'faqs' | 'data'>('leads');
  
  // States for Core Controls
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [customFAQs, setCustomFAQs] = useState<CustomFAQ[]>([]);
  
  // Modal / Form States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7days' | '30days'>('all');
  
  // Custom FAQ Form State
  const [faqForm, setFaqForm] = useState({
    service: 'general',
    question: '',
    answer: ''
  });
  
  // Success toast state
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    // Load leads using central getStoredLeads
    setLeads(getStoredLeads());

    const handleLeadsUpdated = () => {
      setLeads(getStoredLeads());
    };
    window.addEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdated);

    const storedConfig = localStorage.getItem('bizflow_site_config');
    if (storedConfig) {
      try {
        setConfig(JSON.parse(storedConfig));
      } catch (e) {
        setConfig(DEFAULT_CONFIG);
      }
    } else {
      localStorage.setItem('bizflow_site_config', JSON.stringify(DEFAULT_CONFIG));
    }

    const storedFAQs = localStorage.getItem('bizflow_custom_faqs');
    if (storedFAQs) {
      try {
        setCustomFAQs(JSON.parse(storedFAQs));
      } catch (e) {
        setCustomFAQs([]);
      }
    }

    // Always require password authentication on entry
    setIsAuthenticated(false);

    return () => {
      window.removeEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdated);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPIN = localStorage.getItem('bizflow_admin_pin') || 'admin123';
    
    if (pin === storedPIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('bizflow_admin_auth', 'true');
      setErrorMsg('');
      showToast('Welcome to BizFlow Master Admin');
    } else {
      setErrorMsg('Invalid Admin PIN! Default is admin123');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bizflow_admin_auth');
    setPin('');
    showToast('Logged out securely');
  };

  const handleResetPIN = () => {
    const newPIN = prompt('Enter new 4+ digit Admin PIN:');
    if (newPIN && newPIN.trim().length >= 4) {
      localStorage.setItem('bizflow_admin_pin', newPIN.trim());
      showToast('Admin PIN updated successfully!');
    } else if (newPIN) {
      alert('PIN must be at least 4 characters.');
    }
  };

  // Lead actions
  const handleToggleRead = (id: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: (l.status === 'unread' ? 'read' : 'unread') as 'unread' | 'read' } : l);
    setLeads(updated);
    localStorage.setItem('bizflow_leads', JSON.stringify(updated));
    showToast('Lead status updated.');
  };

  const handleMarkAllRead = () => {
    const updated = leads.map(l => ({ ...l, status: 'read' as const }));
    setLeads(updated);
    localStorage.setItem('bizflow_leads', JSON.stringify(updated));
    showToast('All inquiries marked as read.');
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('bizflow_leads', JSON.stringify(updated));
      setSelectedLead(null);
      showToast('Inquiry successfully deleted.');
    }
  };

  const handleClearAllLeads = () => {
    if (confirm('WARNING: This will delete ALL leads permanently. Proceed?')) {
      setLeads([]);
      localStorage.setItem('bizflow_leads', JSON.stringify([]));
      showToast('All leads cleared.');
    }
  };

  const handleAddTestLead = () => {
    const services = ['Tax Compliance', 'Accounting & Bookkeeping', 'Company Secretarial', 'Immigration & Visa', 'Business Licensing', 'Corporate Advisory'];
    const names = ['Datuk Seri Zulkifli', 'Rachel Wong', 'Dr. Ariff Rahman', 'Sarah Jenkins', 'Kenji Takahashi', 'Elena Rostova'];
    const companies = ['Apex Ventures Bhd', 'Nexus Tech Asia', 'Borneo Logistics Sdn Bhd', 'Global Solutions Pte', 'Takahashi Corp'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    
    const testLead: Lead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      fullName: randomName,
      email: randomName.toLowerCase().replace(/[^a-z]/g, '') + '@clientbiz.my',
      companyName: randomCompany,
      phoneNumber: '+60 1' + Math.floor(2 + Math.random() * 8) + ' ' + Math.floor(100 + Math.random() * 900) + ' ' + Math.floor(1000 + Math.random() * 9000),
      service: randomService,
      message: `Urgent inquiry regarding ${randomService} setup and regulatory compliance for our upcoming expansion in Kuala Lumpur. Please contact us via phone or email.`,
      date: new Date().toISOString(),
      status: 'unread'
    };

    const updated = [testLead, ...leads];
    setLeads(updated);
    localStorage.setItem('bizflow_leads', JSON.stringify(updated));
    showToast('New test inquiry generated!');
  };

  const handleExportLeads = () => {
    const header = ['ID', 'Full Name', 'Email', 'Company', 'Phone', 'Service', 'Message', 'Date', 'Status'];
    const csvContent = [
      header.join(','),
      ...filteredLeads.map(l => [
        l.id,
        `"${(l.fullName || '').replace(/"/g, '""')}"`,
        l.email,
        `"${(l.companyName || '').replace(/"/g, '""')}"`,
        l.phoneNumber,
        `"${(l.service || '').replace(/"/g, '""')}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        l.date,
        l.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bizflow_filtered_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredLeads.length} filtered leads as CSV!`);
  };

  // Config actions
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bizflow_site_config', JSON.stringify(config));
    window.dispatchEvent(new Event('bizflow_config_updated'));
    showToast('Site Configuration successfully saved & synced!');
  };

  // FAQ actions
  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    const newFaq: CustomFAQ = {
      id: 'faq_' + Date.now(),
      service: faqForm.service,
      question: faqForm.question.trim(),
      answer: faqForm.answer.trim()
    };

    const updated = [newFaq, ...customFAQs];
    setCustomFAQs(updated);
    localStorage.setItem('bizflow_custom_faqs', JSON.stringify(updated));
    setFaqForm({ service: 'general', question: '', answer: '' });
    showToast('Custom FAQ injected successfully!');
  };

  const handleDeleteFAQ = (id: string) => {
    const updated = customFAQs.filter(f => f.id !== id);
    setCustomFAQs(updated);
    localStorage.setItem('bizflow_custom_faqs', JSON.stringify(updated));
    showToast('Custom FAQ removed.');
  };

  // Backup & Restore
  const handleExportBackup = () => {
    const backupData = {
      leads,
      config,
      customFAQs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bizflow_full_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Complete system backup exported!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.leads) {
          setLeads(parsed.leads);
          localStorage.setItem('bizflow_leads', JSON.stringify(parsed.leads));
        }
        if (parsed.config) {
          setConfig(parsed.config);
          localStorage.setItem('bizflow_site_config', JSON.stringify(parsed.config));
        }
        if (parsed.customFAQs) {
          setCustomFAQs(parsed.customFAQs);
          localStorage.setItem('bizflow_custom_faqs', JSON.stringify(parsed.customFAQs));
        }
        window.dispatchEvent(new Event('bizflow_config_updated'));
        showToast('System backup restored successfully!');
      } catch (err) {
        alert('Invalid backup file format.');
      }
    };
    reader.readAsText(file);
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchSearch = 
      (l.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.message || '').toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchStatus = leadStatusFilter === 'all' ? true : l.status === leadStatusFilter;
    const matchService = serviceFilter === 'all' ? true : (l.service || '').toLowerCase().includes(serviceFilter.toLowerCase());

    const leadDate = new Date(l.date).getTime();
    const now = Date.now();
    let matchDate = true;
    if (dateFilter === 'today') {
      matchDate = now - leadDate <= 24 * 3600 * 1000;
    } else if (dateFilter === '7days') {
      matchDate = now - leadDate <= 7 * 24 * 3600 * 1000;
    } else if (dateFilter === '30days') {
      matchDate = now - leadDate <= 30 * 24 * 3600 * 1000;
    }

    return matchSearch && matchStatus && matchService && matchDate;
  });

  const unreadCount = leads.filter(l => l.status === 'unread').length;

  // Analytics preparation
  const serviceDistribution = leads.reduce((acc: { [key: string]: number }, l) => {
    const s = l.service || 'General';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(serviceDistribution).map(key => ({
    name: key.length > 18 ? key.substring(0, 16) + '...' : key,
    count: serviceDistribution[key]
  }));

  const COLORS = ['#D4AF37', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="min-h-screen w-full bg-slate-100 font-sans text-slate-900 flex flex-col">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-navy-dark text-gold px-6 py-4 rounded-xl font-black uppercase text-xs tracking-wider shadow-2xl z-[10000] flex items-center gap-3 border border-gold"
          >
            <Check size={18} />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-[#051622] to-navy-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
        
        {/* Background ambient glowing shapes */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto py-12 px-8 sm:px-10 text-center flex flex-col justify-center items-center bg-white/95 backdrop-blur-xl rounded-[36px] shadow-2xl border border-white/20 relative z-10"
          >
            {/* Top Security Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full text-[9px] font-black tracking-widest text-amber-800 uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Secure Enterprise Portal
            </div>

            <div className="w-24 h-24 bg-gradient-to-tr from-navy-dark to-slate-800 border-2 border-gold/40 rounded-3xl flex items-center justify-center text-gold mb-6 shadow-xl transform hover:rotate-3 transition-transform duration-300">
              <Lock size={38} className="drop-shadow" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 uppercase">BIZFLOW ADMIN</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Confidential Executive Suite & Lead Control</p>
            
            <form onSubmit={handleLogin} className="w-full space-y-5">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">Secure Passkey / PIN</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter admin123" 
                    className="w-full px-6 py-4.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center font-black tracking-[0.3em] text-lg text-slate-900 outline-none focus:border-gold focus:bg-white transition-all shadow-inner"
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-600 text-xs font-bold justify-center bg-red-50 py-3 px-4 rounded-xl border border-red-200 shadow-sm"
                >
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              <button 
                type="submit" 
                className="w-full h-16 bg-gradient-to-r from-navy-dark to-slate-900 text-gold font-black rounded-2xl shadow-xl hover:from-gold hover:to-amber-500 hover:text-navy-dark transition-all uppercase tracking-[0.2em] text-xs cursor-pointer border border-gold/20 flex items-center justify-center gap-2 group"
              >
                <span>Authenticate Access</span>
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold">
                <span>Default Passkey:</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 font-black tracking-wider">admin123</span>
              </div>

              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <X size={12} /> Return to Public Website
              </button>
            </div>
          </motion.div>
        ) : (
          
          /* FULLY AUTHORIZED ADMIN DASHBOARD */
          <>
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full md:w-80 bg-white border-r border-slate-200 p-6 md:p-8 flex flex-col justify-between shrink-0 shadow-sm">
              <div className="space-y-8">
                {/* Branding */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy-dark text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    B
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none">BizFlow</h3>
                    <span className="text-[9px] font-bold tracking-widest text-amber-600 uppercase">Executive Suite</span>
                  </div>
                </div>

                {/* Tabs / Menus */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'leads' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Inbox size={16} />
                      <span>Inquiries & Leads</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'leads' ? 'bg-gold text-navy-dark' : 'bg-red-500 text-white'}`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <BarChart3 size={16} />
                    <span>Lead Analytics</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('site-config')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'site-config' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <Settings size={16} />
                    <span>Global Settings</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('faqs')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'faqs' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <HelpCircle size={16} />
                    <span>Dynamic FAQs</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('data')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'data' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <Database size={16} />
                    <span>Backup & Restore</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Footer Controls */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <button 
                  onClick={handleResetPIN}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Change Admin PIN
                </button>
                
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <X size={14} /> Exit
                  </button>
                </div>
              </div>
            </div>

            {/* DASHBOARD CONTENT BODY */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between bg-slate-50 text-slate-900">
              
              {/* LEADS PANEL */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Inquiries & Form Leads</h2>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time submissions from contact & consultation forms</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button 
                        onClick={handleAddTestLead}
                        className="px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-[10px] uppercase tracking-widest text-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Plus size={14} /> Add Test Lead
                      </button>
                      <button 
                        onClick={handleMarkAllRead}
                        className="px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-[10px] uppercase tracking-widest text-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <CheckSquare size={14} /> Mark All Read
                      </button>
                      <button 
                        onClick={handleExportLeads}
                        className="px-4 py-3 bg-navy-dark text-gold rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-md cursor-pointer hover:bg-gold hover:text-navy-dark"
                      >
                        <Download size={14} /> Export CSV
                      </button>
                      {leads.length > 0 && (
                        <button 
                          onClick={handleClearAllLeads}
                          className="px-3 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer border border-red-200"
                          title="Clear All Leads"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Statistics widgets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-gold/20 flex items-center justify-center text-gold">
                        <Inbox size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-900">{leads.length}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Total Submissions</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                        <AlertCircle size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-900">{unreadCount}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Unread Inquiries</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-600">
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-900">
                          {leads.length > 0 ? `${Math.round(((leads.length - unreadCount) / leads.length) * 100)}%` : '100%'}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Processed Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative w-full md:max-w-xs">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search name, email, company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status:</span>
                        {['all', 'unread', 'read'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setLeadStatusFilter(status as any)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${leadStatusFilter === status ? 'bg-navy-dark text-gold shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Date:</span>
                        <select 
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value as any)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold uppercase text-slate-800 outline-none cursor-pointer"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Last 24 Hours</option>
                          <option value="7days">Last 7 Days</option>
                          <option value="30days">Last 30 Days</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Service:</span>
                        <select 
                          value={serviceFilter}
                          onChange={(e) => setServiceFilter(e.target.value)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold uppercase text-slate-800 outline-none cursor-pointer"
                        >
                          <option value="all">All Services</option>
                          <option value="tax">Tax</option>
                          <option value="accounting">Accounting</option>
                          <option value="secretarial">Secretarial</option>
                          <option value="visa">Visa</option>
                          <option value="licensing">Licensing</option>
                          <option value="corporate">Corporate</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Leads Table / List */}
                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    {filteredLeads.length === 0 ? (
                      <div className="py-16 text-center text-slate-400">
                        <Inbox size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No matching inquiries found.</p>
                        <p className="text-[10px] text-slate-400 mt-1">Submit a contact form or click "Add Test Lead" to populate.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                        {filteredLeads.map((lead) => (
                          <div 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-all ${lead.status === 'unread' ? 'border-l-4 border-amber-500 bg-amber-50/50' : 'border-l-4 border-transparent'}`}
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <h4 className={`text-sm font-black ${lead.status === 'unread' ? 'text-amber-700' : 'text-slate-900'}`}>
                                  {lead.fullName}
                                </h4>
                                <span className="px-2.5 py-0.5 bg-slate-100 rounded-md text-[9px] font-black text-slate-700 uppercase tracking-widest border border-slate-200">
                                  {lead.service}
                                </span>
                                {lead.status === 'unread' && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[8px] font-black uppercase tracking-widest">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-600 text-xs font-medium">
                                <span className="text-slate-900 font-bold">{lead.companyName}</span> • {lead.email} • {lead.phoneNumber}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold">
                                {new Date(lead.date).toLocaleString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => handleToggleRead(lead.id)}
                                title={lead.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                                className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                              >
                                {lead.status === 'unread' ? <Eye size={16} /> : <CheckSquare size={16} />}
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2.5 bg-slate-100 hover:bg-red-100 rounded-xl text-slate-600 hover:text-red-600 transition-all cursor-pointer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ANALYTICS PANEL */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Lead Distribution & Analytics</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Visual breakdown of inquiries across service categories</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Inquiries by Service</h3>
                      <div className="h-72 w-full pt-4">
                        {chartData.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold uppercase">No data available</div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} allowDecimals={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                              <Bar dataKey="count" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Total Inquiries Logged</span>
                            <span className="text-lg font-black text-amber-600">{leads.length}</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Pending Review</span>
                            <span className="text-lg font-black text-red-600">{unreadCount}</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">Active Service Categories</span>
                            <span className="text-lg font-black text-blue-600">{Object.keys(serviceDistribution).length}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-slate-700 font-medium leading-relaxed">
                        Tip: You can export all leads to CSV at any time for CRM import or offline client follow-up.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SITE CONFIG PANEL */}
              {activeTab === 'site-config' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Global Site Configuration</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Update contact details and brand configuration dynamically</p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="bg-white p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">Company Brand Name</label>
                      <input 
                        type="text" 
                        value={config.companyName}
                        onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all shadow-inner"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">Hero Tagline / Title</label>
                      <input 
                        type="text" 
                        value={config.heroTitle}
                        onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all shadow-inner"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={config.phone}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all shadow-inner"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">WhatsApp Number</label>
                      <input 
                        type="text" 
                        value={config.whatsapp}
                        onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all shadow-inner"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">Email Address</label>
                      <input 
                        type="email" 
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all shadow-inner"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-700 ml-2">HQ Physical Office Address</label>
                      <textarea 
                        rows={3}
                        value={config.address}
                        onChange={(e) => setConfig({ ...config, address: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all resize-none shadow-inner"
                        required
                      />
                    </div>

                    <div className="md:col-span-2 pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => {
                          setConfig(DEFAULT_CONFIG);
                          localStorage.setItem('bizflow_site_config', JSON.stringify(DEFAULT_CONFIG));
                          window.dispatchEvent(new Event('bizflow_config_updated'));
                          showToast('Reset to default configuration!');
                        }}
                        className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Reset Defaults
                      </button>
                      <button 
                        type="submit" 
                        className="px-8 py-4 bg-navy-dark text-gold font-black rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-md cursor-pointer hover:bg-gold hover:text-navy-dark"
                      >
                        <Save size={14} /> Save Configuration
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* DYNAMIC FAQS PANEL */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Dynamic FAQ Injection</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Add custom questions that appear instantly on service pages</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form to add */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 h-fit space-y-6 shadow-sm">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Add Custom Question</h3>
                      
                      <form onSubmit={handleAddFAQ} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-600">Target Service Page</label>
                          <select 
                            value={faqForm.service}
                            onChange={(e) => setFaqForm({ ...faqForm, service: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all cursor-pointer"
                          >
                            <option value="general">General / About Us</option>
                            <option value="tax">Tax Compliance</option>
                            <option value="accounting">Accounting & Bookkeeping</option>
                            <option value="company-secretarial">Company Secretarial</option>
                            <option value="visa">Immigration & Visa</option>
                            <option value="licensing">Business Licensing</option>
                            <option value="corporate">Corporate Services</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-600">Question</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Do you provide courier services?"
                            value={faqForm.question}
                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-600">Answer</label>
                          <textarea 
                            rows={4}
                            placeholder="Type the answer here..."
                            value={faqForm.answer}
                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all resize-none"
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-4 bg-navy-dark text-gold font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-gold hover:text-navy-dark transition-colors shadow-md"
                        >
                          <Plus size={14} /> Inject FAQ
                        </button>
                      </form>
                    </div>

                    {/* FAQ List manager */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Active Custom FAQs ({customFAQs.length})</h3>
                      
                      {customFAQs.length === 0 ? (
                        <div className="py-16 text-center text-slate-400">
                          <HelpCircle size={40} className="mx-auto mb-3 opacity-20" />
                          <p className="font-bold uppercase tracking-widest text-xs">No custom FAQs added yet.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-2 space-y-4">
                          {customFAQs.map((faq) => (
                            <div key={faq.id} className="pt-4 first:pt-0 flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[8px] font-black uppercase tracking-widest border border-slate-200">
                                  {faq.service}
                                </span>
                                <h4 className="text-xs font-black text-slate-900 mt-1">{faq.question}</h4>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
                              </div>

                              <button 
                                onClick={() => handleDeleteFAQ(faq.id)}
                                className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* DATA BACKUP & RESTORE PANEL */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Backup & System Data</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Export or restore all leads, settings, and custom FAQs as JSON</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-amber-50 border border-gold/20 rounded-2xl flex items-center justify-center text-gold">
                          <Download size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Export Full System Backup</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Download a complete JSON file containing all leads, site configurations, and custom FAQ injections for offline archival or migration.
                        </p>
                      </div>

                      <button 
                        onClick={handleExportBackup}
                        className="w-full py-4 bg-navy-dark text-gold font-black rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-gold hover:text-navy-dark transition-colors shadow-md"
                      >
                        <Download size={16} /> Download JSON Backup
                      </button>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600">
                          <Upload size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Restore from JSON Backup</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Upload a previously exported BizFlow JSON backup file to instantly restore leads and configurations.
                        </p>
                      </div>

                      <div>
                        <label className="w-full py-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                          <Upload size={16} /> Choose Backup File
                          <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LEADS DETAIL MODAL (IF SELECTED) */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10001] flex items-center justify-center p-4"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white border border-slate-200 rounded-[32px] w-full max-w-xl p-8 space-y-6 relative shadow-2xl"
                    >
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 cursor-pointer"
                      >
                        <X size={20} />
                      </button>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                            {selectedLead.service}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${selectedLead.status === 'unread' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                            {selectedLead.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedLead.fullName}</h3>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">
                            {selectedLead.companyName}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-slate-100 py-4">
                          <div className="flex items-center gap-2 text-xs">
                            <Mail size={14} className="text-amber-600" />
                            <a href={`mailto:${selectedLead.email}`} className="text-slate-700 hover:text-slate-900 truncate underline">
                              {selectedLead.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone size={14} className="text-amber-600" />
                            <a href={`tel:${selectedLead.phoneNumber}`} className="text-slate-700 hover:text-slate-900 underline">
                              {selectedLead.phoneNumber}
                            </a>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Message / Inquiry Details:</p>
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
                            {selectedLead.message}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                          <span className="text-[10px] font-bold text-slate-400">
                            Submitted: {new Date(selectedLead.date).toLocaleString()}
                          </span>

                          <div className="flex flex-wrap items-center gap-2">
                            <button 
                              onClick={() => {
                                handleToggleRead(selectedLead.id);
                                setSelectedLead({ ...selectedLead, status: selectedLead.status === 'unread' ? 'read' : 'unread' });
                              }}
                              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
                            >
                              {selectedLead.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                            </button>
                            <button 
                              onClick={() => handleDeleteLead(selectedLead.id)}
                              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-600 transition-colors cursor-pointer border border-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
