"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Eye } from "lucide-react"

interface DashboardData {
  customers: {
    total: number
    new: number
    growth: number
    satisfaction: number
    returnRate: number
  }
}

interface CustomersViewProps {
  data: DashboardData
}

export function CustomersView({ data }: CustomersViewProps) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Customer Analytics
        </CardTitle>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{data.customers.total.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{data.customers.new}</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
