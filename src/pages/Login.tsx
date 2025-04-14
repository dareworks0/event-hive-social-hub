
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff, Mail, Lock, Chrome } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, user, verifyOtp } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const result = await signIn(formData.email, formData.password);
      
      if (result && result.needsOtp) {
        setShowOtpVerification(true);
        toast({
          title: "OTP Sent",
          description: "We've sent a verification code to your email. Please check and enter the code.",
        });
      }
      // If OTP is not needed, redirection is handled by the auth state change in useEffect
    } catch (error) {
      console.error('Login error:', error);
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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Redirect is handled by the OAuth callback
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to your EventHub account</p>
            </div>

            {!showOtpVerification ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-eventhub-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-eventhub-primary hover:bg-eventhub-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Enter Verification Code</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We sent a 6-digit code to {formData.email}
                  </p>
                </div>

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

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowOtpVerification(false)}
                >
                  Back to Login
                </Button>
              </div>
            )}

            {!showOtpVerification && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      className="w-full h-12"
                      onClick={handleGoogleSignIn}
                    >
                      <Chrome className="h-5 w-5 mr-2" />
                      <span>Sign in with Google</span>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-eventhub-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
