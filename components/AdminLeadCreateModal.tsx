import React, { useState } from 'react';
import { X, UserPlus, Building, Phone, Mail, FileText, DollarSign, Tag, Check, Sparkles } from 'lucide-react';
import { Lead } from '../types.ts';
import { logAdminAudit } from '../services/leadStorage.ts';

interface AdminLeadCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: (newLead: Lead) => void;
}

const SERVICE_OPTIONS = [
  'Sdn Bhd Incorporation & Setup',
  'Annual Company Secretarial Retainer',
  'Employment Pass (ESD Tier 1 / 2)',
  'Professional Visit Pass (PVP)',
  'Corporate Income Tax & E-Invoicing',
  'Bookkeeping & Financial Statements',
  'DBKL / Local Council Premise License',
  'WRT License (Foreign Retail)',
  'MOF Government Vendor Registration',
  'General Corporate Legal Advisory'
];

export const AdminLeadCreateModal: React.FC<AdminLeadCreateModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated
}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [source, setSource] = useState<Lead['source']>('phone');
  const [priority, setPriority] = useState<Lead['priority']>('medium');
  const [estimatedValue, setEstimatedValue] = useState<string>('1500');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Lead['status']>('unread');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('Client Name and Phone/WhatsApp Number are required.');
      return;
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      fullName: fullName.trim(),
      companyName: companyName.trim() || 'New Venture / Pending Formation',
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || 'client@advisory.local',
      service,
      message: message.trim() || `Client inquiry received via ${source || 'direct contact'}.`,
      status,
      date: new Date().toISOString(),
      notes: notes.trim(),
      source,
      priority,
      estimatedValue: estimatedValue ? parseFloat(estimatedValue) : undefined
    };

    // Save to localStorage
    const existingRaw = localStorage.getItem('bizskoop_leads');
    let leadsList: Lead[] = [];
    try {
      leadsList = existingRaw ? JSON.parse(existingRaw) : [];
    } catch {
      leadsList = [];
    }
    const updatedLeads = [newLead, ...leadsList];
    localStorage.setItem('bizskoop_leads', JSON.stringify(updatedLeads));
    window.dispatchEvent(new Event('leads_updated'));

    logAdminAudit(`Manually created new client lead: "${newLead.fullName}" (${newLead.service})`);

    onLeadCreated(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>Record New Client Inquiry</span>
                <span className="px-2 py-0.5 rounded bg-gold text-slate-900 text-[10px] font-black uppercase tracking-widest">
                  Manual CRM
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">Log phone calls, WhatsApp inquiries, walk-ins, and executive referrals.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Client Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dato' Brian Lee / Sarah Tan"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company / Trade Name
              </label>
              <div className="relative">
                <Building size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Global Tech Sdn. Bhd."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+60 12-345 6789"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service of Interest <span className="text-red-500">*</span>
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all cursor-pointer"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Source, Priority, Estimated Value */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Inquiry Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue transition-all cursor-pointer"
              >
                <option value="phone">Phone Call</option>
                <option value="whatsapp">WhatsApp Direct</option>
                <option value="walk-in">Office Walk-In</option>
                <option value="referral">Client Referral</option>
                <option value="website">Website Portal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue transition-all cursor-pointer"
              >
                <option value="low">Standard / Low</option>
                <option value="medium">Medium</option>
                <option value="high">Urgent / High Value</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Est. Deal Value (RM)
              </label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="number"
                  min="0"
                  step="50"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  placeholder="1500"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue transition-all"
                />
              </div>
            </div>
          </div>

          {/* Initial Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Lead Status
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'unread', label: 'New / Unread', color: 'border-amber-500 text-amber-800 bg-amber-50' },
                { id: 'in-progress', label: 'Under Review', color: 'border-purple-500 text-purple-800 bg-purple-50' },
                { id: 'read', label: 'Processing', color: 'border-blue-500 text-blue-800 bg-blue-50' },
                { id: 'resolved', label: 'Completed / Won', color: 'border-emerald-500 text-emerald-800 bg-emerald-50' }
              ].map((st) => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setStatus(st.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${status === st.id ? st.color : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'}`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Client Message / Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Inquiry Summary / Client Request
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Seeking to incorporate a foreign-owned Sdn Bhd in Selangor with 2 foreign directors. Inquiring about paid-up capital requirements."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white resize-none transition-all"
            />
          </div>

          {/* Internal Confidential Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Internal Admin Notes</span>
              <span className="text-[10px] text-slate-400 font-normal">Confidential (not visible to client)</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Spoke via phone. Needs proposal sent before Friday 5 PM. Quoted standard RM 1,499 package."
              className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-200/80 rounded-xl text-xs font-medium text-amber-900 outline-none focus:border-gold resize-none transition-all"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-royal-blue hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check size={16} className="text-gold" />
              <span>Save & Record Lead</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
