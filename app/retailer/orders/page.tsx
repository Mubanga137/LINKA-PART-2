'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Download, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  User,
  FileText,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock order data
const orders = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'Alexandra Chen',
      email: 'alexandra.chen@email.com',
      phone: '+260 977 123 456',
      avatar: 'AC',
      address: '123 Independence Ave, Lusaka, Zambia'
    },
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 259.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop' },
      { name: 'Phone Case', quantity: 2, price: 25.00, image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=60&h=60&fit=crop' }
    ],
    total: 309.99,
    subtotal: 309.99,
    tax: 31.00,
    shipping: 15.00,
    grandTotal: 355.99,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'MTN Money',
    orderDate: '2024-01-20T10:30:00Z',
    deliveryDate: '2024-01-23T14:00:00Z',
    trackingNumber: 'LNK-001234567',
    notes: 'Please deliver during business hours'
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+260 966 789 012',
      avatar: 'MJ',
      address: '456 Cairo Road, Lusaka, Zambia'
    },
    items: [
      { name: 'Smart Fitness Watch', quantity: 1, price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop' }
    ],
    total: 299.99,
    subtotal: 299.99,
    tax: 30.00,
    shipping: 10.00,
    grandTotal: 339.99,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Airtel Money',
    orderDate: '2024-01-21T09:15:00Z',
    deliveryDate: null,
    trackingNumber: 'LNK-001234568',
    notes: null
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: 'Sofia Rodriguez',
      email: 'sofia.r@email.com',
      phone: '+260 955 345 678',
      avatar: 'SR',
      address: '789 Church Road, Kitwe, Zambia'
    },
    items: [
      { name: 'Designer Backpack', quantity: 1, price: 169.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop' }
    ],
    total: 169.99,
    subtotal: 169.99,
    tax: 17.00,
    shipping: 20.00,
    grandTotal: 206.99,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    orderDate: '2024-01-19T16:45:00Z',
    deliveryDate: null,
    trackingNumber: 'LNK-001234569',
    notes: 'Fragile - handle with care'
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+260 944 567 890',
      avatar: 'DK',
      address: '321 Great East Road, Lusaka, Zambia'
    },
    items: [
      { name: 'Professional Camera Lens', quantity: 1, price: 899.99, image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=60&h=60&fit=crop' },
      { name: 'Camera Bag', quantity: 1, price: 149.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop' }
    ],
    total: 1049.98,
    subtotal: 1049.98,
    tax: 105.00,
    shipping: 25.00,
    grandTotal: 1179.98,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Bank Transfer',
    orderDate: '2024-01-22T11:20:00Z',
    deliveryDate: null,
    trackingNumber: null,
    notes: 'Requires signature on delivery'
  },
  {
    id: 'ORD-2024-005',
    customer: {
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      phone: '+260 933 234 567',
      avatar: 'ET',
      address: '654 Alick Nkhata Road, Lusaka, Zambia'
    },
    items: [
      { name: 'Wireless Gaming Mouse', quantity: 2, price: 79.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop' }
    ],
    total: 159.98,
    subtotal: 159.98,
    tax: 16.00,
    shipping: 12.00,
    grandTotal: 187.98,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'MTN Money',
    orderDate: '2024-01-18T13:10:00Z',
    deliveryDate: null,
    trackingNumber: null,
    notes: 'Customer requested cancellation - item unavailable'
  }
];

const orderStatuses = ['All Status', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['All Payments', 'Paid', 'Pending', 'Failed', 'Refunded'];

export default function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All Payments');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700"><Package className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-700"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-700">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || order.status === selectedStatus.toLowerCase();
    const matchesPaymentStatus = selectedPaymentStatus === 'All Payments' || 
                                order.paymentStatus === selectedPaymentStatus.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.grandTotal, 0),
    pendingPayments: orders.filter(o => o.paymentStatus === 'pending').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track and manage customer orders and deliveries</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Labels
            </Button>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
                <p className="text-sm text-gray-600">Shipped</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">K{(orderStats.totalRevenue / 1000).toFixed(1)}k</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{orderStats.pendingPayments}</p>
                <p className="text-sm text-gray-600">Pending Payment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders by ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                            {order.customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <img
                              key={index}
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">ZMW {order.grandTotal.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(order.orderDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Order Status and Actions */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div className="flex items-center space-x-4">
                                    {getStatusBadge(selectedOrder.status)}
                                    {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) => handleStatusUpdate(selectedOrder.id, value)}
                                    >
                                      <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Button size="sm">
                                      <Download className="h-4 w-4 mr-2" />
                                      Invoice
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Customer Information */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center">
                                        <User className="h-5 w-5 mr-2" />
                                        Customer Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                          <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                                            {selectedOrder.customer.avatar}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium text-gray-900">{selectedOrder.customer.name}</p>
                                          <div className="flex items-center text-sm text-gray-500">
                                            <Mail className="h-4 w-4 mr-1" />
                                            {selectedOrder.customer.email}
                                          </div>
                                          <div className="flex items-center text-sm text-gray-500">
                                            <Phone className="h-4 w-4 mr-1" />
                                            {selectedOrder.customer.phone}
                                          </div>
                                        </div>
                                      </div>
                                      <Separator />
                                      <div className="flex items-start space-x-2">
                                        <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                                        <p className="text-sm text-gray-600">{selectedOrder.customer.address}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Order Information */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center">
                                        <FileText className="h-5 w-5 mr-2" />
                                        Order Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p className="text-gray-500">Order ID</p>
                                          <p className="font-medium">{selectedOrder.id}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">Payment Method</p>
                                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">Order Date</p>
                                          <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-500">Tracking Number</p>
                                          <p className="font-medium">{selectedOrder.trackingNumber || 'Not assigned'}</p>
                                        </div>
                                      </div>
                                      {selectedOrder.deliveryDate && (
                                        <div>
                                          <p className="text-gray-500 text-sm">Delivery Date</p>
                                          <p className="font-medium">{formatDate(selectedOrder.deliveryDate)}</p>
                                        </div>
                                      )}
                                      {selectedOrder.notes && (
                                        <div>
                                          <p className="text-gray-500 text-sm">Notes</p>
                                          <p className="text-sm bg-gray-50 p-2 rounded">{selectedOrder.notes}</p>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Order Items */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Order Items</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                          <div className="flex items-center space-x-3">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                              <p className="font-medium text-gray-900">{item.name}</p>
                                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-medium">ZMW {(item.price * item.quantity).toFixed(2)}</p>
                                            <p className="text-sm text-gray-500">ZMW {item.price.toFixed(2)} each</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <Separator className="my-4" />

                                    {/* Order Summary */}
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>ZMW {selectedOrder.subtotal.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span>ZMW {selectedOrder.tax.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span>ZMW {selectedOrder.shipping.toFixed(2)}</span>
                                      </div>
                                      <Separator />
                                      <div className="flex justify-between font-medium text-lg">
                                        <span>Total</span>
                                        <span>ZMW {selectedOrder.grandTotal.toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Package className="mr-2 h-4 w-4" />
                              Mark as Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Shipping Label
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RetailerDashboardLayout>
  );
}
