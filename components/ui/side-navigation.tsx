"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  
  const totalItems = getCartItemCount();
  
  // Get wishlist count
  let favoritesCount = 0;
  if (typeof window !== 'undefined') {
    try {
      const storedFavorites = localStorage.getItem('marketplace-favorites');
      if (storedFavorites) {
        favoritesCount = JSON.parse(storedFavorites).length;
      }
    } catch {
      // No favorites stored
    }
  }

  // Detect mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        : "text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
    },
    theme: {
      base: isPremium 
        ? (isDarkMode 
          ? "bg-slate-900/95 border-yellow-400/20 text-white" 
          : "bg-white/95 border-blue-400/20 text-slate-900")
        : "bg-white/95 border-slate-200/50 text-slate-900",
      accent: isPremium 
        ? (isDarkMode ? "text-yellow-400" : "text-blue-600")
        : "text-blue-600",
      hover: isPremium 
        ? (isDarkMode 
          ? "hover:bg-yellow-400/10 hover:text-yellow-300" 
          : "hover:bg-blue-50 hover:text-blue-700")
        : "hover:bg-slate-50 hover:text-slate-900",
      active: isPremium 
        ? (isDarkMode 
          ? "bg-yellow-400/20 text-yellow-300 border-r-2 border-yellow-400" 
          : "bg-blue-50 text-blue-700 border-r-2 border-blue-500")
        : "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
    }
  };

  // Main navigation items
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/marketplace",
      active: pathname === "/marketplace"
    },
    {
      id: "hot-deals",
      label: "Hot Deals",
      icon: Flame,
      href: "/hot-deals",
      active: pathname === "/hot-deals",
      badge: "🔥"
    },
    {
      id: "shop",
      label: "Shop",
      icon: Store,
      href: "/shop",
      active: pathname === "/shop"
    },
    {
      id: "services",
      label: "Services",
      icon: Headphones,
      href: "/services",
      active: pathname === "/services"
    },
    {
      id: "premium",
      label: "Premium Listings",
      icon: Crown,
      href: "/marketplace/premium-listings",
      active: pathname === "/marketplace/premium-listings",
      premium: true,
      glow: true
    }
  ];

  // User account items
  const accountItems = [
    {
      id: "account",
      label: "My Account",
      icon: User,
      href: user?.role === 'retailer' ? '/retailer-dashboard' : user?.role === 'customer' ? '/customer-dashboard' : '/profile',
      active: false
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      href: "/wishlist",
      active: pathname === "/wishlist",
      badge: favoritesCount > 0 ? favoritesCount : undefined
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      href: "/cart",
      active: pathname === "/cart",
      badge: totalItems > 0 ? totalItems : undefined
    }
  ];

  // Support items
  const supportItems = [
    {
      id: "contact",
      label: "Contact Us",
      icon: Phone,
      href: "/contact",
      active: pathname === "/contact"
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      href: "/help",
      active: pathname === "/help"
    }
  ];

  // Premium sections (for premium listings only)
  const premiumSections = isPremium ? [
    {
      id: "royal",
      label: "Royal Recommendations",
      icon: Crown,
      items: [
        { label: "Heritage Collection", href: "/marketplace/premium-listings?filter=royal&category=heritage" },
        { label: "Artisan Masterpieces", href: "/marketplace/premium-listings?filter=royal&category=artisan" },
        { label: "Royal Services", href: "/marketplace/premium-listings?filter=royal&type=service" }
      ]
    },
    {
      id: "trending",
      label: "Trending Premium Deals",
      icon: TrendingUp,
      items: [
        { label: "Flash Premium Sales", href: "/marketplace/premium-listings?filter=trending&sale=flash" },
        { label: "Limited Editions", href: "/marketplace/premium-listings?filter=trending&category=limited" },
        { label: "Exclusive Offers", href: "/marketplace/premium-listings?filter=trending&category=exclusive" }
      ]
    },
    {
      id: "luxury",
      label: "Luxury Categories",
      icon: Gem,
      items: [
        { label: "Jewelry & Accessories", href: "/marketplace/premium-listings?category=jewelry" },
        { label: "Art & Collectibles", href: "/marketplace/premium-listings?category=art" },
        { label: "Luxury Services", href: "/marketplace/premium-listings?category=luxury-services" }
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
    setIsSheetOpen(false);
  };

  const NavItem = ({ item, expanded = false }: { item: any; expanded?: boolean }) => {
    const isActive = item.active;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href={item.href}>
          <div className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group cursor-pointer
            ${isActive ? navConfig.theme.active : `${navConfig.theme.hover} text-slate-600`}
            ${item.premium && !isPremium ? 'relative overflow-hidden' : ''}
          `}>
            {/* Premium glow effect */}
            {item.premium && item.glow && (
              <div className={`absolute inset-0 rounded-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-yellow-400/10 to-amber-500/10' 
                  : 'bg-gradient-to-r from-blue-400/10 to-blue-600/10'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            )}
            
            <div className="relative z-10 flex items-center gap-3 w-full">
              <item.icon className={`h-5 w-5 transition-all duration-300 ${
                item.premium ? (isActive ? 'crown-glow' : 'group-hover:text-yellow-500') : ''
              }`} />
              
              <AnimatePresence>
                {(expanded || !isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium transition-all duration-300 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Badges */}
              {item.badge && (expanded || !isMobile) && (
                <Badge className={`ml-auto text-xs ${
                  typeof item.badge === 'string' 
                    ? 'bg-transparent text-orange-500 border-0' 
                    : 'bg-orange-500 text-white'
                }`}>
                  {item.badge}
                </Badge>
              )}
              
              {/* Premium sparkle effect */}
              {item.premium && (
                <Sparkles className={`h-3 w-3 ml-auto ${
                  isActive ? 'text-yellow-500' : 'text-slate-400 group-hover:text-yellow-500'
                } transition-all duration-300`} />
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const PremiumSection = ({ section, expanded = false }: { section: any; expanded?: boolean }) => {
    const isExpanded = expandedSections.includes(section.id);
    
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleSection(section.id)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group
            ${navConfig.theme.hover} text-slate-600
          `}
        >
          <section.icon className="h-5 w-5" />
          {(expanded || !isMobile) && (
            <>
              <span className="font-medium flex-1 text-left">{section.label}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </>
          )}
        </button>
        
        <AnimatePresence>
          {isExpanded && (expanded || !isMobile) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-8 space-y-1"
            >
              {section.items.map((item: any, index: number) => (
                <Link key={index} href={item.href}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200">
                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const SidebarContent = ({ expanded = false }: { expanded?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo & Branding */}
      <div className="p-4 border-b border-current/10">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-2 rounded-xl ${
              isPremium 
                ? (isDarkMode 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20' 
                  : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20')
                : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20'
            }`}
          >
            {isPremium ? (
              <Crown className="h-6 w-6 crown-glow" />
            ) : (
              <Store className="h-6 w-6 text-blue-600" />
            )}
          </motion.div>
          
          {(expanded || !isMobile) && (
            <div>
              <h1 className={navConfig.logo.className}>
                {navConfig.logo.text}
              </h1>
              {isPremium && (
                <p className="text-xs text-slate-500">Curated Excellence</p>
              )}
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Core Navigation */}
        <div className="space-y-1">
          {(expanded || !isMobile) && (
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Navigation
            </h3>
          )}
          {navigationItems.map((item) => (
            <NavItem key={item.id} item={item} expanded={expanded} />
          ))}
        </div>

        {/* Premium Sections (Premium Listings only) */}
        {isPremium && premiumSections.length > 0 && (
          <div className="space-y-1">
            {(expanded || !isMobile) && (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Premium Collections
              </h3>
            )}
            {premiumSections.map((section) => (
              <PremiumSection key={section.id} section={section} expanded={expanded} />
            ))}
          </div>
        )}

        {/* User Account */}
        <div className="space-y-1">
          {(expanded || !isMobile) && (
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Account
            </h3>
          )}
          {accountItems.map((item) => (
            <NavItem key={item.id} item={item} expanded={expanded} />
          ))}
        </div>

        {/* Support */}
        <div className="space-y-1">
          {(expanded || !isMobile) && (
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Support
            </h3>
          )}
          {supportItems.map((item) => (
            <NavItem key={item.id} item={item} expanded={expanded} />
          ))}
        </div>
      </div>

      {/* Mode Switcher & Logout */}
      <div className="p-4 border-t border-current/10 space-y-2">
        {/* Dark Mode Toggle (Premium only) */}
        {isPremium && (expanded || !isMobile) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full justify-start gap-3"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        )}
        
        {/* Logout */}
        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            {(expanded || !isMobile) && 'Logout'}
          </Button>
        )}
      </div>
    </div>
  );

  // Mobile version
  if (isMobile) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className={`w-80 p-0 ${navConfig.theme.base} backdrop-blur-xl border-r-2`}
        >
          <SidebarContent expanded={true} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop version
  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 280 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        hidden md:flex fixed left-0 top-0 h-screen z-40 
        ${navConfig.theme.base} backdrop-blur-xl border-r-2 shadow-xl
        ${className}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarContent expanded={isExpanded} />
    </motion.aside>
  );
}
