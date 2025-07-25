import { ShopHeader } from "@/components/shop/shop-header"
import { ShopFilters } from "@/components/shop/shop-filters"
import { ProductGrid } from "@/components/shop/product-grid"
import { ShopStats } from "@/components/shop/shop-stats"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <ShopHeader />
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <ShopStats />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <ShopFilters />
          </aside>
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
