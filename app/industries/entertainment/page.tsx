import { EntertainmentHero } from "@/components/industries/entertainment/entertainment-hero"
import { EntertainmentCategories } from "@/components/industries/entertainment/entertainment-categories"

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <main>
        <EntertainmentHero />
        <EntertainmentCategories />
      </main>
    </div>
  )
}
