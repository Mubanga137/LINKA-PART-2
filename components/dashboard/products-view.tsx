"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Eye } from "lucide-react"

interface DashboardData {
  insights: {
    topProducts: Array<{
      id: string
      name: string
      category: string
      sales: number
      growth: number
      price: number
    }>
  }
}

interface ProductsViewProps {
  data: DashboardData
}

export function ProductsView({ data }: ProductsViewProps) {
  const formatCurrency = (amount: number) => `ZMW ${amount.toLocaleString()}`
  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2" />
          Top Products
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.insights.topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category} • {product.sales} sales</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{formatCurrency(product.price)}</div>
                <Badge className={`text-xs ${product.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {formatPercentage(product.growth)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
