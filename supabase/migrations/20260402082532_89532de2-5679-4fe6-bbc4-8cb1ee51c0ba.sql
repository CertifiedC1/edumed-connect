-- ========================================
-- 1. Fix storage bucket: remove public INSERT/DELETE
-- ========================================
DROP POLICY IF EXISTS "Anyone can delete from admin uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to admin uploads" ON storage.objects;

-- Clean up duplicate authenticated policies
DROP POLICY IF EXISTS "Authenticated can delete uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view admin uploads" ON storage.objects;

-- Keep only these clean policies:
-- "Authenticated can upload to admin-uploads" (INSERT)
-- "Authenticated can delete from admin-uploads" (DELETE)  
-- "Public can read admin-uploads" (SELECT)
-- (these already exist from prior migration)

-- ========================================
-- 2. Create user_roles table
-- ========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'secretary', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ========================================
-- 3. Tighten RLS on admin-managed tables
-- ========================================

-- articles: only admin can insert/update/delete
DROP POLICY IF EXISTS "Authenticated can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated can update articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated can delete articles" ON public.articles;

CREATE POLICY "Admin can insert articles" ON public.articles
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update articles" ON public.articles
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete articles" ON public.articles
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- alumni_stories: only admin can insert/delete
DROP POLICY IF EXISTS "Authenticated can insert alumni" ON public.alumni_stories;
DROP POLICY IF EXISTS "Authenticated can delete alumni" ON public.alumni_stories;

CREATE POLICY "Admin can insert alumni" ON public.alumni_stories
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete alumni" ON public.alumni_stories
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- gallery_images: only admin can insert/delete
DROP POLICY IF EXISTS "Authenticated can insert gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Authenticated can delete gallery" ON public.gallery_images;

CREATE POLICY "Admin can insert gallery" ON public.gallery_images
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete gallery" ON public.gallery_images
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- events: replace blanket ALL with role-based
DROP POLICY IF EXISTS "Authenticated can manage events" ON public.events;

CREATE POLICY "Admin can insert events" ON public.events
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update events" ON public.events
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete events" ON public.events
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- donations: admin/secretary can read
DROP POLICY IF EXISTS "Authenticated can read donations" ON public.donations;

CREATE POLICY "Admin or secretary can read donations" ON public.donations
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'));

-- contact_messages: admin/secretary can read
DROP POLICY IF EXISTS "Authenticated can read contact" ON public.contact_messages;

CREATE POLICY "Admin or secretary can read contacts" ON public.contact_messages
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'));

-- partners: admin/secretary can read
DROP POLICY IF EXISTS "Authenticated can read partners" ON public.partners;

CREATE POLICY "Admin or secretary can read partners" ON public.partners
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'));

-- pledges: admin/secretary can read/update
DROP POLICY IF EXISTS "Authenticated can read pledges" ON public.pledges;
DROP POLICY IF EXISTS "Authenticated can update pledges" ON public.pledges;

CREATE POLICY "Admin or secretary can read pledges" ON public.pledges
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'));

CREATE POLICY "Admin or secretary can update pledges" ON public.pledges
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'secretary'));

-- Also tighten storage to admin role only
DROP POLICY IF EXISTS "Authenticated can upload to admin-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete from admin-uploads" ON storage.objects;

CREATE POLICY "Admin can upload to admin-uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'admin-uploads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete from admin-uploads" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'admin-uploads' AND public.has_role(auth.uid(), 'admin'));