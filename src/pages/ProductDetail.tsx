/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { reviews as allReviews } from '../data/reviews';
import { useCart } from '../CartContext';
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RotateCcw, Check } from 'lucide-react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-black mb-4">Product not found</h2>
        <Link to="/shop" className="text-indigo-600 font-bold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3rem] overflow-hidden bg-gray-50 aspect-square"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </motion.div>

          {/* Info Section */}
          <div className="space-y-10">
            <div>
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
                {product.category} Series
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 bg-amber-50 px-4 py-2 rounded-2xl">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-black text-amber-700">{product.rating}</span>
                </div>
                <span className="text-gray-400 font-bold">({product.reviewsCount} reviews)</span>
              </div>
              <p className="text-4xl font-black text-gray-900 tracking-tight">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-black text-gray-900">Key Features:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-black text-gray-600 hover:text-indigo-600"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-black text-gray-600 hover:text-indigo-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product);
                }}
                className="flex-1 bg-gray-900 hover:bg-indigo-600 text-white font-black text-lg h-[60px] rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-2xl shadow-indigo-100"
              >
                <ShoppingBag className="w-6 h-6" />
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                  <Truck className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">1 Year Warranty</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          <div className="flex border-b border-gray-100 mb-12 overflow-x-auto gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-xl font-black transition-all relative ${
                activeTab === 'description' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xl font-black transition-all relative ${
                activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Reviews ({productReviews.length})
              {activeTab === 'reviews' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
              )}
            </button>
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' ? (
              <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
                <p>{product.description}</p>
                <p className="mt-6">Crafted with the finest materials and designed for longevity, our {product.name} represents the pinnacle of modern craftsmanship. Every detail has been meticulously considered to provide an unparalleled user experience, whether you're using it at home, in the office, or on the go.</p>
                <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-center gap-3">✨ Premium build quality that stands the test of time</li>
                  <li className="flex items-center gap-3">🌿 Sustainably sourced materials and ethical manufacturing</li>
                  <li className="flex items-center gap-3">🎯 Precision engineered for optimal performance</li>
                  <li className="flex items-center gap-3">💎 Elegant minimalist aesthetic perfect for any setting</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-8">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-2xl" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                          <div>
                            <h5 className="font-black text-gray-900">{review.userName}</h5>
                            <div className="flex text-amber-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-bold text-center py-12">No reviews yet for this product. Be the first to share your thoughts!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h3 className="text-3xl font-black tracking-tighter text-gray-900 mb-12 text-center">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
