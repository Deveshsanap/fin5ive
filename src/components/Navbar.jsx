import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); 
  const [isNriOpen, setIsNriOpen] = useState(false); // For mobile NRI dropdown
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsNriOpen(false);
  }, [location]);

  // General Services Links
  const serviceLinks = [
    { name: 'Investment Services', path: '/services/investment' },
    { name: 'Insurance Services', path: '/services/insurance' },
    { name: 'IPO Services', path: '/services/ipo' },
    { name: 'MSME & Machinery Funding', path: '/services/msme-funding' },
    { name: 'Export Trade Finance', path: '/services/export-funding' },
    { name: 'Working Capital Solutions', path: '/services/working-capital' },
    { name: 'GIFT City IFSC Setup', path: '/services/gift-city' },
    { name: 'ZED Certification', path: '/services/zed-certification' },
    { name: 'Tools & Calculators', path: '/calculators' },
  ];

  // New NRI Invest Links
  const nriLinks = [
    { name: 'GIFT City Products', path: '/nri-invest/gift-city' },
    { name: 'Real Estate', path: '/nri-invest/real-estate' },
    { name: 'Domestic Products', path: '/nri-invest/domestic-products' },
    { name: 'IT Return Assistance', path: '/nri-invest/tax-assistance' },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white border-b border-gray-200 shadow-sm top-0 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="FIN5IVE Logo" className="h-10 md:h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">FIN<span className="text-[#FF6600]">5</span>IVE</span>
                <span className="text-[9px] md:text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-[-4px]">Ambitions Realised</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full space-x-6 lg:space-x-8">
            <Link to="/" className={`font-medium text-[15px] transition-colors hover:text-[#FF6600] ${location.pathname === '/' ? 'text-[#FF6600]' : 'text-[#003366]'}`}>
              Home
            </Link>

            {/* Our Services Dropdown */}
            <div className="relative group h-full flex items-center">
              <Link to="/services" className={`flex items-center gap-1 font-medium text-[15px] h-full transition-colors hover:text-[#FF6600] ${location.pathname.includes('/services') ? 'text-[#FF6600]' : 'text-[#003366]'}`}>
                Our Services <ChevronDown className="w-4 h-4 ml-0.5" />
              </Link>
              <div className="absolute top-[75px] left-0 bg-white border border-gray-100 shadow-xl py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                {serviceLinks.map((service, index) => (
                  <Link key={index} to={service.path} className="block px-6 py-2.5 text-[14px] text-[#003366] hover:bg-slate-50 hover:text-[#FF6600] transition-colors">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* NEW: NRI Invest Dropdown */}
            <div className="relative group h-full flex items-center">
              <div className="flex items-center gap-1 font-bold text-[15px] h-full transition-colors text-[#FF6600] cursor-pointer">
                NRI Invest <ChevronDown className="w-4 h-4 ml-0.5" />
              </div>
              <div className="absolute top-[75px] left-0 bg-white border border-gray-100 shadow-xl py-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                {nriLinks.map((nri, index) => (
                  <Link key={index} to={nri.path} className="block px-6 py-2.5 text-[14px] font-medium text-[#003366] hover:bg-orange-50 hover:text-[#FF6600] transition-colors">
                    {nri.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className={`font-medium text-[15px] transition-colors hover:text-[#FF6600] ${location.pathname === '/about' ? 'text-[#FF6600]' : 'text-[#003366]'}`}>
              About Us
            </Link>
            
            <Link to="/work-with-us" className={`font-medium text-[15px] transition-colors hover:text-[#FF6600] ${location.pathname === '/work-with-us' ? 'text-[#FF6600]' : 'text-[#003366]'}`}>
              Work With Us
            </Link>

            <Link to="/portal" className="bg-[#003366] hover:bg-[#002244] text-white px-5 py-2.5 rounded font-medium text-[15px] transition-colors flex items-center shadow-sm ml-2">
              <User className="w-4 h-4 mr-2" /> Client Portal
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden p-2 text-[#003366]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 absolute w-full transition-all duration-300 shadow-2xl ${isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link to="/" className="block px-4 py-3 text-[#003366] font-bold border-b border-gray-50">Home</Link>

          {/* Mobile Services Accordion */}
          <div>
            <div className="flex justify-between items-center border-b border-gray-50">
              <Link to="/services" className="px-4 py-3 text-[#003366] font-bold flex-1">
                Our Services
              </Link>
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="p-3 text-[#003366]">
                <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`bg-slate-50 overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
              {serviceLinks.map((service, index) => (
                <Link key={index} to={service.path} className="block px-8 py-3 text-sm text-gray-600 font-medium hover:text-[#FF6600] border-b border-gray-100/50">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile NRI Invest Accordion */}
          <div>
            <div className="flex justify-between items-center border-b border-gray-50">
              <div className="px-4 py-3 text-[#FF6600] font-bold flex-1">
                NRI Invest
              </div>
              <button onClick={() => setIsNriOpen(!isNriOpen)} className="p-3 text-[#FF6600]">
                <ChevronDown className={`w-5 h-5 transition-transform ${isNriOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`bg-orange-50/50 overflow-hidden transition-all duration-300 ${isNriOpen ? 'max-h-[300px]' : 'max-h-0'}`}>
              {nriLinks.map((nri, index) => (
                <Link key={index} to={nri.path} className="block px-8 py-3 text-sm text-[#003366] font-bold hover:text-[#FF6600] border-b border-orange-100/50">
                  {nri.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/about" className="block px-4 py-3 text-[#003366] font-bold border-b border-gray-50">About Us</Link>
          <Link to="/work-with-us" className="block px-4 py-3 text-[#003366] font-bold border-b border-gray-50">Work With Us</Link>
          <Link to="/contact" className="block px-4 py-3 text-[#003366] font-bold mb-4">Contact</Link>

          <div className="px-4 mt-6">
            <Link to="/portal" className="w-full bg-[#003366] text-white py-3 rounded-lg font-bold flex justify-center items-center shadow-md">
              <User className="w-5 h-5 mr-2" /> Client Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;