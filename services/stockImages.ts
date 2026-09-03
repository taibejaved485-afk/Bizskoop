export interface StockPhoto {
  id: string;
  title: string;
  url: string;
  alt: string;
  caption: string;
  category: 'architecture' | 'corporate' | 'tax' | 'legal' | 'visa' | 'tech' | 'retail';
  categoryLabel: string;
}

export const STOCK_PHOTOS: StockPhoto[] = [
  {
    id: 'kl-skyline-twilight',
    title: 'Kuala Lumpur Financial District Skyline',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    alt: 'Modern Kuala Lumpur skyscraper architecture and corporate financial district',
    caption: 'Kuala Lumpur Financial Hub – Primed for 100% Foreign Direct Investment.',
    category: 'architecture',
    categoryLabel: 'Corporate Architecture'
  },
  {
    id: 'merdeka-118-klcc',
    title: 'KLCC Corporate Business District Tower',
    url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop&q=80',
    alt: 'Petronas Twin Towers and Kuala Lumpur City Centre commercial hub',
    caption: 'Strategic business address in the heart of Kuala Lumpur ASEAN hub.',
    category: 'architecture',
    categoryLabel: 'Corporate Architecture'
  },
  {
    id: 'boardroom-meeting-executives',
    title: 'Corporate Boardroom Strategic Advisory',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    alt: 'Corporate directors conducting board meeting and annual shareholder resolutions',
    caption: 'Executive Board of Directors deliberating statutory secretarial resolutions.',
    category: 'corporate',
    categoryLabel: 'Executive Advisory'
  },
  {
    id: 'consulting-signing-contract',
    title: 'Corporate Shareholder Agreement Signing',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
    alt: 'Business partners formalizing joint venture contracts and SSM incorporation forms',
    caption: 'Execution of statutory shareholder agreements and foreign equity declarations.',
    category: 'corporate',
    categoryLabel: 'Executive Advisory'
  },
  {
    id: 'tax-calculator-accounting',
    title: 'LHDN Corporate Tax & Financial Audit',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    alt: 'Corporate accountant analyzing financial statements, tax estimates, and audit papers',
    caption: 'LHDN MyInvois Continuous Transaction Control (CTC) roadmap for corporate taxpayers.',
    category: 'tax',
    categoryLabel: 'Tax & Compliance'
  },
  {
    id: 'digital-invoice-screen',
    title: 'Real-Time E-Invoicing & Financial Ledger',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    alt: 'Financial analytics dashboard with real-time e-invoice validation charts',
    caption: 'Continuous automated validation and real-time XML/JSON e-invoice transmission.',
    category: 'tax',
    categoryLabel: 'Tax & Compliance'
  },
  {
    id: 'legal-gavel-statutory',
    title: 'Statutory Law & Companies Act 2016',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    alt: 'Scale of justice and statutory legal lawbooks for corporate secretarial compliance',
    caption: 'Companies Commission of Malaysia (SSM) regulatory mandates under Act 777.',
    category: 'legal',
    categoryLabel: 'Statutory & Legal'
  },
  {
    id: 'esd-passports-visas',
    title: 'ESD Expatriate Visa & Passport Processing',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
    alt: 'International passports and corporate expatriate employment pass documentation',
    caption: 'Official ESD Expatriate Services Division immigration compliance blueprint.',
    category: 'visa',
    categoryLabel: 'Immigration & Visas'
  },
  {
    id: 'global-talent-airport',
    title: 'Global Talent Mobility & Relocation',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
    alt: 'Business executive traveling for regional ASEAN corporate headquarters setup',
    caption: 'Fast-tracked expatriate pass endorsement and relocation advisory.',
    category: 'visa',
    categoryLabel: 'Immigration & Visas'
  },
  {
    id: 'cyberjaya-tech-datacenter',
    title: 'MDEC Malaysia Digital Tech Infrastructure',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    alt: 'High-tech data infrastructure and digital innovation center',
    caption: 'MDEC Malaysia Digital Status unlocks exclusive tax holidays and fast-tracked FKW visas.',
    category: 'tech',
    categoryLabel: 'Tech & Digital Status'
  },
  {
    id: 'commercial-storefront-retail',
    title: 'DBKL Commercial Premise & Storefront',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1200&auto=format&fit=crop&q=80',
    alt: 'Commercial premises and municipal storefront inspection in Kuala Lumpur',
    caption: 'DBKL and MBPJ municipal licensing validation standards for commercial units.',
    category: 'retail',
    categoryLabel: 'Premise & Retail Licensing'
  },
  {
    id: 'wrt-distributive-trade',
    title: 'KPDN Wholesale & Retail Distributive Trade',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    alt: 'Modern retail store and distributive trade venue in Malaysia',
    caption: 'KPDN Wholesale & Retail Trade permit requirements for foreign-invested enterprises.',
    category: 'retail',
    categoryLabel: 'Premise & Retail Licensing'
  }
];
