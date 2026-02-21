
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import AIServiceTool from './components/AIServiceTool.tsx';
import Footer from './components/Footer.tsx';
import CompanySecretarial from './components/CompanySecretarial.tsx';
import AccountingBookkeeping from './components/AccountingBookkeeping.tsx';
import TaxCompliance from './components/TaxCompliance.tsx';
import BusinessLicensing from './components/BusinessLicensing.tsx';
import LocalCouncilLicensing from './components/LocalCouncilLicensing.tsx';
import CorporateServices from './components/CorporateServices.tsx';
import ImmigrationSupport from './components/ImmigrationSupport.tsx';
import BuySellBusiness from './components/BuySellBusiness.tsx';
import ContactPage from './components/ContactPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import AnimatedCounter from './components/AnimatedCounter.tsx';
import ServiceGrid from './components/ServiceGrid.tsx';
import TypingText from './components/TypingText.tsx';
import { MessageCircle } from 'lucide-react';

// App Component - Main Entry Point
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === 'home' ? (
        <>
          <div id="home">
            <Hero />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
            <div className="bg-royal-blue rounded-[40px] p-8 sm:p-10 shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-500 hover:shadow-gold/20 hover:scale-[1.02] hover:-translate-y-1 hover:border-gold/20 group">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-16 h-16 rounded-2xl border-4 border-royal-blue object-cover shadow-lg group-hover:rotate-3 transition-transform duration-300" alt="Founder" />
                ))}
                <div className="w-16 h-16 rounded-2xl border-4 border-royal-blue bg-gold flex items-center justify-center text-royal-blue text-xs font-black shadow-lg">
                  <AnimatedCounter target="+500" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xl font-black text-white uppercase tracking-tight group-hover:text-gold transition-colors">The Trust Benchmark</p>
                <p className="text-blue-100 font-medium text-sm">Empowering founders from 40+ nations to dominate in Malaysia.</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md group-hover:bg-white/20 transition-all">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20" style={{ transitionDelay: `${s * 50}ms` }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-white text-2xl leading-none">4.9/5</span>
                  <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Google Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION ID: ABOUT (PART 1: THE NARRATIVE) */}
          <section id="about" className="bg-white py-16 sm:py-24 relative overflow-hidden scroll-mt-20 group/about-section">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q 250 50 500 100 T 1000 100' stroke='%23051622' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="relative animate-fadeIn group/about-img">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl z-10 border-4 border-white transition-all duration-500 group-hover/about-img:border-gold">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="BizFlow Executive" />
                  </div>
                  <div className="absolute -bottom-10 -right-4 lg:-right-10 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white hidden sm:block transition-all duration-500 group-hover/about-img:border-gold group-hover/about-img:-translate-y-2">
                    <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Team Consultation" />
                  </div>
                  <div className="absolute bottom-6 sm:bottom-10 left-[-10px] sm:left-[-20px] bg-[#051622] text-white p-6 lg:p-10 rounded-2xl shadow-2xl z-30 border-b-4 border-gold group-hover/about-img:scale-110 transition-transform">
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 leading-none tracking-tighter">
                      <AnimatedCounter target="12+" />
                    </p>
                    <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200">Experiences</p>
                  </div>
                </div>
                <div className="space-y-6 sm:space-y-8 lg:pl-10 text-center lg:text-left">
                  <div>
                    <span className="text-[#051622] font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] block mb-4">Our Narrative</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#051622] leading-[1.1] mb-6 sm:mb-8 tracking-tighter uppercase">We Execute Our <br className="hidden sm:block"/> Ideas From Start <br className="hidden sm:block"/> To Finish</h2>
                    <div className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-8 sm:mb-10 min-h-[5rem] sm:min-h-[6rem]">
                      <TypingText 
                        text="BizFlow is Malaysia’s premium strategic launchpad for global entrepreneurs. We handle the heavy lifting of compliance and operational setup so you can focus on building your empire from day one."
                        speed={20}
                        delay={500}
                        triggerOnView={true}
                      />
                    </div>
                    <div className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
                      {['End-to-End Execution', 'Clear Client Guidance', 'Strategic & Compliant Planning'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                          <div className="w-6 h-6 rounded-full border border-[#051622]/20 flex items-center justify-center text-[#051622] group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="font-bold text-[#051622] text-xs sm:text-sm uppercase tracking-widest group-hover:text-gold transition-colors">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-8 pt-6">
                    <button onClick={() => handleNavigate('about')} className="px-10 sm:px-12 py-4 sm:py-5 bg-[#E91E63] text-white font-black rounded-xl hover:bg-[#C2185B] hover:scale-105 transition-all shadow-xl uppercase tracking-[0.2em] text-[10px] sm:text-xs">Discover More</button>
                    <div className="flex items-center gap-5 bg-[#051622] p-4 sm:p-5 pr-8 sm:pr-10 rounded-xl text-white shadow-2xl border-l-4 border-gold hover:translate-x-2 transition-transform cursor-default">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white/5 flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xl sm:text-2xl font-black leading-none mb-1">
                          <AnimatedCounter target="1500+" />
                        </p>
                        <p className="text-[8px] sm:text-[10px] font-bold text-blue-200 uppercase tracking-widest">Successful Cases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION ID: CTA-STATS (PART 2: STATS GRID) */}
          <section id="cta-stats" className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { val: "500+", sub: "Companies Served" },
                  { val: "2,000+", sub: "Individuals Assisted" },
                  { val: "25+", sub: "Industries Covered" },
                  { val: "100%", sub: "Compliance Approach" }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="water-tank-box bg-white p-8 sm:p-10 rounded-[24px] sm:rounded-[30px] shadow-sm border-2 border-slate-200 text-center transform hover:-translate-y-2 hover:border-gold hover:shadow-xl transition-all duration-500 group cursor-default"
                    style={{ '--fill-color': 'rgba(0, 51, 102, 0.15)' } as React.CSSProperties}
                  >
                    <div className="water-tank-liquid"></div>
                    
                    {/* Bubbles */}
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bubble" 
                        style={{ 
                          left: `${Math.random() * 100}%`, 
                          width: `${Math.random() * 12 + 6}px`, 
                          height: `${Math.random() * 12 + 6}px`, 
                          '--bubble-duration': `${Math.random() * 4 + 2}s`,
                          animationDelay: `${Math.random() * 5}s`
                        } as React.CSSProperties}
                      ></div>
                    ))}

                    <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#051622] mb-3 tracking-tighter group-hover:text-royal-blue transition-colors">
                      <AnimatedCounter target={stat.val} />
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:text-royal-blue transition-colors">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW HIGH-IMPACT DARK CTA SECTION (PART 3: FINAL CALL TO ACTION) */}
          <section id="final-cta" className="relative py-20 sm:py-32 overflow-hidden group">
            <div className="absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Global Office" />
              <div className="absolute inset-0 bg-[#051622]/85 group-hover:bg-[#051622]/75 transition-colors duration-500"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fadeIn text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white leading-[1.1] uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                  Ready To Simplify Your <br className="hidden lg:block"/> Business In Malaysia?
                </h2>
                <p className="text-blue-100/70 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Get expert support for company registration, licensing, immigration, visas, and compliance — handled professionally from start to approval.
                </p>
                <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <button 
                    onClick={() => handleNavigate('contact')}
                    className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-7 bg-gold text-navy-dark font-black rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-2xl hover:shadow-gold/40 uppercase tracking-[0.3em] text-[12px] sm:text-sm"
                  >
                    Get Expert Consultation
                  </button>
                  <div className="flex items-center gap-4 text-white/50 group-hover:text-gold transition-colors">
                    <span className="w-8 sm:w-12 h-px bg-white/20 group-hover:bg-gold/40 transition-colors"></span>
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Immediate Response Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Dashed Line Pattern */}
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none overflow-hidden group-hover:opacity-20 transition-opacity">
              <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="-100" y1="100" x2="500" y2="700" stroke="white" strokeWidth="2" strokeDasharray="20 20" />
                <line x1="-100" y1="200" x2="500" y2="800" stroke="white" strokeWidth="2" strokeDasharray="20 20" />
                <line x1="-100" y1="0" x2="500" y2="600" stroke="white" strokeWidth="2" strokeDasharray="20 20" />
              </svg>
            </div>
          </section>

          <Services />
          <ServiceGrid onNavigate={handleNavigate} />
          <AIServiceTool id="wizard" type="roadmap" title="Smart Setup Wizard" subtitle="Receive a hard-hitting compliance roadmap in 15 seconds." />
          <AIServiceTool id="visa" type="visa" title="Official Visa Checker" subtitle="Verify your eligibility for Malaysia's passes instantly." />
        </>
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'company-secretarial' ? (
        <CompanySecretarial />
      ) : currentPage === 'accounting' ? (
        <AccountingBookkeeping />
      ) : currentPage === 'tax' ? (
        <TaxCompliance />
      ) : currentPage === 'licensing' ? (
        <BusinessLicensing />
      ) : currentPage === 'local-licensing' ? (
        <LocalCouncilLicensing />
      ) : currentPage === 'corporate' ? (
        <CorporateServices />
      ) : currentPage === 'visa' ? (
        <ImmigrationSupport />
      ) : currentPage === 'buy-sell' ? (
        <BuySellBusiness />
      ) : currentPage === 'contact' ? (
        <ContactPage />
      ) : (
        <div className="py-40 text-center">
          <h2 className="text-4xl font-black text-royal-blue mb-8">Service coming soon!</h2>
          <button onClick={() => handleNavigate('home')} className="px-8 py-4 bg-royal-blue text-white font-bold rounded-lg uppercase tracking-widest">Back Home</button>
        </div>
      )}

      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/601124244993" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative">
          {/* Pulsing Effect */}
          <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75"></div>
          
          {/* Button Container */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gold rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white">
            <svg className="w-8 h-8 sm:w-9 sm:h-9 text-royal-blue fill-royal-blue" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-4 py-2 bg-navy-dark text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-navy-dark rotate-45"></div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default App;
