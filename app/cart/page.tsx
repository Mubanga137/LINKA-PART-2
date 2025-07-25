"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CartHeader } from "@/components/cart/cart-header"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"
import { CartRecommendations } from "@/components/cart/cart-recommendations"
import { CartEnhancedFeatures } from "@/components/cart/cart-enhanced-features"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function CartPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [savedItems, setSavedItems] = useState<string[]>([])
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('linka_saved_items')
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing saved items:', error)
      }
    }
  }, [])

  // Save items to localStorage
  useEffect(() => {
    localStorage.setItem('linka_saved_items', JSON.stringify(savedItems))
  }, [savedItems])

  const handleSelectionChange = (itemIds: string[]) => {
    setSelectedItems(itemIds)
  }

  const handleBulkAction = (action: string) => {
    if (action === "remove") {
      selectedItems.forEach(itemId => {
        removeFromCart(itemId)
      })
      setSelectedItems([])
    } else if (action === "save") {
      const newSavedItems = [...savedItems]
      selectedItems.forEach(itemId => {
        if (!newSavedItems.includes(itemId)) {
          newSavedItems.push(itemId)
        }
        removeFromCart(itemId)
      })
      setSavedItems(newSavedItems)
      setSelectedItems([])
    }
  }

  const handleSaveForLater = (productId: string) => {
    if (!savedItems.includes(productId)) {
      setSavedItems([...savedItems, productId])
    }
    removeFromCart(productId)
  }

  const handleMoveToCart = (productId: string) => {
    const item = items.find(item => item.product.id === productId)
    if (item) {
      // Item is already in cart, just remove from saved
      setSavedItems(savedItems.filter(id => id !== productId))
    } else {
      // Need to add back to cart - for now just remove from saved
      setSavedItems(savedItems.filter(id => id !== productId))
    }
  }

  const proceedToCheckout = () => {
    if (!user) {
      router.push('/login?redirect=/checkout')
    } else {
      router.push('/checkout')
    }
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
              <p className="text-xl text-slate-600 mb-8">
                Discover amazing products from local Zambian retailers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {savedItems.length > 0 && (
              <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  You have {savedItems.length} saved item{savedItems.length !== 1 ? 's' : ''}
                </h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Move saved items back to cart logic would go here
                    setSavedItems([])
                  }}
                >
                  View Saved Items
                </Button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <CartHeader totalItems={totalItems} totalPrice={totalPrice} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CartItems
                items={items}
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                onQuantityUpdate={updateQuantity}
                onRemoveItem={removeFromCart}
                onSaveForLater={handleSaveForLater}
              />
              <CartEnhancedFeatures
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                onBulkAction={handleBulkAction}
                savedItems={savedItems}
                onMoveToCart={handleMoveToCart}
                onRemoveSaved={(id) => setSavedItems(savedItems.filter(savedId => savedId !== id))}
              />
            </div>
            <div>
              <CartSummary
                items={items}
                totalPrice={totalPrice}
                onProceedToCheckout={proceedToCheckout}
              />
            </div>
          </div>
          <CartRecommendations currentItems={items} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
