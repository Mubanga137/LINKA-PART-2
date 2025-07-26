import ModernFashionHub from "@/components/modern/modern-fashion-hub";
import ModernFashionCategories from "@/components/modern/modern-fashion-categories";
import ModernFashionTrends from "@/components/modern/modern-fashion-trends";
import ModernFashionBrands from "@/components/modern/modern-fashion-brands";
import ModernFashionCTA from "@/components/modern/modern-fashion-cta";

export default function ModernFashionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModernFashionHub />
      <ModernFashionCategories />
      <ModernFashionTrends />
      <ModernFashionBrands />
      <ModernFashionCTA />
    </div>
  );
}
