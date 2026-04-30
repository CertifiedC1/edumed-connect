-- Remove overly permissive public INSERT and DELETE policies on admin-uploads bucket
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public insert admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public delete admin-uploads" ON storage.objects;

-- Also try generic names that may have been used
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage'
    AND (cmd = 'INSERT' OR cmd = 'DELETE')
    AND qual = 'true' OR with_check = 'true'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Create authenticated-only INSERT policy for admin-uploads
CREATE POLICY "Authenticated can upload to admin-uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'admin-uploads');

-- Create authenticated-only DELETE policy for admin-uploads
CREATE POLICY "Authenticated can delete from admin-uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'admin-uploads');

-- Ensure public SELECT remains for serving images
CREATE POLICY "Public can read admin-uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'admin-uploads');