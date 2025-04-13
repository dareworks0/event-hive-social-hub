import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  location_coordinates?: { lat: number; lng: number };
  category: string;
  image_url: string;
  organizer_id: string;
  organizer_name?: string;
  price: number;
  created_at: string;
}

export const useEventData = (eventId: string) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        // Get event data
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();
        
        if (eventError) {
          throw eventError;
        }
        
        if (!eventData) {
          // For demo purposes, use mock data if event not found in database
          const mockEvent: EventType = {
            id: eventId,
            title: 'Tech Conference 2025',
            description: 'Join us for the biggest tech event of the year, featuring industry leaders, workshops, networking opportunities, and more. Learn about the latest trends in AI, blockchain, cloud computing, and other emerging technologies.',
            date: '2025-05-15',
            time: '9:00 AM - 5:00 PM',
            location: 'Silicon Valley Convention Center',
            category: 'Technology',
            image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
            organizer_id: '1',
            price: 199.99,
            created_at: '2025-01-15T00:00:00.000Z',
          };
          
          setEvent(mockEvent);
          setLoading(false);
          return;
        }
        
        // Get organizer name if event found
        if (eventData.organizer_id) {
          const { data: organizerData, error: organizerError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', eventData.organizer_id)
            .single();
          
          if (!organizerError && organizerData) {
            eventData.organizer_name = `${organizerData.first_name} ${organizerData.last_name}`;
          }
        }
        
        setEvent(eventData as unknown as EventType);
      } catch (err: any) {
        console.error('Error fetching event:', err);
        setError(err.message || 'Failed to load event details');
        
        toast({
          title: "Error",
          description: "Failed to load event details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId, toast]);
  
  return { event, loading, error };
};
