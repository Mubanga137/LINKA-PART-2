'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  Store, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';

export default function RetailerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useRetailerAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const redirectUrl = searchParams.get('redirect') || '/retailer/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push(redirectUrl);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = () => {
    setEmail('john.doe@techhubzm.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LINKA</h1>
                <p className="text-sm text-gray-600">Business Dashboard</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Retailer</h2>
            <p className="text-gray-600">Sign in to manage your store and track your business performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Powerful Tools for Your Business
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Order Management</h4>
                      <p className="text-gray-600 text-sm">
                        Track orders from placement to delivery with real-time updates and customer communication
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Product & Service Management</h4>
                      <p className="text-gray-600 text-sm">
                        Easily manage your inventory, services, pricing, and availability in one place
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Mobile Money Integration</h4>
                      <p className="text-gray-600 text-sm">
                        Accept payments via MTN Money, Airtel Money, and other local payment methods
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics & Reports</h4>
                      <p className="text-gray-600 text-sm">
                        Get detailed insights into your sales, customers, and business performance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Secure & Trusted Platform</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Your business data is protected with enterprise-grade security. Join thousands of 
                  successful retailers already using Linka to grow their business in Zambia.
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full">
              <Card className="w-full max-w-md mx-auto shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Sign In to Your Store
                  </CardTitle>
                  <p className="text-gray-600">Enter your credentials to access your dashboard</p>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert className="mb-6 border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                          Remember me
                        </Label>
                      </div>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Sign In to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  {/* Demo Login */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={demoLogin}
                    >
                      Try Demo Account
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Use demo credentials to explore the dashboard
                    </p>
                  </div>

                  {/* Sign Up Link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have a store account?{' '}
                      <Link 
                        href="/register/retailer" 
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Register your business
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Are you a customer looking to shop?
                </p>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Customer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
