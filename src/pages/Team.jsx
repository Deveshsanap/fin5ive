import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Mail, ArrowRight, Briefcase, Award, 
  GraduationCap, Globe, Building2, Send, X, Calendar, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (leaderName) => {
    setSelectedLeader(leaderName);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.promise(promise, {
      loading: 'Sending request...',
      success: `Consultation request sent to ${selectedLeader}'s office.`,
      error: 'Failed to send request.',
    });

    promise.then(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    });
  };

  const founders = [
    {
      name: "CA Chetan Joshi",
      role: "Founder & Managing Director",
      image: "https://ui-avatars.com/api/?name=Chetan+Joshi&background=003366&color=fff&size=512",
      bio: "A seasoned Chartered Accountant with profound expertise in Capital Markets, IPO Structuring, and GIFT City offshore establishment. Chetan brings decades of tier-1 institutional insight to middle-market and large corporate clients.",
      credentials: ["FCA, Institute of Chartered Accountants of India", "Lead Advisor: SME & Mainboard IPOs", "GIFT City IFSC Specialist"],
      specialties: ["Capital Markets", "Corporate Structuring", "Offshore Finance"]
    },
    {
      name: "CMA Neha Joshi",
      role: "Co-Founder & Director",
      image: "https://ui-avatars.com/api/?name=Neha+Joshi&background=FF6600&color=fff&size=512",
      bio: "A highly credentialed Cost and Management Accountant specializing in MSME financial engineering. Neha architects massive cost-reduction strategies through precision Working Capital funding, ZED certifications, and Government Subsidies.",
      credentials: ["FCMA, Institute of Cost Accountants of India", "Govt. Subsidy & Policy Expert", "MSME Credit Strategist"],
      specialties: ["Working Capital", "ZED Certification", "Trade Finance"]
    }
  ];

  const departmentHeads = [
    {
      name: "Rajesh Sharma",
      role: "Head of Wealth Management",
      image: "https://ui-avatars.com/api/?name=Rajesh+Sharma&background=f8fafc&color=003366&size=512",
      focus: "HNI Portfolio Architecture & Estate Planning"
    },
    {
      name: "Priya Desai",
      role: "VP - Corporate Credit",
      image: "https://ui-avatars.com/api/?name=Priya+Desai&background=f8fafc&color=003366&size=512",
      focus: "Large Ticket LAP, Project Finance & Syndication"
    },
    {
      name: "Amit Patel",
      role: "Director - Global NRI Services",
      image: "https://ui-avatars.com/api/?name=Amit+Patel&background=f8fafc&color=003366&size=512",
      focus: "Cross-Border Taxation & Repatriation (FEMA)"
    }
  ];

  return (
    <div className="bg-white overflow-hidden font-sans">
      
      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-finBlue p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Calendar className="w-5 h-5 mr-2"/> Request Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-finOrange transition p-1"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-5" onSubmit={handleFormSubmit}>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-2 flex items-center">
                <Briefcase className="w-5 h-5 text-finOrange mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-600 font-medium">
                  Directing inquiry to the office of:<br/>
                  <span className="font-bold text-finBlue text-base">{selectedLeader}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input type="text" required className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-finOrange outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Corporate Email</label>
                <input type="email" required className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-finOrange outline-none transition-all" placeholder="director@company.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" required className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-finOrange outline-none transition-all" placeholder="+91 98765 43210" />
              </div>
              
              <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition-all shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-finOrange hover:bg-orange-600'}`}>
                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : <>Submit Request <Send className="w-5 h-5 ml-2" /></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <div className="bg-finBlue text-white py-24 relative overflow-hidden">
        <Building2 className="absolute top-10 -right-20 w-[500px] h-[500px] text-white opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-finOrange font-bold tracking-wider uppercase text-sm mb-6 bg-finOrange/10 border border-finOrange/20 px-4 py-2 rounded-full">
            <Award className="w-4 h-4" />
            <span>Leadership & Governance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            Meet the Minds Behind <br/><span className="text-finOrange">Your Growth.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our firm is driven by a consortium of Chartered Accountants, CMAs, and Corporate Strategists dedicated to flawless execution.
          </p>
        </div>
      </div>

      {/* 2. Founding Partners */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-4">Managing Partners</h2>
            <div className="w-20 h-1 bg-finOrange mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row group hover:-translate-y-1 transition-transform duration-300">
                
                {/* Image Side */}
                <div className={`w-full lg:w-2/5 relative overflow-hidden bg-slate-100 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-finBlue/90 via-finBlue/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-3xl font-black text-white mb-1">{founder.name}</h3>
                    <p className="text-finOrange font-bold tracking-wider uppercase text-sm">{founder.role}</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-between ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{founder.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="flex items-center font-bold text-finBlue mb-4">
                          <GraduationCap className="w-5 h-5 text-finOrange mr-2" /> Credentials
                        </h4>
                        <ul className="space-y-3">
                          {founder.credentials.map((cred, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-finBlue mt-1.5 mr-3 flex-shrink-0"></span> {cred}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center font-bold text-finBlue mb-4">
                          <Globe className="w-5 h-5 text-finOrange mr-2" /> Core Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {founder.specialties.map((spec, i) => (
                            <span key={i} className="bg-slate-50 border border-gray-200 text-finBlue text-xs px-3 py-1.5 rounded-lg font-bold">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                    <button onClick={() => handleOpenModal(founder.name)} className="bg-finBlue hover:bg-[#002244] text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center shadow-md">
                      Consult with {founder.name.split(' ')[1]} <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <a href="#" className="bg-slate-50 hover:bg-slate-100 border border-gray-200 text-finBlue font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center">
                      <Linkedin className="w-5 h-5 mr-2 text-[#0a66c2]" /> Connect
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Department Heads */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-4">Vertical Directors</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The senior experts executing our tailored financial strategies across distinct divisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departmentHeads.map((head, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-gray-100 text-center hover:shadow-xl hover:border-finOrange/30 transition-all duration-300 group">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                  <img src={head.image} alt={head.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-finBlue mb-1">{head.name}</h3>
                <p className="text-sm font-bold text-finOrange uppercase tracking-wider mb-4">{head.role}</p>
                <p className="text-gray-600 text-sm mb-8">{head.focus}</p>
                
                <div className="flex justify-center space-x-3">
                  <button onClick={() => handleOpenModal(head.name)} className="p-3 bg-white border border-gray-200 rounded-full hover:bg-finBlue hover:text-white hover:border-finBlue transition-colors text-gray-500 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </button>
                  <a href="#" className="p-3 bg-white border border-gray-200 rounded-full hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-colors text-gray-500 shadow-sm">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-finOrange opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-finBlue opacity-50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Want to join our growing team?</h2>
          <p className="text-lg text-gray-400 mb-10">
            We are constantly looking for dynamic Chartered Accountants, Financial Analysts, and Corporate Lawyers who share our execution-first philosophy.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-finOrange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-finOrange/30 hover:-translate-y-1">
            View Open Positions <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Team;