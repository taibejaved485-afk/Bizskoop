
import React from 'react';
import TypingText from './TypingText.tsx';

const ServiceCard: React.FC<{
  title: string, 
  desc: string, 
  icon: React.ReactNode, 
  tags: string[], 
  index: number
}> = ({ title, desc, icon, tags, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative p-[2px] rounded-[42px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-4"
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Rotating Glow Layer - Only visible on hover */}
      <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-full bg-white p-8 sm:p-10 lg:p-12 rounded-[40px] group-hover:rounded-[40px] border border-slate-100 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,51,102,0.12)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer overflow-hidden z-10">
        {/* Decorative index background */}
        <div className="absolute top-8 right-12 text-7xl font-black text-slate-200 select-none group-hover:text-gold/10 group-hover:-translate-y-2 transition-all duration-700">
          0{index + 1}
        </div>

        {/* Icon Container with Parallax Effect */}
        <div className="w-20 h-20 bg-royal-blue rounded-3xl flex items-center justify-center text-white mb-10 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-[10deg] group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-xl relative z-10">
          <div className="group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-royal-blue mb-4 uppercase tracking-tighter group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          <div className="text-slate-600 font-medium leading-relaxed mb-10 text-sm group-hover:text-slate-800 transition-colors min-h-[5rem]">
            <TypingText 
              text={desc}
              speed={15}
              delay={index * 200}
              start={isHovered}
            />
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 bg-slate-50 text-royal-blue text-[10px] font-black uppercase rounded-full tracking-widest border border-slate-100 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-transparent group-hover:bg-gold transition-all duration-500"></div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const mainServices = [
    {
      title: "Sdn Bhd Formation",
      desc: "Full 100% foreign-owned incorporation strategy. We navigate the Companies Act 2016 to ensure your entity is live, compliant, and bank-ready in 48-72 hours.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      tags: ["Foreign Ownership", "SSM Express", "Digital Setup"]
    },
    {
      title: "Global Immigration",
      desc: "Authorized ESD and MDEC handling for Category I, II, & III Employment Passes. We manage the quota projections and talent endorsement for 98% approval rates.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tags: ["EP I/II/III", "PVP Specialist", "MDEC Status"]
    },
    {
      title: "Regulatory Licensing",
      desc: "Specialized licensing for complex sectors including WRT (Retail), CIDB (Construction), and DBKL municipal approvals. No guesswork, just results.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
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
            <div 
              key={idx} 
              className="group relative p-[2px] rounded-[34px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Rotating Glow Layer - Only visible on hover */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div 
                className="liquid-box relative h-full bg-slate-50 p-8 rounded-[32px] border border-slate-100 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-royal-blue/10 transition-all duration-500 overflow-hidden cursor-default z-10"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
