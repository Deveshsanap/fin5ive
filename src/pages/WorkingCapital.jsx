import React, { useState } from 'react';
import { 
  Landmark, Coins, Activity, Home, Building, Factory, Map, 
  ArrowRight, CheckCircle, AlertCircle, Calculator, ShieldCheck, 
  ChevronDown, ChevronUp, Download, Send, X, Building2, Stethoscope, 
  FileText, Info 
} from 'lucide-react';

const WorkingCapital = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeLtvTab, setActiveLtvTab] = useState('RESIDENTIAL');

  // Drawing Power (DP) Calculator State
  const [inventory, setInventory] = useState(5000000); // 50 Lakhs
  const [receivables, setReceivables] = useState(4000000); // 40 Lakhs
  const [creditors, setCreditors] = useState(2000000); // 20 Lakhs

  // --- CALCULATOR MATH (Standard Bank DP Logic) ---
  // Standard Margins: 25% on Inventory, 40% on Receivables. 
  // Creditors are deducted from Inventory before margin calculation.
  const paidInventory = Math.max(0, inventory - creditors);
  const eligibleInventory = paidInventory * 0.75; // 25% margin removed
  const eligibleReceivables = receivables * 0.60; // 40% margin removed
  const drawingPower = eligibleInventory + eligibleReceivables;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const ltvMatrix = {
    RESIDENTIAL: { 
      title: "Residential Property", 
      icon: <Home className="w-6 h-6" />,
      ltv: "Up to 100%", 
      desc: "Maximum liquidity unlocked against fully constructed, self-occupied or vacant residential houses, flats, and bungalows.",
      points: ["Highest Loan-to-Value ratios", "Lower interest rate bands", "Longer repayment tenures available"]
    },
    COMMERCIAL: { 
      title: "Commercial Property", 
      icon: <Building2 className="w-6 h-6" />,
      ltv: "Up to 90%", 
      desc: "Leverage your office spaces, retail shops, and commercial showrooms to fund your daily business operations.",
      points: ["Self-occupied or rented accepted", "Funding against future rent receivables (LRD)", "Quick valuation turnarounds"]
    },
    INDUSTRIAL: { 
      title: "Industrial Property", 
      icon: <Factory className="w-6 h-6" />,
      ltv: "Up to 80%", 
      desc: "Utilize your manufacturing sheds, factory land, and industrial galas as solid collateral for Overdrafts.",
      points: ["Operational factories preferred", "Plant & Machinery valuation considered", "Flexible end-use of funds"]
    },
    SPECIAL: { 
      title: "Hotels & Hospitals", 
      icon: <Stethoscope className="w-6 h-6" />,
      ltv: "Case Specific", 
      desc: "We possess specialized expertise in evaluating and funding complex, purpose-built properties like Hotels, Resorts, and Hospitals.",
      points: ["Cash-flow based structuring", "Funding for specialized medical equipment", "Refinancing of existing high-cost debt"]
    }
  };

  const faqs = [
    { question: "What is the difference between Cash Credit (CC) and an Overdraft (OD)?", answer: "Cash Credit is specifically tied to your current assets (Inventory and Receivables) and fluctuates based on your Drawing Power. An Overdraft is usually tied to a fixed asset (like property) and gives you a static limit to withdraw from, paying interest only on the utilized amount." },
    { question: "My CIBIL score is slightly low. Can I still get funding?", answer: "Yes. While a strong CIBIL is preferred, we evaluate the overall health of the business. If the cash flows are strong and the collateral is solid, we work with specialized NBFCs and banks to structure a viable funding solution." },
    { question: "What is the CGTMSE scheme for Unsecured Loans?", answer: "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) allows eligible MSMEs to secure working capital up to ₹5 Crores without offering traditional real estate collateral, backed by a government guarantee." },
    { question: "How fast can an Overdraft limit be sanctioned?", answer: "If your financial documents (GST returns, ITRs, Bank Statements) and property papers are clear, we typically secure a sanction letter within 7 to 14 working days." }
  ];

  return (
    <div className="bg-white overflow-hidden">

      {/* --- LEAD GEN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Activity className="w-5 h-5 mr-2"/> Apply for Working Capital</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Request Sent! Our credit team will contact you shortly."); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Acme Enterprises" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Funding Amount Required</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>₹30 Lakhs - ₹1 Crore</option>
                  <option>₹1 Crore - ₹5 Crores</option>
                  <option>₹5 Crores - ₹25 Crores</option>
                  <option>Above ₹25 Crores</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Collateral Available</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>Residential Property</option>
                  <option>Commercial / Industrial Property</option>
                  <option>Inventory & Receivables Only</option>
                  <option>Unsecured (CGTMSE Route)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-finOrange hover:bg-finOrange-dark text-white font-bold py-4 rounded-lg mt-4 flex justify-center items-center transition shadow-lg">
                Request Credit Assessment <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Activity className="w-96 h-96 -mt-10 -mr-10 animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-finOrange/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <Landmark className="w-5 h-5" />
              <span>Business Liquidity Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Fuel Your Daily Operations with <span className="text-finOrange">Working Capital.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Maintain seamless business cycles and uninterrupted cash flow. We offer fast-sanctioning credit facilities ranging from ₹30 Lakh to ₹25 Crore against diverse collateral.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
                Apply for Credit Line <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Products & Funding Norms */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Products Offered */}
            <div className="lg:col-span-2">
              <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Credit Facilities</span>
              <h2 className="text-3xl font-bold text-finBlue mb-8">Our Funding Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-finOrange/50 hover:-translate-y-1 transition-all">
                  <Coins className="w-12 h-12 text-finOrange mb-6" />
                  <h3 className="text-xl font-bold text-finBlue mb-3">Cash Credit (CC)</h3>
                  <p className="text-gray-600 leading-relaxed">A revolving credit facility backed directly by your stock, inventory, and market receivables to meet everyday operational expenses.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-finBlue/50 hover:-translate-y-1 transition-all">
                  <Activity className="w-12 h-12 text-finBlue mb-6" />
                  <h3 className="text-xl font-bold text-finBlue mb-3">Overdraft (OD / Drop Line)</h3>
                  <p className="text-gray-600 leading-relaxed">Flexible withdrawal limits secured against real estate or fixed assets. Pay interest exclusively on the exact amount utilized.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-finOrange/50 hover:-translate-y-1 transition-all md:col-span-2 flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-orange-50 p-4 rounded-full flex-shrink-0">
                    <ShieldCheck className="w-12 h-12 text-finOrange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-finBlue mb-2">CGTMSE Unsecured Loans</h3>
                    <p className="text-gray-600">Central government guaranteed working capital loans designed specifically for eligible MSMEs requiring liquidity without heavy collateral constraints.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Size & Eligibility */}
            <div className="bg-finBlue text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
              <Landmark className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Funding Norms</h3>
                
                <div className="bg-white/10 p-8 rounded-2xl mb-10 text-center border border-white/20 backdrop-blur-sm">
                  <p className="text-finOrange font-bold text-sm tracking-widest uppercase mb-3">Ticket Size</p>
                  <p className="text-4xl font-extrabold">₹30 Lakh</p>
                  <p className="text-sm font-medium text-gray-400 my-2">up to</p>
                  <p className="text-4xl font-extrabold text-finOrange">₹25 Crore</p>
                </div>

                <h4 className="font-bold text-lg mb-6 flex items-center border-b border-white/20 pb-4">
                  <CheckCircle className="w-5 h-5 text-finOrange mr-3" />
                  The Eligibility Edge
                </h4>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="w-2.5 h-2.5 mt-1.5 bg-finOrange rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-gray-300 font-medium">All Business Profiles Considered</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2.5 h-2.5 mt-1.5 bg-finOrange rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-gray-300 font-medium">Complex CIBIL Cases Evaluated</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2.5 h-2.5 mt-1.5 bg-finOrange rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-gray-300 font-medium">Fast Sanction & Quick Disbursal</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW: Interactive Drawing Power (DP) Calculator */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Liquidity Modeler</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Calculate Your Drawing Power (DP)</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Estimate the maximum Cash Credit (CC) limit banks will allow based on your current assets and standard banking margins.</p>
          </div>

          <div className="bg-slate-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-200">
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue flex items-center">
                    Total Inventory / Stock 
                    <span className="group relative ml-2">
                      <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50">
                        Value of raw materials, WIP, and finished goods lying in your warehouse.
                      </div>
                    </span>
                  </label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue shadow-sm">
                    {formatINR(inventory)}
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="100000000" step="500000" 
                  value={inventory} onChange={(e) => setInventory(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-finBlue"
                />
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-finBlue flex items-center">
                    Total Receivables (Debtors)
                    <span className="group relative ml-2">
                      <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50">
                        Money owed to you by customers (typically under 90 days old).
                      </div>
                    </span>
                  </label>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-finBlue shadow-sm">
                    {formatINR(receivables)}
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="100000000" step="500000" 
                  value={receivables} onChange={(e) => setReceivables(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-finBlue"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-red-500">Trade Payables (Creditors)</label>
                  <div className="bg-white border border-red-200 px-4 py-2 rounded-lg font-bold text-red-500 shadow-sm">
                    - {formatINR(creditors)}
                  </div>
                </div>
                <input 
                  type="range" min="0" max="50000000" step="500000" 
                  value={creditors} onChange={(e) => setCreditors(Number(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                {creditors >= inventory && (
                  <p className="text-xs text-red-500 mt-2 font-bold flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> Creditors exceed inventory. Paid stock value is 0.</p>
                )}
                {creditors < inventory && (
                  <p className="text-xs text-gray-500 mt-2 italic">*Creditors are deducted from inventory before banks calculate the DP margin.</p>
                )}
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 md:p-12 md:w-2/5 bg-slate-900 text-white relative flex flex-col justify-center overflow-hidden">
              <Calculator className="absolute bottom-0 right-0 w-48 h-48 opacity-5 text-finOrange pointer-events-none" />
              
              <div className="relative z-10 transition-all duration-300">
                <h3 className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-6">Standard Margin Deductions</h3>
                
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Paid Inventory (Less 25% Margin)</span>
                    <span className="font-bold text-white">{formatINR(eligibleInventory)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Receivables (Less 40% Margin)</span>
                    <span className="font-bold text-white">{formatINR(eligibleReceivables)}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <p className="text-finOrange font-bold text-sm tracking-widest uppercase mb-2 flex items-center">
                    Estimated Drawing Power
                    <span className="group relative ml-2">
                      <Info className="w-4 h-4 text-finOrange cursor-pointer" />
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-white text-gray-800 text-xs rounded shadow-xl z-50">
                        The maximum amount you can withdraw from your CC account at this specific moment.
                      </div>
                    </span>
                  </p>
                  <p className="text-4xl font-extrabold text-green-400">{formatINR(drawingPower)}</p>
                  <p className="text-xs text-gray-500 mt-3 italic">*Subject to exact bank policies and aging of debtors (usually capped at 90-120 days).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW: LTV Matrix Tabs (Collateral Focus) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Collateral & Loan Against Property</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Leverage your real estate assets for maximum liquidity. We optimize Loan-to-Value (LTV) ratios across various property types.</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
            {/* Scrollable Tab Header for Mobile */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 bg-slate-50">
              {Object.keys(ltvMatrix).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveLtvTab(key)}
                  className={`flex-none md:flex-1 py-5 px-6 text-center font-bold text-sm md:text-base transition-colors flex flex-row items-center justify-center gap-2 whitespace-nowrap ${activeLtvTab === key ? 'border-b-4 border-finOrange text-finBlue bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 border-b-4 border-transparent'}`}
                >
                  <div className={`${activeLtvTab === key ? 'text-finOrange' : 'text-gray-400'}`}>
                    {ltvMatrix[key].icon}
                  </div>
                  <span>{ltvMatrix[key].title}</span>
                </button>
              ))}
            </div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-finBlue mb-4">{ltvMatrix[activeLtvTab].title}</h3>
                  <div className="inline-block bg-green-100 text-green-700 font-extrabold px-4 py-2 rounded-lg mb-6 border border-green-200">
                    Max LTV: {ltvMatrix[activeLtvTab].ltv}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{ltvMatrix[activeLtvTab].desc}</p>
                </div>
                
                <div className="md:w-1/2 bg-slate-50 p-8 rounded-2xl border border-gray-100 w-full">
                  <h4 className="font-bold text-finBlue mb-6 text-lg">Key Advantages:</h4>
                  <ul className="space-y-4">
                    {ltvMatrix[activeLtvTab].points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-finOrange mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <div className="bg-finOrange/10 border border-finOrange/20 px-6 py-4 rounded-xl flex items-center justify-center text-finBlue font-bold shadow-sm">
              <Map className="w-5 h-5 text-finOrange mr-3" /> Up to 80% LTV on Open Plots
            </div>
            <div className="bg-finBlue/5 border border-finBlue/10 px-6 py-4 rounded-xl flex items-center justify-center text-finBlue font-bold shadow-sm">
              <Building className="w-5 h-5 text-finBlue mr-3" /> Up to 100% on Fully Constructed
            </div>
          </div>
        </div>
      </section>

      {/* 5. Specialised Funding Alert */}
      <section className="bg-finBlue py-16 relative overflow-hidden">
        <Activity className="absolute inset-0 w-full h-full text-white opacity-5 scale-150 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex flex-col md:flex-row items-center justify-center bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl">
            <AlertCircle className="w-12 h-12 text-finOrange mb-4 md:mb-0 md:mr-6" />
            <div className="text-left text-center md:text-left">
              <p className="text-white text-xl font-medium mb-1">
                Specialised Project Finance Available For
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-finOrange tracking-wide">
                HOTELS & HOSPITAL PROPERTIES
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="mt-6 md:mt-0 md:ml-8 bg-finOrange hover:bg-finOrange-light text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Consult Now
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Clearing up common questions about Working Capital limits.</p>
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

      {/* 7. Lead Magnet: Required Documents Checklist */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-gray-100 relative overflow-hidden">
            <FileText className="absolute top-0 right-0 w-64 h-64 text-slate-50 opacity-50 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-finBlue mb-2">Get The Pre-Sanction Checklist</h3>
              <p className="text-gray-600">Download the exact list of financial documents, KYC, and property papers needed to fast-track your OD/CC application.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex flex-col sm:flex-row w-full shadow-md rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Director Email" 
                  className="w-full sm:w-64 px-6 py-4 border border-gray-300 sm:border-r-0 focus:outline-none focus:border-finOrange bg-slate-50 text-gray-800 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
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

export default WorkingCapital;