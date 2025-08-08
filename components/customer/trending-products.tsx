"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  TrendingUp,
  ArrowRight,
  Eye,
  Store
} from "lucide-react"
import Link from "next/link"
import { Product } from "@/lib/types"
import { useCart } from "@/contexts/marketplace-context"

interface TrendingProductsProps {
  products: Product[]
  isLoading: boolean
}

export function TrendingProducts({ products, isLoading }: TrendingProductsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addToCart, getItemQuantity } = useCart()

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Trending Now
            </h2>
            <p className="text-xl text-slate-600">
              Popular products from verified sellers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="h-48 bg-slate-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            <TrendingUp className="inline h-8 w-8 mr-2 text-red-500" />
            Trending Now
          </h2>
          <p className="text-xl text-slate-600">
            Popular products from verified sellers
          </p>
        </div>
        
        <Link href="/marketplace?trending=true">
          <div className="hidden md:flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Trending
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card key={product.id} className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-red-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    #{index + 1}
                  </Badge>
                  {product.originalPrice && (
                    <Badge variant="destructive" className="bg-green-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.has(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-slate-600'
                    }`} 
                  />
                </Button>

                {/* Quick view button */}
                <Link href={`/products/${product.id}`}>
                  <Button
                    size="sm"
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-slate-900 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Retailer */}
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{product.retailerName}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-xl font-bold text-emerald-600">
                    ZMW {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ZMW {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {product.inStock ? (
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {getItemQuantity(product.id) > 0 ? (
                        `In Cart (${getItemQuantity(product.id)})`
                      ) : (
                        'Add to Cart'
                      )}
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Out of Stock
                    </Button>
                  )}

                  {/* Visit Store Button */}
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400"
                    asChild
                  >
                    <Link href={`/vendors/${product.retailerName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')}`}>
                      <Store className="h-4 w-4 mr-2" />
                      Visit Store
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-8 text-center">
        <Link href="/marketplace?trending=true">
          <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Trending
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
