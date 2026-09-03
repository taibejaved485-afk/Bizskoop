import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Check, 
  X, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Sliders, 
  Tag, 
  Wand2,
  ExternalLink,
  Smartphone,
  Monitor
} from 'lucide-react';

interface SeoMetaManagerProps {
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  richContent: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  onSlugChange: (slug: string) => void;
  onMetaTitleChange: (title: string) => void;
  onMetaDescriptionChange: (desc: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
}

export const SeoMetaManager: React.FC<SeoMetaManagerProps> = ({
  title,
  excerpt,
  category,
  categoryLabel,
  richContent,
  slug,
  metaTitle,
  metaDescription,
  focusKeywords,
  onSlugChange,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onKeywordsChange
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto Generate SEO metadata from content
  const handleAutoGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // 1. Generate clean Slug
      const cleanSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 70);
      onSlugChange(cleanSlug);

      // 2. Generate Meta Title (50-60 chars optimal)
      let generatedTitle = `${title.slice(0, 55)} | Bizskoop Malaysia`;
      if (generatedTitle.length > 60) {
        generatedTitle = `${title.slice(0, 42)} | Bizskoop Advisory`;
      }
      onMetaTitleChange(generatedTitle);

      // 3. Generate Meta Description (140-160 chars)
      let generatedDesc = excerpt || '';
      if (!generatedDesc || generatedDesc.length < 50) {
        generatedDesc = `Authoritative 2026 executive briefing on ${categoryLabel.toLowerCase()} in Malaysia: statutory requirements, SSM filings, compliance deadlines, and advisory blueprints.`;
      }
      if (generatedDesc.length > 155) {
        generatedDesc = generatedDesc.slice(0, 152) + '...';
      }
      onMetaDescriptionChange(generatedDesc);

      // 4. Focus Keywords
      const derivedKeywords = new Set<string>(focusKeywords);
      derivedKeywords.add(categoryLabel);
      derivedKeywords.add('Malaysia 2026');
      if (category === 'incorporation') {
        derivedKeywords.add('Sdn Bhd');
        derivedKeywords.add('SSM Registration');
        derivedKeywords.add('Foreign Ownership');
      } else if (category === 'tax') {
        derivedKeywords.add('LHDN Tax');
        derivedKeywords.add('e-Invoicing');
        derivedKeywords.add('Corporate Tax');
      } else if (category === 'visa') {
        derivedKeywords.add('ESD Employment Pass');
        derivedKeywords.add('Expat Visa');
        derivedKeywords.add('Immigration Malaysia');
      } else {
        derivedKeywords.add('Business License');
        derivedKeywords.add('WRT Permit');
        derivedKeywords.add('DBKL License');
      }

      onKeywordsChange(Array.from(derivedKeywords).slice(0, 6));
      setIsGenerating(false);
    }, 400);
  };

  const handleAddKeyword = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if ('preventDefault' in e) e.preventDefault();
    if (!keywordInput.trim()) return;

    if (!focusKeywords.includes(keywordInput.trim())) {
      onKeywordsChange([...focusKeywords, keywordInput.trim()]);
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onKeywordsChange(focusKeywords.filter(k => k !== keywordToRemove));
  };

  // SEO Quality Checks
  const titleLength = metaTitle.length;
  const descLength = metaDescription.length;

  const isTitleGood = titleLength >= 35 && titleLength <= 65;
  const isDescGood = descLength >= 120 && descLength <= 160;
  const isSlugGood = slug.length >= 5 && slug.length <= 80;
  const isKeywordsGood = focusKeywords.length >= 3;

  const totalScore = [isTitleGood, isDescGood, isSlugGood, isKeywordsGood].filter(Boolean).length * 25;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-6">
      {/* Top Header & Smart Auto-Generate Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-tight text-royal-blue flex items-center gap-2">
            <Globe size={17} className="text-gold" />
            <span>Advanced Content & SEO Management</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Search engine metadata, Google snippet simulator, focus keywords, and indexing controls.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoGenerate}
          disabled={isGenerating || !title}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-royal-blue via-blue-900 to-royal-blue hover:from-blue-900 hover:to-royal-blue text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={14} className={`text-gold ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing...' : '⚡ Auto-Generate SEO Meta'}</span>
        </button>
      </div>

      {/* Grid: Inputs and Google SERP Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {/* SEO Meta Title */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-bold text-slate-700">
                SEO Meta Title (Title Tag)
              </label>
              <span className={`text-[10px] font-bold ${isTitleGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                {titleLength}/60 chars ({isTitleGood ? 'Optimal' : titleLength < 35 ? 'Too short' : 'Too long'})
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => onMetaTitleChange(e.target.value)}
              placeholder="e.g., 100% Foreign Owned Sdn Bhd Incorporation Guide Malaysia 2026 | Bizskoop"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
            />
          </div>

          {/* Canonical URL Slug */}
          <div>
            <label className="font-bold text-slate-700 block text-xs mb-1">
              Canonical URL Permalink / Slug
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-royal-blue">
              <span className="px-3 text-xs text-slate-400 font-mono select-none">
                bizskoop.my/insights/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                placeholder="foreign-ownership-guide-malaysia-2026"
                className="flex-1 py-2.5 pr-3 bg-white text-xs font-mono font-medium focus:outline-hidden"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-bold text-slate-700">
                Search Meta Description (Snippet)
              </label>
              <span className={`text-[10px] font-bold ${isDescGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                {descLength}/155 chars ({isDescGood ? 'Optimal' : descLength < 120 ? 'Too short' : 'Too long'})
              </span>
            </div>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              placeholder="Provide a concise 140-155 character overview with target search keywords for maximum Google click-through rate..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden resize-none"
            />
          </div>

          {/* Focus Keywords */}
          <div>
            <label className="font-bold text-slate-700 block text-xs mb-1.5">
              Focus Search Keywords / Entities ({focusKeywords.length} added)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleAddKeyword}
                placeholder="Add focus keyword and press Enter (e.g. 'Companies Act 2016')"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Add Tag
              </button>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5">
              {focusKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal-blue/10 text-royal-blue text-[11px] font-bold border border-royal-blue/20"
                >
                  <Tag size={10} className="text-gold" />
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="text-slate-400 hover:text-red-600 p-0.5 rounded transition-colors"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Live Google SERP Simulator & Score Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* SEO Score Meter */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                SEO Audit Score
              </span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                totalScore >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {totalScore}/100 {totalScore >= 75 ? '• Ready for Indexing' : '• Needs Polish'}
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                {isTitleGood ? <CheckCircle2 size={13} className="text-emerald-600" /> : <AlertCircle size={13} className="text-amber-500" />}
                <span className={isTitleGood ? 'text-slate-700 font-medium' : 'text-amber-700 font-medium'}>
                  Meta Title Length (35-65 chars)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isDescGood ? <CheckCircle2 size={13} className="text-emerald-600" /> : <AlertCircle size={13} className="text-amber-500" />}
                <span className={isDescGood ? 'text-slate-700 font-medium' : 'text-amber-700 font-medium'}>
                  Meta Description (120-160 chars)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isSlugGood ? <CheckCircle2 size={13} className="text-emerald-600" /> : <AlertCircle size={13} className="text-amber-500" />}
                <span className={isSlugGood ? 'text-slate-700 font-medium' : 'text-amber-700 font-medium'}>
                  SEO Friendly URL Slug
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isKeywordsGood ? <CheckCircle2 size={13} className="text-emerald-600" /> : <AlertCircle size={13} className="text-amber-500" />}
                <span className={isKeywordsGood ? 'text-slate-700 font-medium' : 'text-amber-700 font-medium'}>
                  Focus Keywords (Minimum 3 tags)
                </span>
              </div>
            </div>
          </div>

          {/* Google SERP Card Preview */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Search size={11} className="text-slate-400" />
                <span>Google SERP Preview</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSerpDevice('desktop')}
                  className={`p-1 rounded ${serpDevice === 'desktop' ? 'bg-white text-royal-blue shadow-2xs' : 'text-slate-500'}`}
                  title="Desktop Preview"
                >
                  <Monitor size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice('mobile')}
                  className={`p-1 rounded ${serpDevice === 'mobile' ? 'bg-white text-royal-blue shadow-2xs' : 'text-slate-500'}`}
                  title="Mobile Preview"
                >
                  <Smartphone size={12} />
                </button>
              </div>
            </div>

            {/* Visual Google Result Snippet */}
            <div className={`space-y-1 ${serpDevice === 'mobile' ? 'max-w-[320px] mx-auto p-2 bg-slate-50 rounded-xl border border-slate-200' : ''}`}>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                <span className="w-4 h-4 rounded-full bg-royal-blue text-white text-[8px] font-black flex items-center justify-center shrink-0">
                  B
                </span>
                <span className="font-medium text-slate-800">Bizskoop Malaysia</span>
                <span className="text-slate-400">› insights › {slug || 'article-slug'}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                {metaTitle || title || 'Title of the Corporate Advisory Briefing'}
              </h4>
              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                {metaDescription || excerpt || 'Detailed statutory briefing on Malaysian company formation, tax brackets, and regulatory compliance.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
