'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ScriptCard from '@/components/ScriptCard';
import { mockProducts } from '@/lib/mock-data';
import { useParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

export default function ScriptsPage() {
  const t = useTranslations('scripts');
  const params = useParams();
  const locale = params.locale as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Category options
  const categories = [
    { value: 'all', label: t('filter') },
    { value: 'esx', label: 'ESX' },
    { value: 'qbcore', label: 'QBCore' },
    { value: 'standalone', label: 'Standalone' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: t('sortOptions.newest') },
    { value: 'priceAsc', label: t('sortOptions.priceAsc') },
    { value: 'priceDesc', label: t('sortOptions.priceDesc') },
    { value: 'popular', label: t('sortOptions.popular') },
  ];

  // Filter and sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const name = product.name_en.toLowerCase();
      const description = product.description_en.toLowerCase();

      const matchesSearch =
        name.includes(searchLower) || description.includes(searchLower);

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sorting
    switch (sortBy) {
      case 'priceAsc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => b.download_count - a.download_count);
        break;
      case 'newest':
      default:
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-2">
            {t('title')}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full"></div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shiba-main dark:focus:ring-shiba-accent"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ScriptCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <Filter className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              {t('noResults')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Results count */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>
            {filteredAndSortedProducts.length} of {mockProducts.length}{' '}
            scripts found
          </p>
        </div>
      </div>
    </div>
  );
}
