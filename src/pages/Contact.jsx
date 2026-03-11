import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Building2, 
  Globe, MessageSquare, ArrowRight, CheckCircle, 
  MessageCircle, Map, Loader2, ChevronDown, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createContact } from "../config/api";

const Contact = () => {
  // --- STATE MANAGEMENT ---
  const [activeLocation, setActiveLocation] = useState('AHMEDABAD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  // --- LOCATION DATA (Real Data from Client Materials) ---
  const locations = {
    AHMEDABAD: {
      type: "Corporate Headquarters",
      building: "610, Ratnanjali Square",
      address: "Prernatirth Derasar Road, Prahladnagar, Ahmedabad - 380054, Gujarat (India)",
      phone: "+91 99256 63112",
      phoneLink: "+919925663112",
      email: "info.fivefin@gmail.com",
      whatsapp: "919925663112", 
      mapUrl: "https://maps.google.com/?q=610+Ratnanjali+Square+Prahladnagar+Ahmedabad"
    },
    NRI_DESK: {
      type: "NRI & Global Support Desk",
      building: "Cross-Border Wealth Wing",
      address: "610, Ratnanjali Square, Prernatirth Derasar Road, Prahladnagar, Ahmedabad - 380054",
      phone: "+91 90996 84617",
      phoneLink: "+919099684617",
      email: "connect.fivefin@gmail.com",
      whatsapp: "919099684617",
      mapUrl: "https://maps.google.com/?q=610+Ratnanjali+Square+Prahladnagar+Ahmedabad"
    }
  };

  // --- FORM HANDLING & VALIDATION ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email is required";
    if (!formData.phone.match(/^\+?[0-9\s-]{10,15}$/)) errors.phone = "Valid phone number is required";
    if (!formData.service) errors.service = "Please select a service";
    if (!formData.message.trim()) errors.message = "Please provide a brief message";
    return errors;
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    toast.error("Please fix the errors in the form.");
    return;
  }

  try {
    setIsSubmitting(true);

    const response = await createContact(formData);

    if (response.status === 201) {
      toast.success("Inquiry sent successfully!");

      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 6000);
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to send message");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="bg-white overflow-hidden font-sans">
      
      {/* 1. Epic Hero Section (Flush with Navbar) */}
      <div className="bg-[#003366] text-white pt-24 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#002244]/50 to-transparent"></div>
        <Globe className="absolute top-10 -right-20 w-96 h-96 text-white opacity-5 animate-[spin_120s_linear_infinite] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-wider uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            Let's Architect Your <br/><span className="text-[#FF6600]">Financial Future.</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Whether you are expanding a corporate treasury, filing NRI taxes, or seeking bespoke wealth management, our leadership team is ready to listen.
          </p>
        </div>
      </div>

      {/* 2. Main Contact Section (Grid) */}
      <section className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Side: Dynamic Contact Info & Locations */}
            <div className="lg:col-span-5">
              
              {/* Dynamic Office Locations Tabs */}
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md mb-8">
                <div className="flex border-b border-gray-200 bg-slate-50">
                  {Object.keys(locations).map((key) => (
                    <button 
                      key={key}
                      onClick={() => setActiveLocation(key)}
                      className={`flex-1 py-5 text-center font-bold text-sm transition-colors flex items-center justify-center ${activeLocation === key ? 'border-b-4 border-[#FF6600] text-[#003366] bg-white' : 'text-gray-400 hover:bg-gray-100 border-b-4 border-transparent'}`}
                    >
                      <Building2 className={`w-4 h-4 mr-2 ${activeLocation === key ? 'text-[#FF6600]' : 'text-gray-400'}`} />
                      {key === 'AHMEDABAD' ? 'Corporate HQ' : 'NRI Desk'}
                    </button>
                  ))}
                </div>
                
                {/* Active Office Details */}
                <div className="p-8 transition-all duration-300">
                  <p className="text-[#FF6600] font-bold text-sm uppercase tracking-widest mb-2">{locations[activeLocation].type}</p>
                  <p className="text-2xl font-bold text-[#003366] mb-4">{locations[activeLocation].building}</p>
                  
                  <div className="flex items-start mb-6">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 leading-relaxed font-medium">{locations[activeLocation].address}</p>
                  </div>

                  <a href={locations[activeLocation].mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-[#003366] hover:text-[#FF6600] transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <Map className="w-4 h-4 mr-2" /> Get Directions
                  </a>
                </div>
              </div>

              {/* Dynamic Quick Contact Cards */}
              <h3 className="text-xl font-bold text-[#003366] mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a href={`mailto:${locations[activeLocation].email}?subject=Corporate Inquiry`} className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#FF6600] hover:shadow-md transition-all group">
                  <div className="bg-orange-50 p-4 rounded-xl text-[#FF6600] mr-5 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email Desk</p>
                    <p className="text-lg font-bold text-[#003366] truncate">{locations[activeLocation].email}</p>
                  </div>
                </a>
                
                <a href={`tel:${locations[activeLocation].phoneLink}`} className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#003366] hover:shadow-md transition-all group">
                  <div className="bg-blue-50 p-4 rounded-xl text-[#003366] mr-5 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Call Office</p>
                    <p className="text-lg font-bold text-[#003366]">{locations[activeLocation].phone}</p>
                  </div>
                </a>

                <a href={`https://wa.me/${locations[activeLocation].whatsapp}?text=Hello%20FIN5IVE,%20I%20would%20like%20to%20discuss%20financial%20advisory%20services.`} target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-green-500 hover:shadow-md transition-all group">
                  <div className="bg-green-50 p-4 rounded-xl text-green-600 mr-5 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">WhatsApp Chat</p>
                    <p className="text-lg font-bold text-gray-800">Instant Connect</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Right Side: Smart Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600] opacity-5 rounded-bl-full pointer-events-none"></div>

                <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">Request a Strategy Session</h2>
                <p className="text-gray-500 mb-8 text-lg">Fill out the form below. Your inquiry will be routed securely to the relevant department head.</p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center animate-[fadeIn_0.5s_ease-in]">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Inquiry Received Successfully!</h3>
                    <p className="text-green-700 font-medium">Thank you for reaching out. A senior partner from our advisory team will contact you within 24 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" name="name" value={formData.name} onChange={handleInputChange}
                          className={`w-full bg-slate-50 border ${formErrors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all`} 
                          placeholder="John Doe" 
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1 font-bold">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Corporate Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          className={`w-full bg-slate-50 border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all`} 
                          placeholder="john@company.com" 
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1 font-bold">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                          className={`w-full bg-slate-50 border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all`} 
                          placeholder="+91 98765 43210" 
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{formErrors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company / Organization</label>
                        <input 
                          type="text" name="company" value={formData.company} onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all" 
                          placeholder="Acme Corp Ltd." 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Required <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                          name="service" value={formData.service} onChange={handleInputChange}
                          className={`w-full bg-slate-50 border ${formErrors.service ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all appearance-none`}
                        >
                          <option value="" disabled>Select an advisory service...</option>
                          <option>Mutual Funds & SIPs</option>
                          <option>Equity & PMS/AIF</option>
                          <option>Fixed Income & Bonds</option>
                          <option>Insurance Solutions</option>
                          <option>Loans & Financing</option>
                          <option>IT Return Filing / NRI Services</option>
                          <option>Retirement Solutions (NPS)</option>
                          <option>General Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                      {formErrors.service && <p className="text-red-500 text-xs mt-1 font-bold">{formErrors.service}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
                      <textarea 
                        rows="4" name="message" value={formData.message} onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#FF6600] focus:bg-white outline-none transition-all resize-none`} 
                        placeholder="Please briefly describe your current financial requirement..."
                      ></textarea>
                      {formErrors.message && <p className="text-red-500 text-xs mt-1 font-bold">{formErrors.message}</p>}
                    </div>

                    <button 
                      type="submit" disabled={isSubmitting}
                      className={`w-full text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center text-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003366] hover:bg-[#002244] hover:-translate-y-1 group'}`}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting securely...</>
                      ) : (
                        <>Send Secure Message <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center font-medium">
                      <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Your information is protected by standard NDA policies.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Business Hours Footer Block (Updated to actual hours) */}
      <section className="bg-[#003366] py-16 border-t-4 border-[#FF6600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-8 md:mb-0">
              <div className="bg-white/10 p-5 rounded-2xl mr-6 backdrop-blur-sm">
                <Clock className="w-8 h-8 text-[#FF6600]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-1">Standard Business Hours</h3>
                <p className="text-blue-100 font-medium">Mon - Sat : 10:00 AM - 7:00 PM (IST)</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-3 text-lg">Need immediate assistance for urgent corporate transactions?</p>
              <a href="mailto:info.fivefin@gmail.com" className="text-[#FF6600] font-bold text-lg hover:text-white transition-colors border-b-2 border-[#FF6600] hover:border-white pb-1 inline-block">
                Email the Director's Office directly
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;