'use client';

import { ReactNode, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: any;
}

const Providers = ({ children, locale, messages }: ProvidersProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default Providers;
