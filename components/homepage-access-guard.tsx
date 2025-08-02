'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [allowHomepage, setAllowHomepage] = useState(false);

  useEffect(() => {
    // Check if homepage access is explicitly allowed via query parameter
    const allowHomepageParam = searchParams.get('allow-homepage') === 'true';
    setAllowHomepage(allowHomepageParam);
  }, [searchParams]);

  useEffect(() => {
    // Wait for auth systems to load
    if (generalLoading || retailerLoading) return;

    // Check if user is a retailer from either auth system
    const isRetailer = retailerUser || generalUser?.role === 'retailer';

    // For retailers accessing homepage
    if (isRetailer && pathname === '/') {
      // If homepage access is not explicitly allowed, redirect to retailer dashboard
      if (!allowHomepage) {
        router.push('/retailer/dashboard');
        return;
      }
    }

    // For retailers accessing other customer-only areas (always redirect)
    if (isRetailer && pathname !== '/') {
      const customerOnlyPaths = [
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
        '/industries',
        '/cart',
        '/wishlist',
        '/checkout'
      ];

      const isCustomerPath = customerOnlyPaths.some(path =>
        pathname.startsWith(path)
      );

      if (isCustomerPath) {
        router.push('/retailer/dashboard');
        return;
      }
    }
  }, [generalUser, retailerUser, generalLoading, retailerLoading, pathname, router, allowHomepage]);

  // Check if current user is a retailer
  const isRetailer = retailerUser || generalUser?.role === 'retailer';

  // If retailer accessing homepage without permission, don't render content
  if (isRetailer && pathname === '/' && !allowHomepage) {
    return null;
  }

  // If retailer on other customer pages, don't render content
  if (isRetailer && pathname !== '/') {
    const customerOnlyPaths = [
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
      '/industries',
      '/cart',
      '/wishlist',
      '/checkout'
    ];

    const isCustomerPath = customerOnlyPaths.some(path =>
      pathname.startsWith(path)
    );

    if (isCustomerPath) {
      return null;
    }
  }

  return <>{children}</>;
}
