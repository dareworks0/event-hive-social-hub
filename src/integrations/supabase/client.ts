
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://obgxqvevwkxdoglbjrpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZ3hxdmV2d2t4ZG9nbGJqcnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjAzNTgsImV4cCI6MjA1OTc5NjM1OH0.ASS6wstRqaP95O-ud9L00TFWkCD-DS28abGScjHA84I';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
