
import { useState, useEffect } from 'react';
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
  Plane,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Globe
} from 'lucide-react';

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

// Mock data for featured events
const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Global Tech Summit 2025',
    date: 'May 15-17, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'International Convention Center',
    category: 'Technology',
    attendees: 1500,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    date: 'June 21-23, 2025',
    time: '12:00 PM - 11:00 PM',
    location: 'Central Park Amphitheater',
    category: 'Music',
    attendees: 5000,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'International Food & Wine Expo',
    date: 'July 8-10, 2025',
    time: 'All Day',
    location: 'Downtown Culinary Center',
    category: 'Food',
    attendees: 3200,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Leadership & Innovation Summit',
    date: 'August 5-6, 2025',
    time: '8:00 AM - 4:00 PM',
    location: 'Grand Business Hotel',
    category: 'Business',
    attendees: 750,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
];

// Upcoming events with expanded locations
const UPCOMING_EVENTS = [
  {
    id: '5',
    title: 'Blockchain Developers Conference',
    date: 'June 10, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'Tech Hub, San Francisco',
    category: 'Technology',
    attendees: 85,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'Marathon for Charity 2025',
    date: 'July 1, 2025',
    time: '7:00 AM',
    location: 'Central Park, New York',
    category: 'Sports',
    attendees: 2500,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    title: 'Contemporary Art Exhibition',
    date: 'July 15-30, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Modern Art Museum, London',
    category: 'Art',
    attendees: 450,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    title: 'Digital Marketing Masterclass',
    date: 'August 22-23, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Marina Bay Convention, Singapore',
    category: 'Business',
    attendees: 950,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [animateSections, setAnimateSections] = useState({
    hero: false,
    categories: false,
    featured: false,
    upcoming: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animations for sections
    const timers = [
      setTimeout(() => setAnimateSections(prev => ({ ...prev, hero: true })), 200),
      setTimeout(() => setAnimateSections(prev => ({ ...prev, categories: true })), 500),
      setTimeout(() => setAnimateSections(prev => ({ ...prev, featured: true })), 800),
      setTimeout(() => setAnimateSections(prev => ({ ...prev, upcoming: true })), 1100),
      setTimeout(() => setAnimateSections(prev => ({ ...prev, cta: true })), 1400)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <Layout>
      {/* Hero Section with enhanced animations */}
      <section className={`relative bg-gradient-to-r from-eventhub-primary to-eventhub-secondary py-32 px-4 overflow-hidden transition-opacity duration-1000 ${animateSections.hero ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transform transition-transform duration-700 ease-out"
              style={{ transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}>
            Discover Extraordinary Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto transform transition-transform duration-700 delay-300 ease-out"
             style={{ transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}>
            Connect with experiences that inspire, educate, and entertain - all in one place.
          </p>
          <div className="max-w-md mx-auto relative transform transition-all duration-700 delay-500 ease-out"
               style={{ transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)', opacity: isVisible ? 1 : 0 }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search for events, venues, or categories..."
              className="pl-10 py-6 rounded-full text-black shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-eventhub-accent hover:bg-eventhub-accent/90 rounded-full shadow-md"
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-white opacity-5 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-2/3 h-24 w-24 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-10 right-[30%] w-16 h-16 rotate-45 bg-white opacity-5"></div>
          <div className="absolute bottom-20 left-[20%] w-20 h-20 rounded-lg bg-white opacity-5"></div>
          
          {/* Animated wave */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="rgba(255,255,255,0.05)" d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,96C672,75,768,85,864,112C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-6 shadow-md">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-200">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-eventhub-primary mr-2" />
                <span className="text-2xl font-bold text-gray-800">2,500+</span>
              </div>
              <p className="text-sm text-gray-600 text-center">Events Monthly</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-200">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-eventhub-primary mr-2" />
                <span className="text-2xl font-bold text-gray-800">120+</span>
              </div>
              <p className="text-sm text-gray-600 text-center">Cities</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-r border-gray-200">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-eventhub-primary mr-2" />
                <span className="text-2xl font-bold text-gray-800">1.2M+</span>
              </div>
              <p className="text-sm text-gray-600 text-center">Active Users</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-eventhub-primary mr-2" />
                <span className="text-2xl font-bold text-gray-800">98%</span>
              </div>
              <p className="text-sm text-gray-600 text-center">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-16 px-4 bg-gray-50 transition-opacity duration-1000 ${animateSections.categories ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover events by category and find experiences that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((category, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                style={{ 
                  transitionDelay: `${index * 75}ms`,
                  opacity: animateSections.categories ? 1 : 0,
                  transform: animateSections.categories ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <CategoryCard
                  title={category.title}
                  icon={category.icon}
                  color={category.color}
                  count={category.count}
                  href={category.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className={`py-16 px-4 transition-opacity duration-1000 ${animateSections.featured ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <p className="text-gray-600">Popular events you might be interested in</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-eventhub-primary text-eventhub-primary hover:bg-eventhub-primary hover:text-white transition-colors">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_EVENTS.map((event, index) => (
              <div 
                key={event.id} 
                className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: animateSections.featured ? 1 : 0,
                  transform: animateSections.featured ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  category={event.category}
                  attendees={event.attendees}
                  image={event.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="bg-eventhub-primary/10 py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose EventHub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-eventhub-primary/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-eventhub-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Connect with events and people from around the world, expanding your horizons and experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-eventhub-primary/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-eventhub-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Booking</h3>
              <p className="text-gray-600">
                From discovery to attendance, our platform makes the entire event experience smooth and hassle-free.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-eventhub-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-eventhub-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Our smart algorithms suggest events tailored to your interests, location, and past activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className={`py-16 px-4 bg-gray-50 transition-opacity duration-1000 ${animateSections.upcoming ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <p className="text-gray-600">Don't miss out on these upcoming events</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-eventhub-primary text-eventhub-primary hover:bg-eventhub-primary hover:text-white transition-colors">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UPCOMING_EVENTS.map((event, index) => (
              <div 
                key={event.id} 
                className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: animateSections.upcoming ? 1 : 0,
                  transform: animateSections.upcoming ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  category={event.category}
                  attendees={event.attendees}
                  image={event.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 px-4 bg-gradient-to-r from-eventhub-primary to-eventhub-secondary text-white text-center transition-opacity duration-1000 ${animateSections.cta ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 transform transition-all"
              style={{ 
                opacity: animateSections.cta ? 1 : 0,
                transform: animateSections.cta ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease'
              }}>
            Create Your Own Event Experience
          </h2>
          <p className="text-lg mb-8 transform transition-all"
             style={{ 
                opacity: animateSections.cta ? 1 : 0,
                transform: animateSections.cta ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
              }}>
            Whether you're looking to attend or organize events, EventHub provides the tools and platform to connect with a global community of event enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center transform transition-all"
               style={{ 
                opacity: animateSections.cta ? 1 : 0,
                transform: animateSections.cta ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
              }}>
            <Link to="/register?role=organizer">
              <Button size="lg" className="bg-white text-eventhub-primary hover:bg-gray-100 transform transition-transform hover:scale-105">
                Become an Organizer
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transform transition-transform hover:scale-105">
                Join as Attendee
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="rgba(255,255,255,0.1)" d="M0,64L48,96C96,128,192,192,288,224C384,256,480,256,576,234.7C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Hear from our community of event-goers and organizers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-500">Event Attendee</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "EventHub has completely changed how I discover local events. The personalized recommendations are spot-on, and the booking process is seamless!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As an event organizer, I've been able to reach a much wider audience. The platform's tools make it easy to manage registrations and communicate with attendees."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-sm text-gray-500">Corporate Client</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We used EventHub for our annual company conference and were blown away by the features. From ticket sales to attendee management, everything was streamlined."
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
