
import { useState, useEffect, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { syncUserProfileWithAuth } from '@/services/profileService';
import { AuthContext } from './AuthContext';
import { fetchUserRole } from './authUtils';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // If user is logged in, fetch their role and sync profile
        if (newSession?.user) {
          setTimeout(async () => {
            const role = await fetchUserRole(newSession.user.id);
            setUserRole(role);
            await syncUserProfileWithAuth(newSession.user);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const role = await fetchUserRole(currentSession.user.id);
        setUserRole(role);
        await syncUserProfileWithAuth(currentSession.user);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Step 1: Sign in with OTP
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            password // We need to store this temporarily for validation
          }
        }
      });
      
      if (error) {
        toast({
          title: "Error sending verification code",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // If no error, OTP has been sent
      toast({
        title: "Verification code sent",
        description: "Please check your email for the verification code.",
      });
      return { needsOtp: true };
      
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      setLoading(true);
      
      // Verify the OTP code
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });
      
      if (error) {
        toast({
          title: "Error verifying code",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
    } catch (error: any) {
      console.error('Error verifying OTP:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing in with Google",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in with Google:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: string) => {
    try {
      setLoading(true);
      
      // Step 1: Sign up with OTP (no password verification initially)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role, // Add role to user metadata
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?role=${role}`,
        },
      });
      
      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Verification code sent",
        description: "We've sent you a verification code to complete your sign up.",
      });
      
      return { needsOtp: true };
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signInWithGoogle, 
      signUp, 
      signOut,
      verifyOtp,
      loading,
      userRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}
