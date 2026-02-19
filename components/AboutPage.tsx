
import React, { useState } from 'react';

const AboutPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What exactly does BizFlow do for international entrepreneurs?",
      answer: "BizFlow acts as a strategic launchpad. We handle the entire spectrum of business setup in Malaysia—from initial SSM company incorporation and licensed secretarial duties to securing specialized business permits (WRT, CIDB) and handling complex Employment Pass (EP) applications for expatriate talent."
    },
    {
      question: "Why should I choose BizFlow over other Malaysian consultancies?",
      answer: "Unlike generalist agencies, we are specialized 'Execution Partners.' We combine high-level strategic advisory with direct authorization to handle ESD, MDEC, and SSM portals. Our methodology focuses on speed, zero-friction compliance, and transparent pricing—no hidden retainers or fine print."
    },
    {
      question: "What industries does BizFlow specialize in?",
      answer: "We have deep expertise in Tech & Digital Economy (MDEC/MD Status), Retail & Wholesale (WRT Licensing), Manufacturing (MIDA incentives), and Professional Services. Our team is equipped to navigate the specific regulatory requirements of over 25 distinct industry sectors in Malaysia."
    },
    {
      question: "How does BizFlow ensure 100% compliance with Malaysian authorities?",
      answer: "Our units are led by licensed professionals—Company Secretaries registered with SSM, Chartered Accountants with MIA, and authorized immigration agents. We conduct rigorous internal audits before any submission to authorities like LHDN, ESD, or local municipal councils to ensure a 98% first-time approval rate."
    },
    {
      question: "Does BizFlow support businesses outside of Kuala Lumpur?",
      answer: "Yes. While our headquarters is in KL City Centre (Menara Binjai), we manage federal and state compliance for businesses across all of Malaysia, including Selangor (Petaling Jaya, Shah Alam), Johor, and Penang. Our digital-first approach allows us to serve clients from over 40 countries remotely."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
                  <div key={idx} className="flex items-center gap-5 group cursor-default">
                    <div className="w-8 h-8 rounded-full border-2 border-[#051622]/10 flex items-center justify-center text-[#051622] bg-slate-50 group-hover:bg-[#051622] group-hover:text-white group-hover:border-[#051622] transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-[#051622] text-sm uppercase tracking-widest group-hover:text-royal-blue transition-colors duration-300">{feature}</span>
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
              <div key={i} className="group relative p-[2px] rounded-[26px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-8 lg:p-10 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-lg group-hover:shadow-2xl transition-all duration-500 z-10">
                  <div className="w-20 h-20 rounded-full bg-navy-dark text-white flex items-center justify-center mb-8 shadow-xl group-hover:bg-royal-blue group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-royal-blue mb-4 leading-snug uppercase tracking-tight group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed group-hover:text-slate-700 transition-colors">{item.desc}</p>
                </div>
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

      {/* Corporate Values Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-royal-blue/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative">
            <span className="text-gold font-black text-xs uppercase tracking-[0.6em] block mb-3">The Pillars of BizFlow</span>
            <h2 className="text-4xl lg:text-6xl font-black text-[#051622] uppercase tracking-tighter relative inline-block">
              Our Core Identity
              <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-[#E91E63] rounded-full"></div>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "Transparency", 
                desc: "No hidden fees, no fine print. You get clear timelines and honest feedback at every stage of your incorporation journey.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )
              },
              { 
                title: "Speed", 
                desc: "In business, time is money. We leverage digital pathways to ensure your operation is live and compliant without bureaucratic delay.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )
              },
              { 
                title: "Excellence", 
                desc: "Every filing and advisory session is conducted to the highest professional standards by licensed mobility and corporate specialists.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                )
              }
            ].map((v, i) => (
              <div key={i} className="group relative p-[2px] rounded-[42px] overflow-hidden transition-all duration-500 hover:-translate-y-3">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div 
                  className="relative h-full bg-white p-12 rounded-[40px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 text-center group-hover:border-gold/50 group-hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden z-10"
                >
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                  
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 text-[#051622] flex items-center justify-center mx-auto mb-10 shadow-sm border border-slate-100 group-hover:bg-[#051622] group-hover:text-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {v.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#051622] uppercase mb-6 tracking-tight group-hover:text-gold transition-colors">
                    {v.title}
                  </h3>
                  
                  <p className="text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                    {v.desc}
                  </p>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gold group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic FAQ Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle Watermark Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[300px] font-black uppercase text-navy-dark border-8 border-navy-dark p-20 rounded-full -rotate-6">ADVISORY</span>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4 block">Clarity on BizFlow</span>
            <h2 className="text-4xl lg:text-5xl font-black text-royal-blue uppercase tracking-tight">Strategic FAQ</h2>
            <div className="w-16 h-1.5 bg-gold mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-2 rounded-[24px] transition-all duration-300 ${activeFaq === index ? 'border-gold bg-white shadow-2xl' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-7 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Inquiry 0{index + 1}</span>
                    <span className="font-black text-royal-blue uppercase text-sm tracking-tight leading-snug">{faq.question}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${activeFaq === index ? 'border-gold bg-gold text-white rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-gold group-hover:text-gold'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-10 pt-2">
                    <div className="h-px w-full bg-slate-100 mb-6"></div>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm lg:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="inline-block p-1 rounded-full bg-slate-100 mb-8">
                <div className="flex items-center gap-4 px-6 py-2">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Team"/>)}
                    </div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Connect with our leadership team</span>
                </div>
            </div>
            <h3 className="text-2xl font-black text-royal-blue uppercase tracking-tight mb-8">Still have questions about your <br/>market entry?</h3>
            <a href="https://wa.me/601124244993" className="inline-flex items-center gap-4 px-12 py-6 bg-navy-dark text-gold font-black rounded-2xl hover:bg-black hover:scale-105 transition-all shadow-2xl uppercase tracking-[0.3em] text-xs">
                Speak with a Consultant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
