
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventCard } from '@/components/ui/event-card';
import Layout from '@/components/layout/Layout';
import { Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react';

// Mock events data
const ALL_EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: 'May 15, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Silicon Valley Convention Center',
    category: 'Technology',
    attendees: 1250,
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    tags: ['Conference', 'Networking'],
    featured: true,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    date: 'June 21, 2025',
    time: '12:00 PM - 11:00 PM',
    location: 'Central Park, New York',
    category: 'Music',
    attendees: 5000,
    price: 150,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
    tags: ['Festival', 'Concert'],
    featured: true,
  },
  {
    id: '3',
    title: 'International Food Fair',
    date: 'July 8, 2025',
    time: 'All Day',
    location: 'Downtown Food District',
    category: 'Food & Drink',
    attendees: 3200,
    price: 45,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    tags: ['Food', 'Festival'],
    featured: false,
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    date: 'August 5-6, 2025',
    time: '8:00 AM - 4:00 PM',
    location: 'Grand Hyatt Hotel',
    category: 'Business',
    attendees: 750,
    price: 499,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
    tags: ['Business', 'Leadership'],
    featured: true,
  },
  {
    id: '5',
    title: 'Web3 Developers Meetup',
    date: 'June 10, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'Tech Hub Downtown',
    category: 'Technology',
    attendees: 85,
    price: 0,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
    tags: ['Meetup', 'Technology'],
    featured: false,
  },
  {
    id: '6',
    title: 'City Marathon 2025',
    date: 'July 1, 2025',
    time: '7:00 AM',
    location: 'City Center',
    category: 'Sports & Fitness',
    attendees: 2500,
    price: 75,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80',
    tags: ['Marathon', 'Sports'],
    featured: false,
  },
  {
    id: '7',
    title: 'Art Gallery Exhibition',
    date: 'July 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Modern Art Museum',
    category: 'Arts & Culture',
    attendees: 450,
    price: 25,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
    tags: ['Art', 'Exhibition'],
    featured: false,
  },
  {
    id: '8',
    title: 'Global Marketing Conference',
    date: 'August 22, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Marina Bay Convention',
    category: 'Business',
    attendees: 950,
    price: 350,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    tags: ['Conference', 'Marketing'],
    featured: false,
  },
];

// Category information with images and descriptions
const CATEGORIES = {
  'music': {
    title: 'Music Events',
    description: 'Discover concerts, festivals, live performances, and musical gatherings of all genres.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
    color: 'from-pink-500 to-purple-600',
    icon: 'Music',
  },
  'technology': {
    title: 'Technology Events',
    description: 'Explore tech conferences, hackathons, meetups, and workshops on the latest innovations.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-cyan-600',
    icon: 'Code',
  },
  'food-drink': {
    title: 'Food & Drink Events',
    description: 'Savor food festivals, culinary workshops, wine tastings, and gastronomic experiences.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    color: 'from-orange-500 to-red-600',
    icon: 'Utensils',
  },
  'arts-culture': {
    title: 'Arts & Culture Events',
    description: 'Immerse yourself in exhibitions, performances, cultural celebrations, and creative workshops.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-indigo-600',
    icon: 'Landmark',
  },
  'sports-fitness': {
    title: 'Sports & Fitness Events',
    description: 'Join marathons, tournaments, fitness classes, and sporting competitions.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80',
    color: 'from-green-500 to-teal-600',
    icon: 'Dumbbell',
  },
  'business': {
    title: 'Business Events',
    description: 'Connect at networking events, conferences, seminars, and professional development workshops.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    color: 'from-gray-700 to-gray-900',
    icon: 'Briefcase',
  },
  'education': {
    title: 'Education Events',
    description: 'Learn at workshops, seminars, courses, and educational gatherings across various disciplines.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80',
    color: 'from-yellow-500 to-amber-600',
    icon: 'GraduationCap',
  },
  'travel': {
    title: 'Travel Events',
    description: 'Explore travel fairs, adventure meetups, cultural tours, and expedition planning sessions.',
    image: 'https://images.unsplash.com/photo-1503221043305-f7498f8b7888?auto=format&fit=crop&q=80',
    color: 'from-teal-500 to-emerald-600',
    icon: 'Plane',
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [filteredEvents, setFilteredEvents] = useState<typeof ALL_EVENTS>([]);

  const categoryInfo = category && CATEGORIES[category as keyof typeof CATEGORIES] 
    ? CATEGORIES[category as keyof typeof CATEGORIES] 
    : {
        title: 'All Events',
        description: 'Discover all types of events happening around you.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
        color: 'from-eventhub-primary to-eventhub-secondary',
        icon: 'Calendar',
      };

  // Get all unique tags from events
  const allTags = Array.from(new Set(ALL_EVENTS.flatMap(event => event.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  // Filter and sort events
  useEffect(() => {
    let results = [...ALL_EVENTS];
    
    // Filter by category
    if (category && category !== 'all') {
      const categoryName = category.replace(/-/g, ' ');
      const categoryKey = Object.keys(CATEGORIES).find(key => 
        key.toLowerCase() === category.toLowerCase() || 
        CATEGORIES[key as keyof typeof CATEGORIES].title.toLowerCase().includes(categoryName));
        
      if (categoryKey) {
        const categoryTitle = CATEGORIES[categoryKey as keyof typeof CATEGORIES].title.replace(' Events', '');
        results = results.filter(event => event.category.toLowerCase() === categoryTitle.toLowerCase());
      }
    }
    
    // Search filter
    if (searchTerm) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Price range filter
    results = results.filter(event => 
      event.price >= priceRange[0] && event.price <= priceRange[1]
    );
    
    // Tags filter
    if (selectedTags.length > 0) {
      results = results.filter(event => 
        selectedTags.some(tag => event.tags.includes(tag))
      );
    }
    
    // Sort results
    switch (sortOption) {
      case 'featured':
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'date':
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        results.sort((a, b) => b.attendees - a.attendees);
        break;
    }
    
    setFilteredEvents(results);
  }, [category, searchTerm, priceRange, selectedTags, sortOption]);

  return (
    <Layout>
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${categoryInfo.color} text-white py-16 px-4`}>
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryInfo.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl">{categoryInfo.description}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b sticky top-0 z-10 py-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="date">Date (Soonest)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filters Panel */}
          {filterOpen && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-eventhub-primary" />
                    Price Range
                  </h3>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      max={1000}
                      step={10}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-eventhub-primary" />
                    Event Type
                  </h3>
                  <div className="space-y-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-eventhub-primary" />
                    Location
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="location-local" />
                      <Label htmlFor="location-local">Local Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="location-online" />
                      <Label htmlFor="location-online">Online Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="location-hybrid" />
                      <Label htmlFor="location-hybrid">Hybrid Events</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setPriceRange([0, 500]);
                  setSelectedTags([]);
                }}>
                  Reset
                </Button>
                <Button onClick={() => setFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Listings */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
            </h2>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
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
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms to find events.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 500]);
                setSelectedTags([]);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
