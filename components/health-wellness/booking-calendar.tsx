"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Home,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  User,
  FileText,
  Star,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  price?: number
  type: 'consultation' | 'home-visit' | 'telemedicine'
}

interface BookingData {
  providerId: string
  date: string
  timeSlot: TimeSlot
  serviceType: 'consultation' | 'home-visit' | 'telemedicine'
  patientName: string
  patientAge: string
  patientPhone: string
  symptoms: string
  medicalHistory: string
  urgency: 'routine' | 'urgent' | 'emergency'
  paymentMethod: 'cash' | 'mobile-money' | 'insurance'
  mobileMoneyNumber?: string
  insuranceProvider?: string
}

interface Provider {
  id: string
  name: string
  title: string
  avatar: string
  rating: number
  reviews: number
  pricing: {
    consultation: number
    homeVisit: number
    telemedicine: number
  }
  availability: {
    [date: string]: TimeSlot[]
  }
}

const mockProvider: Provider = {
  id: "dr-mwanza",
  name: "Dr. John Mwanza",
  title: "General Practitioner",
  avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  rating: 4.9,
  reviews: 234,
  pricing: {
    consultation: 150,
    homeVisit: 250,
    telemedicine: 100
  },
  availability: {}
}

// Generate mock availability for the next 14 days
const generateAvailability = (): { [date: string]: TimeSlot[] } => {
  const availability: { [date: string]: TimeSlot[] } = {}
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    
    const timeSlots: TimeSlot[] = []
    const hours = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
    
    hours.forEach((time, index) => {
      const isAvailable = Math.random() > 0.3 // 70% availability
      timeSlots.push({
        id: `${dateString}-${time}`,
        time,
        available: isAvailable,
        type: 'consultation',
        price: mockProvider.pricing.consultation
      })
    })
    
    availability[dateString] = timeSlots
  }
  
  return availability
}

interface BookingCalendarProps {
  provider?: Provider
  onBookingComplete?: (booking: BookingData) => void
}

export function BookingCalendar({ provider = mockProvider, onBookingComplete }: BookingCalendarProps) {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [step, setStep] = useState<'calendar' | 'details' | 'payment' | 'confirmation'>('calendar')
  const [availability, setAvailability] = useState<{ [date: string]: TimeSlot[] }>({})
  const [isLoading, setIsLoading] = useState(false)
  
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    providerId: provider.id,
    patientName: user?.name || '',
    patientPhone: user?.phone || '',
    serviceType: 'consultation',
    urgency: 'routine',
    paymentMethod: 'mobile-money'
  })

  useEffect(() => {
    const generatedAvailability = generateAvailability()
    setAvailability(generatedAvailability)
  }, [])

  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Start from Sunday
    
    const days = []
    const today = new Date()
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      const isCurrentMonth = date.getMonth() === month
      const isPast = date < today
      const isToday = date.toDateString() === today.toDateString()
      const hasAvailability = availability[dateString]?.some(slot => slot.available)
      
      days.push({
        date,
        dateString,
        isCurrentMonth,
        isPast,
        isToday,
        hasAvailability,
        dayNumber: date.getDate()
      })
    }
    
    return days
  }

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
    setBookingData(prev => ({
      ...prev,
      date: selectedDate!,
      timeSlot: slot,
      serviceType: slot.type
    }))
  }

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTimeSlot) return
    
    setIsLoading(true)
    
    // Simulate booking process
    setTimeout(() => {
      setStep('confirmation')
      setIsLoading(false)
      onBookingComplete?.(bookingData as BookingData)
    }, 2000)
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-2xl border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage src={provider.avatar} alt={provider.name} />
                <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{provider.name}</CardTitle>
                <p className="text-blue-100">{provider.title}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-blue-200 ml-1">({provider.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white mb-2">
                Book Appointment
              </Badge>
              <div className="text-sm text-blue-100">
                Step {step === 'calendar' ? '1' : step === 'details' ? '2' : step === 'payment' ? '3' : '4'} of 4
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 'calendar' && (
            <div className="space-y-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Select Date & Time</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-slate-900 min-w-32 text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.isCurrentMonth && !day.isPast && day.hasAvailability && handleDateSelect(day.dateString)}
                      disabled={!day.isCurrentMonth || day.isPast || !day.hasAvailability}
                      className={`
                        aspect-square p-2 text-sm rounded-lg transition-all duration-200 relative
                        ${day.isCurrentMonth 
                          ? day.isPast 
                            ? 'text-slate-300 cursor-not-allowed'
                            : day.hasAvailability
                              ? 'text-slate-900 hover:bg-blue-100 cursor-pointer'
                              : 'text-slate-400 cursor-not-allowed'
                          : 'text-slate-300 cursor-not-allowed'
                        }
                        ${day.isToday ? 'bg-blue-50 border-2 border-blue-500' : ''}
                        ${selectedDate === day.dateString ? 'bg-blue-600 text-white' : ''}
                      `}
                    >
                      {day.dayNumber}
                      {day.hasAvailability && day.isCurrentMonth && !day.isPast && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900">Available Time Slots</h4>
                  
                  {/* Service Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { type: 'consultation' as const, label: 'In-Person Consultation', icon: User, price: provider.pricing.consultation },
                      { type: 'telemedicine' as const, label: 'Video Consultation', icon: Video, price: provider.pricing.telemedicine },
                      { type: 'home-visit' as const, label: 'Home Visit', icon: Home, price: provider.pricing.homeVisit }
                    ].map((service) => {
                      const Icon = service.icon
                      return (
                        <Card
                          key={service.type}
                          className={`cursor-pointer transition-all duration-300 ${
                            bookingData.serviceType === service.type
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => setBookingData(prev => ({ ...prev, serviceType: service.type }))}
                        >
                          <CardContent className="p-4 text-center">
                            <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <h5 className="font-medium text-slate-900 mb-1">{service.label}</h5>
                            <p className="text-sm text-slate-600">ZMW {service.price}</p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Time Slots Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availability[selectedDate]?.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && handleTimeSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`
                          p-3 rounded-lg border text-sm font-medium transition-all duration-200
                          ${slot.available
                            ? selectedTimeSlot?.id === slot.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {slot.time}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedTimeSlot && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setStep('details')}
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8"
                      >
                        Continue to Details
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Appointment Details</h3>
                <Button variant="outline" onClick={() => setStep('calendar')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>

              {/* Appointment Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">Selected Appointment</h4>
                      <p className="text-sm text-slate-600">
                        {selectedDate} at {selectedTimeSlot?.time} • {bookingData.serviceType?.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">
                        ZMW {selectedTimeSlot?.price || provider.pricing.consultation}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Information Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900">Patient Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <Input
                      value={bookingData.patientName || ''}
                      onChange={(e) => setBookingData(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                    <Input
                      value={bookingData.patientAge || ''}
                      onChange={(e) => setBookingData(prev => ({ ...prev, patientAge: e.target.value }))}
                      placeholder="Enter patient's age"
                      type="number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <Input
                      value={bookingData.patientPhone || ''}
                      onChange={(e) => setBookingData(prev => ({ ...prev, patientPhone: e.target.value }))}
                      placeholder="+260-97-xxx-xxxx"
                      type="tel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Urgency Level</label>
                    <Select value={bookingData.urgency} onValueChange={(value: any) => setBookingData(prev => ({ ...prev, urgency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine Check-up</SelectItem>
                        <SelectItem value="urgent">Urgent Care Needed</SelectItem>
                        <SelectItem value="emergency">Emergency Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900">Medical Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Symptoms</label>
                    <Textarea
                      value={bookingData.symptoms || ''}
                      onChange={(e) => setBookingData(prev => ({ ...prev, symptoms: e.target.value }))}
                      placeholder="Describe your current symptoms or concerns..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Medical History</label>
                    <Textarea
                      value={bookingData.medicalHistory || ''}
                      onChange={(e) => setBookingData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                      placeholder="Any relevant medical history, medications, or allergies..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep('payment')}
                  disabled={!bookingData.patientName || !bookingData.patientPhone || !bookingData.symptoms}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Payment Information</h3>
                <Button variant="outline" onClick={() => setStep('details')}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>

              {/* Payment Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Consultation Fee:</span>
                      <span>ZMW {selectedTimeSlot?.price || provider.pricing.consultation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span>ZMW 10</span>
                    </div>
                    <div className="border-t border-green-300 pt-1 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>ZMW {(selectedTimeSlot?.price || provider.pricing.consultation) + 10}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Payment Method</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'mobile-money', label: 'Mobile Money', icon: Phone, popular: true },
                    { value: 'cash', label: 'Cash Payment', icon: DollarSign, popular: false },
                    { value: 'insurance', label: 'Insurance', icon: Shield, popular: false }
                  ].map((method) => {
                    const Icon = method.icon
                    return (
                      <Card
                        key={method.value}
                        className={`cursor-pointer transition-all duration-300 ${
                          bookingData.paymentMethod === method.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-green-300'
                        }`}
                        onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: method.value as any }))}
                      >
                        <CardContent className="p-4 text-center">
                          <Icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <h5 className="font-medium text-slate-900 mb-1">{method.label}</h5>
                          {method.popular && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Most Popular</Badge>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Payment Details */}
                {bookingData.paymentMethod === 'mobile-money' && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-slate-900">Mobile Money Details</h5>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Money Number</label>
                      <Input
                        value={bookingData.mobileMoneyNumber || ''}
                        onChange={(e) => setBookingData(prev => ({ ...prev, mobileMoneyNumber: e.target.value }))}
                        placeholder="+260-97-xxx-xxxx"
                        type="tel"
                      />
                    </div>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        You will receive a push notification to authorize the payment of ZMW {(selectedTimeSlot?.price || provider.pricing.consultation) + 10}.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {bookingData.paymentMethod === 'insurance' && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-slate-900">Insurance Information</h5>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Insurance Provider</label>
                      <Select value={bookingData.insuranceProvider} onValueChange={(value) => setBookingData(prev => ({ ...prev, insuranceProvider: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zsic">ZSIC Health Insurance</SelectItem>
                          <SelectItem value="madison">Madison Insurance</SelectItem>
                          <SelectItem value="professional">Professional Insurance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleBookingSubmit}
                  disabled={isLoading || (bookingData.paymentMethod === 'mobile-money' && !bookingData.mobileMoneyNumber)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Confirm Booking & Pay
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Booking Confirmed!</h3>
                <p className="text-slate-600">
                  Your appointment has been successfully booked with {provider.name}.
                </p>
              </div>

              {/* Booking Details */}
              <Card className="bg-blue-50 border-blue-200 text-left">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Appointment Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="font-medium">Date & Time:</span>
                      <span className="ml-2">{selectedDate} at {selectedTimeSlot?.time}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="font-medium">Provider:</span>
                      <span className="ml-2">{provider.name}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="font-medium">Type:</span>
                      <span className="ml-2 capitalize">{bookingData.serviceType?.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="font-medium">Total Paid:</span>
                      <span className="ml-2">ZMW {(selectedTimeSlot?.price || provider.pricing.consultation) + 10}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs text-slate-600">
                      Booking Reference: <span className="font-mono font-bold">BK-{Date.now().toString().slice(-8)}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>What's Next?</strong><br />
                  • You'll receive a confirmation SMS shortly<br />
                  • The provider will contact you 15 minutes before your appointment<br />
                  • Please arrive 10 minutes early for in-person appointments
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-blue-200 text-blue-600">
                  <FileText className="h-4 w-4 mr-2" />
                  View My Appointments
                </Button>
                <Button 
                  onClick={() => {
                    setStep('calendar')
                    setSelectedDate(null)
                    setSelectedTimeSlot(null)
                  }}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  Book Another Appointment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
