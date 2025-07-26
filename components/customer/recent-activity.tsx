"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ShoppingBag, 
  Star, 
  MessageCircle, 
  Eye, 
  ArrowRight,
  Clock,
  Package
} from "lucide-react"
import Link from "next/link"
import { User } from "@/contexts/auth-context"

interface RecentActivityProps {
  user: User
}

export function RecentActivity({ user }: RecentActivityProps) {
  // Mock recent activity data
  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Handcrafted Copper Bracelet',
      retailer: 'Copper Craft Jewelry',
      amount: 150,
      status: 'delivered',
      date: '2024-01-14',
      image: '/placeholder.svg?height=60&width=60&text=Bracelet'
    },
    {
      id: 'ORD-002',
      product: 'Traditional Chitenge Dress',
      retailer: 'Banda Fashion House',
      amount: 280,
      status: 'shipped',
      date: '2024-01-12',
      image: '/placeholder.svg?height=60&width=60&text=Dress'
    },
    {
      id: 'ORD-003',
      product: 'Pure Zambian Honey',
      retailer: 'Phiri Organic Foods',
      amount: 120,
      status: 'processing',
      date: '2024-01-10',
      image: '/placeholder.svg?height=60&width=60&text=Honey'
    }
  ]

  const recentlyViewed = [
    {
      id: 'prod-1',
      name: 'Wooden Sculpture - Elephant',
      retailer: 'African Art Gallery',
      price: 450,
      image: '/placeholder.svg?height=60&width=60&text=Sculpture',
      viewedAt: '2 hours ago'
    },
    {
      id: 'prod-2',
      name: 'Professional Hammer Set',
      retailer: 'BuildPro Tools',
      price: 180,
      image: '/placeholder.svg?height=60&width=60&text=Hammer',
      viewedAt: '1 day ago'
    },
    {
      id: 'prod-3',
      name: 'Handwoven Basket Set',
      retailer: 'Mwanza Traditional Crafts',
      price: 220,
      image: '/placeholder.svg?height=60&width=60&text=Basket',
      viewedAt: '2 days ago'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Recent Orders */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-emerald-600" />
            Recent Orders
          </CardTitle>
          <Link href="/customer-dashboard/orders">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </Link>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 truncate">{order.product}</h4>
                  <p className="text-sm text-slate-600">{order.retailer}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                    <span className="text-xs text-slate-500">{order.date}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-slate-900">
                    ZMW {order.amount}
                  </div>
                  <Link href={`/customer-dashboard/orders/${order.id}`}>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {recentOrders.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                <p className="text-slate-600">Start shopping to see your orders here</p>
                <Link href="/marketplace">
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recently Viewed */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Recently Viewed
          </CardTitle>
          <Link href="/customer-dashboard/history">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </Link>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h4 className="font-medium text-slate-900 hover:text-emerald-600 transition-colors truncate">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-sm text-slate-600">{item.retailer}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">{item.viewedAt}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-slate-900">
                    ZMW {item.price}
                  </div>
                  <Link href={`/products/${item.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {recentlyViewed.length === 0 && (
              <div className="text-center py-8">
                <Eye className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No items viewed yet</h3>
                <p className="text-slate-600">Products you browse will appear here</p>
                <Link href="/marketplace">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Explore Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
