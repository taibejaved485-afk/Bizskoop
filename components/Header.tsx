
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Clock, Globe, Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    { label: "Company Secretarial 🏢", id: "company-secretarial" },
    { label: "Accounting & Bookkeeping 📊", id: "accounting" },
    { label: "Tax Compliance Services 📑", id: "tax" },
    { label: "Business Licensing Services 📜", id: "licensing" },
    { label: "Local Council Licensing 🏛️", id: "local-licensing" },
    { label: "Corporate Services 🤝", id: "corporate" },
    { label: "Expatriate & Immigration Support 🛂", id: "visa" },
    { label: "Buy & Sell Business 🔄", id: "buy-sell" },
  ];

  return (
    <header className={`sticky top-0 z-50 sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`bg-[#051622] text-white py-2.5 text-[10px] sm:text-[11px] font-medium tracking-wider border-b border-white/5 transition-all duration-700 relative overflow-hidden ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-auto opacity-100'}`}>
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gold/5 blur-[50px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-6 sm:gap-10">
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              href="tel:+60327718000" 
              className="flex items-center gap-2.5 hover:text-gold transition-all duration-300 group relative"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone size={12} className="text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-black tracking-tight">+60 3 2771 8000</span>
              <div className="absolute -bottom-1 left-8 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></div>
            </motion.a>
            
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              href="mailto:info@bizskoop.com" 
              className="hidden sm:flex items-center gap-2.5 hover:text-gold transition-all duration-300 group relative"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Mail size={12} className="text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-black tracking-tight">info@bizskoop.com</span>
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
              <span className="uppercase text-[9px] font-black tracking-[0.2em] text-white/60 group-hover:text-gold transition-colors">Professional Business Launchpad</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-white/10 group cursor-pointer">
                <Globe size={12} className="text-gold group-hover:rotate-12 transition-transform" />
                <span className="uppercase text-[9px] font-black text-white/60 group-hover:text-white transition-colors">EN</span>
                <svg className="w-2.5 h-2.5 text-white/30 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
              </div>
              
              <div className="flex items-center gap-2.5">
                {[
                  { icon: Facebook, label: 'f', color: 'hover:bg-blue-600' },
                  { icon: Twitter, label: 't', color: 'hover:bg-sky-500' },
                  { icon: Linkedin, label: 'in', color: 'hover:bg-blue-700' },
                  { icon: Youtube, label: 'y', color: 'hover:bg-red-600' }
                ].map((social, idx) => (
                  <motion.a 
                    key={social.label} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    href="#" 
                    className={`w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-transparent ${social.color} transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    <social.icon size={12} className="group-hover:scale-110 transition-transform" />
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
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-royal-blue rounded-lg flex items-center justify-center shadow-lg group-hover:bg-navy-dark transition-colors">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-royal-blue leading-none uppercase">BIZFLOW</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">STRATEGIC CONSULTANCY</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
              <button onClick={() => onNavigate('home')} className={`nav-link uppercase ${currentPage === 'home' ? 'text-gold' : 'text-royal-blue'}`}>Home</button>
              <button 
                onClick={() => onNavigate('about')} 
                className={`nav-link uppercase ${currentPage === 'about' ? 'text-gold' : 'text-royal-blue'}`}
              >
                About Us
              </button>
              
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className={`nav-link uppercase flex items-center gap-1.5 focus:outline-none py-4 ${currentPage.includes('service') || currentPage !== 'home' && currentPage !== 'about' && currentPage !== 'contact' ? 'text-gold' : 'text-royal-blue'}`}>
                  Services
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-300 ${isServicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                  <ul className="bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden min-w-[300px] py-2 list-none">
                    {serviceItems.map((item, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => {
                            onNavigate(item.id);
                            setIsServicesOpen(false);
                          }}
                          className={`w-full text-left block px-6 py-4 text-[13px] font-bold hover:bg-slate-50 hover:text-gold transition-all duration-200 border-b border-slate-50 last:border-0 uppercase tracking-wide whitespace-nowrap ${currentPage === item.id ? 'text-gold bg-slate-50' : 'text-royal-blue'}`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('contact')} 
                className={`nav-link uppercase ${currentPage === 'contact' ? 'text-gold' : 'text-royal-blue'}`}
              >
                Contact
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
                className={`bizflow-liquid-consult px-6 py-3 bg-[#E91E63] text-white text-[13px] font-black rounded-lg hover:bg-[#C2185B] transition-all shadow-lg uppercase tracking-widest ${isScrolled ? 'scale-90' : 'scale-100'}`}
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

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[60] bg-royal-blue transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-12">
            <span className="text-white font-black text-2xl uppercase tracking-tighter">BIZFLOW</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-6">
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 outline-none focus:border-gold transition-all font-bold"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isSearching ? (
                  <Loader2 className="text-gold animate-spin" size={20} />
                ) : (
                  <Search className="text-white/40" size={20} />
                )}
              </div>
            </div>
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-white text-3xl font-black uppercase">Home</button>
            <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-white text-3xl font-black uppercase">About Us</button>
            <div className="pt-4 border-t border-white/10">
              <p className="text-accent-yellow font-black text-xs uppercase tracking-widest mb-4">Our Services</p>
              <div className="grid grid-cols-1 gap-4">
                {serviceItems.slice(0, 4).map((item) => (
                  <button key={item.id} onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} className="text-blue-100 text-lg font-bold uppercase text-left">{item.label}</button>
                ))}
              </div>
            </div>
            <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="block w-full py-5 bg-white text-royal-blue font-black rounded-xl uppercase tracking-widest text-center mt-12">Contact Us</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
