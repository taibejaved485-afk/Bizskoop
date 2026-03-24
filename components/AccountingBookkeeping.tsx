import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import AnimatedCounter from './AnimatedCounter.tsx';

const AccountingBookkeeping: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for Hero
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 400], [1, 1.1]);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s+]{10,}$/.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: '', phone: '' };
    let isValid = true;

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid professional email format.';
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format (min 10 digits).';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const faqs = [
    {
      category: "Accounting Standards",
      question: "Which accounting standards do you follow in Malaysia?",
      answer: "We strictly adhere to the Malaysian Private Entities Reporting Standards (MPERS) and the Malaysian Financial Reporting Standards (MFRS), ensuring your financial statements are fully compliant with the Companies Act 2016 and LHDN requirements."
    },
    {
      category: "Tax Compliance",
      question: "How does bookkeeping affect my corporate tax filing?",
      answer: "Accurate, real-time bookkeeping is the foundation of tax compliance. Properly categorized expenses and reconciled accounts ensure you maximize legitimate tax deductions while avoiding penalties during LHDN audits."
    },
    {
      category: "Software & Tools",
      question: "Do you support cloud accounting software like Xero or QuickBooks?",
      answer: "Yes, we are certified partners for major cloud platforms including Xero, QuickBooks Online, and SQL Accounting. Cloud integration allows for real-time financial visibility and seamless collaboration between your team and our accountants."
    },
    {
      category: "Reporting Frequency",
      question: "How often will I receive financial reports?",
      answer: "Depending on your business needs, we provide monthly, quarterly, or bi-annual management accounts. These include Profit & Loss statements, Balance Sheets, Cash Flow statements, and Aged Receivables/Payables reports."
    },
    {
      category: "Audit Readiness",
      question: "Can you help prepare our accounts for the annual statutory audit?",
      answer: "Absolutely. We specialize in 'Audit-Ready' bookkeeping. We prepare the full audit file, including all necessary schedules and reconciliations, and liaise directly with your external auditors to ensure a smooth and efficient audit process."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const expertiseItems = [
    { 
      title: "Full-Set Accounting", 
      desc: "Comprehensive management of General Ledger, Accounts Payable, and Accounts Receivable.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: "Bank Reconciliation", 
      desc: "Ensuring every transaction in your bank statement matches your internal records perfectly.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    { 
      title: "Management Reports", 
      desc: "Detailed P&L, Balance Sheets, and Cash Flow analysis for strategic decision making.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      title: "Payroll Management", 
      desc: "Accurate salary calculations, EPF, SOCSO, and EIS contributions with PCB filings.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: "SST Filing", 
      desc: "Expert Sales and Service Tax (SST) computation and bi-monthly submission to Customs.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: "Audit Liaison", 
      desc: "Preparing audit schedules and coordinating with external auditors for year-end finalization.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-gold selection:text-navy-dark" ref={containerRef}>
      {/* 1. Hero Section */}
      <section className="relative bg-[#051622] text-white py-24 sm:py-40 lg:py-56 overflow-hidden min-h-[90vh] flex items-center">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: yHero, scale: scaleHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=2070')",
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
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
            className="max-w-4xl"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 text-gold text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-10 shadow-2xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
              Financial Precision
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -20 },
                visible: { opacity: 1, y: 0, rotateX: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Strategic <br/>
              <span className="text-gold">Accounting</span> <br/>
              & Bookkeeping
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100 max-w-3xl leading-relaxed font-medium drop-shadow-lg mb-12"
            >
              Transform your financial data into a strategic asset. We provide real-time, audit-ready bookkeeping and expert accounting services for Malaysian SMEs.
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#051622" }}
                whileTap={{ scale: 0.95 }}
                href="#accounting-contact" 
                className="px-10 py-5 bg-gold text-navy-dark font-black rounded-2xl transition shadow-2xl uppercase tracking-[0.3em] text-xs text-center"
              >
                Get Started
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="#expertise" 
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl transition shadow-2xl uppercase tracking-[0.3em] text-xs text-center"
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why It Matters Section */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              {/* Main Image with Liquid Box Effect */}
              <div className="group relative p-[4px] rounded-[40px] overflow-hidden shadow-2xl z-10 transition-all duration-500">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[36px] bg-white z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2072" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="Accounting Professional" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -left-10 w-40 h-40 border-2 border-gold/20 rounded-full border-dashed -z-10"
              />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-navy-dark/5 rounded-full blur-3xl -z-10"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <motion.span 
                className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-6"
              >
                Financial Integrity
              </motion.span>
              <motion.h3 
                className="text-4xl lg:text-7xl font-black text-navy-dark mb-10 uppercase tracking-tighter leading-[0.9]"
              >
                Beyond Just <br/>Number Crunching.
              </motion.h3>
              <motion.p 
                className="text-slate-600 font-medium mb-12 leading-relaxed text-lg sm:text-xl"
              >
                Accurate financial records are the lifeblood of any successful business. We don't just record transactions; we provide the insights you need to scale with confidence.
              </motion.p>
              
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.4
                    }
                  }
                }}
                className="space-y-10"
              >
                {[
                  { title: "Real-Time Visibility", desc: "Access your financial health anytime, anywhere with our cloud-integrated accounting solutions." },
                  { title: "Audit-Ready Accuracy", desc: "Meticulous record-keeping that makes your annual statutory audit a seamless, stress-free process." },
                  { title: "Strategic Tax Planning", desc: "Proactive bookkeeping that ensures you're always optimized for tax efficiency and fully compliant." }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex gap-8 items-start group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 mt-1 text-navy-dark group-hover:bg-navy-dark group-hover:text-gold group-hover:border-navy-dark group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-black text-navy-dark uppercase text-base mb-2 tracking-wider group-hover:text-gold transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-base leading-relaxed group-hover:text-slate-700 transition-colors">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Scope of Expertise */}
      <section id="expertise" className="py-24 sm:py-32 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.span 
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-4"
            >
              Our Solutions
            </motion.span>
            <motion.h3 
              className="text-4xl lg:text-7xl font-black text-navy-dark uppercase tracking-tighter leading-none"
            >
              Accounting Expertise
            </motion.h3>
            <div className="w-24 h-2 bg-gold mx-auto mt-8 rounded-full shadow-lg"></div>
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
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {expertiseItems.map((s, i) => (
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
                className="group relative p-[2px] rounded-[40px] overflow-hidden transition-all duration-500 hover:-translate-y-4"
              >
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-12 lg:p-16 rounded-[38px] border border-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-[24px] bg-navy-dark text-white flex items-center justify-center mb-10 group-hover:bg-royal-blue group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 shadow-xl">
                    {s.icon}
                  </div>
                  <h4 className="text-2xl font-black text-navy-dark mb-6 uppercase tracking-tight group-hover:text-gold transition-colors leading-tight">{s.title}</h4>
                  <p className="text-slate-500 text-base font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                    {s.desc}
                  </p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gold group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-4 block"
            >
              Common Enquiries
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-royal-blue uppercase tracking-tight leading-none"
            >
              Accounting FAQ
            </motion.h2>
            <div className="w-24 h-2 bg-gold mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`border-2 rounded-[32px] transition-all duration-500 ${activeFaq === index ? 'border-gold bg-white shadow-2xl' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 sm:px-12 py-8 sm:py-10 flex items-center justify-between focus:outline-none group"
                >
                  <div className="flex flex-col gap-2 pr-6">
                    <span className="text-[10px] sm:text-[12px] font-black text-gold uppercase tracking-[0.3em] mb-2">{faq.category}</span>
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
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-32 bg-white relative" id="accounting-contact">
        <div className="absolute inset-0 bg-[#051622] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row bg-[#081b2a] rounded-[50px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/5 group"
          >
            <div className="lg:w-2/5 p-12 lg:p-20 bg-gradient-to-br from-navy-dark to-[#081b2a] border-r border-white/5 relative flex flex-col justify-center">
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 border border-gold/20 shadow-lg shadow-gold/5 transition-transform duration-500"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2v14a2 2 0 002 2z" /></svg>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                  Financial <br/><span className="text-gold">Clarity</span> Starts Here.
                </h2>
                <p className="text-blue-100/60 text-lg font-medium mb-12 leading-relaxed">
                  Stop worrying about the back-office. Let our experts handle your accounting while you focus on growth.
                </p>
                <div className="space-y-6">
                  {["Licensed Accountants", "Cloud-First Approach", "SST Compliance Experts", "Audit-Ready Reports"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest opacity-80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-12 lg:p-20 relative">
              <div className="max-w-xl mx-auto relative z-10">
                <h3 className="text-white font-black text-xl uppercase tracking-widest mb-10 flex items-center gap-4">
                  <span className="w-10 h-1 bg-gold"></span>
                  Request a Quote
                </h3>
                
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gold/10 border border-gold/30 rounded-3xl p-12 text-center"
                    >
                      <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/20">
                        <svg className="w-10 h-10 text-navy-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h4 className="text-white text-2xl font-black uppercase tracking-tight mb-4">Request Received!</h4>
                      <p className="text-blue-100/60 font-medium">Our accounting team will reach out shortly.</p>
                    </motion.div>
                  ) : (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg" 
                            required
                          />
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Work Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com" 
                            className={`w-full px-0 py-3 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg`}
                            required
                          />
                        </div>
                      </div>
                      <div className="relative group">
                        <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+60 12 345 6789" 
                          className={`w-full px-0 py-3 bg-transparent border-b-2 ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg`}
                          required
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Message</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your business needs..." 
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg resize-none h-24"
                          required
                        ></textarea>
                      </div>
                      <div className="pt-8">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                          className="w-full py-6 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-gold/20 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 disabled:opacity-50"
                        >
                          {isSubmitting ? "Processing..." : "Submit Request"}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AccountingBookkeeping;
