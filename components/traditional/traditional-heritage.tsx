"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Heart, MapPin, Calendar, Users } from "lucide-react";

interface HeritageStory {
  id: string;
  title: string;
  region: string;
  description: string;
  significance: string;
  period: string;
  image: string;
  patterns: string[];
  occasions: string[];
  rating: number;
  reads: number;
}

const heritageStories: HeritageStory[] = [
  {
    id: "royal-lozi",
    title: "Royal Lozi Traditions",
    region: "Western Province",
    description: "The magnificent ceremonial attire of the Lozi Kingdom, worn during the famous Kuomboka ceremony when the Litunga moves from the floodplains.",
    significance: "Symbol of royal authority and connection to the Zambezi River's seasonal cycles",
    period: "Pre-colonial to Present",
    image: "/api/placeholder/400/300",
    patterns: ["Geometric waves", "Royal symbols", "River motifs"],
    occasions: ["Kuomboka ceremony", "Royal gatherings", "Cultural festivals"],
    rating: 4.9,
    reads: 2847
  },
  {
    id: "bemba-cultural",
    title: "Bemba Cultural Dress",
    region: "Northern Province",
    description: "Traditional Bemba attire featuring intricate beadwork and vibrant patterns that tell stories of harvest, community, and ancestral wisdom.",
    significance: "Represents agricultural abundance and community solidarity",
    period: "Ancient traditions",
    image: "/api/placeholder/400/300",
    patterns: ["Harvest motifs", "Community symbols", "Ancestral designs"],
    occasions: ["Ukusefya Pa Ng'wena", "Wedding ceremonies", "Initiation rites"],
    rating: 4.8,
    reads: 1923
  },
  {
    id: "tonga-heritage",
    title: "Tonga Heritage Garments",
    region: "Southern Province",
    description: "The distinctive dress of the Tonga people, known for their connection to the land and cattle herding traditions reflected in their clothing designs.",
    significance: "Embodies the relationship between people, land, and livestock",
    period: "Traditional era",
    image: "/api/placeholder/400/300",
    patterns: ["Cattle symbols", "Earth tones", "Agricultural motifs"],
    occasions: ["Lwiindi ceremony", "Harvest festivals", "Community gatherings"],
    rating: 4.7,
    reads: 1456
  },
  {
    id: "ngoni-warrior",
    title: "Ngoni Warrior Attire",
    region: "Eastern Province",
    description: "The proud warrior traditions of the Ngoni people expressed through bold patterns and ceremonial dress that speaks of courage and heritage.",
    significance: "Symbol of bravery, leadership, and cultural pride",
    period: "19th century onwards",
    image: "/api/placeholder/400/300",
    patterns: ["Shield designs", "Spear motifs", "Warrior symbols"],
    occasions: ["Nc'wala ceremony", "Cultural celebrations", "Leadership ceremonies"],
    rating: 4.8,
    reads: 2134
  }
];

export default function TraditionalHeritage() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-amber-600" />
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Cultural Heritage
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stories Behind the Fabric
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich cultural heritage and ancestral wisdom woven into every thread of Zambian traditional wear
          </p>
        </motion.div>

        {/* Heritage Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {heritageStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-600 text-white">
                      {story.region}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{story.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{story.period}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{story.reads} reads</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {story.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cultural Significance:</h4>
                    <p className="text-sm text-gray-600">{story.significance}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Traditional Patterns:</h4>
                    <div className="flex flex-wrap gap-1">
                      {story.patterns.map((pattern, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {pattern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Traditional Occasions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {story.occasions.map((occasion, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          {occasion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cultural Preservation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <Heart className="h-12 w-12 mx-auto mb-6 text-white" />
          <h3 className="text-3xl font-bold mb-4">
            Preserve Our Cultural Heritage
          </h3>
          <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
            Every purchase of traditional wear helps preserve centuries-old craftsmanship and supports local artisans keeping our heritage alive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50">
              <MapPin className="h-5 w-5 mr-2" />
              Find Local Artisans
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <BookOpen className="h-5 w-5 mr-2" />
              Learn More Stories
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
