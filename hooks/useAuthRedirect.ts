"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';

export function useAuthRedirect() {
  const { user: generalUser, isLoading: generalLoading } = useAuth();
  const { user: retailerUser, isAuthenticated: isRetailerAuth, loading: retailerLoading } = useRetailerAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if still loading
    if (generalLoading || retailerLoading) return;

    // Get the current user (prioritize retailer auth, then general auth)
    const currentUser = retailerUser || generalUser;

    // If no user is logged in, allow access to public pages
    if (!currentUser) return;

    // RETAILER ACCESS CONTROL (simplified - allow homepage access)
    if (currentUser.role === 'retailer') {
      // Only block access to customer-specific functionality, not homepage
      const prohibitedPaths = [
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

      // Check if retailer is trying to access prohibited content
      const isOnProhibitedPath = prohibitedPaths.some(path => {
        return pathname.startsWith(path);
      });

      // If retailer is on prohibited page, redirect to dashboard
      if (isOnProhibitedPath) {
        router.push('/retailer/dashboard');
        return;
      }

      // Allow homepage and other general pages for retailers
      return;
    }

    // CUSTOMER ACCESS CONTROL
    if (currentUser.role === 'customer') {
      // Don't redirect if already on the correct dashboard
      if (pathname === '/customer-dashboard') return;

      // Don't redirect if on allowed customer pages
      const allowedCustomerPages = [
        '/',
        '/marketplace',
        '/hot-deals', 
        '/cart',
        '/wishlist',
        '/checkout',
        '/products',
        '/categories',
        '/services',
        '/entertainment',
        '/financial-services',
        '/industries',
        '/orders',
        '/profile',
        '/settings',
        '/shop'
      ];

      const isOnAllowedPage = allowedCustomerPages.some(page => {
        if (page === '/') {
          return pathname === page;
        }
        return pathname.startsWith(page);
      });

      if (isOnAllowedPage) return;

      // Redirect to appropriate dashboard for login/signup pages
      if (pathname === '/login' || pathname === '/signup') {
        router.push('/customer-dashboard');
        return;
      }
    }

    // ADMIN ACCESS CONTROL
    if (currentUser.role === 'admin') {
      if (pathname === '/admin') return;
      
      if (pathname === '/login' || pathname === '/signup') {
        router.push('/admin');
        return;
      }
    }
  }, [generalUser, retailerUser, generalLoading, retailerLoading, pathname, router]);
}
