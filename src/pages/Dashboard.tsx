
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import UserDashboardView from '@/components/dashboard/UserDashboardView';
import OrganizerDashboardView from '@/components/dashboard/OrganizerDashboardView';

const DashboardPage = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState('User');
  const [dashboardView, setDashboardView] = useState<'user' | 'organizer'>(
    searchParams.get('tab') === 'organizer' ? 'organizer' : 'user'
  );
  
  useEffect(() => {
    if (user) {
      const firstName = user.user_metadata?.first_name || '';
      setUsername(firstName || user.email?.split('@')[0] || 'User');
    }
  }, [user]);
  
  useEffect(() => {
    setSearchParams(dashboardView === 'organizer' ? { tab: 'organizer' } : {});
  }, [dashboardView, setSearchParams]);
  
  useEffect(() => {
    if (userRole === 'organizer' && dashboardView !== 'organizer') {
      setDashboardView('organizer');
    }
  }, [userRole, dashboardView]);
  
  const handleSwitchView = (view: 'user' | 'organizer') => {
    if (view === 'organizer' && userRole !== 'organizer') {
      toast({
        title: "Unauthorized",
        description: "You need an organizer account to access this view. Register as an organizer to create events.",
        variant: "destructive",
      });
      return;
    }
    
    setDashboardView(view);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-eventhub-primary to-eventhub-secondary text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
                <p className="text-eventhub-primary-foreground">
                  {dashboardView === 'organizer' 
                    ? 'Manage your events and monitor your success' 
                    : 'Here\'s what\'s happening with your events'}
                </p>
              </div>
              
              {userRole === 'organizer' && (
                <div className="mt-4 md:mt-0 bg-white/10 rounded-lg p-1">
                  <Button 
                    variant={dashboardView === 'user' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleSwitchView('user')}
                    className={dashboardView === 'user' ? 'bg-white text-eventhub-primary' : 'text-white hover:bg-white/20'}
                  >
                    Attendee View
                  </Button>
                  <Button 
                    variant={dashboardView === 'organizer' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleSwitchView('organizer')}
                    className={dashboardView === 'organizer' ? 'bg-white text-eventhub-primary' : 'text-white hover:bg-white/20'}
                  >
                    Organizer View
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {dashboardView === 'user' && <UserDashboardView />}
        {dashboardView === 'organizer' && <OrganizerDashboardView />}
      </div>
    </Layout>
  );
};

export default DashboardPage;
