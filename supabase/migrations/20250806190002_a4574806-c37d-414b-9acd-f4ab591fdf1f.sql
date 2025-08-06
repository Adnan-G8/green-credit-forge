-- Fix security warnings by setting proper search_path for functions

-- Recreate the generate_alphag8_id function with proper security
CREATE OR REPLACE FUNCTION generate_alphag8_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  random_part TEXT;
BEGIN
  -- Generate random 8-character alphanumeric string
  random_part := UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
  RETURN 'FAGRI-' || random_part;
END;
$$;

-- Recreate the update_updated_at_column function with proper security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;