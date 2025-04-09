
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Layout from '@/components/layout/Layout';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// City options for the dropdown
const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

// Interest categories
const INTERESTS = [
  { id: 'music', label: 'Music' },
  { id: 'tech', label: 'Technology' },
  { id: 'food', label: 'Food & Drink' },
  { id: 'arts', label: 'Arts & Culture' },
  { id: 'sports', label: 'Sports & Fitness' },
  { id: 'education', label: 'Education' },
  { id: 'business', label: 'Business' },
  { id: 'travel', label: 'Travel' },
];

const RegisterPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    gender: '',
    age: [25],
    budget: [50],
    interests: [] as string[],
    acceptTerms: false,
    newsletterOpt: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, interest] };
      } else {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      }
    });
  };

  const nextStep = () => {
    // Basic validation for each step
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (formData.password.length < 8) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (!formData.city || !formData.gender) {
        toast({
          title: "Missing Information",
          description: "Please select your city and gender.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 3) {
      if (formData.interests.length === 0) {
        toast({
          title: "No Interests Selected",
          description: "Please select at least one interest.",
          variant: "destructive",
        });
        return;
      }

      if (!formData.acceptTerms) {
        toast({
          title: "Terms Not Accepted",
          description: "You must accept the terms and conditions to continue.",
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
    
    // Here you would typically submit the form data to your backend
    console.log('Form submitted:', formData);

    // Show success toast
    toast({
      title: "Registration Successful!",
      description: "Welcome to EventHub! Redirecting to login...",
    });

    // In a real app, you'd redirect to the login page or dashboard after successful registration
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
              <p className="mt-2 text-gray-600">Join EventHub to discover and attend amazing events</p>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s === step
                        ? 'bg-eventhub-primary text-white'
                        : s < step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-0.5 w-10 ${
                        s < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select 
                      value={formData.city} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                      className="flex space-x-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="py-4">
                      <Slider
                        value={formData.age}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
                        max={100}
                        step={1}
                      />
                      <div className="mt-2 text-center">
                        {formData.age[0]} years
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Average Event Budget ($)</Label>
                    <div className="py-4">
                      <Slider
                        value={formData.budget}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                        max={500}
                        step={10}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>$0</span>
                        <span>${formData.budget[0]}</span>
                        <span>$500+</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Interests & Terms */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <Label>Event Categories You're Interested In</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {INTERESTS.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest.id}
                            checked={formData.interests.includes(interest.id)}
                            onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                          />
                          <Label htmlFor={interest.id}>{interest.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleCheckboxChange('acceptTerms', checked as boolean)}
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        I accept the <Link to="/terms" className="text-eventhub-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-eventhub-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletterOpt"
                        checked={formData.newsletterOpt}
                        onCheckedChange={(checked) => handleCheckboxChange('newsletterOpt', checked as boolean)}
                      />
                      <Label htmlFor="newsletterOpt" className="text-sm">
                        Send me newsletters with updates and promotions
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center space-y-6 animate-fade-in">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Almost There!
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Review your information and complete your registration
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <h4 className="font-medium mb-2">Account Information</h4>
                    <p className="text-sm">
                      <span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Email:</span> {formData.email}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">City:</span> {formData.city}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Age:</span> {formData.age[0]}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Interests:</span> {formData.interests.map(id => INTERESTS.find(i => i.id === id)?.label).join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && step < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}

                {step < 4 && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-eventhub-primary hover:bg-eventhub-secondary ml-auto flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {step === 4 && (
                  <Button
                    type="submit"
                    className="bg-eventhub-primary hover:bg-eventhub-secondary w-full flex items-center justify-center"
                  >
                    Complete Registration
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>

              {/* Sign In Link */}
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-eventhub-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
