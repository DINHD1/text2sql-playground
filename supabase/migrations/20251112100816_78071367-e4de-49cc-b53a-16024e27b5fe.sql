-- Create tables for grocery sales database

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL,
  description TEXT
);

-- Countries table
CREATE TABLE IF NOT EXISTS public.countries (
  id SERIAL PRIMARY KEY,
  country_name TEXT NOT NULL,
  code TEXT
);

-- Cities table
CREATE TABLE IF NOT EXISTS public.cities (
  id SERIAL PRIMARY KEY,
  city_name TEXT NOT NULL,
  country_id INTEGER REFERENCES public.countries(id)
);

-- Customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city_id INTEGER REFERENCES public.cities(id)
);

-- Employees table
CREATE TABLE IF NOT EXISTS public.employees (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  hire_date DATE DEFAULT CURRENT_DATE
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  product_name TEXT NOT NULL,
  category_id INTEGER REFERENCES public.categories(id),
  unit_price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 0
);

-- Sales table
CREATE TABLE IF NOT EXISTS public.sales (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES public.products(id),
  customer_id INTEGER REFERENCES public.customers(id),
  salesperson_id INTEGER REFERENCES public.employees(id),
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  sale_date TIMESTAMP DEFAULT NOW()
);

-- Query history table (to store user queries)
CREATE TABLE IF NOT EXISTS public.query_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT NOW(),
  question TEXT NOT NULL,
  model TEXT NOT NULL,
  generated_sql TEXT NOT NULL,
  status TEXT DEFAULT 'success',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on query_history
ALTER TABLE public.query_history ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert and read query history (public app)
CREATE POLICY "Allow public read query_history" 
  ON public.query_history 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert query_history" 
  ON public.query_history 
  FOR INSERT 
  WITH CHECK (true);

-- Insert sample data
INSERT INTO public.categories (category_name, description) VALUES
  ('Electronics', 'Electronic devices and accessories'),
  ('Food', 'Food and beverages'),
  ('Clothing', 'Apparel and fashion');

INSERT INTO public.countries (country_name, code) VALUES
  ('Vietnam', 'VN'),
  ('USA', 'US');

INSERT INTO public.cities (city_name, country_id) VALUES
  ('Hanoi', 1),
  ('Ho Chi Minh', 1),
  ('New York', 2);

INSERT INTO public.customers (customer_name, email, city_id) VALUES
  ('Nguyen Van A', 'nguyenvana@example.com', 1),
  ('Tran Thi B', 'tranthib@example.com', 2);

INSERT INTO public.employees (first_name, last_name, email) VALUES
  ('John', 'Doe', 'john@example.com'),
  ('Jane', 'Smith', 'jane@example.com');

INSERT INTO public.products (product_name, category_id, unit_price, stock_quantity) VALUES
  ('Laptop Pro', 1, 1250.00, 50),
  ('Smartphone X', 1, 980.00, 100),
  ('Tablet Ultra', 1, 765.00, 75),
  ('Smartwatch', 1, 542.00, 120),
  ('Headphones', 1, 431.00, 200);

INSERT INTO public.sales (product_id, customer_id, salesperson_id, quantity, total_price) VALUES
  (1, 1, 1, 100, 125000.00),
  (2, 2, 2, 100, 98000.00),
  (3, 1, 1, 100, 76500.00),
  (4, 2, 2, 100, 54200.00),
  (5, 1, 1, 100, 43100.00);