import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'BM';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav_home': 'Home',
    'nav_services': 'Services',
    'nav_about': 'About Us',
    'nav_faq': 'FAQ',
    'nav_contact': 'Contact Us',
    'nav_ai_consultant': 'AI Consultant',
    'nav_admin': 'Admin Portal',
    'nav_professional_launchpad': 'Professional Business Launchpad',

    // Hero
    'hero_title_1': 'Incorporate Your',
    'hero_title_2': 'Sdn Bhd in Malaysia',
    'hero_subtitle': 'Fast, reliable, and hassle-free company registration, licensing, corporate compliance, and visa services tailored for local and foreign founders.',
    'hero_cta_primary': 'Register Sdn Bhd Now',
    'hero_cta_secondary': 'Consult AI Assistant',
    'hero_stat_1_val': '24 Hours',
    'hero_stat_1_lbl': 'Average Response',
    'hero_stat_2_val': '100%',
    'hero_stat_2_lbl': 'Foreign-Ownership Ready',
    'hero_stat_3_val': '1,500+',
    'hero_stat_3_lbl': 'Registered Ventures',

    // Section Titles
    'services_header_eyebrow': 'BREADTH OF CAPABILITIES',
    'services_header_title_1': 'Our Premium',
    'services_header_title_2': 'Corporate Services',
    'services_header_subtitle': 'End-to-end legal compliance, statutory secretarial support, immigration visas, local council licensing, and taxation audits for your business.',

    // Services Card Hover Info
    'service_learn_more': 'Explore Details',
    'service_apply_now': 'Initiate Application',

    // AI Consultant
    'ai_title_1': 'AI Corporate',
    'ai_title_2': 'Advisor',
    'ai_subtitle': 'Experience instant consultation powered by specialized models trained in SSM regulations, visa quotas, and licensing guidelines.',
    'ai_placeholder': 'Ask anything (e.g. "Requirements for 100% foreign ownership of an IT firm?")...',

    // FAQ
    'faq_eyebrow': 'HAVE QUESTIONS?',
    'faq_title_1': 'Frequently Asked',
    'faq_title_2': 'Questions',
    'faq_subtitle': 'Find immediate answers regarding company incorporation, foreign ownership, paid-up capital limits, and statutory compliance in Malaysia.',
    'faq_search_placeholder': 'Search for answers (e.g. "foreigner", "SSM", "capital")...',
    'faq_no_results': 'No Results Found',
    'faq_no_results_sub': 'Try modifying your search keywords or choosing another category.',

    // Footer
    'footer_tagline': 'Empowering foreign and local founders with frictionless corporate registration, licensed secretarial support, and statutory compliance in Malaysia.',
    'footer_col_services': 'Corporate Services',
    'footer_col_legal': 'Legal & Policy',
    'footer_col_contact': 'Kuala Lumpur Office',
    'footer_rights': 'All rights reserved.',
    'footer_privacy': 'Privacy Policy',
    'footer_terms': 'Terms of Service',
    'footer_refund': 'Refund Policy',
    'footer_compliance': 'SSM Compliance Info',
  },
  BM: {
    // Nav
    'nav_home': 'Utama',
    'nav_services': 'Perkhidmatan',
    'nav_about': 'Tentang Kami',
    'nav_faq': 'Soalan Lazim',
    'nav_contact': 'Hubungi Kami',
    'nav_ai_consultant': 'Konsultan AI',
    'nav_admin': 'Portal Admin',
    'nav_professional_launchpad': 'Pelancaran Perniagaan Profesional',

    // Hero
    'hero_title_1': 'Tubuhkan Syarikat',
    'hero_title_2': 'Sdn Bhd di Malaysia',
    'hero_subtitle': 'Pendaftaran syarikat, pelesenan, pematuhan korporat, dan perkhidmatan visa yang pantas, boleh dipercayai, dan mudah untuk pengasas tempatan & asing.',
    'hero_cta_primary': 'Daftar Sdn Bhd Sekarang',
    'hero_cta_secondary': 'Tanya Pembantu AI',
    'hero_stat_1_val': '24 Jam',
    'hero_stat_1_lbl': 'Maklum Balas Purata',
    'hero_stat_2_val': '100%',
    'hero_stat_2_lbl': 'Sedia Milikan Asing',
    'hero_stat_3_val': '1,500+',
    'hero_stat_3_lbl': 'Perniagaan Berdaftar',

    // Section Titles
    'services_header_eyebrow': 'SKOP KEPAKARAN KAMI',
    'services_header_title_1': 'Perkhidmatan Korporat',
    'services_header_title_2': 'Premium Kami',
    'services_header_subtitle': 'Pematuhan undang-undang penuh, sokongan setiausaha berkanun, visa imigresen, pelesenan majlis perbandaran tempatan, dan audit percukaian.',

    // Services Card Hover Info
    'service_learn_more': 'Terokai Butiran',
    'service_apply_now': 'Mulakan Permohonan',

    // AI Consultant
    'ai_title_1': 'Penasihat Korporat',
    'ai_title_2': 'Kecerdasan Buatan (AI)',
    'ai_subtitle': 'Alami rundingan segera yang dikuasai oleh model AI khusus yang dilatih dalam peraturan SSM, kuota visa, dan garis panduan pelesenan.',
    'ai_placeholder': 'Tanya apa sahaja (cth: "Syarat pemilikan asing 100% untuk syarikat IT?")...',

    // FAQ
    'faq_eyebrow': 'ADA SOALAN?',
    'faq_title_1': 'Soalan Lazim',
    'faq_title_2': 'Sering Ditanya',
    'faq_subtitle': 'Cari jawapan segera mengenai penubuhan syarikat, pemilikan asing, had modal berbayar, dan pematuhan berkanun di Malaysia.',
    'faq_search_placeholder': 'Cari jawapan (cth: "asing", "SSM", "modal")...',
    'faq_no_results': 'Keputusan Tidak Ditemui',
    'faq_no_results_sub': 'Cuba tukar kata kunci carian anda atau pilih kategori lain.',

    // Footer
    'footer_tagline': 'Memperkasakan pengasas tempatan dan asing dengan penubuhan korporat yang lancar, sokongan setiausaha berlesen, dan pematuhan berkanun di Malaysia.',
    'footer_col_services': 'Perkhidmatan Korporat',
    'footer_col_legal': 'Undang-undang & Polisi',
    'footer_col_contact': 'Pejabat Kuala Lumpur',
    'footer_rights': 'Hak cipta terpelihara.',
    'footer_privacy': 'Dasar Privasi',
    'footer_terms': 'Syarat Perkhidmatan',
    'footer_refund': 'Dasar Pemulangan Wang',
    'footer_compliance': 'Maklumat Pematuhan SSM',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('biz_lang') as Language;
    if (savedLang === 'EN' || savedLang === 'BM') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('biz_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
