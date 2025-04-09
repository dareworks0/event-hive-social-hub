
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Layout from '@/components/layout/Layout';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Plus, 
  X, 
  Upload, 
  CalendarIcon, 
  ArrowRight, 
  Info,
  Users,
  DollarSign
} from 'lucide-react';

// Event categories
const EVENT_CATEGORIES = [
  'Music',
  'Technology',
  'Food & Drink',
  'Arts & Culture',
  'Sports & Fitness',
  'Education',
  'Business',
  'Travel',
  'Health & Wellness',
  'Social',
  'Other',
];

// Event tags
const EVENT_TAGS = [
  'Conference',
  'Workshop',
  'Networking',
  'Concert',
  'Festival',
  'Exhibition',
  'Webinar',
  'Meetup',
  'Seminar',
  'Party',
  'Charity',
  'Tournament',
];

const CreateEventPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    startTime: '',
    endTime: '',
    locationType: 'physical',
    venueName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    isPrivate: false,
    maxAttendees: '',
    ticketPrice: '',
    ticketTypes: [
      { name: 'Standard', price: '', quantity: '' }
    ],
    images: [] as File[],
    imageUrls: [] as string[],
    selectedTags: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newUrls = newFiles.map(file => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles],
      imageUrls: [...prev.imageUrls, ...newUrls]
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      if (prev.selectedTags.includes(tag)) {
        return {
          ...prev,
          selectedTags: prev.selectedTags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          selectedTags: [...prev.selectedTags, tag]
        };
      }
    });
  };

  const addTicketType = () => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: '', price: '', quantity: '' }]
    }));
  };

  const updateTicketType = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newTicketTypes = [...prev.ticketTypes];
      newTicketTypes[index] = { ...newTicketTypes[index], [field]: value };
      return { ...prev, ticketTypes: newTicketTypes };
    });
  };

  const removeTicketType = (index: number) => {
    setFormData((prev) => {
      const newTicketTypes = [...prev.ticketTypes];
      newTicketTypes.splice(index, 1);
      return { ...prev, ticketTypes: newTicketTypes };
    });
  };

  const nextStep = () => {
    // Form validation for each step
    if (step === 1) {
      if (!formData.title || !formData.description || !formData.category) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.startDate || !formData.startTime) {
        toast({
          title: "Missing Date/Time",
          description: "Please select a start date and time for your event.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (formData.locationType === 'physical' && (!formData.venueName || !formData.address || !formData.city)) {
        toast({
          title: "Missing Location Information",
          description: "Please fill in the venue details for your event.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the form data to your backend
    console.log('Creating event with data:', formData);

    // Show a success toast
    toast({
      title: "Event Created Successfully!",
      description: "Your event has been created and is now pending approval.",
    });

    // In a real app, redirect to the event management page or event details page
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create a New Event</h1>
                <p className="text-gray-600">Share your event with the world</p>
              </div>

              {/* Progress Steps */}
              <div className="relative mb-12">
                <div className="flex justify-between">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => (
                    <div
                      key={s}
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                        s === step
                          ? 'bg-eventhub-primary text-white'
                          : s < step
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
                <div className="absolute top-5 left-0 right-0 h-0.5 -translate-y-1/2 bg-gray-200 z-0"></div>
                <div
                  className="absolute top-5 left-0 h-0.5 -translate-y-1/2 bg-green-500 z-0 transition-all duration-300"
                  style={{ width: `${(step - 1) * 25}%` }}
                ></div>

                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span className={step >= 1 ? 'text-green-600 font-medium' : ''}>Basic Info</span>
                  <span className={step >= 2 ? 'text-green-600 font-medium' : ''}>Date & Time</span>
                  <span className={step >= 3 ? 'text-green-600 font-medium' : ''}>Location</span>
                  <span className={step >= 4 ? 'text-green-600 font-medium' : ''}>Tickets</span>
                  <span className={step >= 5 ? 'text-green-600 font-medium' : ''}>Media</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base">
                        Event Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Give your event a clear, descriptive name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base">
                        Event Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your event, what attendees can expect, etc."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base">
                        Event Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVENT_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Tags (Select all that apply)</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {EVENT_TAGS.map((tag) => (
                          <Button
                            key={tag}
                            type="button"
                            variant={formData.selectedTags.includes(tag) ? "default" : "outline"}
                            className={`${
                              formData.selectedTags.includes(tag)
                                ? 'bg-eventhub-primary text-white'
                                : 'bg-transparent'
                            }`}
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isPrivate"
                          checked={formData.isPrivate}
                          onCheckedChange={(checked) => handleCheckboxChange('isPrivate', checked as boolean)}
                        />
                        <Label htmlFor="isPrivate" className="text-base">
                          This is a private event (invitation only)
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base">
                          Start Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.startDate ? (
                                format(formData.startDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) => handleDateChange('startDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startTime" className="text-base">
                          Start Time <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base">End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.endDate ? (
                                format(formData.endDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) => handleDateChange('endDate', date)}
                              initialFocus
                              disabled={(date) => (formData.startDate ? date < formData.startDate : false)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime" className="text-base">
                          End Time
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CalendarDays className="h-5 w-5 text-eventhub-primary" />
                        <h3 className="font-medium">Event Duration</h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {formData.startDate ? (
                          <>
                            Your event will start on {format(formData.startDate, 'PPPP')}
                            {formData.startTime && ` at ${formData.startTime}`}
                            {formData.endDate && ` and end on ${format(formData.endDate, 'PPPP')}`}
                            {formData.endTime && ` at ${formData.endTime}`}
                          </>
                        ) : (
                          'Please select a start date and time for your event.'
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <Label className="text-base">
                        Event Type <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.locationType}
                        onValueChange={(value) => handleRadioChange('locationType', value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="physical" id="physical" />
                          <Label htmlFor="physical">Physical Event (In-person)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online Event (Virtual)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <Label htmlFor="hybrid">Hybrid Event (Both)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
                        <h3 className="font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-eventhub-primary" />
                          Physical Location Details
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="venueName" className="text-base">
                            Venue Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="venueName"
                            name="venueName"
                            value={formData.venueName}
                            onChange={handleInputChange}
                            placeholder="e.g., Conference Center, Hotel, Etc."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-base">
                            Street Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address or P.O. Box"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-base">
                              City <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-base">
                              ZIP / Postal Code
                            </Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-base">
                            Country
                          </Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleSelectChange('country', value)}
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="CAN">Canada</SelectItem>
                              <SelectItem value="GBR">United Kingdom</SelectItem>
                              <SelectItem value="AUS">Australia</SelectItem>
                              <SelectItem value="DEU">Germany</SelectItem>
                              <SelectItem value="FRA">France</SelectItem>
                              <SelectItem value="JPN">Japan</SelectItem>
                              <SelectItem value="IND">India</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {(formData.locationType === 'online' || formData.locationType === 'hybrid') && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
                        <h3 className="font-medium">Virtual Event Information</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          The virtual event details and access instructions will be shared with confirmed attendees closer to the event date.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="automaticEmails"
                              checked={true}
                              disabled
                            />
                            <Label htmlFor="automaticEmails">
                              Send automatic reminder emails with access links
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Tickets */}
                {step === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees" className="text-base">
                        Maximum Number of Attendees
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="maxAttendees"
                          name="maxAttendees"
                          type="number"
                          min="1"
                          value={formData.maxAttendees}
                          onChange={handleInputChange}
                          placeholder="Leave blank for unlimited"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">Ticket Types</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTicketType}
                          className="flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Ticket Type
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {formData.ticketTypes.map((ticket, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-4"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">Ticket Type #{index + 1}</h3>
                              {formData.ticketTypes.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTicketType(index)}
                                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`ticket-name-${index}`}>
                                Name
                              </Label>
                              <Input
                                id={`ticket-name-${index}`}
                                value={ticket.name}
                                onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                                placeholder="e.g., Standard, VIP, Early Bird"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`ticket-price-${index}`}>
                                  Price ($)
                                </Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    id={`ticket-price-${index}`}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={ticket.price}
                                    onChange={(e) => updateTicketType(index, 'price', e.target.value)}
                                    placeholder="0.00"
                                    className="pl-10"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`ticket-quantity-${index}`}>
                                  Quantity Available
                                </Label>
                                <Input
                                  id={`ticket-quantity-${index}`}
                                  type="number"
                                  min="1"
                                  value={ticket.quantity}
                                  onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
                                  placeholder="Leave blank for unlimited"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <p className="mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-eventhub-primary" />
                        <span className="font-medium">Ticket Settings</span>
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>You can create multiple ticket types with different prices</li>
                        <li>Set ticket quantities to manage capacity</li>
                        <li>All prices are in USD ($)</li>
                        <li>You'll receive payments 7 days after your event</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 5: Media */}
                {step === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <Label className="text-base">
                        Event Images <span className="text-red-500">*</span>
                      </Label>
                      <p className="text-sm text-gray-600">
                        Upload at least one high-quality image for your event. Recommended size: 1200x630 pixels.
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.imageUrls.map((url, index) => (
                          <div key={index} className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={url}
                              alt={`Event preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}

                        <label className="flex flex-col items-center justify-center aspect-video bg-gray-100 rounded-md border-2 border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="flex flex-col items-center justify-center p-4">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Upload Image</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                          />
                        </label>
                      </div>
                    </div>

                    {/* Marketing and Privacy */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Event Privacy & Marketing</h3>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="publicListing"
                          checked={!formData.isPrivate}
                          onCheckedChange={(checked) => handleCheckboxChange('isPrivate', !checked as boolean)}
                        />
                        <div>
                          <Label htmlFor="publicListing" className="font-medium">
                            List my event on the public explore page
                          </Label>
                          <p className="text-sm text-gray-600">
                            Make your event discoverable to potential attendees browsing EventHub
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="marketing" defaultChecked />
                        <div>
                          <Label htmlFor="marketing" className="font-medium">
                            I want EventHub to help promote my event
                          </Label>
                          <p className="text-sm text-gray-600">
                            We may feature your event in emails, social media, and recommendations
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="termsAgree" defaultChecked required />
                        <div>
                          <Label htmlFor="termsAgree" className="font-medium">
                            I agree to the EventHub Terms & Conditions
                          </Label>
                          <p className="text-sm text-gray-600">
                            By creating this event, you agree to our <a href="/terms" className="text-eventhub-primary hover:underline">Terms of Service</a>, <a href="/privacy" className="text-eventhub-primary hover:underline">Privacy Policy</a>, and <a href="/community" className="text-eventhub-primary hover:underline">Community Guidelines</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  )}

                  {step < 5 ? (
                    <Button
                      type="button"
                      className="bg-eventhub-primary hover:bg-eventhub-secondary ml-auto"
                      onClick={nextStep}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-eventhub-primary hover:bg-eventhub-secondary ml-auto"
                    >
                      Create Event
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEventPage;
