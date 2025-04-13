import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/layout/Layout';
import Map from '@/components/Map';
import EventBookmarkButton from '@/components/EventBookmarkButton';
import EventPaymentButton from '@/components/EventPaymentButton';
import { useEventData } from '@/hooks/useEventData';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Users, Heart, Share, DollarSign, MessageSquare, ArrowRight, CalendarCheck, Building, Info, AlertTriangle } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEventData(id || '');
  const { user } = useAuth();
  const { toast } = useToast();
  const [isBooking, setIsBooking] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleBookEvent = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book this event.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsBooking(true);
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Successful!",
        description: "You have successfully booked a ticket for this event.",
      });
      
      // In a real app, you would redirect to a confirmation page or show more details
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link copied to clipboard.",
      });
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="w-full h-[400px] rounded-lg mb-6" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-8" />
            </div>
            
            <div>
              <Skeleton className="w-full h-[200px] rounded-lg mb-6" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or there was an error loading it.
          </p>
          <Link to="/explore">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-eventhub-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2 bg-white/20">
                    {event.category}
                  </Badge>
                  <span className="text-eventhub-primary-foreground">Hosted by {event.organizer_name || 'EventHub'}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <EventBookmarkButton eventId={event.id} />
                <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={handleShare}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Image */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={event.image_url} 
                  alt={event.title} 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Event Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">
                  {event.description}
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 p-2 rounded-full bg-eventhub-primary/10 text-eventhub-primary mr-4">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Date</h4>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 p-2 rounded-full bg-eventhub-primary/10 text-eventhub-primary mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Time</h4>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 p-2 rounded-full bg-eventhub-primary/10 text-eventhub-primary mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 p-2 rounded-full bg-eventhub-primary/10 text-eventhub-primary mr-4">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Organizer</h4>
                      <p className="text-gray-600">{event.organizer_name || 'EventHub'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Location */}
              {event.location_coordinates && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="h-[300px] rounded-md overflow-hidden">
                    <Map location={event.location_coordinates} />
                  </div>
                  <p className="mt-3 text-gray-600">{event.location}</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Ticket Information</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <DollarSign className="h-5 w-5 text-eventhub-primary mr-2" />
                        Price
                      </span>
                      <span className="font-bold text-lg">${event.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <CalendarCheck className="h-5 w-5 text-eventhub-primary mr-2" />
                        Date
                      </span>
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <Clock className="h-5 w-5 text-eventhub-primary mr-2" />
                        Time
                      </span>
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <Users className="h-5 w-5 text-eventhub-primary mr-2" />
                        Capacity
                      </span>
                      <span>{event.max_attendees || 'Unlimited'}</span>
                    </div>
                  </div>
                  
                  <EventPaymentButton
                    eventId={event.id}
                    title={event.title}
                    price={event.price}
                    onClick={handleBookEvent}
                    loading={isBooking}
                  />
                  
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Secure checkout powered by Stripe
                  </p>
                </CardContent>
              </Card>
              
              {/* Organizer Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Organizer</h3>
                  
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={`https://avatar.vercel.sh/${event.organizer_id}`} />
                      <AvatarFallback>{event.organizer_name?.slice(0, 2) || 'EH'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{event.organizer_name || 'EventHub'}</h4>
                      <p className="text-sm text-gray-500">Event Organizer</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </CardContent>
              </Card>
              
              {/* Similar Events */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Similar Events</h3>
                    <Link to={`/category/${event.category.toLowerCase()}`} className="text-eventhub-primary text-sm hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {/* This would be populated with real data in a production app */}
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" 
                          alt="Event" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2">Tech Innovators Summit 2025</h4>
                        <p className="text-sm text-gray-500">June 12, 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80" 
                          alt="Event" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2">AI & Machine Learning Workshop</h4>
                        <p className="text-sm text-gray-500">July 8, 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-4 text-eventhub-primary">
                    Explore More Events
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
