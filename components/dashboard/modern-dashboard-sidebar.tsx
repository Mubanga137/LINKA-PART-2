'use client';

import { useState, useEffect } from 'react';
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
  FileText,
  Store,
  TrendingUp,
  Zap,
  Star,
  Crown,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface ModernDashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  user: User;
  pendingOrders?: number;
  lowStock?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navigationSections = [
  {
    title: 'Overview',
    items: [
      {
        id: 'overview',
        title: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Main overview & KPIs',
        premium: false,
        badge: null,
        gradient: 'from-blue-500 to-indigo-600'
      }
    ]
  },
  {
    title: 'Analytics',
    items: [
      {
        id: 'analytics',
        title: 'Analytics',
        icon: BarChart3,
        description: 'Business insights',
        premium: true,
        badge: null,
        gradient: 'from-emerald-500 to-teal-600'
      },
      {
        id: 'reports',
        title: 'Reports',
        icon: FileText,
        description: 'Detailed reports',
        premium: false,
        badge: null,
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        id: 'insights',
        title: 'Insights',
        icon: TrendingUp,
        description: 'AI-powered insights',
        premium: true,
        badge: 'NEW',
        gradient: 'from-orange-500 to-red-600'
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        id: 'orders',
        title: 'Orders',
        icon: ShoppingCart,
        description: 'Order management',
        premium: false,
        badge: null,
        gradient: 'from-blue-500 to-cyan-600'
      },
      {
        id: 'products',
        title: 'Products',
        icon: Package,
        description: 'Inventory management',
        premium: false,
        badge: null,
        gradient: 'from-green-500 to-emerald-600'
      },
      {
        id: 'customers',
        title: 'Customers',
        icon: Users,
        description: 'Customer database',
        premium: false,
        badge: null,
        gradient: 'from-indigo-500 to-purple-600'
      }
    ]
  },
  {
    title: 'Growth',
    items: [
      {
        id: 'marketing',
        title: 'Marketing',
        icon: Zap,
        description: 'Marketing tools',
        premium: true,
        badge: 'PRO',
        gradient: 'from-yellow-500 to-orange-600'
      }
    ]
  }
];

export function ModernDashboardSidebar({
  activeView,
  onViewChange,
  user,
  pendingOrders = 0,
  lowStock = 0,
  isCollapsed = false,
  onToggleCollapse
}: ModernDashboardSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Add notification badges dynamically
  const getItemBadge = (itemId: string) => {
    switch (itemId) {
      case 'orders':
        return pendingOrders > 0 ? pendingOrders.toString() : null;
      case 'products':
        return lowStock > 0 ? lowStock.toString() : null;
      default:
        return navigationSections
          .flatMap(section => section.items)
          .find(item => item.id === itemId)?.badge || null;
    }
  };

  const getBadgeColor = (itemId: string) => {
    switch (itemId) {
      case 'orders':
        return 'bg-blue-500 text-white';
      case 'products':
        return 'bg-red-500 text-white';
      case 'insights':
        return 'bg-gradient-to-r from-emerald-400 to-blue-500 text-white';
      case 'marketing':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <aside className={`modern-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20" />
      
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse animation-delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo section */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-400/30">
              <span className="text-white font-bold text-lg">L</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">LINKA</h1>
                <div className="flex items-center space-x-1">
                  <Crown className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">Premium</span>
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider px-3 mb-4 flex items-center">
                  {section.title}
                  {section.title === 'Growth' && (
                    <Sparkles className="h-3 w-3 ml-2 text-yellow-400" />
                  )}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  const isHovered = hoveredItem === item.id;
                  const badge = getItemBadge(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        w-full group relative overflow-hidden rounded-xl transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-r ' + item.gradient + ' shadow-lg shadow-blue-500/25 scale-105'
                          : 'hover:bg-white/10 hover:scale-102'
                        }
                        ${isCollapsed ? 'p-3' : 'p-4'}
                        ${isHovered ? 'transform-gpu' : ''}
                      `}
                    >
                      {/* Hover effect background */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 transition-opacity duration-300
                        ${isHovered && !isActive ? 'opacity-20' : ''}
                      `} />

                      {/* Content */}
                      <div className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'}`}>
                        <div className={`
                          p-2 rounded-lg transition-all duration-300 flex-shrink-0
                          ${isActive
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 group-hover:text-white group-hover:bg-white/10'
                          }
                        `}>
                          <Icon className="h-5 w-5" />
                          {item.premium && !isCollapsed && (
                            <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className={`
                                text-sm font-medium transition-colors duration-300
                                ${isActive ? 'text-white' : 'text-white/90 group-hover:text-white'}
                              `}>
                                {item.title}
                                {item.premium && (
                                  <Crown className="inline h-3 w-3 ml-1 text-yellow-400" />
                                )}
                              </span>
                              {badge && (
                                <Badge className={`
                                  ml-2 text-xs px-2 py-0.5 ${getBadgeColor(item.id)}
                                  ${item.id === 'insights' || item.id === 'marketing' ? 'animate-pulse' : ''}
                                `}>
                                  {badge}
                                </Badge>
                              )}
                            </div>
                            <p className={`
                              text-xs mt-1 transition-colors duration-300
                              ${isActive ? 'text-white/80' : 'text-white/60 group-hover:text-white/80'}
                            `}>
                              {item.description}
                            </p>
                          </div>
                        )}

                        {/* Badge for collapsed state */}
                        {isCollapsed && badge && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>

                      {/* Shine effect on hover */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        transform translate-x-[-100%] transition-transform duration-1000
                        ${isHovered ? 'translate-x-[100%]' : ''}
                      `} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User profile section */}
        <div className="border-t border-white/10 p-4 bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-gradient-to-r from-blue-400 to-indigo-500">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Online</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-sidebar {
          position: relative;
          height: 100vh;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .modern-sidebar.expanded {
          width: 320px;
        }

        .modern-sidebar.collapsed {
          width: 80px;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        @media (prefers-reduced-motion: reduce) {
          .modern-sidebar,
          .modern-sidebar * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
