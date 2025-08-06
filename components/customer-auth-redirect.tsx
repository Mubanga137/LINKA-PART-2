"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader } from "lucide-react";

interface CustomerAuthRedirectProps {
  children: React.ReactNode;
}

export function CustomerAuthRedirect({ children }: CustomerAuthRedirectProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirect logic if still loading auth state
    if (loading) return;

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

    // Handle authentication and role-based routing
    if (user) {
      // User is logged in
      if (user.role === 'customer') {
        // Customer trying to access homepage or public routes
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          console.log('Customer detected, redirecting to dashboard');
          router.replace('/customer-dashboard');
          return;
        }
        
        // Customer trying to access retailer routes
        if (isRetailerRoute) {
          console.log('Customer trying to access retailer route, redirecting to customer dashboard');
          router.replace('/customer-dashboard');
          return;
        }
      } else if (user.role === 'retailer') {
        // Retailer trying to access customer routes
        if (isCustomerRoute && !isPublicRoute) {
          console.log('Retailer trying to access customer route, redirecting to retailer dashboard');
          router.replace('/retailer-dashboard');
          return;
        }
        
        // Retailer trying to access homepage
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          console.log('Retailer detected, redirecting to retailer dashboard');
          router.replace('/retailer-dashboard');
          return;
        }
      }
    } else {
      // User is not logged in
      if (isCustomerRoute || isRetailerRoute) {
        // Trying to access protected routes without authentication
        console.log('Unauthenticated user trying to access protected route, redirecting to login');
        router.replace(`/login?redirect=${encodeURIComponent(pathname || '/')}`);
        return;
      }
    }
  }, [user, loading, pathname, router]);

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Linka</h2>
          <p className="text-gray-600">Please wait while we set things up...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
