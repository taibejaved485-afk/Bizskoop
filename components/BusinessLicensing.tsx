import React from 'react';

const BusinessLicensing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Navigate Malaysian <br/>
              <span className="text-gold">Business Licensing</span> <br/>
              With Ease
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              From general trade licenses to industry-specific permits, we handle the bureaucracy so you can start operating faster. Total compliance, zero guesswork.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#licensing-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Check License Requirements
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Licensing is Crucial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Operational Compliance</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Protect Your <br/>Business Assets.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Operating without the correct permits in Malaysia can lead to heavy fines, legal action, or immediate business closure. Every sector has unique requirements—from federal ministries to local municipal councils. We provide expert guidance on which federal and state licenses your specific business needs to thrive legally.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "WRT Licenses", desc: "Mandatory Wholesale, Retail, and Trade licenses for foreign-owned entities in Malaysia." },
                  { title: "CIDB & Manufacturing", desc: "Specialized registrations for construction and industrial manufacturing operations." },
                  { title: "Tourism & MOTAC", desc: "Assisting travel agencies and hospitality businesses in securing Ministry permits." }
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
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070" 
                  className="rounded-3xl shadow-2xl border-t-8 border-gold" 
                  alt="Government Document Review" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Licensing Support Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Strategic Permit Solutions</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "📜", title: "General Business License", desc: "Foundational permits (Premise & Signboard) required from local councils (DBKL, MBPJ, etc.) for every office or retail shop." },
              { icon: "🌍", title: "WRT License", desc: "Critical for foreign investors in retail, wholesale, or distribution sectors. We handle the 100% foreign ownership compliance checks." },
              { icon: "🍱", title: "Industry Specific Permits", desc: "Specialized licensing for highly regulated sectors including F&B (Halal/Liquor), Medical devices, and Private Education." },
              { icon: "🏢", title: "MIDA & MDEC Status", desc: "Applying for Pioneer Status or Tax Incentives for tech (MSC) and high-impact manufacturing projects." },
              { icon: "🤝", title: "Professional Bodies", desc: "Assisting doctors, architects, and engineers in registering with respective Malaysian boards and professional councils." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-navy-dark p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-8 border-gold">
              <h4 className="text-xl font-black text-gold mb-4 uppercase tracking-tighter">Compliance Check</h4>
              <p className="text-blue-100 text-sm font-medium mb-6">Unsure about your license requirements? Get a full audit of your business activity.</p>
              <a href="#licensing-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-xs tracking-widest hover:bg-white transition-colors">Start Audit</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow Approval Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">The Approval Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Gap Analysis", desc: "Strategic review of your business activity against current Malaysian regulations and federal laws." },
              { step: "Step 2", title: "Doc Preparation", desc: "Meticulous gathering of tenancy agreements, floor plans, company profiles, and safety certifications." },
              { step: "Step 3", title: "Liaison & Submission", desc: "Direct representation with ministries and local agencies to expedite queries and handle clarifications." },
              { step: "Step 4", title: "License Issuance", desc: "Rigorous monitoring of progress until your permit is officially active and displayed at your premise." }
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
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="licensing-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Not Sure Which License You Need?</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">Don't risk operating illegally. Get an expert opinion on your licensing roadmap.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Business Industry (e.g. Retail, SaaS)" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <textarea placeholder="Tell us about your business activity and planned location..." className="w-full h-[156px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
                  Check My Requirements
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessLicensing;