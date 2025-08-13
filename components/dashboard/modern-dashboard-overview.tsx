'use client';

import { useState, useEffect } from 'react';
import { PremiumKPICards } from './premium-kpi-cards';
import { AnimatedCharts } from './animated-charts';
// Removed conflicting theme import
import { 
  TrendingUp, 
  Package, 
  Users, 
  Star,
  Crown,
  Zap,
  Activity,
  Target,
  Award,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardData {
  revenue: {
    total: number;
    thisMonth: number;
    growth: number;
    monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>;
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
    delivered: number;
    growth: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
    growth: number;
  };
  customers: {
    total: number;
    new: number;
    growth: number;
    satisfaction: number;
    returnRate: number;
  };
  insights: {
    topCategories: Array<{ name: string; value: number; color: string }>;
    recentOrders: Array<{
      id: string;
      customer: string;
      avatar: string;
      amount: number;
      status: string;
      date: string;
      items: number;
    }>;
    topProducts: Array<{
      id: string;
      name: string;
      category: string;
      sales: number;
      growth: number;
      price: number;
    }>;
  };
}

interface ModernDashboardOverviewProps {
  data: DashboardData;
}

export function ModernDashboardOverview({ data }: ModernDashboardOverviewProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  // Stagger animations
  useEffect(() => {
    const phases = [1, 2, 3, 4];
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), index * 200);
    });
  }, []);

  return (
    <div className="modern-dashboard-overview">
      {/* Background Elements */}
      <div className="dashboard-background" />
      <div className="particles-container">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-8 p-6">
        {/* Welcome Section */}
        <div className={`glass-card rounded-2xl p-6 stagger-item ${animationPhase >= 1 ? 'animate' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 gradient-text">
                Welcome back! ✨
              </h1>
              <p className="text-white/70">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Quick Achievement */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Congratulations! 🎉</h3>
              <p className="text-white/80 text-sm">You've reached 95% customer satisfaction this month!</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`stagger-item ${animationPhase >= 2 ? 'animate' : ''}`}>
          <PremiumKPICards data={data} />
        </div>

        {/* Charts Section */}
        <div className={`stagger-item ${animationPhase >= 3 ? 'animate' : ''}`}>
          <AnimatedCharts 
            data={{
              monthlyData: data.revenue.monthlyData,
              topCategories: data.insights.topCategories,
              recentOrders: data.insights.recentOrders
            }} 
          />
        </div>

        {/* Recent Activity & Top Products */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-item ${animationPhase >= 4 ? 'animate' : ''}`}>
          {/* Recent Orders */}
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Recent Orders</h3>
                <p className="text-white/60 text-sm">Latest customer purchases</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              {data.insights.recentOrders.slice(0, 5).map((order, index) => (
                <div 
                  key={order.id} 
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className="h-10 w-10 ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
                      {order.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{order.customer}</p>
                    <p className="text-xs text-white/60">{order.date} • {order.items} items</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${order.amount}</p>
                    <Badge 
                      className={`text-xs mt-1 ${
                        order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300">
              View All Orders
            </Button>
          </div>

          {/* Top Products */}
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Top Products</h3>
                <p className="text-white/60 text-sm">Best performing items</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {data.insights.topProducts.slice(0, 5).map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-12 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full group-hover:scale-110 transition-transform duration-300" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-white/60">{product.category} • {product.sales} sales</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${product.price}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">+{product.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4 premium-button">
              <Sparkles className="h-4 w-4 mr-2" />
              Optimize Products
            </Button>
          </div>
        </div>

        {/* Performance Goals */}
        <div className={`glass-card rounded-2xl p-6 stagger-item ${animationPhase >= 4 ? 'animate' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Performance Goals</h3>
              <p className="text-white/60 text-sm">Track your monthly objectives</p>
            </div>
            <Target className="h-6 w-6 text-white/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Revenue Target', current: 85, target: 100, color: 'emerald' },
              { label: 'Customer Satisfaction', current: 96, target: 100, color: 'blue' },
              { label: 'Product Diversity', current: 78, target: 100, color: 'purple' }
            ].map((goal, index) => (
              <div key={goal.label} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={`url(#gradient-${goal.color})`}
                      strokeWidth="8"
                      strokeDasharray={`${(goal.current / goal.target) * 251.2} 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                      style={{ animationDelay: `${index * 300}ms` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{goal.current}%</span>
                  </div>
                  
                  {/* SVG Gradients */}
                  <defs>
                    <linearGradient id={`gradient-${goal.color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={
                        goal.color === 'emerald' ? '#10b981' :
                        goal.color === 'blue' ? '#3b82f6' : '#8b5cf6'
                      } />
                      <stop offset="100%" stopColor={
                        goal.color === 'emerald' ? '#059669' :
                        goal.color === 'blue' ? '#1d4ed8' : '#7c3aed'
                      } />
                    </linearGradient>
                  </defs>
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{goal.label}</h4>
                <p className="text-xs text-white/60">{goal.current}/{goal.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-dashboard-overview {
          min-height: 100vh;
          position: relative;
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stagger-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .dashboard-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .particles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 25s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; animation-duration: 18s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; animation-duration: 22s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 6s; animation-duration: 20s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 8s; animation-duration: 24s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 10s; animation-duration: 19s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 12s; animation-duration: 21s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 14s; animation-duration: 23s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 16s; animation-duration: 17s; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-background,
          .particle,
          .stagger-item {
            animation: none !important;
          }
          
          .stagger-item {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
