'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ('customer' | 'retailer' | 'admin')[];
  fallbackPath?: string;
  showRedirectMessage?: boolean;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallbackPath = '/login',
  showRedirectMessage = true 
}: RoleGuardProps) {
  const { user: generalUser, isLoading: generalLoading } = useAuth();
  const { user: retailerUser, loading: retailerLoading } = useRetailerAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Get the current user from either auth system
  const currentUser = retailerUser || generalUser;
  const isLoading = generalLoading || retailerLoading;

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // If no user is authenticated, redirect to login
    if (!currentUser) {
      router.push(`${fallbackPath}?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Check if current user role is allowed
    if (!allowedRoles.includes(currentUser.role)) {
      // Redirect based on user role
      const redirectPath = getRedirectPathForRole(currentUser.role);
      
      if (showRedirectMessage) {
        toast.info(getRedirectMessage(currentUser.role), {
          description: 'You have been redirected to your dashboard',
          duration: 4000,
        });
      }
      
      router.push(redirectPath);
      return;
    }

    // Special case: If retailer tries to access homepage, redirect to dashboard
    if (currentUser.role === 'retailer' && (pathname === '/' || pathname === '/home')) {
      if (showRedirectMessage) {
        toast.info('Redirected to your retailer dashboard', {
          description: 'Retailers have a dedicated dashboard experience',
          duration: 4000,
        });
      }
      router.push('/retailer/dashboard');
      return;
    }

  }, [currentUser, isLoading, pathname, router, allowedRoles, fallbackPath, showRedirectMessage]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600 font-medium">Authenticating...</p>
          <p className="text-xs text-slate-500">Verifying your access permissions</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated or doesn't have permission
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return null;
  }

  // Render children if all checks pass
  return <>{children}</>;
}

// Helper function to get redirect path based on role
function getRedirectPathForRole(role: string): string {
  switch (role) {
    case 'retailer':
      return '/retailer/dashboard';
    case 'customer':
      return '/';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
}

// Helper function to get user-friendly redirect message
function getRedirectMessage(role: string): string {
  switch (role) {
    case 'retailer':
      return 'Welcome to your retailer dashboard!';
    case 'customer':
      return 'Welcome back to the marketplace!';
    case 'admin':
      return 'Welcome to the admin panel!';
    default:
      return 'Access denied - please log in';
  }
}

// Specialized components for specific roles
export function RetailerGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['retailer']}>
      {children}
    </RoleGuard>
  );
}

export function CustomerGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['customer']}>
      {children}
    </RoleGuard>
  );
}

export function AdminGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']}>
      {children}
    </RoleGuard>
  );
}
