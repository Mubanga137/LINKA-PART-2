"use client";

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface NavigationErrorBoundaryProps {
  children: React.ReactNode;
}

export class NavigationErrorBoundary extends React.Component<
  NavigationErrorBoundaryProps,
  NavigationErrorBoundaryState
> {
  constructor(props: NavigationErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): NavigationErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Navigation Error Boundary caught an error:', error, errorInfo);
    
    // Check if it's a navigation/fetch error
    if (error.message.includes('fetch') || error.message.includes('navigation')) {
      // Try to recover by reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    // Force a page refresh to reset the app state
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Navigation Error
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              We encountered an issue while navigating. This usually resolves itself automatically.
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={this.handleRetry}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </Button>
              
              <p className="text-sm text-gray-500">
                The page will automatically refresh in a few seconds
              </p>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
