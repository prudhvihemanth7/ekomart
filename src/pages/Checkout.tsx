/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { ArrowLeft, CreditCard, ShieldCheck, ExternalLink, Check, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout: React.FC = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'gpay'>('paypal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in all shipping details first.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        total: cartTotal,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error('Error placing order:', err);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalRedirect = () => {
    handlePlaceOrder();
    // In a real app we'd redirect after saving, but here we'll just simulate
    setTimeout(() => {
       window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sales@ekomart.com&item_name=Ekomart%20Order&amount=${cartTotal}&currency_code=INR`;
    }, 2000);
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-100 text-center max-w-xl w-full"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Order Placed!</h2>
          <p className="text-gray-500 font-bold text-lg mb-2">Thank you, {formData.name}!</p>
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-black">Order ID: #{orderId.slice(0, 8)}</p>
          <div className="bg-gray-50 p-6 rounded-3xl mb-10 text-left border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black uppercase text-gray-400">Status</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">Pending Verification</span>
            </div>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              We've sent a confirmation email to <span className="text-indigo-600 font-bold">{formData.email}</span>. 
              Our team is processing your order and you'll receive another update once it's shipped.
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-xl active:scale-95"
          >
            Continue Shopping <ShoppingBag className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 mb-12">
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </Link>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-16">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Shipping Form */}
          <div className="space-y-12">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-sm">1</span>
                Shipping Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
                    placeholder="Street, Apartment, Suite..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="Zip code"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-12">
            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center text-sm">2</span>
                Payment Method
              </h3>
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                    paymentMethod === 'paypal'
                      ? 'bg-white text-indigo-600 border-white'
                      : 'bg-white/10 text-white/60 border-white/10 hover:bg-white/20'
                  }`}
                >
                  PayPal
                </button>
                <button
                  onClick={() => setPaymentMethod('gpay')}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                    paymentMethod === 'gpay'
                      ? 'bg-white text-indigo-600 border-white'
                      : 'bg-white/10 text-white/60 border-white/10 hover:bg-white/20'
                  }`}
                >
                  Google Pay
                </button>
              </div>

              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {paymentMethod === 'paypal' ? (
                    <motion.div
                      key="paypal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                          alt="PayPal"
                          className="h-8 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Selected</div>
                      </div>
                      <p className="text-indigo-100 font-medium mb-8 leading-relaxed">
                        You will be redirected to PayPal to complete your purchase securely. You can pay with your PayPal balance or a credit/debit card.
                      </p>
                      <div className="flex items-center gap-3 text-indigo-200 text-sm font-bold">
                        <ShieldCheck className="w-5 h-5" /> Verified by PayPal Secure Payment Gateway
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gpay"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-8 rounded-[2.5rem] text-gray-900 shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg"
                            alt="Google Pay"
                            className="h-6"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-black text-lg tracking-tight">UPI Payment</span>
                        </div>
                        <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Scan & Pay</div>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-dashed border-gray-200 mb-6 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-3xl shadow-sm mb-4">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=masshemanth587-1@oksbi%26pn=Prudhvi%20Hemanth%26am=${cartTotal}%26cu=INR`}
                            alt="Google Pay QR Code"
                            className="w-48 h-48"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">UPI ID</p>
                        <p className="font-bold text-gray-900 border-2 border-indigo-50 px-4 py-2 rounded-xl bg-indigo-50/30">masshemanth587-1@oksbi</p>
                      </div>

                      <p className="text-gray-500 text-xs font-bold leading-relaxed text-center">
                        Scan the QR code above with any UPI app (Google Pay, PhonePe, Paytm) to complete your payment of <span className="text-indigo-600 font-black">₹{cartTotal.toLocaleString()}</span>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div className="flex justify-between text-indigo-100 font-bold px-4">
                    <span>Order Total ({cartCount} items)</span>
                    <span className="text-2xl text-white font-black">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {paymentMethod === 'paypal' ? (
                    <button
                      onClick={handlePayPalRedirect}
                      disabled={isSubmitting}
                      className="w-full py-6 bg-white hover:bg-gray-100 text-indigo-600 font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Pay with PayPal <ExternalLink className="w-6 h-6" /></>}
                    </button>
                  ) : (
                    <button
                      className="w-full py-6 bg-white hover:bg-gray-100 text-indigo-600 font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50"
                      disabled={isSubmitting}
                      onClick={handlePlaceOrder}
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Confirm Payment & Place Order <ShieldCheck className="w-6 h-6" /></>}
                    </button>
                  )}
                </div>

                <p className="text-center text-xs font-bold text-indigo-300 uppercase tracking-widest">
                  By clicking, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
