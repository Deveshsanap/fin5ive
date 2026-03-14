import React, { useState } from 'react';
import { 
  Linkedin, ArrowRight, Briefcase, Award, 
  Globe, Building2, Send, X, Calendar, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createLead } from '../config/api'; // <-- Backend Integration intact

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  
  // --- FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleOpenModal = (leaderName) => {
    setSelectedLeader(leaderName);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Consultation with ${selectedLeader}`,
        message: `Direct request from the Leadership Team page.`
      });
      toast.success(`Consultation request sent to ${selectedLeader}'s office.`);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      toast.error('Failed to send request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const founders = [
    {
      name: "CA Chetan Joshi",
      role: "Founder & Managing Director",
      image: "https://ui-avatars.com/api/?name=Chetan+Joshi&background=003366&color=fff&size=512",
      bio: "A seasoned Chartered Accountant and expert in Capital Markets, IPO Structuring, and GIFT City offshore establishment, Chetan brings decades of institutional insight to corporate clients. He specializes in MSME financial engineering, architecting massive cost-reduction strategies through precision Working Capital funding, ZED certifications, and Government Subsidies. By bridging elite capital market strategies with specialized MSME financial tools, he ensures corporate growth and capital optimization.",
      credentials: [
        "CA (Chartered Accountant): Expert in high-level tax, audit, and capital market strategies.", 
        "NISM Series XXI-A: Portfolio Management Services (PMS) Specialist.", 
        "NISM Series XIII: Common Derivative Certification for advanced market hedging.",
        "RERA Certified: Registered advisor for compliant real estate investment portfolios."
      ],
      specialties: ["Capital Markets & IPOs", "MSME Funding Solutions", "Debt Syndication", "GIFT City Advisory", "ZED Certification"]
    },
    {
      name: "CMA Neha Joshi",
      role: "Co-Founder & Director",
      image: "https://ui-avatars.com/api/?name=Neha+Joshi&background=FF6600&color=fff&size=512",
      bio: "A highly credentialed Cost and Management Accountant (CMA), Neha applies analytical precision to personal finance and wealth management. She specializes in engineering robust financial portfolios through data-driven Mutual Fund strategies and comprehensive Insurance planning. By focusing on cost-efficiency and risk mitigation, Neha ensures that individual investments are optimized for long-term growth while protecting assets against life’s uncertainties.",
      credentials: [
        "CMA (Cost & Management Accountant): Expert in financial precision and cost-efficiency.", 
        "NISM Series V-A: Certified Mutual Fund Distributor and Wealth Manager.", 
        "IRDA IC-38 Certified: Licensed by the IRDAI to provide regulated Life, Health, and General Insurance advisory and claims assistance."
      ],
      specialties: ["Mutual Fund Strategies", "Comprehensive Insurance", "Goal-Based Planning", "Risk Management", "Tax-Efficient Investing"]
    }
  ];

  return (
    <div className="bg-white overflow-hidden font-sans">
      
      {/* --- CONSULTATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Calendar className="w-5 h-5 mr-2"/> Request Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition p-1"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-5" onSubmit={handleFormSubmit}>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-2 flex items-center">
                <Briefcase className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-600 font-medium">
                  Directing inquiry to the office of:<br/>
                  <span className="font-bold text-[#003366] text-base">{selectedLeader}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Corporate Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="director@company.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="+91 98765 43210" />
              </div>
              
              <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl mt-4 flex justify-center items-center transition-all shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#FF6600] hover:bg-[#e55c00]'}`}>
                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : <>Submit Request <Send className="w-5 h-5 ml-2" /></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <div className="bg-[#003366] text-white py-24 relative overflow-hidden">
        <Building2 className="absolute top-10 -right-20 w-[500px] h-[500px] text-white opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
            <Award className="w-4 h-4" />
            <span>Leadership & Governance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            Meet the Minds Behind <br/><span className="text-[#FF6600]">Your Growth.</span>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366] mb-4">Managing Partners</h2>
            <div className="w-20 h-1 bg-[#FF6600] mx-auto rounded-full"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-3xl font-black text-white mb-1">{founder.name}</h3>
                    <p className="text-[#FF6600] font-bold tracking-wider uppercase text-sm">{founder.role}</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-between ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{founder.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="flex items-center font-bold text-[#003366] mb-4 border-b border-gray-100 pb-2">
                          <Award className="w-5 h-5 text-[#FF6600] mr-2" /> Credentials
                        </h4>
                        <ul className="space-y-3">
                          {founder.credentials.map((cred, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#003366] mt-1.5 mr-3 flex-shrink-0"></span> {cred}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center font-bold text-[#003366] mb-4 border-b border-gray-100 pb-2">
                          <Globe className="w-5 h-5 text-[#FF6600] mr-2" /> Core Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {founder.specialties.map((spec, i) => (
                            <span key={i} className="bg-slate-50 border border-gray-200 text-[#003366] text-xs px-3 py-1.5 rounded-lg font-bold">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                    <button onClick={() => handleOpenModal(founder.name)} className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center shadow-md">
                      Consult with {founder.name.split(' ')[1]} <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-slate-100 border border-gray-200 text-[#003366] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center">
                      <Linkedin className="w-5 h-5 mr-2 text-[#0a66c2]" /> Connect
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6600] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#003366] opacity-50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Want to join our growing team?</h2>
          <p className="text-lg text-gray-400 mb-10">
            We are constantly looking for dynamic Chartered Accountants, Financial Analysts, and Corporate Lawyers who share our execution-first philosophy.
          </p>
          <Link to="/work-with-us" className="inline-flex items-center bg-[#FF6600] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
            View Open Positions <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Team;