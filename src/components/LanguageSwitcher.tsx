'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next-intl/navigation';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeNames } from '@/lib/i18n-config';
import { Globe } from 'lucide-react';
import Cookies from 'js-cookie';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const localeFlags: Record<string, string> = {
    en: '🇺🇸',
    ja: '🇯🇵',
    zh: '🇨🇳',
    'zh-TW': '🇹🇼',
    ko: '🇰🇷',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    router.replace(pathname, { locale: newLocale as any });
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-shiba-bg dark:hover:bg-gray-900 transition-colors text-gray-700 dark:text-gray-300"
        title="Change language"
      >
        <Globe className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
        <span className="text-sm font-medium hidden sm:inline">
          {localeFlags[locale as keyof typeof localeFlags]} {localeNames[locale as keyof typeof localeNames]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
          >
            <div className="py-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors ${
                    locale === loc
                      ? 'bg-shiba-main text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-shiba-bg dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">{localeFlags[loc as keyof typeof localeFlags]}</span>
                  <span className="font-medium">{localeNames[loc as keyof typeof localeNames]}</span>
                  {locale === loc && <span className="ml-auto text-sm">✓</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
