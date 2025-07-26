import KidsModernHero from "@/components/modern/kids/kids-modern-hero";
import KidsModernProducts from "@/components/modern/kids/kids-modern-products";
import KidsModernFilters from "@/components/modern/kids/kids-modern-filters";
import { Suspense } from "react";

export default function KidsModernPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KidsModernHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <KidsModernFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <KidsModernProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
