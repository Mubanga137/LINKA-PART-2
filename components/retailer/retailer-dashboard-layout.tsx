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
  ChevronDown
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
        href: '/retailer/dashboard',
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
  const pathname = usePathname();
  const { user, store, logout } = useRetailerAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Layout Container */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside 
            className={`
              fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 shadow-xl
              transform transition-all duration-300 ease-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
              lg:translate-x-0 lg:static lg:inset-0 lg:w-72
              flex flex-col
            `}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-indigo-200">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    LINKA
                  </h1>
                  <p className="text-xs font-medium text-slate-500 tracking-wide">RETAILER PORTAL</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden h-8 w-8 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {sidebarSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-1">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`
                            group flex items-center justify-between px-3 py-3 rounded-lg 
                            transition-all duration-200 hover:shadow-sm
                            ${isActive
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 text-indigo-700 shadow-sm'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`
                              flex-shrink-0 p-2 rounded-lg transition-colors
                              ${isActive
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700'
                              }
                            `}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                isActive ? 'text-indigo-900' : 'text-slate-900'
                              }`}>
                                {item.title}
                              </p>
                              <p className={`text-xs truncate mt-0.5 ${
                                isActive ? 'text-indigo-600' : 'text-slate-500'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {item.badge && (
                            <Badge className={`
                              ml-2 h-5 px-2 text-xs font-medium
                              ${isActive
                                ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                                : 'bg-orange-100 text-orange-700 border-orange-200'
                              }
                            `}>
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* User Profile Section */}
            <div className="border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-slate-100">
                    <div className="flex items-center space-x-3 w-full">
                      <Avatar className="h-9 w-9 ring-2 ring-slate-200">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-sm">
                          {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {store?.name || 'Store Owner'}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                      <p className="text-xs leading-none text-slate-500">
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
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
            {/* Top Header */}
            <header className="flex-shrink-0 bg-white border-b border-slate-200/60 shadow-sm">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center space-x-4 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSidebar}
                      className="lg:hidden hover:bg-slate-100"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>

                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search orders, products, customers..."
                        className="pl-10 w-full bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <kbd className="inline-flex items-center rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-500">
                          ⌘K
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-700 hover:bg-slate-50 hidden sm:flex"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>

                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">New Product</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="relative hover:bg-slate-100">
                      <Bell className="h-5 w-5 text-slate-600" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                        1
                      </Badge>
                    </Button>

                    <div className="hidden sm:block w-px h-6 bg-slate-200"></div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 ring-1 ring-slate-200 hover:ring-slate-300 transition-all cursor-pointer">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium text-sm">
                            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                            <p className="text-xs leading-none text-slate-500">
                              {user?.email || 'user@example.com'}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/retailer/store-settings">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Store Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/retailer/earnings">
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span>Earnings</span>
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

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50/50">
              <div className="h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
