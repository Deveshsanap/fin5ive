import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002244] text-white pt-16 pb-8 border-t-4 border-[#FF6600] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div>
            <Link to="/" className="flex flex-col mb-6">
              <span className="text-3xl font-extrabold text-white tracking-tight">FIN<span className="text-[#FF6600]">5</span>IVE</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase mt-[-4px]">Ambitions Realised</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premier financial solutions partner offering end-to-end, innovative funding and advisory services designed to navigate complex financial landscapes for businesses and individuals globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-4 h-1 bg-[#FF6600] mr-3"></span> Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> About Us</Link></li>
              <li><Link to="/team" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Leadership Team</Link></li>
              <li><Link to="/work-with-us" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Careers</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-4 h-1 bg-[#FF6600] mr-3"></span> Key Services
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services/ipo" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> SME & Mainboard IPO</Link></li>
              <li><Link to="/services/msme-funding" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> MSME Funding</Link></li>
              <li><Link to="/services/investment" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Investment Offerings</Link></li>
              <li><Link to="/services/gift-city" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> GIFT City Setup</Link></li>
              <li><Link to="/nri-invest/domestic-products" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> NRI Financial Desk</Link></li>
              <li><Link to="/calculators" className="hover:text-[#FF6600] transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Tools & Calculators</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-4 h-1 bg-[#FF6600] mr-3"></span> Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0 mt-0.5" />
                <span>610 Ratnanjali Square, Prernatirth Derasar Road, Prahladnagar, Ahmedabad - 380054</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0" />
                <span>+91 99256 63112 <br/> +91 90996 84617</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-[#FF6600] mr-3 flex-shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  <a href="mailto:info.fivefin@gmail.com" className="hover:text-[#FF6600] transition-colors">info.fivefin@gmail.com</a>
                  <a href="mailto:connect.fivefin@gmail.com" className="hover:text-[#FF6600] transition-colors">connect.fivefin@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FIN5IVE MANAGEMENT PVT. LTD. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/portal" className="hover:text-[#FF6600] transition-colors">Client Login</Link>
            <a href="#" className="hover:text-[#FF6600] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FF6600] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;