"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";

export function MobileCartWishlistFAB() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  // Show only on shopping-related pages
  const isShoppingPage = pathname?.includes('/marketplace') ||
                        pathname?.includes('/shop') ||
                        pathname?.includes('/products') ||
                        pathname?.includes('/categories');

  // Don't show on cart or wishlist pages themselves
  const hideOnPages = pathname?.includes('/cart') || 
                     pathname?.includes('/wishlist') ||
                     pathname?.includes('/checkout');

  if (!isShoppingPage || hideOnPages) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1
      }}
      className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:hidden"
    >
      {/* Wishlist FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link href="/wishlist">
          <Button
            size="lg"
            className="w-14 h-14 p-0 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full shadow-xl shadow-pink-500/30 transition-all duration-300 mobile-fab relative overflow-hidden"
          >
            {/* Ripple effect background */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              animate={favorites.length > 0 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3, repeat: favorites.length > 0 ? Infinity : 0, repeatDelay: 2 }}
            >
              <Heart className={`h-6 w-6 relative z-10 ${favorites.length > 0 ? 'fill-current' : ''}`} />
            </motion.div>

            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="bg-white text-pink-600 text-xs font-bold px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-pink-500">
                    {favorites.length}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </Link>
      </motion.div>

      {/* Cart FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link href="/cart">
          <Button
            size="lg"
            className="w-14 h-14 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-xl shadow-blue-500/30 transition-all duration-300 mobile-fab relative overflow-hidden"
          >
            {/* Ripple effect background */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              animate={totalItems > 0 ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5, repeat: totalItems > 0 ? Infinity : 0, repeatDelay: 3 }}
            >
              <ShoppingCart className="h-6 w-6 relative z-10" />
            </motion.div>

            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-blue-500">
                    {totalItems}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
