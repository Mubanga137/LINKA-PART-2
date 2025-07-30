"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Store,
  Truck,
  Shield,
  Clock,
  Package,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  AlertCircle
} from "lucide-react";
import { useCart, useFavorites } from "@/contexts/marketplace-context";
import { safeShare, showShareFeedback } from "@/lib/clipboard-utils";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductDetailModalProps {
  product: Product;
  children: React.ReactNode;
}

export function ProductDetailModal({ product, children }: ProductDetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [adding, setAdding] = useState(false);
  
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const currentPrice = selectedVariant?.price || product.price;
  const isInStock = selectedVariant?.inStock ?? product.inStock;
  const stockQuantity = product.stockQuantity || 0;

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const cartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        product,
        variantId: selectedVariant?.id,
        variant: selectedVariant,
        quantity: selectedQuantity,
        addedAt: new Date()
      };
      
      // This would need to be updated to work with the new cart structure
      console.log("Adding to cart:", cartItem);
      setIsOpen(false);
    } finally {
      setAdding(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: `/products/${product.id}`,
        });
      } catch (err) {
        navigator.clipboard?.writeText(window.location.origin + `/products/${product.id}`);
      }
    } else {
      navigator.clipboard?.writeText(window.location.origin + `/products/${product.id}`);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    Featured
                  </Badge>
                )}
                {product.discountPercentage && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    -{product.discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Store className="h-4 w-4" />
                <Link 
                  href={`/vendors/${product.vendor.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {product.vendor.name}
                </Link>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              
              <div className="flex items-center gap-4">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating!) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ZMW {currentPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ZMW {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage && (
                <p className="text-green-600 font-medium">
                  You save ZMW {((product.originalPrice || 0) - currentPrice).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Options:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className="relative"
                    >
                      {Object.entries(variant.attributes).map(([key, value]) => (
                        <span key={key}>{value}</span>
                      ))}
                      {!variant.inStock && (
                        <span className="absolute inset-0 bg-red-500/10 flex items-center justify-center text-red-600 text-xs font-medium">
                          Out of Stock
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {isInStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="font-medium">In Stock</span>
                  {stockQuantity > 0 && stockQuantity <= 10 && (
                    <span className="text-orange-600">
                      (Only {stockQuantity} left)
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {isInStock && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Quantity:</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                      {selectedQuantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="h-10 w-10 p-0"
                      disabled={stockQuantity > 0 && selectedQuantity >= stockQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: ZMW {(currentPrice * selectedQuantity).toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!isInStock || adding}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {adding ? "Adding..." : "Add to Cart"}
              </Button>
              
              <Button variant="outline" className="w-full h-12" asChild>
                <Link href={`/products/${product.id}`}>
                  View Full Details
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              {product.freeShipping && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
              )}
              
              {product.fastDelivery && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Clock className="h-4 w-4" />
                  <span>Fast Delivery</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>Return Policy</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
