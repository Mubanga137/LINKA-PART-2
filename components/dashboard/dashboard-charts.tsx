"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Sales Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900">
            <BarChart3 className="h-5 w-5 mr-2 text-emerald-500" />
            Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <p className="text-slate-600">Sales chart visualization would go here</p>
              <p className="text-sm text-slate-500 mt-2">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Conversion Rate", value: "3.2%", progress: 32 },
              { label: "Average Order Value", value: "ZMW 193", progress: 65 },
              { label: "Customer Satisfaction", value: "4.8/5", progress: 96 },
              { label: "Return Rate", value: "2.1%", progress: 21 },
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{metric.label}</span>
                  <span className="font-medium text-slate-900">{metric.value}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
