"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I get started selling on Linka?",
    answer:
      "Getting started is easy! Simply fill out our retailer application form with your business details, upload the required documents (business registration, ID, etc.), and we'll review your application within 24-48 hours. Once approved, you can immediately start adding products and making sales.",
  },
  {
    question: "What are the fees for selling on Linka?",
    answer:
      "Linka charges no setup fees or monthly subscription costs. We only take a small commission (5-8%) on successful sales, which includes payment processing and delivery services. You only pay when you make money!",
  },
  {
    question: "How do I receive payments from my sales?",
    answer:
      "Payments are processed instantly and can be sent directly to your MTN Mobile Money, Airtel Money account, or bank account. You can choose your preferred payment method in your dashboard settings.",
  },
  {
    question: "What areas does Linka deliver to?",
    answer:
      "We currently deliver across Lusaka and major cities in Zambia including Kitwe, Ndola, Livingstone, and Kabwe. We're constantly expanding our delivery network to reach more customers.",
  },
  {
    question: "Can I sell traditional Zambian products?",
    answer:
      "We encourage and celebrate traditional Zambian crafts, foods, clothing, and cultural items. These products are very popular with our customers and help preserve our rich cultural heritage.",
  },
  {
    question: "How do I handle returns and refunds?",
    answer:
      "Linka has a customer-friendly return policy. If a customer wants to return an item, they contact our support team. We handle the logistics and will work with you to resolve any issues fairly for both you and the customer.",
  },
  {
    question: "Do you provide marketing support?",
    answer:
      "Yes! We offer various marketing tools including featured product placements, seasonal promotions, social media marketing, and access to our marketing resources and guides specifically designed for Zambian businesses.",
  },
  {
    question: "What documents do I need to become a retailer?",
    answer:
      "You'll need: a valid business registration certificate or trading license, your national ID or passport, proof of address, tax clearance certificate (if applicable), and bank account or mobile money details for payments.",
  },
]

export function ResourcesFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Frequently Asked{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Quick answers to common questions about selling on Linka
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-900/5 border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-900 pr-8">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-8 py-4 text-blue-700 border border-blue-200/50 shadow-lg backdrop-blur-sm">
            <span className="text-lg font-medium">Still have questions? </span>
            <button className="ml-2 text-blue-600 hover:text-blue-700 font-bold underline">Contact Support</button>
          </div>
        </div>
      </div>
    </section>
  )
}
