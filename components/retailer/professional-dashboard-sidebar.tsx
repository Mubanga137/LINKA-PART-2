'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Plus,
  List,
  ShoppingCart, 
  Clock,
  CheckCircle,
  XCircle,
  Boxes,
  BarChart3,
  Users,
  Tag,
  MessageSquare,
  Settings,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
  Bell,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfessionalDashboardSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    storeName?: string;
  };
  notifications?: {
    orders: number;
    lowStock: number;
    messages: number;
  };
}

const navigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard Home',
    icon: LayoutDashboard,
    href: '/retailer-dashboard',
    description: 'Overview page',
    badge: null,
    section: 'main'
  },
  {
    id: 'products',
    title: 'Product Management',
    icon: Package,
    href: '/retailer/products',
    description: 'Manage your inventory',
    badge: null,
    section: 'main',
    subItems: [
      { id: 'add-product', title: 'Add New Product', icon: Plus, href: '/retailer/products/add' },
      { id: 'manage-products', title: 'Manage Products', icon: List, href: '/retailer/products/manage' }
    ]
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: ShoppingCart,
    href: '/retailer/orders',
    description: 'Order management',
    badge: 'orders',
    section: 'main',
    subItems: [
      { id: 'all-orders', title: 'All Orders', icon: List, href: '/retailer/orders/all' },
      { id: 'pending-orders', title: 'Pending Orders', icon: Clock, href: '/retailer/orders/pending' },
      { id: 'completed-orders', title: 'Completed Orders', icon: CheckCircle, href: '/retailer/orders/completed' },
      { id: 'canceled-orders', title: 'Canceled Orders', icon: XCircle, href: '/retailer/orders/canceled' }
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory & Stock',
    icon: Boxes,
    href: '/retailer/inventory',
    description: 'Stock management',
    badge: 'lowStock',
    section: 'main'
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    icon: BarChart3,
    href: '/retailer/analytics',
    description: 'Business insights',
    badge: null,
    section: 'main',
    subItems: [
      { id: 'sales-analytics', title: 'Sales Analytics', icon: TrendingUp, href: '/retailer/analytics/sales' },
      { id: 'customer-insights', title: 'Customer Insights', icon: Users, href: '/retailer/analytics/customers' }
    ]
  },
  {
    id: 'promotions',
    title: 'Promotions & Discounts',
    icon: Tag,
    href: '/retailer/promotions',
    description: 'Marketing campaigns',
    badge: null,
    section: 'main'
  },
  {
    id: 'messages',
    title: 'Messages / Customer Chat',
    icon: MessageSquare,
    href: '/retailer/messages',
    description: 'Customer communications',
    badge: 'messages',
    section: 'main'
  },
  {
    id: 'store-settings',
    title: 'Store Settings',
    icon: Settings,
    href: '/retailer/settings',
    description: 'Store configuration',
    badge: null,
    section: 'main',
    subItems: [
      { id: 'profile-branding', title: 'Profile & Branding', icon: User, href: '/retailer/settings/profile' },
      { id: 'payment-settings', title: 'Payment Settings', icon: CreditCard, href: '/retailer/settings/payment' }
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    href: '/retailer/help',
    description: 'Get assistance',
    badge: null,
    section: 'support'
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: LogOut,
    href: '/logout',
    description: 'Sign out',
    badge: null,
    section: 'bottom'
  }
];

export function ProfessionalDashboardSidebar({ 
  isCollapsed = false, 
  onToggle, 
  user, 
  notifications = { orders: 0, lowStock: 0, messages: 0 }
}: ProfessionalDashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getBadgeValue = (badgeType: string | null) => {
    if (!badgeType) return null;
    switch (badgeType) {
      case 'orders': return notifications.orders || null;
      case 'lowStock': return notifications.lowStock || null;
      case 'messages': return notifications.messages || null;
      default: return null;
    }
  };

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const mainItems = navigationItems.filter(item => item.section === 'main');
  const supportItems = navigationItems.filter(item => item.section === 'support');
  const bottomItems = navigationItems.filter(item => item.section === 'bottom');

  return (
    <aside className={`professional-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-slate-900/50" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full border-2 border-slate-800" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">LINKA</h1>
              <p className="text-xs text-slate-400">Retailer Portal</p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {/* Main Navigation Items */}
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item.href);
          const isExpanded = expandedItems.includes(item.id);
          const isHovered = hoveredItem === item.id;
          const badgeValue = getBadgeValue(item.badge);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.id} className="space-y-1">
              <div
                className={`
                  nav-item group relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
                  ${isActive ? 'active bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-l-4 border-amber-500' : ''}
                  ${isHovered ? 'hovered bg-slate-700/30' : 'hover:bg-slate-700/50'}
                  ${isCollapsed ? 'p-3' : 'p-3'}
                `}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  if (hasSubItems && !isCollapsed) {
                    toggleExpanded(item.id);
                  } else {
                    // Navigate to href
                    window.location.href = item.href;
                  }
                }}
              >
                {/* Active glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse" />
                )}

                {/* Hover shine effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                  transform transition-transform duration-1000 -skew-x-12
                  ${isHovered ? 'translate-x-full' : '-translate-x-full'}
                `} />

                <div className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-md transition-all duration-300
                      ${isActive 
                        ? 'bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/25' 
                        : 'text-slate-400 group-hover:text-white group-hover:bg-slate-600/50'
                      }
                    `}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`
                            text-sm font-medium transition-colors duration-300
                            ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                          `}>
                            {item.title}
                          </span>
                          {badgeValue && (
                            <Badge className={`
                              text-xs px-2 py-0.5
                              ${item.badge === 'orders' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                              ${item.badge === 'lowStock' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                              ${item.badge === 'messages' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                            `}>
                              {badgeValue}
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

                  {!isCollapsed && hasSubItems && (
                    <ChevronRight className={`
                      h-4 w-4 text-slate-400 transition-transform duration-300
                      ${isExpanded ? 'rotate-90' : ''}
                    `} />
                  )}

                  {/* Collapsed badge indicator */}
                  {isCollapsed && badgeValue && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>

              {/* Sub-items */}
              {hasSubItems && isExpanded && !isCollapsed && (
                <div className="ml-6 space-y-1 border-l border-slate-700/50 pl-4">
                  {item.subItems!.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = isItemActive(subItem.href);
                    
                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`
                          flex items-center space-x-3 p-2 rounded-md transition-all duration-300 group
                          ${isSubActive 
                            ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                          }
                        `}
                      >
                        <SubIcon className="h-4 w-4" />
                        <span className="text-sm">{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="border-t border-slate-700/50 my-4" />

        {/* Support Items */}
        {supportItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item.href);
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                nav-item flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group
                ${isActive ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/30'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="relative z-10 border-t border-slate-700/50 p-4 space-y-3">
        {/* User Profile */}
        {user && (
          <div className={`flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 ${isCollapsed ? 'justify-center' : ''}`}>
            <Avatar className="h-8 w-8 ring-2 ring-amber-500/30">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-sm">
                {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.storeName || 'Store Owner'}</p>
              </div>
            )}
          </div>
        )}

        {/* Logout */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                // Handle logout
                console.log('Logging out...');
              }}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group
                text-red-400 hover:text-red-300 hover:bg-red-500/10
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .professional-sidebar {
          position: relative;
          height: 100vh;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #1e293b 100%);
          border-right: 1px solid rgba(71, 85, 105, 0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .professional-sidebar.expanded {
          width: 280px;
        }

        .professional-sidebar.collapsed {
          width: 80px;
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #f59e0b, #ea580c);
          border-radius: 0 2px 2px 0;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .professional-sidebar,
          .nav-item {
            transition: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
