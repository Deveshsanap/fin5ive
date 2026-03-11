import React from 'react';
import { 
  Landmark, Globe2, ShieldCheck, Coins, Briefcase, 
  TrendingUp, Gem, ArrowRight, ChevronRight, Building,
  Factory, Plane, PieChart, Calculator, Umbrella
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const categories = [
    {
      title: "Corporate Finance & Capital",
      description: "Fueling business expansion through structured debt and equity instruments.",
      icon: <Landmark className="w-8 h-8 text-[#FF6600]" />,
      services: [
        { name: "SME & Mainboard IPO", tag: "Public Listing", desc: "End-to-end listing advisory from DRHP filing to exchange bell ringing.", path: "/services/ipo", icon: <TrendingUp className="w-6 h-6" /> },
        { name: "MSME Funding", tag: "Machinery & Capex", desc: "Up to 100% finance for factory construction and machinery with subsidy support.", path: "/services/msme-funding", icon: <Factory className="w-6 h-6" /> },
        { name: "Working Capital & LAP", tag: "Liquid Capital", desc: "Securing Cash Credit and Overdraft limits from ₹1Cr to ₹100Cr+.", path: "/services/working-capital", icon: <Coins className="w-6 h-6" /> },
        { name: "Export Trade Finance", tag: "Cross-Border", desc: "Collateral-free invoice factoring to accelerate global supply chains.", path: "/services/export-funding", icon: <Plane className="w-6 h-6" /> }
      ]
    },
    {
      title: "Wealth Management & Protection",
      description: "Tailored portfolio architecture for HNIs, Corporates, and Global Indians.",
      icon: <Gem className="w-8 h-8 text-[#FF6600]" />,
      services: [
        { name: "Investment Offerings", tag: "Wealth Growth", desc: "Mutual Funds, direct equity, fixed income, and retirement (NPS) solutions.", path: "/services/investment", icon: <PieChart className="w-6 h-6" /> },
        { name: "Insurance Solutions", tag: "Risk Management", desc: "Comprehensive life, health, term, and general insurance portfolios.", path: "/services/insurance", icon: <Umbrella className="w-6 h-6" /> },
        { name: "NRI Financial Desk", tag: "Global Diaspora", desc: "Dedicated cross-border investment, real estate, and tax advisory for NRIs.", path: "/nri-invest/domestic-products", icon: <Globe2 className="w-6 h-6" /> },
        { name: "Tools & Calculators", tag: "Financial Modeling", desc: "Interactive SIP, EMI, and wealth projection calculators.", path: "/calculators", icon: <Calculator className="w-6 h-6" /> }
      ]
    },
    {
      title: "Global & Regulatory Advisory",
      description: "Unlocking international tax benefits and compliance frameworks.",
      icon: <ShieldCheck className="w-8 h-8 text-[#FF6600]" />,
      services: [
        { name: "GIFT City IFSC Setup", tag: "Offshore Hub", desc: "Establishment of IT/ITeS and Financial units in India's tax-neutral zone.", path: "/services/gift-city", icon: <Building className="w-6 h-6" /> },
        { name: "ZED Certification", tag: "Quality Compliance", desc: "End-to-end MSME-QCI certification to unlock banking and tender benefits.", path: "/services/zed-certification", icon: <ShieldCheck className="w-6 h-6" /> },
        { name: "NRI Tax & Repatriation", tag: "FEMA Compliance", desc: "ITR filing, Lower TDS Certificates (Form 13), and 15CA/CB repatriation.", path: "/nri-invest/tax-assistance", icon: <Briefcase className="w-6 h-6" /> }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <div className="bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Briefcase className="w-4 h-4" />
            <span>Our Capabilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            Execution-First <br className="hidden md:block" />
            <span className="text-[#FF6600]">Advisory.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
            From local MSME funding to global offshore structuring, we provide the technical mastery required to navigate complex financial landscapes.
          </p>
        </div>
      </div>

      {/* 2. Dynamic Services Grid */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="mb-24 last:mb-0">
              
              <div className="flex flex-col md:flex-row md:items-center mb-12 gap-6 border-b border-gray-200 pb-6">
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex-shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#003366] mb-2">{cat.title}</h2>
                  <p className="text-gray-500 text-lg">{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cat.services.map((service, sIdx) => (
                  <Link 
                    key={sIdx} 
                    to={service.path}
                    className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF6600]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="inline-block px-3 py-1 bg-orange-50 text-[#FF6600] text-[10px] font-bold rounded-full uppercase tracking-widest border border-orange-100">
                          {service.tag}
                        </span>
                        <div className="text-gray-300 group-hover:text-[#FF6600] transition-colors">
                          {service.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#003366] mb-3 group-hover:text-[#FF6600] transition-colors leading-tight">
                        {service.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {service.desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-[#003366] font-bold text-sm group-hover:text-[#FF6600] transition-colors mt-auto">
                      Explore Service <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. Integrated CTA */}
      <section className="bg-[#003366] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002244] transform skew-x-12 translate-x-32 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Can't find the specific financial instrument you need?</h2>
          <p className="text-blue-100 mb-10 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Our partners specialize in custom financial engineering for complex corporate requirements, distressed assets, and specialized family office setups.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg hover:-translate-y-1 text-lg">
            Request Custom Consultation <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Services;