import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+260 97 123-4567", "+260 96 987-6543"],
    description: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: ["support@linka.com", "business@linka.com"],
    description: "We respond within 24 hours",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    details: ["Available on website", "Mobile app support"],
    description: "Instant responses during business hours",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["123 Commerce Street", "Business District, Lusaka"],
    description: "Mon-Fri: 9AM-5PM",
    gradient: "from-orange-500 to-red-600",
  },
]

const officeHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
]

export function ContactInfo() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Contact <span className="text-emerald-600">Information</span>
          </h2>
          <p className="text-lg text-slate-600">Multiple ways to reach our friendly support team</p>
        </div>

        <div className="space-y-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <method.icon className="h-6 w-6 text-white group-hover:animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {method.title}
                    </h3>
                    <div className="space-y-1 mb-2">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500">{method.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Office Hours */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 ml-4 text-xl">Office Hours</h3>
            </div>
            <div className="space-y-3">
              {officeHours.map((schedule, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0"
                >
                  <span className="text-slate-700 font-medium">{schedule.day}</span>
                  <span className="text-slate-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-100 to-orange-100 px-6 py-3 text-red-700 border border-red-200/50 shadow-lg backdrop-blur-sm">
            <Headphones className="mr-2 h-5 w-5" />
            <span className="font-medium">Emergency Support: +260 97 999-0000 (24/7)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
