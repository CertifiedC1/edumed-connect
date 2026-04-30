-- Fix storage policies: allow any authenticated user to upload (admin check is done in app)
-- First drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Authenticated can upload to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete from admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete from admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public read access to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read admin-uploads" ON storage.objects;

-- Public read
CREATE POLICY "Public read admin-uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

-- Authenticated users can upload
CREATE POLICY "Auth users upload admin-uploads" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'admin-uploads');

-- Authenticated users can update
CREATE POLICY "Auth users update admin-uploads" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'admin-uploads');

-- Authenticated users can delete
CREATE POLICY "Auth users delete admin-uploads" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'admin-uploads');
