import React, { useState } from 'react';
import { 
  CheckCircle, ArrowRight, Building2, FileText, Globe, 
  ChevronDown, ChevronUp, Download, Landmark, TrendingUp, 
  Shield, Briefcase, Calculator, X, Send, Scale, Plane, Coins
} from 'lucide-react';

const GiftCity = () => {
  // --- STATE MANAGEMENT ---
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('PRE'); // 'PRE' or 'POST'
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Tax Calculator State
  const [projectedProfit, setProjectedProfit] = useState(100000000); // Default 10 Cr

  // --- CALCULATOR MATH ---
  // Assuming standard corporate tax + surcharge is ~25.17%. GIFT City is 0% for 10 years.
  const standardTax = projectedProfit * 0.2517;
  const giftCityTax = 0; // 100% exemption
  const totalSavings = standardTax - giftCityTax;

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- DATA ARRAYS ---
  const steps = [
    { id: "01", title: "Name Reservation (MCA)", desc: "Reserving the proposed entity name via the MCA portal ensuring IFSC naming conventions." },
    { id: "02", title: "MOA & AOA Drafting", desc: "Drafting charter documents strictly aligned with the specific financial services to be offered." },
    { id: "03", title: "Company Incorporation", desc: "Filing SPICe+ forms for the official registration of the private/public limited company." },
    { id: "04", title: "PAN / TAN Registration", desc: "Acquiring crucial tax identification numbers simultaneously with incorporation." },
    { id: "05", title: "Office Lease Agreement", desc: "Executing a provisional leasing agreement within the designated SEZ area of GIFT City." },
    { id: "06", title: "SEZ Approval", desc: "Filing Form-F to obtain the Letter of Approval (LOA) from the Development Commissioner, SEZ." },
    { id: "07", title: "IFSCA Registration", desc: "Submitting detailed business plans and net-worth proofs for the regulatory IFSCA license." },
    { id: "08", title: "Bank Account Opening", desc: "Setting up IFSC Banking Unit (IBU) accounts for foreign and domestic currency transactions." },
    { id: "09", title: "Commencement Approval", desc: "Final verification and approval to officially commence global financial operations." },
  ];

  const faqs = [
    { question: "How long does the entire GIFT City setup process take?", answer: "Typically, the end-to-end process from Name Reservation to Commencement Approval takes between 45 to 60 working days, depending on prompt document submission and regulatory processing times." },
    { question: "Is a physical office mandatory in the GIFT City SEZ?", answer: "Yes, obtaining a provisional or final lease agreement within the designated Special Economic Zone (SEZ) of GIFT City is a mandatory prerequisite for IFSCA approval." },
    { question: "What are the primary tax benefits of operating in GIFT IFSC?", answer: "Entities enjoy a 100% tax exemption for any 10 consecutive years out of a 15-year block, 0% GST on services received or provided to IFSC/SEZ units, and exemptions on MAT/AMT." },
    { question: "Can a foreign company set up a branch in GIFT City?", answer: "Absolutely. Foreign entities can set up a branch, subsidiary, or a joint venture in the IFSC, subject to specific net-worth and regulatory guidelines set by the IFSCA." }
  ];

  const targetSectors = [
    { title: "Alternative Investment Funds (AIF)", icon: <Briefcase className="w-8 h-8 text-finOrange" />, desc: "Set up outbound or inbound AIFs with major tax pass-through benefits." },
    { title: "Banking & Capital Markets", icon: <Landmark className="w-8 h-8 text-finBlue" />, desc: "Establish IFSC Banking Units (IBUs) and broker-dealer operations." },
    { title: "Fintech & Tech Platforms", icon: <Globe className="w-8 h-8 text-finOrange" />, desc: "Leverage the regulatory sandbox for global financial technology testing." },
    { title: "Aircraft & Ship Leasing", icon: <Plane className="w-8 h-8 text-finBlue" />, desc: "Capitalize on specialized frameworks and exemptions for asset leasing." }
  ];

  return (
    <div className="bg-white relative">
      
      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Briefcase className="w-5 h-5 mr-2"/> Book Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Request Sent Successfully!"); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
                <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none" placeholder="Global Corp Ltd." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Sector</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-finOrange outline-none bg-white">
                  <option>Banking / AIF</option>
                  <option>Fintech</option>
                  <option>Family Office</option>
                  <option>Other</option>
                </select>
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
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-finBlue-light/50 to-transparent"></div>
        <Globe className="absolute top-10 -right-20 w-96 h-96 text-white opacity-5 animate-[spin_120s_linear_infinite]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-4">
              <Landmark className="w-5 h-5" />
              <span>India's Global Financial Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Gateway to Global Expansion: <span className="text-finOrange">GIFT City IFSC.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              We provide end-to-end execution—from structuring and SEZ approval to regulatory IFSCA licensing. Step into India's premier international financial center with absolute confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-finOrange hover:bg-finOrange-light text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg shadow-finOrange/30 flex justify-center items-center">
                Schedule Advisory Call <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Bar */}
      <div className="bg-slate-900 text-white py-6 border-b-4 border-finOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700">
          <div><p className="text-2xl font-bold text-finOrange">100%</p><p className="text-xs uppercase tracking-wider text-gray-400">Tax Exemption</p></div>
          <div><p className="text-2xl font-bold text-finOrange">0%</p><p className="text-xs uppercase tracking-wider text-gray-400">GST for IFSC Units</p></div>
          <div><p className="text-2xl font-bold text-finOrange">Single</p><p className="text-xs uppercase tracking-wider text-gray-400">Unified Regulator</p></div>
          <div><p className="text-2xl font-bold text-finOrange">USD</p><p className="text-xs uppercase tracking-wider text-gray-400">Foreign Currency Accounts</p></div>
        </div>
      </div>

      {/* 3. NEW: Interactive Tax Savings Calculator */}
      <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">The Financial Advantage</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Calculate Your Tax Savings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Model your potential savings leveraging GIFT City's 10-year 100% tax holiday versus a standard Indian corporate setup.</p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-gray-200 max-w-4xl mx-auto shadow-xl">
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="font-bold text-finBlue text-lg">Projected Annual Profit</label>
                <div className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-bold text-2xl text-finOrange shadow-sm">
                  {formatINR(projectedProfit)}
                </div>
              </div>
              <input 
                type="range" min="10000000" max="1000000000" step="10000000" 
                value={projectedProfit} onChange={(e) => setProjectedProfit(Number(e.target.value))}
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-finBlue"
              />
              <div className="flex justify-between text-xs font-bold text-gray-400 mt-3">
                <span>₹1 Crore</span><span>₹100 Crore</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                <p className="text-gray-500 font-semibold mb-1">Standard Indian Setup</p>
                <p className="text-3xl font-bold text-gray-800">{formatINR(standardTax)}</p>
                <p className="text-xs text-red-500 mt-2">Estimated Tax Payable (~25%)</p>
              </div>
              <div className="bg-finBlue p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-finOrange"></div>
                <p className="text-gray-300 font-semibold mb-1">GIFT City IFSC Setup</p>
                <p className="text-3xl font-bold text-white">{formatINR(giftCityTax)}</p>
                <p className="text-xs text-finOrange mt-2">100% Tax Exemption Applies</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Total Annual Savings</p>
              <p className="text-5xl font-extrabold text-green-500">{formatINR(totalSavings)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW: Target Sectors Grid */}
      <section className="py-20 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Who Should Set Up in GIFT City?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The IFSC framework is highly optimized for specific global financial operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetSectors.map((sector, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-finOrange transition-colors">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {sector.icon}
                </div>
                <h3 className="font-bold text-finBlue mb-2">{sector.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The 9-Step Vertical Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-finOrange font-bold tracking-wider uppercase text-sm mb-4 block">Execution Roadmap</span>
            <h2 className="text-3xl font-bold text-finBlue mb-4">Complete Entity Registration Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless, heavily structured market entry designed to strictly adhere to IFSC and SEZ norms.</p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 md:-translate-x-1/2"></div>
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-finOrange rounded-full flex items-center justify-center font-bold text-finBlue text-lg z-10 shadow-lg">
                    {step.id}
                  </div>
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <div className="bg-slate-50 p-6 rounded-xl border border-gray-100 hover:border-finOrange/30 hover:shadow-md transition-all duration-300">
                      <h3 className="text-xl font-bold text-finBlue mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW: Head-to-Head Comparison Table */}
      <section className="py-20 bg-finBlue text-white border-t-4 border-finOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">GIFT City vs. Standard Setup</h2>
            <p className="text-gray-300">Why corporate entities are migrating their financial operations to the IFSC.</p>
          </div>
          <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-6 font-bold text-gray-300">Parameter</th>
                  <th className="p-6 font-bold text-finOrange border-l border-white/10">GIFT City IFSC Entity</th>
                  <th className="p-6 font-bold text-gray-400 border-l border-white/10">Standard Indian Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-6 font-medium">Corporate Tax</td>
                  <td className="p-6 font-bold text-white border-l border-white/10 bg-finOrange/10">100% Exemption for 10 yrs</td>
                  <td className="p-6 text-gray-400 border-l border-white/10">Approx 25% - 30%</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">Regulatory Body</td>
                  <td className="p-6 font-bold text-white border-l border-white/10 bg-finOrange/10">Unified (IFSCA)</td>
                  <td className="p-6 text-gray-400 border-l border-white/10">Multiple (RBI, SEBI, IRDAI)</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">GST Applicable</td>
                  <td className="p-6 font-bold text-white border-l border-white/10 bg-finOrange/10">0% (Nil)</td>
                  <td className="p-6 text-gray-400 border-l border-white/10">Standard Rates (18%+)</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">Currency Status</td>
                  <td className="p-6 font-bold text-white border-l border-white/10 bg-finOrange/10">Deemed Foreign Territory (USD/EUR)</td>
                  <td className="p-6 text-gray-400 border-l border-white/10">Strict Domestic (INR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Interactive Pre & Post Setup Support (Dynamic Tabs) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Comprehensive Corporate Support</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We stay with you beyond incorporation to ensure flawless regulatory compliance.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex border-b border-gray-200 bg-white">
              <button 
                onClick={() => setActiveTab('PRE')}
                className={`flex-1 py-5 text-center font-bold text-lg transition-colors flex items-center justify-center ${activeTab === 'PRE' ? 'border-b-4 border-finOrange text-finBlue bg-slate-50' : 'text-gray-400 hover:bg-gray-50 border-b-4 border-transparent'}`}
              >
                <Globe className="w-5 h-5 mr-2" /> Pre-Establishment
              </button>
              <button 
                onClick={() => setActiveTab('POST')}
                className={`flex-1 py-5 text-center font-bold text-lg transition-colors flex items-center justify-center ${activeTab === 'POST' ? 'border-b-4 border-finOrange text-finBlue bg-slate-50' : 'text-gray-400 hover:bg-gray-50 border-b-4 border-transparent'}`}
              >
                <Building2 className="w-5 h-5 mr-2" /> Post-Establishment
              </button>
            </div>

            <div className="p-8 md:p-12">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(activeTab === 'PRE' 
                  ? ['Structuring Advisory (Banking, AIF, Fintech)', 'Drafting MOA as per strict IFSC norms', 'Comprehensive Regulatory Documentation', 'SEZ & IFSCA Coordination & Representation', 'Lease & Office Infrastructure Support', 'Business Plan Formulation for Regulators']
                  : ['IFSCA Periodic Reporting & Returns', 'SEZ Compliance & APR Filings', 'ROC Filings & Board Resolutions Management', 'Accounting, Bookkeeping & GST Advisory', 'Statutory Audit Coordination', 'Continuous FEMA Compliance Monitoring']
                ).map((item, i) => (
                  <li key={i} className="flex items-start bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle className="w-6 h-6 text-finOrange mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finBlue mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Insights into the GIFT City setup process.</p>
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
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-2xl border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-finBlue mb-2">Download the Comprehensive Setup Guide</h3>
              <p className="text-gray-600">Get a detailed PDF breaking down compliance requirements, expected capital outlay, and step-by-step documentation needed for GIFT City.</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <form className="flex w-full shadow-sm" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Corporate Email" 
                  className="w-full md:w-64 px-4 py-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-finOrange"
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

export default GiftCity;

