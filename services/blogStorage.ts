export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'incorporation' | 'visa' | 'licensing' | 'tax';
  categoryLabel: string;
  readTime: string;
  publishedDate: string;
  scheduledDate?: string;
  status?: 'draft' | 'scheduled' | 'published';
  targetAudience?: string;
  featured?: boolean;
  featuredImage?: string;
  imageAlt?: string;
  imageCaption?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: {
    summary: string;
    takeaways: string[];
    richHtml?: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    regulatoryNote?: string;
  };
}

export const BLOGS_STORAGE_KEY = 'bizflow_blogs_list';
export const BLOGS_UPDATED_EVENT = 'bizflow_blogs_updated';
export const BLOGS_AUTOSAVE_DRAFT_KEY = 'bizflow_blog_editor_autosave';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'foreign-ownership-guide-2026',
    title: '2026 Foreign Ownership Guide: How to Incorporate a 100% Foreign-Owned Sdn Bhd in Malaysia',
    slug: 'foreign-ownership-guide-malaysia-2026',
    excerpt: 'A comprehensive step-by-step statutory breakdown on capital thresholds, registered office mandates, and 100% equity allowances for non-resident entrepreneurs.',
    category: 'incorporation',
    categoryLabel: 'Company Incorporation',
    readTime: '6 min read',
    publishedDate: 'January 18, 2026',
    status: 'published',
    targetAudience: 'Foreign Investors & Non-Residents',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Modern Kuala Lumpur corporate skyscraper architecture',
    imageCaption: 'Kuala Lumpur Financial Hub – Primed for 100% Foreign Direct Investment.',
    metaTitle: '100% Foreign Owned Sdn Bhd Incorporation Guide Malaysia 2026',
    metaDescription: 'Complete 2026 statutory blueprint to incorporate a 100% foreign-owned Sdn Bhd company in Malaysia with SSM compliance and zero local equity partner requirements.',
    focusKeywords: ['100% Foreign Ownership', 'Sdn Bhd Incorporation', 'SSM Malaysia', 'Companies Act 2016', 'Paid-up Capital'],
    author: {
      name: 'Tan Sri Datuk Azman Rahim',
      role: 'Head of Corporate Secretarial Practice',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Company Incorporation', 'Foreign Ownership', 'Sdn Bhd', 'SSM Guidelines', 'Paid-up Capital'],
    content: {
      summary: 'Under the Malaysian Companies Act 2016, foreign individuals and overseas corporations can legally own 100% equity in an incorporated Sendirian Berhad (Sdn Bhd) across most non-regulated business sectors, including tech consultancy, trading, import-export, and professional services.',
      takeaways: [
        'A minimum of one resident director residing in Malaysia is legally mandatory (employment pass holders qualify).',
        'General service and trading entities can be incorporated with as little as RM1 initial paid-up capital, though immigration and bank accounts require strategic sizing.',
        'Regulated sectors (retail storefronts, petroleum, logistics, education) retain specific Bumiputera equity conditions or WRT licensing thresholds.',
        'SSM incorporation timeline has been streamlined to 2 to 4 business days via digital MyCoID portal submissions.'
      ],
      sections: [
        {
          heading: '1. The Evolution of Non-Resident Equity in Malaysia',
          body: [
            'For international founders seeking an entry hub into Southeast Asia, Malaysia offers the most cost-effective statutory framework compared to Singapore and Indonesia. In 2026, the Companies Commission of Malaysia (SSM) mandates no local shareholder requirement for non-restricted economic sectors.',
            'Foreign corporations can set up either as a stand-alone private limited company (Sdn Bhd) or as a registered foreign company branch. In 95% of cases, incorporating an independent Sdn Bhd offers greater tax shielding, distinct corporate veil separation, and straightforward corporate bank account opening.'
          ]
        },
        {
          heading: '2. Capital Sizing for Corporate Banking & Employment Passes',
          body: [
            'While statutory law permits registration with RM1 authorized capital, practical banking compliance requires realistic capitalization.',
            'For 100% foreign-owned firms seeking to sponsor Key Personnel Employment Passes (EP) via the Expatriate Services Division (ESD), the minimum required paid-up capital is strictly RM1,000,000. Joint ventures with Malaysian equity partners require RM350,000 to RM500,000 depending on shareholding splits.'
          ]
        },
        {
          heading: '3. Mandatory Secretarial Appointments & Deadlines',
          body: [
            'Every Sdn Bhd must officially appoint a licensed Company Secretary registered with the Malaysian Institute of Chartered Secretaries and Administrators (MAICSA) or holding a valid SSM practicing certificate within 30 days of incorporation.',
            'Bizflow provides registered office address compliance, annual return filings, and board resolutions under one integrated advisory package.'
          ]
        }
      ],
      regulatoryNote: 'Statutory Reference: Companies Act 2016 (Act 777), Section 196(4) on resident director qualifications.'
    }
  },
  {
    id: 'esd-employment-pass-tiers',
    title: 'ESD Employment Pass (EP) 2026: Category I, II & III Salary Thresholds & Quota Allocations',
    slug: 'esd-employment-pass-tiers-guide',
    excerpt: 'Detailed analysis of ESD immigration updates, revised minimum salary requirements, dependants rights, and ESD projection quota approvals.',
    category: 'visa',
    categoryLabel: 'Immigration',
    readTime: '5 min read',
    publishedDate: 'February 02, 2026',
    status: 'published',
    targetAudience: 'Expatriates & Global Talent',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Corporate passport and visa travel paperwork',
    imageCaption: 'Official ESD Expatriate Services Division immigration compliance blueprint.',
    metaTitle: 'ESD Employment Pass Category I, II & III Guidelines 2026',
    metaDescription: 'Understand Malaysian expatriate employment pass categories, minimum salary thresholds from RM3,000 to RM10,000, and dependant privileges for 2026.',
    focusKeywords: ['ESD Malaysia', 'Employment Pass', 'Expat Visa', 'Immigration Quota', 'Work Permit'],
    author: {
      name: 'Faridah Hashim',
      role: 'Senior Immigration & Expat Affairs Counsel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Immigration', 'Employment Pass', 'ESD Portal', 'Expat Visa', 'Foreign Ownership'],
    content: {
      summary: 'Navigating the Expatriate Services Division (ESD) portal under the Ministry of Home Affairs requires precise corporate eligibility documentation, clear organizational charts, and adherence to revised 2026 talent tiers.',
      takeaways: [
        'EP Category I: Minimum monthly basic salary of RM10,000; up to 5-year duration with automatic dependant pass eligibility.',
        'EP Category II: Minimum monthly basic salary of RM5,000 to RM9,999; up to 2-year duration with dependant privileges.',
        'EP Category III: Monthly salary between RM3,000 and RM4,999; restricted duration and exempt from bringing dependants.',
        'ESD company registration must be secured first before any individual expatriate application can be initiated.'
      ],
      sections: [
        {
          heading: '1. The Two-Step ESD Pathway',
          body: [
            'Foreign founders often mistakenly apply for individual visas before their company account has been audited by immigration officers. The statutory sequence is strict: Step 1 is ESD Corporate Profile Registration & On-Site Inspection, and Step 2 is the Annual Expat Projection Quota submission.',
            'Only once ESD approves your projection quota can individual talent files and employment contracts be uploaded for Stage 2 processing.'
          ]
        },
        {
          heading: '2. Common Reasons for EP Application Delays',
          body: [
            'Immigration authorities closely inspect your corporate tenancy agreement, premise photo proof, EPF (KWSP) staff contributions for local employees, and audited accounts. Demonstrating a balanced local-to-foreign talent ratio is paramount for high approval velocity.'
          ]
        }
      ],
      regulatoryNote: 'Administered under the Immigration Department of Malaysia (Jabatan Imigresen Malaysia - JIM).'
    }
  },
  {
    id: 'wrt-license-wholesale-retail-trade',
    title: 'Wholesale & Retail Trade (WRT) License: Capital Requirements & KPDN Approval Secrets',
    slug: 'wrt-license-kpdn-capital-guide',
    excerpt: 'Essential compliance checklist for foreign-involved consumer retail, F&B, trading, and distribution companies operating in Malaysia.',
    category: 'licensing',
    categoryLabel: 'Business Licensing',
    readTime: '7 min read',
    publishedDate: 'February 14, 2026',
    status: 'published',
    targetAudience: 'Retail & F&B Operators',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Modern retail store and distributive trade venue in Malaysia',
    imageCaption: 'KPDN Wholesale & Retail Trade permit requirements for foreign-invested enterprises.',
    metaTitle: 'WRT License Malaysia Foreign Equity Guide 2026',
    metaDescription: 'Guide to securing KPDN Wholesale & Retail Trade (WRT) licensing for foreign-owned retail, restaurants, and wholesale distribution in Malaysia.',
    focusKeywords: ['WRT License', 'KPDN Malaysia', 'Retail License', 'Foreign Capital RM1M', 'Distributive Trade'],
    author: {
      name: 'Marcus Loh',
      role: 'Director of Trade & Regulatory Licensing',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Business Licensing', 'WRT License', 'KPDN', 'Foreign Ownership', 'Retail Permit'],
    content: {
      summary: 'Under the Ministry of Domestic Trade and Cost of Living (KPDN), any enterprise with foreign equity interest engaging in wholesale, retail, franchising, or direct distribution must secure an official WRT license before applying for premise licenses or expatriate visas.',
      takeaways: [
        'Minimum paid-up capital of RM1,000,000 is legally mandated for 100% foreign-owned entities applying for WRT.',
        'KPDN assesses socio-economic contribution: employment of local Malaysians, transfer of technology, and eco-system benefits.',
        'Local municipal councils (DBKL, MBPJ, MBSA) will reject signboard and premise license filings if foreign-owned retail ventures lack a valid WRT letter.',
        'Approval lead times typically range from 6 to 10 weeks from complete statutory submission.'
      ],
      sections: [
        {
          heading: '1. Who Needs a WRT License?',
          body: [
            'Any company with even 1% foreign equity participating in retail shops, specialty restaurants, supermarkets, regional wholesale distribution hubs, or consumer product franchises must hold an active WRT permit.',
            'Pure software-as-a-service (SaaS) and digital consulting firms with zero physical goods distribution are generally exempt, provided their scope is properly coded in their SSM Memorandum of Association.'
          ]
        },
        {
          heading: '2. Key Submission Documentation',
          body: [
            'Your application must present an in-depth 3-year Business Feasibility Plan, audited capitalization accounts, certified tenancy agreements, and a local employment growth roadmap.'
          ]
        }
      ],
      regulatoryNote: 'KPDN Guidelines on Foreign Participation in the Distributive Trade Services in Malaysia.'
    }
  },
  {
    id: 'corporate-tax-e-invoicing-2026',
    title: 'LHDN Corporate Tax 2026 & Nationwide E-Invoicing: Essential Compliance for Malaysian Companies',
    slug: 'lhdn-corporate-tax-e-invoicing-2026',
    excerpt: 'What every business director must prepare for the Inland Revenue Board (LHDN) real-time e-invoicing mandate and SME corporate tax brackets.',
    category: 'tax',
    categoryLabel: 'Tax Advice',
    readTime: '6 min read',
    publishedDate: 'February 22, 2026',
    status: 'published',
    targetAudience: 'Corporate CFOs & Directors',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Corporate tax computation and e-invoicing documents',
    imageCaption: 'LHDN MyInvois Continuous Transaction Control (CTC) roadmap for corporate taxpayers.',
    metaTitle: 'LHDN Corporate Tax Rates & e-Invoicing Compliance Malaysia 2026',
    metaDescription: 'Complete review of 2026 Malaysian corporate tax rates, SME relief tiers (15%-17%), and LHDN MyInvois real-time validation compliance.',
    focusKeywords: ['LHDN Corporate Tax', 'e-Invoicing Malaysia', 'MyInvois API', 'SME Tax 15%', 'Form CP204'],
    author: {
      name: 'Elena Choo CA(M)',
      role: 'Principal Tax Advisory Partner',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Tax Advice', 'Corporate Tax', 'LHDN', 'E-Invoicing', 'Tax Brackets', 'SME Relief'],
    content: {
      summary: 'With LHDN fully rolling out nationwide real-time Continuous Transaction Control (CTC) e-invoicing via the MyInvois Portal, corporate compliance in Malaysia has entered an era of instant transaction validation and automated reporting.',
      takeaways: [
        'Qualifying SME corporate tax rate remains at an attractive 15% on the first RM150,000 chargeable income, 17% up to RM600,000, and 24% on excess.',
        'To qualify for SME preferential tax rates, paid-up capital must not exceed RM2.5 million and the company cannot be controlled by a non-SME parent.',
        'LHDN E-Invoicing requires pre-clearance validation for B2B, B2C, and cross-border import/export transactions.',
        'Late filing or failure to furnish tax estimates (Form CP204) triggers penalties under Section 107C of the Income Tax Act 1967.'
      ],
      sections: [
        {
          heading: '1. The 2026 Preferential Corporate Tax Brackets',
          body: [
            'Malaysia offers one of the most competitive tax regimes in ASEAN. New venture founders should structure their balance sheet capital appropriately to preserve the 15% - 17% low SME bracket.',
            'Companies with significant foreign parent ownership may be subject to the standard 24% headline corporate tax rate, making strategic transfer pricing and group structuring vital.'
          ]
        },
        {
          heading: '2. The MyInvois Portal Integration',
          body: [
            'Bizflow helps businesses seamlessly link accounting engines with the Inland Revenue Board API or manage consolidated monthly e-invoice submissions compliant with IRB standard formats.'
          ]
        }
      ],
      regulatoryNote: 'Section 82C Income Tax Act 1967 & LHDN E-Invoicing Guidelines.'
    }
  },
  {
    id: 'mdec-malaysia-digital-status',
    title: 'Malaysia Digital (MD) Status by MDEC: Tax Holidays, Unrestricted Foreign Talent & Grants',
    slug: 'mdec-malaysia-digital-status-guide',
    excerpt: 'How tech companies, AI developers, and digital platforms can unlock 0-10% corporate tax exemptions and fast-track Foreign Knowledge Worker visas.',
    category: 'incorporation',
    categoryLabel: 'Company Incorporation',
    readTime: '5 min read',
    publishedDate: 'February 28, 2026',
    status: 'published',
    targetAudience: 'Tech Startups & Digital Entrepreneurs',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'High-tech data infrastructure and digital innovation center',
    imageCaption: 'MDEC Malaysia Digital Status unlocks exclusive tax holidays and fast-tracked foreign knowledge worker visas.',
    metaTitle: 'MDEC Malaysia Digital (MD) Status Application Guide 2026',
    metaDescription: 'Unlock tax holidays, 100% foreign equity, and unrestricted FKW visa quotas with Malaysia Digital (MD) Status by MDEC.',
    focusKeywords: ['MDEC MD Status', 'Malaysia Digital', 'Tech Tax Holidays', 'Foreign Knowledge Workers', 'AI Startups'],
    author: {
      name: 'Marcus Loh',
      role: 'Director of Trade & Regulatory Licensing',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Company Incorporation', 'Tax Advice', 'Immigration', 'MDEC', 'Malaysia Digital', 'Foreign Knowledge Workers'],
    content: {
      summary: 'The Malaysia Digital (MD) initiative, successor to the legendary MSC Malaysia status, offers premier national strategic status for digital and technology companies setting up regional headquarters, development centers, or AI data operations.',
      takeaways: [
        'Exemption from foreign equity limitations with 100% foreign ownership guaranteed.',
        'Fast-tracked MDEC Foreign Knowledge Worker (FKW) pass approvals without standard ESD quota roadblocks.',
        'Eligibility for competitive corporate tax incentive schemes ranging from reduced 5-10% rates to full tax holidays.',
        'Duty exemptions on imported multimedia equipment and hardware.'
      ],
      sections: [
        {
          heading: '1. Eligibility Criteria for Tech Founders',
          body: [
            'Eligible business activities span artificial intelligence, cloud infrastructure, blockchain, cybersecurity, digital creative content, and software development.',
            'Applicants must submit clear qualifying expenditure commitments and demonstrate a minimum number of high-value local knowledge workers employed.'
          ]
        }
      ],
      regulatoryNote: 'Administered by the Malaysia Digital Economy Corporation (MDEC) under the Ministry of Digital.'
    }
  },
  {
    id: 'local-council-premise-license-dbkl-mbpj',
    title: 'Premise & Signboard Licensing: Navigating DBKL, MBPJ, and MBSA Municipal Approvals',
    slug: 'local-council-premise-license-dbkl-mbpj',
    excerpt: 'A practical walkthrough on zoning bylaws, Bomba fire safety clearances, billboard language regulations, and premise inspection compliance.',
    category: 'licensing',
    categoryLabel: 'Business Licensing',
    readTime: '5 min read',
    publishedDate: 'March 01, 2026',
    status: 'published',
    targetAudience: 'Retail & F&B Operators',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Commercial premises and municipal storefront inspection in Kuala Lumpur',
    imageCaption: 'DBKL and MBPJ municipal licensing validation standards for commercial units.',
    metaTitle: 'DBKL & Municipal Premise License Guide Kuala Lumpur 2026',
    metaDescription: 'Step-by-step guidance on DBKL and local municipal council premise licenses, Bomba clearances, and DBP certified signboard permits.',
    focusKeywords: ['DBKL Premise License', 'MBPJ Permit', 'Signboard License', 'DBP Certification', 'Bomba Approval'],
    author: {
      name: 'Faridah Hashim',
      role: 'Senior Immigration & Expat Affairs Counsel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Business Licensing', 'DBKL', 'MBPJ', 'Premise License', 'Signboard License', 'Bomba'],
    content: {
      summary: 'Before opening your physical office, restaurant, or retail space in Klang Valley, obtaining local authority (PBT) premise licenses and certified signboard permits is a mandatory prerequisite under the Local Government Act 1976.',
      takeaways: [
        'Signboard compliance requires Bahasa Melayu text to be visually prominent and grammatically validated by Dewan Bahasa dan Pustaka (DBP).',
        'Commercial zoning validation is essential; operating commercial activities in residential or unapproved units results in immediate fines or closure.',
        'Bomba (Fire Department) architectural floor plan approvals and emergency exit compliance are required prior to final council inspection.',
        'Bizflow handles complete site inspections, architectural liaison, and council appeals.'
      ],
      sections: [
        {
          heading: '1. The DBP Signboard Certification Process',
          body: [
            'All corporate signboards facing public streets require a preliminary visual certificate from Dewan Bahasa dan Pustaka (DBP) confirming correct Malay terminology before DBKL or MBPJ will issue the final permit.',
            'Foreign brand names are permitted, provided a descriptive Malay category subtitle is placed above or alongside with correct typographic hierarchy.'
          ]
        }
      ],
      regulatoryNote: 'Local Government Act 1976 (Act 171) & PBT Trade, Business and Industrial Bylaws.'
    }
  }
];

export const getStoredBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return DEFAULT_BLOG_POSTS;
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }
    // Normalize missing fields for legacy items
    return parsed.map((post: any) => ({
      ...post,
      status: post.status || 'published',
      featured: typeof post.featured === 'boolean' ? post.featured : false,
      featuredImage: post.featuredImage || DEFAULT_BLOG_POSTS.find(d => d.id === post.id)?.featuredImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      imageAlt: post.imageAlt || post.title,
      imageCaption: post.imageCaption || '',
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
      focusKeywords: Array.isArray(post.focusKeywords) ? post.focusKeywords : post.tags || [],
      targetAudience: post.targetAudience || 'Corporate Directors & Founders'
    }));
  } catch {
    return DEFAULT_BLOG_POSTS;
  }
};

export const saveBlogPost = (newPost: Omit<BlogPost, 'id' | 'slug'> & { id?: string; slug?: string }): BlogPost => {
  const id = newPost.id || `post_${Date.now()}`;
  const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const completePost: BlogPost = {
    ...newPost,
    id,
    slug,
    status: newPost.status || 'published'
  };
  if (typeof window !== 'undefined') {
    const current = getStoredBlogPosts();
    const updated = [completePost, ...current];
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BLOGS_UPDATED_EVENT));
  }
  return completePost;
};

export const updateBlogPost = (id: string, updatedFields: Partial<BlogPost>): BlogPost | null => {
  if (typeof window === 'undefined') return null;
  const current = getStoredBlogPosts();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updatedPost: BlogPost = {
    ...current[index],
    ...updatedFields,
    id
  };
  current[index] = updatedPost;
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent(BLOGS_UPDATED_EVENT));
  return updatedPost;
};

export const deleteBlogPost = (id: string): void => {
  if (typeof window === 'undefined') return;
  const current = getStoredBlogPosts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(BLOGS_UPDATED_EVENT));
};

export const resetDefaultBlogPosts = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
  window.dispatchEvent(new CustomEvent(BLOGS_UPDATED_EVENT));
};
