"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus } from "lucide-react"

interface DashboardData {
  revenue: {
    growth: number
  }
}

interface MarketingViewProps {
  data: DashboardData
}

export function MarketingView({ data }: MarketingViewProps) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Megaphone className="h-5 w-5 mr-2" />
          Marketing Campaigns
        </CardTitle>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Tools</h3>
          <p className="text-gray-600">Campaign management and analytics coming soon.</p>
        </div>
      </CardContent>
    </Card>
  )
}
