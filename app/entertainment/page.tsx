"use client"

import { useState } from "react"
import { EntertainmentHeader } from "@/components/entertainment/entertainment-header"
import { EntertainmentHero } from "@/components/entertainment/entertainment-hero"
import { GamingSection } from "@/components/entertainment/gaming-section"
import { MoviesSection } from "@/components/entertainment/movies-section"
import { MusicSection } from "@/components/entertainment/music-section"
import { EventsSection } from "@/components/entertainment/events-section"
import { SubscriptionsSection } from "@/components/entertainment/subscriptions-section"
import { EntertainmentFooter } from "@/components/entertainment/entertainment-footer"

export default function EntertainmentPage() {
  const [activeSection, setActiveSection] = useState("all")

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background with animated elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] pointer-events-none" />
      </div>

      <div className="relative z-10">
        <EntertainmentHeader activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {activeSection === "all" && (
          <>
            <EntertainmentHero />
            <GamingSection />
            <MoviesSection />
            <MusicSection />
            <EventsSection />
            <SubscriptionsSection />
          </>
        )}
        
        {activeSection === "gaming" && <GamingSection standalone />}
        {activeSection === "movies" && <MoviesSection standalone />}
        {activeSection === "music" && <MusicSection standalone />}
        {activeSection === "events" && <EventsSection standalone />}
        {activeSection === "subscriptions" && <SubscriptionsSection standalone />}
        
        <EntertainmentFooter />
      </div>
    </div>
  )
}
