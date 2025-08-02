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
  Sparkles
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
    icon: Activity,
    items: [
      {
        title: 'Dashboard Home',
        href: '/retailer/dashboard',
        icon: LayoutDashboard,
        badge: null,
        description: 'Business overview and metrics',
        gradient: 'from-blue-500 to-indigo-600'
      }
    ]
  },
  {
    title: 'Store Management',
    icon: Store,
    items: [
      {
        title: 'Storefront Manager',
        href: '/retailer/storefront',
        icon: Store,
        badge: null,
        description: 'Design your professional storefront',
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        title: 'Products',
        href: '/retailer/products',
        icon: Package,
        badge: 8,
        description: 'Manage inventory and listings',
        gradient: 'from-emerald-500 to-teal-600'
      },
      {
        title: 'Orders',
        href: '/retailer/orders',
        icon: ShoppingCart,
        badge: 23,
        description: 'Process customer orders',
        gradient: 'from-orange-500 to-red-600',
        isNew: true
      },
      {
        title: 'Messages',
        href: '/retailer/messages',
        icon: MessageSquare,
        badge: 5,
        description: 'Customer communication',
        gradient: 'from-cyan-500 to-blue-600'
      }
    ]
  },
  {
    title: 'Business Intelligence',
    icon: TrendingUp,
    items: [
      {
        title: 'Analytics',
        href: '/retailer/analytics',
        icon: BarChart3,
        badge: null,
        description: 'Sales and performance analytics',
        gradient: 'from-violet-500 to-purple-600'
      },
      {
        title: 'Reports',
        href: '/retailer/reports',
        icon: FileText,
        badge: null,
        description: 'Financial and sales reports',
        gradient: 'from-indigo-500 to-blue-600'
      },
      {
        title: 'Earnings',
        href: '/retailer/earnings',
        icon: DollarSign,
        badge: null,
        description: 'Revenue and payouts',
        gradient: 'from-green-500 to-emerald-600'
      }
    ]
  },
  {
    title: 'Account',
    icon: User,
    items: [
      {
        title: 'Settings',
        href: '/retailer/settings',
        icon: Settings,
        badge: null,
        description: 'Account preferences',
        gradient: 'from-slate-500 to-gray-600'
      }
    ]
  }
];

export default function RetailerDashboardLayout({ children }: RetailerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Overview', 'Store Management']);
  const pathname = usePathname();
  const { retailer, logout } = useRetailerAuth();

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

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
        {/* Modern Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-xl lg:translate-x-0 lg:static lg:inset-0 transition-all duration-300 ease-in-out`}>
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-white to-slate-50/50">
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
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                  MK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Mwamba Kunda</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Seller
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold text-blue-600">8</p>
                <p className="text-xs text-slate-600">Products</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold text-emerald-600">4.9</p>
                <p className="text-xs text-slate-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarSections.map((section) => {
              const isExpanded = expandedSections.includes(section.title);
              const SectionIcon = section.icon;
              
              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-3 text-left rounded-xl hover:bg-white/60 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <SectionIcon className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                        {section.title}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`} />
                  </button>

                  {/* Navigation Items */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1 animate-fade-in-up">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActivePath(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
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

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start bg-white/60 border-white/40 hover:bg-white/80">
                  <User className="h-4 w-4 mr-2" />
                  Account Menu
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-xl">
                <DropdownMenuLabel className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">MK</AvatarFallback>
                    </Avatar>
                    <span>Mwamba Kunda</span>
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
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-white/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Linka Dashboard
              </h1>
            </div>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
