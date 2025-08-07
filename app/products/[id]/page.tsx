"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  ArrowLeft,
  Plus,
  Minus,
  MapPin,
  Store,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Calendar,
  Package,
  ThumbsUp,
  ThumbsDown,
  Flag
} from "lucide-react"
import { useCart } from "@/contexts/marketplace-context"
import { Product } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"
import { productService } from "@/services/product-service"

interface Review {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
}

interface ProductDetail extends Product {
  description: string
  features: string[]
  specifications: { [key: string]: string }
  gallery: string[]
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
    totalReviews: number
    responseTime: string
    memberSince: string
    location: string
  }
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingBreakdown: { [key: number]: number }
  relatedProducts: Product[]
  shipping: {
    freeShipping: boolean
    estimatedDays: string
    cost?: number
  }
}

const mockProductDetail: ProductDetail = {
  id: "1",
  name: "Traditional Chitenge Fabric - Premium Quality",
  price: 150.00,
  originalPrice: 200.00,
  image: "/placeholder.svg",
  category: "fashion-textiles",
  tags: ["traditional", "fabric", "chitenge", "zambian"],
  rating: 4.8,
  inStock: true,
  description: "Authentic traditional Chitenge fabric made from premium cotton. Perfect for traditional dresses, modern fashion, or home décor. Each piece tells a story of Zambian heritage and craftsmanship.",
  features: [
    "100% Premium Cotton Material",
    "Traditional Zambian Patterns",
    "Vibrant, Long-lasting Colors",
    "Perfect for Clothing & Décor",
    "Machine Washable",
    "Pre-shrunk Fabric"
  ],
  specifications: {
    "Material": "100% Cotton",
    "Size": "6 yards x 45 inches",
    "Weight": "Medium Weight",
    "Care": "Machine wash cold, tumble dry low",
    "Origin": "Made in Zambia",
    "Pattern": "Traditional Zambian Design"
  },
  gallery: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  seller: {
    id: "seller1",
    name: "Lusaka Fabrics",
    avatar: "/placeholder.svg",
    rating: 4.9,
    totalReviews: 156,
    responseTime: "within 2 hours",
    memberSince: "2022",
    location: "Lusaka, Zambia"
  },
  reviews: [
    {
      id: "1",
      user: {
        name: "Mwila Chanda",
        avatar: "/placeholder.svg",
        initials: "MC"
      },
      rating: 5,
      title: "Excellent quality fabric!",
      comment: "The quality is outstanding and the colors are so vibrant. Perfect for my traditional dress. Highly recommend!",
      date: "2024-11-15",
      helpful: 8,
      verified: true
    },
    {
      id: "2",
      user: {
        name: "Grace Mubanga",
        avatar: "/placeholder.svg",
        initials: "GM"
      },
      rating: 4,
      title: "Beautiful patterns",
      comment: "Love the traditional patterns. Good quality fabric, though shipping took a bit longer than expected.",
      date: "2024-11-10",
      helpful: 5,
      verified: true
    }
  ],
  averageRating: 4.8,
  totalReviews: 23,
  ratingBreakdown: {
    5: 18,
    4: 3,
    3: 1,
    2: 1,
    1: 0
  },
  relatedProducts: [],
  shipping: {
    freeShipping: true,
    estimatedDays: "3-5 business days"
  }
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Load related products
        const related = await productService.getProducts({ 
          category: 'fashion-textiles',
          limit: 4 
        })
        
        setProduct({
          ...mockProductDetail,
          relatedProducts: related.products.slice(0, 4)
        })
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    try {
      addToCart(product, quantity)
      // Show success message or redirect
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    if (!product) return
    
    addToCart(product, quantity)
    router.push('/checkout')
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="aspect-square bg-slate-200 rounded-lg"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-20 h-20 bg-slate-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8 text-center">
          <div className="py-16">
            <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
            <p className="text-slate-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/marketplace')}>
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-2 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <span>•</span>
          <span className="capitalize">{product.category.replace('-', ' ')}</span>
          <span>•</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg border border-slate-200 overflow-hidden">
              <img 
                src={product.gallery[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.gallery.length - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setSelectedImage(selectedImage < product.gallery.length - 1 ? selectedImage + 1 : 0)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-indigo-500' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{product.averageRating}</span>
                </div>
                <span className="text-sm text-slate-600">
                  ({product.totalReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-slate-900">
                  ZMW {product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-slate-500 line-through">
                      ZMW {product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-900">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="flex-1 gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={toggleWishlist}
                  className={`gap-2 ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <Button 
                onClick={handleBuyNow}
                disabled={!product.inStock}
                variant="outline"
                className="w-full"
              >
                Buy Now
              </Button>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-slate-900">
                      {product.shipping.freeShipping ? 'Free Shipping' : `Shipping: ZMW ${product.shipping.cost}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">
                      Estimated delivery: {product.shipping.estimatedDays}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-slate-600">
                      Secure payment & buyer protection
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.totalReviews})</TabsTrigger>
            <TabsTrigger value="seller">Seller Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="font-medium text-slate-900">{key}</span>
                      <span className="text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 mb-2">
                        {product.averageRating}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(product.averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600">{product.totalReviews} reviews</p>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-3">{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Progress 
                            value={(product.ratingBreakdown[rating] / product.totalReviews) * 100} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-slate-600 w-8">
                            {product.ratingBreakdown[rating]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.initials}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-slate-900">{review.user.name}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <h5 className="font-medium text-slate-900 mb-2">{review.title}</h5>
                          <p className="text-slate-600 mb-3">{review.comment}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-slate-500 hover:text-slate-700">
                              <ThumbsUp className="h-3 w-3" />
                              Helpful ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1 text-slate-500 hover:text-slate-700">
                              <Flag className="h-3 w-3" />
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seller" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                    <AvatarFallback className="text-lg">
                      {product.seller.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{product.seller.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="h-3 w-3" />
                          {product.seller.location}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Store className="h-4 w-4" />
                          View Store
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{product.seller.rating}</span>
                        </div>
                        <p className="text-xs text-slate-600">Seller Rating</p>
                      </div>
                      
                      <div>
                        <div className="font-semibold mb-1">{product.seller.totalReviews}</div>
                        <p className="text-xs text-slate-600">Reviews</p>
                      </div>
                      
                      <div>
                        <div className="font-semibold mb-1">{product.seller.responseTime}</div>
                        <p className="text-xs text-slate-600">Response Time</p>
                      </div>
                      
                      <div>
                        <div className="font-semibold mb-1">{product.seller.memberSince}</div>
                        <p className="text-xs text-slate-600">Member Since</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {product.relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600">{relatedProduct.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        ZMW {relatedProduct.price.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
