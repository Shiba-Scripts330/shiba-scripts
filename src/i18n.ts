import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './lib/i18n-config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return { messages: {} };
  }

  return {
    messages: (await import(`../public/locales/${locale}/common.json`)).default,
  };
});
