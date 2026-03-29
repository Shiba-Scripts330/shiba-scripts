import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useParams } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { Category } from '@/types';
import ScriptCard from '@/components/ScriptCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const categoryMap: Record<string, Category> = {
  esx: 'esx',
  qbcore: 'qbcore',
  standalone: 'standalone',
  free: 'free',
  premium: 'premium',
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const categoryLabel =
    t(`${slug}` as any) ||
    slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${categoryLabel} - Shiba Scripts`,
    description: t(`description.${slug}` as any) ||
      `Browse our collection of ${categoryLabel} scripts for FiveM.`,
  };
}

export async function generateStaticParams() {
  return [
    { locale: 'en', slug: 'esx' },
    { locale: 'en', slug: 'qbcore' },
    { locale: 'en', slug: 'standalone' },
    { locale: 'en', slug: 'free' },
    { locale: 'en', slug: 'premium' },
  ];
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const category = categoryMap[slug] as Category | undefined;

  if (!category) {
    return (
      <div className="min-h-screen bg-white dark:bg-shiba-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-shiba-black dark:text-white mb-4">
            Category Not Found
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

  // Filter products by category
  const categoryProducts = mockProducts.filter((p) => p.category === category);

  const categoryLabel = t(slug as any) ||
    slug.charAt(0).toUpperCase() + slug.slice(1);
  const categoryDescription = t(`description.${slug}` as any) ||
    `Browse our collection of ${slug} scripts.`;

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/scripts"
          className="inline-flex items-center space-x-2 text-shiba-main dark:text-shiba-accent hover:text-shiba-accent dark:hover:text-shiba-main transition-colors mb-8 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Scripts</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-4">
            {categoryLabel}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {categoryDescription}
          </p>
        </div>

        {/* Scripts Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ScriptCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No scripts found in this category
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Check back soon for new scripts!
            </p>
            <Link
              href="/scripts"
              className="px-6 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-semibold rounded-lg transition-colors"
            >
              Browse All Scripts
            </Link>
          </div>
        )}

        {/* Results count */}
        {categoryProducts.length > 0 && (
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p>{categoryProducts.length} scripts in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
