import React, { useState } from 'react';
import { 
  TrendingUp, Building, LineChart, Users, FileCheck, ShieldCheck, 
  ArrowRight, Briefcase, ChevronDown, ChevronUp, Download, CheckCircle, 
  X, Send, Activity, BarChart, Landmark, Globe, Calculator, Scale, Target 
} from 'lucide-react';

const IpoServices = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePlatformTab, setActivePlatformTab] = useState('NSE');
  const [activeRoadmapStep, setActiveRoadmapStep] = useState(1);

  // IPO Readiness Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Valuation Estimator State
  const [revenue, setRevenue] = useState(500000000); // 50 Cr
  const [margin, setMargin] = useState(15); // 15%
  const [peMultiple, setPeMultiple] = useState(20); // 20x PE

  // --- CALCULATOR MATH ---
  const netProfit = revenue * (margin / 100);
  const estimatedValuation = netProfit * peMultiple;
  const standardDilution = 0.25; // Standard 25% public float
  const estIssueSize = estimatedValuation * standardDilution;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- IPO READINESS LOGIC ---
  const handleQuiz = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
    setQuizStep(quizStep + 1);
  };
  const isEligible = quizAnswers.vintage === 'yes' && quizAnswers.profit === 'yes' && quizAnswers.networth === 'yes';

  // --- DATA ARRAYS ---
  const faqs = [
    { question: "What is the difference between BSE SME and NSE Emerge?", answer: "Both are dedicated platforms for SMEs to raise capital. While they have similar listing requirements (like 3-year track record and positive net worth), the choice depends on your sector, underwriter preference, and target investor base. We guide you on the optimal exchange." },
    { question: "How much capital can be raised through an SME IPO?", answer: "SME IPOs typically range from ₹10 Crore to ₹100 Crore. The exact issue size is determined during our valuation and structuring phase, based on your capital requirements and market appetite." },
    { question: "What is the typical timeline for an IPO?", answer: "The entire process, from the appointment of the merchant banker to the actual listing day, generally takes between 4 to 6 months, assuming all financial records and corporate governance structures are in order." },
    { question: "Do we need to change our corporate structure?", answer: "Yes, if you are a Private Limited Company or an LLP, you must convert into a Public Limited Company before filing the Draft Red Herring Prospectus (DRHP). We handle this entire conversion." }
  ];

  const roadmapDetails = {
    1: { phase: "Pre-IPO Structuring", desc: "We begin with corporate restructuring, optimizing capital structures, resolving legacy compliance issues, and converting private entities into Public Limited Companies.", icon: <Building className="w-8 h-8 text-finOrange" /> },
    2: { phase: "Due Diligence & DRHP", desc: "Rigorous legal and financial audits are conducted. We work with legal counsels to draft the comprehensive Draft Red Herring Prospectus (DRHP) detailing the business model, risks, and financials.", icon: <FileCheck className="w-8 h-8 text-finOrange" /> },
    3: { phase: "SEBI & Exchange Approvals", desc: "Filing documents with the exchange and SEBI. We handle the intense liaison process, responding to regulatory queries until final observations and in-principle approvals are secured.", icon: <ShieldCheck className="w-8 h-8 text-finOrange" /> },
    4: { phase: "Roadshows & Marketing", desc: "Crafting powerful pitch decks and organizing roadshows. We leverage our network to engage anchor investors, QIBs, and HNIs to build massive subscription demand before the issue opens.", icon: <Users className="w-8 h-8 text-finOrange" /> },
    5: { phase: "Listing & Bell Ringing", desc: "Finalizing the price band, opening the issue to the public, finalizing share allotment with the registrar, and executing the official listing ceremony on the stock exchange.", icon: <TrendingUp className="w-8 h-8 text-finOrange" /> }
  };

  const platforms = {
    NSE: { title: "NSE Emerge", desc: "The National Stock Exchange's dedicated platform for fast-growing SMEs. Known for high liquidity and strict governance norms.", capital: "Max Post-Issue Capital: ₹25 Crores", track: "Track Record: 3 Years Minimum", underwrite: "100% Underwritten (15% by Merchant Banker)" },
    BSE: { title: "BSE SME", desc: "Asia's first and largest SME platform by number of listed companies. Excellent for manufacturing and traditional businesses.", capital: "Max Post-Issue Capital: ₹25 Crores", track: "Track Record: 3 Years Minimum", underwrite: "100% Underwritten (15% by Merchant Banker)" },
    MAIN: { title: "Mainboard IPO", desc: "For large corporations seeking massive capital raises. Requires rigorous SEBI clearance and deep institutional participation.", capital: "Min Post-Issue Capital: ₹10 Crores (No Max limit)", track: "Track Record: 3 Years of robust profitability", underwrite: "SEBI ICDR Regulations Apply" }
  };

  return (
    <div className="bg-white relative">

      {/* --- ENHANCED CORPORATE CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Building className="w-5 h-5 mr-2"/> Book IPO Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Request Sent. Our Capital Markets team will contact you."); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Acme Corp Ltd." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="CEO / CFO" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
                <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="director@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Revenue</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                    <option>₹10 Cr - ₹50 Cr</option>
                    <option>₹50 Cr - ₹100 Cr</option>
                    <option>₹100 Cr+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Timeline</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                    <option>Next 6 Months</option>
                    <option>6 - 12 Months</option>
                    <option>1 - 2 Years</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-finOrange hover:bg-finOrange-dark text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Submit Request <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <TrendingUp className="w-96 h-96 -mt-10 -mr-10 animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-finOrange/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <Building className="w-5 h-5" />
              <span>Capital Markets Advisory</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Transforming Private Ambitions into <span className="text-finOrange">Public Success.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              End-to-end handholding for corporates aiming for public listing. We navigate the complexities of SEBI compliance, valuation, and investor outreach for a seamless IPO journey on NSE Emerge & BSE SME.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
                Evaluate Your IPO Readiness <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Exchange Badges */}
      <div className="bg-slate-900 text-white py-6 border-b-4 border-finOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700 items-center">
          <div className="p-2"><p className="text-lg font-bold text-gray-300 uppercase tracking-widest">Listing Platforms</p></div>
          <div className="p-2 flex justify-center items-center"><Target className="w-6 h-6 text-finOrange mr-2"/><p className="text-2xl font-extrabold text-white">NSE Emerge</p></div>
          <div className="p-2 flex justify-center items-center"><Target className="w-6 h-6 text-finOrange mr-2"/><p className="text-2xl font-extrabold text-white">BSE SME</p></div>
          <div className="p-2 flex justify-center items-center"><Globe className="w-6 h-6 text-finOrange mr-2"/><p className="text-2xl font-extrabold text-white">Mainboard</p></div>
        </div>
      </div>

      {/* 3. NEW: Advanced IPO Valuation Estimator */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Market Cap Simulator</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Estimate Your IPO Valuation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Input your company's financials to see a projected valuation and the capital you could raise assuming a standard 25% public dilution.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
              {/* Revenue Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Annual Revenue</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue">
                    {formatINR(revenue)}
                  </div>
                </div>
                <input 
                  type="range" min="100000000" max="5000000000" step="10000000" 
                  value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold">
                  <span>₹10 Cr</span><span>₹500 Cr</span>
                </div>
              </div>

              {/* Profit Margin Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Net Profit Margin (%)</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue">
                    {margin}%
                  </div>
                </div>
                <input 
                  type="range" min="5" max="40" step="1" 
                  value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
              </div>

              {/* PE Multiple Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Sector P/E Multiple</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finOrange">
                    {peMultiple}x
                  </div>
                </div>
                <input 
                  type="range" min="10" max="60" step="1" 
                  value={peMultiple} onChange={(e) => setPeMultiple(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
                <p className="text-xs text-gray-400 mt-2">Adjust based on your industry average.</p>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-1/2 bg-finBlue text-white relative overflow-hidden flex flex-col justify-center">
              <BarChart className="absolute top-0 right-0 w-64 h-64 opacity-5 -mt-10 -mr-10" />
              
              <div className="relative z-10 space-y-8">
                <div>
                  <p className="text-gray-400 font-bold text-sm uppercase mb-1">Calculated Net Profit</p>
                  <p className="text-2xl font-bold text-white">{formatINR(netProfit)}</p>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-finOrange font-bold text-sm tracking-widest uppercase mb-1">Estimated Company Valuation</p>
                  <p className="text-4xl font-extrabold text-white">{formatINR(estimatedValuation)}</p>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <p className="text-green-400 font-bold text-sm tracking-widest uppercase mb-1">Potential Capital Raise (25% Issue)</p>
                  <p className="text-3xl font-extrabold text-green-400">{formatINR(estIssueSize)}</p>
                  <p className="text-gray-400 text-xs mt-2 italic">*Estimates for illustrative purposes. Subject to SEBI valuation norms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW: Listing Platforms Comparison (Dynamic Tabs) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Listing Platforms Explained</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Understand the regulatory requirements for India's primary stock exchanges.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-white">
              {Object.keys(platforms).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActivePlatformTab(key)}
                  className={`flex-1 py-5 text-center font-bold text-lg transition-colors flex items-center justify-center ${activePlatformTab === key ? 'border-b-4 border-finOrange text-finBlue bg-slate-50' : 'text-gray-400 hover:bg-gray-50 border-b-4 border-transparent'}`}
                >
                  {platforms[key].title}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-finBlue mb-4">{platforms[activePlatformTab].title} Profile</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{platforms[activePlatformTab].desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                  <Scale className="w-8 h-8 text-finOrange mx-auto mb-4" />
                  <p className="font-bold text-finBlue">{platforms[activePlatformTab].capital}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                  <LineChart className="w-8 h-8 text-finOrange mx-auto mb-4" />
                  <p className="font-bold text-finBlue">{platforms[activePlatformTab].track}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                  <ShieldCheck className="w-8 h-8 text-finOrange mx-auto mb-4" />
                  <p className="font-bold text-finBlue">{platforms[activePlatformTab].underwrite}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive IPO Readiness Quiz */}
      <section className="py-24 bg-finBlue text-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Eligibility Scanner</span>
            <h2 className="text-3xl font-bold mb-4">Are You Ready to Go Public?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Take our 3-step assessment to see if your company meets the baseline regulatory criteria for an SME IPO.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden text-center max-w-3xl mx-auto text-finBlue">
            <div className="bg-slate-900 text-white p-6">
              <div className="flex justify-center space-x-2 mb-2">
                {[0, 1, 2].map((step) => (
                  <div key={step} className={`h-2 w-16 rounded-full ${quizStep >= step ? 'bg-finOrange' : 'bg-white/20'}`}></div>
                ))}
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-finOrange">Step {Math.min(quizStep + 1, 3)} of 3</p>
            </div>

            <div className="p-10 md:p-16">
              {quizStep === 0 && (
                <div className="animate-[fadeIn_0.5s_ease-in]">
                  <p className="text-2xl font-bold mb-8">Does your company have a track record of at least 3 years?</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleQuiz('vintage', 'yes')} className="bg-finOrange text-white px-10 py-4 rounded-lg font-bold hover:bg-finOrange-dark transition shadow-md">Yes</button>
                    <button onClick={() => handleQuiz('vintage', 'no')} className="bg-white border-2 border-finBlue px-10 py-4 rounded-lg font-bold hover:bg-slate-50 transition shadow-md">No</button>
                  </div>
                </div>
              )}
              
              {quizStep === 1 && (
                <div className="animate-[fadeIn_0.5s_ease-in]">
                  <p className="text-2xl font-bold mb-8">Do you have positive operating profits in at least 2 of the last 3 financial years?</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleQuiz('profit', 'yes')} className="bg-finOrange text-white px-10 py-4 rounded-lg font-bold hover:bg-finOrange-dark transition shadow-md">Yes</button>
                    <button onClick={() => handleQuiz('profit', 'no')} className="bg-white border-2 border-finBlue px-10 py-4 rounded-lg font-bold hover:bg-slate-50 transition shadow-md">No</button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="animate-[fadeIn_0.5s_ease-in]">
                  <p className="text-2xl font-bold mb-8">Is your company's post-issue paid-up capital projected to be less than ₹25 Crores?</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleQuiz('networth', 'yes')} className="bg-finOrange text-white px-10 py-4 rounded-lg font-bold hover:bg-finOrange-dark transition shadow-md">Yes</button>
                    <button onClick={() => handleQuiz('networth', 'no')} className="bg-white border-2 border-finBlue px-10 py-4 rounded-lg font-bold hover:bg-slate-50 transition shadow-md">No</button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="animate-[fadeIn_0.5s_ease-in]">
                  {isEligible ? (
                    <div>
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                      <h3 className="text-3xl font-extrabold mb-4">You Are Eligible!</h3>
                      <p className="text-gray-600 mb-8 text-lg">Your company meets the fundamental criteria for an SME IPO. It's time to start planning your capital raise.</p>
                      <button onClick={() => setIsModalOpen(true)} className="bg-finBlue text-white px-10 py-4 rounded-lg font-extrabold hover:bg-finBlue-light transition shadow-xl">Book Structuring Session</button>
                    </div>
                  ) : (
                    <div>
                      <Activity className="w-20 h-20 text-finOrange mx-auto mb-6" />
                      <h3 className="text-3xl font-extrabold mb-4">Let's Build a Roadmap.</h3>
                      <p className="text-gray-600 mb-8 text-lg">You may not meet all the immediate criteria, but our Pre-IPO Assessment can help restructure your business for a future listing.</p>
                      <button onClick={() => setIsModalOpen(true)} className="bg-finOrange text-white px-10 py-4 rounded-lg font-bold hover:bg-finOrange-dark transition shadow-xl">Consult Advisory Team</button>
                    </div>
                  )}
                  <button onClick={() => {setQuizStep(0); setQuizAnswers({});}} className="text-sm text-gray-400 mt-8 underline hover:text-finBlue block mx-auto">Retake Assessment</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW: Interactive IPO Journey Roadmap */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The Lifecycle</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">The Road to Listing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Click through the phases below to explore how we navigate the complex path to becoming a public company.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center">
            {/* Timeline selector */}
            <div className="lg:w-1/3 w-full space-y-4">
              {Object.keys(roadmapDetails).map((step) => (
                <button 
                  key={step}
                  onClick={() => setActiveRoadmapStep(parseInt(step))}
                  className={`w-full flex items-center p-4 rounded-xl font-bold transition-all border ${activeRoadmapStep === parseInt(step) ? 'bg-finBlue text-white border-finBlue shadow-lg translate-x-2' : 'bg-white text-gray-500 border-gray-200 hover:bg-slate-50'}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm ${activeRoadmapStep === parseInt(step) ? 'bg-finOrange text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step}
                  </span>
                  {roadmapDetails[step].phase}
                </button>
              ))}
            </div>

            {/* Dynamic Content Panel */}
            <div className="lg:w-2/3 w-full bg-slate-50 p-10 md:p-16 rounded-3xl border border-gray-200 shadow-sm min-h-[300px] flex items-center">
              <div className="animate-[fadeIn_0.3s_ease-in]">
                <div className="bg-white p-4 inline-block rounded-xl shadow-sm border border-gray-100 mb-6">
                  {roadmapDetails[activeRoadmapStep].icon}
                </div>
                <h3 className="text-3xl font-bold text-finBlue mb-4">Phase {activeRoadmapStep}: {roadmapDetails[activeRoadmapStep].phase}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {roadmapDetails[activeRoadmapStep].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose FIN5IVE Team Section */}
      <section className="py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The Advantage</span>
                <h2 className="text-3xl font-bold text-finBlue mb-6">Execution Excellence</h2>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                  Executing complex capital market transactions requires an elite team. We bring the industry's best minds directly to your boardroom.
                </p>
                
                <ul className="space-y-8">
                  <li className="flex items-start">
                    <div className="bg-slate-50 p-3 rounded-lg shadow-sm mr-6 border border-gray-100">
                      <Briefcase className="w-8 h-8 text-finBlue" />
                    </div>
                    <div>
                      <h4 className="text-finBlue font-bold text-lg">In-House Expertise</h4>
                      <p className="text-gray-600 mt-2 leading-relaxed">Led by highly qualified Chartered Accountants, Company Secretaries, and Corporate Lawyers ensuring bulletproof compliance.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-slate-50 p-3 rounded-lg shadow-sm mr-6 border border-gray-100">
                      <Users className="w-8 h-8 text-finOrange" />
                    </div>
                    <div>
                      <h4 className="text-finBlue font-bold text-lg">Marquee Network</h4>
                      <p className="text-gray-600 mt-2 leading-relaxed">Strong, direct association with marquee anchor investors, QIBs, and Ultra HNIs ensuring successful underwriting and subscription.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-finBlue relative hidden lg:block overflow-hidden">
                <BarChart className="absolute inset-0 w-full h-full text-white opacity-5 scale-150 translate-x-20 translate-y-20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl">
                    <p className="text-7xl font-extrabold text-white mb-2">25<span className="text-finOrange">+</span></p>
                    <p className="text-gray-300 font-bold tracking-widest uppercase">Years Experience</p>
                    <div className="w-16 h-1 bg-finOrange mx-auto mt-6 mb-6"></div>
                    <p className="text-white text-lg font-medium">Combined Leadership Expertise in Corporate Finance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clearing up common questions about going public.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-100 transition text-left"
                >
                  <span className="font-bold text-finBlue text-lg pr-4">{faq.question}</span>
                  {activeFaq === index ? <ChevronUp className="w-5 h-5 text-finOrange flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 py-6 border-t border-gray-200 bg-white' : 'max-h-0 py-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Lead Magnet: Download Brochure */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-gray-100">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-finBlue mb-2">Download the "Going Public" Playbook</h3>
              <p className="text-gray-600">Get a detailed PDF covering exact SEBI compliance checklists, estimated IPO costs, and the structuring roadmap.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <form className="flex w-full shadow-md rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Director Email" 
                  className="w-full md:w-64 px-6 py-4 border border-gray-300 focus:outline-none focus:border-finOrange bg-slate-50 text-gray-800"
                />
                <button className="bg-finOrange hover:bg-finOrange-dark text-white px-8 py-4 font-bold transition flex items-center whitespace-nowrap">
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

export default IpoServices;