
export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  location_coordinates?: { lat: number; lng: number } | any;
  category: string;
  image_url: string;
  organizer_id: string;
  organizer_name?: string;
  price: number;
  max_attendees?: number;
  created_at: string;
  updated_at?: string;
}

export interface EventQueryResult {
  event: EventType | null;
  loading: boolean;
  error: string | null;
}

export interface EventFilter {
  category?: string;
  date?: 'soonest' | 'farthest';
  location?: string;
  price?: 'free' | 'paid' | 'all';
}
