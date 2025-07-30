"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:hidden">
      {/* Wishlist FAB */}
      <Link href="/wishlist">
        <Button
          size="lg"
          className="w-14 h-14 p-0 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full shadow-xl shadow-pink-500/30 transition-all duration-300 hover:scale-110 mobile-fab relative"
        >
          <Heart className="h-6 w-6" />
          {favorites.length > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {favorites.length}
            </Badge>
          )}
        </Button>
      </Link>

      {/* Cart FAB */}
      <Link href="/cart">
        <Button
          size="lg"
          className="w-14 h-14 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-110 mobile-fab relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </Link>
    </div>
  );
}
