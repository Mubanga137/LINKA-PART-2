"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingCart,
  Star,
  Store,
  Clock,
  ArrowRight,
  TrendingUp,
  Flame,
  Gift,
  Crown
} from "lucide-react";

interface Compact3DCardProps {
  item: {
    id: string;
    name: string;
    vendor?: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    category?: string;
    isNew?: boolean;
    isHot?: boolean;
    isTrending?: boolean;
    discount?: number;
    viewedAt?: string;
    href?: string;
  };
  onAction?: (id: string, action: "cart" | "favorite" | "view") => void;
  variant?: "recent" | "recommended" | "trending" | "deals";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Compact3DCard({
  item,
  onAction,
  variant = "recent",
  size = "md",
  className = ""
}: Compact3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configurations for smooth animations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 30 });
  
  // Scale and glow effects
  const scale = useSpring(1, { stiffness: 400, damping: 30 });
  const glowOpacity = useSpring(0, { stiffness: 400, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const xPos = (event.clientX - centerX) / (rect.width / 2);
    const yPos = (event.clientY - centerY) / (rect.height / 2);
    
    x.set(xPos * 0.5);
    y.set(yPos * 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
    glowOpacity.set(0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    glowOpacity.set(0);
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "recommended":
        return {
          gradient: "from-blue-500/20 to-indigo-500/20",
          border: "border-blue-200",
          badge: { icon: Crown, text: "Recommended", color: "bg-blue-500" }
        };
      case "trending":
        return {
          gradient: "from-green-500/20 to-emerald-500/20",
          border: "border-green-200",
          badge: { icon: TrendingUp, text: "Trending", color: "bg-green-500" }
        };
      case "deals":
        return {
          gradient: "from-red-500/20 to-orange-500/20",
          border: "border-red-200",
          badge: { icon: Flame, text: "Hot Deal", color: "bg-red-500" }
        };
      default:
        return {
          gradient: "from-gray-500/10 to-gray-600/10",
          border: "border-gray-200",
          badge: { icon: Clock, text: "Recent", color: "bg-gray-500" }
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-48 h-56";
      case "lg":
        return "w-80 h-80";
      default:
        return "w-64 h-72";
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${getSizeClasses()} ${className}`}
      style={{
        perspective: 600,
        transformStyle: "preserve-3d"
      }}
      animate={{
        scale,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl blur-xl z-0 bg-gradient-to-br ${styles.gradient}`}
        style={{ opacity: glowOpacity }}
      />

      {/* Main Card */}
      <Card className={`relative h-full bg-white/95 backdrop-blur-xl ${styles.border} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 z-10`}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-40 overflow-hidden rounded-t-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Badge */}
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
              className="absolute top-3 left-3"
            >
              <Badge className={`${styles.badge.color} text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg`}>
                <styles.badge.icon className="h-3 w-3 mr-1" />
                {styles.badge.text}
              </Badge>
            </motion.div>

            {/* Discount Badge */}
            {item.discount && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
                className="absolute top-3 right-3"
              >
                <Badge className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
                  -{item.discount}%
                </Badge>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 right-3"
            >
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                  onClick={() => onAction?.(item.id, "favorite")}
                >
                  <Heart className="h-4 w-4 text-gray-600" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                  onClick={() => onAction?.(item.id, "cart")}
                >
                  <ShoppingCart className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Rating */}
            {item.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{item.rating}</span>
                {item.reviews && (
                  <span className="text-xs text-gray-500">({item.reviews})</span>
                )}
              </div>
            )}

            {/* Name */}
            <motion.h3
              className="font-bold text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors"
              animate={{
                color: isHovered ? "#2563eb" : "#111827"
              }}
            >
              {item.name}
            </motion.h3>

            {/* Vendor */}
            {item.vendor && (
              <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                className="text-lg font-bold text-gray-900"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
              >
                K{item.price}
              </motion.span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  K{item.originalPrice}
                </span>
              )}
            </div>

            {/* Action */}
            <div className="mt-auto">
              <Link href={item.href || `/products/${item.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
                    onClick={() => onAction?.(item.id, "view")}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Time indicator for recent items */}
            {variant === "recent" && item.viewedAt && (
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">{item.viewedAt}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floating indicator */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full z-20"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
    </motion.div>
  );
}
