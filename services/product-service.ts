import { Product } from '@/contexts/cart-context'

// Mock product database
const MOCK_PRODUCTS: Product[] = [
  // Jewelry & Accessories
  {
    id: 'jewelry-001',
    name: 'Handcrafted Copper Bracelet',
    price: 150,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/12026051/pexels-photo-12026051.jpeg',
    category: 'jewelry-accessories',
    subcategory: 'bracelets',
    description: 'Beautiful handcrafted copper bracelet with traditional Zambian patterns. Made by local artisans using traditional techniques.',
    inStock: true,
    stockQuantity: 25,
    retailerId: 'ret-001',
    retailerName: 'Copper Craft Jewelry',
    retailerLocation: 'CBD, Lusaka',
    rating: 4.8,
    reviewCount: 127,
    features: ['Handmade', 'Traditional Design', 'Adjustable Size', 'Gift Box Included'],
    variants: {
      size: ['Small', 'Medium', 'Large'],
      material: ['Pure Copper', 'Copper with Silver']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      shippingCost: 0
    },
    tags: ['handmade', 'traditional', 'copper', 'jewelry', 'zambian']
  },
  {
    id: 'jewelry-002',
    name: 'Malachite Stone Necklace',
    price: 350,
    image: 'https://images.pexels.com/photos/12026053/pexels-photo-12026053.jpeg',
    category: 'jewelry-accessories',
    subcategory: 'necklaces',
    description: 'Stunning necklace featuring genuine Zambian malachite stones. Each piece is unique with natural stone patterns.',
    inStock: true,
    stockQuantity: 15,
    retailerId: 'ret-002',
    retailerName: 'Gemstone Gallery',
    retailerLocation: 'Woodlands, Lusaka',
    rating: 4.9,
    reviewCount: 89,
    features: ['Genuine Malachite', 'Sterling Silver Chain', 'Certificate of Authenticity', 'Luxury Gift Box'],
    variants: {
      size: ['16 inch', '18 inch', '20 inch']
    },
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 3,
      shippingCost: 25
    },
    tags: ['malachite', 'genuine', 'luxury', 'zambian', 'stones']
  },

  // Fashion & Textiles
  {
    id: 'fashion-001',
    name: 'Traditional Chitenge Dress',
    price: 280,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/14538746/pexels-photo-14538746.jpeg',
    category: 'fashion-textiles',
    subcategory: 'dresses',
    description: 'Beautiful traditional chitenge dress with modern cut. Perfect for special occasions and cultural events.',
    inStock: true,
    stockQuantity: 18,
    retailerId: 'ret-003',
    retailerName: 'Banda Fashion House',
    retailerLocation: 'Woodlands, Lusaka',
    rating: 4.7,
    reviewCount: 203,
    features: ['100% Cotton', 'Traditional Print', 'Modern Cut', 'Machine Washable'],
    variants: {
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: ['Blue Pattern', 'Red Pattern', 'Green Pattern', 'Yellow Pattern']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      shippingCost: 0
    },
    tags: ['chitenge', 'traditional', 'dress', 'cotton', 'cultural']
  },

  // Food & Beverages
  {
    id: 'food-001',
    name: 'Pure Zambian Honey',
    price: 120,
    image: 'https://images.pexels.com/photos/9228574/pexels-photo-9228574.jpeg',
    category: 'food-beverages',
    subcategory: 'honey',
    description: 'Pure, raw honey sourced from Zambian beekeepers. Rich in flavor and completely natural.',
    inStock: true,
    stockQuantity: 45,
    retailerId: 'ret-004',
    retailerName: 'Phiri Organic Foods',
    retailerLocation: 'Kabulonga, Lusaka',
    rating: 4.9,
    reviewCount: 156,
    features: ['100% Pure', 'Raw & Unprocessed', 'Local Beekeepers', 'Glass Jar'],
    variants: {
      size: ['250g', '500g', '1kg']
    },
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 1,
      shippingCost: 15
    },
    tags: ['honey', 'organic', 'pure', 'natural', 'zambian']
  },

  // Agriculture & Natural
  {
    id: 'agriculture-001',
    name: 'Organic Maize Seeds',
    price: 85,
    image: 'https://images.pexels.com/photos/18142958/pexels-photo-18142958.jpeg',
    category: 'agriculture-natural',
    subcategory: 'seeds',
    description: 'High-quality organic maize seeds with excellent germination rate. Perfect for small to medium farms.',
    inStock: true,
    stockQuantity: 100,
    retailerId: 'ret-005',
    retailerName: 'Zulu Agricultural Supplies',
    retailerLocation: 'Olympia, Lusaka',
    rating: 4.6,
    reviewCount: 78,
    features: ['Organic Certified', 'High Germination', 'Drought Resistant', 'Storage Instructions Included'],
    variants: {
      size: ['1kg', '5kg', '10kg', '25kg']
    },
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 2,
      shippingCost: 20
    },
    tags: ['maize', 'seeds', 'organic', 'agriculture', 'farming']
  },

  // Tools & Hardware
  {
    id: 'tools-001',
    name: 'Professional Hammer Set',
    price: 180,
    image: 'https://images.pexels.com/photos/9607005/pexels-photo-9607005.jpeg',
    category: 'tools-hardware',
    subcategory: 'hand-tools',
    description: 'Professional quality hammer set for construction and woodworking. Durable steel construction with ergonomic handles.',
    inStock: true,
    stockQuantity: 32,
    retailerId: 'ret-006',
    retailerName: 'BuildPro Tools',
    retailerLocation: 'Industrial Area, Lusaka',
    rating: 4.5,
    reviewCount: 94,
    features: ['Steel Construction', 'Ergonomic Handle', '2-Year Warranty', 'Multiple Sizes'],
    variants: {
      size: ['8oz', '12oz', '16oz', '20oz']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    },
    tags: ['tools', 'hammer', 'construction', 'professional', 'steel']
  },

  // Art & Culture
  {
    id: 'art-001',
    name: 'Wooden Sculpture - Elephant',
    price: 450,
    image: 'https://images.pexels.com/photos/19652771/pexels-photo-19652771.jpeg',
    category: 'art-culture',
    subcategory: 'sculptures',
    description: 'Hand-carved wooden elephant sculpture by renowned Zambian artist. Made from sustainable mukwa wood.',
    inStock: true,
    stockQuantity: 8,
    retailerId: 'ret-007',
    retailerName: 'African Art Gallery',
    retailerLocation: 'CBD, Lusaka',
    rating: 5.0,
    reviewCount: 23,
    features: ['Hand Carved', 'Mukwa Wood', 'Artist Signed', 'Certificate of Authenticity'],
    variants: {
      size: ['Small (15cm)', 'Medium (25cm)', 'Large (35cm)']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 5,
      shippingCost: 0
    },
    tags: ['art', 'sculpture', 'wooden', 'elephant', 'handcarved']
  },

  // Traditional Crafts
  {
    id: 'crafts-001',
    name: 'Handwoven Basket Set',
    price: 220,
    image: 'https://images.pexels.com/photos/20943320/pexels-photo-20943320.jpeg',
    category: 'traditional-crafts',
    subcategory: 'baskets',
    description: 'Set of three handwoven baskets made from traditional materials. Perfect for storage and decoration.',
    inStock: true,
    stockQuantity: 20,
    retailerId: 'ret-008',
    retailerName: 'Mwanza Traditional Crafts',
    retailerLocation: 'Chilenje Market, Lusaka',
    rating: 4.8,
    reviewCount: 67,
    features: ['Handwoven', 'Natural Materials', 'Set of 3', 'Traditional Patterns'],
    variants: {
      color: ['Natural', 'Brown', 'Mixed Colors']
    },
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 2,
      shippingCost: 18
    },
    tags: ['baskets', 'handwoven', 'traditional', 'storage', 'decoration']
  },

  // Health & Wellness Services
  {
    id: 'service-001',
    name: 'General Health Consultation',
    price: 50,
    image: 'https://images.pexels.com/photos/20860586/pexels-photo-20860586.jpeg',
    category: 'services',
    subcategory: 'health-wellness',
    description: 'Professional medical consultation with experienced doctors. Available for routine checkups and general health concerns.',
    inStock: true,
    stockQuantity: 100,
    retailerId: 'srv-001',
    retailerName: 'Lusaka Medical Center',
    retailerLocation: 'CBD, Lusaka',
    rating: 4.9,
    reviewCount: 245,
    features: ['Licensed Doctors', '30min Consultation', 'Health Report Included', 'Follow-up Available'],
    variants: {
      duration: ['30 minutes', '45 minutes', '60 minutes']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 0,
      shippingCost: 0
    },
    tags: ['healthcare', 'consultation', 'medical', 'professional']
  },

  // Fitness Services
  {
    id: 'service-002',
    name: 'Personal Fitness Training',
    price: 75,
    originalPrice: 100,
    image: 'https://images.pexels.com/photos/5209197/pexels-photo-5209197.jpeg',
    category: 'services',
    subcategory: 'fitness-yoga',
    description: 'One-on-one personal training sessions with certified fitness trainers. Customized workout plans for your goals.',
    inStock: true,
    stockQuantity: 50,
    retailerId: 'srv-002',
    retailerName: 'FitLife Gym',
    retailerLocation: 'Kabulonga, Lusaka',
    rating: 4.8,
    reviewCount: 189,
    features: ['Certified Trainer', 'Custom Workout Plan', 'Nutrition Guidance', 'Progress Tracking'],
    variants: {
      duration: ['1 Hour', '1.5 Hours'],
      type: ['Weight Training', 'Cardio Focus', 'Mixed Training']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 0,
      shippingCost: 0
    },
    tags: ['fitness', 'training', 'health', 'personal']
  },

  // Rental Services
  {
    id: 'service-003',
    name: 'Short-term Apartment Rental',
    price: 200,
    image: 'https://images.pexels.com/photos/20260779/pexels-photo-20260779.jpeg',
    category: 'services',
    subcategory: 'short-term-rentals',
    description: 'Fully furnished apartment available for short-term stays. Perfect for business travelers and visitors.',
    inStock: true,
    stockQuantity: 5,
    retailerId: 'srv-003',
    retailerName: 'Lusaka Stay Rentals',
    retailerLocation: 'Woodlands, Lusaka',
    rating: 4.7,
    reviewCount: 156,
    features: ['Fully Furnished', 'WiFi Included', 'Kitchen Access', '24/7 Security'],
    variants: {
      duration: ['Per Night', 'Per Week', 'Per Month'],
      type: ['Studio', '1 Bedroom', '2 Bedroom']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 0,
      shippingCost: 0
    },
    tags: ['rental', 'accommodation', 'furnished', 'temporary']
  },

  // Home Decor Services
  {
    id: 'service-004',
    name: 'Interior Design Consultation',
    price: 150,
    image: 'https://images.pexels.com/photos/20607077/pexels-photo-20607077.jpeg',
    category: 'services',
    subcategory: 'home-decor',
    description: 'Professional interior design consultation to transform your living space. Includes design concepts and shopping list.',
    inStock: true,
    stockQuantity: 20,
    retailerId: 'srv-004',
    retailerName: 'Creative Spaces Design',
    retailerLocation: 'Olympia, Lusaka',
    rating: 4.9,
    reviewCount: 98,
    features: ['Design Consultation', '3D Visualization', 'Shopping List', 'Style Guide'],
    variants: {
      scope: ['Single Room', 'Multiple Rooms', 'Full House']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 0,
      shippingCost: 0
    },
    tags: ['interior', 'design', 'consultation', 'home']
  },

  // Entertainment Services
  {
    id: 'service-005',
    name: 'Event Photography',
    price: 300,
    originalPrice: 400,
    image: 'https://images.pexels.com/photos/4276830/pexels-photo-4276830.jpeg',
    category: 'services',
    subcategory: 'entertainment',
    description: 'Professional event photography services for weddings, parties, and corporate events. High-quality photos delivered digitally.',
    inStock: true,
    stockQuantity: 15,
    retailerId: 'srv-005',
    retailerName: 'Capture Moments Photography',
    retailerLocation: 'Chelstone, Lusaka',
    rating: 4.8,
    reviewCount: 134,
    features: ['Professional Equipment', 'Digital Delivery', 'Photo Editing', 'Same Day Preview'],
    variants: {
      duration: ['4 Hours', '6 Hours', '8 Hours', 'Full Day'],
      type: ['Wedding', 'Corporate', 'Party', 'Portrait']
    },
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      shippingCost: 0
    },
    tags: ['photography', 'events', 'professional', 'wedding']
  },

  // Pharmacy Services
  {
    id: 'service-006',
    name: 'Medicine Delivery Service',
    price: 25,
    image: 'https://images.pexels.com/photos/14027298/pexels-photo-14027298.jpeg',
    category: 'services',
    subcategory: 'pharmacies',
    description: 'Fast and reliable medicine delivery service. Upload your prescription and get medicines delivered to your doorstep.',
    inStock: true,
    stockQuantity: 200,
    retailerId: 'srv-006',
    retailerName: 'QuickMed Pharmacy',
    retailerLocation: 'Various Locations, Lusaka',
    rating: 4.6,
    reviewCount: 287,
    features: ['Prescription Upload', 'Licensed Pharmacist', 'Same Day Delivery', 'Medicine Verification'],
    variants: {
      delivery: ['Same Day', 'Next Day', 'Express (2 Hours)']
    },
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 0,
      shippingCost: 25
    },
    tags: ['pharmacy', 'medicine', 'delivery', 'healthcare']
  }
]

export interface ProductFilters {
  category?: string
  subcategory?: string
  priceRange?: { min: number; max: number }
  inStock?: boolean
  retailerId?: string
  rating?: number
  tags?: string[]
  searchQuery?: string
}

export interface ProductSortOptions {
  sortBy: 'name' | 'price' | 'rating' | 'newest' | 'popular' | 'price-low' | 'price-high' | 'recommended'
  order: 'asc' | 'desc'
}

class ProductService {
  private products: Product[] = MOCK_PRODUCTS

  async getProducts(
    filters: ProductFilters = {},
    sort: ProductSortOptions = { sortBy: 'newest', order: 'desc' },
    limit?: number,
    offset?: number
  ): Promise<{ products: Product[]; total: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredProducts = [...this.products]

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category)
    }

    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === filters.subcategory)
    }

    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(p => 
        p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      )
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock)
    }

    if (filters.retailerId) {
      filteredProducts = filteredProducts.filter(p => p.retailerId === filters.retailerId)
    }

    if (filters.rating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating!)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        filters.tags!.some(tag => p.tags.includes(tag))
      )
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.retailerName.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let comparison = 0

      switch (sort.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
        case 'price-low':
          comparison = a.price - b.price
          break
        case 'price-high':
          comparison = b.price - a.price
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'popular':
          comparison = a.reviewCount - b.reviewCount
          break
        case 'recommended':
          comparison = a.rating - b.rating
          break
        case 'newest':
        default:
          comparison = 0 // For mock data, we'll just use array order
          break
      }

      return sort.order === 'asc' ? comparison : -comparison
    })

    const total = filteredProducts.length

    // Apply pagination
    if (limit !== undefined && offset !== undefined) {
      filteredProducts = filteredProducts.slice(offset, offset + limit)
    }

    return { products: filteredProducts, total }
  }

  async getProduct(id: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return this.products.find(p => p.id === id) || null
  }

  async getFeaturedProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return this.products
      .filter(p => p.rating >= 4.7)
      .slice(0, 8)
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return (await this.getProducts({ category })).products
  }

  async searchProducts(query: string): Promise<Product[]> {
    return (await this.getProducts({ searchQuery: query })).products
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const product = await this.getProduct(productId)
    if (!product) return []

    return (await this.getProducts({ 
      category: product.category,
      tags: product.tags 
    })).products
      .filter(p => p.id !== productId)
      .slice(0, 4)
  }

  // Mock methods for retailer functionality
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newProduct: Product = {
      ...product,
      id: 'product-' + Math.random().toString(36).substr(2, 9)
    }
    
    this.products.push(newProduct)
    return newProduct
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return null
    
    this.products[index] = { ...this.products[index], ...updates }
    return this.products[index]
  }

  async deleteProduct(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return false
    
    this.products.splice(index, 1)
    return true
  }
}

export const productService = new ProductService()
