import React from 'react';

const TaxCompliance: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Expert Tax <br className="hidden sm:block"/>
              <span className="text-gold">Compliance &</span> <br className="hidden sm:block"/>
              Planning
            </h1>
            <p className="text-base sm:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Navigate the complexities of LHDN regulations with confidence. We ensure your tax filings are accurate, timely, and optimized for maximum savings.
            </p>
            <div className="flex justify-center sm:justify-start gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#tax-contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto text-center">
                Schedule a Tax Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tax Compliance Simplified Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 sm:w-24 h-20 sm:h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://i.pinimg.com/736x/df/66/55/df6655834c7dec07d023cb5f28888271.jpg" 
                  className="rounded-2xl sm:rounded-3xl shadow-2xl border-b-4 sm:border-b-8 border-gold w-full object-cover" 
                  alt="Tax Consultation" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4">Regulatory Obligation</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-royal-blue mb-6 sm:mb-8 uppercase tracking-tight">Tax Compliance <br className="hidden sm:block"/>Simplified.</h3>
              <p className="text-slate-600 font-medium mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
                In Malaysia, every company has a legal obligation to file taxes annually (Form C/PT). Failing to adhere to LHDN (Inland Revenue Board) requirements results in heavy penalties and potential legal action. We handle the burden so you can focus on scale.
              </p>
              <ul className="space-y-6 text-left">
                {[
                  { title: "Strategic Tax Planning", desc: "Minimize liabilities legally by identifying and claiming all eligible tax incentives and capital allowances." },
                  { title: "CP204 Management", desc: "Precise calculation and timely submission of tax estimates to ensure healthy cash flow management." },
                  { title: "Audit Representation", desc: "Full professional representation and documentation support during LHDN tax audits or inquiries." }
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

      {/* 3. Our Tax Services Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-royal-blue uppercase tracking-tighter">Comprehensive Tax Solutions</h2>
            <div className="w-16 sm:w-20 h-1.5 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "🏛️", title: "Corporate Income Tax", desc: "Preparation and filing of annual tax returns (Form C) for Sdn Bhd entities with strict compliance to the latest tax laws." },
              { icon: "👤", title: "Personal Income Tax", desc: "Efficient tax filing services for directors, local employees, and expatriates to optimize personal tax positions." },
              { icon: "🧾", title: "SST Services", desc: "Expert SST registration, bi-monthly filing, and advisory to ensure your business stays compliant with Sales & Service Tax." },
              { icon: "🌍", title: "Withholding Tax", desc: "Navigating cross-border tax compliance for payments made to non-residents, including royalties and technical fees." },
              { icon: "🛡️", title: "Audit Support", desc: "Professional defense and comprehensive documentation management during LHDN tax audits and investigations." }
            ].map((s, i) => (
              <div key={i} className="group relative p-[2px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div 
                  className="liquid-box relative h-full bg-white p-8 sm:p-10 rounded-[22px] sm:rounded-[30px] border border-slate-100 shadow-sm transition-all duration-500 z-10 flex flex-col"
                  style={{ '--fill-color': 'rgba(0, 51, 102, 0.02)' } as React.CSSProperties}
                >
                  <div className="liquid-wave"></div>
                  <div className="text-3xl sm:text-4xl mb-6 group-hover:scale-110 transition-transform inline-block relative z-10">{s.icon}</div>
                  <h4 className="text-base sm:text-lg font-black text-royal-blue mb-3 uppercase tracking-tight group-hover:text-gold transition-colors relative z-10">{s.title}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-sm font-medium leading-relaxed relative z-10">{s.desc}</p>
                </div>
              </div>
            ))}
            <div className="group relative p-[2px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              {/* Rotating Glow Layer */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-navy-dark p-8 sm:p-10 rounded-[22px] sm:rounded-[30px] shadow-xl flex flex-col justify-center items-center text-center border-b-4 sm:border-b-8 border-gold z-10">
                <h4 className="text-lg sm:text-xl font-black text-gold mb-4 uppercase tracking-tighter relative z-10">Tax Advisory</h4>
                <p className="text-blue-100 text-[11px] sm:text-sm font-medium mb-6 relative z-10">Expert planning for M&A, group restructuring, and cross-border transactions.</p>
                <a href="#tax-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white transition-colors relative z-10 w-full sm:w-auto">Request Advisory</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow Tax Calendar Process */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-royal-blue mb-12 sm:mb-16 text-center uppercase tracking-widest">The BizFlow Tax Calendar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Phase 1", title: "Data Collection", desc: "Gathering all relevant financial records, prior tax history, and supporting invoices." },
              { step: "Phase 2", title: "Computation", desc: "Calculating precise estimates and identifying all applicable tax incentives and exemptions." },
              { step: "Phase 3", title: "Review", desc: "Final verification by a senior tax specialist followed by client approval and sign-off." },
              { step: "Phase 4", title: "Official Filing", desc: "Electronic submission to LHDN's e-Filing portal with immediate confirmation receipts." }
            ].map((p, i) => (
              <div key={i} className="group relative p-[2px] rounded-[24px] sm:rounded-[34px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div 
                  className="liquid-box relative h-full bg-navy-dark p-8 rounded-[22px] sm:rounded-[32px] border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden z-10"
                  style={{ '--fill-color': 'rgba(212, 175, 55, 0.05)' } as React.CSSProperties}
                >
                  <div className="liquid-wave"></div>
                  <h4 className="text-lg sm:text-xl font-black mb-4 uppercase tracking-tighter text-gold mt-2 relative z-20">{p.title}</h4>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed relative z-20">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-16 sm:py-32 bg-slate-50 border-t border-slate-100" id="tax-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-[30px] sm:rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-2xl sm:text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Avoid Penalties. Maximize Savings.</h2>
            <p className="text-slate-600 text-center mb-10 sm:mb-12 font-medium text-sm sm:text-base">LHDN deadlines are unforgiving. Secure your professional tax assistance today.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
                <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
                <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm" />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500 text-sm">
                  <option value="">Approx. Annual Turnover?</option>
                  <option value="under-500k">Under RM 500k</option>
                  <option value="500k-2m">RM 500k - RM 2m</option>
                  <option value="2m-10m">RM 2m - RM 10m</option>
                  <option value="over-10m">Over RM 10m</option>
                </select>
                <textarea placeholder="Specific tax concerns or requirements..." className="w-full h-[88px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none text-sm"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-[10px] sm:text-xs">
                  Schedule My Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxCompliance;