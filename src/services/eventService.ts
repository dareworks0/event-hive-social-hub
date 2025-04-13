
import { supabase } from '@/integrations/supabase/client';
import { EventType } from '@/types/event.types';

export const fetchEventById = async (eventId: string): Promise<EventType> => {
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
    return {
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
  }
  
  // Explicitly type the event data and include organizer_name
  let processedEventData: EventType = {
    ...eventData as EventType,
    organizer_name: undefined // Initialize organizer_name
  };
  
  // Get organizer name if event found
  if (eventData.organizer_id) {
    const { data: organizerData, error: organizerError } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', eventData.organizer_id)
      .single();
    
    if (!organizerError && organizerData) {
      processedEventData.organizer_name = `${organizerData.first_name} ${organizerData.last_name}`;
    }
  }
  
  return processedEventData;
};
