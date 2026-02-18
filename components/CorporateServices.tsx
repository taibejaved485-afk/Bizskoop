import React from 'react';

const CorporateServices: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Premium <br/>
              <span className="text-gold">Corporate</span> <br/>
              Services
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              From government agency registrations to corporate banking, we provide the foundational support your growing enterprise needs to scale in Malaysia with speed and authority.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#corporate-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Inquire About Corporate Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Unlocking Growth Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Executive Foundation</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Unlocking Growth <br/>In Malaysia.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Expanding in Malaysia requires more than just a business registration. It demands a seamless bridge between your operations and essential government bodies and financial institutions. We act as your strategic envoy, ensuring every portal is open and every compliance box is ticked.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "ESD & MDEC Registration", desc: "Expert setup of your company's portal to unlock the ability to hire top international talent and expatriate professionals." },
                  { title: "Corporate Banking Facilitation", desc: "Direct guidance through the stringent KYC requirements of major Malaysian and International banks for corporate account opening." },
                  { title: "EPF & SOCSO Setup", desc: "Foundational payroll compliance setup, ensuring your company is ready to manage local employee benefits and statutory contributions." }
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
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2073" 
                  className="rounded-3xl shadow-2xl border-t-8 border-gold" 
                  alt="Modern Corporate Office" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specialized Agency Support Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Specialized Agency Support</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "💼", title: "ESD Registration", desc: "End-to-end setup of the Expatriate Services Division portal, enabling your business to apply for Employment Passes (EP) efficiently." },
              { icon: "💻", title: "MDEC / Digital Status", desc: "Specialized assistance for tech and digital firms to obtain Malaysia Digital (MD) status, unlocking tax incentives and talent freedom." },
              { icon: "🏦", title: "Bank Account Opening", desc: "White-glove facilitation with top-tier financial institutions like Maybank, CIMB, or HSBC to navigate complex onboarding." },
              { icon: "🏗️", title: "MOF Registration", desc: "Strategic registration with the Ministry of Finance, enabling your business to bid for and secure high-value government tenders." },
              { icon: "🎓", title: "HRDF Compliance", desc: "Managing Human Resource Development Fund registration and compliance to leverage employee training grants and subsidies." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-navy-dark p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-8 border-gold">
              <h4 className="text-xl font-black text-gold mb-4 uppercase tracking-tighter">Strategic Envoy</h4>
              <p className="text-blue-100 text-sm font-medium mb-6">Need a specific agency registration not listed? Our liaison network covers all major ministries.</p>
              <a href="#corporate-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-xs tracking-widest hover:bg-white transition-colors">Custom Inquiry</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow Strategy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">The Corporate Strategy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Consultation", desc: "Analyzing your corporate structure and specific needs for banking access or government agency status." },
              { step: "Step 2", title: "Portal Setup", desc: "Meticulous creation and management of your digital presence on key government and ministry platforms." },
              { step: "Step 3", title: "Verification", desc: "Rigorous vetting of corporate profiles and documentation to withstand the highest levels of institutional scrutiny." },
              { step: "Step 4", title: "Active Support", desc: "Proactive management of renewals, status updates, and compliance requirements for all registered accounts." }
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
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="corporate-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Elevate Your Corporate Standing.</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">Foundational support for elite enterprises. Speak with our corporate services unit today.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Company Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="tel" placeholder="Contact Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500">
                  <option value="">Select Service Required</option>
                  <option value="esd">ESD / MDEC Portal Setup</option>
                  <option value="banking">Corporate Banking Opening</option>
                  <option value="mof">MOF Registration</option>
                  <option value="payroll">EPF / SOCSO / HRDF Setup</option>
                  <option value="other">Other Specialized Agency</option>
                </select>
                <textarea placeholder="Tell us about your corporate goals or agency requirements..." className="w-full h-[88px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateServices;