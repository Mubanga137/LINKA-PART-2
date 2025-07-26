import KidsTraditionalHero from "@/components/traditional/kids/kids-traditional-hero";
import KidsTraditionalProducts from "@/components/traditional/kids/kids-traditional-products";
import KidsTraditionalFilters from "@/components/traditional/kids/kids-traditional-filters";
import { Suspense } from "react";

export default function KidsTraditionalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KidsTraditionalHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <KidsTraditionalFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <KidsTraditionalProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
