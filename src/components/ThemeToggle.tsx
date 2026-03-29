'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const t = useTranslations('nav');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const html = document.documentElement;
    const newDarkMode = !isDark;

    if (newDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setIsDark(newDarkMode);
  };

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-shiba-bg dark:hover:bg-gray-900 transition-colors">
        <Sun className="w-5 h-5 text-shiba-main dark:text-shiba-accent" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-shiba-bg dark:hover:bg-gray-900 transition-colors"
      title={isDark ? t('lightMode') : t('darkMode')}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-shiba-accent" />
      ) : (
        <Moon className="w-5 h-5 text-shiba-main" />
      )}
    </button>
  );
};

export default ThemeToggle;
