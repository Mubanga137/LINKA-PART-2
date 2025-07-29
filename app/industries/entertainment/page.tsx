import { EntertainmentHero } from "@/components/industries/entertainment/entertainment-hero"
import { EntertainmentCategories } from "@/components/industries/entertainment/entertainment-categories"
import { FeaturedContent } from "@/components/industries/entertainment/featured-content"
import { GamingEsports } from "@/components/industries/entertainment/gaming-esports"
import { TalentMarketplace } from "@/components/industries/entertainment/talent-marketplace"
import { TrendingNow } from "@/components/industries/entertainment/trending-now"
import { CreatorSpotlight } from "@/components/industries/entertainment/creator-spotlight"
import { EntertainmentStats } from "@/components/industries/entertainment/entertainment-stats"

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <main>
        <EntertainmentHero />
        <EntertainmentCategories />
        <FeaturedContent />
        <GamingEsports />
        <TalentMarketplace />
        <TrendingNow />
        <CreatorSpotlight />
        <EntertainmentStats />
      </main>
    </div>
  )
}
