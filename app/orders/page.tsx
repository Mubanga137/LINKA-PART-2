"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  Download,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Star,
  MessageCircle,
  ArrowLeft,
  CalendarDays,
  MapPin,
  CreditCard
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: {
    id: string
    name: string
    image: string
    quantity: number
    price: number
    seller: string
  }[]
  shipping: {
    address: string
    method: string
    trackingNumber?: string
  }
  payment: {
    method: string
    status: 'paid' | 'pending' | 'failed'
  }
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-11-15',
    status: 'delivered',
    total: 450.00,
    items: [
      {
        id: '1',
        name: 'Traditional Chitenge Fabric',
        image: '/placeholder.svg',
        quantity: 2,
        price: 150.00,
        seller: 'Lusaka Fabrics'
      },
      {
        id: '2',
        name: 'Copper Bracelet',
        image: '/placeholder.svg',
        quantity: 1,
        price: 150.00,
        seller: 'Zambian Crafts Co'
      }
    ],
    shipping: {
      address: 'Kabulonga, Lusaka',
      method: 'Standard Delivery',
      trackingNumber: 'ZM123456789'
    },
    payment: {
      method: 'Mobile Money',
      status: 'paid'
    }
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-11-20',
    status: 'shipped',
    total: 280.00,
    items: [
      {
        id: '3',
        name: 'Organic Honey',
        image: '/placeholder.svg',
        quantity: 3,
        price: 80.00,
        seller: 'Bee Natural'
      },
      {
        id: '4',
        name: 'Wood Carving Art',
        image: '/placeholder.svg',
        quantity: 1,
        price: 120.00,
        seller: 'African Arts'
      }
    ],
    shipping: {
      address: 'Roma, Lusaka',
      method: 'Express Delivery',
      trackingNumber: 'ZM987654321'
    },
    payment: {
      method: 'Card Payment',
      status: 'paid'
    }
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-11-22',
    status: 'processing',
    total: 195.00,
    items: [
      {
        id: '5',
        name: 'Handmade Pottery Set',
        image: '/placeholder.svg',
        quantity: 1,
        price: 195.00,
        seller: 'Clay Creations'
      }
    ],
    shipping: {
      address: 'Chelstone, Lusaka',
      method: 'Standard Delivery'
    },
    payment: {
      method: 'Mobile Money',
      status: 'paid'
    }
  }
]

export default function CustomerOrders() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/orders')
      return
    }
  }, [user, router])

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrders(mockOrders)
        setFilteredOrders(mockOrders)
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadOrders()
    }
  }, [user])

  // Filter orders
  useEffect(() => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />
      case 'processing':
        return <Package className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-purple-100 text-purple-800'
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      processing: orders.filter(o => o.status === 'processing' || o.status === 'confirmed' || o.status === 'shipped').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }
    return stats
  }

  if (!user) {
    return null
  }

  const stats = getOrderStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/customer-dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">My Orders</h1>
              <p className="text-slate-600">Track and manage your purchases</p>
            </div>
            
            {/* Order Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-sm text-slate-600">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                <div className="text-sm text-slate-600">Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
                <div className="text-sm text-slate-600">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search orders by number or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                    <div className="h-6 bg-slate-200 rounded w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No orders found' : 'No orders yet'}
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start shopping to see your orders here'}
                </p>
                <Button onClick={() => router.push('/marketplace')}>
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div>
                        <h3 className="font-semibold text-slate-900">{order.orderNumber}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          ZMW {order.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-slate-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-600">
                            Sold by {item.seller} • Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">
                            ZMW {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Delivery Address</div>
                        <div className="text-sm text-slate-600">{order.shipping.address}</div>
                        <div className="text-sm text-slate-600">{order.shipping.method}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CreditCard className="h-4 w-4 text-slate-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Payment</div>
                        <div className="text-sm text-slate-600">{order.payment.method}</div>
                        <Badge 
                          variant={order.payment.status === 'paid' ? 'default' : 'secondary'}
                          className="text-xs mt-1"
                        >
                          {order.payment.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {order.shipping.trackingNumber && (
                      <div className="flex items-start gap-2">
                        <Truck className="h-4 w-4 text-slate-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">Tracking</div>
                          <div className="text-sm text-slate-600">{order.shipping.trackingNumber}</div>
                          <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                            Track Package
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  {order.status === 'delivered' && (
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Star className="h-4 w-4" />
                        Leave Review
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Package className="h-4 w-4" />
                        Reorder
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Contact Seller
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
