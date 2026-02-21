import React from 'react';

const BuySellBusiness: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Confidential <br className="hidden sm:block"/>
              <span className="text-gold">M&A Advisory</span> <br className="hidden sm:block"/>
              & Brokerage
            </h1>
            <p className="text-base sm:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Whether you are looking to exit your venture or acquire a profitable business in Malaysia, BizFlow ensures a secure, transparent, and professional transaction with absolute confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#buy-sell-contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-gold text-navy-dark font-black rounded-lg hover:bg-white transition shadow-xl uppercase tracking-widest text-xs sm:text-sm text-center">
                Browse Listings
              </a>
              <a href="#buy-sell-contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 text-white border-2 border-white/20 font-black rounded-lg hover:bg-white/20 transition uppercase tracking-widest text-xs sm:text-sm text-center">
                List Your Business
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Strategic Exit & Entry Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 sm:w-24 h-20 sm:h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074" 
                  className="rounded-2xl sm:rounded-3xl shadow-2xl border-b-4 sm:border-b-8 border-gold w-full object-cover" 
                  alt="Business Negotiation" 
                />
              </div>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4">Strategic Transaction</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-royal-blue mb-6 sm:mb-8 uppercase tracking-tight">Protecting Your <br className="hidden sm:block"/>Legacy & Future.</h3>
              <p className="text-slate-600 font-medium mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
                Buying or selling a business is more than just a transaction; it’s a legal transfer of legacy and liability. We provide the technical due diligence and legal framework required to protect both parties, ensuring the value you've built is preserved or the investment you make is sound.
              </p>
              <ul className="space-y-6 text-left">
                {[
                  { title: "Business Valuation", desc: "Scientific approach to fair market pricing based on EBIDTA, asset value, and goodwill." },
                  { title: "Strict NDA Management", desc: "Absolute confidentiality to protect employees, suppliers, and customers during the sale process." },
                  { title: "Full Due Diligence", desc: "Verifying every license, tax record, and employment contract before the final handshake." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 sm:gap-6 items-start group">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-1 text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-royal-blue uppercase text-xs sm:text-sm mb-1 tracking-wider">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Transaction Services Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-royal-blue uppercase tracking-tighter">M&A Transaction Units</h2>
            <div className="w-16 sm:w-20 h-1.5 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "📈", title: "Seller Representation", desc: "Optimizing your corporate profile, preparing pitch decks, and matching with pre-qualified buyers for maximum exit value." },
              { icon: "🎯", title: "Buyer Mandates", desc: "Custom sourcing of profitable Malaysian enterprises that match your specific investment criteria and industrial focus." },
              { icon: "🔍", title: "Due Diligence Bureau", desc: "Independent auditing of financial records, operational licenses, and legal standings to mitigate acquisition risk." },
              { icon: "⚖️", title: "Share Transfer & Legal", desc: "Expert handling of Sales & Purchase Agreements (SPA) and SSM statutory filings for official ownership change." },
              { icon: "🚀", title: "Post-Acquisition", desc: "Guiding the new owner through operational transition, management handover, and local compliance updates." }
            ].map((s, i) => (
              <div key={i} className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-8 sm:p-10 rounded-[30px] border border-slate-100 shadow-sm transition-all duration-500 z-10 flex flex-col">
                  <div className="text-3xl sm:text-4xl mb-6 group-hover:scale-110 transition-transform inline-block relative z-10">{s.icon}</div>
                  <h4 className="text-base sm:text-lg font-black text-royal-blue mb-3 uppercase tracking-tight relative z-10">{s.title}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-sm font-medium leading-relaxed relative z-10">{s.desc}</p>
                </div>
              </div>
            ))}
            <div className="bg-navy-dark p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-4 sm:border-b-8 border-gold">
              <h4 className="text-lg sm:text-xl font-black text-gold mb-4 uppercase tracking-tighter">Elite Portfolio</h4>
              <p className="text-blue-100 text-[11px] sm:text-sm font-medium mb-6">Access our private list of 'Off-Market' opportunities in the F&B, Tech, and Manufacturing sectors.</p>
              <a href="#buy-sell-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white transition-colors w-full sm:w-auto">Request Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow M&A Process */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-royal-blue mb-12 sm:mb-16 text-center uppercase tracking-widest">The M&A Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Phase 1", title: "Evaluation", desc: "A rigorous assessment of business health, historical earnings, and future market potential." },
              { step: "Phase 2", title: "Matching", desc: "Strategic connection of buyers and sellers under strict NDA protocols to protect operations." },
              { step: "Phase 3", title: "Audit", desc: "Facilitating intensive due diligence meetings and record auditing for total transparency." },
              { step: "Phase 4", title: "Closing", desc: "Execution of the SPA, fund escrow management, and official SSM record updates." }
            ].map((p, i) => (
              <div key={i} className="relative p-6 sm:p-8 bg-navy-dark text-white rounded-2xl border-b-4 border-gold shadow-2xl">
                <span className="text-[10px] sm:text-xs font-black text-gold uppercase tracking-widest absolute top-4 right-4">{p.step}</span>
                <h4 className="text-lg sm:text-xl font-black mb-4 uppercase tracking-tighter text-gold mt-2">{p.title}</h4>
                <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-16 sm:py-32 bg-slate-50 border-t border-slate-100" id="buy-sell-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-[30px] sm:rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-2xl sm:text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Your Next Big Move Starts Here.</h2>
            <p className="text-slate-600 text-center mb-10 sm:mb-12 font-medium text-sm sm:text-base">Confidentiality is our currency. Tell us about your investment or exit goals.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500 text-sm">
                  <option value="">I am a...</option>
                  <option value="buyer">Potential Buyer / Investor</option>
                  <option value="seller">Business Owner / Seller</option>
                </select>
                <input type="text" placeholder="Target Industry (e.g. F&B, Logistics)" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <input type="text" placeholder="Budget / Asking Price (MYR)" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
                <textarea placeholder="Tell us about the business profile or your acquisition mandate..." className="w-full h-[88px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none text-sm"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-[10px] sm:text-xs">
                  Request Private Briefing
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuySellBusiness;