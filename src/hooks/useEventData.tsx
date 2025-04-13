
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EventType, EventQueryResult } from '@/types/event.types';
import { fetchEventById } from '@/services/eventService';

export const useEventData = (eventId: string): EventQueryResult => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const eventData = await fetchEventById(eventId);
        setEvent(eventData);
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
    
    getEvent();
  }, [eventId, toast]);
  
  return { event, loading, error };
};
