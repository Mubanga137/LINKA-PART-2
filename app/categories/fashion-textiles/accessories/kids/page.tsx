import KidsAccessoriesHero from "@/components/accessories/kids/kids-accessories-hero";
import KidsAccessoriesProducts from "@/components/accessories/kids/kids-accessories-products";
import KidsAccessoriesFilters from "@/components/accessories/kids/kids-accessories-filters";
import { Suspense } from "react";

export default function KidsAccessoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KidsAccessoriesHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <KidsAccessoriesFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <KidsAccessoriesProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
