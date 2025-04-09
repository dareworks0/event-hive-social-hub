
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/ui/event-card';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, Users, Plus, Ticket, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';

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

const DashboardPage = () => {
  const [username, setUsername] = useState('Alex');
  const [eventsCount, setEventsCount] = useState({ upcoming: 2, past: 5 });
  
  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      console.log('User data loaded');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Header */}
        <div className="bg-eventhub-primary text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {username}!</h1>
            <p className="text-eventhub-primary-foreground">Here's what's happening with your events</p>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Events */}
            <div className="lg:col-span-2 space-y-8">
              {/* Your Events Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Events</h2>
                  <Link to="/create">
                    <Button className="bg-eventhub-primary hover:bg-eventhub-secondary text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
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
      </div>
    </Layout>
  );
};

export default DashboardPage;
