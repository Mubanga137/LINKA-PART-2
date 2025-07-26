"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FashionHub } from "@/components/fashion-hub/fashion-hub"
import { FashionStats } from "@/components/fashion-hub/fashion-stats"
import { FashionFunctions } from "@/components/fashion-hub/fashion-functions"
import { FashionTrends } from "@/components/fashion-hub/fashion-trends"
import { FashionCTA } from "@/components/fashion-hub/fashion-cta"

export default function FashionTextilePage() {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <main>
        <FashionHub />
        <FashionStats />
        <FashionFunctions onFunctionSelect={setSelectedFunction} />
        <FashionTrends />
        <FashionCTA />
      </main>

      <Footer />
    </div>
  )
}
