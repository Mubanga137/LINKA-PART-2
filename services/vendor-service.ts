import type { Vendor, Product } from "@/lib/types";

// Mock vendor database - in a real app this would connect to your backend/database
const mockVendors: Record<string, Vendor> = {
  "electronics-hub-zambia": {
    id: "vendor-1",
    name: "Electronics Hub Zambia",
    tagline: "Your one-stop shop for quality electronics and gadgets",
    rating: 4.8,
    reviewCount: 1247,
    productImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
    pricePreview: "From K299",
    href: "/vendors/electronics-hub-zambia",
    categories: ["Electronics", "Smartphones", "Laptops", "Gaming"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "Up to 30% off",
    deliveryTime: "Same-day delivery available"
  },
  "zambian-fashion-house": {
    id: "vendor-2", 
    name: "Zambian Fashion House",
    tagline: "Authentic African fashion meets modern style",
    rating: 4.9,
    reviewCount: 987,
    productImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    pricePreview: "From K150",
    href: "/vendors/zambian-fashion-house",
    categories: ["Fashion", "Traditional Wear", "Modern Clothing", "Accessories"],
    location: "Ndola, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "15% off first order",
    deliveryTime: "2-3 days nationwide"
  },
  "craft-collective-zm": {
    id: "vendor-3",
    name: "Craft Collective ZM",
    tagline: "Handmade treasures from local artisans",
    rating: 4.7,
    reviewCount: 654,
    productImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80",
    pricePreview: "From K75",
    href: "/vendors/craft-collective-zm",
    categories: ["Crafts", "Art", "Home Decor", "Gifts"],
    location: "Kitwe, Zambia",
    isVerified: true,
    isFeatured: false,
    discount: "20% off handmade items",
    deliveryTime: "3-5 days"
  },
  "fresh-market-zambia": {
    id: "vendor-4",
    name: "Fresh Market Zambia",
    tagline: "Farm-fresh produce delivered to your door",
    rating: 4.6,
    reviewCount: 823,
    productImageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
    pricePreview: "From K25",
    href: "/vendors/fresh-market-zambia",
    categories: ["Food", "Fruits", "Vegetables", "Organic"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "10% off first order",
    deliveryTime: "Next-day delivery"
  },
  "zambia-auto-parts": {
    id: "vendor-5",
    name: "Zambia Auto Parts",
    tagline: "Quality automotive parts and accessories",
    rating: 4.5,
    reviewCount: 456,
    productImageUrl: "https://images.unsplash.com/photo-1486312338219-ce68ba2535d9?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1486312338219-ce68ba2535d9?w=200&q=80",
    pricePreview: "From K50",
    href: "/vendors/zambia-auto-parts",
    categories: ["Automotive", "Parts", "Accessories", "Tools"],
    location: "Kitwe, Zambia",
    isVerified: true,
    isFeatured: false,
    discount: "5% off orders over K500",
    deliveryTime: "2-4 days"
  },
  "lusaka-bookstore": {
    id: "vendor-6",
    name: "Lusaka Bookstore",
    tagline: "Books, knowledge, and inspiration for everyone",
    rating: 4.6,
    reviewCount: 342,
    productImageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80",
    pricePreview: "From K35",
    href: "/vendors/lusaka-bookstore",
    categories: ["Books", "Education", "Stationery", "Academic"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "20% off textbooks",
    deliveryTime: "1-2 days"
  },
  "copperbelt-sports": {
    id: "vendor-7",
    name: "Copperbelt Sports",
    tagline: "Sports equipment and gear for champions",
    rating: 4.7,
    reviewCount: 589,
    productImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80",
    pricePreview: "From K120",
    href: "/vendors/copperbelt-sports",
    categories: ["Sports", "Fitness", "Equipment", "Apparel"],
    location: "Ndola, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "15% off team orders",
    deliveryTime: "2-3 days"
  },
  "manda-hill-pharmacy": {
    id: "vendor-8",
    name: "Manda Hill Pharmacy",
    tagline: "Your health, our priority - trusted since 1995",
    rating: 4.8,
    reviewCount: 1156,
    productImageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
    vendorImageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=200&q=80",
    pricePreview: "From K15",
    href: "/vendors/manda-hill-pharmacy",
    categories: ["Health", "Medicine", "Wellness", "Beauty"],
    location: "Lusaka, Zambia",
    isVerified: true,
    isFeatured: true,
    discount: "10% off vitamins",
    deliveryTime: "Same day delivery"
  },
  // Additional vendors from product service
  "copper-craft-jewelry": {
    id: "ret-001",
    name: "Copper Craft Jewelry",
    tagline: "Handcrafted copper jewelry with traditional Zambian patterns",
    rating: 4.8,
    reviewCount: 127,
    productImageUrl: "https://images.pexels.com/photos/12026051/pexels-photo-12026051.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/12026051/pexels-photo-12026051.jpeg?w=200&q=80",
    pricePreview: "From K75",
    href: "/vendors/copper-craft-jewelry",
    categories: ["Jewelry", "Accessories", "Handmade", "Traditional"],
    location: "CBD, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "15% off first order",
    deliveryTime: "2-3 days"
  },
  "gemstone-gallery": {
    id: "ret-002",
    name: "Gemstone Gallery",
    tagline: "Authentic Zambian gemstones and luxury jewelry",
    rating: 4.9,
    reviewCount: 89,
    productImageUrl: "https://images.pexels.com/photos/12026053/pexels-photo-12026053.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/12026053/pexels-photo-12026053.jpeg?w=200&q=80",
    pricePreview: "From K200",
    href: "/vendors/gemstone-gallery",
    categories: ["Jewelry", "Gemstones", "Luxury", "Authentic"],
    location: "Woodlands, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Certificate of authenticity included",
    deliveryTime: "3-5 days"
  },
  "banda-fashion-house": {
    id: "ret-003",
    name: "Banda Fashion House",
    tagline: "Traditional and modern African fashion for every occasion",
    rating: 4.7,
    reviewCount: 203,
    productImageUrl: "https://images.pexels.com/photos/14538746/pexels-photo-14538746.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/14538746/pexels-photo-14538746.jpeg?w=200&q=80",
    pricePreview: "From K150",
    href: "/vendors/banda-fashion-house",
    categories: ["Fashion", "Traditional", "Modern", "Chitenge"],
    location: "Woodlands, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "20% off traditional wear",
    deliveryTime: "2-3 days"
  },
  "phiri-organic-foods": {
    id: "ret-004",
    name: "Phiri Organic Foods",
    tagline: "Pure, natural, and organic foods from local farmers",
    rating: 4.9,
    reviewCount: 156,
    productImageUrl: "https://images.pexels.com/photos/9228574/pexels-photo-9228574.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/9228574/pexels-photo-9228574.jpeg?w=200&q=80",
    pricePreview: "From K25",
    href: "/vendors/phiri-organic-foods",
    categories: ["Food", "Organic", "Natural", "Honey"],
    location: "Kabulonga, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Free delivery on orders over K200",
    deliveryTime: "Same day delivery"
  },
  "zulu-agricultural-supplies": {
    id: "ret-005",
    name: "Zulu Agricultural Supplies",
    tagline: "Quality seeds and farming supplies for productive agriculture",
    rating: 4.6,
    reviewCount: 78,
    productImageUrl: "https://images.pexels.com/photos/18142958/pexels-photo-18142958.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/18142958/pexels-photo-18142958.jpeg?w=200&q=80",
    pricePreview: "From K50",
    href: "/vendors/zulu-agricultural-supplies",
    categories: ["Agriculture", "Seeds", "Farming", "Organic"],
    location: "Olympia, Lusaka",
    isVerified: true,
    isFeatured: false,
    discount: "Bulk order discounts available",
    deliveryTime: "2-4 days"
  },
  "buildpro-tools": {
    id: "ret-006",
    name: "BuildPro Tools",
    tagline: "Professional tools and hardware for construction and DIY",
    rating: 4.5,
    reviewCount: 94,
    productImageUrl: "https://images.pexels.com/photos/9607005/pexels-photo-9607005.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/9607005/pexels-photo-9607005.jpeg?w=200&q=80",
    pricePreview: "From K80",
    href: "/vendors/buildpro-tools",
    categories: ["Tools", "Hardware", "Construction", "Professional"],
    location: "Industrial Area, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "2-year warranty on all tools",
    deliveryTime: "1-3 days"
  },
  "african-art-gallery": {
    id: "ret-007",
    name: "African Art Gallery",
    tagline: "Authentic African art and sculptures by renowned local artists",
    rating: 5.0,
    reviewCount: 23,
    productImageUrl: "https://images.pexels.com/photos/19652771/pexels-photo-19652771.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/19652771/pexels-photo-19652771.jpeg?w=200&q=80",
    pricePreview: "From K300",
    href: "/vendors/african-art-gallery",
    categories: ["Art", "Sculptures", "Culture", "Handmade"],
    location: "CBD, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Certificate of authenticity with every piece",
    deliveryTime: "3-7 days"
  },
  "mwanza-traditional-crafts": {
    id: "ret-008",
    name: "Mwanza Traditional Crafts",
    tagline: "Preserving tradition through handmade crafts and baskets",
    rating: 4.8,
    reviewCount: 67,
    productImageUrl: "https://images.pexels.com/photos/20943320/pexels-photo-20943320.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/20943320/pexels-photo-20943320.jpeg?w=200&q=80",
    pricePreview: "From K50",
    href: "/vendors/mwanza-traditional-crafts",
    categories: ["Crafts", "Traditional", "Handmade", "Baskets"],
    location: "Chilenje Market, Lusaka",
    isVerified: true,
    isFeatured: false,
    discount: "Custom orders welcome",
    deliveryTime: "2-5 days"
  },
  // Service providers
  "lusaka-medical-center": {
    id: "srv-001",
    name: "Lusaka Medical Center",
    tagline: "Professional healthcare services with experienced doctors",
    rating: 4.9,
    reviewCount: 245,
    productImageUrl: "https://images.pexels.com/photos/20860586/pexels-photo-20860586.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/20860586/pexels-photo-20860586.jpeg?w=200&q=80",
    pricePreview: "From K50",
    href: "/vendors/lusaka-medical-center",
    categories: ["Healthcare", "Medical", "Consultation", "Wellness"],
    location: "CBD, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Health packages available",
    deliveryTime: "Same day appointments"
  },
  "fitlife-gym": {
    id: "srv-002",
    name: "FitLife Gym",
    tagline: "Transform your fitness journey with personal training",
    rating: 4.8,
    reviewCount: 189,
    productImageUrl: "https://images.pexels.com/photos/5209197/pexels-photo-5209197.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/5209197/pexels-photo-5209197.jpeg?w=200&q=80",
    pricePreview: "From K75",
    href: "/vendors/fitlife-gym",
    categories: ["Fitness", "Training", "Health", "Gym"],
    location: "Kabulonga, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "First session 25% off",
    deliveryTime: "Flexible scheduling"
  },
  "lusaka-stay-rentals": {
    id: "srv-003",
    name: "Lusaka Stay Rentals",
    tagline: "Comfortable short-term accommodation for travelers",
    rating: 4.7,
    reviewCount: 156,
    productImageUrl: "https://images.pexels.com/photos/20260779/pexels-photo-20260779.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/20260779/pexels-photo-20260779.jpeg?w=200&q=80",
    pricePreview: "From K200",
    href: "/vendors/lusaka-stay-rentals",
    categories: ["Accommodation", "Rental", "Travel", "Furnished"],
    location: "Woodlands, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Weekly and monthly discounts",
    deliveryTime: "Instant booking"
  },
  "creative-spaces-design": {
    id: "srv-004",
    name: "Creative Spaces Design",
    tagline: "Transform your space with professional interior design",
    rating: 4.9,
    reviewCount: 98,
    productImageUrl: "https://images.pexels.com/photos/20607077/pexels-photo-20607077.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/20607077/pexels-photo-20607077.jpeg?w=200&q=80",
    pricePreview: "From K150",
    href: "/vendors/creative-spaces-design",
    categories: ["Interior Design", "Home", "Decoration", "Consultation"],
    location: "Olympia, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "3D visualization included",
    deliveryTime: "2-3 days for consultation"
  },
  "capture-moments-photography": {
    id: "srv-005",
    name: "Capture Moments Photography",
    tagline: "Professional photography for your special moments",
    rating: 4.8,
    reviewCount: 134,
    productImageUrl: "https://images.pexels.com/photos/4276830/pexels-photo-4276830.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/4276830/pexels-photo-4276830.jpeg?w=200&q=80",
    pricePreview: "From K300",
    href: "/vendors/capture-moments-photography",
    categories: ["Photography", "Events", "Wedding", "Professional"],
    location: "Chelstone, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Digital gallery included",
    deliveryTime: "Same day preview"
  },
  "quickmed-pharmacy": {
    id: "srv-006",
    name: "QuickMed Pharmacy",
    tagline: "Fast and reliable medicine delivery service",
    rating: 4.6,
    reviewCount: 287,
    productImageUrl: "https://images.pexels.com/photos/14027298/pexels-photo-14027298.jpeg?w=600&q=80",
    vendorImageUrl: "https://images.pexels.com/photos/14027298/pexels-photo-14027298.jpeg?w=200&q=80",
    pricePreview: "From K25",
    href: "/vendors/quickmed-pharmacy",
    categories: ["Pharmacy", "Medicine", "Delivery", "Healthcare"],
    location: "Various Locations, Lusaka",
    isVerified: true,
    isFeatured: true,
    discount: "Free delivery on orders over K100",
    deliveryTime: "Same day delivery"
  }
};

// Mock products database
const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "iPhone 15 Pro Max",
    description: "Latest Apple iPhone with advanced camera system and A17 Pro chip",
    price: 8999,
    originalPrice: 9999,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 234,
    tags: ["smartphone", "apple", "featured"],
    vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
    discountPercentage: 10,
    fastDelivery: true,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-2", 
    name: "MacBook Air M3",
    description: "Powerful laptop with M3 chip, perfect for professionals and students",
    price: 12499,
    originalPrice: 13999,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 156,
    tags: ["laptop", "apple", "professional"],
    vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
    discountPercentage: 11,
    fastDelivery: true,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-3",
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen and excellent camera",
    price: 7999,
    originalPrice: 8999,
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 22,
    rating: 4.7,
    reviewCount: 189,
    tags: ["smartphone", "samsung", "android"],
    vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
    discountPercentage: 11,
    fastDelivery: true,
    freeShipping: true,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-4",
    name: "Traditional Chitenge Dress",
    description: "Beautiful handmade dress featuring authentic Zambian chitenge fabric",
    price: 450,
    originalPrice: 550,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 89,
    tags: ["traditional", "chitenge", "dress", "featured"],
    vendor: { id: "vendor-2", name: "Zambian Fashion House" },
    discountPercentage: 18,
    fastDelivery: false,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-5",
    name: "Modern African Print Shirt",
    description: "Stylish shirt with contemporary African print design",
    price: 280,
    originalPrice: 350,
    images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 67,
    tags: ["modern", "african-print", "shirt"],
    vendor: { id: "vendor-2", name: "Zambian Fashion House" },
    discountPercentage: 20,
    fastDelivery: false,
    freeShipping: true,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-6",
    name: "Handwoven Basket Set",
    description: "Set of 3 beautiful handwoven baskets made by local artisans",
    price: 180,
    originalPrice: 220,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"],
    category: "Crafts",
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 45,
    tags: ["handmade", "baskets", "home-decor"],
    vendor: { id: "vendor-3", name: "Craft Collective ZM" },
    discountPercentage: 18,
    fastDelivery: false,
    freeShipping: false,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-7",
    name: "Wooden Sculpture",
    description: "Hand-carved wooden sculpture representing Zambian wildlife",
    price: 320,
    originalPrice: 400,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80"],
    category: "Crafts",
    inStock: true,
    stockQuantity: 6,
    rating: 4.8,
    reviewCount: 32,
    tags: ["handmade", "wood", "sculpture", "art"],
    vendor: { id: "vendor-3", name: "Craft Collective ZM" },
    discountPercentage: 20,
    fastDelivery: false,
    freeShipping: false,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-8",
    name: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes, picked fresh daily",
    price: 35,
    originalPrice: 45,
    images: ["https://images.unsplash.com/photo-1546470427-e8b30e31bb23?w=600&q=80"],
    category: "Food",
    inStock: true,
    stockQuantity: 50,
    rating: 4.4,
    reviewCount: 128,
    tags: ["organic", "fresh", "vegetables", "healthy"],
    vendor: { id: "vendor-4", name: "Fresh Market Zambia" },
    discountPercentage: 22,
    fastDelivery: true,
    freeShipping: false,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-9",
    name: "Car Engine Oil 5W-30",
    description: "Premium synthetic engine oil for optimal performance",
    price: 185,
    originalPrice: 220,
    images: ["https://images.unsplash.com/photo-1486312338219-ce68ba2535d9?w=600&q=80"],
    category: "Automotive",
    inStock: true,
    stockQuantity: 24,
    rating: 4.5,
    reviewCount: 67,
    tags: ["automotive", "engine-oil", "synthetic", "maintenance"],
    vendor: { id: "vendor-5", name: "Zambia Auto Parts" },
    discountPercentage: 16,
    fastDelivery: false,
    freeShipping: false,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-10",
    name: "Zambian History Textbook",
    description: "Comprehensive guide to Zambian history for students",
    price: 85,
    originalPrice: 110,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"],
    category: "Books",
    inStock: true,
    stockQuantity: 45,
    rating: 4.7,
    reviewCount: 89,
    tags: ["education", "history", "textbook", "students"],
    vendor: { id: "vendor-6", name: "Lusaka Bookstore" },
    discountPercentage: 23,
    fastDelivery: true,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-11",
    name: "Professional Football Boots",
    description: "High-quality football boots for serious players",
    price: 450,
    originalPrice: 580,
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"],
    category: "Sports",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 134,
    tags: ["football", "sports", "boots", "professional"],
    vendor: { id: "vendor-7", name: "Copperbelt Sports" },
    discountPercentage: 22,
    fastDelivery: true,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-12",
    name: "Vitamin C Supplements",
    description: "High-strength vitamin C tablets for immune support",
    price: 65,
    originalPrice: 85,
    images: ["https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80"],
    category: "Health",
    inStock: true,
    stockQuantity: 120,
    rating: 4.8,
    reviewCount: 256,
    tags: ["health", "vitamins", "supplements", "immunity"],
    vendor: { id: "vendor-8", name: "Manda Hill Pharmacy" },
    discountPercentage: 24,
    fastDelivery: true,
    freeShipping: false,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-13",
    name: "Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard for gaming enthusiasts",
    price: 320,
    originalPrice: 420,
    images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 98,
    tags: ["gaming", "keyboard", "mechanical", "rgb"],
    vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
    discountPercentage: 24,
    fastDelivery: true,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-14",
    name: "Traditional Bead Necklace",
    description: "Handcrafted traditional Zambian bead necklace",
    price: 95,
    originalPrice: 125,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"],
    category: "Crafts",
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 34,
    tags: ["traditional", "handmade", "jewelry", "beads"],
    vendor: { id: "vendor-3", name: "Craft Collective ZM" },
    discountPercentage: 24,
    fastDelivery: false,
    freeShipping: false,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-15",
    name: "African Print Ankara Dress",
    description: "Stunning African print dress made with premium ankara fabric",
    price: 380,
    originalPrice: 480,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 72,
    tags: ["african-print", "ankara", "dress", "fashion"],
    vendor: { id: "vendor-2", name: "Zambian Fashion House" },
    discountPercentage: 21,
    fastDelivery: false,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  // Additional products for comprehensive vendor coverage
  {
    id: "prod-16",
    name: "Handcrafted Copper Bracelet",
    description: "Beautiful handcrafted copper bracelet with traditional Zambian patterns",
    price: 150,
    originalPrice: 200,
    images: ["https://images.pexels.com/photos/12026051/pexels-photo-12026051.jpeg?w=600&q=80"],
    category: "Jewelry",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 127,
    tags: ["handmade", "traditional", "copper", "jewelry"],
    vendor: { id: "ret-001", name: "Copper Craft Jewelry" },
    discountPercentage: 25,
    fastDelivery: false,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-17",
    name: "Malachite Stone Necklace",
    description: "Stunning necklace featuring genuine Zambian malachite stones",
    price: 350,
    images: ["https://images.pexels.com/photos/12026053/pexels-photo-12026053.jpeg?w=600&q=80"],
    category: "Jewelry",
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 89,
    tags: ["malachite", "genuine", "luxury", "stones"],
    vendor: { id: "ret-002", name: "Gemstone Gallery" },
    discountPercentage: 0,
    fastDelivery: false,
    freeShipping: false,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-18",
    name: "Traditional Chitenge Dress",
    description: "Beautiful traditional chitenge dress with modern cut",
    price: 280,
    originalPrice: 350,
    images: ["https://images.pexels.com/photos/14538746/pexels-photo-14538746.jpeg?w=600&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewCount: 203,
    tags: ["chitenge", "traditional", "dress", "cotton"],
    vendor: { id: "ret-003", name: "Banda Fashion House" },
    discountPercentage: 20,
    fastDelivery: false,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-19",
    name: "Pure Zambian Honey",
    description: "Pure, raw honey sourced from Zambian beekeepers",
    price: 120,
    images: ["https://images.pexels.com/photos/9228574/pexels-photo-9228574.jpeg?w=600&q=80"],
    category: "Food",
    inStock: true,
    stockQuantity: 45,
    rating: 4.9,
    reviewCount: 156,
    tags: ["honey", "organic", "pure", "natural"],
    vendor: { id: "ret-004", name: "Phiri Organic Foods" },
    discountPercentage: 0,
    fastDelivery: true,
    freeShipping: false,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-20",
    name: "Organic Maize Seeds",
    description: "High-quality organic maize seeds with excellent germination rate",
    price: 85,
    images: ["https://images.pexels.com/photos/18142958/pexels-photo-18142958.jpeg?w=600&q=80"],
    category: "Agriculture",
    inStock: true,
    stockQuantity: 100,
    rating: 4.6,
    reviewCount: 78,
    tags: ["maize", "seeds", "organic", "agriculture"],
    vendor: { id: "ret-005", name: "Zulu Agricultural Supplies" },
    discountPercentage: 0,
    fastDelivery: false,
    freeShipping: false,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-21",
    name: "Professional Hammer Set",
    description: "Professional quality hammer set for construction and woodworking",
    price: 180,
    images: ["https://images.pexels.com/photos/9607005/pexels-photo-9607005.jpeg?w=600&q=80"],
    category: "Tools",
    inStock: true,
    stockQuantity: 32,
    rating: 4.5,
    reviewCount: 94,
    tags: ["tools", "hammer", "construction", "professional"],
    vendor: { id: "ret-006", name: "BuildPro Tools" },
    discountPercentage: 0,
    fastDelivery: true,
    freeShipping: true,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-22",
    name: "Wooden Sculpture - Elephant",
    description: "Hand-carved wooden elephant sculpture by renowned Zambian artist",
    price: 450,
    images: ["https://images.pexels.com/photos/19652771/pexels-photo-19652771.jpeg?w=600&q=80"],
    category: "Art",
    inStock: true,
    stockQuantity: 8,
    rating: 5.0,
    reviewCount: 23,
    tags: ["art", "sculpture", "wooden", "elephant"],
    vendor: { id: "ret-007", name: "African Art Gallery" },
    discountPercentage: 0,
    fastDelivery: false,
    freeShipping: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "prod-23",
    name: "Handwoven Basket Set",
    description: "Set of three handwoven baskets made from traditional materials",
    price: 220,
    images: ["https://images.pexels.com/photos/20943320/pexels-photo-20943320.jpeg?w=600&q=80"],
    category: "Crafts",
    inStock: true,
    stockQuantity: 20,
    rating: 4.8,
    reviewCount: 67,
    tags: ["baskets", "handwoven", "traditional", "storage"],
    vendor: { id: "ret-008", name: "Mwanza Traditional Crafts" },
    discountPercentage: 0,
    fastDelivery: false,
    freeShipping: false,
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

/**
 * Generate a store slug from vendor name
 */
export function generateStoreSlug(vendorName: string): string {
  return vendorName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Get vendor by store slug
 */
export async function getVendorBySlug(storeSlug: string): Promise<Vendor | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockVendors[storeSlug] || null;
}

/**
 * Get vendor by ID
 */
export async function getVendorById(vendorId: string): Promise<Vendor | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return Object.values(mockVendors).find(vendor => vendor.id === vendorId) || null;
}

/**
 * Get all vendors
 */
export async function getAllVendors(): Promise<Vendor[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return Object.values(mockVendors);
}

/**
 * Get products by vendor ID
 */
export async function getProductsByVendorId(vendorId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockProducts.filter(product => product.vendor.id === vendorId);
}

/**
 * Get featured vendors
 */
export async function getFeaturedVendors(limit: number = 6): Promise<Vendor[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return Object.values(mockVendors)
    .filter(vendor => vendor.isFeatured)
    .slice(0, limit);
}

/**
 * Search vendors by name or category
 */
export async function searchVendors(query: string): Promise<Vendor[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 250));

  const lowercaseQuery = query.toLowerCase();

  return Object.values(mockVendors).filter(vendor =>
    vendor.name.toLowerCase().includes(lowercaseQuery) ||
    vendor.tagline?.toLowerCase().includes(lowercaseQuery) ||
    vendor.categories?.some(category =>
      category.toLowerCase().includes(lowercaseQuery)
    )
  );
}

/**
 * Get vendor statistics
 */
export async function getVendorStats(vendorId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const vendor = Object.values(mockVendors).find(v => v.id === vendorId);
  const products = mockProducts.filter(p => p.vendor.id === vendorId);

  if (!vendor) return null;

  // Use deterministic values based on vendor ID to avoid hydration issues
  const vendorHash = vendorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return {
    totalProducts: products.length,
    totalReviews: vendor.reviewCount,
    averageRating: vendor.rating,
    totalOrders: 1000 + (vendorHash % 4000), // Deterministic based on vendor ID
    responseTime: "< 2 hours",
    joinDate: "2022-03-15", // Mock join date
    successRate: 90 + (vendorHash % 10) // Deterministic 90-99%
  };
}

/**
 * Add vendor to favorites (mock implementation)
 */
export async function toggleVendorFavorite(vendorId: string, isFavorited: boolean): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // In a real app, this would update the user's favorites in the database
  console.log(`${isFavorited ? 'Added' : 'Removed'} vendor ${vendorId} ${isFavorited ? 'to' : 'from'} favorites`);

  return !isFavorited; // Return new state
}

/**
 * Get vendor by product ID
 */
export async function getVendorByProductId(productId: string): Promise<Vendor | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const product = mockProducts.find(p => p.id === productId);
  if (!product) return null;

  return Object.values(mockVendors).find(vendor => vendor.id === product.vendor.id) || null;
}
