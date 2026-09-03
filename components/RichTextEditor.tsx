import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link2, 
  Unlink, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Code, 
  Table as TableIcon, 
  Undo, 
  Redo, 
  Eye, 
  Code2, 
  Sparkles, 
  Check, 
  X, 
  ExternalLink,
  Plus,
  FileCode,
  Layers,
  HelpCircle
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write detailed advisory briefing, statutory breakdown, or regulatory analysis here...',
  minHeight = '320px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkNewTab, setLinkNewTab] = useState(true);
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [showTableMenu, setShowTableMenu] = useState(false);

  // Sync internal editor content when external value changes
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setRawHtml(value || '');
  }, [value, isSourceMode]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setRawHtml(html);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleHeading = (tag: 'h1' | 'h2' | 'h3' | 'p') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand('formatBlock', false, `<${tag}>`);
    handleInput();
  };

  const openLinkModal = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange());
      setLinkText(selection.toString());
    } else {
      setSavedSelection(null);
      setLinkText('');
    }
    setLinkUrl('https://');
    setShowLinkModal(true);
  };

  const insertLink = () => {
    if (!linkUrl || linkUrl === 'https://') {
      setShowLinkModal(false);
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
    }

    if (savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
      }
    }

    const text = linkText.trim() || linkUrl;
    const targetAttr = linkNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const anchorHtml = `<a href="${linkUrl}"${targetAttr} class="text-royal-blue font-bold underline hover:text-gold transition-colors">${text}</a>`;
    
    document.execCommand('insertHTML', false, anchorHtml);
    setShowLinkModal(false);
    handleInput();
  };

  const removeLink = () => {
    executeCommand('unlink');
  };

  const insertCodeBlock = () => {
    const codeSample = `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono my-4 overflow-x-auto border border-slate-800"><code>// Statutory Tax Calculation Example\nchargeable_income = 500000;\nsme_rate_first_150k = 0.15;\nsme_rate_balance = 0.17;\ntotal_tax = (150000 * sme_rate_first_150k) + ((chargeable_income - 150000) * sme_rate_balance);</code></pre><p><br></p>`;
    executeCommand('insertHTML', codeSample);
  };

  const insertStatutoryTable = (type: 'tax' | 'capital' | 'timeline') => {
    let tableHtml = '';
    if (type === 'tax') {
      tableHtml = `
<div class="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
  <table class="w-full text-left text-xs border-collapse">
    <thead>
      <tr class="bg-royal-blue text-white font-black uppercase text-[11px] tracking-wider">
        <th class="p-3 border-b border-royal-blue/30">Chargeable Income Tier</th>
        <th class="p-3 border-b border-royal-blue/30">SME Preferential Rate</th>
        <th class="p-3 border-b border-royal-blue/30">Non-SME / Foreign Headline</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white font-medium text-slate-700">
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">First RM 150,000</td>
        <td class="p-3 text-emerald-700 font-bold">15%</td>
        <td class="p-3 text-slate-600">24%</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">RM 150,001 to RM 600,000</td>
        <td class="p-3 text-emerald-700 font-bold">17%</td>
        <td class="p-3 text-slate-600">24%</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">Above RM 600,000</td>
        <td class="p-3 text-royal-blue font-bold">24%</td>
        <td class="p-3 text-slate-600">24%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><br></p>`;
    } else if (type === 'capital') {
      tableHtml = `
<div class="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
  <table class="w-full text-left text-xs border-collapse">
    <thead>
      <tr class="bg-slate-900 text-white font-black uppercase text-[11px] tracking-wider">
        <th class="p-3 border-b border-slate-700">Entity Structure</th>
        <th class="p-3 border-b border-slate-700">Minimum Paid-Up Capital</th>
        <th class="p-3 border-b border-slate-700">Key Regulatory Approvals</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white font-medium text-slate-700">
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">100% Foreign Owned Sdn Bhd</td>
        <td class="p-3 font-bold text-amber-700">RM 1,000,000 (for EP Sponsor)</td>
        <td class="p-3 text-slate-600">SSM MyCoID, ESD Projection Quota</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">Joint Venture (51% Local + 49% Foreign)</td>
        <td class="p-3 font-bold text-emerald-700">RM 350,000 to RM 500,000</td>
        <td class="p-3 text-slate-600">Standard Municipal & ESD clearance</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-900">100% Malaysian Owned</td>
        <td class="p-3 font-bold text-royal-blue">RM 1 (Statutory Nominal)</td>
        <td class="p-3 text-slate-600">Standard SSM Registration</td>
      </tr>
    </tbody>
  </table>
</div>
<p><br></p>`;
    } else {
      tableHtml = `
<div class="my-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2">
  <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-900">
    <span>⚠️ Statutory Compliance Advisory</span>
  </div>
  <p class="text-xs text-amber-900/90 leading-relaxed font-medium">
    Note: All company directors must register for a Digital Signature Certificate (DSC) and maintain at least one resident director in Malaysia under Companies Act 2016 Section 196(4).
  </p>
</div>
<p><br></p>`;
    }

    executeCommand('insertHTML', tableHtml);
    setShowTableMenu(false);
  };

  // Calculate statistics
  const wordCount = (rawHtml.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
  const charCount = rawHtml.replace(/<[^>]+>/g, '').length;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col">
      {/* Editor Toolbar Header */}
      <div className="bg-slate-50 p-2 sm:p-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting Buttons Group */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => handleHeading('p')}
              className="px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Normal Paragraph"
            >
              P
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h1')}
              className="p-1 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Heading 1"
            >
              <Heading1 size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h2')}
              className="p-1 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Heading 2"
            >
              <Heading2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h3')}
              className="p-1 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Heading 3"
            >
              <Heading3 size={15} />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5" />

          {/* Inline Styles */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => executeCommand('bold')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Bold (Ctrl+B)"
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('italic')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Italic (Ctrl+I)"
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('underline')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Underline (Ctrl+U)"
            >
              <Underline size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('strikeThrough')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Strikethrough"
            >
              <Strikethrough size={14} />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5" />

          {/* Lists & Quote */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => executeCommand('insertUnorderedList')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Bulleted List"
            >
              <List size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('insertOrderedList')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('formatBlock', '<blockquote>')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Blockquote"
            >
              <Quote size={14} />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5" />

          {/* Text Alignment */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => executeCommand('justifyLeft')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('justifyCenter')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('justifyRight')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('justifyFull')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Justify"
            >
              <AlignJustify size={14} />
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5" />

          {/* Links & Rich Objects */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs relative">
            <button
              type="button"
              onClick={openLinkModal}
              className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-royal-blue rounded transition-colors"
              title="Insert Hyperlink"
            >
              <Link2 size={14} />
            </button>
            <button
              type="button"
              onClick={removeLink}
              className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-red-600 rounded transition-colors"
              title="Remove Hyperlink"
            >
              <Unlink size={14} />
            </button>
            <button
              type="button"
              onClick={insertCodeBlock}
              className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-royal-blue rounded transition-colors"
              title="Insert Code Block / Tax Formula"
            >
              <Code size={14} />
            </button>

            {/* Table Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTableMenu(!showTableMenu)}
                className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-royal-blue rounded transition-colors flex items-center gap-1"
                title="Insert Statutory Tables & Callouts"
              >
                <TableIcon size={14} />
                <span className="text-[10px] font-bold text-royal-blue hidden sm:inline">Insert Table</span>
              </button>

              {showTableMenu && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30 space-y-1">
                  <div className="text-[10px] font-black uppercase text-slate-400 px-2 py-1 tracking-wider">
                    Statutory Presets
                  </div>
                  <button
                    type="button"
                    onClick={() => insertStatutoryTable('tax')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between"
                  >
                    <span>📊 Tax Bracket Rate Table</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">LHDN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertStatutoryTable('capital')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between"
                  >
                    <span>💼 Capital Sizing Comparison</span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold">SSM / ESD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertStatutoryTable('timeline')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between"
                  >
                    <span>⚠️ Warning / Advisory Callout</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">Alert</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 mx-0.5" />

          {/* Undo / Redo */}
          <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => executeCommand('undo')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo size={14} />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('redo')}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo size={14} />
            </button>
          </div>
        </div>

        {/* Right Action: Source Code Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (isSourceMode) {
                onChange(rawHtml);
              }
              setIsSourceMode(!isSourceMode);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isSourceMode 
                ? 'bg-royal-blue text-white border-royal-blue shadow-xs' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle HTML Source Code View"
          >
            <Code2 size={13} />
            <span>{isSourceMode ? 'Visual Editor' : 'HTML Source'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative flex-1 p-4 bg-white min-h-[300px]">
        {isSourceMode ? (
          <textarea
            value={rawHtml}
            onChange={(e) => {
              setRawHtml(e.target.value);
              onChange(e.target.value);
            }}
            style={{ minHeight }}
            className="w-full h-full font-mono text-xs text-slate-800 p-3 bg-slate-900 text-slate-100 rounded-xl border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-royal-blue"
            placeholder="Edit raw HTML content here..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            style={{ minHeight }}
            className="w-full text-slate-800 text-sm leading-relaxed focus:outline-hidden prose prose-slate max-w-none prose-headings:font-black prose-headings:text-royal-blue prose-headings:tracking-tight prose-a:text-royal-blue prose-a:underline prose-p:my-2 prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-slate-50 prose-blockquote:p-3 prose-blockquote:rounded-r-lg prose-blockquote:italic"
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Editor Bottom Status Bar */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-slate-800">{wordCount}</strong></span>
          <span>Characters: <strong className="text-slate-800">{charCount}</strong></span>
          <span className="hidden sm:inline">Est. Reading Time: <strong className="text-royal-blue">{Math.max(1, Math.ceil(wordCount / 200))} min</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <span>Rich Text Active</span>
          <span>•</span>
          <span>HTML5 Compliant</span>
        </div>
      </div>

      {/* Hyperlink Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black uppercase tracking-tight text-royal-blue flex items-center gap-1.5">
                <Link2 size={16} className="text-gold" />
                <span>Insert Hyperlink</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Display Text (Optional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g., Read Official SSM Guidelines"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL / Web Address</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-royal-blue focus:outline-hidden"
                  autoFocus
                />
              </div>

              {/* Quick Preset Regulatory Portals */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Quick Regulatory Portal Links:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://mycoid2016.ssm.com.my');
                      if (!linkText) setLinkText('SSM MyCoID 2016 Portal');
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-gold/20 text-slate-700 text-[10px] font-bold transition-colors"
                  >
                    SSM MyCoID
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://mytax.hasil.gov.my');
                      if (!linkText) setLinkText('LHDN MyTax / MyInvois Portal');
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-gold/20 text-slate-700 text-[10px] font-bold transition-colors"
                  >
                    LHDN MyInvois
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://esd.imi.gov.my');
                      if (!linkText) setLinkText('ESD Expatriate Services Division');
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-gold/20 text-slate-700 text-[10px] font-bold transition-colors"
                  >
                    ESD Immigration
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkUrl('https://mdec.my/malaysiadigital');
                      if (!linkText) setLinkText('MDEC Malaysia Digital');
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-gold/20 text-slate-700 text-[10px] font-bold transition-colors"
                  >
                    MDEC Digital
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="target_blank_chk"
                  checked={linkNewTab}
                  onChange={(e) => setLinkNewTab(e.target.checked)}
                  className="rounded text-royal-blue focus:ring-royal-blue"
                />
                <label htmlFor="target_blank_chk" className="text-slate-700 font-medium cursor-pointer">
                  Open link in a new tab (<code className="text-slate-500 font-mono">target="_blank"</code>)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-1.5 rounded-xl bg-royal-blue text-white hover:bg-blue-900 text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Check size={13} />
                <span>Apply Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
