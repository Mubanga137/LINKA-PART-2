"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Briefcase,
  User,
  Search,
  Heart,
  Settings,
  LogOut,
  Phone,
  Info,
  Store,
  ChevronRight,
  ShoppingCart,
  Bell,
  Package,
  ArrowLeft,
  Flame,
  Star,
  Crown,
  Gift,
  MapPin,
  Clock,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Calendar,
  Bookmark,
  Activity,
  Award,
  DollarSign,
  Eye,
  Filter,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";

export function EnhancedMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  const { user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  const closeSheet = () => {
    setIsOpen(false);
    setActiveSection("main");
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    closeSheet();
  };

  // Show cart/wishlist on shopping-related pages
  const isShoppingPage = pathname?.includes('/marketplace') ||
                        pathname?.includes('/shop') ||
                        pathname?.includes('/cart') ||
                        pathname?.includes('/checkout') ||
                        pathname?.includes('/products') ||
                        pathname?.includes('/categories') ||
                        pathname?.includes('/customer-dashboard');

  const isHomePage = pathname === '/';

  // Main navigation items for customers
  const mainNavigationItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      href: "/customer-dashboard",
      icon: Home,
      description: "Your personal overview",
      active: pathname?.includes("/customer-dashboard"),
      badge: null,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "shop",
      name: "Shop",
      href: "/marketplace",
      icon: ShoppingBag,
      description: "Browse products & services",
      active: pathname?.includes("/marketplace"),
      badge: null,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "orders",
      name: "My Orders",
      href: "/orders",
      icon: Package,
      description: "Track your purchases",
      active: pathname?.includes("/orders"),
      badge: "3",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "wishlist",
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      description: "Saved items",
      active: pathname?.includes("/wishlist"),
      badge: favorites.length > 0 ? favorites.length.toString() : null,
      gradient: "from-red-500 to-rose-600"
    },
    {
      id: "hot-deals",
      name: "Hot Deals",
      href: "/hot-deals",
      icon: Flame,
      description: "Limited time offers",
      active: pathname?.includes("/hot-deals"),
      badge: "70%",
      gradient: "from-orange-500 to-red-500",
      isSpecial: true
    },
    {
      id: "services",
      name: "Services",
      href: "/services",
      icon: Briefcase,
      description: "Professional services",
      active: pathname?.includes("/services"),
      badge: "New",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  // Quick action items
  const quickActions = [
    {
      id: "cart",
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      count: totalItems,
      amount: `K${totalPrice.toFixed(2)}`,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "wishlist-quick",
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      count: favorites.length,
      amount: `${favorites.length} items`,
      gradient: "from-pink-500 to-red-500"
    }
  ];

  // Account and settings items
  const accountItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      description: "Personal information"
    },
    {
      name: "Payment Methods",
      href: "/settings/payment",
      icon: CreditCard,
      description: "Cards & payment options"
    },
    {
      name: "Notifications",
      href: "/settings/notifications",
      icon: Bell,
      description: "Alert preferences"
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      description: "App preferences"
    },
    {
      name: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      description: "Get assistance"
    }
  ];

  // Support and information items
  const supportItems = [
    {
      name: "Contact Us",
      href: "/contact",
      icon: MessageCircle,
      description: "Get in touch"
    },
    {
      name: "About Linka",
      href: "/about",
      icon: Info,
      description: "Learn more about us"
    }
  ];

  // Animation variants
  const slideInVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 text-current hover:bg-current/10 transition-all duration-300 rounded-xl"
            >
              <Menu className="h-6 w-6" />
              {(totalItems > 0 || favorites.length > 0) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {totalItems + favorites.length}
                  </span>
                </div>
              )}
            </Button>
          </motion.div>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full max-w-sm p-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-l border-gray-200/50 overflow-hidden"
        >
          <div className="flex flex-col h-full relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-500 rounded-full blur-lg"></div>
            </div>

            {/* Header */}
            <SheetHeader className="p-6 pb-4 border-b border-gray-100/50 relative z-10">
              <div className="flex items-center justify-between">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-bold text-gray-900">Linka</SheetTitle>
                    <SheetDescription className="text-sm text-gray-500">
                      Your marketplace companion
                    </SheetDescription>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeSheet}
                    className="h-10 w-10 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </SheetHeader>

            {/* User Info */}
            {user && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 pb-4 relative z-10"
              >
                <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-lg">
                        Hi, {user.name?.split(' ')[0] || 'User'}! 👋
                      </p>
                      <p className="text-sm text-blue-600 capitalize font-medium">{user.role} Account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">Premium Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions for Shopping */}
            {user && isShoppingPage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-6 pb-4 relative z-10"
              >
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={action.href}
                        onClick={closeSheet}
                        className={`flex flex-col items-center justify-center p-4 bg-gradient-to-r ${action.gradient} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <action.icon className="h-5 w-5" />
                          <span className="font-bold text-sm">{action.name}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{action.count}</div>
                          <div className="text-xs opacity-90">{action.amount}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Navigation */}
            <motion.nav 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex-1 px-6 space-y-2 overflow-y-auto relative z-10"
            >
              {/* Main Menu Items */}
              <div className="space-y-2">
                <motion.h3 
                  variants={itemVariants}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2"
                >
                  Main Menu
                </motion.h3>
                
                {mainNavigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeSheet}
                      className={`
                        flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                        ${item.active
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                          : item.isSpecial
                          ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-700 hover:from-orange-100 hover:to-red-100'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }
                      `}
                    >
                      {/* Background glow effect */}
                      {item.active && (
                        <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                      )}
                      
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10
                        ${item.active
                          ? 'bg-white/20 shadow-lg'
                          : item.isSpecial
                          ? 'bg-orange-100 shadow-sm'
                          : 'bg-gray-100 group-hover:bg-blue-100 shadow-sm'
                        }
                      `}>
                        <item.icon className={`h-6 w-6 ${
                          item.active
                            ? 'text-white'
                            : item.isSpecial
                            ? 'text-orange-600'
                            : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-base">{item.name}</span>
                          {item.badge && (
                            <Badge className={`
                              text-xs font-bold px-2 py-1 rounded-full
                              ${item.active
                                ? 'bg-white/20 text-white'
                                : item.isSpecial
                                ? 'bg-orange-200 text-orange-800'
                                : 'bg-blue-100 text-blue-700'
                              }
                            `}>
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm opacity-75 ${
                          item.active ? 'text-white' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      
                      <ChevronRight className={`h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 relative z-10 ${
                        item.active ? 'text-white/80' : 'text-gray-400'
                      }`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="py-4">
                <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </motion.div>

              {/* Account Section */}
              {user && (
                <div className="space-y-2">
                  <motion.h3 
                    variants={itemVariants}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2"
                  >
                    Account & Settings
                  </motion.h3>
                  
                  {accountItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeSheet}
                        className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                          <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm">{item.name}</span>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Support Section */}
              <div className="space-y-2 pb-4">
                <motion.h3 
                  variants={itemVariants}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2"
                >
                  Support & Info
                </motion.h3>
                
                {supportItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeSheet}
                      className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{item.name}</span>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 pt-4 border-t border-gray-100/50 space-y-3 relative z-10 bg-white/50 backdrop-blur-sm"
            >
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 rounded-xl h-12 font-semibold"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/login" onClick={closeSheet}>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-300 rounded-xl h-12 font-semibold"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/signup" onClick={closeSheet}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg font-bold rounded-xl h-12">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              )}
              
              {/* App version */}
              <div className="text-center">
                <p className="text-xs text-gray-400">Version 2.1.0</p>
              </div>
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
