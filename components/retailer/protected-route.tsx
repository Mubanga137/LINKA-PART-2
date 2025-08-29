'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';
import { AlertCircle, Shield, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredFeature?: string;
  fallbackComponent?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredFeature,
  fallbackComponent 
}: ProtectedRouteProps) {
  const { 
    isAuthenticated, 
    isRetailer, 
    loading, 
    user, 
    store, 
    hasPermission, 
    canAccessFeature 
  } = useRetailerAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isRetailer)) {
      router.push('/login/retailer');
    }
  }, [isAuthenticated, isRetailer, loading, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !isRetailer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              You need to be signed in as a retailer to access this page.
            </p>
            <Button onClick={() => router.push('/login/retailer')} className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check store status
  if (store?.status === 'suspended') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Store Suspended
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Your store has been temporarily suspended. Please contact support for assistance.
            </p>
            <Button variant="outline" onClick={() => router.push('/contact')} className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Insufficient Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              You don't have permission to access this feature. Please upgrade your plan to access this functionality.
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push('/retailer/studio')} className="w-full">
                Return to Dashboard
              </Button>
              <Button variant="outline" onClick={() => router.push('/upgrade')} className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check required feature access
  if (requiredFeature && !canAccessFeature(requiredFeature)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Feature Not Available
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-2">
              This feature is not included in your current subscription plan.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Current Plan: <span className="font-medium capitalize">{store?.subscription}</span>
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push('/upgrade')} className="w-full">
                Upgrade to Access
              </Button>
              <Button variant="outline" onClick={() => router.push('/retailer/studio')} className="w-full">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show verification warning if store is not verified
  if (!store?.verified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Store Verification Required:</strong> Your store is pending verification. 
              Some features may be limited until verification is complete.{' '}
              <Button variant="link" className="p-0 h-auto text-yellow-800 underline">
                Complete verification
              </Button>
            </AlertDescription>
          </Alert>
          {children}
        </div>
      </div>
    );
  }

  // All checks passed, render the protected content
  return <>{children}</>;
}

// Helper component for feature-gated content
export function FeatureGate({ 
  feature, 
  permission, 
  children, 
  fallback 
}: {
  feature?: string;
  permission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasPermission, canAccessFeature } = useRetailerAuth();

  const hasAccess = 
    (!permission || hasPermission(permission)) &&
    (!feature || canAccessFeature(feature));

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

// Helper component for subscription-based features
export function SubscriptionGate({ 
  requiredPlan, 
  children, 
  fallback 
}: {
  requiredPlan: 'basic' | 'premium' | 'enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { store } = useRetailerAuth();

  const planHierarchy = {
    free: 0,
    basic: 1,
    premium: 2,
    enterprise: 3
  };

  const currentPlanLevel = planHierarchy[store?.subscription || 'free'];
  const requiredPlanLevel = planHierarchy[requiredPlan];

  if (currentPlanLevel < requiredPlanLevel) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
