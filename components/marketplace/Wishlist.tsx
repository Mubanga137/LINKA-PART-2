"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Heart, 
  ShoppingCart, 
  X,
  Share2,
  Store,
  Star,
  Package
} from "lucide-react";
import { useFavorites, useCart } from "@/contexts/marketplace-context";
import { safeShare, showShareFeedback } from "@/lib/clipboard-utils";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface WishlistProps {
  children?: React.ReactNode;
  products: Product[]; // In a real app, this would be fetched based on favorite IDs
}

export function Wishlist({ children, products }: WishlistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Filter products to only show favorited ones
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: `cart-${Date.now()}`,
      productId: product.id,
      product,
      quantity: 1,
      addedAt: new Date()
    };
    console.log("Adding to cart from wishlist:", cartItem);
  };

  const handleShare = async (product: Product) => {
    const result = await safeShare({
      title: product.name,
      text: product.description,
      url: window.location.origin + `/products/${product.id}`,
    });
    showShareFeedback(result);
  };

  const WishlistTrigger = children || (
    <Button variant="outline" size="sm" className="relative">
      <Heart className="h-4 w-4 mr-2" />
      Wishlist
      {favorites.length > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {favorites.length}
        </Badge>
      )}
    </Button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {WishlistTrigger}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[500px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Wishlist ({favorites.length})
          </SheetTitle>
        </SheetHeader>

        {favoriteProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Save items you love for later</p>
              <Button onClick={() => setIsOpen(false)}>
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {favoriteProducts.map((product) => (
              <WishlistItemCard
                key={product.id}
                product={product}
                onRemove={() => toggleFavorite(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onShare={() => handleShare(product)}
              />
            ))}
          </div>
        )}

        {favoriteProducts.length > 0 && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
              <Button asChild>
                <Link href="/wishlist">View All</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface WishlistItemCardProps {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
  onShare: () => void;
}

function WishlistItemCard({ product, onRemove, onAddToCart, onShare }: WishlistItemCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-opacity ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {product.discountPercentage && (
              <Badge className="absolute -top-1 -right-1 h-5 text-xs bg-red-500">
                -{product.discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Store className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{product.vendor.name}</span>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShare}
                  className="text-gray-400 hover:text-blue-600 p-1 h-auto"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="text-gray-400 hover:text-red-600 p-1 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  ZMW {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ZMW {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage && (
                <p className="text-xs text-green-600 font-medium">
                  {product.discountPercentage}% off
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                onClick={onAddToCart}
                disabled={!product.inStock}
                className="text-xs h-8"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                <Link href={`/products/${product.id}`}>
                  View Details
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mt-2">
              {product.freeShipping && (
                <Badge variant="secondary" className="text-xs">
                  Free Shipping
                </Badge>
              )}
              {product.fastDelivery && (
                <Badge variant="secondary" className="text-xs">
                  Fast Delivery
                </Badge>
              )}
              {product.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Mini wishlist for header
export function MiniWishlist({ products }: { products: Product[] }) {
  const { favorites } = useFavorites();

  return (
    <Wishlist products={products}>
      <Button variant="ghost" size="sm" className="relative">
        <Heart className="h-5 w-5" />
        {favorites.length > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {favorites.length}
          </Badge>
        )}
      </Button>
    </Wishlist>
  );
}
