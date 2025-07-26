"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ShoppingCart, 
  Eye, 
  MoreHorizontal,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Order {
  id: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: {
        icon: Clock,
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        label: "Pending"
      },
      processing: {
        icon: Package,
        className: "bg-blue-50 text-blue-700 border-blue-200",
        label: "Processing"
      },
      shipped: {
        icon: Truck,
        className: "bg-purple-50 text-purple-700 border-purple-200",
        label: "Shipped"
      },
      delivered: {
        icon: CheckCircle,
        className: "bg-green-50 text-green-700 border-green-200",
        label: "Delivered"
      },
      cancelled: {
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200",
        label: "Cancelled"
      }
    }

    const config = statusConfig[status]
    const IconComponent = config.icon

    return (
      <Badge className={config.className}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Recent Orders
        </CardTitle>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
              <p className="text-slate-600">When customers place orders, they'll appear here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getCustomerInitials(order.customer)}`} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm">
                      {getCustomerInitials(order.customer)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium text-slate-900">{order.customer}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-slate-600">Order {order.id}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-sm text-slate-600">{formatDate(order.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      ZMW {order.amount.toLocaleString()}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {order.status === 'pending' && (
                        <>
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" />
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        </>
                      )}
                      {order.status === 'processing' && (
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Mark as Shipped
                        </DropdownMenuItem>
                      )}
                      {order.status === 'shipped' && (
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Delivered
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>

        {orders.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
                <div className="text-xs text-slate-600">Pending</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {orders.filter(o => o.status === 'processing').length}
                </div>
                <div className="text-xs text-slate-600">Processing</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {orders.filter(o => o.status === 'shipped').length}
                </div>
                <div className="text-xs text-slate-600">Shipped</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-xs text-slate-600">Delivered</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
