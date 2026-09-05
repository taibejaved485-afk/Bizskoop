
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Facebook, Instagram, Linkedin, Clock, Globe, Search, X, Loader2, Star, ChevronDown, Bell, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStoredAnnouncement, ANNOUNCEMENT_UPDATED_EVENT, sanitizeAndGetSiteConfig, SITE_CONFIG_UPDATED_EVENT, DEFAULT_SITE_CONFIG, SiteConfig } from '../services/leadStorage.ts';
import { AnnouncementConfig } from '../types.ts';
import { useLanguage } from './LanguageContext.tsx';
import { BizskoopLogo } from './BizskoopLogo.tsx';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementConfig | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const loadConfig = () => {
      setConfig(sanitizeAndGetSiteConfig());
      setAnnouncement(getStoredAnnouncement());
    };

    loadConfig();

    const handleAnnouncement = () => {
      setAnnouncement(getStoredAnnouncement());
    };

    window.addEventListener(SITE_CONFIG_UPDATED_EVENT, loadConfig);
    window.addEventListener('bizskoop_config_updated', loadConfig);
    window.addEventListener(ANNOUNCEMENT_UPDATED_EVENT, handleAnnouncement);
    return () => {
      window.removeEventListener(SITE_CONFIG_UPDATED_EVENT, loadConfig);
      window.removeEventListener('bizskoop_config_updated', loadConfig);
      window.removeEventListener(ANNOUNCEMENT_UPDATED_EVENT, handleAnnouncement);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      if (currentPage === 'home') {
        const sections = ['home', 'about', 'services', 'blog', 'faq'];
        const scrollPosition = window.scrollY + 160; // offset buffer for sticky header height

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        setActiveSection(currentPage);
      }
    };

    // Run once initially
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'blog') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentPage === 'home' && ['home', 'about', 'services', 'faq'].includes(sectionId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
        return;
      }
    }
    onNavigate(sectionId);
  };

  const serviceItems = [
    { label: "Company Secretarial", id: "company-secretarial", desc: "SSM Compliance & Governance" },
    { label: "Accounting & Bookkeeping", id: "accounting", desc: "Financial Reporting & Audit" },
    { label: "Tax Compliance Services", id: "tax", desc: "LHDN Filing & Strategy" },
    { label: "Business Licensing Services", id: "licensing", desc: "Trade & Professional Permits" },
    { label: "Local Council Licensing", id: "local-licensing", desc: "PBT & DBKL Approvals" },
    { label: "Corporate Services", id: "corporate", desc: "Strategic Advisory & Setup" },
    { label: "Expatriate & Immigration", id: "visa", desc: "Employment Pass & Visas" },
    { label: "Buy & Sell Business", id: "buy-sell", desc: "M&A and Business Valuation" },
  ];

  return (
    <header className={`sticky top-0 z-50 sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      {announcement?.enabled && (
        <div className={`text-white text-[11px] sm:text-xs py-2 transition-all duration-300 relative overflow-hidden select-none ${
          announcement.theme === 'royal' 
            ? 'bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-b border-blue-500/30'
            : announcement.theme === 'emerald'
            ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-b border-emerald-500/30'
            : announcement.theme === 'crimson'
            ? 'bg-gradient-to-r from-rose-950 via-red-900 to-slate-900 border-b border-rose-500/30'
            : 'bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 border-b border-amber-500/30'
        }`}>
          {announcement.marqueeEffect ? (
            <div className="w-full overflow-hidden flex items-center">
              <div className="animate-marquee-ltr flex items-center gap-16 whitespace-nowrap">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-6 shrink-0">
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/10 text-gold text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1">
                      <Bell size={10} className="animate-pulse text-gold" />
                      {announcement.badgeText || 'ANNOUNCEMENT'}
                    </span>
                    <p className="font-bold text-slate-100 flex items-center gap-2">
                      <span>{announcement.message}</span>
                      {announcement.ctaText && (
                        <button 
                          onClick={() => onNavigate(announcement.ctaUrl || 'contact')}
                          className="inline-flex items-center gap-1 text-gold hover:text-white font-black text-[10px] uppercase tracking-wider ml-2 underline decoration-gold/50 hover:decoration-white transition-all cursor-pointer"
                        >
                          {announcement.ctaText} <ArrowRight size={10} />
                        </button>
                      )}
                    </p>
                    <span className="text-gold font-bold opacity-40">✦</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/10 text-gold text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1">
                  <Bell size={10} className="animate-pulse text-gold" />
                  {announcement.badgeText || 'ANNOUNCEMENT'}
                </span>
                <p className="truncate font-medium text-slate-100">{announcement.message}</p>
              </div>
              {announcement.ctaText && (
                <button 
                  onClick={() => onNavigate(announcement.ctaUrl || 'contact')}
                  className="shrink-0 flex items-center gap-1.5 text-gold hover:text-white font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <span>{announcement.ctaText}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <div className={`bg-[#051622] text-white py-2.5 text-[10px] sm:text-[11px] font-medium tracking-wider border-b border-white/5 transition-all duration-700 relative ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-auto opacity-100'}`}>
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gold/5 blur-[50px] pointer-events-none"></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-10 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-6 sm:gap-10">
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              href={`tel:${config.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-2.5 hover:text-gold transition-all duration-300 group relative"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone size={12} className="text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-black tracking-tight">{config.phone}</span>
              <div className="absolute -bottom-1 left-8 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></div>
            </motion.a>
            
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              href={`mailto:${config.email}`} 
              aria-label="Send email to Bizskoop Corporate Advisory Desk"
              className="hidden sm:flex items-center gap-2.5 hover:text-gold transition-all duration-300 group relative cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Mail size={12} className="text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-black tracking-tight select-all">
                {config.email}
              </span>
              <div className="absolute -bottom-1 left-8 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></div>
            </motion.a>
            
            <div className="hidden lg:flex items-center gap-2.5 text-white/60 group cursor-default">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <Clock size={12} className="text-gold/70 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="uppercase text-[9px] font-black tracking-[0.2em] group-hover:text-white transition-colors">Mon - Fri: 9AM - 6PM</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 hover:border-gold/30 transition-colors group cursor-default">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              </div>
              <span className="uppercase text-[9px] font-black tracking-[0.2em] text-white/60 group-hover:text-gold transition-colors">{t('nav_professional_launchpad')}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 pr-4 border-r border-white/10 group cursor-pointer focus:outline-none"
                >
                  <Globe size={12} className="text-gold group-hover:rotate-12 transition-transform" />
                  <span className="uppercase text-[9px] font-black text-white/60 group-hover:text-white transition-colors">{language}</span>
                  <svg className={`w-2.5 h-2.5 text-white/30 group-hover:text-gold transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <>
                      {/* Full-screen backdrop to handle click-away dismissals cleanly */}
                      <div 
                        className="fixed inset-0 z-40 bg-transparent cursor-default"
                        onClick={() => setIsLangOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-2 top-full mt-2 bg-[#051622] border border-white/10 rounded-xl overflow-hidden py-1.5 w-32 shadow-2xl z-50"
                      >
                        <button
                          onClick={() => { setLanguage('EN'); setIsLangOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-colors ${language === 'EN' ? 'text-gold' : 'text-white/60'}`}
                        >
                          🇺🇸 English
                        </button>
                        <button
                          onClick={() => { setLanguage('BM'); setIsLangOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-colors ${language === 'BM' ? 'text-gold' : 'text-white/60'}`}
                        >
                          🇲🇾 Melayu
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-2">
                {[
                  { 
                    renderIcon: () => <Facebook size={12} className="group-hover:scale-110 transition-transform" />, 
                    label: 'Facebook', 
                    url: 'https://www.facebook.com/bizskoopofficial',
                    color: 'hover:bg-blue-600' 
                  },
                  { 
                    renderIcon: () => <Linkedin size={12} className="group-hover:scale-110 transition-transform" />, 
                    label: 'LinkedIn', 
                    url: 'https://www.linkedin.com/company/bizskoopofficial?originalSubdomain=my',
                    color: 'hover:bg-blue-700' 
                  },
                  { 
                    renderIcon: () => <Instagram size={12} className="group-hover:scale-110 transition-transform" />, 
                    label: 'Instagram', 
                    url: 'https://www.instagram.com/bizskoopofficial/',
                    color: 'hover:bg-pink-600' 
                  },
                  { 
                    renderIcon: () => (
                      <svg className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.33 6.33 0 0 0 6.34-6.32V8.2a8.28 8.28 0 0 0 4.84 1.55V6.3a4.79 4.79 0 0 1-.92-.06v.45z"/>
                      </svg>
                    ), 
                    label: 'TikTok', 
                    url: 'https://www.tiktok.com/@bizskoopofficial',
                    color: 'hover:bg-black' 
                  }
                ].map((social, idx) => (
                  <motion.a 
                    key={social.label} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bizskoop on ${social.label}`}
                    className={`w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-transparent ${social.color} transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    {social.renderIcon()}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-slate-100 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group py-1 mr-4 lg:mr-8"
              onClick={() => handleNavClick('home')}
            >
              <BizskoopLogo 
                variant="dark" 
                size={isScrolled ? 'sm' : 'md'} 
              />
            </div>
            
            <div className="hidden lg:flex items-center justify-center flex-1 gap-8 xl:gap-10">
              <button onClick={() => handleNavClick('home')} className={`nav-link uppercase ${activeSection === 'home' ? 'text-gold font-black' : 'text-royal-blue'}`}>{t('nav_home')}</button>
              <button 
                onClick={() => handleNavClick('about')} 
                className={`nav-link uppercase ${activeSection === 'about' ? 'text-gold font-black' : 'text-royal-blue'}`}
              >
                {t('nav_about')}
              </button>
              
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className={`nav-link uppercase flex items-center gap-1.5 focus:outline-none py-4 ${activeSection === 'services' || currentPage.includes('service') || (currentPage !== 'home' && currentPage !== 'about' && currentPage !== 'faq' && currentPage !== 'contact') ? 'text-gold font-black' : 'text-royal-blue'}`}>
                  {t('nav_services')}
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                </button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[90vw] max-w-[1000px] z-50">
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-12"
                      >
                        {/* Right Panel: Services Grid */}
                        <div className="col-span-12 p-5 sm:p-6 bg-white">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                            {serviceItems.map((item, idx) => (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => {
                                  onNavigate(item.id);
                                  setIsServicesOpen(false);
                                }}
                                className="flex items-start gap-3.5 group/item text-left p-2.5 rounded-xl hover:bg-slate-50 hover:shadow-lg hover:shadow-royal-blue/5 border border-transparent hover:border-slate-100 transition-all duration-300"
                              >
                                <div className="w-9 h-9 rounded-lg bg-slate-50 shadow-sm border border-slate-100 flex items-center justify-center text-royal-blue group-hover/item:bg-royal-blue group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shrink-0">
                                  <Star className="w-4 h-4" strokeWidth={2.5} />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-black text-slate-900 text-[11px] uppercase tracking-tight group-hover/item:text-royal-blue transition-colors truncate">{item.label}</p>
                                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-0.5 group-hover/item:text-slate-600 transition-colors truncate">{item.desc}</p>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => handleNavClick('blog')} 
                className={`nav-link uppercase ${activeSection === 'blog' || currentPage === 'blog' ? 'text-gold font-black' : 'text-royal-blue'}`}
              >
                {t('nav_blog')}
              </button>

              <button 
                onClick={() => handleNavClick('contact')} 
                className={`nav-link uppercase ${activeSection === 'contact' ? 'text-gold font-black' : 'text-royal-blue'}`}
              >
                {t('nav_contact')}
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 240, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 z-20"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs font-bold text-royal-blue w-full placeholder:text-slate-400"
                      />
                      {isSearching ? (
                        <Loader2 size={14} className="text-gold animate-spin ml-2" />
                      ) : (
                        <button 
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="text-slate-400 hover:text-royal-blue transition-colors ml-2"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {!isSearchOpen && (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-royal-blue hover:text-gold transition-colors"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              <button 
                onClick={() => onNavigate('contact')} 
                className={`bizskoop-liquid-consult px-6 py-3 bg-[#E91E63] text-white text-[13px] font-black rounded-lg hover:bg-[#C2185B] transition-all shadow-lg uppercase tracking-widest ${isScrolled ? 'scale-90' : 'scale-100'}`}
              >
                <span className="relative z-10">Get a Consultation</span>
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(true);
                  // Optionally focus search in mobile menu if we add it there
                }}
                className="p-2 text-royal-blue"
              >
                <Search size={24} />
              </button>
              <button 
                className="p-2 text-royal-blue"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop and Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-[999]"
            />

            {/* Slide-in Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[380px] bg-gradient-to-b from-royal-blue to-[#051622] z-[1000] shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 shrink-0">
                <div 
                  className="cursor-pointer"
                  onClick={() => {
                    handleNavClick('home');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <BizskoopLogo 
                    variant="light" 
                    size="md" 
                    showSubtitle={true}
                    subtitle="STRATEGIC CONSULTANCY"
                  />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content Zone */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
                {/* Mobile Search */}
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search services..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 bg-white/10 border border-white/15 focus:border-gold rounded-xl text-white text-xs placeholder:text-white/40 outline-none transition-all font-bold"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {isSearching ? (
                      <Loader2 className="text-gold animate-spin" size={16} />
                    ) : (
                      <Search className="text-white/40" size={16} />
                    )}
                  </div>
                </div>

                {/* Mobile Language Switches */}
                <div className="flex items-center justify-between py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-wider">Language</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setLanguage('EN')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${language === 'EN' ? 'bg-gold text-slate-900 shadow-md' : 'bg-white/5 text-white/50'}`}
                    >
                      🇺🇸 EN
                    </button>
                    <button
                      onClick={() => setLanguage('BM')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${language === 'BM' ? 'bg-gold text-slate-900 shadow-md' : 'bg-white/5 text-white/50'}`}
                    >
                      🇲🇾 BM
                    </button>
                  </div>
                </div>

                {/* Primary Nav Links */}
                <div className="space-y-3">
                  <button 
                    onClick={() => { handleNavClick('home'); setIsMobileMenuOpen(false); }} 
                    className={`block w-full text-left font-black text-xl uppercase tracking-tight py-1 transition-colors ${activeSection === 'home' ? 'text-gold' : 'text-white hover:text-gold'}`}
                  >
                    {t('nav_home')}
                  </button>
                  <button 
                    onClick={() => { handleNavClick('about'); setIsMobileMenuOpen(false); }} 
                    className={`block w-full text-left font-black text-xl uppercase tracking-tight py-1 transition-colors ${activeSection === 'about' ? 'text-gold' : 'text-white hover:text-gold'}`}
                  >
                    {t('nav_about')}
                  </button>
                  <button 
                    onClick={() => { handleNavClick('blog'); setIsMobileMenuOpen(false); }} 
                    className={`block w-full text-left font-black text-xl uppercase tracking-tight py-1 transition-colors ${activeSection === 'blog' || currentPage === 'blog' ? 'text-gold' : 'text-white hover:text-gold'}`}
                  >
                    {t('nav_blog')}
                  </button>
                </div>

                {/* All Corporate Services (Scroll-safe, beautiful hierarchy) */}
                <div className="pt-5 border-t border-white/10">
                  <p className="text-accent-yellow font-black text-[10px] uppercase tracking-widest mb-3.5">{t('nav_services')}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {serviceItems.map((item) => (
                      <button 
                        key={item.id} 
                        onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} 
                        className={`text-left py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${
                          currentPage === item.id 
                            ? 'bg-gold/10 text-gold border-gold/30' 
                            : 'bg-white/[0.02] hover:bg-white/5 text-blue-100 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="font-black text-white">{item.label}</div>
                        <div className="text-[9px] text-white/40 normal-case font-semibold tracking-normal mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Sticky Footer with Quick Action */}
              <div className="p-6 border-t border-white/10 bg-black/10 shrink-0 space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {[
                    { 
                      renderIcon: () => <Facebook size={14} />, 
                      label: 'Facebook', 
                      url: 'https://www.facebook.com/bizskoopofficial' 
                    },
                    { 
                      renderIcon: () => <Linkedin size={14} />, 
                      label: 'LinkedIn', 
                      url: 'https://www.linkedin.com/company/bizskoopofficial?originalSubdomain=my' 
                    },
                    { 
                      renderIcon: () => <Instagram size={14} />, 
                      label: 'Instagram', 
                      url: 'https://www.instagram.com/bizskoopofficial/' 
                    },
                    { 
                      renderIcon: () => (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.33 6.33 0 0 0 6.34-6.32V8.2a8.28 8.28 0 0 0 4.84 1.55V6.3a4.79 4.79 0 0 1-.92-.06v.45z"/>
                        </svg>
                      ), 
                      label: 'TikTok', 
                      url: 'https://www.tiktok.com/@bizskoopofficial' 
                    }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Bizskoop on ${social.label}`}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gold hover:text-slate-900 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 shadow-sm"
                    >
                      {social.renderIcon()}
                    </a>
                  ))}
                </div>

                <button 
                  onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} 
                  className="w-full py-3.5 bg-white text-royal-blue hover:bg-gold hover:text-slate-900 transition-all font-black rounded-xl uppercase tracking-widest text-xs text-center shadow-lg cursor-pointer"
                >
                  {t('nav_contact')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
