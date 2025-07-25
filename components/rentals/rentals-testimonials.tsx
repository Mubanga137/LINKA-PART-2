import { Star, Quote, CheckCircle, ThumbsUp } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Chanda Mwamba",
    location: "Kitwe, Zambia",
    rating: 5,
    stayLocation: "Luxury Villa, Kabulonga",
    stayDuration: "3 nights",
    date: "December 2023",
    text: "Absolutely amazing experience! Sarah's villa was exactly as described - spacious, clean, and beautifully decorated. The pool area was perfect for our family gathering. Sarah was incredibly responsive and even arranged airport pickup for us. The location in Kabulonga is excellent, close to shopping centers and restaurants. We felt completely safe and comfortable throughout our stay.",
    helpful: 24,
    verified: true,
    images: 8,
  },
  {
    id: 2,
    name: "Grace Tembo",
    location: "Ndola, Zambia",
    rating: 5,
    stayLocation: "Downtown Apartment, Cairo Road",
    stayDuration: "2 nights",
    date: "November 2023",
    text: "Perfect location for business travel! James's apartment is right in the heart of Lusaka, walking distance to banks, offices, and the main market. The apartment was spotless and had everything I needed - fast WiFi, comfortable bed, and a well-equipped kitchen. James provided excellent local recommendations and was always available via WhatsApp. Great value for money!",
    helpful: 18,
    verified: true,
    images: 5,
  },
  {
    id: 3,
    name: "David Banda",
    location: "Lusaka, Zambia",
    rating: 5,
    stayLocation: "Safari Lodge, Livingstone",
    stayDuration: "4 nights",
    date: "October 2023",
    text: "What an incredible experience at Grace's safari lodge! Waking up to the sounds of nature and having breakfast overlooking the Zambezi River was magical. The lodge is beautifully designed with traditional Zambian elements. Grace organized amazing activities - game drives, sunset cruises, and even a visit to Victoria Falls. The staff was friendly and the food was exceptional. This is authentic Zambian hospitality at its finest!",
    helpful: 31,
    verified: true,
    images: 12,
  },
]

const platformMetrics = [
  { label: "Guest Satisfaction", value: "98.5%", description: "of guests rate their stay 4+ stars" },
  { label: "Response Rate", value: "< 1 hour", description: "average host response time" },
  { label: "Booking Success", value: "99.2%", description: "successful booking completion rate" },
]

export function RentalsTestimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Guest</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hear from travelers who discovered authentic Zambian hospitality through Linka
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-900">{testimonial.rating}.0</span>
                </div>

                {/* Stay Details */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-6 border border-emerald-200/50">
                  <div className="text-emerald-700 font-bold text-sm sm:text-base mb-1">{testimonial.stayLocation}</div>
                  <div className="text-emerald-600 text-xs sm:text-sm">
                    {testimonial.stayDuration} • {testimonial.date}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-700 mb-6 leading-relaxed italic text-sm sm:text-base">"{testimonial.text}"</p>

                {/* Verification & Stats */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {testimonial.verified && (
                    <div className="flex items-center text-xs sm:text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Verified Stay
                    </div>
                  )}
                  <div className="flex items-center text-xs sm:text-sm text-slate-500">
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {testimonial.helpful} found helpful
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">{testimonial.images} photos</div>
                </div>

                {/* Author Info */}
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-slate-500 text-xs sm:text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Metrics */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Platform Excellence
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Consistently delivering exceptional experiences across Zambia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {platformMetrics.map((metric, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white mb-2">{metric.label}</div>
                  <div className="text-sm sm:text-base text-slate-400">{metric.description}</div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 sm:mt-16">
              <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <span className="text-base sm:text-lg font-medium group-hover:animate-pulse">
                  Join thousands of satisfied guests
                </span>
                <span className="ml-2 text-xl sm:text-2xl group-hover:animate-bounce">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
