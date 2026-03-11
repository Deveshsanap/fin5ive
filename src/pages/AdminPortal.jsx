import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Users, Mailbox, FolderOpen, 
  LogOut, TrendingUp, Search, Bell, Filter, CheckCircle, 
  Clock, ArrowRight, Loader2, Lock, Eye, Trash2, Plus, 
  UploadCloud, FileText, Download, X, Building2, Phone, Mail,
  Briefcase, Menu, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { 
  loginUser, registerUser, getAllContacts, updateContact, deleteContact,
  getAllCustomers, createCustomer, deleteCustomer,
  getAllDocuments, uploadDocumentAdmin, deleteDocumentApi, downloadDocument
} from '../config/api';

// --- HELPER: SECURELY DECODE JWT TOKEN ---
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

const AdminPortal = () => {
  // --- AUTHENTICATION STATE ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem('fin5ive_admin_auth') === 'true');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  
  // HARDCODED MASTER ADMIN ID
  const [email, setEmail] = useState('admin@fin5ive.com');
  const [password, setPassword] = useState('');

  // --- CORE DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState('DASHBOARD'); 
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- REAL DATABASE STATE ---
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);

  // --- MODAL STATES ---
  const [selectedLead, setSelectedLead] = useState(null); 
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form States
  const [newClient, setNewClient] = useState({ name: '', email: '', aum: '', creditLine: '' });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadClientId, setUploadClientId] = useState('');

  // --- FETCH ALL ADMIN DATA (CRASH PROOF VERSION) ---
  const fetchAdminData = useCallback(async (isInitial = false) => {
    if (!isAdminLoggedIn) return;
    if (isInitial) setIsFetchingData(true);
    
    try {
      // USING ALLSETTLED: If one API fails, the others still succeed!
      const results = await Promise.allSettled([
        getAllContacts(),
        getAllCustomers(),
        getAllDocuments()
      ]);

      // Extract results safely
      const contactsRes = results[0].status === 'fulfilled' ? results[0].value : { data: [] };
      const customersRes = results[1].status === 'fulfilled' ? results[1].value : { data: [] };
      const docsRes = results[2].status === 'fulfilled' ? results[2].value : { data: [] };

      // Warn in console if an endpoint 404s
      if (results[0].status === 'rejected') console.warn("Leads API failed");
      if (results[1].status === 'rejected') console.warn("Customers API failed (404)");
      if (results[2].status === 'rejected') console.warn("Documents API failed");

      setLeads(Array.isArray(contactsRes.data) ? contactsRes.data : (contactsRes.data?.data || []));
      setClients(Array.isArray(customersRes.data) ? customersRes.data : (customersRes.data?.data || []));
      setDocuments(Array.isArray(docsRes.data) ? docsRes.data : (docsRes.data?.data || []));
      
    } catch (error) {
      console.error("Critical error in fetchAdminData", error);
    } finally {
      if (isInitial) setIsFetchingData(false);
    }
  }, [isAdminLoggedIn]);

  useEffect(() => { fetchAdminData(true); }, [fetchAdminData]);
  
  useEffect(() => {
    let pollInterval;
    if (isAdminLoggedIn) {
      pollInterval = setInterval(() => fetchAdminData(false), 15000); // Poll every 15s
    }
    return () => clearInterval(pollInterval);
  }, [isAdminLoggedIn, fetchAdminData]);

  // --- DYNAMIC METRICS ---
  const totalAUM = clients.reduce((acc, curr) => acc + (Number(curr.aum) || 0), 0);
  const newLeadsCount = leads.filter(l => l.status === 'New' || !l.status).length;

  // --- ONE-TIME SETUP: CREATE MASTER ADMIN ---
  const handleSetupAdmin = async () => {
    setIsSubmitting(true);
    try {
      await registerUser({
        name: "Master Admin",
        email: "admin@fin5ive.com",
        password: "Admin@1234"
      });
      toast.success("Master Admin created! You can now log in.");
      setPassword("Admin@1234"); 
    } catch (error) {
      toast.error("Setup failed. The admin account might already exist!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- AUTH HANDLERS ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Credentials required.");
    
    if (email !== 'admin@fin5ive.com') {
      return toast.error("Unauthorized ID. Master Admin access only.");
    }

    setIsSubmitting(true);
    
    try {
      const response = await loginUser({ email, password });
      
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        const token = typeof data === 'string' ? data : (data.token || data.access_token || data.jwt); 

        if (!token) {
           toast.error("Login failed: Server did not return a token.");
           setIsSubmitting(false);
           return;
        }

        const decodedToken = parseJwt(token);
        if (!decodedToken) {
           toast.error("Login failed: Invalid token format received.");
           setIsSubmitting(false);
           return;
        }

        localStorage.setItem('fin5ive_token', token);
        setIsAdminLoggedIn(true);
        localStorage.setItem('fin5ive_admin_auth', 'true');
        toast.success('Master Admin access granted.', { iconTheme: { primary: '#003366', secondary: 'white' }});
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials. Did you click 'Setup Admin Account' first?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setPassword('');
    localStorage.clear();
    toast('Admin logged out securely.', { icon: '🔒' });
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // --- LEAD (CONTACTS) HANDLERS ---
  const markAsContacted = async (lead) => {
    const leadId = lead.id || lead._id;
    try {
      await updateContact(leadId, { status: 'Contacted' }); 
      setLeads(leads.map(l => (l.id === leadId || l._id === leadId) ? { ...l, status: 'Contacted' } : l));
      toast.success("Lead status updated to Contacted.");
      setSelectedLead(null); 
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update status.");
    }
  };

  const deleteLeadData = async (leadId) => {
    if(!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteContact(leadId);
      setLeads(leads.filter(l => l.id !== leadId && l._id !== leadId));
      toast.success("Lead permanently deleted.");
      setSelectedLead(null);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete lead.");
    }
  };

  // --- CLIENT (CUSTOMERS) HANDLERS ---
  const handleAddClient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: newClient.name,
        email: newClient.email,
        aum: Number(newClient.aum) || 0,
        creditLine: Number(newClient.creditLine) || 0
      };
      
      const res = await createCustomer(payload);
      setClients([res.data?.data || res.data, ...clients]);
      setNewClient({ name: '', email: '', aum: '', creditLine: '' });
      setIsClientModalOpen(false);
      toast.success("Client onboarded successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteClientData = async (clientId) => {
    if(!window.confirm("Remove this client from the active roster?")) return;
    try {
      await deleteCustomer(clientId);
      setClients(clients.filter(c => c.id !== clientId && c._id !== clientId));
      toast.success("Client removed.");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete client.");
    }
  };

  // --- DOCUMENT HANDLERS ---
  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadClientId) return toast.error("Please select a file and a client.");
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("customerId", uploadClientId);

      const res = await uploadDocumentAdmin(formData);
      setDocuments([res.data?.data || res.data, ...documents]);
      
      setUploadFile(null);
      setUploadClientId('');
      setIsUploadModalOpen(false);
      toast.success("Document uploaded securely to vault.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload document.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if(!window.confirm("Permanently delete this document?")) return;
    try {
      await deleteDocumentApi(docId);
      setDocuments(documents.filter(d => d.id !== docId && d._id !== docId));
      toast.success("Document deleted.");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete document.");
    }
  };

  const handleRealDownload = async (docId, fileName) => {
    const loadingToast = toast.loading('Fetching file...');
    try {
      const response = await downloadDocument(docId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'document.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`${fileName} downloaded.`, { id: loadingToast });
    } catch (error) {
      toast.error('Download failed.', { id: loadingToast });
    }
  };

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);

  // ==========================================
  // RENDER: SECURE ADMIN DASHBOARD
  // ==========================================
  if (isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-50 flex overflow-hidden font-sans text-gray-800">
        
        {/* --- MOBILE OVERLAY BACKDROP --- */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        {/* --- MODALS --- */}
        
        {/* 1. Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
              <div className="bg-[#003366] p-5 md:p-6 flex justify-between items-center text-white">
                <h3 className="text-lg md:text-xl font-bold flex items-center"><Mailbox className="w-5 h-5 mr-2"/> Lead Details</h3>
                <button onClick={() => setSelectedLead(null)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Prospect Name</p>
                  <p className="text-lg md:text-xl font-black text-[#003366]">
                    {selectedLead.firstName ? `${selectedLead.firstName} ${selectedLead.lastName || ''}` : selectedLead.name || 'Unknown'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center"><Building2 className="w-4 h-4 mr-1"/> Company</p>
                    <p className="font-bold text-sm md:text-base">{selectedLead.company || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center"><Briefcase className="w-4 h-4 mr-1"/> Service</p>
                    <p className="font-bold text-[#FF6600] text-sm md:text-base">{selectedLead.service || 'General Inquiry'}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center"><Phone className="w-4 h-4 mr-1"/> Phone</p>
                    <p className="font-bold text-sm md:text-base">{selectedLead.phone || 'N/A'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center"><Mail className="w-4 h-4 mr-1"/> Email</p>
                    <p className="font-bold text-blue-600 text-sm md:text-base break-all">{selectedLead.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center"><FileText className="w-4 h-4 mr-1"/> Message</p>
                    <p className="font-medium text-sm text-gray-700 bg-slate-50 p-3 rounded-lg border border-gray-100">{selectedLead.message || 'No message provided.'}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-3">
                  <button onClick={() => deleteLeadData(selectedLead.id || selectedLead._id)} className="text-red-500 font-bold hover:bg-red-50 px-4 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto">Delete Lead</button>
                  {(!selectedLead.status || selectedLead.status === 'New') && (
                    <button onClick={() => markAsContacted(selectedLead)} className="bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm w-full sm:w-auto">
                      Mark as Contacted
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Add Client Modal */}
        {isClientModalOpen && (
          <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
              <div className="bg-[#003366] p-5 md:p-6 flex justify-between items-center text-white">
                <h3 className="text-lg md:text-xl font-bold flex items-center"><Users className="w-5 h-5 mr-2"/> Onboard New Client</h3>
                <button onClick={() => setIsClientModalOpen(false)} className="hover:text-[#FF6600] transition"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddClient} className="p-6 md:p-8 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Corporate Entity Name</label>
                  <input type="text" required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none text-sm" placeholder="Acme Corp Ltd." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Client Email</label>
                  <input type="email" required value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none text-sm" placeholder="director@acme.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Initial AUM (₹)</label>
                    <input type="number" required value={newClient.aum} onChange={e => setNewClient({...newClient, aum: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none text-sm" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Credit Line (₹)</label>
                    <input type="number" value={newClient.creditLine} onChange={e => setNewClient({...newClient, creditLine: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none text-sm" placeholder="0" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-3.5 rounded-xl mt-4 transition-colors shadow-lg flex justify-center ${isSubmitting ? 'bg-gray-400' : 'bg-[#003366] hover:bg-[#002244]'}`}>
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Create Client Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 3. Upload Document Modal (Dynamic Client Selection) */}
        {isUploadModalOpen && (
           <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
               <div className="p-5 md:p-6 flex justify-between items-center border-b border-gray-100">
                 <h3 className="text-lg md:text-xl font-extrabold text-[#003366]">Secure Document Upload</h3>
                 <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-red-500 transition"><X className="w-6 h-6" /></button>
               </div>
               <form onSubmit={handleUploadDocument} className="p-6 md:p-8 space-y-6">
                 
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Assign to Client Vault <span className="text-red-500">*</span></label>
                   <select 
                     required
                     value={uploadClientId} 
                     onChange={(e) => setUploadClientId(e.target.value)}
                     className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none text-sm font-medium"
                   >
                     <option value="" disabled>-- Select a Client --</option>
                     {clients.map(c => (
                       <option key={c.id || c._id} value={c.id || c._id}>{c.name} ({c.email})</option>
                     ))}
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Document File <span className="text-red-500">*</span></label>
                   <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#FF6600] hover:bg-orange-50 transition-colors relative group">
                     <input 
                       type="file" 
                       required
                       onChange={(e) => setUploadFile(e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                     />
                     {uploadFile ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                          <p className="font-bold text-[#003366] text-sm truncate w-full px-4">{uploadFile.name}</p>
                        </div>
                     ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-[#FF6600]" />
                          <p className="font-bold text-[#003366] text-sm">Click or drag file to upload</p>
                        </div>
                     )}
                   </div>
                 </div>

                 <button type="submit" disabled={isSubmitting || !uploadFile || !uploadClientId} className={`w-full text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg flex justify-center items-center text-sm md:text-base ${isSubmitting ? 'bg-gray-400' : 'bg-[#FF6600] hover:bg-[#e55c00]'}`}>
                   {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</> : 'Upload to Vault'}
                 </button>
               </form>
             </div>
           </div>
        )}

        {/* --- RESPONSIVE SIDEBAR --- */}
        <aside className={`fixed lg:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 lg:w-72 bg-[#0a192f] text-white flex flex-col flex-shrink-0 shadow-2xl`}>
          <div className="h-20 flex items-center px-6 lg:px-8 border-b border-white/10 bg-[#061020] justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">
                FIN<span className="text-[#FF6600]">5</span>IVE
              </span>
              <span className="text-[0.65rem] font-bold text-blue-400 tracking-[0.2em] uppercase mt-1">
                Admin Console
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {[
              { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'LEADS', icon: Mailbox, label: `Lead CRM (${newLeadsCount})` },
              { id: 'CLIENTS', icon: Users, label: 'Active Clients' },
              { id: 'DOCUMENTS', icon: FolderOpen, label: 'Document Vault' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)} 
                className={`flex items-center w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === item.id 
                  ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 shadow-inner lg:translate-x-2' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'animate-pulse' : ''}`} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-white/10 bg-[#061020]">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF6600] flex items-center justify-center text-white font-bold mr-3 shadow-md">AD</div>
              <div>
                <p className="text-sm font-bold text-white">System Admin</p>
                <p className="text-xs text-slate-400">Level: Superuser</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-colors group">
              <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Sign Out
            </button>
          </div>
        </aside>

        {/* --- MAIN WORKSPACE --- */}
        <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
          
          <header className="h-20 bg-white border-b border-gray-200 px-4 sm:px-8 flex justify-between items-center shadow-sm flex-shrink-0 z-10">
            <div className="flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 mr-3 text-[#003366] hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg sm:text-2xl font-black text-[#003366] capitalize tracking-tight truncate">
                {activeTab.replace('_', ' ')}
              </h2>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-6">
              <button onClick={() => fetchAdminData(true)} className="p-2 text-gray-400 hover:text-[#003366] transition-colors hidden sm:block" title="Refresh Data">
                 <RefreshCw className={`w-5 h-5 ${isFetchingData ? 'animate-spin text-[#FF6600]' : ''}`} />
              </button>

              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-[#FF6600] outline-none w-48 lg:w-72 transition-all font-medium" 
                />
              </div>
              
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-[#003366] transition-colors bg-slate-100 rounded-full hover:bg-slate-200">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  {newLeadsCount > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 font-extrabold text-[#003366] flex justify-between items-center text-sm sm:text-base">
                      Recent Alerts <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{newLeadsCount} New</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {leads.filter(l => l.status === 'New' || !l.status).map(lead => (
                        <div key={lead.id || lead._id} onClick={() => {setSelectedLead(lead); setShowNotifications(false);}} className="px-4 py-3 border-b border-gray-50 hover:bg-slate-50 cursor-pointer transition-colors">
                          <p className="text-sm font-bold text-gray-800 truncate">New Inquiry: {lead.service || 'General'}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate">From {lead.firstName || lead.name} {lead.company ? `(${lead.company})` : ''}</p>
                        </div>
                      ))}
                      {newLeadsCount === 0 && <div className="p-5 text-sm text-gray-500 text-center">No new notifications</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pb-10">
              
              {/* --- DASHBOARD TAB --- */}
              {activeTab === 'DASHBOARD' && (
                <div className="animate-[fadeIn_0.3s_ease-out] space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                      <div className="bg-red-50 p-4 rounded-2xl text-red-500 mr-4 sm:mr-5 flex-shrink-0"><Mailbox className="w-7 h-7 sm:w-8 sm:h-8" /></div>
                      <div className="truncate">
                        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">New Leads</p>
                        <h3 className="text-3xl sm:text-4xl font-black text-[#003366]">{newLeadsCount}</h3>
                      </div>
                    </div>
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                      <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mr-4 sm:mr-5 flex-shrink-0"><Users className="w-7 h-7 sm:w-8 sm:h-8" /></div>
                      <div className="truncate">
                        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">Active Clients</p>
                        <h3 className="text-3xl sm:text-4xl font-black text-[#003366]">{clients.length}</h3>
                      </div>
                    </div>
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                      <div className="bg-orange-50 p-4 rounded-2xl text-[#FF6600] mr-4 sm:mr-5 flex-shrink-0"><TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" /></div>
                      <div className="truncate">
                        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">Total Vault AUM</p>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#003366] truncate">{formatINR(totalAUM)}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 md:p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-extrabold text-[#003366] text-base md:text-lg">Action Required: Recent Leads</h3>
                      <button onClick={() => setActiveTab('LEADS')} className="text-xs md:text-sm font-bold text-[#FF6600] hover:text-[#e55c00] flex items-center">View All <ArrowRight className="w-4 h-4 ml-1"/></button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
                        <thead>
                          <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                            <th className="p-4 md:p-6 font-bold">Prospect</th>
                            <th className="p-4 md:p-6 font-bold">Service Required</th>
                            <th className="p-4 md:p-6 font-bold">Status</th>
                            <th className="p-4 md:p-6 font-bold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {leads.slice(0, 5).map(lead => (
                            <tr key={lead.id || lead._id} className="hover:bg-slate-50 transition-colors group">
                              <td className="p-4 md:p-6">
                                <p className="font-bold text-[#003366] text-sm md:text-base">{lead.firstName ? `${lead.firstName} ${lead.lastName || ''}` : lead.name}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{lead.company || lead.email}</p>
                              </td>
                              <td className="p-4 md:p-6 text-xs md:text-sm font-bold text-gray-700">{lead.service || 'General Inquiry'}</td>
                              <td className="p-4 md:p-6">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold ${(!lead.status || lead.status === 'New') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                  {(!lead.status || lead.status === 'New') ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                                  {lead.status || 'New'}
                                </span>
                              </td>
                              <td className="p-4 md:p-6 text-right">
                                <button onClick={() => setSelectedLead(lead)} className="p-2 text-gray-400 hover:text-[#003366] hover:bg-slate-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {leads.length === 0 && <div className="p-8 text-center text-gray-500">No recent leads found.</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* --- LEADS CRM TAB --- */}
              {activeTab === 'LEADS' && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50">
                      <h3 className="font-extrabold text-[#003366] text-lg sm:text-xl">Website Inquiries Directory</h3>
                      <input 
                        type="text" 
                        placeholder="Search leads..." 
                        value={globalSearch}
                        onChange={(e) => setGlobalSearch(e.target.value)}
                        className="sm:hidden flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF6600] outline-none" 
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                        <thead>
                          <tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                            <th className="p-5 font-bold">Date Received</th>
                            <th className="p-5 font-bold">Client Info</th>
                            <th className="p-5 font-bold">Area of Interest</th>
                            <th className="p-5 font-bold">Status</th>
                            <th className="p-5 font-bold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {leads.filter(l => (l.name || l.firstName || '').toLowerCase().includes(globalSearch.toLowerCase()) || (l.company || '').toLowerCase().includes(globalSearch.toLowerCase())).map(lead => (
                            <tr key={lead.id || lead._id} className="hover:bg-slate-50 transition-colors group">
                              <td className="p-5 text-sm text-gray-500 font-medium">
                                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                              </td>
                              <td className="p-5">
                                <p className="font-bold text-[#003366] text-sm md:text-base">{lead.firstName ? `${lead.firstName} ${lead.lastName || ''}` : lead.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{lead.company || lead.email}</p>
                              </td>
                              <td className="p-5 text-sm font-bold text-gray-700">{lead.service || 'General Inquiry'}</td>
                              <td className="p-5">
                                <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${(!lead.status || lead.status === 'New') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                  {lead.status || 'New'}
                                </span>
                              </td>
                              <td className="p-5 text-right space-x-1 sm:space-x-2">
                                <button onClick={() => setSelectedLead(lead)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                  <Eye className="w-5 h-5" />
                                </button>
                                <button onClick={() => deleteLeadData(lead.id || lead._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {leads.length === 0 && (
                              <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-medium">No leads found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- CLIENTS TAB --- */}
              {activeTab === 'CLIENTS' && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#003366]">Active Roster</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">Manage onboarded corporate entities.</p>
                    </div>
                    <button onClick={() => setIsClientModalOpen(true)} className="w-full sm:w-auto justify-center bg-[#FF6600] hover:bg-[#e55c00] text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center">
                      <Plus className="w-5 h-5 mr-2" /> Add Client
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
                        <thead>
                          <tr className="bg-slate-50 text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                            <th className="p-5 font-bold">Client Entity</th>
                            <th className="p-5 font-bold">Contact Email</th>
                            <th className="p-5 font-bold">Total AUM</th>
                            <th className="p-5 font-bold">Status</th>
                            <th className="p-5 font-bold text-right">Manage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {clients.filter(c => (c.name || '').toLowerCase().includes(globalSearch.toLowerCase())).map(client => (
                            <tr key={client.id || client._id} className="hover:bg-slate-50 transition-colors group">
                              <td className="p-5">
                                <p className="font-bold text-[#003366] text-sm md:text-base">{client.name}</p>
                              </td>
                              <td className="p-5 text-sm text-gray-600 font-medium">
                                {client.email || 'N/A'}
                              </td>
                              <td className="p-5 text-sm md:text-base font-black text-gray-800">{formatINR(client.aum)}</td>
                              <td className="p-5">
                                <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                  {client.status || 'Active'}
                                </span>
                              </td>
                              <td className="p-5 text-right">
                                <button onClick={() => deleteClientData(client.id || client._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Client">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {clients.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-medium">No clients onboarded yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- DOCUMENTS TAB --- */}
              {activeTab === 'DOCUMENTS' && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#003366]">Document Center</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">Manage and distribute encrypted files to client portals.</p>
                    </div>
                    <button onClick={() => setIsUploadModalOpen(true)} className="w-full sm:w-auto justify-center bg-[#003366] hover:bg-[#002244] text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center">
                      <UploadCloud className="w-5 h-5 mr-2" /> Upload File
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {documents.filter(d => (d.name || d.title || d.originalName || '').toLowerCase().includes(globalSearch.toLowerCase())).map((doc) => {
                      const relatedClient = clients.find(c => c.id === doc.customerId || c._id === doc.customerId);
                      const clientNameDisplay = relatedClient ? relatedClient.name : 'Unknown Client Vault';

                      return (
                        <div key={doc.id || doc._id} className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#FF6600] transition-all">
                          <div className="flex items-center overflow-hidden pr-3 md:pr-4">
                            <div className="bg-red-50 p-3 md:p-4 rounded-2xl text-red-500 mr-4 md:mr-5 flex-shrink-0">
                              <FileText className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="truncate">
                              <p className="font-bold text-[#003366] text-sm md:text-base truncate mb-1">{doc.title || doc.name || doc.originalName}</p>
                              <div className="flex items-center text-[10px] md:text-xs text-gray-500 font-medium">
                                <span className="bg-slate-100 px-2 py-0.5 md:py-1 rounded-md text-gray-700 font-bold mr-2 md:mr-3 truncate max-w-[100px] sm:max-w-[150px]">
                                  {clientNameDisplay}
                                </span>
                                <span className="whitespace-nowrap">{new Date(doc.createdAt || Date.now()).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                            <button onClick={() => handleRealDownload(doc.id || doc._id, doc.title || doc.name)} className="p-2 md:p-2.5 text-gray-400 hover:text-[#003366] hover:bg-slate-50 rounded-xl transition-colors" title="Download">
                              <Download className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <button onClick={() => handleDeleteDocument(doc.id || doc._id)} className="p-2 md:p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    {documents.length === 0 && (
                       <div className="col-span-1 lg:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-gray-100 border-dashed">
                          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 font-bold text-lg">No documents in vault.</p>
                       </div>
                    )}
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
  // RENDER: ADMIN LOGIN SCREEN
  // ==========================================
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a192f] font-sans p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF6600] opacity-10 rounded-full blur-[100px]"></div>
      </div>
      <div className="w-full max-w-[420px] bg-white px-8 py-10 md:px-10 md:py-12 rounded-[2rem] shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-[#003366]" />
          </div>
          <h2 className="text-2xl font-black text-[#003366] tracking-tight">Admin Console</h2>
          <p className="text-gray-500 text-sm font-medium mt-2">Authorized personnel only.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Admin ID</label>
              <input 
                type="email" 
                value={email} 
                readOnly
                className="w-full bg-slate-100 border border-gray-200 rounded-xl px-5 py-3.5 outline-none font-bold text-[#003366] cursor-not-allowed" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Passcode</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#003366] focus:bg-white outline-none transition-all font-medium" 
                placeholder="Enter Admin@1234" 
              />
            </div>
          </div>
          <div className="mt-10">
            <button type="submit" disabled={isSubmitting} className={`w-full text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003366] hover:bg-[#0a192f] hover:-translate-y-1'}`}>
              {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</> : <>Authenticate <Lock className="w-4 h-4 ml-2" /></>}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
           <button 
             onClick={handleSetupAdmin} 
             disabled={isSubmitting}
             className="text-xs font-bold text-[#FF6600] hover:text-[#e55c00] transition-colors flex items-center justify-center mx-auto"
           >
             <Zap className="w-3 h-3 mr-1" /> First Time? Click to Setup Admin Account
           </button>
           <Link to="/" className="text-xs font-bold text-gray-400 hover:text-[#003366] transition-colors mt-4 block">← Return to Public Website</Link>
        </div>

      </div>
    </div>
  );
};

export default AdminPortal;