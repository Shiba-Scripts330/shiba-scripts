'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-intl/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Download, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function AccountPage() {
  const t = useTranslations('account');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'purchases' | 'licenses' | 'downloads'>(
    'purchases'
  );
  const [copiedLicense, setCopiedLicense] = useState<string | null>(null);

  // Mock purchase data
  const mockPurchases = [
    {
      id: '1',
      name: 'Advanced Garage System',
      date: '2024-03-15',
      price: 4999,
      status: 'completed',
    },
    {
      id: '2',
      name: 'Drug System',
      date: '2024-03-10',
      price: 5999,
      status: 'completed',
    },
    {
      id: '3',
      name: 'Banking System',
      date: '2024-03-05',
      price: 3999,
      status: 'completed',
    },
  ];

  const mockLicenses = [
    {
      id: '1',
      scriptName: 'Advanced Garage System',
      key: 'LICENSE-GARAGE-12345-ABCDE',
      status: 'active',
      createdAt: '2024-03-15',
    },
    {
      id: '2',
      scriptName: 'Drug System',
      key: 'LICENSE-DRUG-67890-FGHIJ',
      status: 'active',
      createdAt: '2024-03-10',
    },
    {
      id: '3',
      scriptName: 'Banking System',
      key: 'LICENSE-BANK-11111-KLMNO',
      status: 'active',
      createdAt: '2024-03-05',
    },
  ];

  const mockDownloads = [
    {
      id: '1',
      name: 'Advanced Garage System',
      version: '2.1.0',
      downloadedAt: '2024-03-15',
    },
    {
      id: '2',
      name: 'Drug System',
      version: '1.8.5',
      downloadedAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Banking System',
      version: '3.2.1',
      downloadedAt: '2024-03-05',
    },
  ];

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedLicense(key);
    setTimeout(() => setCopiedLicense(null), 2000);
  };

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
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            You must be logged in to access this page
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

        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="mb-12 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            {session.user?.image && (
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold mb-2">{session.user?.name}</h2>
              <p className="text-white/80 mb-4">{session.user?.email}</p>
              <button
                onClick={() => {
                  // Sign out logic
                  window.location.href = '/api/auth/signout';
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('profile')}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 mb-8 border-b border-gray-200 dark:border-gray-800"
        >
          {(['purchases', 'licenses', 'downloads'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-shiba-main text-shiba-main dark:text-shiba-accent'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-shiba-main dark:hover:text-shiba-accent'
              }`}
            >
              {tab === 'purchases' && t('purchases')}
              {tab === 'licenses' && t('licenses')}
              {tab === 'downloads' && t('downloads')}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          variants={itemVariants}
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Purchases Tab */}
          {activeTab === 'purchases' && (
            <div>
              {mockPurchases.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Script Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          {t('purchaseDate')}
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          {t('status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPurchases.map((purchase) => (
                        <tr
                          key={purchase.id}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                            {purchase.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                            {new Date(purchase.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                            ${(purchase.price / 100).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              {t('active')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('noPurchases')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Licenses Tab */}
          {activeTab === 'licenses' && (
            <div className="space-y-4">
              {mockLicenses.length > 0 ? (
                mockLicenses.map((license) => (
                  <motion.div
                    key={license.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {license.scriptName}
                        </h3>
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3">
                          <code className="flex-1 break-all">{license.key}</code>
                          <button
                            onClick={() => handleCopyLicense(license.key)}
                            className="ml-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Copy license key"
                          >
                            {copiedLicense === license.key ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>Status: {license.status}</span>
                          <span>Created: {new Date(license.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No licenses found
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Downloads Tab */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              {mockDownloads.length > 0 ? (
                mockDownloads.map((download) => (
                  <motion.div
                    key={download.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {download.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>v{download.version}</span>
                        <span>Downloaded: {new Date(download.downloadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                      <Download className="w-5 h-5" />
                      <span>{t('downloadBtn')}</span>
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No downloads available
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
