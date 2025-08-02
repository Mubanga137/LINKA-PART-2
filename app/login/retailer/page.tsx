'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Store, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';

export default function RetailerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: generalLogin } = useAuth();
  const { login: retailerLogin } = useRetailerAuth();
  const router = useRouter();

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Try retailer auth first
      const success = await retailerLogin('retailer@demo.com', 'demo123');
      
      if (success) {
        // Redirect to retailer dashboard
        router.push('/retailer/dashboard');
      } else {
        setError('Demo login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during demo login.');
      console.error('Demo login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First try retailer-specific auth
      const retailerSuccess = await retailerLogin(email, password);
      
      if (retailerSuccess) {
        router.push('/retailer/dashboard');
        return;
      }

      // If retailer auth fails, try general auth for retailer emails
      if (email.includes('retailer') || email.includes('store') || email.includes('business')) {
        const generalResult = await generalLogin(email, password);
        if (generalResult.success) {
          router.push('/retailer/dashboard');
          return;
        }
      }

      setError('Invalid email or password. Please check your credentials.');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Retailer Portal</h1>
          <p className="text-slate-600">Sign in to manage your business</p>
        </div>

        {/* Demo Login Card */}
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg text-indigo-900">Quick Demo Access</CardTitle>
            <CardDescription className="text-indigo-700">
              Try the retailer dashboard instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Store className="h-4 w-4 mr-2" />
              )}
              Access Demo Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your retailer credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-colors focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-colors focus:border-indigo-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : null}
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-slate-600">
                Don't have a retailer account?{' '}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Apply to become a retailer
                </Link>
              </p>
              <p className="text-xs text-slate-500">
                Customer account?{' '}
                <Link href="/login" className="text-slate-700 hover:text-slate-900">
                  Customer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-slate-900 mb-2">Demo Credentials</h3>
            <div className="space-y-1 text-sm text-slate-600">
              <p><strong>Email:</strong> retailer@demo.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Use these credentials to explore the retailer dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
