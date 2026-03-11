import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Home, ArrowRight, CheckCircle2, MapPin, 
  Briefcase, TrendingUp, ShieldCheck, X, Send, 
  ChevronDown, ChevronUp, Download, Building, FileText, 
  Calculator, PieChart, Coins
} from 'lucide-react';
import toast from 'react-hot-toast';

const NriRealEstate = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Real Estate Calculator State
  const [propertyValue, setPropertyValue] = useState(15000000); // 1.5 Cr
  const [appreciationRate, setAppreciationRate] = useState(8); // 8% per year
  const [rentalYield, setRentalYield] = useState(3); // 3% per year
  const [holdingPeriod, setHoldingPeriod] = useState(10); // 10 years

  // --- CALCULATOR MATH ---
  const calculateROI = () => {
    // Compound interest for property appreciation
    const futureValue = propertyValue * Math.pow(1 + (appreciationRate / 100), holdingPeriod);
    const capitalGained = futureValue - propertyValue;
    
    // Simple total rental income (based on initial property value for simplicity)
    const annualRent = propertyValue * (rentalYield / 100);
    const totalRentalIncome = annualRent * holdingPeriod;
    
    const totalROI = capitalGained + totalRentalIncome;

    return { futureValue, totalRentalIncome, totalROI };
  };

  const { futureValue, totalRentalIncome, totalROI } = calculateROI();
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS (From Client WhatsApp) ---
  const opportunities = [
    {
      title: "Residential Property",
      desc: "Invest in premium apartments, luxury villas, and plotted developments in India's fastest-growing urban corridors.",
      icon: <Home className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "Commercial Real Estate",
      desc: "High-yield investments in Grade-A office spaces, retail hubs, and IT parks generating steady, long-term rental income.",
      icon: <Building2 className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "Real Estate Funds & REITs",
      desc: "Access the real estate market without direct property management through Real Estate Investment Trusts and AIFs.",
      icon: <PieChart className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "Fractional Real Estate",
      desc: "Co-own premium commercial assets with a smaller ticket size, earning proportionate high-yield rentals and capital appreciation.",
      icon: <Coins className="w-8 h-8 text-[#FF6600]" />
    }
  ];

  const howWeSupport = [
    {
      title: "Real Estate Investment Advisory",
      desc: "We analyze your global portfolio and recommend strategic real estate assets that perfectly align with your wealth creation goals."
    },
    {
      title: "Market Research & Evaluation",
      desc: "Our team conducts rigorous due diligence, developer background checks, and micro-market analysis to ensure safe investments."
    },
    {
      title: "Documentation & Compliance",
      desc: "We handle the complex NRI property laws, FEMA regulations, RERA compliance, and legally bulletproof Specific Powers of Attorney."
    },
    {
      title: "End-to-End Transaction Support",
      desc: "From initial site-visits (virtual or physical) and negotiation, to final registry, lower TDS certificates, and ultimate fund repatriation."
    }
  ];

  const faqs = [
    { question: "Can NRIs buy any type of property in India?", answer: "NRIs and OCIs can freely purchase residential and commercial properties in India. However, under FEMA regulations, they are strictly prohibited from purchasing agricultural land, plantation property, or farmhouses." },
    { question: "How does TDS work when an NRI sells property?", answer: "When an NRI sells property, the buyer must deduct TDS at 20% (plus surcharge and cess) on the entire sale value, not just the capital gains. FIN5IVE helps NRIs apply for a Lower TDS Certificate to compute tax only on actual gains, saving massive upfront cash flow." },
    { question: "Can I repatriate the money from a property sale back to my home country?", answer: "Yes. NRIs can repatriate the sale proceeds of property. If the property was acquired out of foreign inward remittance (NRE/FCNR), it is freely repatriable. Otherwise, it falls under the USD 1 Million per financial year limit via the NRO account, subject to tax payment and 15CA/CB certification." },
    { question: "Do I need to be physically present in India to buy or sell property?", answer: "No. The entire process of property search, negotiation, legal due diligence, and final execution can be handled remotely using a legally drafted and properly adjudicated Specific Power of Attorney (POA)." }
  ];

  return (
    <div className="bg-white font-sans relative overflow-hidden">
      
      {/* --- NRI REAL ESTATE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Building2 className="w-5 h-5 mr-2"/> Real Estate Consultation</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. Our Property Desk will contact you shortly."); 
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Interest</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Buying Residential Property</option>
                  <option>Buying Commercial / Pre-Leased</option>
                  <option>Fractional Real Estate / REITs</option>
                  <option>Selling Property & Repatriation</option>
                  <option>Legal & Documentation Support</option>
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
        <Building className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>NRI Invest</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            Indian Real Estate <span className="text-[#FF6600]">Advisory.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Capitalize on India's booming property market. From high-yield commercial assets to seamless property sales and repatriation, we are your trusted ground partners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex justify-center items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
              Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Overview / Why Invest */}
      <section className="py-20 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#003366] mb-12">The Case for Indian Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <TrendingUp className="w-10 h-10 text-[#FF6600] mx-auto mb-4" />
              <h3 className="font-bold text-[#003366] text-lg mb-2">Wealth Creation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Historically proven capital appreciation in major Indian metros and emerging tech corridors.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <ShieldCheck className="w-10 h-10 text-[#FF6600] mx-auto mb-4" />
              <h3 className="font-bold text-[#003366] text-lg mb-2">Asset Diversification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Hedge your global portfolio by anchoring capital in tangible, physical Indian assets.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Coins className="w-10 h-10 text-[#FF6600] mx-auto mb-4" />
              <h3 className="font-bold text-[#003366] text-lg mb-2">High Rental Yields</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lucrative passive income generated through prime commercial and residential leasing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Investment Opportunities Grid */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Asset Classes</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Investment Opportunities</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Curated properties and structured funds offering secure, high-growth potential for NRIs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((item, index) => (
              <div key={index} className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <div className="bg-white p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#003366] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Real Estate ROI Calculator */}
      <section className="py-24 bg-[#003366] relative overflow-hidden text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6600] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Yield Simulator</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Project Your Real Estate Returns</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg font-medium">Estimate capital appreciation and passive rental income over your holding period.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto text-gray-800 flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 bg-slate-50">
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">Property Value (INR)</label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                    {formatINR(propertyValue)}
                  </div>
                </div>
                <input 
                  type="range" min="5000000" max="100000000" step="1000000" 
                  value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">Holding Period</label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">{holdingPeriod} Years</div>
                </div>
                <input 
                  type="range" min="3" max="25" step="1" 
                  value={holdingPeriod} onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Est. Appreciation</label>
                    <span className="font-bold text-[#003366]">{appreciationRate}%/yr</span>
                  </div>
                  <input 
                    type="range" min="3" max="15" step="0.5" 
                    value={appreciationRate} onChange={(e) => setAppreciationRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Rental Yield</label>
                    <span className="font-bold text-[#003366]">{rentalYield}%/yr</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.5" 
                    value={rentalYield} onChange={(e) => setRentalYield(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-1/2 bg-white relative flex flex-col justify-center">
              <Calculator className="absolute bottom-10 right-10 w-48 h-48 text-slate-100 opacity-50 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Est. Property Value</p>
                  <p className="text-2xl font-black text-[#003366]">{formatINR(futureValue)}</p>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Est. Rental Income</p>
                  <p className="text-2xl font-black text-green-500">+{formatINR(totalRentalIncome)}</p>
                </div>
                
                <div className="pt-4">
                  <p className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mb-1 mt-2">Total Est. Wealth Generated</p>
                  <p className="text-4xl font-extrabold text-[#003366]">{formatINR(totalROI)}</p>
                  <p className="text-xs text-gray-400 mt-2 italic">*Illustration purposes only. Actual returns depend on market cycles and taxation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How FIN5IVE Supports */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4">How FIN5IVE Supports You</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We provide a completely hands-free, white-glove real estate advisory experience for NRIs.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-[3rem] left-[10%] w-[80%] h-1 bg-gray-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howWeSupport.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white border-4 border-slate-50 shadow-lg rounded-full flex items-center justify-center mb-6 text-2xl font-black text-[#003366]">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#003366] mb-3 px-2">{step.title}</h3>
                  <p className="text-gray-600 font-medium px-4 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on NRI property laws, TDS, and repatriation.</p>
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

      {/* 7. Lead Magnet: Download Guide */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <FileText className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The NRI Real Estate Guide</h3>
              <p className="text-gray-300">Download our comprehensive PDF breaking down TDS calculations, repatriation rules (Form 15CA/CB), and property due diligence.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-xl overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Guide sent to your email!', { icon: '🏡' });
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

export default NriRealEstate;