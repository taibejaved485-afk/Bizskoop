import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          phoneNumber: '',
          service: '',
          message: ''
        });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-gold selection:text-navy-dark" ref={containerRef}>
      {/* 1. Hero Section with Background Image */}
      <section className="relative text-white py-20 sm:py-32 lg:py-48 overflow-hidden group min-h-[80vh] flex items-center">
        {/* Background Image Layer with Parallax */}
        <motion.div 
          style={{ y: yHero, scale: scaleHero, opacity: opacityHero }}
          className="absolute inset-0 z-0 bg-[#001f3f]"
        >
          <img 
            src="https://i.pinimg.com/1200x/35/76/d2/3576d20671f27d34455af52453bf57a0.jpg" 
            className="w-full h-full object-cover opacity-30"
            alt="Corporate Environment"
          />
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div 
            animate={{ 
              y: [0, -40, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 60, 0],
              rotate: [0, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-10 w-48 h-48 bg-royal-blue/10 rounded-full blur-3xl"
          />
          
          {/* Animated Dots Grid */}
          <div className="absolute top-20 right-20 grid grid-cols-4 gap-4 opacity-20">
            {[...Array(16)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gold rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Advanced Multi-layered Overlay */}
        <div className="absolute inset-0 bg-navy-dark/60 lg:bg-gradient-to-r lg:from-navy-dark lg:via-navy-dark/80 lg:to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
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
            className="max-w-3xl text-center sm:text-left"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 text-gold text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-8 shadow-2xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
              Global Business Gateway
            </motion.div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -20 },
                visible: { opacity: 1, y: 0, rotateX: 0 }
              }}
              className="text-5xl sm:text-6xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Strategic <br className="hidden sm:block"/>
              <span className="text-gold inline-block hover:scale-105 transition-transform cursor-default">Partnership</span> <br className="hidden sm:block"/>
              Starts Here
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg sm:text-2xl text-blue-100 mb-12 leading-relaxed font-medium max-w-2xl drop-shadow-lg mx-auto sm:mx-0"
            >
              Connect with Malaysia's leading business strategists. Whether you are launching a startup or scaling an enterprise, we provide the authority and compliance you need.
            </motion.p>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-lg"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Expert" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-gold font-black text-sm uppercase tracking-widest">Expert Consultation</p>
                <p className="text-blue-100 text-xs font-medium">Available for private briefing</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
        {/* Decorative Parallax Background Elements */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-40 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute bottom-40 left-0 w-96 h-96 bg-royal-blue/5 rounded-full blur-[120px] -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Contact Details */}
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
              className="text-center sm:text-left"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <h2 className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-4">Direct Channels</h2>
                <h3 className="text-4xl sm:text-5xl font-black text-royal-blue mb-10 sm:mb-14 uppercase tracking-tight leading-none">
                  Our Regional <br className="hidden sm:block"/>Headquarters.
                </h3>
              </motion.div>
              
              <div className="space-y-10 sm:space-y-16">
                {[
                  {
                    icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    title: "Corporate Office",
                    desc: <>Level 28, Menara Binjai,<br />No. 2, Jalan Binjai, Kuala Lumpur City Centre,<br />50450 Kuala Lumpur, Malaysia.</>
                  },
                  {
                    icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    title: "Liaison Desk",
                    desc: <>General Line: +60 3 2771 8000<br />WhatsApp: +60 12 999 0000</>
                  },
                  {
                    icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    title: "Email Channels",
                    desc: <>General: info@bizskoop.com<br />Official: official@bizskoop.com</>
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10, backgroundColor: "#D4AF37", color: "#001f3f" }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] bg-navy-dark text-gold flex items-center justify-center shrink-0 shadow-2xl transition-all duration-500 group-hover:shadow-gold/20"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-royal-blue uppercase tracking-tight mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-600 font-medium leading-relaxed text-base sm:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="mt-16 sm:mt-24 p-8 sm:p-12 bg-navy-dark rounded-[40px] border border-white/5 relative overflow-hidden text-left group hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <h4 className="text-xs sm:text-sm font-black text-gold uppercase tracking-widest mb-6">International Founders</h4>
                  <p className="text-blue-100 text-sm sm:text-base font-medium leading-relaxed">
                    We specialize in helping foreign entrepreneurs from over 40 countries incorporate and scale in Malaysia. Our team is fluent in English, Bahasa Malaysia, and Mandarin.
                  </p>
                  <div className="mt-8 flex gap-4">
                    {['🇺🇸', '🇬🇧', '🇨🇳', '🇮🇳', '🇦🇺'].map((flag, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ y: -5, scale: 1.2 }}
                        className="text-2xl cursor-default"
                      >
                        {flag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Rotating Glow Layer */}
              <div className="absolute inset-[-20px] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_8s_linear_infinite] opacity-20 blur-2xl rounded-[60px]"></div>
              
              <div className="relative bg-white p-8 sm:p-12 lg:p-16 rounded-[40px] sm:rounded-[60px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 z-10">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                
                <div className="mb-10 sm:mb-14">
                  <h3 className="text-3xl sm:text-4xl font-black text-royal-blue mb-4 uppercase tracking-tight">Executive Inquiry</h3>
                  <p className="text-slate-500 font-medium">Secure your consultation with our senior partners.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p>Inquiry sent successfully. Our team will contact you within 2 business hours.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Full Name</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Alexander Graham" 
                        className={`w-full px-7 py-4 sm:py-5 bg-slate-50 border-2 ${errors.fullName ? 'border-rose-500' : 'border-slate-50'} rounded-2xl focus:border-gold focus:bg-white outline-none font-medium transition-all duration-300 text-sm sm:text-base shadow-inner`} 
                      />
                      {errors.fullName && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Professional Email</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com" 
                        className={`w-full px-7 py-4 sm:py-5 bg-slate-50 border-2 ${errors.email ? 'border-rose-500' : 'border-slate-50'} rounded-2xl focus:border-gold focus:bg-white outline-none font-medium transition-all duration-300 text-sm sm:text-base shadow-inner`} 
                      />
                      {errors.email && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Company Name</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Entity Name" 
                        className="w-full px-7 py-4 sm:py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-gold focus:bg-white outline-none font-medium transition-all duration-300 text-sm sm:text-base shadow-inner" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Phone Number</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+60 12..." 
                        className={`w-full px-7 py-4 sm:py-5 bg-slate-50 border-2 ${errors.phoneNumber ? 'border-rose-500' : 'border-slate-50'} rounded-2xl focus:border-gold focus:bg-white outline-none font-medium transition-all duration-300 text-sm sm:text-base shadow-inner`} 
                      />
                      {errors.phoneNumber && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.phoneNumber}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Service of Interest</label>
                    <div className="relative">
                      <motion.select 
                        whileFocus={{ scale: 1.01 }}
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-7 py-4 sm:py-5 bg-slate-50 border-2 ${errors.service ? 'border-rose-500' : 'border-slate-50'} rounded-2xl focus:border-gold focus:bg-white outline-none font-medium text-slate-500 appearance-none transition-all duration-300 text-sm sm:text-base shadow-inner`}
                      >
                        <option value="">Select a Primary Service</option>
                        <option value="incorporation">Sdn Bhd Incorporation</option>
                        <option value="secretarial">Company Secretarial</option>
                        <option value="visa">Employment Pass / Immigration</option>
                        <option value="accounting">Accounting & Bookkeeping</option>
                        <option value="tax">Tax Compliance</option>
                        <option value="licensing">Business Licensing</option>
                        <option value="m&a">Buy & Sell Business</option>
                      </motion.select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    {errors.service && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.service}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] sm:text-[11px] font-black text-royal-blue uppercase tracking-widest ml-1">Detailed Inquiry</label>
                    <motion.textarea 
                      whileFocus={{ scale: 1.01 }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your business goals or compliance requirements..." 
                      className={`w-full h-40 px-7 py-5 bg-slate-50 border-2 ${errors.message ? 'border-rose-500' : 'border-slate-50'} rounded-2xl focus:border-gold focus:bg-white outline-none font-medium resize-none transition-all duration-300 text-sm sm:text-base shadow-inner`}
                    ></motion.textarea>
                    {errors.message && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.message}</p>}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#000", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-5 sm:py-6 bg-navy-dark text-gold font-black rounded-2xl transition-all duration-300 shadow-2xl uppercase tracking-[0.2em] text-[11px] sm:text-sm flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Send Professional Inquiry
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </motion.button>
                  <p className="text-[9px] sm:text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest">Typical response time: Under 2 business hours</p>
                </form>
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
        className="h-[500px] sm:h-[650px] w-full bg-slate-100 relative grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden border-t-8 border-gold group"
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
          className="absolute bottom-10 left-10 z-10 hidden sm:block"
        >
          <motion.div 
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-navy-dark text-white p-10 rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-b-8 border-gold relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-gold font-black text-xs uppercase tracking-[0.3em] mb-4">Visit Our Office</h4>
            <p className="text-sm font-medium leading-relaxed mb-6">
              Menara Binjai, Level 28<br/>
              No. 2, Jalan Binjai, KLCC<br/>
              50450 Kuala Lumpur
            </p>
            <motion.a 
              whileHover={{ x: 5 }}
              href="https://maps.google.com" 
              target="_blank" 
              className="inline-flex items-center gap-3 text-gold text-[10px] font-black uppercase tracking-widest"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
