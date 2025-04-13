
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/ui/event-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, Users, Plus, Ticket, Calendar as CalendarIcon, MessageSquare, TrendingUp, BarChart3, DollarSign, LineChart, UserPlus, Clock3, Settings, Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Mock upcoming events
const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: 'May 15, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Silicon Valley Convention Center',
    category: 'Technology',
    attendees: 1250,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'International Food Fair',
    date: 'July 8-10, 2025',
    time: 'All Day',
    location: 'Downtown Food District',
    category: 'Food',
    attendees: 3200,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
  },
];

// Mock past events
const PAST_EVENTS = [
  {
    id: '7',
    title: 'Modern Art Exhibition',
    date: 'March 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'City Art Gallery',
    category: 'Art',
    attendees: 320,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    title: 'Jazz Night Downtown',
    date: 'February 22, 2025',
    time: '8:00 PM - 12:00 AM',
    location: 'Blue Note Jazz Club',
    category: 'Music',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
  },
];

// Mock recommended events
const RECOMMENDED_EVENTS = [
  {
    id: '2',
    title: 'Summer Music Festival',
    date: 'June 21, 2025',
    time: '12:00 PM - 11:00 PM',
    location: 'Central Park, New York',
    category: 'Music',
    attendees: 5000,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    date: 'August 5-6, 2025',
    time: '8:00 AM - 4:00 PM',
    location: 'Grand Hyatt Hotel',
    category: 'Business',
    attendees: 750,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
];

// Upcoming activity data
const UPCOMING_ACTIVITY = [
  {
    id: '1',
    title: 'Tech Conference Check-in Opens',
    date: 'May 15, 2025',
    time: '8:00 AM',
    type: 'check-in',
  },
  {
    id: '2',
    title: 'Food Fair Early Access',
    date: 'July 8, 2025',
    time: '9:00 AM',
    type: 'ticket',
  },
  {
    id: '3',
    title: 'New message in Tech Conference chat',
    date: 'May 10, 2025',
    time: '2:30 PM',
    type: 'message',
  },
];

// Mock organizer events
const ORGANIZER_EVENTS = [
  {
    id: 'org1',
    title: 'Annual Tech Symposium',
    date: 'May 20, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Tech Campus Auditorium',
    category: 'Technology',
    attendees: 450,
    ticketsSold: 320,
    revenue: 12800,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
  },
  {
    id: 'org2',
    title: 'Industry Networking Mixer',
    date: 'June 12, 2025',
    time: '7:00 PM - 10:00 PM',
    location: 'Downtown Business Lounge',
    category: 'Business',
    attendees: 120,
    ticketsSold: 98,
    revenue: 4900,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
  },
  {
    id: 'org3',
    title: 'Product Launch Conference',
    date: 'March 15, 2025',
    time: '1:00 PM - 5:00 PM',
    location: 'Grand Convention Center',
    category: 'Business',
    attendees: 280,
    ticketsSold: 280,
    revenue: 8400,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1475721027785-f74ec9c7cd5a?auto=format&fit=crop&q=80',
  },
];

const DashboardPage = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState('User');
  const [eventsCount, setEventsCount] = useState({ upcoming: 2, past: 5 });
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
    // Update URL when tab changes
    setSearchParams(dashboardView === 'organizer' ? { tab: 'organizer' } : {});
  }, [dashboardView, setSearchParams]);
  
  // Switch to organizer view if user role is organizer
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
        {/* Dashboard Header */}
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
              
              {/* View switcher */}
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
        
        {/* User Dashboard Content */}
        {dashboardView === 'user' && (
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Events */}
              <div className="lg:col-span-2 space-y-8">
                {/* Your Events Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Events</h2>
                    <Link to="/explore">
                      <Button className="bg-eventhub-primary hover:bg-eventhub-secondary text-white">
                        <Ticket className="h-4 w-4 mr-2" />
                        Find Events
                      </Button>
                    </Link>
                  </div>
                  
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-6">
                      <TabsTrigger value="upcoming">
                        Upcoming ({eventsCount.upcoming})
                      </TabsTrigger>
                      <TabsTrigger value="past">
                        Past ({eventsCount.past})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming" className="animate-fade-in">
                      {UPCOMING_EVENTS.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {UPCOMING_EVENTS.map((event) => (
                            <EventCard
                              key={event.id}
                              id={event.id}
                              title={event.title}
                              date={event.date}
                              time={event.time}
                              location={event.location}
                              category={event.category}
                              attendees={event.attendees}
                              image={event.image}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">You don't have any upcoming events.</p>
                          <Link to="/explore">
                            <Button variant="outline" className="mt-4">
                              Explore Events
                            </Button>
                          </Link>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="past" className="animate-fade-in">
                      {PAST_EVENTS.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {PAST_EVENTS.map((event) => (
                            <EventCard
                              key={event.id}
                              id={event.id}
                              title={event.title}
                              date={event.date}
                              time={event.time}
                              location={event.location}
                              category={event.category}
                              attendees={event.attendees}
                              image={event.image}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">You don't have any past events.</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Recommended Events */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Recommended For You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {RECOMMENDED_EVENTS.map((event) => (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        date={event.date}
                        time={event.time}
                        location={event.location}
                        category={event.category}
                        attendees={event.attendees}
                        image={event.image}
                      />
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/explore">
                      <Button variant="outline">View More Recommendations</Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* User Stats */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="font-bold text-2xl text-eventhub-primary">{eventsCount.upcoming + eventsCount.past}</div>
                      <div className="text-sm text-gray-500">Total Events</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="font-bold text-2xl text-eventhub-primary">4</div>
                      <div className="text-sm text-gray-500">Categories</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="font-bold text-2xl text-eventhub-primary">12</div>
                      <div className="text-sm text-gray-500">Connections</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="font-bold text-2xl text-eventhub-primary">3</div>
                      <div className="text-sm text-gray-500">Reviews</div>
                    </div>
                  </div>
                </div>
                
                {/* Upcoming Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Activity</h2>
                  <div className="space-y-4">
                    {UPCOMING_ACTIVITY.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 rounded-full bg-eventhub-primary/10 text-eventhub-primary">
                          {activity.type === 'check-in' && <Calendar className="h-5 w-5" />}
                          {activity.type === 'ticket' && <Ticket className="h-5 w-5" />}
                          {activity.type === 'message' && <MessageSquare className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{activity.date} • {activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Ticket className="h-4 w-4 mr-2" />
                      View My Tickets
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Event Chats
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Invite Friends
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Organizer Dashboard Content */}
        {dashboardView === 'organizer' && (
          <div className="container mx-auto py-8 px-4">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{ORGANIZER_EVENTS.length}</span>
                    <span className="ml-2 text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3 this month
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock3 className="h-4 w-4 mr-1" />
                      <span>2 Upcoming</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span>1 Completed</span>
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
                    <span className="text-3xl font-bold">850</span>
                    <span className="ml-2 text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +120 this month
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <UserPlus className="h-4 w-4 mr-1" />
                      <span>+24% growth</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
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
                    <span className="text-3xl font-bold">$26,100</span>
                    <span className="ml-2 text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15% this month
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>$4,900 pending</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      <span>698 tickets sold</span>
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
                    <span className="text-3xl font-bold">$37.40</span>
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
            
            {/* Create Event Button */}
            <div className="flex justify-end mb-6">
              <Link to="/create">
                <Button className="bg-eventhub-primary hover:bg-eventhub-secondary transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </Link>
            </div>
            
            {/* Your Events */}
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
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p>{event.date}</p>
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
                          <p className="font-medium">${event.revenue.toLocaleString()}</p>
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
            
            {/* Bottom Section: Recent Activity and Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
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
              
              {/* Quick Links */}
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
                    <Settings className="h-4 w-4 mr-2" />
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
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
