-- Adds rating column to testimonials if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'testimonials' 
      AND column_name = 'rating'
  ) THEN
    ALTER TABLE public.testimonials
      ADD COLUMN rating integer CHECK (rating BETWEEN 1 AND 5);
  END IF;
END $$;
