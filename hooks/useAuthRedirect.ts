"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function useAuthRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if still loading or no user
    if (isLoading || !user) return;

    // Don't redirect if already on the correct dashboard
    const isOnCorrectDashboard = 
      (user.role === 'customer' && pathname === '/customer-dashboard') ||
      (user.role === 'retailer' && pathname === '/retailer/dashboard') ||
      (user.role === 'admin' && pathname === '/admin');

    if (isOnCorrectDashboard) return;

    // Don't redirect if on certain pages where user should stay
    const allowedPages = [
      '/marketplace',
      '/hot-deals',
      '/cart',
      '/wishlist',
      '/checkout',
      '/products',
      '/categories',
      '/orders',
      '/profile',
      '/settings'
    ];

    const isOnAllowedPage = allowedPages.some(page => pathname.startsWith(page));
    if (isOnAllowedPage) return;

    // Don't redirect if on homepage (let user navigate freely)
    if (pathname === '/') return;

    // Redirect to appropriate dashboard for login/signup pages
    if (pathname === '/login' || pathname === '/signup') {
      switch (user.role) {
        case 'customer':
          router.push('/customer-dashboard');
          break;
        case 'retailer':
          router.push('/retailer/dashboard');
          break;
        case 'admin':
          router.push('/admin');
          break;
      }
    }
  }, [user, isLoading, pathname, router]);
}
