import TextilesHero from "@/components/textiles/textiles-hero";
import TextilesCategories from "@/components/textiles/textiles-categories";
import TextilesFabrics from "@/components/textiles/textiles-fabrics";
import TextilesTailors from "@/components/textiles/textiles-tailors";
import TextilesBooking from "@/components/textiles/textiles-booking";
import TextilesCTA from "@/components/textiles/textiles-cta";

export default function TextilesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TextilesHero />
      <TextilesCategories />
      <TextilesFabrics />
      <TextilesTailors />
      <TextilesBooking />
      <TextilesCTA />
    </div>
  );
}
