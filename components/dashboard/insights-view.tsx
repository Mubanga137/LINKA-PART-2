"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Target,
  ArrowRight
} from "lucide-react"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    growth: number
  }
  orders: {
    total: number
    pending: number
    growth: number
  }
  products: {
    total: number
    lowStock: number
    growth: number
  }
  customers: {
    total: number
    growth: number
  }
  insights: {
    topCategories: Array<{ name: string; value: number; color: string }>
  }
}

interface InsightsViewProps {
  data: DashboardData
}

export function InsightsView({ data }: InsightsViewProps) {
  const insights = [
    {
      type: "growth",
      title: "Exceptional Growth",
      description: "Revenue increased by 28.4% this month, driven by strong electronics sales and improved customer retention.",
      icon: TrendingUp,
      color: "green",
      action: "Learn More"
    },
    {
      type: "leader",
      title: "Category Leader", 
      description: "Electronics category dominates with 35% market share and highest profit margins in your portfolio.",
      icon: Target,
      color: "blue",
      action: "Learn More"
    },
    {
      type: "alert",
      title: "Inventory Alert",
      description: "2 high-demand products are running low. Consider restocking to avoid missed sales opportunities.",
      icon: AlertCircle,
      color: "orange",
      action: "Learn More"
    }
  ]

  const recommendations = [
    {
      title: "Optimize Product Listings",
      description: "Enhance product descriptions and images for top-performing items to boost conversion rates by an estimated 15%.",
      action: "Learn More"
    },
    {
      title: "Expand Marketing Reach",
      description: "Increase advertising spend for electronics category to capitalize on high-performing products and market demand.",
      action: "Learn More"
    },
    {
      title: "Customer Loyalty Program", 
      description: "Implement a rewards system to increase repeat purchases and improve customer lifetime value by 25%.",
      action: "Learn More"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Insights */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
              Business Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 bg-${insight.color}-50 border border-${insight.color}-200 rounded-lg`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 bg-${insight.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <insight.icon className={`h-4 w-4 text-${insight.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-${insight.color}-900`}>{insight.title}</h4>
                    <p className={`text-sm text-${insight.color}-800 mt-1`}>{insight.description}</p>
                    <Button variant="link" className={`p-0 h-auto text-${insight.color}-700 hover:text-${insight.color}-800 mt-2`}>
                      {insight.action}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-orange-600" />
              Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                <Button variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-700 mt-2">
                  {rec.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
