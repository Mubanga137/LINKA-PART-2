"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Upload, Calendar as CalendarIcon, MapPin, Star, Clock, Scissors, Award, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface Tailor {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  price: number;
  image: string;
  availability: string[];
  verified: boolean;
  portfolio: string[];
}

const featuredTailors: Tailor[] = [
  {
    id: "t-001",
    name: "Master James Mulenga",
    specialization: ["Formal Wear", "Traditional Attire", "Wedding Suits"],
    rating: 4.9,
    reviews: 145,
    location: "Lusaka CBD",
    experience: "15+ years",
    price: 150,
    image: "/api/placeholder/200/200",
    availability: ["Morning", "Afternoon"],
    verified: true,
    portfolio: ["/api/placeholder/300/400", "/api/placeholder/300/400", "/api/placeholder/300/400"]
  },
  {
    id: "t-002",
    name: "Sarah Banda",
    specialization: ["Women's Fashion", "Bridal Wear", "Contemporary Designs"],
    rating: 4.8,
    reviews: 92,
    location: "Kabwe",
    experience: "12+ years",
    price: 120,
    image: "/api/placeholder/200/200",
    availability: ["Morning", "Evening"],
    verified: true,
    portfolio: ["/api/placeholder/300/400", "/api/placeholder/300/400"]
  },
  {
    id: "t-003",
    name: "David Phiri",
    specialization: ["Men's Casual", "Business Attire", "Alterations"],
    rating: 4.7,
    reviews: 78,
    location: "Ndola",
    experience: "10+ years",
    price: 100,
    image: "/api/placeholder/200/200",
    availability: ["Afternoon", "Evening"],
    verified: true,
    portfolio: ["/api/placeholder/300/400", "/api/placeholder/300/400"]
  }
];

export default function TextilesBooking() {
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [measurements, setMeasurements] = useState<File[]>([]);
  const [bookingData, setBookingData] = useState({
    service: "",
    timeSlot: "",
    notes: "",
    urgency: "standard"
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMeasurements(prev => [...prev, ...files]);
  };

  const handleBooking = () => {
    // Handle booking submission
    console.log("Booking submitted:", {
      tailor: selectedTailor,
      date,
      measurements,
      bookingData
    });
    setBookingStep(4); // Success step
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-emerald-600 text-white mb-4">Expert Tailoring</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Personal Tailor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with skilled tailors, upload your measurements, and bring your fabric vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tailor Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Tailor</h3>
            
            {featuredTailors.map((tailor, index) => (
              <motion.div
                key={tailor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedTailor?.id === tailor.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
                  }`}
                  onClick={() => setSelectedTailor(tailor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={tailor.image}
                          alt={tailor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {tailor.verified && (
                          <CheckCircle className="absolute -top-1 -right-1 h-5 w-5 text-green-600 bg-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{tailor.name}</h4>
                          {tailor.verified && (
                            <Award className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{tailor.rating}</span>
                          <span className="text-gray-500">({tailor.reviews} reviews)</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {tailor.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Scissors className="h-4 w-4" />
                            {tailor.experience}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tailor.specialization.map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-600">
                            ZMW {tailor.price}/session
                          </span>
                          <div className="flex gap-1">
                            {tailor.availability.map((time) => (
                              <Badge key={time} variant="outline" className="text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {bookingStep === 1 && selectedTailor && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Schedule Appointment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Service Type
                      </label>
                      <Select 
                        value={bookingData.service} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, service: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation & Measurement</SelectItem>
                          <SelectItem value="full-tailoring">Complete Tailoring Service</SelectItem>
                          <SelectItem value="alterations">Alterations & Adjustments</SelectItem>
                          <SelectItem value="design">Custom Design Creation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Preferred Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Time Slot
                      </label>
                      <Select 
                        value={bookingData.timeSlot} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, timeSlot: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedTailor.availability.map((time) => (
                            <SelectItem key={time} value={time.toLowerCase()}>
                              {time} (9:00 AM - 1:00 PM)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Urgency Level
                      </label>
                      <Select 
                        value={bookingData.urgency} 
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, urgency: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (7-14 days)</SelectItem>
                          <SelectItem value="urgent">Urgent (3-7 days) +50%</SelectItem>
                          <SelectItem value="rush">Rush (1-3 days) +100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setBookingStep(2)}
                      disabled={!bookingData.service || !date || !bookingData.timeSlot}
                    >
                      Continue to Measurements
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {bookingStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Measurements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-4">
                        Upload measurement files, photos, or reference images
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="measurement-upload"
                      />
                      <label htmlFor="measurement-upload">
                        <Button variant="outline" asChild>
                          <span>Choose Files</span>
                        </Button>
                      </label>
                    </div>

                    {measurements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Files:</h4>
                        {measurements.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Additional Notes
                      </label>
                      <Textarea
                        placeholder="Any specific requirements, style preferences, or special instructions..."
                        value={bookingData.notes}
                        onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                        className="h-24"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setBookingStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setBookingStep(3)}
                      >
                        Review Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {bookingStep === 3 && selectedTailor && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Tailor:</span>
                        <span>{selectedTailor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Service:</span>
                        <span>{bookingData.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date:</span>
                        <span>{date ? format(date, "PPP") : "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Time:</span>
                        <span>{bookingData.timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Urgency:</span>
                        <span>{bookingData.urgency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Files:</span>
                        <span>{measurements.length} uploaded</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-emerald-600">
                          ZMW {(selectedTailor.price * (bookingData.urgency === 'urgent' ? 1.5 : bookingData.urgency === 'rush' ? 2 : 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setBookingStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleBooking}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {bookingStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center">
                  <CardContent className="p-8">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Booking Confirmed!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your appointment with {selectedTailor?.name} has been scheduled. 
                      You'll receive a confirmation email shortly.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1">
                        View Booking
                      </Button>
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => {
                          setBookingStep(1);
                          setSelectedTailor(null);
                          setDate(undefined);
                          setMeasurements([]);
                        }}
                      >
                        Book Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!selectedTailor && bookingStep === 1 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Scissors className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Tailor to Continue
                  </h3>
                  <p className="text-gray-600">
                    Choose from our verified expert tailors to start your booking
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
