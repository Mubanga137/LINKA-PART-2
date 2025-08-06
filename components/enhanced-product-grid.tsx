"use client";

import { motion } from "framer-motion";
import { EnhancedProductCard } from "./enhanced-product-card";

interface ProductGridProps {
  products: any[];
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
  viewMode?: "grid" | "list";
  variant?: "default" | "compact" | "featured";
  showQuickActions?: boolean;
  className?: string;
}

export function EnhancedProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  viewMode = "grid",
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
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    }
  };

  const getGridClasses = () => {
    if (viewMode === "list") {
      return "grid grid-cols-1 gap-6";
    }
    
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-gray-400 border-t-blue-500 rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${getGridClasses()} ${className}`}
      style={{ perspective: 1000 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          custom={index}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <EnhancedProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorited={favorites.includes(product.id)}
            variant={variant}
            showQuickActions={showQuickActions}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
