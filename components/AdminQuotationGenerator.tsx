import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Save, 
  MessageSquare,
  Sparkles,
  RefreshCw,
  Archive,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Quotation, QuotationItem, Lead } from '../types.ts';
import { logAdminAudit } from '../services/leadStorage.ts';

interface AdminQuotationGeneratorProps {
  initialLead?: Lead | null;
  onClearInitialLead?: () => void;
}

const PRESET_PACKAGES: { name: string; items: Omit<QuotationItem, 'id'>[] }[] = [
  {
    name: 'Sdn Bhd Fast-Track Incorporation',
    items: [
      { description: 'SSM Company Incorporation (Sdn. Bhd.) statutory drafting & submission', quantity: 1, unitPrice: 1499 },
      { description: 'SSM Official Statutory Incorporation Filing Fee (Direct disbursement)', quantity: 1, unitPrice: 1010 },
      { description: '1st Year Corporate Secretarial Retainer (Licensed CoSec officer)', quantity: 1, unitPrice: 1200 },
      { description: 'SSM Name Reservation & Statutory Verification', quantity: 1, unitPrice: 100 }
    ]
  },
  {
    name: 'Expatriate Visa (ESD Tier 1 / 2)',
    items: [
      { description: 'ESD Company Account Registration & Corporate Accreditation', quantity: 1, unitPrice: 1500 },
      { description: 'Employment Pass (Category 1 / 2) Professional Dossier & Submission', quantity: 1, unitPrice: 3500 },
      { description: 'Immigration Department of Malaysia (JIM) Endorsement processing', quantity: 1, unitPrice: 500 }
    ]
  },
  {
    name: 'Corporate Tax & Accounting Retainer',
    items: [
      { description: 'Annual Corporate Income Tax Computation & Form C Filing (LHDN)', quantity: 1, unitPrice: 1800 },
      { description: 'E-Invoicing Readiness Audit & Statutory Compliance Setup', quantity: 1, unitPrice: 1200 },
      { description: 'Monthly Cloud Bookkeeping & Management Accounts (6-Month Tier)', quantity: 6, unitPrice: 450 }
    ]
  },
  {
    name: 'Local Council & Premise Licensing',
    items: [
      { description: 'Local Authority (DBKL/MBPJ/MBSA) Premise & Signboard License filing', quantity: 1, unitPrice: 2500 },
      { description: 'Bomba Fire Safety & Department of Health liaison advisory', quantity: 1, unitPrice: 1000 }
    ]
  }
];

export const AdminQuotationGenerator: React.FC<AdminQuotationGeneratorProps> = ({
  initialLead,
  onClearInitialLead
}) => {
  const [quoteNumber, setQuoteNumber] = useState(`BZK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [clientName, setClientName] = useState(initialLead?.fullName || '');
  const [companyName, setCompanyName] = useState(initialLead?.companyName || '');
  const [clientEmail, setClientEmail] = useState(initialLead?.email || '');
  const [clientPhone, setClientPhone] = useState(initialLead?.phoneNumber || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [items, setItems] = useState<QuotationItem[]>([
    { id: '1', description: 'SSM Company Incorporation (Sdn. Bhd.) statutory filing', quantity: 1, unitPrice: 1499 },
    { id: '2', description: 'Licensed Corporate Secretarial Retainer (12 Months)', quantity: 1, unitPrice: 1200 }
  ]);
  const [applySST, setApplySST] = useState(false);
  const [sstRate] = useState(0.08); // 8% Malaysian SST
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState('Payment milestone: 50% upon engagement, 50% upon statutory delivery by SSM / relevant authorities. Quotation valid for 14 days.');
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState<Quotation[]>([]);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Synchronize initial lead if provided
  useEffect(() => {
    if (initialLead) {
      setClientName(initialLead.fullName);
      setCompanyName(initialLead.companyName || '');
      setClientEmail(initialLead.email || '');
      setClientPhone(initialLead.phoneNumber || '');
      // If the service matches, preset items
      if (initialLead.service.toLowerCase().includes('incorporat') || initialLead.service.toLowerCase().includes('secretarial')) {
        handleApplyPreset(PRESET_PACKAGES[0]);
      } else if (initialLead.service.toLowerCase().includes('visa') || initialLead.service.toLowerCase().includes('pass')) {
        handleApplyPreset(PRESET_PACKAGES[1]);
      } else if (initialLead.service.toLowerCase().includes('tax') || initialLead.service.toLowerCase().includes('account')) {
        handleApplyPreset(PRESET_PACKAGES[2]);
      } else if (initialLead.service.toLowerCase().includes('licens')) {
        handleApplyPreset(PRESET_PACKAGES[3]);
      }
    }
  }, [initialLead]);

  // Load saved quotes from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('bizskoop_quotations');
    if (raw) {
      try {
        setSavedQuotes(JSON.parse(raw));
      } catch {
        setSavedQuotes([]);
      }
    }
  }, []);

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: `item_${Date.now()}`, description: '', quantity: 1, unitPrice: 500 }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleApplyPreset = (preset: typeof PRESET_PACKAGES[0]) => {
    setItems(
      preset.items.map((it, idx) => ({
        ...it,
        id: `preset_${idx}_${Date.now()}`
      }))
    );
  };

  const subtotal = items.reduce((acc, curr) => acc + (curr.quantity * (curr.unitPrice || 0)), 0);
  const sstAmount = applySST ? (subtotal - discount) * sstRate : 0;
  const grandTotal = Math.max(0, subtotal - discount + sstAmount);

  // Generate self-contained standalone HTML quotation document
  const generatePrintableQuotationHTML = () => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const validDate = new Date(validUntil).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bizskoop Quotation - ${quoteNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; background: #fff; padding: 40px; font-size: 13px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #003366; padding-bottom: 24px; margin-bottom: 24px; }
    .brand-title { font-size: 26px; font-weight: 900; color: #003366; letter-spacing: -0.5px; }
    .brand-tag { background: #001f3f; color: #D4AF37; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; margin-left: 6px; letter-spacing: 1px; }
    .company-desc { color: #64748b; font-size: 11px; margin-top: 8px; line-height: 1.45; }
    .quote-title { text-align: right; }
    .quote-heading { font-size: 26px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -0.5px; }
    .quote-ref { font-size: 14px; font-weight: 800; color: #003366; margin-top: 4px; }
    .meta-box { display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 24px; }
    .meta-col { width: 48%; }
    .meta-label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .meta-val-strong { font-size: 15px; font-weight: 800; color: #0f172a; }
    .meta-val { font-size: 12px; color: #334155; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { background: #003366; color: #fff; text-align: left; padding: 12px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
    th.text-right, td.text-right { text-align: right; }
    th.text-center, td.text-center { text-align: center; }
    td { padding: 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
    tr:nth-child(even) td { background: #f8fafc; }
    .totals-area { display: flex; justify-content: flex-end; margin-bottom: 24px; }
    .totals-table { width: 360px; }
    .totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 12px; color: #475569; font-weight: 600; }
    .totals-grand { display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #003366; border-bottom: 2px solid #003366; font-size: 18px; font-weight: 900; color: #003366; margin-top: 8px; }
    .terms-box { background: #f8fafc; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 11px; color: #475569; }
    .bank-box { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; font-size: 11px; margin-bottom: 28px; background: #fafafa; }
    .signature-area { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; }
    .sig-col { width: 45%; text-align: center; }
    .sig-line { border-bottom: 1px solid #94a3b8; height: 55px; margin-bottom: 8px; }
    .sig-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; }
    @media print {
      body { padding: 0; }
      @page { size: A4; margin: 15mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div><span class="brand-title">BIZSKOOP</span><span class="brand-tag">ADVISORY</span></div>
      <div class="company-desc">
        Bizskoop Corporate Advisory Sdn. Bhd. (202401012345)<br>
        Level 28, The Exchange 106, Lingkaran TRX, 55188 Kuala Lumpur, Malaysia<br>
        Email: bizskoop@gmail.com | Phone / WhatsApp: +60 11-3701 4452
      </div>
    </div>
    <div class="quote-title">
      <div class="quote-heading">FEE PROPOSAL</div>
      <div class="quote-ref">Ref: ${quoteNumber}</div>
      <div class="meta-val" style="margin-top: 4px;">Date: ${formattedDate}</div>
    </div>
  </div>

  <div class="meta-box">
    <div class="meta-col">
      <div class="meta-label">Client / Entity Details</div>
      <div class="meta-val-strong">${clientName || 'Valued Corporate Client'}</div>
      ${companyName ? `<div class="meta-val">${companyName}</div>` : ''}
      ${clientEmail ? `<div class="meta-val">${clientEmail}</div>` : ''}
      ${clientPhone ? `<div class="meta-val">${clientPhone}</div>` : ''}
    </div>
    <div class="meta-col" style="text-align: right;">
      <div class="meta-label">Proposal Validity</div>
      <div class="meta-val">Valid Until: <strong>${validDate}</strong></div>
      <div class="meta-val" style="margin-top: 4px;">Jurisdiction: <strong>Malaysia (SSM / LHDN / ESD)</strong></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 40px;" class="text-center">#</th>
        <th>Scope of Professional Service</th>
        <th style="width: 70px;" class="text-center">Qty</th>
        <th style="width: 130px;" class="text-right">Rate (RM)</th>
        <th style="width: 130px;" class="text-right">Total (RM)</th>
      </tr>
    </thead>
    <tbody>
      ${items.map((item, idx) => `
        <tr>
          <td class="text-center" style="color: #64748b; font-weight: 700;">${idx + 1}</td>
          <td style="font-weight: 600; color: #0f172a;">${item.description || 'Corporate Advisory Service'}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-right">RM ${(item.unitPrice || 0).toLocaleString()}</td>
          <td class="text-right" style="font-weight: 700; color: #003366;">RM ${((item.quantity || 1) * (item.unitPrice || 0)).toLocaleString()}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals-area">
    <div class="totals-table">
      <div class="totals-row"><span>Gross Subtotal:</span><span>RM ${subtotal.toLocaleString()}</span></div>
      ${discount > 0 ? `<div class="totals-row" style="color: #059669;"><span>Courtesy Discount:</span><span>-RM ${discount.toLocaleString()}</span></div>` : ''}
      ${applySST ? `<div class="totals-row"><span>Malaysian SST (8%):</span><span>RM ${sstAmount.toFixed(2)}</span></div>` : ''}
      <div class="totals-grand"><span>Total Professional Fee:</span><span>RM ${grandTotal.toLocaleString()}</span></div>
    </div>
  </div>

  <div class="terms-box">
    <strong>Terms & Conditions:</strong><br>
    ${notes || 'Quotation valid for 14 days. Statutory disbursements are estimated based on prevailing government fees.'}
  </div>

  <div class="bank-box">
    <strong>Official Remittance Bank Details:</strong><br>
    Bank Name: <strong>Malayan Banking Berhad (Maybank)</strong> | Account Name: <strong>Bizskoop Corporate Advisory Sdn Bhd</strong><br>
    Account Number: <strong>5140 1234 5678</strong> | Swift Code: <strong>MBBEMYKL</strong>
  </div>

  <div class="signature-area">
    <div class="sig-col">
      <div class="sig-line"></div>
      <div class="sig-title">For Bizskoop Corporate Advisory</div>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <div class="sig-title">Client Acceptance & Confirmation</div>
    </div>
  </div>
</body>
</html>`;
  };

  const handleSaveQuotation = () => {
    const targetName = clientName.trim() || 'Valued Corporate Client';
    if (!clientName.trim()) {
      setClientName(targetName);
    }

    const quote: Quotation = {
      id: `quote_${Date.now()}`,
      quoteNumber: quoteNumber || `BZ-Q-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-001`,
      clientName: targetName,
      companyName: companyName.trim() || 'Unspecified Entity',
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      date,
      validUntil,
      items,
      applySST,
      sstRate,
      discount,
      notes,
      status: 'sent'
    };

    const updated = [quote, ...savedQuotes.filter(q => q.quoteNumber !== quote.quoteNumber)];
    setSavedQuotes(updated);
    try {
      localStorage.setItem('bizskoop_quotations', JSON.stringify(updated));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }

    logAdminAudit(`Generated & saved formal quotation #${quote.quoteNumber} for ${targetName} (RM ${grandTotal.toLocaleString()})`);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);

    setToast({
      show: true,
      message: `Quotation #${quote.quoteNumber} saved to archive! Total: RM ${grandTotal.toLocaleString()}`,
      type: 'success'
    });
  };

  const handleLoadQuote = (q: Quotation) => {
    setQuoteNumber(q.quoteNumber);
    setClientName(q.clientName);
    setCompanyName(q.companyName);
    setClientEmail(q.clientEmail);
    setClientPhone(q.clientPhone);
    setDate(q.date);
    setValidUntil(q.validUntil);
    setItems(q.items);
    setApplySST(q.applySST);
    setDiscount(q.discount);
    setNotes(q.notes);
    setShowSavedModal(false);
    setToast({ show: true, message: `Loaded Quotation #${q.quoteNumber}`, type: 'info' });
  };

  const handleDeleteSavedQuote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedQuotes.filter(q => q.id !== id);
    setSavedQuotes(updated);
    try {
      localStorage.setItem('bizskoop_quotations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setToast({ show: true, message: 'Quotation removed from archive', type: 'info' });
  };

  const handleCopyWhatsApp = () => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    const validDate = new Date(validUntil).toLocaleDateString('en-GB');
    
    let msg = `*BIZSKOOP CORPORATE ADVISORY — OFFICIAL FEE ESTIMATE*\n`;
    msg += `Ref: ${quoteNumber} | Date: ${formattedDate}\n\n`;
    msg += `*Client:* ${clientName || 'Valued Client'}\n`;
    if (companyName) msg += `*Company:* ${companyName}\n`;
    msg += `------------------------------------\n`;
    msg += `*PROPOSED SERVICES:*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.description || 'Service Scope'}*\n`;
      msg += `   Qty: ${item.quantity} × RM ${(item.unitPrice || 0).toLocaleString()} = RM ${((item.quantity || 1) * (item.unitPrice || 0)).toLocaleString()}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*Subtotal:* RM ${subtotal.toLocaleString()}\n`;
    if (discount > 0) msg += `*Special Courtesy Discount:* -RM ${discount.toLocaleString()}\n`;
    if (applySST) msg += `*Malaysian SST (8%):* RM ${sstAmount.toFixed(2)}\n`;
    msg += `*TOTAL ESTIMATED FEE:* *RM ${grandTotal.toLocaleString()}*\n\n`;
    msg += `*Validity:* Valid until ${validDate}\n`;
    msg += `*Terms:* ${notes}\n\n`;
    msg += `_Bizskoop Corporate Advisory Desk_\n`;
    msg += `_Kuala Lumpur & Selangor, Malaysia_`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = msg;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 3000);
      setToast({ show: true, message: 'WhatsApp quote summary copied to clipboard!', type: 'success' });
    } catch (err) {
      setToast({ show: true, message: 'Failed to copy to clipboard', type: 'error' });
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => setIsPrinting(false), 2500);

    const htmlDoc = generatePrintableQuotationHTML();

    // 1. Try opening standalone print view in a new tab
    try {
      const printDoc = htmlDoc.replace(
        '</body>',
        `<script>
          window.onload = function() {
            setTimeout(function() {
              try { window.print(); } catch(e) {}
            }, 300);
          };
        </script></body>`
      );
      const blob = new Blob([printDoc], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      if (win) {
        setToast({
          show: true,
          message: 'Quotation opened in new tab! Use "Save as PDF" or Print.',
          type: 'success'
        });
        return;
      }
    } catch (err) {
      console.warn('Direct popup print blocked by browser sandbox:', err);
    }

    // 2. Fallback: window.print() inside the page
    try {
      window.print();
      setToast({
        show: true,
        message: 'Print dialog opened! Choose "Save as PDF" to export.',
        type: 'success'
      });
      return;
    } catch (err) {
      console.warn('window.print() not allowed in sandboxed iframe:', err);
    }

    // 3. Fallback: Download file directly
    handleDownloadDoc();
  };

  const handleDownloadDoc = () => {
    const htmlDoc = generatePrintableQuotationHTML();
    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bizskoop-Quotation-${quoteNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setToast({
      show: true,
      message: `Quotation file downloaded! Open in browser to print or Save as PDF.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-gold/20 text-navy-dark text-[10px] font-black uppercase tracking-widest border border-gold/40">
              Corporate Quotations
            </span>
            {initialLead && (
              <span className="text-xs text-slate-500 font-bold">
                Pre-filled from lead: <strong className="text-royal-blue">{initialLead.fullName}</strong>
              </span>
            )}
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Fee Quotation & Proposal Generator
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">
            Instant statutory estimate builder for Sdn Bhd setup, visas, accounting, and licenses
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSavedModal(true)}
            className="px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-[10px] uppercase tracking-widest text-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Archive size={14} className="text-royal-blue" />
            <span>Saved Quotes ({savedQuotes.length})</span>
          </button>

          <button
            type="button"
            onClick={handleCopyWhatsApp}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            {copiedWhatsApp ? <Check size={14} /> : <MessageSquare size={14} />}
            <span>{copiedWhatsApp ? 'Copied WhatsApp Msg!' : 'Copy WhatsApp Quote'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Print or Export as PDF document"
            className="px-4 py-3 bg-navy-dark hover:bg-slate-800 text-gold rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            {isPrinting ? <RefreshCw size={14} className="animate-spin text-gold" /> : <Printer size={14} />}
            <span>{isPrinting ? 'Opening Print...' : 'Print / Export PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadDoc}
            title="Download formatted official Quotation file to open or save as PDF"
            className="px-3.5 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            <Download size={14} className="text-royal-blue" />
            <span>Download Doc</span>
          </button>

          <button
            type="button"
            onClick={handleSaveQuotation}
            className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
              isSaved 
                ? 'bg-emerald-600 text-white shadow-emerald-200' 
                : 'bg-royal-blue hover:bg-blue-900 text-white'
            }`}
          >
            {isSaved ? <Check size={14} className="text-white" /> : <Save size={14} className="text-gold" />}
            <span>{isSaved ? 'Saved to Archive!' : 'Save to Archive'}</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification Toast */}
      {toast && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
          toast.type === 'error' ? 'bg-red-50 text-red-900 border-red-300' :
          'bg-blue-50 text-blue-900 border-blue-300'
        }`}>
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <Check size={16} className="text-emerald-600 shrink-0" />}
            {toast.type === 'info' && <Archive size={16} className="text-blue-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-800 text-xs px-2 py-0.5 rounded-lg hover:bg-black/5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Preset Package Quick-Loaders */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-gold" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            Quick-Load Standard Advisory Packages:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_PACKAGES.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="p-3 bg-slate-50 hover:bg-royal-blue/5 border border-slate-200 hover:border-royal-blue/30 rounded-2xl text-left transition-all cursor-pointer group"
            >
              <p className="text-xs font-black text-slate-900 group-hover:text-royal-blue transition-colors">
                {preset.name}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                {preset.items.length} line items bundled
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Printable Quotation Sheet Container */}
      <div id="bizskoop-print-quotation" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        {/* Quotation Official Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-black tracking-tight text-royal-blue">BIZSKOOP</span>
              <span className="text-xs font-black tracking-widest uppercase text-gold bg-slate-900 px-2 py-0.5 rounded">
                ADVISORY
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Bizskoop Corporate Advisory Sdn. Bhd. (202401012345)<br />
              Level 28, The Exchange 106, Lingkaran TRX, 55188 Kuala Lumpur, Malaysia<br />
              Email: bizskoop@gmail.com | Phone: +60 11-3701 4452
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight">
              PROPOSAL / QUOTE
            </span>
            <div className="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-600">
              <span>Quote No:</span>
              <input
                type="text"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className="font-black text-royal-blue bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-xs w-36 sm:text-right"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Statutory Fee Assessment
            </p>
          </div>
        </div>

        {/* Client & Date Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70">
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Quotation Prepared For:
            </h4>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Client Full Name</label>
                <input 
                  type="text"
                  placeholder="Client Name (e.g. Dato' Alex Tan)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Company / Entity Name</label>
                <input 
                  type="text"
                  placeholder="Company Name (e.g. Horizon Digital Ventures Sdn. Bhd.)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Phone / WhatsApp</label>
                  <input 
                    type="text"
                    placeholder="+60 12-345 6789"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Client Email</label>
                  <input 
                    type="email"
                    placeholder="client@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Quotation Schedule & Validity:
            </h4>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Issue Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Valid Until</label>
                <input 
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue"
                />
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 block">
                  Engagement Currency: <strong>Malaysian Ringgit (MYR / RM)</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Itemized Scope of Professional Services
            </h4>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 bg-slate-100 hover:bg-royal-blue hover:text-white text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={12} />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-[10px] font-black uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 w-10">#</th>
                  <th className="py-3 px-4">Service Description & Deliverables</th>
                  <th className="py-3 px-4 w-24 text-center">Qty</th>
                  <th className="py-3 px-4 w-36 text-right">Unit Price (RM)</th>
                  <th className="py-3 px-4 w-36 text-right">Amount (RM)</th>
                  <th className="py-3 px-2 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {items.map((item, idx) => {
                  const lineTotal = item.quantity * (item.unitPrice || 0);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-400 text-center">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                          placeholder="Scope description..."
                          className="w-full px-2.5 py-1.5 bg-transparent border border-transparent hover:border-slate-200 focus:border-royal-blue rounded-lg font-medium text-slate-900 outline-none"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-900 outline-none"
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="number"
                          min="0"
                          step="10"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-900 outline-none"
                        />
                      </td>
                      <td className="py-3 px-4 text-right font-black text-slate-900">
                        RM {lineTotal.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Remove Line Item"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation & Notes Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Terms & Payment Notes */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
              Engagement Terms, Disclaimers & Banking Details
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium outline-none focus:border-royal-blue resize-none"
            />
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium leading-relaxed">
              <strong>Official Disbursement Note:</strong> Government statutory disbursements (e.g. SSM statutory capital fees, JIM immigration stamping) are payable strictly in Malaysian Ringgit.
            </div>
          </div>

          {/* Pricing Totals Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Subtotal:</span>
              <span className="text-slate-900 font-black">RM {subtotal.toLocaleString()}</span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Courtesy Discount (RM):</span>
              <input
                type="number"
                min="0"
                step="50"
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-28 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-right font-bold text-slate-900 outline-none"
              />
            </div>

            {/* SST Checkbox */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-1 border-t border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={applySST}
                  onChange={(e) => setApplySST(e.target.checked)}
                  className="rounded text-royal-blue focus:ring-royal-blue"
                />
                <span>Include Malaysian SST (8%)</span>
              </label>
              <span>{applySST ? `RM ${sstAmount.toFixed(2)}` : 'N/A (Exempt / Direct)'}</span>
            </div>

            {/* Grand Total */}
            <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between">
              <div>
                <span className="text-sm font-black uppercase text-slate-900 block">
                  Grand Total Payable
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  Inclusive of all line items
                </span>
              </div>
              <span className="text-2xl font-black text-royal-blue tracking-tight">
                RM {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Signatures & Formal Stamp Block */}
        <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-200">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Prepared & Authorized By:
            </p>
            <div className="border-b border-slate-400 w-48 pb-1">
              <p className="font-serif italic text-lg text-royal-blue">Bizskoop Advisory</p>
            </div>
            <p className="text-xs font-black text-slate-900">
              Executive Secretarial Partner<br />
              <span className="text-[10px] text-slate-400 font-normal">Bizskoop Corporate Advisory Sdn. Bhd.</span>
            </p>
          </div>

          <div className="space-y-6 text-right">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Client Acceptance & Confirmation:
            </p>
            <div className="border-b border-slate-400 w-48 ml-auto pb-1">
              <span className="opacity-0">Signature</span>
            </div>
            <p className="text-xs font-black text-slate-900">
              {clientName || 'Authorized Signatory'}<br />
              <span className="text-[10px] text-slate-400 font-normal">Date & Official Company Stamp</span>
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Saved Past Quotations */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[85vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Archive size={20} className="text-gold" />
                <h3 className="text-base font-black uppercase tracking-tight">Saved Quotations Archive</h3>
              </div>
              <button
                onClick={() => setShowSavedModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto divide-y divide-slate-100">
              {savedQuotes.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-bold uppercase text-xs">
                  No saved quotations in archive yet.
                </div>
              ) : (
                savedQuotes.map((q) => {
                  const qSubtotal = q.items.reduce((acc, curr) => acc + (curr.quantity * (curr.unitPrice || 0)), 0);
                  const qGrandTotal = Math.max(0, qSubtotal - (q.discount || 0) + (q.applySST ? (qSubtotal - (q.discount || 0)) * (q.sstRate || 0.08) : 0));
                  return (
                    <div 
                      key={q.id}
                      onClick={() => handleLoadQuote(q)}
                      className="py-4 px-3 flex items-center justify-between hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-royal-blue">{q.quoteNumber}</span>
                          <span className="text-xs font-bold text-slate-900">• {q.clientName}</span>
                          {q.companyName && (
                            <span className="text-[11px] text-slate-500 font-medium">({q.companyName})</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          Date: {q.date} • {q.items.length} Scope items
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-slate-900">
                          RM {qGrandTotal.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSavedQuote(q.id, e)}
                          className="text-slate-400 hover:text-red-600 p-1.5 transition-colors"
                          title="Delete Quote"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
