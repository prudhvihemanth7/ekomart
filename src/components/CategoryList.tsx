/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { categories } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryList: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
              Curated Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Browse by Category
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-gray-900 font-bold hover:text-indigo-600 transition-colors">
            View All Series <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore our premium selection of {category.name.toLowerCase()} essentials.
                </p>
                <Link
                  to={`/shop?category=${category.id}`}
                  className="w-12 h-12 bg-white text-gray-900 rounded-2xl flex items-center justify-center group-hover:w-full transition-all duration-500 overflow-hidden"
                >
                  <ArrowRight className="w-5 h-5 shrink-0" />
                  <span className="ml-2 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Discover More
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
