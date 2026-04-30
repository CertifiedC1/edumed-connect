
-- Drop existing overly-permissive storage policies
DROP POLICY IF EXISTS "Authenticated can upload to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete from admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete from admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public read admin-uploads" ON storage.objects;

-- Re-create with admin-only restrictions
CREATE POLICY "Public read admin-uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admin can upload to admin-uploads"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'admin-uploads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update admin-uploads"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'admin-uploads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete from admin-uploads"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'admin-uploads' AND public.has_role(auth.uid(), 'admin'));
