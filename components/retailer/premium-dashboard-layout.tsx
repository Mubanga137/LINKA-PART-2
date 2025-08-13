'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  DollarSign,
  Tag,
  Users,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  Store,
  TrendingUp,
  Clock,
  AlertTriangle,
  User,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LinkaLogo from '@/components/ui/linka-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PremiumDashboardLayoutProps {
  children: React.ReactNode;
}

const navigationSections = [
  {
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/retailer/dashboard',
        icon: LayoutDashboard,
        description: 'Business overview and metrics',
        badge: null
      }
    ]
  },
  {
    title: 'Orders',
    items: [
      {
        id: 'orders',
        title: 'Orders',
        href: '/retailer/orders',
        icon: ShoppingCart,
        description: 'All Orders',
        badge: 'orders'
      },
      {
        id: 'pending-orders',
        title: 'Pending Orders',
        href: '/retailer/orders/pending',
        icon: Clock,
        description: 'Awaiting processing',
        badge: null
      }
    ]
  },
  {
    title: 'Products',
    items: [
      {
        id: 'products',
        title: 'Products',
        href: '/retailer/products',
        icon: Package,
        description: 'Add New',
        badge: null,
        action: true
      },
      {
        id: 'inventory',
        title: 'Inventory & Stock',
        href: '/retailer/inventory',
        icon: Package,
        description: 'Manage Products',
        badge: 'lowStock'
      }
    ]
  },
  {
    title: 'Analytics & Finance',
    items: [
      {
        id: 'analytics',
        title: 'Analytics & Reports',
        href: '/retailer/analytics',
        icon: BarChart3,
        description: 'Business insights',
        badge: null
      },
      {
        id: 'earnings',
        title: 'Earnings',
        href: '/retailer/earnings',
        icon: DollarSign,
        description: 'Revenue reports',
        badge: null
      }
    ]
  },
  {
    title: 'Marketing',
    items: [
      {
        id: 'promotions',
        title: 'Promotions & Discounts',
        href: '/retailer/promotions',
        icon: Tag,
        description: 'Marketing campaigns',
        badge: null
      }
    ]
  },
  {
    title: 'Communication',
    items: [
      {
        id: 'messages',
        title: 'Messages & Chat',
        href: '/retailer/messages',
        icon: MessageSquare,
        description: 'Customer communications',
        badge: 'messages'
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        id: 'store-settings',
        title: 'Store Settings',
        href: '/retailer/store-settings',
        icon: Settings,
        description: 'Store configuration',
        badge: null
      }
    ]
  }
];

const supportItems = [
  {
    id: 'help',
    title: 'Help & Support',
    href: '/retailer/help',
    icon: HelpCircle,
    description: 'Get assistance'
  }
];

// Mock notifications data
const mockNotifications = {
  orders: 23,
  lowStock: 5,
  messages: 12
};

// Mock user data
const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  storeName: 'Premium Electronics',
  avatar: null
};

export default function PremiumDashboardLayout({ children }: PremiumDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const getBadgeValue = (badgeType: string | null) => {
    if (!badgeType) return null;
    switch (badgeType) {
      case 'orders': return mockNotifications.orders || null;
      case 'lowStock': return mockNotifications.lowStock || null;
      case 'messages': return mockNotifications.messages || null;
      default: return null;
    }
  };

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <aside className={`
        retailer-sidebar fixed inset-y-0 left-0 z-50 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-20' : 'w-80'}
        lg:w-${sidebarCollapsed ? '20' : '80'}
      `}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-slate-900/50"></div>
        
        {/* Floating Animation Layer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">LINKA</h1>
                <p className="text-xs text-teal-300 font-medium">Retailer Portal</p>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebarCollapse}
            className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-700/50 p-2"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-teal-300 uppercase tracking-wider px-3 mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(item.href);
                  const badgeValue = getBadgeValue(item.badge);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        retailer-nav-item group relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
                        ${isActive 
                          ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 border-l-4 border-teal-400 shadow-lg shadow-teal-500/25' 
                          : 'hover:bg-slate-700/50'
                        }
                        ${sidebarCollapsed ? 'p-3 justify-center' : 'p-3'}
                      `}
                    >
                      {/* Active glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 animate-pulse" />
                      )}

                      <div className={`relative z-10 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`
                            p-2 rounded-md transition-all duration-300
                            ${isActive 
                              ? 'bg-teal-500/20 text-teal-300 shadow-lg shadow-teal-500/25' 
                              : 'text-slate-400 group-hover:text-white group-hover:bg-slate-600/50'
                            }
                          `}>
                            <Icon className="h-5 w-5" />
                          </div>
                          
                          {!sidebarCollapsed && (
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className={`
                                  text-sm font-medium transition-colors duration-300
                                  ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                                `}>
                                  {item.title}
                                </span>
                                {item.action && (
                                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                                    NEW
                                  </Badge>
                                )}
                              </div>
                              <p className={`
                                text-xs mt-0.5 transition-colors duration-300
                                ${isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'}
                              `}>
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Badge for expanded state */}
                        {!sidebarCollapsed && badgeValue && (
                          <Badge className={`
                            text-xs px-2 py-0.5
                            ${item.badge === 'orders' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : ''}
                            ${item.badge === 'lowStock' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : ''}
                            ${item.badge === 'messages' ? 'bg-green-500/20 text-green-300 border-green-500/30' : ''}
                          `}>
                            {badgeValue}
                          </Badge>
                        )}
                        
                        {/* Badge for collapsed state */}
                        {sidebarCollapsed && badgeValue && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Support Section */}
          <div className="border-t border-slate-700/50 pt-4">
            {!sidebarCollapsed && (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
                Support
              </h3>
            )}
            {supportItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group
                    ${isActive ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/30'}
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Actions */}
        <div className="relative z-10 border-t border-slate-700/50 p-4 space-y-3">
          {/* User Profile */}
          <div className={`flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <Avatar className="h-10 w-10 ring-2 ring-teal-500/30">
              <AvatarImage src={mockUser.avatar || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold text-sm">
                {mockUser.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{mockUser.name}</p>
                <p className="text-xs text-slate-400 truncate">{mockUser.storeName}</p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => console.log('Logging out...')}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group
              text-red-400 hover:text-red-300 hover:bg-red-500/10
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden text-slate-600 hover:text-slate-900"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Page Title */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Retailer Dashboard
                </h1>
                <p className="text-slate-600 mt-1 font-medium text-sm lg:text-base">
                  Welcome back! Here's your business performance at a glance.
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Bar - Hidden on mobile */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search orders, products, customers..."
                  className="pl-10 pr-4 h-10 w-80 bg-slate-50 border-slate-200 focus:bg-white focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Action Buttons */}
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>

              <Button 
                size="sm" 
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </Button>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white text-xs animate-pulse">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mockUser.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold text-sm">
                        {mockUser.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                      <p className="text-xs leading-none text-slate-500">
                        {mockUser.email}
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
                  <DropdownMenuItem asChild>
                    <Link href="/retailer/storefront">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>View Storefront</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => console.log('Logging out...')} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
