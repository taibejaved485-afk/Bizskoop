
import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight, Send, Globe, ShieldCheck, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#051622] pt-20 overflow-hidden">
      {/* 1. Premium CTA / Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="bg-gradient-to-br from-royal-blue to-[#0a1e2e] border border-white/10 rounded-[40px] p-8 lg:p-16 shadow-2xl relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-gold/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] -ml-24 -mb-24 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <Zap size={14} className="text-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Ready to scale?</span>
              </motion.div>
              <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                Let's Build Your <span className="text-gold">Success</span> Story In Malaysia
              </h3>
              <p className="text-blue-100/60 text-lg font-medium max-w-xl">
                Join 500+ global founders who trusted BizFlow to navigate the Malaysian business landscape.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-2 w-full lg:min-w-[450px]">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white font-bold outline-none placeholder:text-white/20"
                  />
                </div>
                <button className="px-8 py-4 bg-gold text-royal-blue font-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-gold/20">
                  Subscribe <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-4 text-center lg:text-left font-bold uppercase tracking-widest">
                <ShieldCheck size={12} className="inline mr-1 text-emerald-500" /> No spam, just strategic insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="relative pt-24 pb-12 lg:pb-16 z-10">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/5 pb-20">
            
            {/* Column 1: Branding & About (4 cols) */}
            <div className="lg:col-span-4 space-y-10">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-royal-blue font-black text-2xl">B</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter text-white uppercase leading-none">bizflow</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase mt-1">Strategic Consultancy</span>
                </div>
              </div>
              
              <p className="text-slate-400 text-base leading-relaxed font-medium max-w-sm">
                The definitive launchpad for international businesses in Malaysia. We combine local regulatory expertise with global service standards.
              </p>
              
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'fb' },
                  { icon: Twitter, label: 'tw' },
                  { icon: Linkedin, label: 'li' },
                  { icon: Youtube, label: 'yt' }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href="#" 
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-gold"></span> Company
              </h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Our Team', 'Success Stories', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-gold text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (3 cols) */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-gold"></span> Expertise
              </h4>
              <ul className="space-y-4">
                {[
                  'Company Formation', 
                  'Regulatory Licensing', 
                  'Corporate Secretarial', 
                  'Immigration & Visas', 
                  'Tax & Accounting'
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-slate-400 hover:text-gold text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group leading-tight">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info (3 cols) */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-gold"></span> Connect
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Headquarters</span>
                    <span className="text-slate-400 text-[13px] font-bold leading-relaxed">
                      Integra Tower, The Intermark, 50400 Kuala Lumpur
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Direct Line</span>
                    <span className="text-white text-base font-black tracking-tight group-hover:text-gold transition-colors">
                      +60 3 2771 8000
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Inquiries</span>
                    <span className="text-slate-400 text-[13px] font-bold group-hover:text-gold transition-colors">
                      info@bizflow.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                © {currentYear} BIZFLOW STRATEGIC CONSULTANCY.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[10px] font-black text-slate-500 hover:text-gold uppercase tracking-widest transition-colors">Privacy Policy</a>
                <a href="#" className="text-[10px] font-black text-slate-500 hover:text-gold uppercase tracking-widest transition-colors">Terms of Use</a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Globe size={12} className="text-gold" />
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Global Operations Center</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
