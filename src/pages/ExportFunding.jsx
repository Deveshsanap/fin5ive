import React, { useState } from 'react';
import { 
  Plane, Clock, DollarSign, Globe, CheckCircle, ArrowRight, 
  ShieldCheck, FileText, Calculator, X, Send, ChevronDown, ChevronUp, 
  Download, FileSearch, Anchor, Activity, Building, Briefcase, Award
} from 'lucide-react';

const ExportFunding = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState('TEXTILE');
  
  // 1. Advanced Calculator State
  const [currency, setCurrency] = useState('USD');
  const [invoiceValue, setInvoiceValue] = useState(100000); // 100k Default
  const [feeRate, setFeeRate] = useState(1.5); // 1.5% per month
  const [creditDays, setCreditDays] = useState(60); // 60 Days

  // 2. Eligibility Checker State
  const [eligibilityStep, setEligibilityStep] = useState(0);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});

  // --- CALCULATOR MATH ---
  const advanceRate = 0.80; // 80% Advance
  
  const dayZeroAdvance = invoiceValue * advanceRate;
  const timeInMonths = creditDays / 30;
  const totalFactoringFee = invoiceValue * (feeRate / 100) * timeInMonths;
  const daySixtyBalance = (invoiceValue * (1 - advanceRate)) - totalFactoringFee;

  // Formatter based on selected currency
  const formatCurrency = (value) => {
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
      INR: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
    };
    return formatters[currency].format(value);
  };

  // --- ELIGIBILITY CHECKER LOGIC ---
  const handleEligibility = (questionId, answer) => {
    setEligibilityAnswers({ ...eligibilityAnswers, [questionId]: answer });
    setEligibilityStep(eligibilityStep + 1);
  };

  const isEligible = eligibilityAnswers.turnover === 'yes' && eligibilityAnswers.vintage === 'yes' && eligibilityAnswers.b2b === 'yes';

  // --- DATA ARRAYS ---
  const faqs = [
    { question: "Do you offer Recourse or Non-Recourse factoring?", answer: "We arrange both depending on the buyer's credit profile and the geography. Non-recourse factoring protects you against buyer bankruptcy, offering true peace of mind." },
    { question: "Which countries and jurisdictions do you support?", answer: "We support exports to over 100+ countries, covering major markets in North America, Europe, the Middle East, and Asia. We generally avoid sanctioned or high-risk FATF jurisdictions." },
    { question: "Will this affect my existing bank credit limits (CC/OD)?", answer: "No. Export factoring is structured as an off-balance-sheet transaction or bill discounting that typically does not interfere with your existing domestic bank collateral or working capital limits." },
    { question: "What happens if the buyer pays late?", answer: "Depending on the agreement terms, a small grace period is usually allowed. If the delay extends significantly, standard penal interest may apply, which is deducted from the final 20% balance." }
  ];

  const industries = {
    TEXTILE: { title: "Textiles & Garments", desc: "Unlock liquidity tied up in seasonal apparel shipments to major US and EU retail chains.", icon: <Award className="w-12 h-12 text-finOrange" /> },
    AGRI: { title: "Agri-Commodities", desc: "Fast funding for non-perishable spices, grains, and processed foods with strict quality compliance.", icon: <Globe className="w-12 h-12 text-finOrange" /> },
    PHARMA: { title: "Pharmaceuticals", desc: "Finance API and formulation exports to global distributors while managing extended payment cycles.", icon: <ShieldCheck className="w-12 h-12 text-finOrange" /> },
    ENG: { title: "Engineering Goods", desc: "Maintain cash flow while awaiting payments for heavy machinery and auto-components.", icon: <Building className="w-12 h-12 text-finOrange" /> }
  };

  return (
    <div className="bg-white relative">

      {/* --- ENHANCED APPLICATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Plane className="w-5 h-5 mr-2"/> Apply for Export Finance</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Application Initiated!"); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Global Exports Ltd." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IEC Code (Import Export Code)</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="0123456789" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
                <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="finance@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                    <option>₹2 Cr - ₹10 Cr</option>
                    <option>₹10 Cr - ₹50 Cr</option>
                    <option>₹50 Cr+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Invoice Value</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="$50,000" />
                </div>
              </div>
              <button type="submit" className="w-full bg-finOrange hover:bg-finOrange-dark text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Submit Factoring Request <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Globe className="w-96 h-96 -mt-20 -mr-20 animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-finOrange/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <Plane className="w-5 h-5" />
              <span>Cross-Border Trade Finance</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Bridge Your Credit Gap in <span className="text-finOrange">Less Than 24 Hours.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Empowering exporters with collateral-free working capital up to ₹20 Crore. We finance your invoices so you can accelerate your global supply chain without waiting 90 days for payment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
                Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <section className="-mt-12 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Credit Limit", value: "Up to ₹20 Cr", icon: <DollarSign className="w-6 h-6 text-finBlue" /> },
            { title: "Disbursal Time", value: "< 24 Hours", icon: <Clock className="w-6 h-6 text-finBlue" /> },
            { title: "Requirement", value: "Collateral-Free", icon: <ShieldCheck className="w-6 h-6 text-finBlue" /> },
            { title: "Global Reach", value: "100+ Countries", icon: <Globe className="w-6 h-6 text-finBlue" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition duration-300">
              <div className="bg-slate-50 p-3 rounded-full mb-4">
                {stat.icon}
              </div>
              <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wide">{stat.title}</p>
              <p className="text-xl md:text-2xl font-extrabold text-finBlue mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NEW: Advanced Multi-Currency Factoring Calculator */}
      <section className="py-24 bg-slate-50 border-b border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Liquidity Simulator</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Advanced Factoring Calculator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Calculate your exact day-zero liquidity and final balance across multiple currencies based on your buyer's credit period.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-200">
              
              {/* Currency Selector */}
              <div className="flex space-x-2 mb-8">
                {['USD', 'EUR', 'GBP', 'INR'].map(curr => (
                  <button 
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`flex-1 py-2 rounded-lg font-bold transition-colors ${currency === curr ? 'bg-finBlue text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Invoice Value Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Invoice Value</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue">
                    {formatCurrency(invoiceValue)}
                  </div>
                </div>
                <input 
                  type="range" 
                  min={currency === 'INR' ? 1000000 : 10000} 
                  max={currency === 'INR' ? 100000000 : 1000000} 
                  step={currency === 'INR' ? 100000 : 5000} 
                  value={invoiceValue} onChange={(e) => setInvoiceValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Credit Period Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Credit Period</label>
                    <span className="font-bold text-finBlue bg-slate-50 px-2 py-1 border rounded">{creditDays} Days</span>
                  </div>
                  <input 
                    type="range" min="30" max="120" step="15" 
                    value={creditDays} onChange={(e) => setCreditDays(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finBlue"
                  />
                </div>

                {/* Factoring Fee Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Est. Fee/Month</label>
                    <span className="font-bold text-finOrange bg-orange-50 px-2 py-1 border border-orange-100 rounded">{feeRate}%</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="3.0" step="0.1" 
                    value={feeRate} onChange={(e) => setFeeRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                  />
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-2/5 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-green-400 font-bold text-sm tracking-widest uppercase mb-1">Advance Disbursed (80%)</p>
                  <p className="text-4xl font-extrabold text-white">{formatCurrency(dayZeroAdvance)}</p>
                  <p className="text-gray-400 text-xs mt-1">Credited within 24 hours.</p>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span>Invoice Balance (20%)</span>
                    <span>{formatCurrency(invoiceValue * 0.20)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4 text-red-400">
                    <span>Est. Factoring Fee Deduction</span>
                    <span>- {formatCurrency(totalFactoringFee)}</span>
                  </div>
                  
                  <p className="text-finOrange font-bold text-sm tracking-widest uppercase mb-1">Final Payment to You</p>
                  <p className="text-3xl font-extrabold text-white">{formatCurrency(daySixtyBalance)}</p>
                  <p className="text-gray-400 text-xs mt-1">Paid on Day {creditDays}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW: Interactive Eligibility Checker Quiz */}
      <section className="py-20 bg-finBlue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Do You Qualify for Funding?</h2>
          
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-md">
            {eligibilityStep === 0 && (
              <div className="animate-[fadeIn_0.5s_ease-in]">
                <p className="text-xl mb-6">Does your company have an annual export turnover of over ₹2 Crore?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleEligibility('turnover', 'yes')} className="bg-finOrange px-8 py-3 rounded font-bold hover:bg-finOrange-light transition">Yes</button>
                  <button onClick={() => handleEligibility('turnover', 'no')} className="bg-transparent border border-white px-8 py-3 rounded font-bold hover:bg-white/10 transition">No</button>
                </div>
              </div>
            )}
            
            {eligibilityStep === 1 && (
              <div className="animate-[fadeIn_0.5s_ease-in]">
                <p className="text-xl mb-6">Has your business been operating for more than 3 years?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleEligibility('vintage', 'yes')} className="bg-finOrange px-8 py-3 rounded font-bold hover:bg-finOrange-light transition">Yes</button>
                  <button onClick={() => handleEligibility('vintage', 'no')} className="bg-transparent border border-white px-8 py-3 rounded font-bold hover:bg-white/10 transition">No</button>
                </div>
              </div>
            )}

            {eligibilityStep === 2 && (
              <div className="animate-[fadeIn_0.5s_ease-in]">
                <p className="text-xl mb-6">Are you exporting primarily B2B (Business to Business)?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleEligibility('b2b', 'yes')} className="bg-finOrange px-8 py-3 rounded font-bold hover:bg-finOrange-light transition">Yes</button>
                  <button onClick={() => handleEligibility('b2b', 'no')} className="bg-transparent border border-white px-8 py-3 rounded font-bold hover:bg-white/10 transition">No</button>
                </div>
              </div>
            )}

            {eligibilityStep === 3 && (
              <div className="animate-[fadeIn_0.5s_ease-in]">
                {isEligible ? (
                  <div>
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-green-400">You Are Pre-Qualified!</h3>
                    <p className="text-gray-300 mb-6">Based on your answers, you are highly likely to secure working capital.</p>
                    <button onClick={() => setIsModalOpen(true)} className="bg-white text-finBlue px-8 py-3 rounded-lg font-extrabold hover:bg-gray-100 transition shadow-lg">Start Your Application</button>
                  </div>
                ) : (
                  <div>
                    <Activity className="w-16 h-16 text-finOrange mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Let's Talk.</h3>
                    <p className="text-gray-300 mb-6">You might not meet standard criteria, but we have structured solutions for complex cases.</p>
                    <button onClick={() => setIsModalOpen(true)} className="bg-finOrange px-8 py-3 rounded-lg font-bold hover:bg-finOrange-light transition shadow-lg">Contact Advisory Team</button>
                  </div>
                )}
                <button onClick={() => {setEligibilityStep(0); setEligibilityAnswers({});}} className="text-sm text-gray-400 mt-6 underline hover:text-white">Retake Assessment</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. NEW: Industries We Fund (Dynamic Tabs) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Industries We Fund</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our factoring solutions are optimized for the unique supply chain demands of India's major export sectors.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            <div className="md:w-1/3 flex flex-col space-y-2">
              {Object.keys(industries).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveIndustry(key)}
                  className={`p-4 text-left font-bold rounded-lg transition-all ${activeIndustry === key ? 'bg-finOrange text-white shadow-md' : 'bg-slate-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {industries[key].title}
                </button>
              ))}
            </div>
            <div className="md:w-2/3 bg-slate-50 rounded-2xl p-10 border border-gray-200 flex items-center shadow-inner">
              <div className="flex-1">
                {industries[activeIndustry].icon}
                <h3 className="text-2xl font-bold text-finBlue mt-6 mb-3">{industries[activeIndustry].title} Focus</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{industries[activeIndustry].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clearing up common questions about cross-border factoring.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition text-left"
                >
                  <span className="font-bold text-finBlue text-lg pr-4">{faq.question}</span>
                  {activeFaq === index ? <ChevronUp className="w-5 h-5 text-finOrange flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 py-6 border-t border-gray-100' : 'max-h-0 py-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Lead Magnet: Download Brochure */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-finBlue rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <Anchor className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Download the Export Finance Guide</h3>
              <p className="text-gray-300">Get a detailed PDF covering the complete pricing matrix, eligible countries list, and legal structuring for export factoring.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Corporate Email" 
                  className="w-full md:w-64 px-4 py-4 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-finOrange text-gray-800"
                />
                <button className="bg-finOrange hover:bg-finOrange-dark text-white px-6 py-4 rounded-r-lg font-bold transition flex items-center whitespace-nowrap">
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

export default ExportFunding;