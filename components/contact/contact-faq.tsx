"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How quickly do you respond to support requests?",
    answer:
      "We aim to respond to all support requests within 2-4 hours during business hours (8AM-6PM, Monday-Friday). For urgent issues, we offer priority support with response times under 1 hour. Email responses typically come within 24 hours, and our live chat is available during business hours for immediate assistance.",
  },
  {
    question: "What information should I include when contacting support?",
    answer:
      "To help us assist you quickly, please include: your account email or business name, a detailed description of the issue, any error messages you're seeing, screenshots if applicable, and the steps you took before encountering the problem. This helps our team diagnose and resolve issues faster.",
  },
  {
    question: "Do you offer phone support in local languages?",
    answer:
      "Yes! Our support team is fluent in English, Bemba, Nyanja, and Tonga. We understand the importance of communicating in your preferred language, especially when discussing business matters. Just let us know your language preference when you contact us.",
  },
  {
    question: "Can I schedule a call with your team?",
    answer:
      "We offer scheduled consultations for new retailers, business strategy discussions, and technical onboarding sessions. You can book a 30-minute or 60-minute session through our contact form or by calling our main number. We also offer on-site visits for businesses in Lusaka.",
  },
  {
    question: "What are your emergency contact procedures?",
    answer:
      "For critical issues affecting your business operations (payment failures, website downtime, security concerns), call our emergency line at +260 97 999-0000. This line is monitored 24/7. For non-urgent matters, please use our regular support channels during business hours.",
  },
  {
    question: "How can I provide feedback about your service?",
    answer:
      "We value your feedback! You can share suggestions, compliments, or concerns through our contact form, email us at feedback@linka.com, or speak directly with our customer success team. We review all feedback monthly and use it to improve our services.",
  },
  {
    question: "Do you offer training sessions for new users?",
    answer:
      "Yes, we provide comprehensive training for new retailers including: one-on-one onboarding sessions, group workshops held monthly in Lusaka, online video tutorials, and written guides. Training covers everything from setting up your store to advanced marketing strategies.",
  },
  {
    question: "How do I report technical issues or bugs?",
    answer:
      "Report technical issues through our dedicated tech support email (tech@linka.com), use the 'Report Bug' feature in your dashboard, or contact our live chat. Please include browser information, device type, and detailed steps to reproduce the issue. We prioritize bug fixes based on severity and user impact.",
  },
]

export function ContactFAQ() {
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
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Quick answers to common questions about contacting our support team
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-900/5 border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
              >
                <h3 className="text-lg font-bold text-slate-900 pr-8 group-hover:text-emerald-600 transition-colors">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-8 pb-6">
                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-8 py-4 text-emerald-700 border border-emerald-200/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <HelpCircle className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            <span className="text-lg font-medium">Still have questions? </span>
            <button className="ml-2 text-emerald-600 hover:text-emerald-700 font-bold underline">
              Contact our support team
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
