
import React from 'react';

const AccountingBookkeeping: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Professional <br/>
              <span className="text-gold">Accounting &</span> <br/>
              Bookkeeping
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Focus on growing your business while we handle your numbers with precision and 100% compliance. Your financial backbone, strengthened by experts.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#accounting-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Accurate Accounting Matters Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Financial Integrity</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Why Precision <br/>Matters Most.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Proper bookkeeping is the backbone of any successful business in Malaysia. Beyond just keeping track of cash, it ensures you are always ready for audits and tax filings, keeping the LHDN (Inland Revenue Board) satisfied and your business operational.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Real-time Financial Clarity", desc: "Know exactly where your money is going and where your profits are coming from at any moment." },
                  { title: "Avoid LHDN Penalties", desc: "Stay fully compliant with Malaysian tax laws to avoid costly fines and legal complications." },
                  { title: "Data-Driven Decisions", desc: "Use accurate financial reports to steer your business toward growth and scalability." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-1 text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-royal-blue uppercase text-sm mb-1 tracking-wider">{item.title}</h4>
                      <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2072" 
                  className="rounded-3xl shadow-2xl border-b-8 border-gold" 
                  alt="Accounting Spreadsheet" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Accounting Services */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Core Financial Solutions</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "📊", title: "Bookkeeping", desc: "Professional maintenance of daily ledgers, accounts payable, and accounts receivable with meticulous detail." },
              { icon: "📈", title: "Financial Reporting", desc: "Comprehensive Monthly or Quarterly Profit & Loss statements and Balance Sheets delivered on time." },
              { icon: "⚖️", title: "Bank Reconciliation", desc: "Ensuring your bank statements match your internal records perfectly to catch discrepancies early." },
              { icon: "🔍", title: "Management Accounts", desc: "Deep analytical insights into your business performance to help you optimize operations." },
              { icon: "📅", title: "Year-End Closing", desc: "Rigorous preparation of all financial records for the annual audit and statutory submission." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-navy-dark p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-8 border-gold">
              <h4 className="text-xl font-black text-gold mb-4 uppercase tracking-tighter">Custom Packages</h4>
              <p className="text-blue-100 text-sm font-medium mb-6">Scalable solutions tailored to your specific business volume.</p>
              <a href="#accounting-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-xs tracking-widest hover:bg-white transition-colors">Talk to Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works - The BizFlow Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">Our Accounting Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Document Submission", desc: "Easy digital upload or physical pickup of your invoices and receipts." },
              { step: "02", title: "Expert Processing", desc: "Our certified team categorizes and records every transaction in your ledger." },
              { step: "03", title: "Quality Review", desc: "A senior chartered accountant verifies all entries for total accuracy and compliance." },
              { step: "04", title: "Report Delivery", desc: "Receive clear, easy-to-read financial reports and actionable business insights." }
            ].map((p, i) => (
              <div key={i} className="relative p-8 bg-navy-dark text-white rounded-2xl border-b-4 border-gold shadow-2xl">
                <span className="text-5xl font-black text-gold/20 absolute top-4 right-4">{p.step}</span>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-gold">{p.title}</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="accounting-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Stop Worrying About Your Accounts.</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">Let us handle the numbers while you build your empire. Request your custom quote below.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Company Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <textarea placeholder="Tell us about your accounting needs (e.g. monthly transactions volume, existing backlog)..." className="w-full h-[156px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
                  Get My Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountingBookkeeping;
