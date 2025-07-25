import { CartHeader } from "@/components/cart/cart-header"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"
import { CartRecommendations } from "@/components/cart/cart-recommendations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <CartHeader />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
          <CartRecommendations />
        </div>
      </main>
      <Footer />
    </div>
  )
}
