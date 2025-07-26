"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Menu, X, Search, Sparkles, Briefcase, Stethoscope, Home, Car, Camera, GraduationCap, Wrench, Heart, Shield, Building, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { MobileNavigation } from "@/components/mobile-navigation"

export function MarketplaceMainHeader() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getUserDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'retailer':
        return '/retailer-dashboard'
      case 'admin':
        return '/admin-dashboard'
      case 'customer':
        return '/customer-dashboard'
      default:
        return '/profile'
    }
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-600/95 via-blue-700/95 to-blue-800/95 border-b border-white/20 shadow-lg shadow-blue-900/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"
                  animate={{
                    boxShadow: [
                      "0 4px 6px rgba(249, 115, 22, 0.3)",
                      "0 8px 25px rgba(249, 115, 22, 0.4)",
                      "0 4px 6px rgba(249, 115, 22, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <LinkIcon className="h-5 w-5 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-yellow-300" />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-orange-500/30 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Linka
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent ml-1">
                  Marketplace
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/marketplace"
                className="text-white hover:text-orange-300 font-semibold transition-all duration-300 relative group py-2 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Products
                </span>
                <motion.span 
                  className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-orange-400 to-yellow-400 scale-x-100"
                  initial={{ scaleX: 1 }}
                  whileHover={{ scaleX: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Services Dropdown Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:text-orange-300 font-semibold transition-all duration-300 relative group py-2 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Services
                        <ChevronDown className="h-3 w-3 ml-2" />
                      </span>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-80 bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl shadow-blue-900/20 rounded-2xl p-4"
                >
                  <div className="space-y-1">
                    <div className="px-3 py-2 mb-3">
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Service Categories</h3>
                      <p className="text-xs text-slate-500 mt-1">Browse and book local services</p>
                    </div>

                    {/* Service Categories */}
                    {[
                      { icon: Stethoscope, name: "Health & Wellness", path: "/services/health-wellness", description: "Medical, fitness & wellness" },
                      { icon: Home, name: "Home Services", path: "/industries/home-decor", description: "Cleaning, repairs & improvement" },
                      { icon: Car, name: "Transport & Logistics", path: "/industries/transport", description: "Delivery & transportation" },
                      { icon: Camera, name: "Entertainment", path: "/industries/entertainment", description: "Photography & events" },
                      { icon: GraduationCap, name: "Education & Training", path: "/marketplace?category=education", description: "Tutoring & skill development" },
                      { icon: Wrench, name: "Professional Services", path: "/marketplace?category=professional", description: "Legal, accounting & consulting" },
                      { icon: Heart, name: "Beauty & Wellness", path: "/marketplace?category=beauty", description: "Salon, spa & beauty services" },
                      { icon: Building, name: "Real Estate", path: "/marketplace?category=real-estate", description: "Property & rental services" }
                    ].map((service) => (
                      <DropdownMenuItem key={service.name} asChild>
                        <Link
                          href={service.path}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                              <service.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{service.name}</div>
                              <div className="text-xs text-slate-500 group-hover:text-blue-500 transition-colors">{service.description}</div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator className="my-3" />

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/marketplace?category=services"
                          className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 group"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Browse All
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/become-retailer?type=service"
                          className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 group"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          List Service
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </motion.nav>

          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Shopping Cart */}
            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-orange-300 hover:bg-white/10 relative group transition-all duration-300"
                  >
                    <motion.div
                      animate={totalItems > 0 ? { 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1] 
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingCart className="h-5 w-5 md:mr-2" />
                    </motion.div>
                    <span className="hidden md:inline">Cart</span>
                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.span
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <motion.span
                            key={totalItems}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {totalItems}
                          </motion.span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNavigation />
            </div>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex text-white hover:text-orange-300 hover:bg-white/10 gap-2 transition-all duration-300"
                    >
                      <motion.div 
                        className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{
                          boxShadow: [
                            "0 2px 4px rgba(249, 115, 22, 0.3)",
                            "0 4px 12px rgba(249, 115, 22, 0.4)",
                            "0 2px 4px rgba(249, 115, 22, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <User className="h-3 w-3 text-white" />
                      </motion.div>
                      <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
                  <DropdownMenuItem onClick={() => router.push(getUserDashboardLink())}>
                    {user.role === 'retailer' ? (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4 text-blue-600" />
                        Dashboard
                      </>
                    ) : user.role === 'admin' ? (
                      <>
                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                        Admin Panel
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4 text-blue-600" />
                        My Dashboard
                      </>
                    )}
                  </DropdownMenuItem>
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/shop')}>
                        <ShoppingCart className="mr-2 h-4 w-4 text-orange-600" />
                        Shop Products
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/orders')}>
                        <Package className="mr-2 h-4 w-4 text-blue-600" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/wishlist')}>
                        <User className="mr-2 h-4 w-4 text-orange-600" />
                        Wishlist
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4 text-gray-600" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex text-white hover:text-orange-300 hover:bg-white/10 transition-all duration-300"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 font-semibold relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative">Sign Up</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl md:hidden"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <motion.div 
                  className="flex items-center justify-between p-6 border-b border-white/20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <LinkIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">
                      Linka
                      <span className="text-orange-400 ml-1">Market</span>
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-orange-300 p-2"
                    onClick={closeMobileMenu}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-2 px-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Link
                        href="/marketplace"
                        className="flex items-center justify-between py-4 text-white bg-white/10 rounded-xl px-4 font-semibold border border-white/20 transition-all duration-300 hover:bg-white/20"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <Search className="h-5 w-5 mr-3 text-orange-400" />
                          Browse Products
                        </span>
                      </Link>
                    </motion.div>

                    {user && (
                      <motion.div
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <Link
                          href="/marketplace?category=services"
                          className="flex items-center justify-between py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                          onClick={closeMobileMenu}
                        >
                          <span className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-3 text-orange-400" />
                            Browse Services
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>

                        <Link
                          href="/cart"
                          className="flex items-center justify-between py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                          onClick={closeMobileMenu}
                        >
                          <span className="flex items-center">
                            <ShoppingCart className="h-5 w-5 mr-3" />
                            Shopping Cart
                          </span>
                          {totalItems > 0 && (
                            <span className="bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                              {totalItems}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <motion.div 
                  className="border-t border-white/20 p-6 space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-blue-200 capitalize">{user.role}</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          handleLogout()
                          closeMobileMenu()
                        }}
                        variant="outline"
                        className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-white/20"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/login" onClick={closeMobileMenu}>
                        <Button
                          variant="outline"
                          className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={closeMobileMenu}>
                        <Button className="w-full justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Mobile Menu Animated Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-1/4 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-2xl"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
