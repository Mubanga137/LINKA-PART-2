'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';

interface HomepageAccessGuardProps {
  children: React.ReactNode;
}

export function HomepageAccessGuard({ children }: HomepageAccessGuardProps) {
  const { user: generalUser, isLoading: generalLoading } = useAuth();
  const { user: retailerUser, isAuthenticated: isRetailerAuth, loading: retailerLoading } = useRetailerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for auth systems to load
    if (generalLoading || retailerLoading) return;

    // Check if user is a retailer from either auth system
    const isRetailer = retailerUser || generalUser?.role === 'retailer';

    // If retailer tries to access homepage or customer areas, redirect to retailer dashboard
    if (isRetailer) {
      const customerOnlyPaths = [
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

      const isCustomerPath = customerOnlyPaths.some(path => {
        if (path === '/') {
          return pathname === path;
        }
        return pathname.startsWith(path);
      });

      if (isCustomerPath) {
        router.push('/retailer/dashboard');
        return;
      }
    }
  }, [generalUser, retailerUser, generalLoading, retailerLoading, pathname, router]);

  // Check if current user is a retailer
  const isRetailer = retailerUser || generalUser?.role === 'retailer';

  // If retailer, don't render homepage content
  if (isRetailer) {
    return null;
  }

  return <>{children}</>;
}
