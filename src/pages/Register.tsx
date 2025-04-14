
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/layout/Layout';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, User, Building, UserPlus2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

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
  const { signUp, user, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'user';
  
  const [activeTab, setActiveTab] = useState<string>(defaultRole);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    city: '',
    interests: [] as string[],
    acceptTerms: false,
    newsletterOpt: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
      // Common validation for both roles
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
      
      // Organizer-specific validation
      if (activeTab === 'organizer' && !formData.companyName) {
        toast({
          title: "Missing Information",
          description: "Please enter your company or organization name.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (activeTab === 'user' && formData.interests.length === 0) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        activeTab // Pass the role
      );
      
      setShowOtpVerification(true);
      // Registration success is handled by the toast in signUp
      // The user will need to verify their email with OTP
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await verifyOtp(formData.email, otp);
      // Redirect is handled by the auth state change in useEffect
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
      console.error('OTP verification error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOtpVerification) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
                <p className="mt-2 text-gray-600">Enter the code sent to {formData.email}</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                    containerClassName="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="button"
                  className="w-full bg-eventhub-primary hover:bg-eventhub-secondary"
                  disabled={otp.length !== 6 || isSubmitting}
                  onClick={handleVerifyOtp}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </Button>

                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Didn't receive a code?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-eventhub-primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Resend
                    </Button>
                  </p>
                </div>

                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-eventhub-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-eventhub-primary/5 to-eventhub-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl animate-fade-in">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
              <p className="mt-2 text-gray-600">Join EventHub to discover and attend amazing events</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="user" className="data-[state=active]:bg-eventhub-primary data-[state=active]:text-white">
                  <User className="mr-2 h-4 w-4" />
                  Attendee
                </TabsTrigger>
                <TabsTrigger value="organizer" className="data-[state=active]:bg-eventhub-primary data-[state=active]:text-white">
                  <Building className="mr-2 h-4 w-4" />
                  Organizer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <Card>
                  <CardContent className="p-0 pt-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Create an account to attend events, purchase tickets, and connect with other attendees.
                    </p>
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-md">
                      <UserPlus2 className="h-5 w-5 text-blue-500" />
                      <span className="text-blue-700 text-sm">Get personalized event recommendations</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="organizer">
                <Card>
                  <CardContent className="p-0 pt-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Create an account to host and manage events, sell tickets, and grow your audience.
                    </p>
                    <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-md">
                      <Users className="h-5 w-5 text-purple-500" />
                      <span className="text-purple-700 text-sm">Access to organizer tools and analytics</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Step indicators */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      s === step
                        ? 'bg-eventhub-primary text-white scale-110'
                        : s < step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-0.5 w-10 transition-all duration-500 ${
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
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
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
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
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
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>

                  {activeTab === 'organizer' && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Organization/Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
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
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: User Preferences / Organization Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {activeTab === 'user' && (
                    <div className="space-y-3">
                      <Label>Event Categories You're Interested In</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {INTERESTS.map((interest) => (
                          <div key={interest.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest.id}
                              checked={formData.interests.includes(interest.id)}
                              onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                              className="data-[state=checked]:bg-eventhub-primary"
                            />
                            <Label htmlFor={interest.id}>{interest.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'organizer' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="font-medium mb-2">Organizer Benefits</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Create and manage unlimited events</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Access detailed analytics and reporting</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Receive payments directly for ticket sales</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <span>Promote events to our community</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleCheckboxChange('acceptTerms', checked as boolean)}
                        required
                        className="data-[state=checked]:bg-eventhub-primary"
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
                        className="data-[state=checked]:bg-eventhub-primary"
                      />
                      <Label htmlFor="newsletterOpt" className="text-sm">
                        Send me newsletters with updates and promotions
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
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
                    {activeTab === 'organizer' && (
                      <p className="text-sm">
                        <span className="text-gray-500">Organization:</span> {formData.companyName}
                      </p>
                    )}
                    {activeTab === 'user' && formData.interests.length > 0 && (
                      <p className="text-sm">
                        <span className="text-gray-500">Interests:</span> {formData.interests.map(id => INTERESTS.find(i => i.id === id)?.label).join(', ')}
                      </p>
                    )}
                    <p className="text-sm">
                      <span className="text-gray-500">Account Type:</span> {activeTab === 'organizer' ? 'Event Organizer' : 'Event Attendee'}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && step < 3 && (
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

                {step < 3 && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-eventhub-primary hover:bg-eventhub-secondary ml-auto flex items-center transition-all duration-300"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {step === 3 && (
                  <Button
                    type="submit"
                    className="bg-eventhub-primary hover:bg-eventhub-secondary w-full flex items-center justify-center transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
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
