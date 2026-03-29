'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    await signIn('discord', { callbackUrl: '/' });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
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
    <div className="min-h-screen bg-gradient-to-br from-white via-shiba-bg to-white dark:from-shiba-black dark:via-gray-900 dark:to-shiba-black flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">🐕</div>
            <h1 className="text-3xl font-bold text-shiba-black dark:text-white mb-2">
              Shiba Scripts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Premium FiveM Scripts
            </p>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-shiba-black dark:text-white mb-3">
              {t('loginTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('loginDesc')}
            </p>
          </motion.div>

          {/* Discord Button */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <button
              onClick={handleDiscordLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C3FA3] text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>{t('loggingIn')}</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.397-.875-.61-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.15 10.15 0 0 0 .372-.294a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.294a.072.072 0 0 1-.006.12a12.1 12.1 0 0 1-1.873.892a.07.07 0 0 0-.039.098a14.047 14.047 0 0 0 1.294 2.1a.07.07 0 0 0 .084.028a19.89 19.89 0 0 0 6.002-3.03a.071.071 0 0 0 .03-.057c.533-4.564-.9-8.529-3.784-12.066a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.193 0 2.156.964 2.157 2.157c0 1.19-.963 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156c0-1.193.965-2.157 2.157-2.157c1.192 0 2.156.964 2.157 2.157c0 1.19-.965 2.156-2.157 2.156z" />
                  </svg>
                  <span>{t('loginWithDiscord')}</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-8 flex items-center"
          >
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-500">
              or
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <span>Access your purchases</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <span>Download license keys</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <span>Manage your account</span>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500"
          >
            <p>
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-12 text-center text-6xl opacity-20"
        >
          🐕
        </motion.div>
      </motion.div>
    </div>
  );
}
