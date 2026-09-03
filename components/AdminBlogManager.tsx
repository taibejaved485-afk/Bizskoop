import React, { useState, useEffect } from 'react';
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
  ListPlus
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
  { id: 'incorporation', label: 'Company Incorporation', icon: Building2 },
  { id: 'tax', label: 'Tax Advice', icon: Receipt },
  { id: 'visa', label: 'Immigration', icon: Globe2 },
  { id: 'licensing', label: 'Business Licensing', icon: FileCheck2 },
] as const;

const AUTHOR_PRESETS = [
  {
    name: 'Tan Sri Datuk Azman Rahim',
    role: 'Head of Corporate Secretarial Practice',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Faridah Hashim',
    role: 'Senior Immigration & Expat Affairs Counsel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Marcus Loh',
    role: 'Director of Trade & Regulatory Licensing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Elena Choo CA(M)',
    role: 'Principal Tax Advisory Partner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
];

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({ onLogAudit, onShowToast }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  
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
    { heading: '1. Overview & Regulatory Background', bodyText: '' }
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

  // Open New Post Form
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setFormTitle('');
    setFormCategory('incorporation');
    setFormExcerpt('');
    setFormReadTime('5 min read');
    
    // Default to today's date formatted e.g. "March 03, 2026"
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    setFormPublishedDate(dateFormatted);
    setFormFeatured(false);

    // Preset author 0
    setFormAuthorName(AUTHOR_PRESETS[0].name);
    setFormAuthorRole(AUTHOR_PRESETS[0].role);
    setFormAuthorAvatar(AUTHOR_PRESETS[0].avatar);

    setFormTags('SSM, Company Incorporation, Foreign Ownership');
    setFormSummary('');
    setFormTakeaways([
      'Foreign individuals and entities can own 100% equity in non-restricted sectors.',
      'A minimum of one resident director residing in Malaysia is legally mandated.',
      'Statutory compliance requires appointing a licensed company secretary within 30 days.'
    ]);
    setFormSections([
      {
        heading: '1. Executive Statutory Overview',
        bodyText: 'Enter detailed breakdown and analysis for your corporate briefing here.'
      }
    ]);
    setFormRegulatoryNote('Companies Act 2016 (Act 777), Section 196(4)');
    setIsEditorOpen(true);
  };

  // Open Edit Post Form
  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
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
    setFormTakeaways(prev => prev.filter((_, i) => i !== index));
  };

  // Section helpers
  const handleAddSection = () => {
    setFormSections(prev => [
      ...prev,
      { heading: `${prev.length + 1}. New Briefing Topic`, bodyText: '' }
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
        readTime: formReadTime.trim() || '5 min read',
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
        readTime: formReadTime.trim() || '5 min read',
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-8 h-8 rounded-xl bg-amber-50 border border-gold/20 flex items-center justify-center text-amber-700">
              <BookOpen size={16} />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter">
              Executive Blog Manager
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Upload, edit, and publish statutory briefings & corporate insights to the live portal
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            title="Reset to default 6 corporate briefings"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-3 bg-royal-blue hover:bg-[#002244] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
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
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-royal-blue text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
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
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(blog)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
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
      {/* COMPREHENSIVE BLOG UPLOAD / EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10001] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-[28px] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-royal-blue text-gold flex items-center justify-center font-black shadow-xs">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                      {editingBlogId ? 'Edit Executive Briefing' : 'Upload New Executive Blog Briefing'}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      {editingBlogId ? 'Modify published parameters & statutory sections' : 'Fill details below to publish live to the public portal'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* 1. Basic Metadata */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <FileText size={14} /> 1. Article Overview & Core Metadata
                  </h4>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Article Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. 2026 Foreign Ownership Guide: How to Incorporate a 100% Foreign-Owned Sdn Bhd"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-royal-blue focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue cursor-pointer"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={formReadTime}
                        onChange={(e) => setFormReadTime(e.target.value)}
                        placeholder="e.g. 6 min read"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Publish Date Label
                      </label>
                      <input
                        type="text"
                        value={formPublishedDate}
                        onChange={(e) => setFormPublishedDate(e.target.value)}
                        placeholder="e.g. March 03, 2026"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Card Excerpt / Short Summary <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      placeholder="Brief 1-2 sentence preview displayed on public blog cards..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white resize-none"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <label className="flex items-center gap-3 p-3.5 bg-amber-500/5 rounded-xl border border-amber-500/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-royal-blue focus:ring-royal-blue cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Feature this article on Homepage Top Insights
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Places a gold highlight star and prioritizes display on home page previews.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 2. Author Profile */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5">
                      <User size={14} /> 2. Author Information & Practice Lead
                    </h4>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400 font-bold uppercase mr-1">Presets:</span>
                      {AUTHOR_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyAuthorPreset(p)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold transition-all cursor-pointer"
                        >
                          {p.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Author Name</label>
                      <input
                        type="text"
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        placeholder="e.g. Tan Sri Datuk Azman Rahim"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Author Practice Title</label>
                      <input
                        type="text"
                        value={formAuthorRole}
                        onChange={(e) => setFormAuthorRole(e.target.value)}
                        placeholder="e.g. Head of Corporate Practice"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">Avatar Image URL</label>
                      <input
                        type="text"
                        value={formAuthorAvatar}
                        onChange={(e) => setFormAuthorAvatar(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Topic Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="e.g. SSM, Company Incorporation, Foreign Ownership, Paid-up Capital"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                    />
                  </div>
                </div>

                {/* 3. Deep Content & Bullet Takeaways */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Sparkles size={14} /> 3. Executive Reader Content & Key Takeaways
                  </h4>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Full Executive Summary / Lead Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={formSummary}
                      onChange={(e) => setFormSummary(e.target.value)}
                      placeholder="Provide a thorough introductory briefing paragraph that outlines the key statutory guidelines or regulatory context..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue focus:bg-white resize-none"
                    />
                  </div>

                  {/* Bullet Takeaways */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Key Statutory Takeaways (Highlighted Bullet Points)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddTakeaway}
                        className="text-[10px] text-royal-blue hover:underline font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={12} /> Add Takeaway Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formTakeaways.map((takeaway, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 w-5 text-center">#{idx + 1}</span>
                          <input
                            type="text"
                            value={takeaway}
                            onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                            placeholder="e.g. Minimum paid-up capital of RM1,000,000 required for 100% foreign equity."
                            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveTakeaway(idx)}
                            className="p-2 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Detailed Article Sections & Headings
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <ListPlus size={12} /> Add New Section
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formSections.map((sec, idx) => (
                        <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={sec.heading}
                              onChange={(e) => handleUpdateSection(idx, 'heading', e.target.value)}
                              placeholder={`Section ${idx + 1} Heading (e.g. 1. Capital Requirements)`}
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-900 outline-none focus:border-royal-blue"
                            />
                            {formSections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(idx)}
                                className="p-2 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                                title="Remove this section"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>

                          <textarea
                            rows={4}
                            value={sec.bodyText}
                            onChange={(e) => handleUpdateSection(idx, 'bodyText', e.target.value)}
                            placeholder="Detailed paragraphs for this section. Separate paragraphs with a blank line..."
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-royal-blue resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regulatory Citation */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Official Legal / Regulatory Reference Citation
                    </label>
                    <input
                      type="text"
                      value={formRegulatoryNote}
                      onChange={(e) => setFormRegulatoryNote(e.target.value)}
                      placeholder="e.g. Companies Act 2016 (Act 777), Section 196(4) on resident director qualifications."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-royal-blue"
                    />
                  </div>
                </div>

                {/* Submit button inside form */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 bg-royal-blue hover:bg-[#002244] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={15} className="text-gold" />
                    <span>{editingBlogId ? 'Save & Update Briefing' : 'Publish Blog to Portal'}</span>
                  </button>
                </div>
              </form>
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
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <Check size={13} className="text-amber-700 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  {previewBlog.content.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-sm font-black text-slate-900">{sec.heading}</h4>
                      {sec.body.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs text-slate-700 leading-relaxed">
                          {p}
                        </p>
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
