import WomensModernHero from "@/components/modern/womens/womens-modern-hero";
import WomensModernProducts from "@/components/modern/womens/womens-modern-products";
import WomensModernFilters from "@/components/modern/womens/womens-modern-filters";
import { Suspense } from "react";

export default function WomensModernPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WomensModernHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <WomensModernFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <WomensModernProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
