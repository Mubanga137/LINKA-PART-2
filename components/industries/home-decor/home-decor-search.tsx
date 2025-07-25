"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, CreditCard, UserCheck, Headphones, Shield } from "lucide-react"

export function HomeDecorSearch() {
  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1 Guest")

  return (
    <section className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-95"></div>

      <div className="container relative z-10 text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Zambian Stay
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Book verified, affordable accommodations across Zambia. Pay with mobile money, stay with confidence.
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-20">
          <CardContent className="p-8">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Where are you going?"
                    className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Guests</label>
                <select
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-blue-500"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg group"
            >
              <Search className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Search Properties
            </Button>
          </CardContent>
        </Card>

        {/* Why Choose Linka */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Why Choose Linka Home Services?</h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Built specifically for Zambian homes with local payment methods and trusted service providers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="text-center group">
            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <CreditCard className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Mobile Money</h4>
            <p className="opacity-90 leading-relaxed">
              Pay securely with MTN, Airtel, or Zamtel mobile money for all services
            </p>
          </div>

          <div className="text-center group">
            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <UserCheck className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Verified Providers</h4>
            <p className="opacity-90 leading-relaxed">
              All service providers verified with licenses and quality certifications
            </p>
          </div>

          <div className="text-center group">
            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <Headphones className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-semibold mb-3">24/7 Support</h4>
            <p className="opacity-90 leading-relaxed">Local language support in English, Bemba, Nyanja, and Tonga</p>
          </div>

          <div className="text-center group">
            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <Shield className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Quality Guarantee</h4>
            <p className="opacity-90 leading-relaxed">
              Service guarantee with community-based reviews and quality assurance
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
