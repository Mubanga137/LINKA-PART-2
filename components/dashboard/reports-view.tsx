"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText,
  Users,
  Package,
  Download
} from "lucide-react"

interface DashboardData {
  revenue: {
    total: number
    thisMonth: number
    growth: number
    monthlyData: Array<{ month: string; revenue: number; orders: number; customers: number }>
  }
  orders: {
    total: number
    pending: number
    processing: number
    delivered: number
    growth: number
  }
  products: {
    total: number
    active: number
    lowStock: number
    growth: number
  }
  customers: {
    total: number
    new: number
    growth: number
    satisfaction: number
    returnRate: number
  }
}

interface ReportsViewProps {
  data: DashboardData
}

export function ReportsView({ data }: ReportsViewProps) {
  const reports = [
    {
      title: "Sales Report",
      description: "Comprehensive sales analysis with revenue breakdowns, product performance, and growth metrics.",
      icon: FileText,
      color: "blue",
      action: "Generate Report"
    },
    {
      title: "Customer Report", 
      description: "Customer behavior analysis, demographics insights, and retention metrics for strategic planning.",
      icon: Users,
      color: "green",
      action: "Generate Report"
    },
    {
      title: "Inventory Report",
      description: "Stock levels, inventory turnover, and supply chain optimization recommendations.",
      icon: Package,
      color: "orange", 
      action: "Generate Report"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <report.icon className={`h-6 w-6 text-${report.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">{report.description}</p>
              <Button 
                className={`w-full bg-${report.color}-600 hover:bg-${report.color}-700 text-white`}
              >
                <Download className="h-4 w-4 mr-2" />
                {report.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
