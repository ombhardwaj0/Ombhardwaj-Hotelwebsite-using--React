import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you! Your message has been sent successfully.");
    setFormData({ name: '', email: '', message: '' });
  };
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Contact <span className="text-blue-600">Details</span>
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Have questions or need assistance with a booking? Reach out, and our support team will respond within 24 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in touch directly</h2>
            {/* Telephone le liye he */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                📞
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Via Telephone</span>
                <a href="tel:+18005550199" className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
             <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-pink-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl shrink-0">
                📸
              </div>
              {/* Instagram ke liye */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Via Instagram</span>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-base font-semibold text-slate-800 hover:text-pink-600 transition-colors">
                  @MyHotels_Stay
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
                👥
              </div>
              {/*Facebook ke liye */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Via Facebook</span>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                  fb.com/MyHotelsOfficial
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
            {/*Form banay he  */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="OM"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-medium transition-all"/>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="OM@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-medium transition-all"/>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Type your question or request here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-medium transition-all resize-none">
                  </textarea>
              </div>
              <button type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-150 shadow-md transform active:scale-95 text-center mt-2">
                Send Message
              </button>
            </form>
          </div>
         </div>
      </div>
    </div>
  );
}