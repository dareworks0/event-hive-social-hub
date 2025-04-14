
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { 
  Plus, 
  Ticket, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  LineChart, 
  UserPlus, 
  Clock3, 
  Settings, 
  Bell, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('Organizer');
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalRevenue: 0,
    avgTicketPrice: 0
  });
  
  useEffect(() => {
    if (user) {
      const firstName = user.user_metadata?.first_name || '';
      setUsername(firstName || user.email?.split('@')[0] || 'Organizer');
      fetchOrganizerEvents();
    }
  }, [user]);
  
  const fetchOrganizerEvents = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user.id);
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setEvents(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching organizer events:', error);
      toast({
        title: "Failed to load events",
        description: "There was a problem loading your events.",
        variant: "destructive",
      });
    }
  };
  
  const calculateStats = (eventData: any[]) => {
    const totalEvents = eventData.length;
    let totalAttendees = 0;
    let totalRevenue = 0;
    
    // This is a placeholder. In a real app, you would fetch actual ticket data
    eventData.forEach(event => {
      const attendees = Math.floor(Math.random() * 100) + 50; // Placeholder
      const revenue = (event.price || 0) * attendees;
      
      totalAttendees += attendees;
      totalRevenue += revenue;
    });
    
    const avgTicketPrice = totalEvents > 0 
      ? Math.round((totalRevenue / totalAttendees) * 100) / 100 
      : 0;
    
    setStats({
      totalEvents,
      totalAttendees,
      totalRevenue,
      avgTicketPrice
    });
  };
  
  // Placeholder data for UI demonstration
  const ORGANIZER_EVENTS = events.length > 0 ? events : [
    {
      id: 'org1',
      title: 'Annual Tech Symposium',
      date: '2025-05-20',
      time: '10:00 AM - 6:00 PM',
      location: 'Tech Campus Auditorium',
      category: 'Technology',
      attendees: 450,
      ticketsSold: 320,
      revenue: 12800,
      status: 'active',
      image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    },
    {
      id: 'org2',
      title: 'Industry Networking Mixer',
      date: '2025-06-12',
      time: '7:00 PM - 10:00 PM',
      location: 'Downtown Business Lounge',
      category: 'Business',
      attendees: 120,
      ticketsSold: 98,
      revenue: 4900,
      status: 'active',
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    },
    {
      id: 'org3',
      title: 'Product Launch Conference',
      date: '2025-03-15',
      time: '1:00 PM - 5:00 PM',
      location: 'Grand Convention Center',
      category: 'Business',
      attendees: 280,
      ticketsSold: 280,
      revenue: 8400,
      status: 'completed',
      image_url: 'https://images.unsplash.com/photo-1475721027785-f74ec9c7cd5a?auto=format&fit=crop&q=80',
    },
  ];
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-eventhub-primary to-eventhub-secondary text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
                <p className="text-eventhub-primary-foreground">
                  Manage your events and monitor your success
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link to="/create">
                  <Button className="bg-white text-eventhub-primary hover:bg-gray-100">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{stats.totalEvents}</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{Math.floor(stats.totalEvents / 3)} this month
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock3 className="h-4 w-4 mr-1" />
                    <span>{Math.ceil(stats.totalEvents * 0.7)} Upcoming</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>{Math.floor(stats.totalEvents * 0.3)} Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Attendees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{stats.totalAttendees}</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{Math.floor(stats.totalAttendees * 0.15)}% this month
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span>+24% growth</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span>98% satisfaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% this month
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>${Math.floor(stats.totalRevenue * 0.2).toLocaleString()} pending</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    <span>{Math.floor(stats.totalAttendees * 0.8)} tickets sold</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Ticket Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${stats.avgTicketPrice.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% this month
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <LineChart className="h-4 w-4 mr-1" />
                    <span>$25-$50 range</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    <span>3 price tiers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Your Events</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Event</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Tickets Sold</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ORGANIZER_EVENTS.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden mr-3">
                            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p>{new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'long', day: 'numeric' 
                          })}</p>
                          <p className="text-sm text-gray-500">{event.time}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p>{event.ticketsSold} / {event.attendees}</p>
                          <p className="text-sm text-gray-500">
                            {Math.round((event.ticketsSold / event.attendees) * 100)}% sold
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium">${event.revenue?.toLocaleString() || 0}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Link to={`/event/${event.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          <Button variant="outline" size="sm" className="bg-gray-50">Edit</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">10 new tickets sold</h3>
                    <p className="text-sm text-gray-500">For Annual Tech Symposium</p>
                    <div className="text-xs text-gray-400 mt-1">Today, 9:30 AM</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">New question about Industry Networking Mixer</h3>
                    <p className="text-sm text-gray-500">"Will there be a dress code for the event?"</p>
                    <div className="text-xs text-gray-400 mt-1">Yesterday, 2:45 PM</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Annual Tech Symposium is 85% sold</h3>
                    <p className="text-sm text-gray-500">Only 50 tickets remaining</p>
                    <div className="text-xs text-gray-400 mt-1">2 days ago</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-eventhub-primary">
                  View All Activity
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Organizer Tools</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Attendees
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="h-4 w-4 mr-2" />
                  Manage Tickets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-1" />
                  Event Settings
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Our organizer support team is available to help you with any questions or issues.
                </p>
                <Button variant="default" size="sm" className="w-full bg-eventhub-primary">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerDashboard;
