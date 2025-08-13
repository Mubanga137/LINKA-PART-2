'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Star,
  Zap,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface KPIData {
  revenue: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  orders: {
    total: number;
    pending: number;
    growth: number;
  };
  products: {
    total: number;
    active: number;
    growth: number;
  };
  customers: {
    total: number;
    satisfaction: number;
    growth: number;
  };
}

interface PremiumKPICardsProps {
  data: KPIData;
}

interface KPICard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
  gradient: string;
  description: string;
  premium?: boolean;
  target?: number;
}

export function PremiumKPICards({ data }: PremiumKPICardsProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const kpiCards: KPICard[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `$${(data.revenue.total / 1000).toFixed(0)}K`,
      change: data.revenue.growth,
      trend: data.revenue.growth >= 0 ? 'up' : 'down',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Monthly revenue growth',
      premium: true,
      target: 85
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: data.orders.total.toLocaleString(),
      change: data.orders.growth,
      trend: data.orders.growth >= 0 ? 'up' : 'down',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Order volume trend',
      target: 92
    },
    {
      id: 'products',
      title: 'Active Products',
      value: data.products.total.toLocaleString(),
      change: data.products.growth,
      trend: data.products.growth >= 0 ? 'up' : 'down',
      icon: Package,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Inventory performance',
      target: 78
    },
    {
      id: 'customers',
      title: 'Customer Rating',
      value: `${data.customers.satisfaction.toFixed(1)}★`,
      change: data.customers.growth,
      trend: data.customers.growth >= 0 ? 'up' : 'down',
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      description: 'Customer satisfaction',
      premium: true,
      target: 96
    }
  ];

  // Animate values on mount
  useEffect(() => {
    const animateValue = (key: string, finalValue: number) => {
      let currentValue = 0;
      const increment = finalValue / 100;
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: currentValue }));
      }, 20);
    };

    animateValue('revenue', data.revenue.total);
    animateValue('orders', data.orders.total);
    animateValue('products', data.products.total);
    animateValue('customers', data.customers.satisfaction * 20); // Scale for animation
  }, [data]);

  const formatAnimatedValue = (cardId: string, originalValue: string) => {
    const animated = animatedValues[cardId] || 0;
    
    switch (cardId) {
      case 'revenue':
        return `$${(animated / 1000).toFixed(0)}K`;
      case 'orders':
      case 'products':
        return Math.floor(animated).toLocaleString();
      case 'customers':
        return `${(animated / 20).toFixed(1)}★`;
      default:
        return originalValue;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        const isHovered = hoveredCard === card.id;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = card.trend === 'up' ? 'text-emerald-400' : 'text-red-400';
        const trendBg = card.trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20';

        return (
          <div
            key={card.id}
            className={`
              premium-kpi-card group relative overflow-hidden rounded-2xl transition-all duration-500
              ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-xl hover:shadow-2xl'}
            `}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Background with glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20" />
            
            {/* Animated gradient background */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-10' : ''}
            `} />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`
                absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${card.gradient} rounded-full blur-2xl opacity-20
                transition-all duration-1000 ${isHovered ? 'scale-150 opacity-30' : ''}
              `} />
              <div className={`
                absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-full blur-xl opacity-15
                transition-all duration-1000 ${isHovered ? 'scale-125 opacity-25' : ''}
              `} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg
                  transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}
                `}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex items-center space-x-2">
                  {card.premium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 animate-pulse">
                      <Crown className="h-3 w-3 mr-1" />
                      PRO
                    </Badge>
                  )}
                  <div className={`
                    flex items-center space-x-1 px-2 py-1 rounded-full ${trendBg}
                    transition-all duration-300 ${isHovered ? 'scale-110' : ''}
                  `}>
                    <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                    <span className={`text-xs font-medium ${trendColor}`}>
                      {Math.abs(card.change)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Main value */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-white/70 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-white tracking-tight">
                  {formatAnimatedValue(card.id, card.value)}
                </p>
              </div>

              {/* Progress bar (if target exists) */}
              {card.target && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <span>Progress to target</span>
                    <span>{card.target}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`
                        h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 ease-out
                        ${isHovered ? 'animate-pulse' : ''}
                      `}
                      style={{ 
                        width: `${card.target}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-white/60 mb-4">{card.description}</p>

              {/* Action button */}
              <button className={`
                w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10
                hover:bg-white/10 transition-all duration-300 group/btn
                ${isHovered ? 'bg-white/10 border-white/20' : ''}
              `}>
                <span className="text-sm font-medium text-white/80 group-hover/btn:text-white">
                  View Details
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/60 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Shine effect */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
              transform -skew-x-12 transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : '-translate-x-full'}
            `} />

            {/* Premium glow */}
            {card.premium && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
            )}
          </div>
        );
      })}

      <style jsx>{`
        .premium-kpi-card {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .premium-kpi-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .premium-kpi-card:nth-child(1) { animation-delay: 0ms; }
        .premium-kpi-card:nth-child(2) { animation-delay: 150ms; }
        .premium-kpi-card:nth-child(3) { animation-delay: 300ms; }
        .premium-kpi-card:nth-child(4) { animation-delay: 450ms; }

        @media (prefers-reduced-motion: reduce) {
          .premium-kpi-card {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .premium-kpi-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
