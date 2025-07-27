import { EntertainmentHero } from "@/components/industries/entertainment/entertainment-hero"
import { EntertainmentCategories } from "@/components/industries/entertainment/entertainment-categories"
import { FeaturedContent } from "@/components/industries/entertainment/featured-content"
import { TalentMarketplace } from "@/components/industries/entertainment/talent-marketplace"
import { TrendingNow } from "@/components/industries/entertainment/trending-now"
import { CreatorSpotlight } from "@/components/industries/entertainment/creator-spotlight"
import { EntertainmentStats } from "@/components/industries/entertainment/entertainment-stats"

// Static validation items to prevent re-creation on every render
const VALIDATION_ITEMS = [
  { category: "music", imageUrl: "sample-music-url", title: "Music Content" },
  { category: "dj", imageUrl: "sample-dj-url", title: "DJ Services" },
  { category: "comedy", imageUrl: "sample-comedy-url", title: "Comedy Shows" },
  { category: "gaming", imageUrl: "sample-gaming-url", title: "Gaming Events" },
  { category: "dance", imageUrl: "sample-dance-url", title: "Dance Performances" }
]

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <main>
        <EntertainmentHero />
        <EntertainmentCategories />
        <FeaturedContent />
        <TalentMarketplace />
        <TrendingNow />
        <CreatorSpotlight />
        <EntertainmentStats />
      </main>

      {/* Image Validation Component - only shows in development or when errors exist */}
      {process.env.NODE_ENV === 'development' && (
        <EntertainmentImageValidator items={VALIDATION_ITEMS} />
      )}
    </div>
  )
}
