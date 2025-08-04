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
  const { user: retailerUser, loading: retailerLoading } = useRetailerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for auth systems to load
    if (generalLoading || retailerLoading) return;

    // Get current authenticated user
    const currentUser = retailerUser || generalUser;

    // If user is authenticated and on homepage, redirect to their dashboard
    if (currentUser && pathname === '/') {
      const dashboardPath = currentUser.role === 'retailer'
        ? '/retailer/dashboard'
        : '/customer-dashboard';

      console.log(`Authenticated ${currentUser.role} detected on homepage, redirecting to ${dashboardPath}`);
      router.push(dashboardPath);
      return;
    }

    // Block retailers from customer-specific areas
    if (currentUser?.role === 'retailer' && pathname !== '/') {
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
        console.log('Retailer detected on customer path, redirecting to dashboard');
        router.push('/retailer/dashboard');
        return;
      }
    }
  }, [generalUser, retailerUser, generalLoading, retailerLoading, pathname, router]);

  // Don't render homepage content if user is authenticated (will be redirected)
  const currentUser = retailerUser || generalUser;
  if (currentUser && pathname === '/') {
    return null;
  }

  return <>{children}</>;
}
