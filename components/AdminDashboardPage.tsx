import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SiteConfig, Lead, ActivityLog } from '../types'; 
import { 
  Lock, 
  Inbox, 
  LogOut, 
  AlertCircle, 
  Eye, 
  TrendingUp,
  Download,
  History
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type AdminTab = 'leads' | 'site-config' | 'header' | 'hero' | 'about' | 'services' | 'visa-tools' | 'footer' | 'activity-log';

const AdminDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    global: { 
      companyName: 'BIZSKOOP', 
      phone: '+60 11-2424 4993', 
      email: 'bizskoop@gmail.com', 
      address: 'Level 09, Integra Tower, The Intermark 50400 Kuala Lumpur', 
      social: { 
        linkedin: 'https://www.linkedin.com/company/bizskoopofficial?originalSubdomain=my', 
        whatsapp: '+601124244993', 
        facebook: 'https://www.facebook.com/bizskoopofficial', 
        instagram: 'https://www.instagram.com/bizskoopofficial/', 
        twitter: '',
        tiktok: 'https://www.tiktok.com/@bizskoopofficial'
      } 
    },
    header: { logoText: 'BIZSKOOP', navItems: ['Home', 'Services', 'About', 'Contact'] },
    hero: { title: 'Empowering Your Business', subtitle: '', primaryCta: 'Get Started', secondaryCta: 'Learn More', stats: [{ label: 'Years Experience', value: '15+' }, { label: 'Success Rate', value: '99%' }] },
    about: { narrative: '', teamOverview: '' },
    footer: { copyright: 'All Copyright & Reserved ©2026 Bizskoop.', links: [] },
    legal: { privacyPolicy: '', terms: '', refundPolicy: '', compliance: '' }
  });

  const navItems: { id: AdminTab, label: string }[] = [
    { id: 'leads', label: 'Leads & Summary' },
    { id: 'site-config', label: 'Global Settings' },
    { id: 'header', label: 'Header & Nav' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Narrative' },
    { id: 'services', label: 'Services Manager' },
    { id: 'visa-tools', label: 'Visa Tools' },
    { id: 'footer', label: 'Footer & Legal' },
    { id: 'activity-log', label: 'Activity Log' },
  ];

  useEffect(() => {
    const storedLeads = localStorage.getItem('bizskoop_leads');
    if (storedLeads) setLeads(JSON.parse(storedLeads));
    
    const storedConfig = localStorage.getItem('bizskoop_site_config');
    if (storedConfig) setSiteConfig(JSON.parse(storedConfig));
    
    const storedLogs = localStorage.getItem('bizskoop_logs');
    if (storedLogs) setLogs(JSON.parse(storedLogs));
  }, []);

  const addLog = (action: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date().toLocaleString()
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('bizskoop_logs', JSON.stringify(updatedLogs));
  };

  const saveConfig = () => {
    localStorage.setItem('bizskoop_site_config', JSON.stringify(siteConfig));
    window.dispatchEvent(new Event('bizskoop_config_updated'));
    addLog('Updated Site Configuration');
    alert('Settings saved!');
  };

  const resetConfig = () => {
    localStorage.removeItem('bizskoop_site_config');
    addLog('Reset Site Configuration');
    window.dispatchEvent(new Event('bizskoop_config_updated'));
    window.location.reload();
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Service', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [l.fullName || '', l.email || '', l.companyName || '', l.phoneNumber || '', l.service || '', l.date || ''].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_export.csv';
    a.click();
  };

  const getTrendData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      const count = leads.filter(l => new Date(l.date).toLocaleDateString() === dateStr).length;
      data.push({ name: date.toLocaleDateString('en-US', { weekday: 'short' }), count });
    }
    return data;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid username or password!');
      setUsername('');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div key="login" className="min-h-screen bg-[#051622] flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1614849963640-9274b8d23423?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#051622]/80 backdrop-blur-sm"></div>
        <div className="relative z-10 bg-[#0b1e2e]/60 backdrop-blur-xl w-full max-w-sm p-12 rounded-[48px] border border-white/10 shadow-2xl">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-royal-blue to-blue-700 rounded-full flex items-center justify-center shadow-lg mb-10 transform hover:scale-105 transition-transform duration-500 border-4 border-[#0b1e2e]">
            <span className="text-white font-black text-5xl">B</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 text-center">Admin Login</h2>
          <p className="text-slate-400 text-center text-xs font-bold uppercase tracking-widest mb-10">Access Bizskoop Control Panel</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-6 py-4 bg-[#051622]/50 border border-white/10 rounded-full text-white placeholder:text-slate-600 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 bg-[#051622]/50 border border-white/10 rounded-full text-white placeholder:text-slate-600 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
            {errorMsg && <p className="text-red-400 text-xs font-bold text-center animate-pulse">{errorMsg}</p>}
            <button type="submit" className="w-full py-4 bg-gold text-navy-dark font-black rounded-full hover:bg-white hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 uppercase tracking-widest text-xs">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = leads.filter(l => l.status === 'unread').length;

  return (
    <div key="dashboard" className="min-h-screen bg-[#051622] text-slate-100 flex">
      <div className="w-80 bg-[#0a1f30] border-r border-white/10 p-8 flex flex-col justify-between shadow-2xl">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">BIZSKOOP ADMIN</h1>
            </div>
             <div className="space-y-2">
                {navItems.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)} 
                    className={`w-full p-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === item.id ? 'bg-gold text-navy-dark shadow-lg shadow-gold/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
         </div>
         <button onClick={() => window.location.href = '/'} className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-red-400 transition-colors"><LogOut size={14}/> Exit Admin</button>
      </div>

      <div className="flex-1 p-10 bg-[#051622] overflow-y-auto">
         <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{navItems.find(i => i.id === activeTab)?.label}</h2>
            {activeTab === 'leads' && (
              <button onClick={exportCSV} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all">
                <Download size={14} /> Export CSV
              </button>
            )}
         </div>
         
         {/* Dynamic Content Views */}
         <div className="min-h-[500px]">
           {activeTab === 'leads' && (
             <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-gradient-to-br from-[#0b1e2e] to-[#0a1f30] p-8 rounded-[32px] border border-white/5 shadow-2xl">
                   <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2"><Inbox size={14} className="text-gold" /> Total Inquiries</p>
                   <p className="text-6xl font-black text-white mt-4 tracking-tighter">{leads.length}</p>
                 </div>
                 <div className="bg-gradient-to-br from-[#0b1e2e] to-[#0a1f30] p-8 rounded-[32px] border border-white/5 shadow-2xl">
                   <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2"><AlertCircle size={14} className="text-gold" /> Unread Leads</p>
                   <p className="text-6xl font-black text-white mt-4 tracking-tighter">{leads.filter(l => l.status === 'unread').length}</p>
                 </div>
                 <div className="bg-gradient-to-br from-[#0b1e2e] to-[#0a1f30] p-8 rounded-[32px] border border-white/5 shadow-2xl">
                   <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2"><TrendingUp size={14} className="text-gold" /> Trend (7 Days)</p>
                   <div className="h-16 mt-2">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={getTrendData()}>
                         <Area type="monotone" dataKey="count" stroke="#FFD700" fill="#FFD700" fillOpacity={0.1} />
                       </AreaChart>
                     </ResponsiveContainer>
                   </div>
                 </div>
               </div>
               
               <div className="bg-[#0b1e2e] p-10 rounded-[32px] border border-white/5 shadow-2xl">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Recent Inquiries</h3>
                  <div className="space-y-4">
                    {leads.slice(0, 5).map(lead => (
                      <div key={lead.id} className="flex justify-between items-center p-6 bg-[#051622] rounded-2xl border border-white/5 hover:border-gold/30 transition-all shadow-inner">
                        <div>
                          <p className="text-sm font-black text-white tracking-wide">{lead.fullName}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{lead.companyName}</p>
                        </div>
                        <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">{lead.service}</span>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
           )}
           
           {activeTab === 'site-config' && (
             <div className="bg-[#0b1e2e] p-10 rounded-[32px] border border-white/5 shadow-2xl">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Site Configuration</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                      <input type="text" value={siteConfig.global.companyName} onChange={e => setSiteConfig({...siteConfig, global: {...siteConfig.global, companyName: e.target.value}})} className="w-full px-6 py-4 bg-[#051622] border border-white/5 rounded-2xl text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Phone</label>
                      <input type="text" value={siteConfig.global.phone} onChange={e => setSiteConfig({...siteConfig, global: {...siteConfig.global, phone: e.target.value}})} className="w-full px-6 py-4 bg-[#051622] border border-white/5 rounded-2xl text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                      <input type="text" value={siteConfig.global.email} onChange={e => setSiteConfig({...siteConfig, global: {...siteConfig.global, email: e.target.value}})} className="w-full px-6 py-4 bg-[#051622] border border-white/5 rounded-2xl text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Address</label>
                      <input type="text" value={siteConfig.global.address} onChange={e => setSiteConfig({...siteConfig, global: {...siteConfig.global, address: e.target.value}})} className="w-full px-6 py-4 bg-[#051622] border border-white/5 rounded-2xl text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <h4 className="text-sm font-black text-white uppercase mb-4">Hero Section</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Hero Title</label>
                        <input type="text" value={siteConfig.hero.title} onChange={e => setSiteConfig({...siteConfig, hero: {...siteConfig.hero, title: e.target.value}})} className="w-full px-6 py-4 bg-[#051622] border border-white/5 rounded-2xl text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={saveConfig} className="px-8 py-4 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs">Save Changes</button>
                    <button onClick={resetConfig} className="px-8 py-4 bg-white/5 text-white font-black rounded-2xl hover:bg-red-500/20 transition-all uppercase tracking-widest text-xs">Reset Default</button>
                  </div>
               </div>
             </div>
           )}
           
           {activeTab === 'activity-log' && (
             <div className="bg-[#0b1e2e] p-10 rounded-[32px] border border-white/5 shadow-2xl">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">System Activity Log</h3>
               <div className="space-y-4">
                 {logs.length === 0 && <p className="text-slate-500">No recent activity.</p>}
                 {logs.map(log => (
                   <div key={log.id} className="flex justify-between items-center p-6 bg-[#051622] rounded-2xl border border-white/5 hover:border-gold/30 transition-all shadow-inner">
                     <p className="text-sm text-white font-medium">{log.action}</p>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{log.timestamp}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}
           
           {/* Placeholder for other tabs */}
           {!['leads', 'site-config', 'activity-log'].includes(activeTab) && (
             <div className="bg-[#0b1e2e] p-10 rounded-[32px] border border-white/5 shadow-2xl">
                <p className="text-slate-400">The {navItems.find(i => i.id === activeTab)?.label} section is under construction.</p>
             </div>
           )}
         </div>
       </div>
    </div>
  );
};

export default AdminDashboardPage;
