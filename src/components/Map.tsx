
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

// We'll use a simple mock map component 
// In a real application, you would integrate with Mapbox, Google Maps, or another provider
interface MapProps {
  location: string;
  coordinates?: { lat: number; lng: number };
}

const Map = ({ location, coordinates }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Simplified map initialization
  useEffect(() => {
    if (!mapRef.current) return;
    
    // This would normally be where we initialize the map with the coordinates
    console.log(`Map initialized for location: ${location}`);
    
    // Mock map behavior for demo purposes
    const mapContainer = mapRef.current;
    mapContainer.style.backgroundImage = 'url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(0,0)/0,0,13/500x300?access_token=pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNseTZ0eDk3ejBldmsyam1rcWR2bWhrN24ifQ.Ccj-dxXIEFQfB9l-laBXKw)';
    mapContainer.style.backgroundSize = 'cover';
    mapContainer.style.backgroundPosition = 'center';
    
  }, [location, coordinates]);
  
  const handleGetDirections = () => {
    // This would typically open a maps application with directions
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="space-y-3">
      <div 
        ref={mapRef} 
        className="w-full h-64 rounded-lg bg-gray-200 relative"
        aria-label={`Map showing location of ${location}`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 text-white">
          <div className="text-center p-4">
            <MapPin className="h-10 w-10 mx-auto mb-2" />
            <p>Interactive map will be displayed here</p>
            <p className="text-sm">Location: {location}</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleGetDirections}
        className="w-full bg-eventhub-primary hover:bg-eventhub-secondary" 
      >
        <MapPin className="mr-2 h-4 w-4" />
        Get Directions
      </Button>
    </div>
  );
};

export default Map;
