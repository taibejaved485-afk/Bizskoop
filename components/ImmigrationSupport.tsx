import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  UserCheck, 
  FileCheck, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  Briefcase, 
  Users, 
  Home, 
  RefreshCw,
  MapPin,
  Plane,
  Target
} from 'lucide-react';

const ImmigrationSupport: React.FC = () => {
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
      question: "What are the minimum salary requirements for an Employment Pass (EP)?",
      answer: "Malaysia has three categories for EP. Category I requires a minimum monthly salary of RM10,000, Category II requires RM5,000 to RM9,999, and Category III requires RM3,000 to RM4,999 (subject to specific industry approvals)."
    },
    {
      question: "How long does the visa endorsement process take?",
      answer: "Once the position is approved, the personal endorsement typically takes 7 to 14 working days. However, the initial company registration and position projection can take 2 to 4 weeks."
    },
    {
      question: "Can I bring my family on a Dependent Pass?",
      answer: "Yes, Employment Pass holders in Categories I and II are eligible to bring their legal spouse, children under 18, and elderly parents (under a Long-Term Social Visit Pass)."
    },
    {
      question: "What is the ESD portal?",
      answer: "The Expatriate Services Division (ESD) portal is the official digital gateway for all expatriate-related applications in Malaysia. We manage this portal entirely for our clients."
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
            src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-40"
            alt="Global Mobility Background"
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
              <Globe className="w-3 h-3" />
              Global Mobility Solutions
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Expatriate <br />
              <span className="text-gold italic">& Immigration</span> <br />
              Support
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100/80 mb-12 leading-relaxed font-medium max-w-2xl"
            >
              Simplify the visa process for your international talent. From Employment Passes to Dependent Visas, we ensure a smooth transition for your global team into Malaysia.
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
                href="#assessment" 
                className="px-10 py-5 bg-gold text-navy-dark font-black rounded-xl transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-sm flex items-center gap-3"
              >
                Start Visa Assessment
                <Plane className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                href="#categories" 
                className="px-10 py-5 bg-white/10 text-white border-2 border-white/20 font-black rounded-xl transition-all uppercase tracking-widest text-sm backdrop-blur-sm flex items-center gap-3"
              >
                View Categories
                <Users className="w-4 h-4" />
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
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Explore More</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* 2. Expert Visa Solutions Section */}
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
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2070" 
                    className="rounded-[40px] shadow-2xl border-b-8 border-gold w-full object-cover aspect-[4/3]" 
                    alt="Professional Consultant" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 bg-navy-dark p-8 rounded-3xl shadow-2xl border border-gold/30 hidden sm:block"
                >
                  <div className="text-gold font-black text-4xl mb-1">99%</div>
                  <div className="text-white/60 text-xs uppercase tracking-widest font-bold">Approval Success</div>
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
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-6">Global Mobility</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-navy-dark mb-8 leading-tight tracking-tighter uppercase">
                Expert Visa <br />
                <span className="text-gold italic">Solutions.</span>
              </h3>
              <p className="text-slate-600 font-medium mb-12 leading-relaxed text-lg">
                Navigating Malaysia's immigration laws requires precision and up-to-date knowledge of agency quotas. We manage the entire lifecycle of work permits, ensuring your expatriate staff are legally compliant and ready to work from day one.
              </p>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: <Globe className="w-5 h-5" />, 
                    title: "ESD Portal Management", 
                    desc: "End-to-end handling of the Expatriate Services Division portal for position and endorsement applications." 
                  },
                  { 
                    icon: <Briefcase className="w-5 h-5" />, 
                    title: "MDEC / MD Tech Visas", 
                    desc: "Specialist support for Malaysia Digital (MD) status companies in securing high-priority tech talent passes." 
                  },
                  { 
                    icon: <Target className="w-5 h-5" />, 
                    title: "Strategic Quota Advice", 
                    desc: "Strategic advice on company paid-up capital requirements and expatriate quota projections." 
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

      {/* 3. Visa Categories Grid */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">Visa Categories We Handle</h2>
            <div className="w-24 h-2 bg-gold mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-8 h-8" />, title: "Employment Pass (EP)", desc: "Professional work permits for Categories I, II, and III based on salary thresholds and job roles." },
              { icon: <MapPin className="w-8 h-8" />, title: "Professional Visit Pass (PVP)", desc: "Short-term permits for technical experts, consultants, or trainees visiting for specific projects." },
              { icon: <Users className="w-8 h-8" />, title: "Dependent Pass", desc: "Bringing your immediate family: spouses, children, and elderly parents to reside in Malaysia." },
              { icon: <Home className="w-8 h-8" />, title: "Long-Term Social Visit", desc: "Passes for common-law spouses, children over 18, or other eligible long-term dependents." },
              { icon: <RefreshCw className="w-8 h-8" />, title: "Renewals & Cancellations", desc: "Seamless handling of visa extensions or professional offboarding when employees transition out." }
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

            {/* Assessment Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group bg-navy-dark p-10 rounded-[40px] shadow-2xl border-b-8 border-gold relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gold/10 blur-3xl"
              />
              <h4 className="text-2xl font-black text-gold mb-4 uppercase tracking-tighter relative z-10">Visa Assessment</h4>
              <p className="text-blue-100/70 text-sm font-medium mb-8 relative z-10">Unsure which category fits? Use our eligibility checker for instant clarity.</p>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                href="#assessment" 
                className="px-8 py-4 bg-gold text-navy-dark font-black rounded-xl uppercase text-xs tracking-widest transition-all relative z-10"
              >
                Check Eligibility
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The Immigration Roadmap */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-navy-dark uppercase tracking-tighter">The Immigration Roadmap</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-4">A Proven Framework for Mobility</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden lg:block -translate-y-1/2" />

            {[
              { step: "01", title: "Eligibility Check", desc: "Reviewing candidate CVs and company financials against latest immigration criteria.", icon: <UserCheck className="w-6 h-6" /> },
              { step: "02", title: "Position Projection", desc: "Securing the 'Quota' or 'Position' approval from ESD or MDEC for the specific role.", icon: <Target className="w-6 h-6" /> },
              { step: "03", title: "Submission", desc: "Meticulous filing of the personal endorsement application via official digital portals.", icon: <FileCheck className="w-6 h-6" /> },
              { step: "04", title: "Endorsement", desc: "Coordinating passport submission and physical sticker collection for final legal status.", icon: <Clock className="w-6 h-6" /> }
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
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Everything you need to know about Immigration</p>
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
      <section className="py-24 sm:py-40 bg-white relative overflow-hidden" id="assessment">
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
              <Plane className="w-40 h-40 text-white" />
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Ready to Hire <br /><span className="text-gold italic">International Talent?</span></h2>
              <p className="text-blue-100/70 font-medium text-lg">Get your professional visa assessment from our licensed mobility specialists.</p>
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
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Assessment Requested</h3>
                  <p className="text-blue-100/60 font-medium">Our mobility specialist will contact you within 24 hours.</p>
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
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Nationality of Candidate</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. British, Singaporean" 
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
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Expected Start Date</label>
                      <input 
                        required
                        type="date" 
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium text-white/50 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gold/50 ml-2">Hiring Needs</label>
                      <textarea 
                        required
                        placeholder="Tell us more about the role..." 
                        className="w-full h-[124px] px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-gold outline-none font-medium resize-none text-white transition-all placeholder:text-white/20"
                      ></textarea>
                    </div>
                    <motion.button 
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : 'Request Assessment'}
                      <Plane className="w-4 h-4" />
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

export default ImmigrationSupport;
