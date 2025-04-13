
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventCard } from '@/components/ui/event-card';
import Layout from '@/components/layout/Layout';
import { Search, Filter, Calendar, X, Tag } from 'lucide-react';

// Mock data for events (in a real app, this would come from your API)
const ALL_EVENTS = [
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
    date: 'July 8, 2025',
    time: 'All Day',
    location: 'Downtown Food District',
    category: 'Food',
    attendees: 3200,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    date: 'August 5, 2025',
    time: '8:00 AM - 4:00 PM',
    location: 'Grand Hyatt Hotel',
    category: 'Business',
    attendees: 750,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    title: 'Web3 Developers Meetup',
    date: 'September 10, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'Tech Hub Downtown',
    category: 'Technology',
    attendees: 85,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'City Marathon 2025',
    date: 'October 1, 2025',
    time: '7:00 AM',
    location: 'City Center',
    category: 'Sports',
    attendees: 2500,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    title: 'Art Gallery Exhibition',
    date: 'October 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Modern Art Museum',
    category: 'Art',
    attendees: 450,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    title: 'Global Marketing Conference',
    date: 'November 22, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Marina Bay Convention',
    category: 'Business',
    attendees: 950,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  },
];

// Parse date string to a Date object for sorting
const parseDate = (dateStr: string) => {
  const months: { [key: string]: number } = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const parts = dateStr.split(' ');
  const month = parts[0];
  const day = parseInt(parts[1].replace(',', ''));
  const year = parseInt(parts[2]);
  
  return new Date(year, months[month], day);
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'date-soonest');
  const [filteredEvents, setFilteredEvents] = useState(ALL_EVENTS);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter events based on category, search query, and sort order
  useEffect(() => {
    let filtered = [...ALL_EVENTS];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === formattedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
      );
    }
    
    // Sort events
    filtered.sort((a, b) => {
      if (sortBy === 'date-soonest') {
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      } else if (sortBy === 'date-farthest') {
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      }
      return 0;
    });
    
    setFilteredEvents(filtered);
    
    // Update URL search params
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  }, [category, searchQuery, sortBy, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission just triggers state update, which is already handled by useEffect
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">
              {category ? category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : 'All'} Events
            </h1>
            <p className="text-gray-600">
              Discover and book {category ? category.replace(/-/g, ' ') : 'all'} events in your area
            </p>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <form onSubmit={handleSearch} className="flex-1 w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex gap-2 items-center" 
                  onClick={toggleFilters}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                
                <div className="flex-1 md:flex-none">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-soonest">Date (Soonest First)</SelectItem>
                      <SelectItem value="date-farthest">Date (Farthest First)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50 animate-fade-in">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Filter Options</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFilters}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-soonest">Date (Soonest First)</SelectItem>
                        <SelectItem value="date-farthest">Date (Farthest First)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Active Filters */}
            {(searchQuery || sortBy !== 'date-soonest') && (
              <div className="flex flex-wrap gap-2 mt-3">
                {searchQuery && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    <span className="mr-1">Search:</span>
                    <span className="font-medium">{searchQuery}</span>
                    <button onClick={clearSearch} className="ml-2 text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {sortBy !== 'date-soonest' && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="font-medium">
                      {sortBy === 'date-farthest' ? 'Date (Farthest First)' : sortBy}
                    </span>
                    <button 
                      onClick={() => setSortBy('date-soonest')} 
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="container mx-auto px-4 py-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="animate-fade-in">
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
          ) : (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any events matching your search criteria.
              </p>
              <Button onClick={clearSearch}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
