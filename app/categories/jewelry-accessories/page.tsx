import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JewelryHero } from "@/components/categories/jewelry/jewelry-hero"
import { JewelryFilters } from "@/components/categories/jewelry/jewelry-filters"
import { JewelryProducts } from "@/components/categories/jewelry/jewelry-products"
import { JewelryFeatured } from "@/components/categories/jewelry/jewelry-featured"
import { JewelryBrands } from "@/components/categories/jewelry/jewelry-brands"
import { JewelryGiftGuide } from "@/components/categories/jewelry/jewelry-gift-guide"

export default function JewelryAccessoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Header />
      <main>
        <JewelryHero />
        <JewelryFeatured />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <JewelryFilters />
            </div>
            <div className="lg:col-span-3">
              <JewelryProducts />
            </div>
          </div>
        </div>
        <JewelryBrands />
        <JewelryGiftGuide />
      </main>
      <Footer />
    </div>
  )
}
