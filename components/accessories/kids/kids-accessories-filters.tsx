"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function KidsAccessoriesFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Bags & Backpacks',
            'Hair Accessories',
            'Jewelry',
            'Sunglasses',
            'Watches',
            'Hats & Caps'
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
            defaultValue={[0, 100]}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>ZMW 0</span>
            <span>ZMW 100+</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Age Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            '0-2 years',
            '3-5 years',
            '6-8 years',
            '9-12 years',
            '13+ years'
          ].map((age) => (
            <div key={age} className="flex items-center space-x-2">
              <Checkbox id={age} />
              <label
                htmlFor={age}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {age}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Pink', color: 'bg-pink-500' },
              { name: 'Blue', color: 'bg-blue-500' },
              { name: 'Purple', color: 'bg-purple-500' },
              { name: 'Green', color: 'bg-green-500' },
              { name: 'Yellow', color: 'bg-yellow-500' },
              { name: 'Red', color: 'bg-red-500' }
            ].map((color) => (
              <Badge
                key={color.name}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
              >
                <div className={`w-3 h-3 rounded-full ${color.color} mr-2`} />
                {color.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" variant="outline">
        Clear All Filters
      </Button>
    </div>
  )
}
