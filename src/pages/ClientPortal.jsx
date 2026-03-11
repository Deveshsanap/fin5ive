import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Mail, Key, ShieldCheck, ArrowLeft, Loader2, Server, 
  LayoutDashboard, Briefcase, FileText, Settings, LogOut, 
  TrendingUp, Download, Bell, User as UserIcon, Activity, 
  CheckCircle, Search, Clock, PieChart, ArrowRight, UserPlus, 
  RefreshCw, AlertTriangle, Phone
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  loginUser, registerUser, getUser, updateUser, 
  getCustomer, getCustomerDocuments, downloadDocument 
} from '../config/api'; 

// --- HELPER: SECURELY DECODE JWT TOKEN ---
// This extracts the User ID hidden inside the token your backend sends!
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const ClientPortal = () => {
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('fin5ive_auth') === 'true');
  const [view, setView] = useState('LOGIN'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // --- LOGIN / REGISTER FORM STATE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState(() => localStorage.getItem('fin5ive_user') || '');
  const [phone, setPhone] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- REAL BACKEND DATA STATE ---
  const [userData, setUserData] = useState({ 
    name: localStorage.getItem('fin5ive_userName') || '',
    email: localStorage.getItem('fin5ive_user') || ''
  }); 
  const [customerData, setCustomerData] = useState(null); 
  const [documents, setDocuments] = useState([]); 

  // --- SETTINGS FORMS STATE ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmNewPassword: '' });

  // --- DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState('OVERVIEW'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timer;
    if (isLoggedIn) timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isLoggedIn]);

  // --- HELPER: GET SAFE USER ID ---
  const getSafeUserId = () => {
    const userId = localStorage.getItem('fin5ive_userId');
    if (!userId || userId === 'null' || userId === 'undefined') return null;
    return userId;
  };

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserData({ name: '', email: '' });
    setCustomerData(null);
    setDocuments([]);
    setPassword('');
    setView('LOGIN');
    setActiveTab('OVERVIEW');
    localStorage.clear(); 
    toast('Securely logged out.', { icon: '🔒' });
  }, []);

  // --- FETCH REAL DATA ---
  const fetchDashboardData = useCallback(async (isInitialLoad = false) => {
    if (!isLoggedIn) return;
    
    const userId = getSafeUserId();
    
    if (!userId) {
      toast.error("Session corrupted. Please log in again.");
      handleLogout();
      return;
    }

    if (isInitialLoad) setIsFetchingData(true);
    
    try {
      // 1. Fetch Base User Profile
      const userRes = await getUser(userId);
      const profile = userRes.data?.data || userRes.data;
      setUserData(profile);
      setProfileForm({ name: profile.name || '', phone: profile.phone || '' });
      localStorage.setItem('fin5ive_userName', profile.name || '');

      // 2. Fetch Customer Financial Data
      try {
        const custRes = await getCustomer(userId);
        setCustomerData(custRes.data?.data || custRes.data);
      } catch (e) {
        console.warn("No financial customer profile linked yet.");
      }

      // 3. Fetch Documents
      try {
        const docsRes = await getCustomerDocuments(userId);
        setDocuments(docsRes.data?.data || docsRes.data || []);
      } catch (e) {
        console.warn("No documents found.");
      }
      
    } catch (error) {
      console.error("Failed to fetch secure client data", error);
      if(error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
        toast.error("Session expired or invalid. Please log in again.");
        handleLogout(); 
      }
    } finally {
      if (isInitialLoad) setIsFetchingData(false);
    }
  }, [isLoggedIn, handleLogout]);

  useEffect(() => { fetchDashboardData(true); }, [fetchDashboardData]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // --- LOGIN HANDLER (FIXED WITH JWT DECODER) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please enter both email and password.");

    setIsSubmitting(true);
    try {
      const response = await loginUser({ email, password });
      
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        
        // Grab the token from however the backend sends it
        const token = typeof data === 'string' ? data : (data.token || data.access_token || data.jwt); 
        
        if (!token) {
          toast.error("Login failed: Server did not return a token.");
          setIsSubmitting(false);
          return;
        }

        // DECODE THE TOKEN TO FIND THE ID
        const decodedToken = parseJwt(token);
        
        // Look for the ID inside the token (sub), or in the standard response body
        const userObj = data.user || data.data || data;
        const extractedUserId = decodedToken?.sub || decodedToken?.id || decodedToken?.userId || userObj._id || userObj.id || data.id;

        if (!extractedUserId) {
          console.error("Decoded Token:", decodedToken, "Response Data:", data);
          toast.error("Login successful, but server didn't return a User ID!");
          setIsSubmitting(false);
          return;
        }

        // Save everything safely
        localStorage.setItem('fin5ive_token', token);
        localStorage.setItem('fin5ive_userId', extractedUserId);
        localStorage.setItem('fin5ive_auth', 'true');
        localStorage.setItem('fin5ive_user', email);

        setIsLoggedIn(true);

        // We fetch the user profile directly after login to check their status and get their name
        try {
          const userProfileRes = await getUser(extractedUserId);
          const profile = userProfileRes.data?.data || userProfileRes.data;
          
          localStorage.setItem('fin5ive_userName', profile.name || '');

          // Check if they need to be restored from soft deletion
          if (profile.status === 'pending_deletion' || profile.status === 'deactivated') {
             await updateUser(extractedUserId, { status: 'active', deletionScheduledAt: null });
             toast.success("Welcome back! Your account deletion request has been cancelled.", { duration: 5000 });
          } else {
             toast.success('Authentication successful. Welcome back!');
          }
        } catch (fetchError) {
          toast.success('Authentication successful.'); // Fallback success if fetching profile fails initially
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- REGISTER HANDLER ---
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match.");

    setIsSubmitting(true);
    try {
      const payload = { name, email, password };
      const response = await registerUser(payload);
      
      if (response.status === 201 || response.status === 200) {
        toast.success('Registration successful! You can now log in.');
        setPassword('');
        setConfirmPassword('');
        setView('LOGIN'); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SETTINGS HANDLERS ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const userId = getSafeUserId();
    if (!userId) return;

    try {
      await updateUser(userId, { name: profileForm.name });
      setUserData({ ...userData, name: profileForm.name });
      localStorage.setItem('fin5ive_userName', profileForm.name); 
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const userId = getSafeUserId();
    if (!userId) return;

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      return toast.error("New passwords do not match.");
    }
    try {
      await updateUser(userId, { password: passwordForm.newPassword });
      setIsChangingPassword(false);
      setPasswordForm({ newPassword: '', confirmNewPassword: '' });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password.");
    }
  };

  const handleDeactivate = async () => {
    const userId = getSafeUserId();
    if (!userId) return;

    if (!window.confirm("Are you sure you want to deactivate your account? You will be logged out immediately.")) return;
    try {
      await updateUser(userId, { status: 'deactivated' });
      toast.success("Account deactivated successfully.");
      handleLogout();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to deactivate account.");
    }
  };

  const handleSoftDelete = async () => {
    const userId = getSafeUserId();
    if (!userId) return;

    const isConfirmed = window.confirm(
      "WARNING: Your account will be scheduled for permanent deletion in 3 days. \n\nIf you change your mind, simply log back in before 3 days pass to cancel the deletion and restore your account. \n\nDo you wish to proceed?"
    );
    if (!isConfirmed) return;

    try {
      const deletionDate = new Date();
      deletionDate.setDate(deletionDate.getDate() + 3); 

      await updateUser(userId, { 
        status: 'pending_deletion', 
        deletionScheduledAt: deletionDate.toISOString() 
      });

      toast.success("Account scheduled for deletion. Logging you out...", { duration: 4000 });
      setTimeout(() => { handleLogout(); }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to schedule account deletion.");
    }
  };
  
  const handleRealDownload = async (docId, fileName) => {
    const loadingToast = toast.loading('Decrypting and fetching file...');
    try {
      const response = await downloadDocument(docId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'document.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`${fileName} downloaded securely.`, { id: loadingToast });
    } catch (error) {
      toast.error('Failed to download document.', { id: loadingToast });
    }
  };

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);

  const filteredDocs = documents.filter(doc => 
    doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) || doc.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const portalTabs = [
    { id: 'OVERVIEW', icon: LayoutDashboard, label: 'Overview' },
    { id: 'PORTFOLIO', icon: Briefcase, label: 'Wealth Portfolio' },
    { id: 'DOCUMENTS', icon: FileText, label: 'Document Vault' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings' }
  ];

  const realTransactions = customerData?.transactions || [];
  const realPortfolio = customerData?.portfolio || [];
  const aum = customerData?.aum || customerData?.totalWealth || 0;
  const creditLine = customerData?.creditLine || customerData?.creditLimit || 0;

  // ==========================================
  // RENDER: SECURE DASHBOARD
  // ==========================================
  if (isLoggedIn) {
    if (isFetchingData && !userData?.name) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col">
          <Loader2 className="w-12 h-12 text-finOrange animate-spin mb-4" />
          <h3 className="text-finBlue font-black text-xl animate-pulse">Establishing Secure Connection...</h3>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative z-[60] font-sans">
        <aside className="w-full md:w-72 bg-finBlue text-white flex flex-col shadow-2xl z-40 md:h-screen md:sticky top-0 flex-shrink-0">
          <div className="p-5 md:p-8 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex flex-col group">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none group-hover:text-finOrange transition-colors">
                FIN<span className="text-finOrange group-hover:text-white transition-colors">5</span>IVE
              </span>
              <span className="text-[0.6rem] md:text-xs font-bold text-finOrange tracking-[0.2em] uppercase mt-1">Client Portal</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            <nav className="flex md:flex-col gap-2 p-4 md:p-6 overflow-x-auto md:overflow-y-auto scrollbar-hide">
              {portalTabs.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)} 
                  className={`flex items-center flex-shrink-0 w-auto md:w-full px-5 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === item.id ? 'bg-finOrange text-white shadow-lg md:translate-x-2 font-bold' : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'animate-pulse' : 'opacity-70'}`} /> {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden md:block p-6 border-t border-white/10 mt-auto bg-finBlue/50">
            <button onClick={handleLogout} className="flex items-center w-full px-5 py-3.5 rounded-xl font-bold text-red-400 hover:bg-red-400/10 transition-colors group">
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" /> Secure Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
          <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm flex-shrink-0">
            <div className="flex flex-col">
              <h2 className="text-lg md:text-2xl font-extrabold text-finBlue">
                {getGreeting()}<span className="hidden sm:inline">, {userData?.name || "Client"}</span>
              </h2>
              <div className="hidden md:flex items-center text-xs text-gray-500 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5 mr-1.5" /> 
                {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5 ml-auto">
              <button onClick={() => fetchDashboardData(true)} className="p-2 text-gray-400 hover:text-finOrange hover:bg-orange-50 rounded-full hidden md:block">
                <RefreshCw className={`w-5 h-5 ${isFetchingData ? 'animate-spin text-finOrange' : ''}`} />
              </button>
              <button onClick={handleLogout} className="md:hidden text-red-500 p-2 hover:bg-red-50 rounded-full">
                <LogOut className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 pl-3 md:pl-5 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-finBlue leading-tight">{userData?.email || email}</p>
                  <p className="text-xs text-green-500 font-bold tracking-wider uppercase mt-0.5 flex items-center justify-end">
                    <CheckCircle className="w-3 h-3 mr-1" /> Active
                  </p>
                </div>
                <div className="w-10 h-10 md:w-11 md:h-11 bg-slate-100 border border-gray-200 text-finBlue rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto pb-20 md:pb-0">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'OVERVIEW' && (
                <div className="animate-[fadeIn_0.4s_ease-out] space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Credit Line</p>
                        <div className="bg-blue-50 p-3 rounded-xl text-finBlue"><Activity className="w-5 h-5" /></div>
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-2">{formatINR(creditLine)}</h3>
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Wealth AUM</p>
                        <div className="bg-orange-50 p-3 rounded-xl text-finOrange"><TrendingUp className="w-5 h-5" /></div>
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-finBlue mb-2">{formatINR(aum)}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 bg-slate-50/50">
                      <h3 className="text-lg font-extrabold text-finBlue">Recent Ledger Activity</h3>
                    </div>
                    {realTransactions.length > 0 ? (
                      <div className="divide-y divide-gray-50">
                        {realTransactions.map((item, i) => (
                          <div key={item.id || i} className="flex justify-between items-center p-6 hover:bg-slate-50">
                            <div>
                              <p className="font-bold text-gray-800">{item.description || item.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-extrabold ${item.type === 'credit' ? 'text-green-500' : 'text-gray-800'}`}>
                                {item.type === 'debit' ? '-' : '+'}{formatINR(item.amount)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-10 text-center text-gray-500 font-medium">No recent transactions found.</div>
                    )}
                  </div>
                </div>
              )}

              {/* PORTFOLIO TAB */}
              {activeTab === 'PORTFOLIO' && (
                <div className="animate-[fadeIn_0.4s_ease-out] space-y-6">
                  {realPortfolio.length > 0 ? (
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                       <h4 className="font-extrabold text-finBlue mb-6 text-lg">Top Performing Funds</h4>
                       <div className="space-y-4">
                        {realPortfolio.map((fund, idx) => (
                          <div key={idx} className="flex justify-between items-center p-5 border border-gray-100 rounded-2xl">
                            <div className="flex items-center">
                              <div className="bg-slate-50 p-3.5 rounded-xl mr-5 text-finBlue border border-gray-100 shadow-sm">
                                <PieChart className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-extrabold text-gray-800">{fund.name}</p>
                                <p className="text-xs text-gray-500 font-bold uppercase mt-1">{fund.type || "Asset"}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-extrabold text-finBlue text-lg">{formatINR(fund.value)}</p>
                              <p className={`text-sm font-bold mt-0.5 ${fund.return >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {fund.return > 0 ? '+' : ''}{fund.return}% <span className="text-gray-400 text-xs font-medium ml-1">YTD</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
                      <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-finBlue">Portfolio Not Assigned Yet</h3>
                      <p className="text-gray-500 mt-2">Your Relationship Manager is currently building your profile.</p>
                    </div>
                  )}
                </div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === 'DOCUMENTS' && (
                <div className="animate-[fadeIn_0.4s_ease-out] h-full flex flex-col">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-finBlue mb-1">Document Vault</h3>
                    </div>
                    <div className="relative w-full lg:w-80">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" placeholder="Search files..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-finOrange"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredDocs.length > 0 ? (
                      filteredDocs.map((doc) => (
                        <div key={doc.id || doc._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                          <div className="flex items-center truncate pr-4">
                            <div className="bg-red-50 p-4 rounded-2xl text-red-500 mr-5 flex-shrink-0"><FileText className="w-7 h-7" /></div>
                            <div className="truncate">
                              <p className="font-bold text-finBlue text-base truncate">{doc.title || doc.name || "Document"}</p>
                              <div className="text-xs text-gray-500 mt-1">{new Date(doc.createdAt || Date.now()).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <button onClick={() => handleRealDownload(doc.id || doc._id, doc.title || doc.name)} className="bg-slate-50 p-3.5 rounded-xl text-finBlue hover:bg-finOrange hover:text-white transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 lg:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-gray-100 border-dashed">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold text-lg">No documents found.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SETTINGS TAB WITH EDIT & DELETE */}
              {activeTab === 'SETTINGS' && (
                <div className="animate-[fadeIn_0.4s_ease-out] max-w-4xl space-y-8">
                  
                  {/* Profile Edit Section */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 bg-slate-50/50 flex justify-between items-center">
                      <h4 className="font-extrabold text-gray-800 text-lg">Profile Details</h4>
                      {!isEditingProfile && (
                        <button onClick={() => setIsEditingProfile(true)} className="text-sm font-bold text-finOrange hover:text-orange-700 transition-colors">
                          Edit Profile
                        </button>
                      )}
                    </div>
                    <div className="p-6">
                      {isEditingProfile ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                            <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-finOrange outline-none" required />
                          </div>
                          <div className="flex space-x-3 pt-2">
                            <button type="submit" className="bg-finOrange text-white font-bold py-2.5 px-6 rounded-lg hover:bg-orange-600 transition-colors">Save Changes</button>
                            <button type="button" onClick={() => setIsEditingProfile(false)} className="bg-gray-100 text-gray-600 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
                            <p className="text-sm text-gray-500 font-bold">Registered Name</p>
                            <p className="text-sm text-gray-800 font-medium text-right">{userData?.name || "N/A"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <p className="text-sm text-gray-500 font-bold">Email Address</p>
                            <p className="text-sm text-gray-800 font-medium text-right">{userData?.email || email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 bg-slate-50/50 flex justify-between items-center">
                      <h4 className="font-extrabold text-gray-800 text-lg">Security</h4>
                      {!isChangingPassword && (
                        <button onClick={() => setIsChangingPassword(true)} className="text-sm font-bold text-finBlue hover:text-blue-800 transition-colors">
                          Change Password
                        </button>
                      )}
                    </div>
                    <div className="p-6">
                      {isChangingPassword ? (
                        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                            <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-finOrange outline-none" required minLength="6" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                            <input type="password" value={passwordForm.confirmNewPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmNewPassword: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-finOrange outline-none" required minLength="6" />
                          </div>
                          <div className="flex space-x-3 pt-2">
                            <button type="submit" className="bg-finBlue text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-900 transition-colors">Update Password</button>
                            <button type="button" onClick={() => setIsChangingPassword(false)} className="bg-gray-100 text-gray-600 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <p className="text-sm text-gray-500 leading-relaxed">Ensure your account is using a long, random password to stay secure.</p>
                      )}
                    </div>
                  </div>

                  {/* Danger Zone: Deactivate & Delete */}
                  <div className="bg-red-50/50 rounded-3xl border border-red-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-red-100 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      <h4 className="font-extrabold text-red-600 text-lg">Danger Zone</h4>
                    </div>
                    <div className="p-6 space-y-6">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-800">Deactivate Account</p>
                          <p className="text-sm text-gray-500 mt-1">Temporarily disable your portal access. You will be logged out.</p>
                        </div>
                        <button onClick={handleDeactivate} className="text-sm font-bold text-gray-700 bg-white border border-gray-300 px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm flex-shrink-0">
                          Deactivate
                        </button>
                      </div>

                      <div className="w-full h-px bg-red-100"></div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-red-600">Delete Account</p>
                          <p className="text-sm text-red-400 mt-1">Schedules your account for permanent deletion in 3 days. Logging back in will cancel the deletion.</p>
                        </div>
                        <button onClick={handleSoftDelete} className="text-sm font-bold text-red-600 bg-white border border-red-200 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors shadow-sm flex-shrink-0">
                          Schedule Deletion
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER: LOGIN & REGISTER
  // ==========================================
  return (
    <div className="min-h-screen flex bg-slate-50 relative z-50">
      <div className="hidden lg:flex lg:w-1/2 bg-finBlue text-white p-16 flex-col justify-between relative overflow-hidden">
        <Server className="absolute -bottom-20 -left-20 w-[500px] h-[500px] opacity-5 pointer-events-none" />
        <div className="relative z-10 max-w-lg mt-10">
          <div className="bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center backdrop-blur-md mb-10 border border-white/20 shadow-2xl">
            <ShieldCheck className="w-12 h-12 text-finOrange" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">Secure Client <br/><span className="text-finOrange">Portal.</span></h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 my-8">
          
          {view === 'LOGIN' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-finBlue mb-3">Welcome Back</h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="Email Address"/>
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Key className="h-5 w-5 text-gray-400" /></div>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="••••••••" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-xl flex justify-center items-center text-lg mt-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-finBlue hover:bg-[#002244]'}`}>
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Secure Sign In <ArrowRight className="w-5 h-5 ml-2" /></>}
                </button>
              </form>
            </div>
          )}

          {view === 'REGISTER' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="text-center mb-10"><h2 className="text-3xl font-black text-finBlue mb-3">Create Account</h2></div>
              <form onSubmit={handleRegister} className="space-y-6">
                
                {/* STRICT PAYLOAD: Only Name, Email, Password here */}
                <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-400" /></div><input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="Full Name"/></div>
                <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="Email"/></div>
                <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Key className="h-5 w-5 text-gray-400" /></div><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="Password" minLength="6" /></div>
                <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><ShieldCheck className="h-5 w-5 text-gray-400" /></div><input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-finOrange outline-none transition-all font-medium text-gray-800" placeholder="Confirm Password" minLength="6" /></div>
                
                <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-xl flex justify-center items-center text-lg mt-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-finOrange hover:bg-orange-600'}`}>
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Registration <UserPlus className="w-5 h-5 ml-2" /></>}
                </button>
              </form>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            {view === 'LOGIN' ? (
              <p className="text-gray-500 text-sm font-medium mb-4">Not a client yet? <button type="button" onClick={() => setView('REGISTER')} className="font-extrabold text-[#003366] hover:text-[#FF6600] transition-colors ml-1">Register Now</button></p>
            ) : (
              <p className="text-gray-500 text-sm font-medium mb-4">Already have an account? <button type="button" onClick={() => setView('LOGIN')} className="font-extrabold text-[#003366] hover:text-[#FF6600] transition-colors ml-1">Sign In</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;