"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  Grid3X3,
  Heart,
  ShoppingCart,
  User,
  Store,
  TrendingUp,
  Bell,
  Menu,
  X,
  Package,
  Star,
  MessageCircle,
  Settings,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  color: string;
}

const primaryNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    color: "text-blue-500"
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    href: "/search",
    color: "text-purple-500"
  },
  {
    id: "categories",
    label: "Categories",
    icon: Grid3X3,
    href: "/categories",
    color: "text-green-500"
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    href: "/wishlist",
    badge: 3,
    color: "text-red-500"
  },
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingCart,
    href: "/cart",
    badge: 2,
    color: "text-orange-500"
  }
];

const secondaryNavItems: NavItem[] = [
  {
    id: "trending",
    label: "Trending",
    icon: TrendingUp,
    href: "/trending",
    color: "text-pink-500"
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: Store,
    href: "/vendors",
    color: "text-indigo-500"
  },
  {
    id: "orders",
    label: "Orders",
    icon: Package,
    href: "/orders",
    color: "text-teal-500"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
    badge: 5,
    color: "text-yellow-500"
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/profile",
    color: "text-gray-500"
  }
];

const quickActions = [
  {
    id: "support",
    label: "Support",
    icon: MessageCircle,
    href: "/support",
    color: "text-blue-500"
  },
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    href: "/help",
    color: "text-green-500"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500"
  }
];

interface MobileBottomNavProps {
  className?: string;
}

export function MobileBottomNav({ className = "" }: MobileBottomNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  // Update active tab based on current path
  useEffect(() => {
    const currentItem = [...primaryNavItems, ...secondaryNavItems].find(
      item => item.href === pathname || pathname.startsWith(item.href + "/")
    );
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, [pathname]);

  // Close expanded menu when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const handleNavigation = (item: NavItem) => {
    setActiveTab(item.id);
    router.push(item.href);
    setIsExpanded(false);
  };

  const NavButton = ({ item, isActive = false }: { item: NavItem; isActive?: boolean }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleNavigation(item)}
      className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-white text-blue-600 shadow-lg scale-110' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
      }`}
    >
      <div className="relative">
        <item.icon className={`h-6 w-6 ${isActive ? 'text-blue-600' : item.color}`} />
        {item.badge && item.badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2"
          >
            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
              {item.badge > 99 ? '99+' : item.badge}
            </Badge>
          </motion.div>
        )}
      </div>
      <span className={`text-xs mt-1 font-medium transition-colors ${
        isActive ? 'text-blue-600' : 'text-gray-600'
      }`}>
        {item.label}
      </span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-1 w-8 h-1 bg-blue-600 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );

  return (
    <>
      {/* Main Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden ${className}`}
      >
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around px-2 py-2">
            {primaryNavItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
              />
            ))}
            
            {/* More Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
                isExpanded 
                  ? 'bg-purple-100 text-purple-600 scale-110' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? (
                  <X className="h-6 w-6 text-purple-600" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
              <span className={`text-xs mt-1 font-medium transition-colors ${
                isExpanded ? 'text-purple-600' : 'text-gray-600'
              }`}>
                More
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Expanded Menu Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsExpanded(false)}
            />
            
            {/* Expanded Menu */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-16 left-0 right-0 z-50 md:hidden"
            >
              <div className="mx-4 mb-4 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Quick Access</h3>
                      <p className="text-purple-100 text-sm">Navigate anywhere</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Secondary Navigation */}
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Navigation</h4>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {secondaryNavItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavigation(item)}
                        className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="relative mb-2">
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                          {item.badge && item.badge > 0 && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[16px] h-[16px] flex items-center justify-center">
                              {item.badge > 99 ? '99+' : item.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (secondaryNavItems.length + index) * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavigation(action)}
                        className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <action.icon className={`h-6 w-6 ${action.color} mb-2`} />
                        <span className="text-xs font-medium text-gray-700">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>Rate App</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3 text-blue-400" />
                      <span>Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Optional) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-20 right-4 z-40 md:hidden"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <ShoppingCart className="h-6 w-6" />
          <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
            2
          </Badge>
        </motion.button>
      </motion.div>
    </>
  );
}
