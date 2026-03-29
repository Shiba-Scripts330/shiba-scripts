import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';
import { locales, defaultLocale, localeNames } from '@/lib/i18n-config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: 'Shiba Scripts - Premium FiveM Scripts',
  description:
    'High-quality FiveM scripts for your server. ESX, QBCore, Standalone scripts with license protection.',
  keywords: [
    'FiveM',
    'Scripts',
    'ESX',
    'QBCore',
    'GTA V',
    'Server Scripts',
    'Premium Scripts',
  ],
  authors: [{ name: 'Shiba Scripts' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shibascripts.com',
    title: 'Shiba Scripts - Premium FiveM Scripts',
    description:
      'High-quality FiveM scripts for your server. ESX, QBCore, Standalone scripts with license protection.',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630?text=Shiba+Scripts',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiba Scripts - Premium FiveM Scripts',
    description:
      'High-quality FiveM scripts for your server. ESX, QBCore, Standalone scripts with license protection.',
  },
  alternates: {
    canonical: 'https://shibascripts.com',
    languages: {
      en: 'https://shibascripts.com/en',
      ja: 'https://shibascripts.com/ja',
      zh: 'https://shibascripts.com/zh',
      'zh-TW': 'https://shibascripts.com/zh-TW',
      ko: 'https://shibascripts.com/ko',
      es: 'https://shibascripts.com/es',
      fr: 'https://shibascripts.com/fr',
      de: 'https://shibascripts.com/de',
    },
  },
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  // Validate locale
  const validLocale = (locales as readonly string[]).includes(locale)
    ? locale
    : defaultLocale;

  // Language mapping for HTML lang attribute
  const langMap: Record<string, string> = {
    en: 'en',
    ja: 'ja',
    zh: 'zh-Hans',
    'zh-TW': 'zh-Hant',
    ko: 'ko',
    es: 'es',
    fr: 'fr',
    de: 'de',
  };

  const htmlLang = langMap[validLocale] || 'en';

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Theme color */}
        <meta name="theme-color" content="#C68642" />

        {/* Hreflang tags for international SEO */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={langMap[loc]}
            href={`https://shibascripts.com/${loc}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://shibascripts.com/en"
        />
      </head>
      <body
        className={`${inter.className} ${notoSansJP.variable} bg-white dark:bg-shiba-black text-gray-900 dark:text-gray-100 antialiased`}
        suppressHydrationWarning
      >
        <Providers locale={validLocale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
