"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ruler, Info } from "lucide-react"

export function MensSizeGuide() {
  const sizeChart = [
    { size: "S", chest: "86-91", waist: "71-76", hips: "86-91" },
    { size: "M", chest: "97-102", waist: "81-86", hips: "97-102" },
    { size: "L", chest: "107-112", waist: "91-97", hips: "107-112" },
    { size: "XL", chest: "117-122", waist: "102-107", hips: "117-122" },
    { size: "XXL", chest: "127-132", waist: "112-117", hips: "127-132" }
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 mb-4">
            <Ruler className="h-4 w-4 mr-2" />
            Size Guide
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Men's Size Chart
          </h2>
          <p className="text-slate-600">
            Find your perfect fit with our comprehensive size guide
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Measurements (in cm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 font-semibold">Size</th>
                    <th className="py-3 px-4 font-semibold">Chest</th>
                    <th className="py-3 px-4 font-semibold">Waist</th>
                    <th className="py-3 px-4 font-semibold">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((size) => (
                    <tr key={size.size} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">{size.size}</td>
                      <td className="py-3 px-4">{size.chest}</td>
                      <td className="py-3 px-4">{size.waist}</td>
                      <td className="py-3 px-4">{size.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
