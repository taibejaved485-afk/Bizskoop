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
  onNavigate?: (page: string, blogSlug?: string) => void;
  isStandalonePage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, isStandalonePage = false }) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bizskoop_saved_articles') || '[]');
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // Standalone page filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setAllPosts(getStoredBlogPosts());
    };
    window.addEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
  }, []);

  // Filter public posts: hide drafts
  const posts = useMemo(() => {
    return allPosts.filter(p => p.status !== 'draft');
  }, [allPosts]);

  const toggleSaveArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles((prev) => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('bizskoop_saved_articles', JSON.stringify(next));
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

  // Home preview: show top 3 articles (prioritize featured)
  const homePreviewPosts = useMemo(() => {
    const featured = posts.filter(p => p.featured);
    const rest = posts.filter(p => !p.featured);
    return [...featured, ...rest].slice(0, 3);
  }, [posts]);

  // Standalone filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || p.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchQuery, selectedCategory, selectedTag]);

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
          accentGradient: 'from-indigo-500 via-purple-500 to-blue-500',
          borderHover: 'hover:border-indigo-400/80',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)]',
          icon: Scale
        };
    }
  };

  // ---------------------------------------------------------------------------
  // Reusable Blog Card Component
  // ---------------------------------------------------------------------------
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
        onClick={() => {
          if (onNavigate) {
            onNavigate('blog-detail', post.slug || post.id);
          } else {
            setActiveArticle(post);
          }
        }}
        className={`w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,34,68,0.06)] ${theme.glow} ${theme.borderHover} transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer relative transform hover:-translate-y-1`}
      >
        {/* Featured Image Header if present */}
        {post.featuredImage && (
          <div className="relative w-full h-44 sm:h-48 bg-slate-900 overflow-hidden shrink-0">
            <img
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay Category Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md bg-white/95 text-royal-blue shadow-md`}>
                <CategoryIcon size={12} className={theme.iconColor} />
                <span>{post.categoryLabel}</span>
              </span>
              {post.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-royal-blue text-gold shadow-md border border-gold/30">
                  <Sparkles size={10} className="text-gold" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={(e) => toggleSaveArticle(post.id, e)}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 hover:bg-gold backdrop-blur-md text-slate-700 hover:text-royal-blue flex items-center justify-center transition-all shadow-md z-10 cursor-pointer"
              title={isSaved ? "Saved" : "Save for later"}
              aria-label={isSaved ? "Saved" : "Save article"}
            >
              <Bookmark size={14} className={isSaved ? "fill-gold text-gold" : "text-slate-700"} />
            </button>
          </div>
        )}

        <div className="p-5 sm:p-6 relative z-10 flex-1 flex flex-col justify-between">
          <div>
            {/* Top Row for Cards without Image */}
            {!post.featuredImage && (
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${theme.badgeBg} shadow-2xs`}>
                    <CategoryIcon size={12} className={theme.iconColor} />
                    <span>{post.categoryLabel}</span>
                  </span>

                  {post.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-royal-blue text-gold shadow-2xs border border-royal-blue/40">
                      <Sparkles size={10} className="text-gold" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleSaveArticle(post.id, e)}
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-gold/20 border border-slate-200/70 hover:border-gold/50 flex items-center justify-center text-slate-400 hover:text-royal-blue transition-all cursor-pointer shadow-2xs"
                  title={isSaved ? "Saved" : "Save for later"}
                >
                  <Bookmark size={14} className={isSaved ? "fill-gold text-gold" : "text-slate-400"} />
                </button>
              </div>
            )}

            {/* Title */}
            <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-royal-blue transition-colors uppercase leading-snug mb-2 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-600 text-xs sm:text-[13px] font-medium leading-relaxed mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Tags Chips */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {post.tags.slice(0, 3).map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold tracking-tight border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Published Date & Read Time */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500 mt-2">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              {post.publishedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock size={13} className="text-slate-400 shrink-0" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Footer: Author details and interactive Read Button */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 group-hover:bg-slate-100/90 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shadow-2xs"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-slate-900 truncate leading-tight group-hover:text-royal-blue transition-colors">
                {post.author.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium truncate leading-tight">
                {post.author.role}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white group-hover:bg-royal-blue text-royal-blue group-hover:text-gold border border-slate-200/80 group-hover:border-royal-blue text-xs font-black shrink-0 transition-all duration-300 shadow-2xs">
            <span>Read</span>
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform text-gold" />
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
              {/* Featured Image Hero in Reader */}
              {activeArticle.featuredImage && (
                <div className="space-y-2">
                  <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                    <img
                      src={activeArticle.featuredImage}
                      alt={activeArticle.imageAlt || activeArticle.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {activeArticle.imageCaption && (
                    <p className="text-[11px] text-slate-500 italic text-center">
                      {activeArticle.imageCaption}
                    </p>
                  )}
                </div>
              )}

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
              {activeArticle.content.takeaways && activeArticle.content.takeaways.length > 0 && (
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

              {/* Main Rich Content or Standard Sections */}
              {activeArticle.content.richHtml ? (
                <div 
                  className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed prose prose-slate max-w-none prose-headings:text-royal-blue prose-headings:font-black prose-a:text-royal-blue prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-slate-50 prose-blockquote:p-3 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: activeArticle.content.richHtml }}
                />
              ) : (
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
              )}

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
                  Bizskoop's licensed corporate secretarial team directly handles your SSM paperwork, ESD immigration submissions, and municipal filings.
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
        ref={blogSectionRef}
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
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
              Business Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-blue-900 to-royal-blue">Legal Guides</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Stay ahead of SSM statutory updates, LHDN corporate tax brackets, ESD work visa quotas, and local council licensing mandates in Malaysia.
            </p>
          </div>

          {/* 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {homePreviewPosts.map((post, idx) => {
              const isSaved = savedArticles.includes(post.id);
              return renderCard(post, idx, isSaved);
            })}
          </div>

          {/* View All Articles Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('blog');
                } else {
                  window.location.hash = '#all-articles';
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-royal-blue hover:bg-blue-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer border border-blue-900/50 group"
            >
              <span>Explore All Advisory Articles ({posts.length})</span>
              <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Reader Modal */}
        {renderArticleModal()}
      </section>
    );
  }

  // ---------------------------------------------------------------------------
  // STANDALONE BLOG DIRECTORY PAGE
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-6 sm:pt-8 pb-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-royal-blue transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-royal-blue font-bold">Advisory Insights & Statutory Briefings</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-blue/10 text-royal-blue text-[11px] font-black uppercase tracking-wider mb-2">
                <Sparkles size={12} className="text-gold" />
                <span>Knowledge & Compliance Hub</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Corporate Regulatory Briefings
              </h1>
              <p className="text-slate-600 text-xs sm:text-base font-medium mt-1.5 max-w-3xl">
                Comprehensive statutory insights authored by licensed Company Secretaries, Chartered Tax Advisors, and Expatriate Immigration Counsel.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, SSM acts, tax brackets, EP visa rules, or author..."
                className="w-full pl-11 pr-4 py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-royal-blue text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Topics
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('incorporation')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'incorporation'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
                }`}
              >
                Incorporation
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('tax')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'tax'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60'
                }`}
              >
                Tax Advice
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('visa')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'visa'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200/60'
                }`}
              >
                Immigration
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('licensing')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'licensing'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/60'
                }`}
              >
                Licensing
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
            <BookOpen size={40} className="mx-auto text-slate-300" />
            <h3 className="text-lg font-black uppercase text-slate-800">No matching statutory articles found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any briefings matching "{searchQuery}". Try clearing search filters or browse all topics.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-royal-blue text-white text-xs font-bold shadow-md hover:bg-blue-900 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => {
              const isSaved = savedArticles.includes(post.id);
              return renderCard(post, idx, isSaved);
            })}
          </div>
        )}

      </div>

      {/* Reader Modal */}
      {renderArticleModal()}
    </div>
  );
};
