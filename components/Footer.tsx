
import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight, ShieldCheck, Globe, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-20 overflow-hidden">
      {/* Wavy Top with Silhouette */}
      <div className="relative w-full h-32 sm:h-48 -mb-px">
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          <path 
            fill="#051622" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          
          {/* Cityscape Silhouette Overlay (Simplified) */}
          <g fill="#0a1e2e" opacity="0.4" transform="translate(0, 120)">
            <rect x="100" y="40" width="30" height="60" />
            <rect x="140" y="20" width="40" height="80" />
            <rect x="200" y="50" width="25" height="50" />
            <rect x="400" y="30" width="35" height="70" />
            <rect x="450" y="10" width="45" height="90" />
            <rect x="520" y="45" width="20" height="55" />
            <rect x="800" y="25" width="40" height="75" />
            <rect x="860" y="5" width="30" height="95" />
            <rect x="1100" y="35" width="35" height="65" />
            <rect x="1150" y="15" width="50" height="85" />
          </g>
        </svg>
        
        {/* Floating Icons (Like the shoes/balloons in the image) */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[15%] text-gold/20 hidden lg:block"
        >
          <Globe size={64} strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-[20%] text-gold/10 hidden lg:block"
        >
          <ShieldCheck size={80} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#051622] text-white pb-12 lg:pb-16 relative z-10">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none select-none"
          style={{ 
            backgroundImage: `url("https://i.pinimg.com/736x/47/9d/68/479d684a4749f39776cca09afefca6b5.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-16 border-b border-white/5">
            
            {/* Column 1: Newsletter */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">BizFlow's Newsletter</h4>
              <p className="text-blue-100/50 text-sm font-medium leading-relaxed">
                Stay updated with the latest Malaysian regulatory changes and business insights.
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold outline-none focus:border-gold/50 transition-all"
                />
                <button className="w-full sm:w-auto px-10 py-4 bg-[#E91E63] text-white font-black rounded-xl hover:bg-white hover:text-royal-blue transition-all uppercase tracking-widest text-xs shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Column 2: Terms & Conditions */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Legal & Policy</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Compliance Standards', 'Data Protection'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-100/50 hover:text-gold text-sm font-bold transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-colors"></div>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gold mb-4">Follow BizFlow</h5>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="text-white/40 hover:text-gold transition-colors">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Information */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Information</h4>
              <ul className="space-y-4">
                {['FAQs', 'About us at BizFlow', 'BizFlow Legal', 'Our Methodology', 'Global Network'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-100/50 hover:text-gold text-sm font-bold transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-4 space-y-2">
                <p className="text-white font-black text-lg tracking-tight">+60 3 2771 8000</p>
                <p className="text-blue-100/50 text-sm font-bold">info@bizflow.com</p>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Contact</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-white font-black text-sm uppercase mb-1">BizFlow Strategic</p>
                  <p className="text-blue-100/50 text-xs font-bold leading-relaxed">
                    Company number: 202401012345 (123456-X)
                  </p>
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase mb-1">Head office:</p>
                  <p className="text-blue-100/50 text-xs font-bold leading-relaxed">
                    Level 09, Integra Tower, The Intermark,<br/>
                    348 Jalan Tun Razak, 50400 Kuala Lumpur,<br/>
                    Malaysia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div className="py-12 flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={24} className="text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest">Trusted Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={24} className="text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={24} className="text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black italic tracking-tighter">VISA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black italic tracking-tighter">MasterCard</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-[10px] font-bold text-blue-100/30 uppercase tracking-[0.3em]">
                Part of BizFlow Group, serving entrepreneurs worldwide.
              </p>
              <p className="text-[11px] font-black text-blue-100/20 uppercase tracking-widest">
                © 2024-{currentYear} BIZFLOW. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
