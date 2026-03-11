import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Landmark, ArrowRight, CheckCircle2, FileText, 
  Briefcase, TrendingUp, DollarSign, ShieldCheck, X, Send, 
  ChevronDown, ChevronUp, Download, Building, Plane
} from 'lucide-react';
import toast from 'react-hot-toast';

const NriGiftCity = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeRouteTab, setActiveRouteTab] = useState('INBOUND');

  // --- DATA ARRAYS ---
  const benefits = [
    { title: "USD Denominated", desc: "Invest directly in foreign currencies like USD, avoiding INR depreciation risks.", icon: <DollarSign className="w-6 h-6 text-[#FF6600]" /> },
    { title: "Tax Efficiency", desc: "Massive tax exemptions including zero capital gains tax on specific structured products.", icon: <ShieldCheck className="w-6 h-6 text-[#FF6600]" /> },
    { title: "No FPI Required", desc: "Invest in Indian markets without the complex Foreign Portfolio Investor (FPI) registration.", icon: <FileText className="w-6 h-6 text-[#FF6600]" /> },
    { title: "Global Access", desc: "Access both high-yield Indian assets and global international funds from a single jurisdiction.", icon: <Globe className="w-6 h-6 text-[#FF6600]" /> }
  ];

  const investmentRoutes = {
    INBOUND: {
      title: "Inbound Investment",
      tagline: "Channeling foreign capital into India's growth.",
      desc: "Perfect for NRIs and foreign entities looking to invest in India-focused funds and financial products using foreign currency.",
      icon: <TrendingUp className="w-8 h-8 text-[#FF6600]" />,
      opportunities: [
        "AIFs investing in Indian Equities & Startups",
        "Portfolio Management Services (PMS)",
        "Credit Funds & Indian Corporate Debt",
        "Direct Indian Stock Market Access (Without FPI)"
      ]
    },
    OUTBOUND: {
      title: "Outbound Investment",
      tagline: "Investing globally from the Indian IFSC.",
      desc: "Designed for NRIs seeking exposure to international markets, tech monoliths, and global real estate through structured funds.",
      icon: <Globe className="w-8 h-8 text-[#003366]" />,
      opportunities: [
        "Global Mutual Funds & ETFs",
        "International Private Equity Funds",
        "US/EU Tech & Real Estate Funds",
        "Global Sovereign Bonds"
      ]
    }
  };

  const faqs = [
    { question: "What exactly is GIFT City IFSC?", answer: "GIFT City (Gujarat International Finance Tec-City) is India's first operational smart city and International Financial Services Centre (IFSC). It acts as a specialized jurisdiction allowing global investors and NRIs to access financial services in foreign currencies, complete with massive tax incentives." },
    { question: "Do I need an FPI license to invest in Indian stocks via GIFT City?", answer: "No. One of the biggest advantages of GIFT City for NRIs and foreign investors is that specific funds and structures allow you to bypass the complex FPI (Foreign Portfolio Investor) registration process while still gaining exposure to Indian equities." },
    { question: "Can I remit funds directly from my foreign bank account?", answer: "Yes, investments into GIFT City IFSC can be made directly in foreign currencies (like USD, GBP, EUR) from your overseas bank account without needing to convert to INR, completely avoiding currency fluctuation risks during the transfer." },
    { question: "Are the returns from GIFT City taxable in India?", answer: "GIFT City offers a highly tax-efficient structure. Depending on the product, there are often 100% tax exemptions on capital gains and business income for specific periods. However, tax implications in your country of residence (DTAA) will still apply." }
  ];

  const documentation = [
    "Valid Passport (Front & Back)",
    "Overseas Address Proof (Utility bill, bank statement)",
    "Foreign Bank Account Confirmation",
    "National ID or Driving License of the residing country",
    "FATCA / CRS Declarations"
  ];

  return (
    <div className="bg-white font-sans relative overflow-hidden">
      
      {/* --- NRI GIFT CITY CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Landmark className="w-5 h-5 mr-2"/> GIFT City Consultation</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. Our IFSC Desk will contact you shortly."); 
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="Last Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="e.g. USA, UAE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (w/ Code)</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Interest</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Inbound Funds (Investing in India)</option>
                  <option>Outbound Funds (Global Markets)</option>
                  <option>Setting up a Corporate Entity in IFSC</option>
                  <option>General GIFT City Inquiry</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition shadow-lg">
                Schedule Call <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <section className="relative bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <Landmark className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Globe className="w-4 h-4" />
            <span>Offshore Advantage</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            GIFT City <span className="text-[#FF6600]">Products.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            India’s International Financial Services Centre (IFSC) allows global investors and NRIs to access world-class financial services in foreign currency, completely tax-optimized.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex justify-center items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
              Explore Opportunities <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key Benefits Grid */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Why GIFT City?</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">The Offshore Edge for NRIs</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Operate within India's borders but outside its domestic financial regulations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Investment Routes (Tabs) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Investment Routes</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Whether you want to invest back into India or access global markets, GIFT City offers a structured path.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-slate-50 border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-white">
              {Object.keys(investmentRoutes).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveRouteTab(key)}
                  className={`flex-1 py-6 px-4 text-center font-bold text-lg transition-colors flex items-center justify-center gap-3 ${activeRouteTab === key ? 'border-b-4 border-[#FF6600] text-[#003366] bg-slate-50 shadow-inner' : 'text-gray-400 hover:bg-gray-50 border-b-4 border-transparent'}`}
                >
                  <div className={`${activeRouteTab === key ? 'text-[#FF6600]' : 'text-gray-400'}`}>
                    {investmentRoutes[key].icon}
                  </div>
                  {investmentRoutes[key].title}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-black text-[#003366] mb-2">{investmentRoutes[activeRouteTab].title}</h3>
                  <p className="text-[#FF6600] font-bold uppercase tracking-wider text-sm mb-6">{investmentRoutes[activeRouteTab].tagline}</p>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{investmentRoutes[activeRouteTab].desc}</p>
                  <button onClick={() => setIsModalOpen(true)} className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-md">
                    Discuss this Route
                  </button>
                </div>
                
                <div className="lg:w-1/2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
                  <h4 className="font-bold text-[#003366] mb-6 text-lg border-b border-gray-100 pb-4">Available Structures:</h4>
                  <ul className="space-y-4">
                    {investmentRoutes[activeRouteTab].opportunities.map((opp, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Documentation & How We Help (Split) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Documentation */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-[#003366]" />
              </div>
              <h2 className="text-2xl font-black text-[#003366] mb-6">Basic Documentation Setup</h2>
              <p className="text-gray-500 mb-8">Opening an account in the IFSC jurisdiction requires minimal hassle for NRIs. Keep these ready:</p>
              <ul className="space-y-4">
                {documentation.map((doc, index) => (
                  <li key={index} className="flex items-center text-gray-700 font-bold bg-slate-50 p-4 rounded-xl border border-gray-100">
                    <div className="w-2.5 h-2.5 bg-[#FF6600] rounded-full mr-4"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* How FIN5IVE Helps */}
            <div className="bg-[#003366] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
              <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Briefcase className="w-8 h-8 text-[#FF6600]" />
                </div>
                <h2 className="text-2xl font-black mb-6">How FIN5IVE Helps</h2>
                <p className="text-blue-100 mb-8">We provide a white-glove onboarding experience to navigate the IFSC regulations smoothly.</p>
                <div className="space-y-5">
                  {[
                    "Investment advisory and product selection",
                    "Onboarding and documentation support",
                    "Regulatory guidance and compliance",
                    "Access to curated global investment opportunities"
                  ].map((help, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-[#FF6600] mr-4 flex-shrink-0" />
                      <span className="font-medium text-lg">{help}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on IFSC regulations and operations.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full flex justify-between items-center p-6 md:p-8 transition text-left ${activeFaq === index ? 'bg-white' : 'hover:bg-gray-100'}`}
                >
                  <span className={`font-bold text-lg pr-4 ${activeFaq === index ? 'text-[#FF6600]' : 'text-[#003366]'}`}>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'bg-orange-100 rotate-180' : 'bg-white shadow-sm rotate-0'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#FF6600]' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div 
                  className="transition-all duration-500 ease-in-out overflow-hidden bg-white"
                  style={{ maxHeight: activeFaq === index ? '300px' : '0', opacity: activeFaq === index ? 1 : 0 }}
                >
                  <p className="text-gray-600 font-medium leading-relaxed p-6 md:p-8 pt-0 border-t border-gray-50">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Lead Magnet: Download Guide */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <Plane className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The GIFT City Investment Guide</h3>
              <p className="text-gray-300">Download our comprehensive PDF breaking down exact tax benefits, fund structures, and onboarding steps for NRIs.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-xl overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Guide sent to your email!', { icon: '📘' });
              }}>
                <input 
                  type="email" 
                  required
                  placeholder="Your Email Address" 
                  className="w-full md:w-64 px-6 py-4 border-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-gray-800"
                />
                <button type="submit" className="bg-[#FF6600] hover:bg-[#e55c00] text-white px-8 py-4 font-bold transition flex items-center whitespace-nowrap">
                  <Download className="w-5 h-5 mr-2" /> Get PDF
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NriGiftCity;