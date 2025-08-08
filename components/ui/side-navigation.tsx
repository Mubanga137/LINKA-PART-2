"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Home,
  Flame,
  Store,
  Headphones,
  Crown,
  User,
  Heart,
  ShoppingCart,
  Phone,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Diamond,
  Award,
  Gem,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/marketplace-context";

interface SideNavigationProps {
  variant?: "marketplace" | "premium";
  className?: string;
}

export function SideNavigation({ variant = "marketplace", className = "" }: SideNavigationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  
  const totalItems = getCartItemCount();
  
  // Get wishlist count
  let favoritesCount = 0;
  if (typeof window !== 'undefined') {
    try {
      const storedFavorites = localStorage.getItem('marketplace_favorites');
      if (storedFavorites && storedFavorites.trim() !== '') {
        const parsed = JSON.parse(storedFavorites);
        favoritesCount = Array.isArray(parsed) ? parsed.length : 0;
      }
    } catch (error) {
      // Clear corrupted data and reset
      localStorage.removeItem('marketplace_favorites');
      favoritesCount = 0;
    }
  }

  // Dark mode detection for premium variant
  useEffect(() => {
    if (variant === "premium") {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [variant]);

  const isPremium = variant === "premium";
  
  // Navigation configuration
  const navConfig = {
    logo: {
      text: isPremium ? "Linka Royale" : "Linka",
      className: isPremium 
        ? "logo-3d-premium font-serif" 
        : "text-lg font-bold text-white"
    },
    theme: {
      base: isPremium 
        ? (isDarkMode 
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900")
        : "bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900",
      text: "text-white",
      accent: isPremium 
        ? (isDarkMode ? "text-yellow-400" : "text-yellow-300")
        : "text-blue-200",
      hover: isPremium 
        ? (isDarkMode 
          ? "hover:bg-yellow-400/10 hover:text-yellow-300" 
          : "hover:bg-blue-800/50 hover:text-white")
        : "hover:bg-blue-800/50 hover:text-white",
      active: isPremium 
        ? (isDarkMode 
          ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900" 
          : "bg-gradient-to-r from-blue-400 to-blue-500 text-white")
        : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
    }
  };

  // Main navigation items
  const navigationItems = [
    {
      id: "home",
      title: "Home",
      href: "/marketplace",
      icon: Home,
      description: "Marketplace overview",
      active: pathname === "/marketplace"
    },
    {
      id: "hot-deals",
      title: "Hot Deals",
      href: "/hot-deals",
      icon: Flame,
      description: "Limited time offers",
      active: pathname === "/hot-deals",
      badge: "🔥"
    },
    {
      id: "shop",
      title: "Shop",
      href: "/shop",
      icon: Store,
      description: "All products",
      active: pathname === "/shop"
    },
    {
      id: "services",
      title: "Services",
      href: "/services",
      icon: Headphones,
      description: "Service marketplace",
      active: pathname === "/services"
    },
    {
      id: "premium",
      title: "Premium Listings",
      href: "/marketplace/premium-listings",
      icon: Crown,
      description: "Curated excellence",
      active: pathname === "/marketplace/premium-listings",
      premium: true,
      glow: true
    }
  ];

  // User account items
  const accountItems = [
    {
      id: "account",
      title: "My Account",
      href: user?.role === 'retailer' ? '/retailer-dashboard' : user?.role === 'customer' ? '/customer-dashboard' : '/profile',
      icon: User,
      description: "Account settings",
      active: false
    },
    {
      id: "wishlist",
      title: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      description: "Saved items",
      active: pathname === "/wishlist",
      badge: favoritesCount > 0 ? favoritesCount : undefined
    },
    {
      id: "cart",
      title: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      description: "Shopping cart",
      active: pathname === "/cart",
      badge: totalItems > 0 ? totalItems : undefined
    }
  ];

  // Support items
  const supportItems = [
    {
      id: "contact",
      title: "Contact Us",
      href: "/contact",
      icon: Phone,
      description: "Get in touch",
      active: pathname === "/contact"
    },
    {
      id: "help",
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      description: "Help center",
      active: pathname === "/help"
    }
  ];

  // Premium sections (for premium listings only)
  const premiumSections = isPremium ? [
    {
      id: "royal",
      title: "Royal Recommendations",
      icon: Crown,
      items: [
        { title: "Heritage Collection", href: "/marketplace/premium-listings?filter=royal&category=heritage" },
        { title: "Artisan Masterpieces", href: "/marketplace/premium-listings?filter=royal&category=artisan" },
        { title: "Royal Services", href: "/marketplace/premium-listings?filter=royal&type=service" }
      ]
    },
    {
      id: "trending",
      title: "Trending Premium Deals",
      icon: TrendingUp,
      items: [
        { title: "Flash Premium Sales", href: "/marketplace/premium-listings?filter=trending&sale=flash" },
        { title: "Limited Editions", href: "/marketplace/premium-listings?filter=trending&category=limited" },
        { title: "Exclusive Offers", href: "/marketplace/premium-listings?filter=trending&category=exclusive" }
      ]
    },
    {
      id: "luxury",
      title: "Luxury Categories",
      icon: Gem,
      items: [
        { title: "Jewelry & Accessories", href: "/marketplace/premium-listings?category=jewelry" },
        { title: "Art & Collectibles", href: "/marketplace/premium-listings?category=art" },
        { title: "Luxury Services", href: "/marketplace/premium-listings?category=luxury-services" }
      ]
    }
  ] : [];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const NavItem = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isActive = item.active;
    
    return (
      <Link href={item.href} onClick={() => setSidebarOpen(false)}>
        <div className={`group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? navConfig.theme.active + ' shadow-lg transform scale-105'
            : navConfig.theme.accent + ' ' + navConfig.theme.hover + ' hover:transform hover:scale-102'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-white/20'
                : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <Icon className={`h-4 w-4 ${item.premium && item.glow ? 'crown-glow' : ''}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className={`text-xs ${
                isActive
                  ? 'text-white/80'
                  : 'text-blue-300 group-hover:text-blue-200'
              }`}>
                {item.description}
              </p>
            </div>
          </div>
          {item.badge && (
            <Badge className={
              typeof item.badge === 'string' 
                ? 'bg-transparent text-orange-400 border-0' 
                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs shadow-md animate-pulse ml-2'
            }>
              {item.badge}
            </Badge>
          )}
          {item.premium && (
            <Sparkles className={`h-3 w-3 ml-2 ${
              isActive ? 'text-yellow-400' : 'text-blue-300 group-hover:text-yellow-400'
            } transition-all duration-300`} />
          )}
        </div>
      </Link>
    );
  };

  const PremiumSection = ({ section }: { section: any }) => {
    const isExpanded = expandedSections.includes(section.id);
    const Icon = section.icon;
    
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleSection(section.id)}
          className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
            navConfig.theme.accent + ' ' + navConfig.theme.hover
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg transition-colors bg-white/10 group-hover:bg-white/20">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{section.title}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-8 space-y-1"
            >
              {section.items.map((item: any, index: number) => (
                <Link key={index} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-blue-300 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                    {item.title}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${navConfig.theme.base} shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen ${className}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isPremium 
                ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20' 
                : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20'
            }`}>
              {isPremium ? (
                <Crown className="h-6 w-6 crown-glow" />
              ) : (
                <Store className="h-6 w-6 text-blue-400" />
              )}
            </div>
            <div>
              <h1 className={navConfig.logo.className}>
                {navConfig.logo.text}
              </h1>
              {isPremium && (
                <p className="text-xs text-blue-300">Curated Excellence</p>
              )}
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {/* Core Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Premium Sections */}
          {isPremium && premiumSections.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-3">
                Premium Collections
              </h3>
              <div className="space-y-1">
                {premiumSections.map((section) => (
                  <PremiumSection key={section.id} section={section} />
                ))}
              </div>
            </div>
          )}

          {/* User Account */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-3">
              Account
            </h3>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-3">
              Support
            </h3>
            <div className="space-y-1">
              {supportItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          {/* Dark Mode Toggle (Premium only) */}
          {isPremium && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full justify-start gap-3 mb-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          )}
          
          {/* User info and logout */}
          {user && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-blue-300 capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start gap-3 bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
