-- Add icon_url column to skills table
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS icon_url text;
