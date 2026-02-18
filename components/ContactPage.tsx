import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-navy-dark text-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase animate-fadeIn">
              Strategic <br/>
              <span className="text-gold">Partnership</span> <br/>
              Starts Here
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Connect with Malaysia's leading business strategists. Whether you are launching a startup or scaling an enterprise, we provide the authority and compliance you need.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: Contact Details */}
            <div>
              <h2 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4">Direct Channels</h2>
              <h3 className="text-4xl font-black text-royal-blue mb-10 uppercase tracking-tight">Our Regional <br/>Headquarters.</h3>
              
              <div className="space-y-12">
                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-navy-dark text-gold flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-royal-blue uppercase tracking-tight mb-2">Corporate Office</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Level 28, Menara Binjai,<br />
                      No. 2, Jalan Binjai, Kuala Lumpur City Centre,<br />
                      50450 Kuala Lumpur, Malaysia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-navy-dark text-gold flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-royal-blue uppercase tracking-tight mb-2">Liaison Desk</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      General Line: +60 3 2771 8000<br />
                      WhatsApp: +60 12 999 0000
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-navy-dark text-gold flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-royal-blue uppercase tracking-tight mb-2">Email Channels</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      General: info@bizskoop.com<br />
                      Official: official@bizskoop.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-slate-50 rounded-[30px] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold opacity-5 rounded-bl-full"></div>
                <h4 className="text-sm font-black text-royal-blue uppercase tracking-widest mb-4">International Founders</h4>
                <p className="text-slate-500 text-xs font-bold leading-relaxed">
                  We specialize in helping foreign entrepreneurs from over 40 countries incorporate and scale in Malaysia. Our team is fluent in English, Bahasa Malaysia, and Mandarin.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white p-10 lg:p-14 rounded-[40px] shadow-2xl border-2 border-gold/20 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10"></div>
              <h3 className="text-3xl font-black text-royal-blue mb-8 uppercase tracking-tight">Executive Inquiry Form</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" placeholder="e.g. Alexander Graham" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Professional Email</label>
                    <input type="email" placeholder="name@company.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Company Name</label>
                    <input type="text" placeholder="Entity Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" placeholder="+60 12..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Service of Interest</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium text-slate-500 appearance-none transition-all">
                    <option value="">Select a Primary Service</option>
                    <option value="incorporation">Sdn Bhd Incorporation</option>
                    <option value="secretarial">Company Secretarial</option>
                    <option value="visa">Employment Pass / Immigration</option>
                    <option value="accounting">Accounting & Bookkeeping</option>
                    <option value="tax">Tax Compliance</option>
                    <option value="licensing">Business Licensing</option>
                    <option value="m&a">Buy & Sell Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2">Detailed Inquiry</label>
                  <textarea placeholder="Describe your business goals or compliance requirements..." className="w-full h-32 px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-gold outline-none font-medium resize-none transition-all"></textarea>
                </div>

                <button type="submit" className="w-full py-5 bg-navy-dark text-gold font-black rounded-xl hover:bg-black transition shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                  Send Professional Inquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Typical response time: Under 2 business hours</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Google Map */}
      <section className="h-[500px] w-full bg-slate-100 relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden border-t-8 border-gold">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.714524278385!2d101.71782231533158!3d3.1613580540679694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d1d26315ef%3A0x649b56360c6d9644!2zQsOtesOha29vcA!5e0!3m2!1sen!2smy!4v1711234567890!5m2!1sen!2smy" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Bizskoop Location"
        ></iframe>
        <div className="absolute bottom-8 left-8 z-10 hidden md:block">
          <div className="bg-navy-dark text-white p-6 rounded-2xl shadow-2xl border-b-4 border-gold">
            <h4 className="text-gold font-black text-xs uppercase tracking-widest mb-2">Visit Our Office</h4>
            <p className="text-xs font-medium leading-relaxed">Menara Binjai, Level 28<br/>Kuala Lumpur City Centre</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;