'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const StatsSection = () => {
  const t = useTranslations('home.stats');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [stats, setStats] = useState({
    scripts: 0,
    customers: 0,
    servers: 0,
    rating: 0,
  });

  const targetStats = {
    scripts: 150,
    customers: 5000,
    servers: 10000,
    rating: 4.9,
  };

  // Counter animation
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        scripts: Math.floor(targetStats.scripts * progress),
        customers: Math.floor(targetStats.customers * progress),
        servers: Math.floor(targetStats.servers * progress),
        rating: Math.round(targetStats.rating * progress * 10) / 10,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView]);

  const statItems = [
    {
      label: t('scripts'),
      value: `${stats.scripts}+`,
      icon: '📦',
    },
    {
      label: t('customers'),
      value: `${stats.customers}+`,
      icon: '👥',
    },
    {
      label: t('servers'),
      value: `${stats.servers}+`,
      icon: '🖥️',
    },
    {
      label: t('support'),
      value: `${stats.rating}★`,
      icon: '⭐',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-shiba-main to-shiba-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 text-9xl opacity-10">🐕</div>
      <div className="absolute bottom-0 left-0 text-9xl opacity-10">🐕</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center text-white"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono">
                {stat.value}
              </div>
              <p className="text-lg opacity-90 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
