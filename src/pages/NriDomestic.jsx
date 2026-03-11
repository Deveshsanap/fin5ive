import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, TrendingUp, ShieldCheck, Landmark, Briefcase, 
  FileText, Activity, ArrowRight, X, Send, ChevronDown, 
  ChevronUp, Download, BarChart, RefreshCw, ArrowDownCircle,
  Umbrella, Building, Calculator, CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

const NriDomestic = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Interactive Calculator State
  const [calcType, setCalcType] = useState('SIP'); 
  const [investmentAmount, setInvestmentAmount] = useState(50000); 
  const [timeHorizon, setTimeHorizon] = useState(10); 
  const [expectedReturn, setExpectedReturn] = useState(12);

  // --- CALCULATOR MATH ---
  const calculateReturns = () => {
    const r = expectedReturn / 100;
    let totalInvested = 0;
    let futureValue = 0;

    if (calcType === 'SIP') {
      const monthlyRate = r / 12;
      const months = timeHorizon * 12;
      totalInvested = investmentAmount * months;
      futureValue = investmentAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      totalInvested = investmentAmount;
      futureValue = investmentAmount * Math.pow(1 + r, timeHorizon);
    }

    const wealthGained = futureValue - totalInvested;
    return { totalInvested, futureValue, wealthGained };
  };

  const { totalInvested, futureValue, wealthGained } = calculateReturns();
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const mfStrategies = [
    { title: "Systematic Investment Plan (SIP)", desc: "Invest fixed amounts regularly to benefit from rupee-cost averaging and disciplined wealth creation.", icon: <TrendingUp className="w-6 h-6 text-[#FF6600]" /> },
    { title: "Lumpsum Investments", desc: "Deploy large capital into the market in one go, ideal for NRE/NRO account balances awaiting growth.", icon: <PieChart className="w-6 h-6 text-[#FF6600]" /> },
    { title: "Systematic Transfer Plan (STP)", desc: "Park funds in safe liquid funds and systematically transfer to equity funds to mitigate market timing risks.", icon: <RefreshCw className="w-6 h-6 text-[#FF6600]" /> },
    { title: "Systematic Withdrawal Plan (SWP)", desc: "Generate a fixed, regular cash flow from your mutual fund corpus for your dependents in India.", icon: <ArrowDownCircle className="w-6 h-6 text-[#FF6600]" /> }
  ];

  const otherProducts = [
    { title: "Portfolio Management (PMS)", desc: "Concentrated, actively managed equity portfolios for high-net-worth NRIs.", icon: <Briefcase className="w-8 h-8 text-[#003366]" /> },
    { title: "Alternative Investments (AIF)", desc: "Access to private equity, venture debt, and complex absolute-return strategies.", icon: <BarChart className="w-8 h-8 text-[#003366]" /> },
    { title: "Bonds & NCDs", desc: "Secure fixed-income instruments, including tax-free bonds for stable returns.", icon: <FileText className="w-8 h-8 text-[#003366]" /> },
    { title: "Fixed Deposits", desc: "Highly secure corporate and bank FDs offering guaranteed returns on NRE/NRO funds.", icon: <Landmark className="w-8 h-8 text-[#003366]" /> },
    { title: "Unlisted Shares", desc: "Early-stage access to high-growth Indian startups and pre-IPO companies.", icon: <Activity className="w-8 h-8 text-[#003366]" /> },
    { title: "Initial Public Offerings (IPO)", desc: "Strategic bidding and allocation guidance for highly anticipated Indian IPOs.", icon: <Building className="w-8 h-8 text-[#003366]" /> }
  ];

  const faqs = [
    { question: "Can NRIs invest in Indian Mutual Funds?", answer: "Yes, NRIs can legally invest in Indian Mutual Funds. Investments can be made on a repatriable basis (from an NRE/FCNR account) or non-repatriable basis (from an NRO account). However, NRIs based in the US/Canada face FATCA restrictions, though we have specific AMCs that accept their investments." },
    { question: "Do I need a new Demat account as an NRI?", answer: "Yes. If you wish to invest in direct equities, IPOs, or unlisted shares, you must open a specific NRI Demat and Trading account (PIS or Non-PIS) linked to your NRE or NRO bank account. We handle this entire setup for you." },
    { question: "Is the interest from Fixed Deposits and Bonds taxable?", answer: "Interest earned on NRE Fixed Deposits is completely tax-free in India. However, interest earned on NRO Fixed Deposits and corporate bonds is subject to TDS (typically 30% plus surcharge). We assist in claiming lower TDS via DTAA treaties." },
    { question: "What is the minimum investment for PMS and AIF?", answer: "Under SEBI regulations, the minimum investment requirement for a Portfolio Management Service (PMS) is ₹50 Lakhs, while for Alternative Investment Funds (AIF), it is ₹1 Crore." }
  ];

  return (
    <div className="bg-white font-sans relative overflow-hidden">
      
      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Briefcase className="w-5 h-5 mr-2"/> Domestic Product Advisory</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. Our NRI Wealth Desk will contact you shortly."); 
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="e.g. UK, UAE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Interest</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Mutual Funds (SIP / Lumpsum)</option>
                  <option>PMS / AIF / Unlisted Shares</option>
                  <option>Fixed Income (Bonds / FDs)</option>
                  <option>Insurance & Retirement Planning</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition shadow-lg">
                Schedule Advisory Call <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <section className="relative bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <PieChart className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span>NRI Invest</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            Domestic Indian <br className="hidden md:block" />
            <span className="text-[#FF6600]">Financial Products.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Gain direct access to India's immense growth story. We structure, execute, and manage high-yield domestic portfolios tailored exclusively for the NRI demographic.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex justify-center items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
              Start Investing in India <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Mutual Funds Framework */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Core Allocation</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Mutual Fund Strategies</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Professional, data-driven fund allocation allowing NRIs to passively compound wealth in the Indian equity and debt markets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mfStrategies.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3 leading-tight">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Other Advanced Investment Products Grid */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Advanced Assets</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Direct Equity & Fixed Income</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Sophisticated financial instruments for high-net-worth NRIs seeking concentrated growth and stability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProducts.map((product, index) => (
              <div key={index} className="flex bg-slate-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-[#003366]/30 transition-all duration-300">
                <div className="mr-6 flex-shrink-0">
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    {product.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#003366] mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Protection & Retirement Solutions (Side-by-Side) */}
      <section className="py-24 bg-[#003366] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002244] transform skew-x-12 translate-x-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Protection & Planning Solutions</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">Secure your dependents in India and plan for a tax-efficient return to the homeland.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Insurance */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2.5rem]">
              <Umbrella className="w-12 h-12 text-[#FF6600] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Insurance Solutions</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Protect your family's future and safeguard your Indian assets. We curate top-tier Life, Health, and Term insurance policies customized for non-residents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-[#FF6600] mr-3" /> Dedicated policies for NRIs</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-[#FF6600] mr-3" /> Full claim settlement support</li>
              </ul>
            </div>

            {/* NPS */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2.5rem]">
              <ShieldCheck className="w-12 h-12 text-[#FF6600] mb-6" />
              <h3 className="text-2xl font-bold mb-4">Retirement Planning (NPS)</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                The National Pension System (NPS) offers NRIs a structured, government-backed framework to build a massive retirement corpus with unparalleled tax benefits.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-[#FF6600] mr-3" /> Market-linked diversified growth</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="w-5 h-5 text-[#FF6600] mr-3" /> Massive tax benefits under 80C & 80CCD(1B)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Wealth Calculator */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Growth Simulator</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4">India Growth Calculator</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Visualize the massive compounding effect of routing your capital into Indian equities and funds.</p>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-200 bg-white">
              
              {/* Type Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
                <button 
                  onClick={() => setCalcType('SIP')}
                  className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${calcType === 'SIP' ? 'bg-[#003366] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Monthly SIP
                </button>
                <button 
                  onClick={() => setCalcType('LUMPSUM')}
                  className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${calcType === 'LUMPSUM' ? 'bg-[#FF6600] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  One-Time Lumpsum
                </button>
              </div>

              {/* Amount Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">{calcType === 'SIP' ? 'Monthly Investment' : 'Total Investment'} (INR)</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                    {formatINR(investmentAmount)}
                  </div>
                </div>
                <input 
                  type="range" min={calcType === 'SIP' ? 5000 : 100000} max={calcType === 'SIP' ? 500000 : 50000000} step={calcType === 'SIP' ? 5000 : 100000} 
                  value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Est. Return</label>
                    <span className="font-bold text-[#003366]">{expectedReturn}%</span>
                  </div>
                  <input 
                    type="range" min="6" max="25" step="1" 
                    value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Tenure</label>
                    <span className="font-bold text-[#003366]">{timeHorizon} Yrs</span>
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
            <div className="p-8 md:p-12 md:w-2/5 bg-slate-50 relative flex flex-col justify-center">
              <Calculator className="absolute bottom-10 right-10 w-48 h-48 text-[#003366] opacity-5 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Invested Amount</p>
                  <p className="text-xl font-bold text-[#003366]">{formatINR(totalInvested)}</p>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Est. Wealth Gained</p>
                  <p className="text-xl font-bold text-green-500">+{formatINR(wealthGained)}</p>
                </div>
                
                <div className="pt-4">
                  <p className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mb-1 mt-2">Total Future Value</p>
                  <p className="text-4xl font-black text-[#003366]">{formatINR(futureValue)}</p>
                  <p className="text-xs text-gray-500 mt-2 italic">*Estimates based on historical data. Repatriation subject to FEMA guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on NRI Demat accounts, NRO/NRE funding, and market rules.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full flex justify-between items-center p-6 md:p-8 transition text-left ${activeFaq === index ? 'bg-white' : 'hover:bg-gray-50'}`}
                >
                  <span className={`font-bold text-lg pr-4 ${activeFaq === index ? 'text-[#FF6600]' : 'text-[#003366]'}`}>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'bg-orange-100 rotate-180' : 'bg-slate-50 shadow-sm rotate-0'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#FF6600]' : 'text-gray-400'}`} />
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

      {/* 7. Lead Magnet: Download Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <FileText className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The Domestic Product Factsheet</h3>
              <p className="text-gray-300">Download our complete guide detailing KYC procedures for NRIs, NRE vs NRO taxation differences, and top-performing funds.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-xl overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Factsheet sent to your email!', { icon: '📊' });
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

export default NriDomestic;