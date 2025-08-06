"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { SafeNavigation } from "@/lib/safe-navigation";
import { Loader } from "lucide-react";

interface CustomerAuthRedirectProps {
  children: React.ReactNode;
}

export function CustomerAuthRedirect({ children }: CustomerAuthRedirectProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const redirected = useRef(false);

  useEffect(() => {
    // Skip redirect logic if still loading auth state or already redirected
    if (isLoading || redirected.current) return;

    // Define public routes that don't require authentication
    const publicRoutes = [
      '/',
      '/about',
      '/contact',
      '/for-retailers',
      '/retailers',
      '/login',
      '/signup',
      '/services',
      '/industries'
    ];

    // Define customer-specific routes
    const customerRoutes = [
      '/customer-dashboard',
      '/marketplace',
      '/cart',
      '/wishlist',
      '/orders',
      '/profile',
      '/settings',
      '/hot-deals',
      '/categories',
      '/products',
      '/checkout'
    ];

    // Define retailer-specific routes
    const retailerRoutes = [
      '/retailer-dashboard',
      '/retailer'
    ];

    const isPublicRoute = publicRoutes.some(route =>
      pathname === route || pathname?.startsWith(route + '/')
    );

    const isCustomerRoute = customerRoutes.some(route =>
      pathname === route || pathname?.startsWith(route + '/')
    );

    const isRetailerRoute = retailerRoutes.some(route =>
      pathname === route || pathname?.startsWith(route + '/')
    );

    // Prevent redirect loops by checking current location
    const handleRedirect = (targetPath: string) => {
      if (pathname !== targetPath && !redirected.current) {
        redirected.current = true;
        setTimeout(() => {
          try {
            router.replace(targetPath);
          } catch (error) {
            console.error('Navigation error:', error);
            redirected.current = false;
          }
        }, 100);
      }
    };

    // Handle authentication and role-based routing
    if (user) {
      // User is logged in
      if (user.role === 'customer') {
        // Customer trying to access homepage or auth routes
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          handleRedirect('/customer-dashboard');
          return;
        }

        // Customer trying to access retailer routes
        if (isRetailerRoute) {
          handleRedirect('/customer-dashboard');
          return;
        }
      } else if (user.role === 'retailer') {
        // Retailer trying to access customer routes (excluding public ones)
        if (isCustomerRoute && !isPublicRoute) {
          handleRedirect('/retailer-dashboard');
          return;
        }

        // Retailer trying to access homepage or auth routes
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          handleRedirect('/retailer-dashboard');
          return;
        }
      }
    } else {
      // User is not logged in
      if (isCustomerRoute || isRetailerRoute) {
        // Trying to access protected routes without authentication
        const redirectPath = `/login?redirect=${encodeURIComponent(pathname || '/')}`;
        handleRedirect(redirectPath);
        return;
      }
    }

    // Reset redirect flag if no redirect was needed
    redirected.current = false;
  }, [user, isLoading, pathname, router]);

  // Reset redirect flag when pathname changes
  useEffect(() => {
    redirected.current = false;
  }, [pathname]);

  // Show loading spinner while auth state is being determined or during redirect
  if (isLoading || redirected.current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {redirected.current ? 'Redirecting...' : 'Loading Linka'}
          </h2>
          <p className="text-gray-600">
            {redirected.current ? 'Taking you to the right place...' : 'Please wait while we set things up...'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
