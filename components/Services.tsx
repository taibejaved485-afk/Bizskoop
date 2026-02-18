
import React from 'react';

const ServiceCard: React.FC<{title: string, desc: string, icon: string, tags: string[]}> = ({ title, desc, icon, tags }) => (
  <div className="bg-white p-10 rounded-[40px] border-2 border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-gold transition-all duration-300 group cursor-pointer">
    <div className="w-20 h-20 bg-royal-blue rounded-3xl flex items-center justify-center text-white mb-10 group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-xl">
      <span className="text-4xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-royal-blue transition-colors">{title}</h3>
    <p className="text-slate-600 font-medium leading-relaxed mb-8">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-slate-100 text-royal-blue text-[10px] font-black uppercase rounded-lg tracking-widest border border-slate-100 group-hover:border-gold/30 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h2 className="text-gold font-black text-xs uppercase tracking-[0.3em] mb-4">Core Strategic Units</h2>
          <h3 className="text-5xl lg:text-6xl font-black text-royal-blue leading-[1.1] tracking-tighter">Everything required to conquer the Malaysian market.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceCard 
            title="Sdn Bhd Formation" 
            desc="Full 100% Foreign Owned Incorporation. We handle SSM filing, Name Reservation, and Company Secretary appointment in 48 hours."
            icon="🏢"
            tags={["100% Foreign", "SSM Express", "Sec-Sec"]}
          />
          <ServiceCard 
            title="Global Immigration" 
            desc="Authorized MDEC/ESD handling for EP Category I, II, & III. Guaranteed PVP and Dependent Pass processing with 98% approval rate."
            icon="🛂"
            tags={["EP I/II/III", "MDEC", "ESD"]}
          />
          <ServiceCard 
            title="Regulatory Licensing" 
            desc="Specialized licensing including WRT (Retail), CIDB (Construction), and DBKL Local Council approvals for operational readiness."
            icon="📜"
            tags={["WRT License", "CIDB", "DBKL/MBPJ"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
