"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProfessionalDashboardSidebar } from "@/components/retailer/professional-dashboard-sidebar"
import { ProfessionalDashboardHeader } from "@/components/retailer/professional-dashboard-header"
import { ProfessionalDashboardOverview } from "@/components/retailer/professional-dashboard-overview"
import { MobileDashboardNav } from "@/components/retailer/mobile-dashboard-nav"
import { useAuth } from "@/contexts/auth-context"
import { AuthRedirectWrapper } from "@/components/auth-redirect-wrapper"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    growth: number
    monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>
  }
  orders: {
    total: number
    today: number
    pending: number
    growth: number
  }
  products: {
    total: number
    inStock: number
    lowStock: number
    growth: number
  }
  customers: {
    avgOrderValue: number
    growth: number
    satisfaction: number
  }
  insights: {
    recentOrders: Array<{
      id: string
      customer: string
      avatar: string
      amount: number
      status: string
      date: string
      items: number
    }>
    lowStockProducts: Array<{
      id: string
      name: string
      category: string
      currentStock: number
      minStock: number
      price: number
    }>
    salesData: Array<{ date: string; sales: number; orders: number }>
    productPerformance: Array<{ category: string; sales: number; growth: number }>
  }
}

function RetailerDashboardContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate realistic mock data
      const mockData: DashboardData = {
        revenue: {
          total: 1425000,
          thisMonth: 185500,
          growth: 24.7,
          monthlyData: [
            { month: 'Jan', revenue: 125000, orders: 280, customers: 165 },
            { month: 'Feb', revenue: 142000, orders: 320, customers: 195 },
            { month: 'Mar', revenue: 138000, orders: 305, customers: 180 },
            { month: 'Apr', revenue: 168000, orders: 375, customers: 220 },
            { month: 'May', revenue: 195000, orders: 425, customers: 265 },
            { month: 'Jun', revenue: 185500, orders: 410, customers: 250 },
          ]
        },
        orders: {
          total: 3247,
          today: 12,
          pending: 28,
          growth: 18.5
        },
        products: {
          total: 4589,
          inStock: 4543,
          lowStock: 8,
          growth: 12.3
        },
        customers: {
          avgOrderValue: 139,
          growth: 15.8,
          satisfaction: 4.7
        },
        insights: {
          recentOrders: [
            {
              id: '2024-001',
              customer: 'Sarah Mwanza',
              avatar: 'SM',
              amount: 524.99,
              status: 'Processing',
              date: '2024-01-15',
              items: 3
            },
            {
              id: '2024-002',
              customer: 'James Banda',
              avatar: 'JB',
              amount: 299.50,
              status: 'Shipped',
              date: '2024-01-15',
              items: 2
            },
            {
              id: '2024-003',
              customer: 'Grace Phiri',
              avatar: 'GP',
              amount: 159.99,
              status: 'Delivered',
              date: '2024-01-14',
              items: 1
            },
            {
              id: '2024-004',
              customer: 'Peter Lungu',
              avatar: 'PL',
              amount: 789.99,
              status: 'Pending',
              date: '2024-01-14',
              items: 5
            },
            {
              id: '2024-005',
              customer: 'Mary Tembo',
              avatar: 'MT',
              amount: 245.50,
              status: 'Processing',
              date: '2024-01-13',
              items: 2
            }
          ],
          lowStockProducts: [
            {
              id: '1',
              name: 'Premium Cotton T-Shirt',
              category: 'Clothing',
              currentStock: 3,
              minStock: 10,
              price: 29.99
            },
            {
              id: '2',
              name: 'Wireless Bluetooth Headphones',
              category: 'Electronics',
              currentStock: 2,
              minStock: 8,
              price: 89.99
            },
            {
              id: '3',
              name: 'Traditional Chitenge Fabric',
              category: 'Textiles',
              currentStock: 5,
              minStock: 15,
              price: 45.00
            },
            {
              id: '4',
              name: 'Organic Coffee Beans',
              category: 'Food & Beverages',
              currentStock: 4,
              minStock: 12,
              price: 18.75
            }
          ],
          salesData: [
            { date: '2024-01-08', sales: 2450, orders: 18 },
            { date: '2024-01-09', sales: 3200, orders: 24 },
            { date: '2024-01-10', sales: 2850, orders: 21 },
            { date: '2024-01-11', sales: 4100, orders: 31 },
            { date: '2024-01-12', sales: 3750, orders: 28 },
            { date: '2024-01-13', sales: 4500, orders: 35 },
            { date: '2024-01-14', sales: 3950, orders: 29 },
          ],
          productPerformance: [
            { category: 'Electronics', sales: 45000, growth: 28.5 },
            { category: 'Clothing & Fashion', sales: 38500, growth: 15.2 },
            { category: 'Home & Garden', sales: 22000, growth: 8.7 },
            { category: 'Food & Beverages', sales: 18500, growth: 22.1 },
            { category: 'Traditional Crafts', sales: 15000, growth: 35.4 },
          ]
        }
      }

      setDashboardData(mockData)
      setIsLoading(false)
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-pulse"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Loading Dashboard</h3>
          <p className="text-slate-600">Setting up your professional dashboard...</p>
          <div className="mt-4 flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-80'}`}>
        <ProfessionalDashboardSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          user={{
            name: user?.name || 'Retailer',
            email: user?.email || 'retailer@example.com',
            avatar: user?.avatar,
            storeName: 'Zambian Crafts Store'
          }}
          notifications={{
            orders: dashboardData?.orders.pending || 0,
            lowStock: dashboardData?.products.lowStock || 0,
            messages: 5
          }}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileDashboardNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        notifications={{
          orders: dashboardData?.orders.pending || 0,
          lowStock: dashboardData?.products.lowStock || 0,
          messages: 5
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ProfessionalDashboardHeader
          user={{
            name: user?.name || 'Retailer',
            email: user?.email || 'retailer@example.com',
            avatar: user?.avatar,
            storeName: 'Zambian Crafts Store',
            storeUrl: '/store/zambian-crafts'
          }}
          onMenuToggle={() => setMobileMenuOpen(true)}
          notifications={{
            total: 12,
            unread: 3
          }}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <ProfessionalDashboardOverview data={dashboardData!} />
        </main>
      </div>
    </div>
  )
}

export default function ProfessionalRetailerDashboard() {
  return (
    <AuthRedirectWrapper requiredRole="retailer">
      <RetailerDashboardContent />
    </AuthRedirectWrapper>
  );
}
