-- ==========================================
-- Shiba Scripts - Supabase Database Schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Users Table
-- ==========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discord_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  avatar_url TEXT,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_discord_id ON users(discord_id);

-- ==========================================
-- Products Table
-- ==========================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  -- Localized names
  name_en TEXT NOT NULL,
  name_ja TEXT,
  name_zh TEXT,
  name_zh_tw TEXT,
  name_ko TEXT,
  name_es TEXT,
  name_fr TEXT,
  name_de TEXT,
  -- Localized descriptions
  description TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ja TEXT,
  description_zh TEXT,
  description_zh_tw TEXT,
  description_ko TEXT,
  description_es TEXT,
  description_fr TEXT,
  description_de TEXT,
  -- Product info
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN ('esx', 'qbcore', 'standalone', 'free', 'premium')),
  framework TEXT NOT NULL CHECK (framework IN ('ESX', 'QBCore', 'Standalone', 'Both')),
  image_url TEXT,
  version TEXT DEFAULT '1.0.0',
  features JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '[]',
  is_free BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  file_path TEXT, -- Path in Supabase Storage
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_featured ON products(is_featured);

-- ==========================================
-- Purchases Table
-- ==========================================
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  license_key TEXT UNIQUE NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_product_id ON purchases(product_id);
CREATE INDEX idx_purchases_license_key ON purchases(license_key);
CREATE UNIQUE INDEX idx_purchases_unique ON purchases(user_id, product_id);

-- ==========================================
-- Helper Functions
-- ==========================================

-- Increment download count
CREATE OR REPLACE FUNCTION increment_download_count(pid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE products SET download_count = download_count + 1 WHERE id = pid;
END;
$$ LANGUAGE plpgsql;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (true);

-- Products: only service role can insert/update/delete
CREATE POLICY "Products are manageable by service role"
  ON products FOR ALL USING (auth.role() = 'service_role');

-- Users: users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT USING (true);

-- Purchases: users can read their own purchases
CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE discord_id = auth.jwt() ->> 'discord_id')
  );

-- Allow service role full access
CREATE POLICY "Service role has full access to users"
  ON users FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to purchases"
  ON purchases FOR ALL USING (auth.role() = 'service_role');

-- ==========================================
-- Sample Data (Optional)
-- ==========================================

-- You can run this to seed some initial products:
/*
INSERT INTO products (name, name_en, name_ja, price, category, framework, description, description_en, description_ja, is_featured, features, requirements)
VALUES
  ('Advanced Garage', 'Advanced Garage System', '高機能ガレージシステム', 19.99, 'esx', 'ESX',
   'A fully featured garage system', 'A fully featured garage system with custom UI and vehicle management.',
   'カスタムUIと車両管理機能を備えた高機能ガレージシステム。', true,
   '["Custom UI", "Multi-garage support", "Vehicle damage tracking", "Impound system"]',
   '["ESX Legacy", "oxmysql", "ox_lib"]'),

  ('Banking System', 'Banking System Pro', '銀行システムPro', 24.99, 'qbcore', 'QBCore',
   'Complete banking system', 'Complete banking system with ATM, transfers, and transaction history.',
   'ATM、送金、取引履歴を備えた完全な銀行システム。', true,
   '["ATM support", "Player transfers", "Transaction history", "Admin panel"]',
   '["QBCore", "oxmysql"]');
*/
