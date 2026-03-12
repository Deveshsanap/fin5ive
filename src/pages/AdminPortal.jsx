import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Users, Mailbox, FolderOpen, 
  LogOut, TrendingUp, Search, Bell, Filter, CheckCircle, 
  Clock, ArrowRight, Loader2, Lock, Eye, Trash2, Plus, 
  UploadCloud, FileText, Download, X, Building2, Phone, Mail,
  Briefcase, Menu, Zap, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { 
  loginUser, registerUser, 
  getAllLeads, updateLead, deleteLead, 
  getAllCustomers, createCustomer, deleteCustomer,
  getAllDocuments, uploadDocumentAdmin, deleteDocumentApi, downloadDocument,
  getAllApplications // <-- NEW IMPORT FOR HR TAB
} from '../config/api';

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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem('fin5ive_admin_auth') === 'true');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  
  const [email, setEmail] = useState('admin@fin5ive.com');
  const [password, setPassword] = useState('');

  const [activeTab, setActiveTab] = useState('DASHBOARD'); 
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [applications, setApplications] = useState([]); // <-- NEW STATE FOR JOB APPLICATIONS

  const [selectedLead, setSelectedLead] = useState(null); 
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [newClient, setNewClient] = useState({ name: '', email: '', aum: '', creditLine: '' });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadClientId, setUploadClientId] = useState('');

// --- FETCH ALL ADMIN DATA ---
  const fetchAdminData = useCallback(async (isInitial = false) => {
    if (!isAdminLoggedIn) return;
    if (isInitial) setIsFetchingData(true);
    
    try {
      const results = await Promise.allSettled([
        getAllLeads(),         // results[0]
        getAllCustomers(),     // results[1]
        // getAllDocuments(),  // <-- Currently commented out
        getAllApplications()   // Now this is results[2] !
      ]);

      const leadsRes = results[0].status === 'fulfilled' ? results[0].value : { data: [] };
      const customersRes = results[1].status === 'fulfilled' ? results[1].value : { data: [] };
      // const docsRes = results[2].status === 'fulfilled' ? results[2].value : { data: [] };
      
      // FIX: Changed results[3] to results[2]
      const appsRes = results[2].status === 'fulfilled' ? results[2].value : { data: [] }; 

      setLeads(Array.isArray(leadsRes.data) ? leadsRes.data : (leadsRes.data?.data || []));
      setClients(Array.isArray(customersRes.data) ? customersRes.data : (customersRes.data?.data || []));
      // setDocuments(Array.isArray(docsRes.data) ? docsRes.data : (docsRes.data?.data || []));
      setApplications(Array.isArray(appsRes.data) ? appsRes.data : (appsRes.data?.data || [])); 
      
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
      pollInterval = setInterval(() => fetchAdminData(false), 15000);
    }
    return () => clearInterval(pollInterval);
  }, [isAdminLoggedIn, fetchAdminData]);

  const totalAUM = clients.reduce((acc, curr) => acc + (Number(curr.aum) || 0), 0);
  const newLeadsCount = leads.filter(l => l.status === 'New' || !l.status).length;
  const newAppsCount = applications.length; // Count applications

  const handleSetupAdmin = async () => {
    setIsSubmitting(true);
    try {
      await registerUser({ name: "Master Admin", email: "admin@fin5ive.com", password: "Admin@1234" });
      toast.success("Master Admin created! You can now log in.");
      setPassword("Admin@1234"); 
    } catch (error) {
      toast.error("Setup failed. The admin account might already exist!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Credentials required.");
    if (email !== 'admin@fin5ive.com') return toast.error("Unauthorized ID. Master Admin access only.");

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

        localStorage.setItem('fin5ive_token', token);
        setIsAdminLoggedIn(true);
        localStorage.setItem('fin5ive_admin_auth', 'true');
        toast.success('Master Admin access granted.', { iconTheme: { primary: '#003366', secondary: 'white' }});
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials.");
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

  // --- LEAD HANDLERS ---
  const markAsContacted = async (lead) => {
    const leadId = lead.id || lead._id;
    try {
      await updateLead(leadId, { status: 'Contacted' }); 
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
      await deleteLead(leadId); 
      setLeads(leads.filter(l => l.id !== leadId && l._id !== leadId));
      toast.success("Lead permanently deleted.");
      setSelectedLead(null);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete lead.");
    }
  };

  // --- CLIENT HANDLERS ---
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

  if (isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-50 flex overflow-hidden font-sans text-gray-800">
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>}

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
              <div className="bg-[#003366] p-5 flex justify-between items-center text-white">
                <h3 className="text-lg font-bold flex items-center"><Mailbox className="w-5 h-5 mr-2"/> Lead Details</h3>
                <button onClick={() => setSelectedLead(null)} className="hover:text-[#FF6600]"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Prospect Name</p>
                  <p className="text-xl font-black text-[#003366]">{selectedLead.firstName ? `${selectedLead.firstName} ${selectedLead.lastName || ''}` : selectedLead.name || 'Unknown'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center"><Briefcase className="w-4 h-4 mr-1"/> Service</p>
                    <p className="font-bold text-[#FF6600] text-sm">{selectedLead.service || 'General Inquiry'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center"><Mail className="w-4 h-4 mr-1"/> Email</p>
                    <p className="font-bold text-blue-600 text-sm">{selectedLead.email}</p>
                  </div>
                  {selectedLead.message && (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center"><FileText className="w-4 h-4 mr-1"/> Details</p>
                      <p className="font-medium text-gray-700 text-sm bg-slate-50 p-3 rounded-lg border border-gray-100">{selectedLead.message}</p>
                    </div>
                  )}
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-between gap-3">
                  <button onClick={() => deleteLeadData(selectedLead.id || selectedLead._id)} className="text-red-500 font-bold hover:bg-red-50 px-4 py-3 rounded-xl text-sm">Delete Lead</button>
                  {(!selectedLead.status || selectedLead.status === 'New') && (
                    <button onClick={() => markAsContacted(selectedLead)} className="bg-[#FF6600] text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm">Mark as Contacted</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Client Modal */}
        {isClientModalOpen && (
          <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="bg-[#003366] p-5 flex justify-between items-center text-white">
                <h3 className="text-lg font-bold flex items-center"><Users className="w-5 h-5 mr-2"/> Onboard New Client</h3>
                <button onClick={() => setIsClientModalOpen(false)} className="hover:text-[#FF6600]"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddClient} className="p-6 space-y-5">
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Corporate Entity Name</label><input type="text" required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-[#FF6600] outline-none text-sm"/></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-2">Client Email</label><input type="email" required value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-[#FF6600] outline-none text-sm" /></div>
                <button type="submit" disabled={isSubmitting} className="w-full text-white font-bold py-3.5 rounded-xl mt-4 bg-[#003366] hover:bg-[#002244] shadow-lg flex justify-center">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Create Client Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
           <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
               <div className="p-5 flex justify-between items-center border-b border-gray-100">
                 <h3 className="text-lg font-extrabold text-[#003366]">Secure Document Upload</h3>
                 <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-red-500"><X className="w-6 h-6" /></button>
               </div>
               <form onSubmit={handleUploadDocument} className="p-6 space-y-6">
                 <select required value={uploadClientId} onChange={(e) => setUploadClientId(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-[#FF6600] outline-none text-sm">
                   <option value="" disabled>-- Select a Client --</option>
                   {clients.map(c => <option key={c.id || c._id} value={c.id || c._id}>{c.name} ({c.email})</option>)}
                 </select>
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#FF6600] hover:bg-orange-50 relative group">
                   <input type="file" required onChange={(e) => setUploadFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                   {uploadFile ? <p className="font-bold text-[#003366] text-sm">{uploadFile.name}</p> : <p className="font-bold text-[#003366] text-sm">Click or drag file to upload</p>}
                 </div>
                 <button type="submit" disabled={isSubmitting || !uploadFile || !uploadClientId} className="w-full text-white font-bold py-3.5 rounded-xl bg-[#FF6600] hover:bg-[#e55c00] flex justify-center">
                   {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upload to Vault'}
                 </button>
               </form>
             </div>
           </div>
        )}

        {/* --- SIDEBAR --- */}
        <aside className={`fixed lg:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-40 w-64 lg:w-72 bg-[#0a192f] text-white flex flex-col shadow-2xl`}>
          <div className="h-20 flex items-center px-6 border-b border-white/10 bg-[#061020] justify-between">
            <div className="flex flex-col"><span className="text-2xl font-black">FIN<span className="text-[#FF6600]">5</span>IVE</span><span className="text-[0.65rem] font-bold text-blue-400 uppercase mt-1">Admin Console</span></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 px-4 py-8 space-y-2">
            {[
              { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' }, 
              { id: 'LEADS', icon: Mailbox, label: `Lead CRM (${newLeadsCount})` }, 
              { id: 'CLIENTS', icon: Users, label: 'Active Clients' }, 
              { id: 'DOCUMENTS', icon: FolderOpen, label: 'Document Vault' },
              { id: 'APPLICATIONS', icon: Briefcase, label: `HR Candidates (${newAppsCount})` } // <-- NEW TAB ADDED HERE
            ].map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id)} className={`flex items-center w-full px-4 py-3.5 rounded-xl font-medium ${activeTab === item.id ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <item.icon className="w-5 h-5 mr-3" /> {item.label}
              </button>
            ))}
          </nav>
          <div className="p-6 border-t border-white/10 bg-[#061020]">
            <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20"><LogOut className="w-5 h-5 mr-2" /> Sign Out</button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
          <header className="h-20 bg-white border-b border-gray-200 px-4 sm:px-8 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 mr-3 text-[#003366] hover:bg-slate-100 rounded-lg"><Menu className="w-6 h-6" /></button>
              <h2 className="text-lg sm:text-2xl font-black text-[#003366] capitalize tracking-tight">{activeTab.replace('_', ' ')}</h2>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button onClick={() => fetchAdminData(true)} className="p-2 text-gray-400 hover:text-[#003366]"><RefreshCw className={`w-5 h-5 ${isFetchingData ? 'animate-spin text-[#FF6600]' : ''}`} /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pb-10">
              
              {/* DASHBOARD TAB */}
              {activeTab === 'DASHBOARD' && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center"><div className="bg-red-50 p-4 rounded-2xl text-red-500 mr-4"><Mailbox className="w-7 h-7" /></div><div><p className="text-xs font-bold text-gray-400 uppercase mb-1">New Leads</p><h3 className="text-3xl font-black text-[#003366]">{newLeadsCount}</h3></div></div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center"><div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mr-4"><Users className="w-7 h-7" /></div><div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Active Clients</p><h3 className="text-3xl font-black text-[#003366]">{clients.length}</h3></div></div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center"><div className="bg-orange-50 p-4 rounded-2xl text-[#FF6600] mr-4"><TrendingUp className="w-7 h-7" /></div><div><p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Vault AUM</p><h3 className="text-2xl font-black text-[#003366]">{formatINR(totalAUM)}</h3></div></div>
                  </div>
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="p-5 md:p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-extrabold text-[#003366] text-base md:text-lg">Recent CRM Activity</h3>
                      <button onClick={() => setActiveTab('LEADS')} className="text-xs font-bold text-[#FF6600] hover:text-[#e55c00] flex items-center">View All <ArrowRight className="w-4 h-4 ml-1"/></button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead><tr className="bg-white text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100"><th className="p-4 font-bold">Prospect</th><th className="p-4 font-bold">Service Required</th><th className="p-4 font-bold">Status</th></tr></thead>
                        <tbody className="divide-y divide-gray-50">
                          {leads.slice(0, 5).map(lead => (
                            <tr key={lead.id || lead._id} className="hover:bg-slate-50">
                              <td className="p-4"><p className="font-bold text-[#003366] text-sm">{lead.firstName || lead.name}</p><p className="text-xs text-gray-500">{lead.email}</p></td>
                              <td className="p-4 text-xs font-bold text-gray-700">{lead.service || 'General Inquiry'}</td>
                              <td className="p-4"><span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${(!lead.status || lead.status === 'New') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{lead.status || 'New'}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* LEADS CRM TAB */}
              {activeTab === 'LEADS' && (
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                  <div className="p-5 md:p-8 border-b border-gray-100 bg-slate-50/50"><h3 className="font-extrabold text-[#003366] text-lg">Sales & Inquiries Pipeline</h3></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead><tr className="bg-white text-gray-400 text-xs uppercase border-b border-gray-100"><th className="p-5 font-bold">Date</th><th className="p-5 font-bold">Client Info</th><th className="p-5 font-bold">Area of Interest</th><th className="p-5 font-bold">Status</th><th className="p-5 font-bold text-right">Action</th></tr></thead>
                      <tbody className="divide-y divide-gray-50">
                        {leads.map(lead => (
                          <tr key={lead.id || lead._id} className="hover:bg-slate-50">
                            <td className="p-5 text-sm text-gray-500 font-medium">{new Date(lead.createdAt || Date.now()).toLocaleDateString()}</td>
                            <td className="p-5"><p className="font-bold text-[#003366] text-sm">{lead.firstName || lead.name}</p><p className="text-xs text-gray-500">{lead.email}</p></td>
                            <td className="p-5 text-sm font-bold text-gray-700">{lead.service || 'General Inquiry'}</td>
                            <td className="p-5"><span className={`px-3 py-1 rounded-md text-xs font-bold ${(!lead.status || lead.status === 'New') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{lead.status || 'New'}</span></td>
                            <td className="p-5 text-right"><button onClick={() => setSelectedLead(lead)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-5 h-5" /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CLIENTS TAB */}
              {activeTab === 'CLIENTS' && (
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <div><h3 className="text-2xl font-black text-[#003366]">Active Roster</h3></div>
                    <button onClick={() => setIsClientModalOpen(true)} className="bg-[#FF6600] text-white font-bold px-5 py-3 rounded-xl flex items-center"><Plus className="w-5 h-5 mr-2" /> Add Client</button>
                  </div>
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead><tr className="bg-slate-50 text-gray-400 text-xs uppercase border-b border-gray-100"><th className="p-5 font-bold">Client Entity</th><th className="p-5 font-bold">Contact Email</th><th className="p-5 font-bold">Total AUM</th><th className="p-5 font-bold text-right">Manage</th></tr></thead>
                        <tbody className="divide-y divide-gray-50">
                          {clients.map(client => (
                            <tr key={client.id || client._id} className="hover:bg-slate-50">
                              <td className="p-5 font-bold text-[#003366] text-sm">{client.name}</td>
                              <td className="p-5 text-sm text-gray-600">{client.email || 'N/A'}</td>
                              <td className="p-5 text-sm font-black text-gray-800">{formatINR(client.aum)}</td>
                              <td className="p-5 text-right"><button onClick={() => deleteClientData(client.id || client._id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 className="w-5 h-5" /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === 'DOCUMENTS' && (
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <div><h3 className="text-2xl font-black text-[#003366]">Document Center</h3></div>
                    <button onClick={() => setIsUploadModalOpen(true)} className="bg-[#003366] text-white font-bold px-5 py-3 rounded-xl flex items-center"><UploadCloud className="w-5 h-5 mr-2" /> Upload File</button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {documents.map((doc) => {
                      const relatedClient = clients.find(c => c.id === doc.customerId || c._id === doc.customerId);
                      return (
                        <div key={doc.id || doc._id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group">
                          <div className="flex items-center truncate pr-4">
                            <div className="bg-red-50 p-4 rounded-2xl text-red-500 mr-5"><FileText className="w-7 h-7" /></div>
                            <div className="truncate">
                              <p className="font-bold text-[#003366] text-base truncate mb-1">{doc.title || doc.name || doc.originalName}</p>
                              <span className="bg-slate-100 px-2 py-1 rounded-md text-[10px] text-gray-700 font-bold">{relatedClient ? relatedClient.name : 'Unknown Vault'}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button onClick={() => handleRealDownload(doc.id || doc._id, doc.title || doc.name)} className="p-2.5 text-gray-400 hover:text-[#003366] bg-slate-50 rounded-xl"><Download className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteDocument(doc.id || doc._id)} className="p-2.5 text-gray-400 hover:text-red-500 bg-slate-50 rounded-xl"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* --- NEW HR APPLICATIONS TAB --- */}
              {activeTab === 'APPLICATIONS' && (
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <div><h3 className="text-2xl font-black text-[#003366]">Job Applications</h3></div>
                  </div>
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="bg-slate-50 text-gray-400 text-xs uppercase border-b border-gray-100">
                            <th className="p-5 font-bold">Date</th>
                            <th className="p-5 font-bold">Candidate Info</th>
                            <th className="p-5 font-bold">Education</th>
                            <th className="p-5 font-bold">Location</th>
                            <th className="p-5 font-bold text-center">Resume</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {applications.map(app => (
                            <tr key={app.id || app._id} className="hover:bg-slate-50">
                              <td className="p-5 text-sm text-gray-500 font-medium">
                                {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                              </td>
                              <td className="p-5">
                                <p className="font-bold text-[#003366] text-sm">{app.firstName} {app.lastName}</p>
                                <p className="text-xs text-gray-500">{app.email}</p>
                                <p className="text-xs text-gray-500">{app.phoneNumber}</p>
                              </td>
                              <td className="p-5 text-sm font-bold text-gray-700">{app.highestEducationQualification || 'N/A'}</td>
                              <td className="p-5 text-sm text-gray-600">{app.city}, {app.country}</td>
                              <td className="p-5 text-center">
                                {app.resume || app.resumeUrl ? (
                                  <a 
                                    href={app.resumeUrl || app.resume} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title="View/Download Resume"
                                    className="p-2.5 text-[#003366] hover:text-[#FF6600] bg-slate-50 hover:bg-orange-50 rounded-xl inline-flex items-center transition-colors border border-gray-200"
                                  >
                                    <FileText className="w-5 h-5" />
                                  </a>
                                ) : (
                                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">No File</span>
                                )}
                              </td>
                            </tr>
                          ))}
                          {applications.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-medium">No job applications received yet.</td></tr>
                          )}
                        </tbody>
                      </table>
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

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a192f] p-4">
      <div className="w-full max-w-[420px] bg-white px-10 py-12 rounded-[2rem] shadow-2xl z-10">
        <div className="text-center mb-10">
          <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><ShieldCheck className="w-8 h-8 text-[#003366]" /></div>
          <h2 className="text-2xl font-black text-[#003366]">Admin Console</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Admin ID</label><input type="email" value={email} readOnly className="w-full bg-slate-100 border border-gray-200 rounded-xl px-5 py-3.5 font-bold text-[#003366]" /></div>
            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Passcode</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:ring-[#003366] outline-none" placeholder="Enter Admin@1234" /></div>
          </div>
          <div className="mt-10"><button type="submit" disabled={isSubmitting} className="w-full text-white font-bold py-4 rounded-xl bg-[#003366] hover:bg-[#0a192f] flex justify-center">{isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate'}</button></div>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
           <button onClick={handleSetupAdmin} className="text-xs font-bold text-[#FF6600]"><Zap className="w-3 h-3 mr-1 inline" /> First Time? Setup Admin Account</button>
           <Link to="/" className="text-xs font-bold text-gray-400 mt-4 block">← Return to Public Website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;