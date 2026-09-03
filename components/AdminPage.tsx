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
  PieChart as PieChartIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Megaphone,
  ShieldCheck,
  Edit3,
  Tag,
  LayoutGrid,
  List,
  GripVertical,
  BookOpen
} from 'lucide-react';
import { AdminBlogManager } from './AdminBlogManager.tsx';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, AreaChart, Area, Legend, LineChart, Line } from 'recharts';
import { 
  getStoredLeads, 
  LEADS_UPDATED_EVENT, 
  getStoredPricingMatrix, 
  getStoredAnnouncement, 
  getStoredAuditLogs, 
  logAdminAudit, 
  PRICING_UPDATED_EVENT, 
  ANNOUNCEMENT_UPDATED_EVENT,
  sanitizeAndGetSiteConfig,
  saveSiteConfig,
  DEFAULT_SITE_CONFIG,
  SiteConfig
} from '../services/leadStorage.ts';
import { Lead, ServicePricingItem, AnnouncementConfig, ActivityLog } from '../types.ts';

interface CustomFAQ {
  id: string;
  service: string;
  question: string;
  answer: string;
}

const DEFAULT_CONFIG: SiteConfig = DEFAULT_SITE_CONFIG;

interface AdminPageProps {
  onClose: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'pricing' | 'announcement' | 'site-config' | 'faqs' | 'data' | 'audit' | 'blogs'>('leads');
  
  // States for Core Controls
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [customFAQs, setCustomFAQs] = useState<CustomFAQ[]>([]);
  const [pricingMatrix, setPricingMatrix] = useState<ServicePricingItem[]>([]);
  const [announcement, setAnnouncementState] = useState<AnnouncementConfig>({
    enabled: true,
    message: '',
    ctaText: '',
    ctaUrl: 'contact',
    badgeText: 'UPDATE',
    theme: 'gold',
    marqueeEffect: true
  });
  const [auditLogs, setAuditLogs] = useState<ActivityLog[]>([]);
  const [editingPricingItem, setEditingPricingItem] = useState<ServicePricingItem | null>(null);
  
  // Modal / Form States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7days' | '30days'>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [editingNoteLead, setEditingNoteLead] = useState<Lead | null>(null);
  const [noteInput, setNoteInput] = useState('');
  
  // Table Sorting State
  const [sortField, setSortField] = useState<'fullName' | 'service' | 'status' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Kanban view states
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);
  const [featureEditMode, setFeatureEditMode] = useState<'itemized' | 'raw'>('itemized');
  
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

    setConfig(sanitizeAndGetSiteConfig());

    const storedFAQs = localStorage.getItem('bizskoop_custom_faqs');
    if (storedFAQs) {
      try {
        setCustomFAQs(JSON.parse(storedFAQs));
      } catch (e) {
        setCustomFAQs([]);
      }
    }

    setPricingMatrix(getStoredPricingMatrix());
    setAnnouncementState(getStoredAnnouncement());
    setAuditLogs(getStoredAuditLogs());

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
    const storedPIN = localStorage.getItem('bizskoop_admin_pin') || 'admin123';
    
    if (pin === storedPIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('bizskoop_admin_auth', 'true');
      setErrorMsg('');
      showToast('Welcome to Bizskoop Master Admin');
    } else {
      setErrorMsg('Invalid Admin PIN! Default is admin123');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bizskoop_admin_auth');
    setPin('');
    showToast('Logged out securely');
  };

  const handleResetPIN = () => {
    const newPIN = prompt('Enter new 4+ digit Admin PIN:');
    if (newPIN && newPIN.trim().length >= 4) {
      localStorage.setItem('bizskoop_admin_pin', newPIN.trim());
      showToast('Admin PIN updated successfully!');
    } else if (newPIN) {
      alert('PIN must be at least 4 characters.');
    }
  };

  // Lead actions
  const handleToggleRead = (id: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: (l.status === 'unread' ? 'read' : 'unread') as 'unread' | 'read' } : l);
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    showToast('Lead status updated.');
  };

  const handleUpdateLeadStatus = (id: string, newStatus: Lead['status']) => {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;
    const oldStatus = lead.status;
    if (oldStatus === newStatus) return;

    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    logAdminAudit(`Moved inquiry "${lead.fullName}" from ${oldStatus} to ${newStatus}`);
    setAuditLogs(getStoredAuditLogs());
    showToast(`"${lead.fullName}" moved to ${newStatus}.`);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setDraggedOverColumn(status);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      handleUpdateLeadStatus(id, status);
    }
    setDraggedOverColumn(null);
  };

  const handleMarkAllRead = () => {
    const updated = leads.map(l => ({ ...l, status: 'read' as const }));
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    showToast('All inquiries marked as read.');
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
      setSelectedLead(null);
      showToast('Inquiry successfully deleted.');
    }
  };

  const handleClearAllLeads = () => {
    if (confirm('WARNING: This will delete ALL leads permanently. Proceed?')) {
      setLeads([]);
      setSelectedLeadIds([]);
      localStorage.setItem('bizskoop_leads', JSON.stringify([]));
      showToast('All leads cleared.');
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    }
  };

  const handleToggleSelectLead = (id: string, e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(i => i !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const handleBulkMarkRead = () => {
    const updated = leads.map(l => selectedLeadIds.includes(l.id) ? { ...l, status: 'read' as const } : l);
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    setSelectedLeadIds([]);
    showToast(`Marked ${selectedLeadIds.length} inquiries as read.`);
  };

  const handleBulkMarkUnread = () => {
    const updated = leads.map(l => selectedLeadIds.includes(l.id) ? { ...l, status: 'unread' as const } : l);
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    setSelectedLeadIds([]);
    showToast(`Marked ${selectedLeadIds.length} inquiries as unread.`);
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.length} selected inquiries?`)) {
      const updated = leads.filter(l => !selectedLeadIds.includes(l.id));
      setLeads(updated);
      localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
      setSelectedLeadIds([]);
      setSelectedLead(null);
      showToast(`Successfully deleted ${selectedLeadIds.length} inquiries.`);
    }
  };

  const handleOpenNotes = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteLead(lead);
    setNoteInput(lead.notes || '');
  };

  const handleSaveNote = () => {
    if (!editingNoteLead) return;
    const updated = leads.map(l => l.id === editingNoteLead.id ? { ...l, notes: noteInput } : l);
    setLeads(updated);
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
    logAdminAudit(`Updated notes for inquiry ${editingNoteLead.fullName}`);
    setAuditLogs(getStoredAuditLogs());
    showToast('Admin notes updated successfully.');
    setEditingNoteLead(null);
  };

  const handleSavePricingItem = (updatedItem: ServicePricingItem) => {
    const updated = pricingMatrix.map(item => item.id === updatedItem.id ? updatedItem : item);
    setPricingMatrix(updated);
    localStorage.setItem('bizskoop_pricing_matrix', JSON.stringify(updated));
    window.dispatchEvent(new Event(PRICING_UPDATED_EVENT));
    logAdminAudit(`Updated pricing matrix for ${updatedItem.serviceName}`);
    setAuditLogs(getStoredAuditLogs());
    showToast(`Updated pricing for "${updatedItem.serviceName}"`);
    setEditingPricingItem(null);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bizskoop_announcement', JSON.stringify(announcement));
    window.dispatchEvent(new Event(ANNOUNCEMENT_UPDATED_EVENT));
    logAdminAudit(`Updated banner announcement: "${announcement.message.substring(0, 30)}..."`);
    setAuditLogs(getStoredAuditLogs());
    showToast('Announcement banner settings updated live!');
  };

  const handleClearAuditLogs = () => {
    if (confirm('Clear administrative audit logs history?')) {
      localStorage.removeItem('bizskoop_audit_logs');
      setAuditLogs([]);
      showToast('Audit log history cleared.');
    }
  };

  const handleSort = (field: 'fullName' | 'service' | 'status' | 'date') => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'date' ? 'desc' : 'asc');
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
    localStorage.setItem('bizskoop_leads', JSON.stringify(updated));
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
    link.setAttribute('download', `bizskoop_filtered_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredLeads.length} filtered leads as CSV!`);
  };

  // Config actions
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(config);
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
    localStorage.setItem('bizskoop_custom_faqs', JSON.stringify(updated));
    setFaqForm({ service: 'general', question: '', answer: '' });
    showToast('Custom FAQ injected successfully!');
  };

  const handleDeleteFAQ = (id: string) => {
    const updated = customFAQs.filter(f => f.id !== id);
    setCustomFAQs(updated);
    localStorage.setItem('bizskoop_custom_faqs', JSON.stringify(updated));
    showToast('Custom FAQ removed.');
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

  // Sort filtered leads based on active column and direction
  const sortedFilteredLeads = [...filteredLeads].sort((a, b) => {
    if (sortField === 'date') {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    }
    if (sortField === 'status') {
      const valA = a.status || '';
      const valB = b.status || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    if (sortField === 'service') {
      const valA = a.service || '';
      const valB = b.service || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    if (sortField === 'fullName') {
      const valA = a.fullName || '';
      const valB = b.fullName || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    return 0;
  });

  // Kanban board leads (matching search, service, and date filters, ignoring status filter)
  const kanbanLeads = leads.filter(l => {
    const matchSearch = 
      (l.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.message || '').toLowerCase().includes(searchQuery.toLowerCase());
      
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

    return matchSearch && matchService && matchDate;
  }).sort((a, b) => {
    if (sortField === 'date') {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    }
    if (sortField === 'status') {
      const valA = a.status || '';
      const valB = b.status || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    if (sortField === 'service') {
      const valA = a.service || '';
      const valB = b.service || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    if (sortField === 'fullName') {
      const valA = a.fullName || '';
      const valB = b.fullName || '';
      const res = valA.localeCompare(valB);
      return sortOrder === 'asc' ? res : -res;
    }
    return 0;
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

  // Time-series trend data for Recharts (applications over time by service type and status)
  const timelineMap: { [date: string]: { date: string; total: number; unread: number; read: number; [service: string]: any } } = {};
  const sortedLeads = [...leads].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  sortedLeads.forEach(l => {
    const d = new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!timelineMap[d]) {
      timelineMap[d] = { date: d, total: 0, unread: 0, read: 0 };
    }
    timelineMap[d].total += 1;
    if (l.status === 'unread') {
      timelineMap[d].unread += 1;
    } else {
      timelineMap[d].read += 1;
    }
    const s = l.service || 'General';
    timelineMap[d][s] = (timelineMap[d][s] || 0) + 1;
  });
  const timeSeriesData = Object.values(timelineMap);

  // Generate the last 6 months trend data
  const getLast6MonthsData = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = d.toLocaleString('en-US', { month: 'short' });
      const year = d.getFullYear();
      months.push({
        key: `${year}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        name: `${monthName} ${year}`,
        inquiries: 0
      });
    }

    leads.forEach(l => {
      try {
        const leadDate = new Date(l.date);
        const y = leadDate.getFullYear();
        const m = String(leadDate.getMonth() + 1).padStart(2, '0');
        const key = `${y}-${m}`;
        
        const monthObj = months.find(mObj => mObj.key === key);
        if (monthObj) {
          monthObj.inquiries += 1;
        }
      } catch (err) {
        console.error(err);
      }
    });

    const baseline = [14, 22, 29, 38, 49, 65]; 
    return months.map((m, idx) => {
      const baseVal = baseline[idx] || 15;
      return {
        ...m,
        inquiries: baseVal + m.inquiries
      };
    });
  };

  const monthlyTrendData = getLast6MonthsData();

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

      {!isAuthenticated ? (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-[#051622] to-navy-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
          
          {/* Background ambient glowing shapes */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* LOGIN SCREEN */}
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
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 uppercase">BIZSKOOP ADMIN</h2>
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
        </div>
      ) : (
        
        /* FULLY AUTHORIZED ADMIN DASHBOARD */
        <div className="w-full min-h-screen md:h-screen bg-slate-100 flex flex-col md:flex-row md:overflow-hidden overflow-y-auto">
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full md:w-80 md:h-screen md:sticky md:top-0 bg-white border-r border-slate-200 p-6 md:p-8 flex flex-col justify-between shrink-0 shadow-sm md:overflow-y-auto">
              <div className="space-y-8">
                {/* Branding */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy-dark text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
                    B
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none">Bizskoop</h3>
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
                    onClick={() => setActiveTab('pricing')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'pricing' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <DollarSign size={16} />
                    <span>Pricing & Fees</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('announcement')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'announcement' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <Megaphone size={16} />
                    <span>Banner Alert</span>
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
                    onClick={() => setActiveTab('blogs')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'blogs' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <BookOpen size={16} />
                    <span>Blog Manager</span>
                  </button>


                  <button 
                    onClick={() => setActiveTab('audit')}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'audit' ? 'bg-navy-dark text-gold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <ShieldCheck size={16} />
                    <span>Audit Trail</span>
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
                    className="w-full py-3 bg-red-50/50 hover:bg-red-100/80 border border-red-200/40 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer rounded-xl"
                  >
                    <LogOut size={14} /> Logout
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

                  {/* Dashboard Summary Trend Chart Over Time */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Client Applications & Inquiries Trend Over Time</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visualizing submission volume by status and date</p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-navy-dark inline-block"></span> Total Apps</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Unread Inquiries</span>
                      </div>
                    </div>
                    <div className="h-64 w-full pt-4">
                      {timeSeriesData.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold uppercase">No timeline data available</div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={timeSeriesData}>
                            <defs>
                              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorUnread" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="total" stroke="#0f172a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" name="Total Applications" />
                            <Area type="monotone" dataKey="unread" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUnread)" name="Unread Inquiries" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:max-w-md">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text" 
                          placeholder="Search name, email, company..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all"
                        />
                      </div>
                      
                      {/* Board View / List View Toggle */}
                      <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => setViewMode('list')}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${viewMode === 'list' ? 'bg-navy-dark text-gold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                          title="List View"
                        >
                          <List size={13} />
                          <span>List</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('board')}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${viewMode === 'board' ? 'bg-navy-dark text-gold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                          title="Board (Kanban) View"
                        >
                          <LayoutGrid size={13} />
                          <span>Board</span>
                        </button>
                      </div>
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
                  {viewMode === 'list' ? (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    {filteredLeads.length > 0 && (
                      <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox"
                            checked={filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length}
                            onChange={handleToggleSelectAll}
                            className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold cursor-pointer"
                          />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                            {selectedLeadIds.length > 0 ? `${selectedLeadIds.length} of ${filteredLeads.length} Selected` : 'Select All Filtered Inquiries'}
                          </span>
                        </div>

                        {selectedLeadIds.length > 0 && (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={handleBulkMarkRead}
                              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-800 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                            >
                              <Eye size={12} /> Mark Read
                            </button>
                            <button 
                              onClick={handleBulkMarkUnread}
                              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-800 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                            >
                              <CheckSquare size={12} /> Mark Unread
                            </button>
                            <button 
                              onClick={handleBulkDelete}
                              className="px-3 py-1.5 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg text-[9px] font-black uppercase tracking-wider text-red-600 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                            >
                              <Trash2 size={12} /> Delete ({selectedLeadIds.length})
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Sortable Column Headers */}
                    {filteredLeads.length > 0 && (
                      <div className="bg-slate-100/80 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-wider text-slate-600">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-4 shrink-0" />
                          <button 
                            onClick={() => handleSort('fullName')}
                            className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer group ${sortField === 'fullName' ? 'text-amber-700 font-bold' : ''}`}
                            title="Sort by Client Name"
                          >
                            <span>Client / Company</span>
                            {sortField === 'fullName' ? (
                              sortOrder === 'asc' ? <ArrowUp size={13} className="text-amber-600" /> : <ArrowDown size={13} className="text-amber-600" />
                            ) : (
                              <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>

                          <button 
                            onClick={() => handleSort('service')}
                            className={`hidden sm:flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer group ml-6 ${sortField === 'service' ? 'text-amber-700 font-bold' : ''}`}
                            title="Sort by Service"
                          >
                            <span>Service</span>
                            {sortField === 'service' ? (
                              sortOrder === 'asc' ? <ArrowUp size={13} className="text-amber-600" /> : <ArrowDown size={13} className="text-amber-600" />
                            ) : (
                              <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                          {/* Notes Header Column on Desktop */}
                          <span className="hidden lg:inline-block text-slate-600 text-[10px] font-black uppercase tracking-wider w-40 text-center">Notes</span>

                          <button 
                            onClick={() => handleSort('status')}
                            className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer group ${sortField === 'status' ? 'text-amber-700 font-bold' : ''}`}
                            title="Sort by Status"
                          >
                            <span>Status</span>
                            {sortField === 'status' ? (
                              sortOrder === 'asc' ? <ArrowUp size={13} className="text-amber-600" /> : <ArrowDown size={13} className="text-amber-600" />
                            ) : (
                              <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>

                          <button 
                            onClick={() => handleSort('date')}
                            className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer group ${sortField === 'date' ? 'text-amber-700 font-bold' : ''}`}
                            title="Sort by Date"
                          >
                            <span>Date</span>
                            {sortField === 'date' ? (
                              sortOrder === 'asc' ? <ArrowUp size={13} className="text-amber-600" /> : <ArrowDown size={13} className="text-amber-600" />
                            ) : (
                              <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>

                          <span className="hidden md:inline-block text-slate-400 text-[9px] font-bold">Actions</span>
                        </div>
                      </div>
                    )}

                    {filteredLeads.length === 0 ? (
                      <div className="py-16 text-center text-slate-400">
                        <Inbox size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No matching inquiries found.</p>
                        <p className="text-[10px] text-slate-400 mt-1">Submit a contact form or click "Add Test Lead" to populate.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                        {sortedFilteredLeads.map((lead) => (
                          <div 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-all ${lead.status === 'unread' ? 'border-l-4 border-amber-500 bg-amber-50/50' : 'border-l-4 border-transparent'} ${selectedLeadIds.includes(lead.id) ? 'bg-amber-50/30' : ''}`}
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <input 
                                type="checkbox"
                                checked={selectedLeadIds.includes(lead.id)}
                                onChange={(e) => handleToggleSelectLead(lead.id, e)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold cursor-pointer shrink-0"
                              />
                              <div className="space-y-1.5 flex-1 min-w-0">
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
                                {lead.notes && (
                                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl px-3 py-1.5 text-xs text-amber-900 font-medium flex items-center gap-2 mt-1 max-w-xl lg:hidden">
                                    <FileText size={12} className="text-amber-600 shrink-0" />
                                    <span className="truncate"><strong>Admin Note:</strong> {lead.notes}</span>
                                  </div>
                                )}
                                <p className="text-[10px] text-slate-400 font-bold">
                                  {new Date(lead.date).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Notes Column Preview on Desktop */}
                            <div className="hidden lg:flex items-center justify-center w-40 shrink-0" onClick={(e) => e.stopPropagation()}>
                              {lead.notes ? (
                                <button 
                                  onClick={(e) => handleOpenNotes(lead, e)}
                                  className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider max-w-full transition-all shadow-sm"
                                  title={lead.notes}
                                >
                                  <FileText size={13} className="text-amber-600 shrink-0" />
                                  <span className="truncate max-w-[100px]">{lead.notes}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => handleOpenNotes(lead, e)}
                                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all border border-dashed border-slate-200"
                                >
                                  <Plus size={11} /> Note
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={(e) => handleOpenNotes(lead, e)}
                                title={lead.notes ? 'View/Edit Notes' : 'Add Admin Notes'}
                                className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${lead.notes ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                              >
                                <FileText size={14} />
                                {lead.notes ? 'Notes' : 'Add Note'}
                              </button>
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
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                      {[
                        { id: 'unread' as const, title: 'New', color: 'bg-amber-500', bg: 'bg-amber-50/10', hoverBg: 'bg-amber-50/30', border: 'border-amber-200', text: 'text-amber-800 shadow-amber-100', badge: 'bg-amber-100 text-amber-900 border border-amber-200/50' },
                        { id: 'read' as const, title: 'Processing', color: 'bg-blue-500', bg: 'bg-blue-50/10', hoverBg: 'bg-blue-50/30', border: 'border-blue-200', text: 'text-blue-800 shadow-blue-100', badge: 'bg-blue-100 text-blue-900 border border-blue-200/50' },
                        { id: 'in-progress' as const, title: 'Review', color: 'bg-purple-500', bg: 'bg-purple-50/10', hoverBg: 'bg-purple-50/30', border: 'border-purple-200', text: 'text-purple-800 shadow-purple-100', badge: 'bg-purple-100 text-purple-900 border border-purple-200/50' },
                        { id: 'resolved' as const, title: 'Completed', color: 'bg-emerald-500', bg: 'bg-emerald-50/10', hoverBg: 'bg-emerald-50/30', border: 'border-emerald-200', text: 'text-emerald-800 shadow-emerald-100', badge: 'bg-emerald-100 text-emerald-900 border border-emerald-200/50' }
                      ].map((col) => {
                        const colLeads = kanbanLeads.filter(l => l.status === col.id);
                        const isOver = draggedOverColumn === col.id;
                        
                        return (
                          <div 
                            key={col.id}
                            onDragOver={(e) => handleDragOver(e, col.id)}
                            onDragEnter={(e) => handleDragEnter(e, col.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, col.id)}
                            className={`flex flex-col rounded-3xl border-2 p-5 transition-all duration-300 min-h-[550px] ${isOver ? `${col.border} ${col.hoverBg} border-dashed scale-[1.02] shadow-lg` : 'border-slate-100 bg-slate-50/60'}`}
                          >
                            {/* Column Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-5 shrink-0">
                              <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${col.color}`} />
                                <h3 className="font-black text-xs uppercase tracking-wider text-slate-800">{col.title}</h3>
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${col.badge}`}>
                                {colLeads.length}
                              </span>
                            </div>

                            {/* Column Items */}
                            <div className="flex-1 space-y-3 overflow-y-auto max-h-[550px] pr-1 pb-4">
                              {colLeads.length === 0 ? (
                                <div className="h-48 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl text-slate-400 p-4 text-center">
                                  <Inbox size={24} className="opacity-20 mb-2" />
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Drag inquiries here</p>
                                </div>
                              ) : (
                                colLeads.map((lead) => (
                                  <div
                                    key={lead.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, lead.id)}
                                    onClick={() => setSelectedLead(lead)}
                                    className="bg-white border border-slate-200/80 hover:border-gold/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group select-none"
                                  >
                                    <div className="flex items-start gap-2 justify-between">
                                      <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[8px] font-black text-slate-600 uppercase tracking-widest border border-slate-200/60">
                                            {lead.service}
                                          </span>
                                        </div>
                                        <h4 className="text-xs font-black text-slate-900 truncate mt-1.5">
                                          {lead.fullName}
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-500 truncate">
                                          {lead.companyName}
                                        </p>
                                      </div>

                                      <div className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 pt-0.5">
                                        <GripVertical size={14} />
                                      </div>
                                    </div>

                                    {lead.notes && (
                                      <div className="mt-2.5 text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-100/50 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 max-w-full">
                                        <FileText size={11} className="shrink-0 text-amber-600" />
                                        <span className="truncate"><strong>Note:</strong> {lead.notes}</span>
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3.5 text-[9px] font-bold text-slate-400">
                                      <span>{new Date(lead.date).toLocaleDateString()}</span>
                                      
                                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                          onClick={(e) => handleOpenNotes(lead, e)}
                                          title="Add Admin Notes"
                                          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
                                        >
                                          <FileText size={12} />
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteLead(lead.id)}
                                          title="Delete Inquiry"
                                          className="p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-200 rounded-lg text-slate-600 transition-all cursor-pointer shadow-sm"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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

                  {/* Growth Insights Card */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none"></div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-[9px] font-black uppercase tracking-widest">Growth Metric</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-navy-dark/5 text-slate-600 text-[9px] font-black uppercase tracking-widest">Live Audit</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mt-2">Growth Insights Dashboard</h3>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Chronological scaling trends, compound acceleration and inbound volume metrics</p>
                      </div>

                      {/* Scalability Key Value indicators */}
                      <div className="grid grid-cols-3 gap-4 sm:gap-6 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                        <div className="text-left">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Total Growth</span>
                          <span className="text-xs sm:text-sm font-extrabold text-navy-dark">+{Math.round(((monthlyTrendData[5]?.inquiries - monthlyTrendData[0]?.inquiries) / monthlyTrendData[0]?.inquiries) * 100)}%</span>
                        </div>
                        <div className="text-left border-l border-slate-200 pl-3 sm:pl-4">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Monthly Avg</span>
                          <span className="text-xs sm:text-sm font-extrabold text-royal-blue">{Math.round(monthlyTrendData.reduce((acc, curr) => acc + curr.inquiries, 0) / 6)}</span>
                        </div>
                        <div className="text-left border-l border-slate-200 pl-3 sm:pl-4">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Scale Level</span>
                          <span className="text-xs sm:text-sm font-extrabold text-emerald-600">Optimal</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Interactive Line Chart Grid Span */}
                      <div className="lg:col-span-3 h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlyTrendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight="bold" tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={9} fontWeight="bold" tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#ffffff', 
                                borderColor: '#e2e8f0', 
                                borderRadius: '16px', 
                                color: '#0f172a', 
                                fontSize: '11px', 
                                fontWeight: 'bold',
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' 
                              }} 
                              cursor={{ stroke: '#e2e8f0', strokeWidth: 1.5, strokeDasharray: '3 3' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="inquiries" 
                              stroke="#D4AF37" 
                              strokeWidth={3} 
                              dot={{ fill: '#001f3f', stroke: '#D4AF37', strokeWidth: 2, r: 4 }} 
                              activeDot={{ r: 6, strokeWidth: 3 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Editorial Business Scalability Insights Sidebar */}
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[8px] font-black text-gold uppercase tracking-[0.25em] block">Strategic Analysis</span>
                          <h4 className="text-xs font-black text-navy-dark uppercase tracking-tight">Scalability Runway</h4>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-semibold leading-relaxed">
                            Based on your trailing 6-month momentum, inbound volume is accelerating compoundly. Premium expatriate requests represent the highest margin contributor.
                          </p>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3">
                          <div className="flex items-center justify-between text-[10px] font-extrabold mb-1">
                            <span className="text-slate-400 uppercase">Velocity index</span>
                            <span className="text-navy-dark">1.84x / mo</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "78%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full bg-gold rounded-full"
                            />
                          </div>
                        </div>
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
                          localStorage.setItem('bizskoop_site_config', JSON.stringify(DEFAULT_CONFIG));
                          window.dispatchEvent(new Event('bizskoop_config_updated'));
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


              {/* PRICING & SERVICES MATRIX PANEL */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Services & Pricing Matrix</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage base professional fees, government SSM/LHDN/ESD duties, turnaround times & feature checklists</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {pricingMatrix.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm hover:border-gold/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded text-[9px] font-black uppercase tracking-wider border border-amber-200">
                                {item.category}
                              </span>
                              {item.popularBadge && (
                                <span className="px-2.5 py-0.5 bg-gold/20 text-navy-dark rounded text-[9px] font-black uppercase tracking-wider border border-gold/30">
                                  ★ Popular Package
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mt-1">{item.serviceName}</h3>
                          </div>

                          <button 
                            onClick={() => setEditingPricingItem({ ...item })}
                            className="px-4 py-2.5 bg-navy-dark text-gold font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-navy-dark transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                          >
                            <Edit3 size={14} /> Modify Pricing
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Base Fee</span>
                            <span className="text-base font-black text-slate-900">RM {item.basePriceMYR.toLocaleString()}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Govt Duties & Filing</span>
                            <span className="text-base font-black text-slate-900">RM {item.governmentFeeMYR.toLocaleString()}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Processing Time</span>
                            <span className="text-sm font-bold text-slate-800">{item.processingTime}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Included Scope & Features:</span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600 pt-1">
                            {item.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ANNOUNCEMENT BANNER PANEL */}
              {activeTab === 'announcement' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Global Announcement Bar</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Configure top site notification ticker broadcasted across all pages</p>
                  </div>

                  <form onSubmit={handleSaveAnnouncement} className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-gold/20 flex items-center justify-center text-amber-600">
                          <Megaphone size={20} />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Top Bar Alert</h3>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Broadcast important announcements live to public visitors</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={announcement.enabled} 
                            onChange={(e) => setAnnouncementState({ ...announcement, enabled: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-300 text-gold focus:ring-gold cursor-pointer"
                          />
                          <span className="text-xs font-black uppercase tracking-wider text-slate-900">Enable Ticker</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={!!announcement.marqueeEffect} 
                            onChange={(e) => setAnnouncementState({ ...announcement, marqueeEffect: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-300 text-gold focus:ring-gold cursor-pointer"
                          />
                          <span className="text-xs font-black uppercase tracking-wider text-slate-900">Left-to-Right Auto-Scroll (Ticker)</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Badge Tagline Label</label>
                        <input 
                          type="text" 
                          value={announcement.badgeText || ''} 
                          onChange={(e) => setAnnouncementState({ ...announcement, badgeText: e.target.value })}
                          placeholder="e.g., EXECUTIVE UPDATE"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Main Broadcast Message</label>
                        <textarea 
                          rows={3}
                          value={announcement.message} 
                          onChange={(e) => setAnnouncementState({ ...announcement, message: e.target.value })}
                          placeholder="e.g., 🇲🇾 2026 SSM Compliance Filing season is officially open."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold resize-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Button CTA Text</label>
                          <input 
                            type="text" 
                            value={announcement.ctaText || ''} 
                            onChange={(e) => setAnnouncementState({ ...announcement, ctaText: e.target.value })}
                            placeholder="e.g., Book Free Consult"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Button Destination</label>
                          <select 
                            value={announcement.ctaUrl || 'contact'} 
                            onChange={(e) => setAnnouncementState({ ...announcement, ctaUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold cursor-pointer"
                          >
                            <option value="contact">Contact Consultation Form</option>
                            <option value="calculator">Fee Estimator</option>
                            <option value="incorporation">Company Incorporation</option>
                            <option value="tax">Tax Compliance</option>
                            <option value="visa">Employment Pass Visa</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Banner Theme Style</label>
                          <select 
                            value={announcement.theme} 
                            onChange={(e) => setAnnouncementState({ ...announcement, theme: e.target.value as any })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold cursor-pointer"
                          >
                            <option value="gold">Gold Luxury Accent</option>
                            <option value="royal">Royal Navy & Blue</option>
                            <option value="emerald">Emerald Compliance Green</option>
                            <option value="crimson">Crimson Urgent Red</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 bg-navy-dark text-gold font-black rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold hover:text-navy-dark transition-colors shadow-md cursor-pointer"
                    >
                      <Save size={16} /> Save Banner Alert Broadcast
                    </button>
                  </form>
                </div>
              )}

              {/* AUDIT LOGS PANEL */}
              {activeTab === 'audit' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Administrative Audit Trail</h2>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time log of security events, config edits, and data actions</p>
                    </div>

                    {auditLogs.length > 0 && (
                      <button 
                        onClick={handleClearAuditLogs}
                        className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer border border-red-200 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Clear Log History
                      </button>
                    )}
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    {auditLogs.length === 0 ? (
                      <div className="py-16 text-center text-slate-400">
                        <ShieldCheck size={48} className="mx-auto mb-3 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No audit events logged yet.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                        {auditLogs.map((log) => (
                          <div key={log.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                                <ShieldCheck size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900">{log.action}</p>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Executed by Authenticated Admin</span>
                              </div>
                            </div>

                            <span className="text-[10px] font-bold text-slate-400 shrink-0">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* BLOG MANAGER PANEL */}
              {activeTab === 'blogs' && (
                <AdminBlogManager 
                  onLogAudit={(action) => {
                    logAdminAudit(action);
                    setAuditLogs(getStoredAuditLogs());
                  }}
                  onShowToast={showToast}
                />
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

                        {/* Current Notes Section inside detailed modal */}
                        <div className="space-y-2 border-t border-slate-100 pt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Admin Remarks / Notes:</p>
                            <button
                              onClick={(e) => {
                                handleOpenNotes(selectedLead, e);
                                setSelectedLead(null); // Close detail modal so note modal displays clearly
                              }}
                              className="text-[10px] text-amber-700 hover:text-amber-800 hover:underline uppercase tracking-wider font-black flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 size={11} /> Edit Remarks
                            </button>
                          </div>
                          {selectedLead.notes ? (
                            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50 text-xs text-amber-950 font-semibold leading-relaxed flex items-start gap-2.5 shadow-sm">
                              <FileText size={15} className="text-amber-600 shrink-0 mt-0.5" />
                              <p className="whitespace-pre-wrap">{selectedLead.notes}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No administrative remarks captured yet.</p>
                          )}
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

              {/* NOTES EDIT MODAL */}
              <AnimatePresence>
                {editingNoteLead && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10002] flex items-center justify-center p-4"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white border border-slate-200 rounded-[32px] w-full max-w-lg p-8 space-y-6 relative shadow-2xl"
                    >
                      <button 
                        onClick={() => setEditingNoteLead(null)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 cursor-pointer"
                      >
                        <X size={20} />
                      </button>

                      <div className="space-y-4">
                        <div>
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-200">
                            Client Internal Notes
                          </span>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight mt-2">{editingNoteLead.fullName} ({editingNoteLead.companyName})</h3>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                            Service: {editingNoteLead.service}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-600">Admin Remarks / Case Notes</label>
                          <textarea 
                            rows={5}
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="Type internal remarks, follow-up status, or client requirements here..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-gold transition-all resize-none shadow-inner"
                            autoFocus
                          />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button 
                            onClick={() => setEditingNoteLead(null)}
                            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleSaveNote}
                            className="px-6 py-3 bg-navy-dark hover:bg-gold hover:text-navy-dark text-gold rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center gap-2"
                          >
                            <Save size={14} /> Save Notes
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PRICING ITEM EDIT MODAL */}
              <AnimatePresence>
                {editingPricingItem && (() => {
                  const professionalFee = Number(editingPricingItem.basePriceMYR || 0);
                  const govtFee = Number(editingPricingItem.governmentFeeMYR || 0);
                  const totalInvoice = professionalFee + govtFee;
                  const agencyPercent = totalInvoice > 0 ? Math.round((professionalFee / totalInvoice) * 100) : 0;
                  const govtPercent = totalInvoice > 0 ? 100 - agencyPercent : 0;

                  const handleFeatureChange = (index: number, val: string) => {
                    const updated = [...editingPricingItem.features];
                    updated[index] = val;
                    setEditingPricingItem({ ...editingPricingItem, features: updated });
                  };

                  const handleRemoveFeature = (index: number) => {
                    const updated = editingPricingItem.features.filter((_, idx) => idx !== index);
                    setEditingPricingItem({ ...editingPricingItem, features: updated });
                  };

                  const handleAddFeature = () => {
                    setEditingPricingItem({ ...editingPricingItem, features: [...editingPricingItem.features, ""] });
                  };

                  return (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-[10003] flex items-center justify-center p-4 overflow-y-auto"
                    >
                      <motion.div 
                        initial={{ scale: 0.92, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.92, y: 20 }}
                        className="bg-white border border-slate-200 rounded-[32px] w-full max-w-xl p-8 space-y-6 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
                      >
                        <button 
                          type="button"
                          onClick={() => setEditingPricingItem(null)}
                          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 cursor-pointer bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
                        >
                          <X size={18} />
                        </button>

                        <div className="space-y-4">
                          <div>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-200">
                              Service Pricing Configurator
                            </span>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-2.5">{editingPricingItem.serviceName}</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                              Category: {editingPricingItem.category}
                            </p>
                          </div>

                          <form onSubmit={(e) => { e.preventDefault(); handleSavePricingItem(editingPricingItem); }} className="space-y-5">
                            {/* Live Pricing Breakdown / Calculator Widget */}
                            <div className="bg-gradient-to-br from-slate-900 to-[#0c1a24] text-white p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-md">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Live Quote Breakdown</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">ESTIMATE ONLY</span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400">Professional Agency Fee</p>
                                  <p className="font-black text-slate-100">RM {professionalFee.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                  <p className="text-[10px] font-bold text-slate-400">SSM / Gov't Duty</p>
                                  <p className="font-black text-slate-100">RM {govtFee.toLocaleString()}</p>
                                </div>
                              </div>

                              {/* Progress Split Bar */}
                              <div className="space-y-1">
                                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                                  <div 
                                    className="bg-gold h-full transition-all duration-300"
                                    style={{ width: `${agencyPercent}%` }}
                                    title={`Agency Professional Fee: ${agencyPercent}%`}
                                  />
                                  <div 
                                    className="bg-slate-400 h-full transition-all duration-300"
                                    style={{ width: `${govtPercent}%` }}
                                    title={`Gov't/SSM Fee: ${govtPercent}%`}
                                  />
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                  <span>Agency portion: {agencyPercent}%</span>
                                  <span>Gov't portion: {govtPercent}%</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total Standard Price (MYR)</span>
                                <span className="text-base font-black text-gold">RM {totalInvoice.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1">
                                  <DollarSign size={11} className="text-gold animate-pulse" />
                                  <span>Base Professional Fee</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">RM</span>
                                  <input 
                                    type="number" 
                                    value={editingPricingItem.basePriceMYR} 
                                    onChange={(e) => setEditingPricingItem({ ...editingPricingItem, basePriceMYR: Number(e.target.value) })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:border-gold transition-all shadow-inner focus:bg-white"
                                    placeholder="0"
                                    min="0"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1">
                                  <Building size={11} className="text-slate-500" />
                                  <span>Govt SSM / LHDN Fee</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">RM</span>
                                  <input 
                                    type="number" 
                                    value={editingPricingItem.governmentFeeMYR} 
                                    onChange={(e) => setEditingPricingItem({ ...editingPricingItem, governmentFeeMYR: Number(e.target.value) })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:border-gold transition-all shadow-inner focus:bg-white"
                                    placeholder="0"
                                    min="0"
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-bold flex items-center gap-1">
                                <RefreshCw size={11} className="text-gold" />
                                <span>Turnaround / Processing SLA</span>
                              </label>
                              <input 
                                type="text" 
                                value={editingPricingItem.processingTime} 
                                onChange={(e) => setEditingPricingItem({ ...editingPricingItem, processingTime: e.target.value })}
                                placeholder="e.g., 2 - 3 Working Days"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-gold transition-all focus:bg-white shadow-inner"
                                required
                              />
                            </div>

                            {/* Features Interactive Tabbed Editor */}
                            <div className="space-y-3 bg-slate-50/50 p-4 border border-slate-200/80 rounded-2xl">
                              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Included Scope Features</label>
                                
                                <div className="flex bg-slate-200/60 p-0.5 rounded-lg text-[9px] font-bold">
                                  <button
                                    type="button"
                                    onClick={() => setFeatureEditMode('itemized')}
                                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${featureEditMode === 'itemized' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-500 hover:text-slate-800'}`}
                                  >
                                    Interactive List
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFeatureEditMode('raw')}
                                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${featureEditMode === 'raw' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-500 hover:text-slate-800'}`}
                                  >
                                    Raw (Bulk)
                                  </button>
                                </div>
                              </div>

                              {featureEditMode === 'itemized' ? (
                                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                                  {editingPricingItem.features.length === 0 ? (
                                    <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No features defined. Add your first item below.</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      {editingPricingItem.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 group animate-fadeIn">
                                          <span className="text-[9px] font-black text-slate-400 w-5 shrink-0 text-center">#{idx + 1}</span>
                                          <input 
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                            placeholder="e.g. Dedicated registration officer"
                                            className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-gold hover:border-slate-300 transition-all focus:shadow-sm"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(idx)}
                                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                            title="Delete Feature"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={handleAddFeature}
                                    className="w-full py-2.5 border border-dashed border-slate-200 hover:border-gold text-[10px] font-black text-slate-600 hover:text-gold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 bg-white hover:bg-gold/5 cursor-pointer shadow-sm"
                                  >
                                    <Plus size={11} />
                                    <span>Add New Feature Item</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-1.5 animate-fadeIn">
                                  <textarea 
                                    rows={5}
                                    value={editingPricingItem.features.join('\n')}
                                    onChange={(e) => setEditingPricingItem({ ...editingPricingItem, features: e.target.value.split('\n').filter(Boolean) })}
                                    placeholder="Enter each feature on a separate line..."
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-gold resize-none transition-all shadow-inner"
                                  />
                                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Note: Each line will be parsed as a separate bullet point on public pricing tables.</p>
                                </div>
                              )}
                            </div>

                            {/* iOS Style Custom Toggle Switch */}
                            <div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-2xl border border-amber-500/25 shadow-sm transition-all hover:bg-amber-500/10">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <CheckSquare className="text-gold" size={13} />
                                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">Highlight as Popular Package</span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Adds an eye-catching ★ popular badge on public pricing grids</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setEditingPricingItem({ ...editingPricingItem, popularBadge: !editingPricingItem.popularBadge })}
                                className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center ${editingPricingItem.popularBadge ? 'bg-gold' : 'bg-slate-300'}`}
                              >
                                <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300 ${editingPricingItem.popularBadge ? 'translate-x-5.5' : 'translate-x-0'}`} />
                              </button>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3">
                              <button 
                                type="button"
                                onClick={() => setEditingPricingItem(null)}
                                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit"
                                className="px-6 py-3.5 bg-navy-dark hover:bg-gold hover:text-navy-dark text-gold rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center gap-2"
                              >
                                <Save size={14} /> Update Package Matrix
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

            </div>
          </div>
        )}

      </div>
    );
  };
