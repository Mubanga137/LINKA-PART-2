'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRetailerAuth } from '@/contexts/retailer-auth-context';
import ProtectedRoute from './protected-route';
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
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Store,
  Plus,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RetailerDashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/retailer/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Orders',
    href: '/retailer/orders',
    icon: ShoppingCart,
    badge: 23
  },
  {
    title: 'Products',
    href: '/retailer/products',
    icon: Package,
    badge: 8
  },
  {
    title: 'Services',
    href: '/retailer/services',
    icon: Store,
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
    title: 'Analytics',
    href: '/retailer/analytics',
    icon: BarChart3,
    badge: null
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
    title: 'Upload Center',
    href: '/retailer/upload',
    icon: Upload,
    badge: null
  },
  {
    title: 'Store Settings',
    href: '/retailer/store-settings',
    icon: Settings,
    badge: null
  }
];

export default function RetailerDashboardLayout({ children }: RetailerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, store, logout } = useRetailerAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">LINKA</h1>
                <p className="text-xs text-indigo-300">Retailer Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg font-medium transform scale-105'
                    : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white hover:transform hover:scale-102'
                }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs shadow-md animate-pulse">
                    {item.badge}
                  </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info at bottom */}
        <div className="p-4 border-t border-indigo-700/50 bg-indigo-800/30">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 ring-2 ring-yellow-400">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-indigo-300 truncate">{store?.name || 'Store Owner'}</p>
            </div>
          </div>
        </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top header */}
          <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-indigo-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>

                  <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders, products, customers, reports..."
                      className="pl-10 w-full"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <kbd className="inline-flex items-center rounded border bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-500">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>

                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </Button>

                  <Button variant="ghost" size="sm" className="relative hover:bg-indigo-50">
                    <Bell className="h-5 w-5 text-indigo-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-bounce shadow-lg">
                      1
                    </Badge>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>
                            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                          <p className="text-xs leading-none text-gray-500">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/retailer/profile">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/retailer/store-settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
