"use client"

import { Button } from "@/components/ui/button"

export default function CustomCTA() {
  return (
    <div className="bg-indigo-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Book your consultation today and let us create something amazing for you
        </p>
        <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
          Start Your Project
        </Button>
      </div>
    </div>
  )
}
