'use client';

import { useState, useCallback, useMemo } from 'react';
import { Search, Filter, Star, Clock, MapPin, Camera, Video, Mic, Edit, Palette, Users, Award, CheckCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MediaService {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: {
    basic: number;
    standard: number;
    premium: number;
  };
  rating: number;
  reviews: number;
  deliveryTime: string;
  location: string;
  portfolio: string[];
  skills: string[];
  verified: boolean;
  languages: string[];
  experience: string;
  equipment: string[];
  certifications: string[];
  completedProjects: number;
  responseTime: string;
  availability: 'available' | 'busy' | 'unavailable';
  packages: {
    basic: {
      name: string;
      description: string;
      deliverables: string[];
      revisions: number;
      price: number;
    };
    standard: {
      name: string;
      description: string;
      deliverables: string[];
      revisions: number;
      price: number;
    };
    premium: {
      name: string;
      description: string;
      deliverables: string[];
      revisions: number;
      price: number;
    };
  };
}

const mediaServices: MediaService[] = [
  {
    id: '1',
    name: 'Mwape Studios',
    category: 'Video Production',
    description: 'Professional video production services for commercials, documentaries, and corporate content',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
    price: { basic: 800, standard: 1500, premium: 3000 },
    rating: 4.9,
    reviews: 127,
    deliveryTime: '5-10 days',
    location: 'Lusaka, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop'
    ],
    skills: ['Cinematography', 'Video Editing', 'Color Grading', 'Audio Mixing'],
    verified: true,
    languages: ['English', 'Bemba', 'Nyanja'],
    experience: '8 years',
    equipment: ['RED Camera', 'Drone', 'Professional Lighting', 'Audio Equipment'],
    certifications: ['Adobe Certified Expert', 'DJI Certified Pilot'],
    completedProjects: 234,
    responseTime: '2 hours',
    availability: 'available',
    packages: {
      basic: {
        name: 'Basic Video',
        description: 'Simple video production with basic editing',
        deliverables: ['1-2 minute video', 'Basic editing', 'HD quality'],
        revisions: 2,
        price: 800
      },
      standard: {
        name: 'Professional Video',
        description: 'Full production with advanced editing and effects',
        deliverables: ['3-5 minute video', 'Advanced editing', '4K quality', 'Color correction'],
        revisions: 3,
        price: 1500
      },
      premium: {
        name: 'Premium Production',
        description: 'Complete video production with multiple cameras and drone footage',
        deliverables: ['10+ minute video', 'Multi-cam setup', 'Drone footage', 'Motion graphics', 'Sound design'],
        revisions: 5,
        price: 3000
      }
    }
  },
  {
    id: '2',
    name: 'Sound Wave Audio',
    category: 'Audio Production',
    description: 'Professional audio editing, mixing, and mastering services for music and podcasts',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
    price: { basic: 300, standard: 600, premium: 1200 },
    rating: 4.8,
    reviews: 89,
    deliveryTime: '2-5 days',
    location: 'Ndola, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    ],
    skills: ['Audio Editing', 'Mixing', 'Mastering', 'Sound Design'],
    verified: true,
    languages: ['English', 'Bemba'],
    experience: '6 years',
    equipment: ['Pro Tools Studio', 'Neumann Microphones', 'Monitor Speakers'],
    certifications: ['Pro Tools Certified', 'Audio Engineering Society Member'],
    completedProjects: 156,
    responseTime: '1 hour',
    availability: 'available',
    packages: {
      basic: {
        name: 'Basic Audio Edit',
        description: 'Simple audio editing and cleanup',
        deliverables: ['Audio cleanup', 'Basic EQ', 'Noise reduction'],
        revisions: 2,
        price: 300
      },
      standard: {
        name: 'Professional Mix',
        description: 'Professional mixing and mastering',
        deliverables: ['Multi-track mixing', 'Professional mastering', 'EQ and compression'],
        revisions: 3,
        price: 600
      },
      premium: {
        name: 'Studio Master',
        description: 'Complete audio production with advanced processing',
        deliverables: ['Advanced mixing', 'Mastering suite', 'Sound design', 'Vocal tuning'],
        revisions: 5,
        price: 1200
      }
    }
  },
  {
    id: '3',
    name: 'Chisomo Photography',
    category: 'Photography',
    description: 'Professional photography services for events, portraits, and commercial projects',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    price: { basic: 400, standard: 800, premium: 1600 },
    rating: 4.9,
    reviews: 203,
    deliveryTime: '3-7 days',
    location: 'Kitwe, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop'
    ],
    skills: ['Portrait Photography', 'Event Photography', 'Product Photography', 'Photo Editing'],
    verified: true,
    languages: ['English', 'Bemba', 'Tonga'],
    experience: '10 years',
    equipment: ['Canon 5D Mark IV', 'Professional Lighting', 'Drone'],
    certifications: ['Professional Photographers Association', 'Adobe Certified'],
    completedProjects: 432,
    responseTime: '30 minutes',
    availability: 'available',
    packages: {
      basic: {
        name: 'Basic Shoot',
        description: 'Simple photo session with basic editing',
        deliverables: ['1-2 hour session', '20 edited photos', 'Digital delivery'],
        revisions: 1,
        price: 400
      },
      standard: {
        name: 'Professional Shoot',
        description: 'Extended session with professional editing',
        deliverables: ['3-4 hour session', '50 edited photos', 'Professional retouching'],
        revisions: 2,
        price: 800
      },
      premium: {
        name: 'Premium Package',
        description: 'Full-day session with premium editing and prints',
        deliverables: ['Full day session', '100+ edited photos', 'Professional prints', 'Album design'],
        revisions: 3,
        price: 1600
      }
    }
  },
  {
    id: '4',
    name: 'Creative Minds Agency',
    category: 'Graphic Design',
    description: 'Creative graphic design services for branding, marketing materials, and digital content',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    price: { basic: 200, standard: 500, premium: 1000 },
    rating: 4.7,
    reviews: 167,
    deliveryTime: '2-4 days',
    location: 'Lusaka, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=200&fit=crop'
    ],
    skills: ['Logo Design', 'Brand Identity', 'Print Design', 'Digital Marketing'],
    verified: true,
    languages: ['English', 'Nyanja'],
    experience: '5 years',
    equipment: ['Adobe Creative Suite', 'Wacom Tablet', 'High-end Workstation'],
    certifications: ['Adobe Certified Expert', 'Graphic Design Diploma'],
    completedProjects: 289,
    responseTime: '1 hour',
    availability: 'available',
    packages: {
      basic: {
        name: 'Logo Design',
        description: 'Simple logo design with basic concepts',
        deliverables: ['3 logo concepts', 'Final files in PNG/JPG', '2 revisions'],
        revisions: 2,
        price: 200
      },
      standard: {
        name: 'Brand Package',
        description: 'Complete brand identity package',
        deliverables: ['Logo design', 'Business card', 'Letterhead', 'Brand guidelines'],
        revisions: 3,
        price: 500
      },
      premium: {
        name: 'Complete Branding',
        description: 'Full branding suite with marketing materials',
        deliverables: ['Complete brand identity', 'Marketing materials', 'Social media templates', 'Website mockup'],
        revisions: 5,
        price: 1000
      }
    }
  },
  {
    id: '5',
    name: 'Voice Pro Zambia',
    category: 'Voice Over',
    description: 'Professional voice over services for commercials, documentaries, and corporate content',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop',
    price: { basic: 150, standard: 300, premium: 600 },
    rating: 4.8,
    reviews: 94,
    deliveryTime: '1-3 days',
    location: 'Lusaka, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=200&fit=crop'
    ],
    skills: ['Commercial Voice Over', 'Documentary Narration', 'Character Voices', 'Audio Editing'],
    verified: true,
    languages: ['English', 'Bemba', 'Nyanja', 'Tonga'],
    experience: '7 years',
    equipment: ['Professional Studio', 'Neumann U87', 'Pro Tools'],
    certifications: ['Voice Over Training Certificate', 'Audio Engineering'],
    completedProjects: 178,
    responseTime: '2 hours',
    availability: 'available',
    packages: {
      basic: {
        name: 'Basic Voice Over',
        description: 'Simple voice over recording up to 150 words',
        deliverables: ['150 words max', 'High quality recording', 'Basic editing'],
        revisions: 1,
        price: 150
      },
      standard: {
        name: 'Professional Voice Over',
        description: 'Professional voice over up to 500 words',
        deliverables: ['500 words max', 'Professional recording', 'Advanced editing', 'Multiple takes'],
        revisions: 2,
        price: 300
      },
      premium: {
        name: 'Premium Production',
        description: 'Complete voice over production with unlimited words',
        deliverables: ['Unlimited words', 'Studio quality', 'Sound design', 'Multiple character voices'],
        revisions: 3,
        price: 600
      }
    }
  },
  {
    id: '6',
    name: 'Motion Graphics Pro',
    category: 'Motion Graphics',
    description: 'Professional motion graphics and animation services for videos and presentations',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
    price: { basic: 500, standard: 1000, premium: 2000 },
    rating: 4.9,
    reviews: 76,
    deliveryTime: '5-10 days',
    location: 'Lusaka, Zambia',
    portfolio: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
    ],
    skills: ['2D Animation', '3D Animation', 'Motion Graphics', 'Visual Effects'],
    verified: true,
    languages: ['English', 'Bemba'],
    experience: '6 years',
    equipment: ['After Effects', '3D Studio Max', 'High-end Workstation'],
    certifications: ['Adobe After Effects Certified', '3D Animation Certificate'],
    completedProjects: 145,
    responseTime: '3 hours',
    availability: 'available',
    packages: {
      basic: {
        name: 'Simple Animation',
        description: 'Basic motion graphics and simple animations',
        deliverables: ['15-30 second animation', 'Simple motion graphics', 'HD quality'],
        revisions: 2,
        price: 500
      },
      standard: {
        name: 'Professional Animation',
        description: 'Advanced motion graphics with complex animations',
        deliverables: ['60-90 second animation', 'Advanced motion graphics', '4K quality', 'Sound effects'],
        revisions: 3,
        price: 1000
      },
      premium: {
        name: 'Premium Production',
        description: 'Complete animation production with 3D elements',
        deliverables: ['2+ minute animation', '3D elements', 'Custom illustrations', 'Professional soundtrack'],
        revisions: 5,
        price: 2000
      }
    }
  }
];

export default function MediaServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<{[key: string]: 'basic' | 'standard' | 'premium'}>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const categories = useMemo(() => {
    const categorySet = new Set(mediaServices.map(service => service.category));
    return Array.from(categorySet);
  }, []);

  const locations = useMemo(() => {
    const locationSet = new Set(mediaServices.map(service => service.location));
    return Array.from(locationSet);
  }, []);

  const filteredServices = useMemo(() => {
    return mediaServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || service.location === selectedLocation;
      
      const matchesPriceRange = (() => {
        if (selectedPriceRange === 'all') return true;
        const maxPrice = Math.max(service.price.basic, service.price.standard, service.price.premium);
        switch (selectedPriceRange) {
          case 'budget': return maxPrice <= 500;
          case 'mid': return maxPrice > 500 && maxPrice <= 1500;
          case 'premium': return maxPrice > 1500;
          default: return true;
        }
      })();
      
      const matchesRating = selectedRating === 'all' || service.rating >= parseFloat(selectedRating);
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange && matchesRating;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedPriceRange, selectedRating]);

  const handlePackageSelect = useCallback((serviceId: string, packageType: 'basic' | 'standard' | 'premium') => {
    setSelectedPackage(prev => ({
      ...prev,
      [serviceId]: packageType
    }));
  }, []);

  const handleBookService = useCallback((service: MediaService, packageType: 'basic' | 'standard' | 'premium') => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    const selectedPkg = service.packages[packageType];
    alert(`Booking ${service.name} - ${selectedPkg.name} package for K${selectedPkg.price} via ${selectedPaymentMethod}`);
  }, [selectedPaymentMethod]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Video Production': return <Video className="h-5 w-5" />;
      case 'Audio Production': return <Mic className="h-5 w-5" />;
      case 'Photography': return <Camera className="h-5 w-5" />;
      case 'Graphic Design': return <Palette className="h-5 w-5" />;
      case 'Voice Over': return <Mic className="h-5 w-5" />;
      case 'Motion Graphics': return <Edit className="h-5 w-5" />;
      default: return <Edit className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Media Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with Zambia's top creative professionals for video production, photography, audio services, and more
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Video className="h-4 w-4 mr-2" />
                Video Production
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Camera className="h-4 w-4 mr-2" />
                Photography
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Mic className="h-4 w-4 mr-2" />
                Audio Services
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Palette className="h-4 w-4 mr-2" />
                Creative Design
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for services, skills, or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="lg:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (K0-500)</SelectItem>
                <SelectItem value="mid">Mid-range (K500-1500)</SelectItem>
                <SelectItem value="premium">Premium (K1500+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredServices.length} Media Service{filteredServices.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600">
            Showing professional creative services in Zambia
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredServices.map((service) => {
            const currentPackage = selectedPackage[service.id] || 'standard';
            const packageDetails = service.packages[currentPackage];
            
            return (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">
                      {getCategoryIcon(service.category)}
                      <span className="ml-2">{service.category}</span>
                    </Badge>
                  </div>
                  {service.verified && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="ml-1">({service.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Service Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{service.completedProjects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{service.experience}</div>
                      <div className="text-xs text-gray-500">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{service.responseTime}</div>
                      <div className="text-xs text-gray-500">Response</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Package Selection */}
                  <div className="mb-4">
                    <Tabs value={currentPackage} onValueChange={(value) => handlePackageSelect(service.id, value as 'basic' | 'standard' | 'premium')}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="premium">Premium</TabsTrigger>
                      </TabsList>
                      
                      {(['basic', 'standard', 'premium'] as const).map((packageType) => (
                        <TabsContent key={packageType} value={packageType} className="mt-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold">{service.packages[packageType].name}</h4>
                                <p className="text-sm text-gray-600">{service.packages[packageType].description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">
                                  K{service.packages[packageType].price.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {service.packages[packageType].revisions} revisions
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Deliverables:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {service.packages[packageType].deliverables.map((deliverable, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.deliveryTime}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {service.availability === 'available' ? 'Available' : 'Busy'}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn-money">MTN Money</SelectItem>
                        <SelectItem value="airtel-money">Airtel Money</SelectItem>
                        <SelectItem value="zamtel-money">Zamtel Money</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleBookService(service, currentPackage)}
                    >
                      Book Now - K{packageDetails.price.toLocaleString()}
                    </Button>
                    <Button variant="outline" className="px-4">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Portfolio Showcase */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Featured Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaServices.slice(0, 3).map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={service.portfolio[0]}
                    alt={`${service.name} portfolio`}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <h4 className="text-lg font-bold">{service.name}</h4>
                      <p className="text-sm">{service.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Platform */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose Linka Media Services?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Verified Professionals</h4>
              <p className="opacity-90">All our service providers are vetted and verified for quality assurance</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Fast Delivery</h4>
              <p className="opacity-90">Quick turnaround times to meet your project deadlines</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Local Expertise</h4>
              <p className="opacity-90">Connect with talented Zambian creatives who understand your market</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
