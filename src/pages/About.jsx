import React, { useState } from 'react';
import chetanPhoto from '../assets/chetanJoshi.png';
import nehaPhoto from '../assets/nehaJoshi.png';
import { Link } from 'react-router-dom';
import {
  Award, ShieldCheck, Globe, Users, Briefcase, Building2,
  CheckCircle2, ArrowRight, Linkedin, Mail, Target, Repeat,
  Crosshair, X, Send, Calendar, Download, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createLead } from '../config/api'; // <-- Backend Integration intact

const About = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileEmail, setProfileEmail] = useState('');
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);

  const handleOpenModal = (leader) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
  };

  // --- BACKEND FORM HANDLERS ---
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // You can customize the form data extraction here to match your other pages
    try {
      // Assuming a generic lead capture for the modal
      toast.success(`Consultation request for ${selectedLeader} sent successfully!`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileDownload = async (e) => {
    e.preventDefault();
    if (!profileEmail) return toast.error("Please enter your email.");
    setIsProfileSubmitting(true);

    try {
      // 1. Send the Lead to the Backend CRM (with dummy data to bypass validation)
      await createLead({
        name: "Company Profile Download",
        email: profileEmail,
        phone: "0000000000",
        company: "N/A",
        service: "About Us - Company Profile",
        message: "User requested the Fin5ive Company Profile PDF."
      });

      // 2. ACTIVATE REAL PDF DOWNLOAD
      const link = document.createElement('a');
      link.href = '/Company Profile.pdf'; // <--- This looks inside your public folder
      link.setAttribute('download', 'Fin5ive_Company_Profile.pdf'); // Name of file when downloaded
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Show Success Message
      toast.success("Company Profile downloaded successfully!", { icon: '📄' });
      setProfileEmail('');

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to process request.");
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const powerOfFive = [
    { id: 1, icon: <Target className="w-8 h-8 text-[#FF6600]" />, title: "Focused Efforts", desc: "Financial goals require a well-defined strategy. We ensure that each client's wealth and investment plan is built with laser-sharp focus to achieve optimal results." },
    { id: 2, icon: <Repeat className="w-8 h-8 text-[#FF6600]" />, title: "Consistent Efforts", desc: "Success is not an overnight phenomenon. Our approach is rooted in persistence and continuous monitoring to maximize value creation for our clients." },
    { id: 3, icon: <ShieldCheck className="w-8 h-8 text-[#FF6600]" />, title: "Transparency in Dealings", desc: "Trust is at the heart of our relationships. We uphold the highest standards of honesty and integrity, ensuring clients always have a clear understanding of their financial roadmap." },
    { id: 4, icon: <Crosshair className="w-8 h-8 text-[#FF6600]" />, title: "Clinical Precision in Execution", desc: "Investment strategies demand meticulous planning and flawless execution. We bring a structured, data-driven approach to financial decision making, ensuring precision in every move." },
    { id: 5, icon: <Award className="w-8 h-8 text-[#FF6600]" />, title: "Unmatched Expertise", desc: "Our leadership comprises seasoned financial professionals with extensive experience in wealth management, investment advisory, and corporate finance. Their deep industry insights empower our clients to make informed decisions." }
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">

      {/* --- LEADERSHIP CONTACT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003366] p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center"><Calendar className="w-5 h-5 mr-2" /> Book Strategy Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-8 space-y-4" onSubmit={handleModalSubmit}>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-4 text-sm text-gray-600 font-medium flex items-center">
                <Briefcase className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0" />
                Requesting consultation regarding: <span className="font-bold text-[#003366] ml-1">{selectedLeader === 'General' ? 'Corporate Advisory' : selectedLeader}</span>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label><input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="John Doe" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company / Entity</label><input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="Acme Corp" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="+91 98765 43210" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label><input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none" placeholder="director@company.com" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Brief Description of Requirement</label><textarea required rows="3" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none resize-none" placeholder="E.g., Looking for SME IPO advisory..."></textarea></div>
              <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl mt-2 flex justify-center items-center transition shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#FF6600] hover:bg-[#e55c00]'}`}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Request <Send className="w-5 h-5 ml-2" /></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Epic Hero Section */}
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

      <div className="bg-slate-900 text-white py-10 border-b-4 border-[#FF6600] relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-700">
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">25<span className="text-2xl text-white">+</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Years Experience</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">₹1000<span className="text-2xl text-white">Cr+</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Capital Managed</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">100<span className="text-2xl text-white">%</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Execution Focus</p></div>
          <div className="p-4"><p className="text-4xl font-extrabold text-[#FF6600] mb-2">4.9<span className="text-2xl text-white">/5</span></p><p className="text-xs uppercase tracking-widest text-gray-400">Client Trust Score</p></div>
        </div>
      </div>

      {/* About Company Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team discussion" className="rounded-3xl shadow-xl w-full h-64 object-cover" />
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Business handshake" className="rounded-3xl shadow-xl w-full h-64 object-cover mt-8" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 text-center w-64 z-20">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#FF6600]" />
                </div>
                <h3 className="text-2xl font-black text-[#003366] mb-2">25+ Years Experience</h3>
                <p className="text-gray-500 text-sm font-medium leading-snug">Decades of combined leadership experience navigating complex corporate finance.</p>
              </div>
            </div>
            <div>
              <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">About Company</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-6 tracking-tight">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">As a premier investment advisory and corporate finance firm, we are dedicated to helping our clients navigate the complexities of financial markets and achieve sustainable growth.</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">We have established an elite team of investment professionals, specifically focused on wealth management, business funding, and structural buyouts for HNIs and corporate entities.</p>
              <ul className="space-y-4 mb-10">
                {['Tailored financial solutions for resident Indians and Non-Resident Indians (NRIs).', 'Strict regulatory alignment & ethical advisory.', 'Access to trusted banks, NBFCs & Investment Platforms.'].map((item, i) => (
                  <li key={i} className="flex items-start"><CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" /><span className="text-gray-800 font-bold">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of 5 Section */}
      <section className="py-24 bg-slate-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003366]/5 transform skew-x-12 translate-x-32 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">The Power of 5</h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">Our name, FIN5IVE, embodies our core philosophy. We firmly adhere to five guiding principles that form the foundation of our entire approach to wealth management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerOfFive.map((item, index) => (
              <div key={item.id} className={`bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-[#FF6600]/30 transition-all duration-300 group ${index === 3 ? 'lg:col-start-1 lg:ml-auto lg:mr-4' : ''} ${index === 4 ? 'lg:col-start-2 lg:mr-auto lg:ml-4' : ''}`}>
                <div className="flex items-center justify-between mb-8"><div className="bg-orange-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div><span className="text-5xl font-black text-slate-100 select-none group-hover:text-[#003366]/5 transition-colors duration-300">0{item.id}</span></div>
                <h3 className="text-xl font-black text-[#003366] mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section (UPDATED) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-4 block">Our Experts</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-4 tracking-tight">Meet The Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Guided by industry veterans with decades of experience in corporate structuring, capital markets, and global wealth management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* CA Chetan Joshi */}
            <div className="bg-slate-50 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-80 bg-[#003366] relative overflow-hidden flex items-center justify-center">
                <img src={chetanPhoto} alt="CA Chetan Joshi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 object-top" />                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black text-white">CA Chetan Joshi</h3>
                      <p className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mt-2">Founder & Managing Director</p>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/chetan-joshi-234ab0155"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="..."
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                    A seasoned Chartered Accountant and expert in Capital Markets, IPO Structuring, and GIFT City offshore establishment, Chetan brings decades of institutional insight to corporate clients. He specializes in MSME financial engineering, architecting massive cost-reduction strategies through precision Working Capital funding, ZED certifications, and Government Subsidies.
                  </p>
                </div>
                <button onClick={() => handleOpenModal('CA Chetan Joshi')} className="w-full bg-white hover:bg-[#003366] hover:text-white text-[#003366] border border-gray-200 hover:border-[#003366] font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center shadow-sm">
                  Consult with Chetan <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* CMA Neha Joshi */}
            <div className="bg-slate-50 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-80 bg-[#FF6600] relative overflow-hidden flex items-center justify-center">
                <img src={nehaPhoto} alt="CMA Neha Joshi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 object-top" />                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black text-white">CMA Neha Joshi</h3>
                      <p className="text-[#FF6600] font-bold tracking-wider uppercase text-sm mt-2">Co-Founder & Director</p>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/neha-joshi-8b18853b7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="..."
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                    A highly credentialed Cost and Management Accountant (CMA), Neha applies analytical precision to personal finance and wealth management. She specializes in engineering robust financial portfolios through data-driven Mutual Fund strategies and comprehensive Insurance planning.
                  </p>
                </div>
                <button onClick={() => handleOpenModal('CMA Neha Joshi')} className="w-full bg-white hover:bg-[#FF6600] hover:text-white text-[#003366] border border-gray-200 hover:border-[#FF6600] font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center shadow-sm">
                  Consult with Neha <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET: Download PDF Form */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <Building2 className="absolute top-0 right-0 w-64 h-64 text-white opacity-5 -mr-10 -mt-10 pointer-events-none" />
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Download Our Company Profile</h3>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 relative z-10">
              <form className="flex w-full shadow-lg rounded-xl overflow-hidden" onSubmit={handleProfileDownload}>
                <input
                  type="email"
                  required
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full md:w-64 px-6 py-4 border-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-gray-800"
                />
                <button type="submit" disabled={isProfileSubmitting} className={`text-white px-8 py-4 font-bold transition flex items-center whitespace-nowrap ${isProfileSubmitting ? 'bg-gray-400' : 'bg-[#FF6600] hover:bg-[#e55c00]'}`}>
                  {isProfileSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5 mr-2" /> Get PDF</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;