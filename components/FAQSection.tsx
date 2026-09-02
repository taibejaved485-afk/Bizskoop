import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, Building2, DollarSign, Clock, ShieldCheck, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext.tsx';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FAQSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const isBM = language === 'BM';

  const faqs: FAQItem[] = [
    {
      id: 'sdn-bhd',
      category: isBM ? 'Pendaftaran' : 'Registration',
      question: isBM 
        ? 'Apakah syarikat Sdn Bhd dan apakah syarat untuk mendaftarkannya?' 
        : 'What is a Sdn Bhd company and what are the requirements to register one?',
      answer: isBM
        ? 'Sdn Bhd (Sendirian Berhad) adalah syarikat sendirian berhad di Malaysia. Ia merupakan entiti undang-undang yang berasingan daripada pemiliknya, mengehadkan liabiliti peribadi mereka. Syarat utama untuk menubuhkannya adalah:\n\n• Minimum 1 pemegang saham (boleh jadi warganegara asing atau tempatan)\n• Minimum 1 pengarah yang menetap di Malaysia (boleh jadi warga asing dengan visa sah)\n• Alamat pejabat berdaftar fizikal di Malaysia\n• Setiausaha Syarikat berlesen yang dilantik (dalam tempoh 30 hari dari penubuhan)'
        : 'A Sdn Bhd (Sendirian Berhad) is a private limited company in Malaysia. It is a separate legal entity from its owners, limiting their personal liability. The core requirements to incorporate one are:\n\n• Minimum 1 shareholder (can be foreign or local)\n• Minimum 1 director residing in Malaysia (can be a foreigner with a valid visa)\n• A physical registered office address in Malaysia\n• An appointed licensed Company Secretary (within 30 days of incorporation)',
      icon: <Building2 className="w-5 h-5 text-gold" />
    },
    {
      id: 'foreigner-ownership',
      category: isBM ? 'Pemilikan' : 'Ownership',
      question: isBM
        ? 'Bolehkah pengasas asing memiliki 100% pegangan saham syarikat Sdn Bhd di Malaysia?'
        : 'Can a foreign founder fully own 100% of a Malaysian Sdn Bhd company?',
      answer: isBM
        ? 'Ya! Bagi kebanyakan sektor perniagaan, warga asing boleh memiliki 100% syarikat Sdn Bhd di Malaysia tanpa memerlukan rakan kongsi tempatan. Walau bagaimanapun, industri terkawal tertentu (seperti pendidikan, minyak dan gas, pertanian, serta perdagangan borong/runcit) mungkin masih memerlukan peratusan ekuiti tempatan Malaysia atau kelulusan kawal selia tertentu.'
        : 'Yes! In most business sectors, foreigners can own 100% of a Malaysian Sdn Bhd company without needing a local partner. However, certain regulated industries (such as education, oil and gas, agriculture, and wholesale/retail trade) may still require a percentage of local Malaysian equity or specific regulatory approvals.',
      icon: <ShieldCheck className="w-5 h-5 text-gold" />
    },
    {
      id: 'paid-up-capital',
      category: isBM ? 'Modal' : 'Capital',
      question: isBM
        ? 'Apakah modal berbayar minimum yang diperlukan untuk Sdn Bhd?'
        : 'What is the minimum paid-up capital required for a Sdn Bhd?',
      answer: isBM
        ? 'Modal berbayar minimum untuk mendaftarkan Sdn Bhd adalah hanya RM1. Walau bagaimanapun, jika anda merancang untuk mengambil pekerja asing atau memohon visa Pas Penggajian (EP), keperluan modal berbayar minimum adalah lebih tinggi:\n\n• RM500,000 untuk perniagaan milik penuh tempatan Malaysia\n• RM1,000,000 untuk perniagaan milik penuh asing\n• RM350,000 untuk usaha sama (dengan sekurang-kurangnya 30% pegangan saham tempatan Malaysia)'
        : 'The minimum paid-up capital to register a Sdn Bhd is just RM1. However, if you plan to hire foreign talent or apply for an Employment Pass (EP) visa, the minimum paid-up capital requirements are higher:\n\n• RM500,000 for 100% local Malaysian-owned businesses\n• RM1,000,000 for 100% foreign-owned businesses\n• RM350,000 for joint ventures (with at least 30% local Malaysian shareholding)',
      icon: <DollarSign className="w-5 h-5 text-gold" />
    },
    {
      id: 'timeline',
      category: isBM ? 'Pendaftaran' : 'Registration',
      question: isBM
        ? 'Berapakah masa yang diambil untuk menubuhkan syarikat sepenuhnya di Malaysia?'
        : 'How long does it take to fully incorporate a company in Malaysia?',
      answer: isBM
        ? 'Sebaik sahaja semua dokumen penubuhan ditandatangani secara digital dan diserahkan kepada Suruhanjaya Syarikat Malaysia (SSM), kelulusan biasanya mengambil masa antara 3 hingga 5 hari bekerja. Garis masa ini tertakluk kepada ketersediaan portal SSM dan pertanyaan pertanyaan berpotensi.'
        : 'Once all incorporation documents are digitally signed and submitted to the Companies Commission of Malaysia (SSM), approval typically takes between 3 to 5 working days. This timeline is subject to SSM portal availability and potential query responses.',
      icon: <Clock className="w-5 h-5 text-gold" />
    },
    {
      id: 'compliance',
      category: isBM ? 'Pematuhan' : 'Compliance',
      question: isBM
        ? 'Apakah tanggungjawab pematuhan tahunan yang berterusan untuk syarikat Sdn Bhd?'
        : 'What are the ongoing annual compliance obligations for a Sdn Bhd?',
      answer: isBM
        ? 'Setiap Sdn Bhd yang berdaftar di Malaysia mesti memenuhi tanggungjawab pematuhan tahunan ini untuk mengekalkan status aktif:\n\n• Sediakan dan failkan Penyata Kewangan Diaudit dalam tempoh 6 bulan dari akhir tahun kewangan\n• Failkan Penyata Tahunan dengan SSM dalam tempoh 30 hari dari tarikh ulang tahun penubuhan\n• Hantar anggaran cukai korporat (CP204) dan failkan borang cukai korporat tahunan (Borang C)\n• Melantik Setiausaha Syarikat berlesen untuk menguruskan daftar berkanun'
        : 'Every registered Sdn Bhd in Malaysia must fulfill these annual compliance duties to maintain active status:\n\n• Prepare and file Audited Financial Statements within 6 months of the financial year-end\n• File an Annual Return with SSM within 30 days of the incorporation anniversary date\n• Lodge corporate tax estimates (CP204) and file annual corporate tax returns (Form C)\n• Retain a licensed Company Secretary to manage statutory registers',
      icon: <FileText className="w-5 h-5 text-gold" />
    },
    {
      id: 'virtual-office',
      category: isBM ? 'Pematuhan' : 'Compliance',
      question: isBM
        ? 'Adakah saya memerlukan alamat pejabat fizikal untuk mendaftarkan syarikat?'
        : 'Do I need a physical office address to register a company?',
      answer: isBM
        ? 'Ya, undang-undang Malaysia menetapkan bahawa setiap syarikat mesti mengekalkan alamat pejabat berdaftar di Malaysia di mana semua komunikasi rasmi boleh dihantar. Ramai pengasas asing menggunakan perkhidmatan pejabat maya berdaftar yang disediakan oleh Setiausaha Syarikat mereka untuk memenuhi keperluan undang-undang ini secara jimat.'
        : 'Yes, Malaysian law requires every company to maintain a registered office address in Malaysia where all official communications and notices can be sent. Many startups and foreign founders use virtual registered office services provided by their Company Secretary to meet this legal requirement cost-effectively.',
      icon: <HelpCircle className="w-5 h-5 text-gold" />
    }
  ];

  const categories = isBM 
    ? ['Semua', 'Pendaftaran', 'Pemilikan', 'Modal', 'Pematuhan']
    : ['All', 'Registration', 'Ownership', 'Capital', 'Compliance'];

  // Map user selected category back to corresponding key
  const getCategoryKey = (cat: string) => {
    if (cat === 'Semua' || cat === 'All') return 'All';
    if (cat === 'Pendaftaran' || cat === 'Registration') return 'Registration';
    if (cat === 'Pemilikan' || cat === 'Ownership') return 'Ownership';
    if (cat === 'Modal' || cat === 'Capital') return 'Capital';
    if (cat === 'Pematuhan' || cat === 'Compliance') return 'Compliance';
    return cat;
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const catKey = getCategoryKey(selectedCategory);
    const faqCatKey = getCategoryKey(faq.category);
    const matchesCategory = catKey === 'All' || faqCatKey === catKey;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 bg-[#040e18] text-white border-t border-b border-white/5 relative overflow-hidden">
      {/* Interactive Cyberpunk Atmospheric Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-royal-blue/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Grid Mesh lines for premium structure look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        
        {/* Sleek Layout Split: Left Brand Column / Right Accordion Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky Title & Control Hub) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-6 w-full">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="text-gold font-black text-[9px] uppercase tracking-[0.25em]">
                  {t('faq_eyebrow')}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                {t('faq_title_1')}<br />
                <span className="bg-gradient-to-r from-gold via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  {t('faq_title_2')}
                </span>
              </h2>
              
              <p className="text-slate-400 font-semibold text-xs sm:text-sm leading-relaxed max-w-md pt-1">
                {t('faq_subtitle')}
              </p>
            </div>

            {/* Quick Consultation Portal Card */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-lg group-hover:bg-gold/10 transition-colors duration-500" />
              <h4 className="text-xs font-black uppercase tracking-wider text-gold mb-1.5">Need a Custom Setup?</h4>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-3">
                Ask our specialized AI Corporate Advisor in real-time or get instant help with SSM guidelines.
              </p>
              <a 
                href="#ai-tool" 
                className="inline-flex items-center gap-1.5 text-[11px] font-black text-white hover:text-gold transition-colors"
              >
                <span>Launch Advisor Engine</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column (Accordion List & Quick Filters) */}
          <div className="lg:col-span-6 space-y-6 w-full">
            
            {/* Search and Filters inside Right Box */}
            <div className="space-y-4 p-4 bg-white/[0.02] border border-white/15 rounded-2xl backdrop-blur-md">
              
              {/* Modern Search */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors pointer-events-none">
                  <Search className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder={t('faq_search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-gold/60 rounded-xl outline-none font-semibold text-white transition-all text-xs placeholder:text-slate-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.06)]" 
                />
              </div>

              {/* High Contrast Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      selectedCategory === category 
                        ? 'bg-gold text-[#040e18] shadow-[0_8px_20px_-5px_rgba(212,175,55,0.25)] font-black' 
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Accordion Feed */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = activeIndex === index;
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        whileHover={!isOpen ? { y: -1, scale: 1.002 } : {}}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        key={faq.id}
                        className={`bg-white/[0.02] rounded-xl border transition-all duration-300 overflow-hidden ${
                          isOpen 
                            ? 'border-gold/60 shadow-[0_15px_30px_-15px_rgba(212,175,55,0.12)] bg-gradient-to-b from-white/[0.05] to-white/[0.01]' 
                            : 'border-white/5 hover:border-gold/30 hover:bg-white/[0.03] hover:shadow-[0_8px_20px_-10px_rgba(255,255,255,0.04)]'
                        }`}
                      >
                        {/* Interactive Header */}
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2.5 rounded-lg shrink-0 transition-all duration-300 ${
                              isOpen ? 'bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'bg-white/5 text-slate-400 group-hover:bg-gold/10 group-hover:text-gold'
                            }`}>
                              {faq.icon}
                            </div>
                            <span className={`font-black text-xs sm:text-sm tracking-tight leading-snug transition-colors duration-300 ${
                              isOpen ? 'text-gold' : 'text-slate-200 group-hover:text-white'
                            }`}>
                              {faq.question}
                            </span>
                          </div>
                          
                          <div className={`ml-4 p-1.5 rounded-full border shrink-0 transition-all duration-300 ${
                            isOpen ? 'border-gold text-[#040e18] bg-gold rotate-180' : 'border-white/10 text-slate-500 group-hover:text-gold group-hover:border-gold/50'
                          }`}>
                            <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                          </div>
                        </button>

                        {/* Answer Block */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-5 pb-5 sm:px-6 sm:pb-5 pt-1.5 text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed border-t border-white/5 whitespace-pre-line bg-white/[0.01]">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    layout
                    className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/5 shadow-2xl"
                  >
                    <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3 animate-bounce" />
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{t('faq_no_results')}</h3>
                    <p className="text-slate-400 font-semibold text-[11px] sm:text-xs mt-1">{t('faq_no_results_sub')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
