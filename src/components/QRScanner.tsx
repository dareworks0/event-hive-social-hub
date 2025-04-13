
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Webcam, Scan, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const QRScanner = ({ onScanSuccess, isOpen, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startScanning = () => {
    // In a real app, we would initialize a QR scanner library like react-qr-reader
    setIsScanning(true);
    setCameraError(null);
    
    // Mock success after 3 seconds for demo purposes
    setTimeout(() => {
      const mockQRData = `event-payment-${Math.floor(Math.random() * 1000)}`;
      handleScanSuccess(mockQRData);
    }, 3000);
  };

  const handleScanSuccess = (data: string) => {
    setIsScanning(false);
    onScanSuccess(data);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code within the frame to make payment for this event.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          {isScanning ? (
            <div className="relative w-full aspect-square max-w-[300px] bg-black rounded-lg overflow-hidden">
              {/* Mock camera view */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-white border-opacity-50 rounded-lg"></div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  {/* Scanning animation */}
                  <div className="w-full h-1 bg-eventhub-primary animate-scan"></div>
                </div>
              </div>
              
              <Button 
                className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
                size="icon"
                variant="ghost"
                onClick={stopScanning}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          ) : (
            <>
              {cameraError ? (
                <div className="text-center p-4">
                  <p className="text-red-500 mb-4">{cameraError}</p>
                  <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Scan className="h-8 w-8 text-eventhub-primary" />
                  </div>
                  <p className="mb-6 text-sm text-gray-500">
                    The camera will be used to scan the organizer's QR code for payment.
                  </p>
                  <Button onClick={startScanning} className="bg-eventhub-primary hover:bg-eventhub-secondary">
                    <Webcam className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
