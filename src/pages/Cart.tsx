/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50 m-8 rounded-[3rem]">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl text-gray-300">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 max-w-md text-lg mb-10 font-medium">Looks like you haven't added anything to your cart yet. Explore our series and find something you love!</p>
        <Link
          to="/shop"
          className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-100"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-16">
          Your Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center gap-8 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 group"
                >
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                  </div>
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm tracking-tight capitalize">{item.category}</p>
                    <p className="text-indigo-600 font-black text-lg">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center bg-white rounded-2xl p-1 border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-indigo-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center font-black text-gray-400 hover:text-indigo-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-4 bg-white text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Card */}
          <aside className="lg:w-96">
            <div className="bg-gray-900 rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-indigo-100">
              <h3 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h3>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-gray-400">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between text-2xl font-black">
                  <span>Total</span>
                  <span className="text-indigo-400">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all"
              >
                Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-white/10" />
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                </div>
                Secure Payments
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
