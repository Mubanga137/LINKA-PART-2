'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Plus, 
  Tag, 
  ShoppingCart, 
  Bell, 
  Search,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ExternalLink,
  Calendar,
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

interface ProfessionalDashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    storeName?: string;
    storeUrl?: string;
  };
  onMenuToggle?: () => void;
  notifications?: {
    total: number;
    unread: number;
  };
}

export function ProfessionalDashboardHeader({ 
  user, 
  onMenuToggle, 
  notifications = { total: 0, unread: 0 }
}: ProfessionalDashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const quickActions = [
    {
      id: 'add-product',
      title: 'Add Product',
      icon: Plus,
      href: '/retailer/products/add',
      color: 'from-blue-500 to-blue-600',
      description: 'Add new product to inventory'
    },
    {
      id: 'create-discount',
      title: 'Create Discount',
      icon: Tag,
      href: '/retailer/promotions/add',
      color: 'from-green-500 to-green-600',
      description: 'Set up promotional offers'
    },
    {
      id: 'check-orders',
      title: 'Check Orders',
      icon: ShoppingCart,
      href: '/retailer/orders',
      color: 'from-orange-500 to-orange-600',
      description: 'View recent orders'
    }
  ];

  return (
    <header className="professional-header">
      {/* Background */}
      <div className="absolute inset-0 bg-white border-b border-slate-200" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Store Info */}
          {user?.storeName && (
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <Store className="h-5 w-5 text-white" />
              </div>
              <div>
                <Link 
                  href={user.storeUrl || '#'}
                  className="flex items-center space-x-1 text-slate-900 hover:text-blue-600 transition-colors group"
                >
                  <h1 className="text-lg font-bold">{user.storeName}</h1>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-xs text-slate-500">Visit your storefront</p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Link key={action.id} href={action.href}>
                  <Button
                    size="sm"
                    className={`
                      bg-gradient-to-r ${action.color} hover:shadow-lg text-white border-0
                      transition-all duration-300 hover:scale-105 group
                    `}
                    title={action.description}
                  >
                    <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="hidden lg:inline">{action.title}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className={`
            relative transition-all duration-300
            ${searchFocused ? 'transform scale-105' : ''}
          `}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search products, orders, customers..."
              className={`
                pl-10 pr-4 h-10 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500
                transition-all duration-300 rounded-xl
                ${searchFocused 
                  ? 'bg-white border-blue-300 ring-2 ring-blue-100 shadow-md' 
                  : 'hover:bg-white hover:border-slate-300'
                }
              `}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="inline-flex items-center rounded border bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Secondary Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2"
            >
              <Bell className="h-5 w-5" />
              {notifications.unread > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white animate-pulse">
                  {notifications.unread > 9 ? '9+' : notifications.unread}
                </Badge>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-slate-200 hover:ring-slate-300 transition-all">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-slate-500 to-slate-600 text-white font-bold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-slate-500">
                    {user?.email || 'user@example.com'}
                  </p>
                  {user?.storeName && (
                    <p className="text-xs leading-none text-blue-600 font-medium">
                      {user.storeName}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/retailer/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/retailer/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/retailer/help" className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => {
                  // Handle logout
                  console.log('Logging out...');
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <style jsx>{`
        .professional-header {
          position: relative;
          z-index: 40;
          border-bottom: 1px solid #e2e8f0;
          background: white;
        }

        @media (max-width: 768px) {
          .professional-header {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </header>
  );
}
