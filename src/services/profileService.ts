
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id!);
    
  if (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
  
  return true;
};

export const syncUserProfileWithAuth = async (user: User): Promise<void> => {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (!existingProfile) {
    // Create profile if it doesn't exist
    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      first_name: user.user_metadata?.first_name,
      last_name: user.user_metadata?.last_name,
    });
  } else if (!existingProfile.email) {
    // Update profile with email if missing
    await supabase.from('profiles').update({
      email: user.email,
    }).eq('id', user.id);
  }
};
