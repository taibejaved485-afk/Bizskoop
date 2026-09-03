import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Sparkles, 
  Check, 
  X, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  RotateCcw, 
  Save, 
  FileText, 
  Building2, 
  Receipt, 
  Globe2, 
  FileCheck2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ListPlus,
  Scale,
  Layers,
  Wand2,
  CheckCircle2,
  Bookmark,
  Share2,
  Sliders,
  Type
} from 'lucide-react';
import { 
  BlogPost, 
  getStoredBlogPosts, 
  saveBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  resetDefaultBlogPosts, 
  BLOGS_UPDATED_EVENT 
} from '../services/blogStorage.ts';

interface AdminBlogManagerProps {
  onLogAudit: (action: string) => void;
  onShowToast: (msg: string) => void;
}

const CATEGORIES = [
  { 
    id: 'incorporation', 
    label: 'Company Incorporation', 
    icon: Building2,
    desc: 'Sdn Bhd, 100% foreign equity, paid-up capital, SSM rules',
    color: 'amber',
    badge: 'bg-amber-500/10 text-amber-900 border-amber-500/30'
  },
  { 
    id: 'tax', 
    label: 'Tax Advice', 
    icon: Receipt,
    desc: 'LHDN corporate tax, e-invoicing, incentives, double tax treaties',
    color: 'emerald',
    badge: 'bg-emerald-500/10 text-emerald-900 border-emerald-500/30'
  },
  { 
    id: 'visa', 
    label: 'Immigration', 
    icon: Globe2,
    desc: 'ESD Employment Pass, DP10, dependants, projection quota',
    color: 'sky',
    badge: 'bg-sky-500/10 text-sky-900 border-sky-500/30'
  },
  { 
    id: 'licensing', 
    label: 'Business Licensing', 
    icon: Scale,
    desc: 'WRT licensing, DBKL premise approvals, Bomba compliance',
    color: 'indigo',
    badge: 'bg-indigo-500/10 text-indigo-900 border-indigo-500/30'
  },
] as const;

const AUTHOR_PRESETS = [
  {
    name: 'Tan Sri Datuk Azman Rahim',
    role: 'Head of Corporate Secretarial Practice',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialty: 'SSM & Foreign Direct Investment'
  },
  {
    name: 'Faridah Hashim',
    role: 'Senior Immigration & Expat Affairs Counsel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialty: 'ESD & Expatriate Mobility'
  },
  {
    name: 'Marcus Loh',
    role: 'Director of Trade & Regulatory Licensing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'KPDN & Local Municipal Authorities'
  },
  {
    name: 'Elena Choo CA(M)',
    role: 'Principal Tax Advisory Partner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    specialty: 'LHDN Statutory Compliance & e-Invoicing'
  }
];

const SUGGESTED_TAGS = [
  'SSM Malaysia',
  '100% Foreign Equity',
  'Companies Act 2016',
  'ESD Employment Pass',
  'Corporate Tax 2026',
  'e-Invoicing LHDN',
  'WRT License KPDN',
  'DBKL Premise License',
  'MDEC MD Status'
];

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({ onLogAudit, onShowToast }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'form' | 'livePreview'>('form');
  
  // Preview modal state
  const [previewBlog, setPreviewBlog] = useState<BlogPost | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'incorporation' | 'visa' | 'licensing' | 'tax'>('incorporation');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formPublishedDate, setFormPublishedDate] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  
  // Author
  const [formAuthorName, setFormAuthorName] = useState('');
  const [formAuthorRole, setFormAuthorRole] = useState('');
  const [formAuthorAvatar, setFormAuthorAvatar] = useState('');
  
  // Tags
  const [formTags, setFormTags] = useState('');
  
  // Content details
  const [formSummary, setFormSummary] = useState('');
  const [formTakeaways, setFormTakeaways] = useState<string[]>(['']);
  const [formSections, setFormSections] = useState<{ heading: string; bodyText: string }[]>([
    { heading: '1. Executive Statutory Overview', bodyText: '' }
  ]);
  const [formRegulatoryNote, setFormRegulatoryNote] = useState('');

  // Sync blogs on external changes
  useEffect(() => {
    const handleUpdate = () => {
      setBlogs(getStoredBlogPosts());
    };
    window.addEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
  }, []);

  // Filtered list
  const filteredBlogs = blogs.filter(blog => {
    const matchesCat = categoryFilter === 'all' || blog.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      blog.title.toLowerCase().includes(q) ||
      blog.excerpt.toLowerCase().includes(q) ||
      blog.author.name.toLowerCase().includes(q) ||
      blog.tags.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Calculate live word count & read time
  const totalWordCount = useMemo(() => {
    const summaryWords = formSummary.trim().split(/\s+/).filter(Boolean).length;
    const excerptWords = formExcerpt.trim().split(/\s+/).filter(Boolean).length;
    const takeawayWords = formTakeaways.join(' ').split(/\s+/).filter(Boolean).length;
    const sectionWords = formSections.map(s => `${s.heading} ${s.bodyText}`).join(' ').split(/\s+/).filter(Boolean).length;
    return summaryWords + excerptWords + takeawayWords + sectionWords;
  }, [formSummary, formExcerpt, formTakeaways, formSections]);

  const autoCalculatedReadTime = useMemo(() => {
    const minutes = Math.max(1, Math.ceil(totalWordCount / 180));
    return `${minutes} min read`;
  }, [totalWordCount]);

  // Open New Post Form
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setEditorTab('form');
    setFormTitle('');
    setFormCategory('incorporation');
    setFormExcerpt('');
    setFormReadTime('5 min read');
    
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    setFormPublishedDate(dateFormatted);
    setFormFeatured(false);

    setFormAuthorName(AUTHOR_PRESETS[0].name);
    setFormAuthorRole(AUTHOR_PRESETS[0].role);
    setFormAuthorAvatar(AUTHOR_PRESETS[0].avatar);

    setFormTags('SSM, Company Incorporation, Foreign Ownership, 100% Equity');
    setFormSummary('');
    setFormTakeaways([
      'Foreign individuals and international corporations can hold up to 100% equity in non-restricted industries.',
      'A minimum of one resident director residing in Malaysia is legally mandated under Companies Act 2016.',
      'Statutory compliance requires appointing a qualified licensed company secretary within 30 days of registration.'
    ]);
    setFormSections([
      {
        heading: '1. Executive Statutory Overview & Equity Limits',
        bodyText: 'Malaysia continues to champion international business expansion by providing clear regulatory pathways for 100% foreign equity ownership across technology, manufacturing, wholesale distribution, and advisory services.\n\nForeign investors must align their operational objectives with the Companies Commission of Malaysia (SSM) mandates and respective regulatory authorities.'
      },
      {
        heading: '2. Paid-up Capital & Bank Account Opening',
        bodyText: 'While the statutory minimum paid-up capital for a domestic Sdn Bhd is RM1, entities with foreign participation must observe higher thresholds depending on employment pass and licensing needs.\n\nWe recommend establishing structured banking documentation with accredited commercial institutions.'
      }
    ]);
    setFormRegulatoryNote('Companies Act 2016 (Act 777), Section 196(4) on resident director qualifications.');
    setIsEditorOpen(true);
  };

  // Open Edit Post Form
  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setEditorTab('form');
    setFormTitle(blog.title);
    setFormCategory(blog.category);
    setFormExcerpt(blog.excerpt);
    setFormReadTime(blog.readTime);
    setFormPublishedDate(blog.publishedDate);
    setFormFeatured(!!blog.featured);

    setFormAuthorName(blog.author.name);
    setFormAuthorRole(blog.author.role);
    setFormAuthorAvatar(blog.author.avatar);

    setFormTags(blog.tags.join(', '));
    setFormSummary(blog.content.summary);
    setFormTakeaways(blog.content.takeaways && blog.content.takeaways.length > 0 ? blog.content.takeaways : ['']);
    setFormSections(
      blog.content.sections.map(s => ({
        heading: s.heading,
        bodyText: s.body.join('\n\n')
      }))
    );
    setFormRegulatoryNote(blog.content.regulatoryNote || '');
    setIsEditorOpen(true);
  };

  // Quick Preset Author Selection
  const applyAuthorPreset = (preset: typeof AUTHOR_PRESETS[0]) => {
    setFormAuthorName(preset.name);
    setFormAuthorRole(preset.role);
    setFormAuthorAvatar(preset.avatar);
  };

  // Add Tag Helper
  const handleAddTagSuggestion = (tagToAdd: string) => {
    const currentTags = formTags.split(',').map(t => t.trim()).filter(Boolean);
    if (!currentTags.includes(tagToAdd)) {
      setFormTags([...currentTags, tagToAdd].join(', '));
    }
  };

  // Takeaway helpers
  const handleAddTakeaway = () => {
    setFormTakeaways(prev => [...prev, '']);
  };

  const handleUpdateTakeaway = (index: number, val: string) => {
    setFormTakeaways(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveTakeaway = (index: number) => {
    if (formTakeaways.length <= 1) {
      setFormTakeaways(['']);
      return;
    }
    setFormTakeaways(prev => prev.filter((_, i) => i !== index));
  };

  // Section helpers
  const handleAddSection = () => {
    setFormSections(prev => [
      ...prev,
      { heading: `${prev.length + 1}. Key Statutory Consideration`, bodyText: '' }
    ]);
  };

  const handleUpdateSection = (index: number, field: 'heading' | 'bodyText', val: string) => {
    setFormSections(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleRemoveSection = (index: number) => {
    if (formSections.length <= 1) {
      alert('A blog post must have at least one content section.');
      return;
    }
    setFormSections(prev => prev.filter((_, i) => i !== index));
  };

  // Quick template generator
  const handleApplyTemplate = (type: 'incorporation' | 'tax' | 'visa' | 'licensing') => {
    setFormCategory(type);
    if (type === 'tax') {
      setFormTitle('2026 Corporate Income Tax & Real-Time e-Invoicing Statutory Blueprint');
      setFormExcerpt('Comprehensive operational guide for business directors preparing for the Inland Revenue Board (LHDN) e-invoicing transition.');
      setFormTags('LHDN, Corporate Tax, e-Invoicing, Tax Filing, Tax Deductions');
      setFormTakeaways([
        'Phase-by-phase implementation timeline for all registered Malaysian taxpayers.',
        'Validation protocols with the LHDN MyInvois portal via API or batch upload.',
        'Deductibility requirements for operational expenses post-mandate.'
      ]);
      setFormRegulatoryNote('Income Tax Act 1967, Section 82 & LHDN e-Invoicing Guidelines');
    } else if (type === 'visa') {
      setFormTitle('ESD Employment Pass (EP) Category I, II & III: Salary Guidelines');
      setFormExcerpt('Detailed breakdown of immigration quotas, salary minimums, dependants eligibility, and ESD portal projection approvals.');
      setFormTags('ESD, Employment Pass, Expat Visa, Immigration Malaysia, Quota Approval');
      setFormTakeaways([
        'Category I passes allow up to 60-month duration with full dependent allowances.',
        'Revised paid-up capital prerequisites for foreign company projection submissions.',
        'Exemption criteria for critical tech skills under national strategic programs.'
      ]);
      setFormRegulatoryNote('Immigration Act 1959/63 & ESD Expatriate Services Division Mandates');
    } else if (type === 'licensing') {
      setFormTitle('Wholesale & Retail Trade (WRT) License: Foreign Capital & KPDN Approval');
      setFormExcerpt('Essential compliance requirements for foreign-invested consumer retail, distribution, and F&B establishments.');
      setFormTags('WRT License, KPDN, Business Permit, Foreign Investment, Retail Trade');
      setFormTakeaways([
        'Minimum paid-up capital threshold of RM1,000,000 for foreign-owned retail enterprises.',
        'Documentation requirements including tenancy agreements and municipal premise licenses.',
        'Statutory review and renewal timeline considerations.'
      ]);
      setFormRegulatoryNote('Guidelines on Foreign Participation in the Distributive Trade Services (KPDN)');
    }
    onShowToast(`Applied ${type.toUpperCase()} template`);
  };

  // Save / Update Handler
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert('Please enter a blog title.');
      return;
    }

    if (!formExcerpt.trim()) {
      alert('Please enter a short excerpt for the card preview.');
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === formCategory);
    const categoryLabel = catObj ? catObj.label : 'Corporate Insight';

    // Parse tags
    const parsedTags = formTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // Parse takeaways
    const parsedTakeaways = formTakeaways
      .map(t => t.trim())
      .filter(Boolean);

    // Parse sections
    const parsedSections = formSections.map(s => ({
      heading: s.heading.trim() || 'Key Insight',
      body: s.bodyText
        .split('\n\n')
        .map(b => b.trim())
        .filter(Boolean)
    }));

    if (editingBlogId) {
      // Update existing
      const updated = updateBlogPost(editingBlogId, {
        title: formTitle.trim(),
        category: formCategory,
        categoryLabel,
        excerpt: formExcerpt.trim(),
        readTime: formReadTime.trim() || autoCalculatedReadTime,
        publishedDate: formPublishedDate.trim() || 'March 03, 2026',
        featured: formFeatured,
        author: {
          name: formAuthorName.trim() || 'Tan Sri Datuk Azman Rahim',
          role: formAuthorRole.trim() || 'Corporate Secretarial Specialist',
          avatar: formAuthorAvatar.trim() || AUTHOR_PRESETS[0].avatar
        },
        tags: parsedTags.length > 0 ? parsedTags : [categoryLabel],
        content: {
          summary: formSummary.trim() || formExcerpt.trim(),
          takeaways: parsedTakeaways,
          sections: parsedSections,
          regulatoryNote: formRegulatoryNote.trim() || undefined
        }
      });

      if (updated) {
        setBlogs(getStoredBlogPosts());
        onLogAudit(`Updated executive blog briefing: "${formTitle.trim()}"`);
        onShowToast(`Blog post "${formTitle.trim()}" updated successfully!`);
      }
    } else {
      // Create new
      const newPost = saveBlogPost({
        title: formTitle.trim(),
        category: formCategory,
        categoryLabel,
        excerpt: formExcerpt.trim(),
        readTime: formReadTime.trim() || autoCalculatedReadTime,
        publishedDate: formPublishedDate.trim() || 'March 03, 2026',
        featured: formFeatured,
        author: {
          name: formAuthorName.trim() || 'Tan Sri Datuk Azman Rahim',
          role: formAuthorRole.trim() || 'Corporate Secretarial Specialist',
          avatar: formAuthorAvatar.trim() || AUTHOR_PRESETS[0].avatar
        },
        tags: parsedTags.length > 0 ? parsedTags : [categoryLabel],
        content: {
          summary: formSummary.trim() || formExcerpt.trim(),
          takeaways: parsedTakeaways,
          sections: parsedSections,
          regulatoryNote: formRegulatoryNote.trim() || undefined
        }
      });

      setBlogs(getStoredBlogPosts());
      onLogAudit(`Uploaded new blog briefing: "${newPost.title}"`);
      onShowToast(`New blog post "${newPost.title}" published successfully!`);
    }

    setIsEditorOpen(false);
  };

  // Delete Handler
  const handleDeleteBlog = (blog: BlogPost) => {
    if (window.confirm(`Are you sure you want to permanently delete the blog "${blog.title}"?`)) {
      deleteBlogPost(blog.id);
      setBlogs(getStoredBlogPosts());
      onLogAudit(`Deleted blog post: "${blog.title}"`);
      onShowToast(`Blog "${blog.title}" deleted.`);
    }
  };

  // Restore Default Blogs
  const handleResetDefaults = () => {
    if (window.confirm('Reset all blogs back to default system briefings? Custom articles will be replaced with official default templates.')) {
      resetDefaultBlogPosts();
      setBlogs(getStoredBlogPosts());
      onLogAudit('Reset blog articles to default system repository');
      onShowToast('Blog articles reset to official default templates.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-royal-blue/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal-blue to-[#002244] text-gold flex items-center justify-center font-black shadow-xs">
              <BookOpen size={18} />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter">
              Executive Blog Manager
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Publish, modify, and curate statutory insights & legal briefings for live public display
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap relative z-10">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            title="Reset to default corporate briefings"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-6 py-3 bg-gradient-to-r from-royal-blue via-[#002244] to-royal-blue hover:opacity-95 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Plus size={16} className="text-gold" />
            <span>Upload New Blog</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, author, or tag..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-royal-blue text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({blogs.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                categoryFilter === cat.id
                  ? 'bg-royal-blue text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <cat.icon size={12} className={categoryFilter === cat.id ? 'text-gold' : 'text-slate-400'} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <BookOpen size={44} className="mx-auto mb-3 opacity-20" />
            <p className="font-black uppercase tracking-widest text-xs text-slate-500">
              No matching blog briefings found.
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Click "Upload New Blog" above to publish your first article.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog.id} 
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-slate-50/70 transition-colors"
              >
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-900 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
                      {blog.categoryLabel}
                    </span>
                    {blog.featured && (
                      <span className="px-2.5 py-0.5 rounded-md bg-royal-blue text-gold text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                        <Sparkles size={10} /> Featured
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Calendar size={12} /> {blog.publishedDate}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name} 
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover border border-slate-200" 
                    />
                    <span className="text-xs font-bold text-slate-700">{blog.author.name}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">{blog.author.role}</span>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPreviewBlog(blog)}
                    className="p-2.5 text-slate-500 hover:text-royal-blue hover:bg-royal-blue/5 rounded-xl transition-all cursor-pointer"
                    title="Quick Preview"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(blog)}
                    className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(blog)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    title="Delete Blog"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LUXURY ENHANCED BLOG UPLOAD / EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-[10001] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              className="bg-white border border-slate-200/90 rounded-[32px] w-full max-w-5xl max-h-[94vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden my-auto relative"
            >
              {/* Top Accent Strip */}
              <div className="h-1.5 bg-gradient-to-r from-royal-blue via-gold to-amber-500 w-full" />

              {/* Modal Header */}
              <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-b from-slate-50 to-white">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal-blue to-navy-dark text-gold flex items-center justify-center font-black shadow-md border border-royal-blue/30 shrink-0">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                        {editingBlogId ? 'Edit Executive Briefing' : 'Create Executive Blog Briefing'}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gold/20 text-royal-blue border border-gold/40">
                        {editingBlogId ? 'Live Article' : 'Draft Mode'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                      {editingBlogId ? 'Modifying statutory guidelines & editorial sections' : 'Compose rich statutory content with live visitor preview'}
                    </p>
                  </div>
                </div>

                {/* Header Right: Mode Switcher & Close */}
                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setEditorTab('form')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        editorTab === 'form'
                          ? 'bg-white text-royal-blue shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Edit3 size={13} />
                      <span>Editor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('livePreview')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        editorTab === 'livePreview'
                          ? 'bg-royal-blue text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Eye size={13} className={editorTab === 'livePreview' ? 'text-gold' : ''} />
                      <span>Live Preview</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
                    title="Close Editor"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Form Mode vs Live Preview Mode */}
              {editorTab === 'form' ? (
                <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/40">
                  
                  {/* Quick Starter Templates Bar */}
                  <div className="p-3.5 bg-gradient-to-r from-royal-blue/5 via-gold/10 to-transparent rounded-2xl border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Wand2 size={16} className="text-royal-blue" />
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Quick Practice Templates:
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate('incorporation')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-950 text-[11px] font-black border border-amber-500/30 transition-all cursor-pointer"
                      >
                        + Sdn Bhd Template
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate('tax')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-950 text-[11px] font-black border border-emerald-500/30 transition-all cursor-pointer"
                      >
                        + Tax & e-Invoicing
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate('visa')}
                        className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-950 text-[11px] font-black border border-sky-500/30 transition-all cursor-pointer"
                      >
                        + ESD Work Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate('licensing')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-950 text-[11px] font-black border border-indigo-500/30 transition-all cursor-pointer"
                      >
                        + WRT Licensing
                      </button>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* STEP 1: ARTICLE ESSENCE & CATEGORY */}
                  {/* ------------------------------------------------------------- */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-royal-blue/10 text-royal-blue text-xs font-black flex items-center justify-center">
                          1
                        </span>
                        <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5">
                          <FileText size={15} /> Article Essence & Practice Category
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Step 1 of 4</span>
                    </div>

                    {/* Interactive Category Selector Cards */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                        <span>Select Practice Area Category <span className="text-red-500">*</span></span>
                        <span className="text-slate-400 font-semibold lowercase">click to switch theme</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {CATEGORIES.map(cat => {
                          const isSelected = formCategory === cat.id;
                          const IconComp = cat.icon;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFormCategory(cat.id as any)}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-gold shadow-md ring-2 ring-gold/40'
                                  : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-gold' : 'bg-white text-royal-blue shadow-2xs'}`}>
                                  <IconComp size={16} />
                                </span>
                                {isSelected && (
                                  <span className="w-5 h-5 rounded-full bg-gold text-slate-950 flex items-center justify-center text-[10px] font-black">
                                    <Check size={12} />
                                  </span>
                                )}
                              </div>
                              <div>
                                <h5 className="text-xs font-black uppercase leading-tight">{cat.label}</h5>
                                <p className={`text-[10px] font-medium line-clamp-1 mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                  {cat.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Article Title <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-bold">{formTitle.length} chars</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. 2026 Foreign Ownership Guide: How to Incorporate a 100% Foreign-Owned Sdn Bhd"
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-black text-slate-900 outline-none focus:border-royal-blue focus:bg-white focus:ring-4 focus:ring-royal-blue/5 transition-all"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Public Card Excerpt (Hook / Briefing Summary) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-bold">{formExcerpt.length} chars</span>
                      </div>
                      <textarea
                        rows={2}
                        required
                        value={formExcerpt}
                        onChange={(e) => setFormExcerpt(e.target.value)}
                        placeholder="A concise statutory breakdown of paid-up capital, equity structures, and mandatory corporate approvals..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white focus:ring-4 focus:ring-royal-blue/5 resize-none transition-all"
                      />
                    </div>

                    {/* Published Date & Read Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" /> Estimated Read Time
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormReadTime(autoCalculatedReadTime)}
                            className="text-[10px] text-royal-blue hover:underline font-black uppercase tracking-wider cursor-pointer"
                          >
                            ⚡ Auto: {autoCalculatedReadTime}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={formReadTime}
                          onChange={(e) => setFormReadTime(e.target.value)}
                          placeholder="e.g. 5 min read"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                            <Calendar size={12} className="text-slate-400" /> Publish Date
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const d = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
                              setFormPublishedDate(d);
                            }}
                            className="text-[10px] text-royal-blue hover:underline font-black uppercase tracking-wider cursor-pointer"
                          >
                            📅 Today
                          </button>
                        </div>
                        <input
                          type="text"
                          value={formPublishedDate}
                          onChange={(e) => setFormPublishedDate(e.target.value)}
                          placeholder="e.g. March 03, 2026"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Featured Spotlight Toggle */}
                    <div 
                      onClick={() => setFormFeatured(!formFeatured)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        formFeatured
                          ? 'bg-gradient-to-r from-royal-blue via-[#002244] to-navy-dark text-white border-gold shadow-md'
                          : 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${formFeatured ? 'bg-gold text-slate-950 shadow-xs' : 'bg-amber-100 text-amber-700'}`}>
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase tracking-wider">
                            Feature this Briefing on Homepage Top Insights
                          </h5>
                          <p className={`text-[10.5px] font-medium mt-0.5 ${formFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                            Pins with a gold highlight badge and prioritizes display at the top of client pages.
                          </p>
                        </div>
                      </div>

                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formFeatured ? 'bg-gold' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formFeatured ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* STEP 2: LEAD AUTHOR & TOPIC TAGS */}
                  {/* ------------------------------------------------------------- */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-royal-blue/10 text-royal-blue text-xs font-black flex items-center justify-center">
                          2
                        </span>
                        <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5">
                          <User size={15} /> Lead Author & Topic Tags
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Step 2 of 4</span>
                    </div>

                    {/* Author Presets Bar */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                        Select Lead Practice Partner Preset
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {AUTHOR_PRESETS.map((preset, idx) => {
                          const isCurrent = formAuthorName === preset.name;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => applyAuthorPreset(preset)}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                isCurrent
                                  ? 'bg-royal-blue text-white border-royal-blue shadow-md ring-2 ring-gold/40'
                                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                              }`}
                            >
                              <img 
                                src={preset.avatar} 
                                alt={preset.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-xs shrink-0" 
                              />
                              <div className="min-w-0">
                                <h6 className="text-xs font-black truncate leading-tight">{preset.name}</h6>
                                <p className={`text-[9.5px] truncate mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                                  {preset.specialty}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Author Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Author Name</label>
                        <input
                          type="text"
                          value={formAuthorName}
                          onChange={(e) => setFormAuthorName(e.target.value)}
                          placeholder="e.g. Tan Sri Datuk Azman Rahim"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Practice Title</label>
                        <input
                          type="text"
                          value={formAuthorRole}
                          onChange={(e) => setFormAuthorRole(e.target.value)}
                          placeholder="e.g. Head of Corporate Secretarial Practice"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Avatar URL</label>
                        <input
                          type="text"
                          value={formAuthorAvatar}
                          onChange={(e) => setFormAuthorAvatar(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Topic Tags & Suggested Pills */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Tag size={13} className="text-slate-400" /> Topic Tags (Comma Separated)
                        </label>
                        <span className="text-[10px] text-slate-400 font-semibold">e.g. SSM, Tax, Employment Pass</span>
                      </div>
                      <input
                        type="text"
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        placeholder="SSM, Company Incorporation, Foreign Ownership, 100% Equity"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                      />

                      {/* Suggestions */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Suggested:</span>
                        {SUGGESTED_TAGS.map((stag, sidx) => (
                          <button
                            key={sidx}
                            type="button"
                            onClick={() => handleAddTagSuggestion(stag)}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-gold/20 text-slate-700 hover:text-royal-blue text-[10.5px] font-bold border border-slate-200 transition-all cursor-pointer"
                          >
                            + {stag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* STEP 3: EXECUTIVE SUMMARY & HIGHLIGHTED TAKEAWAYS */}
                  {/* ------------------------------------------------------------- */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-royal-blue/10 text-royal-blue text-xs font-black flex items-center justify-center">
                          3
                        </span>
                        <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles size={15} /> Executive Summary & Statutory Key Takeaways
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Step 3 of 4</span>
                    </div>

                    {/* Lead Summary */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Executive Lead Paragraph / Overview
                      </label>
                      <textarea
                        rows={3}
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                        placeholder="Provide an executive introduction outlining the legal framework, statutory changes, and advisory directives for foreign business owners..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white resize-none"
                      />
                    </div>

                    {/* Bullet Takeaways Builder */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                            Key Statutory Takeaways (Highlighted Golden Box)
                          </label>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Highlighted at the top of the article to give readers instant actionable takeaways.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddTakeaway}
                          className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Plus size={13} />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {formTakeaways.map((takeaway, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-amber-500/5 p-2.5 rounded-2xl border border-amber-500/20">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-950 text-xs font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={takeaway}
                              onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                              placeholder="e.g. 100% foreign equity ownership is permitted under standard trade classifications."
                              className="flex-1 px-3.5 py-2 bg-white border border-amber-500/20 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveTakeaway(idx)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-all"
                              title="Delete takeaway"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* STEP 4: DETAILED SECTIONS & REGULATORY CITATIONS */}
                  {/* ------------------------------------------------------------- */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-royal-blue/10 text-royal-blue text-xs font-black flex items-center justify-center">
                          4
                        </span>
                        <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5">
                          <Layers size={15} /> Detailed Article Sections & Citations
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="px-3.5 py-1.5 bg-royal-blue hover:bg-[#002244] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <ListPlus size={14} className="text-gold" />
                        <span>Add Section</span>
                      </button>
                    </div>

                    {/* Section Cards */}
                    <div className="space-y-4">
                      {formSections.map((sec, idx) => (
                        <div key={idx} className="p-5 bg-slate-50/90 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs relative">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="px-2.5 py-1 rounded-lg bg-royal-blue text-gold text-xs font-black shrink-0">
                                § {idx + 1}
                              </span>
                              <input
                                type="text"
                                value={sec.heading}
                                onChange={(e) => handleUpdateSection(idx, 'heading', e.target.value)}
                                placeholder={`Section ${idx + 1} Heading (e.g. 1. Minimum Capital Thresholds)`}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:border-royal-blue shadow-2xs"
                              />
                            </div>

                            {formSections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(idx)}
                                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-all"
                                title="Remove section"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>

                          <div className="space-y-1">
                            <textarea
                              rows={4}
                              value={sec.bodyText}
                              onChange={(e) => handleUpdateSection(idx, 'bodyText', e.target.value)}
                              placeholder="Write comprehensive statutory analysis here. Separate paragraphs with double newlines..."
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue resize-none shadow-2xs"
                            />
                            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 font-semibold">
                              <span>Markdown / Line breaks supported</span>
                              <span>{sec.bodyText.split(/\s+/).filter(Boolean).length} words</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Official Regulatory Citation */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Scale size={13} className="text-royal-blue" /> Official Statutory Reference Citation
                      </label>
                      <input
                        type="text"
                        value={formRegulatoryNote}
                        onChange={(e) => setFormRegulatoryNote(e.target.value)}
                        placeholder="e.g. Companies Act 2016 (Act 777), Section 196(4) on resident director qualifications."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText size={14} className="text-royal-blue" />
                        <span>{formSections.length} Sections</span>
                      </span>
                      <span>•</span>
                      <span>{totalWordCount} Words</span>
                      <span>•</span>
                      <span className="text-royal-blue">{formReadTime}</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditorOpen(false)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 cursor-pointer transition-all"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-royal-blue via-[#002244] to-royal-blue hover:opacity-95 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Save size={16} className="text-gold" />
                        <span>{editingBlogId ? 'Save & Update Briefing' : 'Publish Article to Portal'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* ------------------------------------------------------------- */
                /* LIVE VISITOR PREVIEW TAB */
                /* ------------------------------------------------------------- */
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100/70 space-y-8">
                  <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-6">
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 size={13} className="text-amber-600" />
                        <span>{CATEGORIES.find(c => c.id === formCategory)?.label || 'Corporate Insight'}</span>
                      </span>

                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Calendar size={13} /> {formPublishedDate || 'March 03, 2026'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> {formReadTime}</span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-snug">
                      {formTitle || 'Sample Article Title Appears Here'}
                    </h2>

                    {/* Author Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={formAuthorAvatar || AUTHOR_PRESETS[0].avatar} 
                          alt="Author" 
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-2xs"
                        />
                        <div>
                          <h4 className="text-xs font-black text-slate-900">{formAuthorName || 'Practice Lead'}</h4>
                          <p className="text-[11px] text-slate-500 font-semibold">{formAuthorRole || 'Corporate Specialist'}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Verified Partner
                      </span>
                    </div>

                    {/* Executive Summary */}
                    {formSummary && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 leading-relaxed">
                        {formSummary}
                      </div>
                    )}

                    {/* Takeaways Box */}
                    {formTakeaways.filter(Boolean).length > 0 && (
                      <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles size={15} className="text-amber-700" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-amber-950">
                            Key Statutory Takeaways
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {formTakeaways.filter(Boolean).map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sections */}
                    <div className="space-y-6 pt-4">
                      {formSections.map((sec, idx) => (
                        <div key={idx} className="space-y-2.5">
                          <h3 className="text-base font-black text-royal-blue uppercase tracking-tight">
                            {sec.heading}
                          </h3>
                          <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line space-y-2">
                            {sec.bodyText || 'Section content preview will render here...'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Regulatory Note */}
                    {formRegulatoryNote && (
                      <div className="p-4 rounded-2xl bg-royal-blue/5 border border-royal-blue/15 flex items-center gap-3 text-xs text-royal-blue font-bold">
                        <Scale size={18} className="shrink-0 text-royal-blue" />
                        <div>
                          <span className="uppercase text-[10px] tracking-wider block text-slate-500">Statutory Reference</span>
                          <span>{formRegulatoryNote}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* QUICK PREVIEW MODAL */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {previewBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10002] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-[28px] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                  <Eye size={14} className="text-royal-blue" />
                  Visitor Reader Preview
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewBlog(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-royal-blue/10 text-royal-blue text-[10px] font-black uppercase tracking-wider">
                    {previewBlog.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">{previewBlog.readTime}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {previewBlog.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {previewBlog.content.summary}
                </p>

                {previewBlog.content.takeaways && previewBlog.content.takeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 block">Key Takeaways</span>
                    <ul className="space-y-1.5">
                      {previewBlog.content.takeaways.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  {previewBlog.content.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-xs font-black text-royal-blue uppercase">{sec.heading}</h4>
                      {sec.body.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs text-slate-600 leading-relaxed">{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewBlog(null)}
                  className="px-5 py-2.5 bg-royal-blue text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
