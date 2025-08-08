"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  LinkIcon, 
  User, 
  ChevronDown,
  LogOut,
  Settings,
  Package,
  BarChart3,
  Heart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface MinimalHeaderProps {
  variant?: "marketplace" | "premium";
  showSearch?: boolean;
  className?: string;
}

export function MinimalHeader({ 
  variant = "marketplace", 
  showSearch = true, 
  className = "" 
}: MinimalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();

  const isPremium = variant === "premium";

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getUserDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'retailer':
        return '/retailer-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/profile';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        sticky top-0 z-30 backdrop-blur-xl border-b-2 shadow-sm
        ${isPremium 
          ? "bg-white/90 border-blue-400/20" 
          : "bg-white/90 border-slate-200/50"
        }
        ${className}
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <LinkIcon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-700/30 transition-all"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </motion.div>

          {/* Search Section */}
          {showSearch && (
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search for products, vendors, or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                      pl-10 pr-4 py-2 w-full rounded-xl border-2 
                      focus:outline-none transition-all duration-300
                      ${isPremium 
                        ? "bg-white/70 border-blue-400/20 focus:border-blue-400/40 focus:bg-white/90" 
                        : "bg-slate-50/70 border-slate-200 focus:border-slate-300 focus:bg-white"
                      }
                    `}
                  />
                </div>
              </form>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden md:inline font-medium">{user.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push(getUserDashboardLink())}>
                    {user.role === 'retailer' ? (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </>
                    ) : user.role === 'admin' ? (
                      <>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </>
                    )}
                  </DropdownMenuItem>
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/orders')}>
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/wishlist')}>
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-2 hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* CTA Button - Role specific */}
            {user?.role === 'retailer' ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/retailer-dashboard">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                    <span className="hidden md:inline">My Dashboard</span>
                    <span className="md:hidden">Dashboard</span>
                  </Button>
                </Link>
              </motion.div>
            ) : user?.role === 'customer' ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/customer-dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                    <span className="hidden md:inline">My Account</span>
                    <span className="md:hidden">Account</span>
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup?role=retailer">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
                    <span className="hidden lg:inline">Sell on Linka</span>
                    <span className="lg:hidden">Sell</span>
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
