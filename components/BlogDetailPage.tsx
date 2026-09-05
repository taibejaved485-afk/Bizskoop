import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  Share2, 
  Check, 
  Bookmark, 
  Building2, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  HelpCircle, 
  PhoneCall, 
  Printer, 
  ExternalLink,
  BookOpen,
  Award,
  Globe2,
  Receipt,
  Scale
} from 'lucide-react';
import { BlogPost, getStoredBlogPosts } from '../services/blogStorage.ts';

interface BlogDetailPageProps {
  post: BlogPost;
  onNavigate: (page: string, blogSlug?: string) => void;
  onBack: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onNavigate, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem('bizskoop_saved_articles') || '[]');
      return list.includes(post.id);
    } catch {
      return false;
    }
  });
  const [allPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.id]);

  const toggleSave = () => {
    try {
      const list = JSON.parse(localStorage.getItem('bizskoop_saved_articles') || '[]');
      const updated = list.includes(post.id)
        ? list.filter((id: string) => id !== post.id)
        : [...list, post.id];
      localStorage.setItem('bizskoop_saved_articles', JSON.stringify(updated));
      setSaved(!saved);
    } catch {
      setSaved(!saved);
    }
  };

  const copyArticleLink = () => {
    const url = `${window.location.origin}/#blog-${post.slug}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.status !== 'draft')
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50/50 pt-4 sm:pt-6 pb-20 text-slate-800">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-royal-blue hover:bg-slate-100 font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-gold" />
            <span>Back to All Articles</span>
          </button>

          {/* Breadcrumb path */}
          <nav className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button 
              type="button"
              onClick={() => onNavigate('home')} 
              className="hover:text-royal-blue transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <button 
              type="button"
              onClick={() => onNavigate('blog')} 
              className="hover:text-royal-blue transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-royal-blue font-bold truncate max-w-md">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Full-Width Content Container */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* Article Header Card */}
        <header className="w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200/80 mb-8">
          {/* Category Pill & Reading Time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-900">
              <Building2 size={13} className="text-amber-600" />
              {post.categoryLabel || 'Company Incorporation'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Clock size={13} className="text-gold" />
              {post.readTime || '5 min read'}
            </span>
            {post.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-royal-blue text-gold px-3 py-1 rounded-full">
                <Sparkles size={12} />
                Featured Guide
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-royal-blue uppercase tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-royal-blue/10 border border-gold/30 flex items-center justify-center overflow-hidden p-1 shadow-inner">
                <img 
                  src={post.author.avatar || '/favicon.png'} 
                  alt={post.author.name} 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/favicon.png';
                  }}
                />
              </div>
              <div>
                <p className="font-black text-royal-blue text-sm uppercase tracking-wide">
                  {post.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-gold" />
                    {post.publishedDate}
                  </span>
                  <span>•</span>
                  <span>10:52 am</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} className="text-slate-400" />
                    No Comments
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyArticleLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-gold hover:text-royal-blue text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                title="Copy direct link"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                type="button"
                onClick={toggleSave}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  saved 
                    ? 'bg-amber-50 border-amber-300 text-amber-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title={saved ? 'Saved to bookmarks' : 'Save article'}
              >
                <Bookmark size={15} className={saved ? 'fill-amber-600 text-amber-600' : ''} />
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all cursor-pointer hidden sm:block"
                title="Print article"
              >
                <Printer size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image Full Width Hero Banner */}
        {post.featuredImage && (
          <div className="mb-12">
            <div className="w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80 aspect-[16/9] max-h-[560px]">
              <img
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {post.imageCaption && (
              <p className="mt-3 text-center text-xs text-slate-500 font-medium italic">
                📷 {post.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Main Content Layout: 2-Column with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Article Content (8-9 cols on desktop) */}
          <div className="lg:col-span-8 xl:col-span-8 2xl:col-span-9 space-y-10">
            
            {/* Guide Subtitle Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-royal-blue text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase tracking-wider mb-3">
                Official 2026 Statutory Advisory
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3">
                {post.title}
              </h2>
              {post.content.summary && (
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-medium">
                  {post.content.summary}
                </p>
              )}
            </div>

            {/* Key Takeaways Box */}
            {post.content.takeaways && post.content.takeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 border border-amber-200/90 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5 text-amber-950">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-700">
                    <CheckCircle2 size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-amber-950">
                      Key Takeaways & Executive Summary
                    </h3>
                    <p className="text-[11px] text-amber-900/70 font-medium">
                      Core milestones and compliance considerations for this advisory
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {post.content.takeaways.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-amber-950/90 font-medium leading-relaxed bg-white/70 p-3 rounded-2xl border border-amber-200/50">
                      <span className="w-6 h-6 rounded-full bg-gold text-royal-blue text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Body Sections */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-10">
              
              {post.content.sections.map((section, idx) => {
                const isStep = section.heading.toLowerCase().startsWith('step');
                const isDocSection = section.heading.toLowerCase().includes('documents required') && post.id.includes('sdn-bhd');
                const isTimelineSection = section.heading.toLowerCase().includes('how long') && post.id.includes('sdn-bhd');

                return (
                  <section 
                    key={idx} 
                    id={`section-${idx}`}
                    className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0 border-slate-100 scroll-mt-24"
                  >
                    <div className="flex items-start gap-3">
                      {isStep && (
                        <span className="px-2.5 py-1 rounded-lg bg-gold/20 text-royal-blue font-black text-xs uppercase tracking-wider shrink-0 mt-1">
                          Phase 0{idx}
                        </span>
                      )}
                      <h2 className="text-lg sm:text-2xl font-black text-royal-blue uppercase tracking-tight leading-snug">
                        {section.heading}
                      </h2>
                    </div>

                    <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                      {section.body.map((para, pIdx) => {
                        // Check if paragraph is an FAQ item
                        if (para.startsWith('Q') && para.includes('\n')) {
                          const [question, ...answerParts] = para.split('\n');
                          const answer = answerParts.join('\n');
                          return (
                            <div key={pIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 my-3">
                              <p className="font-bold text-royal-blue text-sm sm:text-base mb-1.5 flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-royal-blue text-white text-[11px] font-black shrink-0">FAQ</span>
                                {question}
                              </p>
                              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-1">
                                {answer}
                              </p>
                            </div>
                          );
                        }
                        
                        // Check if paragraph is a bullet or numbered point
                        if (para.startsWith('• ') || /^\d+\.\s/.test(para)) {
                          return (
                            <p key={pIdx} className="leading-relaxed pl-3 font-medium text-slate-800">
                              {para}
                            </p>
                          );
                        }

                        return (
                          <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                            {para}
                          </p>
                        );
                      })}
                    </div>

                    {/* Step Highlight Callouts for Sdn Bhd */}
                    {isStep && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-royal-blue font-bold">
                        <CheckCircle2 size={16} className="text-gold shrink-0" />
                        <span>Bizskoop verifies and assists with this step directly on your behalf.</span>
                      </div>
                    )}

                    {/* In-article image for Sdn Bhd documents */}
                    {isDocSection && (
                      <div className="my-6 space-y-2">
                        <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                          <img
                            src="/blog/ssm-team-review.jpg"
                            alt="Company secretary preparing incorporation documents for SSM submission"
                            className="w-full h-64 sm:h-80 object-cover object-center"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center">
                          📷 Company secretary preparing incorporation documents and verifying KYC for SSM submission.
                        </p>
                      </div>
                    )}

                    {/* In-article image for e-Invoice Implementation */}
                    {post.id.includes('einvoice') && section.heading.toLowerCase().includes('daily business operations') && (
                      <div className="my-6 space-y-2">
                        <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                          <img
                            src="/blog/einvoice-submission-accountant.jpg"
                            alt="Business owner and accountant preparing invoice data for LHDN e-Invoice submission via MyInvois system"
                            className="w-full h-64 sm:h-80 object-cover object-center"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center">
                          📷 Business owner and accountant preparing invoice data for LHDN e-Invoice submission via MyInvois portal.
                        </p>
                      </div>
                    )}

                    {/* In-article image for Expatriate Salary Policy Circular */}
                    {post.id.includes('expatriate-salary') && section.heading.toLowerCase().includes('when does the new policy start') && (
                      <div className="my-6 space-y-2">
                        <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                          <img
                            src="/blog/kdn-expatriate-salary-circular-2026.jpg"
                            alt="Kementerian Dalam Negeri official circular: Dasar Baharu Penggajian Ekspatriat Bermula 1 Jun 2026"
                            className="w-full h-64 sm:h-96 object-cover object-center"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 italic text-center">
                          📜 Official Ministry of Home Affairs (KDN) circular: Dasar Baharu Penggajian Ekspatriat Bermula 1 Jun 2026.
                        </p>
                      </div>
                    )}

                    {/* Timeline Breakdown Card */}
                    {isTimelineSection && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                          <p className="text-[10px] font-black uppercase tracking-wider text-royal-blue mb-1">Name Search</p>
                          <p className="text-xl font-black text-royal-blue">24 Hours</p>
                          <p className="text-[10px] text-slate-500 mt-1">SSM Name Reservation</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                          <p className="text-[10px] font-black uppercase tracking-wider text-amber-900 mb-1">Filing Review</p>
                          <p className="text-xl font-black text-royal-blue">2–3 Days</p>
                          <p className="text-[10px] text-slate-500 mt-1">Section 14 & 15 Approval</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-900 mb-1">Post Setup</p>
                          <p className="text-xl font-black text-royal-blue">Same Week</p>
                          <p className="text-[10px] text-slate-500 mt-1">LHDN & Bank Opening</p>
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}

              {/* Regulatory Citation Box */}
              {post.content.regulatoryNote && (
                <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-royal-blue font-bold flex items-center gap-3">
                  <Building2 size={18} className="shrink-0 text-gold" />
                  <span>{post.content.regulatoryNote}</span>
                </div>
              )}

              {/* Tags Section */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Tag size={13} className="text-gold" />
                  <span>Related Topics:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onNavigate('blog')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-gold hover:text-royal-blue text-slate-700 transition-all border border-slate-200 cursor-pointer flex items-center gap-1.5"
                    >
                      <Tag size={11} className="text-royal-blue" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Author Profile Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-royal-blue/10 border border-gold/40 flex items-center justify-center p-2 shrink-0">
                <img src="/favicon.png" alt="Bizskoop" className="w-full h-full object-contain" />
              </div>
              <div className="text-center sm:text-left space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-black text-royal-blue uppercase tracking-tight">
                    Published by Bizskoop
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-royal-blue font-black text-[10px] uppercase">
                    Verified Advisory
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Bizskoop is Malaysia’s premier corporate secretarial and business licensing firm. We assist local entrepreneurs and foreign founders in setting up compliant Sdn Bhd entities with SSM and navigating taxation and banking seamlessly.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-royal-blue via-[#0a2540] to-royal-blue text-white space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-black uppercase tracking-wider">
                  <Sparkles size={13} />
                  Ready to Incorporate in Malaysia?
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Let Bizskoop Handle Your Sdn Bhd Registration
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed font-medium">
                  Get your company name searched, legal documents prepared, and SSM incorporation approved without delays. Our licensed secretarial team handles everything from A to Z.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/601124244993"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-gold hover:bg-amber-300 text-royal-blue font-black text-xs uppercase tracking-wider transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
                  >
                    <PhoneCall size={14} />
                    <span>WhatsApp Our Team: +60 11-2424 4993</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Free Consultation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (4 cols on desktop, 3 cols on 2xl) */}
          <aside className="lg:col-span-4 xl:col-span-4 2xl:col-span-3 space-y-8 lg:sticky lg:top-28">
            
            {/* Quick Summary Table of Contents Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-2 pb-3 border-b border-slate-100">
                <BookOpen size={14} className="text-gold" />
                <span>Guide Table of Contents</span>
              </h3>
              <ul className="space-y-2.5 text-xs font-bold text-slate-600">
                {post.content.sections.map((sec, sIdx) => (
                  <li key={sIdx}>
                    <a
                      href={`#section-${sIdx}`}
                      className="flex items-start gap-2 hover:text-royal-blue transition-colors group cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5 group-hover:scale-125 transition-transform"></span>
                      <span className="line-clamp-2">{sec.heading}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fast WhatsApp Help Box */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-md border border-emerald-800/80 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black uppercase tracking-tight text-white">
                  {post.id.includes('myinvois') ? 'Questions on MyInvois?' : 'Need Corporate Advisory?'}
                </h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                  {post.id.includes('myinvois')
                    ? 'Speak directly with our tax and e-invoicing compliance specialists in Kuala Lumpur.'
                    : 'Chat directly with our licensed incorporation and governance team in Kuala Lumpur.'}
                </p>
              </div>
              <a
                href="https://wa.me/601124244993"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Related Articles Card */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Sparkles size={14} className="text-gold" />
                  <span>More Business Insights</span>
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.id}
                      onClick={() => onNavigate('blog-detail', rPost.slug)}
                      className="group cursor-pointer space-y-1.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {rPost.publishedDate}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-royal-blue transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                      <span className="text-[11px] text-royal-blue font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read article</span>
                        <ArrowRight size={11} className="text-gold" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>
    </article>
  );
};
