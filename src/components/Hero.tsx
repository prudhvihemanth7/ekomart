/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Modern Tech Lifestyle',
    description: 'Discover the latest gadgets that redefine your daily experience. Precision engineering meets elegant design.',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1920',
    accent: 'bg-indigo-600',
    text: 'text-indigo-600',
  },
  {
    id: 2,
    title: 'Elevate Your Space',
    description: 'Transform your home with our kurated collection of minimalist decor and functional art.',
    image: 'https://images.unsplash.com/photo-1449247704656-13621df5ee70?auto=format&fit=crop&q=80&w=1920',
    accent: 'bg-indigo-600',
    text: 'text-indigo-600',
  },
  {
    id: 3,
    title: 'Fashion Forward',
    description: 'Express your unique style with premium sustainable materials and timeless silhouettes.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1920',
    accent: 'bg-indigo-600',
    text: 'text-indigo-600',
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-white/10 backdrop-blur-md border border-white/20`}>
                New Collection 2026
              </span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-medium">
                {slides[current].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className={`px-8 py-4 ${slides[current].accent} hover:brightness-110 text-white font-bold rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-xl shadow-black/20 group hover:-translate-y-1`}
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Shop Collection
                </Link>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prev}
          className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
