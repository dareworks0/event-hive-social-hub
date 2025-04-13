
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/layout/Layout';
import { Play, Pause, Globe, Calendar, Newspaper, Tag } from 'lucide-react';

// Mock news data (in a real app, this would come from an API)
const NEWS_ITEMS = [
  {
    id: '1',
    title: 'Tech Conference 2025 Announces Keynote Speakers',
    content: 'The highly anticipated Tech Conference 2025 has just announced its impressive lineup of keynote speakers, including industry leaders from top tech companies. The conference, scheduled for May 15, will feature discussions on AI, blockchain, and the future of cloud computing. Early bird registration is now open with special pricing until January 31.',
    published_at: '2025-01-10T12:00:00Z',
    category: 'Technology',
    related_event_id: '1',
  },
  {
    id: '2',
    title: 'Summer Music Festival Adds New Stage for Emerging Artists',
    content: 'The organizers of the Summer Music Festival have announced the addition of a new stage dedicated to emerging artists. This exciting development aims to provide a platform for up-and-coming musicians to showcase their talent alongside established performers. The festival, taking place on June 21-23, will now feature over 50 artists across four stages, offering an even more diverse musical experience for attendees.',
    published_at: '2025-01-15T09:30:00Z',
    category: 'Music',
    related_event_id: '2',
  },
  {
    id: '3',
    title: 'International Food Fair Expands with Global Culinary Workshops',
    content: 'The International Food Fair is expanding its program to include interactive culinary workshops led by renowned chefs from around the world. Attendees will have the opportunity to learn authentic cooking techniques and recipes from diverse cultural traditions. These hands-on sessions will complement the existing food stalls and tasting experiences that have made the fair a favorite among food enthusiasts. The extended program reflects the growing interest in experiential culinary education.',
    published_at: '2025-01-20T14:45:00Z',
    category: 'Food',
    related_event_id: '3',
  },
  {
    id: '4',
    title: 'Business Leadership Summit to Focus on Sustainable Practices',
    content: 'The upcoming Business Leadership Summit has announced "Sustainable Business Practices" as its central theme for the 2025 edition. The two-day event will bring together CEOs, founders, and industry leaders to discuss how businesses can thrive while prioritizing environmental and social responsibility. Keynote presentations and panel discussions will cover topics such as carbon neutrality strategies, ethical supply chain management, and stakeholder capitalism. This shift in focus reflects the growing importance of sustainability in the business world.',
    published_at: '2025-01-25T11:15:00Z',
    category: 'Business',
    related_event_id: '4',
  },
  {
    id: '5',
    title: 'City Marathon Introduces New Scenic Route for 2025',
    content: 'The organizers of the City Marathon have revealed an entirely new route for the 2025 event. The updated course will take runners through some of the city\'s most scenic parks and historic neighborhoods, offering participants a fresh perspective of the urban landscape. Race officials collaborated with local community groups to design a route that balances athletic challenge with cultural significance. Early registration is now open, with a special discount for returning participants.',
    published_at: '2025-01-30T08:00:00Z',
    category: 'Sports',
    related_event_id: '6',
  },
];

const CATEGORIES = ['All', 'Technology', 'Music', 'Food', 'Business', 'Sports', 'Art'];

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(NEWS_ITEMS);
  const [isReading, setIsReading] = useState(false);
  const [readingItemId, setReadingItemId] = useState<string | null>(null);
  const speechSynthesis = window.speechSynthesis;
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    // Filter news based on category
    if (activeCategory === 'All') {
      setFilteredNews(NEWS_ITEMS);
    } else {
      setFilteredNews(NEWS_ITEMS.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle text-to-speech
  const toggleReadAloud = (newsItem: any) => {
    if (isReading && readingItemId === newsItem.id) {
      // Stop reading if this item is already being read
      speechSynthesis.cancel();
      setIsReading(false);
      setReadingItemId(null);
      return;
    }
    
    // Stop any ongoing speech
    speechSynthesis.cancel();
    
    // Create a new utterance with title and content
    const fullText = `${newsItem.title}. ${newsItem.content}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsReading(false);
      setReadingItemId(null);
    };
    
    speechUtteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsReading(true);
    setReadingItemId(newsItem.id);
  };
  
  // Cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-eventhub-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Event News & Updates</h1>
            <p className="text-eventhub-primary-foreground max-w-2xl mx-auto">
              Stay up-to-date with the latest news, announcements, and updates about upcoming events
            </p>
          </div>
        </div>
        
        {/* News Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Categories */}
          <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="w-full max-w-3xl mx-auto flex overflow-x-auto justify-start md:justify-center p-1">
              {CATEGORIES.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-eventhub-primary data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* News Articles */}
          <div className="max-w-4xl mx-auto">
            {filteredNews.length > 0 ? (
              <div className="space-y-6">
                {filteredNews.map(newsItem => (
                  <Card key={newsItem.id} className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge category={newsItem.category} />
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(newsItem.published_at)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{newsItem.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-4">{newsItem.content}</p>
                      
                      <div className="flex justify-between items-center mt-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`flex items-center ${isReading && readingItemId === newsItem.id ? 'bg-gray-100' : ''}`}
                          onClick={() => toggleReadAloud(newsItem)}
                        >
                          {isReading && readingItemId === newsItem.id ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Stop Reading
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Read Aloud
                            </>
                          )}
                        </Button>
                        
                        <a 
                          href={`/event/${newsItem.related_event_id}`} 
                          className="text-eventhub-primary hover:underline text-sm flex items-center"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Related Event
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No news found</h3>
                <p className="text-gray-600 mb-6">
                  There are no news articles in this category yet.
                </p>
                <Button onClick={() => setActiveCategory('All')}>View All News</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Badge component for news categories
const Badge = ({ category }: { category: string }) => {
  const getColor = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800';
      case 'Music':
        return 'bg-pink-100 text-pink-800';
      case 'Food':
        return 'bg-orange-100 text-orange-800';
      case 'Business':
        return 'bg-purple-100 text-purple-800';
      case 'Sports':
        return 'bg-green-100 text-green-800';
      case 'Art':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColor(category)}`}>
      <Tag className="h-3 w-3 mr-1" />
      {category}
    </div>
  );
};

export default NewsPage;
