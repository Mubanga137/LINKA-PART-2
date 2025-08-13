'use client';

import { useState } from 'react';
import { 
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  User,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock orders data
const orders = [
  {
    id: 'ORD-2024-0001',
    customer: {
      name: 'Michael Thompson',
      email: 'michael.t@email.com',
      avatar: 'MT'
    },
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, price: 1599.99 },
      { name: 'AirPods Pro 2nd Gen', quantity: 1, price: 249.99 }
    ],
    total: 1849.98,
    status: 'processing',
    priority: 'high',
    orderDate: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-20T00:00:00Z',
    paymentStatus: 'paid',
    shippingAddress: 'Lusaka, Zambia',
    trackingNumber: 'ZM123456789'
  },
  {
    id: 'ORD-2024-0002',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      avatar: 'SW'
    },
    items: [
      { name: 'MacBook Pro M3', quantity: 1, price: 2999.99 }
    ],
    total: 2999.99,
    status: 'shipped',
    priority: 'medium',
    orderDate: '2024-01-14T15:45:00Z',
    estimatedDelivery: '2024-01-19T00:00:00Z',
    paymentStatus: 'paid',
    shippingAddress: 'Ndola, Zambia',
    trackingNumber: 'ZM123456790'
  },
  {
    id: 'ORD-2024-0003',
    customer: {
      name: 'David Chen',
      email: 'david.c@email.com',
      avatar: 'DC'
    },
    items: [
      { name: 'Samsung Galaxy S24', quantity: 2, price: 899.99 }
    ],
    total: 1799.98,
    status: 'delivered',
    priority: 'low',
    orderDate: '2024-01-13T09:15:00Z',
    estimatedDelivery: '2024-01-18T00:00:00Z',
    paymentStatus: 'paid',
    shippingAddress: 'Kitwe, Zambia',
    trackingNumber: 'ZM123456791'
  },
  {
    id: 'ORD-2024-0004',
    customer: {
      name: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      avatar: 'ER'
    },
    items: [
      { name: 'iPad Air M2', quantity: 1, price: 599.99 },
      { name: 'Apple Pencil', quantity: 1, price: 129.99 },
      { name: 'Magic Keyboard', quantity: 1, price: 299.99 }
    ],
    total: 1029.97,
    status: 'pending',
    priority: 'high',
    orderDate: '2024-01-15T14:20:00Z',
    estimatedDelivery: '2024-01-22T00:00:00Z',
    paymentStatus: 'pending',
    shippingAddress: 'Livingstone, Zambia',
    trackingNumber: null
  },
  {
    id: 'ORD-2024-0005',
    customer: {
      name: 'James Anderson',
      email: 'james.a@email.com',
      avatar: 'JA'
    },
    items: [
      { name: 'Apple Watch Series 9', quantity: 1, price: 449.99 }
    ],
    total: 449.99,
    status: 'cancelled',
    priority: 'low',
    orderDate: '2024-01-12T11:30:00Z',
    estimatedDelivery: null,
    paymentStatus: 'refunded',
    shippingAddress: 'Chingola, Zambia',
    trackingNumber: null
  }
];

const orderStats = {
  total: 5247,
  pending: 127,
  processing: 89,
  shipped: 245,
  delivered: 4698,
  cancelled: 88,
  revenue: 8947650,
  avgOrderValue: 1705.50
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'processing':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <RefreshCw className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function PremiumOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Orders Management
          </h1>
          <p className="text-slate-600 text-lg">Track and manage all customer orders</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-blue-900">{orderStats.total.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-900">{orderStats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Badge className="bg-orange-100 text-orange-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Needs Attention
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Delivered</p>
                <p className="text-3xl font-bold text-green-900">{orderStats.delivered.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={95} className="h-2 bg-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Revenue</p>
                <p className="text-2xl font-bold text-purple-900">ZMW {(orderStats.revenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-purple-600">Avg: ZMW {orderStats.avgOrderValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search orders by ID, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
            Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Customer</TableHead>
                  <TableHead className="font-semibold text-slate-700">Items</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-600 text-white font-bold text-sm">
                            {order.customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{order.customer.name}</p>
                          <p className="text-sm text-slate-500">{order.customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{item.quantity}x</span> {item.name}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-slate-500">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-slate-900">
                      ZMW {order.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} flex items-center w-fit`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityColor(order.priority)} capitalize`}>
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {formatDate(order.orderDate)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Track Shipment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-600 mb-4">
              No orders match your current filters. Try adjusting your search criteria.
            </p>
            <Button 
              onClick={() => {
                setSelectedStatus('all');
                setSelectedPriority('all');
                setSearchQuery('');
              }}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
