import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const BusinessLicensing: React.FC = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Navy & Gold) */}
      <section 
        className="relative bg-navy-dark text-white py-20 sm:py-32 overflow-hidden bg-cover bg-center bg-no-repeat min-h-[70vh] flex items-center"
      >
        <motion.div 
          style={{ y: yHero }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.pinimg.com/1200x/b0/97/fd/b097fd4721f2d2e3ac4fc665d328cc00.jpg" 
            className="w-full h-full object-cover"
            alt="Background"
          />
        </motion.div>
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-navy-dark/80 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4 z-0"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="max-w-3xl text-center sm:text-left"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tighter uppercase"
            >
              Navigate Malaysian <br className="hidden sm:block"/>
              <span className="text-gold">Business Licensing</span> <br className="hidden sm:block"/>
              With Ease
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-base sm:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed font-medium"
            >
              From general trade licenses to industry-specific permits, we handle the bureaucracy so you can start operating faster. Total compliance, zero guesswork.
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex justify-center sm:justify-start gap-6"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#licensing-contact" 
                className="px-8 sm:px-10 py-4 sm:py-5 bg-gold text-navy-dark font-black rounded-lg hover:bg-white transition shadow-xl uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto text-center"
              >
                Check License Requirements
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why Licensing is Crucial Section */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
            >
              <h2 className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4">Operational Compliance</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-royal-blue mb-6 sm:mb-8 uppercase tracking-tight">Protect Your <br className="hidden sm:block"/>Business Assets.</h3>
              <p className="text-slate-600 font-medium mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
                Operating without the correct permits in Malaysia can lead to heavy fines, legal action, or immediate business closure. Every sector has unique requirements—from federal ministries to local municipal councils. We provide expert guidance on which federal and state licenses your specific business needs to thrive legally.
              </p>
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="space-y-6 text-left"
              >
                {[
                  { title: "WRT Licenses", desc: "Mandatory Wholesale, Retail, and Trade licenses for foreign-owned entities in Malaysia." },
                  { title: "CIDB & Manufacturing", desc: "Specialized registrations for construction and industrial manufacturing operations." },
                  { title: "Tourism & MOTAC", desc: "Assisting travel agencies and hospitality businesses in securing Ministry permits." }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex gap-4 sm:gap-6 items-start group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-1 text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-royal-blue uppercase text-xs sm:text-sm mb-1 tracking-wider">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-1 lg:order-2 w-full"
            >
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 sm:w-24 h-20 sm:h-24 bg-gold/10 rounded-2xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070" 
                  className="rounded-2xl sm:rounded-3xl shadow-2xl border-t-4 sm:border-t-8 border-gold w-full object-cover" 
                  alt="Government Document Review" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Licensing Support Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-royal-blue uppercase tracking-tighter">Strategic Permit Solutions</h2>
            <div className="w-16 sm:w-20 h-1.5 bg-gold mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { icon: "📜", title: "General Business License", desc: "Foundational permits (Premise & Signboard) required from local councils (DBKL, MBPJ, etc.) for every office or retail shop." },
              { icon: "🌍", title: "WRT License", desc: "Critical for foreign investors in retail, wholesale, or distribution sectors. We handle the 100% foreign ownership compliance checks." },
              { icon: "🍱", title: "Industry Specific Permits", desc: "Specialized licensing for highly regulated sectors including F&B (Halal/Liquor), Medical devices, and Private Education." },
              { icon: "🏢", title: "MIDA & MDEC Status", desc: "Applying for Pioneer Status or Tax Incentives for tech (MSC) and high-impact manufacturing projects." },
              { icon: "🤝", title: "Professional Bodies", desc: "Assisting doctors, architects, and engineers in registering with respective Malaysian boards and professional councils." }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div 
                  className="liquid-box relative h-full bg-white p-8 sm:p-10 rounded-[30px] border border-slate-100 shadow-sm transition-all duration-500 z-10 flex flex-col"
                  style={{ '--fill-color': 'rgba(0, 51, 102, 0.02)' } as React.CSSProperties}
                >
                  <div className="liquid-wave"></div>
                  <div className="text-3xl sm:text-4xl mb-6 group-hover:scale-110 transition-transform inline-block relative z-10">{s.icon}</div>
                  <h4 className="text-base sm:text-lg font-black text-royal-blue mb-3 uppercase tracking-tight group-hover:text-gold transition-colors relative z-10">{s.title}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-sm font-medium leading-relaxed relative z-10">{s.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="group relative p-[2px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Rotating Glow Layer */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-navy-dark p-8 sm:p-10 rounded-[22px] sm:rounded-[30px] shadow-xl flex flex-col justify-center items-center text-center border-b-4 sm:border-b-8 border-gold z-10">
                <h4 className="text-lg sm:text-xl font-black text-gold mb-4 uppercase tracking-tighter relative z-10">Compliance Check</h4>
                <p className="text-blue-100 text-[11px] sm:text-sm font-medium mb-6 relative z-10">Unsure about your license requirements? Get a full audit of your business activity.</p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#licensing-contact" 
                  className="px-6 py-3 bg-gold text-navy-dark font-black rounded-lg uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white transition-colors relative z-10 w-full sm:w-auto"
                >
                  Start Audit
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. The BizFlow Approval Process */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-black text-royal-blue mb-12 sm:mb-16 text-center uppercase tracking-widest"
          >
            The Approval Roadmap
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { step: "Step 1", title: "Gap Analysis", desc: "Strategic review of your business activity against current Malaysian regulations and federal laws." },
              { step: "Step 2", title: "Doc Preparation", desc: "Meticulous gathering of tenancy agreements, floor plans, company profiles, and safety certifications." },
              { step: "Step 3", title: "Liaison & Submission", desc: "Direct representation with ministries and local agencies to expedite queries and handle clarifications." },
              { step: "Step 4", title: "License Issuance", desc: "Rigorous monitoring of progress until your permit is officially active and displayed at your premise." }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative p-[2px] rounded-[24px] sm:rounded-[34px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div 
                  className="liquid-box relative h-full bg-navy-dark p-8 rounded-[22px] sm:rounded-[32px] border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden z-10"
                  style={{ '--fill-color': 'rgba(212, 175, 55, 0.05)' } as React.CSSProperties}
                >
                  <div className="liquid-wave"></div>
                  <span className="text-[10px] sm:text-xs font-black text-gold uppercase tracking-widest absolute top-4 right-4 z-20">{p.step}</span>
                  <h4 className="text-lg sm:text-xl font-black mb-4 uppercase tracking-tighter text-gold mt-2 relative z-20">{p.title}</h4>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed relative z-20">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-16 sm:py-32 bg-slate-50 border-t border-slate-100" id="licensing-contact">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-12 lg:p-16 rounded-[30px] sm:rounded-[40px] shadow-2xl border-2 border-gold/20"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-royal-blue mb-4 text-center uppercase tracking-tight">Not Sure Which License You Need?</h2>
            <p className="text-slate-600 text-center mb-10 sm:mb-12 font-medium text-sm sm:text-base">Don't risk operating illegally. Get an expert opinion on your licensing roadmap.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm transition-all" />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="text" placeholder="Business Industry (e.g. Retail, SaaS)" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm transition-all" />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-sm transition-all" />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <motion.textarea 
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Tell us about your business activity and planned location..." className="w-full h-[156px] px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none text-sm transition-all"></motion.textarea>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-[10px] sm:text-xs"
                >
                  Check My Requirements
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BusinessLicensing;