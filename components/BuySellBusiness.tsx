import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Target, 
  Search, 
  Scale, 
  Rocket, 
  ShieldCheck, 
  ChevronDown, 
  Briefcase, 
  Handshake, 
  FileText,
  UserCheck,
  Lock
} from 'lucide-react';

const BuySellBusiness: React.FC = () => {
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
      question: "How do you ensure confidentiality during a business sale?",
      answer: "We employ strict Non-Disclosure Agreements (NDAs) and blind profiles. No sensitive information is shared until a buyer is pre-qualified and has signed a legally binding confidentiality agreement."
    },
    {
      question: "What is the typical timeline for selling a business in Malaysia?",
      answer: "A typical transaction takes between 6 to 12 months, depending on the industry, business size, and readiness of documentation. We streamline this by preparing all necessary 'deal-ready' files upfront."
    },
    {
      question: "How is a business valuation determined?",
      answer: "We use a combination of methods including EBITDA multiples, Discounted Cash Flow (DCF), and asset-based valuation, adjusted for local market conditions and goodwill."
    },
    {
      question: "Do you assist with the legal transfer of shares?",
      answer: "Yes, we handle the entire legal framework, including the Sales & Purchase Agreement (SPA) and all necessary filings with SSM to ensure a clean and official transfer of ownership."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-gold/30">
      {/* 1. Hero Section (Navy & Gold) */}
      <section className="relative bg-navy-dark text-white py-20 sm:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2073" 
            className="w-full h-full object-cover opacity-40"
            alt="Corporate M&A Background"
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
              <Lock className="w-3 h-3" />
              Confidential M&A Advisory
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Strategic <br />
              <span className="text-gold italic">Exits &</span> <br />
              Acquisitions
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100/80 mb-12 leading-relaxed font-medium max-w-2xl"
            >
              Whether you are looking to exit your venture or acquire a profitable business in Malaysia, BizFlow ensures a secure, transparent, and professional transaction with absolute confidentiality.
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
                href="#listings" 
                className="px-10 py-5 bg-gold text-navy-dark font-black rounded-xl transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-sm flex items-center gap-3"
              >
                Browse Listings
                <TrendingUp className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-10 py-5 bg-white/10 text-white border-2 border-white/20 font-black rounded-xl transition-all uppercase tracking-widest text-sm backdrop-blur-sm flex items-center gap-3"
              >
                List Your Business
                <Handshake className="w-4 h-4" />
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

      {/* 2. Strategic Exit & Entry Section */}
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
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074" 
                    className="rounded-[40px] shadow-2xl border-b-8 border-gold w-full object-cover aspect-[4/3]" 
                    alt="Business Negotiation" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 bg-navy-dark p-8 rounded-3xl shadow-2xl border border-gold/30 hidden sm:block"
                >
                  <div className="text-gold font-black text-4xl mb-1">100%</div>
                  <div className="text-white/60 text-xs uppercase tracking-widest font-bold">Confidentiality Rate</div>
                </motion.div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-10 -left-10 grid grid-cols-6 gap-4 opacity-20">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-navy-dark rounded-full" />
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-6">Strategic Transaction</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-navy-dark mb-8 leading-tight tracking-tighter uppercase">
                Protecting Your <br />
                <span className="text-gold italic">Legacy & Future.</span>
              </h3>
              <p className="text-slate-600 font-medium mb-12 leading-relaxed text-lg">
                Buying or selling a business is more than just a transaction; it’s a legal transfer of legacy and liability. We provide the technical due diligence and legal framework required to protect both parties, ensuring the value you've built is preserved or the investment you make is sound.
              </p>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: <Briefcase className="w-5 h-5" />, 
                    title: "Business Valuation", 
                    desc: "Scientific approach to fair market pricing based on EBIDTA, asset value, and goodwill." 
                  },
                  { 
                    icon: <ShieldCheck className="w-5 h-5" />, 
                    title: "Strict NDA Management", 
                    desc: "Absolute confidentiality to protect employees, suppliers, and customers during the sale process." 
                  },
                  { 
                    icon: <Search className="w-5 h-5" />, 
                    title: "Full Due Diligence", 
                    desc: "Verifying every license, tax record, and employment contract before the final handshake." 
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
          </div>
        </div>
      </section>

      {/* 3. Our Transaction Services Grid */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden" id="listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">M&A Transaction Units</h2>
            <div className="w-24 h-2 bg-gold mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "Seller Representation", desc: "Optimizing your corporate profile, preparing pitch decks, and matching with pre-qualified buyers for maximum exit value." },
              { icon: <Target className="w-8 h-8" />, title: "Buyer Mandates", desc: "Custom sourcing of profitable Malaysian enterprises that match your specific investment criteria and industrial focus." },
              { icon: <Search className="w-8 h-8" />, title: "Due Diligence Bureau", desc: "Independent auditing of financial records, operational licenses, and legal standings to mitigate acquisition risk." },
              { icon: <Scale className="w-8 h-8" />, title: "Share Transfer & Legal", desc: "Expert handling of Sales & Purchase Agreements (SPA) and SSM statutory filings for official ownership change." },
              { icon: <Rocket className="w-8 h-8" />, title: "Post-Acquisition", desc: "Guiding the new owner through operational transition, management handover, and local compliance updates." }
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

            {/* Elite Portfolio Card */}
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
              <h4 className="text-2xl font-black text-gold mb-4 uppercase tracking-tighter relative z-10">Elite Portfolio</h4>
              <p className="text-blue-100/70 text-sm font-medium mb-8 relative z-10">Access our private list of 'Off-Market' opportunities in the F&B, Tech, and Manufacturing sectors.</p>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-4 bg-gold text-navy-dark font-black rounded-xl uppercase text-xs tracking-widest transition-all relative z-10"
              >
                Request Access
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The M&A Roadmap */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">The M&A Roadmap</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-4">A Proven Framework for Success</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden lg:block -translate-y-1/2" />

            {[
              { step: "01", title: "Evaluation", desc: "A rigorous assessment of business health, historical earnings, and future market potential.", icon: <FileText className="w-6 h-6" /> },
              { step: "02", title: "Matching", desc: "Strategic connection of buyers and sellers under strict NDA protocols to protect operations.", icon: <UserCheck className="w-6 h-6" /> },
              { step: "03", title: "Audit", desc: "Facilitating intensive due diligence meetings and record auditing for total transparency.", icon: <Search className="w-6 h-6" /> },
              { step: "04", title: "Closing", desc: "Execution of the SPA, fund escrow management, and official SSM record updates.", icon: <Handshake className="w-6 h-6" /> }
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
                  <h4 className="text-lg sm:text-xl font-black text-navy-dark mb-4 uppercase tracking-tight">{p.title}</h4>
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
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Everything you need to know about M&A</p>
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
      <section className="py-24 sm:py-40 bg-white relative overflow-hidden" id="contact">
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
              <Handshake className="w-40 h-40 text-white" />
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Your Next Big Move <br /><span className="text-gold italic">Starts Here.</span></h2>
              <p className="text-blue-100/70 font-medium text-lg">Confidentiality is our currency. Tell us about your investment or exit goals.</p>
            </div>
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/40">
                    <ShieldCheck className="w-10 h-10 text-navy-dark" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Inquiry Secured</h3>
                  <p className="text-blue-100/60 font-medium">Our M&A director will contact you privately within 24 hours.</p>
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
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">I am a...</label>
                      <select 
                        required
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white/50 transition-all appearance-none"
                      >
                        <option value="" className="bg-navy-dark">Select Role</option>
                        <option value="buyer" className="bg-navy-dark">Potential Buyer / Investor</option>
                        <option value="seller" className="bg-navy-dark">Business Owner / Seller</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Target Industry</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. F&B, Logistics" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white transition-all placeholder:text-white/20" 
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Budget / Asking Price (MYR)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. 5,000,000" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white transition-all placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Additional Details</label>
                      <textarea 
                        required
                        placeholder="Tell us about the business profile..." 
                        className="w-full h-[124px] px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium resize-none text-white transition-all placeholder:text-white/20"
                      ></textarea>
                    </div>
                    <motion.button 
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Securing...' : 'Request Private Briefing'}
                      <Lock className="w-4 h-4" />
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

export default BuySellBusiness;
