import React from 'react';

const LocalCouncilLicensing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Local Council <br/>
              <span className="text-gold">Licensing:</span> <br/>
              DBKL, MBPJ & Beyond
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Get your Premise and Signboard licenses approved without the back-and-forth. We handle the local authorities while you focus on your shop or office setup.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#council-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Apply for Council License
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Local Compliance Made Easy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
                  className="rounded-3xl shadow-2xl border-b-8 border-gold" 
                  alt="Modern Office Premise" 
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Local Jurisdiction</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Local Compliance <br/>Made Easy.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Every business premise in Malaysia requires a license from the relevant Local Authority (Pihak Berkuasa Tempatan - PBT). Whether it's an office in a skyscraper or a retail lot in a mall, we specialize in navigating the specific bylaws of different councils to ensure your signage and operations are 100% legal.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Premise Licenses", desc: "Expert application for offices, retail units, and warehouses across all major Malaysian municipalities." },
                  { title: "Signboard (Iklan) Licenses", desc: "Securing approvals for your brand signage to avoid immediate removal or heavy daily fines." },
                  { title: "Building Plan Approvals", desc: "Managing renovation permits and building plan modifications as required by council guidelines." }
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

      {/* 3. Common Council Coverage Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Council Coverage</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "DBKL", sub: "Kuala Lumpur", desc: "Dewan Bandaraya Kuala Lumpur - High-priority central district approvals." },
              { title: "MBPJ / MBSJ / MBSA", sub: "Selangor Hubs", desc: "Petaling Jaya, Subang Jaya, and Shah Alam area council management." },
              { title: "MPKJ / MPAJ", sub: "Kajang & Ampang", desc: "Focused support for the growing business hubs in Kajang and Ampang Jaya." },
              { title: "National PBTs", sub: "All States", desc: "Comprehensive support for municipal councils across all Malaysian states." }
            ].map((s, i) => (
              <div key={i} className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-8 rounded-[30px] border border-slate-100 shadow-sm transition-all duration-500 z-10 flex flex-col text-center">
                  <div className="w-16 h-16 bg-navy-dark text-gold rounded-full flex items-center justify-center mx-auto mb-6 font-black text-xl group-hover:scale-110 transition-transform">{s.title[0]}</div>
                  <h4 className="text-lg font-black text-royal-blue mb-1 uppercase tracking-tight">{s.title}</h4>
                  <p className="text-gold text-[10px] font-black uppercase tracking-widest mb-4">{s.sub}</p>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The BizFlow On-Site Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">The On-Site Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Site Inspection", desc: "We physically review your premise to ensure it meets safety, zoning, and aesthetic guidelines." },
              { step: "Step 2", title: "Documentation", desc: "Preparing professional photos, building floor plans, and tenancy agreements for submission." },
              { step: "Step 3", title: "Submission", desc: "Direct filing of the application and coordinating with council officers for final inspections." },
              { step: "Step 4", title: "Collection", desc: "We collect your physical license and official council sticker and deliver them to your door." }
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
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="council-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Need Your Signboard Approved Fast?</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">Don't wait for a summons. Get your premise and signage licensed by our professional liaison team.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Premise Location (City)" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <textarea placeholder="Describe your business and license status..." className="w-full h-[156px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalCouncilLicensing;