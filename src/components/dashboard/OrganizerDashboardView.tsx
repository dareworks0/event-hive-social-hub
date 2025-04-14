
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Bell, ChevronRight, CheckCircle2, Clock3, DollarSign, LineChart, MapPin, MessageSquare, Plus, Settings, TrendingUp, Ticket, Users, UserPlus } from 'lucide-react';

// Sample data that would normally come from a backend
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

const OrganizerMetricCards = () => {
  return (
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
  );
};

const EventsTable = () => {
  return (
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
  );
};

const OrganizerActivitySection = () => {
  return (
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
  );
};

const OrganizerToolsSection = () => {
  return (
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
  );
};

const OrganizerDashboardView = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <OrganizerMetricCards />
      
      <div className="flex justify-end mb-6">
        <Link to="/create">
          <Button className="bg-eventhub-primary hover:bg-eventhub-secondary transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </Link>
      </div>
      
      <EventsTable />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrganizerActivitySection />
        <OrganizerToolsSection />
      </div>
    </div>
  );
};

export default OrganizerDashboardView;
