
import React, { useState, useEffect } from 'react';

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
      <div className={`bg-royal-blue text-white py-2 text-[10px] sm:text-[11px] font-semibold tracking-wider border-b border-white/10 transition-all duration-500 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="tel:+60327718000" className="flex items-center gap-2 hover:text-accent-yellow transition-colors">
              <span className="text-accent-yellow">📞</span> +60 3 2771 8000
            </a>
            <a href="mailto:info@bizskoop.com" className="hidden sm:flex items-center gap-2 hover:text-accent-yellow transition-colors">
              <span className="text-accent-yellow">✉️</span> info@bizskoop.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline opacity-60 uppercase tracking-widest text-[9px]">Professional Business Launchpad</span>
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
                className={`px-6 py-3 bg-[#E91E63] text-white text-[13px] font-black rounded-lg hover:bg-[#C2185B] transition-all shadow-lg uppercase tracking-widest ${isScrolled ? 'scale-90' : 'scale-100'}`}
              >
                Get a Consultation
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
      <div className={`lg:hidden fixed inset-0 z-[60] bg-royal-blue transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-12">
            <span className="text-white font-black text-2xl uppercase tracking-tighter">BIZFLOW</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-6">
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
