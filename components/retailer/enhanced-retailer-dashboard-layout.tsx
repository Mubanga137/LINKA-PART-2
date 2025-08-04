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
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Eye,
  Zap,
  Star,
  Activity,
  Sparkles,
  Home,
  Globe,
  Smartphone,
  Calendar,
  HelpCircle,
  Shield,
  CreditCard,
  Palette,
  Target,
  Award,
  Clock
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
import { Separator } from '@/components/ui/separator';
import { LogoutModal } from '@/components/auth/logout-modal';
import { useToast } from '@/components/ui/toast';

interface EnhancedRetailerDashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarSections = [
  {
    title: 'Overview',
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    items: [
      {
        title: 'Dashboard Home',
        href: '/retailer/dashboard',
        icon: LayoutDashboard,
        badge: null,
        description: 'Business overview and metrics',
        isNew: false
      },
      {
        title: 'Quick Actions',
        href: '/retailer/quick-actions',
        icon: Zap,
        badge: null,
        description: 'Common tasks and shortcuts',
        isNew: false
      }
    ]
  },
  {
    title: 'Store Management',
    icon: Store,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    items: [
      {
        title: 'Storefront Design',
        href: '/retailer/storefront',
        icon: Palette,
        badge: null,
        description: 'Customize your store appearance',
        isNew: false
      },
      {
        title: 'Product Catalog',
        href: '/retailer/products',
        icon: Package,
        badge: 8,
        description: 'Manage your product inventory',
        isNew: false
      },
      {
        title: 'Order Management',
        href: '/retailer/orders',
        icon: ShoppingCart,
        badge: 3,
        description: 'Process and track orders',
        isNew: true
      },
      {
        title: 'Store Settings',
        href: '/retailer/store-config',
        icon: Settings,
        badge: null,
        description: 'Configure store preferences',
        isNew: false
      }
    ]
  },
  {
    title: 'Customer Relations',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    items: [
      {
        title: 'Customer Messages',
        href: '/retailer/messages',
        icon: MessageSquare,
        badge: 5,
        description: 'Chat with your customers',
        isNew: false
      },
      {
        title: 'Reviews & Ratings',
        href: '/retailer/reviews',
        icon: Star,
        badge: 12,
        description: 'Manage customer feedback',
        isNew: false
      },
      {
        title: 'Customer Insights',
        href: '/retailer/customers',
        icon: Users,
        badge: null,
        description: 'Analyze customer behavior',
        isNew: false
      }
    ]
  },
  {
    title: 'Analytics & Reports',
    icon: BarChart3,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    items: [
      {
        title: 'Sales Analytics',
        href: '/retailer/analytics',
        icon: TrendingUp,
        badge: null,
        description: 'Track sales performance',
        isNew: false
      },
      {
        title: 'Financial Reports',
        href: '/retailer/reports',
        icon: FileText,
        badge: null,
        description: 'Revenue and expense reports',
        isNew: false
      },
      {
        title: 'Performance Metrics',
        href: '/retailer/metrics',
        icon: Target,
        badge: null,
        description: 'KPIs and performance tracking',
        isNew: false
      }
    ]
  },
  {
    title: 'Financial',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    items: [
      {
        title: 'Earnings Overview',
        href: '/retailer/earnings',
        icon: DollarSign,
        badge: null,
        description: 'View earnings and payouts',
        isNew: false
      },
      {
        title: 'Payment Methods',
        href: '/retailer/payments',
        icon: CreditCard,
        badge: null,
        description: 'Manage payment options',
        isNew: false
      },
      {
        title: 'Transaction History',
        href: '/retailer/transactions',
        icon: Clock,
        badge: null,
        description: 'View all transactions',
        isNew: false
      }
    ]
  },
  {
    title: 'Account & Support',
    icon: User,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    items: [
      {
        title: 'Profile Settings',
        href: '/retailer/profile',
        icon: User,
        badge: null,
        description: 'Manage your account',
        isNew: false
      },
      {
        title: 'Security',
        href: '/retailer/security',
        icon: Shield,
        badge: null,
        description: 'Security and privacy settings',
        isNew: false
      },
      {
        title: 'Help & Support',
        href: '/retailer/support',
        icon: HelpCircle,
        badge: null,
        description: 'Get help and support',
        isNew: false
      }
    ]
  }
];

export default function EnhancedRetailerDashboardLayout({ children }: EnhancedRetailerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Overview', 'Store Management']);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useRetailerAuth();
  const { addToast } = useToast();

  // Check if this is a demo account
  const isDemoAccount = user?.email?.includes('demo') || user?.email?.includes('test') || user?.id?.includes('demo');

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const isActivePath = (href: string) => {
    return pathname === href;
  };

  const handleLogoutConfirm = async () => {
    try {
      // Clear all authentication data
      localStorage.removeItem('retailer_token');
      localStorage.removeItem('linka_user');

      // Call logout function
      logout();

      // Show success message
      addToast('Successfully signed out!', 'success');

      // Close modal
      setShowLogoutModal(false);

      // Redirect to homepage with a slight delay to show the toast
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      console.error('Logout error:', error);
      addToast('Error during sign out. Please try again.', 'error');
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
        {/* Enhanced Sidebar with Improved Scrolling */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl lg:translate-x-0 lg:static lg:inset-0 transition-all duration-300 ease-in-out flex flex-col`}>
          
          {/* Fixed Sidebar Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  Linka
                </h1>
                <p className="text-xs text-slate-500 font-medium">SME Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Fixed User Profile Section */}
          <div className="flex-shrink-0 p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                  {user?.name?.charAt(0) || 'MK'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'Mwamba Kunda'}</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Seller
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold text-blue-600">8</p>
                <p className="text-xs text-slate-600">Products</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold text-emerald-600">4.9</p>
                <p className="text-xs text-slate-600">Rating</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold text-orange-600">23</p>
                <p className="text-xs text-slate-600">Orders</p>
              </div>
            </div>
          </div>

          {/* Scrollable Navigation Section */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
            {sidebarSections.map((section) => {
              const isExpanded = expandedSections.includes(section.title);
              const SectionIcon = section.icon;
              
              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-xl hover:bg-white/60 transition-all duration-200 group ${
                      isExpanded ? 'bg-white/40' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${section.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                        <SectionIcon className={`h-4 w-4 ${section.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                        {section.title}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`} />
                  </button>

                  {/* Navigation Items with Improved Spacing */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-left-2 duration-200">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActivePath(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                                : 'hover:bg-white/60 text-slate-700'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isActive
                                ? 'bg-white/20'
                                : 'bg-slate-100 group-hover:bg-slate-200'
                            }`}>
                              <Icon className={`h-4 w-4 ${
                                isActive ? 'text-white' : 'text-slate-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-medium truncate ${
                                  isActive ? 'text-white' : 'text-slate-700'
                                }`}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge className={`text-xs ${
                                    isActive 
                                      ? 'bg-white/20 text-white border-white/30' 
                                      : 'bg-blue-100 text-blue-700 border-blue-200'
                                  }`}>
                                    {item.badge}
                                  </Badge>
                                )}
                                {item.isNew && (
                                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs animate-pulse">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className={`text-xs truncate mt-0.5 ${
                                isActive ? 'text-white/80' : 'text-slate-500'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fixed Navigation Controls - Always Visible */}
          <div className="flex-shrink-0 p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-all duration-200"
              onClick={() => window.history.back()}
            >
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back
            </Button>
            {/* Retailer-specific help link instead of homepage */}
            <Button
              variant="outline"
              className="w-full justify-start bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 transition-all duration-200"
              asChild
            >
              <Link href="/retailer/support">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Link>
            </Button>
          </div>

          {/* Fixed Sidebar Footer */}
          <div className="flex-shrink-0 p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start bg-white/60 border-white/40 hover:bg-white/80 transition-all duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Account Menu
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl shadow-xl">
                <DropdownMenuLabel className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        {user?.name?.charAt(0) || 'MK'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user?.name || 'Mwamba Kunda'}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-50">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50">
                  <Store className="h-4 w-4 mr-2" />
                  Store Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Demo Mode Banner */}
          {isDemoAccount && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-center text-sm font-medium shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Demo Mode: All changes are temporary and will reset after session</span>
              </div>
            </div>
          )}

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Linka Dashboard
              </h1>
              {isDemoAccount && (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                  Demo
                </Badge>
              )}
            </div>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
