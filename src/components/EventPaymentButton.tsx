
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import QRScanner from './QRScanner';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface EventPaymentButtonProps {
  eventId: string;
  price: number;
}

const EventPaymentButton = ({ eventId, price }: EventPaymentButtonProps) => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePaymentClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase tickets.",
        variant: "destructive",
      });
      return;
    }
    
    setIsQRScannerOpen(true);
  };

  const handleScanSuccess = async (qrData: string) => {
    setIsQRScannerOpen(false);
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Create a ticket record in the database
      const { data, error } = await supabase
        .from('tickets')
        .insert({
          user_id: user!.id,
          event_id: eventId,
          qr_code: qrData
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create a chat room for the event if it doesn't exist
      const { error: chatRoomError } = await supabase
        .from('chat_rooms')
        .upsert({
          event_id: eventId
        }, {
          onConflict: 'event_id'
        });
      
      if (chatRoomError) console.error('Error creating chat room:', chatRoomError);
      
      toast({
        title: "Payment Successful!",
        description: "Your ticket has been added to your account.",
      });
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment.",
        variant: "destructive",
      });
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        className="w-full bg-eventhub-primary hover:bg-eventhub-secondary"
        onClick={handlePaymentClick}
        disabled={isProcessing}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isProcessing ? 'Processing...' : price > 0 ? `Proceed to Payment ($${price})` : 'Register for Free'}
      </Button>
      
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </>
  );
};

export default EventPaymentButton;
