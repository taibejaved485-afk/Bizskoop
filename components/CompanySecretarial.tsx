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

      {/* 2. Why It Matters Section (Side-by-Side) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Image on the Left */}
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
            
            {/* Text on the Right */}
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
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-royal-blue uppercase tracking-tighter">Scope of Expertise</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🔍", title: "Name Search", desc: "Checking and reserving your preferred company name with SSM." },
              { icon: "🏢", title: "Incorporation", desc: "End-to-end Sdn. Bhd. and LLP company formation services." },
              { icon: "📑", title: "Doc Preparation", desc: "Crafting all necessary statutory documents and filings." },
              { icon: "👔", title: "Appointments", desc: "Formal appointment of directors and qualified secretaries." },
              { icon: "🏦", title: "LHDN Registration", desc: "Securing your Income Tax and Employer numbers immediately." },
              { icon: "📊", title: "Annual Filing", desc: "Managing Annual Returns, AGMs, and statutory submissions." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-gold transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h4 className="text-lg font-black text-royal-blue mb-3 uppercase tracking-tight">{s.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Execution Roadmap */}
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
              <div key={i} className="relative p-8 bg-navy-dark text-white rounded-2xl border-b-4 border-gold shadow-2xl">
                <span className="text-5xl font-black text-gold/20 absolute top-4 right-4">{p.step}</span>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-gold">{p.title}</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section (Expanded) */}
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
      <section className="py-32 bg-white" id="secretarial-contact">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#051622] p-12 lg:p-16 rounded-[40px] shadow-2xl border-4 border-gold/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-0"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black mb-4 text-center uppercase tracking-tight">Ready to Start or Expand?</h2>
              <p className="text-blue-100 text-center mb-12 font-medium opacity-80">Get a 100% free consultation with our licensed company secretarial unit.</p>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Full Name</label>
                    <input type="text" placeholder="Johnathan Doe" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none font-medium text-white transition-all" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Email Address</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none font-medium text-white transition-all" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Phone Number</label>
                    <input type="tel" placeholder="+60 12..." className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none font-medium text-white transition-all" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="group h-full flex flex-col">
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Requirement Details</label>
                    <textarea placeholder="Tell us about your company needs..." className="w-full flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none font-medium text-white resize-none transition-all min-h-[148px]"></textarea>
                  </div>
                  <button className="w-full py-5 bg-gold text-navy-dark font-black rounded-xl hover:bg-white transition-all shadow-xl uppercase tracking-widest text-sm transform hover:-translate-y-1">
                    Get Free Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanySecretarial;