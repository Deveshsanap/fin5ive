import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Landmark, ShieldCheck, ArrowRight, CheckCircle2, 
  X, Send, ChevronDown, ChevronUp, Download, AlertCircle, 
  Calculator, Globe, Scale, RefreshCw, FileSearch, CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

const NriTax = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // TDS Calculator State
  const [saleValue, setSaleValue] = useState(20000000); // 2 Cr
  const [purchaseValue, setPurchaseValue] = useState(8000000); // 80 L

  // --- CALCULATOR MATH ---
  const calculateTDS = () => {
    // Standard TDS without Form 13 is roughly 20% on the ENTIRE Sale Value
    const standardTDS = saleValue * 0.20; 
    
    // With Form 13, TDS is roughly 20% on the CAPITAL GAINS only
    const capitalGains = Math.max(0, saleValue - purchaseValue);
    const optimizedTDS = capitalGains * 0.20; 
    
    // Cashflow Saved / Unblocked
    const cashflowSaved = standardTDS - optimizedTDS;

    return { standardTDS, optimizedTDS, cashflowSaved };
  };

  const { standardTDS, optimizedTDS, cashflowSaved } = calculateTDS();
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const challenges = [
    "Understanding complex Indian tax filing requirements while living abroad.",
    "Massive TDS deductions on property sales and delayed refund claims.",
    "Double taxation concerns on global and Indian income.",
    "Navigating strict FEMA and RBI compliance for repatriation.",
    "Responding to sudden Income Tax notices and scrutiny.",
    "Managing basic KYC, PAN, and Aadhaar linkage remotely."
  ];

  const services = [
    { title: "Income Tax Return (ITR) Filing", desc: "Accurate preparation and filing of your Indian taxes, ensuring you claim all eligible deductions and refunds.", icon: <FileCheckIcon /> },
    { title: "Tax Planning & Optimization", desc: "Strategic structuring of your assets to minimize tax liability using the Double Taxation Avoidance Agreement (DTAA).", icon: <Scale /> },
    { title: "Repatriation Assistance", desc: "End-to-end CA certification (Form 15CA & 15CB) to seamlessly transfer funds out of your NRO account.", icon: <RefreshCw /> },
    { title: "Account & Demat Support", desc: "Assistance with opening and maintaining NRE, NRO, and PIS Demat accounts compliant with RBI rules.", icon: <Landmark /> },
    { title: "PAN / Aadhaar Services", desc: "Resolving inoperative PANs, Aadhaar linkages, and updating NRI status in the income tax portal.", icon: <CreditCard /> },
    { title: "Regulatory & Notice Compliance", desc: "Drafting expert legal replies to Income Tax notices, minimizing penalties and resolving scrutiny assessments.", icon: <ShieldCheck /> }
  ];

  const faqs = [
    { question: "Do I need to file an ITR in India if I live abroad?", answer: "Yes, if your gross total income generated in India (from rent, interest, dividends, or capital gains) exceeds the basic exemption limit (₹2.5 Lakhs under the old regime). It is also mandatory if you want to claim a refund for any TDS deducted by banks or tenants." },
    { question: "What is a Lower TDS Certificate (Form 13)?", answer: "When an NRI sells property in India, the buyer is legally required to deduct 20% TDS (plus surcharge) on the ENTIRE sale amount, blocking massive cash flow. FIN5IVE helps you apply for a Lower TDS Certificate (Form 13) so TDS is only deducted on your actual profit/capital gains." },
    { question: "How do I avoid paying tax twice on the same income?", answer: "India has Double Taxation Avoidance Agreements (DTAA) with 80+ countries. By obtaining a Tax Residency Certificate (TRC) from your country of residence and submitting Form 10F, we ensure you don't pay tax twice on the same income." },
    { question: "How much money can an NRI repatriate in a year?", answer: "Under the Liberalised Remittance Scheme (LRS) and FEMA rules, NRIs can repatriate up to USD 1 Million per financial year from their NRO accounts, provided all taxes are paid and Form 15CA/CB is certified by a Chartered Accountant." }
  ];

  return (
    <div className="bg-white font-sans relative overflow-hidden">
      
      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><FileText className="w-5 h-5 mr-2"/> Tax & Compliance Support</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Request Received. Our NRI Tax Team will contact you shortly."); 
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
                  <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="e.g. USA, UAE" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Requirement</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Income Tax Return (ITR) Filing</option>
                  <option>Lower TDS Certificate (Form 13)</option>
                  <option>Repatriation (Form 15CA/CB)</option>
                  <option>Income Tax Notice / Scrutiny</option>
                  <option>PAN/Aadhaar/KYC Issues</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition shadow-lg">
                Get Tax Assistance <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <section className="relative bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <FileText className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>NRI Invest</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            IT Return & <br className="hidden md:block" />
            <span className="text-[#FF6600]">Compliance Assistance.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Navigate the complexities of Indian taxation from anywhere in the world. We handle ITR filing, TDS refunds, DTAA implementation, and seamless repatriation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex justify-center items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
              Consult a Tax Expert <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. The NRI Friction (Challenges) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2">
              <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">The Friction</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-6 tracking-tight">Managing Indian Taxes Shouldn't Be Stressful</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Distance, changing regulations, and complex compliance frameworks create massive hurdles for NRIs trying to manage their Indian assets.
              </p>
              
              <div className="space-y-5">
                {challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <AlertCircle className="w-6 h-6 text-red-500 mt-0.5 mr-4 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 bg-[#003366] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
              <Globe className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mt-10 -mr-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">The FIN5IVE Solution</h3>
                <p className="text-blue-100 mb-10 text-lg">We bridge the gap. Our dedicated NRI tax desk operates as your legal representative in India, ensuring bulletproof compliance and maximum tax savings.</p>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
                  <div className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mb-2">Zero Travel Required</div>
                  <p className="text-white font-medium">100% digital onboarding and execution using secure e-verification and specific POAs.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mb-2">Dedicated Chartered Accountants</div>
                  <p className="text-white font-medium">Your case is handled by senior professionals, not outsourced entry-level staff.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Services Grid */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Services Offered by FIN5IVE</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">A 360-degree approach to NRI taxation and FEMA compliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FF6600]/30 transition-all duration-300 group">
                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform text-[#003366]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive TDS Savings Calculator */}
      <section className="py-24 bg-[#003366] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6600] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Property Sale Tool</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Form 13 TDS Savings Calculator</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg font-medium">See how much cash flow gets blocked without a Lower TDS Certificate when selling property in India.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto text-gray-800 flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 bg-slate-50">
              
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">Property Sale Value</label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                    {formatINR(saleValue)}
                  </div>
                </div>
                <input 
                  type="range" min="5000000" max="100000000" step="1000000" 
                  value={saleValue} onChange={(e) => setSaleValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-[#003366]">Original Purchase Price</label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600] shadow-sm">
                    {formatINR(purchaseValue)}
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="90000000" step="1000000" 
                  value={purchaseValue} onChange={(e) => setPurchaseValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                />
                <p className="text-xs text-gray-500 mt-2">*Assuming no indexation for simplicity of calculation.</p>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-1/2 bg-white relative flex flex-col justify-center">
              <div className="relative z-10 space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Standard TDS (Without Form 13)</p>
                  <p className="text-xl font-bold text-red-500 line-through decoration-red-300">{formatINR(standardTDS)}</p>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">TDS WITH Form 13 (Tax on Gains)</p>
                  <p className="text-2xl font-black text-[#003366]">{formatINR(optimizedTDS)}</p>
                </div>
                
                <div className="pt-4 bg-green-50 p-6 rounded-2xl border border-green-100">
                  <p className="text-green-600 font-bold text-sm tracking-widest uppercase mb-1">Upfront Cashflow Saved</p>
                  <p className="text-4xl font-extrabold text-green-600">{formatINR(cashflowSaved)}</p>
                  <p className="text-xs text-green-700 mt-2">Money instantly available for repatriation instead of waiting 18 months for an IT refund.</p>
                </div>

              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
             <button onClick={() => setIsModalOpen(true)} className="bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg text-lg">
                Apply for Lower TDS Certificate
             </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on DTAA, Repatriation, and ITR rules.</p>
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <FileSearch className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The NRI Tax Compliance Guide</h3>
              <p className="text-gray-300">Download our comprehensive PDF covering DTAA implementation, 15CA/CB processes, and property taxation.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-xl overflow-hidden" onSubmit={(e) => {
                e.preventDefault();
                toast.success('Guide sent to your email!', { icon: '📄' });
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

// Helper component for the ITR icon
const FileCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
  </svg>
);

export default NriTax;