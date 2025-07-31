"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  CreditCard,
  Shield,
  TrendingUp,
  Smartphone,
  Users,
  Star,
  Check,
  X,
  BarChart3,
  GitCompare,
  Filter
} from "lucide-react"

interface ComparisonItem {
  id: string
  name: string
  provider: string
  rating: number
  price: string
  features: string[]
  pros: string[]
  cons: string[]
  badge?: string
  category: string
}

const comparisonData: ComparisonItem[] = [
  {
    id: "zanaco-savings",
    name: "Zanaco Savings Account",
    provider: "Zanaco Bank",
    rating: 4.6,
    price: "ZMW 50 min balance",
    features: ["Mobile Banking", "ATM Access", "Online Banking", "SMS Alerts"],
    pros: ["Low minimum balance", "Wide ATM network", "Good mobile app"],
    cons: ["Limited international access", "Monthly fees for excess transactions"],
    badge: "NO FEES",
    category: "banking"
  },
  {
    id: "stanbic-savings",
    name: "Stanbic Personal Account",
    provider: "Stanbic Bank",
    rating: 4.7,
    price: "ZMW 100 min balance",
    features: ["Mobile Banking", "Internet Banking", "Debit Card", "24/7 Support"],
    pros: ["International access", "Premium customer service", "Multiple currencies"],
    cons: ["Higher minimum balance", "Monthly maintenance fees"],
    badge: "PREMIUM",
    category: "banking"
  },
  {
    id: "fnb-business",
    name: "FNB Business Account",
    provider: "First National Bank",
    rating: 4.5,
    price: "ZMW 200 min balance",
    features: ["Business Banking", "Bulk Payments", "Cash Management", "Trade Finance"],
    pros: ["Business-focused features", "Good trade finance options", "Digital solutions"],
    cons: ["Business only", "Higher fees for personal use"],
    badge: "BUSINESS",
    category: "banking"
  },
  {
    id: "mtn-mobile-money",
    name: "MTN Mobile Money",
    provider: "MTN Zambia",
    rating: 4.3,
    price: "ZMW 2-15 per transaction",
    features: ["Send Money", "Pay Bills", "Buy Airtime", "Merchant Payments"],
    pros: ["Largest network", "Wide acceptance", "Easy registration"],
    cons: ["Higher transaction fees", "Network congestion"],
    badge: "POPULAR",
    category: "mobile-money"
  },
  {
    id: "airtel-money",
    name: "Airtel Money",
    provider: "Airtel Zambia",
    rating: 4.5,
    price: "ZMW 1.5-12 per transaction",
    features: ["Money Transfer", "Bill Payments", "Merchant Pay", "International Transfer"],
    pros: ["Lower fees", "International transfers", "Good customer service"],
    cons: ["Smaller agent network", "Limited in rural areas"],
    badge: "LOW FEES",
    category: "mobile-money"
  },
  {
    id: "motor-insurance-1",
    name: "Comprehensive Motor",
    provider: "Madison Insurance",
    rating: 4.6,
    price: "ZMW 1,200-4,500/year",
    features: ["Comprehensive Cover", "Third Party", "Theft Protection", "24/7 Claims"],
    pros: ["Quick claims processing", "Wide coverage", "Good customer service"],
    cons: ["Higher premiums", "Excess fees apply"],
    badge: "COMPREHENSIVE",
    category: "insurance"
  }
]

export function ComparisonTool() {
  const [selectedCategory, setSelectedCategory] = useState("banking")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const categories = [
    { id: "banking", name: "Banking", icon: Building },
    { id: "mobile-money", name: "Mobile Money", icon: Smartphone },
    { id: "insurance", name: "Insurance", icon: Shield },
    { id: "loans", name: "Loans", icon: CreditCard },
    { id: "investments", name: "Investments", icon: TrendingUp },
    { id: "advisory", name: "Advisory", icon: Users }
  ]

  const filteredItems = comparisonData.filter(item => item.category === selectedCategory)
  const comparisonItems = comparisonData.filter(item => selectedItems.includes(item.id))

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId)
      } else if (prev.length < 3) {
        return [...prev, itemId]
      }
      return prev
    })
  }

  const startComparison = () => {
    if (selectedItems.length >= 2) {
      setShowComparison(true)
    }
  }

  const clearComparison = () => {
    setSelectedItems([])
    setShowComparison(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <GitCompare className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Compare Financial Products</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Compare features, pricing, and benefits to find the best financial products for your needs
        </p>
      </div>

      {!showComparison ? (
        <div className="space-y-6">
          {/* Category Filter */}
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">Select Category</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selection Status */}
          {selectedItems.length > 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">
                      {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected for comparison
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedItems.length >= 2 && (
                      <Button onClick={startComparison} className="bg-green-600 hover:bg-green-700">
                        Compare Selected
                      </Button>
                    )}
                    <Button onClick={clearComparison} variant="outline" className="border-green-200 text-green-600">
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedItems.includes(item.id) 
                    ? "ring-2 ring-blue-500 bg-blue-50" 
                    : "bg-white hover:shadow-md"
                }`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => {}}
                          className="pointer-events-none"
                        />
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{item.provider}</p>
                      <div className="text-lg font-bold text-green-600">{item.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">{item.rating}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Key Features:</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedItems.length > 0 && selectedItems.length < 2 && (
            <div className="text-center py-8">
              <p className="text-slate-600">Select at least 2 products to compare</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Product Comparison</h3>
                  <p className="text-slate-600">Comparing {comparisonItems.length} products side by side</p>
                </div>
                <Button onClick={clearComparison} variant="outline" className="border-blue-200 text-blue-600">
                  Back to Selection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-4 text-left font-medium text-slate-700">Feature</th>
                      {comparisonItems.map((item) => (
                        <th key={item.id} className="p-4 text-center font-medium text-slate-700 min-w-[200px]">
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-600">{item.provider}</p>
                            {item.badge && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700">Price</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-price`} className="p-4 text-center font-bold text-green-600">
                          {item.price}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700">Rating</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-rating`} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700">Features</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-features`} className="p-4">
                          <ul className="space-y-1 text-sm">
                            {item.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700">Pros</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-pros`} className="p-4">
                          <ul className="space-y-1 text-sm text-green-700">
                            {item.pros.map((pro, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700">Cons</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-cons`} className="p-4">
                          <ul className="space-y-1 text-sm text-red-700">
                            {item.cons.map((con, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <X className="h-3 w-3 text-red-500" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-700">Action</td>
                      {comparisonItems.map((item) => (
                        <td key={`${item.id}-action`} className="p-4 text-center">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Choose This Option
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
