import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, Building2, DollarSign, Clock, ShieldCheck, FileText } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FAQItem[] = [
    {
      id: 'sdn-bhd',
      category: 'Registration',
      question: 'What is a Sdn Bhd company and what are the requirements to register one?',
      answer: 'A Sdn Bhd (Sendirian Berhad) is a private limited company in Malaysia. It is a separate legal entity from its owners, limiting their personal liability. The core requirements to incorporate one are:\n\n• Minimum 1 shareholder (can be foreign or local)\n• Minimum 1 director residing in Malaysia (can be a foreigner with a valid visa)\n• A physical registered office address in Malaysia\n• An appointed licensed Company Secretary (within 30 days of incorporation)',
      icon: <Building2 className="w-5 h-5 text-gold" />
    },
    {
      id: 'foreigner-ownership',
      category: 'Ownership',
      question: 'Can a foreign founder fully own 100% of a Malaysian Sdn Bhd company?',
      answer: 'Yes! In most business sectors, foreigners can own 100% of a Malaysian Sdn Bhd company without needing a local partner. However, certain regulated industries (such as education, oil and gas, agriculture, and wholesale/retail trade) may still require a percentage of local Malaysian equity or specific regulatory approvals.',
      icon: <ShieldCheck className="w-5 h-5 text-gold" />
    },
    {
      id: 'paid-up-capital',
      category: 'Capital',
      question: 'What is the minimum paid-up capital required for a Sdn Bhd?',
      answer: 'The minimum paid-up capital to register a Sdn Bhd is just RM1. However, if you plan to hire foreign talent or apply for an Employment Pass (EP) visa, the minimum paid-up capital requirements are higher:\n\n• RM500,000 for 100% local Malaysian-owned businesses\n• RM1,000,000 for 100% foreign-owned businesses\n• RM350,000 for joint ventures (with at least 30% local Malaysian shareholding)',
      icon: <DollarSign className="w-5 h-5 text-gold" />
    },
    {
      id: 'timeline',
      category: 'Registration',
      question: 'How long does it take to fully incorporate a company in Malaysia?',
      answer: 'Once all incorporation documents are digitally signed and submitted to the Companies Commission of Malaysia (SSM), approval typically takes between 3 to 5 working days. This timeline is subject to SSM portal availability and potential query responses.',
      icon: <Clock className="w-5 h-5 text-gold" />
    },
    {
      id: 'compliance',
      category: 'Compliance',
      question: 'What are the ongoing annual compliance obligations for a Sdn Bhd?',
      answer: 'Every registered Sdn Bhd in Malaysia must fulfill these annual compliance duties to maintain active status:\n\n• Prepare and file Audited Financial Statements within 6 months of the financial year-end\n• File an Annual Return with SSM within 30 days of the incorporation anniversary date\n• Lodge corporate tax estimates (CP204) and file annual corporate tax returns (Form C)\n• Retain a licensed Company Secretary to manage statutory registers',
      icon: <FileText className="w-5 h-5 text-gold" />
    },
    {
      id: 'virtual-office',
      category: 'Compliance',
      question: 'Do I need a physical office address to register a company?',
      answer: 'Yes, Malaysian law requires every company to maintain a registered office address in Malaysia where all official communications and notices can be sent. Many startups and foreign founders use virtual registered office services provided by their Company Secretary to meet this legal requirement cost-effectively.',
      icon: <HelpCircle className="w-5 h-5 text-gold" />
    }
  ];

  const categories = ['All', 'Registration', 'Ownership', 'Capital', 'Compliance'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3 block">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-dark uppercase tracking-tighter leading-none mb-5">
            Frequently Asked <br />
            <span className="text-royal-blue">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-gold/80 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Find immediate answers regarding company incorporation, foreign ownership, paid-up capital limits, and statutory compliance in Malaysia.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Input */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors pointer-events-none">
              <Search className="w-5 h-5" strokeWidth={2} />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'foreigner', 'SSM', 'capital')..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200/80 rounded-2xl outline-none font-semibold text-slate-700 transition-all text-sm shadow-sm focus:border-gold/60 focus:ring-4 focus:ring-gold/5" 
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null); // Close active accordion when category changes
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === category 
                    ? 'bg-[#051622] text-gold border border-gold/10 shadow-lg' 
                    : 'bg-white text-slate-500 hover:text-navy-dark border border-slate-200 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Grid/List */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-gold/50 shadow-md ring-4 ring-gold/5' 
                        : 'border-slate-200/80 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {/* Header/Question Trigger */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 ${
                          isOpen ? 'bg-gold/10 text-gold' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}>
                          {faq.icon}
                        </div>
                        <span className={`font-black text-sm sm:text-base tracking-tight leading-snug transition-colors duration-300 ${
                          isOpen ? 'text-navy-dark' : 'text-[#051622] group-hover:text-royal-blue'
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`ml-4 p-1 rounded-full border shrink-0 transition-all duration-300 ${
                        isOpen ? 'border-gold text-gold rotate-180 bg-gold/5' : 'border-slate-200 text-slate-400 group-hover:text-slate-600'
                      }`}>
                        <ChevronDown className="w-5 h-5 transition-transform" />
                      </div>
                    </button>

                    {/* Answer Collapsible Section */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-1 text-slate-600 text-sm sm:text-base font-semibold leading-relaxed border-t border-slate-100/80 whitespace-pre-line bg-slate-50/50">
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
                className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-black text-[#051622] uppercase tracking-tight">No Results Found</h3>
                <p className="text-slate-400 font-semibold text-sm mt-1">Try modifying your search keywords or choosing another category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
