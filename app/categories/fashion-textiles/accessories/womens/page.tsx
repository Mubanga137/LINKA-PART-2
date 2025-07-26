import WomensAccessoriesHero from "@/components/accessories/womens/womens-accessories-hero";
import WomensAccessoriesProducts from "@/components/accessories/womens/womens-accessories-products";
import WomensAccessoriesFilters from "@/components/accessories/womens/womens-accessories-filters";
import { Suspense } from "react";

export default function WomensAccessoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WomensAccessoriesHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <WomensAccessoriesFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <WomensAccessoriesProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
