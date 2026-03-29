'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-intl/navigation';
import { useTranslations } from 'next-intl';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('auth');

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🐕</div>
          <p className="text-gray-600 dark:text-gray-400">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-2xl font-bold text-shiba-black dark:text-white mb-2">
            {t('unauthorized')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to access this page.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="bg-shiba-main hover:bg-shiba-accent text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
