
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

export interface EventQueryResult {
  event: EventType | null;
  loading: boolean;
  error: string | null;
}
