import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Type,
  Smartphone,
  Monitor,
  Pin,
  PinOff,
  Copy,
  ArrowRight,
  HelpCircle,
  Split,
  Maximize2,
  Minimize2,
  Image as ImageIcon
} from 'lucide-react';
import { 
  BlogPost, 
  getStoredBlogPosts, 
  saveBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  resetDefaultBlogPosts, 
  BLOGS_UPDATED_EVENT,
  BLOGS_AUTOSAVE_DRAFT_KEY 
} from '../services/blogStorage.ts';
import { RichTextEditor } from './RichTextEditor.tsx';
import { ImageMediaManager } from './ImageMediaManager.tsx';
import { SeoMetaManager } from './SeoMetaManager.tsx';

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

const TARGET_AUDIENCES = [
  'Foreign Investors & Non-Residents',
  'Tech Startups & Digital Entrepreneurs',
  'Corporate CFOs & Directors',
  'Retail & F&B Operators',
  'Expatriates & Global Talent',
  'General Small & Medium Enterprises (SME)'
];

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
  'MDEC MD Status',
  'Paid-up Capital',
  'Expat Visa'
];

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({ onLogAudit, onShowToast }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('editor');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  
  // Standalone reader modal
  const [activePreviewBlog, setActivePreviewBlog] = useState<BlogPost | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<'incorporation' | 'visa' | 'licensing' | 'tax'>('incorporation');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formPublishedDate, setFormPublishedDate] = useState('');
  const [formScheduledDate, setFormScheduledDate] = useState('');
  const [formStatus, setFormStatus] = useState<'draft' | 'scheduled' | 'published'>('published');
  const [formTargetAudience, setFormTargetAudience] = useState(TARGET_AUDIENCES[0]);
  const [formFeatured, setFormFeatured] = useState(false);

  // Featured Image & Media
  const [formFeaturedImage, setFormFeaturedImage] = useState('');
  const [formImageAlt, setFormImageAlt] = useState('');
  const [formImageCaption, setFormImageCaption] = useState('');

  // SEO
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDescription, setFormMetaDescription] = useState('');
  const [formFocusKeywords, setFormFocusKeywords] = useState<string[]>([]);

  // Author
  const [formAuthorName, setFormAuthorName] = useState(AUTHOR_PRESETS[0].name);
  const [formAuthorRole, setFormAuthorRole] = useState(AUTHOR_PRESETS[0].role);
  const [formAuthorAvatar, setFormAuthorAvatar] = useState(AUTHOR_PRESETS[0].avatar);

  // Content
  const [formSummary, setFormSummary] = useState('');
  const [formTakeaways, setFormTakeaways] = useState<string[]>(['', '']);
  const [formRichHtml, setFormRichHtml] = useState('');
  const [formSections, setFormSections] = useState<{ heading: string; body: string[] }[]>([
    { heading: '1. Statutory Framework Overview', body: [''] }
  ]);
  const [formRegulatoryNote, setFormRegulatoryNote] = useState('');
  const [formTags, setFormTags] = useState<string[]>(['SSM Malaysia']);

  // Auto-save state
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string | null>(null);
  const [hasRestorableDraft, setHasRestorableDraft] = useState(false);

  // Synchronize on storage changes
  useEffect(() => {
    const handleUpdate = () => {
      setBlogs(getStoredBlogPosts());
    };
    window.addEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
  }, []);

  // Check for existing auto-saved draft on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(BLOGS_AUTOSAVE_DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && (parsed.formTitle || parsed.formSummary || parsed.formRichHtml)) {
          setHasRestorableDraft(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-calculate reading time whenever content changes
  useEffect(() => {
    const fullText = [
      formTitle,
      formExcerpt,
      formSummary,
      ...formTakeaways,
      formRichHtml.replace(/<[^>]+>/g, ' '),
      ...formSections.flatMap(s => [s.heading, ...s.body])
    ].join(' ');

    const words = (fullText.match(/\S+/g) || []).length;
    const mins = Math.max(1, Math.ceil(words / 190));
    setFormReadTime(`${mins} min read`);
  }, [formTitle, formExcerpt, formSummary, formTakeaways, formRichHtml, formSections]);

  // Periodic Auto-Save Draft to LocalStorage when Editor is open
  useEffect(() => {
    if (!isEditorOpen) return;

    const draftData = {
      editingBlogId,
      formTitle,
      formSlug,
      formCategory,
      formExcerpt,
      formReadTime,
      formPublishedDate,
      formScheduledDate,
      formStatus,
      formTargetAudience,
      formFeatured,
      formFeaturedImage,
      formImageAlt,
      formImageCaption,
      formMetaTitle,
      formMetaDescription,
      formFocusKeywords,
      formAuthorName,
      formAuthorRole,
      formAuthorAvatar,
      formSummary,
      formTakeaways,
      formRichHtml,
      formSections,
      formRegulatoryNote,
      formTags,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(BLOGS_AUTOSAVE_DRAFT_KEY, JSON.stringify(draftData));
        setLastAutoSaveTime(draftData.timestamp);
      } catch {
        // ignore
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [
    isEditorOpen, editingBlogId, formTitle, formSlug, formCategory, formExcerpt,
    formReadTime, formPublishedDate, formScheduledDate, formStatus, formTargetAudience,
    formFeatured, formFeaturedImage, formImageAlt, formImageCaption, formMetaTitle,
    formMetaDescription, formFocusKeywords, formAuthorName, formAuthorRole, formAuthorAvatar,
    formSummary, formTakeaways, formRichHtml, formSections, formRegulatoryNote, formTags
  ]);

  // Open Create Modal with clean defaults
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('incorporation');
    setFormExcerpt('');
    setFormReadTime('5 min read');
    setFormPublishedDate(new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }));
    setFormScheduledDate('');
    setFormStatus('published');
    setFormTargetAudience(TARGET_AUDIENCES[0]);
    setFormFeatured(false);

    setFormFeaturedImage('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80');
    setFormImageAlt('Modern Kuala Lumpur corporate architecture');
    setFormImageCaption('Strategic headquarters advisory for Malaysian Sendirian Berhad companies.');

    setFormMetaTitle('');
    setFormMetaDescription('');
    setFormFocusKeywords(['SSM Malaysia', 'Company Incorporation']);

    const defaultAuthor = AUTHOR_PRESETS[0];
    setFormAuthorName(defaultAuthor.name);
    setFormAuthorRole(defaultAuthor.role);
    setFormAuthorAvatar(defaultAuthor.avatar);

    setFormSummary('');
    setFormTakeaways([
      'Statutory resident director compliance under Section 196(4) of the Companies Act 2016.',
      'Minimum paid-up capital sizing for corporate banking and ESD expat sponsorship.'
    ]);
    setFormRichHtml(`<h2>1. Regulatory Overview & Statutory Context</h2><p>Entering the Malaysian market requires strict adherence to corporate secretarial compliance, statutory filing deadlines, and foreign ownership guidelines.</p><blockquote>Compliance with the Companies Commission of Malaysia (SSM) mandates registered office addresses and licensed secretarial appointments within 30 days of registration.</blockquote>`);
    setFormSections([
      {
        heading: '1. Procedural Roadmap & SSM Requirements',
        body: ['International enterprises can incorporate a Sdn Bhd with 100% foreign ownership in most non-restricted commercial sectors.']
      }
    ]);
    setFormRegulatoryNote('Companies Commission of Malaysia (SSM) • Companies Act 2016 (Act 777)');
    setFormTags(['SSM Malaysia', '100% Foreign Equity', 'Sdn Bhd']);
    setViewMode('editor');
    setIsEditorOpen(true);
  };

  // Restore Draft from LocalStorage
  const handleRestoreDraft = () => {
    try {
      const savedDraft = localStorage.getItem(BLOGS_AUTOSAVE_DRAFT_KEY);
      if (!savedDraft) return;
      const data = JSON.parse(savedDraft);
      
      setEditingBlogId(data.editingBlogId || null);
      setFormTitle(data.formTitle || '');
      setFormSlug(data.formSlug || '');
      setFormCategory(data.formCategory || 'incorporation');
      setFormExcerpt(data.formExcerpt || '');
      setFormReadTime(data.formReadTime || '5 min read');
      setFormPublishedDate(data.formPublishedDate || '');
      setFormScheduledDate(data.formScheduledDate || '');
      setFormStatus(data.formStatus || 'published');
      setFormTargetAudience(data.formTargetAudience || TARGET_AUDIENCES[0]);
      setFormFeatured(Boolean(data.formFeatured));

      setFormFeaturedImage(data.formFeaturedImage || '');
      setFormImageAlt(data.formImageAlt || '');
      setFormImageCaption(data.formImageCaption || '');

      setFormMetaTitle(data.formMetaTitle || '');
      setFormMetaDescription(data.formMetaDescription || '');
      setFormFocusKeywords(Array.isArray(data.formFocusKeywords) ? data.formFocusKeywords : []);

      setFormAuthorName(data.formAuthorName || AUTHOR_PRESETS[0].name);
      setFormAuthorRole(data.formAuthorRole || AUTHOR_PRESETS[0].role);
      setFormAuthorAvatar(data.formAuthorAvatar || AUTHOR_PRESETS[0].avatar);

      setFormSummary(data.formSummary || '');
      setFormTakeaways(Array.isArray(data.formTakeaways) ? data.formTakeaways : ['', '']);
      setFormRichHtml(data.formRichHtml || '');
      setFormSections(Array.isArray(data.formSections) ? data.formSections : [{ heading: '1. Overview', body: [''] }]);
      setFormRegulatoryNote(data.formRegulatoryNote || '');
      setFormTags(Array.isArray(data.formTags) ? data.formTags : ['SSM Malaysia']);

      setIsEditorOpen(true);
      onShowToast('Restored draft from local auto-save cache');
    } catch {
      onShowToast('Could not parse saved draft');
    }
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(BLOGS_AUTOSAVE_DRAFT_KEY);
    setHasRestorableDraft(false);
    setLastAutoSaveTime(null);
    onShowToast('Auto-saved draft removed');
  };

  // Close editor safely
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    onShowToast('Editor closed. Draft is saved.');
  };

  // Open Edit Modal for existing blog
  const handleOpenEdit = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormReadTime(post.readTime);
    setFormPublishedDate(post.publishedDate);
    setFormScheduledDate(post.scheduledDate || '');
    setFormStatus(post.status || 'published');
    setFormTargetAudience(post.targetAudience || TARGET_AUDIENCES[0]);
    setFormFeatured(Boolean(post.featured));

    setFormFeaturedImage(post.featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80');
    setFormImageAlt(post.imageAlt || post.title);
    setFormImageCaption(post.imageCaption || '');

    setFormMetaTitle(post.metaTitle || `${post.title.slice(0, 50)} | Bizflow`);
    setFormMetaDescription(post.metaDescription || post.excerpt);
    setFormFocusKeywords(post.focusKeywords || post.tags || []);

    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormAuthorAvatar(post.author.avatar);

    setFormSummary(post.content.summary);
    setFormTakeaways(post.content.takeaways && post.content.takeaways.length > 0 ? post.content.takeaways : ['', '']);
    setFormRichHtml(post.content.richHtml || (post.content.sections ? post.content.sections.map(s => `<h2>${s.heading}</h2>${s.body.map(b => `<p>${b}</p>`).join('')}`).join('') : ''));
    setFormSections(post.content.sections && post.content.sections.length > 0 ? post.content.sections : [{ heading: '1. Overview', body: [''] }]);
    setFormRegulatoryNote(post.content.regulatoryNote || '');
    setFormTags(post.tags);
    setViewMode('editor');
    setIsEditorOpen(true);
  };

  // Duplicate Blog Post
  const handleDuplicate = (post: BlogPost) => {
    const duplicated: Omit<BlogPost, 'id' | 'slug'> = {
      ...post,
      title: `${post.title} (Copy)`,
      status: 'draft',
      featured: false,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    };
    saveBlogPost(duplicated);
    onLogAudit(`Duplicated article "${post.title}" as draft`);
    onShowToast(`Duplicated as new draft`);
  };

  // Toggle Featured status inline
  const handleToggleFeatured = (post: BlogPost) => {
    updateBlogPost(post.id, { featured: !post.featured });
    onLogAudit(`Toggled sticky featured status for "${post.title}" to ${!post.featured}`);
    onShowToast(!post.featured ? 'Pinned to Featured Articles' : 'Unpinned from Featured Articles');
  };

  // Delete Blog Post
  const handleDelete = (id: string, title: string) => {
    deleteBlogPost(id);
    onLogAudit(`Deleted blog post "${title}"`);
    onShowToast(`Deleted article "${title}"`);
  };

  // Save Blog Post Submit
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      onShowToast('Please enter an article title before saving.');
      return;
    }

    const currentCatObj = CATEGORIES.find(c => c.id === formCategory);
    const categoryLabel = currentCatObj ? currentCatObj.label : 'Corporate Services';

    const cleanTakeaways = formTakeaways.map(t => t.trim()).filter(Boolean);
    const cleanTags = formTags.map(t => t.trim()).filter(Boolean);
    const cleanKeywords = formFocusKeywords.map(k => k.trim()).filter(Boolean);

    const postPayload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: formExcerpt.trim() || formSummary.slice(0, 160) || 'Comprehensive regulatory briefing by Bizflow Advisory.',
      category: formCategory,
      categoryLabel,
      readTime: formReadTime,
      publishedDate: formPublishedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      scheduledDate: formStatus === 'scheduled' ? formScheduledDate : undefined,
      status: formStatus,
      targetAudience: formTargetAudience,
      featured: formFeatured,
      featuredImage: formFeaturedImage.trim(),
      imageAlt: formImageAlt.trim(),
      imageCaption: formImageCaption.trim(),
      metaTitle: formMetaTitle.trim() || formTitle.trim(),
      metaDescription: formMetaDescription.trim() || formExcerpt.trim(),
      focusKeywords: cleanKeywords.length > 0 ? cleanKeywords : cleanTags,
      author: {
        name: formAuthorName.trim() || 'Senior Corporate Advisor',
        role: formAuthorRole.trim() || 'Bizflow Secretarial & Tax Practice',
        avatar: formAuthorAvatar.trim() || AUTHOR_PRESETS[0].avatar
      },
      tags: cleanTags.length > 0 ? cleanTags : ['Corporate Services', 'Malaysia 2026'],
      content: {
        summary: formSummary.trim(),
        takeaways: cleanTakeaways,
        richHtml: formRichHtml,
        sections: formSections,
        regulatoryNote: formRegulatoryNote.trim()
      }
    };

    if (editingBlogId) {
      updateBlogPost(editingBlogId, postPayload);
      onLogAudit(`Updated blog post "${formTitle}" (Status: ${formStatus})`);
      onShowToast(`Successfully updated "${formTitle}"`);
    } else {
      saveBlogPost(postPayload);
      onLogAudit(`Created new blog post "${formTitle}" (Status: ${formStatus})`);
      onShowToast(`Published new article`);
    }

    // Clean up autosaved draft on successful publish
    localStorage.removeItem(BLOGS_AUTOSAVE_DRAFT_KEY);
    setHasRestorableDraft(false);
    setIsEditorOpen(false);
  };

  // Reset to default sample posts
  const handleResetDefaults = () => {
    resetDefaultBlogPosts();
    onLogAudit('Reset blog articles to default master list');
    onShowToast('Reset to default regulatory briefings');
  };

  // Filtered Blog List
  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchesSearch = !searchQuery || 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || (b.status || 'published') === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchQuery, categoryFilter, statusFilter]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter(b => (b.status || 'published') === 'published').length;
    const drafts = blogs.filter(b => b.status === 'draft').length;
    const scheduled = blogs.filter(b => b.status === 'scheduled').length;
    const featuredCount = blogs.filter(b => b.featured).length;
    return { total, published, drafts, scheduled, featuredCount };
  }, [blogs]);

  // Temporary synthetic preview object from current form state
  const livePreviewBlog: BlogPost = useMemo(() => {
    const cat = CATEGORIES.find(c => c.id === formCategory);
    return {
      id: editingBlogId || 'preview_id',
      title: formTitle || 'Untitled Corporate Advisory Briefing',
      slug: formSlug || 'article-preview',
      excerpt: formExcerpt || 'Detailed summary of statutory requirements, filing checklists, and compliance deadlines.',
      category: formCategory,
      categoryLabel: cat ? cat.label : 'Corporate Services',
      readTime: formReadTime,
      publishedDate: formPublishedDate || 'March 2026',
      scheduledDate: formScheduledDate,
      status: formStatus,
      targetAudience: formTargetAudience,
      featured: formFeatured,
      featuredImage: formFeaturedImage,
      imageAlt: formImageAlt,
      imageCaption: formImageCaption,
      metaTitle: formMetaTitle,
      metaDescription: formMetaDescription,
      focusKeywords: formFocusKeywords,
      author: {
        name: formAuthorName || 'Senior Corporate Advisor',
        role: formAuthorRole || 'Corporate Practice',
        avatar: formAuthorAvatar || AUTHOR_PRESETS[0].avatar
      },
      tags: formTags.filter(Boolean),
      content: {
        summary: formSummary,
        takeaways: formTakeaways.filter(Boolean),
        richHtml: formRichHtml,
        sections: formSections,
        regulatoryNote: formRegulatoryNote
      }
    };
  }, [
    editingBlogId, formTitle, formSlug, formCategory, formExcerpt, formReadTime,
    formPublishedDate, formScheduledDate, formStatus, formTargetAudience, formFeatured,
    formFeaturedImage, formImageAlt, formImageCaption, formMetaTitle, formMetaDescription,
    formFocusKeywords, formAuthorName, formAuthorRole, formAuthorAvatar, formSummary,
    formTakeaways, formRichHtml, formSections, formRegulatoryNote, formTags
  ]);

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-gold" />
              <span>Editorial & Publishing CMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Blog & Business Insights Manager
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl">
              Authoritative regulatory briefings, statutory breakdowns, tax updates, and investment guides for Malaysian enterprises.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hasRestorableDraft && (
              <button
                type="button"
                onClick={handleRestoreDraft}
                className="px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                title="Restore auto-saved draft from browser cache"
              >
                <RotateCcw size={14} className="text-amber-700" />
                <span>Restore Draft</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset to statutory master articles"
            >
              <RotateCcw size={14} />
              <span>Reset Samples</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-royal-blue hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} className="text-gold" />
              <span>Write New Article</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Total Articles
            </span>
            <div className="text-xl font-black text-royal-blue mt-1">
              {stats.total}
            </div>
            <span className="text-[10.5px] text-slate-500 font-medium">In master database</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
              Published Live
            </span>
            <div className="text-xl font-black text-emerald-900 mt-1">
              {stats.published}
            </div>
            <span className="text-[10.5px] text-emerald-700 font-medium">Accessible to visitors</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
              Scheduled / Drafts
            </span>
            <div className="text-xl font-black text-amber-900 mt-1">
              {stats.scheduled + stats.drafts}
            </div>
            <span className="text-[10.5px] text-amber-700 font-medium">{stats.scheduled} scheduled • {stats.drafts} drafts</span>
          </div>

          <div className="p-4 rounded-2xl bg-royal-blue text-white shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-gold block">
              Sticky Spotlight
            </span>
            <div className="text-xl font-black text-white mt-1">
              {stats.featuredCount}
            </div>
            <span className="text-[10.5px] text-blue-100/80 font-medium">Pinned to homepage top</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tags, statutory reference, or author..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="published">🟢 Published ({stats.published})</option>
            <option value="scheduled">🟡 Scheduled ({stats.scheduled})</option>
            <option value="draft">⚪ Drafts ({stats.drafts})</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
          >
            <option value="all">All Practice Areas</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table & Cards */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <BookOpen size={36} className="mx-auto text-slate-300" />
            <h4 className="text-sm font-bold text-slate-700">No Articles Match Your Criteria</h4>
            <p className="text-xs text-slate-400">Try adjusting your search terms or create a new advisory briefing.</p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-bold shadow-xs hover:bg-blue-900 inline-flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Create Article</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Article & Category</th>
                  <th className="py-3.5 px-4">Status & Visibility</th>
                  <th className="py-3.5 px-4">Author Profile</th>
                  <th className="py-3.5 px-4">SEO & Keywords</th>
                  <th className="py-3.5 px-4">Reading Time</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredBlogs.map((post) => {
                  const catObj = CATEGORIES.find(c => c.id === post.category);
                  const isScheduled = post.status === 'scheduled';
                  const isDraft = post.status === 'draft';
                  const isPublished = !isScheduled && !isDraft;

                  return (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Title & Category */}
                      <td className="py-4 px-4 max-w-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase tracking-wider border ${catObj?.badge || 'bg-slate-100 text-slate-700'}`}>
                              {post.categoryLabel}
                            </span>
                            {post.featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-royal-blue text-gold border border-royal-blue/30 shadow-2xs">
                                <Sparkles size={10} className="text-gold" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 group-hover:text-royal-blue text-xs sm:text-[13px] leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </td>

                      {/* Status & Visibility */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {isPublished && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              <span>Live Published</span>
                            </span>
                          )}
                          {isScheduled && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              <Clock size={11} className="text-amber-700" />
                              <span>Scheduled: {post.scheduledDate || 'Future'}</span>
                            </span>
                          )}
                          {isDraft && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                              <span>Draft Only</span>
                            </span>
                          )}
                          <div className="text-[10px] text-slate-400">
                            {post.publishedDate}
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-800 text-[11px]">{post.author.name}</p>
                            <p className="text-[10px] text-slate-400">{post.author.role}</p>
                          </div>
                        </div>
                      </td>

                      {/* SEO & Keywords */}
                      <td className="py-4 px-4 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {(post.focusKeywords || post.tags || []).slice(0, 2).map((t, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9.5px] font-semibold truncate max-w-[120px]">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Reading Time */}
                      <td className="py-4 px-4 whitespace-nowrap text-[11px] font-bold text-slate-500">
                        {post.readTime}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(post)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              post.featured 
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                                : 'bg-white text-slate-400 border-slate-200 hover:text-royal-blue'
                            }`}
                            title={post.featured ? 'Unpin from Featured' : 'Pin to Featured'}
                          >
                            {post.featured ? <Pin size={13} className="fill-amber-600" /> : <Pin size={13} />}
                          </button>

                          <button
                            type="button"
                            onClick={() => setActivePreviewBlog(post)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-royal-blue hover:text-white text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                            title="Preview Article Layout"
                          >
                            <Eye size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicate(post)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                            title="Duplicate as Draft"
                          >
                            <Copy size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-royal-blue hover:text-white text-royal-blue border border-blue-200 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit3 size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL-FEATURED BLOG EDITOR & LIVE PREVIEW MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className={`w-full ${viewMode === 'split' ? 'max-w-7xl' : 'max-w-5xl'} bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[95vh]`}
            >
              {/* Top Modal Navigation Bar */}
              <div className="p-4 sm:px-6 sm:py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-royal-blue text-gold flex items-center justify-center font-black">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                      <span>{editingBlogId ? 'Edit Article Briefing' : 'Write New Advisory Briefing'}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      {lastAutoSaveTime && (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Auto-saved at {lastAutoSaveTime}</span>
                        </span>
                      )}
                      <span>•</span>
                      <span>Word Count: {(formRichHtml.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length}</span>
                    </div>
                  </div>
                </div>

                {/* View Mode Switcher (Editor / Split / Live Preview) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setViewMode('editor')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === 'editor' 
                          ? 'bg-royal-blue text-white shadow-xs' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('split')}
                      className={`px-3 py-1.5 rounded-lg transition-all hidden md:flex items-center gap-1 ${
                        viewMode === 'split' 
                          ? 'bg-royal-blue text-white shadow-xs' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Split size={12} />
                      <span>Split View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('preview')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        viewMode === 'preview' 
                          ? 'bg-royal-blue text-white shadow-xs' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Eye size={12} />
                      <span>Full Preview</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseEditor}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close editor"
                    title="Close editor (draft is auto-saved)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body Container */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
                <div className={`grid ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12 gap-6' : 'grid-cols-1'}`}>
                  
                  {/* LEFT / MAIN COLUMN: The Editor Form */}
                  {(viewMode === 'editor' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'} space-y-6`}>
                      <form id="blog_admin_form" onSubmit={handleSavePost} className="space-y-6">
                        
                        {/* 1. Article Title & Slug */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                          <div>
                            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-1">
                              Article Headline / Statutory Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formTitle}
                              onChange={(e) => {
                                setFormTitle(e.target.value);
                                if (!editingBlogId) {
                                  setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                                }
                              }}
                              placeholder="e.g., 2026 Foreign Ownership Guide: How to Incorporate a 100% Foreign-Owned Sdn Bhd in Malaysia"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-1">
                              Executive Excerpt / Short Lead
                            </label>
                            <textarea
                              rows={2}
                              value={formExcerpt}
                              onChange={(e) => setFormExcerpt(e.target.value)}
                              placeholder="A concise 2-sentence executive summary displayed on cards and search engine snippets..."
                              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-royal-blue focus:outline-hidden resize-none"
                            />
                          </div>
                        </div>

                        {/* 2. Publishing Controls & Classification */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
                          <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-1.5 border-b border-slate-100 pb-3">
                            <Sliders size={14} className="text-gold" />
                            <span>Publishing Status & Audience Classification</span>
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Status Switcher */}
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Publishing Status
                              </label>
                              <select
                                value={formStatus}
                                onChange={(e) => setFormStatus(e.target.value as any)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-royal-blue"
                              >
                                <option value="published">🟢 Published (Live Immediately)</option>
                                <option value="scheduled">🟡 Scheduled (Future Date)</option>
                                <option value="draft">⚪ Draft (Private Working Copy)</option>
                              </select>
                            </div>

                            {/* Practice Category */}
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Practice Category Area
                              </label>
                              <select
                                value={formCategory}
                                onChange={(e) => setFormCategory(e.target.value as any)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-royal-blue"
                              >
                                {CATEGORIES.map(c => (
                                  <option key={c.id} value={c.id}>{c.label}</option>
                                ))}
                              </select>
                            </div>

                            {/* Target Audience */}
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Target Client Profile
                              </label>
                              <select
                                value={formTargetAudience}
                                onChange={(e) => setFormTargetAudience(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-royal-blue"
                              >
                                {TARGET_AUDIENCES.map(a => (
                                  <option key={a} value={a}>{a}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Scheduled Date Picker (conditional) */}
                          {formStatus === 'scheduled' && (
                            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                              <label className="text-xs font-bold text-amber-900 block">
                                📅 Scheduled Release Date & Time
                              </label>
                              <input
                                type="datetime-local"
                                value={formScheduledDate}
                                onChange={(e) => setFormScheduledDate(e.target.value)}
                                className="px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-amber-900 focus:ring-2 focus:ring-amber-500"
                              />
                              <p className="text-[10px] text-amber-700">
                                This article will automatically display a 'Scheduled' badge until this date is reached.
                              </p>
                            </div>
                          )}

                          {/* Sticky / Featured Switch */}
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-2">
                              <Pin size={16} className={formFeatured ? 'text-amber-600 fill-amber-500' : 'text-slate-400'} />
                              <div>
                                <span className="text-xs font-bold text-slate-800 block">Sticky Spotlight Article</span>
                                <span className="text-[10px] text-slate-500">Pin to the top of the main website blog section with gold highlight badge.</span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={formFeatured}
                              onChange={(e) => setFormFeatured(e.target.checked)}
                              className="w-4 h-4 rounded text-royal-blue focus:ring-royal-blue cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* 3. Featured Image & Media Upload (Dropzone + Stock Photos) */}
                        <ImageMediaManager
                          imageUrl={formFeaturedImage}
                          imageAlt={formImageAlt}
                          imageCaption={formImageCaption}
                          onImageChange={(url, alt, caption) => {
                            setFormFeaturedImage(url);
                            if (alt) setFormImageAlt(alt);
                            if (caption) setFormImageCaption(caption);
                          }}
                          onAltChange={setFormImageAlt}
                          onCaptionChange={setFormImageCaption}
                        />

                        {/* 4. Rich Text Editor (Full-Featured WYSIWYG) */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                              <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-1.5">
                                <FileText size={14} className="text-gold" />
                                <span>Article Body & Rich Text Content *</span>
                              </h3>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Format with Headings, Tables, Lists, Code, Hyperlinks, and Blockquotes.
                              </p>
                            </div>
                            <span className="text-xs font-bold text-slate-500">{formReadTime}</span>
                          </div>

                          <RichTextEditor
                            value={formRichHtml}
                            onChange={setFormRichHtml}
                            placeholder="Type detailed statutory explanations, regulatory breakdowns, and actionable advisory guidance..."
                            minHeight="350px"
                          />
                        </div>

                        {/* 5. Statutory Takeaways Checklist */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-1.5">
                              <CheckCircle2 size={14} className="text-gold" />
                              <span>Key Takeaways / Golden Bullets</span>
                            </h3>
                            <button
                              type="button"
                              onClick={() => setFormTakeaways([...formTakeaways, ''])}
                              className="px-2.5 py-1 rounded-lg bg-royal-blue/10 hover:bg-royal-blue hover:text-white text-royal-blue text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Plus size={12} />
                              <span>Add Takeaway Bullet</span>
                            </button>
                          </div>

                          <div className="space-y-2.5">
                            {formTakeaways.map((takeaway, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-gold/20 text-royal-blue text-[10px] font-black flex items-center justify-center shrink-0">
                                  {tIdx + 1}
                                </span>
                                <input
                                  type="text"
                                  value={takeaway}
                                  onChange={(e) => {
                                    const next = [...formTakeaways];
                                    next[tIdx] = e.target.value;
                                    setFormTakeaways(next);
                                  }}
                                  placeholder="e.g., Minimum paid-up capital of RM1,000,000 is required for 100% foreign-owned EP sponsorship."
                                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                                />
                                {formTakeaways.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => setFormTakeaways(formTakeaways.filter((_, idx) => idx !== tIdx))}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 6. Author Profile Selection */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-1.5 border-b border-slate-100 pb-3">
                            <User size={14} className="text-gold" />
                            <span>Assigned Practice Partner / Author</span>
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {AUTHOR_PRESETS.map((author) => {
                              const isSelected = formAuthorName === author.name;
                              return (
                                <button
                                  key={author.name}
                                  type="button"
                                  onClick={() => {
                                    setFormAuthorName(author.name);
                                    setFormAuthorRole(author.role);
                                    setFormAuthorAvatar(author.avatar);
                                  }}
                                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                                    isSelected 
                                      ? 'bg-royal-blue/5 border-royal-blue ring-2 ring-royal-blue/20' 
                                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 truncate">{author.name}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{author.role}</p>
                                    <span className="text-[9px] font-bold text-gold uppercase block mt-0.5">{author.specialty}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 7. SEO & Smart Meta Generator */}
                        <SeoMetaManager
                          title={formTitle}
                          excerpt={formExcerpt}
                          category={formCategory}
                          categoryLabel={CATEGORIES.find(c => c.id === formCategory)?.label || ''}
                          richContent={formRichHtml}
                          slug={formSlug}
                          metaTitle={formMetaTitle}
                          metaDescription={formMetaDescription}
                          focusKeywords={formFocusKeywords}
                          onSlugChange={setFormSlug}
                          onMetaTitleChange={setFormMetaTitle}
                          onMetaDescriptionChange={setFormMetaDescription}
                          onKeywordsChange={setFormFocusKeywords}
                        />

                        {/* 8. Regulatory Note & Statutory Citation */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                          <label className="text-xs font-black uppercase tracking-wider text-royal-blue flex items-center gap-1.5">
                            <Scale size={14} className="text-gold" />
                            <span>Regulatory Citation Note / Legal Authority</span>
                          </label>
                          <input
                            type="text"
                            value={formRegulatoryNote}
                            onChange={(e) => setFormRegulatoryNote(e.target.value)}
                            placeholder="e.g., Statutory Reference: Companies Act 2016 (Act 777), Section 196(4) on resident director qualifications."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                          />
                        </div>
                      </form>
                    </div>
                  )}

                  {/* RIGHT COLUMN / FULL PREVIEW: Responsive Live Preview */}
                  {(viewMode === 'split' || viewMode === 'preview') && (
                    <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'w-full max-w-4xl mx-auto'} space-y-4`}>
                      {/* Preview Device Controls */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                            Live Visitor View
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            ● Real-Time Sync
                          </span>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setPreviewDevice('desktop')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              previewDevice === 'desktop' 
                                ? 'bg-white text-royal-blue shadow-2xs' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            <Monitor size={13} />
                            <span>Desktop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewDevice('mobile')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              previewDevice === 'mobile' 
                                ? 'bg-white text-royal-blue shadow-2xs' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            <Smartphone size={13} />
                            <span>Mobile (390px)</span>
                          </button>
                        </div>
                      </div>

                      {/* Rendered Live Container */}
                      <div className={`mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden ${
                        previewDevice === 'mobile' ? 'max-w-[390px] ring-8 ring-slate-900' : 'w-full'
                      }`}>
                        {/* Featured Hero Banner if present */}
                        {livePreviewBlog.featuredImage && (
                          <div className="relative w-full h-52 sm:h-64 bg-slate-900 overflow-hidden">
                            <img
                              src={livePreviewBlog.featuredImage}
                              alt={livePreviewBlog.imageAlt || 'Featured article image'}
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            {livePreviewBlog.imageCaption && (
                              <div className="absolute bottom-2 left-3 right-3 text-[10px] text-white/90 font-medium truncate">
                                📷 {livePreviewBlog.imageCaption}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Article Header & Body */}
                        <div className="p-6 sm:p-8 space-y-6">
                          {/* Badges */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
                              {livePreviewBlog.categoryLabel}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 font-bold">{livePreviewBlog.readTime}</span>
                            {livePreviewBlog.featured && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-gold text-royal-blue shadow-2xs">
                                ★ Featured
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h1 className="text-lg sm:text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                            {livePreviewBlog.title}
                          </h1>

                          {/* Author Card */}
                          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
                            <img
                              src={livePreviewBlog.author.avatar}
                              alt={livePreviewBlog.author.name}
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-2xs"
                            />
                            <div>
                              <p className="font-bold text-slate-800">{livePreviewBlog.author.name}</p>
                              <p className="text-[10px] text-slate-400">{livePreviewBlog.author.role}</p>
                            </div>
                            <span className="ml-auto text-[11px] text-slate-400">{livePreviewBlog.publishedDate}</span>
                          </div>

                          {/* Key Takeaways */}
                          {livePreviewBlog.content.takeaways && livePreviewBlog.content.takeaways.length > 0 && (
                            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2.5">
                              <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                                <CheckCircle2 size={14} className="text-gold" />
                                <span>Statutory Mandates & Takeaways</span>
                              </h4>
                              <div className="space-y-2">
                                {livePreviewBlog.content.takeaways.map((point, pIdx) => (
                                  <div key={pIdx} className="flex items-start gap-2 text-xs text-amber-950/90 font-medium">
                                    <span className="w-4 h-4 rounded-full bg-gold/30 text-royal-blue text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                      {pIdx + 1}
                                    </span>
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Rendered Rich HTML Body */}
                          {livePreviewBlog.content.richHtml ? (
                            <div 
                              className="text-xs sm:text-sm text-slate-700 leading-relaxed prose prose-slate max-w-none prose-headings:text-royal-blue prose-headings:font-black prose-a:text-royal-blue prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-slate-50 prose-blockquote:p-3 prose-blockquote:rounded-r-lg"
                              dangerouslySetInnerHTML={{ __html: livePreviewBlog.content.richHtml }}
                            />
                          ) : (
                            <p className="text-xs text-slate-400 italic">No body content written yet.</p>
                          )}

                          {/* Regulatory Note */}
                          {livePreviewBlog.content.regulatoryNote && (
                            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-royal-blue font-bold flex items-center gap-2">
                              <Scale size={14} className="text-gold shrink-0" />
                              <span>{livePreviewBlog.content.regulatoryNote}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom Sticky Action Footer */}
              <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Status: <strong className="uppercase text-royal-blue">{formStatus}</strong></span>
                  <span>•</span>
                  <span>Category: <strong>{CATEGORIES.find(c => c.id === formCategory)?.label}</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseEditor}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="blog_admin_form"
                    className="px-6 py-2.5 rounded-xl bg-royal-blue hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={15} className="text-gold" />
                    <span>{editingBlogId ? 'Save & Update Briefing' : 'Publish Article'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* STANDALONE ARTICLE READER MODAL (Admin View) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePreviewBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
            <div 
              className="fixed inset-0" 
              onClick={() => setActivePreviewBlog(null)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-white sticky top-0 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-royal-blue/10 text-royal-blue">
                  {activePreviewBlog.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePreviewBlog(null)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
                {activePreviewBlog.featuredImage && (
                  <div className="rounded-2xl overflow-hidden aspect-16/9 bg-slate-900 mb-4">
                    <img
                      src={activePreviewBlog.featuredImage}
                      alt={activePreviewBlog.imageAlt || activePreviewBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h1 className="text-xl sm:text-3xl font-black text-royal-blue uppercase tracking-tight">
                  {activePreviewBlog.title}
                </h1>

                <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                  <img
                    src={activePreviewBlog.author.avatar}
                    alt={activePreviewBlog.author.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <span className="font-bold text-slate-900">{activePreviewBlog.author.name}</span>
                    <span className="text-slate-400"> ({activePreviewBlog.author.role})</span>
                  </div>
                  <span className="ml-auto">{activePreviewBlog.publishedDate}</span>
                </div>

                {activePreviewBlog.content.takeaways && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                    <h4 className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-gold" />
                      <span>Statutory Mandates & Takeaways</span>
                    </h4>
                    {activePreviewBlog.content.takeaways.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-amber-900 font-medium">
                        <span className="font-black text-royal-blue">{idx + 1}.</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activePreviewBlog.content.richHtml ? (
                  <div 
                    className="text-xs sm:text-sm text-slate-700 leading-relaxed prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: activePreviewBlog.content.richHtml }}
                  />
                ) : (
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                    {activePreviewBlog.content.sections.map((s, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <h4 className="font-black text-royal-blue uppercase text-sm sm:text-base">{s.heading}</h4>
                        {s.body.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                      </div>
                    ))}
                  </div>
                )}

                {activePreviewBlog.content.regulatoryNote && (
                  <div className="p-4 rounded-xl bg-blue-50 text-royal-blue text-xs font-bold flex items-center gap-2 border border-blue-100">
                    <Scale size={15} className="text-gold" />
                    <span>{activePreviewBlog.content.regulatoryNote}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
