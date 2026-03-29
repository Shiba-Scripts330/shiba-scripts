'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function SupportPage() {
  const t = useTranslations('support');
  const tFaq = useTranslations('support.faq');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: tFaq('q1'),
      answer: tFaq('a1'),
    },
    {
      id: '2',
      question: tFaq('q2'),
      answer: tFaq('a2'),
    },
    {
      id: '3',
      question: tFaq('q3'),
      answer: tFaq('a3'),
    },
    {
      id: '4',
      question: tFaq('q4'),
      answer: tFaq('a4'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
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

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </motion.div>

        {/* Discord Section */}
        <motion.section
          variants={itemVariants}
          className="mb-16 bg-gradient-to-r from-[#5865F2] to-[#4752C4] rounded-2xl p-8 md:p-12 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <MessageCircle className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">
                {t('discord.title')}
              </h2>
              <p className="text-white/80 mb-6">
                {t('discord.desc')}
              </p>
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#5865F2] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.397-.875-.61-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.15 10.15 0 0 0 .372-.294a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.294a.072.072 0 0 1-.006.12a12.1 12.1 0 0 1-1.873.892a.07.07 0 0 0-.039.098a14.047 14.047 0 0 0 1.294 2.1a.07.07 0 0 0 .084.028a19.89 19.89 0 0 0 6.002-3.03a.071.071 0 0 0 .03-.057c.533-4.564-.9-8.529-3.784-12.066a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.193 0 2.156.964 2.157 2.157c0 1.19-.963 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156c0-1.193.965-2.157 2.157-2.157c1.192 0 2.156.964 2.157 2.157c0 1.19-.965 2.156-2.157 2.156z" />
                </svg>
                <span>{t('discord.btn')}</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-shiba-black dark:text-white mb-2">
            {t('faq.title')}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full mb-8"></div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="text-left font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === item.id ? (
                      <ChevronUp className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
                    )}
                  </div>
                </button>

                {expandedFaq === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          variants={itemVariants}
          className="bg-gradient-to-br from-shiba-bg dark:from-gray-900 to-white dark:to-gray-800 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-shiba-black dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Contact us directly on Discord for immediate assistance. Our support
            team is available 24/7 to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-shiba-main hover:bg-shiba-accent text-white font-bold rounded-lg transition-colors">
              Join Discord Server
            </button>
            <button className="px-8 py-3 border-2 border-shiba-main text-shiba-main dark:text-shiba-accent dark:border-shiba-accent hover:bg-shiba-main hover:text-white dark:hover:bg-shiba-accent dark:hover:text-shiba-black font-bold rounded-lg transition-colors">
              Email Support
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
