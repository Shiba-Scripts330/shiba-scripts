'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const t = useTranslations('home.hero');
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-shiba-bg to-white dark:from-shiba-black dark:via-gray-900 dark:to-shiba-black pt-20 pb-24">
      {/* Decorative Elements */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 right-10 text-6xl opacity-20"
      >
        🐕
      </motion.div>
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-10 text-5xl opacity-20"
      >
        🐕
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-shiba-main/10 dark:bg-shiba-main/20 px-4 py-2 rounded-full border border-shiba-main/30">
              <span className="text-sm font-semibold text-shiba-main dark:text-shiba-accent">
                ⭐ Premium Quality Scripts
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-shiba-black dark:text-white mb-6 leading-tight"
          >
            {t('title')}
            <span className="block bg-gradient-to-r from-shiba-main via-shiba-accent to-shiba-main bg-clip-text text-transparent">
              for FiveM
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => router.push('/scripts')}
              className="group relative px-8 py-4 bg-gradient-to-r from-shiba-main to-shiba-accent text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <span className="relative z-10">{t('cta')}</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-shiba-accent to-shiba-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => router.push('/docs')}
              className="px-8 py-4 border-2 border-shiba-main text-shiba-main dark:text-shiba-accent dark:border-shiba-accent hover:bg-shiba-main hover:text-white dark:hover:bg-shiba-accent dark:hover:text-shiba-black font-bold rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <span>{t('secondary')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-shiba-main dark:text-shiba-accent">150+</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Scripts</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-shiba-main dark:text-shiba-accent">5K+</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Customers</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-shiba-main dark:text-shiba-accent">10K+</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Servers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
