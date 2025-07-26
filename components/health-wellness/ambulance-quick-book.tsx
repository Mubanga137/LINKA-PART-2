"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Ambulance, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  AlertTriangle, 
  Navigation, 
  DollarSign,
  CheckCircle,
  User,
  Heart,
  Activity,
  Timer,
  Zap
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AmbulanceService {
  id: string
  name: string
  rating: number
  reviews: number
  distance: number
  eta: number
  price: number
  vehicleType: string
  equipment: string[]
  status: 'available' | 'busy' | 'offline'
  driver: {
    name: string
    avatar: string
    phone: string
    experience: number
  }
  realTimeLocation?: {
    lat: number
    lng: number
  }
}

interface EmergencyForm {
  patientName: string
  patientAge: string
  condition: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  pickupAddress: string
  destinationHospital: string
  contactNumber: string
  additionalNotes: string
}

const mockAmbulanceServices: AmbulanceService[] = [
  {
    id: "amb-1",
    name: "Lusaka Emergency Medical Services",
    rating: 4.8,
    reviews: 156,
    distance: 2.3,
    eta: 8,
    price: 150,
    vehicleType: "Advanced Life Support",
    equipment: ["Defibrillator", "Oxygen", "IV Equipment", "Cardiac Monitor"],
    status: "available",
    driver: {
      name: "Dr. John Mwanza",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      phone: "+260-97-123-4567",
      experience: 8
    }
  },
  {
    id: "amb-2", 
    name: "Rapid Response Ambulance",
    rating: 4.6,
    reviews: 89,
    distance: 4.1,
    eta: 12,
    price: 120,
    vehicleType: "Basic Life Support",
    equipment: ["First Aid", "Oxygen", "Stretcher", "Basic Medications"],
    status: "available",
    driver: {
      name: "Nurse Sarah Banda",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      phone: "+260-97-987-6543",
      experience: 5
    }
  },
  {
    id: "amb-3",
    name: "City Medical Transport",
    rating: 4.4,
    reviews: 234,
    distance: 6.8,
    eta: 18,
    price: 100,
    vehicleType: "Patient Transport",
    equipment: ["Wheelchair Access", "Basic First Aid", "Oxygen"],
    status: "busy",
    driver: {
      name: "Moses Tembo",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      phone: "+260-97-456-7890",
      experience: 12
    }
  }
]

export function AmbulanceQuickBook() {
  const { user } = useAuth()
  const [step, setStep] = useState<'form' | 'selecting' | 'booking' | 'tracking'>('form')
  const [selectedService, setSelectedService] = useState<AmbulanceService | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingProgress, setBookingProgress] = useState(0)
  const [estimatedArrival, setEstimatedArrival] = useState<number | null>(null)
  const [formData, setFormData] = useState<EmergencyForm>({
    patientName: user?.name || '',
    patientAge: '',
    condition: '',
    severity: 'medium',
    pickupAddress: '',
    destinationHospital: '',
    contactNumber: user?.phone || '',
    additionalNotes: ''
  })

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-500', description: 'Non-urgent transport' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500', description: 'Stable but needs medical attention' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-500', description: 'Urgent medical condition' },
    { value: 'critical', label: 'Critical Emergency', color: 'bg-red-500', description: 'Life-threatening emergency' }
  ]

  const handleFormSubmit = () => {
    setIsLoading(true)
    setStep('selecting')
    
    // Simulate API call to find available ambulances
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleServiceSelect = (service: AmbulanceService) => {
    setSelectedService(service)
    setStep('booking')
    setIsLoading(true)
    
    // Simulate booking process
    setTimeout(() => {
      setBookingProgress(25)
      setTimeout(() => {
        setBookingProgress(50)
        setTimeout(() => {
          setBookingProgress(75)
          setTimeout(() => {
            setBookingProgress(100)
            setEstimatedArrival(service.eta)
            setStep('tracking')
            setIsLoading(false)
          }, 800)
        }, 800)
      }, 800)
    }, 1000)
  }

  const getSeverityColor = (severity: string) => {
    const level = urgencyLevels.find(l => l.value === severity)
    return level?.color || 'bg-gray-500'
  }

  return (
    <div id="ambulance-booking" className="max-w-6xl mx-auto">
      <Card className="overflow-hidden shadow-2xl border-red-200 bg-gradient-to-br from-white via-red-50/30 to-orange-50/30">
        <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Ambulance className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">🚑 Emergency Ambulance Booking</CardTitle>
                <p className="text-red-100 text-sm">Available 24/7 - Fast response guaranteed</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white font-bold animate-pulse">
              <Activity className="h-3 w-3 mr-1" />
              LIVE
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 'form' && (
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>For immediate life-threatening emergencies, call 991 or 992 directly.</strong> 
                  This booking system is for urgent medical transport and scheduled ambulance services.
                </AlertDescription>
              </Alert>

              {/* Emergency Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Patient Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Patient Name</label>
                    <Input
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Full name of the patient"
                      className="border-slate-200 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                    <Input
                      value={formData.patientAge}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                      placeholder="Patient's age"
                      type="number"
                      className="border-slate-200 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Medical Condition</label>
                    <Textarea
                      value={formData.condition}
                      onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                      placeholder="Describe the medical condition or symptoms..."
                      className="border-slate-200 focus:border-red-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Emergency Level</label>
                    <Select value={formData.severity} onValueChange={(value: any) => setFormData(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger className="border-slate-200 focus:border-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <div>
                                <div className="font-medium">{level.label}</div>
                                <div className="text-xs text-slate-500">{level.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    Location & Contact
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Address</label>
                    <Textarea
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                      placeholder="Full address where ambulance should pick up patient..."
                      className="border-slate-200 focus:border-red-500"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Destination Hospital</label>
                    <Select value={formData.destinationHospital} onValueChange={(value) => setFormData(prev => ({ ...prev, destinationHospital: value }))}>
                      <SelectTrigger className="border-slate-200 focus:border-red-500">
                        <SelectValue placeholder="Select preferred hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uth">University Teaching Hospital (UTH)</SelectItem>
                        <SelectItem value="levy">Levy Mwanawasa Medical University</SelectItem>
                        <SelectItem value="lusaka-general">Lusaka General Hospital</SelectItem>
                        <SelectItem value="bupa">Bupa Medical Centre</SelectItem>
                        <SelectItem value="fairview">Fairview Hospital</SelectItem>
                        <SelectItem value="nearest">Nearest Available Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
                    <Input
                      value={formData.contactNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                      placeholder="+260-97-xxx-xxxx"
                      type="tel"
                      className="border-slate-200 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                    <Textarea
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Any additional information that might be helpful..."
                      className="border-slate-200 focus:border-red-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                <Button
                  onClick={handleFormSubmit}
                  disabled={!formData.patientName || !formData.condition || !formData.pickupAddress}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Ambulance className="h-5 w-5 mr-2" />
                  Find Available Ambulances
                </Button>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 py-3 px-6"
                  onClick={() => window.open('tel:991', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency: 991
                </Button>
              </div>
            </div>
          )}

          {step === 'selecting' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Available Ambulance Services</h3>
                <p className="text-slate-600">
                  Found {mockAmbulanceServices.filter(s => s.status === 'available').length} available services near you
                </p>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                          <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mockAmbulanceServices.map((service) => (
                    <Card 
                      key={service.id} 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        service.status === 'available' 
                          ? 'border-green-200 hover:border-green-300' 
                          : 'border-slate-200 opacity-60'
                      }`}
                      onClick={() => service.status === 'available' && handleServiceSelect(service)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={service.driver.avatar} alt={service.driver.name} />
                                <AvatarFallback>{service.driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                                service.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                              } border-2 border-white`}></div>
                            </div>

                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 text-lg">{service.name}</h4>
                              <p className="text-slate-600 text-sm mb-1">{service.vehicleType}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{service.rating}</span>
                                  <span className="text-slate-500">({service.reviews})</span>
                                </div>
                                <div className="flex items-center space-x-1 text-green-600">
                                  <MapPin className="h-4 w-4" />
                                  <span>{service.distance}km away</span>
                                </div>
                                <div className="flex items-center space-x-1 text-blue-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{service.eta} min ETA</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 mb-1">
                              ZMW {service.price}
                            </div>
                            <Badge 
                              className={`${
                                service.status === 'available' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {service.status === 'available' ? 'Available Now' : 'Busy'}
                            </Badge>
                          </div>
                        </div>

                        {/* Equipment List */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm text-slate-600 mb-2">Equipment Available:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.equipment.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Driver Info */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-slate-600">Driver: </span>
                              <span className="font-medium">{service.driver.name}</span>
                              <span className="text-slate-500 ml-2">({service.driver.experience} years exp.)</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(`tel:${service.driver.phone}`, '_self')
                              }}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 'booking' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Ambulance className="h-10 w-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Booking Your Ambulance</h3>
                <p className="text-slate-600">
                  Confirming your booking with {selectedService?.name}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Progress value={bookingProgress} className="h-3" />
                <p className="text-sm text-slate-500 mt-2">{bookingProgress}% Complete</p>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                {bookingProgress >= 25 && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Booking confirmed</span>
                  </div>
                )}
                {bookingProgress >= 50 && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Driver notified</span>
                  </div>
                )}
                {bookingProgress >= 75 && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Payment processed</span>
                  </div>
                )}
                {bookingProgress >= 100 && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Ambulance dispatched</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'tracking' && selectedService && estimatedArrival && (
            <div className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Ambulance Successfully Booked!</strong> 
                  Your ambulance is on the way and will arrive in approximately {estimatedArrival} minutes.
                </AlertDescription>
              </Alert>

              {/* Live Tracking */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <Navigation className="h-5 w-5 mr-2 text-blue-600" />
                    Live Tracking
                  </h3>
                  <Badge className="bg-green-100 text-green-800 animate-pulse">
                    <Timer className="h-3 w-3 mr-1" />
                    En Route
                  </Badge>
                </div>

                {/* Mock Map Area */}
                <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-green-200/50"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <Ambulance className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-slate-600 font-medium">Live GPS Tracking</p>
                    <p className="text-sm text-slate-500">Ambulance location updates every 30 seconds</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{estimatedArrival} min</div>
                    <div className="text-sm text-slate-600">Estimated Arrival</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedService.distance} km</div>
                    <div className="text-sm text-slate-600">Distance Away</div>
                  </div>
                </div>
              </div>

              {/* Driver & Vehicle Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedService.driver.avatar} alt={selectedService.driver.name} />
                      <AvatarFallback>{selectedService.driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-lg">{selectedService.driver.name}</h4>
                      <p className="text-slate-600">Licensed Paramedic • {selectedService.driver.experience} years experience</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{selectedService.rating}</span>
                        <span className="text-sm text-slate-500">({selectedService.reviews} reviews)</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedService.driver.phone}`, '_self')}
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">Vehicle Details</h5>
                      <p className="text-sm text-slate-600">{selectedService.vehicleType}</p>
                      <p className="text-sm text-slate-500">License: AMB-{selectedService.id.toUpperCase()}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">Booking Details</h5>
                      <p className="text-sm text-slate-600">Service Fee: ZMW {selectedService.price}</p>
                      <p className="text-sm text-slate-500">Booking ID: BK-{Date.now().toString().slice(-6)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    // Mock share location functionality
                    alert('Live location shared with ambulance driver')
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Share Live Location
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel this ambulance booking?')) {
                      setStep('form')
                      setSelectedService(null)
                      setBookingProgress(0)
                      setEstimatedArrival(null)
                    }
                  }}
                >
                  Cancel Booking
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  onClick={() => window.open(`tel:${selectedService.driver.phone}`, '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
