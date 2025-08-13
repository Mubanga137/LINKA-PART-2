'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3,
  MessageSquare,
  X,
  Plus,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MobileDashboardNavProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: {
    orders: number;
    messages: number;
    lowStock: number;
  };
}

const quickNavItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/retailer-dashboard',
    color: 'blue'
  },
  {
    id: 'products',
    title: 'Products',
    icon: Package,
    href: '/retailer/products',
    color: 'green'
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: ShoppingCart,
    href: '/retailer/orders',
    color: 'purple',
    badge: 'orders'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    href: '/retailer/analytics',
    color: 'orange'
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: MessageSquare,
    href: '/retailer/messages',
    color: 'pink',
    badge: 'messages'
  }
];

const quickActions = [
  {
    id: 'add-product',
    title: 'Add Product',
    icon: Plus,
    href: '/retailer/products/add',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'search',
    title: 'Search',
    icon: Search,
    color: 'from-slate-500 to-slate-600'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    href: '/retailer/settings',
    color: 'from-slate-500 to-slate-600'
  }
];

export function MobileDashboardNav({ 
  isOpen, 
  onClose, 
  notifications = { orders: 0, messages: 0, lowStock: 0 }
}: MobileDashboardNavProps) {
  const pathname = usePathname();
  const [pressedItem, setPressedItem] = useState<string | null>(null);

  const getBadgeValue = (badgeType: string | undefined) => {
    if (!badgeType) return null;
    switch (badgeType) {
      case 'orders': return notifications.orders || null;
      case 'messages': return notifications.messages || null;
      default: return null;
    }
  };

  const handleItemPress = (itemId: string, href?: string) => {
    setPressedItem(itemId);
    setTimeout(() => setPressedItem(null), 150);
    
    if (href) {
      setTimeout(() => {
        window.location.href = href;
        onClose();
      }, 100);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-nav-overlay">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Slide-in Navigation */}
      <div className="mobile-nav-panel">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Menu</h2>
            <p className="text-sm text-slate-500">Quick navigation</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Navigation Grid */}
        <div className="p-6 bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isPressed = pressedItem === item.id;
              const badgeValue = getBadgeValue(item.badge);
              const colorClasses = getColorClasses(item.color);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemPress(item.id, item.href)}
                  className={`
                    relative p-4 rounded-2xl border-2 transition-all duration-200 text-left
                    ${isActive 
                      ? `${colorClasses} border-current shadow-lg scale-105` 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }
                    ${isPressed ? 'scale-95' : ''}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200
                    ${isActive ? 'bg-white/20' : 'bg-slate-100'}
                    ${isPressed ? 'scale-90' : ''}
                  `}>
                    <Icon className={`h-5 w-5 ${isActive ? 'text-current' : 'text-slate-600'}`} />
                  </div>
                  
                  <p className={`text-sm font-medium ${isActive ? 'text-current' : 'text-slate-900'}`}>
                    {item.title}
                  </p>
                  
                  {badgeValue && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                      {badgeValue}
                    </Badge>
                  )}
                  
                  {/* Ripple effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl bg-black/5 opacity-0 transition-opacity duration-150
                    ${isPressed ? 'opacity-100' : ''}
                  `} />
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isPressed = pressedItem === action.id;
              
              return (
                <button
                  key={action.id}
                  onClick={() => handleItemPress(action.id, action.href)}
                  className={`
                    p-3 rounded-xl bg-gradient-to-br ${action.color} text-white 
                    transition-all duration-200 group
                    ${isPressed ? 'scale-90' : 'hover:scale-105'}
                    shadow-md hover:shadow-lg
                  `}
                >
                  <Icon className={`h-5 w-5 mx-auto transition-transform duration-200 ${isPressed ? 'scale-75' : 'group-hover:scale-110'}`} />
                  <p className="text-xs mt-2 font-medium">{action.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white flex-1">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
            Today's Summary
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New Orders</p>
                  <p className="text-xs text-slate-500">Today</p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">12</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Products Sold</p>
                  <p className="text-xs text-slate-500">Today</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">47</span>
            </div>
            
            {notifications.lowStock > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Low Stock Alert</p>
                    <p className="text-xs text-slate-500">Needs attention</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-amber-600">{notifications.lowStock}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
        }

        .mobile-nav-panel {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 320px;
          max-width: 90vw;
          background: white;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }

        .mobile-nav-panel.closing {
          animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideOut {
          to {
            transform: translateX(-100%);
          }
        }

        @media (min-width: 1024px) {
          .mobile-nav-overlay {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-nav-panel {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
