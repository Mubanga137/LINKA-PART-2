'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';

interface RetailerRouteGuardProps {
  children: React.ReactNode;
}

export function RetailerRouteGuard({ children }: RetailerRouteGuardProps) {
  const { user: generalUser, isLoading: generalLoading } = useAuth();
  const { user: retailerUser, isAuthenticated: isRetailerAuth, loading: retailerLoading } = useRetailerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for both auth systems to load
    if (generalLoading || retailerLoading) return;

    // Get the authenticated retailer user from either system
    const retailerAuthUser = retailerUser || (generalUser?.role === 'retailer' ? generalUser : null);

    // If no retailer user is authenticated, redirect to login
    if (!retailerAuthUser) {
      router.push('/login/retailer?redirect=' + encodeURIComponent(pathname));
      return;
    }

    // If retailer tries to access public/customer pages, redirect to dashboard
    const prohibitedPaths = [
      '/',
      '/home',
      '/marketplace',
      '/marketplace-simple',
      '/hot-deals',
      '/customer-dashboard',
      '/become-retailer',
      '/for-retailers',
      '/retailers',
      '/shop',
      '/categories',
      '/services',
      '/entertainment',
      '/financial-services',
      '/industries'
    ];

    // Check if current path is prohibited for retailers
    const isProhibitedPath = prohibitedPaths.some(path => {
      if (path === '/') {
        return pathname === path;
      }
      return pathname.startsWith(path);
    });

    if (isProhibitedPath) {
      router.push('/retailer/dashboard');
      return;
    }

    // Ensure retailer is on a valid retailer route
    if (!pathname.startsWith('/retailer/')) {
      router.push('/retailer/dashboard');
      return;
    }
  }, [generalUser, retailerUser, generalLoading, retailerLoading, isRetailerAuth, pathname, router]);

  // Show loading while checking authentication
  if (generalLoading || retailerLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Get the authenticated retailer user
  const retailerAuthUser = retailerUser || (generalUser?.role === 'retailer' ? generalUser : null);

  // If no retailer authentication, don't render children
  if (!retailerAuthUser) {
    return null;
  }

  return <>{children}</>;
}
