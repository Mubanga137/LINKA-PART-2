import MensModernHero from "@/components/modern/mens/mens-modern-hero";
import MensModernProducts from "@/components/modern/mens/mens-modern-products";
import MensModernFilters from "@/components/modern/mens/mens-modern-filters";
import { Suspense } from "react";

export default function MensModernPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MensModernHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <MensModernFilters />
            </Suspense>
          </div>
          <div className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <MensModernProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
