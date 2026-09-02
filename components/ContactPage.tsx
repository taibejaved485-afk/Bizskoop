import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { saveNewLead } from '../services/leadStorage.ts';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  Briefcase, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Globe, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Compass, 
  BookmarkCheck,
  CheckSquare,
  Lock,
  ArrowLeft,
  X
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 300], [1, 1.1]);

  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    service: '',
    message: '',
    requestNDA: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [generatedTicket, setGeneratedTicket] = useState('');

  // Live KL Time & Help Desk status
  const [klTime, setKlTime] = useState('');
  const [deskStatus, setDeskStatus] = useState({ label: '', color: '', description: '' });

  // Accordion faq state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kuala_Lumpur',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setKlTime(formatter.format(new Date()));

        const klHour = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })).getHours();
        if (klHour >= 9 && klHour < 18) {
          setDeskStatus({
            label: "Active Office Hours",
            color: "bg-emerald-500",
            description: "Senior partners are active. (Typical response: < 15 mins)"
          });
        } else if (klHour >= 18 && klHour < 22) {
          setDeskStatus({
            label: "After-Hours Liaison Active",
            color: "bg-amber-500",
            description: "On-call executive officers active. (Typical response: < 45 mins)"
          });
        } else {
          setDeskStatus({
            label: "Channels Off-Duty",
            color: "bg-slate-400",
            description: " Briefing queue open. Response first thing in the morning."
          });
        }
      } catch (e) {
        setKlTime('Kuala Lumpur, MY');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const liaisonFaqs = [
    {
      q: "Do you charge for the initial corporate briefing?",
      a: "No, our initial 20-minute diagnostic briefing is entirely complimentary. We analyze your corporate structure, licensing gaps, or visa requirements, and provide a clear, binding quote."
    },
    {
      q: "Are client briefings covered under NDAs?",
      a: "Absolutely. We treat all corporate inquiries, intellectual property details, and expansion plans with strict confidentiality. Standard NDAs can be executed prior to our first Zoom or physical meeting."
    },
    {
      q: "What is the typical SLA for urgent Sdn Bhd incorporations?",
      a: "Once SSM registration fees are cleared and documentation is signed digitally via our portal, we can incorporate a standard company within 24 to 48 hours."
    },
    {
      q: "Do you assist with physical office space setup in KLCC?",
      a: "Yes. Through our Corporate Services division, we provide premium virtual office addresses, shared co-working desks, and support for dedicated corporate commercial leasing compliance."
    }
  ];

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Inquiry details are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (validateStep2()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate pseudo-ticket ID
        const randomTicket = `BZF-${Math.floor(100000 + Math.random() * 900000)}`;
        setGeneratedTicket(randomTicket);

        // Save lead using central leadStorage
        saveNewLead({
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName || 'N/A',
          phoneNumber: formData.phoneNumber,
          service: formData.service || 'general',
          message: `${formData.message} ${formData.requestNDA ? '[Request Confidentiality / NDA]' : ''}`
        });

        setSubmitStatus('success');
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      service: '',
      message: '',
      requestNDA: false
    });
    setFormStep(1);
    setSubmitStatus('idle');
    setErrors({});
  };

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-gold selection:text-navy-dark" ref={containerRef}>
      {/* 1. Hero Section with Background Image */}
      <section className="relative text-white py-16 sm:py-20 lg:py-24 overflow-hidden group flex items-center">
        {/* Background Image Layer with Parallax */}
        <motion.div 
          style={{ y: yHero, scale: scaleHero, opacity: opacityHero }}
          className="absolute inset-0 z-0 bg-navy-dark"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-25 object-center mix-blend-luminosity"
            alt="Corporate Executive Environment"
          />
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-12 w-60 h-60 bg-royal-blue/10 rounded-full blur-3xl"
          />
          
          {/* Animated Dots Grid */}
          <div className="absolute top-12 right-12 grid grid-cols-4 gap-3.5 opacity-25">
            {[...Array(16)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{ duration: 2.5, delay: i * 0.12, repeat: Infinity }}
                className="w-1 h-1 bg-gold rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Advanced Multi-layered Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent z-0"></div>

        <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24 relative z-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="w-full text-center sm:text-left"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-gold/15 backdrop-blur-md border border-gold/25 text-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] mb-5 shadow-lg"
            >
              <Sparkles size={11} className="text-gold animate-pulse" />
              Global Corporate Liaison
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight uppercase"
            >
              Strategic <span className="text-gold">Partnership</span> Starts Here
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-xs sm:text-sm text-blue-100/90 mb-8 leading-relaxed font-semibold max-w-2xl mx-auto sm:mx-0"
            >
              Connect with Malaysia's leading corporate architects and regulatory consultants. We expedite SDN BHD setup, licensing execution, and ESD expatriate visa quota clearance with direct portal authority.
            </motion.p>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6"
            >
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -4, zIndex: 10 }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-navy-dark bg-slate-300 overflow-hidden shadow-md"
                  >
                    <img src={`https://i.pravatar.cc/150?u=corporate_${i}`} alt="Executive Advisor" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left flex flex-col justify-center">
                <p className="text-gold font-black text-xs uppercase tracking-wider leading-none mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-gold" />
                  Licensed Corporate Officers
                </p>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider leading-none">Complimentary diagnostic briefings active</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative Parallax Background Elements */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
          className="absolute top-40 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] -z-10"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          className="absolute bottom-40 left-0 w-80 h-80 bg-royal-blue/5 rounded-full blur-[100px] -z-10"
        />

        <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Details (5 cols) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="lg:col-span-5 text-center sm:text-left space-y-12"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <h2 className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3">Direct Channels</h2>
                <h3 className="text-3xl sm:text-4xl font-black text-royal-blue uppercase tracking-tight leading-none mb-4">
                  Our Regional <br className="hidden sm:block"/>Headquarters
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Liaison response desks are fully unified and active.</p>
              </motion.div>

              {/* Dynamic Live Status Desk Bar */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white border border-slate-200/80 p-3.5 sm:p-4 rounded-xl shadow-sm text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-navy-dark text-gold rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-gold/10">
                    <Clock size={14} className="animate-pulse text-gold" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current Local Time (KL)</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gold">{klTime || 'Updating...'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${deskStatus.color} shrink-0 animate-ping`}></span>
                      <span className={`w-1.5 h-1.5 rounded-full ${deskStatus.color} shrink-0`}></span>
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-wide">{deskStatus.label}</p>
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold tracking-wide uppercase leading-none">{deskStatus.description}</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin size={16} />,
                    title: "Corporate Office",
                    desc: <>Level 28, Menara Binjai,<br />No. 2, Jalan Binjai, Kuala Lumpur City Centre,<br />50450 Kuala Lumpur, Malaysia.</>
                  },
                  {
                    icon: <Phone size={16} />,
                    title: "Liaison Desk",
                    desc: <>General Line: +60 3 2771 8000<br />WhatsApp Hotline: +60 12 999 0000</>
                  },
                  {
                    icon: <Mail size={16} />,
                    title: "Email Channels",
                    desc: <>General Inquiry: info@bizflow.com<br />Official Compliance: official@bizflow.com</>
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex gap-3.5 sm:gap-4 items-start group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 6, backgroundColor: "#D4AF37", color: "#001f3f" }}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-navy-dark text-gold flex items-center justify-center shrink-0 shadow-sm border border-white/5 transition-all duration-500"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-royal-blue uppercase tracking-tight mb-0.5 group-hover:text-gold transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-500 font-bold leading-normal text-[10px] sm:text-[11px] uppercase tracking-wide">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Accordion FAQ Guide */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-left space-y-4"
              >
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <HelpCircle className="text-gold shrink-0" size={15} />
                  <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-800 leading-none">Briefing & Liaison Guidelines</h4>
                </div>
                
                <div className="space-y-3.5">
                  {liaisonFaqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-slate-100/60 pb-3 last:border-b-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left py-1.5 text-xs font-bold text-slate-850 hover:text-gold transition-colors cursor-pointer"
                      >
                        <span className="leading-snug">{faq.q}</span>
                        <ChevronDown 
                          size={13} 
                          className={`text-slate-400 transition-transform duration-300 shrink-0 ml-3 ${openFaq === idx ? 'rotate-180 text-gold' : ''}`} 
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 6, marginBottom: 4 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pr-4">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Interactive Multi-Step Contact Form (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-7 w-full"
            >
              {/* Spinning Premium Gradient Border Layer */}
              <div className="absolute inset-[-1px] bg-gradient-to-br from-gold/40 via-transparent to-royal-blue/20 rounded-[40px] pointer-events-none"></div>
              
              <div className="relative bg-white p-6 sm:p-10 lg:p-12 rounded-[40px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] border border-slate-150 z-10">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl -z-10 animate-pulse"></div>
                
                {submitStatus !== 'success' && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 bg-royal-blue/5 border border-royal-blue/10 text-royal-blue rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <Lock size={10} className="text-gold" /> SSL SECURE INTAKE
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Step {formStep} of 2
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex mb-6">
                      <div 
                        className="bg-gold h-full transition-all duration-500"
                        style={{ width: formStep === 1 ? '50%' : '100%' }}
                      />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-royal-blue uppercase tracking-tight">Executive Briefing Inquiry</h3>
                    <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase mt-1">Please provide the necessary credentials to evaluate your project scope.</p>
                  </div>
                )}
                
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-10 text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Briefing Intended Successfully</h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                          Thank you. Your dossier has been securely queued and compiled. Our executive secretary is allocating standard SLA windows.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 max-w-sm mx-auto space-y-3.5 text-left">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Ticket ID</span>
                          <span className="text-xs font-black text-royal-blue tracking-wider">{generatedTicket}</span>
                        </div>
                        
                        <div className="space-y-2.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-[8px]">✓</span>
                            <span>SSM/ESD Portal Compatibility Check</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-[8px]">✓</span>
                            <span>Dedicated Partner Allocation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-[8px]">✓</span>
                            <span>Zoom Video Consultation link via email</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="px-6 py-3 bg-navy-dark hover:bg-gold hover:text-navy-dark text-gold rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* STEP 1: CONTACT IDENTITY */}
                      {formStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <User size={12} className="text-gold" />
                              Full Name
                            </label>
                            <div className="relative">
                              <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Alexander Graham" 
                                className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs transition-all duration-300 ${errors.fullName ? 'border-rose-500' : ''}`} 
                              />
                            </div>
                            {errors.fullName && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.fullName}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <Mail size={12} className="text-gold" />
                              Professional Email
                            </label>
                            <div className="relative">
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="alex@company.com" 
                                className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs transition-all duration-300 ${errors.email ? 'border-rose-500' : ''}`} 
                              />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.email}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <Building2 size={12} className="text-slate-400" />
                              Company / Organization Name (Optional)
                            </label>
                            <div className="relative">
                              <input 
                                type="text" 
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Entity Name or 'Startup'" 
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs transition-all duration-300" 
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <Phone size={12} className="text-gold" />
                              Phone Number (Mobile/WhatsApp)
                            </label>
                            <div className="relative">
                              <input 
                                type="tel" 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+60 12-345 6789" 
                                className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs transition-all duration-300 ${errors.phoneNumber ? 'border-rose-500' : ''}`} 
                              />
                            </div>
                            {errors.phoneNumber && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.phoneNumber}</p>}
                          </div>

                          <div className="pt-2">
                            <button 
                              type="button" 
                              onClick={handleNextStep}
                              className="w-full py-5 bg-navy-dark hover:bg-gold hover:text-navy-dark text-gold font-black rounded-xl transition-all duration-300 shadow-md uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-3 cursor-pointer"
                            >
                              <span>Proceed to Scope Details</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: BUSINESS INTENT */}
                      {formStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <Briefcase size={12} className="text-gold" />
                              Primary Service of Interest
                            </label>
                            <div className="relative">
                              <select 
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className={`w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs text-slate-800 appearance-none transition-all duration-300 ${errors.service ? 'border-rose-500' : ''}`}
                              >
                                <option value="">Select a Strategic Area</option>
                                <option value="incorporation">Sdn Bhd Incorporation</option>
                                <option value="secretarial">Company Secretarial Duties</option>
                                <option value="visa">Employment Pass / ESD Support</option>
                                <option value="accounting">Accounting & Bookkeeping</option>
                                <option value="tax">Tax Optimization Compliance</option>
                                <option value="licensing">Business Permits & Licensing</option>
                                <option value="m&a">Mergers & Buy-Sell Business</option>
                              </select>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                                <ChevronDown size={14} />
                              </div>
                            </div>
                            {errors.service && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.service}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                              <MessageSquare size={12} className="text-gold" />
                              Detailed Inquiry Dossier
                            </label>
                            <div className="relative">
                              <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Kindly detail your regulatory constraints, timelines, company background, and specific deliverables required..." 
                                className={`w-full h-36 px-5 py-4 bg-slate-50 border border-slate-200 focus:border-gold rounded-xl focus:bg-white outline-none font-semibold text-xs resize-none transition-all duration-300 ${errors.message ? 'border-rose-500' : ''}`}
                              ></textarea>
                            </div>
                            {errors.message && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.message}</p>}
                          </div>

                          {/* Premium Custom NDA Checkbox Option */}
                          <div 
                            onClick={() => setFormData({ ...formData, requestNDA: !formData.requestNDA })}
                            className="flex items-start gap-3 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 cursor-pointer transition-all hover:bg-amber-500/10"
                          >
                            <button
                              type="button"
                              className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${formData.requestNDA ? 'bg-gold border-gold text-navy-dark' : 'bg-white border-slate-300'}`}
                            >
                              {formData.requestNDA && <span className="text-[10px] font-black">✓</span>}
                            </button>
                            <div className="space-y-0.5 text-left">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1">
                                <ShieldCheck size={11} className="text-gold" /> Execute Preliminary NDA
                              </span>
                              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">Request mutual Non-Disclosure Agreement before discussing proprietary logistics</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-2">
                            <button 
                              type="button" 
                              onClick={handlePrevStep}
                              className="col-span-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <ArrowLeft size={12} />
                              <span>Back</span>
                            </button>
                            
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="col-span-2 py-5 bg-navy-dark hover:bg-gold hover:text-navy-dark text-gold font-black rounded-xl transition-all duration-300 shadow-md uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 cursor-pointer"
                            >
                              {isSubmitting ? (
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4.5 h-4.5 border-2 border-gold border-t-transparent rounded-full"
                                />
                              ) : (
                                <>
                                  <span>Submit Dossier</span>
                                  <ArrowRight size={14} />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                    </form>
                  )}
                </AnimatePresence>
                
                {submitStatus !== 'success' && (
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-6">
                    Response Guarantee: Under 2 business hours • SSL Confirmed
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Google Map */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="h-[320px] sm:h-[400px] w-full bg-slate-100 relative grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden border-t-8 border-gold group"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.714524278385!2d101.71782231533158!3d3.1613580540679694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d1d26315ef%3A0x649b56360c6d9644!2zQsOtesOha29vcA!5e0!3m2!1sen!2smy!4v1711234567890!5m2!1sen!2smy" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Bizskoop Location"
        ></iframe>
        
        {/* Map Overlay Info */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="absolute bottom-6 left-6 z-10 hidden sm:block animate-fadeIn"
        >
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-navy-dark text-white p-6 sm:p-7 rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] border-b-4 border-gold relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-2">Visit Our Office</h4>
            <p className="text-xs font-semibold leading-relaxed mb-4">
              Menara Binjai, Level 28<br/>
              No. 2, Jalan Binjai, KLCC<br/>
              50450 Kuala Lumpur
            </p>
            <motion.a 
              whileHover={{ x: 5 }}
              href="https://maps.google.com" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-gold text-[9px] font-black uppercase tracking-widest"
            >
              Get Directions
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
