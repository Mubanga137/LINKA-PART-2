"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  MapPin,
  Clock,
  Tag,
  Gift,
  Truck,
  Shield,
  CreditCard,
  Plus,
  Minus,
  RotateCcw,
  AlertCircle,
} from "lucide-react"

const savedItems = [
  {
    id: 1,
    name: "Handwoven Chitenge Bag",
    vendor: "Traditional Textiles Co.",
    location: "Kabwe",
    price: 75,
    originalPrice: 95,
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.6,
    inStock: true,
    discount: 21,
  },
  {
    id: 2,
    name: "Zambezi Carved Mask",
    vendor: "River Art Collective",
    location: "Livingstone",
    price: 150,
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Kapenta Fish",
    vendor: "Lake Tanganyika Fisheries",
    location: "Mpulungu",
    price: 45,
    originalPrice: 55,
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.4,
    inStock: false,
    estimatedRestock: "3 days",
  },
]

const recentlyViewed = [
  {
    id: 1,
    name: "Copper Wire Art",
    vendor: "Kitwe Crafters",
    price: 95,
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Traditional Drums",
    vendor: "Cultural Heritage Store",
    price: 280,
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Honey Collection",
    vendor: "Zambian Bee Farms",
    price: 120,
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
  },
]

interface CartEnhancedFeaturesProps {
  selectedItems: number[]
  onSelectionChange: (items: number[]) => void
  onBulkAction: (action: string) => void
}

export function CartEnhancedFeatures({
  selectedItems,
  onSelectionChange,
  onBulkAction,
}: CartEnhancedFeaturesProps) {
  const [activeTab, setActiveTab] = useState("saved")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setAppliedCoupon("welcome10")
      setCouponCode("")
    }
  }

  const moveToCart = (item: any) => {
    // Implementation for moving saved item to cart
    console.log("Moving to cart:", item)
  }

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="bg-blue-50/80 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className="bg-blue-500 text-white">
                  {selectedItems.length} items selected
                </Badge>
                <span className="text-sm text-blue-700">
                  Bulk actions available
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onBulkAction("remove")}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onBulkAction("save")}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save for Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupon/Promo Code */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <Tag className="h-5 w-5 mr-2 text-emerald-600" />
            Promo Code
          </h3>
          <div className="flex space-x-3">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={applyCoupon}
              disabled={!couponCode}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Apply
            </Button>
          </div>
          {appliedCoupon && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-emerald-700 font-medium">
                  Coupon "WELCOME10" applied - 10% off!
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAppliedCoupon(null)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Items & Recently Viewed */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="saved" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Saved Items ({savedItems.length})
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recently Viewed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="mt-6">
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <MapPin className="h-3 w-3" />
                        <span>{item.vendor}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-slate-900">
                          ZMW {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            ZMW {item.originalPrice}
                          </span>
                        )}
                        {item.discount && (
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            {item.discount}% off
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {item.inStock ? (
                        <Button
                          size="sm"
                          onClick={() => moveToCart(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="text-center">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-1">
                            Out of Stock
                          </Badge>
                          {item.estimatedRestock && (
                            <p className="text-xs text-slate-500">
                              Restock in {item.estimatedRestock}
                            </p>
                          )}
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-500 hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 gap-4">
                {recentlyViewed.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item.vendor}</span>
                        <span className="font-bold text-slate-900">
                          ZMW {item.price}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delivery & Security Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-slate-900 mb-1">Free Delivery</h4>
            <p className="text-sm text-slate-600">On orders over ZMW 200</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-medium text-slate-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-slate-600">SSL encrypted checkout</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium text-slate-900 mb-1">Easy Returns</h4>
            <p className="text-sm text-slate-600">30-day return policy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
