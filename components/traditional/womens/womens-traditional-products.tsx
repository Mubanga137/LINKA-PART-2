"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, ShoppingCart, Eye, Filter, Grid3X3, List, Truck, MapPin, Award } from "lucide-react";
import MobileCheckout from "@/components/checkout/mobile-checkout";

interface WomensTraditionalProduct {
  id: string;
  name: string;
  region: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  occasion: string;
  size: string[];
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  vendor: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  culturalSignificance: string;
  description: string;
}

const womensTraditionalProducts: WomensTraditionalProduct[] = [
  {
    id: "wt-001",
    name: "Royal Lozi Traditional Dress",
    region: "Western Province",
    price: 450.00,
    originalPrice: 550.00,
    rating: 4.9,
    reviews: 187,
    image: "/api/placeholder/400/500",
    category: "Traditional Dresses",
    occasion: "Ceremony",
    size: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    isNew: true,
    isTrending: true,
    vendor: {
      name: "Lozi Heritage Crafts",
      location: "Mongu",
      rating: 4.8,
      verified: true
    },
    culturalSignificance: "Royal ceremonial dress worn during Kuomboka festival",
    description: "Elegant traditional dress representing the royal heritage of the Lozi kingdom."
  },
  {
    id: "wt-002",
    name: "Bemba Wedding Ensemble",
    region: "Northern Province",
    price: 380.00,
    rating: 4.8,
    reviews: 134,
    image: "/api/placeholder/400/500",
    category: "Wedding Attire",
    occasion: "Wedding",
    size: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Bemba Traditional Wear",
      location: "Kasama",
      rating: 4.7,
      verified: true
    },
    culturalSignificance: "Traditional bridal attire with ancestral blessings",
    description: "Beautiful wedding ensemble celebrating Bemba marriage traditions."
  },
  {
    id: "wt-003",
    name: "Tonga Ceremonial Outfit",
    region: "Southern Province",
    price: 320.00,
    rating: 4.7,
    reviews: 98,
    image: "/api/placeholder/400/500",
    category: "Ceremonial Wear",
    occasion: "Cultural Festival",
    size: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
    isTrending: false,
    vendor: {
      name: "Tonga Cultural Heritage",
      location: "Livingstone",
      rating: 4.6,
      verified: true
    },
    culturalSignificance: "Worn during traditional Lwiindi ceremony",
    description: "Authentic Tonga outfit for cultural celebrations and festivals."
  },
  {
    id: "wt-004",
    name: "Ngoni Warrior Princess Attire",
    region: "Eastern Province",
    price: 420.00,
    originalPrice: 480.00,
    rating: 4.8,
    reviews: 76,
    image: "/api/placeholder/400/500",
    category: "Royal Attire",
    occasion: "Cultural Ceremony",
    size: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Ngoni Heritage Crafts",
      location: "Chipata",
      rating: 4.8,
      verified: true
    },
    culturalSignificance: "Represents the strength and beauty of Ngoni women",
    description: "Regal attire inspired by Ngoni warrior princess traditions."
  },
  {
    id: "wt-005",
    name: "Luvale Dance Costume",
    region: "North-Western Province",
    price: 280.00,
    rating: 4.6,
    reviews: 89,
    image: "/api/placeholder/400/500",
    category: "Dance Wear",
    occasion: "Traditional Dance",
    size: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isNew: false,
    isTrending: false,
    vendor: {
      name: "Luvale Arts Collective",
      location: "Zambezi",
      rating: 4.5,
      verified: true
    },
    culturalSignificance: "Traditional dance outfit for Makishi performances",
    description: "Colorful dance costume for traditional Luvale ceremonies."
  },
  {
    id: "wt-006",
    name: "Chewa Traditional Wrapper",
    region: "Central Province",
    price: 180.00,
    rating: 4.7,
    reviews: 156,
    image: "/api/placeholder/400/500",
    category: "Traditional Wraps",
    occasion: "Daily Wear",
    size: ["One Size"],
    inStock: true,
    isNew: false,
    isTrending: true,
    vendor: {
      name: "Central Province Weavers",
      location: "Kabwe",
      rating: 4.6,
      verified: true
    },
    culturalSignificance: "Traditional wrapper with ancestral patterns",
    description: "Versatile traditional wrapper suitable for various occasions."
  }
];

export default function WomensTraditionalProducts() {
  const [products, setProducts] = useState(womensTraditionalProducts);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: WomensTraditionalProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return Number(b.isNew) - Number(a.isNew);
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header with Sort and View Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Women's Traditional Wear</h2>
            <p className="text-gray-600">{sortedProducts.length} authentic pieces available</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-600 text-white">New</Badge>
                    )}
                    {product.isTrending && (
                      <Badge className="bg-orange-600 text-white">Trending</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-600 text-white">Sale</Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${
                        wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                      }`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {product.region}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {product.occasion}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ZMW {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ZMW {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Cultural Significance */}
                  <div className="mb-4 p-2 bg-rose-50 rounded-lg">
                    <p className="text-xs text-rose-700 font-medium">Cultural Significance:</p>
                    <p className="text-xs text-rose-600">{product.culturalSignificance}</p>
                  </div>

                  {/* Vendor Info */}
                  <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{product.vendor.location}</span>
                    </div>
                    {product.vendor.verified && (
                      <Award className="h-3 w-3 text-green-600" />
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{product.vendor.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-rose-600 hover:bg-rose-700"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Truck className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 border z-50"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold">{cartItems.length} items in cart</div>
                <div className="text-sm text-gray-600">
                  ZMW {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </div>
              </div>
              <Button
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Checkout
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Checkout Modal */}
      {isCheckoutOpen && (
        <MobileCheckout
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onUpdateQuantity={(id, quantity) => {
            setCartItems(cartItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            ));
          }}
          onRemoveItem={(id) => {
            setCartItems(cartItems.filter(item => item.id !== id));
          }}
        />
      )}
    </>
  );
}
