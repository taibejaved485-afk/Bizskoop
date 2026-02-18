
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header for About Page */}
      <section className="relative bg-[#051622] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 250 50 500 100 T 1000 100 M0 200 Q 250 150 500 200 T 1000 200' stroke='white' fill='transparent' stroke-width='2'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-accent-yellow font-black text-xs uppercase tracking-[0.5em] block mb-6 animate-fadeIn">The BizFlow Narrative</span>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
            Pioneering Your <br/>
            <span className="text-accent-yellow">Malaysia Success</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            We aren't just consultants. We are your strategic execution partners, bridging the gap between global ambition and local compliance.
          </p>
        </div>
      </section>

      {/* Premium Content Section */}
      <section id="about" className="relative py-24 overflow-hidden bg-white">
        {/* Topography Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 250 50 500 100 T 1000 100 M0 200 Q 250 150 500 200 T 1000 200 M0 300 Q 250 250 500 300 T 1000 300' stroke='%23051622' fill='transparent' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Side (Visuals) */}
            <div className="relative animate-fadeIn">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl z-10 border-4 border-white">
                <img 
                  src="https://i.pinimg.com/1200x/95/15/92/951592f4a2d51c5a3195039997a306c9.jpg" 
                  className="w-full h-full object-cover" 
                  alt="BizFlow Team" 
                />
              </div>
              <div className="absolute -bottom-10 -right-4 lg:-right-10 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white hidden sm:block">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Consultation" 
                />
              </div>
              <div className="absolute bottom-10 left-[-20px] bg-[#051622] text-white p-6 lg:p-10 rounded-2xl shadow-2xl z-30">
                <p className="text-4xl lg:text-5xl font-black mb-1 leading-none">12+</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">Experiences</p>
              </div>
            </div>

            {/* Right Side (Content) */}
            <div className="space-y-8 lg:pl-10">
              <div>
                <span className="text-[#051622] font-black text-xs uppercase tracking-[0.4em] block mb-4">Core Principles</span>
                <h2 className="text-4xl lg:text-6xl font-black text-[#051622] leading-[1.1] mb-8 tracking-tighter uppercase">
                  We Execute Our <br/> Ideas From Start <br/> To Finish
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-6">
                  BizFlow was founded on the principle that business incorporation should be a catalyst for growth, not a bureaucratic hurdle. In the dynamic Malaysian landscape, speed and compliance are the twin engines of success.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  Our team of licensed company secretaries, chartered accountants, and immigration specialists work in synergy to provide a 360-degree support ecosystem for foreign founders.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                {[
                  "End-to-End Execution",
                  "Clear Client Guidance",
                  "Strategic & Compliant Planning"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-5 group">
                    <div className="w-6 h-6 rounded-full border border-[#051622]/20 flex items-center justify-center text-[#051622] bg-slate-50">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-[#051622] text-sm uppercase tracking-widest">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats Card */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 pt-6">
                <div className="flex items-center gap-5 bg-[#051622] p-5 pr-10 rounded-xl text-white shadow-2xl border-l-4 border-[#E91E63]">
                  <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-7 h-7 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-black leading-none mb-1">1500+</p>
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Successful Cases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-royal-blue font-black text-xs uppercase tracking-[0.4em] block mb-2">Fast. Trust. Compliant.</span>
            <h2 className="text-4xl lg:text-6xl font-black text-royal-blue uppercase tracking-tight">Our Basic Work Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Understand Your Requirements",
                desc: "We review your business goals, industry, and regulatory needs to determine the correct structure and approvals.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                )
              },
              {
                title: "Plan & Prepare Documentation",
                desc: "Our team prepares and verifies all forms, submissions, and supporting documents to meet compliance standards.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" /></svg>
                )
              },
              {
                title: "Submission & Follow-Up",
                desc: "We handle submissions with relevant authorities and manage follow-ups, clarifications, and approvals on your behalf.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                )
              },
              {
                title: "Approval & Ongoing Support",
                desc: "Once approved, we provide guidance on renewals, compliance, and next steps to keep your business running smoothly.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.758a1 1 0 01.707.293l1.242 1.242a1 1 0 010 1.414l-8.742 8.742a1 1 0 01-1.414 0l-5.742-5.742a1 1 0 010-1.414l1.242-1.242a1 1 0 01.707-.293H10M14 10V6a2 2 0 00-2-2H8a2 2 0 00-2 2v4m8 0H6" /></svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-navy-dark text-white flex items-center justify-center mb-8 shadow-xl group-hover:bg-royal-blue transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-royal-blue mb-4 leading-snug uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p className="text-slate-500 font-medium text-lg lg:text-xl leading-relaxed max-w-2xl">
                Trusted by hundreds of companies and individuals, Bizflow delivers compliant, practical business solutions in Malaysia. <span className="font-black text-royal-blue">Speak to our team today for professional support you can rely on.</span>
              </p>
            </div>
            <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 min-w-[300px]">
              <div className="w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-royal-blue font-black text-2xl">+60 11-2424 4993</span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Have any Questions?</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black text-[#051622] uppercase tracking-tighter">Our Core Identity</h2>
          <div className="w-20 h-1.5 bg-[#E91E63] mx-auto mt-4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-10">
          {[
            { title: "Transparency", desc: "No hidden fees, no fine print. You get clear timelines and honest feedback." },
            { title: "Speed", desc: "In business, time is money. We move fast to ensure your operation is live without delay." },
            { title: "Excellence", desc: "Every filing and every advisory session is conducted to the highest professional standards." }
          ].map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center">
              <h3 className="text-xl font-black text-[#051622] uppercase mb-4 tracking-tight">{v.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
