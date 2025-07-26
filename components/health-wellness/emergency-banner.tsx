"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Ambulance, AlertTriangle, X, MapPin } from "lucide-react"

export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Emergency Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Emergency Message */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    🚨 Medical Emergency? Call Now!
                  </h3>
                  <p className="text-red-100 text-sm">
                    24/7 Emergency services available. Don't wait - get help immediately.
                  </p>
                </div>

                {/* Emergency Actions */}
                <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
                  {/* Emergency Call Button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white text-red-600 hover:bg-red-50 font-bold border-2 border-white hover:scale-105 transition-all duration-300 animate-pulse"
                    onClick={() => window.open('tel:991', '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call 991
                  </Button>

                  {/* Ambulance Booking */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-red-600 font-medium hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      document.getElementById('ambulance-booking')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      })
                    }}
                  >
                    <Ambulance className="h-4 w-4 mr-2" />
                    Book Ambulance
                  </Button>

                  {/* Find Hospital */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 font-medium hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Hospital
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-white hover:bg-white/20 rounded-full p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Emergency Numbers */}
        <div className="mt-4 pt-4 border-t border-red-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-red-100">Police Emergency:</span>
              <span className="font-bold">991</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-red-100">Fire Emergency:</span>
              <span className="font-bold">993</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-red-100">Medical Emergency:</span>
              <span className="font-bold">992</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
