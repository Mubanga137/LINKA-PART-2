"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";

interface ProductGridProps {
  products: any[];
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
  variant?: "default" | "compact" | "featured";
  showQuickActions?: boolean;
  className?: string;
}

export function SimpleProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  variant = "default",
  showQuickActions = true,
  className = ""
}: ProductGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getGridClasses = () => {
    switch (variant) {
      case "compact":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6";
      case "featured":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
  };

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${getGridClasses()} ${className}`}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Special badges */}
            {product.isRecommended && (
              <Badge className="absolute top-4 left-4 bg-blue-500 text-white">
                AI Pick
              </Badge>
            )}
            {product.isHotDeal && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Hot Deal
              </Badge>
            )}
            {product.discount && (
              <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            
            {/* Favorite button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite?.(product.id)}
              className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/90 rounded-full shadow-lg hover:bg-white"
              style={{ marginTop: product.discount ? "3rem" : "0" }}
            >
              <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {product.type}
              </Badge>
            </div>

            {/* Product name */}
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Vendor */}
            <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-gray-900">K{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  K{product.originalPrice}
                </span>
              )}
            </div>

            {/* Action button */}
            <Button
              onClick={() => onAddToCart?.(product.id)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              disabled={product.type === "product" ? !product.inStock : !product.available}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.type === "product" ? 
                (product.inStock ? 'Add to Cart' : 'Out of Stock') :
                (product.available ? 'Book Now' : 'Unavailable')
              }
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
