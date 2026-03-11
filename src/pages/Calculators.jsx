import React, { useState } from 'react';
import { 
  Calculator, TrendingUp, Home, Briefcase, 
  RefreshCw, ArrowRight, ArrowDownCircle, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Calculators = () => {
  const [activeCalc, setActiveCalc] = useState('SIP');

  // --- 1. SIP CALCULATOR STATE ---
  const [sipAmount, setSipAmount] = useState(15000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(15);

  // --- 2. LUMPSUM (COMPOUNDING) STATE ---
  const [lumpAmount, setLumpAmount] = useState(1000000);
  const [lumpRate, setLumpRate] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);

  // --- 3. SWP CALCULATOR STATE ---
  const [swpAmount, setSwpAmount] = useState(10000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(50000);
  const [swpRate, setSwpRate] = useState(8);
  const [swpYears, setSwpYears] = useState(10);

  // --- 4. RETIREMENT CALCULATOR STATE ---
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [retireReturn, setRetireReturn] = useState(10);

  // --- 5. EMI CALCULATOR STATE ---
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(20);

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // --- MATH LOGIC ---

  // 1. SIP Math
  const calculateSIP = () => {
    const monthlyRate = (sipRate / 100) / 12;
    const months = sipYears * 12;
    const investedAmount = sipAmount * months;
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const wealthGained = futureValue - investedAmount;
    return { investedAmount, wealthGained, futureValue };
  };

  // 2. Lumpsum Math
  const calculateLumpsum = () => {
    const r = lumpRate / 100;
    const futureValue = lumpAmount * Math.pow(1 + r, lumpYears);
    const wealthGained = futureValue - lumpAmount;
    return { investedAmount: lumpAmount, wealthGained, futureValue };
  };

  // 3. SWP Math
  const calculateSWP = () => {
    let balance = swpAmount;
    let totalWithdrawn = 0;
    const monthlyRate = (swpRate / 100) / 12;
    const months = swpYears * 12;
    let isDepleted = false;
    let depletedMonth = 0;

    for (let i = 1; i <= months; i++) {
      balance = balance * (1 + monthlyRate) - swpWithdrawal;
      if (balance > 0) {
        totalWithdrawn += swpWithdrawal;
      } else {
        totalWithdrawn += (balance + swpWithdrawal); // Add the last partial amount
        balance = 0;
        isDepleted = true;
        depletedMonth = i;
        break;
      }
    }
    return { finalBalance: Math.max(0, balance), totalWithdrawn, isDepleted, depletedMonth };
  };

  // 4. Retirement Math
  const calculateRetirement = () => {
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const yearsInRetirement = Math.max(0, lifeExpectancy - retireAge);
    
    // Future cost of living
    const futureMonthlyExpense = monthlyExpense * Math.pow(1 + (inflation / 100), yearsToRetire);
    
    // Real rate of return (adjusted for inflation during retirement)
    const realReturn = ((1 + (retireReturn / 100)) / (1 + (inflation / 100))) - 1;
    const monthlyRealReturn = realReturn / 12;
    const retirementMonths = yearsInRetirement * 12;

    // Corpus needed (Present Value of Annuity)
    let corpusNeeded = 0;
    if (monthlyRealReturn === 0) {
        corpusNeeded = futureMonthlyExpense * retirementMonths;
    } else {
        corpusNeeded = futureMonthlyExpense * ((1 - Math.pow(1 + monthlyRealReturn, -retirementMonths)) / monthlyRealReturn);
    }

    return { futureMonthlyExpense, corpusNeeded, yearsToRetire };
  };

  // 5. EMI Math
  const calculateEMI = () => {
    const monthlyRate = (loanRate / 100) / 12;
    const months = loanYears * 12;
    const emi = loanAmount * monthlyRate * (Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1));
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    return { emi, totalInterest, totalPayment };
  };

  const sipResults = calculateSIP();
  const lumpResults = calculateLumpsum();
  const swpResults = calculateSWP();
  const retResults = calculateRetirement();
  const emiResults = calculateEMI();

  const toolsList = [
    { id: 'SIP', name: 'SIP Calculator', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'LUMPSUM', name: 'Lumpsum Calculator', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'SWP', name: 'SWP Calculator', icon: <ArrowDownCircle className="w-5 h-5" /> },
    { id: 'RETIREMENT', name: 'Retirement Planner', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'EMI', name: 'EMI Calculator', icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-slate-50 font-sans relative overflow-hidden">
      
      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <section className="relative bg-[#003366] text-white pt-20 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <Calculator className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <Activity className="w-4 h-4" />
            <span>Interactive Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            Financial <span className="text-[#FF6600]">Calculators.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Take control of your financial future. Use our advanced modeling tools to project wealth creation, plan for retirement, and analyze liabilities.
          </p>
        </div>
      </section>

      {/* 2. Interactive Dashboard Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar Menu */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden sticky top-28">
                <div className="p-6 bg-[#003366] text-white">
                  <h3 className="font-bold text-lg">Select Tool</h3>
                </div>
                <div className="p-3 space-y-2 bg-white">
                  {toolsList.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveCalc(tool.id)}
                      className={`w-full flex items-center p-4 rounded-2xl transition-all font-bold text-left ${
                        activeCalc === tool.id 
                        ? 'bg-orange-50 text-[#FF6600] shadow-sm' 
                        : 'text-gray-500 hover:bg-slate-50 hover:text-[#003366]'
                      }`}
                    >
                      <span className={`mr-4 ${activeCalc === tool.id ? 'text-[#FF6600]' : 'text-gray-400'}`}>
                        {tool.icon}
                      </span>
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Calculator Display */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                
                {/* =========================================
                    1. SIP CALCULATOR 
                ========================================== */}
                {activeCalc === 'SIP' && (
                  <>
                    <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                      <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">SIP Calculator</h2>
                      <p className="text-gray-500 mb-10 text-sm">Calculate the future value of your systematic monthly investments.</p>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Monthly Investment</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">
                              {formatINR(sipAmount)}
                            </div>
                          </div>
                          <input type="range" min="500" max="500000" step="500" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Expected Return Rate (p.a)</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{sipRate}%</div>
                          </div>
                          <input type="range" min="5" max="30" step="1" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Time Period</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{sipYears} Years</div>
                          </div>
                          <input type="range" min="1" max="40" step="1" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white flex flex-col justify-center relative">
                      <div className="space-y-8 relative z-10">
                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Total Invested</p>
                          <p className="text-2xl font-bold">{formatINR(sipResults.investedAmount)}</p>
                        </div>
                        <div>
                          <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-1">Est. Returns Gained</p>
                          <p className="text-2xl font-bold text-green-400">+{formatINR(sipResults.wealthGained)}</p>
                        </div>
                        <div className="pt-6 border-t border-white/20">
                          <p className="text-[#FF6600] font-bold text-sm uppercase tracking-widest mb-2">Total Future Value</p>
                          <p className="text-4xl lg:text-5xl font-extrabold tracking-tight">{formatINR(sipResults.futureValue)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* =========================================
                    2. LUMPSUM CALCULATOR 
                ========================================== */}
                {activeCalc === 'LUMPSUM' && (
                  <>
                    <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                      <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">Lumpsum Calculator</h2>
                      <p className="text-gray-500 mb-10 text-sm">Estimate the compounding power of a one-time investment.</p>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Total Investment</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{formatINR(lumpAmount)}</div>
                          </div>
                          <input type="range" min="10000" max="50000000" step="10000" value={lumpAmount} onChange={(e) => setLumpAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Expected Return Rate (p.a)</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{lumpRate}%</div>
                          </div>
                          <input type="range" min="5" max="30" step="1" value={lumpRate} onChange={(e) => setLumpRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Time Period</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{lumpYears} Years</div>
                          </div>
                          <input type="range" min="1" max="40" step="1" value={lumpYears} onChange={(e) => setLumpYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white flex flex-col justify-center relative">
                      <div className="space-y-8 relative z-10">
                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Total Invested</p>
                          <p className="text-2xl font-bold">{formatINR(lumpResults.investedAmount)}</p>
                        </div>
                        <div>
                          <p className="text-green-400 font-bold text-xs uppercase tracking-widest mb-1">Est. Returns Gained</p>
                          <p className="text-2xl font-bold text-green-400">+{formatINR(lumpResults.wealthGained)}</p>
                        </div>
                        <div className="pt-6 border-t border-white/20">
                          <p className="text-[#FF6600] font-bold text-sm uppercase tracking-widest mb-2">Total Future Value</p>
                          <p className="text-4xl lg:text-5xl font-extrabold tracking-tight">{formatINR(lumpResults.futureValue)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* =========================================
                    3. SWP CALCULATOR 
                ========================================== */}
                {activeCalc === 'SWP' && (
                  <>
                    <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                      <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">SWP Calculator</h2>
                      <p className="text-gray-500 mb-10 text-sm">Systematic Withdrawal Plan: See how long your corpus will last with regular monthly withdrawals.</p>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Total Corpus Amount</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{formatINR(swpAmount)}</div>
                          </div>
                          <input type="range" min="500000" max="100000000" step="500000" value={swpAmount} onChange={(e) => setSwpAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Monthly Withdrawal</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{formatINR(swpWithdrawal)}</div>
                          </div>
                          <input type="range" min="5000" max="500000" step="5000" value={swpWithdrawal} onChange={(e) => setSwpWithdrawal(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <label className="font-bold text-gray-600 text-sm">Est. Return</label>
                              <span className="font-bold text-[#003366]">{swpRate}%</span>
                            </div>
                            <input type="range" min="4" max="20" step="1" value={swpRate} onChange={(e) => setSwpRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <label className="font-bold text-gray-600 text-sm">Tenure</label>
                              <span className="font-bold text-[#003366]">{swpYears} Yrs</span>
                            </div>
                            <input type="range" min="1" max="40" step="1" value={swpYears} onChange={(e) => setSwpYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white flex flex-col justify-center relative">
                      <div className="space-y-8 relative z-10">
                        {swpResults.isDepleted ? (
                          <div className="bg-red-500/20 border border-red-500/50 p-6 rounded-2xl mb-4">
                            <p className="font-bold text-red-400 mb-2">⚠️ Corpus Depleted Early</p>
                            <p className="text-sm">Your fund will run out in <span className="font-bold text-white">{Math.floor(swpResults.depletedMonth / 12)} years and {swpResults.depletedMonth % 12} months</span>. Consider reducing withdrawal amount.</p>
                          </div>
                        ) : (
                           <div className="bg-green-500/20 border border-green-500/50 p-6 rounded-2xl mb-4">
                             <p className="font-bold text-green-400 mb-1">✅ Safe Withdrawal Rate</p>
                             <p className="text-sm">Your corpus will easily survive the {swpYears}-year tenure.</p>
                           </div>
                        )}

                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Total Withdrawn</p>
                          <p className="text-2xl font-bold">{formatINR(swpResults.totalWithdrawn)}</p>
                        </div>
                        <div className="pt-6 border-t border-white/20">
                          <p className="text-[#FF6600] font-bold text-sm uppercase tracking-widest mb-2">Final Corpus Balance</p>
                          <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{formatINR(swpResults.finalBalance)}</p>
                          <p className="text-xs text-gray-400 mt-2">After {swpYears} years.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* =========================================
                    4. RETIREMENT CALCULATOR 
                ========================================== */}
                {activeCalc === 'RETIREMENT' && (
                  <>
                    <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                      <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">Retirement Planner</h2>
                      <p className="text-gray-500 mb-10 text-sm">Calculate the exact corpus needed to retire comfortably, accounting for inflation.</p>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="font-bold text-gray-600 text-sm">Current Age</label>
                              <span className="font-bold text-[#003366]">{currentAge}</span>
                            </div>
                            <input type="range" min="20" max="60" step="1" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="font-bold text-gray-600 text-sm">Retirement Age</label>
                              <span className="font-bold text-[#003366]">{retireAge}</span>
                            </div>
                            <input type="range" min="40" max="75" step="1" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4 mt-4">
                            <label className="font-bold text-[#003366]">Current Monthly Expenses</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">{formatINR(monthlyExpense)}</div>
                          </div>
                          <input type="range" min="20000" max="500000" step="5000" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="font-bold text-gray-600 text-sm">Expected Inflation</label>
                              <span className="font-bold text-red-500">{inflation}%</span>
                            </div>
                            <input type="range" min="3" max="10" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="font-bold text-gray-600 text-sm">Return Post-Retirement</label>
                              <span className="font-bold text-green-600">{retireReturn}%</span>
                            </div>
                            <input type="range" min="5" max="15" step="0.5" value={retireReturn} onChange={(e) => setRetireReturn(Number(e.target.value))} className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white flex flex-col justify-center relative">
                      <div className="space-y-8 relative z-10">
                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Time to Retire</p>
                          <p className="text-2xl font-bold">{retResults.yearsToRetire} Years</p>
                        </div>
                        <div>
                          <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Est. Monthly Expense at Retirement</p>
                          <p className="text-2xl font-bold text-red-400">{formatINR(retResults.futureMonthlyExpense)}</p>
                          <p className="text-xs text-gray-400 mt-1">Due to {inflation}% inflation over {retResults.yearsToRetire} yrs.</p>
                        </div>
                        <div className="pt-6 border-t border-white/20">
                          <p className="text-[#FF6600] font-bold text-sm uppercase tracking-widest mb-2">Total Corpus Required</p>
                          <p className="text-4xl lg:text-5xl font-extrabold tracking-tight">{formatINR(retResults.corpusNeeded)}</p>
                          <p className="text-xs text-gray-400 mt-3 italic">*Assumes you will need this corpus to survive until age {lifeExpectancy}.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* =========================================
                    5. EMI CALCULATOR 
                ========================================== */}
                {activeCalc === 'EMI' && (
                  <>
                    <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                      <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">EMI Calculator</h2>
                      <p className="text-gray-500 mb-10 text-sm">Calculate your monthly equated installments for Home or Business loans.</p>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Loan Amount</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">
                              {formatINR(loanAmount)}
                            </div>
                          </div>
                          <input type="range" min="100000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Interest Rate (p.a)</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">
                              {loanRate}%
                            </div>
                          </div>
                          <input type="range" min="5" max="20" step="0.1" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-[#003366]">Loan Tenure</label>
                            <div className="bg-slate-50 border border-gray-200 px-4 py-2 rounded-lg font-bold text-[#FF6600]">
                              {loanYears} Years
                            </div>
                          </div>
                          <input type="range" min="1" max="30" step="1" value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003366]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/5 bg-[#003366] text-white flex flex-col justify-center relative">
                      <div className="space-y-8 relative z-10">
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                          <p className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-2">Monthly EMI</p>
                          <p className="text-4xl font-extrabold text-[#FF6600]">{formatINR(emiResults.emi)}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Principal Amount</p>
                          <p className="text-xl font-bold">{formatINR(loanAmount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Total Interest Payable</p>
                          <p className="text-xl font-bold text-red-400">{formatINR(emiResults.totalInterest)}</p>
                        </div>
                        <div className="pt-6 border-t border-white/20">
                          <p className="text-white font-bold text-sm uppercase tracking-widest mb-2">Total Payment (Prin + Int)</p>
                          <p className="text-2xl font-bold tracking-tight">{formatINR(emiResults.totalPayment)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 text-lg">Want to turn these projections into reality? Consult with our wealth management experts.</p>
            <Link to="/contact" className="inline-flex justify-center items-center bg-[#003366] hover:bg-[#002244] text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-lg text-lg">
              Schedule Strategy Session <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Calculators;