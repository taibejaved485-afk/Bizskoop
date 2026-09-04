
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight, ShieldCheck, Globe, CreditCard, Lock, CheckCircle2, AlertCircle, Mail, Sparkles } from 'lucide-react';
import { sanitizeAndGetSiteConfig, SITE_CONFIG_UPDATED_EVENT, DEFAULT_SITE_CONFIG, SiteConfig, getStoredLeads, LEADS_UPDATED_EVENT } from '../services/leadStorage.ts';
import { BizskoopLogo } from './BizskoopLogo.tsx';

interface FooterProps {
  onOpenPolicy?: (policy: string) => void;
  onNavigate?: (page: string) => void;
  onOpenAdmin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onNavigate, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  const [unreadCount, setUnreadCount] = useState(0);

  // Business Insights Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  // Basic email validation regex
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);

    const trimmedEmail = newsletterEmail.trim();
    if (!trimmedEmail) {
      setNewsletterError('Please enter your business email address.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setNewsletterError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    setIsSubmittingNewsletter(true);
    try {
      const existing = JSON.parse(localStorage.getItem('bizskoop_newsletter_subscribers') || '[]');
      const alreadySubscribed = existing.some((sub: any) => sub.email?.toLowerCase() === trimmedEmail.toLowerCase());
      
      if (!alreadySubscribed) {
        existing.push({
          email: trimmedEmail,
          subscribedAt: new Date().toISOString(),
          source: 'Business Insights Newsletter'
        });
        localStorage.setItem('bizskoop_newsletter_subscribers', JSON.stringify(existing));
      }

      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error(err);
      setNewsletterSuccess(true);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  useEffect(() => {
    const loadConfig = () => {
      setConfig(sanitizeAndGetSiteConfig());
    };

    const updateUnreadCount = () => {
      const leads = getStoredLeads();
      const count = leads.filter((lead: any) => lead.status === 'unread').length;
      setUnreadCount(count);
    };

    loadConfig();
    updateUnreadCount();

    window.addEventListener(SITE_CONFIG_UPDATED_EVENT, loadConfig);
    window.addEventListener(LEADS_UPDATED_EVENT, updateUnreadCount);
    window.addEventListener('storage', updateUnreadCount);
    return () => {
      window.removeEventListener(SITE_CONFIG_UPDATED_EVENT, loadConfig);
      window.removeEventListener(LEADS_UPDATED_EVENT, updateUnreadCount);
      window.removeEventListener('storage', updateUnreadCount);
    };
  }, []);

  return (
    <footer className="relative bg-white pt-0 overflow-hidden">
      {/* Wavy Top with Silhouette */}
      <div className="relative w-full h-24 sm:h-36 -mb-px">
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
        
        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-[15%] text-gold/20 hidden lg:block"
        >
          <Globe size={52} strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-12 right-[20%] text-gold/10 hidden lg:block"
        >
          <ShieldCheck size={64} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#051622] text-white pb-3 lg:pb-4 relative z-10">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none select-none"
          style={{ 
            backgroundImage: `url("https://i.pinimg.com/736x/47/9d/68/479d684a4749f39776cca09afefca6b5.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24 relative z-20">
          {/* Footer Brand Header */}
          <div className="pt-10 pb-8 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <img 
                src="/footer-logo.png" 
                alt="BIZSKOOP" 
                className="h-6 sm:h-7 md:h-8 w-auto max-w-[160px] sm:max-w-[185px] md:max-w-[210px] object-contain transition-transform duration-300 group-hover:scale-105" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/Gemini_Generated_Image_iocel8iocel8ioce-removebg-preview.png') {
                    target.src = '/Gemini_Generated_Image_iocel8iocel8ioce-removebg-preview.png';
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100/70 font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck size={14} className="text-gold" />
                <span>SSM Licensed Secretaries</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Globe size={14} className="text-gold" />
                <span>Kuala Lumpur, Malaysia</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-10 lg:py-12 border-b border-white/10">
            
            {/* Column 1: Business Insights Newsletter */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] font-black uppercase tracking-wider">
                  <Sparkles size={11} />
                  <span>Business Insights</span>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white">
                  Business Insights Newsletter
                </h4>
                <p className="text-blue-100/60 text-xs sm:text-sm font-medium leading-relaxed">
                  Subscribe to receive executive Malaysian regulatory updates, corporate tax advisory, and foreign director compliance briefs directly in your inbox.
                </p>
              </div>

              {newsletterSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Subscribed to Business Insights!</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                    Thank you for subscribing! You will receive our next monthly corporate advisory and regulatory briefing.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsletterSuccess(false);
                      setNewsletterError(null);
                    }}
                    className="text-[11px] font-bold text-gold hover:text-amber-300 underline underline-offset-2 cursor-pointer pt-0.5 inline-block"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
                  <div className="space-y-1.5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <Mail size={16} />
                      </div>
                      <input 
                        type="email" 
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterError) setNewsletterError(null);
                        }}
                        placeholder="your.email@company.com" 
                        aria-label="Your email address for Business Insights newsletter"
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                          newsletterError ? 'border-red-400/80 focus:border-red-400' : 'border-white/10 focus:border-gold/50'
                        } rounded-xl text-white font-medium text-xs sm:text-sm outline-none transition-all placeholder:text-white/30`}
                      />
                    </div>
                    {newsletterError && (
                      <div className="flex items-center gap-1.5 text-xs text-red-300 font-medium px-1 pt-0.5">
                        <AlertCircle size={13} className="shrink-0 text-red-400" />
                        <span>{newsletterError}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button 
                      type="submit"
                      disabled={isSubmittingNewsletter}
                      className="w-full sm:w-auto px-6 py-3 bg-[#E91E63] hover:bg-gold hover:text-royal-blue text-white font-black rounded-xl transition-all uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmittingNewsletter ? 'Subscribing...' : 'Subscribe'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <p className="text-[10px] text-white/40 font-medium">
                    No spam. Unsubscribe at any time with 1-click.
                  </p>
                </form>
              )}
            </div>

            {/* Column 2: Terms & Conditions */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Legal & Policy</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Compliance Standards', 'Data Protection'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (onOpenPolicy) onOpenPolicy(item);
                      }}
                      className="text-blue-100/50 hover:text-gold text-sm font-bold transition-colors flex items-center gap-2 group text-left bg-transparent border-none p-0 cursor-pointer outline-none"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-colors"></div>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gold mb-4">Follow {config.companyName}</h5>
                <div className="flex items-center gap-3.5 flex-wrap">
                  {[
                    { 
                      renderIcon: () => <Facebook size={18} />, 
                      url: 'https://www.facebook.com/bizskoopofficial', 
                      label: 'Facebook' 
                    },
                    { 
                      renderIcon: () => <Linkedin size={18} />, 
                      url: 'https://www.linkedin.com/company/bizskoopofficial?originalSubdomain=my', 
                      label: 'LinkedIn' 
                    },
                    { 
                      renderIcon: () => <Instagram size={18} />, 
                      url: 'https://www.instagram.com/bizskoopofficial/', 
                      label: 'Instagram' 
                    },
                    { 
                      renderIcon: () => (
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.33 6.33 0 0 0 6.34-6.32V8.2a8.28 8.28 0 0 0 4.84 1.55V6.3a4.79 4.79 0 0 1-.92-.06v.45z"/>
                        </svg>
                      ), 
                      url: 'https://www.tiktok.com/@bizskoopofficial', 
                      label: 'TikTok' 
                    }
                  ].map(({ renderIcon, url, label }, i) => (
                    <a 
                      key={i} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`Visit Bizskoop on ${label}`} 
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold hover:text-slate-900 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {renderIcon()}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Information */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Information</h4>
              <ul className="space-y-4">
                {['Blog', 'FAQs', 'About us at Bizskoop', 'Bizskoop Legal', 'Our Methodology', 'Global Network'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if ((item === 'Blog' || item === 'Business Blog & Insights') && onNavigate) {
                          onNavigate('blog');
                        } else if (item === 'About us at Bizskoop' && onNavigate) {
                          onNavigate('about');
                        } else if (item === 'FAQs' && onNavigate) {
                          onNavigate('about');
                          setTimeout(() => {
                            const element = document.getElementById('faq');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.scrollTo({ top: 1200, behavior: 'smooth' });
                            }
                          }, 100);
                        } else if (item === 'Bizskoop Legal' && onOpenPolicy) {
                          onOpenPolicy('Privacy Policy');
                        } else if (onNavigate) {
                          onNavigate('about');
                        }
                      }}
                      className="text-blue-100/50 hover:text-gold text-sm font-bold transition-colors text-left bg-transparent border-none p-0 cursor-pointer outline-none"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-4 space-y-2">
                <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-white font-black text-lg tracking-tight block hover:text-gold transition-colors">
                  {config.phone}
                </a>
                <a href={`mailto:${config.email}`} className="text-blue-100/50 text-sm font-bold block hover:text-gold transition-colors">
                  {config.email}
                </a>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-tighter">Contact</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-white font-black text-sm uppercase mb-1">{config.companyName} Strategic</p>
                  <p className="text-blue-100/50 text-xs font-bold leading-relaxed">
                    Company number: 202401012345 (123456-X)
                  </p>
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase mb-1">Head office:</p>
                  <address className="not-italic text-blue-100/50 text-xs font-bold leading-relaxed whitespace-pre-line">
                    {config.address}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div className="pt-6 pb-2 flex flex-col items-center gap-4">
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

            <div className="text-center space-y-1.5">
              <p className="text-[10px] font-bold text-blue-100/30 uppercase tracking-[0.3em]">
                Part of {config.companyName} Group, serving entrepreneurs worldwide.
              </p>
              <p className="text-[11px] font-black text-blue-100/20 uppercase tracking-widest flex items-center justify-center gap-1.5">
                © 2024-{currentYear} {config.companyName.toUpperCase()}. ALL RIGHTS RESERVED.
                <button 
                  onClick={() => onOpenAdmin && onOpenAdmin()}
                  className="relative inline-flex items-center justify-center w-5 h-5 rounded-md border border-white/5 bg-white/5 opacity-[0.35] hover:opacity-100 text-gold hover:text-white transition-all duration-300 ml-1.5 cursor-pointer outline-none hover:bg-gold/10 hover:border-gold/30"
                  title="Authorised Admin Control"
                >
                  <Lock size={11} />
                  {/* Notification Badge */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gold border border-royal-blue text-[8px] font-black text-royal-blue items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    </span>
                  )}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
