-- Enable RLS on all data tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Create public read policies (these are reference data tables)
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read cities" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Allow public read countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Allow public read customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public read employees" ON public.employees FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read sales" ON public.sales FOR SELECT USING (true);