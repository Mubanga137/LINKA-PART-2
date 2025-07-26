"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Heart,
  ShoppingCart,
  Search,
  ArrowLeft,
  Star,
  Trash2,
  Share2,
  Package,
  Filter,
  Grid3X3,
  List
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart, Product } from "@/contexts/cart-context"
import { productService } from "@/services/product-service"

const mockWishlistItems: Product[] = [
  {
    id: "1",
    name: "Traditional Chitenge Fabric",
    price: 150.00,
    originalPrice: 200.00,
    image: "/placeholder.svg",
    category: "fashion-textiles",
    tags: ["traditional", "fabric"],
    rating: 4.8,
    inStock: true
  },
  {
    id: "2",
    name: "Handmade Copper Jewelry Set",
    price: 250.00,
    image: "/placeholder.svg",
    category: "jewelry-accessories",
    tags: ["handmade", "copper"],
    rating: 4.9,
    inStock: true
  },
  {
    id: "3",
    name: "Organic Zambian Honey",
    price: 80.00,
    originalPrice: 100.00,
    image: "/placeholder.svg",
    category: "food-beverages",
    tags: ["organic", "honey"],
    rating: 4.7,
    inStock: false
  },
  {
    id: "4",
    name: "Traditional Wood Carving",
    price: 320.00,
    image: "/placeholder.svg",
    category: "art-culture",
    tags: ["traditional", "wood"],
    rating: 4.6,
    inStock: true
  }
]

export default function CustomerWishlist() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [filteredItems, setFilteredItems] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/wishlist')
      return
    }
  }, [user, router])

  // Load wishlist items
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWishlistItems(mockWishlistItems)
        setFilteredItems(mockWishlistItems)
      } catch (error) {
        console.error('Error loading wishlist:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadWishlist()
    }
  }, [user])

  // Filter items by search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = wishlistItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems(wishlistItems)
    }
  }, [wishlistItems, searchTerm])

  const removeFromWishlist = (productId: string) => {
    const updated = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(updated)
    setFilteredItems(updated.filter(item =>
      !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ))
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  const moveAllToCart = () => {
    filteredItems.forEach(item => {
      if (item.inStock) {
        addToCart(item, 1)
      }
    })
  }

  const clearWishlist = () => {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      setWishlistItems([])
      setFilteredItems([])
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/customer-dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
                <p className="text-slate-600">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            
            {filteredItems.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={moveAllToCart}
                  className="gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearWishlist}
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Controls */}
        {wishlistItems.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search your wishlist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Items */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-square bg-slate-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {searchTerm ? 'No items found' : 'Your wishlist is empty'}
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm 
                    ? 'Try searching with different keywords' 
                    : 'Start adding products to your wishlist to see them here'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={() => router.push('/marketplace')}>
                    Browse Products
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {viewMode === 'grid' ? (
                    <>
                      {/* Grid View */}
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        
                        {/* Overlay Actions */}
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 hover:bg-white"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 hover:bg-white"
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Stock Status */}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive">Out of Stock</Badge>
                          </div>
                        )}

                        {/* Discount Badge */}
                        {item.originalPrice && item.originalPrice > item.price && (
                          <Badge className="absolute top-2 left-2" variant="destructive">
                            {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-600">{item.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-slate-900">
                            ZMW {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-slate-500 line-through">
                              ZMW {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Heart className="h-3 w-3 fill-current text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List View */
                    <div className="flex gap-4 p-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-600">{item.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-slate-900">
                            ZMW {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <>
                              <span className="text-sm text-slate-500 line-through">
                                ZMW {item.originalPrice.toFixed(2)}
                              </span>
                              <Badge variant="destructive" className="text-xs">
                                {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 justify-center">
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className="whitespace-nowrap"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeFromWishlist(item.id)}
                          className="whitespace-nowrap"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
