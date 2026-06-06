import React, { useEffect, useState } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Order } from '../../types';
import { 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  ArrowLeft,
  LogOut,
  RefreshCcw,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { signOut } from 'firebase/auth';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeOrders = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeOrders();
    };
  }, [navigate]);

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Permission denied or error updating status.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Permission denied or error deleting order.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'processing': return <RefreshCcw className="w-4 h-4 text-blue-500 animate-spin-slow" />;
      case 'shipped': return <Truck className="w-4 h-4 text-indigo-500" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBg = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCcw className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Accessing Orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-all group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Order Management</h1>
              <p className="text-sm font-bold text-gray-400">{orders.length} Total Orders</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-xs">
                {auth.currentUser?.email?.[0].toUpperCase()}
              </div>
              <span className="text-sm font-bold text-gray-600">{auth.currentUser?.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search orders, customers, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-8 py-4 bg-white border-none rounded-[1.5rem] font-bold shadow-sm focus:ring-4 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-14 pr-10 py-4 bg-white border-none rounded-[1.5rem] font-bold shadow-sm focus:ring-4 focus:ring-indigo-100 transition-all appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                    {/* Order ID & Status */}
                    <div className="lg:w-64 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Order ID</span>
                        <span className="text-[10px] font-bold text-gray-300">#{order.id.slice(0, 8)}</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold leading-none ${getStatusBg(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-400">
                        {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : 'Just now'}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <h3 className="font-black text-gray-900 tracking-tight">{order.customerName}</h3>
                        <p className="text-sm font-bold text-gray-500">{order.customerEmail}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Shipping Address</p>
                        <p className="text-sm font-medium text-gray-600 line-clamp-1">{order.address}</p>
                      </div>
                    </div>

                    {/* Items & Total */}
                    <div className="flex items-center gap-8 lg:w-72 justify-between lg:justify-end">
                      <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{order.items.length} Items</p>
                        <p className="text-xl font-black text-indigo-600">₹{order.total.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="relative group/actions">
                          <button className="p-3 hover:bg-gray-50 rounded-xl transition-all">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all z-10 p-2 scale-95 group-hover/actions:scale-100 origin-top-right">
                            <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50 mb-1">Set Status</p>
                            <button onClick={() => handleStatusUpdate(order.id, 'pending')} className="w-full text-left px-4 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 rounded-xl transition-all flex items-center gap-2">
                              <Clock className="w-4 h-4" /> Pending
                            </button>
                            <button onClick={() => handleStatusUpdate(order.id, 'processing')} className="w-full text-left px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2">
                              <RefreshCcw className="w-4 h-4" /> Processing
                            </button>
                            <button onClick={() => handleStatusUpdate(order.id, 'shipped')} className="w-full text-left px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2">
                              <Truck className="w-4 h-4" /> Shipped
                            </button>
                            <button onClick={() => handleStatusUpdate(order.id, 'delivered')} className="w-full text-left px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" /> Delivered
                            </button>
                            <div className="h-px bg-gray-50 my-1" />
                            <button onClick={() => handleDeleteOrder(order.id)} className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2">
                              <Trash2 className="w-4 h-4" /> Delete Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item Chips */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-4 h-4 rounded-md object-cover" />
                        <span className="text-[10px] font-bold text-gray-600">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-24 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">No orders found</h3>
                <p className="text-gray-400 font-bold">Try adjusting your filters or search term</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
