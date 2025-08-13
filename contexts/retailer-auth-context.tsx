'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Types for authentication
interface User {
  id: string;
  name: string;
  email: string;
  role: 'retailer' | 'customer';
  avatar?: string;
  storeId?: string;
  verified: boolean;
  permissions: string[];
}

interface Store {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  verified: boolean;
  subscription: 'free' | 'basic' | 'premium' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  store: Store | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isRetailer: boolean;
  hasPermission: (permission: string) => boolean;
  canAccessFeature: (feature: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: 'user-001',
  name: 'John Doe',
  email: 'john.doe@techhubzm.com',
  role: 'retailer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  storeId: 'store-001',
  verified: true,
  permissions: [
    'dashboard:view',
    'orders:view',
    'orders:manage',
    'products:view',
    'products:create',
    'products:edit',
    'products:delete',
    'services:view',
    'services:create',
    'services:edit',
    'services:delete',
    'customers:view',
    'customers:message',
    'analytics:view',
    'earnings:view',
    'earnings:withdraw',
    'store:edit',
    'reports:view',
    'reports:export'
  ]
};

const mockStore: Store = {
  id: 'store-001',
  name: 'TechHub Zambia',
  status: 'active',
  verified: true,
  subscription: 'premium'
};

// Feature access based on subscription levels
const featureAccess = {
  free: [
    'dashboard:view',
    'orders:view',
    'products:view',
    'products:create',
    'customers:view',
    'basic_analytics:view'
  ],
  basic: [
    'dashboard:view',
    'orders:view',
    'orders:manage',
    'products:view',
    'products:create',
    'products:edit',
    'services:view',
    'services:create',
    'customers:view',
    'customers:message',
    'analytics:view',
    'earnings:view'
  ],
  premium: [
    'dashboard:view',
    'orders:view',
    'orders:manage',
    'products:view',
    'products:create',
    'products:edit',
    'products:delete',
    'services:view',
    'services:create',
    'services:edit',
    'services:delete',
    'customers:view',
    'customers:message',
    'analytics:view',
    'advanced_analytics:view',
    'earnings:view',
    'earnings:withdraw',
    'store:edit',
    'reports:view',
    'reports:export',
    'bulk_operations:use'
  ],
  enterprise: [
    'dashboard:view',
    'orders:view',
    'orders:manage',
    'products:view',
    'products:create',
    'products:edit',
    'products:delete',
    'services:view',
    'services:create',
    'services:edit',
    'services:delete',
    'customers:view',
    'customers:message',
    'analytics:view',
    'advanced_analytics:view',
    'custom_analytics:view',
    'earnings:view',
    'earnings:withdraw',
    'store:edit',
    'reports:view',
    'reports:export',
    'reports:schedule',
    'bulk_operations:use',
    'api:access',
    'integrations:manage',
    'multi_store:manage'
  ]
};

export function RetailerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // In a real app, this would check with your backend
      const token = localStorage.getItem('retailer_token');
      if (token) {
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
        setStore(mockStore);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('retailer_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API login call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock login validation
      if (email === 'john.doe@techhubzm.com' && password === 'password123') {
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('retailer_token', token);
        setUser(mockUser);
        setStore(mockStore);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('retailer_token');
    setUser(null);
    setStore(null);
    router.push('/login');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!store) return false;
    const allowedFeatures = featureAccess[store.subscription] || [];
    return allowedFeatures.includes(feature);
  };

  const value: AuthContextType = {
    user,
    store,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isRetailer: user?.role === 'retailer',
    hasPermission,
    canAccessFeature
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useRetailerAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useRetailerAuth must be used within a RetailerAuthProvider');
  }
  return context;
};

// HOC for protecting retailer routes
export function withRetailerAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isRetailer, loading } = useRetailerAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!isAuthenticated || !isRetailer)) {
        router.push('/login?redirect=retailer');
      }
    }, [isAuthenticated, isRetailer, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated || !isRetailer) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Hook for checking permissions
export const usePermissions = () => {
  const { hasPermission, canAccessFeature } = useRetailerAuth();
  
  return {
    hasPermission,
    canAccessFeature,
    canViewDashboard: () => hasPermission('dashboard:view'),
    canManageOrders: () => hasPermission('orders:manage'),
    canCreateProducts: () => hasPermission('products:create'),
    canEditProducts: () => hasPermission('products:edit'),
    canDeleteProducts: () => hasPermission('products:delete'),
    canManageServices: () => hasPermission('services:create'),
    canViewAnalytics: () => hasPermission('analytics:view'),
    canWithdrawEarnings: () => hasPermission('earnings:withdraw'),
    canExportReports: () => hasPermission('reports:export'),
    canEditStore: () => hasPermission('store:edit'),
    canMessageCustomers: () => hasPermission('customers:message'),
    canUseBulkOperations: () => canAccessFeature('bulk_operations:use'),
    canAccessAdvancedAnalytics: () => canAccessFeature('advanced_analytics:view')
  };
};

export default AuthContext;
