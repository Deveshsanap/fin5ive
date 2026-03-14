import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-[#FF6600]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 text-lg">Your trust and data security are our highest priority.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-6 text-gray-600 leading-relaxed">
          <p>
            We, at <strong>www.fin5ive.com</strong>, acknowledge and accept that the personal details that you impart to us, is to be kept in strict confidentiality and to use the information only in the manner which would be beneficial to our customers. We consider our relationship with you as invaluable and strive to respect and safeguard your right to privacy.
          </p>
          
          <p>
            We shall protect the personal details received from you with the same degree of care, but no less than a reasonable degree of care, to prevent the unauthorized use, dissemination, or publication of these information as we protect our own confidential information of a like nature.
          </p>
          
          <p>
            We shall use the personal information to improve our service to you and to keep you updated about our new product or information that may be of interest to you. The information collected from you would be used in the right spirit and context in which it is intended to be used. Your information would be used by us to process your trading request and to carry out the settlements of your obligations.
          </p>
          
          <p>
            We would ensure that we collect personal information only to the extent it is necessary to administer our services in the best possible manner and what is required under the various regulations of Indian Laws. To ensure high quality services and high degree of value addition to you, we may combine the information given by you on the web or through other channels.
          </p>
          
          <p>
            Under certain circumstances we may be required to share the information given by you with the third parties, where we feel they can contribute to add value and improve the quality of services imparted by us to you. We shall take all reasonable steps to ensure that the confidentiality of your information is maintained by imposing strict confidentiality standards on all the third parties with whom we part this information. In all circumstances we shall ensure that your personal information is protected by strict confidentiality agreement. We shall not allow any third parties to retain your personal information longer than what is warranted by the nature of services rendered.
          </p>
          
          <p>
            We would also impart your personal information wherever it is required to be disclosed under law to any of the governmental agency or regulatory bodies.
          </p>
          
          <p>
            We ensure that the personal information given to us by you on the web is placed in the secured portion of our web-site. We use the most advanced encryption technology, to ensure that the information transmitted between you and us across the Internet is safe and cannot be accessed by any outsider.
          </p>
          
          <p>
            To ensure security of access to the personal information and transaction details, the access to the secured zone of our website is restricted by the unique login ID and Password selected by you. You should be very careful in handling the ID and password and you should ensure that you do not reveal it to anybody, nor do you keep it in writing. You should keep changing your password periodically.
          </p>
          
          <p>
            To ensure safety of your trading access, our technology automatically logs you out of the site if no activity is registered for 30 minutes. However, you should ensure that each time you leave your terminal you log yourself out. This prevents someone else from accessing your account if you leave your computer and your session has not “timed out”.
          </p>
          
          <p>
            To enable us serve you better, it is necessary that your personal information available with us is updated and accurate. Our web-site enables you to update your personal information. You can also send us an e-mail at <a href="mailto:info.fivefin@gmail.com" className="text-[#FF6600] font-bold hover:underline">info.fivefin@gmail.com</a> and we shall ensure that your information is updated and protected from any misuse or unauthorised revelation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;