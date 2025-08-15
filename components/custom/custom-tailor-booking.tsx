'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, MapPin, Phone, Mail, Star, CheckCircle2 } from 'lucide-react'

export default function CustomTailorBooking() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTailor, setSelectedTailor] = useState('')

  const tailors = [
    {
      id: 1,
      name: 'Master John Mwanza',
      specialty: 'Traditional & Modern Wear',
      rating: 4.9,
      experience: '15+ years',
      location: 'Lusaka Central',
      price: 'From K150',
      image: '/placeholder.svg',
      available: ['Mon', 'Tue', 'Wed', 'Fri']
    },
    {
      id: 2,
      name: 'Sarah Phiri',
      specialty: 'Women\'s Fashion',
      rating: 4.8,
      experience: '12+ years',
      location: 'Kabulonga',
      price: 'From K120',
      image: '/placeholder.svg',
      available: ['Tue', 'Thu', 'Sat']
    },
    {
      id: 3,
      name: 'Michael Banda',
      specialty: 'Men\'s Suits & Formal',
      rating: 4.7,
      experience: '18+ years',
      location: 'Woodlands',
      price: 'From K200',
      image: '/placeholder.svg',
      available: ['Mon', 'Wed', 'Fri', 'Sat']
    }
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Custom Tailoring Session
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with skilled Zambian tailors for personalized fittings and custom designs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Tailor Selection */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Choose Your Tailor</h3>
            <div className="space-y-4">
              {tailors.map((tailor) => (
                <Card 
                  key={tailor.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedTailor === tailor.id.toString() ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedTailor(tailor.id.toString())}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={tailor.image} 
                        alt={tailor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{tailor.name}</h4>
                          <Badge variant="secondary">{tailor.price}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{tailor.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {tailor.rating}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                            {tailor.experience}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tailor.location}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">Available: </span>
                          {tailor.available.map((day, index) => (
                            <Badge key={index} variant="outline" className="mr-1 text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-blue-600" />
                  Schedule Appointment
                </CardTitle>
                <CardDescription>
                  Select your preferred date and time for the consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <Label>Preferred Time</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+260..." className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                </div>

                {/* Special Requirements */}
                <div>
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Describe your project, measurements needed, fabric preferences, etc."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Service Type */}
                <div>
                  <Label>Service Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Consultation Only
                    </Button>
                    <Button variant="outline" size="sm">
                      Measurement + Design
                    </Button>
                    <Button variant="outline" size="sm">
                      Alterations
                    </Button>
                    <Button variant="outline" size="sm">
                      Custom Creation
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Book Appointment
                </Button>

                {/* Contact Info */}
                <div className="pt-4 border-t text-center text-sm text-gray-500">
                  <p className="mb-2">Need help? Contact us directly:</p>
                  <div className="flex justify-center space-x-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      +260 97 123 4567
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      tailoring@linka.zm
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
