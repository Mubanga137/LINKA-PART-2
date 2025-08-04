"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic Tailoring",
    price: "150",
    features: ["Basic alterations", "Standard fit", "2 fittings"]
  },
  {
    name: "Premium Tailoring",
    price: "300",
    features: ["Custom measurements", "Premium materials", "3 fittings", "Style consultation"]
  },
  {
    name: "Luxury Tailoring",
    price: "500",
    features: ["Bespoke design", "Luxury materials", "Unlimited fittings", "Personal designer"]
  }
]

export default function CustomPricing() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Pricing
          </h2>
          <p className="text-gray-600">
            Choose the service level that's right for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className="text-center">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold">ZMW {plan.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
