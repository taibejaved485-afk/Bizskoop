import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Search, 
  Tag, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  FileText, 
  X, 
  ChevronRight,
  ExternalLink,
  Bookmark,
  Check,
  Award,
  Filter,
  SlidersHorizontal,
  Briefcase,
  Globe2,
  FileCheck2,
  Receipt,
  Scale
} from 'lucide-react';
import { BlogPost, getStoredBlogPosts, BLOGS_UPDATED_EVENT } from '../services/blogStorage.ts';

export type { BlogPost };

interface BlogSectionProps {
  onNavigate?: (page: string) => void;
  isStandalonePage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, isStandalonePage = false }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bizflow_saved_articles') || '[]');
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
  }, []);

  const toggleSaveArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles((prev) => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('bizflow_saved_articles', JSON.stringify(next));
      return next;
    });
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const blogSectionRef = useRef<HTMLElement>(null);

  // Home preview: show top 3 articles
  const homePreviewPosts = useMemo(() => {
    const featured = posts.filter(p => p.featured);
    const rest = posts.filter(p => !p.featured);
    return [...featured, ...rest].slice(0, 3);
  }, [posts]);

  // Category styling helper
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'incorporation':
        return {
          badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-900',
          iconColor: 'text-amber-600',
          accentGradient: 'from-amber-500 via-gold to-yellow-400',
          borderHover: 'hover:border-amber-400/80',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(217,119,6,0.12)]',
          icon: Building2
        };
      case 'visa':
        return {
          badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-900',
          iconColor: 'text-sky-600',
          accentGradient: 'from-sky-500 via-blue-500 to-indigo-500',
          borderHover: 'hover:border-sky-400/80',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(14,165,233,0.12)]',
          icon: Globe2
        };
      case 'tax':
        return {
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900',
          iconColor: 'text-emerald-600',
          accentGradient: 'from-emerald-500 via-teal-500 to-green-400',
          borderHover: 'hover:border-emerald-400/80',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)]',
          icon: Receipt
        };
      case 'licensing':
      default:
        return {
          badgeBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-900',
          iconColor: 'text-indigo-600',
          accentGradient: 'from-indigo-500 via-royal-blue to-blue-500',
          borderHover: 'hover:border-indigo-400/80',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)]',
          icon: Scale
        };
    }
  };

  // Clean reusable card renderer
  const renderCard = (post: BlogPost, idx: number, isSaved: boolean) => {
    const theme = getCategoryTheme(post.category);
    const CategoryIcon = theme.icon;

    return (
      <motion.article
        key={post.id}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.07 }}
        onClick={() => setActiveArticle(post)}
        className={`bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,34,68,0.05)] ${theme.glow} ${theme.borderHover} transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer relative transform hover:-translate-y-1.5`}
      >
        {/* Top Active Accent Glow Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.accentGradient} opacity-90 group-hover:h-2 transition-all duration-300`} />

        {/* Ambient background watermark for high-end luxury feel */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full pointer-events-none -z-0 opacity-60 group-hover:scale-110 transition-transform duration-500" />

        <div className="p-6 sm:p-7 relative z-10 flex-1 flex flex-col">
          {/* Top Badge & Bookmark Row */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10.5px] font-black uppercase tracking-wider border ${theme.badgeBg} shadow-2xs transition-transform group-hover:scale-[1.02]`}>
                <CategoryIcon size={12} className={theme.iconColor} />
                <span>{post.categoryLabel}</span>
              </span>

              {post.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[9.5px] font-black uppercase tracking-wider bg-royal-blue text-gold shadow-2xs border border-royal-blue/40">
                  <Sparkles size={10} className="text-gold" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => toggleSaveArticle(post.id, e)}
              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-gold/20 border border-slate-200/70 hover:border-gold/50 flex items-center justify-center text-slate-400 hover:text-royal-blue transition-all cursor-pointer shadow-2xs"
              title={isSaved ? "Saved" : "Save for later"}
            >
              <Bookmark size={14} className={isSaved ? "fill-gold text-gold" : "text-slate-400"} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-[17px] font-black text-slate-900 group-hover:text-royal-blue transition-colors uppercase leading-snug mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-xs sm:text-[13px] font-medium leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags Chips */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mb-4 mt-auto">
              {post.tags.slice(0, 3).map((tag, tIdx) => (
                <span 
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-100/90 text-slate-600 text-[10px] font-bold tracking-tight border border-slate-200/60 group-hover:bg-slate-200/70 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Published Date & Read Time */}
          <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar size={13} className="text-slate-400" />
              {post.publishedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock size={13} className="text-slate-400" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Footer: Author details and interactive Read Button */}
        <div className="px-6 py-4 bg-gradient-to-b from-slate-50/70 to-slate-100/80 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 group-hover:bg-slate-100/90 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-white shadow-2xs"
                loading="lazy"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-slate-900 truncate leading-tight group-hover:text-royal-blue transition-colors">
                {post.author.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold truncate leading-tight mt-0.5">
                {post.author.role}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white group-hover:bg-royal-blue text-royal-blue group-hover:text-gold border border-slate-200/80 group-hover:border-royal-blue text-xs font-black shrink-0 transition-all duration-300 shadow-2xs group-hover:shadow-md">
            <span>Read</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform text-gold" />
          </div>
        </div>
      </motion.article>
    );
  };

  // ---------------------------------------------------------------------------
  // Reusable Article Reader Modal
  // ---------------------------------------------------------------------------
  const renderArticleModal = () => (
    <AnimatePresence>
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
          {/* Backdrop Dismiss Click */}
          <div 
            className="fixed inset-0"
            onClick={() => setActiveArticle(null)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Sticky Header */}
            <div className="p-5 sm:px-8 sm:py-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-royal-blue shrink-0">
                  <Building2 size={11} className="text-gold" />
                  <span>{activeArticle.categoryLabel}</span>
                </span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">{activeArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(activeArticle.slug)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Copy Link to Article"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Close article modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-royal-blue uppercase tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img 
                      src={activeArticle.author.avatar} 
                      alt={activeArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-bold text-slate-800">{activeArticle.author.name}</span>
                    <span className="text-slate-400">({activeArticle.author.role})</span>
                  </div>
                  <span>•</span>
                  <span>{activeArticle.publishedDate}</span>
                </div>
              </div>

              {/* Key Takeaways Checklist */}
              {activeArticle.content.takeaways && (
                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-950 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-gold" />
                    <span>Statutory Mandates & Takeaways</span>
                  </h3>
                  <div className="space-y-2.5">
                    {activeArticle.content.takeaways.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-amber-950/90 font-medium leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-gold/20 text-royal-blue text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Content Sections */}
              <div className="space-y-6">
                {activeArticle.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-royal-blue uppercase tracking-tight">
                      {section.heading}
                    </h3>
                    {section.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Regulatory Citation Note */}
              {activeArticle.content.regulatoryNote && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-royal-blue font-bold flex items-center gap-2">
                  <Building2 size={14} className="shrink-0 text-gold" />
                  <span>{activeArticle.content.regulatoryNote}</span>
                </div>
              )}

              {/* Browse Related Topic Tags */}
              <div className="pt-2 pb-2 border-t border-slate-100">
                <h5 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Tag size={12} className="text-gold" />
                  <span>Browse Related Articles:</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setActiveArticle(null);
                        if (onNavigate) onNavigate('blog');
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-gold hover:text-royal-blue text-slate-700 transition-all border border-slate-200 cursor-pointer flex items-center gap-1.5"
                    >
                      <Tag size={11} className="text-royal-blue" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action Inside Reader */}
              <div className="p-6 rounded-2xl bg-royal-blue text-white space-y-3">
                <h4 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <Sparkles size={15} className="text-gold" />
                  <span>Need Tailored Filing Support for Your Enterprise?</span>
                </h4>
                <p className="text-xs text-blue-100/80 leading-relaxed font-medium">
                  Bizflow's licensed corporate secretarial team directly handles your SSM paperwork, ESD immigration submissions, and municipal filings.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    if (onNavigate) {
                      onNavigate('contact');
                    } else {
                      window.location.assign('#contact');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-amber-300 text-royal-blue font-black text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Schedule Case Review</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // ---------------------------------------------------------------------------
  // HOME PAGE MODE: Clean preview with 3 cards only and View All button
  // ---------------------------------------------------------------------------
  if (!isStandalonePage) {
    return (
      <section 
        id="blog" 
        className="relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 sm:py-28 overflow-hidden"
      >
        {/* Background Subtle Luxury Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} 
        />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-royal-blue/10 via-gold/15 to-royal-blue/10 border border-gold/40 mb-3.5 shadow-2xs">
              <Sparkles size={12} className="text-gold" />
              <span className="text-[11px] font-black uppercase tracking-widest text-royal-blue">
                Latest Regulatory Briefings
              </span>
              <Award size={12} className="text-gold" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-royal-blue uppercase tracking-tight leading-tight">
              Business & Regulatory <span className="text-gold">Insights</span>
            </h2>

            <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Stay ahead with Malaysian corporate law updates, tax rulings, and employment pass guidelines compiled by our licensed secretarial team.
            </p>
          </div>

          {/* 3 Clean Blog Cards - Full Width Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {homePreviewPosts.map((post, idx) => {
              const isSaved = savedArticles.includes(post.id);
              return renderCard(post, idx, isSaved);
            })}
          </div>

          {/* Clean View All Blogs Button */}
          <div className="mt-12 sm:mt-16 text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-royal-blue hover:bg-[#002244] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-royal-blue/25 hover:border-gold/50 border border-transparent transition-all duration-200 cursor-pointer group"
            >
              <span>View All Articles & Insights ({posts.length})</span>
              <ArrowRight size={16} className="text-gold group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Reader Modal for home preview */}
        {renderArticleModal()}
      </section>
    );
  }

  // ---------------------------------------------------------------------------
  // DEDICATED BLOG PAGE MODE: Shows all blogs cleanly
  // ---------------------------------------------------------------------------
  return (
    <section 
      ref={blogSectionRef}
      id="blog" 
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-3 sm:pt-4 pb-16 overflow-hidden"
    >
      {/* Background Subtle Luxury Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} 
      />
      
      {/* Ambient Radial Color Accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Full Width Container */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Top Navigation Row: Back to Home + Clean Article Count */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4 w-full border-b border-slate-200/80 pb-4">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-royal-blue hover:border-royal-blue text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            Showing <strong className="text-royal-blue">{posts.length}</strong> {posts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-xs max-w-lg mx-auto p-8 my-8">
            <BookOpen size={44} className="mx-auto text-slate-300 mb-3" />
            <h4 className="text-base font-black text-slate-900 uppercase">No Articles Published Yet</h4>
            <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Executive briefings uploaded through the Admin Portal will appear here.
            </p>
          </div>
        )}

        {/* Beautiful Blogs Cards Grid - Full Width */}
        {posts.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, idx) => {
              const isSaved = savedArticles.includes(post.id);
              return renderCard(post, idx, isSaved);
            })}
          </div>
        )}

        {/* Bottom Banner: Request Specific Briefing / Consult */}
        <div className="mt-14 w-full">
          <div className="py-7 px-6 sm:px-10 rounded-3xl bg-gradient-to-r from-royal-blue via-[#002244] to-navy-dark text-white shadow-xl relative overflow-hidden border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-widest mb-1.5">
                <FileText size={13} />
                <span>Custom Corporate Research</span>
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                Have a Complex Regulatory or Licensing Case?
              </h3>
              <p className="text-xs text-blue-100/75 mt-1 font-medium max-w-lg">
                Our licensed corporate secretarial partners prepare customized statutory memoranda for corporate setups, ESD quotas, and local council approvals.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('contact') : window.location.assign('#contact')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold to-amber-400 hover:from-amber-400 hover:to-gold text-royal-blue font-black text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Counsel</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Article Reader Modal */}
      {renderArticleModal()}
    </section>
  );
};
