import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import ScriptCard from '@/components/ScriptCard';
import { mockProducts } from '@/lib/mock-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // Get featured scripts for the home page
  const featuredScripts = mockProducts.filter((p) => p.is_featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Scripts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-2">
              {t('featured.title')}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full"></div>
          </div>
          <Link
            href="/scripts"
            className="hidden md:flex items-center space-x-2 text-shiba-main dark:text-shiba-accent hover:text-shiba-accent dark:hover:text-shiba-main transition-colors font-semibold"
          >
            <span>{t('featured.viewAll')}</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredScripts.map((product) => (
            <ScriptCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/scripts"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-shiba-main hover:bg-shiba-accent text-white font-bold rounded-lg transition-colors"
          >
            <span>{t('featured.viewAll')}</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />
    </div>
  );
}
