
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#051622] pt-24 overflow-hidden">
      {/* 1. Newsletter Overlay Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mb-16">
        <div className="bg-[#051622] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2">
              Subscribe To Our Newsletter
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              Sign up for our monthly newsletter for the latest news & articles
            </p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="px-6 py-4 bg-white rounded-lg text-[#051622] font-medium outline-none w-full sm:w-80 lg:w-96"
            />
            <button className="px-10 py-4 bg-[#051622] border border-white/20 text-white font-black rounded-lg hover:bg-white hover:text-[#051622] transition-all uppercase tracking-widest text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Design */}
      <div className="relative pt-32 pb-16 lg:pb-20 z-10">
        {/* World Map Watermark Background */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none select-none mix-blend-screen"
          style={{ 
            backgroundImage: `url("https://www.transparenttextures.com/patterns/world-map.png")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 border-b border-white/10 pb-16">
            
            {/* Column 1: Branding */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#051622] font-black text-xl">B</span>
                </div>
                <span className="text-3xl font-black tracking-tighter text-white uppercase">bizskoop</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Bizskoop simplifies business in Malaysia by providing expert support in company registration, business licensing, visas, and regulatory compliance. Trusted by 500+ companies.
              </p>
              <div className="flex flex-wrap gap-4">
                {['f', 't', 'in', 'y'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                    <span className="text-xs uppercase font-black">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Main Menu */}
            <div className="space-y-8">
              <h4 className="text-white font-black text-lg uppercase tracking-widest border-l-4 border-[#D4AF37] pl-4">
                Main Menu
              </h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Services', 'FAQ', 'News', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-[#D4AF37] text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-4 h-0.5 bg-[#D4AF37] transition-all"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-8">
              <h4 className="text-white font-black text-lg uppercase tracking-widest border-l-4 border-[#D4AF37] pl-4">
                Services
              </h4>
              <ul className="space-y-4">
                {[
                  'Company Secretarial', 
                  'Business Licensing', 
                  'Corporate Advisory', 
                  'Expatriate & Immigration Support', 
                  'Buy & Sell Business'
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-slate-400 hover:text-[#D4AF37] text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group leading-tight">
                      <span className="w-0 group-hover:w-4 h-0.5 bg-[#D4AF37] transition-all"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get In Touch */}
            <div className="space-y-8">
              <h4 className="text-white font-black text-lg uppercase tracking-widest border-l-4 border-[#D4AF37] pl-4">
                Get In Touch
              </h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="text-slate-400 text-sm font-medium leading-relaxed">
                    Level 09, Integra Tower, The Intermark, 50400 Kuala Lumpur
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="text-slate-400 text-sm font-black tracking-widest">+60 11-2424 4993</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-slate-400 text-sm font-black tracking-wider hover:text-[#D4AF37] transition-colors cursor-pointer">
                    bizskoop@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <p>© 2024 BIZSKOOP CONSULTANCY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
