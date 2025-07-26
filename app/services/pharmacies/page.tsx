"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Pill, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  ShoppingCart,
  Search,
  Filter,
  Truck,
  Shield,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus,
  Heart,
  Package
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  rating: number
  reviews: number
  distance: number
  isOpen: boolean
  openHours: string
  services: string[]
  delivery: boolean
  prescriptionRequired: boolean
  insurance: boolean
}

interface Medication {
  id: string
  name: string
  generic: string
  price: number
  inStock: boolean
  prescriptionRequired: boolean
  category: string
  description: string
  dosage: string
  manufacturer: string
}

const pharmacies: Pharmacy[] = [
  {
    id: "pharmacy-1",
    name: "Link Pharmacy Lusaka",
    address: "Cairo Road, Lusaka Central",
    phone: "+260-97-123-4567",
    rating: 4.8,
    reviews: 234,
    distance: 1.2,
    isOpen: true,
    openHours: "8:00 AM - 8:00 PM",
    services: ["Prescription Filling", "Health Consultation", "Vaccination", "Blood Pressure Check"],
    delivery: true,
    prescriptionRequired: true,
    insurance: true
  },
  {
    id: "pharmacy-2", 
    name: "Medplus Pharmacy",
    address: "Manda Hill Shopping Mall",
    phone: "+260-97-234-5678",
    rating: 4.6,
    reviews: 156,
    distance: 3.4,
    isOpen: true,
    openHours: "9:00 AM - 9:00 PM",
    services: ["Prescription Filling", "OTC Medications", "Health Products", "First Aid"],
    delivery: true,
    prescriptionRequired: true,
    insurance: false
  },
  {
    id: "pharmacy-3",
    name: "Health Plus Pharmacy",
    address: "Crossroads Shopping Center",
    phone: "+260-97-345-6789", 
    rating: 4.7,
    reviews: 189,
    distance: 2.8,
    isOpen: false,
    openHours: "8:30 AM - 7:00 PM",
    services: ["Prescription Filling", "Medical Supplies", "Health Screening"],
    delivery: false,
    prescriptionRequired: true,
    insurance: true
  }
]

const medications: Medication[] = [
  {
    id: "med-1",
    name: "Paracetamol 500mg",
    generic: "Acetaminophen",
    price: 15,
    inStock: true,
    prescriptionRequired: false,
    category: "Pain Relief",
    description: "Pain reliever and fever reducer",
    dosage: "1-2 tablets every 4-6 hours",
    manufacturer: "Pharmanova"
  },
  {
    id: "med-2",
    name: "Amoxicillin 250mg",
    generic: "Amoxicillin",
    price: 45,
    inStock: true,
    prescriptionRequired: true,
    category: "Antibiotics",
    description: "Antibiotic for bacterial infections",
    dosage: "As prescribed by doctor",
    manufacturer: "Medico Labs"
  },
  {
    id: "med-3",
    name: "Vitamin C 1000mg",
    generic: "Ascorbic Acid",
    price: 25,
    inStock: true,
    prescriptionRequired: false,
    category: "Vitamins",
    description: "Immune system support vitamin",
    dosage: "1 tablet daily",
    manufacturer: "HealthVit"
  },
  {
    id: "med-4",
    name: "Lisinopril 10mg",
    generic: "Lisinopril",
    price: 85,
    inStock: false,
    prescriptionRequired: true,
    category: "Blood Pressure",
    description: "ACE inhibitor for high blood pressure",
    dosage: "As prescribed by doctor",
    manufacturer: "CardioMed"
  }
]

export default function PharmaciesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'pharmacies' | 'medications'>('pharmacies')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/services/pharmacies')
      return
    }
    
    if (user.role !== 'customer') {
      router.push('/')
      return
    }
  }, [user, router])

  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.generic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (medId: string) => {
    setCart(prev => ({
      ...prev,
      [medId]: (prev[medId] || 0) + 1
    }))
  }

  const removeFromCart = (medId: string) => {
    setCart(prev => {
      const newCart = {...prev}
      if (newCart[medId] > 1) {
        newCart[medId]--
      } else {
        delete newCart[medId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [medId, quantity]) => {
      const med = medications.find(m => m.id === medId)
      return total + (med ? med.price * quantity : 0)
    }, 0)
  }

  if (!user || user.role !== 'customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pill className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Pharmacies & Medications
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Find nearby pharmacies, order medications, and get expert pharmaceutical advice in Zambia
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex space-x-1 bg-slate-100 rounded-lg p-1 mb-8 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('pharmacies')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'pharmacies'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-2" />
                Find Pharmacies
              </button>
              <button
                onClick={() => setActiveTab('medications')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'medications'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pill className="h-4 w-4 inline mr-2" />
                Browse Medications
              </button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder={activeTab === 'pharmacies' ? "Search pharmacies by name or location..." : "Search medications..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-3 text-lg border-slate-200 focus:border-green-500 rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pharmacies Tab */}
        {activeTab === 'pharmacies' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Emergency Notice */}
              <Alert className="mb-8 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Emergency Medications:</strong> For urgent medication needs, call 991 or visit the nearest hospital pharmacy.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPharmacies.map((pharmacy, index) => (
                  <Card 
                    key={pharmacy.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      {/* Pharmacy Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{pharmacy.name}</h3>
                          <p className="text-sm text-slate-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {pharmacy.address}
                          </p>
                        </div>
                        <Badge 
                          className={`${pharmacy.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {pharmacy.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>

                      {/* Rating & Distance */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-bold">{pharmacy.rating}</span>
                          <span className="ml-1 text-sm text-slate-500">({pharmacy.reviews})</span>
                        </div>
                        <div className="text-sm text-slate-600">{pharmacy.distance}km away</div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 mb-2 font-medium">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {pharmacy.services.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {pharmacy.services.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{pharmacy.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-4 mb-4 text-xs">
                        {pharmacy.delivery && (
                          <div className="flex items-center text-green-600">
                            <Truck className="h-3 w-3 mr-1" />
                            Delivery
                          </div>
                        )}
                        {pharmacy.insurance && (
                          <div className="flex items-center text-blue-600">
                            <Shield className="h-3 w-3 mr-1" />
                            Insurance
                          </div>
                        )}
                      </div>

                      {/* Hours & Contact */}
                      <div className="text-sm text-slate-600 mb-4">
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 mr-2" />
                          {pharmacy.openHours}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {pharmacy.phone}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => setSelectedPharmacy(pharmacy)}
                          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                          disabled={!pharmacy.isOpen}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {pharmacy.isOpen ? 'Order Now' : 'Closed'}
                        </Button>
                        <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {["All", "Pain Relief", "Antibiotics", "Vitamins", "Blood Pressure", "Diabetes", "Heart Disease"].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                    className={selectedCategory === category 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white' 
                      : 'border-slate-200 hover:border-green-300'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Prescription Notice */}
              <Alert className="mb-8 border-amber-200 bg-amber-50">
                <Shield className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Prescription Required:</strong> Some medications require a valid prescription from a licensed healthcare provider.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedications.map((medication, index) => (
                  <Card 
                    key={medication.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      {/* Medication Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{medication.name}</h3>
                          <p className="text-sm text-slate-600">Generic: {medication.generic}</p>
                          <Badge className="mt-1 bg-blue-100 text-blue-800 text-xs">
                            {medication.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-slate-900">ZMW {medication.price}</div>
                          <Badge 
                            className={`text-xs ${medication.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {medication.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-3">{medication.description}</p>

                      {/* Dosage */}
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 font-medium">Dosage:</p>
                        <p className="text-sm text-slate-700">{medication.dosage}</p>
                      </div>

                      {/* Manufacturer */}
                      <div className="mb-4">
                        <p className="text-xs text-slate-500">By {medication.manufacturer}</p>
                      </div>

                      {/* Prescription Warning */}
                      {medication.prescriptionRequired && (
                        <Alert className="mb-4 border-orange-200 bg-orange-50 p-3">
                          <AlertCircle className="h-3 w-3 text-orange-600" />
                          <AlertDescription className="text-xs text-orange-800">
                            Prescription required
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Cart Controls */}
                      <div className="flex items-center justify-between">
                        {cart[medication.id] ? (
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeFromCart(medication.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{cart[medication.id]}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => addToCart(medication.id)}
                              className="w-8 h-8 p-0"
                              disabled={!medication.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => addToCart(medication.id)}
                            disabled={!medication.inStock}
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Cart Summary</h3>
              <Badge className="bg-green-100 text-green-800">
                {Object.values(cart).reduce((a, b) => a + b, 0)} items
              </Badge>
            </div>
            <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
              {Object.entries(cart).map(([medId, quantity]) => {
                const med = medications.find(m => m.id === medId)
                if (!med) return null
                return (
                  <div key={medId} className="flex justify-between text-sm">
                    <span>{med.name} x{quantity}</span>
                    <span>ZMW {med.price * quantity}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold mb-3">
                <span>Total:</span>
                <span>ZMW {getCartTotal()}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <Package className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
