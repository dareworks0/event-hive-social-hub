
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EventCard } from '@/components/ui/event-card';
import { CategoryCard } from '@/components/ui/category-card';
import Layout from '@/components/layout/Layout';
import { 
  Search, 
  Music, 
  Code, 
  Utensils, 
  Landmark, 
  Dumbbell, 
  GraduationCap, 
  Briefcase, 
  Plane 
} from 'lucide-react';

// Mock data for featured events
const FEATURED_EVENTS = [
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
    id: '3',
    title: 'International Food Fair',
    date: 'July 8-10, 2025',
    time: 'All Day',
    location: 'Downtown Food District',
    category: 'Food',
    attendees: 3200,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
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

// Mock data for upcoming events
const UPCOMING_EVENTS = [
  {
    id: '5',
    title: 'Web3 Developers Meetup',
    date: 'June 10, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'Tech Hub Downtown',
    category: 'Technology',
    attendees: 85,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'City Marathon 2025',
    date: 'July 1, 2025',
    time: '7:00 AM',
    location: 'City Center',
    category: 'Sports',
    attendees: 2500,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    title: 'Art Gallery Exhibition',
    date: 'July 15-30, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Modern Art Museum',
    category: 'Art',
    attendees: 450,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    title: 'Global Marketing Conference',
    date: 'August 22-23, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Marina Bay Convention',
    category: 'Business',
    attendees: 950,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  },
];

// Event categories
const CATEGORIES = [
  {
    title: 'Music',
    icon: <Music className="h-6 w-6 text-white" />,
    color: 'bg-pink-500',
    count: 450,
    href: '/category/music',
  },
  {
    title: 'Technology',
    icon: <Code className="h-6 w-6 text-white" />,
    color: 'bg-blue-500',
    count: 320,
    href: '/category/technology',
  },
  {
    title: 'Food & Drink',
    icon: <Utensils className="h-6 w-6 text-white" />,
    color: 'bg-orange-500',
    count: 285,
    href: '/category/food-drink',
  },
  {
    title: 'Arts & Culture',
    icon: <Landmark className="h-6 w-6 text-white" />,
    color: 'bg-purple-500',
    count: 195,
    href: '/category/arts-culture',
  },
  {
    title: 'Sports & Fitness',
    icon: <Dumbbell className="h-6 w-6 text-white" />,
    color: 'bg-green-500',
    count: 240,
    href: '/category/sports-fitness',
  },
  {
    title: 'Education',
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    color: 'bg-yellow-500',
    count: 180,
    href: '/category/education',
  },
  {
    title: 'Business',
    icon: <Briefcase className="h-6 w-6 text-white" />,
    color: 'bg-gray-700',
    count: 210,
    href: '/category/business',
  },
  {
    title: 'Travel',
    icon: <Plane className="h-6 w-6 text-white" />,
    color: 'bg-teal-500',
    count: 165,
    href: '/category/travel',
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-eventhub-primary to-eventhub-secondary py-20 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Discover Amazing Events Near You
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Find, book, and enjoy the best local and online events - from concerts and workshops to networking meetups.
          </p>
          <div className="max-w-md mx-auto relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search for events, venues, or categories..."
              className="pl-10 py-6 rounded-full text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-eventhub-accent hover:bg-eventhub-accent/90 rounded-full"
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 h-16 w-16 rounded-full bg-white opacity-10"></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover events by category and find experiences that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                color={category.color}
                count={category.count}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <p className="text-gray-600">Popular events you might be interested in</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-eventhub-primary text-eventhub-primary hover:bg-eventhub-primary hover:text-white">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_EVENTS.map((event) => (
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
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <p className="text-gray-600">Don't miss out on these upcoming events</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-eventhub-primary text-eventhub-primary hover:bg-eventhub-primary hover:text-white">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-eventhub-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Host Your Own Event?</h2>
          <p className="text-lg mb-8">
            Create, manage, and promote your events with our platform. Reach thousands of potential attendees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="bg-white text-eventhub-primary hover:bg-gray-100">
                Create Event
              </Button>
            </Link>
            <Link to="/for-organizers">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
