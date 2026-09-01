
import React from 'react';

interface ServiceGridProps {
  onNavigate: (page: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactNode;
  features: string[];
}

const ServiceGridCard: React.FC<{
  service: ServiceItem;
  idx: number;
  onNavigate: (page: string) => void;
}> = ({ service, idx, onNavigate }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative p-[2px] bg-slate-200/80 rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-royal-blue/15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rotating Gold/Navy Glow Border Layer on Hover */}
      <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#D4AF37_50%,#003366_70%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-full bg-white p-7 sm:p-8 rounded-[26px] border border-transparent shadow-sm transition-all duration-500 z-10 flex flex-col justify-between">
        
        <div>
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-royal-blue group-hover:scale-110 group-hover:bg-royal-blue group-hover:text-gold group-hover:border-royal-blue transition-all duration-500 shadow-sm">
              {service.icon}
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-slate-600 group-hover:bg-gold/15 group-hover:text-royal-blue transition-colors duration-300">
              {service.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black text-royal-blue mb-3 uppercase tracking-tight group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <div className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-6 min-h-[3.5rem]">
            {service.desc}
          </div>

          {/* Highlights / Features pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.map((feat, fIdx) => (
              <span key={fIdx} className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100/80 flex items-center gap-1 group-hover:border-gold/30 transition-colors">
                <span className="w-1 h-1 rounded-full bg-gold"></span>
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA Action Button */}
        <button 
          onClick={() => onNavigate(service.id)}
          className="w-full pt-4 border-t border-slate-100 text-royal-blue font-black text-xs uppercase tracking-wider flex items-center justify-between group/btn hover:text-gold transition-colors duration-300"
        >
          <span>Explore Service</span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-gold group-hover/btn:text-navy-dark transition-all duration-300">
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>

      </div>
    </div>
  );
};

const ServiceGrid: React.FC<ServiceGridProps> = ({ onNavigate }) => {
  const services: ServiceItem[] = [
    {
      id: "company-secretarial",
      title: "Company Secretarial",
      desc: "Statutory compliance, annual returns, and corporate governance for Malaysian companies.",
      badge: "SSM Licensed",
      features: ["SSM Compliant", "Annual Returns", "Board Minutes"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: "accounting",
      title: "Accounting & Bookkeeping",
      desc: "Comprehensive bookkeeping, payroll, and financial reporting tailored for businesses.",
      badge: "LHDN Standard",
      features: ["Monthly Accounts", "Payroll System", "Audit Preparation"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "tax",
      title: "Tax Compliance Services",
      desc: "Corporate tax filing, SST advisory, and tax optimization by licensed specialists.",
      badge: "Tax Advisory",
      features: ["Form C Filing", "SST Registration", "Tax Strategy"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "licensing",
      title: "Business Licensing Services",
      desc: "Trade licenses, sector-specific permits, and government approvals.",
      badge: "Official Approval",
      features: ["WRT License", "Premise License", "Sector Permits"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: "local-licensing",
      title: "Local Council Licensing",
      desc: "DBKL, MBPJ, MBSA premise & signboard licenses handled end-to-end.",
      badge: "Local Authority",
      features: ["DBKL / MBPJ / MBSA", "Signboard Permit", "Health Approval"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: "corporate",
      title: "Corporate Services",
      desc: "Company registration & official approvals with ESD, MDEC, IRDA, and JTKSM.",
      badge: "ESD / MDEC",
      features: ["ESD Registration", "MDEC Status", "JTKSM Approval"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "visa",
      title: "Employment Pass Services",
      desc: "Expedited visas, Employment Pass, Professional Visit Pass & Dependent Visas.",
      badge: "Immigration",
      features: ["Employment Pass", "PVP / Investor", "Dependants Visa"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
    },
    {
      id: "buy-sell",
      title: "Buy & Sell Business",
      desc: "Corporate restructuring, buying, selling ready-made companies, and deal execution.",
      badge: "M&A Advisory",
      features: ["Ready Companies", "Due Diligence", "Transfer Support"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white relative overflow-hidden">
      <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-royal-blue font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] block mb-2">
            Our Services
          </span>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-royal-blue leading-tight tracking-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis sm:overflow-visible">
            Practical Solutions For Business Setup & Compliance
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <ServiceGridCard 
              key={service.id}
              service={service}
              idx={idx}
              onNavigate={onNavigate}
            />
          ))}

          {/* View All Services Box */}
          <div 
            onClick={() => onNavigate('contact')}
            className="group relative bg-royal-blue p-8 sm:p-10 rounded-[28px] flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-royal-blue/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue via-navy-dark to-royal-blue opacity-90"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-dark transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tight group-hover:text-gold transition-colors duration-300">
                Explore All <br/> Services
              </h3>
              
              <p className="mt-3 text-xs text-blue-100/70 font-medium max-w-xs">
                Need customized support? Speak with our licensed advisory team today.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-navy-dark text-xs font-black uppercase tracking-widest group-hover:bg-white transition-colors duration-300">
                Contact Us
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            {/* Decorative background glows */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
