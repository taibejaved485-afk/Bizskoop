import React from 'react';

const TaxCompliance: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Expert Tax <br/>
              <span className="text-gold">Compliance &</span> <br/>
              Planning
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Navigate the complexities of LHDN regulations with confidence. We ensure your tax filings are accurate, timely, and optimized for maximum savings.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#tax-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Schedule a Tax Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tax Compliance Simplified Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224154-26039ffc0d8d?auto=format&fit=crop&q=80&w=2070" 
                  className="rounded-3xl shadow-2xl border-b-8 border-gold" 
                  alt="Tax Consultation" 
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Regulatory Obligation</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Tax Compliance <br/>Simplified.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                In Malaysia, every company has a legal obligation to file taxes annually (Form C/PT). Failing to adhere to LHDN (Inland Revenue Board) requirements results in heavy penalties and potential legal action. We handle the burden so you can focus on scale.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Strategic Tax Planning", desc: "Minimize liabilities legally by identifying and claiming all eligible tax incentives and capital allowances." },
                  { title: "CP204 Management", desc: "Precise calculation and timely submission of tax estimates to ensure healthy cash flow management." },
                  { title: "Audit Representation", desc: "Full professional representation and documentation support during LHDN tax audits or inquiries." }
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
          </div>
        </div>
      </section>

      {/* 3. Our Tax Services Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Comprehensive Tax Solutions</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🏛️", title: "Corporate Income Tax", desc: "Preparation and filing of annual tax returns (Form C) for Sdn Bhd entities with strict compliance to the latest tax laws." },
              { icon: "👤", title: "Personal Income Tax", desc: "Efficient tax filing services for directors, local employees, and expatriates to optimize personal tax positions." },
              { icon: "🧾", title: "SST Services", desc: "Expert SST registration, bi-monthly filing, and advisory to ensure your business stays compliant with Sales & Service Tax." },
              { icon: "🌍", title: "Withholding Tax", desc: "Navigating cross-border tax compliance for payments made to non-residents, including royalties and technical fees." },
              { icon: "🛡️", title: "Audit Support", desc: "Professional defense and comprehensive documentation management during LHDN tax audits and investigations." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-navy-dark p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-8 border-gold">
              <h4 className="text-xl font-black text-gold mb-4 uppercase tracking-tighter">Tax Advisory</h4>
              <p className="text-blue-100 text-sm font-medium mb-6">Expert planning for M&A, group restructuring, and cross-border transactions.</p>
              <a href="#tax-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-xs tracking-widest hover:bg-white transition-colors">Request Advisory</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow Tax Calendar Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">The BizFlow Tax Calendar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Phase 1", title: "Data Collection", desc: "Gathering all relevant financial records, prior tax history, and supporting invoices." },
              { step: "Phase 2", title: "Computation", desc: "Calculating precise estimates and identifying all applicable tax incentives and exemptions." },
              { step: "Phase 3", title: "Review", desc: "Final verification by a senior tax specialist followed by client approval and sign-off." },
              { step: "Phase 4", title: "Official Filing", desc: "Electronic submission to LHDN's e-Filing portal with immediate confirmation receipts." }
            ].map((p, i) => (
              <div key={i} className="relative p-8 bg-navy-dark text-white rounded-2xl border-b-4 border-gold shadow-2xl">
                <span className="text-xs font-black text-gold uppercase tracking-widest absolute top-4 right-4">{p.step}</span>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-gold mt-2">{p.title}</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="tax-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Avoid Penalties. Maximize Savings.</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">LHDN deadlines are unforgiving. Secure your professional tax assistance today.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500">
                  <option value="">Approx. Annual Turnover?</option>
                  <option value="under-500k">Under RM 500k</option>
                  <option value="500k-2m">RM 500k - RM 2m</option>
                  <option value="2m-10m">RM 2m - RM 10m</option>
                  <option value="over-10m">Over RM 10m</option>
                </select>
                <textarea placeholder="Specific tax concerns or requirements..." className="w-full h-[88px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
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