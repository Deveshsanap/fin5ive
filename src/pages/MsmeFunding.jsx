import React, { useState } from 'react';
import { 
  Factory, Settings, FileText, Landmark, ShieldCheck, Coins, 
  LineChart, CheckCircle, ArrowRight, X, Send, Calculator, 
  ChevronDown, ChevronUp, Download, Building, Sun, Briefcase, Activity
} from 'lucide-react';

const MsmeFunding = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('MACHINERY');

  // Calculator State
  const [loanAmount, setLoanAmount] = useState(50000000); // 5 Cr
  const [tenureYears, setTenureYears] = useState(7); // 7 Years
  const [interestRate, setInterestRate] = useState(10.5); // 10.5%
  const [subsidyRate, setSubsidyRate] = useState(3); // 3% Interest Subvention

  // --- CALCULATOR MATH ---
  const calculateEMI = (principal, ratePerAnnum, years) => {
    if (ratePerAnnum === 0) return principal / (years * 12);
    const r = ratePerAnnum / 12 / 100;
    const n = years * 12;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const standardEMI = calculateEMI(loanAmount, interestRate, tenureYears);
  const subsidizedEMI = calculateEMI(loanAmount, Math.max(0, interestRate - subsidyRate), tenureYears);
  
  const totalStandardPayment = standardEMI * tenureYears * 12;
  const totalSubsidizedPayment = subsidizedEMI * tenureYears * 12;
  const totalSavings = totalStandardPayment - totalSubsidizedPayment;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const fundingTypes = {
    MACHINERY: { 
      title: "Machinery Loans", 
      icon: <Settings className="w-6 h-6" />, 
      desc: "Upgrade your manufacturing unit with state-of-the-art equipment. We arrange up to 100% funding for imported or domestic machinery.",
      points: ["Up to 100% Invoice Value funding", "Subsidies under TUFS & State Schemes", "Longer repayment tenures (up to 7 years)", "Fast processing with minimal collateral"]
    },
    WORKING_CAP: { 
      title: "Working Capital (CC/OD)", 
      icon: <Coins className="w-6 h-6" />, 
      desc: "Maintain seamless business cycles. We structure Cash Credit and Overdraft facilities against your inventory, receivables, or property.",
      points: ["Limits from ₹50 Lakhs to ₹25 Crores", "Optimized interest rates", "CGTMSE (Collateral-free) options up to ₹5 Cr", "Enhancement of existing limits"]
    },
    SOLAR: { 
      title: "Solar & Green Finance", 
      icon: <Sun className="w-6 h-6" />, 
      desc: "Drastically reduce your OPEX by transitioning to renewable energy. Specialized funding for industrial rooftop solar installations.",
      points: ["Up to 80% project cost funding", "Dedicated green-energy interest concessions", "Quick ROI realization (3-4 years)", "Assistance with capital subsidies"]
    },
    FACTORY: { 
      title: "Factory Construction", 
      icon: <Factory className="w-6 h-6" />, 
      desc: "End-to-end project finance for acquiring industrial land and constructing your dream manufacturing facility.",
      points: ["Land + Construction composite loans", "Structuring moratorium periods during construction", "Integration with state industrial policies", "Optimal debt-equity structuring"]
    }
  };

  const faqs = [
    { question: "What is the CGTMSE Scheme and how much can I get?", answer: "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) allows MSMEs to avail collateral-free loans. Currently, the maximum limit for unsecured funding under this scheme has been enhanced to ₹5 Crores, subject to banking norms and business financials." },
    { question: "How does the Interest Subsidy mechanism work?", answer: "Both State and Central Governments offer interest subvention (e.g., 3% to 5% reimbursement on interest paid) for specific sectors. You pay the standard EMI to the bank, and the government credits the subsidy amount back to your account. We manage this entire claim process." },
    { question: "What is ZED Certification and why do I need it?", answer: "ZED (Zero Defect Zero Effect) is an MSME Ministry certification. Achieving Gold/Silver ZED status unlocks massive benefits, including 0.5% concessions on bank interest rates, 50% waiver on processing fees, and preference in government tenders." },
    { question: "How long does it take to secure a machinery loan?", answer: "Assuming all documents and the Project Report (CMA data) are properly prepared, our structured approach typically results in bank sanction within 14 to 21 working days." }
  ];

  return (
    <div className="bg-white relative">

      {/* --- LEAD GEN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Factory className="w-5 h-5 mr-2"/> MSME Funding Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Request Sent! Our advisory team will contact you shortly."); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Acme Manufacturing" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Annual Turnover</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>Up to ₹5 Crores</option>
                  <option>₹5 Cr - ₹25 Crores</option>
                  <option>₹25 Cr - ₹100 Crores</option>
                  <option>₹100 Crores+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funding Requirement Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>New Machinery Purchase</option>
                  <option>Working Capital Enhancement</option>
                  <option>Factory Construction</option>
                  <option>Subsidy / ZED Consulting</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-finOrange hover:bg-finOrange-dark text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Book Free Consultation <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Factory className="w-96 h-96 animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-finOrange/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <Settings className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
              <span>MSME Financial Advisory</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Empowering MSMEs Through <span className="text-finOrange">Smart Funding Solutions.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We navigate the complexities of business funding, government subsidies, and compliance certifications so you can focus on scaling your manufacturing unit.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Working Capital', 'Machinery Loans', 'Factory Finance', 'ZED Certification', 'Govt Subsidies'].map((tag, i) => (
                <span key={i} className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
              Evaluate Your Funding Eligibility <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Bar */}
      <div className="bg-slate-900 text-white py-6 border-b-4 border-finOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700 items-center">
          <div className="p-2"><p className="text-2xl font-extrabold text-finOrange">₹25 Cr</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Max Funding</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-finOrange">100%</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Machinery Finance</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-finOrange">₹5 Cr</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Collateral Free (CGTMSE)</p></div>
          <div className="p-2"><p className="text-2xl font-extrabold text-finOrange">5%</p><p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Max Interest Subsidy</p></div>
        </div>
      </div>

      {/* 3. NEW: Interactive EMI & Subsidy Calculator */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Financial Engineering</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">MSME Loan & Subsidy Calculator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See how proper structuring and government interest subvention schemes can drastically reduce your monthly outflow.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
              {/* Loan Amount */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Loan Amount</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue">
                    {formatINR(loanAmount)}
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="250000000" step="1000000" 
                  value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
              </div>

              {/* Tenure */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue">Tenure (Years)</label>
                  <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue">
                    {tenureYears} Years
                  </div>
                </div>
                <input 
                  type="range" min="1" max="15" step="1" 
                  value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                />
              </div>

              {/* Interest Rate & Subsidy */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-gray-600 text-sm">Bank ROI</label>
                    <span className="font-bold text-finBlue">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" min="7.5" max="15" step="0.1" 
                    value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finBlue"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-finOrange text-sm">Govt Subsidy</label>
                    <span className="font-bold text-finOrange bg-orange-50 px-2 py-1 rounded">{subsidyRate}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="7" step="1" 
                    value={subsidyRate} onChange={(e) => setSubsidyRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-finOrange"
                  />
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-1/2 bg-finBlue text-white relative overflow-hidden flex flex-col justify-center">
              <LineChart className="absolute top-0 right-0 w-64 h-64 opacity-5 -mt-10 -mr-10" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Standard Bank EMI</span>
                  <span className="font-bold text-xl line-through">{formatINR(standardEMI)}</span>
                </div>
                
                <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-finOrange font-bold text-sm tracking-widest uppercase mb-1">Effective Subsidized EMI</p>
                  <p className="text-4xl font-extrabold text-white">{formatINR(subsidizedEMI)}</p>
                  <p className="text-gray-300 text-xs mt-2 italic">At effective interest rate of {Math.max(0, interestRate - subsidyRate)}%</p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-green-400 font-bold text-sm tracking-widest uppercase mb-1">Total Savings on Interest</p>
                  <p className="text-3xl font-extrabold text-green-400">{formatINR(totalSavings)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Types of Funding (Dynamic Tabs) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Tailored MSME Funding Suites</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From daily operations to greenfield expansions, we structure the exact credit facility your business needs.</p>
          </div>

          <div className="max-w-6xl mx-auto bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-white">
              {Object.keys(fundingTypes).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-5 px-2 text-center font-bold text-sm md:text-base transition-colors flex flex-col md:flex-row items-center justify-center gap-2 ${activeTab === key ? 'border-b-4 border-finOrange text-finBlue bg-slate-50' : 'text-gray-400 hover:bg-gray-50 border-b-4 border-transparent'}`}
                >
                  {fundingTypes[key].icon} <span className="hidden md:inline">{fundingTypes[key].title}</span>
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-finOrange/10 rounded-xl text-finOrange mr-6 hidden md:block">
                  {fundingTypes[activeTab].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-finBlue mb-2">{fundingTypes[activeTab].title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{fundingTypes[activeTab].desc}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                {fundingTypes[activeTab].points.map((point, i) => (
                  <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-finOrange mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. Strategic Advisory Grid */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The FIN5IVE Method</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Strategic Financial Advisory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We don't just find you a loan; we engineer your entire funding proposal to ensure maximum approval rates and optimal terms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Project Report Preparation", desc: "Crafting compelling CMA data and project reports that resonate perfectly with strict banking requirements.", icon: <FileText className="w-8 h-8 text-finOrange" /> },
              { title: "Financial Restructuring", desc: "In-depth review and structuring of your balance sheet to highlight business health and maximum repayment potential.", icon: <LineChart className="w-8 h-8 text-finBlue" /> },
              { title: "Bank Syndication", desc: "Facilitating seamless interactions and connecting your business with the optimal PSU/Private banks from our network.", icon: <Landmark className="w-8 h-8 text-finOrange" /> },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-finBlue mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Deep Dive: ZED & Subsidies */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Subsidy Assistance */}
            <div className="bg-finBlue rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl group">
              <Coins className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mt-10 -mr-10 group-hover:scale-110 transition duration-700" />
              <div className="relative z-10">
                <span className="bg-finOrange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">Cost Reduction</span>
                <h2 className="text-3xl font-bold mb-6">Interest Subsidy Assistance</h2>
                <p className="text-gray-300 mb-8 text-lg">Drastically reduce your effective cost of borrowing. We handle the entire complex government subsidy lifecycle.</p>
                <ul className="space-y-5">
                  {['Identification of applicable state/central schemes', 'Complete documentation & profiling', 'Application filing with MSME/DIC authorities', 'Persistent follow-ups until subsidy is credited'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 mt-2 bg-finOrange rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ZED Certification */}
            <div className="bg-slate-50 border border-gray-200 rounded-3xl p-10 lg:p-14 relative overflow-hidden shadow-sm group">
              <ShieldCheck className="absolute top-0 right-0 w-64 h-64 text-finBlue opacity-5 -mt-10 -mr-10 group-hover:scale-110 transition duration-700" />
              <div className="relative z-10">
                <span className="bg-finBlue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">Quality & Compliance</span>
                <h2 className="text-3xl font-bold text-finBlue mb-6">ZED Certification Support</h2>
                <p className="text-gray-600 mb-8 text-lg">Achieve Zero Defect Zero Effect (Gold/Silver) certification to unlock quality benchmarks and massive banking concessions.</p>
                <div className="space-y-6">
                  {[
                    { title: "Gap Analysis & Registration", desc: "Identifying improvement areas and managing the official portal." },
                    { title: "Audit Coordination", desc: "Facilitating smooth external audits by MSME-QCI assessors." },
                    { title: "Final Approval & Concessions", desc: "Securing the certificate to claim 0.5% banking interest concessions." }
                  ].map((phase, i) => (
                    <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-finOrange/10 text-finOrange font-bold flex items-center justify-center flex-shrink-0 mr-4 border border-finOrange/20">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-finBlue">{phase.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. NEW: The Funding Roadmap */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Execution Roadmap</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From initial assessment to final disbursal, we project-manage your entire funding lifecycle.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {[
                { step: 1, phase: "Financial Profiling", desc: "Deep dive into your balance sheet and funding requirements." },
                { step: 2, phase: "CMA & Structuring", desc: "Crafting the Project Report and optimizing debt ratios." },
                { step: 3, phase: "Bank Syndication", desc: "Applying to targeted banks matching your risk profile." },
                { step: 4, phase: "Appraisal & Sanction", desc: "Liaising with credit managers to secure the sanction letter." },
                { step: 5, phase: "Disbursal & Subsidy", desc: "Fulfilling final documentation and initiating subsidy claims." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-finOrange rounded-full flex items-center justify-center font-extrabold text-2xl shadow-[0_0_15px_rgba(255,102,0,0.5)] mb-6">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2 leading-tight">{item.phase}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clearing up common questions about MSME funding and government schemes.</p>
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

      {/* 9. Lead Magnet: Download Brochure */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-gray-200">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-finBlue mb-2">Download the "MSME Subsidy Handbook"</h3>
              <p className="text-gray-600">Get a detailed PDF covering current state-wise interest subventions, CGTMSE limits, and ZED Certification benefits.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <form className="flex w-full shadow-md rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Director's Email" 
                  className="w-full md:w-64 px-6 py-4 border border-gray-300 focus:outline-none focus:border-finOrange bg-white text-gray-800"
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

export default MsmeFunding;