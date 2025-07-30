"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PiggyBank, 
  Activity,
  Globe,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

interface EconomicIndicator {
  name: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: any
  description: string
}

export function RealTimeData() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const marketData: MarketData[] = [
    {
      symbol: "USD/ZMW",
      name: "US Dollar to Zambian Kwacha",
      value: 24.85,
      change: 0.15,
      changePercent: 0.6,
      trend: 'up',
      color: "text-green-600"
    },
    {
      symbol: "EUR/ZMW",
      name: "Euro to Zambian Kwacha",
      value: 26.92,
      change: 0.08,
      changePercent: 0.3,
      trend: 'up',
      color: "text-green-600"
    },
    {
      symbol: "GBP/ZMW",
      name: "British Pound to Zambian Kwacha",
      value: 30.15,
      change: -0.12,
      changePercent: -0.4,
      trend: 'down',
      color: "text-red-600"
    },
    {
      symbol: "ZAR/ZMW",
      name: "South African Rand to Zambian Kwacha",
      value: 1.38,
      change: 0.02,
      changePercent: 1.5,
      trend: 'up',
      color: "text-green-600"
    }
  ]

  const luseStocks = [
    { symbol: "SHOPRITE", name: "Shoprite Holdings", price: 125.50, change: 2.30, changePercent: 1.87 },
    { symbol: "ZANACO", name: "Zanaco Limited", price: 8.75, change: -0.15, changePercent: -1.69 },
    { symbol: "ZAMBEEF", name: "Zambeef Products", price: 4.20, change: 0.05, changePercent: 1.20 },
    { symbol: "ZCCM", name: "ZCCM Investments", price: 15.80, change: 0.40, changePercent: 2.60 },
    { symbol: "LAFARGE", name: "Lafarge Zambia", price: 22.10, change: -0.30, changePercent: -1.34 }
  ]

  const economicIndicators: EconomicIndicator[] = [
    {
      name: "Bank Rate",
      value: "9.25%",
      change: "Unchanged",
      trend: 'stable',
      icon: PiggyBank,
      description: "Bank of Zambia Policy Rate"
    },
    {
      name: "Inflation Rate",
      value: "13.4%",
      change: "-0.2%",
      trend: 'down',
      icon: TrendingDown,
      description: "Annual Inflation Rate"
    },
    {
      name: "GDP Growth",
      value: "4.7%",
      change: "+0.3%",
      trend: 'up',
      icon: TrendingUp,
      description: "Quarterly GDP Growth"
    },
    {
      name: "Copper Price",
      value: "$8,245",
      change: "+$125",
      trend: 'up',
      icon: BarChart3,
      description: "Price per tonne (USD)"
    }
  ]

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-slate-600" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Live Market Data</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-4">
          Real-time financial data and economic indicators for informed decision making
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Globe className="h-4 w-4" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            size="sm"
            disabled={isRefreshing}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Currency Exchange Rates */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <DollarSign className="h-5 w-5" />
            Currency Exchange Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((currency) => (
              <Card key={currency.symbol} className="bg-white border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{currency.symbol}</h3>
                    {getTrendIcon(currency.trend)}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {currency.value.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${currency.color}`}>
                      {currency.change > 0 ? '+' : ''}{currency.change.toFixed(2)}
                    </span>
                    <span className={`text-sm font-medium ${currency.color}`}>
                      ({currency.changePercent > 0 ? '+' : ''}{currency.changePercent.toFixed(1)}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{currency.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* LuSE Stock Market */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <BarChart3 className="h-5 w-5" />
            Lusaka Securities Exchange (LuSE)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Market Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-slate-600">LuSE Index</p>
                  <p className="text-2xl font-bold text-blue-600">4,582.31</p>
                  <p className="text-sm text-green-600">+12.4 (0.3%) ↗</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-slate-600">Market Cap</p>
                  <p className="text-2xl font-bold text-blue-600">ZMW 89.2B</p>
                  <p className="text-sm text-green-600">+0.8% today</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-blue-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-slate-600">Volume Traded</p>
                  <p className="text-2xl font-bold text-blue-600">2.4M</p>
                  <p className="text-sm text-slate-600">shares today</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Stocks */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Stocks</h3>
              <div className="space-y-3">
                {luseStocks.map((stock) => (
                  <Card key={stock.symbol} className="bg-white border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">{stock.symbol}</h4>
                          <p className="text-sm text-slate-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">ZMW {stock.price}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${
                              stock.change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                            </span>
                            <span className={`text-sm font-medium ${
                              stock.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </span>
                            {stock.changePercent > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Economic Indicators */}
      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <TrendingUp className="h-5 w-5" />
            Economic Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {economicIndicators.map((indicator) => (
              <Card key={indicator.name} className="bg-white border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <indicator.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{indicator.name}</h3>
                      <p className="text-xs text-slate-600">{indicator.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-slate-900">{indicator.value}</div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(indicator.trend)}
                      <span className={`text-sm font-medium ${
                        indicator.trend === 'up' ? 'text-green-600' : 
                        indicator.trend === 'down' ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {indicator.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market News & Alerts */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Activity className="h-5 w-5" />
            Market News & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Bank of Zambia Maintains Policy Rate at 9.25%",
                time: "2 hours ago",
                badge: "MONETARY POLICY",
                color: "bg-blue-100 text-blue-700"
              },
              {
                title: "Copper Prices Rise on Global Demand",
                time: "4 hours ago",
                badge: "COMMODITIES",
                color: "bg-green-100 text-green-700"
              },
              {
                title: "New Mobile Money Regulations Announced",
                time: "6 hours ago",
                badge: "FINTECH",
                color: "bg-purple-100 text-purple-700"
              }
            ].map((news, index) => (
              <Card key={index} className="bg-white border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${news.color} text-xs`}>
                          {news.badge}
                        </Badge>
                        <span className="text-sm text-slate-500">{news.time}</span>
                      </div>
                      <h3 className="font-medium text-slate-900">{news.title}</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RealTimeData }
