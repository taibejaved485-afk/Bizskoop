
import React from 'react';
import AnimatedCounter from './AnimatedCounter.tsx';

interface ServiceGridProps {
  onNavigate: (page: string) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ onNavigate }) => {
  const services = [
    {
      title: "Company Secretarial",
      desc: "Statutory compliance and corporate governance for Malaysian companies.",
      id: "company-secretarial",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Accounting & Bookkeeping",
      desc: "Bookkeeping and financial reporting services for Malaysian businesses.",
      id: "accounting",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Tax Compliance Services",
      desc: "Corporate tax compliance and advisory services in Malaysia.",
      id: "tax",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Business Licensing Services",
      desc: "Trade licenses and regulatory approvals for Malaysian businesses.",
      id: "licensing",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Local Council Licensing",
      desc: "Local council approvals for premises, signage, and operations.",
      id: "local-licensing",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Corporate Services",
      desc: "Company registration approvals with ESD, MDEC, IRDA, and JTKSM.",
      id: "corporate",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Employment Pass Services",
      desc: "Employment Pass, Professional Visit Pass, Investor Pass, and Dependent Pass.",
      id: "visa",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
    },
    {
      title: "Buy & Sell Business",
      desc: "Company buying, selling, and corporate transaction support.",
      id: "buy-sell",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-royal-blue font-black text-xs uppercase tracking-[0.5em] block mb-4">Our Services</span>
          <h2 className="text-4xl lg:text-6xl font-black text-royal-blue leading-tight tracking-tighter uppercase">
            Practical Solutions For <br/>
            Business Setup & Compliance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Rotating Glow Layer */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div 
                className="liquid-box relative h-full bg-white p-10 rounded-[30px] border border-slate-100 shadow-sm transition-all duration-500 z-10 flex flex-col items-center text-center"
                style={{ '--fill-color': 'rgba(0, 51, 102, 0.02)' } as React.CSSProperties}
              >
                <div className="liquid-wave"></div>
                
                <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-royal-blue mb-8 group-hover:scale-110 group-hover:bg-royal-blue group-hover:text-white transition-all duration-500 shadow-inner">
                  {service.icon}
                </div>

                <h3 className="text-xl font-black text-royal-blue mb-4 uppercase tracking-tight group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>

                <button 
                  onClick={() => onNavigate(service.id)}
                  className="text-royal-blue font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn hover:text-gold transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* View All Services Box */}
          <div 
            onClick={() => onNavigate('contact')}
            className="group relative bg-royal-blue p-10 rounded-[32px] flex items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue to-navy-dark opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">
                View all <br/> Services
              </h2>
              <div className="mt-8 w-16 h-1 bg-gold mx-auto rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
