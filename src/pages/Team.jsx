import React, { useEffect } from 'react';
import { Linkedin, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- IMPORTED PHOTOS ---
import chetanPhoto from '../assets/chetanJoshi.png';
import nehaPhoto from '../assets/nehaJoshi.png';

const Team = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founders = [
{
      name: "CA Chetan Joshi",
      role: "Founder & Managing Director",
      image: chetanPhoto,
      linkedin: "https://www.linkedin.com/in/chetan-joshi-234ab0155", 
      email: "connect.fivefin@gmail.com",
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
      image: nehaPhoto,
      linkedin: "https://www.linkedin.com/in/neha-joshi-8b18853b7", // <-- PASTE NEHA'S LINKEDIN URL HERE
      email: "connect.fivefin@gmail.com",
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
    <div className="bg-slate-50 font-sans min-h-screen pt-24 pb-20">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Governance & Leadership</span>
        <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-6 tracking-tight">Meet the Architects of Your <br className="hidden md:block"/>Financial Success</h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
          Guided by industry veterans with over 25+ years of combined experience in corporate finance, compliance, and wealth management.
        </p>
      </div>

      {/* Leadership Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {founders.map((leader, index) => (
          <div key={index} className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row group hover:shadow-2xl transition-all duration-500">
            
            {/* Image Column */}
            <div className="lg:w-2/5 bg-slate-200 relative overflow-hidden min-h-[400px] lg:min-h-full">
              <img 
                src={leader.image} 
                alt={leader.name} 
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Contact Icons overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex space-x-4">
                {/* ACTIVE LINKEDIN BUTTON */}
                <a 
                  href={leader.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-xl text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all shadow-lg"
                  title={`Connect with ${leader.name} on LinkedIn`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href={`mailto:${leader.email}`} 
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-xl text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all shadow-lg"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-[#003366]">{leader.name}</h2>
              <p className="text-[#FF6600] font-bold text-sm tracking-widest uppercase mt-2 mb-6">{leader.role}</p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                {leader.bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Credentials */}
                <div>
                  <h3 className="text-[#003366] font-extrabold text-lg mb-4 border-b border-gray-100 pb-2">Professional Credentials</h3>
                  <ul className="space-y-3">
                    {leader.credentials.map((cred, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm font-medium">{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Specialties */}
                <div>
                  <h3 className="text-[#003366] font-extrabold text-lg mb-4 border-b border-gray-100 pb-2">Core Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {leader.specialties.map((spec, idx) => (
                      <span key={idx} className="bg-slate-50 border border-gray-200 text-[#003366] text-xs font-bold px-3 py-1.5 rounded-lg">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <h2 className="text-3xl font-black text-[#003366] mb-6 tracking-tight">Ready to discuss your financial strategy?</h2>
        <p className="text-gray-500 text-lg font-medium mb-10">
          Connect directly with our leadership team to architect a solution tailored to your personal or corporate goals.
        </p>
        <Link to="/contact" className="inline-flex items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:-translate-y-1">
          Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

    </div>
  );
};

export default Team;