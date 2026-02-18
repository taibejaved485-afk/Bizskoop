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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
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

      {/* Corporate Values */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
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