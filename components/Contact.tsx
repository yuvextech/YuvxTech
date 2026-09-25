
import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

const PROJECT_TYPES = ['Mobile App', 'Web Platform', 'UI/UX Design', 'AI Integration', 'Cloud Architecture', 'Other'];
const BUDGET_RANGES = ['$5k - $15k', '$15k - $50k', '$50k - $150k', '$150k+'];

const Contact: React.FC = () => {
  const { settings } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Side: Content & Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Connect With Us</h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-gray-900 dark:text-white">
                  Let's craft your <br />
                  <span className="text-gradient">digital legacy.</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
                  Have a vision that needs engineering excellence? We're ready to partner with you to build something that moves the needle.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900 dark:text-white">Email Us</h5>
                    <p className="text-gray-600 dark:text-gray-400">{settings.contactEmail || 'hello@yuvex.tech'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900 dark:text-white">Headquarters</h5>
                    <p className="text-gray-600 dark:text-gray-400">Mission District, San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-green-600/10 border border-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900 dark:text-white">Social Chat</h5>
                    <div className="flex gap-4 mt-2">
                      <a href={settings.socialLinks?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">Twitter/X</a>
                      <a href={settings.socialLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">LinkedIn</a>
                      <a href={settings.socialLinks?.github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form Card */}
            <div className="relative">
              {isSubmitted ? (
                <div className="glass p-12 rounded-[40px] text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h4 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Inquiry Received!</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Thanks for reaching out. An architect from our team will review your project details and get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all font-bold text-gray-900 dark:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="glass p-8 md:p-12 rounded-[40px]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">Project Category</label>
                        <select 
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full bg-gray-50 dark:bg-[#0a0f1d] border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm appearance-none text-gray-900 dark:text-white"
                        >
                          <option value="" disabled>Select type...</option>
                          {PROJECT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">Expected Budget</label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-gray-50 dark:bg-[#0a0f1d] border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm appearance-none text-gray-900 dark:text-white"
                        >
                          <option value="" disabled>Select range...</option>
                          {BUDGET_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">Project Brief</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your goals, timelines, and requirements..."
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm min-h-[150px] resize-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Dispatching...
                        </>
                      ) : (
                        <>
                          Start Project Discussion
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;