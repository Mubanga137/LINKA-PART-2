import CustomTailoringHero from "@/components/custom/custom-tailoring-hero";
import CustomDesignUpload from "@/components/custom/custom-design-upload";
import CustomTailorBooking from "@/components/custom/custom-tailor-booking";
import CustomPortfolio from "@/components/custom/custom-portfolio";
import CustomPricing from "@/components/custom/custom-pricing";
import CustomCTA from "@/components/custom/custom-cta";

export default function CustomTailoringPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomTailoringHero />
      <CustomDesignUpload />
      <CustomTailorBooking />
      <CustomPortfolio />
      <CustomPricing />
      <CustomCTA />
    </div>
  );
}
