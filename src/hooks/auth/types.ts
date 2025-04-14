
import type { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ needsOtp: boolean } | void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  loading: boolean;
  userRole: string | null;
}
