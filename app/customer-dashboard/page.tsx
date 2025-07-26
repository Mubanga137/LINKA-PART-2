"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomerWelcome } from "@/components/customer/customer-welcome"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      
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
        <CustomerWelcome user={user} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
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
