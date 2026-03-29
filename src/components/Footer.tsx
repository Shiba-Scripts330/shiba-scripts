'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-shiba-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🐕</span>
              <span className="font-bold text-shiba-main text-lg">Shiba Scripts</span>
            </div>
            <p className="text-sm text-gray-400">{t('tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/scripts"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  Scripts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-gray-400 hover:text-shiba-main transition-colors"
                >
                  {t('refund')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Social</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-shiba-main transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-shiba-main transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-shiba-main transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@shibascripts.com"
                className="text-gray-400 hover:text-shiba-main transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>{t('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
