"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  ShoppingCart,
  Store
} from "lucide-react"
import Link from "next/link"
import { Product } from "@/contexts/cart-context"

interface RecommendedServicesProps {
  products: Product[]
  isLoading: boolean
}

export function RecommendedServices({ products, isLoading }: RecommendedServicesProps) {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Recommended for You
            </h2>
            <p className="text-xl text-slate-600">
              Based on your interests and activity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="h-32 bg-slate-200 rounded-t-lg"></div>
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
            <Zap className="inline h-8 w-8 mr-2 text-yellow-500" />
            Recommended for You
          </h2>
          <p className="text-xl text-slate-600">
            Based on your interests and activity
          </p>
        </div>
        
        <Link href="/marketplace?recommended=true">
          <div className="hidden md:flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Recommendations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-0">
              {/* Service Image */}
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Recommended Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-yellow-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>

                {/* Delivery/Service Time */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-slate-700">
                    <Clock className="h-3 w-3 mr-1" />
                    {product.shippingInfo.estimatedDays} days
                  </Badge>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Provider */}
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{product.retailerName}, {product.retailerLocation}</span>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-900">{product.rating}</span>
                    <span className="text-sm text-slate-600">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="text-xl font-bold text-emerald-600">
                    ZMW {product.price.toLocaleString()}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-slate-500 line-through">
                      ZMW {product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 text-sm rounded-lg transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Book Service
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 py-2 text-sm rounded-lg transition-all"
                    asChild
                  >
                    <Link href={`/vendors/${product.retailerName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')}`}>
                      <Store className="h-4 w-4 mr-2" />
                      Visit Store
                    </Link>
                  </Button>
                </div>

                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden mt-8 text-center">
        <Link href="/marketplace?recommended=true">
          <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group cursor-pointer">
            View All Recommendations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  )
}
