"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Heart, Minus, Plus, MapPin, Truck, Package } from "lucide-react"
import { CartItem } from "@/lib/types"
import Link from "next/link"

interface CartItemsProps {
  items: CartItem[]
  selectedItems: string[]
  onSelectionChange: (itemIds: string[]) => void
  onQuantityUpdate: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onSaveForLater: (productId: string) => void
}

export function CartItems({
  items,
  selectedItems,
  onSelectionChange,
  onQuantityUpdate,
  onRemoveItem,
  onSaveForLater
}: CartItemsProps) {
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(items.map(item => item.product.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectItem = (productId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, productId])
    } else {
      onSelectionChange(selectedItems.filter(id => id !== productId))
    }
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setUpdatingItems(prev => new Set([...prev, productId]))
    
    // Simulate a small delay for UI feedback
    setTimeout(() => {
      onQuantityUpdate(productId, newQuantity)
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }, 200)
  }

  const isAllSelected = items.length > 0 && selectedItems.length === items.length
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < items.length

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              className={isPartiallySelected ? "data-[state=checked]:bg-slate-500" : ""}
            />
            <h2 className="text-xl font-semibold text-slate-900">
              Shopping Cart ({items.length} item{items.length !== 1 ? 's' : ''})
            </h2>
          </div>
          
          {selectedItems.length > 0 && (
            <Badge variant="secondary">
              {selectedItems.length} selected
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          {items.map((item) => {
            const isSelected = selectedItems.includes(item.product.id)
            const isUpdating = updatingItems.has(item.product.id)
            const itemTotal = item.product.price * item.quantity

            return (
              <div
                key={item.product.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isSelected 
                    ? 'border-emerald-200 bg-emerald-50/50' 
                    : 'border-slate-200 bg-white/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Selection checkbox */}
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => handleSelectItem(item.product.id, checked)}
                    className="mt-2"
                  />

                  {/* Product image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Link href={`/products/${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                    {!item.product.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{item.product.retailerName}</span>
                        </div>

                        {/* Variants */}
                        {item.selectedVariants && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {Object.entries(item.selectedVariants).map(([key, value]) => (
                              value && (
                                <Badge key={key} variant="outline" className="text-xs">
                                  {key}: {value}
                                </Badge>
                              )
                            ))}
                          </div>
                        )}

                        {/* Shipping info */}
                        <div className="flex items-center text-sm text-slate-600 mt-2">
                          <Truck className="h-3 w-3 mr-1" />
                          {item.product.shippingInfo.freeShipping ? (
                            <span className="text-green-600 font-medium">Free shipping</span>
                          ) : (
                            <span>Shipping: ZMW {item.product.shippingInfo.shippingCost}</span>
                          )}
                          <span className="ml-2">• {item.product.shippingInfo.estimatedDays} days</span>
                        </div>

                        {/* Stock status */}
                        {item.product.inStock ? (
                          <div className="flex items-center text-sm text-green-600 mt-1">
                            <Package className="h-3 w-3 mr-1" />
                            {item.product.stockQuantity > 10 ? (
                              <span>In stock</span>
                            ) : (
                              <span>Only {item.product.stockQuantity} left</span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-red-600 mt-1">
                            <Package className="h-3 w-3 mr-1" />
                            <span>Out of stock</span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-slate-900">
                          ZMW {itemTotal.toLocaleString()}
                        </div>
                        {item.product.originalPrice && (
                          <div className="text-sm text-slate-500 line-through">
                            ZMW {(item.product.originalPrice * item.quantity).toLocaleString()}
                          </div>
                        )}
                        <div className="text-sm text-slate-600 mt-1">
                          ZMW {item.product.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity and actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <Select
                            value={item.quantity.toString()}
                            onValueChange={(value) => handleQuantityChange(item.product.id, parseInt(value))}
                            disabled={isUpdating}
                          >
                            <SelectTrigger className="h-8 w-16 border-0 bg-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: Math.min(10, item.product.stockQuantity) }, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity || isUpdating}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {isUpdating && (
                          <span className="text-sm text-slate-500">Updating...</span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSaveForLater(item.product.id)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save for later
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
