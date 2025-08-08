"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  ShoppingBag,
  Package,
  Heart,
  ShoppingCart,
  User,
  Settings,
  Phone,
  LogOut,
  Menu,
  X,
  Store,
  Star,
  Gift,
  TrendingUp,
  Zap,
  ChevronRight,
  Crown
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"
import { useFavorites } from "@/contexts/marketplace-context"

interface SidebarProps {
  className?: string
}

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
}

export function AnimatedSidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const totalItems = getCartItemCount()
  const { favorites } = useFavorites()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  }

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: Store,
      href: '/marketplace',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Zap,
      href: '/services',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'premium',
      label: 'Premium Listings',
      icon: Crown,
      href: '/marketplace/premium-listings',
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-600',
      premium: true
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: Package,
      href: '/orders',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      icon: Heart,
      href: '/wishlist',
      color: 'pink',
      gradient: 'from-pink-500 to-pink-600',
      badge: favorites?.length || 0
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      href: '/cart',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
      badge: totalItems
    }
  ]

  const accountItems = [
    {
      id: 'profile',
      label: 'My Account',
      icon: User,
      href: '/profile',
      color: 'gray',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Phone,
      href: '/contact',
      color: 'teal',
      gradient: 'from-teal-500 to-teal-600'
    }
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 tap-highlight-transparent touch-manipulation min-h-[44px] min-w-[44px]"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        className={`fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl z-50 lg:z-10 overflow-y-auto ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Linka</h2>
              </div>
              
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* User Profile */}
            {user && (
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50"
              >
                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                  <Badge className="mt-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <motion.nav
            variants={containerVariants}
            className="flex-1 p-4 space-y-2"
          >
            {/* Main Navigation */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Navigation
              </p>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {/* Hover effect background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-200`}
                        animate={{
                          scale: hoveredItem === item.id ? 1 : 0.8,
                          opacity: hoveredItem === item.id ? 0.1 : 0
                        }}
                      />
                      
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 shadow-inner'
                          : `bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110`
                      }`}>
                        <Icon className={`h-4 w-4 ${item.premium ? 'crown-glow' : ''}`} />
                      </div>

                      <span className="font-medium flex-1">{item.label}</span>

                      {/* Premium sparkle effect */}
                      {item.premium && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Star className="h-3 w-3 text-yellow-500" />
                        </motion.div>
                      )}

                      {item.badge !== undefined && item.badge > 0 && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                      
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -10, opacity: 0 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* Account Section */}
            <div className="pt-4 space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </p>
              {accountItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-200`}
                        animate={{
                          scale: hoveredItem === item.id ? 1 : 0.8,
                          opacity: hoveredItem === item.id ? 0.1 : 0
                        }}
                      />
                      
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 shadow-inner'
                          : `bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110`
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <span className="font-medium flex-1">{item.label}</span>
                      
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -10, opacity: 0 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </motion.nav>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="p-4 border-t border-gray-200/50"
          >
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center space-x-3 text-gray-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
            >
              <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Sign Out</span>
            </Button>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                © 2024 Linka Marketplace
              </p>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main content spacer for desktop */}
      {!isMobile && (
        <div className="w-80 flex-shrink-0" />
      )}
    </>
  )
}
