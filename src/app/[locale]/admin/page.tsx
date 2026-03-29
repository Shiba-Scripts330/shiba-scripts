'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-intl/navigation';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Loader } from 'lucide-react';

interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface Order {
  id: string;
  customerName: string;
  scriptName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function AdminPage() {
  const t = useTranslations('admin');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock stats
  const stats: StatsCard[] = [
    {
      title: t('totalRevenue'),
      value: '$15,420',
      change: '+12.5%',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: t('totalOrders'),
      value: '1,245',
      change: '+8.2%',
      icon: <ShoppingCart className="w-8 h-8" />,
    },
    {
      title: t('totalUsers'),
      value: '892',
      change: '+5.3%',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Active Scripts',
      value: '28',
      change: '+2 new',
      icon: <BarChart3 className="w-8 h-8" />,
    },
  ];

  // Mock orders
  const orders: Order[] = [
    {
      id: '1',
      customerName: 'John Doe',
      scriptName: 'Advanced Garage System',
      amount: 4999,
      date: '2024-03-20',
      status: 'completed',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      scriptName: 'Drug System',
      amount: 5999,
      date: '2024-03-20',
      status: 'completed',
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      scriptName: 'Banking System',
      amount: 3999,
      date: '2024-03-19',
      status: 'pending',
    },
    {
      id: '4',
      customerName: 'Sarah Williams',
      scriptName: 'Property System Pro',
      amount: 6999,
      date: '2024-03-19',
      status: 'completed',
    },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white dark:bg-shiba-black flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-shiba-main" />
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div className="min-h-screen bg-white dark:bg-shiba-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-shiba-black dark:text-white mb-4">
            Admin Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            You must be logged in as an admin to access this page
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-bold rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-2">
            {t('title')}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full"></div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 mb-8 border-b border-gray-200 dark:border-gray-800"
        >
          {(['dashboard', 'products'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-shiba-main text-shiba-main dark:text-shiba-accent'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-shiba-main dark:hover:text-shiba-accent'
              }`}
            >
              {tab === 'dashboard' && t('dashboard')}
              {tab === 'products' && t('products')}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                      {stat.title}
                    </h3>
                    <div className="p-3 bg-shiba-main/10 dark:bg-shiba-main/20 rounded-lg text-shiba-main dark:text-shiba-accent">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-shiba-black dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-shiba-black dark:text-white">
                  {t('recentOrders')}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Script
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {order.scriptName}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                          ${(order.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Add Product Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-end"
            >
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-bold rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>{t('addProduct')}</span>
              </button>
            </motion.div>

            {/* Add Product Form */}
            {showAddForm && (
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-shiba-black dark:text-white mb-6">
                  {t('addProduct')}
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Script Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
                        placeholder="Enter script name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent">
                        <option>Select category</option>
                        <option>esx</option>
                        <option>qbcore</option>
                        <option>standalone</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Version
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
                        placeholder="1.0.0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
                      placeholder="Enter description"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-bold rounded-lg transition-colors"
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Products List */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-shiba-black dark:text-white">
                All Products
              </h2>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Sample Script {item}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ESX • v1.0.0
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-shiba-main dark:text-shiba-accent">
                      ${(item * 3999 / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                      <Edit2 className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
