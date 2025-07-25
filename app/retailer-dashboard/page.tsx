"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { ProductManagement } from "@/components/dashboard/product-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Settings
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  orders: {
    total: number
    pending: number
    completed: number
    cancelled: number
  }
  products: {
    total: number
    inStock: number
    lowStock: number
    outOfStock: number
  }
  customers: {
    total: number
    new: number
    returning: number
  }
  recentOrders: Array<{
    id: string
    customer: string
    amount: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    date: string
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
}

export default function RetailerDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not a retailer
  useEffect(() => {
    if (user && user.role !== 'retailer') {
      router.push('/')
    }
  }, [user, router])

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockData: DashboardData = {
        revenue: {
          total: 125430,
          thisMonth: 28540,
          lastMonth: 24120,
          growth: 18.3
        },
        orders: {
          total: 342,
          pending: 12,
          completed: 298,
          cancelled: 32
        },
        products: {
          total: 48,
          inStock: 42,
          lowStock: 4,
          outOfStock: 2
        },
        customers: {
          total: 156,
          new: 23,
          returning: 133
        },
        recentOrders: [
          {
            id: 'ORD-001',
            customer: 'John Mwanza',
            amount: 450,
            status: 'pending',
            date: '2024-01-15'
          },
          {
            id: 'ORD-002',
            customer: 'Grace Banda',
            amount: 280,
            status: 'processing',
            date: '2024-01-15'
          },
          {
            id: 'ORD-003',
            customer: 'David Phiri',
            amount: 750,
            status: 'shipped',
            date: '2024-01-14'
          },
          {
            id: 'ORD-004',
            customer: 'Mary Tembo',
            amount: 320,
            status: 'delivered',
            date: '2024-01-14'
          }
        ],
        topProducts: [
          {
            id: 'prod-1',
            name: 'Handcrafted Copper Bracelet',
            sales: 45,
            revenue: 6750
          },
          {
            id: 'prod-2',
            name: 'Traditional Chitenge Dress',
            sales: 32,
            revenue: 8960
          },
          {
            id: 'prod-3',
            name: 'Pure Zambian Honey',
            sales: 67,
            revenue: 8040
          }
        ]
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userRole={user.role}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="p-6">
            {/* Dashboard Header */}
            <DashboardHeader 
              userName={user.name}
              businessName={user.businessName}
              verificationStatus={user.verificationStatus}
            />

            {/* Verification Alert */}
            {user.verificationStatus === 'pending' && (
              <Alert className="mb-6 border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Your account is pending verification. Some features may be limited until verification is complete.
                  <Button variant="link" className="p-0 ml-2 text-amber-600 underline">
                    Complete verification
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Content based on active tab */}
            {activeTab === 'overview' && dashboardData && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <DashboardStats data={dashboardData} />

                {/* Charts and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DashboardCharts data={dashboardData} />
                  <RecentOrders orders={dashboardData.recentOrders} />
                </div>

                {/* Top Products */}
                <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Top Selling Products</CardTitle>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900">{product.name}</h4>
                              <p className="text-sm text-slate-600">{product.sales} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600">
                              ZMW {product.revenue.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        className="h-20 flex flex-col bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setActiveTab('products')}
                      >
                        <Plus className="h-6 w-6 mb-2" />
                        Add Product
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col"
                        onClick={() => setActiveTab('orders')}
                      >
                        <Package className="h-6 w-6 mb-2" />
                        View Orders
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col"
                        onClick={() => setActiveTab('products')}
                      >
                        <Edit className="h-6 w-6 mb-2" />
                        Edit Products
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col"
                        onClick={() => setActiveTab('settings')}
                      >
                        <Settings className="h-6 w-6 mb-2" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'products' && (
              <ProductManagement />
            )}

            {activeTab === 'orders' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Order Management</h3>
                    <p className="text-slate-600">Comprehensive order management system coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'analytics' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
                    <p className="text-slate-600">Detailed analytics and reporting tools coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'customers' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Customer Management</h3>
                    <p className="text-slate-600">Customer relationship tools coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Account Settings</h3>
                    <p className="text-slate-600">Account configuration and settings coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
