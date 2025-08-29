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
  Download,
  ChevronLeft,
  ChevronRight
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

const sidebarSections = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/retailer/studio',
        icon: LayoutDashboard,
        badge: null,
        description: 'Business overview and metrics'
      }
    ]
  },
  {
    title: 'Store Management',
    items: [
      {
        title: 'Storefront Manager',
        href: '/retailer/storefront',
        icon: Store,
        badge: null,
        description: 'Design your professional storefront'
      },
      {
        title: 'Store Configuration',
        href: '/retailer/store-config',
        icon: Settings,
        badge: null,
        description: 'Basic store settings and info'
      },
      {
        title: 'Products',
        href: '/retailer/products',
        icon: Package,
        badge: 8,
        description: 'Manage inventory and listings'
      },
      {
        title: 'Services',
        href: '/retailer/services',
        icon: Upload,
        badge: null,
        description: 'Service offerings and bookings'
      },
      {
        title: 'Store Settings',
        href: '/retailer/store-settings',
        icon: Settings,
        badge: null,
        description: 'Store configuration and preferences'
      }
    ]
  },
  {
    title: 'Business Operations',
    items: [
      {
        title: 'Orders',
        href: '/retailer/orders',
        icon: ShoppingCart,
        badge: 23,
        description: 'Track and manage orders'
      },
      {
        title: 'Customers',
        href: '/retailer/customers',
        icon: Users,
        badge: null,
        description: 'Customer database and insights'
      },
      {
        title: 'Messages',
        href: '/retailer/messages',
        icon: MessageSquare,
        badge: 5,
        description: 'Customer communications'
      }
    ]
  },
  {
    title: 'Analytics & Finance',
    items: [
      {
        title: 'Analytics',
        href: '/retailer/analytics',
        icon: BarChart3,
        badge: null,
        description: 'Business insights and metrics'
      },
      {
        title: 'Earnings',
        href: '/retailer/earnings',
        icon: DollarSign,
        badge: null,
        description: 'Revenue and financial reports'
      },
      {
        title: 'Reports',
        href: '/retailer/reports',
        icon: FileText,
        badge: null,
        description: 'Detailed business reports'
      }
    ]
  }
];

export default function RetailerDashboardLayout({ children }: RetailerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, store, logout } = useRetailerAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <ProtectedRoute>
      {/* 
        Main Layout Container - Using CSS Grid for perfect alignment
        - Ensures sidebar and main content share the same baseline
        - No floating elements or overlapping content
        - Responsive design with consistent spacing
      */}
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* CSS Grid Layout Container */}
        <div className="grid lg:grid-cols-[var(--sidebar-width)_1fr] min-h-screen" 
             style={{ 
               '--sidebar-width': sidebarCollapsed ? '80px' : '280px' 
             } as React.CSSProperties}>
          
          {/* Sidebar Column - Fixed width, full height */}
          <aside className={`
            bg-white border-r border-gray-200 shadow-sm
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 
            fixed lg:static inset-y-0 left-0 z-50 
            transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? 'w-20' : 'w-72 lg:w-80'}
            lg:w-auto
            flex flex-col
          `}>
            
            {/* Sidebar Header - Aligned with main content header */}
            <div className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-gray-200 bg-white">
              <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium tracking-wider">RETAILER PORTAL</p>
                  </div>
                )}
              </div>
              
              {/* Sidebar controls */}
              <div className="flex items-center space-x-1">
                {/* Collapse button - Desktop only */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebarCollapse}
                  className="hidden lg:flex w-8 h-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
                
                {/* Close button - Mobile only */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden w-8 h-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar Navigation - Scrollable with consistent padding */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 lg:px-4 space-y-6">
              {sidebarSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  {!sidebarCollapsed && (
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={sidebarCollapsed ? `${item.title} - ${item.description}` : undefined}
                          className={`
                            group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                            ${isActive
                              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }
                            ${sidebarCollapsed ? 'justify-center' : 'justify-start'}
                          `}
                        >
                          <div className={`
                            p-1.5 rounded-md transition-colors flex-shrink-0
                            ${isActive
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-600'
                            }
                          `}>
                            <Icon className="h-4 w-4" />
                          </div>
                          
                          {!sidebarCollapsed && (
                            <>
                              <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.title}</p>
                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                              {item.badge && (
                                <Badge 
                                  className={`ml-2 text-xs ${
                                    isActive 
                                      ? 'bg-blue-100 text-blue-600' 
                                      : 'bg-red-100 text-red-600'
                                  }`}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                          
                          {/* Badge for collapsed state */}
                          {sidebarCollapsed && item.badge && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* User Profile Section - Aligned at bottom */}
            <div className="border-t border-gray-200 p-4 bg-gray-50/50">
              <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <Avatar className="h-8 w-8 ring-2 ring-blue-100 flex-shrink-0">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{store?.name || 'Store Owner'}</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Column - Takes remaining space */}
          <main className="flex flex-col min-h-screen">
            {/* Top Header - Perfectly aligned with sidebar header */}
            <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-6">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders, products, customers..."
                    className="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <kbd className="inline-flex items-center rounded border bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-500">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>

                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">New Order</span>
                </Button>

                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    2
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-xs">
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
            </header>

            {/* Page Content - Properly contained with consistent spacing */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
