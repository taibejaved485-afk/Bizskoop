import React, { useState } from 'react';
import { getVisaEligibility, getBusinessRoadmap } from '../services/geminiService.ts';
import { AIResponse } from '../types.ts';
import TypingText from './TypingText.tsx';

interface ToolProps {
  id: string;
  type: 'visa' | 'roadmap';
  title: string;
  subtitle: string;
}

export const AIServiceToolCard: React.FC<ToolProps> = ({ id, type, title, subtitle }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = type === 'visa' 
        ? await getVisaEligibility(formData)
        : await getBusinessRoadmap(formData);
      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Validation failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={id} className="bg-white border-2 border-slate-100 rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-xl relative flex flex-col justify-between scroll-mt-24 h-full">
      {/* Header Inside Card */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center font-bold text-xs uppercase">
            {type === 'visa' ? '🛂' : '🚀'}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">
            {type === 'visa' ? 'Immigration AI' : 'Strategic AI'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
          <div className="space-y-5">
            {type === 'visa' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Nationality</label>
                    <input required name="nationality" onChange={handleInputChange} type="text" placeholder="e.g. United Kingdom" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Education</label>
                    <select required name="education" onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm">
                      <option value="">Choose degree...</option>
                      <option value="PhD">PhD Holder</option>
                      <option value="Master">Master's Degree</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Diploma">Diploma / High School</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Intended Salary (MYR)</label>
                    <input required name="monthlySalary" onChange={handleInputChange} type="number" placeholder="Min. 5,000" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Relevant Exp (Years)</label>
                    <input required name="experienceYears" onChange={handleInputChange} type="number" placeholder="Years in industry" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Industry Sector</label>
                  <select required name="industry" onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm">
                    <option value="">Select your industry...</option>
                    <option value="IT/Tech">IT / Tech / Digital Economy</option>
                    <option value="F&B">F&B / Hospitality</option>
                    <option value="Trading">Import / Export / Wholesale</option>
                    <option value="Consultancy">Professional Consulting</option>
                    <option value="Manufacturing">Manufacturing / Industrial</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Business Activity</label>
                    <input required name="businessActivity" onChange={handleInputChange} type="text" placeholder="e.g. SaaS Platform" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-royal-blue uppercase tracking-wider mb-2">Planned Location</label>
                    <input required name="location" onChange={handleInputChange} type="text" placeholder="e.g. Kuala Lumpur (DBKL)" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-sm" />
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="pt-4">
            <button disabled={loading} type="submit" className="w-full py-4 bg-action-red text-white font-black rounded-xl hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 uppercase tracking-wider text-xs sm:text-sm">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Validating with Official Data...
                </>
              ) : type === 'visa' ? "Check Pass Eligibility" : "Generate Roadmap"}
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 text-royal-blue shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              PDPA Compliant • Direct Verification
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-royal-blue uppercase tracking-tight">Strategic Recommendation</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Ref: BIZ-{Math.floor(Math.random()*10000)}</p>
            </div>
            <button onClick={() => setResult(null)} className="px-4 py-1.5 bg-slate-100 text-royal-blue font-black rounded-lg hover:bg-slate-200 transition text-[11px] uppercase tracking-wider">Restart</button>
          </div>
          
          <div className="bg-royal-blue/5 p-5 rounded-2xl border-l-4 border-royal-blue">
            <p className="text-royal-blue font-bold text-sm leading-relaxed">{result.assessment}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-6 h-0.5 bg-royal-blue"></span>
              Action Steps
            </h4>
            <div className="space-y-3">
              {result.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-royal-blue/20 transition-all flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-royal-blue text-white flex items-center justify-center shrink-0 font-black text-sm">{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className="font-black text-slate-900 uppercase tracking-tight text-xs truncate">{step.title}</p>
                      <span className="text-[9px] font-black px-2 py-0.5 bg-accent-yellow text-royal-blue rounded-full uppercase shrink-0">
                        {step.estimatedTime}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium text-xs leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-[10px] text-slate-500 border border-slate-100 leading-relaxed font-bold uppercase tracking-tight">
            <span className="text-royal-blue mr-1">LEGAL NOTICE:</span> {result.disclaimer}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 bg-action-red text-white font-black rounded-xl hover:bg-red-700 transition uppercase tracking-wider text-xs">
              Confirm via WhatsApp
            </button>
            <button className="flex-1 py-3 bg-white border-2 border-royal-blue text-royal-blue font-black rounded-xl hover:bg-slate-50 transition uppercase tracking-wider text-xs">
              Book Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Section Component rendering both tools side-by-side
export const AIToolsSection: React.FC = () => {
  return (
    <section className="pt-6 sm:pt-8 pb-6 sm:pb-8 bg-slate-50 border-y border-slate-100 scroll-mt-20">
      <div className="w-full px-4 sm:px-10 lg:px-16 2xl:px-24">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-gold font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] block mb-2">
            AI-Powered Compliance & Visa Verification
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-royal-blue leading-tight tracking-tight uppercase">
            Smart Assessment Tools
          </h2>
        </div>

        {/* Side-by-Side 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <AIServiceToolCard 
            id="wizard" 
            type="roadmap" 
            title="Smart Setup Wizard" 
            subtitle="Receive a hard-hitting compliance roadmap in 15 seconds." 
          />
          <AIServiceToolCard 
            id="visa" 
            type="visa" 
            title="Official Visa Checker" 
            subtitle="Verify your eligibility for Malaysia's passes instantly." 
          />
        </div>
      </div>
    </section>
  );
};

export default AIServiceToolCard;
