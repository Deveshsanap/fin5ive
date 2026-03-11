import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, TrendingUp, Users, Award, Building2, 
  Briefcase, Calculator, ChevronDown, ChevronUp, Star, Quote, 
  CheckCircle, Mail, LineChart, Loader2, 
  ArrowLeft, TrendingDown
} from 'lucide-react';
import toast from 'react-hot-toast';

import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';

const Home = () => {
  // --- STATE MANAGEMENT ---
  
  // 1. Calculator State
  const [calcType, setCalcType] = useState('SIP'); 
  const [investment, setInvestment] = useState(25000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  // 2. FAQ State
  const [activeFaq, setActiveFaq] = useState(null); 

  // 3. Testimonial Slider State
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const sliderIntervalRef = useRef(null);

  // 4. Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // 5. Live Market Data State
  const [marketData, setMarketData] = useState({
    nifty: { value: 22514.50, change: 0.42, isPositive: true },
    sensex: { value: 74228.10, change: 0.51, isPositive: true },
    gold: { value: 71200, change: -0.12, isPositive: false }
  });

  // --- LIVE MARKET DATA LOGIC ---
  useEffect(() => {
    // In a real production environment, you would use an API like Alpha Vantage, Yahoo Finance API, or a paid Indian market API.
    // Example of how the fetch would look:
    /*
    const fetchMarketData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT_HERE');
        const data = await response.json();
        setMarketData({
          nifty: { value: data.nifty.price, change: data.nifty.percentChange, isPositive: data.nifty.percentChange >= 0 },
          // ... mapping rest of data
        });
      } catch (error) {
        console.error("Error fetching market data", error);
      }
    };
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    */

    // For demonstration, we simulate live fluctuations every 5 seconds
    const simulateMarketUpdates = setInterval(() => {
      setMarketData(prev => {
        // Random fluctuation between -0.2% and +0.2%
        const fluctuate = (val) => val * (1 + (Math.random() * 0.004 - 0.002));
        
        const newNiftyVal = fluctuate(prev.nifty.value);
        const newSensexVal = fluctuate(prev.sensex.value);
        const newGoldVal = fluctuate(prev.gold.value);

        return {
          nifty: { 
            value: newNiftyVal, 
            change: ((newNiftyVal - 22400) / 22400) * 100, // Simulated baseline
            isPositive: newNiftyVal >= prev.nifty.value 
          },
          sensex: { 
            value: newSensexVal, 
            change: ((newSensexVal - 73800) / 73800) * 100, // Simulated baseline
            isPositive: newSensexVal >= prev.sensex.value 
          },
          gold: { 
            value: newGoldVal, 
            change: ((newGoldVal - 71300) / 71300) * 100, // Simulated baseline
            isPositive: newGoldVal >= prev.gold.value 
          }
        };
      });
    }, 5000);

    return () => clearInterval(simulateMarketUpdates);
  }, []);

  // --- AUTO-PLAY TESTIMONIALS ---
  const startSlider = () => {
    sliderIntervalRef.current = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000); 
  };

  useEffect(() => {
    startSlider();
    return () => clearInterval(sliderIntervalRef.current);
  }, []);

  const nextTestimonial = () => {
    clearInterval(sliderIntervalRef.current);
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    startSlider(); 
  };
  
  const prevTestimonial = () => {
    clearInterval(sliderIntervalRef.current);
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startSlider(); 
  };

  // --- CALCULATOR MATH ---
  const calculateReturns = () => {
    const r = returnRate / 100;
    const months = years * 12;
    let totalInvested = 0;
    let maturityValue = 0;

    if (calcType === 'SIP') {
      const monthlyRate = r / 12;
      totalInvested = investment * months;
      maturityValue = Math.round(investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      totalInvested = investment;
      maturityValue = Math.round(investment * Math.pow(1 + r, years));
    }

    return { totalInvested, maturityValue, wealthGained: maturityValue - totalInvested };
  };

  const { totalInvested, maturityValue, wealthGained } = calculateReturns();
  
  // Format numbers nicely
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  const formatIndex = (value) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);

  // --- NEWSLETTER HANDLER ---
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterEmail('');
      toast.success('Successfully subscribed to market updates!', {
        iconTheme: { primary: '#FF6600', secondary: 'white' }
      });
    }, 1500);
  };

  // --- DATA ARRAYS ---
  const faqs = [
    { question: "What is the minimum ticket size for Working Capital funding?", answer: "We arrange working capital facilities ranging from ₹30 Lakhs up to ₹25 Crores, including Cash Credit (CC), Overdrafts, and CGTMSE unsecured loans." },
    { question: "Do you assist with the entire GIFT City IFSC setup process?", answer: "Yes. We are an end-to-end implementation partner. We handle MCA Name Reservation, SEZ Approval, IFSCA Registration, and post-establishment compliance." },
    { question: "How fast can Export Trade Finance be disbursed?", answer: "For eligible exporters, we can arrange collateral-free working capital up to $2.5 Million with disbursal in less than 24 hours of invoice submission." },
    { question: "Who handles the Wealth Management & Investment portfolios?", answer: "Our wealth management team consists of NISM and RERA certified professionals with decades of experience structuring portfolios for HNIs, NRIs, and Corporates." }
  ];

  const testimonials = [
    { text: "FIN5IVE completely restructured our debt. Their advisory on MSME subsidies reduced our interest burden significantly, allowing us to expand our manufacturing unit.", author: "Rajesh P.", role: "Director, Auto-Ancillary MSME" },
    { text: "The GIFT City setup process seemed daunting, but the team at FIN5IVE navigated the SEZ and IFSCA approvals flawlessly. A truly elite corporate finance team.", author: "Sarah M.", role: "CEO, Global Fintech Fund" },
    { text: "Their export factoring services solved our cash flow bottleneck overnight. Getting 80% advance on our international invoices within 24 hours changed our business.", author: "Amit V.", role: "Founder, Export Trading House" }
  ];

  // --- REUSABLE TICKER CONTENT ---
  // We extract this so we can duplicate it side-by-side to create a seamless loop
  const TickerItems = () => (
    <div className="flex space-x-12 px-6 items-center flex-shrink-0">
      <span className="flex items-center font-medium transition-colors duration-500">
        {marketData.nifty.isPositive ? <TrendingUp className="w-3.5 h-3.5 text-green-400 mr-1.5"/> : <TrendingDown className="w-3.5 h-3.5 text-red-400 mr-1.5"/>}
        NIFTY 50: {formatIndex(marketData.nifty.value)} 
        <span className={`ml-1.5 font-bold ${marketData.nifty.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          ({marketData.nifty.isPositive ? '+' : ''}{marketData.nifty.change.toFixed(2)}%)
        </span>
      </span>
      <span className="flex items-center font-medium transition-colors duration-500">
        {marketData.sensex.isPositive ? <TrendingUp className="w-3.5 h-3.5 text-green-400 mr-1.5"/> : <TrendingDown className="w-3.5 h-3.5 text-red-400 mr-1.5"/>}
        SENSEX: {formatIndex(marketData.sensex.value)} 
        <span className={`ml-1.5 font-bold ${marketData.sensex.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          ({marketData.sensex.isPositive ? '+' : ''}{marketData.sensex.change.toFixed(2)}%)
        </span>
      </span>
      <span className="flex items-center font-medium transition-colors duration-500">
        <LineChart className="w-3.5 h-3.5 text-[#FF6600] mr-1.5"/> 
        GOLD: ₹{formatIndex(marketData.gold.value)}
        <span className={`ml-1.5 font-bold ${marketData.gold.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          ({marketData.gold.isPositive ? '+' : ''}{marketData.gold.change.toFixed(2)}%)
        </span>
      </span>
      <span className="flex items-center text-gray-400">|</span>
      <span className="text-[#FF6600] font-bold uppercase tracking-wider">Latest Updates:</span>
      <span className="text-gray-300">RBI keeps repo rate unchanged at 6.5% for 7th consecutive time</span>
      <span className="text-gray-300">SEBI announces new standardized IPO timelines for SME platforms</span>
    </div>
  );

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 0. Market Ticker (Top Bar) - SEAMLESS AUTO-SCROLLING */}
      <style>
        {`
          @keyframes custom-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-custom-marquee {
            display: flex;
            width: max-content;
            animation: custom-marquee 40s linear infinite;
          }
          .animate-custom-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="bg-[#002244] text-white text-xs py-2.5 overflow-hidden relative z-50 border-b border-white/10 flex">
        {/* The seamless wrapper translates from 0 to -50% to perfectly loop the two identical children */}
        <div className="animate-custom-marquee">
          <TickerItems />
          <TickerItems />
        </div>
      </div>

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Marquee */}
      <section className="py-10 bg-slate-50 border-b border-gray-100 overflow-hidden shadow-[inset_0_4px_6px_-4px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-8">
            Empanelled & Trusted By Leading Institutions
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 items-center">
            <span className="text-xl md:text-3xl font-black text-gray-800 tracking-tighter">HDFC MF</span>
            <span className="text-xl md:text-3xl font-black text-gray-800 tracking-tighter">SBI Mutual</span>
            <span className="text-xl md:text-3xl font-black text-gray-800 tracking-tighter">ICICI Pru</span>
            <span className="text-xl md:text-3xl font-black text-gray-800 tracking-tighter">NSE Emerge</span>
            <span className="text-xl md:text-3xl font-black text-gray-800 tracking-tighter">BSE SME</span>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <ServicesGrid />

      {/* 4. The FIN5IVE Advantage (Why Choose Us) */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        {/* Background Decorative Element */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Our DNA</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">Architecting Financial Success</h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
              We aren't just consultants; we are execution partners. Our in-house elite team ensures end-to-end delivery from structuring to final disbursement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Elite In-House Team", desc: "Led by highly qualified Chartered Accountants, CMAs, and Corporate Lawyers.", icon: <Users className="w-8 h-8 text-[#FF6600]" /> },
              { title: "25+ Years Experience", desc: "Decades of combined leadership experience navigating complex corporate finance.", icon: <Award className="w-8 h-8 text-[#FF6600]" /> },
              { title: "Marquee Network", desc: "Direct access to QIBs, Ultra HNIs, Top Banks, and Global Asset Managers.", icon: <Building2 className="w-8 h-8 text-[#FF6600]" /> },
              { title: "Regulatory Mastery", desc: "Flawless execution and liaison with SEBI, RBI, FEMA, and IFSC authorities.", icon: <ShieldCheck className="w-8 h-8 text-[#FF6600]" /> },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-orange-500/5 hover:border-[#003366]/20 hover:-translate-y-2 transition-all duration-500 group">
                <div className="bg-white shadow-sm border border-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-extrabold text-[#003366] mb-4">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Wealth Calculator */}
      <section className="py-24 bg-[#003366] relative overflow-hidden text-white">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6600] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Wealth Analytics</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Interactive Wealth Planner</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg font-medium">Model your financial future. Toggle between Monthly SIPs or One-Time Lumpsum investments to visualize the immense power of compounding.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto text-gray-800">
            
            {/* Toggle SIP / Lumpsum */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => { setCalcType('SIP'); setInvestment(25000); }}
                className={`flex-1 py-6 text-center font-black text-lg transition-colors ${calcType === 'SIP' ? 'bg-[#FF6600] text-white shadow-inner' : 'bg-slate-50 text-gray-500 hover:bg-gray-100'}`}
              >
                Monthly SIP
              </button>
              <button 
                onClick={() => { setCalcType('LUMPSUM'); setInvestment(500000); }}
                className={`flex-1 py-6 text-center font-black text-lg transition-colors ${calcType === 'LUMPSUM' ? 'bg-[#FF6600] text-white shadow-inner' : 'bg-slate-50 text-gray-500 hover:bg-gray-100'}`}
              >
                One-Time Lumpsum
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Sliders Side */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 md:col-span-3">
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-5">
                    <label className="font-extrabold text-gray-800">{calcType === 'SIP' ? 'Monthly Investment' : 'Total Investment'}</label>
                    <div className="bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-xl font-black text-[#FF6600] shadow-sm">
                      {formatINR(investment)}
                    </div>
                  </div>
                  <input 
                    type="range" min={calcType === 'SIP' ? "1000" : "50000"} max={calcType === 'SIP' ? "500000" : "25000000"} step={calcType === 'SIP' ? "1000" : "50000"} 
                    value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>

                <div className="mb-10">
                  <div className="flex justify-between items-center mb-5">
                    <label className="font-extrabold text-gray-800">Investment Horizon</label>
                    <div className="bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-xl font-black text-[#FF6600] shadow-sm">{years} Years</div>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="1" 
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-5">
                    <label className="font-extrabold text-gray-800">Expected Annual Return</label>
                    <div className="bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-xl font-black text-[#FF6600] shadow-sm">{returnRate}%</div>
                  </div>
                  <input 
                    type="range" min="5" max="25" step="0.5" 
                    value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003366]"
                  />
                </div>
              </div>

              {/* Output Side */}
              <div className="p-8 md:p-12 bg-slate-50 flex flex-col justify-center md:col-span-2 relative overflow-hidden">
                {/* Decorative Icon */}
                <Calculator className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-200 opacity-50 pointer-events-none" />
                
                <div className="relative z-10 space-y-6 mb-10">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Invested Amount</p>
                    <p className="text-xl font-black text-gray-800">{formatINR(totalInvested)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Est. Wealth Gained</p>
                    <p className="text-xl font-black text-green-500">+{formatINR(wealthGained)}</p>
                  </div>
                  <div className="pt-8 border-t border-gray-200">
                    <p className="text-gray-800 font-extrabold mb-2">Total Future Value</p>
                    <p className="text-4xl lg:text-5xl font-black text-[#003366] tracking-tight">{formatINR(maturityValue)}</p>
                  </div>
                </div>
                
                {/* Link to Contact Page */}
                <Link to="/contact" className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-4.5 rounded-xl transition duration-300 shadow-xl hover:-translate-y-1 flex justify-center items-center text-lg relative z-10">
                  Start Investing <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Slider */}
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Client Success</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-16 tracking-tight">Trusted by Industry Leaders</h2>
          
          <div className="bg-slate-50 rounded-[3rem] p-10 md:p-20 relative shadow-lg border border-gray-100 overflow-hidden">
            <Quote className="absolute top-10 left-10 w-24 h-24 text-[#003366] opacity-5 pointer-events-none" />
            
            <div className="relative z-10 min-h-[250px] flex flex-col justify-center transition-opacity duration-500">
              <div className="flex justify-center mb-8">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 text-[#FF6600] fill-current mx-1 drop-shadow-sm" />)}
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-12 text-[#003366] tracking-tight">
                "{testimonials[testimonialIdx].text}"
              </p>
              <div>
                <p className="font-black text-xl text-gray-800">{testimonials[testimonialIdx].author}</p>
                <p className="text-[#FF6600] font-bold uppercase tracking-wider text-sm mt-1">{testimonials[testimonialIdx].role}</p>
              </div>
            </div>
            
            {/* Slider Controls */}
            <div className="absolute bottom-10 right-10 flex space-x-3">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border-2 border-gray-200 text-gray-500 flex items-center justify-center hover:bg-[#003366] hover:text-white hover:border-[#003366] transition-all shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border-2 border-gray-200 text-gray-500 flex items-center justify-center hover:bg-[#003366] hover:text-white hover:border-[#003366] transition-all shadow-sm">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-14 left-0 w-full flex justify-center space-x-2 pointer-events-none">
               {testimonials.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${testimonialIdx === i ? 'w-8 bg-[#FF6600]' : 'w-2 bg-gray-300'}`}></div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Leadership Team Teaser */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-4 block">Governance</span>
            <h2 className="text-4xl font-black text-[#003366] mb-6 tracking-tight">Meet The Leadership</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Guided by industry veterans with over 25 years of combined experience in corporate finance, compliance, and wealth management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="h-80 bg-slate-200 overflow-hidden relative">
                <img src="https://ui-avatars.com/api/?name=Chetan+Joshi&background=003366&color=fff&size=512" alt="CA Chetan Joshi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-[#003366]">CA Chetan Joshi</h3>
                <p className="text-[#FF6600] font-bold text-sm tracking-wider uppercase mt-2">Founder & Managing Director</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="h-80 bg-slate-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Neha+Joshi&background=FF6600&color=fff&size=512" alt="CMA Neha Joshi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-[#003366]">CMA Neha Joshi</h3>
                <p className="text-[#FF6600] font-bold text-sm tracking-wider uppercase mt-2">Co-Founder & Director</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden text-center flex flex-col justify-center items-center p-8 bg-gradient-to-b from-white to-slate-50 group hover:shadow-xl transition-all duration-500">
               <Users className="w-20 h-20 text-[#003366]/10 mb-6 group-hover:text-[#FF6600]/20 transition-colors duration-500" />
               <h3 className="text-2xl font-black text-[#003366]">Advisory Board</h3>
               <p className="text-[#FF6600] font-bold text-sm tracking-wider uppercase mt-2 mb-6">Legal & Compliance</p>
               <p className="text-gray-500 text-sm font-medium leading-relaxed">Supported by a dedicated network of Company Secretaries, Lawyers, and Ex-Bankers.</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/team" className="inline-flex items-center text-[#003366] font-bold hover:text-[#FF6600] transition-colors border-b-2 border-transparent hover:border-[#FF6600] pb-1">
              View Full Leadership Directory <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Scale Statistics */}
      <section className="py-20 bg-[#003366] relative text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center divide-x divide-white/10">
            <div className="px-4">
              <p className="text-5xl md:text-6xl font-black mb-3">₹25<span className="text-[#FF6600] text-4xl">Cr</span></p>
              <p className="text-sm text-gray-300 font-bold uppercase tracking-[0.2em]">Max WC Funding</p>
            </div>
            <div className="px-4">
              <p className="text-5xl md:text-6xl font-black mb-3">&lt;24<span className="text-[#FF6600] text-4xl">hr</span></p>
              <p className="text-sm text-gray-300 font-bold uppercase tracking-[0.2em]">Export Disbursals</p>
            </div>
            <div className="px-4">
              <p className="text-5xl md:text-6xl font-black mb-3">100<span className="text-[#FF6600] text-4xl">%</span></p>
              <p className="text-sm text-gray-300 font-bold uppercase tracking-[0.2em]">Machinery Finance</p>
            </div>
            <div className="px-4">
              <p className="text-5xl md:text-6xl font-black mb-3">25<span className="text-[#FF6600] text-4xl">+</span></p>
              <p className="text-sm text-gray-300 font-bold uppercase tracking-[0.2em]">Years Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-lg font-medium">Clear answers to help you make informed financial decisions.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full flex justify-between items-center p-6 md:p-8 transition text-left ${activeFaq === index ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className={`font-bold text-lg pr-4 ${activeFaq === index ? 'text-[#FF6600]' : 'text-[#003366]'}`}>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'bg-orange-100 rotate-180' : 'bg-slate-100 rotate-0'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#FF6600]' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div 
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: activeFaq === index ? '200px' : '0', opacity: activeFaq === index ? 1 : 0 }}
                >
                  <p className="text-gray-600 font-medium leading-relaxed p-6 md:p-8 pt-0 bg-slate-50 border-t border-gray-100">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Newsletter Lead Capture */}
      <section className="py-24 bg-slate-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white w-20 h-20 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-10 h-10 text-[#FF6600]" />
          </div>
          <h2 className="text-4xl font-black text-[#003366] mb-6 tracking-tight">Stay Ahead of the Markets</h2>
          <p className="text-gray-500 text-lg font-medium mb-12 max-w-2xl mx-auto">Join our exclusive mailing list for HNI investment strategies, IPO updates, and MSME regulatory alerts delivered straight to your inbox.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your corporate email address" 
              className="flex-1 px-8 py-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] font-medium text-gray-800 shadow-sm"
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className={`bg-[#003366] text-white font-bold py-5 px-10 rounded-2xl transition duration-300 shadow-lg whitespace-nowrap flex items-center justify-center ${isSubscribing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#002244] hover:-translate-y-1'}`}
            >
              {isSubscribing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Subscribing...</> : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FF6600] rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <TrendingUp className="absolute -bottom-10 -right-10 w-80 h-80 text-white opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                Ready to Accelerate <br/>Your Growth?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
                Whether you're looking for global expansion in GIFT City, planning an IPO, or seeking seamless working capital.
              </p>
              <Link to="/contact" className="inline-flex items-center bg-[#003366] hover:bg-[#002244] text-white font-bold py-5 px-12 rounded-2xl shadow-[0_10px_20px_rgba(0,51,102,0.3)] transform hover:-translate-y-1 transition-all duration-300 text-lg">
                Book a Free Consultation <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;