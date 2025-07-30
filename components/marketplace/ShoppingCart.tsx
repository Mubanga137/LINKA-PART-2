"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight,
  CreditCard,
  Truck,
  Shield,
  X
} from "lucide-react";
import { useCart } from "@/contexts/marketplace-context";
import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/lib/types";

interface ShoppingCartProps {
  children?: React.ReactNode;
}

export function ShoppingCart({ children }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, updateCartQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();

  const itemCount = getCartItemCount();
  const total = getCartTotal();
  const shipping = total > 100 ? 0 : 15; // Free shipping over ZMW 100
  const tax = total * 0.16; // 16% VAT
  const finalTotal = total + shipping + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  const CartTrigger = children || (
    <Button variant="outline" size="sm" className="relative">
      <ShoppingCart className="h-4 w-4 mr-2" />
      Cart
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {CartTrigger}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[500px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({itemCount})
            </div>
            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-4">Add some products to get started</p>
              <Button onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            {/* Delivery Info */}
            <div className="border-t pt-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {total > 100 ? (
                      "🎉 You qualify for FREE shipping!"
                    ) : (
                      `Add ZMW ${(100 - total).toFixed(2)} more for FREE shipping`
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>ZMW {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `ZMW ${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (16%)</span>
                  <span>ZMW {tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>ZMW {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Link href="/checkout">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;
  const savings = product.originalPrice ? (product.originalPrice - product.price) * quantity : 0;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
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
              <div>
                <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  by {product.vendor.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-gray-400 hover:text-red-600 p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

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
              {savings > 0 && (
                <p className="text-xs text-green-600 font-medium">
                  You save ZMW {savings.toFixed(2)}
                </p>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, quantity - 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, quantity + 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                  disabled={product.stockQuantity ? quantity >= product.stockQuantity : false}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ZMW {itemTotal.toFixed(2)}
                </p>
                {quantity > 1 && (
                  <p className="text-xs text-gray-600">
                    ZMW {product.price.toFixed(2)} each
                  </p>
                )}
              </div>
            </div>

            {/* Stock Warning */}
            {product.stockQuantity && quantity >= product.stockQuantity * 0.8 && (
              <div className="mt-2 text-xs text-orange-600 font-medium">
                Only {product.stockQuantity - quantity + 1} left in stock
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Mini cart for header
export function MiniCart() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <ShoppingCart>
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Button>
    </ShoppingCart>
  );
}
