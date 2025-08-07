"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MapPin,
  Truck,
  Filter,
  Grid3X3,
  Store,
  List,
  Search
} from "lucide-react"
import { WomensProductFilter } from "../../../app/categories/fashion/womens/page"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  category: string
  size: string[]
  colors: string[]
  vendor: {
    name: string
    location: string
    verified: boolean
  }
  inStock: boolean
  freeShipping: boolean
  newArrival?: boolean
  trending?: boolean
}

interface WomensProductGridProps {
  filters: WomensProductFilter
  sortBy: string
  onFiltersChange: (filters: WomensProductFilter) => void
  onSortChange: (sort: string) => void
}

const womensProducts: Product[] = [
  {
    id: "womens-1",
    name: "Elegant Ankara Print Dress",
    price: 145,
    originalPrice: 190,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    brand: "African Elegance",
    rating: 4.9,
    reviews: 234,
    category: "dresses",
    size: ["XS", "S", "M", "L", "XL"],
    colors: ["Multi-color", "Blue Print", "Red Print"],
    vendor: {
      name: "Heritage Fashion",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    trending: true
  },
  {
    id: "womens-2",
    name: "Business Professional Blazer",
    price: 210,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
    brand: "Executive Women",
    rating: 4.8,
    reviews: 156,
    category: "business",
    size: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal"],
    vendor: {
      name: "Professional Wardrobe",
      location: "Ndola, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "womens-3",
    name: "Handcrafted Copper Jewelry Set",
    price: 85,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
    brand: "Zambian Crafts",
    rating: 4.7,
    reviews: 189,
    category: "accessories",
    size: ["One Size"],
    colors: ["Copper", "Silver", "Gold"],
    vendor: {
      name: "Artisan Jewelry",
      location: "Livingstone, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: false,
    trending: true
  },
  {
    id: "womens-4",
    name: "Silk Blouse with African Trim",
    price: 95,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    brand: "Modern African",
    rating: 4.6,
    reviews: 134,
    category: "tops",
    size: ["XS", "S", "M", "L"],
    colors: ["White", "Cream", "Light Blue"],
    vendor: {
      name: "Contemporary Styles",
      location: "Kitwe, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "womens-5",
    name: "Traditional Chitenge Wrap Dress",
    price: 75,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    brand: "Cultural Heritage",
    rating: 4.8,
    reviews: 298,
    category: "traditional",
    size: ["S", "M", "L", "XL"],
    colors: ["Traditional Blue", "Traditional Red", "Traditional Green"],
    vendor: {
      name: "Heritage Collection",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    trending: false
  },
  {
    id: "womens-6",
    name: "Designer Leather Handbag",
    price: 165,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    brand: "Luxury Leather",
    rating: 4.9,
    reviews: 97,
    category: "accessories",
    size: ["One Size"],
    colors: ["Black", "Brown", "Tan"],
    vendor: {
      name: "Premium Accessories",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    newArrival: false
  }
]

export function WomensProductGrid({ filters, sortBy, onFiltersChange, onSortChange }: WomensProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(womensProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    let filtered = womensProducts

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy])

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-2">
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.newArrival && (
                <Badge className="bg-green-500 text-white">New</Badge>
              )}
              {product.trending && (
                <Badge className="bg-pink-500 text-white">Trending</Badge>
              )}
              {product.freeShipping && (
                <Badge className="bg-blue-500 text-white">
                  <Truck className="h-3 w-3 mr-1" />
                  Free Shipping
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Vendor Badge */}
            {product.vendor.verified && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-slate-700">
                  ✓ Verified
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-2">
              <h3 className="font-semibold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-slate-500">({product.reviews})</span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold text-slate-900">
                ZMW {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through">
                  ZMW {product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-xs text-slate-500 mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              {product.vendor.name}, {product.vendor.location}
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Link href={`/vendors/${product.vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Store className="h-3 w-3 mr-1" />
                    Store
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Women's Fashion Collection
            </h2>
            <p className="text-slate-600">
              {filteredProducts.length} products found
              {filters.category && (
                <span className="capitalize"> in {filters.category}</span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        } gap-6`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  )
}
