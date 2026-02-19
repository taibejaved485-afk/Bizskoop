
import React, { useState } from 'react';

const CompanySecretarial: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "Company Registration",
      question: "How long does it take to register a Sdn Bhd in Malaysia?",
      answer: "With our express service and digital submission through the SSM (Companies Commission of Malaysia) portal, incorporation typically takes between 3 to 5 business days once all documentation and name reservations are verified."
    },
    {
      category: "Director Responsibilities",
      question: "What are the residency requirements for directors in Malaysia?",
      answer: "Under the Companies Act 2016, every company must have at least one director who is 'ordinarily resident' in Malaysia. This means the individual must have a principal place of residence in the country, often verified by a valid work permit (EP), PR status, or citizenship."
    },
    {
      category: "Secretarial Duties",
      question: "What are the mandatory duties of a Company Secretary?",
      answer: "The Company Secretary is the chief compliance officer. Mandatory duties include maintaining statutory registers, preparing board resolutions, filing Annual Returns, lodging financial statements with SSM, and ensuring the company adheres to its constitution and the Companies Act 2016."
    },
    {
      category: "Director Responsibilities",
      question: "What are the fiduciary duties of a company director?",
      answer: "Directors must act in good faith and in the best interests of the company. They are responsible for avoiding conflicts of interest, exercising reasonable care and skill, and ensuring that the company maintains proper accounting records and meets all statutory filing deadlines."
    },
    {
      category: "Company Registration",
      question: "Can a foreign company be 100% foreign-owned in Malaysia?",
      answer: "Yes, many industries allow 100% foreign ownership for a Sdn Bhd. However, certain sectors (like distributive trade) require a WRT license, which has specific paid-up capital requirements—typically RM1,000,000 for foreign-owned entities."
    },
    {
      category: "Secretarial Duties",
      question: "What happens if a company fails to appoint a Secretary?",
      answer: "Failure to appoint a Company Secretary within 30 days of incorporation is a breach of the Companies Act. This can lead to significant compound fines from SSM and may result in the company being struck off the register if the non-compliance persists."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const expertiseItems = [
    { 
      title: "Name Search", 
      desc: "Checking and reserving your preferred company name with SSM authorities.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      title: "Incorporation", 
      desc: "End-to-end Sdn. Bhd. and LLP company formation with digital speed.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      title: "Doc Preparation", 
      desc: "Crafting all necessary statutory documents, resolutions, and filings.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      title: "Appointments", 
      desc: "Formal appointment of directors and licensed qualified secretaries.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: "LHDN Registration", 
      desc: "Securing your Income Tax and Employer numbers immediately post-setup.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: "Annual Filing", 
      desc: "Managing Annual Returns, AGMs, and statutory financial submissions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Elite <br/>
              <span className="text-gold">Company Secretarial</span> <br/>
              & Compliance
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              We provide the mandatory statutory backbone for your Malaysian enterprise. 100% compliant, audit-ready, and strategically managed by licensed professionals.
            </p>
            <div className="flex gap-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a href="#secretarial-contact" className="px-10 py-5 bg-gold text-navy-dark font-black rounded-lg hover:bg-white transition shadow-xl uppercase tracking-widest text-sm">
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why It Matters Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative animate-fadeIn">
              <div className="relative z-10">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071" 
                  className="rounded-[40px] shadow-2xl border-b-8 border-gold w-full object-cover aspect-[4/3]" 
                  alt="Corporate Boardroom" 
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-navy-dark/5 rounded-full blur-3xl -z-10"></div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Strategic Foundation</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-royal-blue mb-8 uppercase tracking-tight leading-tight">
                Why Corporate <br/>Governance Matters.
              </h3>
              <p className="text-slate-600 font-medium mb-10 leading-relaxed text-lg">
                Maintaining a compliant corporate structure isn't just a legal requirement—it's a prerequisite for trust with banks, investors, and authorities. We ensure your statutory framework is impenetrable.
              </p>
              
              <ul className="space-y-8">
                {[
                  { title: "SSM Compliance", desc: "Timely statutory filings of Annual Returns and Financial Statements to avoid legal penalties and maintain an 'Active' company status." },
                  { title: "Corporate Governance", desc: "Maintaining the integrity of statutory registers, minutes of meetings, and board resolutions with surgical precision." },
                  { title: "Ongoing Support", desc: "Direct, real-time advisory on boardroom decisions, share structure changes, and long-term compliance strategy." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-1 text-gold group-hover:bg-gold group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-royal-blue uppercase text-sm mb-1 tracking-wider">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scope of Expertise */}
      <section className="py-32 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-gold font-black text-xs uppercase tracking-[0.5em] mb-4">Strategic Domains</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-royal-blue uppercase tracking-tighter">Scope of Expertise</h3>
            <div className="w-24 h-1.5 bg-gold mx-auto mt-6 rounded-full shadow-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseItems.map((s, i) => (
              <div key={i} className="group relative bg-white p-10 lg:p-12 rounded-[32px] shadow-sm border border-slate-100 hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(0,51,102,0.1)] transition-all duration-500 cursor-default">
                <div className="absolute top-8 right-10 text-6xl font-black text-slate-200 select-none group-hover:text-gold/15 transition-colors">0{i+1}</div>
                <div className="w-16 h-16 rounded-2xl bg-royal-blue/5 flex items-center justify-center text-royal-blue mb-10 group-hover:bg-gold group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm relative z-10">
                  {s.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-black text-royal-blue mb-4 uppercase tracking-tight group-hover:text-gold transition-colors">{s.title}</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                    {s.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-10 right-10 h-1 bg-transparent group-hover:bg-gold transition-all duration-500 rounded-t-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Execution Roadmap - FIXED OVERLAP */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-royal-blue mb-16 text-center uppercase tracking-widest">Our Execution Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Requirements", desc: "Deep dive into your regulatory goals and business structure." },
              { step: "02", title: "Preparation", desc: "Verification and drafting of all mandated forms and submissions." },
              { step: "03", title: "Submission", desc: "Direct handling of authorities and management of clarifications." },
              { step: "04", title: "Approval", desc: "Ongoing support for renewals, compliance, and legal guidance." }
            ].map((p, i) => (
              <div key={i} className="group relative p-[2px] rounded-[34px] overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="liquid-box relative h-full p-10 bg-[#081b2a] text-white rounded-[32px] border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden z-10">
                  <div className="liquid-wave"></div>
                  {/* Decorative Number (Background Overlay) */}
                  <div className="absolute -top-4 -right-2 text-9xl font-black text-white/[0.1] select-none group-hover:text-gold/10 transition-colors duration-500 pointer-events-none">
                    {p.step}
                  </div>
                  
                  <div className="w-12 h-1 bg-gold mb-8 rounded-full group-hover:w-20 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-gold">{p.title}</h4>
                    <p className="text-blue-100/70 text-sm font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.01] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[400px] font-black uppercase text-navy-dark border-8 border-navy-dark p-20 rounded-full rotate-12">SSM</span>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Common Enquiries</h2>
            <h3 className="text-4xl font-black text-royal-blue uppercase tracking-tight">Governance & Registration FAQ</h3>
            <div className="w-16 h-1 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-2 rounded-2xl transition-all duration-300 ${activeFaq === index ? 'border-gold bg-white shadow-xl' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest">{faq.category}</span>
                    <span className="font-black text-royal-blue uppercase text-sm tracking-tight">{faq.question}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeFaq === index ? 'border-gold bg-gold text-white rotate-180' : 'border-slate-200 text-slate-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="h-px w-full bg-slate-100 mb-6"></div>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6">Have more specific questions?</p>
            <a href="https://wa.me/601124244993" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-black rounded-xl hover:scale-105 transition-all shadow-lg uppercase tracking-widest text-xs">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat With An Expert
            </a>
          </div>
        </div>
      </section>

      {/* 6. Lead Gen Footer */}
      <section className="py-32 bg-white relative" id="secretarial-contact">
        <div className="absolute inset-0 bg-[#051622] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row bg-[#081b2a] rounded-[50px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/5 group">
            
            <div className="lg:w-2/5 p-12 lg:p-20 bg-gradient-to-br from-navy-dark to-[#081b2a] border-r border-white/5 relative flex flex-col justify-center">
              <div className="absolute top-10 left-10 w-24 h-24 bg-gold/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 border border-gold/20 shadow-lg shadow-gold/5 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                  The <span className="text-gold">BizFlow</span> <br/>Guarantee.
                </h2>
                <p className="text-blue-100/60 text-lg font-medium mb-12 leading-relaxed">
                  We handle the complex statutory hurdles of Malaysian compliance so you don't have to. Direct access to experts, not bots.
                </p>
                <div className="space-y-6">
                  {["100% Data Confidentiality", "Licensed Secretarial Unit", "2-Hour Response Time", "No Hidden Retainer Fees"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest opacity-80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-12 lg:p-20 relative">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="max-w-xl mx-auto relative z-10">
                <h3 className="text-white font-black text-xl uppercase tracking-widest mb-10 flex items-center gap-4">
                  <span className="w-10 h-1 bg-gold"></span>
                  Start Your Inquiry
                </h3>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Full Legal Name</label>
                      <input type="text" placeholder="Johnathan Doe" className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg" />
                    </div>
                    <div className="relative group">
                      <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Professional Email</label>
                      <input type="email" placeholder="john@company.com" className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg" />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Direct Phone / WhatsApp</label>
                    <input type="tel" placeholder="+60 12 345 6789" className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg" />
                  </div>
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Requirement Specifics</label>
                    <textarea placeholder="e.g. Need help with SSM audit backlog..." className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg resize-none h-24"></textarea>
                  </div>
                  <div className="pt-8">
                    <button className="w-full py-6 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white hover:scale-[1.02] transition-all shadow-2xl shadow-gold/20 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 group/btn">
                      Get Expert Consultation
                      <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                    <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                      <span className="h-px w-10 bg-white/50"></span>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Response within 60-120 mins</span>
                      <span className="h-px w-10 bg-white/50"></span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanySecretarial;
