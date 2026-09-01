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
  AlertCircle
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'leads' | 'site-config' | 'faqs'>('leads');
  
  // States for Core Controls
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [customFAQs, setCustomFAQs] = useState<CustomFAQ[]>([]);
  
  // Modal / Form States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  
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
      setConfig(JSON.parse(storedConfig));
    } else {
      localStorage.setItem('bizflow_site_config', JSON.stringify(DEFAULT_CONFIG));
    }

    const storedFAQs = localStorage.getItem('bizflow_custom_faqs');
    if (storedFAQs) {
      setCustomFAQs(JSON.parse(storedFAQs));
    }

    // Check if already authenticated in this session
    if (sessionStorage.getItem('bizflow_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }

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
    } else {
      setErrorMsg('Ghalat Admin Key! Dobara koshish karein.');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bizflow_admin_auth');
    setPin('');
  };

  const handleResetPIN = () => {
    const newPIN = prompt('Naya Admin PIN/Password darj karein:');
    if (newPIN && newPIN.trim().length >= 4) {
      localStorage.setItem('bizflow_admin_pin', newPIN.trim());
      showToast('Admin PIN kamyabi se tabdeel ho gaya hai!');
    } else if (newPIN) {
      alert('PIN kam se kam 4 characters ka hona chahiye.');
    }
  };

  // Lead actions
  const handleToggleRead = (id: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: (l.status === 'unread' ? 'read' : 'unread') as 'unread' | 'read' } : l);
    setLeads(updated);
    localStorage.setItem('bizflow_leads', JSON.stringify(updated));
    showToast('Inquiry status updated.');
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Kya aap is Inquiry ko delete karna chahte hain?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('bizflow_leads', JSON.stringify(updated));
      setSelectedLead(null);
      showToast('Inquiry successfully deleted.');
    }
  };

  const handleAddTestLead = () => {
    const services = ['tax', 'accounting', 'company-secretarial', 'visa', 'licensing', 'corporate'];
    const names = ['Amir Khan', 'Siti Aminah', 'Rahul Sharma', 'Jessica Tan', 'Michael Scott'];
    const emails = ['amir@domain.com', 'siti@gov.my', 'rahul@india-tech.in', 'jessica@asia.sg', 'michael@dundermifflin.com'];
    
    const randomIdx = Math.floor(Math.random() * names.length);
    const randomService = services[Math.floor(Math.random() * services.length)];
    
    const testLead: Lead = {
      id: 'lead_' + Date.now(),
      fullName: names[randomIdx],
      email: emails[randomIdx],
      companyName: 'Test Enterprises Ltd',
      phoneNumber: '+60 11 ' + Math.floor(1000000 + Math.random() * 9000000),
      service: randomService,
      message: `Hi, we need support with our registered ${randomService} requirements in KL. This is a system generated test lead for verification.`,
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
      ...leads.map(l => [
        l.id,
        `"${l.fullName.replace(/"/g, '""')}"`,
        l.email,
        `"${l.companyName.replace(/"/g, '""')}"`,
        l.phoneNumber,
        l.service,
        `"${l.message.replace(/"/g, '""')}"`,
        l.date,
        l.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bizflow_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported as CSV!');
  };

  // Config actions
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bizflow_site_config', JSON.stringify(config));
    // Trigger custom event to notify other components to live update
    window.dispatchEvent(new Event('bizflow_config_updated'));
    showToast('Site Configuration successfully saved!');
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
    showToast('Custom FAQ added dynamically!');
  };

  const handleDeleteFAQ = (id: string) => {
    const updated = customFAQs.filter(f => f.id !== id);
    setCustomFAQs(updated);
    localStorage.setItem('bizflow_custom_faqs', JSON.stringify(updated));
    showToast('Custom FAQ removed.');
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchSearch = 
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.message.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchStatus = 
      leadStatusFilter === 'all' ? true : l.status === leadStatusFilter;

    return matchSearch && matchStatus;
  });

  const unreadCount = leads.filter(l => l.status === 'unread').length;

  return (
    <div className="fixed inset-0 bg-[#051622]/95 z-[9999] overflow-y-auto font-sans text-slate-100 flex items-center justify-center p-4 md:p-8">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-gold text-navy-dark px-6 py-4 rounded-xl font-black uppercase text-xs tracking-wider shadow-2xl z-[10000] flex items-center gap-3 border border-white"
          >
            <Check size={18} />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0b1e2e] w-full max-w-7xl rounded-[32px] border-4 border-gold/10 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px] max-h-[90vh]">
        
        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="w-full max-w-md mx-auto py-20 px-8 text-center flex flex-col justify-center items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-3xl flex items-center justify-center text-gold mb-8 shadow-xl"
            >
              <Lock size={36} className="animate-pulse" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">BIZFLOW ADMIN PANEL</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">Authorised Access Only</p>
            
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-2">Enter Passkey / Admin PIN</label>
                <input 
                  type="password" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-6 py-5 bg-[#051622] border border-white/10 rounded-2xl text-center font-black tracking-widest text-lg text-gold outline-none focus:border-gold transition-all"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold justify-center bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full h-16 bg-gold text-navy-dark font-black rounded-2xl shadow-xl hover:bg-white transition-all uppercase tracking-[0.2em] text-xs"
              >
                Access Dashboard
              </button>
            </form>
            
            <div className="mt-8 flex flex-col gap-2">
              <p className="text-[10px] text-slate-500 font-bold">Default Pin: <span className="text-gold">admin123</span></p>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                <X size={12} /> Close Panel
              </button>
            </div>
          </div>
        ) : (
          
          /* FULLY AUTHORIZED ADMIN DASHBOARD */
          <>
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full md:w-80 bg-[#051622] border-r border-white/10 p-8 flex flex-col justify-between shrink-0">
              <div className="space-y-10">
                {/* Branding */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold text-[#051622] rounded-2xl flex items-center justify-center font-black text-xl">
                    B
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg tracking-tighter uppercase leading-none">BizFlow</h3>
                    <span className="text-[9px] font-bold tracking-widest text-gold uppercase">Control Panel</span>
                  </div>
                </div>

                {/* Tabs / Menus */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'leads' ? 'bg-gold text-navy-dark shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Inbox size={16} />
                      <span>Leads / Inquiries</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === 'leads' ? 'bg-navy-dark text-gold' : 'bg-gold text-navy-dark'}`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <button 
                    onClick={() => setActiveTab('site-config')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'site-config' ? 'bg-gold text-navy-dark shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Settings size={16} />
                    <span>Site Configuration</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('faqs')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${activeTab === 'faqs' ? 'bg-gold text-navy-dark shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <HelpCircle size={16} />
                    <span>Dynamic FAQs</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Footer Controls */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <button 
                  onClick={handleResetPIN}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
                >
                  Change Admin PIN
                </button>
                
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold text-[10px] uppercase tracking-widest transition-colors"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors"
                  >
                    <X size={14} /> Exit Panel
                  </button>
                </div>
              </div>
            </div>

            {/* DASHBOARD CONTENT BODY */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
              
              {/* LEADS PANEL */}
              {activeTab === 'leads' && (
                <div className="space-y-8">
                  {/* Top Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Site Leads & Inquiries</h2>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Manage contact submissions and client requests</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button 
                        onClick={handleAddTestLead}
                        className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest text-slate-200 transition-all flex items-center gap-2"
                      >
                        <Plus size={14} /> Add Mock Lead
                      </button>
                      <button 
                        onClick={handleExportLeads}
                        className="px-5 py-3.5 bg-gold text-navy-dark rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg"
                      >
                        <Download size={14} /> Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Statistics widgets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#051622] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                        <Inbox size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">{leads.length}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Form Submissions</p>
                      </div>
                    </div>

                    <div className="bg-[#051622] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center text-red-400">
                        <AlertCircle size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">{unreadCount}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">New / Unread Leads</p>
                      </div>
                    </div>

                    <div className="bg-[#051622] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-400">
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">
                          {leads.length > 0 ? `${Math.round(((leads.length - unreadCount) / leads.length) * 100)}%` : '100%'}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Response / Resolution Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#051622] p-4 rounded-2xl border border-white/5">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2">Filter:</span>
                      {['all', 'unread', 'read'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setLeadStatusFilter(status as any)}
                          className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${leadStatusFilter === status ? 'bg-gold text-navy-dark shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Leads Table / List */}
                  <div className="bg-[#051622] rounded-3xl border border-white/5 overflow-hidden">
                    {filteredLeads.length === 0 ? (
                      <div className="p-12 text-center text-slate-500">
                        <Inbox size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">Koi form inquiries nahi mili.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                        {filteredLeads.map((lead) => (
                          <div 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-all ${lead.status === 'unread' ? 'border-l-4 border-gold' : 'border-l-4 border-transparent'}`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <h4 className={`text-sm font-black text-white ${lead.status === 'unread' ? 'text-gold' : 'text-slate-200'}`}>
                                  {lead.fullName}
                                </h4>
                                <span className="px-2.5 py-0.5 bg-white/5 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                  {lead.service}
                                </span>
                              </div>
                              <p className="text-slate-400 text-xs font-medium">
                                {lead.companyName} • {lead.email}
                              </p>
                              <p className="text-[10px] text-slate-500 font-bold">
                                {new Date(lead.date).toLocaleString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => handleToggleRead(lead.id)}
                                title={lead.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
                              >
                                {lead.status === 'unread' ? <Eye size={16} /> : <CheckSquare size={16} />}
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-all"
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

              {/* SITE CONFIG PANEL */}
              {activeTab === 'site-config' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Global Site Configuration</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Control contact numbers, address details, and global company names across the entire website</p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="bg-[#051622] p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">Company Brand Name</label>
                      <input 
                        type="text" 
                        value={config.companyName}
                        onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">Global Tagline (Hero Title)</label>
                      <input 
                        type="text" 
                        value={config.heroTitle}
                        onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={config.phone}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">WhatsApp Direct Link Number</label>
                      <input 
                        type="text" 
                        value={config.whatsapp}
                        onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">Email Address</label>
                      <input 
                        type="email" 
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/60 ml-2">HQ Physical Office Address</label>
                      <textarea 
                        rows={3}
                        value={config.address}
                        onChange={(e) => setConfig({ ...config, address: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all resize-none"
                        required
                      />
                    </div>

                    <div className="md:col-span-2 pt-4 flex justify-end">
                      <button 
                        type="submit" 
                        className="px-8 py-4 bg-gold text-navy-dark font-black rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg"
                      >
                        <Save size={14} /> Save Configuration
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* DYNAMIC FAQS PANEL */}
              {activeTab === 'faqs' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Dynamic FAQ Injection</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Add custom dynamic questions that override or display on top of default service FAQs</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form to add */}
                    <div className="bg-[#051622] p-6 rounded-3xl border border-white/5 h-fit space-y-6">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">Add Custom Question</h3>
                      
                      <form onSubmit={handleAddFAQ} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Target Service Page</label>
                          <select 
                            value={faqForm.service}
                            onChange={(e) => setFaqForm({ ...faqForm, service: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                          >
                            <option value="general">General (About Us)</option>
                            <option value="tax">Tax Compliance</option>
                            <option value="accounting">Accounting & Bookkeeping</option>
                            <option value="company-secretarial">Company Secretarial</option>
                            <option value="visa">Immigration & Visa</option>
                            <option value="licensing">Business Licensing</option>
                            <option value="local-licensing">Local Council Licensing</option>
                            <option value="corporate">Corporate Services</option>
                            <option value="buy-sell">M&A Business</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Question</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Do you provide courier services?"
                            value={faqForm.question}
                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Answer</label>
                          <textarea 
                            rows={4}
                            placeholder="Type the answer here..."
                            value={faqForm.answer}
                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0b1e2e] border border-white/5 rounded-xl text-xs font-medium text-white outline-none focus:border-gold transition-all resize-none"
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-4 bg-gold text-navy-dark font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          <Plus size={14} /> Add FAQ Dynamically
                        </button>
                      </form>
                    </div>

                    {/* FAQ List manager */}
                    <div className="lg:col-span-2 bg-[#051622] p-6 rounded-3xl border border-white/5 space-y-6">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">Active Custom FAQs</h3>
                      
                      {customFAQs.length === 0 ? (
                        <div className="py-12 text-center text-slate-500">
                          <HelpCircle size={40} className="mx-auto mb-3 opacity-20 animate-bounce" />
                          <p className="font-bold uppercase tracking-widest text-xs">Koi custom dynamic FAQs nahi hain.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto pr-2 space-y-4">
                          {customFAQs.map((faq) => (
                            <div key={faq.id} className="pt-4 first:pt-0 flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-gold/10 text-gold rounded text-[8px] font-black uppercase tracking-widest">
                                    {faq.service}
                                  </span>
                                </div>
                                <h4 className="text-xs font-black text-slate-200">{faq.question}</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{faq.answer}</p>
                              </div>

                              <button 
                                onClick={() => handleDeleteFAQ(faq.id)}
                                className="p-2 text-slate-500 hover:text-red-400 bg-white/5 rounded-lg transition-colors shrink-0"
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

              {/* LEADS DETAIL MODAL (IF SELECTED) */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-[#051622]/80 backdrop-blur-sm z-[10001] flex items-center justify-center p-4"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-[#0b1e2e] border-2 border-gold/20 rounded-[32px] w-full max-w-xl p-8 space-y-6 relative"
                    >
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-white"
                      >
                        <X size={20} />
                      </button>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-gold text-navy-dark rounded-lg text-[9px] font-black uppercase tracking-widest">
                            {selectedLead.service}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${selectedLead.status === 'unread' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                            {selectedLead.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-black text-white tracking-tight">{selectedLead.fullName}</h3>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">
                            {selectedLead.companyName}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                          <div className="flex items-center gap-2 text-xs">
                            <Mail size={14} className="text-gold" />
                            <span className="text-slate-300 truncate">{selectedLead.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone size={14} className="text-gold" />
                            <span className="text-slate-300">{selectedLead.phoneNumber}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Message / Inquiry Details:</p>
                          <div className="bg-[#051622] p-5 rounded-2xl border border-white/5 text-xs text-slate-300 leading-relaxed font-medium">
                            {selectedLead.message}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-2">
                          <span className="text-[10px] font-bold text-slate-500">
                            Submitted: {new Date(selectedLead.date).toLocaleString()}
                          </span>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                handleToggleRead(selectedLead.id);
                                setSelectedLead({ ...selectedLead, status: selectedLead.status === 'unread' ? 'read' : 'unread' });
                              }}
                              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-200 transition-colors"
                            >
                              {selectedLead.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                            </button>
                            <button 
                              onClick={() => handleDeleteLead(selectedLead.id)}
                              className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 transition-colors"
                            >
                              Delete Inquiry
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
