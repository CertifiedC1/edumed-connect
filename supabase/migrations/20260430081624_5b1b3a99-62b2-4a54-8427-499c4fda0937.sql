CREATE POLICY "Admin or secretary can delete pledges"
ON public.pledges
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'secretary'::app_role));