"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Truck,
  Clock,
  Package,
  Zap,
  Store,
  ExternalLink,
  Eye,
  Sparkles,
  Shield,
  Plus,
  Minus
} from "lucide-react";
import type { Product } from "@/lib/types";

interface OptimizedProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  priority?: boolean; // For LCP optimization on first few products
  showVisitStore?: boolean; // Control whether to show Visit Store button
}

export function OptimizedProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  priority = false,
  showVisitStore = true
}: OptimizedProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Fallback image URL
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' transform='translate(180,180)'/%3E%3C/svg%3E";

  const getImageSrc = () => {
    if (imageError) return fallbackImage;
    return product.images[0] || fallbackImage;
  };

  // Generate store slug from vendor name
  const getStoreSlug = (vendorName: string) => {
    return vendorName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Check if this is a flash sale item
  const isFlashSale = product.tags?.includes('flash-sale') || (product as any).hotDeal;

  return (
    <article className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 flex flex-col h-full w-full">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 image-skeleton" />
        )}
        
        <Image
          src={getImageSrc()}
          alt={`${product.name} - ${product.description}`}
          fill
          className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 50vw, (orientation: landscape) and (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 25vw"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            {(product as any).hotDeal && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg animate-pulse">
                🔥 HOT DEAL
              </Badge>
            )}
            {product.freeShipping && (
              <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <Truck className="h-3 w-3" />
                <span className="hidden sm:inline">Free Shipping</span>
                <span className="sm:hidden">Free</span>
              </Badge>
            )}
            {product.featured && !((product as any).hotDeal) && (
              <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <Zap className="h-3 w-3" />
                <span className="hidden sm:inline">Top Rated</span>
                <span className="sm:hidden">Top</span>
              </Badge>
            )}
            {product.discountPercentage && (
              <Badge className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                -{product.discountPercentage}%
              </Badge>
            )}
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="w-11 h-11 p-0 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 tap-target-sm focus-visible-enhanced"
            onClick={() => onToggleFavorite(product.id)}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Vendor Info Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {product.vendor.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-900 truncate">
                {product.vendor.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Lusaka</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-semibold text-gray-700">
              {product.rating?.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              K{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                K{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-xs text-green-600 font-medium">
              Save K{(product.originalPrice - product.price).toFixed(2)}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          <div className={`flex items-center gap-1 text-xs ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            <Package className="h-3 w-3" />
            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
              <span className="text-orange-600 ml-1">
                ({product.stockQuantity} left)
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          {/* Buy Now Button */}
          <Button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 tap-target focus-visible-enhanced"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>

          {/* Secondary Buttons Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Visit Store Button - Only show for non-flash-sale items */}
            {showVisitStore && !isFlashSale && (
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 py-2.5 text-xs rounded-lg transition-all duration-200 tap-target focus-visible-enhanced"
                asChild
              >
                <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                  <Store className="h-3 w-3 mr-1" />
                  Visit Store
                </Link>
              </Button>
            )}

            {/* View Details Button */}
            <Button
              variant="outline"
              className={`border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 py-2.5 text-xs rounded-lg transition-all duration-200 tap-target focus-visible-enhanced ${
                showVisitStore && !isFlashSale ? '' : 'col-span-2'
              }`}
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                {showVisitStore && !isFlashSale ? 'Details' : 'View Details'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
