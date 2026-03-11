import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Core Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Team from './pages/Team';
import NotFound from './pages/NotFound';

// Portals & Utilities
import ClientPortal from './pages/ClientPortal';
import AdminPortal from './pages/AdminPortal';
import WorkWithUs from './pages/WorkWithUs';
import Calculators from './pages/Calculators';

// Corporate Services
import GiftCity from './pages/GiftCity';
import ExportFunding from './pages/ExportFunding';
import MsmeFunding from './pages/MsmeFunding';
import IpoServices from './pages/IpoServices';
import ZedCertification from './pages/ZedCertification';
import InvestmentServices from './pages/InvestmentServices';
import WorkingCapital from './pages/WorkingCapital';
import InsuranceServices from './pages/InsuranceServices';

// NEW: Dedicated NRI Pages
import NriGiftCity from './pages/NriGiftCity';
import NriRealEstate from './pages/NriRealEstate';
import NriDomestic from './pages/NriDomestic';
import NriTax from './pages/NriTax';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />

        <main className="flex-grow pt-20"> 
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Corporate Services */}
            <Route path="/services/gift-city" element={<GiftCity />} />
            <Route path="/services/export-funding" element={<ExportFunding />} />
            <Route path="/services/msme-funding" element={<MsmeFunding />} />
            <Route path="/services/ipo" element={<IpoServices />} />
            <Route path="/services/zed-certification" element={<ZedCertification />} />
            <Route path="/services/investment" element={<InvestmentServices />} />
            <Route path="/services/working-capital" element={<WorkingCapital />} />
            <Route path="/services/insurance" element={<InsuranceServices />} />

            {/* NEW: NRI Invest Section */}
            <Route path="/nri-invest/gift-city" element={<NriGiftCity />} />
            <Route path="/nri-invest/real-estate" element={<NriRealEstate />} />
            <Route path="/nri-invest/domestic-products" element={<NriDomestic />} />
            <Route path="/nri-invest/tax-assistance" element={<NriTax />} />    

            {/* Utilities & Portals */}
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/portal" element={<ClientPortal />} />
            <Route path="/admin" element={<AdminPortal />} />

            {/* Core Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;