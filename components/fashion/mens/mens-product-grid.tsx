"use client"

import { memo, useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MapPin,
  Truck,
  Filter,
  Grid3X3,
  List,
  Search,
  Store
} from "lucide-react"
import { ProductFilter } from "../../../app/categories/fashion/mens/page"

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

interface MensProductGridProps {
  filters: ProductFilter
  sortBy: string
  onFiltersChange: (filters: ProductFilter) => void
  onSortChange: (sort: string) => void
}

const mensProducts: Product[] = [
  {
    id: "mens-1",
    name: "Executive Business Suit",
    price: 580,
    originalPrice: 720,
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=500&fit=crop",
    brand: "Zambian Gentleman",
    rating: 4.9,
    reviews: 156,
    category: "formal",
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Charcoal", "Black"],
    vendor: {
      name: "Executive Tailors",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "mens-2",
    name: "Premium Cotton Dress Shirt",
    price: 95,
    originalPrice: 125,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    brand: "Urban Professional",
    rating: 4.7,
    reviews: 203,
    category: "formal",
    size: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Navy"],
    vendor: {
      name: "Shirt Masters",
      location: "Ndola, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    trending: true
  },
  {
    id: "mens-3",
    name: "Casual Chino Pants",
    price: 75,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    brand: "Comfort Zone",
    rating: 4.6,
    reviews: 167,
    category: "casual",
    size: ["30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    vendor: {
      name: "Casual Corner",
      location: "Kitwe, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: false,
    newArrival: false
  },
  {
    id: "mens-4",
    name: "Luxury Leather Watch",
    price: 320,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
    brand: "Timepiece Elite",
    rating: 4.8,
    reviews: 89,
    category: "accessories",
    size: ["One Size"],
    colors: ["Brown", "Black"],
    vendor: {
      name: "Watch Gallery",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    trending: true
  },
  {
    id: "mens-5",
    name: "Traditional Ankara Shirt",
    price: 85,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    brand: "African Heritage",
    rating: 4.9,
    reviews: 234,
    category: "traditional",
    size: ["S", "M", "L", "XL"],
    colors: ["Multi-print", "Blue Pattern", "Red Pattern"],
    vendor: {
      name: "Cultural Styles",
      location: "Livingstone, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    newArrival: true
  },
  {
    id: "mens-6",
    name: "Leather Dress Shoes",
    price: 210,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop",
    brand: "Step Forward",
    rating: 4.7,
    reviews: 123,
    category: "footwear",
    size: ["39", "40", "41", "42", "43", "44"],
    colors: ["Black", "Brown"],
    vendor: {
      name: "Shoe Palace",
      location: "Ndola, Zambia",
      verified: true
    },
    inStock: true,
    freeShipping: true,
    trending: false
  }
]

export const MensProductGrid = memo(function MensProductGrid({ filters, sortBy, onFiltersChange, onSortChange }: MensProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mensProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = mensProducts

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

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply other filters
    if (filters.size) {
      filtered = filtered.filter(product => product.size.includes(filters.size!))
    }

    if (filters.color) {
      filtered = filtered.filter(product => 
        product.colors.some(color => color.toLowerCase().includes(filters.color!.toLowerCase()))
      )
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand)
    }

    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!)
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
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
  }, [filters, sortBy, searchQuery])

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
                <Badge className="bg-orange-500 text-white">Trending</Badge>
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
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <Link href={`/vendors/${product.vendor.id || 'unknown'}`}>
                    <Store className="h-4 w-4 mr-1" />
                    Visit Store
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Men's Fashion Collection
            </h2>
            <p className="text-slate-600">
              {filteredProducts.length} products found
              {filters.category && (
                <span className="capitalize"> in {filters.category}</span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

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

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0"
            >
              <Card className="p-6 sticky top-6">
                <h3 className="font-semibold text-slate-900 mb-6">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Price Range (ZMW)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value)
                      onFiltersChange({
                        ...filters,
                        priceRange: { min: value[0], max: value[1] }
                      })
                    }}
                    max={1000}
                    min={0}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>ZMW {priceRange[0]}</span>
                    <span>ZMW {priceRange[1]}</span>
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Size</Label>
                  <Select onValueChange={(value) => onFiltersChange({ ...filters, size: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">Small (S)</SelectItem>
                      <SelectItem value="M">Medium (M)</SelectItem>
                      <SelectItem value="L">Large (L)</SelectItem>
                      <SelectItem value="XL">Extra Large (XL)</SelectItem>
                      <SelectItem value="XXL">2XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    onFiltersChange({})
                    setSearchQuery("")
                    setPriceRange([0, 1000])
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
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
        </div>
      </div>
    </section>
  )
})
