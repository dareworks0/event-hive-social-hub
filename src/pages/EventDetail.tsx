
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import { useEventData } from '@/hooks/useEventData';
import Map from '@/components/Map';
import EventBookmarkButton from '@/components/EventBookmarkButton';
import EventPaymentButton from '@/components/EventPaymentButton';
import { format, parseISO } from 'date-fns';

const EventDetail = () => {
  const { id = '1' } = useParams<{ id: string }>();
  const { event, loading, error } = useEventData(id);
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString; // Return original if date can't be parsed
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The event you're looking for could not be loaded.
            </p>
            <Button className="bg-eventhub-primary hover:bg-eventhub-secondary">
              Go Back to Events
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        {/* Event Hero Banner */}
        <div 
          className="w-full h-72 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="container mx-auto px-4 relative h-full flex items-end pb-6">
            <div className="text-white">
              <Badge className="mb-2 bg-eventhub-accent hover:bg-eventhub-accent">{event.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>500+ attendees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About Event */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Organizer */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Organizer</h2>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-eventhub-primary/20 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-eventhub-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.organizer_name || 'Event Organizer'}</h3>
                    <p className="text-sm text-gray-500">Event Host</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <p className="text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 inline-block mr-2 text-eventhub-primary" />
                  {event.location}
                </p>
                <Map location={event.location} coordinates={event.location_coordinates} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket / Registration */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Registration</h2>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-600">Price</p>
                    <p className="text-2xl font-bold">
                      {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                    </p>
                  </div>
                  
                  <EventBookmarkButton eventId={event.id} />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <EventPaymentButton eventId={event.id} price={event.price} />
                  
                  <div className="text-sm text-gray-500">
                    <p>
                      <CreditCard className="h-4 w-4 inline-block mr-1" />
                      Secure payment powered by EventHub
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Event Info Quick View */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold mb-4">Event Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Date and Time</p>
                    <p>{formatDate(event.date)}</p>
                    <p>{event.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
