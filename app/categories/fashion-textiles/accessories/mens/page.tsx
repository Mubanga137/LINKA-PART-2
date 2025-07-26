import MensAccessoriesHero from "@/components/accessories/mens/mens-accessories-hero";
import MensAccessoriesProducts from "@/components/accessories/mens/mens-accessories-products";
import MensAccessoriesFilters from "@/components/accessories/mens/mens-accessories-filters";
import { Suspense } from "react";

export default function MensAccessoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MensAccessoriesHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <MensAccessoriesFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <MensAccessoriesProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
