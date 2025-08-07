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
  Minus,
  Gift
} from "lucide-react";
import type { Product } from "@/lib/types";

interface OptimizedProductCard3DProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  priority?: boolean;
  showVisitStore?: boolean;
  index?: number;
}

export function OptimizedProductCard3D({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  priority = false,
  showVisitStore = true,
  index = 0
}: OptimizedProductCard3DProps) {
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
  
  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 8);
    y.set((event.clientY - centerY) / 8);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    onAddToCart({ ...product, quantity });
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 600);
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

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  const hoverVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.article 
      ref={cardRef}
      className="group relative w-full h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden shadow-xl flex flex-col"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        variants={hoverVariants}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none z-10" />
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={isHovered ? {
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {imageLoading && !imageError && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />
          )}
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full relative z-20"
          >
            <Image
              src={getImageSrc()}
              alt={`${product.name} - ${product.description}`}
              fill
              className={`object-cover transition-all duration-700 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } ${isHovered ? 'brightness-110 contrast-110' : ''}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </motion.div>
          
          {/* Enhanced Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-30">
            <div className="flex flex-col gap-2">
              {(product as any).hotDeal && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-red-400/30">
                    <motion.span
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🔥
                    </motion.span>
                    <span className="ml-1">HOT</span>
                  </Badge>
                </motion.div>
              )}
              
              {product.freeShipping && (
                <motion.div
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-green-400/30">
                    <Truck className="h-3 w-3" />
                    <span>Free Ship</span>
                  </Badge>
                </motion.div>
              )}
              
              {product.featured && !((product as any).hotDeal) && (
                <motion.div
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-blue-400/30">
                    <Zap className="h-3 w-3" />
                    <span>Featured</span>
                  </Badge>
                </motion.div>
              )}
              
              {product.discountPercentage && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-orange-400/30">
                    -{product.discountPercentage}% OFF
                  </Badge>
                </motion.div>
              )}
            </div>
            
            {/* Enhanced Favorite Button */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="sm"
                variant="ghost"
                className="w-12 h-12 p-0 bg-white/20 backdrop-blur-md hover:bg-white/30 text-gray-600 rounded-full shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => onToggleFavorite(product.id)}
                aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
              >
                <motion.div
                  animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                    }`}
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-3 left-3 right-3 flex gap-2 z-30"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 shadow-lg font-semibold text-xs"
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Quick View
                    </Link>
                  </Button>
                </motion.div>
                
                {showVisitStore && !isFlashSale && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/80 text-white border border-blue-400/30 shadow-lg font-semibold text-xs"
                      asChild
                    >
                      <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                        <Store className="h-3 w-3 mr-1" />
                        Store
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Product Content */}
        <div className="p-4 flex-1 flex flex-col relative z-20">
          {/* Vendor Info */}
          <motion.div 
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <motion.div 
                className="w-7 h-7 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {product.vendor.name.charAt(0)}
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {product.vendor.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">Lusaka</span>
                  <Shield className="h-3 w-3 text-green-500 ml-1" />
                </div>
              </div>
            </div>

            {/* Enhanced Rating */}
            <motion.div 
              className="flex items-center gap-1 bg-yellow-50/80 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-200/50"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
              </motion.div>
              <span className="text-xs font-bold text-gray-800">
                {product.rating?.toFixed(1)}
              </span>
            </motion.div>
          </motion.div>

          {/* Product Name */}
          <motion.h3 
            className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h3>

          {/* Price Section */}
          <motion.div 
            className="mb-3 p-2.5 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-baseline gap-2">
              <motion.span 
                className="text-base font-bold text-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                K{product.price.toFixed(2)}
              </motion.span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  K{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <motion.p 
                className="text-xs text-green-600 font-semibold flex items-center gap-1"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="h-3 w-3" />
                Save K{(product.originalPrice - product.price).toFixed(2)}
              </motion.p>
            )}
          </motion.div>

          {/* Stock Status */}
          <motion.div 
            className="mb-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full backdrop-blur-sm ${
              product.inStock 
                ? 'text-green-700 bg-green-50/80 border border-green-200/50' 
                : 'text-red-700 bg-red-50/80 border border-red-200/50'
            }`}>
              <Package className="h-3 w-3" />
              <span className="font-semibold">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
                <motion.span 
                  className="text-orange-600 font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ({product.stockQuantity} left!)
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-2">
            {/* Quantity Selector for larger screens */}
            <div className="hidden sm:flex items-center justify-center gap-3 p-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Minus className="h-3 w-3" />
              </motion.button>
              
              <span className="font-bold text-gray-900 w-6 text-center text-sm">{quantity}</span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Plus className="h-3 w-3" />
              </motion.button>
            </div>

            {/* Buy Now Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || addingToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-sm rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={addingToCart ? {
                    x: ["-100%", "100%"],
                    transition: { duration: 0.8, repeat: Infinity }
                  } : {}}
                />
                
                <AnimatePresence mode="wait">
                  {addingToCart ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </motion.div>
                      Adding...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now{quantity > 1 ? ` (${quantity})` : ''}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-2">
              {showVisitStore && !isFlashSale && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 py-2.5 text-xs rounded-lg transition-all duration-200"
                    asChild
                  >
                    <Link href={`/vendors/${getStoreSlug(product.vendor.name)}`}>
                      <Store className="h-3 w-3 mr-1" />
                      Visit Store
                    </Link>
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={showVisitStore && !isFlashSale ? '' : 'col-span-2'}
              >
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 py-2.5 text-xs rounded-lg transition-all duration-200"
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    <Eye className="h-3 w-3 mr-1" />
                    {showVisitStore && !isFlashSale ? 'Details' : 'View Details'}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 pointer-events-none"
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * 200,
                    y: Math.random() * 300
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [300, -50],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}
