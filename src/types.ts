/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  features: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  address: string;
  total: number;
  items: CartItem[];
  paymentMethod: string;
  createdAt: any; // Firestore Timestamp
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface Admin {
  id: string;
  email: string;
  role: 'admin';
}
