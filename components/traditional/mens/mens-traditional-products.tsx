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
  Filter,
  Grid3X3,
  List,
  ArrowUpDown
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TraditionalFilter } from "../../../app/categories/fashion-textiles/traditional/mens/page"

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
  region: string
  pattern: string
  size: string[]
  colors: string[]
  vendor: {
    name: string
    location: string
    verified: boolean
  }
  inStock: boolean
  cultural_significance: string
  care_instructions: string[]
}

interface MensTraditionalProductsProps {
  filters: TraditionalFilter
  sortBy: string
  onSortChange: (sort: string) => void
  onAddToCart: (product: Product) => void
  cartItemCount: number
  onCheckout: () => void
}

const mensTraditionalProducts: Product[] = [
  {
    id: "trad-mens-1",
    name: "Royal Bemba Traditional Shirt",
    price: 180,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    brand: "Zambian Heritage",
    rating: 4.9,
    reviews: 87,
    category: "ceremonial",
    region: "Northern Province",
    pattern: "Bemba Traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Royal Blue", "Traditional Red", "Gold Accent"],
    vendor: {
      name: "Cultural Crafts Co.",
      location: "Kasama, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Worn during traditional ceremonies and cultural events in the Bemba community",
    care_instructions: ["Hand wash in cold water", "Air dry only", "Iron on low heat"]
  },
  {
    id: "trad-mens-2",
    name: "Lozi King Traditional Robe",
    price: 320,
    image: "https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=500&fit=crop",
    brand: "Royal Traditions",
    rating: 4.8,
    reviews: 43,
    category: "ceremonial",
    region: "Western Province", 
    pattern: "Lozi Royal",
    size: ["M", "L", "XL"],
    colors: ["Traditional Black", "Royal Gold", "Cultural Brown"],
    vendor: {
      name: "Lozi Heritage Crafts",
      location: "Mongu, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Traditional robe representing Lozi royalty and cultural heritage",
    care_instructions: ["Professional dry clean", "Store hanging", "Handle with care"]
  },
  {
    id: "trad-mens-3",
    name: "Modern Ankara Print Shirt",
    price: 95,
    originalPrice: 125,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    brand: "African Modern",
    rating: 4.6,
    reviews: 156,
    category: "casual",
    region: "Pan-African",
    pattern: "Contemporary Ankara",
    size: ["S", "M", "L", "XL"],
    colors: ["Vibrant Multi", "Blue Pattern", "Earth Tones"],
    vendor: {
      name: "Modern African Styles",
      location: "Lusaka, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Modern interpretation of traditional African prints for everyday wear",
    care_instructions: ["Machine wash cold", "Gentle cycle", "Medium heat iron"]
  },
  {
    id: "trad-mens-4",
    name: "Tonga Traditional Vest",
    price: 145,
    image: "https://images.unsplash.com/photo-1506629905270-d97e6b0e95d2?w=400&h=500&fit=crop",
    brand: "Southern Heritage",
    rating: 4.7,
    reviews: 72,
    category: "formal",
    region: "Southern Province",
    pattern: "Tonga Traditional",
    size: ["S", "M", "L", "XL"],
    colors: ["Earth Brown", "Traditional Tan", "Cultural Beige"],
    vendor: {
      name: "Tonga Cultural Wear",
      location: "Choma, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Traditional vest representing Tonga cultural identity and values",
    care_instructions: ["Hand wash preferred", "Air dry in shade", "Steam iron if needed"]
  },
  {
    id: "trad-mens-5",
    name: "Kaonde Ceremonial Wrap",
    price: 210,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    brand: "Northwestern Heritage",
    rating: 4.9,
    reviews: 34,
    category: "ceremonial",
    region: "Northwestern Province",
    pattern: "Kaonde Traditional",
    size: ["One Size"],
    colors: ["Traditional Orange", "Cultural Red", "Heritage Brown"],
    vendor: {
      name: "Kaonde Cultural Center",
      location: "Solwezi, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Ceremonial wrap used in traditional Kaonde rituals and celebrations",
    care_instructions: ["Gentle hand wash", "Natural air dry", "No direct sunlight"]
  },
  {
    id: "trad-mens-6",
    name: "Chitenge Formal Blazer",
    price: 280,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    brand: "Contemporary Zambian",
    rating: 4.8,
    reviews: 91,
    category: "formal",
    region: "National",
    pattern: "Modern Chitenge",
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Classic Chitenge", "Modern Blue", "Executive Black"],
    vendor: {
      name: "Zambian Fashion House",
      location: "Ndola, Zambia",
      verified: true
    },
    inStock: true,
    cultural_significance: "Modern blazer incorporating traditional chitenge patterns for professional wear",
    care_instructions: ["Professional dry clean recommended", "Steam press", "Store on hangers"]
  }
]

export function MensTraditionalProducts({ 
  filters, 
  sortBy, 
  onSortChange, 
  onAddToCart, 
  cartItemCount, 
  onCheckout 
}: MensTraditionalProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mensTraditionalProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    let filtered = mensTraditionalProducts

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }
    if (filters.region) {
      filtered = filtered.filter(product => product.region === filters.region)
    }
    if (filters.pattern) {
      filtered = filtered.filter(product => product.pattern.includes(filters.pattern))
    }
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
      case "cultural":
        filtered.sort((a, b) => a.region.localeCompare(b.region))
        break
      case "newest":
      default:
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
              <Badge className="bg-orange-500 text-white">
                {product.region}
              </Badge>
              <Badge className="bg-blue-500 text-white">
                Cultural Heritage
              </Badge>
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

            {/* Vendor Verification */}
            {product.vendor.verified && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-slate-700">
                  ✓ Cultural Expert
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-3">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.brand}</p>
              <p className="text-xs text-orange-600 font-medium">{product.pattern}</p>
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

            {/* Cultural Significance */}
            <div className="mb-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <p className="text-xs text-orange-800 font-medium mb-1">Cultural Significance:</p>
              <p className="text-xs text-orange-700">{product.cultural_significance}</p>
            </div>

            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Men's Traditional Collection
          </h2>
          <p className="text-slate-600">
            {filteredProducts.length} authentic pieces found
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          {cartItemCount > 0 && (
            <Button 
              onClick={onCheckout}
              className="bg-orange-600 hover:bg-orange-700 relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cartItemCount})
            </Button>
          )}

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="cultural">By Cultural Region</SelectItem>
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
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      } gap-6`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button size="lg" variant="outline">
          Load More Traditional Wear
        </Button>
      </div>
    </div>
  )
}
