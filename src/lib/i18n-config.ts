export const locales = ['en', 'ja', 'zh', 'zh-TW', 'ko', 'es', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const localeCurrencies: Record<Locale, string> = {
  en: 'USD',
  ja: 'JPY',
  zh: 'CNY',
  'zh-TW': 'USD',
  ko: 'KRW',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
};

export function formatCurrency(amount: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2,
  }).format(amount);
}
