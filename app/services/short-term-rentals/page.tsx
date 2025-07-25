import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RentalsHero } from "@/components/rentals/rentals-hero"
import { RentalsSearch } from "@/components/rentals/rentals-search"
import { RentalsFeatures } from "@/components/rentals/rentals-features"
import { RentalsListings } from "@/components/rentals/rentals-listings"
import { RentalsTestimonials } from "@/components/rentals/rentals-testimonials"
import { RentalsHosting } from "@/components/rentals/rentals-hosting"

export default function ShortTermRentalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Header />
      <main>
        <RentalsHero />
        <RentalsSearch />
        <RentalsFeatures />
        <RentalsListings />
        <RentalsTestimonials />
        <RentalsHosting />
      </main>
      <Footer />
    </div>
  )
}
