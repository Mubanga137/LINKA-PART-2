import { CheckCircle, FileText, Store, CreditCard } from "lucide-react"

const requirements = [
  {
    icon: Store,
    title: "Valid Business",
    description: "Registered business or trading license in Zambia",
    items: ["Business registration certificate", "Trading license", "Tax clearance certificate"],
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Required documents for verification",
    items: ["National ID or passport", "Proof of address", "Bank account details"],
  },
  {
    icon: CreditCard,
    title: "Payment Setup",
    description: "Mobile money or bank account for payments",
    items: ["MTN Mobile Money", "Airtel Money", "Bank account (any Zambian bank)"],
  },
]

export function RetailerRequirementsSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
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
              <ul className="space-y-3">
                {requirement.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-8 py-4 text-emerald-700 border border-emerald-200/50 shadow-lg backdrop-blur-sm">
            <CheckCircle className="mr-3 h-6 w-6 text-emerald-600" />
            <span className="text-lg font-medium">Approval typically takes 24-48 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
