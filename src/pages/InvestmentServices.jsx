import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, ShieldCheck, Globe, Building2, Award, Briefcase, 
  ArrowRight, CheckCircle, PieChart, Target, BarChart, X, Send, 
  ChevronDown, ChevronUp, Download, Mail, Activity, Landmark, LineChart, Wallet
} from 'lucide-react';
import toast from 'react-hot-toast';

const InvestmentServices = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('MUTUAL_FUNDS');
  const [activeFaq, setActiveFaq] = useState(null);

  // Calculator State
  const [investmentAmount, setInvestmentAmount] = useState(10000000); // 1 Crore Default
  const [timeHorizon, setTimeHorizon] = useState(10); // 10 Years
  const [riskProfile, setRiskProfile] = useState('BALANCED'); // CONSERVATIVE, BALANCED, AGGRESSIVE

  // --- CALCULATOR MATH & PROFILES ---
  const profiles = {
    CONSERVATIVE: { return: 8, equity: 20, debt: 70, gold: 10 },
    BALANCED: { return: 12, equity: 60, debt: 30, gold: 10 },
    AGGRESSIVE: { return: 15, equity: 85, debt: 10, gold: 5 }
  };

  const currentProfile = profiles[riskProfile];
  const rate = currentProfile.return / 100;
  const projectedWealth = investmentAmount * Math.pow(1 + rate, timeHorizon);
  const wealthGained = projectedWealth - investmentAmount;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS (Updated from Client Screenshots & WhatsApp) ---
  const investmentCategories = {
    MUTUAL_FUNDS: {
      label: 'Mutual Funds',
      icon: <PieChart className="w-6 h-6" />,
      title: "Diversified & Professionally Managed",
      desc: "Mutual funds offer a diversified and professionally managed investment option for investors seeking exposure to equity, debt, or hybrid instruments. At FIN5IVE, we carefully analyze market trends to build the perfect portfolio.",
      offerings: [
        { title: "Equity Mutual Funds", desc: "Invest in high-growth stocks to generate long-term capital appreciation." },
        { title: "Debt Mutual Funds", desc: "Focus on stability and fixed income generation through government and corporate bonds." },
        { title: "Hybrid Funds", desc: "A balanced mix of equity and debt for risk mitigation and steady returns." },
        { title: "Tax-Saving ELSS Funds", desc: "Maximize wealth creation while enjoying tax benefits under Section 80C." }
      ]
    },
    EQUITY: {
      label: 'Direct Equity',
      icon: <LineChart className="w-6 h-6" />,
      title: "Participate in India's Growth Story",
      desc: "Equity investments provide an opportunity for investors to participate in the growth of companies and generate wealth over the long term. We help clients navigate the markets with expert insights and data-driven strategies.",
      offerings: [
        { title: "Large-Cap Equity", desc: "Invest in well-established, financially strong companies with a track record of stability and steady growth." },
        { title: "Mid-Cap Equity", desc: "Gain exposure to medium-sized companies with high growth potential, offering a balance between risk and reward." },
        { title: "Small-Cap & Thematic", desc: "Target emerging companies, specific industries, or trends like technology and infrastructure for strategic diversification." },
        { title: "Multi-Cap Equity", desc: "A dynamic investment approach that allocates capital across large, mid, and small-cap stocks for diversified growth." }
      ]
    },
    FIXED_INCOME: {
      label: 'Fixed Income',
      icon: <Landmark className="w-6 h-6" />,
      title: "Stable Returns, Lower Risk",
      desc: "For investors looking for stable returns with lower risk, our fixed income solutions include highly rated bonds and corporate fixed deposits.",
      offerings: [
        { title: "Government Bonds", desc: "Secure investments with sovereign guarantees for maximum capital protection." },
        { title: "Tax-Free Bonds", desc: "Investments that provide completely tax-free interest income." },
        { title: "Corporate Bonds", desc: "High-yield debt instruments issued by reputable, fundamentally strong companies." },
        { title: "Fixed Deposits", desc: "Safe and predictable returns through trusted bank and corporate FDs." }
      ]
    },
    NPS: {
      label: 'NPS (Pension)',
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "National Pension System",
      desc: "The National Pension System is a government-regulated retirement savings scheme designed to help individuals build a secure financial future after retirement. It allows investors to contribute regularly to a pension account which is invested in a diversified portfolio.",
      offerings: [
        { title: "Market-Linked Returns", desc: "Long-term retirement planning with flexible asset allocation across equity, corporate debt, and government securities." },
        { title: "Tax Benefits", desc: "Enjoy tax benefits under Section 80C and an additional exclusive deduction under Section 80CCD(1B)." },
        { title: "Low-Cost Structure", desc: "Benefit from one of the lowest-cost investment structures available in the financial market." },
        { title: "How FIN5IVE Helps", desc: "We guide you on option selection, account opening, portfolio allocation, and provide ongoing advisory support." }
      ]
    }
  };

  const faqs = [
    { question: "What is the minimum portfolio size you manage?", answer: "While we advise clients across various wealth brackets, our specialized services like PMS require a regulatory minimum of ₹50 Lakhs, and AIFs require a minimum commitment of ₹1 Crore." },
    { question: "Are your investment recommendations biased towards specific AMCs?", answer: "Absolutely not. As NISM-certified professionals, we operate on an open-architecture platform. Our recommendations are purely data-driven, unbiased, and aligned solely with your risk-return profile." },
    { question: "Do you assist NRIs with wealth management in India?", answer: "Yes, NRI wealth management is one of our core pillars. We handle NRE/NRO investments, FEMA compliance, and repatriation strategies alongside portfolio management." },
    { question: "How frequently is my portfolio reviewed?", answer: "We provide real-time dashboard access to your investments. Formal portfolio reviews are conducted quarterly or semi-annually, depending on market volatility and client preference." }
  ];

  return (
    <div className="bg-white relative font-sans">

      {/* --- HNI CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Target className="w-5 h-5 mr-2"/> Wealth Consultation</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. An advisor will contact you shortly."); 
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investor Profile</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Resident Indian (HNI)</option>
                  <option>Non-Resident Indian (NRI)</option>
                  <option>Corporate Treasury</option>
                  <option>Family Office</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Class of Interest</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Mutual Funds & SIPs</option>
                  <option>Direct Equity / PMS</option>
                  <option>Fixed Income & Bonds</option>
                  <option>NPS / Retirement Planning</option>
                  <option>Comprehensive Portfolio Review</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition shadow-lg">
                Request Callback <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <section className="relative bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <TrendingUp className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Wallet className="w-4 h-4" />
            <span>Private Wealth Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            Strategic Investments. <br className="hidden md:block" />
            <span className="text-[#FF6600]">Exceptional Growth.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            From high-growth equity markets to tax-efficient retirement systems like NPS, our open-architecture approach ensures your capital is deployed exactly where it performs best.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
            Build Your Portfolio <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Animated AMC Partners Marquee */}
      <section className="py-8 bg-slate-50 border-b border-gray-100 overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mr-8 whitespace-nowrap hidden md:block">
            Empanelled With Top AMCs
          </p>
          <div className="flex overflow-hidden relative w-full">
            <div className="animate-[marquee_30s_linear_infinite] whitespace-nowrap flex space-x-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
              {['HDFC', 'SBI', 'ICICI Prudential', 'Tata', 'Kotak', 'Nippon India', 'Axis', 'Mirae Asset', 'DSP', 'Franklin Templeton'].map((amc, i) => (
                <span key={i} className="text-xl font-bold text-[#003366] tracking-tight">{amc} Mutual Fund</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio Modeler (Dynamic Asset Allocation Simulator) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Portfolio Modeler</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Project Your Wealth Creation</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Select a risk profile to see the optimal asset mix and calculate the compounding effect on your Lumpsum investment over time.</p>
          </div>

          <div className="bg-slate-50 rounded-[3rem] shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-200">
              
              {/* Risk Profile Selector */}
              <div className="mb-10">
                <label className="font-bold text-[#003366] text-sm mb-4 block">Select Risk Profile</label>
                <div className="grid grid-cols-3 gap-2">
                  {['CONSERVATIVE', 'BALANCED', 'AGGRESSIVE'].map(profile => (
                    <button 
                      key={profile}
                      onClick={() => setRiskProfile(profile)}
                      className={`py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${riskProfile === profile ? 'bg-[#003366] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {profile}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-[#003366]">Initial Investment</label>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                      {formatINR(investmentAmount)}
                    </div>
                  </div>
                  <input 
                    type="range" min="1000000" max="500000000" step="1000000" 
                    value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                    <span>₹10L</span><span>₹50Cr</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-[#003366]">Time Horizon (Years)</label>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                      {timeHorizon} Years
                    </div>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="1" 
                    value={timeHorizon} onChange={(e) => setTimeHorizon(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white relative flex flex-col justify-center">
              <Activity className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-gray-300 font-bold tracking-widest uppercase text-xs mb-6">Suggested Asset Mix</h3>
                
                {/* Visual Asset Allocation Bar */}
                <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-gray-700">
                  <div style={{width: `${currentProfile.equity}%`}} className="bg-[#FF6600] h-full" title={`Equity: ${currentProfile.equity}%`}></div>
                  <div style={{width: `${currentProfile.debt}%`}} className="bg-blue-400 h-full" title={`Debt: ${currentProfile.debt}%`}></div>
                  <div style={{width: `${currentProfile.gold}%`}} className="bg-yellow-400 h-full" title={`Gold/Alts: ${currentProfile.gold}%`}></div>
                </div>
                
                <div className="flex justify-between text-xs mb-8 text-gray-300 font-medium">
                  <span className="flex items-center"><span className="w-2 h-2 bg-[#FF6600] rounded-full mr-1"></span> Equity ({currentProfile.equity}%)</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span> Debt ({currentProfile.debt}%)</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span> Gold ({currentProfile.gold}%)</span>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Est. CAGR (Historical)</span>
                    <span className="font-bold text-[#FF6600]">{currentProfile.return}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Wealth Gained</span>
                    <span className="font-bold text-green-400">+{formatINR(wealthGained)}</span>
                  </div>
                  <div className="pt-4">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Projected Future Value</p>
                    <p className="text-4xl font-extrabold text-white tracking-tight">{formatINR(projectedWealth)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Investment Offerings (Dynamic Tabs - Updated) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Our Investment Offerings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Comprehensive financial products structured to navigate market cycles and generate alpha.</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-slate-50 overflow-x-auto custom-scrollbar">
              {Object.keys(investmentCategories).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-5 px-4 text-center font-bold text-sm md:text-base transition-colors flex flex-col items-center justify-center gap-2 min-w-[120px] ${activeTab === key ? 'border-b-4 border-[#FF6600] text-[#003366] bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 border-b-4 border-transparent'}`}
                >
                  <div className={`${activeTab === key ? 'text-[#FF6600]' : 'text-gray-400'}`}>
                    {investmentCategories[key].icon}
                  </div>
                  <span className="whitespace-nowrap">{investmentCategories[key].label}</span>
                </button>
              ))}
            </div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-5/12">
                  <h3 className="text-3xl font-black text-[#003366] mb-4 leading-tight">{investmentCategories[activeTab].title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{investmentCategories[activeTab].desc}</p>
                  <button onClick={() => setIsModalOpen(true)} className="text-[#FF6600] font-bold flex items-center hover:text-[#e55c00] transition text-lg">
                    Consult our Experts <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
                
                <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {investmentCategories[activeTab].offerings.map((item, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-[#FF6600] mr-2 flex-shrink-0" />
                        <h4 className="font-bold text-[#003366]">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AIF / Global Funds Split (Maintained for HNI appeal) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Exclusive Structures</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Alternative Investment Funds (AIF)</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Exclusive access to high-yield, structured fund opportunities across global and domestic markets for UHNIs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Outbound Funds */}
            <div className="bg-[#003366] text-white rounded-[2.5rem] p-10 md:p-12 shadow-xl relative overflow-hidden group hover:shadow-2xl transition">
              <Globe className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mt-10 -mr-10 group-hover:scale-110 transition duration-700 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 flex items-center">
                  <Globe className="w-8 h-8 text-[#FF6600] mr-3" />
                  Outbound Funds
                </h3>
                <p className="text-blue-100 mb-8 leading-relaxed text-lg">Tap into Global Growth Themes with our Category III Close-Ended AIF structures. Access tech monoliths and emerging global sectors.</p>
                <div className="space-y-4">
                  <p className="font-bold text-[#FF6600] uppercase text-sm tracking-wider">Exposure Themes:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Semiconductors', 'Defence Tech', 'Disruptive Materials', 'AI', 'Blockchain'].map((tag, i) => (
                      <span key={i} className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inbound Funds */}
            <div className="bg-slate-50 border border-gray-200 rounded-[2.5rem] p-10 md:p-12 shadow-sm relative overflow-hidden group hover:shadow-lg transition">
              <TrendingUp className="absolute top-0 right-0 w-64 h-64 text-[#003366] opacity-5 -mt-10 -mr-10 group-hover:scale-110 transition duration-700 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-[#003366] mb-4 flex items-center">
                  <TrendingUp className="w-8 h-8 text-[#003366] mr-3" />
                  Inbound Funds
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">Participate directly in the India Growth Story through our Category III Open-Ended AIFs. Optimized for foreign and NRI capital.</p>
                <div className="space-y-4">
                  <p className="font-bold text-[#003366] uppercase text-sm tracking-wider">Target Investors:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['NRIs', 'Foreign Corporates', 'Domestic HNIs', 'Family Offices'].map((tag, i) => (
                      <span key={i} className="bg-blue-50 text-[#003366] px-4 py-2 rounded-full text-sm font-bold border border-blue-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Professional Credentials Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Certified & Regulated Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Your wealth is managed by highly qualified professionals holding rigorous regulatory certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "NISM Series V-A", desc: "Certified Mutual Fund Distributors for optimal scheme selection.", icon: <Award className="w-8 h-8 text-[#FF6600]" /> },
              { title: "NISM Series XXI-A", desc: "Specialized in Portfolio Management Services (PMS).", icon: <Briefcase className="w-8 h-8 text-[#FF6600]" /> },
              { title: "NISM Series XIII", desc: "Certified expertise in the derivatives market for risk management.", icon: <TrendingUp className="w-8 h-8 text-[#FF6600]" /> },
              { title: "RERA Certified", desc: "Registered real estate agents ensuring transparent property investments.", icon: <Building2 className="w-8 h-8 text-[#FF6600]" /> }
            ].map((cert, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition duration-300 text-center">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on our wealth management processes.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full flex justify-between items-center p-6 md:p-8 transition text-left ${activeFaq === index ? 'bg-slate-50' : 'hover:bg-gray-50'}`}
                >
                  <span className={`font-bold text-lg pr-4 ${activeFaq === index ? 'text-[#FF6600]' : 'text-[#003366]'}`}>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'bg-orange-100 rotate-180' : 'bg-slate-100 rotate-0'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#FF6600]' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div 
                  className="transition-all duration-500 ease-in-out overflow-hidden bg-white"
                  style={{ maxHeight: activeFaq === index ? '200px' : '0', opacity: activeFaq === index ? 1 : 0 }}
                >
                  <p className="text-gray-600 font-medium leading-relaxed p-6 md:p-8 pt-0 border-t border-gray-100">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Magnet: Market Outlook PDF */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <Landmark className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get Our Q3 Market Strategy Report</h3>
              <p className="text-gray-300">Subscribe to our HNI newsletter to receive exclusive insights on upcoming AIF launches, market valuations, and asset allocation strategies.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-lg overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Subscribed successfully!', { icon: '📈' });
              }}>
                <input 
                  type="email" 
                  required
                  placeholder="Your Email Address" 
                  className="w-full md:w-64 px-6 py-4 border-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-gray-800"
                />
                <button type="submit" className="bg-[#FF6600] hover:bg-[#e55c00] text-white px-8 py-4 font-bold transition flex items-center whitespace-nowrap">
                  <Mail className="w-5 h-5 mr-2" /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default InvestmentServices;