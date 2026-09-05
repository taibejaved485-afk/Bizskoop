import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  HardDrive, 
  FileText, 
  ShieldAlert, 
  Sparkles,
  Inbox,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { logAdminAudit } from '../services/leadStorage.ts';

export const AdminDataManager: React.FC = () => {
  const [storageStats, setStorageStats] = useState({
    totalBytes: 0,
    leadsCount: 0,
    blogsCount: 0,
    faqsCount: 0,
    quotesCount: 0,
    pricingCount: 0
  });
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  const calculateStats = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }

    const leads = JSON.parse(localStorage.getItem('bizskoop_leads') || '[]');
    const blogs = JSON.parse(localStorage.getItem('bizskoop_custom_blogs') || '[]');
    const faqs = JSON.parse(localStorage.getItem('bizskoop_custom_faqs') || '[]');
    const quotes = JSON.parse(localStorage.getItem('bizskoop_quotations') || '[]');
    const pricing = JSON.parse(localStorage.getItem('bizskoop_pricing_matrix') || '[]');

    setStorageStats({
      totalBytes: total,
      leadsCount: leads.length,
      blogsCount: blogs.length,
      faqsCount: faqs.length,
      quotesCount: quotes.length,
      pricingCount: pricing.length
    });
  };

  useEffect(() => {
    calculateStats();
  }, []);

  const handleExportCompleteJSON = () => {
    const backupData: Record<string, any> = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      system: 'Bizskoop Advisory Administrative Suite',
      data: {}
    };

    const keysToBackup = [
      'bizskoop_leads',
      'bizskoop_custom_blogs',
      'bizskoop_site_config',
      'bizskoop_custom_faqs',
      'bizskoop_pricing_matrix',
      'bizskoop_announcement',
      'bizskoop_quotations',
      'bizskoop_audit_logs'
    ];

    keysToBackup.forEach(key => {
      const val = localStorage.getItem(key);
      if (val) {
        try {
          backupData.data[key] = JSON.parse(val);
        } catch {
          backupData.data[key] = val;
        }
      }
    });

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bizskoop-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    logAdminAudit('Exported complete system JSON backup archive');
    alert('System backup archive downloaded successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed.data) {
          alert('Invalid backup file format. Missing root data property.');
          return;
        }

        if (confirm('Are you sure you want to restore this backup? Existing local data will be replaced.')) {
          Object.keys(parsed.data).forEach(key => {
            const val = parsed.data[key];
            if (typeof val === 'object') {
              localStorage.setItem(key, JSON.stringify(val));
            } else {
              localStorage.setItem(key, String(val));
            }
          });

          // Dispatch sync events
          window.dispatchEvent(new Event('leads_updated'));
          window.dispatchEvent(new Event('pricing_updated'));
          window.dispatchEvent(new Event('announcement_updated'));

          logAdminAudit(`Restored full system database from backup file: ${file.name}`);
          setRestoreStatus(`Successfully restored from ${file.name}! Reloading data...`);
          calculateStats();
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        }
      } catch (err) {
        alert('Failed to parse JSON backup file. Please ensure it is a valid backup.');
      }
    };
    reader.readAsText(file);
  };

  const handleSeedDemoData = () => {
    if (confirm('Populate system with realistic demo inquiries and sample quotations for demonstration?')) {
      const sampleLeads = [
        {
          id: `demo_${Date.now()}_1`,
          fullName: "Dato' Brian Lee",
          companyName: "Apex FinTech Global Sdn. Bhd.",
          email: "brian.lee@apexfin.com.my",
          phoneNumber: "+60 12-888 2341",
          service: "Sdn Bhd Incorporation & Setup",
          message: "Requesting full-service Sdn Bhd company setup with 2 corporate shareholders and foreign director nomination.",
          status: "unread",
          date: new Date().toISOString(),
          source: "referral",
          priority: "high",
          estimatedValue: 2800,
          notes: "Introduced by legal partner. Expects turnaround within 5 working days."
        },
        {
          id: `demo_${Date.now()}_2`,
          fullName: "Dr. Elena Rostova",
          companyName: "BioGen Innovations Asia",
          email: "e.rostova@biogen-asia.de",
          phoneNumber: "+60 11-555 9812",
          service: "Employment Pass (ESD Tier 1 / 2)",
          message: "Looking for ESD expatriate visa quota clearance for 3 senior bio-research specialists from Munich.",
          status: "in-progress",
          date: new Date(Date.now() - 86400000).toISOString(),
          source: "website",
          priority: "high",
          estimatedValue: 10500,
          notes: "Company has RM 500,000 paid-up capital already deposited."
        },
        {
          id: `demo_${Date.now()}_3`,
          fullName: "Tan Sri Ahmad Fauzi",
          companyName: "Nusantara Logistics Holdings",
          email: "fauzi@nusantaralogistics.com.my",
          phoneNumber: "+60 19-333 4455",
          service: "Corporate Income Tax & E-Invoicing",
          message: "Transitioning to statutory LHDN E-Invoicing mandate by July deadline. Requesting compliance gap assessment.",
          status: "read",
          date: new Date(Date.now() - 172800000).toISOString(),
          source: "phone",
          priority: "medium",
          estimatedValue: 3600,
          notes: "Requires formal quotation for board approval."
        }
      ];

      const existingLeads = JSON.parse(localStorage.getItem('bizskoop_leads') || '[]');
      localStorage.setItem('bizskoop_leads', JSON.stringify([...sampleLeads, ...existingLeads]));
      window.dispatchEvent(new Event('leads_updated'));
      logAdminAudit('Populated demo inquiries and advisory records');
      calculateStats();
      alert('Sample advisory records added successfully!');
    }
  };

  const handleClearAuditLogs = () => {
    if (confirm('Clear audit trail logs? This action cannot be undone.')) {
      localStorage.removeItem('bizskoop_audit_logs');
      calculateStats();
      alert('Audit logs cleared.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          Data Management & System Health
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
          Full backup archives, restore workflows, storage health, and database utilities
        </p>
      </div>

      {restoreStatus && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>{restoreStatus}</span>
        </div>
      )}

      {/* Storage Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-royal-blue/10 flex items-center justify-center text-royal-blue">
            <HardDrive size={22} />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">
              {(storageStats.totalBytes / 1024).toFixed(1)} KB
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Storage Footprint
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Inbox size={22} />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">{storageStats.leadsCount}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Inquiries in CRM
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
            <BookOpen size={22} />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">{storageStats.blogsCount}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Advisory Articles
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">{storageStats.quotesCount}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Saved Quotations
            </p>
          </div>
        </div>
      </div>

      {/* Primary Backup & Restore Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-blue/10 flex items-center justify-center text-royal-blue">
              <Download size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Complete System Backup (JSON)
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Download all data into a single encrypted file
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Exports all client leads, CRM history, article drafts, pricing matrices, banner configurations, formal fee proposals, and admin activity audit trails into an archival JSON bundle.
          </p>

          <button
            type="button"
            onClick={handleExportCompleteJSON}
            className="w-full py-3.5 bg-royal-blue hover:bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <Download size={16} className="text-gold" />
            <span>Download Complete System Backup</span>
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-navy-dark">
              <Upload size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Restore Database From File
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Upload previously exported .json archive
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Restores all advisory data from a valid Bizskoop JSON backup archive. Ideal when migrating to another browser, device, or restoring after system maintenance.
          </p>

          <label className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-gold rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg">
            <Upload size={16} />
            <span>Select & Restore JSON Backup</span>
            <input 
              type="file" 
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Secondary Maintenance Tools */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
          Administrative Diagnostic & Maintenance Tools
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Seed Sample Demo Records */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Load Realistic Demo Inquiries
              </h4>
              <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">
                Injects high-ticket Malaysian advisory inquiries (Sdn Bhd formation, ESD visa quota, LHDN E-invoicing) for testing.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSeedDemoData}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer self-start"
            >
              <Sparkles size={14} className="text-gold" />
              <span>Populate Sample Leads</span>
            </button>
          </div>

          {/* Purge Audit Trail */}
          <div className="p-4 bg-red-50/50 rounded-2xl border border-red-200/50 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-red-900">
                Flush Audit Activity Trail
              </h4>
              <p className="text-[10px] text-red-700 font-medium mt-1 leading-relaxed">
                Clears administrative activity logs history while keeping your leads, articles, and settings intact.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearAuditLogs}
              className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer self-start"
            >
              <Trash2 size={14} />
              <span>Clear Audit Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
