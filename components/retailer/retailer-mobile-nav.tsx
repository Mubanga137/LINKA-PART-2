'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  DollarSign,
  Upload,
  FileText,
  Store,
  Home,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface RetailerMobileNavProps {
  trigger: React.ReactNode;
}

const mobileNavItems = [
  {
    title: 'Dashboard',
    href: '/retailer/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Storefront',
    href: '/retailer/storefront',
    icon: Store,
    badge: null
  },
  {
    title: 'Products',
    href: '/retailer/products',
    icon: Package,
    badge: 8
  },
  {
    title: 'Orders',
    href: '/retailer/orders',
    icon: ShoppingCart,
    badge: 23
  },
  {
    title: 'Analytics',
    href: '/retailer/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Customers',
    href: '/retailer/customers',
    icon: Users,
    badge: null
  },
  {
    title: 'Messages',
    href: '/retailer/messages',
    icon: MessageSquare,
    badge: 5
  },
  {
    title: 'Earnings',
    href: '/retailer/earnings',
    icon: DollarSign,
    badge: null
  },
  {
    title: 'Reports',
    href: '/retailer/reports',
    icon: FileText,
    badge: null
  },
  {
    title: 'Settings',
    href: '/retailer/store-settings',
    icon: Settings,
    badge: null
  }
];

export function RetailerMobileNav({ trigger }: RetailerMobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavItemClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div>
                  <SheetTitle className="text-lg font-bold text-gray-900">LINKA</SheetTitle>
                  <p className="text-xs text-gray-500">Retailer Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavItemClick}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        p-2 rounded-md transition-colors
                        ${isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600'
                        }
                      `}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge 
                        className={`text-xs ${
                          isActive 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/"
              onClick={handleNavItemClick}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <div className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Back to Store</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
