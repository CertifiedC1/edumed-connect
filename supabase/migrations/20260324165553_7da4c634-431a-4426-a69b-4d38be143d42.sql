-- Create pledges table
CREATE TABLE public.pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  pledge_type text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  duration integer,
  reminder_method text NOT NULL DEFAULT 'email',
  start_date timestamp with time zone DEFAULT now(),
  next_reminder_date timestamp with time zone DEFAULT (now() + interval '30 days'),
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pledges" ON public.pledges FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated can read pledges" ON public.pledges FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update pledges" ON public.pledges FOR UPDATE TO authenticated USING (true);

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

CREATE POLICY "Anyone can view admin uploads" ON storage.objects FOR SELECT TO public USING (bucket_id = 'admin-uploads');
CREATE POLICY "Authenticated can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'admin-uploads');
CREATE POLICY "Authenticated can delete uploads" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'admin-uploads');