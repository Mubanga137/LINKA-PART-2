"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

export function ContactMap() {
  const [selectedLocation, setSelectedLocation] = useState(0)

  const locations = [
    {
      name: "Main Office",
      address: "123 Commerce Street, Business District",
      city: "Lusaka, Zambia",
      phone: "+260 97 123-4567",
      hours: "Mon-Fri: 8AM-6PM",
      coordinates: { lat: -15.3875, lng: 28.3228 },
    },
    {
      name: "Customer Service Center",
      address: "456 Market Avenue, City Center",
      city: "Lusaka, Zambia",
      phone: "+260 96 987-6543",
      hours: "Mon-Sat: 9AM-5PM",
      coordinates: { lat: -15.4067, lng: 28.2871 },
    },
  ]

  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Visit Our{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Offices
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find us in the heart of Lusaka's business district
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="space-y-6">
            {locations.map((location, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedLocation === index
                    ? "ring-2 ring-emerald-500 shadow-lg bg-white"
                    : "bg-white/80 backdrop-blur-sm hover:bg-white/90"
                }`}
                onClick={() => setSelectedLocation(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg ${
                        selectedLocation === index ? "scale-110 rotate-6" : ""
                      } transition-all duration-300`}
                    >
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-bold mb-2 transition-colors ${
                          selectedLocation === index ? "text-emerald-600" : "text-slate-900"
                        }`}
                      >
                        {location.name}
                      </h3>
                      <p className="text-slate-600 mb-1">{location.address}</p>
                      <p className="text-slate-600 mb-3">{location.city}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-slate-600">
                          <Phone className="h-4 w-4 mr-2 text-emerald-500" />
                          {location.phone}
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                          {location.hours}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg h-full">
              <CardContent className="p-0 h-full">
                <div className="h-full min-h-[400px] bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500/30 rounded-full animate-float"></div>
                    <div className="absolute top-1/2 right-8 w-6 h-6 bg-blue-500/30 rounded-full animate-bounce-slow"></div>
                    <div className="absolute bottom-8 left-1/3 w-10 h-10 bg-purple-500/30 rounded-full animate-pulse-slow"></div>
                  </div>

                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 animate-bounce-in">
                      <MapPin className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{locations[selectedLocation].name}</h3>
                    <p className="text-slate-600 mb-6 max-w-md">
                      Interactive map integration would be implemented here using Google Maps, Mapbox, or similar
                      mapping service.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent"
                      >
                        Street View
                      </Button>
                      <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
