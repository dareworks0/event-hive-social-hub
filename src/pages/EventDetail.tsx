
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart, 
  Bookmark, 
  Info, 
  MessageSquare, 
  User,
  Send,
  ArrowRight,
  Ticket,
  CreditCard
} from 'lucide-react';

// Mock event data
const EVENT_DATA = {
  id: '1',
  title: 'Tech Conference 2025',
  description: 'Join us for the biggest tech event of the year! This conference brings together industry leaders, innovators, and tech enthusiasts for two days of learning, networking, and inspiration. Explore the latest trends in AI, blockchain, cloud computing, and more through engaging talks, hands-on workshops, and interactive demos.',
  longDescription: 'This year's conference theme is "Building the Future: Technology for Good" and will focus on how technology can address global challenges and create positive social impact. The conference features keynote speeches from renowned tech leaders, panel discussions on emerging technologies, hands-on workshops, networking opportunities, and a startup showcase where innovative companies will demonstrate their cutting-edge products and services. Whether you're a developer, entrepreneur, industry professional, or tech enthusiast, this conference offers valuable insights and connections for everyone in the tech ecosystem.',
  date: 'May 15-16, 2025',
  time: '9:00 AM - 5:00 PM',
  location: 'Silicon Valley Convention Center',
  address: '123 Tech Avenue, San Francisco, CA 94107',
  category: 'Technology',
  organizer: 'TechConnect Global',
  organizerLogo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=150&q=80',
  attendees: 1250,
  price: 299,
  tags: ['AI', 'Blockchain', 'Cloud', 'DevOps', 'Product Management'],
  images: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
  ],
  agenda: [
    {
      day: 'Day 1 - May 15',
      items: [
        { time: '8:00 AM - 9:00 AM', title: 'Registration & Breakfast' },
        { time: '9:00 AM - 10:00 AM', title: 'Opening Keynote: The Future of Technology' },
        { time: '10:15 AM - 11:45 AM', title: 'Panel: AI Ethics and Governance' },
        { time: '12:00 PM - 1:00 PM', title: 'Lunch Break & Networking' },
        { time: '1:15 PM - 2:45 PM', title: 'Workshop: Building with Modern JavaScript Frameworks' },
        { time: '3:00 PM - 4:30 PM', title: 'Talk: Cloud Native Application Architecture' },
        { time: '4:45 PM - 5:30 PM', title: 'Lightning Talks: Emerging Technologies' },
        { time: '6:00 PM - 8:00 PM', title: 'Evening Reception & Networking Mixer' },
      ]
    },
    {
      day: 'Day 2 - May 16',
      items: [
        { time: '8:30 AM - 9:30 AM', title: 'Breakfast & Morning Networking' },
        { time: '9:30 AM - 10:30 AM', title: 'Keynote: Cybersecurity in the Digital Age' },
        { time: '10:45 AM - 12:15 PM', title: 'Workshop: Practical Machine Learning' },
        { time: '12:30 PM - 1:30 PM', title: 'Lunch Break' },
        { time: '1:45 PM - 3:15 PM', title: 'Panel: The Future of Work in Tech' },
        { time: '3:30 PM - 4:30 PM', title: 'Startup Showcase & Demo Session' },
        { time: '4:45 PM - 5:30 PM', title: 'Closing Keynote & Awards Ceremony' },
      ]
    }
  ],
  speakers: [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director, TechCorp',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      bio: 'Leading expert in artificial intelligence and machine learning with over 15 years of experience.'
    },
    {
      name: 'Michael Johnson',
      role: 'CTO, FutureSoft',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      bio: 'Technology leader specializing in cloud architecture and distributed systems.'
    },
    {
      name: 'Jessica Williams',
      role: 'Blockchain Strategist',
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=150&q=80',
      bio: 'Expert in blockchain technology and cryptocurrency ecosystems.'
    },
    {
      name: 'David Patel',
      role: 'Product Lead, InnovateCo',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Product management specialist with experience in launching successful tech products.'
    },
  ],
  ticketTypes: [
    { id: 'standard', name: 'Standard Ticket', price: 299, available: 350 },
    { id: 'premium', name: 'Premium Ticket', price: 499, available: 120 },
    { id: 'vip', name: 'VIP Access', price: 899, available: 25 },
  ],
};

// Mock chat messages
const CHAT_MESSAGES = [
  {
    id: '1',
    user: {
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
    message: 'Is anyone else coming from New York to the conference?',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    user: {
      name: 'Jake Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    message: 'I am! Planning to arrive the day before. Would be great to connect!',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=150&q=80',
    },
    message: 'Anyone know if they will provide slides of the presentations after the conference?',
    timestamp: '45 minutes ago',
  },
  {
    id: '4',
    user: {
      name: 'Event Organizer',
      avatar: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=150&q=80',
    },
    message: 'Yes, all attendees will receive access to presentation materials after the event. Looking forward to seeing everyone there!',
    timestamp: '30 minutes ago',
  },
];

// Label component for the booking dialog
const Label = ({ htmlFor, children }: { htmlFor?: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
);

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    ticketType: '',
    quantity: '1',
    totalPrice: 0,
  });
  const [newMessage, setNewMessage] = useState('');

  const handleTicketTypeChange = (value: string) => {
    const selectedTicket = EVENT_DATA.ticketTypes.find(ticket => ticket.id === value);
    if (selectedTicket) {
      setBookingData({
        ...bookingData,
        ticketType: value,
        totalPrice: selectedTicket.price * parseInt(bookingData.quantity)
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;
    const selectedTicket = EVENT_DATA.ticketTypes.find(ticket => ticket.id === bookingData.ticketType);
    if (selectedTicket) {
      setBookingData({
        ...bookingData,
        quantity,
        totalPrice: selectedTicket.price * parseInt(quantity)
      });
    } else {
      setBookingData({
        ...bookingData,
        quantity
      });
    }
  };

  const handleBookTicket = () => {
    if (!bookingData.ticketType) {
      toast({
        title: "Ticket Type Required",
        description: "Please select a ticket type before booking.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Successful!",
      description: `You've booked ${bookingData.quantity} ${bookingData.ticketType} tickets for ${EVENT_DATA.title}`,
    });

    console.log('Booking data:', bookingData);
    setIsBooking(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been posted to the event chat.",
    });
    
    setNewMessage('');
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Event Header */}
        <div className="bg-eventhub-primary text-white py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{EVENT_DATA.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {EVENT_DATA.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {EVENT_DATA.time}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {EVENT_DATA.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <Badge className="bg-eventhub-accent text-white">{EVENT_DATA.category}</Badge>
                  <span className="ml-3 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {EVENT_DATA.attendees} attending
                  </span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex flex-col space-y-2">
                <Button className="bg-eventhub-accent hover:bg-eventhub-accent/90 text-white" onClick={() => setIsBooking(true)}>
                  Book Tickets
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="container mx-auto max-w-5xl px-4 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Image Gallery */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-72 sm:h-96">
                  <img
                    src={EVENT_DATA.images[selectedImage]}
                    alt={EVENT_DATA.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex space-x-2">
                  {EVENT_DATA.images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 cursor-pointer rounded-md overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-eventhub-primary' : ''
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${EVENT_DATA.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Tabs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="about">
                  <TabsList className="w-full justify-start border-b rounded-none p-0">
                    <TabsTrigger value="about" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-eventhub-primary">
                      About
                    </TabsTrigger>
                    <TabsTrigger value="agenda" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-eventhub-primary">
                      Agenda
                    </TabsTrigger>
                    <TabsTrigger value="speakers" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-eventhub-primary">
                      Speakers
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-eventhub-primary">
                      Event Chat
                    </TabsTrigger>
                  </TabsList>

                  {/* About Tab */}
                  <TabsContent value="about" className="p-6 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">About This Event</h2>
                    <p className="mb-4 text-gray-700">{EVENT_DATA.description}</p>
                    <p className="mb-6 text-gray-700">{EVENT_DATA.longDescription}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Event Tags</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {EVENT_DATA.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-eventhub-primary mt-1" />
                        <div>
                          <p className="font-medium">{EVENT_DATA.location}</p>
                          <p className="text-gray-600">{EVENT_DATA.address}</p>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg overflow-hidden h-48 bg-gray-200">
                        {/* Map placeholder */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <p className="text-gray-500">Interactive Map</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Organizer</h3>
                    <div className="flex items-center gap-4">
                      <img 
                        src={EVENT_DATA.organizerLogo} 
                        alt={EVENT_DATA.organizer}
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      <div>
                        <p className="font-medium">{EVENT_DATA.organizer}</p>
                        <p className="text-sm text-gray-600">Event Organizer</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Agenda Tab */}
                  <TabsContent value="agenda" className="p-6 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Event Schedule</h2>
                    <div className="space-y-8">
                      {EVENT_DATA.agenda.map((day, dayIndex) => (
                        <div key={dayIndex}>
                          <h3 className="text-lg font-semibold mb-4 text-eventhub-primary">{day.day}</h3>
                          <div className="space-y-4">
                            {day.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex border-l-2 border-eventhub-primary pl-4">
                                <div className="min-w-28 font-medium text-sm text-gray-600">
                                  {item.time}
                                </div>
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Speakers Tab */}
                  <TabsContent value="speakers" className="p-6 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Featured Speakers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {EVENT_DATA.speakers.map((speaker, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-eventhub-primary mb-1">{speaker.role}</p>
                            <p className="text-sm text-gray-600">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Chat Tab */}
                  <TabsContent value="chat" className="p-0 animate-fade-in">
                    <div className="p-4 border-b bg-gray-50">
                      <h2 className="font-semibold">Event Chat</h2>
                      <p className="text-sm text-gray-600">
                        Connect with other attendees and ask questions
                      </p>
                    </div>
                    
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                      {CHAT_MESSAGES.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <img
                            src={message.user.avatar}
                            alt={message.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-baseline">
                              <span className="font-medium">{message.user.name}</span>
                              <span className="ml-2 text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <p className="text-gray-700">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Ticket Information</h2>
                <div className="space-y-4">
                  {EVENT_DATA.ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="flex justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-gray-600">{ticket.available} available</p>
                      </div>
                      <p className="font-bold">${ticket.price}</p>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-6 bg-eventhub-primary hover:bg-eventhub-secondary"
                  onClick={() => setIsBooking(true)}
                >
                  Book Now
                </Button>
              </div>

              {/* Event Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CalendarDays className="h-5 w-5 text-eventhub-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">{EVENT_DATA.date}</p>
                      <p className="text-gray-600">{EVENT_DATA.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-eventhub-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{EVENT_DATA.location}</p>
                      <p className="text-gray-600">{EVENT_DATA.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-eventhub-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-gray-600">{EVENT_DATA.attendees} people attending</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-eventhub-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Event Type</p>
                      <p className="text-gray-600">In-person</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Event */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Share This Event</h2>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891a1.001 1.001 0 000-2.001 1.001 1.001 0 000 2.001zm8 6.891h-1.999v-2.861c0-1.881-2-1.722-2-1.722V16h-2v-6h2v.788c.8-1.168 3.999-.682 3.999 2.62V16z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBooking} onOpenChange={setIsBooking}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Tickets</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="ticketType">Select Ticket Type</Label>
              <Select onValueChange={handleTicketTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a ticket type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_DATA.ticketTypes.map((ticket) => (
                    <SelectItem key={ticket.id} value={ticket.id}>
                      {ticket.name} - ${ticket.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="10"
                value={bookingData.quantity}
                onChange={handleQuantityChange}
              />
            </div>

            {bookingData.ticketType && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    {bookingData.quantity} x {EVENT_DATA.ticketTypes.find(t => t.id === bookingData.ticketType)?.name}
                  </span>
                  <span>${bookingData.totalPrice}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${bookingData.totalPrice}</span>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Payment Methods</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit Card
                </Button>
                <Button variant="outline" className="justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M6.5 6.5h11v11h-11z"></path>
                    <path d="M13 13l5-5"></path>
                    <path d="M10 7l7 7"></path>
                  </svg>
                  PayPal
                </Button>
              </div>
            </div>

            <Button
              className="w-full bg-eventhub-primary hover:bg-eventhub-secondary flex items-center justify-center"
              onClick={handleBookTicket}
            >
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EventDetailPage;

