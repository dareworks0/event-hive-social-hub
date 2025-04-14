
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const fetchUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
    
    return data?.role || null;
  } catch (error) {
    console.error('Error in fetchUserRole:', error);
    return null;
  }
};
