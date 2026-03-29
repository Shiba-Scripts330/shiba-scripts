'use client';

import { Product } from '@/types';
import { getLocalizedField } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { localeCurrencies, formatCurrency } from '@/lib/i18n-config';

interface ScriptCardProps {
  product: Product;
  locale: string;
}

const ScriptCard = ({ product, locale }: ScriptCardProps) => {
  const t = useTranslations('scripts');
  const name = getLocalizedField(product, 'name', locale);
  const description = getLocalizedField(product, 'description', locale);
  const currency = localeCurrencies[locale as keyof typeof localeCurrencies] || 'USD';

  const categoryColors: Record<string, string> = {
    esx: 'bg-blue-500',
    qbcore: 'bg-purple-500',
    standalone: 'bg-green-500',
    free: 'bg-yellow-500',
    premium: 'bg-shiba-main',
  };

  const categoryColor = categoryColors[product.category] || 'bg-gray-500';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/scripts/${product.id}`}>
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative w-full h-48 bg-shiba-bg dark:bg-gray-800 overflow-hidden group">
            <Image
              src={product.image_url}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
              {product.is_free && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {t('free')}
                </span>
              )}
              <span className={`${categoryColor} text-white text-xs font-semibold px-2 py-1 rounded capitalize`}>
                {product.framework}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Title */}
            <h3 className="font-bold text-lg text-shiba-black dark:text-white mb-2 line-clamp-2 hover:text-shiba-main dark:hover:text-shiba-accent transition-colors">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
              {description}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-shiba-main text-shiba-main" />
                <span>{product.download_count} downloads</span>
              </div>
              <span className="text-gray-400 dark:text-gray-600">v{product.version}</span>
            </div>

            {/* Footer - Price and Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                {product.is_free ? (
                  <span className="text-shiba-main dark:text-shiba-accent font-bold text-lg">
                    FREE
                  </span>
                ) : (
                  <span className="text-shiba-main dark:text-shiba-accent font-bold text-lg">
                    {formatCurrency(product.price, locale, currency)}
                  </span>
                )}
              </div>
              <button className="bg-shiba-main hover:bg-shiba-accent text-white px-3 py-2 rounded text-sm font-semibold transition-colors">
                {t('viewDetails')}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ScriptCard;
