import React from 'react';

const ImmigrationSupport: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Expatriate & <br/>
              <span className="text-gold">Immigration</span> <br/>
              Support
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Simplify the visa process for your international talent. From Employment Passes to Dependent Visas, we ensure a smooth transition for your global team into Malaysia.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#visa-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover-bg-gold transition shadow-xl uppercase tracking-widest text-sm">
                Start Visa Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expert Visa Solutions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2070" 
                  className="rounded-3xl shadow-2xl border-b-8 border-gold" 
                  alt="Professional Consultant" 
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Global Mobility</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-8 uppercase tracking-tight">Expert Visa <br/>Solutions.</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Navigating Malaysia's immigration laws requires precision and up-to-date knowledge of agency quotas. We manage the entire lifecycle of work permits, ensuring your expatriate staff are legally compliant and ready to work from day one.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "ESD Portal Management", desc: "End-to-end handling of the Expatriate Services Division portal for position and endorsement applications." },
                  { title: "MDEC / MD Tech Visas", desc: "Specialist support for Malaysia Digital (MD) status companies in securing high-priority tech talent passes." },
                  { title: "Strategic Quota Advice", desc: "Strategic advice on company paid-up capital requirements and expatriate quota projections." }
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

      {/* 3. Visa Categories Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Visa Categories We Handle</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🛂", title: "Employment Pass (EP)", desc: "Professional work permits for Categories I, II, and III based on salary thresholds and job roles." },
              { icon: "💼", title: "Professional Visit Pass (PVP)", desc: "Short-term permits for technical experts, consultants, or trainees visiting for specific projects." },
              { icon: "👨‍👩-👧", title: "Dependent Pass", desc: "Bringing your immediate family: spouses, children, and elderly parents to reside in Malaysia." },
              { icon: "🏡", title: "Long-Term Social Visit", desc: "Passes for common-law spouses, children over 18, or other eligible long-term dependents." },
              { icon: "🔄", title: "Renewals & Cancellations", desc: "Seamless handling of visa extensions or professional offboarding when employees transition out." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-navy-dark p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border-b-8 border-gold">
              <h4 className="text-xl font-black text-gold mb-4 uppercase tracking-tighter">Visa Assessment</h4>
              <p className="text-blue-100 text-sm font-medium mb-6">Unsure which category fits? Use our AI-powered eligibility checker for instant clarity.</p>
              <a href="#visa-contact" className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-xs tracking-widest hover:bg-white transition-colors">Check Eligibility</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The BizFlow Immigration Roadmap */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">The Immigration Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Phase 1", title: "Eligibility Check", desc: "Reviewing candidate CVs and company financials against latest immigration criteria." },
              { step: "Phase 2", title: "Position Projection", desc: "Securing the 'Quota' or 'Position' approval from ESD or MDEC for the specific role." },
              { step: "Phase 3", title: "Submission", desc: "Meticulous filing of the personal endorsement application via official digital portals." },
              { step: "Phase 4", title: "Endorsement", desc: "Coordinating passport submission and physical sticker collection for final legal status." }
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
      <section className="py-32 bg-slate-50 border-t border-slate-100" id="visa-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl border-2 border-gold/20">
            <h2 className="text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Ready to Hire International Talent?</h2>
            <p className="text-slate-600 text-center mb-12 font-medium">Get your professional visa assessment from our licensed mobility specialists.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Nationality of Candidate" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
                <input type="text" placeholder="Company Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium" />
              </div>
              <div className="space-y-6">
                <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500" placeholder="Expected Start Date" />
                <textarea placeholder="Tell us more about the role and your hiring needs..." className="w-full h-[88px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none"></textarea>
                <button className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm">
                  Request Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmigrationSupport;