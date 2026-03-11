import React from 'react';
import { Link } from 'react-router-dom'; // IMPORT REACT ROUTER LINK
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-finBlue text-white overflow-hidden">
      {/* Background subtle gradient/pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-finOrange via-finBlue to-finBlue"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            From Capital to Compliance. <br className="hidden md:block" />
            <span className="text-finOrange">Ambitions Realised.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
            Your one-stop strategic partner for Investment, Funding, GIFT City Setup, and Regulatory Compliance. Trusted by HNIs, MSMEs, and Corporates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* CONVERTED TO LINK: Points to /services */}
            <Link 
              to="/services" 
              className="bg-finOrange hover:bg-finOrange-light text-white font-semibold py-3 px-8 rounded-md transition duration-300 flex items-center justify-center"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            {/* CONVERTED TO LINK: Points to /contact */}
            <Link 
              to="/contact" 
              className="border border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-md transition duration-300 flex items-center justify-center"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;