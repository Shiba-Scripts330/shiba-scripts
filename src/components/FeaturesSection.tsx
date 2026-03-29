'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Star, Headset, RefreshCw } from 'lucide-react';

const FeaturesSection = () => {
  const t = useTranslations('home.features');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Shield,
      title: t('secure.title'),
      desc: t('secure.desc'),
    },
    {
      icon: Star,
      title: t('quality.title'),
      desc: t('quality.desc'),
    },
    {
      icon: Headset,
      title: t('support.title'),
      desc: t('support.desc'),
    },
    {
      icon: RefreshCw,
      title: t('updates.title'),
      desc: t('updates.desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-4">
            {t('title')}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-shiba-main to-shiba-accent mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-shiba-bg dark:bg-gray-900 p-8 rounded-lg text-center group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 bg-shiba-main/10 dark:bg-shiba-main/20 rounded-full group-hover:bg-shiba-main dark:group-hover:bg-shiba-accent transition-colors duration-300">
                  <Icon className="w-8 h-8 text-shiba-main dark:text-shiba-accent group-hover:text-white dark:group-hover:text-shiba-black transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-shiba-black dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
