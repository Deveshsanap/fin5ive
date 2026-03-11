import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, HeartPulse, Umbrella, Car, 
  ArrowRight, CheckCircle2, ClipboardCheck, 
  ShieldAlert, Layers, X, Send, ChevronDown, ChevronUp,
  PhoneCall, Mail, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const InsuranceServices = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- DATA ARRAYS ---
  const insuranceTypes = [
    {
      title: "Life Insurance",
      desc: "Financial protection for your family and long-term security to ensure your loved ones are always cared for.",
      icon: <Umbrella className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "Health Insurance",
      desc: "Comprehensive coverage for medical expenses, hospitalizations, and unforeseen healthcare needs.",
      icon: <HeartPulse className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "Term Insurance",
      desc: "Pure protection plans providing exceptionally high coverage at affordable premiums to secure your family's future.",
      icon: <ShieldAlert className="w-8 h-8 text-[#FF6600]" />
    },
    {
      title: "General Insurance",
      desc: "Protection for your valuable physical assets such as property, vehicles, travel, and other associated risks.",
      icon: <Car className="w-8 h-8 text-[#FF6600]" />
    }
  ];

  const approachSteps = [
    {
      step: "01",
      title: "Understanding Profile",
      desc: "We begin by deeply understanding your financial goals, liabilities, and individual risk profile."
    },
    {
      step: "02",
      title: "Strategic Recommendation",
      desc: "Based on our analysis, we recommend suitable, tailored insurance solutions that fit your exact needs."
    },
    {
      step: "03",
      title: "Market Comparison",
      desc: "We impartially compare policies from multiple reputed insurance companies to find the best value."
    },
    {
      step: "04",
      title: "Execution & Support",
      desc: "We provide complete hand-holding with documentation, policy selection, and eventual claim settlements."
    }
  ];

  const whyChooseUs = [
    "Personalized, unbiased advisory approach.",
    "Direct access to multiple top-tier insurance providers.",
    "100% transparent and client-focused recommendations.",
    "Seamless integration with your overall financial planning."
  ];

  const faqs = [
    { 
      question: "Why do I need insurance if I have a strong investment portfolio?", 
      answer: "Investments create wealth, but insurance protects it. A single medical emergency or unforeseen tragedy can wipe out years of accumulated investments. Insurance acts as a financial moat, ensuring your portfolio remains untouched during crises." 
    },
    { 
      question: "Is FIN5IVE tied to a specific insurance company?", 
      answer: "No. We operate on an open-architecture model. This means we are completely unbiased and have direct access to multiple top-tier insurance providers. We recommend what is best for you, not what is best for a specific insurer." 
    },
    { 
      question: "How much Term Insurance cover do I actually need?", 
      answer: "A general rule of thumb is 15-20 times your annual income, plus any outstanding liabilities (like home loans). However, our experts calculate your exact Human Life Value (HLV) taking into account inflation, future goals, and current assets." 
    },
    { 
      question: "Do you assist during the claim settlement process?", 
      answer: "Absolutely. We don't just sell policies; we are your long-term partners. In the unfortunate event of a claim, our team provides complete hand-holding and liaises directly with the insurance company to ensure a smooth, hassle-free settlement." 
    }
  ];

  return (
    // FIXED: Removed pt-20 here so the Hero section touches the navbar directly
    <div className="bg-white font-sans relative overflow-hidden">

      {/* --- SCHEDULE REVIEW MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><ClipboardCheck className="w-5 h-5 mr-2"/> Schedule Policy Review</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              setIsModalOpen(false); 
              toast.success("Review Request Received! Our risk management team will contact you shortly."); 
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Interest</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none bg-white">
                  <option>Term Life Insurance</option>
                  <option>Comprehensive Health Insurance</option>
                  <option>General/Asset Insurance</option>
                  <option>Review Existing Policies</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition shadow-lg">
                Request Consultation <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <section className="relative bg-[#003366] text-white pb-24 pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <ShieldCheck className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Layers className="w-4 h-4" />
            <span>Risk Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            Grow Your Wealth. <br className="hidden md:block" />
            <span className="text-[#FF6600]">Protect Your Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            At FIN5IVE, we don't just focus on investments. We help our clients establish a bulletproof financial safety net through comprehensive risk management and tailored insurance solutions.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
            Protect Your Assets <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Types of Insurance Grid */}
      <section className="py-24 bg-slate-50 border-b border-gray-100 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Our Coverage</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Comprehensive Insurance Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">From personal health to physical assets, we offer a 360-degree approach to financial protection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {insuranceTypes.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:border-[#FF6600]/30 hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Approach (Process Timeline) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">How We Secure Your Wealth</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">A meticulous, data-driven approach to finding the perfect coverage for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[2.5rem] left-[10%] w-[80%] h-1 bg-slate-100 rounded-full"></div>

            {approachSteps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-slate-50 shadow-lg rounded-full flex items-center justify-center mb-6 relative group-hover:border-[#FF6600]/20 transition-colors duration-300">
                  <span className="text-2xl font-black text-[#003366] group-hover:text-[#FF6600] transition-colors">{step.step}</span>
                  {/* Active dot indicator */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6600] border-4 border-white rounded-full shadow-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">{step.title}</h3>
                <p className="text-gray-500 font-medium px-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us & CTA Split */}
      <section className="py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Why Choose Us */}
            <div className="p-10 md:p-16 lg:w-1/2 flex flex-col justify-center">
              <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">The FIN5IVE Advantage</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-8 tracking-tight">Why Choose FIN5IVE for Insurance?</h2>
              <div className="space-y-6">
                {whyChooseUs.map((point, i) => (
                  <div key={i} className="flex items-start bg-slate-50 p-4 rounded-2xl border border-gray-100">
                    <div className="mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#FF6600]" />
                    </div>
                    <p className="text-[#003366] font-bold leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: CTA Block */}
            <div className="bg-[#003366] p-10 md:p-16 lg:w-1/2 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6600] opacity-20 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <ClipboardCheck className="w-16 h-16 text-[#FF6600] mb-8" />
                <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tight">Integrate Insurance with your Wealth Portfolio.</h3>
                <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                  Don't leave your family's future to chance. Let our experts review your existing policies or help you build a new, impenetrable safety net.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setIsModalOpen(true)} className="inline-flex justify-center items-center bg-white hover:bg-slate-100 text-[#003366] font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg text-lg w-full sm:w-auto">
                    Schedule Policy Review <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clarity on our risk management approach.</p>
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

    </div>
  );
};

export default InsuranceServices;