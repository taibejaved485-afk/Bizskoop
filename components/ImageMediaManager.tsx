import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  ExternalLink,
  Crop,
  Layers,
  FileImage,
  Sliders,
  Maximize2
} from 'lucide-react';
import { STOCK_PHOTOS, StockPhoto } from '../services/stockImages.ts';

interface ImageMediaManagerProps {
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  onImageChange: (url: string, alt?: string, caption?: string) => void;
  onAltChange: (alt: string) => void;
  onCaptionChange: (caption: string) => void;
}

export const ImageMediaManager: React.FC<ImageMediaManagerProps> = ({
  imageUrl,
  imageAlt,
  imageCaption,
  onImageChange,
  onAltChange,
  onCaptionChange
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'stock' | 'url'>('upload');
  const [stockCategory, setStockCategory] = useState<string>('all');
  const [stockSearch, setStockSearch] = useState('');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '21:9'>('16:9');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      onImageChange(
        dataUrl,
        imageAlt || cleanFileName,
        imageCaption || `Featured illustration: ${cleanFileName}`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    onImageChange(customUrlInput.trim(), imageAlt || 'Corporate Advisory Featured Banner', imageCaption || '');
    setCustomUrlInput('');
  };

  const filteredStock = STOCK_PHOTOS.filter(photo => {
    const matchesCategory = stockCategory === 'all' || photo.category === stockCategory;
    const matchesSearch = !stockSearch || 
      photo.title.toLowerCase().includes(stockSearch.toLowerCase()) || 
      photo.alt.toLowerCase().includes(stockSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '4:3': return 'aspect-4/3';
      case '21:9': return 'aspect-21/9';
      case '16:9':
      default: return 'aspect-16/9';
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-tight text-royal-blue flex items-center gap-2">
            <ImageIcon size={17} className="text-gold" />
            <span>Featured Image & Media Management</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Upload local files, choose curated high-res corporate stock photos, or provide direct URL.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'upload' 
                ? 'bg-white text-royal-blue shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stock')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'stock' 
                ? 'bg-white text-royal-blue shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={12} className="text-gold" />
            <span>Stock Photos</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'url' 
                ? 'bg-white text-royal-blue shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {/* Main Preview & Dropzone Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Live Image Preview / Current Image */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black uppercase tracking-wider text-slate-500 text-[10px]">
              Active Image Preview
            </span>
            {imageUrl && (
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${aspectRatio === '16:9' ? 'bg-royal-blue text-white' : 'text-slate-600'}`}
                >
                  16:9
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('4:3')}
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${aspectRatio === '4:3' ? 'bg-royal-blue text-white' : 'text-slate-600'}`}
                >
                  4:3
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('21:9')}
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${aspectRatio === '21:9' ? 'bg-royal-blue text-white' : 'text-slate-600'}`}
                >
                  21:9
                </button>
              </div>
            )}
          </div>

          <div className={`relative w-full rounded-2xl overflow-hidden border-2 border-dashed ${imageUrl ? 'border-slate-300 bg-slate-900' : 'border-slate-300 bg-slate-50'} ${getAspectClass()} flex items-center justify-center transition-all group`}>
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={imageAlt || 'Featured article banner'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 rounded-xl bg-white/90 hover:bg-white text-royal-blue text-xs font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-1 cursor-pointer"
                      title="Replace Image"
                    >
                      <RefreshCw size={13} />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onImageChange('', '', '')}
                      className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-1 cursor-pointer"
                      title="Remove Image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="text-white text-xs">
                    <p className="font-bold truncate">{imageAlt || 'Featured Image'}</p>
                    {imageCaption && <p className="text-[10px] text-slate-300 truncate">{imageCaption}</p>}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-200/80 text-slate-500 flex items-center justify-center">
                  <FileImage size={24} />
                </div>
                <div className="text-xs font-bold text-slate-600">No Image Uploaded</div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Upload an image from your device, select from stock photos, or enter a URL.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Tabbed Upload / Stock / URL Controls */}
        <div className="lg:col-span-7 space-y-4">
          {/* TAB 1: File Upload Dropzone */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-royal-blue bg-blue-50/50 scale-[0.99]' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-royal-blue/10 text-royal-blue flex items-center justify-center mb-3">
                  <UploadCloud size={24} className="text-royal-blue" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-royal-blue mb-1">
                  Drag & Drop Image Here or Browse Files
                </h4>
                <p className="text-[11px] text-slate-500">
                  Supports PNG, JPG, WebP, SVG (Max 5MB recommended).
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-bold shadow-xs hover:bg-blue-900 transition-colors">
                    <UploadCloud size={14} />
                    <span>Choose Local Image</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Curated Corporate Stock Photos */}
          {activeTab === 'stock' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={stockSearch}
                    onChange={(e) => setStockSearch(e.target.value)}
                    placeholder="Search stock photos (e.g. KLCC, tax, boardroom, visa)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                  />
                </div>
                <select
                  value={stockCategory}
                  onChange={(e) => setStockCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                >
                  <option value="all">All Themes</option>
                  <option value="architecture">KL Skyline & Architecture</option>
                  <option value="corporate">Executive Boardroom</option>
                  <option value="tax">Tax & e-Invoicing</option>
                  <option value="legal">Statutory Law & SSM</option>
                  <option value="visa">Visas & Immigration</option>
                  <option value="tech">Tech & MDEC</option>
                  <option value="retail">Retail & Premise</option>
                </select>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto p-1">
                {filteredStock.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => onImageChange(photo.url, photo.alt, photo.caption)}
                    className={`relative rounded-xl overflow-hidden border text-left group transition-all cursor-pointer ${
                      imageUrl === photo.url 
                        ? 'ring-2 ring-gold border-gold scale-[0.98]' 
                        : 'border-slate-200 hover:border-royal-blue'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-1.5 bg-white">
                      <p className="text-[10px] font-bold text-slate-800 truncate">{photo.title}</p>
                      <span className="text-[9px] text-slate-400 block truncate">{photo.categoryLabel}</span>
                    </div>
                    {imageUrl === photo.url && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gold text-royal-blue flex items-center justify-center shadow-md">
                        <Check size={12} className="stroke-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Direct URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block">
                Direct Image Web URL (HTTPS)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-4 py-2 rounded-xl bg-royal-blue text-white text-xs font-bold hover:bg-blue-900 transition-colors shadow-2xs"
                >
                  Apply
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                You can paste image URLs from Unsplash, Pexels, Google Cloud Storage, or your corporate CDN.
              </p>
            </div>
          )}

          {/* Accessibility & SEO Meta: Alt Text & Caption */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between mb-1">
                <span>Image Alt Text (SEO & Accessibility)</span>
                <span className="text-[10px] text-slate-400">{imageAlt.length}/100</span>
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => onAltChange(e.target.value)}
                placeholder="e.g., Kuala Lumpur financial skyline and corporate office towers"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between mb-1">
                <span>Image Caption (Displayed Below Photo)</span>
                <span className="text-[10px] text-slate-400">{imageCaption.length}/140</span>
              </label>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => onCaptionChange(e.target.value)}
                placeholder="e.g., Strategic headquarters location for 100% foreign-owned entities in Malaysia."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
