"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, Heart, Star, MapPin, ShoppingCart } from "lucide-react"
import Image from "next/image"

const cartItems = [
  {
    id: 1,
    name: "Traditional Chitenge Dress",
    vendor: "Mwamba Fashion House",
    location: "Lusaka Central",
    price: 250,
    originalPrice: 320,
    quantity: 1,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.9,
    inStock: true,
    deliveryTime: "Same day",
  },
  {
    id: 2,
    name: "Copper Wire Elephant Sculpture",
    vendor: "Lusaka Copper Crafts",
    location: "Chilenje",
    price: 180,
    quantity: 2,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.8,
    inStock: true,
    deliveryTime: "2-3 days",
  },
  {
    id: 3,
    name: "Organic Honey Set",
    vendor: "Zambian Bee Farm Co.",
    location: "Woodlands",
    price: 95,
    originalPrice: 120,
    quantity: 1,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.7,
    inStock: false,
    deliveryTime: "5-7 days",
  },
]

export function CartItems() {
  const [items, setItems] = useState(cartItems)
  const [removingItem, setRemovingItem] = useState<number | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setRemovingItem(id)
    setTimeout(() => {
      setItems(items.filter((item) => item.id !== id))
      setRemovingItem(null)
    }, 300)
  }

  const moveToWishlist = (id: number) => {
    // Implement wishlist functionality
    removeItem(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Cart Items</h2>
        <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
          Clear All
        </Button>
      </div>

      {items.map((item, index) => (
        <Card
          key={item.id}
          className={`bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
            removingItem === item.id ? "opacity-50 scale-95" : "hover:-translate-y-1"
          } ${!item.inStock ? "border-orange-200 bg-orange-50/50" : ""}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!item.inStock && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg hover:text-blue-600 transition-colors cursor-pointer">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                        {item.vendor}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveToWishlist(item.id)}
                      className="text-slate-500 hover:text-red-500 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-slate-900">ZMW {item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">ZMW {item.originalPrice}</span>
                      )}
                    </div>
                    {item.originalPrice && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                        Save ZMW {item.originalPrice - item.price}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-slate-100 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || !item.inStock}
                        className="h-8 w-8 p-0 hover:bg-slate-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center border-0 bg-transparent focus:ring-0"
                        disabled={!item.inStock}
                        min="1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={!item.inStock}
                        className="h-8 w-8 p-0 hover:bg-slate-200"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">ZMW {(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Delivery: {item.deliveryTime}</div>
                    </div>
                  </div>
                </div>

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="mt-3 p-3 bg-orange-100 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700 font-medium">
                      This item is currently out of stock. We'll notify you when it's available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h3>
          <p className="text-slate-600 mb-8">Add some amazing products from local Zambian retailers</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  )
}
