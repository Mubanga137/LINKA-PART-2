'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Zap,
  Target,
  Star,
  Crown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChartData {
  monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>;
  topCategories: Array<{ name: string; value: number; color: string }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

interface AnimatedChartsProps {
  data: ChartData;
}

export function AnimatedCharts({ data }: AnimatedChartsProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Animate charts on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Revenue chart data
  const maxRevenue = Math.max(...data.monthlyData.map(item => item.revenue));
  const maxOrders = Math.max(...data.monthlyData.map(item => item.orders));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Revenue Trend Chart */}
      <div className="premium-chart-card">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Revenue Trends</h3>
              <p className="text-sm text-white/60">Monthly performance overview</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live
              </Badge>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 flex items-end justify-between space-x-2 mb-4" ref={chartRef}>
            {data.monthlyData.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 100;
              const isHovered = hoveredBar === index;
              
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center cursor-pointer group"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  <div className={`
                    absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs
                    transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    backdrop-blur-sm border border-white/20
                  `}>
                    <div className="text-center">
                      <p className="font-medium">{item.month}</p>
                      <p className="text-emerald-400">${(item.revenue / 1000).toFixed(0)}K</p>
                      <p className="text-blue-400">{item.orders} orders</p>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="relative w-full max-w-8 mb-2">
                    <div
                      className={`
                        w-full bg-gradient-to-t from-emerald-500 to-blue-500 rounded-t-lg transition-all duration-1000 ease-out
                        ${isHovered ? 'shadow-lg shadow-emerald-500/50 scale-110' : 'shadow-md'}
                      `}
                      style={{
                        height: `${(height * animationProgress) / 100}%`,
                        minHeight: '4px',
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                    
                    {/* Glow effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-t from-emerald-400 to-blue-400 rounded-t-lg blur-sm opacity-0
                      transition-opacity duration-300 ${isHovered ? 'opacity-50' : ''}
                    `} />
                  </div>

                  {/* Month label */}
                  <span className={`
                    text-xs font-medium transition-colors duration-300
                    ${isHovered ? 'text-white' : 'text-white/60'}
                  `}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
              <span className="text-white/70">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              <span className="text-white/70">Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="premium-chart-card">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Top Categories</h3>
              <p className="text-sm text-white/60">Sales distribution by category</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <PieChart className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative h-48 flex items-center justify-center mb-6">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              {data.topCategories.map((category, index) => {
                const prevTotal = data.topCategories.slice(0, index).reduce((sum, cat) => sum + cat.value, 0);
                const circumference = 2 * Math.PI * 30;
                const strokeDasharray = `${(category.value / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((prevTotal / 100) * circumference);
                const isHovered = hoveredCategory === category.name;

                return (
                  <circle
                    key={category.name}
                    cx="50"
                    cy="50"
                    r="30"
                    fill="transparent"
                    stroke={category.color}
                    strokeWidth={isHovered ? "8" : "6"}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={`
                      transition-all duration-500 cursor-pointer
                      ${isHovered ? 'drop-shadow-lg' : ''}
                    `}
                    style={{
                      strokeDasharray: `${((category.value / 100) * circumference * animationProgress) / 100} ${circumference}`,
                      transitionDelay: `${index * 200}ms`
                    }}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  />
                );
              })}
            </svg>
            
            {/* Center value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-white/60">Coverage</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {data.topCategories.map((category) => {
              const isHovered = hoveredCategory === category.name;
              
              return (
                <div
                  key={category.name}
                  className={`
                    flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-300
                    ${isHovered ? 'bg-white/10 scale-105' : 'hover:bg-white/5'}
                  `}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${isHovered ? 'scale-125' : ''}`}
                      style={{ backgroundColor: category.color }}
                    />
                    <span className={`text-sm transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/80'}`}>
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/70'}`}>
                      {category.value}%
                    </span>
                    {isHovered && (
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="premium-chart-card lg:col-span-2">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Live Performance</h3>
              <p className="text-sm text-white/60">Real-time business metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Conversion Rate', value: '3.2%', trend: '+0.4%', color: 'emerald' },
              { label: 'Avg Order Value', value: '$127', trend: '+$12', color: 'blue' },
              { label: 'Customer LTV', value: '$2,340', trend: '+$280', color: 'purple' },
              { label: 'Return Rate', value: '1.8%', trend: '-0.3%', color: 'orange' }
            ].map((metric, index) => (
              <div key={metric.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <p className="text-xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-xs text-white/60 mb-1">{metric.label}</p>
                <div className={`text-xs font-medium ${metric.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .premium-chart-card {
          position: relative;
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          overflow: hidden;
        }

        .premium-chart-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .chart-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
