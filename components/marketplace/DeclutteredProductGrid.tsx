"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Store, 
  Heart, 
  Star, 
  MapPin, 
  Shield,
  Truck,
  Zap,
  Package,
  Gift
} from "lucide-react";
import type { Product } from "@/lib/types";

interface DeclutteredProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  priority?: boolean;
  showVisitStore?: boolean;
  index?: number;
}

function DeclutteredProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  priority = false,
  showVisitStore = true,
  index = 0
}: DeclutteredProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => setIsAdding(false), 600);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' transform='translate(180,180)'/%3E%3C/svg%3E";

  const getImageSrc = () => {
    if (imageError) return fallbackImage;
    return product.images[0] || fallbackImage;
  };

  const getStoreSlug = (vendorName: string) => {
    return vendorName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const isFlashSale = product.tags?.includes('flash-sale') || (product as any).hotDeal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="w-full"
    >
      <Link href={`/products/${product.id}`} className="block group">
        <Card className="card-hover overflow-hidden border border-gray-200 bg-white">
          <CardContent className="card-compact-mobile">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 image-skeleton rounded-lg" />
              )}
              
              <Image
                src={getImageSrc()}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              
              {/* Compact Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {(product as any).hotDeal && (
                  <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                    🔥 HOT
                  </Badge>
                )}
                {product.discountPercentage && (
                  <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                    -{product.discountPercentage}%
                  </Badge>
                )}
                {product.freeShipping && (
                  <Badge className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Truck className="h-2.5 w-2.5" />
                    <span className="hidden sm:inline">Free</span>
                  </Badge>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 tap-target-large"
                aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-400'
                  }`}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              {/* Vendor Info - Compact */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {product.vendor.name.charAt(0)}
                </div>
                <span className="truncate flex-1">{product.vendor.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating?.toFixed(1)}</span>
                </div>
              </div>

              {/* Product Name - Truncated */}
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              {/* Price - Emphasized */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  K{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    K{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-green-100 text-green-700 text-xs ml-auto">
                    <Gift className="h-2.5 w-2.5 mr-0.5" />
                    Save K{(product.originalPrice - product.price).toFixed(0)}
                  </Badge>
                )}
              </div>

              {/* Stock Status - Minimal */}
              <div className={`text-xs flex items-center gap-1 ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}>
                <Package className="h-3 w-3" />
                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
                  <span className="text-orange-600 font-medium">
                    ({product.stockQuantity} left)
                  </span>
                )}
              </div>
            </div>

            {/* Streamlined Action Buttons */}
            <div className="mt-3 space-y-2">
              {/* Primary CTA */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 text-sm rounded-lg transition-all tap-target-large disabled:opacity-50"
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Buy Now</span>
                    <span className="sm:hidden">Buy</span>
                  </>
                )}
              </Button>

              {/* Secondary Action - Only if Visit Store is enabled and not flash sale */}
              {showVisitStore && !isFlashSale && (
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600 py-2 text-sm rounded-lg transition-all btn-mobile"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/vendors/${getStoreSlug(product.vendor.name)}`;
                  }}
                >
                  <Store className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Visit Store</span>
                  <span className="sm:hidden">Store</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

interface DeclutteredProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  favorites: Set<string>;
  isLoading?: boolean;
  className?: string;
}

export function DeclutteredProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites,
  isLoading = false,
  className = ""
}: DeclutteredProductGridProps) {
  if (isLoading) {
    return (
      <div className={`product-grid ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl overflow-hidden">
              <div className="aspect-square bg-gray-300" />
              <div className="card-compact-mobile space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
                <div className="h-6 bg-gray-300 rounded w-1/3" />
                <div className="h-8 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or browse categories</p>
      </div>
    );
  }

  return (
    <div className={`product-grid ${className}`}>
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <DeclutteredProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.has(product.id)}
            index={index}
            priority={index < 6}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
