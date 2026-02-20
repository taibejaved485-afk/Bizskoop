
import React from 'react';
import TypingText from './TypingText.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Globe2, FileText, ArrowRight } from 'lucide-react';

const ServiceCard: React.FC<{
  title: string, 
  desc: string, 
  icon: React.ReactNode, 
  tags: string[], 
  index: number
}> = ({ title, desc, icon, tags, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
      className="group relative p-[1px] rounded-[42px] overflow-hidden transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 group-hover:from-gold/50 group-hover:via-gold/20 group-hover:to-gold/50 transition-all duration-700"></div>

      {/* Rotating Glow Layer - Only visible on hover */}
      <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative h-full bg-white p-8 sm:p-10 lg:p-12 rounded-[41px] border border-transparent shadow-sm group-hover:shadow-[0_40px_80px_-15px_rgba(0,51,102,0.15)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer overflow-hidden z-10">
        {/* Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/50 group-hover:to-gold/[0.03] transition-all duration-700"></div>

        {/* Icon Container with Parallax Effect */}
        <div className="relative z-20">
          <div className="w-20 h-20 bg-royal-blue rounded-[24px] flex items-center justify-center text-white mb-10 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-[8deg] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-2xl shadow-royal-blue/20 group-hover:shadow-gold/30">
            <div className="group-hover:scale-110 transition-transform duration-500">
              {icon}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-black text-royal-blue mb-4 uppercase tracking-tighter group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          <div className="text-slate-500 font-medium leading-relaxed mb-10 text-sm group-hover:text-slate-700 transition-colors min-h-[5rem]">
            <TypingText 
              text={desc}
              speed={15}
              delay={index * 200}
              start={isHovered}
            />
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-slate-50 text-royal-blue text-[9px] font-black uppercase rounded-full tracking-widest border border-slate-100 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:text-gold transition-all duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-transparent group-hover:bg-gold transition-all duration-700"></div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const mainServices = [
    {
      title: "Sdn Bhd Formation",
      desc: "Full 100% foreign-owned incorporation strategy. We navigate the Companies Act 2016 to ensure your entity is live, compliant, and bank-ready in 48-72 hours.",
      icon: <Building2 size={32} strokeWidth={2.5} />,
      tags: ["Foreign Ownership", "SSM Express", "Digital Setup"]
    },
    {
      title: "Global Immigration",
      desc: "Authorized ESD and MDEC handling for Category I, II, & III Employment Passes. We manage the quota projections and talent endorsement for 98% approval rates.",
      icon: <Globe2 size={32} strokeWidth={2.5} />,
      tags: ["EP I/II/III", "PVP Specialist", "MDEC Status"]
    },
    {
      title: "Regulatory Licensing",
      desc: "Specialized licensing for complex sectors including WRT (Retail), CIDB (Construction), and DBKL municipal approvals. No guesswork, just results.",
      icon: <FileText size={32} strokeWidth={2.5} />,
      tags: ["WRT Permit", "CIDB Grade G7", "DBKL/MBPJ"]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-40 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-16 lg:mb-24 text-center lg:text-left">
          <span className="text-gold font-black text-xs uppercase tracking-[0.5em] block mb-4">Core Strategic Units</span>
          <h2 className="text-5xl lg:text-7xl font-black text-royal-blue leading-[1.05] tracking-tighter uppercase mb-8">
            The Mandatory <br/>
            <span className="text-gold">Operational</span> <br/>
            Framework.
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            We provide the end-to-end execution required to satisfy Malaysian authorities. Fast-track your market entry with our authorized units.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {mainServices.map((service, i) => (
            <ServiceCard 
              key={i}
              index={i}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
              tags={service.tags}
            />
          ))}
        </div>

        {/* Enhanced Bottom trust bar for services */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Authorized Handling", title: "SSM Licensed Secretarial Unit", icon: "🏢" },
            { label: "Authorized Handling", title: "ESD / MDEC Registered Agent", icon: "🛂" },
            { label: "Authorized Handling", title: "LHDN Verified Tax Firm", icon: "📑" }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
              className="group relative p-[1px] rounded-[34px] overflow-hidden transition-all duration-500"
            >
              {/* Rotating Glow Layer - Only visible on hover */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div 
                className="liquid-box relative h-full bg-slate-50 p-8 rounded-[33px] border border-slate-100 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-royal-blue/10 transition-all duration-500 overflow-hidden cursor-default z-10"
                style={{ '--fill-color': 'rgba(0, 51, 102, 0.03)' } as React.CSSProperties}
              >
                <div className="liquid-wave"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-slate-50">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-gold transition-colors">{item.label}</p>
                      <svg className="w-3 h-3 text-emerald-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-sm font-black text-royal-blue uppercase leading-tight tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</p>
                  </div>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-royal-blue/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
