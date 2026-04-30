-- Create the admin-uploads storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-uploads', 'admin-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read from the bucket (public)
CREATE POLICY "Public read access on admin uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'admin-uploads');

-- Allow anyone to upload (since admin auth is localStorage-based)
CREATE POLICY "Anyone can upload to admin uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'admin-uploads');

-- Allow anyone to delete from admin uploads
CREATE POLICY "Anyone can delete from admin uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'admin-uploads');