import AccessoriesHub from "@/components/accessories/accessories-hub";
import AccessoriesCategories from "@/components/accessories/accessories-categories";
import AccessoriesProducts from "@/components/accessories/accessories-products";
import AccessoriesTrends from "@/components/accessories/accessories-trends";
import AccessoriesCTA from "@/components/accessories/accessories-cta";

export default function AccessoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AccessoriesHub />
      <AccessoriesCategories />
      <AccessoriesProducts />
      <AccessoriesTrends />
      <AccessoriesCTA />
    </div>
  );
}
