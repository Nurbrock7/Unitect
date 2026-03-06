-- CABMAN Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quote Requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity TEXT DEFAULT '',
  message TEXT DEFAULT '',
  file_url TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quote_requests(status, created_at DESC);

-- Disable RLS for simplicity (enable and add policies when going to production)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and products
CREATE POLICY "Public can read active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);

-- Public can submit quote requests
CREATE POLICY "Public can insert quotes" ON quote_requests FOR INSERT WITH CHECK (true);

-- Allow all operations for authenticated service role (admin actions use service key)
-- For demo: allow everything via anon key too
CREATE POLICY "Allow all for categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for quotes" ON quote_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for admins" ON admins FOR ALL USING (true) WITH CHECK (true);
