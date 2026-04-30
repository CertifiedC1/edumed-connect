
-- News Articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Milestone',
  excerpt TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete articles" ON public.articles FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated can update articles" ON public.articles FOR UPDATE TO authenticated USING (true);

-- Alumni Stories
CREATE TABLE public.alumni_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  school TEXT,
  story TEXT,
  quote TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.alumni_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read alumni stories" ON public.alumni_stories FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert alumni" ON public.alumni_stories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete alumni" ON public.alumni_stories FOR DELETE TO authenticated USING (true);

-- Donations
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  email TEXT,
  amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'KES',
  purpose TEXT,
  method TEXT NOT NULL DEFAULT 'Manual Entry',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read donations" ON public.donations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can insert donations" ON public.donations FOR INSERT WITH CHECK (true);

-- Partners
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  partnership_type TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert partners" ON public.partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read partners" ON public.partners FOR SELECT TO authenticated USING (true);

-- Gallery Images
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert gallery" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete gallery" ON public.gallery_images FOR DELETE TO authenticated USING (true);

-- Contact Messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read contact" ON public.contact_messages FOR SELECT TO authenticated USING (true);

-- Events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage events" ON public.events FOR ALL TO authenticated USING (true);
