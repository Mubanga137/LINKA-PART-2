"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Menu, X, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const getUserDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'retailer':
        return '/retailer-dashboard'
      case 'admin':
        return '/admin-dashboard'
      default:
        return '/profile'
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <LinkIcon className="h-9 w-9 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-700/30 transition-all"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Shop
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2 flex items-center">
                Categories
                <ChevronDown className="h-4 w-4 ml-1" />
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/categories/jewelry-accessories">Jewelry & Accessories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/art-culture">Art & Culture</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/tools-hardware">Tools & Hardware</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/agriculture-natural">Agriculture & Natural</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/food-beverages">Food & Beverages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/fashion-textiles">Fashion & Textiles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/traditional-crafts">Traditional Crafts</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              About
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/for-retailers"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              For Retailers
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Contact
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/industries"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Services
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
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
                    <DropdownMenuItem onClick={() => router.push('/orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
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
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* CTA Button */}
            {user?.role === 'retailer' ? (
              <Link href="/retailer-dashboard">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all">
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={user ? "/become-retailer" : "/signup?role=retailer"}>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
                  Sell on Linka
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
