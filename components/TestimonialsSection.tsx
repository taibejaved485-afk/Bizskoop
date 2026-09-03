import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Quote, 
  Building2, 
  Globe2, 
  ArrowRight, 
  Sparkles, 
  Award,
  Play,
  Pause,
  SlidersHorizontal,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  avatarUrl: string;
  avatarBg: string;
  initials: string;
  service: string;
  highlightMetric: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
  category: 'formation' | 'visa' | 'licensing' | 'tax';
}

const ROW_1: Testimonial[] = [
  {
    id: 't1',
    name: 'Alexander Wright',
    role: 'Managing Director',
    company: 'FinTech Pulse Group',
    country: 'United Kingdom',
    flag: '🇬🇧',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-blue-600 to-indigo-700',
    initials: 'AW',
    service: 'Sdn Bhd + ESD Tier-1 EP',
    highlightMetric: '⚡ 3-Day Incorporation',
    rating: 5,
    quote: 'Bizskoop incorporated our Malaysian subsidiary in exactly 3 working days. Their direct liaison with ESD for our Key Personnel Employment Passes was completely seamless without any back-and-forth.',
    date: 'Feb 2026',
    verified: true,
    category: 'formation',
  },
  {
    id: 't2',
    name: 'Tan Wei Ming',
    role: 'Regional VP Operations',
    company: 'Nexus Supply Chain Pte Ltd',
    country: 'Singapore',
    flag: '🇸🇬',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-emerald-600 to-teal-700',
    initials: 'WM',
    service: 'Corporate Secretarial & Tax',
    highlightMetric: '🛡️ Zero Penalty Audit',
    rating: 5,
    quote: 'Handling cross-border statutory compliance between Singapore and KL used to be a headache. Bizskoop’s digital secretarial portal and tax advisory saved us months of bureaucratic delays.',
    date: 'Jan 2026',
    verified: true,
    category: 'tax',
  },
  {
    id: 't3',
    name: 'Dr. Kenji Takahashi',
    role: 'Chief Scientific Officer',
    company: 'BioMed BioTech Asia',
    country: 'Japan',
    flag: '🇯🇵',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-rose-600 to-red-700',
    initials: 'KT',
    service: 'MDEC Tech Status + EP',
    highlightMetric: '🚀 Fast Quota Grant',
    rating: 5,
    quote: 'Their deep familiarity with MDEC Malaysia Digital guidelines helped our biotechnology R&D lab secure tech pioneer incentives and expatriate quota allocations within three weeks.',
    date: 'Jan 2026',
    verified: true,
    category: 'visa',
  },
  {
    id: 't4',
    name: 'Sarah Jenkins',
    role: 'Co-Founder & CEO',
    company: 'AeroCloud Solutions',
    country: 'Australia',
    flag: '🇦🇺',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-amber-600 to-orange-700',
    initials: 'SJ',
    service: 'Sdn Bhd + WRT License',
    highlightMetric: '🌐 100% Foreign Equity',
    rating: 5,
    quote: 'As 100% foreign shareholders, we were worried about WRT foreign equity regulations. The senior legal team at Bizskoop walked us through compliance with complete transparency.',
    date: 'Dec 2025',
    verified: true,
    category: 'licensing',
  },
  {
    id: 't5',
    name: 'Sheikh Tariq Al-Mansoor',
    role: 'Investment Director',
    company: 'Al-Noor Gulf Ventures',
    country: 'UAE (Dubai)',
    flag: '🇦🇪',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-purple-600 to-indigo-800',
    initials: 'TM',
    service: 'Corporate Advisory & M&A',
    highlightMetric: '🏛️ RM 14M Acquisition',
    rating: 5,
    quote: 'Exceptional due diligence and valuation services when acquiring a majority stake in a Selangor logistics firm. Their local insight and legal documentation are second to none in KL.',
    date: 'Nov 2025',
    verified: true,
    category: 'formation',
  },
  {
    id: 't6',
    name: 'Maximilian Bauer',
    role: 'Head of Industrial Expansion',
    company: 'Bauer Precision Engineering',
    country: 'Germany',
    flag: '🇩🇪',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-slate-700 to-slate-900',
    initials: 'MB',
    service: 'Local Council & CIDB Licensing',
    highlightMetric: '🏭 Premise Factory Pass',
    rating: 5,
    quote: 'From factory premise zoning at MBPJ to specialized contractor filings, Bizskoop handled all physical government inspections with absolute precision and no hidden charges.',
    date: 'Oct 2025',
    verified: true,
    category: 'licensing',
  },
];

const ROW_2: Testimonial[] = [
  {
    id: 't7',
    name: 'David H. Miller',
    role: 'Managing Partner',
    company: 'Pacific Crest Ventures',
    country: 'United States',
    flag: '🇺🇸',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-blue-700 to-sky-600',
    initials: 'DM',
    service: 'Fast-Track Sdn Bhd Setup',
    highlightMetric: '💼 10-Day Bank KYC',
    rating: 5,
    quote: 'Opening corporate commercial bank accounts in Malaysia for US nationals can be tedious. Bizskoop’s banking liaison team pre-cleared our KYC pack and expedited account opening in 10 days.',
    date: 'Feb 2026',
    verified: true,
    category: 'formation',
  },
  {
    id: 't8',
    name: 'Sanjay Singhania',
    role: 'Chief Executive Officer',
    company: 'Veda IT Outsourcing',
    country: 'India',
    flag: '🇮🇳',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-orange-600 to-amber-700',
    initials: 'SS',
    service: 'ESD Expatriate Visas (24 Passes)',
    highlightMetric: '🛂 24 Visas Approved',
    rating: 5,
    quote: 'Relocating our engineering cohort of 24 software developers from Bangalore to Bangsar South was achieved without a single rejection. Outstanding visa filing and documentation accuracy.',
    date: 'Jan 2026',
    verified: true,
    category: 'visa',
  },
  {
    id: 't9',
    name: 'Chloe Dubois',
    role: 'Operations Director',
    company: 'Maison Luxe Lifestyle',
    country: 'France',
    flag: '🇫🇷',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-pink-600 to-rose-700',
    initials: 'CD',
    service: 'DBKL License & Signboard Filing',
    highlightMetric: '🏢 KLCC Boutique Open',
    rating: 5,
    quote: 'Securing a retail flagship license in Pavilion Bukit Bintang requires strict municipal adherence. Bizskoop had our composite commercial license fully stamped ahead of grand opening.',
    date: 'Dec 2025',
    verified: true,
    category: 'licensing',
  },
  {
    id: 't10',
    name: 'Karthik Subramaniam',
    role: 'Founder & CTO',
    company: 'PayFlow Payment Tech',
    country: 'Singapore',
    flag: '🇸🇬',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-emerald-700 to-teal-800',
    initials: 'KS',
    service: 'BNM Regulatory Advisory',
    highlightMetric: '💰 Fintech Regulatory Fit',
    rating: 5,
    quote: 'The team clarified Bank Negara Malaysia compliance mandates for foreign-backed merchant aggregators. Their strategic clarity saved our board substantial consultancy fees.',
    date: 'Nov 2025',
    verified: true,
    category: 'formation',
  },
  {
    id: 't11',
    name: 'Lucas van der Berg',
    role: 'Managing Director',
    company: 'Nordic AgriTech Far East',
    country: 'Netherlands',
    flag: '🇳🇱',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-indigo-600 to-blue-800',
    initials: 'LV',
    service: 'Halal Certification & SSM',
    highlightMetric: '🌙 JAKIM Approved',
    rating: 5,
    quote: 'Navigating JAKIM Halal standards and SSM constitutional clauses for agricultural imports was made effortless by Bizskoop’s certified regulatory consultants.',
    date: 'Oct 2025',
    verified: true,
    category: 'licensing',
  },
  {
    id: 't12',
    name: 'Hassan Al-Zahrani',
    role: 'Director of Capital Projects',
    company: 'Arabian Gulf Trade Hub',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-green-700 to-emerald-900',
    initials: 'HA',
    service: 'Wholesale & Retail Trade (WRT)',
    highlightMetric: '📑 KPDN License Bound',
    rating: 5,
    quote: 'Our 100% foreign equity trading permit (WRT) with KPDN was executed cleanly. Transparent fees, weekly milestone updates, and true Malaysian corporate professionalism.',
    date: 'Sep 2025',
    verified: true,
    category: 'licensing',
  },
];

const ROW_3: Testimonial[] = [
  {
    id: 't13',
    name: 'Jonathan Briggs',
    role: 'Senior VP Corporate Development',
    company: 'Apex Media Holdings',
    country: 'Canada',
    flag: '🇨🇦',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-red-600 to-rose-800',
    initials: 'JB',
    service: 'Corporate Restructuring',
    highlightMetric: '⚖️ Companies Act 2016',
    rating: 5,
    quote: 'Bizskoop orchestrated our cross-border share transfer and corporate restructuring under the Companies Act 2016 without disrupting our daily operations. Top-tier corporate secretarial unit.',
    date: 'Feb 2026',
    verified: true,
    category: 'formation',
  },
  {
    id: 't14',
    name: 'Rian Pratama',
    role: 'Group Managing Director',
    company: 'Nusantara Logistics Raya',
    country: 'Indonesia',
    flag: '🇮🇩',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-red-700 to-amber-700',
    initials: 'RP',
    service: 'Port Klang Customs & SSM',
    highlightMetric: '🚢 Port Klang Cleared',
    rating: 5,
    quote: 'Setting up our bonded warehouse subsidiary in Port Klang went smoothly from company registration to customs liaison. Their response time is exceptional.',
    date: 'Jan 2026',
    verified: true,
    category: 'formation',
  },
  {
    id: 't15',
    name: 'Elena Rostova',
    role: 'Chief Information Officer',
    company: 'Vanguard Cyber Systems',
    country: 'Switzerland',
    flag: '🇨🇭',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-slate-800 to-indigo-950',
    initials: 'ER',
    service: 'MD Status Cyber Security',
    highlightMetric: '💻 MDEC MD Status',
    rating: 5,
    quote: 'Securing our expatriate key passes via MDEC’s Malaysia Digital charter was approved in record time. They are honest, responsive, and completely transparent with local laws.',
    date: 'Dec 2025',
    verified: true,
    category: 'visa',
  },
  {
    id: 't16',
    name: 'Marcus Vance',
    role: 'Executive Chairman',
    company: 'Pacific Rim Energy Ltd',
    country: 'New Zealand',
    flag: '🇳🇿',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-teal-600 to-cyan-800',
    initials: 'MV',
    service: 'Annual Audit & LHDN Filing',
    highlightMetric: '📊 100% Tax Compliant',
    rating: 5,
    quote: 'We outsourced our Malaysian accounting, SST tax returns, and annual statutory audit to Bizskoop. Every filing has been on-time and zero-penalty compliant for two consecutive years.',
    date: 'Nov 2025',
    verified: true,
    category: 'tax',
  },
  {
    id: 't17',
    name: 'Sunita Mehra',
    role: 'Head of Global Mobility',
    company: 'Apex Health International',
    country: 'Singapore',
    flag: '🇸🇬',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-purple-700 to-pink-800',
    initials: 'SM',
    service: 'PVP & Expat Medical Pass',
    highlightMetric: '🏥 MOH Medical Clearance',
    rating: 5,
    quote: 'Bizskoop expedited our specialist surgical staff visas under the Professional Visit Pass category with the Malaysian Ministry of Health and Immigration Department. Unbeatable service.',
    date: 'Oct 2025',
    verified: true,
    category: 'visa',
  },
  {
    id: 't18',
    name: 'Gavin Sterling',
    role: 'Managing Director',
    company: 'Sterling Hospitality Ventures',
    country: 'Hong Kong',
    flag: '🇭🇰',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    avatarBg: 'from-amber-700 to-yellow-900',
    initials: 'GS',
    service: 'F&B Council & Liquor Licensing',
    highlightMetric: '🍸 KLCC BOMBA & Council',
    rating: 5,
    quote: 'Opening a high-end restaurant venue in KLCC required complex municipal, BOMBA fire safety, and entertainment permits. Bizskoop’s on-ground team managed every single inspection.',
    date: 'Sep 2025',
    verified: true,
    category: 'licensing',
  },
];

interface TestimonialsSectionProps {
  onNavigate?: (page: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onNavigate }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'formation' | 'visa' | 'licensing' | 'tax'>('all');

  const filterItem = (t: Testimonial) => {
    if (selectedFilter === 'all') return true;
    return t.category === selectedFilter;
  };

  const renderCard = (t: Testimonial) => {
    const isMuted = selectedFilter !== 'all' && t.category !== selectedFilter;

    return (
      <div
        key={t.id}
        className={`w-[320px] sm:w-[360px] flex-shrink-0 mx-2 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_12px_rgba(0,51,102,0.04)] hover:shadow-[0_10px_25px_rgba(0,51,102,0.10)] hover:border-gold/70 transition-all duration-300 flex flex-col justify-between group cursor-default relative overflow-hidden ${
          isMuted ? 'opacity-35 grayscale' : 'opacity-100'
        }`}
      >
        {/* Top Gold Shimmer Border on Hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal-blue via-gold to-royal-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Header Row: Service Badge + Highlight Metric + Stars */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-slate-100 text-royal-blue border border-slate-200 group-hover:bg-amber-50 group-hover:text-amber-950 transition-colors">
              <Building2 size={10} className="text-gold" />
              <span className="truncate max-w-[130px]">{t.service}</span>
            </span>

            <span className="inline-flex items-center text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-royal-blue border border-blue-100/80">
              {t.highlightMetric}
            </span>
          </div>

          {/* Rating & Date */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-0.5" aria-label={`Rating: ${t.rating} out of 5 stars`}>
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[10px] font-black text-slate-700 ml-1">5.0</span>
            </div>
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
              {t.date}
            </span>
          </div>

          {/* Quote text: compact and tight */}
          <div className="relative mb-2.5">
            <p className="text-[11.5px] sm:text-[12px] text-slate-600 font-medium leading-relaxed italic line-clamp-2">
              "{t.quote}"
            </p>
          </div>
        </div>

        {/* Footer: Compact Client Identity */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Real Avatar */}
            <div className="relative shrink-0">
              <img
                src={t.avatarUrl}
                alt={t.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-8 h-8 rounded-xl object-cover ring-1.5 ring-slate-100 shadow-xs"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              <div 
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${t.avatarBg} text-white font-black text-[10px] flex items-center justify-center ring-1.5 ring-slate-100 shadow-xs absolute inset-0 -z-10`}
              >
                {t.initials}
              </div>
              <span 
                className="absolute -bottom-1 -right-1 text-[10px] bg-white rounded-full px-0.5 shadow-xs border border-slate-100" 
                title={t.country}
              >
                {t.flag}
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-black text-slate-900 truncate leading-tight group-hover:text-royal-blue transition-colors">
                {t.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5">
                {t.role}, <span className="text-slate-700 font-bold">{t.company}</span>
              </p>
            </div>
          </div>

          {t.verified && (
            <div 
              className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70" 
              title="Official SSM / ESD Verified Case"
            >
              <BadgeCheck size={11} className="text-emerald-600" />
              <span className="text-[8.5px] font-black uppercase tracking-wider hidden sm:inline">SSM Verified</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const filterTabs = [
    { id: 'all', label: 'All Reviews (18)' },
    { id: 'formation', label: '⚡ Formation' },
    { id: 'visa', label: '🛂 Visas' },
    { id: 'licensing', label: '🏢 Council & WRT' },
    { id: 'tax', label: '📊 Tax' },
  ] as const;

  return (
    <section className="py-12 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Subtle Luxury Dot-Matrix Background */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7 text-center relative z-10">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-royal-blue/5 via-gold/10 to-royal-blue/5 border border-gold/30 mb-2.5 shadow-xs"
        >
          <Sparkles size={11} className="text-gold" />
          <span className="text-[10px] font-black uppercase tracking-widest text-royal-blue">
            Client Success & Case Histories
          </span>
          <Award size={11} className="text-gold" />
        </motion.div>

        {/* Section Heading: Compact font size & tight leading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-black text-royal-blue uppercase tracking-tight leading-tight"
        >
          Trusted by <span className="text-gold">500+ Global Founders</span> & Enterprises
        </motion.h2>

        {/* Compact Combined Scoreboard & Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Quick Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[11px] font-black text-slate-800">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.98/5.0</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700">100% SSM Compliant</span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-[10.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-royal-blue text-white shadow-xs scale-102 ring-1 ring-gold/40'
                      : 'bg-white text-slate-600 hover:text-royal-blue hover:bg-slate-50 border border-slate-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            {/* Pause / Play Button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-white border border-slate-200/80 text-slate-700 hover:text-royal-blue transition-all cursor-pointer"
              title={isPaused ? "Resume Marquee" : "Pause Marquee"}
            >
              {isPaused ? <Play size={11} className="text-emerald-600" /> : <Pause size={11} className="text-amber-600" />}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Horizontal Marquee Rows Container - Tighter Spacing */}
      <div className="relative w-full space-y-2.5 overflow-hidden py-1">
        {/* Gradient Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-20" />

        {/* Row 1: Scrolling LEFT (RTL) */}
        <div className="w-full overflow-hidden flex">
          <div 
            className="animate-marquee-rtl marquee-normal flex"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {ROW_1.map(renderCard)}
            {ROW_1.map(renderCard)}
          </div>
        </div>

        {/* Row 2: Scrolling RIGHT (LTR) */}
        <div className="w-full overflow-hidden flex">
          <div 
            className="animate-marquee-ltr marquee-fast flex"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {ROW_2.map(renderCard)}
            {ROW_2.map(renderCard)}
          </div>
        </div>

        {/* Row 3: Scrolling LEFT (RTL) */}
        <div className="w-full overflow-hidden flex">
          <div 
            className="animate-marquee-rtl marquee-slow flex"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {ROW_3.map(renderCard)}
            {ROW_3.map(renderCard)}
          </div>
        </div>
      </div>

      {/* Bottom Consultation Ribbon: Compact & Slim */}
      <div className="max-w-4xl mx-auto px-4 mt-8 relative z-10">
        <div className="py-4 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-royal-blue via-[#002244] to-navy-dark text-white shadow-lg relative overflow-hidden border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck size={16} className="text-gold shrink-0" />
              <span>Ready to Launch Your Sdn Bhd in Malaysia?</span>
            </h3>
            <p className="text-[11px] text-blue-100/75 mt-0.5 font-medium">
              Free 20-min strategy diagnostic with Menara Binjai KLCC corporate secretaries.
            </p>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('contact') : window.location.assign('#contact')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold to-amber-400 hover:from-amber-400 hover:to-gold text-royal-blue font-black text-[11px] uppercase tracking-wider shadow-md hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
