import { type Locale } from './i18n-config';
import { Product } from '@/types';

export function getLocalizedField(product: Product, field: 'name' | 'description', locale: string): string {
  const localeKey = locale.replace('-', '_');
  const key = `${field}_${localeKey}` as keyof Product;
  return (product[key] as string) || (product[`${field}_en` as keyof Product] as string) || product[field];
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
