
import React, { useState, useEffect } from 'react';
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
      <div className={`bg-[#051622] text-white py-2.5 text-[10px] sm:text-[11px] font-medium tracking-wider border-b border-white/5 transition-all duration-700 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6 sm:gap-10">
            <motion.a 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              href="tel:+60327718000" 
              className="flex items-center gap-2.5 hover:text-gold transition-all duration-300 group"
            >
              <Phone size={14} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-bold">+60 3 2771 8000</span>
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              href="mailto:info@bizskoop.com" 
              className="hidden sm:flex items-center gap-2.5 hover:text-gold transition-all duration-300 group"
            >
              <Mail size={14} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-bold">info@bizskoop.com</span>
            </motion.a>
            <div className="hidden lg:flex items-center gap-2.5 text-white/40">
              <Clock size={14} className="text-gold/50" />
              <span className="uppercase text-[9px] font-black tracking-[0.2em]">Mon - Fri: 9AM - 6PM</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden xl:flex items-center gap-3 px-4 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="uppercase text-[9px] font-black tracking-[0.2em] text-white/60">Professional Business Launchpad</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <Globe size={12} className="text-gold" />
                <span className="uppercase text-[9px] font-black text-white/60">EN</span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'f' },
                  { icon: Twitter, label: 't' },
                  { icon: Linkedin, label: 'in' },
                  { icon: Youtube, label: 'y' }
                ].map((social, idx) => (
                  <motion.a 
                    key={social.label} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    href="#" 
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
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

            <div className="hidden lg:block">
              <button 
                onClick={() => onNavigate('contact')} 
                className={`bizflow-liquid-consult px-6 py-3 bg-[#E91E63] text-white text-[13px] font-black rounded-lg hover:bg-[#C2185B] transition-all shadow-lg uppercase tracking-widest ${isScrolled ? 'scale-90' : 'scale-100'}`}
              >
                <span className="relative z-10">Get a Consultation</span>
              </button>
            </div>

            <button 
              className="lg:hidden p-2 text-royal-blue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[60] bg-royal-blue transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-royal-blue transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-royal-blue font-black text-lg">B</span>
                </div>
                <span className="text-white font-black text-xl uppercase tracking-tighter">BIZFLOW</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4 mb-10">
              <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 text-2xl font-black uppercase tracking-tight transition-colors ${currentPage === 'home' ? 'text-gold' : 'text-white'}`}>Home</button>
              <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 text-2xl font-black uppercase tracking-tight transition-colors ${currentPage === 'about' ? 'text-gold' : 'text-white'}`}>About Us</button>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-6">Our Core Services</p>
                <div className="grid grid-cols-1 gap-y-4">
                  {serviceItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} 
                      className={`text-blue-100 text-sm font-bold uppercase text-left flex items-center gap-3 group transition-all ${currentPage === item.id ? 'text-gold' : ''}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gold transition-transform duration-300 ${currentPage === item.id ? 'scale-150' : 'scale-0 group-hover:scale-100'}`}></span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className={`block w-full text-left py-2 text-2xl font-black uppercase tracking-tight transition-colors ${currentPage === 'contact' ? 'text-gold' : 'text-white'}`}>Contact</button>
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
              <button 
                onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} 
                className="w-full py-5 bg-gold text-royal-blue font-black rounded-xl uppercase tracking-[0.2em] text-xs shadow-2xl shadow-gold/20"
              >
                Get a Consultation
              </button>
              
              <div className="flex justify-center gap-6 mt-8">
                {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/40 hover:text-gold transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
