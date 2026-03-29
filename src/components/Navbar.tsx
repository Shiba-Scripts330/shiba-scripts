'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'home', href: '/' },
    { label: 'scripts', href: '/scripts' },
    { label: 'categories', href: '/categories' },
    { label: 'support', href: '/support' },
    { label: 'docs', href: '/docs' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-shiba-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🐕</span>
            <span className="font-bold text-shiba-main dark:text-shiba-accent text-lg group-hover:text-shiba-accent dark:group-hover:text-shiba-main transition-colors">
              Shiba Scripts
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-shiba-main dark:text-shiba-accent bg-shiba-bg dark:bg-gray-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-shiba-main dark:hover:text-shiba-accent'
                }`}
              >
                {t(link.label as any)}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Auth Button */}
            {session ? (
              <Link
                href="/account"
                className="hidden sm:inline-block px-4 py-2 rounded-lg bg-shiba-main text-white hover:bg-shiba-accent transition-colors font-medium text-sm"
              >
                {t('account')}
              </Link>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="hidden sm:inline-block px-4 py-2 rounded-lg bg-shiba-main text-white hover:bg-shiba-accent transition-colors font-medium text-sm"
              >
                {t('login')}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-shiba-bg dark:hover:bg-gray-900 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
              ) : (
                <Menu className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-shiba-main dark:text-shiba-accent bg-shiba-bg dark:bg-gray-900'
                    : 'text-gray-700 dark:text-gray-300 hover:text-shiba-main dark:hover:text-shiba-accent'
                }`}
              >
                {t(link.label as any)}
              </Link>
            ))}

            {/* Mobile Auth Button */}
            <div className="px-3 py-2">
              {session ? (
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-shiba-main text-white hover:bg-shiba-accent transition-colors font-medium text-center"
                >
                  {t('account')}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    router.push('/login');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-shiba-main text-white hover:bg-shiba-accent transition-colors font-medium"
                >
                  {t('login')}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
