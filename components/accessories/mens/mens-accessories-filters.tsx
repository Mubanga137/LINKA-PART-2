"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function MensAccessoriesFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Watches',
            'Wallets & Belts',
            'Sunglasses',
            'Bags & Briefcases',
            'Ties & Cufflinks',
            'Jewelry'
          ].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            defaultValue={[50, 500]}
            max={1000}
            step={25}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>ZMW 50</span>
            <span>ZMW 1000+</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Premium Leather Co.',
            'Modern Timepieces',
            'Classic Accessories',
            'Urban Style',
            'Executive Collection'
          ].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'Leather',
              'Metal',
              'Fabric',
              'Silicone',
              'Wood',
              'Plastic'
            ].map((material) => (
              <Badge
                key={material}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
              >
                {material}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            '4.5+ Stars',
            '4.0+ Stars',
            '3.5+ Stars',
            '3.0+ Stars'
          ].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={rating} />
              <label
                htmlFor={rating}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {rating}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="w-full" variant="outline">
        Clear All Filters
      </Button>
    </div>
  )
}
