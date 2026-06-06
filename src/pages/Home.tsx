/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { reviews } from '../data/reviews';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="bg-white">
      <Hero />
      <CategoryList />

      {/* Featured Products */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
              Trending Now
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Explore our most popular items that our community is loving right now. Quality crafted for your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-gray-200"
            >
              Explore Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="max-w-xl">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
                Social Proof
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-6">
                Loved by Experts & Enthusiasts
              </h2>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-[2rem]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://ui-avatars.com/api/?name=User+${i}&background=random`}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    alt="User"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-900">4.9/5 Average Rating</p>
                <p className="text-sm text-gray-500">Based on 2,500+ Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-indigo-50/50" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-14 h-14 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <h4 className="font-black text-gray-900">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                Join the Ekomart Community
              </h2>
              <p className="text-indigo-100 text-lg mb-12 leading-relaxed">
                Be the first to hear about new drops, exclusive offers, and the latest trends in tech and lifestyle.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-8 py-5 bg-white rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-white/20 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
