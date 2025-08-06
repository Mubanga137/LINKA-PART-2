"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface RedirectOptions {
  requireAuth?: boolean;
  allowedRoles?: string[];
  fallbackPath?: string;
  redirectDelay?: number;
}

export function useSafeRedirect(options: RedirectOptions = {}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  const {
    requireAuth = false,
    allowedRoles = [],
    fallbackPath = "/login",
    redirectDelay = 1000
  } = options;

  useEffect(() => {
    // Reset redirect flag when path changes
    hasRedirected.current = false;
  }, [pathname]);

  useEffect(() => {
    // Skip if loading or already redirected
    if (isLoading || hasRedirected.current) return;

    // Check authentication requirement
    if (requireAuth && !user) {
      hasRedirected.current = true;
      const timer = setTimeout(() => {
        try {
          router.push(`${fallbackPath}?redirect=${encodeURIComponent(pathname)}`);
        } catch (error) {
          console.error("Safe redirect error:", error);
          window.location.href = fallbackPath;
        }
      }, redirectDelay);

      return () => clearTimeout(timer);
    }

    // Check role restrictions
    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      hasRedirected.current = true;
      const timer = setTimeout(() => {
        try {
          const defaultPath = user.role === 'retailer' ? '/retailer-dashboard' : '/customer-dashboard';
          router.push(defaultPath);
        } catch (error) {
          console.error("Safe redirect error:", error);
          window.location.href = '/';
        }
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, requireAuth, allowedRoles, fallbackPath, redirectDelay, router, pathname]);

  return {
    isLoading,
    user,
    shouldRedirect: (requireAuth && !user) || (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role))
  };
}
