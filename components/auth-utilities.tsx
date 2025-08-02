'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';
import { LogOut, Home, User } from 'lucide-react';

export function AuthUtilities() {
  const { user: generalUser, logout: generalLogout } = useAuth();
  const { user: retailerUser, logout: retailerLogout } = useRetailerAuth();

  const clearAllAuth = () => {
    // Clear all authentication data
    localStorage.removeItem('linka_user');
    localStorage.removeItem('retailer_token');
    
    // Call both logout functions
    generalLogout();
    retailerLogout();
    
    // Force page reload to ensure clean state
    window.location.href = '/';
  };

  const getCurrentUser = () => {
    if (retailerUser) return { user: retailerUser, type: 'retailer' };
    if (generalUser) return { user: generalUser, type: 'general' };
    return null;
  };

  const currentAuth = getCurrentUser();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 space-y-2 max-w-xs">
      <div className="text-sm font-medium text-gray-700">Auth Debug Panel</div>
      
      {currentAuth ? (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            <User className="h-3 w-3 inline mr-1" />
            {currentAuth.user.name || currentAuth.user.email} ({currentAuth.type})
          </div>
          <div className="text-xs text-gray-500">
            Role: {currentAuth.user.role}
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-500">No user logged in</div>
      )}

      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={clearAllAuth}
          className="flex-1"
        >
          <LogOut className="h-3 w-3 mr-1" />
          Clear Auth
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => window.location.href = '/'}
          className="flex-1"
        >
          <Home className="h-3 w-3 mr-1" />
          Home
        </Button>
      </div>
    </div>
  );
}
