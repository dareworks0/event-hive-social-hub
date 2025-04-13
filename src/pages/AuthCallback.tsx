
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const { toast } = useToast();

  useEffect(() => {
    const { hash } = window.location;
    
    const handleAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (session) {
          // If role is specified in URL, add user role to database
          if (role && (role === 'user' || role === 'organizer')) {
            try {
              // Check if role already exists
              const { data: existingRole } = await supabase
                .from('user_roles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
              
              if (!existingRole) {
                // Add role if it doesn't exist
                await supabase.from('user_roles').insert({
                  user_id: session.user.id,
                  role: role
                });
                
                toast({
                  title: "Account created successfully",
                  description: `You are now registered as a${role === 'organizer' ? 'n organizer' : ' user'}.`,
                });
              }
            } catch (error) {
              console.error("Error setting user role:", error);
            }
          }
          
          // Redirect to appropriate dashboard based on role
          if (role === 'organizer') {
            navigate('/dashboard?tab=organizer');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast({
          title: "Authentication failed",
          description: "There was a problem with the authentication process.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };
    
    if (hash || window.location.search.includes('code=')) {
      handleAuth();
    }
  }, [navigate, role, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eventhub-primary/10 to-eventhub-secondary/10">
      <div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-md animate-pulse">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-eventhub-primary/30 mb-6 animate-spin"></div>
          <h2 className="text-2xl font-bold mb-4">Completing authentication...</h2>
          <p className="text-gray-600">Please wait while we verify your credentials.</p>
          <div className="mt-8 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-eventhub-primary animate-progress rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
