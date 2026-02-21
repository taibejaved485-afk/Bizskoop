
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

const AIServiceTool: React.FC<ToolProps> = ({ id, type, title, subtitle }) => {
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
    <section id={id} className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase">{title}</h2>
          <div className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto min-h-[2rem]">
            <TypingText text={subtitle} speed={20} delay={2000} />
          </div>
        </div>

        <div className="bg-white border-2 border-slate-100 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 shadow-2xl relative">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {type === 'visa' ? (
                  <>
                    <div className="group">
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Nationality</label>
                      <input required name="nationality" onChange={handleInputChange} type="text" placeholder="e.g. United Kingdom" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Education</label>
                      <select required name="education" onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium">
                        <option value="">Choose your degree...</option>
                        <option value="PhD">PhD Holder</option>
                        <option value="Master">Master's Degree</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Diploma">Diploma / High School</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Intended Salary (MYR)</label>
                      <input required name="monthlySalary" onChange={handleInputChange} type="number" placeholder="Min. 5,000" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Relevant Exp (Years)</label>
                      <input required name="experienceYears" onChange={handleInputChange} type="number" placeholder="Years in industry" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Industry Sector</label>
                      <select required name="industry" onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium text-lg">
                        <option value="">Select your industry...</option>
                        <option value="IT/Tech">IT / Tech / Digital Economy</option>
                        <option value="F&B">F&B / Hospitality</option>
                        <option value="Trading">Import / Export / Wholesale</option>
                        <option value="Consultancy">Professional Consulting</option>
                        <option value="Manufacturing">Manufacturing / Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Business Activity</label>
                      <input required name="businessActivity" onChange={handleInputChange} type="text" placeholder="e.g. SaaS Platform" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-royal-blue uppercase tracking-widest mb-3">Planned Location</label>
                      <input required name="location" onChange={handleInputChange} type="text" placeholder="e.g. Kuala Lumpur (DBKL)" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-royal-blue focus:bg-white transition-all outline-none font-medium" />
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-4">
                <button disabled={loading} type="submit" className="w-full py-5 bg-action-red text-white font-black rounded-2xl hover-bg-action-red transition disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 uppercase tracking-widest text-lg">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Validating with Official Data...
                    </>
                  ) : "Generate Professional Roadmap"}
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                  <svg className="w-4 h-4 text-royal-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  PDPA Compliant • SSL Encrypted • Direct Verification
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex items-center justify-between border-b-4 border-slate-50 pb-8">
                <div>
                  <h3 className="text-2xl font-black text-royal-blue uppercase tracking-tighter">Strategic Recommendation</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: BIZ-{Math.floor(Math.random()*10000)}</p>
                </div>
                <button onClick={() => setResult(null)} className="px-6 py-2 bg-slate-100 text-royal-blue font-black rounded-xl hover:bg-slate-200 transition text-xs uppercase tracking-widest">Restart</button>
              </div>
              
              <div className="bg-royal-blue/5 p-8 rounded-3xl border-l-8 border-royal-blue">
                <p className="text-royal-blue font-bold text-lg leading-relaxed">{result.assessment}</p>
              </div>

              <div className="space-y-6">
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center gap-3">
                  <span className="w-8 h-1 bg-royal-blue"></span>
                  Mandatory Action Steps
                </h4>
                <div className="grid grid-cols-1 gap-6">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-slate-50 shadow-sm hover:border-royal-blue/20 transition-all flex items-start gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-royal-blue text-white flex items-center justify-center shrink-0 font-black text-lg group-hover:scale-110 transition-transform shadow-lg">{idx + 1}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-black text-slate-900 uppercase tracking-tight text-lg">{step.title}</p>
                          <span className="text-[10px] font-black px-3 py-1 bg-accent-yellow text-royal-blue rounded-full uppercase tracking-tighter">
                            {step.estimatedTime}
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl text-[11px] text-slate-500 border border-slate-100 leading-relaxed font-bold uppercase tracking-tight">
                <span className="text-royal-blue mr-2">LEGAL NOTICE:</span> {result.disclaimer}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 sm:gap-5">
                <button className="flex-1 py-4 sm:py-5 bg-action-red text-white font-black rounded-2xl hover-bg-action-red transition shadow-2xl shadow-red-600/20 uppercase tracking-widest text-xs sm:text-sm">
                  Confirm Next Steps via WhatsApp
                </button>
                <button className="flex-1 py-4 sm:py-5 bg-white border-4 border-royal-blue text-royal-blue font-black rounded-2xl hover:bg-slate-50 transition uppercase tracking-widest text-xs sm:text-sm">
                  Secure Consultation Call
                </button>
              </div>
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                Expert consultant available in ~30 minutes post-booking
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIServiceTool;
