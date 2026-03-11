import React, { useState } from 'react';
import { 
  ShieldCheck, Award, TrendingUp, Factory, CheckCircle, 
  ArrowRight, Settings, FileCheck, X, Send, Calculator, 
  ChevronDown, ChevronUp, Download, CheckSquare, Coins, LineChart
} from 'lucide-react';

const ZedCertification = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTier, setActiveTier] = useState('GOLD'); // BRONZE, SILVER, GOLD

  // ZED Savings Calculator State
  const [loanAmount, setLoanAmount] = useState(50000000); // 5 Cr

  // --- CALCULATOR MATH ---
  // ZED typically offers ~0.5% interest concession and ~50% processing fee waiver.
  // We will assume a standard 1% processing fee for the baseline.
  const interestConcessionRate = 0.005; // 0.5%
  const annualInterestSavings = loanAmount * interestConcessionRate;
  
  const standardProcessingFee = loanAmount * 0.01; // 1%
  const processingFeeSavings = standardProcessingFee * 0.50; // 50% waiver

  const totalFirstYearSavings = annualInterestSavings + processingFeeSavings;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const zedTiers = {
    BRONZE: { 
      title: "ZED Bronze", 
      icon: <Award className="w-8 h-8 text-amber-700" />, 
      desc: "The foundational step into the ZED ecosystem. Focuses on basic compliance, safety, and awareness of the Zero Defect Zero Effect philosophy.",
      parameters: "5 Basic Parameters",
      reward: "Basic MSME Ministry recognition & initial subsidy eligibility."
    },
    SILVER: { 
      title: "ZED Silver", 
      icon: <Award className="w-8 h-8 text-slate-400" />, 
      desc: "Intermediate operational maturity. Requires documented standard operating procedures (SOPs) and consistent quality control measures.",
      parameters: "14 Intermediate Parameters",
      reward: "Preferred vendor status and enhanced banking concessions."
    },
    GOLD: { 
      title: "ZED Gold", 
      icon: <Award className="w-8 h-8 text-yellow-500" />, 
      desc: "The pinnacle of MSME manufacturing excellence. Demonstrates world-class production, minimal environmental impact, and rigorous safety standards.",
      parameters: "20 Advanced Parameters",
      reward: "Maximum banking concessions, highest priority in Govt. tenders, and global export readiness."
    }
  };

  const faqs = [
    { question: "Is ZED Certification mandatory for MSMEs?", answer: "While currently voluntary, the Government of India and major PSUs are increasingly making ZED certification a prerequisite or a highly weighted preference in public procurement tenders." },
    { question: "Will ZED reduce my bank interest rates?", answer: "Yes! Major financial institutions and banks (like SBI, HDFC, etc.) offer specific concessions to ZED-certified MSMEs, typically including a 0.5% reduction in interest rates and up to 50% waiver on processing fees." },
    { question: "How long does it take to get ZED Gold certified?", answer: "The timeline depends heavily on your current operational maturity. With our hands-on implementation and gap closure, it typically takes 3 to 5 months from the initial gap analysis to the final QCI audit." },
    { question: "What if we fail the initial QCI audit?", answer: "Our methodology is designed to prevent this via rigorous pre-audit simulations. However, if minor non-conformances (NCs) are raised by the auditor, we stay on board to resolve and close those observations until the certificate is awarded." }
  ];

  return (
    <div className="bg-white overflow-hidden">

      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><ShieldCheck className="w-5 h-5 mr-2"/> Start ZED Certification</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Request Sent! Our ZED implementation team will contact you."); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Unit Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Acme Auto Parts" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Certification Level</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>ZED Bronze (Basic)</option>
                  <option>ZED Silver (Intermediate)</option>
                  <option>ZED Gold (Advanced)</option>
                  <option>Unsure, need assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Industry</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="e.g., Engineering, Textiles, Pharma" />
              </div>
              <button type="submit" className="w-full bg-finOrange hover:bg-finOrange-dark text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Book Initial Gap Analysis <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Award className="w-96 h-96 -mt-10 -mr-10 animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-finOrange/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span>Zero Defect. Zero Effect.</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Elevate Your Manufacturing with <span className="text-finOrange">ZED Gold.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Achieve operational maturity, robust SOPs, and strict quality control. We act as your hands-on implementation partner to secure India's flagship MSME certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
                Start Your ZED Journey <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. What is ZED Gold & Key Benefits */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The Value Proposition</span>
              <h2 className="text-3xl md:text-4xl font-bold text-finBlue mb-6">A Catalyst for Business Growth</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Administered by MSME-QCI, ZED Gold is an advanced level certification that reflects high operational maturity. It is not just a certificate—it is a business enabler that serves as a stepping stone to large corporate vendor approvals, export readiness, and massive financial subsidies.
              </p>
              
              <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-finBlue mb-6 flex items-center border-b border-gray-100 pb-4">
                  <Award className="w-6 h-6 text-finOrange mr-3" />
                  Key Benefits of ZED Certification
                </h3>
                <ul className="space-y-4">
                  {[
                    "Concession on interest cost (up to 0.5%) by major banks",
                    "Up to 50% waiver on bank loan processing fees",
                    "Preferred status in Government and PSU tenders",
                    "Higher credibility with MNCs for vendor empanelment",
                    "Subsidies on technology upgrades and testing equipment",
                    "Better workplace safety, hygiene & statutory compliance"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Coins className="w-8 h-8 text-finBlue" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Reduced Financial Costs</h4>
                <p className="text-sm text-gray-500 mt-2">Direct banking concessions.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center sm:mt-12 hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-finOrange" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Govt. Recognition</h4>
                <p className="text-sm text-gray-500 mt-2">Officially verified by MSME-QCI.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <Factory className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Export Readiness</h4>
                <p className="text-sm text-gray-500 mt-2">Aligns with global quality metrics.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center sm:mt-12 hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Process Efficiency</h4>
                <p className="text-sm text-gray-500 mt-2">Minimizes rejections & waste.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW: ZED Financial Benefits Calculator */}
      <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The ROI of ZED</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Calculate Your Financial Savings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Beyond operational excellence, ZED Gold brings immediate, tangible financial benefits from lenders. Estimate your savings below.</p>
          </div>

          <div className="bg-finBlue rounded-3xl shadow-2xl border border-finBlue-light overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10 bg-slate-900 text-white relative">
              <Calculator className="absolute top-0 right-0 w-48 h-48 opacity-5 -mt-10 -mr-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-6">
                  <label className="font-bold text-white flex items-center mb-4 text-lg">
                    Total Borrowing / Loan Amount
                  </label>
                  <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl font-extrabold text-3xl text-finOrange shadow-inner mb-8 text-center backdrop-blur-sm">
                    {formatINR(loanAmount)}
                  </div>
                  <input 
                    type="range" min="10000000" max="500000000" step="5000000" 
                    value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-finOrange"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-400 mt-3">
                    <span>₹1 Crore</span><span>₹50 Crores</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-400 space-y-2">
                  <p>Assumptions based on standard PSU/Private bank policies for ZED-certified MSMEs:</p>
                  <ul className="list-disc pl-5">
                    <li>0.5% Annual Interest Concession</li>
                    <li>50% Waiver on Processing Fees</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-1/2 text-white relative flex flex-col justify-center bg-finBlue">
              <div className="relative z-10 space-y-8">
                <div>
                  <p className="text-gray-300 font-bold text-sm tracking-widest uppercase mb-1">Annual Interest Savings</p>
                  <p className="text-3xl font-bold text-white">{formatINR(annualInterestSavings)} / yr</p>
                </div>
                
                <div>
                  <p className="text-gray-300 font-bold text-sm tracking-widest uppercase mb-1">Processing Fee Savings (One-time)</p>
                  <p className="text-3xl font-bold text-white">{formatINR(processingFeeSavings)}</p>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-green-400 font-bold text-sm tracking-widest uppercase mb-1">Total Year 1 Savings</p>
                  <p className="text-5xl font-extrabold text-green-400">{formatINR(totalFirstYearSavings)}</p>
                  <p className="text-xs text-gray-300 mt-3 italic">*The cost of ZED implementation is recovered instantly through these banking concessions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW: The "Bronze to Gold" Progression Path (Dynamic Tabs) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">The ZED Maturity Model</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the three tiers of certification and the increasing levels of operational excellence required for each.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 bg-slate-50">
              {Object.keys(zedTiers).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key)}
                  className={`flex-none md:flex-1 py-5 px-6 text-center font-bold text-sm md:text-lg transition-colors flex flex-row items-center justify-center gap-3 whitespace-nowrap ${activeTier === key ? 'border-b-4 border-finOrange text-finBlue bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 border-b-4 border-transparent'}`}
                >
                  <div className={`${activeTier === key ? '' : 'grayscale opacity-50'}`}>
                    {zedTiers[key].icon}
                  </div>
                  <span>{zedTiers[key].title}</span>
                </button>
              ))}
            </div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-finBlue mb-4">{zedTiers[activeTier].title} Standard</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{zedTiers[activeTier].desc}</p>
                  <button onClick={() => setIsModalOpen(true)} className="bg-finBlue hover:bg-finBlue-light text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
                    Assess Our Eligibility
                  </button>
                </div>
                
                <div className="md:w-1/2 bg-slate-50 p-8 rounded-2xl border border-gray-100 w-full">
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-2">Audit Scope</h4>
                    <p className="text-2xl font-extrabold text-finBlue flex items-center">
                      <CheckSquare className="w-6 h-6 text-finOrange mr-3" />
                      {zedTiers[activeTier].parameters}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-2">Primary Advantage</h4>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {zedTiers[activeTier].reward}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FIN5IVE Implementation Approach */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Execution Over Advisory</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Our Hands-On Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We don't just hand you a checklist. From writing SOPs to standing beside you during the final QCI audit, FIN5IVE partners with your manufacturing unit every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Gap Assessment", desc: "Initial deep-dive into your manufacturing unit to identify compliance and safety gaps." },
              { step: "02", title: "SOP Implementation", desc: "Designing, documenting, and integrating practical Standard Operating Procedures." },
              { step: "03", title: "Systems Guidance", desc: "Expert direction on quality control, workplace hygiene, and machinery maintenance systems." },
              { step: "04", title: "Pre-Audit Simulation", desc: "Rigorous pre-audit preparedness and mock audits to ensure your staff is ready." },
              { step: "05", title: "Audit Handholding", desc: "Physical presence and support during the official external MSME-QCI assessment." },
              { step: "06", title: "Observation Closure", desc: "Resolving any auditor non-conformances (NCs) until the final ZED certificate is awarded." }
            ].map((phase, index) => (
              <div key={index} className="relative p-10 bg-slate-50 rounded-2xl border border-gray-100 hover:border-finOrange hover:shadow-xl transition-all duration-300 group">
                <div className="text-6xl font-extrabold text-gray-200 absolute top-6 right-6 group-hover:text-finOrange/10 transition-colors pointer-events-none">
                  {phase.step}
                </div>
                <FileCheck className="w-10 h-10 text-finOrange mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-finBlue mb-3 relative z-10">{phase.title}</h3>
                <p className="text-gray-600 text-sm relative z-10 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clearing up common questions about the ZED scheme.</p>
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
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-finBlue rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <CheckSquare className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Get The ZED Gold Checklist</h3>
              <p className="text-gray-300">Download the exact 20 parameters tested by QCI auditors and check if your factory is ready for certification.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex flex-col sm:flex-row w-full shadow-lg rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Director's Email" 
                  className="w-full sm:w-64 px-6 py-4 border-none focus:outline-none focus:ring-2 focus:ring-finOrange text-gray-800 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                />
                <button className="bg-finOrange hover:bg-finOrange-dark text-white px-8 py-4 font-bold transition flex items-center justify-center whitespace-nowrap rounded-b-lg sm:rounded-r-lg sm:rounded-b-none">
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

export default ZedCertification;