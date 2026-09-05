import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Link2, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext.tsx';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQSection: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isBM = language === 'BM';

  const leftFaqs: FAQItem[] = [
    {
      id: 'bizskoop-scope',
      question: isBM 
        ? 'Apakah yang dilakukan oleh Bizskoop?' 
        : 'What does Bizskoop do?',
      answer: isBM
        ? 'Bizskoop adalah konsultan korporat terkemuka di Malaysia. Kami menyediakan perkhidmatan menyeluruh merangkumi pendaftaran syarikat SSM (Sdn Bhd, LLP, Enterprise), kesetiausahaan korporat, perakaunan & pematuhan cukai LHDN, pelesenan perniagaan (PBT, CIDB, Halal, WRT), permohonan Pas Penggajian (ESD/EP), dan khidmat nasihat jual beli syarikat (M&A).'
        : 'Bizskoop is a premier full-suite corporate consultancy in Malaysia. We specialize in SSM company incorporation (Sdn Bhd, LLP, Enterprise), licensed company secretarial governance, accounting & LHDN tax compliance, local council & sector licensing (PBT, CIDB, Halal, WRT), expatriate immigration (Employment Pass, PVP), and strategic M&A business buying/selling advisory.'
    },
    {
      id: 'foreigners-setup',
      question: isBM
        ? 'Adakah anda membantu warga asing memulakan syarikat di Malaysia?'
        : 'Do you help foreigners start a company in Malaysia?',
      answer: isBM
        ? 'Ya, semestinya! Kami telah membantu usahawan dan pelabur dari lebih 40 buah negara untuk menubuhkan syarikat Sdn Bhd milik 100% asing di Malaysia. Kami menguruskan keperluan modal berbayar, pengarah residen, alamat pejabat berdaftar, akaun bank korporat, dan pendaftaran portal ESD dari awal hingga akhir.'
        : 'Yes, absolutely! We assist foreign entrepreneurs, investors, and multinationals from over 40+ countries to incorporate 100% foreign-owned Sdn Bhd companies in Malaysia. We guide you through paid-up capital requirements, resident director regulations, registered office addresses, corporate bank accounts, and ESD portal registrations from start to finish.'
    },
    {
      id: 'timeline-ssm',
      question: isBM
        ? 'Berapakah masa yang diambil untuk mendaftarkan syarikat di Malaysia?'
        : 'How long does it take to register a company in Malaysia?',
      answer: isBM
        ? 'Sebaik sahaja carian nama diluluskan oleh Suruhanjaya Syarikat Malaysia (SSM) dan dokumen disahkan, pendaftaran syarikat Sdn Bhd biasanya selesai dalam tempoh 3 hingga 5 hari bekerja.'
        : 'Once your identity documents are submitted and company name search is approved by the Companies Commission of Malaysia (SSM), standard company incorporation typically takes just 3 to 5 business days.'
    },
    {
      id: 'ep-visa',
      question: isBM
        ? 'Adakah anda menguruskan permohonan Pas Penggajian dan visa?'
        : 'Do you handle Employment Pass and visa applications?',
      answer: isBM
        ? 'Ya. Kami menguruskan perkhidmatan imigresen ekspatriat menyeluruh melalui Bahagian Perkhidmatan Ekspatriat (ESD) dan MDEC. Ini termasuk pendaftaran akaun syarikat ESD, unjuran jawatan, permohonan Pas Penggajian (Kategori I, II, & III), Pas Tanggungan, dan Pas Lawatan Ikhtisas (PVP).'
        : 'Yes. We manage end-to-end expatriate immigration services through the Expatriate Services Division (ESD) and MDEC. This includes company ESD account registration, projection submissions, Employment Pass (Category I, II, & III), Dependant Passes, and Professional Visit Passes (PVP).'
    },
    {
      id: 'licenses-approvals',
      question: isBM
        ? 'Bolehkah anda membantu dengan lesen perniagaan dan kelulusan khas?'
        : 'Can you assist with business licenses and approvals?',
      answer: isBM
        ? 'Ya. Kami membantu perniagaan mendapatkan semua lesen operasi mandatori dan kelulusan kawal selia di Malaysia, termasuk lesen Wholesale, Retail & Trade (WRT) untuk syarikat milik asing, pendaftaran kontraktor CIDB, pensijilan Halal JAKIM, lesen MOF, dan permit import/eksport.'
        : 'Yes. We help businesses acquire all mandatory statutory approvals and operational licenses across Malaysia, including Wholesale, Retail & Trade (WRT) licenses for foreign-owned firms, CIDB contractor registrations, Halal certification (JAKIM), MOF licenses, and manufacturing/import-export permits.'
    }
  ];

  const rightFaqs: FAQItem[] = [
    {
      id: 'pbt-licensing',
      question: isBM
        ? 'Adakah anda menguruskan pelesenan pihak berkuasa tempatan (PBT)?'
        : 'Do you handle local council (PBT) licensing?',
      answer: isBM
        ? 'Ya, kami menguruskan permohonan Lesen Premis dan Lesen Papan Iklan di semua pihak berkuasa tempatan termasuk DBKL (Kuala Lumpur), MBPJ (Petaling Jaya), MBSA (Shah Alam), MBSJ (Subang Jaya), MPK (Klang), dan majlis perbandaran di seluruh negeri Malaysia.'
        : 'Yes, we manage complete Premise License and Signboard License submissions across all Malaysian local authorities, including DBKL (Kuala Lumpur), MBPJ (Petaling Jaya), MBSA (Shah Alam), MBSJ (Subang Jaya), MPK (Klang), and other municipal councils throughout Selangor and across Malaysia.'
    },
    {
      id: 'accounting-tax',
      question: isBM
        ? 'Adakah anda menyediakan perkhidmatan perakaunan dan cukai?'
        : 'Do you provide accounting and tax services?',
      answer: isBM
        ? 'Ya. Pasukan perakaunan bertauliah kami menyediakan penyimpanan kira-kira bulanan/suku tahunan, pendaftaran & pelaporan SST, anggaran cukai korporat (CP204), pemfailan Borang C tahunan LHDN, pemprosesan gaji/KWSP/PERKESO/PCB, dan penyelarasan audit berkanun.'
        : 'Yes. Our certified accounting specialists provide comprehensive monthly/quarterly bookkeeping, SST registration & returns filing, corporate tax estimates (CP204), annual corporate income tax filing (Form C), payroll/EPF/SOCSO/PCB processing, and statutory audit coordination with LHDN.'
    },
    {
      id: 'buy-sell-business',
      question: isBM
        ? 'Adakah anda menawarkan perkhidmatan jual beli syarikat?'
        : 'Do you offer company buying and selling services?',
      answer: isBM
        ? 'Ya. Bizskoop menyediakan perkhidmatan Penggabungan & Pengambilan (M&A) serta broker perniagaan strategik. Kami membantu penilaian perniagaan secara sulit, pemadanan pembeli/penjual, audit ketekunan wajar (due diligence), perjanjian pindah milik saham, dan peralihan pemilikan yang lancar.'
        : 'Yes. Bizskoop provides strategic Mergers & Acquisitions (M&A) and business brokering services. We assist business owners and investors with confidential business valuations, buyer/seller matching, legal & financial due diligence, share transfer agreements, and seamless ownership transition.'
    },
    {
      id: 'fees-hidden-costs',
      question: isBM
        ? 'Adakah terdapat sebarang yuran perundingan atau kos tersembunyi?'
        : 'Is there any consultation fee or hidden cost?',
      answer: isBM
        ? 'Tiada! Kami mengamalkan ketelusan 100%. Sesi perundingan awal bersama penasihat korporat kami adalah percuma tanpa sebarang obligasi. Semua pakej perkhidmatan kami mempunyai harga tetap yang jelas tanpa sebarang caj tersembunyi.'
        : 'No! We believe in 100% transparency. Initial discovery consultations with our corporate advisory team are completely free with zero obligation. All our service packages have clear, upfront fixed pricing with no hidden charges or surprise retainers.'
    },
    {
      id: 'why-bizskoop',
      question: isBM
        ? 'Mengapa memilih Bizskoop?'
        : 'Why choose Bizskoop?',
      answer: isBM
        ? 'Bizskoop menawarkan ekosistem korporat 360° yang dikendalikan oleh setiausaha syarikat, akauntan, dan pakar imigresen bertauliah di Kuala Lumpur. Kami menjamin pemprosesan pantas, sokongan khidmat pelanggan satu-ke-satu, pematuhan undang-undang 100%, dan kadar kelulusan kawal selia sebanyak 99.8%.'
        : 'Bizskoop delivers a 360° all-in-one corporate ecosystem backed by qualified company secretaries, accountants, and immigration consultants in Kuala Lumpur. We guarantee lightning-fast turnaround times, dedicated single-point-of-contact support, 100% compliance security, and a 99.8% regulatory approval rate.'
    }
  ];

  // Auto-expand and scroll if URL hash targets a specific FAQ
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const leftIdx = leftFaqs.findIndex(item => item.id === hash);
    if (leftIdx !== -1) {
      setOpenLeft(leftIdx);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
      return;
    }

    const rightIdx = rightFaqs.findIndex(item => item.id === hash);
    if (rightIdx !== -1) {
      setOpenRight(rightIdx);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, []);

  const handleCopyLink = async (id: string, e: React.MouseEvent, column: 'left' | 'right', index: number) => {
    e.stopPropagation();
    
    // Auto-open this item if not already open
    if (column === 'left') {
      setOpenLeft(index);
    } else {
      setOpenRight(index);
    }

    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      // Update hash in browser URL without causing page reload/jump
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch (err) {
      console.error('Failed to copy direct FAQ link:', err);
    }
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-[#f4f7fb] text-slate-800 relative overflow-hidden scroll-mt-20">
      {/* Subtle geometric background accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#002244] tracking-tight"
          >
            Frequently Asked Questions (FAQ)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm text-slate-500 font-semibold mt-3 max-w-3xl mx-auto"
          >
            Everything you need to know about setting up and scaling your business in Malaysia.
          </motion.p>
        </div>

        {/* 2-Column Accordion Grid Matching the Mockup Exactly - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 xl:gap-8 w-full">
          
          {/* Left Column (5 items) */}
          <div className="space-y-3.5 sm:space-y-4">
            {leftFaqs.map((faq, index) => {
              const isOpen = openLeft === index;
              const isCopied = copiedId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`bg-white rounded-lg shadow-sm border transition-all duration-200 overflow-hidden scroll-mt-28 ${
                    isOpen ? 'border-slate-300 ring-1 ring-royal-blue/10' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div
                    onClick={() => setOpenLeft(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between text-left focus:outline-none cursor-pointer group gap-4 select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenLeft(isOpen ? null : index);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-xs sm:text-sm font-black tracking-tight leading-snug transition-colors flex-1 ${
                      isOpen ? 'text-royal-blue' : 'text-slate-900 group-hover:text-royal-blue'
                    }`}>
                      {faq.question}
                    </span>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {/* Copy Direct Link Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(faq.id, e, 'left', index)}
                        title={isCopied ? "Direct link copied!" : "Copy link to this question"}
                        aria-label="Copy direct question link"
                        className={`p-1.5 rounded-md transition-all duration-200 relative group/btn cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-300' 
                            : 'text-slate-400 hover:text-royal-blue hover:bg-slate-100'
                        }`}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale-in" />
                        ) : (
                          <Link2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                        )}

                        {/* Floating Tooltip Pill */}
                        {isCopied && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#002244] text-white text-[10px] font-bold py-0.5 px-2 rounded-md whitespace-nowrap shadow-md z-30 pointer-events-none">
                            Link Copied!
                          </span>
                        )}
                      </button>

                      {/* Expand / Collapse Chevron */}
                      <div className="p-1">
                        <ChevronDown 
                          className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-royal-blue' : 'group-hover:text-royal-blue'
                          }`} 
                          strokeWidth={2.2}
                        />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-5 pt-1 text-slate-600 text-xs sm:text-[13px] font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column (5 items) */}
          <div className="space-y-3.5 sm:space-y-4">
            {rightFaqs.map((faq, index) => {
              const isOpen = openRight === index;
              const isCopied = copiedId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`bg-white rounded-lg shadow-sm border transition-all duration-200 overflow-hidden scroll-mt-28 ${
                    isOpen ? 'border-slate-300 ring-1 ring-royal-blue/10' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div
                    onClick={() => setOpenRight(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between text-left focus:outline-none cursor-pointer group gap-4 select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenRight(isOpen ? null : index);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-xs sm:text-sm font-black tracking-tight leading-snug transition-colors flex-1 ${
                      isOpen ? 'text-royal-blue' : 'text-slate-900 group-hover:text-royal-blue'
                    }`}>
                      {faq.question}
                    </span>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {/* Copy Direct Link Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(faq.id, e, 'right', index)}
                        title={isCopied ? "Direct link copied!" : "Copy link to this question"}
                        aria-label="Copy direct question link"
                        className={`p-1.5 rounded-md transition-all duration-200 relative group/btn cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-300' 
                            : 'text-slate-400 hover:text-royal-blue hover:bg-slate-100'
                        }`}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale-in" />
                        ) : (
                          <Link2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                        )}

                        {/* Floating Tooltip Pill */}
                        {isCopied && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#002244] text-white text-[10px] font-bold py-0.5 px-2 rounded-md whitespace-nowrap shadow-md z-30 pointer-events-none">
                            Link Copied!
                          </span>
                        )}
                      </button>

                      {/* Expand / Collapse Chevron */}
                      <div className="p-1">
                        <ChevronDown 
                          className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-royal-blue' : 'group-hover:text-royal-blue'
                          }`} 
                          strokeWidth={2.2}
                        />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-5 pt-1 text-slate-600 text-xs sm:text-[13px] font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Support Help Banner beneath FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-[#002244] to-[#041a30] text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">Have More Specific Questions?</h4>
              <p className="text-xs text-blue-100/70 font-medium mt-0.5">Our qualified corporate consultants are ready to assist your specific setup.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/601124244993"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all shadow-md inline-flex items-center gap-2 uppercase tracking-wider"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 bg-gold hover:bg-yellow-400 text-navy-dark text-xs font-black rounded-xl transition-all shadow-md inline-flex items-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <span>Contact Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

