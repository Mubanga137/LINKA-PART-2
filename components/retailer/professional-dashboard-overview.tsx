'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Star,
  Eye,
  AlertTriangle,
  RefreshCw,
  Filter,
  Calendar,
  ArrowUpRight,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardData {
  revenue: {
    total: number;
    thisMonth: number;
    growth: number;
    monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>;
  };
  orders: {
    total: number;
    today: number;
    pending: number;
    growth: number;
  };
  products: {
    total: number;
    inStock: number;
    lowStock: number;
    growth: number;
  };
  customers: {
    avgOrderValue: number;
    growth: number;
    satisfaction: number;
  };
  insights: {
    recentOrders: Array<{
      id: string;
      customer: string;
      avatar: string;
      amount: number;
      status: string;
      date: string;
      items: number;
    }>;
    lowStockProducts: Array<{
      id: string;
      name: string;
      category: string;
      currentStock: number;
      minStock: number;
      price: number;
    }>;
    salesData: Array<{ date: string; sales: number; orders: number }>;
    productPerformance: Array<{ category: string; sales: number; growth: number }>;
  };
}

interface ProfessionalDashboardOverviewProps {
  data: DashboardData;
}

export function ProfessionalDashboardOverview({ data }: ProfessionalDashboardOverviewProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  useEffect(() => {
    const phases = [1, 2, 3, 4];
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), index * 200);
    });
  }, []);

  const kpiCards = [
    {
      id: 'total-sales',
      title: 'Total Sales',
      value: `$${(data.revenue.total / 1000).toFixed(1)}K`,
      change: data.revenue.growth,
      trend: data.revenue.growth >= 0 ? 'up' : 'down',
      icon: DollarSign,
      color: 'emerald',
      description: 'Revenue this month'
    },
    {
      id: 'orders-today',
      title: 'Orders Today',
      value: data.orders.today.toString(),
      change: data.orders.growth,
      trend: data.orders.growth >= 0 ? 'up' : 'down',
      icon: ShoppingCart,
      color: 'blue',
      description: 'Orders received today'
    },
    {
      id: 'products-in-stock',
      title: 'Products in Stock',
      value: data.products.inStock.toString(),
      change: data.products.growth,
      trend: data.products.growth >= 0 ? 'up' : 'down',
      icon: Package,
      color: 'purple',
      description: 'Available inventory'
    },
    {
      id: 'avg-order-value',
      title: 'Average Order Value',
      value: `$${data.customers.avgOrderValue.toFixed(0)}`,
      change: data.customers.growth,
      trend: data.customers.growth >= 0 ? 'up' : 'down',
      icon: Star,
      color: 'orange',
      description: 'Per order average'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600 border-emerald-200',
      blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200',
      purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200',
      orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8 p-6 bg-slate-50 min-h-screen">
      {/* KPIs Row */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in ${animationPhase >= 1 ? 'animate' : ''}`}>
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600';
          const colorClasses = getColorClasses(kpi.color);
          
          return (
            <div
              key={kpi.id}
              className={`
                bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md 
                transition-all duration-300 hover:-translate-y-1 group cursor-pointer
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${colorClasses.split(' ').slice(2, 5).join(' ')}`}>
                  <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                  <span className={`text-xs font-medium ${trendColor}`}>
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                <div>
                  <p className="text-sm font-medium text-slate-900">{kpi.title}</p>
                  <p className="text-xs text-slate-500">{kpi.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Graphs Section */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 fade-in ${animationPhase >= 2 ? 'animate' : ''}`}>
        {/* Sales Over Time Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Sales Over Time</h3>
              <p className="text-sm text-slate-500">Revenue trend analysis</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedTimeframe}
              </Button>
            </div>
          </div>
          
          {/* Simple line chart representation */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {data.insights.salesData.slice(-7).map((day, index) => {
              const height = (day.sales / Math.max(...data.insights.salesData.map(d => d.sales))) * 100;
              
              return (
                <div key={day.date} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full mb-2">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                      style={{ 
                        height: `${height}%`,
                        minHeight: '8px',
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <div className="text-center">
                        <p className="font-medium">${day.sales}</p>
                        <p className="text-slate-300">{day.orders} orders</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Performance Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Product Performance</h3>
              <p className="text-sm text-slate-500">Category sales breakdown</p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.insights.productPerformance.map((category, index) => {
              const maxSales = Math.max(...data.insights.productPerformance.map(c => c.sales));
              const percentage = (category.sales / maxSales) * 100;
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">${category.sales}</span>
                      <div className={`flex items-center space-x-1 ${category.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {category.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">{Math.abs(category.growth)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out ${
                        index % 4 === 0 ? 'from-blue-500 to-blue-600' :
                        index % 4 === 1 ? 'from-emerald-500 to-emerald-600' :
                        index % 4 === 2 ? 'from-purple-500 to-purple-600' :
                        'from-orange-500 to-orange-600'
                      }`}
                      style={{ 
                        width: `${percentage}%`,
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders & Low Stock Alerts */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 fade-in ${animationPhase >= 3 ? 'animate' : ''}`}>
        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <p className="text-sm text-slate-500">Latest customer purchases</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-3">
            {data.insights.recentOrders.slice(0, 5).map((order, index) => (
              <div 
                key={order.id} 
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Avatar className="h-10 w-10 ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm">
                    {order.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">{order.customer}</p>
                    <span className="text-sm font-bold text-slate-900">${order.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Order #{order.id} • {order.items} items
                    </p>
                    <Badge 
                      className={`text-xs ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}
                    >
                      {order.status === 'Delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {order.status === 'Processing' && <Clock className="h-3 w-3 mr-1" />}
                      {order.status}
                    </Badge>
                  </div>
                </div>
                
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            View All Orders
          </Button>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                Low Stock Alerts
              </h3>
              <p className="text-sm text-slate-500">Products running low</p>
            </div>
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
              {data.insights.lowStockProducts.length} Items
            </Badge>
          </div>
          
          <div className="space-y-3">
            {data.insights.lowStockProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="flex items-center justify-between p-3 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.category}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-orange-600 font-medium">
                      Stock: {product.currentStock}
                    </span>
                    <span className="text-xs text-slate-400">
                      (Min: {product.minStock})
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${product.price}</p>
                  <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                    Restock
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
            Manage Inventory
          </Button>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in.animate {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
