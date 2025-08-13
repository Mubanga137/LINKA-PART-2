'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Menu, 
  Plus, 
  Download,
  Moon,
  Sun,
  User,
  LogOut,
  ShoppingCart,
  TrendingUp,
  Zap
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

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface ModernDashboardHeaderProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onSidebarToggle?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function ModernDashboardHeader({
  user,
  currentView,
  onViewChange,
  onSidebarToggle,
  isDarkMode = false,
  onThemeToggle
}: ModernDashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const viewTitles: Record<string, string> = {
    overview: 'Dashboard Overview',
    analytics: 'Analytics & Insights',
    reports: 'Business Reports',
    insights: 'Performance Insights',
    orders: 'Order Management',
    products: 'Product Catalog',
    customers: 'Customer Database',
    marketing: 'Marketing Hub'
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <header className="modern-header">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10" />
      
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center space-x-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page title with animation */}
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
              {viewTitles[currentView] || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-2 text-blue-200/80">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Live Updates Active</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Enhanced search bar */}
          <div className={`relative transition-all duration-500 ${searchFocused ? 'w-80' : 'w-64'} hidden md:block`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search everything..."
              className={`
                pl-12 pr-20 h-12 bg-white/10 border-white/20 text-white placeholder-white/60
                backdrop-blur-sm rounded-xl transition-all duration-300
                ${searchFocused ? 'bg-white/20 border-white/30 shadow-lg' : ''}
                focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-blue-400/50
              `}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <kbd className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-mono text-white/80 border border-white/30">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Quick action buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-button text-white border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button 
              size="sm" 
              className="premium-button bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Product
            </Button>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications with animated badge */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-pulse border-2 border-white/20">
              3
            </Badge>
          </Button>

          {/* User menu with premium styling */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300">
                <Avatar className="h-10 w-10 ring-2 ring-gradient">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass-dropdown backdrop-blur-xl bg-white/10 border-white/20" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none text-white">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-white/70">
                    {user?.email || 'user@example.com'}
                  </p>
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-xs text-emerald-400 font-medium">Online</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <ShoppingCart className="mr-3 h-4 w-4" />
                <span>Store Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Settings className="mr-3 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-300 hover:text-red-200 hover:bg-red-500/20 cursor-pointer"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <style jsx>{`
        .modern-header {
          position: relative;
          height: 80px;
          overflow: hidden;
        }

        .glass-button {
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .premium-button {
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
        }

        .glass-dropdown {
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .ring-gradient {
          background: linear-gradient(45deg, #3b82f6, #10b981);
        }
      `}</style>
    </header>
  );
}
