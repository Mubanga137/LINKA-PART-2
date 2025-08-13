"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModernDashboardSidebar } from "@/components/dashboard/modern-dashboard-sidebar"
import { ModernDashboardHeader } from "@/components/dashboard/modern-dashboard-header"
import { ModernDashboardOverview } from "@/components/dashboard/modern-dashboard-overview"
import { MobileActionBar } from "@/components/dashboard/mobile-action-bar"
import { ThemeProvider, useTheme } from "@/contexts/theme-context"
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme, actualTheme } = useTheme()

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

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-pulse"></div>
          </div>
          <p className="text-white/80 text-lg font-medium">Loading your premium dashboard...</p>
          <div className="mt-4 flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    )
  }

  const renderActiveView = () => {
    if (!dashboardData) return null

    switch (activeView) {
      case 'overview':
        return <ModernDashboardOverview data={dashboardData} />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-80'}`}>
        <ModernDashboardSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          user={user!}
          pendingOrders={dashboardData?.orders.pending || 0}
          lowStock={dashboardData?.products.lowStock || 0}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80">
            <ModernDashboardSidebar
              activeView={activeView}
              onViewChange={(view) => {
                setActiveView(view);
                setMobileMenuOpen(false);
              }}
              user={user!}
              pendingOrders={dashboardData?.orders.pending || 0}
              lowStock={dashboardData?.products.lowStock || 0}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <ModernDashboardHeader
          user={user!}
          currentView={activeView}
          onViewChange={setActiveView}
          onSidebarToggle={() => setMobileMenuOpen(true)}
          isDarkMode={actualTheme === 'dark'}
          onThemeToggle={toggleTheme}
        />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Action Bar */}
      <MobileActionBar
        activeView={activeView}
        onViewChange={setActiveView}
        onSearchOpen={() => console.log('Search opened')}
        onMenuOpen={() => setMobileMenuOpen(true)}
        pendingNotifications={3}
        className="lg:hidden"
      />
    </div>
  )
}

export default function ModernRetailerDashboard() {
  return (
    <AuthRedirectWrapper requiredRole="retailer">
      <RetailerDashboardContent />
    </AuthRedirectWrapper>
  );
}
