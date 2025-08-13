'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users,
  Plus,
  Search,
  Bell,
  Menu,
  Zap,
  Crown,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MobileActionBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onSearchOpen: () => void;
  onMenuOpen: () => void;
  pendingNotifications?: number;
  className?: string;
}

const quickActions = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    gradient: 'from-emerald-500 to-teal-600',
    premium: true
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    gradient: 'from-orange-500 to-red-600'
  }
];

export function MobileActionBar({
  activeView,
  onViewChange,
  onSearchOpen,
  onMenuOpen,
  pendingNotifications = 0,
  className = ''
}: MobileActionBarProps) {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleButtonPress = (actionId: string) => {
    setPressedButton(actionId);
    setTimeout(() => setPressedButton(null), 150);
    
    if (actionId === 'search') {
      onSearchOpen();
    } else if (actionId === 'menu') {
      onMenuOpen();
    } else {
      onViewChange(actionId);
    }
  };

  return (
    <>
      {/* Bottom Action Bar */}
      <div className={`mobile-action-bar ${className}`}>
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-t border-white/20" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/40" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2 flex-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isActive = activeView === action.id;
              const isPressed = pressedButton === action.id;
              
              return (
                <button
                  key={action.id}
                  onClick={() => handleButtonPress(action.id)}
                  className={`
                    relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-br ${action.gradient} shadow-lg scale-110` 
                      : 'bg-white/10 hover:bg-white/20'
                    }
                    ${isPressed ? 'scale-95' : ''}
                    min-w-[60px] group
                  `}
                >
                  {/* Icon container */}
                  <div className={`
                    relative transition-transform duration-200
                    ${isPressed ? 'scale-90' : 'group-hover:scale-110'}
                  `}>
                    <Icon className={`
                      h-5 w-5 transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}
                    `} />
                    
                    {/* Premium indicator */}
                    {action.premium && (
                      <div className="absolute -top-1 -right-1">
                        <Crown className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    text-xs font-medium mt-1 transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
                  `}>
                    {action.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                  )}
                  
                  {/* Ripple effect */}
                  <div className={`
                    absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-200
                    ${isPressed ? 'opacity-100' : ''}
                  `} />
                </button>
              );
            })}
          </div>
          
          {/* Center Action - Add New */}
          <div className="px-4">
            <button
              onClick={() => handleButtonPress('add')}
              className={`
                relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 
                shadow-lg hover:shadow-xl transition-all duration-300 group
                ${pressedButton === 'add' ? 'scale-90' : 'hover:scale-110'}
              `}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <Plus className="h-6 w-6 text-white" />
              </div>
              
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-0 group-hover:opacity-100 animate-ping" />
            </button>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            {/* Search */}
            <button
              onClick={() => handleButtonPress('search')}
              className={`
                relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group
                ${pressedButton === 'search' ? 'scale-95 bg-white/20' : ''}
              `}
            >
              <Search className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </button>
            
            {/* Notifications */}
            <button
              onClick={() => handleButtonPress('notifications')}
              className={`
                relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group
                ${pressedButton === 'notifications' ? 'scale-95 bg-white/20' : ''}
              `}
            >
              <Bell className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              {pendingNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs border-2 border-slate-900 animate-pulse">
                  {pendingNotifications}
                </Badge>
              )}
            </button>
            
            {/* Menu */}
            <button
              onClick={() => handleButtonPress('menu')}
              className={`
                relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group
                ${pressedButton === 'menu' ? 'scale-95 bg-white/20' : ''}
              `}
            >
              <Menu className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
        
        {/* Bottom safe area for devices with home indicators */}
        <div className="h-safe-area-inset-bottom bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      {/* Floating Quick Actions */}
      <div className="floating-quick-actions">
        <div className="flex flex-col space-y-3 p-4">
          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/60 font-medium">Today's Sales</span>
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">$1,247</span>
              <Badge className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5">
                +12%
              </Badge>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <Package className="h-5 w-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs text-white/80 font-medium">Add Product</span>
            </button>
            
            <button className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <Users className="h-5 w-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs text-white/80 font-medium">Customers</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          border-radius: 20px 20px 0 0;
          margin: 0;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .floating-quick-actions {
          position: fixed;
          top: 50%;
          right: -280px;
          transform: translateY(-50%);
          z-index: 40;
          width: 280px;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-quick-actions.show {
          right: 16px;
        }

        .h-safe-area-inset-bottom {
          height: env(safe-area-inset-bottom, 0px);
          min-height: 8px;
        }

        /* Haptic feedback simulation */
        @keyframes haptic {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.95); }
        }

        .haptic-feedback {
          animation: haptic 0.1s ease-in-out;
        }

        /* Hide on larger screens */
        @media (min-width: 768px) {
          .mobile-action-bar,
          .floating-quick-actions {
            display: none;
          }
        }

        /* Landscape orientation adjustments */
        @media screen and (orientation: landscape) and (max-height: 500px) {
          .mobile-action-bar {
            padding: 8px 0;
          }
          
          .floating-quick-actions {
            top: 40%;
          }
        }
      `}</style>
    </>
  );
}
