import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 400], [1, 1.1]);

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
    <div className="bg-white min-h-screen selection:bg-gold selection:text-navy-dark" ref={containerRef}>
      {/* Hero Header for About Page */}
      <section className="relative bg-[#051622] text-white py-24 sm:py-40 lg:py-56 overflow-hidden min-h-[90vh] flex items-center">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: yHero, scale: scaleHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ 
              backgroundImage: "url('https://i.pinimg.com/1200x/b0/97/fd/b097fd4721f2d2e3ac4fc665d328cc00.jpg')",
            }}
          />
        </motion.div>
        
        {/* Advanced Multi-layered Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#051622] via-[#051622]/80 to-[#051622] z-1"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent z-1"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-2">
          <motion.div 
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-48 h-48 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 60, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-[15%] w-64 h-64 bg-royal-blue/10 rounded-full blur-3xl"
          />
          
          {/* Animated Dots Grid */}
          <div className="absolute top-40 right-[10%] grid grid-cols-4 gap-4 opacity-20">
            {[...Array(16)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-2 h-2 bg-gold rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 text-gold text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-10 shadow-2xl mx-auto"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
              The BizFlow Narrative
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -20 },
                visible: { opacity: 1, y: 0, rotateX: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Pioneering Your <br/>
              <span className="text-gold inline-block hover:scale-105 transition-transform cursor-default">Malaysia Success</span>
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg"
            >
              We aren't just consultants. We are your strategic execution partners, bridging the gap between global ambition and local compliance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Content Section */}
      <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-white">
        {/* Topography Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 250 50 500 100 T 1000 100 M0 200 Q 250 150 500 200 T 1000 200 M0 300 Q 250 250 500 300 T 1000 300' stroke='%23051622' fill='transparent' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}></div>
        
        {/* Decorative Parallax Elements */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
          className="absolute top-40 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          className="absolute bottom-40 left-0 w-96 h-96 bg-royal-blue/5 rounded-full blur-[120px] -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            {/* Left Side (Visuals) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image with Liquid Box Effect */}
              <div className="group relative p-[4px] rounded-[40px] overflow-hidden shadow-2xl z-10 transition-all duration-500">
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[36px] bg-white z-10">
                  <img 
                    src="https://i.pinimg.com/1200x/95/15/92/951592f4a2d51c5a3195039997a306c9.jpg" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="BizFlow Team" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Secondary Image with Rotating Border */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group absolute -bottom-12 -right-6 lg:-right-16 w-[60%] aspect-square p-[4px] rounded-[32px] overflow-hidden shadow-2xl z-20 transition-all duration-500 hidden sm:block"
              >
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-white z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="Consultation" 
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-6 sm:bottom-10 left-[-10px] sm:left-[-30px] bg-navy-dark text-white p-8 sm:p-12 rounded-[32px] shadow-2xl z-30 border border-white/5"
              >
                <p className="text-4xl sm:text-6xl font-black mb-2 leading-none text-gold">
                  <AnimatedCounter target="12+" duration={1500} />
                </p>
                <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-blue-200">Years of Authority</p>
              </motion.div>
            </motion.div>

            {/* Right Side (Content) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10 lg:pl-10 text-center lg:text-left"
            >
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-6"
                >
                  Core Principles
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy-dark leading-[0.9] mb-8 tracking-tighter uppercase"
                >
                  We Execute Our <br className="hidden sm:block"/> Ideas From Start <br className="hidden sm:block"/> To Finish
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-slate-600 text-lg sm:text-xl leading-relaxed font-medium mb-8"
                >
                  BizFlow was founded on the principle that business incorporation should be a catalyst for growth, not a bureaucratic hurdle. In the dynamic Malaysian landscape, speed and compliance are the twin engines of success.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-slate-600 text-lg sm:text-xl leading-relaxed font-medium"
                >
                  Our team of licensed company secretaries, chartered accountants, and immigration specialists work in synergy to provide a 360-degree support ecosystem for foreign founders.
                </motion.p>
              </div>

              {/* Feature List */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.5
                    }
                  }
                }}
                className="space-y-6"
              >
                {[
                  "End-to-End Execution",
                  "Clear Client Guidance",
                  "Strategic & Compliant Planning"
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-6 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-2xl border-2 border-navy-dark/10 flex items-center justify-center text-navy-dark bg-slate-50 group-hover:bg-navy-dark group-hover:text-gold group-hover:border-navy-dark transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-black text-navy-dark text-sm sm:text-base uppercase tracking-widest group-hover:text-gold transition-colors duration-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 pt-8"
              >
                <div className="flex items-center gap-6 bg-navy-dark p-6 pr-12 rounded-[24px] text-white shadow-2xl border-l-8 border-gold hover:scale-105 transition-transform duration-500 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-black leading-none mb-2 text-gold">
                      <AnimatedCounter target="1500+" duration={2500} />
                    </p>
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Successful Cases</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-24 sm:py-32 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-royal-blue font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-4"
            >
              Fast. Trust. Compliant.
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-royal-blue uppercase tracking-tight leading-none"
            >
              Our Basic Work Process
            </motion.h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24"
          >
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
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-4"
              >
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-10 lg:p-12 rounded-[30px] border border-slate-100 flex flex-col items-center text-center shadow-lg group-hover:shadow-2xl transition-all duration-500 z-10">
                  <div className="w-24 h-24 rounded-[24px] bg-navy-dark text-white flex items-center justify-center mb-10 shadow-xl group-hover:bg-royal-blue group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-royal-blue mb-6 leading-snug uppercase tracking-tight group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-base leading-relaxed group-hover:text-slate-700 transition-colors">{item.desc}</p>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-slate-300 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    0{i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-bl-full translate-x-32 -translate-y-32 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
            
            <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left relative z-10">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p className="text-slate-600 font-medium text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl">
                Trusted by hundreds of companies and individuals, Bizflow delivers compliant, practical business solutions in Malaysia. <span className="font-black text-royal-blue">Speak to our team today for professional support you can rely on.</span>
              </p>
            </div>
            <div className="flex items-center gap-8 bg-slate-50 p-8 rounded-[32px] border border-slate-100 w-full lg:w-auto min-w-0 sm:min-w-[350px] justify-center sm:justify-start group/phone hover:bg-navy-dark transition-colors duration-500 relative z-10">
              <div className="w-14 h-14 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 shrink-0 group-hover/phone:border-gold group-hover/phone:text-gold transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-royal-blue font-black text-2xl sm:text-3xl group-hover/phone:text-gold transition-colors">+60 11-2424 4993</span>
                <span className="text-slate-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] group-hover/phone:text-blue-200 transition-colors">Have any Questions?</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Values Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-royal-blue/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 relative">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-4"
            >
              The Pillars of BizFlow
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy-dark uppercase tracking-tighter relative inline-block leading-none"
            >
              Our Core Identity
              <div className="absolute -bottom-6 left-0 w-full h-2 bg-gold rounded-full"></div>
            </motion.h2>
          </div>

          <motion.div 
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
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { 
                title: "Transparency", 
                desc: "No hidden fees, no fine print. You get clear timelines and honest feedback at every stage of your incorporation journey.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )
              },
              { 
                title: "Speed", 
                desc: "In business, time is money. We leverage digital pathways to ensure your operation is live and compliant without bureaucratic delay.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )
              },
              { 
                title: "Excellence", 
                desc: "Every filing and advisory session is conducted to the highest professional standards by licensed mobility and corporate specialists.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                )
              }
            ].map((v, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 50, rotate: -2 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 80,
                      damping: 12
                    }
                  }
                }}
                className="group relative p-[2px] rounded-[48px] overflow-hidden transition-all duration-500 hover:-translate-y-6"
              >
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div 
                  className="relative h-full bg-white p-12 sm:p-16 rounded-[46px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-slate-100 text-center group-hover:border-gold/50 group-hover:shadow-[0_30px_70px_-15px_rgba(212,175,55,0.2)] transition-all duration-500 overflow-hidden z-10"
                >
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                  
                  <div className="w-28 h-28 rounded-[32px] bg-slate-50 text-navy-dark flex items-center justify-center mx-auto mb-12 shadow-sm border border-slate-100 group-hover:bg-navy-dark group-hover:text-gold group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500">
                    {v.icon}
                  </div>
                  
                  <h3 className="text-3xl font-black text-navy-dark uppercase mb-8 tracking-tight group-hover:text-gold transition-colors">
                    {v.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                    {v.desc}
                  </p>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gold group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Strategic FAQ Section */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Watermark Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[200px] sm:text-[400px] font-black uppercase text-navy-dark border-8 sm:border-[16px] border-navy-dark p-20 sm:p-40 rounded-full -rotate-6">ADVISORY</span>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-4 block"
            >
              Clarity on BizFlow
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-royal-blue uppercase tracking-tight leading-none"
            >
              Strategic FAQ
            </motion.h2>
            <div className="w-24 h-2 bg-gold mx-auto mt-8 rounded-full"></div>
          </div>

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
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                className={`border-2 rounded-[32px] transition-all duration-500 ${activeFaq === index ? 'border-gold bg-white shadow-2xl' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 sm:px-12 py-8 sm:py-10 flex items-center justify-between focus:outline-none group"
                >
                  <div className="flex flex-col gap-2 pr-6">
                    <span className="text-[10px] sm:text-[12px] font-black text-gold uppercase tracking-[0.3em] mb-2">Inquiry 0{index + 1}</span>
                    <span className="font-black text-royal-blue uppercase text-sm sm:text-lg lg:text-xl tracking-tight leading-snug group-hover:text-gold transition-colors">{faq.question}</span>
                  </div>
                  <div className={`w-12 h-12 sm:w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${activeFaq === index ? 'border-gold bg-gold text-white rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-gold group-hover:text-gold group-hover:scale-110'}`}>
                    <svg className="w-6 h-6 sm:w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 sm:px-12 pb-10 sm:pb-14 pt-2">
                        <div className="h-px w-full bg-slate-100 mb-8"></div>
                        <p className="text-slate-600 font-medium leading-relaxed text-base sm:text-lg lg:text-xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-24 sm:mt-32 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-1.5 rounded-full bg-slate-100 mb-10 shadow-inner"
            >
                <div className="flex items-center gap-6 px-6 sm:px-10 py-3">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 sm:w-12 h-12 rounded-full border-4 border-white shadow-md" alt="Team"/>)}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Connect with our leadership team</span>
                </div>
            </motion.div>
            <h3 className="text-2xl sm:text-4xl font-black text-royal-blue uppercase tracking-tight mb-12 leading-tight">Still have questions about your <br className="hidden sm:block"/>market entry?</h3>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "#000", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/601124244993" 
              className="inline-flex items-center gap-6 px-10 sm:px-16 py-5 sm:py-8 bg-navy-dark text-gold font-black rounded-[24px] transition-all shadow-2xl uppercase tracking-[0.4em] text-[11px] sm:text-sm w-full sm:w-auto justify-center"
            >
                Speak with a Consultant
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
