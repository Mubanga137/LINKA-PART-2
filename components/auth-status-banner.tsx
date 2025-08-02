'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { User, UserCheck, Store } from 'lucide-react';

export function AuthStatusBanner() {
  const { user: generalUser } = useAuth();
  const { user: retailerUser } = useRetailerAuth();

  const getCurrentUser = () => {
    if (retailerUser) return { user: retailerUser, type: 'retailer' };
    if (generalUser) return { user: generalUser, type: 'general' };
    return null;
  };

  const currentAuth = getCurrentUser();

  if (!currentAuth) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">Welcome! You are viewing as a guest.</span>
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Guest Access
          </Badge>
        </div>
      </div>
    );
  }

  if (currentAuth.user.role === 'retailer') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Store className="h-5 w-5 text-blue-600" />
          <span className="text-blue-800 font-medium">
            Welcome, {currentAuth.user.name}! You can freely access the homepage and your dashboard.
          </span>
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            Retailer
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        <UserCheck className="h-5 w-5 text-indigo-600" />
        <span className="text-indigo-800 font-medium">
          Welcome, {currentAuth.user.name}! You are logged in as a customer.
        </span>
        <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
          Customer
        </Badge>
      </div>
    </div>
  );
}
