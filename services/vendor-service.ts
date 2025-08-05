// services/vendor-service.ts
import type { Vendor, Product } from "@/lib/types";

export interface VendorDetails {
  id: string;
  name: string;
  tagline?: string;
  rating?: number;
  reviewCount?: number;
  productImageUrl: string;
  vendorImageUrl?: string;
  pricePreview?: string;
  href: string;
  categories?: string[];
  location?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  discount?: string;
  deliveryTime?: string;
  products?: Product[];
  fullDescription: string;
  businessType: string;
  joinDate: string;
  responseTime: string;
  successRate: number;
  totalSales: number;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  policies: {
    returns: string;
    shipping: string;
    warranty: string;
  };
  businessHours: {
    weekdays: string;
    weekends: string;
  };
}

// Mock vendor data - replace with actual API calls
export const MOCK_VENDORS: Record<string, VendorDetails> = {
  "lusaka-crafts-co": {
    id: "lusaka-crafts-co",
    name: "Lusaka Crafts & Co.",
    tagline: "Traditional Zambian crafts and modern designs for your home",
    fullDescription: "We are a family-owned business specializing in authentic Zambian crafts, traditional artwork, and modern home decor pieces. Our artisans use locally sourced materials and time-honored techniques passed down through generations.",
    businessType: "Traditional Crafts & Home Decor",
    rating: 4.8,
    reviewCount: 127,
    productImageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face",
    pricePreview: "From K50",
    href: `/vendors/lusaka-crafts-co`,
    categories: ["Traditional Crafts", "Home Decor", "Art"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    deliveryTime: "2-3 days",
    joinDate: "March 2022",
    responseTime: "< 1 hour",
    successRate: 98.5,
    totalSales: 1247,
    contactInfo: {
      phone: "+260 97 123 4567",
      email: "hello@lusakacrafts.zm",
      website: "www.lusakacrafts.zm"
    },
    policies: {
      returns: "30-day return policy for unused items",
      shipping: "Free shipping on orders over K200",
      warranty: "6-month quality guarantee on all crafts"
    },
    businessHours: {
      weekdays: "8:00 AM - 6:00 PM",
      weekends: "9:00 AM - 4:00 PM"
    }
  },
  "fresh-valley-farm": {
    id: "fresh-valley-farm",
    name: "Fresh Valley Farm",
    tagline: "Organic produce directly from our family farm to your table",
    fullDescription: "Fresh Valley Farm has been serving the Lusaka community with premium organic produce for over 15 years. We practice sustainable farming methods and guarantee the freshest fruits and vegetables.",
    businessType: "Organic Farm & Produce",
    rating: 4.6,
    reviewCount: 89,
    productImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    pricePreview: "From K15",
    href: `/vendors/fresh-valley-farm`,
    categories: ["Fresh Produce", "Organic", "Vegetables", "Fruits"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "Same day",
    joinDate: "January 2021",
    responseTime: "< 2 hours",
    successRate: 97.2,
    totalSales: 892,
    contactInfo: {
      phone: "+260 97 234 5678",
      email: "orders@freshvalley.zm"
    },
    policies: {
      returns: "Fresh produce exchanges within 24 hours",
      shipping: "Same-day delivery available",
      warranty: "Freshness guaranteed"
    },
    businessHours: {
      weekdays: "6:00 AM - 7:00 PM",
      weekends: "6:00 AM - 5:00 PM"
    }
  },
  "zambian-fashion-house": {
    id: "zambian-fashion-house",
    name: "Zambian Fashion House",
    tagline: "Contemporary African fashion with traditional elements",
    fullDescription: "Zambian Fashion House creates stunning contemporary African fashion pieces that celebrate our rich cultural heritage while embracing modern trends. Each piece is carefully crafted by skilled local designers.",
    businessType: "Fashion & Textiles",
    rating: 4.9,
    reviewCount: 203,
    productImageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    pricePreview: "From K120",
    href: `/vendors/zambian-fashion-house`,
    categories: ["Fashion", "Textiles", "Chitenge", "Custom Tailoring"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "20% OFF",
    deliveryTime: "3-5 days",
    joinDate: "August 2020",
    responseTime: "< 30 mins",
    successRate: 99.1,
    totalSales: 1567,
    contactInfo: {
      phone: "+260 97 345 6789",
      email: "info@zambianfashion.zm",
      website: "www.zambianfashionhouse.zm"
    },
    policies: {
      returns: "14-day return policy with tags attached",
      shipping: "Free alterations for online orders",
      warranty: "Quality guarantee on all garments"
    },
    businessHours: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 5:00 PM"
    }
  },
  "tech-solutions-zm": {
    id: "tech-solutions-zm",
    name: "Tech Solutions ZM",
    tagline: "Latest technology and electronics with expert support",
    fullDescription: "Tech Solutions ZM is your trusted partner for all technology needs. We provide the latest smartphones, laptops, and electronics with comprehensive support and warranty services.",
    businessType: "Electronics & Technology",
    rating: 4.7,
    reviewCount: 156,
    productImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    pricePreview: "From K300",
    href: `/vendors/tech-solutions-zm`,
    categories: ["Electronics", "Technology", "Smartphones", "Laptops"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    deliveryTime: "1-2 days",
    joinDate: "May 2021",
    responseTime: "< 45 mins",
    successRate: 98.8,
    totalSales: 2134,
    contactInfo: {
      phone: "+260 97 456 7890",
      email: "support@techsolutions.zm",
      website: "www.techsolutions.zm"
    },
    policies: {
      returns: "7-day return policy for defective items",
      shipping: "Free installation for major purchases",
      warranty: "Manufacturer warranty + 1 year extended warranty"
    },
    businessHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 6:00 PM"
    }
  }
};

// Service functions
export class VendorService {
  static async getVendorById(vendorId: string): Promise<VendorDetails | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return MOCK_VENDORS[vendorId] || null;
  }

  static async getVendorProducts(vendorId: string): Promise<Product[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const vendor = MOCK_VENDORS[vendorId];
    if (!vendor) return [];

    // Mock products for each vendor
    const productTemplates = {
      "lusaka-crafts-co": [
        {
          name: "Handwoven Basket Set",
          description: "Beautiful traditional baskets perfect for storage and decoration",
          price: 85.00,
          originalPrice: 100.00,
          images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"],
          category: "Traditional Crafts",
          tags: ["handmade", "traditional", "storage"]
        },
        {
          name: "Wooden Sculpture Collection",
          description: "Authentic Zambian wooden sculptures carved by local artisans",
          price: 150.00,
          originalPrice: undefined,
          images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
          category: "Art",
          tags: ["wooden", "sculpture", "art", "handmade"]
        },
        {
          name: "Traditional Wall Art",
          description: "Hand-painted canvas featuring traditional Zambian patterns",
          price: 120.00,
          originalPrice: undefined,
          images: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"],
          category: "Art",
          tags: ["art", "wall", "traditional", "painting"]
        }
      ],
      "fresh-valley-farm": [
        {
          name: "Organic Vegetable Box",
          description: "Fresh seasonal vegetables harvested daily from our farm",
          price: 45.00,
          images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"],
          category: "Fresh Produce",
          tags: ["organic", "fresh", "vegetables", "healthy"]
        },
        {
          name: "Fresh Fruit Basket",
          description: "Assorted seasonal fruits picked at peak ripeness",
          price: 38.00,
          images: ["https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400&h=400&fit=crop"],
          category: "Fresh Produce",
          tags: ["fresh", "fruits", "organic", "seasonal"]
        }
      ],
      "zambian-fashion-house": [
        {
          name: "Chitenge Dress",
          description: "Elegant traditional Chitenge dress with modern styling",
          price: 180.00,
          originalPrice: 220.00,
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"],
          category: "Fashion",
          tags: ["chitenge", "dress", "traditional", "fashion"]
        },
        {
          name: "Modern African Print Shirt",
          description: "Contemporary shirt featuring vibrant African prints",
          price: 95.00,
          images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop"],
          category: "Fashion",
          tags: ["african", "print", "shirt", "modern"]
        }
      ],
      "tech-solutions-zm": [
        {
          name: "Smartphone Pro Max",
          description: "Latest flagship smartphone with advanced camera and features",
          price: 2500.00,
          originalPrice: 2800.00,
          images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"],
          category: "Electronics",
          tags: ["smartphone", "mobile", "technology", "camera"]
        },
        {
          name: "Gaming Laptop",
          description: "High-performance laptop perfect for gaming and work",
          price: 3200.00,
          images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"],
          category: "Electronics",
          tags: ["laptop", "gaming", "computer", "performance"]
        }
      ]
    };

    const templates = productTemplates[vendorId as keyof typeof productTemplates] || [];
    
    return templates.map((template, index) => ({
      id: `${vendorId}-product-${index + 1}`,
      ...template,
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 20) + 5,
      rating: 4.0 + Math.random() * 1.0,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      vendor: {
        id: vendorId,
        name: vendor.name,
        logo: vendor.vendorImageUrl
      },
      featured: index < 2,
      discountPercentage: template.originalPrice ? 
        Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100) : 
        undefined,
      freeShipping: Math.random() > 0.5,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  static async getAllVendors(): Promise<VendorDetails[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return Object.values(MOCK_VENDORS);
  }

  static async searchVendors(query: string): Promise<VendorDetails[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const allVendors = Object.values(MOCK_VENDORS);
    const searchTerm = query.toLowerCase();
    
    return allVendors.filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.tagline?.toLowerCase().includes(searchTerm) ||
      vendor.categories?.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      vendor.businessType.toLowerCase().includes(searchTerm)
    );
  }

  static async getVendorsByCategory(category: string): Promise<VendorDetails[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const allVendors = Object.values(MOCK_VENDORS);
    
    return allVendors.filter(vendor => 
      vendor.categories?.some(cat => 
        cat.toLowerCase().includes(category.toLowerCase())
      )
    );
  }
}

export default VendorService;
