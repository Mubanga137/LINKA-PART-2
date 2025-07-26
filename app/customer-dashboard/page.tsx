"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { Footer } from "@/components/footer"
import { EnhancedCustomerWelcome } from "@/components/customer/enhanced-customer-welcome"
import { CategoryGrid } from "@/components/customer/category-grid"
import { TrendingProducts } from "@/components/customer/trending-products"
import { RecommendedServices } from "@/components/customer/recommended-services"
import { RecentActivity } from "@/components/customer/recent-activity"
import { QuickActions } from "@/components/customer/quick-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { productService } from "@/services/product-service"
import { Product } from "@/contexts/cart-context"

export default function CustomerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isWelcome = searchParams.get('welcome') === 'true'
  
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not a customer or not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/customer-dashboard')
      return
    }
    
    if (user.role !== 'customer') {
      router.push('/')
      return
    }
  }, [user, router])

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      try {
        // Load trending products
        const trending = await productService.getFeaturedProducts()
        setTrendingProducts(trending.slice(0, 8))

        // Load recommended products (simulate based on user preferences)
        const recommended = await productService.getProducts({ 
          category: 'jewelry-accessories' // Simulate user preference
        })
        setRecommendedProducts(recommended.products.slice(0, 6))
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.role === 'customer') {
      loadDashboardData()
    }
  }, [user])

  if (!user || user.role !== 'customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-blue-400/20 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <CustomerHeader />
      
      <main className="pb-16">
        {/* Welcome Message for New Users */}
        {isWelcome && (
          <div className="bg-emerald-50 border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800">
                  Welcome to Linka! Your account has been created successfully. 
                  Start exploring amazing products and services from local Zambian businesses.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <EnhancedCustomerWelcome user={user} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Quick Access Navigation */}
          <div className="relative">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div
                onClick={() => router.push('/marketplace')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Shop</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Browse products</span>
              </div>

              <div
                onClick={() => router.push('/orders')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Orders</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Track packages</span>
              </div>

              <div
                onClick={() => router.push('/wishlist')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-red-600 transition-colors">Wishlist</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Saved items</span>
              </div>

              <div
                onClick={() => router.push('/profile')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-green-600 transition-colors">Profile</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Personal info</span>
              </div>

              <div
                onClick={() => router.push('/cart')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16v0a1 1 0 001 1h11M9 19a2 2 0 104 0 2 2 0 00-4 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">Cart</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Review items</span>
              </div>

              <div
                onClick={() => router.push('/settings')}
                className="group relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">Settings</span>
                <span className="text-xs text-slate-500 mt-1 text-center">Preferences</span>
              </div>
            </div>
          </div>

          {/* Recent Order Status */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
              <button
                onClick={() => router.push('/orders')}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                View all orders →
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Order #ORD-2024-001</p>
                    <p className="text-sm text-slate-600">Delivered • ZMW 450.00</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View Details
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Order #ORD-2024-002</p>
                    <p className="text-sm text-slate-600">Shipped • ZMW 280.00</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Track Package
                </button>
              </div>
            </div>
          </div>

          {/* Category Grid */}
          <CategoryGrid />

          {/* Trending Products */}
          <TrendingProducts
            products={trendingProducts}
            isLoading={isLoading}
          />

          {/* Recommended Services */}
          <RecommendedServices
            products={recommendedProducts}
            isLoading={isLoading}
          />

          {/* Recent Activity */}
          <RecentActivity user={user} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
