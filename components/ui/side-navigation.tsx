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

  // Enhanced navigation with expandable sections
  const navigationSections = [
    {
      id: "marketplace",
      title: "Marketplace",
      icon: Store,
      description: "Browse all products & services",
      expandable: true,
      items: [
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
        }
      ]
    },
    {
      id: "premium",
      title: "Premium Listings",
      href: "/marketplace/premium-listings",
      icon: Crown,
      description: "Curated excellence",
      active: pathname === "/marketplace/premium-listings",
      premium: true,
      glow: true,
      expandable: false
    }
  ];

  // User account items
  const accountItems = [
    {
      id: "account",
      title: "My Account",
      href: user?.role === 'retailer' ? '/retailer/studio' : user?.role === 'customer' ? '/customer-dashboard' : '/profile',
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

  // Enhanced section toggle with better state management
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const isExpanded = prev.includes(sectionId);
      if (isExpanded) {
        return prev.filter(id => id !== sectionId);
      } else {
        // Auto-expand marketplace section by default
        return sectionId === 'marketplace' ? [sectionId] : [...prev, sectionId];
      }
    });
  };

  // Auto-expand marketplace section on mount
  useEffect(() => {
    if (expandedSections.length === 0) {
      setExpandedSections(['marketplace']);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const NavItem = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isActive = item.active;

    // Ensure href is defined
    if (!item.href) {
      console.warn('NavItem: Missing href for item:', item.title);
      return (
        <div className="px-4 py-4 rounded-2xl bg-slate-100/50 text-slate-500">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded-xl bg-slate-200">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs">Link unavailable</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link href={item.href} onClick={() => setSidebarOpen(false)}>
        <div className={`group relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
          isActive
            ? navConfig.theme.active + ' shadow-xl ring-2 ring-current/20'
            : navConfig.theme.accent + ' ' + navConfig.theme.hover + ' hover:shadow-lg'
        }`}
        role="menuitem"
        tabIndex={0}
        aria-label={`Navigate to ${item.title}`}
        >
          {/* Active state gold border */}
          {isActive && (
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full ${
              isPremium
                ? 'bg-gradient-to-b from-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/50'
                : 'bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg shadow-blue-400/50'
            }`}></div>
          )}

          <div className="flex items-center space-x-4 flex-1">
            <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              isActive
                ? isPremium
                  ? 'bg-yellow-400/20 shadow-lg shadow-yellow-400/20'
                  : 'bg-blue-400/20 shadow-lg shadow-blue-400/20'
                : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <Icon className={`h-5 w-5 transition-all duration-300 ${
                item.premium && item.glow
                  ? 'crown-glow'
                  : isActive
                    ? isPremium ? 'text-yellow-300' : 'text-blue-300'
                    : ''
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'group-hover:text-white'
              }`}>{item.title}</p>
              <p className={`text-xs truncate transition-all duration-300 ${
                isActive
                  ? 'text-white/80'
                  : 'text-blue-300/80 group-hover:text-blue-200/90'
              }`}>
                {item.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <Badge className={
                typeof item.badge === 'string'
                  ? 'bg-transparent text-orange-400 border-0 text-xs'
                  : 'bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs shadow-md animate-pulse'
              }>
                {item.badge}
              </Badge>
            )}
            {item.premium && (
              <Sparkles className={`h-4 w-4 transition-all duration-300 ${
                isActive
                  ? 'text-yellow-400 animate-pulse'
                  : 'text-blue-300 group-hover:text-yellow-400'
              }`} />
            )}
          </div>
        </div>
      </Link>
    );
  };

  // Enhanced Expandable Section Component
  const ExpandableSection = ({ section }: { section: any }) => {
    const isExpanded = expandedSections.includes(section.id);
    const Icon = section.icon;
    const hasActiveChild = section.items?.some((item: any) => item.active);

    if (!section.expandable) {
      return <NavItem item={section} />;
    }

    return (
      <div className="space-y-2">
        <button
          onClick={() => toggleSection(section.id)}
          className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] group ${
            hasActiveChild || isExpanded
              ? isPremium
                ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 shadow-lg shadow-yellow-400/10'
                : 'bg-gradient-to-r from-blue-400/20 to-blue-600/20 border border-blue-400/30 shadow-lg shadow-blue-400/10'
              : navConfig.theme.accent + ' ' + navConfig.theme.hover + ' hover:shadow-lg'
          }`}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${section.title} section`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              hasActiveChild || isExpanded
                ? isPremium
                  ? 'bg-yellow-400/20 shadow-lg shadow-yellow-400/20'
                  : 'bg-blue-400/20 shadow-lg shadow-blue-400/20'
                : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <Icon className={`h-5 w-5 transition-all duration-300 ${
                hasActiveChild || isExpanded
                  ? isPremium ? 'text-yellow-300' : 'text-blue-300'
                  : ''
              }`} />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-sm font-semibold transition-all duration-300 ${
                hasActiveChild || isExpanded
                  ? 'text-white'
                  : 'group-hover:text-white'
              }`}>{section.title}</p>
              <p className={`text-xs transition-all duration-300 ${
                hasActiveChild || isExpanded
                  ? 'text-white/80'
                  : 'text-blue-300/80 group-hover:text-blue-200/90'
              }`}>
                {section.description}
              </p>
            </div>
          </div>

          <motion.div
            animate={{
              rotate: isExpanded ? 90 : 0,
              scale: isExpanded ? 1.1 : 1
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className={`${
              hasActiveChild || isExpanded
                ? isPremium ? 'text-yellow-300' : 'text-blue-300'
                : 'text-slate-400 group-hover:text-white'
            }`}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-6 space-y-1 pl-4 border-l-2 border-current/20"
            >
              {section.items.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {item.href ? (
                    <Link href={item.href} onClick={() => setSidebarOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] ${
                        item.active
                          ? isPremium
                            ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-200 border border-yellow-400/30'
                            : 'bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-200 border border-blue-400/30'
                          : 'text-blue-300/80 hover:text-white hover:bg-white/10'
                      }`}
                      role="menuitem"
                      aria-label={`Navigate to ${item.title}`}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          item.active
                            ? isPremium ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-blue-400 shadow-lg shadow-blue-400/50'
                            : 'bg-blue-400/50'
                        }`} />
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto text-xs bg-red-500/80 text-white border-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-slate-400/50" />
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title} (No link)</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Accessible Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 focus:ring-4 focus:ring-blue-400/20"
        aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={sidebarOpen}
        aria-controls="premium-navigation"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enhanced Linka Royale Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${navConfig.theme.base} shadow-2xl transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:flex lg:flex-col ${className}`}>
        
        {/* Enhanced Linka Royale Header */}
        <div className={`relative flex items-center justify-between h-20 px-6 border-b flex-shrink-0 ${
          isPremium
            ? 'border-yellow-400/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900'
            : 'border-white/10 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900'
        }`}>
          {/* Background shimmer effect */}
          <div className={`absolute inset-0 opacity-30 ${
            isPremium
              ? 'bg-gradient-to-r from-yellow-400/5 via-transparent to-amber-500/5'
              : 'bg-gradient-to-r from-blue-400/5 via-transparent to-blue-600/5'
          }`}></div>

          <Link href="/" className="flex items-center space-x-4 relative z-10 group">
            <div className={`p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
              isPremium
                ? 'bg-gradient-to-br from-yellow-400/30 to-amber-500/30 shadow-lg shadow-yellow-400/20'
                : 'bg-gradient-to-br from-blue-400/30 to-blue-600/30 shadow-lg shadow-blue-400/20'
            }`}>
              {isPremium ? (
                <Crown className="h-7 w-7 crown-glow" />
              ) : (
                <Store className="h-7 w-7 text-blue-400" />
              )}
            </div>
            <div className="space-y-1">
              <h1 className={`text-xl font-bold transition-all duration-300 group-hover:scale-105 ${
                isPremium
                  ? 'logo-3d-premium font-serif'
                  : 'text-white'
              }`}>
                {navConfig.logo.text}
              </h1>
              {isPremium && (
                <p className={`text-xs font-medium ${
                  isDarkMode ? 'text-yellow-300/80' : 'text-blue-300/80'
                }`}>Curated Excellence</p>
              )}
            </div>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              isPremium
                ? 'text-yellow-300 hover:bg-yellow-400/20'
                : 'text-white hover:bg-white/20'
            }`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced Navigation with Full Height */}
        <nav
          id="premium-navigation"
          className="flex-1 px-4 py-6 space-y-6 overflow-y-auto custom-scrollbar"
          role="navigation"
          aria-label="Premium Navigation Menu"
        >
          {/* Enhanced Core Navigation with Expandable Sections */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-sm ${
              isPremium
                ? 'bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 shadow-lg shadow-yellow-400/5'
                : 'bg-gradient-to-r from-blue-400/10 to-blue-600/10 border border-blue-400/20 shadow-lg shadow-blue-400/5'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isPremium ? 'bg-yellow-400' : 'bg-blue-400'
              }`}></div>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                isPremium ? 'text-yellow-300' : 'text-blue-300'
              }`}>
                Navigation
              </h3>
            </div>
            <div className="space-y-3" role="menu">
              {navigationSections.map((section) => (
                <ExpandableSection key={section.id} section={section} />
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
                  <ExpandableSection key={section.id} section={section} />
                ))}
              </div>
            </div>
          )}

          {/* Enhanced User Account */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
              isPremium
                ? 'bg-gradient-to-r from-emerald-400/10 to-teal-500/10 border border-emerald-400/20'
                : 'bg-gradient-to-r from-purple-400/10 to-indigo-500/10 border border-purple-400/20'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isPremium ? 'bg-emerald-400' : 'bg-purple-400'
              }`}></div>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                isPremium ? 'text-emerald-300' : 'text-purple-300'
              }`}>
                Account
              </h3>
            </div>
            <div className="space-y-2" role="menu">
              {accountItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Enhanced Support */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
              isPremium
                ? 'bg-gradient-to-r from-rose-400/10 to-pink-500/10 border border-rose-400/20'
                : 'bg-gradient-to-r from-green-400/10 to-emerald-500/10 border border-green-400/20'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isPremium ? 'bg-rose-400' : 'bg-green-400'
              }`}></div>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                isPremium ? 'text-rose-300' : 'text-green-300'
              }`}>
                Support
              </h3>
            </div>
            <div className="space-y-2" role="menu">
              {supportItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </nav>

        {/* Enhanced Premium Footer */}
        <div className={`relative p-6 border-t flex-shrink-0 ${
          isPremium
            ? 'border-yellow-400/20 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800/50'
            : 'border-white/10 bg-gradient-to-t from-blue-900 via-indigo-900 to-indigo-900/50'
        }`}>
          {/* Premium shimmer overlay */}
          <div className={`absolute inset-0 opacity-20 ${
            isPremium
              ? 'bg-gradient-to-t from-yellow-400/5 via-transparent to-amber-500/5'
              : 'bg-gradient-to-t from-blue-400/5 via-transparent to-blue-600/5'
          }`}></div>

          <div className="relative z-10 space-y-4">
            {/* Dark Mode Toggle (Premium only) */}
            {isPremium && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-full justify-start gap-3 transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/20'
                    : 'bg-blue-400/10 border-blue-400/30 text-blue-300 hover:bg-blue-400/20'
                } backdrop-blur-sm`}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            )}

            {/* Enhanced User info and logout */}
            {user && (
              <div className="space-y-3">
                <div className={`flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                  isPremium
                    ? 'bg-yellow-400/10 border border-yellow-400/20 shadow-lg shadow-yellow-400/10'
                    : 'bg-white/10 border border-white/20 shadow-lg'
                }`}>
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
                    isPremium
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/30'
                      : 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg'
                  }`}>
                    <User className="h-5 w-5 text-white" />
                    {user.role === 'premium' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Crown className="h-2.5 w-2.5 text-slate-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className={`text-xs capitalize font-medium ${
                      isPremium ? 'text-yellow-300/80' : 'text-blue-300/80'
                    }`}>{user.role}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
                  aria-label="Logout from account"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}

            {/* Premium branding */}
            {isPremium && (
              <div className="text-center pt-2 border-t border-yellow-400/20">
                <p className="text-xs text-yellow-300/60 font-medium">Linka Royale Premium</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
