"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

export default function CustomTailorBooking() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-gray-600">
            Schedule a consultation with our expert tailors
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                  <h3 className="font-semibold">Choose Date</h3>
                  <p className="text-sm text-gray-600">Select your preferred date</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                  <h3 className="font-semibold">Select Time</h3>
                  <p className="text-sm text-gray-600">Available time slots</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <User className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                  <h3 className="font-semibold">Choose Tailor</h3>
                  <p className="text-sm text-gray-600">Expert craftsmanship</p>
                </div>
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
