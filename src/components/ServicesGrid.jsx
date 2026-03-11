import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Globe, TrendingUp, Briefcase, Plane, Factory, ShieldCheck, Landmark } from 'lucide-react';

const servicesData = [
  {
    title: "GIFT City IFSC Setup",
    description: "End-to-end registration, regulatory support, and compliance for your global financial expansion.",
    icon: <Globe className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/gift-city"
  },
  {
    title: "Export Trade Finance",
    description: "Collateral-free working capital up to $2.5 Million. Financing invoices in less than 24 hours.",
    icon: <Plane className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/export-funding"
  },
  {
    title: "MSME & Machinery Funding",
    description: "Up to 100% financing for machinery, working capital, and factory loans with flexible repayment.",
    icon: <Factory className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/msme-funding"
  },
  {
    title: "IPO Services",
    description: "Seamless transition from private to public on NSE Emerge or BSE SME with full SEBI compliance.",
    icon: <TrendingUp className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/ipo"
  },
  {
    title: "NRI Solutions",
    description: "Comprehensive tax planning, real estate advisory, and customized investment strategies for NRIs.",
    icon: <Briefcase className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/nri"
  },
  {
    title: "ZED Gold Certification",
    description: "Hands-on implementation partner to achieve Zero Defect Zero Effect certification for MSMEs.",
    icon: <ShieldCheck className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/zed-certification"
  },
  {
    title: "Investment Portfolio",
    description: "Mutual Funds, PMS, AIF, and tailored asset management for High Net-Worth Individuals.",
    icon: <Building2 className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/investment"
  },
  {
    title: "Working Capital Solutions",
    description: "Cash Credit (CC) and Overdraft facilities up to 25 Crore for seamless business operations.",
    icon: <Landmark className="w-7 h-7 text-[#FF6600]" />,
    link: "/services/working-capital"
  },
];

const ServicesGrid = () => {
  return (
    // Reverted the main section back to pure white
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#003366] sm:text-4xl tracking-tight">
            Comprehensive Financial Solutions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 font-medium">
            From capital acquisition to strict regulatory compliance, all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              // APPLIED HERE: The card itself gets the off-white background (bg-slate-50)
              className="bg-slate-50 border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-[#003366]/20 transition-all duration-300 group flex flex-col h-full"
            >
              {/* The pure white icon box sits on top of the off-white card */}
              <div className="bg-white border border-gray-100 shadow-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-[#003366] mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-8 text-sm flex-grow font-medium">
                {service.description}
              </p>
              
              <Link 
                to={service.link} 
                className="text-[#FF6600] font-bold text-sm flex items-center hover:text-[#e55c00] transition-colors mt-auto"
              >
                Learn more <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;