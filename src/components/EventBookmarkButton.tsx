
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface EventBookmarkButtonProps {
  eventId: string;
}

const EventBookmarkButton = ({ eventId }: EventBookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkBookmarkStatus();
    }
  }, [user, eventId]);

  const checkBookmarkStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking bookmark status:', error);
        return;
      }
      
      setIsBookmarked(!!data);
    } catch (error) {
      console.error('Error in checkBookmarkStatus:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to bookmark events.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);
        
        if (error) throw error;
        
        setIsBookmarked(false);
        toast({
          title: "Bookmark Removed",
          description: "Event has been removed from your bookmarks.",
        });
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            event_id: eventId
          });
        
        if (error) throw error;
        
        setIsBookmarked(true);
        toast({
          title: "Event Bookmarked",
          description: "Event has been added to your bookmarks.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update bookmark status.",
        variant: "destructive",
      });
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleBookmark}
      disabled={isLoading}
      className={isBookmarked ? "border-eventhub-accent text-eventhub-accent" : ""}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          Bookmarked
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Bookmark
        </>
      )}
    </Button>
  );
};

export default EventBookmarkButton;
