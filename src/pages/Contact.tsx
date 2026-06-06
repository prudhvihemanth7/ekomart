/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6">
            We're Here to Help
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question about our products or your order? Our team is always ready to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Us', value: 'masshemanth587@gmail.com', sub: 'We reply within 24 hours' },
                  { icon: Phone, label: 'Call Us', value: '7989071536', sub: 'Mon-Fri, 9am - 6pm IST' },
                  { icon: MapPin, label: 'Visit Office', value: 'Near SVCE college', sub: 'Tirupati, India' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</h4>
                      <p className="text-xl font-black text-gray-900 mb-1">{item.value}</p>
                      <p className="text-sm font-bold text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
               <MessageCircle className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-6 tracking-tight">Need Real-time Help?</h3>
                 <p className="text-gray-400 font-bold mb-8 leading-relaxed">
                   Our live chat experts are online during office hours to provide instant support for all your queries.
                 </p>
                 <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl">
                   Start Live Chat
                 </button>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-indigo-500/5">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Message Sent!</h3>
                <p className="text-gray-500 font-bold text-lg max-w-sm mx-auto mb-10">
                  Thank you for reaching out. Our support team will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-indigo-600 font-black hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Your Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-3xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-gray-300"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-3xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-gray-300"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-3xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-gray-300"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-8 py-5 bg-gray-50 border-none rounded-3xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all resize-none placeholder:text-gray-300"
                      placeholder="Tell us everything..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full py-6 bg-gray-900 hover:bg-indigo-600 text-white font-black text-xl rounded-3xl flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50"
                >
                  {formState === 'sending' ? (
                    'Sending Message...'
                  ) : (
                    <>
                      Send Message <Send className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
