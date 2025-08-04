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

    // STRICT RETAILER ACCESS CONTROL - No homepage access allowed
    if (currentUser.role === 'retailer') {
      // CRITICAL: Block homepage access completely
      if (pathname === '/' || pathname === '/home') {
        console.log('useAuthRedirect: Retailer attempted homepage access, redirecting to dashboard');
        router.push('/retailer/dashboard');
        return;
      }

      // Block access to all customer-specific functionality
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
        console.log('useAuthRedirect: Retailer attempted prohibited path access:', pathname);
        router.push('/retailer/dashboard');
        return;
      }

      // If retailer is not on a retailer route, redirect to dashboard
      if (!pathname.startsWith('/retailer/') && pathname !== '/about' && pathname !== '/contact') {
        console.log('useAuthRedirect: Retailer on non-retailer route, redirecting to dashboard:', pathname);
        router.push('/retailer/dashboard');
        return;
      }

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
