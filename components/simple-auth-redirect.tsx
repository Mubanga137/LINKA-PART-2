"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader } from "lucide-react";

interface SimpleAuthRedirectProps {
  children: React.ReactNode;
}

export function SimpleAuthRedirect({ children }: SimpleAuthRedirectProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    // Only handle critical redirects to prevent loops
    const handleRedirect = () => {
      if (!user) {
        // Not logged in - only redirect if trying to access protected routes
        const protectedRoutes = ['/customer-dashboard', '/marketplace', '/cart', '/wishlist', '/orders', '/retailer-dashboard'];
        const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
        
        if (isProtectedRoute) {
          router.replace('/login');
        }
        return;
      }

      // User is logged in - handle role-based redirects
      if (user.role === 'customer') {
        // Only redirect from homepage and auth pages
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          router.replace('/customer-dashboard');
        }
      } else if (user.role === 'retailer') {
        // Only redirect from homepage and auth pages
        if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
          router.replace('/retailer-dashboard');
        }
      }
    };

    // Use setTimeout to prevent immediate redirect issues
    const timeoutId = setTimeout(handleRedirect, 100);
    
    return () => clearTimeout(timeoutId);
  }, [user, isLoading, pathname, router]);

  // Show loading state
  if (isLoading) {
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
