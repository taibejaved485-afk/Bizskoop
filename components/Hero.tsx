import React from 'react';
import AnimatedCounter from './AnimatedCounter.tsx';
import TypingText from './TypingText.tsx';
import Airplane from './Airplane.tsx';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-20 pb-32 overflow-hidden min-h-[85vh] flex items-center">
      {/* 1. Background Image Layer with Sophisticated Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/1200x/60/60/67/60606708179d33e4ddc01a4695a40a9e.jpg" 
          className="w-full h-full object-cover"
          alt="Kuala Lumpur Skyline Background"
        />
        {/* Adjusted multi-layered overlay for better image visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-white/40 lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 backdrop-blur-sm border border-blue-100 text-royal-blue text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent-yellow animate-pulse"></span>
              Fast-Track Approval Specialists
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Launch Your <br/>
              <span className="text-royal-blue">Malaysia Business</span> <br/>
              with Zero Friction.
            </h1>
            
            <div className="text-xl text-slate-800 mb-12 leading-relaxed max-w-xl font-bold bg-white/30 backdrop-blur-[2px] rounded-lg p-2 min-h-[5rem]">
              <TypingText 
                text="From Company Incorporation to Employment Passes. We bypass the bureaucracy. 100% Compliant. No Hidden Fees. Fast Results."
                speed={25}
                delay={800}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a 
                href="#wizard" 
                className="liquid-box w-full sm:w-auto px-10 py-5 bg-action-red text-white font-black rounded-2xl transition-all shadow-2xl shadow-red-600/20 transform hover:-translate-y-1 text-center uppercase tracking-widest group"
                style={{ '--fill-color': '#990000' } as React.CSSProperties}
              >
                <div className="liquid-wave"></div>
                <span>Start My Business Wizard</span>
              </a>
              <a 
                href="#visa" 
                className="liquid-box w-full sm:w-auto px-10 py-5 bg-white/90 backdrop-blur-md text-royal-blue font-black rounded-2xl border-2 border-[#003366] transition-all text-center uppercase tracking-widest hover:text-white group"
                style={{ '--fill-color': '#003366' } as React.CSSProperties}
              >
                <div className="liquid-wave"></div>
                <span>Check Visa Status</span>
              </a>
            </div>

            <div className="mt-16 flex items-center gap-10 opacity-100">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-royal-blue">
                  <AnimatedCounter target="500+" />
                </span>
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Setup Successful</span>
              </div>
              <div className="w-px h-10 bg-slate-400"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-royal-blue">
                  <AnimatedCounter target="100%" />
                </span>
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">SSM Compliance</span>
              </div>
              <div className="w-px h-10 bg-slate-400"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-royal-blue">
                  <AnimatedCounter target="4.9/5" />
                </span>
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Google Rated</span>
              </div>
            </div>
          </div>
          
          <div className="relative group animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-royal-blue/10 rounded-[40px] -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-500"></div>
            
            {/* Floating Airplane Animation */}
            <div className="absolute -top-12 -right-12 z-30 hidden xl:block">
              <Airplane size={80} color="#D4AF37" />
            </div>
            <div className="absolute top-1/2 -left-20 z-0 opacity-20 hidden lg:block">
              <Airplane size={120} color="#003366" />
            </div>

            <img 
              src="https://i.pinimg.com/736x/4f/d6/45/4fd64566a496266abfb11dda065cbc2b.jpg" 
              className="relative rounded-[40px] shadow-2xl border-8 border-white object-cover aspect-square z-10"
              alt="Elite Business Environment"
            />
            
            {/* Enhanced Testimonial Card with Rotating Glow Border */}
            <div className="absolute -bottom-10 -left-10 p-[2px] rounded-[32px] z-20 overflow-hidden group/card transform hover:scale-105 hover:-rotate-1 transition-all duration-500 shadow-2xl max-w-xs">
              {/* Rotating Glow Layer - Only visible on hover */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#003366_50%,transparent_70%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              
              {/* Inner Content Box */}
              <div className="relative bg-accent-yellow p-8 rounded-[30px] border-4 border-white z-10 h-full">
                <div className="flex text-royal-blue mb-2">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-lg group-hover/card:scale-125 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>★</span>)}
                </div>
                <p className="text-royal-blue font-black text-sm mb-1 uppercase tracking-tight group-hover/card:translate-x-1 transition-transform">"Best service in KL"</p>
                <p className="text-royal-blue/80 text-xs leading-tight font-bold">Bizskoop handled everything from SSM to my EP in under 3 weeks. Incredible speed!</p>
                <p className="text-royal-blue font-black text-[10px] mt-4 uppercase">— John D., Tech Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;