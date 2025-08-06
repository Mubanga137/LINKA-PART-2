"use client";

// Global error handler for client-side errors
export class ClientErrorHandler {
  private static initialized = false;

  static init() {
    if (this.initialized || typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Check if it's a fetch error
      if (event.reason && 
          (event.reason.message?.includes('fetch') || 
           event.reason.message?.includes('Failed to fetch'))) {
        
        console.log('Fetch error detected, preventing propagation');
        event.preventDefault();
        
        // Optional: Show user-friendly message
        // You could dispatch a custom event here to show a toast
      }
    });

    // Handle general errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      
      // Check if it's related to navigation/routing
      if (event.error && 
          (event.error.message?.includes('navigation') ||
           event.error.message?.includes('router') ||
           event.error.message?.includes('fetch'))) {
        
        console.log('Navigation/Router error detected');
        event.preventDefault();
      }
    });

    this.initialized = true;
    console.log('Client error handler initialized');
  }

  static cleanup() {
    this.initialized = false;
  }
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  ClientErrorHandler.init();
}
