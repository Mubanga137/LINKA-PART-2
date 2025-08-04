"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModernDashboardSidebar } from "@/components/dashboard/modern-dashboard-sidebar"
import { ModernDashboardHeader } from "@/components/dashboard/modern-dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { ReportsView } from "@/components/dashboard/reports-view"
import { InsightsView } from "@/components/dashboard/insights-view"
import { OrdersView } from "@/components/dashboard/orders-view"
import { ProductsView } from "@/components/dashboard/products-view"
import { CustomersView } from "@/components/dashboard/customers-view"
import { MarketingView } from "@/components/dashboard/marketing-view"
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
    pending: number
    processing: number
    delivered: number
    growth: number
  }
  products: {
    total: number
    active: number
    lowStock: number
    growth: number
  }
  customers: {
    total: number
    new: number
    growth: number
    satisfaction: number
    returnRate: number
  }
  insights: {
    topCategories: Array<{ name: string; value: number; color: string }>
    recentOrders: Array<{
      id: string
      customer: string
      avatar: string
      amount: number
      status: string
      date: string
      items: number
    }>
    topProducts: Array<{
      id: string
      name: string
      category: string
      sales: number
      growth: number
      price: number
    }>
  }
}

function RetailerDashboardContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeView, setActiveView] = useState('overview')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate realistic mock data
      const mockData: DashboardData = {
        revenue: {
          total: 1108000,
          thisMonth: 168500,
          growth: 28.4,
          monthlyData: [
            { month: 'Jan', revenue: 145000, orders: 320, customers: 189 },
            { month: 'Feb', revenue: 158000, orders: 350, customers: 220 },
            { month: 'Mar', revenue: 142000, orders: 335, customers: 205 },
            { month: 'Apr', revenue: 175000, orders: 390, customers: 250 },
            { month: 'May', revenue: 162000, orders: 370, customers: 235 },
            { month: 'Jun', revenue: 190000, orders: 420, customers: 280 },
          ]
        },
        orders: {
          total: 2472,
          pending: 23,
          processing: 45,
          delivered: 2350,
          growth: 15.2
        },
        products: {
          total: 3847,
          active: 3842,
          lowStock: 5,
          growth: 8.7
        },
        customers: {
          total: 12429,
          new: 325,
          growth: 12.8,
          satisfaction: 4.5,
          returnRate: 1.8
        },
        insights: {
          topCategories: [
            { name: 'Electronics', value: 35, color: '#3B82F6' },
            { name: 'Fashion', value: 28, color: '#10B981' },
            { name: 'Home & Garden', value: 18, color: '#F59E0B' },
            { name: 'Sports & Fitness', value: 12, color: '#EF4444' },
            { name: 'Books & Media', value: 7, color: '#8B5CF6' },
          ],
          recentOrders: [
            {
              id: 'ORD-2024-001',
              customer: 'Alexandra Chen',
              avatar: 'AC',
              amount: 459.99,
              status: 'Delivered',
              date: '2024-01-15',
              items: 3
            },
            {
              id: 'ORD-2024-002',
              customer: 'Marcus Johnson',
              avatar: 'MJ',
              amount: 289.5,
              status: 'Processing',
              date: '2024-01-15',
              items: 2
            },
            {
              id: 'ORD-2024-003',
              customer: 'Sofia Rodriguez',
              avatar: 'SR',
              amount: 129.99,
              status: 'Shipped',
              date: '2024-01-14',
              items: 1
            },
            {
              id: 'ORD-2024-004',
              customer: 'David Kim',
              avatar: 'DK',
              amount: 699.99,
              status: 'Pending',
              date: '2024-01-14',
              items: 4
            },
            {
              id: 'ORD-2024-005',
              customer: 'Emma Thompson',
              avatar: 'ET',
              amount: 189.99,
              status: 'Cancelled',
              date: '2024-01-13',
              items: 2
            }
          ],
          topProducts: [
            {
              id: '1',
              name: 'Premium Wireless Headphones',
              category: 'Electronics',
              sales: 847,
              growth: 18.2,
              price: 259.99
            },
            {
              id: '2',
              name: 'Smart Fitness Watch',
              category: 'Electronics',
              sales: 623,
              growth: 12.8,
              price: 456.9
            },
            {
              id: '3',
              name: 'Ergonomic Office Chair',
              category: 'Home & Garden',
              sales: 524,
              growth: 24.5,
              price: 178.4
            },
            {
              id: '4',
              name: 'Professional Camera Lens',
              category: 'Electronics',
              sales: 334,
              growth: 8.7,
              price: 190.2
            },
            {
              id: '5',
              name: 'Designer Backpack',
              category: 'Fashion',
              sales: 289,
              growth: 15.3,
              price: 95.4
            }
          ]
        }
      }
      
      setDashboardData(mockData)
      setIsLoading(false)
    }

    if (user?.role === 'retailer') {
      loadDashboardData()
    }
  }, [user])

  if (!user || user.role !== 'retailer') {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const renderActiveView = () => {
    if (!dashboardData) return null

    switch (activeView) {
      case 'overview':
        return <DashboardOverview data={dashboardData} />
      case 'analytics':
        return <AnalyticsView data={dashboardData} />
      case 'reports':
        return <ReportsView data={dashboardData} />
      case 'insights':
        return <InsightsView data={dashboardData} />
      case 'orders':
        return <OrdersView data={dashboardData} />
      case 'products':
        return <ProductsView data={dashboardData} />
      case 'customers':
        return <CustomersView data={dashboardData} />
      case 'marketing':
        return <MarketingView data={dashboardData} />
      default:
        return <DashboardOverview data={dashboardData} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ModernDashboardSidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        user={user}
        pendingOrders={dashboardData?.orders.pending || 0}
        lowStock={dashboardData?.products.lowStock || 0}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ModernDashboardHeader 
          user={user}
          currentView={activeView}
          onViewChange={setActiveView}
        />

        {/* Content */}
        <main className="flex-1 p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  )
}
