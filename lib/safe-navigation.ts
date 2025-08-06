"use client";

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Safe navigation utility to prevent fetch errors during redirects
export class SafeNavigation {
  private static redirecting = false;
  private static lastRedirect = 0;
  private static readonly REDIRECT_COOLDOWN = 1000; // 1 second

  static async safeReplace(router: AppRouterInstance, path: string): Promise<boolean> {
    // Prevent rapid successive redirects
    const now = Date.now();
    if (this.redirecting || (now - this.lastRedirect) < this.REDIRECT_COOLDOWN) {
      console.log('Redirect skipped - too frequent or already redirecting');
      return false;
    }

    // Prevent redirect to same path
    if (typeof window !== 'undefined' && window.location.pathname === path) {
      console.log('Redirect skipped - already on target path');
      return false;
    }

    this.redirecting = true;
    this.lastRedirect = now;

    try {
      // Use setTimeout to ensure the redirect happens after the current execution cycle
      await new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          try {
            router.replace(path);
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 50);

        // Safety timeout
        setTimeout(() => {
          clearTimeout(timeoutId);
          reject(new Error('Redirect timeout'));
        }, 5000);
      });

      // Wait a bit before allowing the next redirect
      setTimeout(() => {
        this.redirecting = false;
      }, 500);

      return true;
    } catch (error) {
      console.error('Safe navigation error:', error);
      this.redirecting = false;
      
      // Fallback to window.location for critical redirects
      if (typeof window !== 'undefined') {
        try {
          window.location.href = path;
          return true;
        } catch (locationError) {
          console.error('Window location fallback failed:', locationError);
        }
      }
      
      return false;
    }
  }

  static reset() {
    this.redirecting = false;
    this.lastRedirect = 0;
  }

  static isRedirecting(): boolean {
    return this.redirecting;
  }
}
