import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Scale, FileText, CheckCircle, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: string;
}

const policyData: Record<string, {
  icon: React.ComponentType<any>;
  tagline: string;
  introduction: string;
  sections: { title: string; content: string }[];
}> = {
  'Privacy Policy': {
    icon: Shield,
    tagline: 'CONFIDENTIALITY & TRUST BENCHMARK',
    introduction: 'At BizFlow, we prioritize the security, privacy, and confidentiality of our clients\' corporate and personal data. This Privacy Policy details our elite data management guidelines, ensuring your business records remain entirely private.',
    sections: [
      {
        title: '1. Information We Collect',
        content: 'To facilitate seamless Sdn Bhd incorporation, SSM filings, and statutory compliance, we collect company entity names, director IDs/passports, contact numbers, email communications, and business objective drafts.'
      },
      {
        title: '2. Purpose of Data Processing',
        content: 'Your data is strictly utilized to draft statutory documents, execute company secretarial tasks, complete official registrations with SSM (Suruhanjaya Syarikat Malaysia), and handle tax filings with LHDN.'
      },
      {
        title: '3. Elite Security & Encryption',
        content: 'We utilize advanced end-to-end AES-256 encryption, secure physical vaults, and isolated cloud architectures to guarantee zero unauthorized access. Only accredited corporate secretaries handle your records.'
      },
      {
        title: '4. Absolute Third-Party Restriction',
        content: 'BizFlow does NOT sell, rent, or lease client lists to third parties. Data is only shared with official Malaysian federal authorities (SSM, LHDN, DBKL, MDEC) as strictly required by law.'
      }
    ]
  },
  'Terms of Service': {
    icon: Scale,
    tagline: 'MUTUAL OBLIGATIONS & COMPLIANCE',
    introduction: 'These Terms of Service govern your professional engagement with BizFlow for company formation, corporate secretarial custody, tax compliance, and business licensing facilitation in Malaysia.',
    sections: [
      {
        title: '1. Professional Scope of Work',
        content: 'BizFlow acts as your official corporate liaison and registered company secretary. We facilitate statutory compliance in strict conformance with the Malaysian Companies Act 2016.'
      },
      {
        title: '2. Client Verification & Responsibilities',
        content: 'Clients are legally obligated to provide true, authentic, and complete information, including director identity proof (IC/Passport) and residential addresses. Delays in document submission may affect SSM timelines.'
      },
      {
        title: '3. Limitation of Liability',
        content: 'While BizFlow maintains a 100% compliance success track record, final approvals for specialized licenses, immigration passes, or custom permits are at the sole discretion of Malaysian government departments.'
      },
      {
        title: '4. Indemnity & Regulatory Actions',
        content: 'Clients agree to indemnify BizFlow against penalties arising from inaccurate financial submissions, undisclosed legal liabilities, or late declarations not caused by BizFlow secretarial negligence.'
      }
    ]
  },
  'Refund Policy': {
    icon: FileText,
    tagline: 'TRANSPARENT CLIENT-FIRST FINANCES',
    introduction: 'We believe in absolute financial transparency. BizFlow maintains a fair, milestone-based refund scheme to support entrepreneurs through every step of their registration journey.',
    sections: [
      {
        title: '1. 100% Refund Guarantee',
        content: 'If our initial statutory evaluation determines that your proposed company structure or industry violates Malaysian laws, or is ineligible for incorporation, a 100% refund of all fees will be issued immediately.'
      },
      {
        title: '2. Milestone Deductions',
        content: 'If a refund is requested after work has started: (A) If SSM name reservation has occurred, a minor administrative fee is deducted. (B) If statutory incorporation paperwork has been signed, actual secretarial work completed up to that point is billed proportionally.'
      },
      {
        title: '3. Government Statutory Fees',
        content: 'Please note that official government filing fees (such as the SSM RM1,000 incorporation fee, licensing application charges, or DBKL fees) are paid directly to state authorities and are entirely non-refundable.'
      },
      {
        title: '4. Disputes & Resolution',
        content: 'Refund requests must be formally submitted to accounts@bizflow.com. Approved refunds are processed back via the original payment method within 5 to 7 working business days.'
      }
    ]
  },
  'Compliance Standards': {
    icon: CheckCircle,
    tagline: 'MALAYSIA COMPANIES ACT 2016 COMPLIANT',
    introduction: 'BizFlow operates under strict alignment with federal laws, SSM regulatory mandates, and international corporate governance best practices to keep your company in premium active standing.',
    sections: [
      {
        title: '1. Statutory Register Maintenance',
        content: 'We maintain accurate registers of members, directors, secretaries, managers, and charges. Minutes of all Annual General Meetings (AGM) and board resolutions are documented with surgical precision.'
      },
      {
        title: '2. Active Annual Return Filings',
        content: 'To prevent legal penalties or SSM compound notices, we monitor and coordinate the timely filing of Annual Returns within 30 days of your incorporation anniversary.'
      },
      {
        title: '3. Anti-Money Laundering (AML/CFT)',
        content: 'BizFlow strictly complies with the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001 (AMLA). We execute mandatory KYC screenings for all client directors.'
      },
      {
        title: '4. Professional Standards Auditing',
        content: 'Our compliance department runs biannual checks on all client portfolios to verify tax alignment, corporate secretarial statuses, and local license expirations.'
      }
    ]
  },
  'Data Protection': {
    icon: Lock,
    tagline: 'PDPA MALAYSIA 2010 COMPLIANT',
    introduction: 'In complete compliance with the Malaysian Personal Data Protection Act (PDPA) 2010, we implement robust technical and organizational barriers to safeguard your private details.',
    sections: [
      {
        title: '1. The Seven Principles of PDPA',
        content: 'We adhere to the General Principle, Notice and Choice Principle, Disclosure Principle, Security Principle, Retention Principle, Data Integrity Principle, and Access Principle over all data assets.'
      },
      {
        title: '2. Data Retainment Boundaries',
        content: 'Corporate documents and director information are stored for statutory periods mandated by the Companies Act 2016 and LHDN (typically 7 years). Once expired, records are securely scrubbed and shredded.'
      },
      {
        title: '3. Access & Correction Rights',
        content: 'Clients retain absolute authority to request access to, inspect, correct, update, or completely withdraw consent for any personal or company data stored in our compliance databases.'
      },
      {
        title: '4. Incident Response & Monitoring',
        content: 'Our specialized IT security team executes 24/7 scanning on our cloud storage. In the highly unlikely event of a security breach, all affected clients and regulatory bodies will be notified within 24 hours.'
      }
    ]
  }
};

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, policyType }) => {
  const data = policyData[policyType] || policyData['Privacy Policy'];
  const Icon = data.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#051622]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-royal-blue rounded-full flex items-center justify-center transition-colors z-20 border border-slate-100"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-8 sm:p-12 pb-6 border-b border-slate-100 bg-slate-50 relative shrink-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-royal-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">{data.tagline}</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#051622] uppercase tracking-tight">{policyType}</h3>
                </div>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mt-4 max-w-3xl">
                {data.introduction}
              </p>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-8 sm:p-12 pt-8 overflow-y-auto space-y-8 flex-1">
              {data.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-lg font-black text-[#051622] uppercase tracking-tight">
                    {section.title}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed pl-2 border-l-2 border-gold/40">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                BizFlow Compliance Facilitation Portal • Active
              </p>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-royal-blue hover:bg-gold text-white hover:text-royal-blue font-black rounded-xl transition-all uppercase tracking-widest text-[10px] shadow-lg"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
