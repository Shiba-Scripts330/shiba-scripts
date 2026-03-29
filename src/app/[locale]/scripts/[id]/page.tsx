'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { getLocalizedField } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Copy, Check, Download, ShoppingCart } from 'lucide-react';
import { localeCurrencies, formatCurrency } from '@/lib/i18n-config';
import ScriptCard from '@/components/ScriptCard';
import { motion } from 'framer-motion';

export default function ScriptDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const id = params.id as string;

  const [copied, setCopied] = useState(false);
  const [isPurchased] = useState(false);

  // Find product
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-shiba-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-shiba-black dark:text-white mb-4">
            Script Not Found
          </h1>
          <Link
            href="/scripts"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-semibold rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Scripts</span>
          </Link>
        </div>
      </div>
    );
  }

  const name = getLocalizedField(product, 'name', locale);
  const description = getLocalizedField(product, 'description', locale);
  const currency = localeCurrencies[locale as keyof typeof localeCurrencies] || 'USD';

  // Get related scripts
  const relatedScripts = mockProducts
    .filter(
      (p) =>
        p.category === product.category && p.id !== product.id
    )
    .slice(0, 3);

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    esx: 'bg-blue-500',
    qbcore: 'bg-purple-500',
    standalone: 'bg-green-500',
    free: 'bg-yellow-500',
    premium: 'bg-shiba-main',
  };

  const categoryColor = categoryColors[product.category] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/scripts"
          className="inline-flex items-center space-x-2 text-shiba-main dark:text-shiba-accent hover:text-shiba-accent dark:hover:text-shiba-main transition-colors mb-8 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Scripts</span>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src={product.image_url}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Title & Basic Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-4">
                  {name}
                </h1>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`${categoryColor} text-white px-4 py-2 rounded-lg text-sm font-semibold`}>
                    {product.framework}
                  </span>
                  <span className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    v{product.version}
                  </span>
                  {product.is_free && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      FREE
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-shiba-black dark:text-white mb-4">
                  {t('detail.features')}
                </h2>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-shiba-main rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-shiba-black dark:text-white mb-4">
                  {t('detail.requirements')}
                </h2>
                <ul className="space-y-2">
                  {product.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-shiba-accent rounded-full"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-gradient-to-br from-shiba-main to-shiba-accent rounded-lg p-8 text-white shadow-xl">
                <div className="mb-6">
                  {product.is_free ? (
                    <div className="text-5xl font-bold">FREE</div>
                  ) : (
                    <div>
                      <div className="text-sm opacity-80 mb-2">Price</div>
                      <div className="text-5xl font-bold">
                        {formatCurrency(product.price, locale, currency).split('.')[0]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Purchase Button */}
                {!isPurchased && (
                  <button className="w-full bg-white hover:bg-gray-100 text-shiba-main font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>{t('detail.purchase')}</span>
                  </button>
                )}

                {/* License Key Section */}
                {isPurchased && (
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 space-y-3">
                    <div className="text-sm font-semibold opacity-80">
                      {t('detail.license')}
                    </div>
                    <div
                      className="bg-white bg-opacity-20 rounded p-3 font-mono text-sm break-all cursor-pointer hover:bg-opacity-30 transition-colors flex items-center justify-between"
                      onClick={() =>
                        handleCopyLicense('LICENSE-KEY-12345-ABCDE')
                      }
                    >
                      <span>LICENSE-KEY-12345-ABCDE</span>
                      {copied ? (
                        <Check className="w-4 h-4 ml-2" />
                      ) : (
                        <Copy className="w-4 h-4 ml-2" />
                      )}
                    </div>
                    <button className="w-full bg-white hover:bg-gray-100 text-shiba-main font-bold py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 text-sm">
                      <Download className="w-4 h-4" />
                      <span>{t('detail.download')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Info Cards */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t('detail.category')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold capitalize">
                    {product.category}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t('detail.framework')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold">
                    {product.framework}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t('detail.version')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold">
                    v{product.version}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Downloads
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold">
                    {product.download_count.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Scripts */}
        {relatedScripts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-800 pt-16"
          >
            <h2 className="text-3xl font-bold text-shiba-black dark:text-white mb-8">
              {t('detail.relatedScripts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedScripts.map((script) => (
                <ScriptCard
                  key={script.id}
                  product={script}
                  locale={locale}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
