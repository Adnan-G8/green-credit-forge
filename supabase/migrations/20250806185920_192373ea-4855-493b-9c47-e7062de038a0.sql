-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  alphag8_id TEXT UNIQUE NOT NULL,
  display_name TEXT,
  user_role TEXT DEFAULT 'fagri-member',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to generate AlphaG8 ID
CREATE OR REPLACE FUNCTION generate_alphag8_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  random_part TEXT;
BEGIN
  -- Generate random 8-character alphanumeric string
  random_part := UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
  RETURN 'FAGRI-' || random_part;
END;
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, alphag8_id, display_name, user_role)
  VALUES (
    new.id,
    generate_alphag8_id(),
    COALESCE(new.raw_user_meta_data ->> 'display_name', 'FAGRI Member'),
    COALESCE(new.raw_user_meta_data ->> 'user_role', 'fagri-member')
  );
  RETURN new;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();