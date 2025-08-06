"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PersonalizedProductCarousel } from "@/components/personalized-product-carousel"
import { VendorShowcase } from "@/components/vendor-showcase"
import { TrendingOffers } from "@/components/trending-offers"
import { ServicesPreviewSection } from "@/components/services-preview-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if user is logged in and not loading
    if (!isLoading && user) {
      const timer = setTimeout(() => {
        if (user.role === 'customer') {
          router.push('/customer-dashboard');
        } else if (user.role === 'retailer') {
          router.push('/retailer-dashboard');
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        <HeroSection />
        <VendorShowcase
          title="Featured Local Vendors"
          subtitle="Support amazing businesses in your community"
          maxVendors={6}
        />
        <ServicesPreviewSection />
        <TrendingOffers maxOffers={6} layout="grid" />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
