import WomensTraditionalHero from "@/components/traditional/womens/womens-traditional-hero";
import WomensTraditionalProducts from "@/components/traditional/womens/womens-traditional-products";
import WomensTraditionalFilters from "@/components/traditional/womens/womens-traditional-filters";
import { Suspense } from "react";

export default function WomensTraditionalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WomensTraditionalHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <WomensTraditionalFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <WomensTraditionalProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
