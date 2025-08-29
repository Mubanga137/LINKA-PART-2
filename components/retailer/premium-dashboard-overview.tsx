'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  Eye,
  Star,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Zap,
  Target,
  Award,
  MessageSquare,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Reorder, motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 2847650,
  revenueChange: 28.4,
  totalOrders: 3847,
  ordersChange: 15.2,
  pendingOrders: 127,
  completedOrders: 3720,
  activeProducts: 892,
  productsChange: 18.7,
  lowStock: 12,
  totalCustomers: 15847,
  customersChange: 22.8,
  newCustomers: 387,
  conversionRate: 12.4,
  avgOrderValue: 740.50
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Michael Thompson',
    avatar: 'MT',
    items: 3,
    amount: 1249.99,
    status: 'Delivered',
    statusColor: 'bg-green-100 text-green-700',
    time: '2 hours ago'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Sarah Wilson',
    avatar: 'SW',
    items: 2,
    amount: 899.50,
    status: 'Processing',
    statusColor: 'bg-blue-100 text-blue-700',
    time: '3 hours ago'
  },
  {
    id: 'ORD-2024-003',
    customer: 'David Chen',
    avatar: 'DC',
    items: 1,
    amount: 599.99,
    status: 'Shipped',
    statusColor: 'bg-yellow-100 text-yellow-700',
    time: '5 hours ago'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Emma Rodriguez',
    avatar: 'ER',
    items: 4,
    amount: 1899.99,
    status: 'Pending',
    statusColor: 'bg-orange-100 text-orange-700',
    time: '1 day ago'
  },
  {
    id: 'ORD-2024-005',
    customer: 'James Anderson',
    avatar: 'JA',
    items: 2,
    amount: 759.99,
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-700',
    time: '2 days ago'
  }
];

const topProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    sales: 247,
    revenue: 395680,
    growth: 32.1,
    image: 'https://images.unsplash.com/photo-1592286590955-87fa9830c4c3?w=80&h=80&fit=crop',
    stock: 15
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Electronics',
    sales: 89,
    revenue: 534700,
    growth: 28.7,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop',
    stock: 8
  },
  {
    id: 3,
    name: 'AirPods Pro 2nd Gen',
    category: 'Electronics',
    sales: 156,
    revenue: 78000,
    growth: 45.2,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop',
    stock: 32
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    sales: 134,
    revenue: 201000,
    growth: 19.8,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&h=80&fit=crop',
    stock: 22
  }
];

const lowStockAlerts = [
  { name: 'iPhone 15 Pro Max', currentStock: 3, minStock: 10, urgency: 'high' },
  { name: 'MacBook Pro M3', currentStock: 2, minStock: 5, urgency: 'critical' },
  { name: 'iPad Air M2', currentStock: 7, minStock: 15, urgency: 'medium' },
  { name: 'AirPods Pro 2nd Gen', currentStock: 12, minStock: 20, urgency: 'low' }
];

const performanceMetrics = [
  {
    title: 'Sales Target',
    current: 2847650,
    target: 3000000,
    percentage: 94.9,
    trend: 'up',
    change: '+28.4%'
  },
  {
    title: 'Customer Satisfaction',
    current: 4.8,
    target: 5.0,
    percentage: 96,
    trend: 'up',
    change: '+0.3'
  },
  {
    title: 'Order Fulfillment',
    current: 97.2,
    target: 98.0,
    percentage: 99.2,
    trend: 'up',
    change: '+2.1%'
  }
];

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = startValue + (endValue - startValue) * easeOutCubic(progress);
      setDisplayValue(Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  return <span>{displayValue.toLocaleString()}</span>;
};

export default function PremiumDashboardOverview() {
  const [timeRange, setTimeRange] = useState('6M');

  // Live update timers and demo state
  const [nowTick, setNowTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setNowTick(t => t + 1), 5000)
    return () => clearInterval(id)
  }, [])

  // Inventory & Stock
  const [inventory, setInventory] = useState([
    { id: 'SKU-1001', name: 'iPhone 15 Pro Max', category: 'Phones', price: 19999, stock: 15, minStock: 10, sales7d: 7 },
    { id: 'SKU-1002', name: 'MacBook Pro M3', category: 'Laptops', price: 34999, stock: 8, minStock: 5, sales7d: 3 },
    { id: 'SKU-1003', name: 'AirPods Pro 2', category: 'Audio', price: 3999, stock: 32, minStock: 20, sales7d: 12 },
    { id: 'SKU-1004', name: 'Samsung S24', category: 'Phones', price: 14999, stock: 22, minStock: 10, sales7d: 5 },
    { id: 'SKU-1005', name: 'iPad Air M2', category: 'Tablets', price: 9999, stock: 7, minStock: 15, sales7d: 4 }
  ])
  const [invSearch, setInvSearch] = useState('')
  const [invCategory, setInvCategory] = useState<'All' | 'Phones' | 'Laptops' | 'Audio' | 'Tablets'>('All')
  const [invSort, setInvSort] = useState<'stock'|'price'|'sales'>('stock')

  const invFiltered = useMemo(() => {
    let rows = inventory.filter(r => (
      (invCategory === 'All' || r.category === invCategory) &&
      (invSearch === '' || r.name.toLowerCase().includes(invSearch.toLowerCase()) || r.id.toLowerCase().includes(invSearch.toLowerCase()))
    ))
    rows.sort((a,b) => invSort==='stock'? a.stock-b.stock : invSort==='price'? a.price-b.price : a.sales7d-b.sales7d)
    return rows
  }, [inventory, invCategory, invSearch, invSort])

  const restock = (id: string, amount = 5) => setInventory(prev => prev.map(p => p.id===id? {...p, stock: p.stock + amount}: p))
  const inlineEdit = (id: string, key: 'price'|'stock', value: number) => setInventory(prev => prev.map(p => p.id===id? {...p, [key]: value}: p))
  const removeItem = (id: string) => setInventory(prev => prev.filter(p => p.id !== id))

  // Messages & Chat
  type Msg = { id: string, from: 'me'|'customer', text: string, time: string }
  const [conversations, setConversations] = useState([
    { id: 'C-001', customer: 'Grace P.', unread: 2, last: 'Is this available for pickup?', messages: [
      { id: 'm1', from: 'customer', text: 'Hi! Is the MacBook still in stock?', time: '09:15' },
      { id: 'm2', from: 'me', text: 'Yes, we have 8 units left.', time: '09:16' },
      { id: 'm3', from: 'customer', text: 'Great! Is this available for pickup?', time: '09:17' }
    ] as Msg[] },
    { id: 'C-002', customer: 'John S.', unread: 0, last: 'Thanks!', messages: [
      { id: 'm1', from: 'customer', text: 'Can I get express delivery?', time: '08:40' },
      { id: 'm2', from: 'me', text: 'Yes, available at checkout.', time: '08:41' },
      { id: 'm3', from: 'customer', text: 'Thanks!', time: '08:42' }
    ] as Msg[] }
  ])
  const [activeConvId, setActiveConvId] = useState('C-001')
  const [msgText, setMsgText] = useState('')
  const activeConv = conversations.find(c => c.id === activeConvId)
  useEffect(() => {
    const id = setInterval(() => {
      // simulate incoming message occasionally
      setConversations(prev => prev.map(c => {
        if (c.id !== activeConvId) return c
        if (Math.random() < 0.3) {
          const newMsg = { id: `m${Date.now()}`, from: 'customer' as const, text: 'Got it, thanks!', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
          return { ...c, unread: c.unread + (document.hidden ? 1 : 0), messages: [...c.messages, newMsg] }
        }
        return c
      }))
    }, 8000)
    return () => clearInterval(id)
  }, [activeConvId])
  const sendMessage = () => {
    if (!msgText.trim() || !activeConv) return
    const newMsg = { id: `m${Date.now()}`, from: 'me' as const, text: msgText.trim(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    setConversations(prev => prev.map(c => c.id===activeConv.id ? { ...c, messages: [...c.messages, newMsg], last: newMsg.text } : c))
    setMsgText('')
  }

  // Promotions & Discounts
  const [campaigns, setCampaigns] = useState([
    { id: 'camp-1', name: 'Weekend Flash Sale', status: 'active', reach: 4200, redemptions: 310, performance: 92 },
    { id: 'camp-2', name: 'Back To School', status: 'upcoming', reach: 0, redemptions: 0, performance: 0 },
    { id: 'camp-3', name: 'VIP Loyalty Boost', status: 'active', reach: 2500, redemptions: 190, performance: 86 },
    { id: 'camp-4', name: 'Clearance', status: 'expired', reach: 7800, redemptions: 520, performance: 74 }
  ])
  const pauseCampaign = (id: string) => setCampaigns(prev => prev.map(c => c.id===id? { ...c, status: c.status==='active' ? 'paused' : 'active' } : c))
  const duplicateCampaign = (id: string) => setCampaigns(prev => {
    const src = prev.find(c => c.id===id)!; const copy = { ...src, id: `camp-${Date.now()}`, name: `${src.name} (Copy)`, status: 'upcoming', reach: 0, redemptions: 0, performance: 0 }
    return [copy, ...prev]
  })
  const optimizeCampaign = (id: string) => setCampaigns(prev => prev.map(c => c.id===id? { ...c, performance: Math.min(100, c.performance + 5) } : c))

  // Marketing Tools - charts
  const chartData = Array.from({length: 12}).map((_, i) => ({
    name: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    revenue: Math.round(200 + Math.random()*200) + (nowTick%3)*50,
    engagement: Math.round(50 + Math.random()*100)
  }))

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-teal-800 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Good morning, Sarah! 👋</h2>
              <p className="text-blue-200 text-lg">Here's what's happening with your store today.</p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">98.7%</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">+47%</div>
                <div className="text-sm text-blue-200">vs Last Month</div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">ZMW <AnimatedCounter value={dashboardStats.totalRevenue} /></div>
              <div className="text-sm text-blue-200">Total Revenue</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.totalOrders} /></div>
              <div className="text-sm text-blue-200">Total Orders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.activeProducts} /></div>
              <div className="text-sm text-blue-200">Active Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold"><AnimatedCounter value={dashboardStats.totalCustomers} /></div>
              <div className="text-sm text-blue-200">Total Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 group-hover:from-emerald-400/20 group-hover:to-teal-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.revenueChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-emerald-700">Total Revenue</p>
              <p className="text-3xl font-bold text-emerald-900">
                ZMW <AnimatedCounter value={dashboardStats.totalRevenue} />
              </p>
              <p className="text-sm text-emerald-600">vs last month</p>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2 bg-emerald-200" />
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 group-hover:from-blue-400/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.ordersChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-700">Total Orders</p>
              <p className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={dashboardStats.totalOrders} />
              </p>
              <p className="text-sm text-blue-600">{dashboardStats.pendingOrders} pending</p>
            </div>
            <div className="mt-4">
              <Progress value={78} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>

        {/* Active Products */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-500/10 group-hover:from-purple-400/20 group-hover:to-violet-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Package className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.productsChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-700">Active Products</p>
              <p className="text-3xl font-bold text-purple-900">
                <AnimatedCounter value={dashboardStats.activeProducts} />
              </p>
              <p className="text-sm text-purple-600">{dashboardStats.lowStock} low stock</p>
            </div>
            <div className="mt-4">
              <Progress value={92} className="h-2 bg-purple-200" />
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 group-hover:from-orange-400/20 group-hover:to-red-500/20 transition-all duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{dashboardStats.customersChange}%
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-700">Total Customers</p>
              <p className="text-3xl font-bold text-orange-900">
                <AnimatedCounter value={dashboardStats.totalCustomers} />
              </p>
              <p className="text-sm text-orange-600">{dashboardStats.newCustomers} new this month</p>
            </div>
            <div className="mt-4">
              <Progress value={88} className="h-2 bg-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{metric.title}</h3>
                <Badge className={`${metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Progress</span>
                  <span>{metric.percentage}%</span>
                </div>
                <Progress value={metric.percentage} className="h-3" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{metric.current.toLocaleString()}</span>
                  <span>{metric.target.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              Recent Orders
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-600 text-white font-bold">
                        {order.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{order.customer}</p>
                      <p className="text-sm text-slate-500">{order.id} ��� {order.items} items</p>
                      <p className="text-xs text-slate-400">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">ZMW {order.amount.toLocaleString()}</p>
                    <Badge className={`text-xs ${order.statusColor} mt-1`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <Star className="h-5 w-5 mr-2 text-orange-600" />
              Top Products
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.category} • {product.sales} sales</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Stock: {product.stock}
                      </Badge>
                      {product.stock < 10 && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">ZMW {product.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +{product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center text-orange-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockAlerts.map((item, index) => (
              <div key={index} className={`
                p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md
                ${item.urgency === 'critical' ? 'border-red-300 bg-red-50' : ''}
                ${item.urgency === 'high' ? 'border-orange-300 bg-orange-50' : ''}
                ${item.urgency === 'medium' ? 'border-yellow-300 bg-yellow-50' : ''}
                ${item.urgency === 'low' ? 'border-blue-300 bg-blue-50' : ''}
              `}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                  <Badge className={`
                    text-xs
                    ${item.urgency === 'critical' ? 'bg-red-100 text-red-700' : ''}
                    ${item.urgency === 'high' ? 'bg-orange-100 text-orange-700' : ''}
                    ${item.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${item.urgency === 'low' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {item.urgency}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Current:</span>
                    <span className="font-medium">{item.currentStock}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Min Stock:</span>
                    <span className="font-medium">{item.minStock}</span>
                  </div>
                  <Progress
                    value={(item.currentStock / item.minStock) * 100}
                    className={`h-2 ${
                      item.urgency === 'critical' ? 'bg-red-200' :
                      item.urgency === 'high' ? 'bg-orange-200' :
                      item.urgency === 'medium' ? 'bg-yellow-200' : 'bg-blue-200'
                    }`}
                  />
                </div>
                <Button size="sm" className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white">
                  <Package className="h-3 w-3 mr-1" />
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Modules */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Inventory & Stock Management */}
        <Card className="xl:col-span-2 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <Package className="h-5 w-5 mr-2 text-teal-600" />
              Inventory & Stock
            </CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Search products..." value={invSearch} onChange={e=>setInvSearch(e.target.value)} className="h-9 w-48" />
              <select value={invCategory} onChange={e=>setInvCategory(e.target.value as any)} className="h-9 px-2 border rounded-md text-sm">
                {['All','Phones','Laptops','Audio','Tablets'].map(c=>(<option key={c} value={c}>{c}</option>))}
              </select>
              <select value={invSort} onChange={e=>setInvSort(e.target.value as any)} className="h-9 px-2 border rounded-md text-sm">
                <option value="stock">Sort: Stock</option>
                <option value="price">Sort: Price</option>
                <option value="sales">Sort: 7d Sales</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b">
                    <th className="py-2 pr-4">SKU</th>
                    <th className="py-2 pr-4">Product</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Stock</th>
                    <th className="py-2 pr-4">7d Sales</th>
                    <th className="py-2 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invFiltered.map(row => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-2 pr-4">{row.id}</td>
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.name}</td>
                      <td className="py-2 pr-4">{row.category}</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <span>ZMW</span>
                          <input type="number" value={row.price} onChange={(e)=>inlineEdit(row.id,'price', Number(e.target.value))} className="w-24 border rounded px-2 py-1" />
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <input type="number" value={row.stock} onChange={(e)=>inlineEdit(row.id,'stock', Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${row.stock<=row.minStock? 'bg-orange-500':'bg-teal-500'}`} style={{width: `${Math.min(100, (row.stock/Math.max(1,row.minStock))*100)}%`}} />
                          </div>
                          {row.stock<=row.minStock ? (
                            <Badge className="bg-orange-100 text-orange-800">Low</Badge>
                          ) : (
                            <Badge className="bg-teal-100 text-teal-800">OK</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-2 pr-4">{row.sales7d}</td>
                      <td className="py-2 pr-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={()=>restock(row.id)} className="border-teal-200 text-teal-700">Restock</Button>
                          <Button size="sm" variant="outline" onClick={()=>removeItem(row.id)} className="border-red-200 text-red-700">Remove</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Messages & Chat */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Messages & Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 border rounded-lg overflow-hidden">
                <div className="p-2 border-b bg-slate-50">
                  <Input placeholder="Search..." className="h-8" />
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {conversations.map(conv => (
                    <button key={conv.id} onClick={()=>setActiveConvId(conv.id)} className={`w-full text-left p-3 border-b hover:bg-slate-50 ${activeConvId===conv.id?'bg-blue-50':''}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">{conv.customer}</span>
                        {conv.unread>0 && <Badge className="bg-orange-500 text-white">{conv.unread}</Badge>}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{conv.last}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2 border rounded-lg flex flex-col">
                <div className="flex-1 p-3 space-y-2 max-h-72 overflow-y-auto">
                  {activeConv?.messages.map(m => (
                    <div key={m.id} className={`max-w-[80%] px-3 py-2 rounded-lg ${m.from==='me'?'ml-auto bg-gradient-to-r from-teal-500 to-blue-600 text-white':'bg-slate-100 text-slate-900'}`}>
                      <div className="text-xs opacity-75 mb-1">{m.time}</div>
                      <div>{m.text}</div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t flex items-center gap-2">
                  <Input value={msgText} onChange={e=>setMsgText(e.target.value)} placeholder="Type a message..." className="flex-1" onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); sendMessage(); } }} />
                  <Button onClick={sendMessage} className="bg-gradient-to-r from-orange-500 to-teal-600 text-white">Send</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions & Discounts and Marketing Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-1 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold flex items-center">
              <Tag className="h-5 w-5 mr-2 text-orange-600" />
              Promotions & Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Reorder.Group axis="y" values={campaigns} onReorder={setCampaigns} className="space-y-3">
              {campaigns.map(c => (
                <Reorder.Item key={c.id} value={c} className="border rounded-lg p-3 bg-white hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500 capitalize">{c.status}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-100 text-teal-800">{c.performance}%</Badge>
                      <Button size="sm" variant="outline" onClick={()=>pauseCampaign(c.id)}>Pause</Button>
                      <Button size="sm" variant="outline" onClick={()=>duplicateCampaign(c.id)}>Duplicate</Button>
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-teal-600 text-white" onClick={()=>optimizeCampaign(c.id)}>Optimize</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-slate-600">
                    <div>Reach: <span className="font-semibold">{c.reach}</span></div>
                    <div>Redemptions: <span className="font-semibold">{c.redemptions}</span></div>
                    <div>Perf: <span className="font-semibold">{c.performance}%</span></div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-teal-600" />
              Marketing Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.7}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="url(#revFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="engagement">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="engagement" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
