import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Globe, 
  Banknote, 
  ShieldCheck, 
  ChevronDown, 
  Briefcase, 
  Users, 
  FileText, 
  Settings,
  Cpu,
  Trophy,
  CheckCircle,
  Search
} from 'lucide-react';

const CorporateServices: React.FC = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 1.1]);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const faqs = [
    {
      question: "What is ESD Registration?",
      answer: "The Expatriate Services Division (ESD) registration is a mandatory step for companies in Malaysia that wish to hire expatriate talent. It involves registering your company portal to apply for Employment Passes (EP)."
    },
    {
      question: "How do you assist with corporate banking?",
      answer: "We provide white-glove facilitation, guiding you through the stringent KYC (Know Your Customer) requirements of major Malaysian and international banks to ensure a smooth account opening process."
    },
    {
      question: "What is Malaysia Digital (MD) status?",
      answer: "MD status (formerly MSC Malaysia) is a recognition given to companies that use digital technologies to transform their business. It unlocks various tax incentives and grants freedom of talent recruitment."
    },
    {
      question: "Can you help with EPF and SOCSO registration?",
      answer: "Yes, we handle the foundational payroll compliance setup, ensuring your company is registered with the Employees Provident Fund (EPF) and Social Security Organisation (SOCSO) for local employees."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-gold/30">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-20 sm:py-32 lg:py-40 overflow-hidden min-h-[70vh] flex items-center">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            className="w-full h-full object-cover opacity-50"
            alt="Corporate Services Background"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gold/10 rounded-full blur-3xl"
              style={{
                width: Math.random() * 400 + 200,
                height: Math.random() * 400 + 200,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,51,102,0.8)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="max-w-4xl"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Building2 className="w-3 h-3" />
              Premium Corporate Solutions
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Executive <br />
              <span className="text-gold italic">Foundations &</span> <br />
              Growth
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100/80 mb-12 leading-relaxed font-medium max-w-2xl"
            >
              From government agency registrations to corporate banking, we provide the foundational support your growing enterprise needs to scale in Malaysia with speed and authority.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap gap-6"
            >
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                href="#inquire" 
                className="px-10 py-5 bg-gold text-navy-dark font-black rounded-xl transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-sm flex items-center gap-3"
              >
                Send Inquiry
                <FileText className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                href="#services" 
                className="px-10 py-5 bg-white/10 text-white border-2 border-white/20 font-black rounded-xl transition-all uppercase tracking-widest text-sm backdrop-blur-sm flex items-center gap-3"
              >
                Explore Services
                <Settings className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover More</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* 2. Unlocking Growth Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-2 lg:order-1"
            >
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-6">Executive Foundation</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-navy-dark mb-8 leading-tight tracking-tighter uppercase">
                Unlocking Growth <br />
                <span className="text-gold italic">In Malaysia.</span>
              </h3>
              <p className="text-slate-600 font-medium mb-12 leading-relaxed text-lg">
                Expanding in Malaysia requires more than just a business registration. It demands a seamless bridge between your operations and essential government bodies and financial institutions. We act as your strategic envoy, ensuring every portal is open and every compliance box is ticked.
              </p>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: <Globe className="w-5 h-5" />, 
                    title: "ESD & MDEC Registration", 
                    desc: "Expert setup of your company's portal to unlock the ability to hire top international talent and expatriate professionals." 
                  },
                  { 
                    icon: <Banknote className="w-5 h-5" />, 
                    title: "Corporate Banking Facilitation", 
                    desc: "Direct guidance through the stringent KYC requirements of major Malaysian and International banks for corporate account opening." 
                  },
                  { 
                    icon: <Users className="w-5 h-5" />, 
                    title: "EPF & SOCSO Setup", 
                    desc: "Foundational payroll compliance setup, ensuring your company is ready to manage local employee benefits and statutory contributions." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-lg shadow-gold/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-navy-dark uppercase text-sm mb-2 tracking-wider">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-1 lg:order-2 relative"
            >
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2073" 
                    className="rounded-[40px] shadow-2xl border-t-8 border-gold w-full object-cover aspect-[4/3]" 
                    alt="Modern Corporate Office" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 bg-navy-dark p-8 rounded-3xl shadow-2xl border border-gold/30 hidden sm:block"
                >
                  <div className="text-gold font-black text-4xl mb-1">500+</div>
                  <div className="text-white/60 text-xs uppercase tracking-widest font-bold">Portals Managed</div>
                </motion.div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -bottom-10 -right-10 grid grid-cols-6 gap-4 opacity-20">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-navy-dark rounded-full" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Specialized Agency Support Grid */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">Specialized Agency Support</h2>
            <div className="w-24 h-2 bg-gold mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-8 h-8" />, title: "ESD Registration", desc: "End-to-end setup of the Expatriate Services Division portal, enabling your business to apply for Employment Passes (EP) efficiently." },
              { icon: <Cpu className="w-8 h-8" />, title: "MDEC / Digital Status", desc: "Specialized assistance for tech and digital firms to obtain Malaysia Digital (MD) status, unlocking tax incentives and talent freedom." },
              { icon: <Banknote className="w-8 h-8" />, title: "Bank Account Opening", desc: "White-glove facilitation with top-tier financial institutions like Maybank, CIMB, or HSBC to navigate complex onboarding." },
              { icon: <Building2 className="w-8 h-8" />, title: "MOF Registration", desc: "Strategic registration with the Ministry of Finance, enabling your business to bid for and secure high-value government tenders." },
              { icon: <Trophy className="w-8 h-8" />, title: "HRDF Compliance", desc: "Managing Human Resource Development Fund registration and compliance to leverage employee training grants and subsidies." }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">{s.icon}</div>
                <h4 className="text-xl font-black text-navy-dark mb-4 uppercase tracking-tight relative z-10">{s.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed relative z-10">{s.desc}</p>
              </motion.div>
            ))}

            {/* Strategic Envoy Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group bg-navy-dark p-10 rounded-[40px] shadow-2xl flex flex-col justify-center items-center text-center border-b-8 border-gold relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gold/10 blur-3xl"
              />
              <h4 className="text-2xl font-black text-gold mb-4 uppercase tracking-tighter relative z-10">Strategic Envoy</h4>
              <p className="text-blue-100/70 text-sm font-medium mb-8 relative z-10">Need a specific agency registration not listed? Our liaison network covers all major ministries.</p>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                href="#inquire" 
                className="px-8 py-4 bg-gold text-navy-dark font-black rounded-xl uppercase text-xs tracking-widest transition-all relative z-10"
              >
                Custom Inquiry
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The Corporate Strategy */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">The Corporate Strategy</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-4">A Proven Framework for Institutional Success</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden lg:block -translate-y-1/2" />

            {[
              { step: "01", title: "Consultation", desc: "Analyzing your corporate structure and specific needs for banking access or government agency status.", icon: <Search className="w-6 h-6" /> },
              { step: "02", title: "Portal Setup", desc: "Meticulous creation and management of your digital presence on key government and ministry platforms.", icon: <Globe className="w-6 h-6" /> },
              { step: "03", title: "Verification", desc: "Rigorous vetting of corporate profiles and documentation to withstand the highest levels of institutional scrutiny.", icon: <ShieldCheck className="w-6 h-6" /> },
              { step: "04", title: "Active Support", desc: "Proactive management of renewals, status updates, and compliance requirements for all registered accounts.", icon: <Settings className="w-6 h-6" /> }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl group-hover:border-gold/30 transition-all duration-500 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-navy-dark mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner">
                    {p.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 absolute top-8 right-8 group-hover:text-gold/10 transition-colors duration-500">{p.step}</span>
                  <h4 className="text-xl font-black text-navy-dark mb-4 uppercase tracking-tight">{p.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-navy-dark uppercase tracking-tighter mb-4">Common Inquiries</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Everything you need to know about Corporate Services</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-black text-navy-dark uppercase tracking-tight text-sm">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    className="text-gold"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-100 pt-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Gen Footer */}
      <section className="py-24 sm:py-40 bg-white relative overflow-hidden" id="inquire">
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,#D4AF37_0%,transparent_50%)]"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-navy-dark p-8 sm:p-20 rounded-[50px] shadow-3xl border-t-8 border-gold relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Building2 className="w-40 h-40 text-white" />
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Elevate Your <br /><span className="text-gold italic">Corporate Standing.</span></h2>
              <p className="text-blue-100/70 font-medium text-lg">Foundational support for elite enterprises. Speak with our corporate services unit today.</p>
            </div>
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/40">
                    <CheckCircle className="w-10 h-10 text-navy-dark" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Inquiry Received</h3>
                  <p className="text-blue-100/60 font-medium">Our corporate envoy will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white transition-all placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Company Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Your Company Sdn Bhd" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white transition-all placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Contact Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+60 12-345 6789" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white transition-all placeholder:text-white/20" 
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Service Required</label>
                      <select 
                        required
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white/50 transition-all appearance-none"
                      >
                        <option value="" className="bg-navy-dark">Select Service</option>
                        <option value="esd" className="bg-navy-dark">ESD / MDEC Portal Setup</option>
                        <option value="banking" className="bg-navy-dark">Corporate Banking Opening</option>
                        <option value="mof" className="bg-navy-dark">MOF Registration</option>
                        <option value="payroll" className="bg-navy-dark">EPF / SOCSO / HRDF Setup</option>
                        <option value="other" className="bg-navy-dark">Other Specialized Agency</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Corporate Goals</label>
                      <textarea 
                        required
                        placeholder="Tell us about your requirements..." 
                        className="w-full h-[124px] px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium resize-none text-white transition-all placeholder:text-white/20"
                      ></textarea>
                    </div>
                    <motion.button 
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                      <CheckCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CorporateServices;
