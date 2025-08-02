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

    // Check if user is a retailer from either auth system
    const isRetailer = retailerUser || generalUser?.role === 'retailer';

    // Only block retailers from customer-specific areas (not homepage)
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
  }, [generalUser, retailerUser, generalLoading, retailerLoading, pathname, router]);

  return <>{children}</>;
}
