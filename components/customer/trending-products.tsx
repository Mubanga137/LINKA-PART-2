"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Product } from "@/contexts/cart-context"
import { useCart } from "@/contexts/cart-context"
import { InteractiveProductCard } from "@/components/marketplace/InteractiveProductCard"

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
        {products.map((product, index) => {
          // Transform the product data to match the InteractiveProductCard interface
          const transformedProduct = {
            ...product,
            images: [product.image], // Convert single image to array
            vendor: {
              id: product.retailerId || 'unknown',
              name: product.retailerName || 'Unknown Store'
            },
            inStock: product.inStock,
            freeShipping: false, // Add default value
            featured: index < 3, // Mark top 3 as featured
            stockQuantity: undefined,
            hotDeal: false,
            discountPercentage: product.originalPrice ?
              Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) :
              undefined
          };

          return (
            <div key={product.id} className="relative">
              {/* Trending Badge Overlay */}
              <div className="absolute top-2 left-2 z-20">
                <Badge className="bg-red-500 text-white shadow-lg">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  #{index + 1}
                </Badge>
              </div>

              <InteractiveProductCard
                product={transformedProduct}
                onAddToCart={handleAddToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.has(product.id)}
                priority={index < 4} // Prioritize first 4 for LCP
                className="h-full"
              />
            </div>
          );
        })}
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
