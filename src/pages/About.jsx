import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, Globe, Users, Briefcase, Building2, 
  CheckCircle2, ArrowRight, Linkedin, Mail, Target, Repeat, 
  Crosshair, X, Send, Calendar, PhoneCall, CheckCircle
} from 'lucide-react';

const About = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState('General'); 

  const handleOpenModal = (leader) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
  };

  // --- DATA ARRAYS ---
  // Extracted exactly from the client's old website screenshot
  const powerOfFive = [
    {
      id: 1,
      icon: <Target className="w-8 h-8 text-[#FF6600]" />,
      title: "Focused Efforts",
      desc: "Financial goals require a well-defined strategy. We ensure that each client's wealth and investment plan is built with laser-sharp focus to achieve optimal results."
    },
    {
      id: 2,
      icon: <Repeat className="w-8 h-8 text-[#FF6600]" />,
      title: "Consistent Efforts",
      desc: "Success is not an overnight phenomenon. Our approach is rooted in persistence and continuous monitoring to maximize value creation for our clients."
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-8 h-8 text-[#FF6600]" />,
      title: "Transparency in Dealings",
      desc: "Trust is at the heart of our relationships. We uphold the highest standards of honesty and integrity, ensuring clients always have a clear understanding of their financial roadmap."
    },
    {
      id: 4,
      icon: <Crosshair className="w-8 h-8 text-[#FF6600]" />,
      title: "Clinical Precision in Execution",
      desc: "Investment strategies demand meticulous planning and flawless execution. We bring a structured, data-driven approach to financial decision making, ensuring precision in every move."
    },
    {
      id: 5,
      icon: <Award className="w-8 h-8 text-[#FF6600]" />,
      title: "Unmatched Expertise",
      desc: "Our leadership comprises seasoned financial professionals with extensive experience in wealth management, investment advisory, and corporate finance. Their deep industry insights empower our clients to make informed decisions."
    }
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      
      {/* --- LEADERSHIP CONTACT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Calendar className="w-5 h-5 mr-2"/> Book Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert(`Consultation request for ${selectedLeader} sent successfully! Our executive team will schedule your call.`); }}>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-4 text-sm text-gray-600 font-medium flex items-center">
                <Briefcase className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0" />
                Requesting consultation regarding: <span className="font-bold text-[#003366] ml-1">{selectedLeader === 'General' ? 'Corporate Advisory' : selectedLeader}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Entity</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
                <input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="director@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description of Requirement</label>
                <textarea required rows="3" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none resize-none" placeholder="E.g., Looking for SME IPO advisory or ₹10 Cr Working Capital..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 rounded-xl mt-2 flex justify-center items-center transition shadow-lg">
                Submit Request <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <div className="bg-[#003366] text-white pt-24 pb-24 lg:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Building2 className="w-96 h-96 -mt-10 -mr-10 animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6600]/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Award className="w-4 h-4" />
            <span>Company Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            Strategic Planning. <br className="hidden md:block" />
            <span className="text-[#FF6600]">Sustainable Growth.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            At FIN5IVE MANAGEMENT PRIVATE LIMITED, we believe in the transformative power of strategic financial planning and disciplined wealth management.
          </p>
          <button onClick={() => handleOpenModal('General')} className="inline-flex items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 text-lg">
            Consult with our Experts <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. Impact Statistics */}
      <div className="bg-slate-900 text-white py-10 border-b-4 border-[#FF6600] relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-700">
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">25<span className="text-2xl text-white">+</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Years Experience</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">₹1000<span className="text-2xl text-white">Cr+</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Capital Managed</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">100<span className="text-2xl text-white">%</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Execution Focus</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">4.9<span className="text-2xl text-white">/5</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Client Trust Score</p></div>
        </div>
      </div>

      {/* 3. About Company Content (From Screenshot) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Images Collage */}
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team discussion" 
                  className="rounded-3xl shadow-xl w-full h-64 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Business handshake" 
                  className="rounded-3xl shadow-xl w-full h-64 object-cover mt-8"
                />
              </div>
              
              {/* Floating Experience Badge (From Client Screenshot) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 text-center w-64 z-20">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#FF6600]" />
                </div>
                <h3 className="text-2xl font-black text-[#003366] mb-2">25+ Years Experience</h3>
                <p className="text-gray-500 text-sm font-medium leading-snug">Decades of combined leadership experience navigating complex corporate finance.</p>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">About Company</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-6 tracking-tight">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As a premier investment advisory and corporate finance firm, we are dedicated to helping our clients navigate the complexities of financial markets and achieve sustainable growth.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We have established an elite team of investment professionals, specifically focused on wealth management, business funding, and structural buyouts for HNIs and corporate entities.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Tailored financial solutions for resident Indians and Non-Resident Indians (NRIs).', 
                  'Strict regulatory alignment & ethical advisory.', 
                  'Access to trusted banks, NBFCs & Investment Platforms.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Power of 5 Section (From Client Screenshot) */}
      <section className="py-24 bg-slate-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003366]/5 transform skew-x-12 translate-x-32 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">The Power of 5</h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
              Our name, FIN5IVE, embodies our core philosophy. We firmly adhere to five guiding principles that form the foundation of our entire approach to wealth management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerOfFive.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-[#FF6600]/30 transition-all duration-300 group ${index === 3 ? 'lg:col-start-1 lg:ml-auto lg:mr-4' : ''} ${index === 4 ? 'lg:col-start-2 lg:mr-auto lg:ml-4' : ''}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-orange-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100 select-none group-hover:text-[#003366]/5 transition-colors duration-300">0{item.id}</span>
                </div>
                <h3 className="text-xl font-black text-[#003366] mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Leadership Section (Maintained from previous, updated colors) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Our Experts</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Meet The Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Guided by industry veterans with decades of experience in corporate structuring, capital markets, and global wealth management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* CA Chetan Joshi */}
            <div className="bg-slate-50 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-80 bg-[#003366] relative overflow-hidden flex items-center justify-center">
                <img src="https://ui-avatars.com/api/?name=Chetan+Joshi&background=003366&color=fff&size=512" alt="CA Chetan Joshi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black text-white">CA Chetan Joshi</h3>
                      <p className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mt-2">Founder & Managing Director</p>
                    </div>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-2xl hover:bg-[#FF6600] transition backdrop-blur-md z-20">
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                    A seasoned Chartered Accountant with profound expertise in Capital Markets, IPO Structuring, and GIFT City offshore establishment. Chetan brings decades of tier-1 institutional insight to middle-market and large corporate clients.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">IPO Advisory</span>
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">GIFT City IFSC</span>
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">Corporate Finance</span>
                  </div>
                </div>
                <button onClick={() => handleOpenModal('CA Chetan Joshi - IPO & GIFT City')} className="w-full bg-white hover:bg-[#003366] hover:text-white text-[#003366] border border-gray-200 hover:border-[#003366] font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center shadow-sm">
                  Consult with Chetan <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* CMA Neha Joshi */}
            <div className="bg-slate-50 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-80 bg-[#FF6600] relative overflow-hidden flex items-center justify-center">
                <img src="https://ui-avatars.com/api/?name=Neha+Joshi&background=FF6600&color=fff&size=512" alt="CMA Neha Joshi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black text-white">CMA Neha Joshi</h3>
                      <p className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mt-2">Co-Founder & Director</p>
                    </div>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-2xl hover:bg-[#FF6600] transition backdrop-blur-md z-20">
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                    A highly credentialed Cost and Management Accountant specializing in MSME financial engineering. Neha architects massive cost-reduction strategies through precision Working Capital funding, ZED certifications, and Government Subsidies.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">MSME Funding</span>
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">ZED Certification</span>
                    <span className="bg-white border border-gray-200 text-[#003366] text-xs px-4 py-2 rounded-full font-bold shadow-sm">Subsidies</span>
                  </div>
                </div>
                <button onClick={() => handleOpenModal('CMA Neha Joshi - MSME Funding & ZED')} className="w-full bg-white hover:bg-[#FF6600] hover:text-white text-[#003366] border border-gray-200 hover:border-[#FF6600] font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center shadow-sm">
                  Consult with Neha <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Global Network & Partners (Marquee) */}
      <section className="py-20 bg-[#003366] text-white relative overflow-hidden">
        <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-white opacity-5 animate-[spin_200s_linear_infinite] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Our Marquee Network</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-12 text-lg font-medium">
            We hold strong empanelments and direct associations with India's leading banks, AMCs, stock exchanges, and regulatory authorities.
          </p>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
            <p className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-8">Empanelled With & Regulated By</p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-90">
              {['NSE Emerge', 'BSE SME', 'GIFT City IFSC', 'MSME - QCI', 'Top AMFI Entities', 'HDFC Bank', 'SBI Mutual Fund'].map((partner, i) => (
                <div key={i} className="flex items-center px-6 py-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="text-lg font-bold tracking-tight">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FF6600] rounded-[3rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <Target className="absolute -bottom-10 -right-10 w-80 h-80 text-white opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to Accelerate Your Growth?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
                Whether you are preparing for an IPO, seeking massive working capital, or structuring your cross-border wealth—our leadership is ready to partner with you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <button onClick={() => handleOpenModal('General')} className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-5 px-10 rounded-2xl shadow-[0_10px_20px_rgba(0,51,102,0.3)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-lg">
                  Contact Leadership <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                
                <a href="mailto:info.fivefin@gmail.com" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-5 px-10 rounded-2xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm text-lg">
                  <Mail className="w-5 h-5 mr-2" /> Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;