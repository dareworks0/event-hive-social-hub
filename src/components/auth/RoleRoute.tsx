
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface RoleRouteProps {
  children: ReactNode;
  requiredRole: "host_organizer" | "admin" | "user" | "sub_organizer";
}

const RoleRoute = ({ children, requiredRole }: RoleRouteProps) => {
  const { user, loading, userRole } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your access.</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but doesn't have the required role
  if (userRole !== requiredRole) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page.",
      variant: "destructive",
    });
    
    return <Navigate to="/dashboard" replace />;
  }

  // User has the required role
  return <>{children}</>;
};

export default RoleRoute;
