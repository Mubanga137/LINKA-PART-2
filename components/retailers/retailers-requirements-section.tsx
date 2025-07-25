import { CheckCircle, FileText, Store, CreditCard, Clock } from "lucide-react"

const requirements = [
  {
    icon: Store,
    title: "Valid Business",
    description: "Registered business or trading license in Zambia",
    items: [
      "Business registration certificate",
      "Trading license (if applicable)",
      "Tax clearance certificate",
      "PACRA registration",
    ],
    timeframe: "Usually takes 1-2 days to verify",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Required documents for identity verification",
    items: [
      "National ID or passport",
      "Proof of address (utility bill)",
      "Bank account details",
      "Business address verification",
    ],
    timeframe: "Instant verification in most cases",
  },
  {
    icon: CreditCard,
    title: "Payment Setup",
    description: "Mobile money or bank account for receiving payments",
    items: [
      "MTN Mobile Money account",
      "Airtel Money account",
      "Bank account (any Zambian bank)",
      "Valid phone number",
    ],
    timeframe: "Setup completed within hours",
  },
]

export function RetailersRequirementsSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Simple </span>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Requirements
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Getting started is easy. Here's what you need to become a Linka retailer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {requirements.map((requirement, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <requirement.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{requirement.title}</h3>
              <p className="text-slate-600 mb-6">{requirement.description}</p>

              <ul className="space-y-3 mb-6">
                {requirement.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200/50">
                <div className="flex items-center text-emerald-700">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{requirement.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-8 py-4 text-emerald-700 border border-emerald-200/50 shadow-lg backdrop-blur-sm">
            <CheckCircle className="mr-3 h-6 w-6 text-emerald-600" />
            <span className="text-lg font-medium">Complete approval process typically takes 24-48 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
