import React, { useState, useRef } from 'react';
import { 
  Briefcase, UploadCloud, CheckCircle2, 
  ArrowRight, Send, Loader2, Award, TrendingUp, Users 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { submitApplication } from "../config/api"; 

const WorkWithUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null); 
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '', 
    highestEducationQualification: '', 
    city: '',
    state: '',
    country: 'India'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        toast.error("File size must be less than 5MB");
        setFileName("");
        setResumeFile(null); 
        fileInputRef.current.value = "";
      } else {
        setFileName(file.name);
        setResumeFile(file); 
        toast.success("Resume attached successfully!");
      }
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume before applying.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Create a fresh FormData object
      const submissionData = new FormData();
      
      // 2. Append EXACTLY the text fields the backend schema allows
      submissionData.append('firstName', formData.firstName);
      submissionData.append('lastName', formData.lastName);
      submissionData.append('email', formData.email);
      submissionData.append('phoneNumber', formData.phoneNumber);
      submissionData.append('highestEducationQualification', formData.highestEducationQualification);
      submissionData.append('city', formData.city);
      submissionData.append('state', formData.state);
      submissionData.append('country', formData.country);
      
      // 3. Append the file specifically as 'resume'
      submissionData.append('resume', resumeFile);

      // 4. Send to backend
      const response = await submitApplication(submissionData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Application submitted successfully! Our HR team will review your profile.", {
          duration: 4000,
          iconTheme: { primary: '#FF6600', secondary: 'white' }
        });
        
        // Reset form
        setFormData({
          firstName: '', lastName: '', email: '', phoneNumber: '',
          highestEducationQualification: '', city: '', state: '', country: 'India'
        });
        setFileName("");
        setResumeFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const benefits = [
    { icon: <TrendingUp className="w-6 h-6 text-[#FF6600]" />, title: "Accelerated Growth", desc: "Work directly with industry veterans and fast-track your career in corporate finance." },
    { icon: <Award className="w-6 h-6 text-[#FF6600]" />, title: "Elite Clientele", desc: "Manage portfolios and strategies for top HNIs, NRIs, and institutional clients." },
    { icon: <Users className="w-6 h-6 text-[#FF6600]" />, title: "Collaborative Culture", desc: "Join an open-architecture firm where innovation and execution are deeply valued." }
  ];

  return (
    <div className="bg-slate-50 font-sans relative">

      {/* Hero Section */}
      <section className="relative bg-[#003366] text-white pt-24 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF6600] via-[#003366] to-[#003366]"></div>
        <Briefcase className="absolute -bottom-10 -right-10 w-96 h-96 text-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-[#FF6600] font-bold tracking-widest uppercase text-sm mb-6 bg-orange-500/10 border border-orange-500/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <span>Careers at FIN5IVE</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            Architect Your Future. <br className="hidden md:block" />
            <span className="text-[#FF6600]">Join Our Elite Team.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            We are always on the lookout for driven, analytical, and execution-focused professionals to join our expanding wealth management and corporate finance divisions.
          </p>
        </div>
      </section>

      {/* Main Application Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Side: Why Join Us */}
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-black text-[#003366] mb-4">Make a Difference</h2>
              <p className="text-gray-600 leading-relaxed mb-10">
                At FIN5IVE, we don't just offer jobs; we offer careers built on the "Power of 5". If you are passionate about financial markets and client success, you belong here.
              </p>
              
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-orange-50 p-3 rounded-xl mr-4 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#003366] text-lg">{benefit.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-[#003366] mb-2">Our Hiring Process</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Application Review</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Initial HR Screening</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Technical Interview</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Final Leadership Round</li>
                </ul>
              </div>
            </div>

            {/* Right Side: The Application Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12">
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h3 className="text-2xl font-black text-[#003366]">Submit Your Application</h3>
                  <p className="text-gray-500 text-sm mt-1">Please fill out the form below exactly as per your official documents.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="Enter First Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="Enter Last Name" />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="Email Address" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="Phone Number" />
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Highest Education Qualification <span className="text-red-500">*</span></label>
                    <input type="text" name="highestEducationQualification" required value={formData.highestEducationQualification} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="e.g. MBA Finance, CA, CFA" />
                  </div>

                  {/* Location Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                      <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                      <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF6600] outline-none transition-all">
                        <option value="India">India</option>
                        <option value="UAE">UAE</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume Upload (UI Only - File not sent to backend) */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Upload Resume (PDF/DOC) <span className="text-red-500">*</span></label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#FF6600] hover:bg-orange-50 transition-colors relative group">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      
                      {fileName ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-10 h-10 text-green-500 mb-2" />
                          <p className="font-bold text-[#003366]">{fileName}</p>
                          <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-10 h-10 text-gray-400 mb-2 group-hover:text-[#FF6600] transition-colors" />
                          <p className="font-bold text-[#003366]">Click or drag file to upload</p>
                          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center text-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF6600] hover:bg-[#e55c00] hover:-translate-y-1'}`}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting Application...</>
                      ) : (
                        <>Apply Now <ArrowRight className="w-5 h-5 ml-2" /></>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WorkWithUs;