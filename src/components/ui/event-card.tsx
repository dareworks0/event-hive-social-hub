
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from './badge';
import { Link } from 'react-router-dom';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  image: string;
}

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  attendees,
  image,
}: EventCardProps) {
  return (
    <Link to={`/event/${id}`} className="block">
      <div className="event-card card-hover">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-eventhub-accent text-white">
            {category}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-eventhub-primary" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-eventhub-primary" />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-eventhub-primary" />
              <span className="line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-eventhub-primary" />
              <span>{attendees} attending</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
