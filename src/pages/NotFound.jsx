import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-20">
      <div className="text-center max-w-2xl mx-auto w-full">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-finBlue opacity-5 rounded-bl-full pointer-events-none"></div>

          <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Compass className="w-12 h-12 text-finOrange animate-[spin_10s_linear_infinite]" />
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-finBlue mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Route Not Found</h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            The financial instrument or page you are looking for seems to have been relocated, renamed, or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/" className="bg-finBlue hover:bg-finBlue-light text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" /> Return to Homepage
            </Link>
            <Link to="/contact" className="bg-slate-50 border border-gray-200 hover:border-finOrange hover:text-finOrange text-finBlue font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center">
              Contact Support <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NotFound;