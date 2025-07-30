"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GamingHero } from "@/components/industries/entertainment/gaming-hero"
import { GamingEsports } from "@/components/industries/entertainment/gaming-esports"
import { GamingFeatures } from "@/components/industries/entertainment/gaming-features"

export default function GamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main>
        <GamingHero />
        <GamingEsports />
        <GamingFeatures />
      </main>
      <Footer />
    </div>
  )
}
