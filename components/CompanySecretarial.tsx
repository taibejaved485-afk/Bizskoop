import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import AnimatedCounter from './AnimatedCounter.tsx';

const CompanySecretarial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

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
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      title: "Incorporation", 
      desc: "End-to-end Sdn. Bhd. and LLP company formation with digital speed.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      title: "Doc Preparation", 
      desc: "Crafting all necessary statutory documents, resolutions, and filings.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      title: "Appointments", 
      desc: "Formal appointment of directors and licensed qualified secretaries.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: "LHDN Registration", 
      desc: "Securing your Income Tax and Employer numbers immediately post-setup.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: "Annual Filing", 
      desc: "Managing Annual Returns, AGMs, and statutory financial submissions.",
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
              Statutory Backbone
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -20 },
                visible: { opacity: 1, y: 0, rotateX: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Elite <br/>
              <span className="text-gold">Company Secretarial</span> <br/>
              & Compliance
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100 max-w-3xl leading-relaxed font-medium drop-shadow-lg mb-12"
            >
              We provide the mandatory statutory backbone for your Malaysian enterprise. 100% compliant, audit-ready, and strategically managed by licensed professionals.
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
                href="#secretarial-contact" 
                className="px-10 py-5 bg-gold text-navy-dark font-black rounded-2xl transition shadow-2xl uppercase tracking-[0.3em] text-xs text-center"
              >
                Inquire Now
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="#expertise" 
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl transition shadow-2xl uppercase tracking-[0.3em] text-xs text-center"
              >
                View Expertise
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why It Matters Section */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden relative">
        {/* Topography Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 250 50 500 100 T 1000 100 M0 200 Q 250 150 500 200 T 1000 200 M0 300 Q 250 250 500 300 T 1000 300' stroke='%23051622' fill='transparent' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}></div>

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
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[36px] bg-white z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="Corporate Boardroom" 
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-6"
              >
                Strategic Foundation
              </motion.span>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-7xl font-black text-navy-dark mb-10 uppercase tracking-tighter leading-[0.9]"
              >
                Why Corporate <br/>Governance Matters.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-600 font-medium mb-12 leading-relaxed text-lg sm:text-xl"
              >
                Maintaining a compliant corporate structure isn't just a legal requirement—it's a prerequisite for trust with banks, investors, and authorities. We ensure your statutory framework is impenetrable.
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
                  { title: "SSM Compliance", desc: "Timely statutory filings of Annual Returns and Financial Statements to avoid legal penalties and maintain an 'Active' company status." },
                  { title: "Corporate Governance", desc: "Maintaining the integrity of statutory registers, minutes of meetings, and board resolutions with surgical precision." },
                  { title: "Ongoing Support", desc: "Direct, real-time advisory on boardroom decisions, share structure changes, and long-term compliance strategy." }
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-4"
            >
              Strategic Domains
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-black text-navy-dark uppercase tracking-tighter leading-none"
            >
              Scope of Expertise
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
                {/* Rotating Glow Layer */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white p-12 lg:p-16 rounded-[38px] border border-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-[24px] bg-navy-dark text-white flex items-center justify-center mb-10 group-hover:bg-royal-blue group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 shadow-xl">
                    {s.icon}
                  </div>
                  <h4 className="text-2xl font-black text-navy-dark mb-6 uppercase tracking-tight group-hover:text-gold transition-colors leading-tight">{s.title}</h4>
                  <p className="text-slate-500 text-base font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                    {s.desc}
                  </p>
                  
                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gold group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Execution Roadmap */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] block mb-4"
            >
              The BizFlow Way
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-black text-navy-dark uppercase tracking-tighter leading-none"
            >
              Our Execution Roadmap
            </motion.h2>
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
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {[
              { step: "01", title: "Requirements", desc: "Deep dive into your regulatory goals and business structure." },
              { step: "02", title: "Preparation", desc: "Verification and drafting of all mandated forms and submissions." },
              { step: "03", title: "Submission", desc: "Direct handling of authorities and management of clarifications." },
              { step: "04", title: "Approval", desc: "Ongoing support for renewals, compliance, and legal guidance." }
            ].map((p, i) => (
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
                
                <div className="relative h-full bg-[#051622] p-12 sm:p-16 rounded-[46px] shadow-2xl border border-white/5 text-center group-hover:border-gold/50 transition-all duration-500 overflow-hidden z-10">
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                  
                  <div className="w-20 h-20 rounded-[24px] bg-white/5 text-gold flex items-center justify-center mx-auto mb-12 shadow-sm border border-white/10 group-hover:bg-gold group-hover:text-navy-dark group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 font-black text-2xl">
                    {p.step}
                  </div>
                  
                  <h3 className="text-3xl font-black text-white uppercase mb-8 tracking-tight group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-blue-100/60 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                    {p.desc}
                  </p>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gold group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Watermark Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[200px] sm:text-[400px] font-black uppercase text-navy-dark border-8 sm:border-[16px] border-navy-dark p-20 sm:p-40 rounded-full rotate-12">SSM</span>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-4 block"
            >
              Common Enquiries
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-royal-blue uppercase tracking-tight leading-none"
            >
              Governance FAQ
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
          </motion.div>
          
          <div className="mt-24 sm:mt-32 text-center">
            <p className="text-slate-500 text-sm sm:text-base font-black uppercase tracking-[0.3em] mb-10">Have more specific questions?</p>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "#128C7E", boxShadow: "0 25px 50px -12px rgba(37,211,102,0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/601124244993" 
              className="inline-flex items-center gap-6 px-10 sm:px-16 py-5 sm:py-8 bg-[#25D366] text-white font-black rounded-[24px] transition-all shadow-2xl uppercase tracking-[0.4em] text-[11px] sm:text-sm w-full sm:w-auto justify-center"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat With An Expert
            </motion.a>
          </div>
        </div>
      </section>

      {/* 6. Lead Gen Footer */}
      <section className="py-32 bg-white relative" id="secretarial-contact">
        <div className="absolute inset-0 bg-[#051622] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row bg-[#081b2a] rounded-[50px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/5 group"
          >
            
            <div className="lg:w-2/5 p-12 lg:p-20 bg-gradient-to-br from-navy-dark to-[#081b2a] border-r border-white/5 relative flex flex-col justify-center">
              <div className="absolute top-10 left-10 w-24 h-24 bg-gold/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 border border-gold/20 shadow-lg shadow-gold/5 transition-transform duration-500"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                  The <span className="text-gold">BizFlow</span> <br/>Guarantee.
                </h2>
                <p className="text-blue-100/60 text-lg font-medium mb-12 leading-relaxed">
                  We handle the complex statutory hurdles of Malaysian compliance so you don't have to. Direct access to experts, not bots.
                </p>
                <div className="space-y-6">
                  {["100% Data Confidentiality", "Licensed Secretarial Unit", "2-Hour Response Time", "No Hidden Retainer Fees"].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-xs font-black text-white uppercase tracking-widest opacity-80">{item}</span>
                    </motion.div>
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
                
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-gold/10 border border-gold/30 rounded-3xl p-12 text-center"
                    >
                      <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/20">
                        <svg className="w-10 h-10 text-navy-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h4 className="text-white text-2xl font-black uppercase tracking-tight mb-4">Inquiry Received!</h4>
                      <p className="text-blue-100/60 font-medium">Our experts will contact you within 60-120 minutes.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8" 
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Full Legal Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Johnathan Doe" 
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg" 
                            required
                          />
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Professional Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com" 
                            className={`w-full px-0 py-3 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg`}
                            required
                          />
                          {errors.email && <p className="text-red-500 text-[10px] font-black mt-2 uppercase tracking-widest animate-pulse">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="relative group">
                        <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Direct Phone / WhatsApp</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+60 12 345 6789" 
                          className={`w-full px-0 py-3 bg-transparent border-b-2 ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg`}
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] font-black mt-2 uppercase tracking-widest animate-pulse">{errors.phone}</p>}
                      </div>
                      <div className="relative group">
                        <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3 group-focus-within:text-white transition-colors">Requirement Specifics</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="e.g. Need help with SSM audit backlog..." 
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none font-bold text-white transition-all placeholder:text-white/20 text-lg resize-none h-24"
                          required
                        ></textarea>
                      </div>
                      <div className="pt-8">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                          className="w-full py-6 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-gold/20 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-navy-dark border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Get Expert Consultation
                              <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </>
                          )}
                        </motion.button>
                        <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                          <span className="h-px w-10 bg-white/50"></span>
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Response within 60-120 mins</span>
                          <span className="h-px w-10 bg-white/50"></span>
                        </div>
                      </div>
                    </motion.form>
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

export default CompanySecretarial;
