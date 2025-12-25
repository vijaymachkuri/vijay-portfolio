-- RUN THIS IN SUPABASE SQL EDITOR TO FIX THE ERROR
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());
