import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Wedding Photography',
    date: '',
    message: '',
    coupon: ''
  });
  const [siteConfig, setSiteConfig] = useState(getLocalSiteConfig());

  useEffect(() => {
    loadSiteConfig()
      .then(setSiteConfig)
      .catch(() => {});
  }, []);

  const studioEmail = siteConfig.studioSettings.email;
  const studioPhone = siteConfig.studioSettings.phone;
  const studioLocation = siteConfig.studioSettings.location;
  const studioArea = siteConfig.studioSettings.serviceArea;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local log for Maddie's Admin Dashboard
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({
      ...formData,
      id: Date.now(),
      status: 'New',
      type: 'Site Inquiry'
    });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    setIsSuccess(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl shadow-xl p-12"
          >
            <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="text-white h-10 w-10" />
            </div>
            <h2 className="text-4xl font-serif text-stone-900 mb-4">Thank you, {formData.name.split(' ')[0]}</h2>
            <p className="text-stone-500 font-light mb-8">Your inquiry has been received. Maddie will be in touch within 24-48 hours.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-stone-400 uppercase tracking-widest text-xs border-b border-stone-200 pb-1 hover:text-stone-900 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-6"
            >
              Get in Touch
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-stone-900 mb-8"
            >
              Let's create something <span className="italic">beautiful</span> together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-stone-600 font-light text-lg mb-12 max-w-lg"
            >
              Whether it's your wedding day, a new arrival, or a family milestone, we'd love to hear your story and how we can help capture it.
            </motion.p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400">Email Us</p>
                  <p className="text-stone-900">{studioEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Phone className="h-5 w-5 text-stone-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400">Call Us</p>
                  <p className="text-stone-900">{studioPhone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="h-5 w-5 text-stone-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400">Location</p>
                  <p className="text-stone-900">{studioLocation}</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-tight">Serving {studioArea}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-10 md:p-16 rounded-3xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                    placeholder="maddie@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Service</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none appearance-none text-sm"
                  >
                    <option>Wedding Photography</option>
                    <option>Birth</option>
                    <option>Family Session</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Date Required</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Coupon or Gift Card Code</label>
                <input
                  type="text"
                  value={formData.coupon}
                  onChange={(e) => setFormData({...formData, coupon: e.target.value})}
                  className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  placeholder="Enter code if applicable"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Your Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-stone-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  placeholder="Tell us a little bit about what you're looking for..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-5 rounded-xl uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:bg-stone-800 transition-colors shadow-lg"
              >
                <span>Send Inquiry</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
