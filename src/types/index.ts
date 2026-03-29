export interface Product {
  id: string;
  name: string;
  name_en: string;
  name_ja: string;
  name_zh: string;
  name_zh_tw: string;
  name_ko: string;
  name_es: string;
  name_fr: string;
  name_de: string;
  description: string;
  description_en: string;
  description_ja: string;
  description_zh: string;
  description_zh_tw: string;
  description_ko: string;
  description_es: string;
  description_fr: string;
  description_de: string;
  price: number;
  category: Category;
  image_url: string;
  version: string;
  framework: Framework;
  features: string[];
  requirements: string[];
  is_free: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  download_count: number;
}

export type Category = 'esx' | 'qbcore' | 'standalone' | 'free' | 'premium';
export type Framework = 'ESX' | 'QBCore' | 'Standalone' | 'Both';

export interface User {
  id: string;
  discord_id: string;
  username: string;
  avatar_url?: string;
  email?: string;
  is_admin: boolean;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  license_key: string;
  is_active: boolean;
  created_at: string;
  product?: Product;
}

export interface LicenseValidation {
  valid: boolean;
  product_id?: string;
  message: string;
}
