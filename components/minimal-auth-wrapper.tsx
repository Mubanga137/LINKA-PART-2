"use client";

import { useAuth } from "@/contexts/auth-context";
import { Loader } from "lucide-react";

interface MinimalAuthWrapperProps {
  children: React.ReactNode;
}

export function MinimalAuthWrapper({ children }: MinimalAuthWrapperProps) {
  const { isLoading } = useAuth();

  // Only show loading state, no automatic redirects
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

  // Just render children without any navigation logic
  return <>{children}</>;
}
