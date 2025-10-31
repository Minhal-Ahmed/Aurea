// scripts/seedProducts.js
// Run this with: node scripts/seedProducts.js

const { MongoClient } = require('mongodb');


const MONGODB_URI='mongodb+srv://Minhal:e43cd0sHDz84XNtv@aureacluster.2djasjx.mongodb.net/aurea_ecommerce?retryWrites=true&w=majority&appName=AureaCluster'; // Replace with your actual URI'

const products = [
  // Scented Candles
  {
    name: "Lavender Dreams Candle",
    slug: "lavender-dreams-candle",
    description: "<p>Indulge in the calming embrace of <strong>pure lavender</strong>. Hand-poured with natural soy wax, this candle creates a serene atmosphere perfect for relaxation and meditation.</p>",
    price: 1200,
    category: "Scented Candles",
    images: ["https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=800"],
    inStock: true,
    stockQuantity: 25,
    featured: true,
    badge: "Bestseller",
    specifications: {
      "Burn Time": "40 hours",
      "Weight": "200g",
      "Scent": "Lavender",
      "Wax Type": "Soy Wax"
    },
    seo: {
      metaTitle: "Lavender Dreams Scented Candle | Aurea",
      metaDescription: "Hand-poured lavender scented candle made with natural soy wax. 40-hour burn time. Perfect for relaxation and creating a calming atmosphere.",
      keywords: ["lavender candle", "scented candle", "soy wax candle", "relaxation candle"],
      ogTitle: "Lavender Dreams Candle - Natural Soy Wax",
      ogDescription: "Calming lavender scented candle for relaxation",
      ogImage: "https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=1200",
      canonicalUrl: "/products/lavender-dreams-candle",
      imageAlt: "Lavender scented candle in glass jar",
      schemaType: "Product"
    },
    seoScore: 95,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vanilla Bliss Candle",
    slug: "vanilla-bliss-candle",
    description: "<p>Experience the <strong>sweet warmth</strong> of Madagascar vanilla. This luxurious candle fills your space with comfort and elegance.</p>",
    price: 1150,
    category: "Scented Candles",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800"],
    inStock: true,
    stockQuantity: 30,
    featured: true,
    badge: "New",
    specifications: {
      "Burn Time": "35 hours",
      "Weight": "180g",
      "Scent": "Vanilla",
      "Wax Type": "Soy Wax"
    },
    seo: {
      metaTitle: "Vanilla Bliss Scented Candle | Aurea",
      metaDescription: "Sweet Madagascar vanilla scented candle. Hand-poured soy wax with 35-hour burn time. Creates a warm and comforting atmosphere.",
      keywords: ["vanilla candle", "sweet candle", "home fragrance", "soy candle"],
      ogTitle: "Vanilla Bliss Candle",
      ogDescription: "Warm vanilla scented candle",
      ogImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1200",
      canonicalUrl: "/products/vanilla-bliss-candle",
      imageAlt: "Vanilla scented candle",
      schemaType: "Product"
    },
    seoScore: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rose Garden Candle",
    slug: "rose-garden-candle",
    description: "<p>A <strong>romantic blend</strong> of fresh rose petals. Elegant and timeless, perfect for special occasions.</p>",
    price: 1300,
    category: "Scented Candles",
    images: ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800"],
    inStock: true,
    stockQuantity: 20,
    featured: false,
    specifications: {
      "Burn Time": "45 hours",
      "Weight": "220g",
      "Scent": "Rose",
      "Wax Type": "Soy Wax"
    },
    seo: {
      metaTitle: "Rose Garden Scented Candle | Aurea",
      metaDescription: "Romantic rose scented candle with 45-hour burn time. Perfect for special occasions and creating an elegant atmosphere.",
      keywords: ["rose candle", "romantic candle", "floral candle"],
      ogTitle: "Rose Garden Candle",
      ogDescription: "Elegant rose scented candle",
      ogImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200",
      canonicalUrl: "/products/rose-garden-candle",
      imageAlt: "Rose scented candle in decorative jar",
      schemaType: "Product"
    },
    seoScore: 85,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ocean Breeze Candle",
    slug: "ocean-breeze-candle",
    description: "<p>Fresh and <strong>invigorating marine scent</strong>. Brings the calming essence of the ocean to your home.</p>",
    price: 1100,
    category: "Scented Candles",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800"],
    inStock: true,
    stockQuantity: 18,
    featured: false,
    specifications: {
      "Burn Time": "38 hours",
      "Weight": "190g",
      "Scent": "Ocean Breeze",
      "Wax Type": "Soy Wax"
    },
    seo: {
      metaTitle: "Ocean Breeze Scented Candle | Aurea",
      metaDescription: "Fresh marine scented candle. 38-hour burn time. Brings the calming ocean atmosphere to your home.",
      keywords: ["ocean candle", "fresh candle", "marine scent"],
      ogTitle: "Ocean Breeze Candle",
      ogDescription: "Fresh ocean scented candle",
      ogImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1200",
      canonicalUrl: "/products/ocean-breeze-candle",
      imageAlt: "Ocean breeze scented candle",
      schemaType: "Product"
    },
    seoScore: 88,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Cinnamon Spice Candle",
    slug: "cinnamon-spice-candle",
    description: "<p><strong>Warm and cozy</strong> cinnamon fragrance. Perfect for autumn and winter evenings.</p>",
    price: 1250,
    category: "Scented Candles",
    images: ["https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=800"],
    inStock: true,
    stockQuantity: 22,
    featured: false,
    badge: "Seasonal",
    specifications: {
      "Burn Time": "42 hours",
      "Weight": "210g",
      "Scent": "Cinnamon",
      "Wax Type": "Soy Wax"
    },
    seo: {
      metaTitle: "Cinnamon Spice Candle | Aurea",
      metaDescription: "Warm cinnamon scented candle perfect for cozy evenings. 42-hour burn time with natural soy wax.",
      keywords: ["cinnamon candle", "spice candle", "winter candle"],
      ogTitle: "Cinnamon Spice Candle",
      ogDescription: "Cozy cinnamon scented candle",
      ogImage: "https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=1200",
      canonicalUrl: "/products/cinnamon-spice-candle",
      imageAlt: "Cinnamon spice candle",
      schemaType: "Product"
    },
    seoScore: 92,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Wall Décor
  {
    name: "Islamic Calligraphy Frame - Gold",
    slug: "islamic-calligraphy-frame-gold",
    description: "<p>Elegant <strong>Islamic calligraphy</strong> with gold leaf detailing. Handcrafted wooden frame adds sophistication to any space.</p>",
    price: 2500,
    category: "Wall Décor",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800"],
    inStock: true,
    stockQuantity: 12,
    featured: true,
    badge: "Handmade",
    specifications: {
      "Dimensions": "16x20 inches",
      "Material": "Wood & Glass",
      "Finish": "Gold Leaf",
      "Orientation": "Portrait"
    },
    seo: {
      metaTitle: "Islamic Calligraphy Gold Frame | Aurea",
      metaDescription: "Handcrafted Islamic calligraphy wall art with gold leaf detailing. 16x20 inches wooden frame. Perfect for home or office.",
      keywords: ["islamic art", "calligraphy frame", "wall decor", "gold frame"],
      ogTitle: "Islamic Calligraphy Frame - Gold",
      ogDescription: "Elegant handcrafted Islamic wall art",
      ogImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200",
      canonicalUrl: "/products/islamic-calligraphy-frame-gold",
      imageAlt: "Islamic calligraphy frame with gold detailing",
      schemaType: "Product"
    },
    seoScore: 95,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Boho Macrame Wall Hanging",
    slug: "boho-macrame-wall-hanging",
    description: "<p><strong>Handwoven macrame</strong> art piece. Adds texture and bohemian charm to your walls.</p>",
    price: 1800,
    category: "Wall Décor",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"],
    inStock: true,
    stockQuantity: 15,
    featured: false,
    specifications: {
      "Length": "36 inches",
      "Material": "Cotton Rope",
      "Style": "Bohemian",
      "Color": "Natural Beige"
    },
    seo: {
      metaTitle: "Boho Macrame Wall Hanging | Aurea",
      metaDescription: "Handwoven macrame wall art. 36 inches natural cotton rope. Perfect bohemian home decor piece.",
      keywords: ["macrame", "boho decor", "wall hanging", "handwoven"],
      ogTitle: "Boho Macrame Wall Hanging",
      ogDescription: "Handwoven bohemian wall art",
      ogImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200",
      canonicalUrl: "/products/boho-macrame-wall-hanging",
      imageAlt: "Boho macrame wall hanging",
      schemaType: "Product"
    },
    seoScore: 88,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vintage Mirror - Brass Frame",
    slug: "vintage-mirror-brass-frame",
    description: "<p>Stunning <strong>vintage-inspired mirror</strong> with ornate brass frame. A statement piece for any room.</p>",
    price: 3500,
    category: "Wall Décor",
    images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?w=800"],
    inStock: true,
    stockQuantity: 8,
    featured: true,
    specifications: {
      "Dimensions": "24 inches diameter",
      "Material": "Brass & Glass",
      "Style": "Vintage",
      "Weight": "2.5 kg"
    },
    seo: {
      metaTitle: "Vintage Brass Frame Mirror | Aurea",
      metaDescription: "Ornate vintage mirror with brass frame. 24 inches diameter. Statement wall decor piece for any room.",
      keywords: ["vintage mirror", "brass mirror", "decorative mirror", "wall mirror"],
      ogTitle: "Vintage Mirror - Brass Frame",
      ogDescription: "Elegant vintage brass mirror",
      ogImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200",
      canonicalUrl: "/products/vintage-mirror-brass-frame",
      imageAlt: "Vintage brass frame mirror",
      schemaType: "Product"
    },
    seoScore: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Abstract Canvas Art Set",
    slug: "abstract-canvas-art-set",
    description: "<p>Set of 3 <strong>modern abstract paintings</strong>. Neutral tones complement any interior design.</p>",
    price: 4200,
    category: "Wall Décor",
    images: ["https://images.unsplash.com/photo-1579762593131-e4a3bbb95868?w=800"],
    inStock: true,
    stockQuantity: 10,
    featured: false,
    specifications: {
      "Pieces": "Set of 3",
      "Size Each": "12x16 inches",
      "Material": "Canvas & Acrylic",
      "Style": "Abstract Modern"
    },
    seo: {
      metaTitle: "Abstract Canvas Art Set of 3 | Aurea",
      metaDescription: "Modern abstract canvas paintings set. Neutral tones, 12x16 inches each. Perfect wall art trio for contemporary homes.",
      keywords: ["abstract art", "canvas paintings", "wall art set", "modern decor"],
      ogTitle: "Abstract Canvas Art Set",
      ogDescription: "Set of 3 modern abstract paintings",
      ogImage: "https://images.unsplash.com/photo-1579762593131-e4a3bbb95868?w=1200",
      canonicalUrl: "/products/abstract-canvas-art-set",
      imageAlt: "Abstract canvas art set of 3",
      schemaType: "Product"
    },
    seoScore: 92,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Floral Wall Tapestry",
    slug: "floral-wall-tapestry",
    description: "<p>Beautiful <strong>hand-embroidered floral tapestry</strong>. Adds color and warmth to your space.</p>",
    price: 2200,
    category: "Wall Décor",
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800"],
    inStock: true,
    stockQuantity: 14,
    featured: false,
    specifications: {
      "Dimensions": "40x30 inches",
      "Material": "Fabric & Thread",
      "Style": "Traditional",
      "Care": "Spot Clean Only"
    },
    seo: {
      metaTitle: "Hand-Embroidered Floral Wall Tapestry | Aurea",
      metaDescription: "Beautiful floral tapestry with hand embroidery. 40x30 inches. Traditional craftsmanship for elegant home decor.",
      keywords: ["tapestry", "floral wall art", "embroidered decor", "traditional art"],
      ogTitle: "Floral Wall Tapestry",
      ogDescription: "Hand-embroidered floral tapestry",
      ogImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200",
      canonicalUrl: "/products/floral-wall-tapestry",
      imageAlt: "Floral wall tapestry with embroidery",
      schemaType: "Product"
    },
    seoScore: 87,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Aroma Diffusers
  {
    name: "Ceramic Ultrasonic Diffuser",
    slug: "ceramic-ultrasonic-diffuser",
    description: "<p>Elegant <strong>ceramic diffuser</strong> with LED lights. Runs for 6 hours and covers 300 sq ft.</p>",
    price: 2800,
    category: "Aroma Diffusers",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"],
    inStock: true,
    stockQuantity: 16,
    featured: true,
    badge: "Premium",
    specifications: {
      "Coverage": "300 sq ft",
      "Runtime": "6 hours",
      "Capacity": "120ml",
      "Features": "LED Lights, Auto-off"
    },
    seo: {
      metaTitle: "Ceramic Ultrasonic Aroma Diffuser | Aurea",
      metaDescription: "Premium ceramic ultrasonic diffuser with LED lights. 6-hour runtime, 300 sq ft coverage. Perfect for home aromatherapy.",
      keywords: ["aroma diffuser", "ultrasonic diffuser", "essential oil diffuser", "ceramic diffuser"],
      ogTitle: "Ceramic Ultrasonic Diffuser",
      ogDescription: "Premium diffuser with LED lights",
      ogImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200",
      canonicalUrl: "/products/ceramic-ultrasonic-diffuser",
      imageAlt: "Ceramic ultrasonic aroma diffuser",
      schemaType: "Product"
    },
    seoScore: 94,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Reed Diffuser Set - Sandalwood",
    slug: "reed-diffuser-set-sandalwood",
    description: "<p>Luxurious <strong>sandalwood reed diffuser</strong>. Continuous fragrance for up to 3 months.</p>",
    price: 1600,
    category: "Aroma Diffusers",
    images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800"],
    inStock: true,
    stockQuantity: 20,
    featured: false,
    specifications: {
      "Duration": "3 months",
      "Volume": "100ml",
      "Scent": "Sandalwood",
      "Reeds": "8 pieces"
    },
    seo: {
      metaTitle: "Sandalwood Reed Diffuser Set | Aurea",
      metaDescription: "Luxurious sandalwood reed diffuser. Lasts up to 3 months. Continuous home fragrance with natural essential oils.",
      keywords: ["reed diffuser", "sandalwood", "home fragrance", "essential oils"],
      ogTitle: "Reed Diffuser Set - Sandalwood",
      ogDescription: "Long-lasting sandalwood reed diffuser",
      ogImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200",
      canonicalUrl: "/products/reed-diffuser-set-sandalwood",
      imageAlt: "Sandalwood reed diffuser set",
      schemaType: "Product"
    },
    seoScore: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bamboo Essential Oil Diffuser",
    slug: "bamboo-essential-oil-diffuser",
    description: "<p>Eco-friendly <strong>bamboo diffuser</strong> with natural wood finish. Quiet operation and color-changing lights.</p>",
    price: 3200,
    category: "Aroma Diffusers",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"],
    inStock: true,
    stockQuantity: 12,
    featured: true,
    specifications: {
      "Material": "Bamboo",
      "Runtime": "8 hours",
      "Capacity": "150ml",
      "Noise Level": "Ultra Quiet"
    },
    seo: {
      metaTitle: "Bamboo Essential Oil Diffuser | Aurea",
      metaDescription: "Eco-friendly bamboo diffuser with 8-hour runtime. Ultra-quiet operation with color-changing LED lights.",
      keywords: ["bamboo diffuser", "eco-friendly diffuser", "essential oil", "quiet diffuser"],
      ogTitle: "Bamboo Essential Oil Diffuser",
      ogDescription: "Natural bamboo aromatherapy diffuser",
      ogImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200",
      canonicalUrl: "/products/bamboo-essential-oil-diffuser",
      imageAlt: "Bamboo essential oil diffuser",
      schemaType: "Product"
    },
    seoScore: 93,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Accessories
  {
    name: "Brass Candle Holder Set",
    slug: "brass-candle-holder-set",
    description: "<p>Set of 3 <strong>vintage brass candle holders</strong>. Different heights create visual interest.</p>",
    price: 1500,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1514923995763-768e52f5af87?w=800"],
    inStock: true,
    stockQuantity: 18,
    featured: false,
    specifications: {
      "Pieces": "Set of 3",
      "Heights": "6, 8, 10 inches",
      "Material": "Brass",
      "Style": "Vintage"
    },
    seo: {
      metaTitle: "Brass Candle Holder Set of 3 | Aurea",
      metaDescription: "Vintage brass candle holder set. Three different heights (6, 8, 10 inches). Perfect for elegant table settings.",
      keywords: ["candle holders", "brass holders", "vintage decor", "table accessories"],
      ogTitle: "Brass Candle Holder Set",
      ogDescription: "Set of 3 vintage brass holders",
      ogImage: "https://images.unsplash.com/photo-1514923995763-768e52f5af87?w=1200",
      canonicalUrl: "/products/brass-candle-holder-set",
      imageAlt: "Brass candle holder set of 3",
      schemaType: "Product"
    },
    seoScore: 86,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Decorative Tray - Marble Finish",
    slug: "decorative-tray-marble-finish",
    description: "<p>Elegant <strong>marble-finish serving tray</strong>. Perfect for displaying candles or serving guests.</p>",
    price: 2100,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1578898886389-2f69774e0d27?w=800"],
    inStock: true,
    stockQuantity: 14,
    featured: false,
    specifications: {
      "Dimensions": "14x10 inches",
      "Material": "Resin with Marble Finish",
      "Color": "White & Gold",
      "Weight": "1.2 kg"
    },
    seo: {
      metaTitle: "Marble Finish Decorative Tray | Aurea",
      metaDescription: "Elegant marble-finish serving tray. 14x10 inches with gold accents. Perfect for home decor and entertaining.",
      keywords: ["decorative tray", "marble tray", "serving tray", "home accessories"],
      ogTitle: "Decorative Tray - Marble Finish",
      ogDescription: "Elegant marble serving tray",
      ogImage: "https://images.unsplash.com/photo-1578898886389-2f69774e0d27?w=1200",
      canonicalUrl: "/products/decorative-tray-marble-finish",
      imageAlt: "Marble finish decorative tray",
      schemaType: "Product"
    },
    seoScore: 88,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Crystal Vase - Contemporary",
    slug: "crystal-vase-contemporary",
    description: "<p>Modern <strong>crystal glass vase</strong>. Geometric design perfect for fresh or dried flowers.</p>",
    price: 1900,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1581858281062-3d2745f3af21?w=800"],
    inStock: true,
    stockQuantity: 16,
    featured: false,
    specifications: {
      "Height": "10 inches",
      "Material": "Crystal Glass",
      "Style": "Contemporary",
      "Opening": "3 inches diameter"
    },
    seo: {
      metaTitle: "Contemporary Crystal Glass Vase | Aurea",
      metaDescription: "Modern geometric crystal vase. 10 inches height. Perfect for fresh or dried flower arrangements.",
      keywords: ["crystal vase", "glass vase", "flower vase", "modern decor"],
      ogTitle: "Crystal Vase - Contemporary",
      ogDescription: "Modern geometric crystal vase",
      ogImage: "https://images.unsplash.com/photo-1581858281062-3d2745f3af21?w=1200",
      canonicalUrl: "/products/crystal-vase-contemporary",
      imageAlt: "Contemporary crystal glass vase",
      schemaType: "Product"
    },
    seoScore: 85,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Gift Sets
  {
    name: "Luxury Spa Gift Set",
    slug: "luxury-spa-gift-set",
    description: "<p>Complete <strong>spa experience at home</strong>. Includes 2 candles, diffuser, and essential oils. Beautifully packaged.</p>",
    price: 4500,
    category: "Gift Sets",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"],
    inStock: true,
    stockQuantity: 10,
    featured: true,
    badge: "Gift",
    specifications: {
      "Includes": "2 Candles, 1 Diffuser, 3 Essential Oils",
      "Packaging": "Luxury Gift Box",
      "Total Value": "PKR 5,500",
      "Ribbon": "Included"
    },
    seo: {
      metaTitle: "Luxury Spa Gift Set | Aurea",
      metaDescription: "Complete spa gift set with candles, diffuser, and essential oils. Beautifully packaged luxury gift box perfect for any occasion.",
      keywords: ["spa gift set", "luxury gift", "candle gift set", "aromatherapy gift"],
      ogTitle: "Luxury Spa Gift Set",
      ogDescription: "Complete spa experience gift set",
      ogImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200",
      canonicalUrl: "/products/luxury-spa-gift-set",
      imageAlt: "Luxury spa gift set with candles and diffuser",
      schemaType: "Product"
    },
    seoScore: 96,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Home Décor Starter Pack",
    slug: "home-decor-starter-pack",
    description: "<p><strong>Everything you need</strong> to transform your space. 3 candles, 1 wall frame, decorative tray.</p>",
    price: 5200,
    category: "Gift Sets",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800"],
    inStock: true,
    stockQuantity: 8,
    featured: true,
    specifications: {
      "Includes": "3 Candles, 1 Wall Frame, 1 Tray",
      "Style": "Mixed",
      "Packaging": "Gift Wrapped",
      "Value": "PKR 6,000"
    },
    seo: {
      metaTitle: "Home Décor Starter Pack | Aurea",
      metaDescription: "Complete home decor gift set. Includes 3 candles, wall frame, and decorative tray. Perfect for new homes or gifts.",
      keywords: ["home decor set", "starter pack", "gift bundle", "home accessories"],
      ogTitle: "Home Décor Starter Pack",
      ogDescription: "Complete home transformation set",
      ogImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200",
      canonicalUrl: "/products/home-decor-starter-pack",
      imageAlt: "Home decor starter pack gift set",
      schemaType: "Product"
    },
    seoScore: 94,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Candle Lover's Collection",
    slug: "candle-lovers-collection",
    description: "<p>Curated set of <strong>4 bestselling candles</strong>. Mix of floral, woody, and fresh scents. Perfect gift for candle enthusiasts.</p>",
    price: 3800,
    category: "Gift Sets",
    images: ["https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=800"],
    inStock: true,
    stockQuantity: 12,
    featured: false,
    badge: "Bundle",
    specifications: {
      "Includes": "4 Candles (200g each)",
      "Scents": "Lavender, Vanilla, Rose, Cinnamon",
      "Total Burn Time": "160 hours",
      "Packaging": "Gift Box"
    },
    seo: {
      metaTitle: "Candle Lover's Collection Set | Aurea",
      metaDescription: "Curated set of 4 bestselling scented candles. Lavender, vanilla, rose, and cinnamon. 160 hours total burn time.",
      keywords: ["candle set", "scented candles", "candle gift", "candle collection"],
      ogTitle: "Candle Lover's Collection",
      ogDescription: "Set of 4 bestselling candles",
      ogImage: "https://images.unsplash.com/photo-1602874801006-33c7a0c57b8d?w=1200",
      canonicalUrl: "/products/candle-lovers-collection",
      imageAlt: "Collection of 4 scented candles",
      schemaType: "Product"
    },
    seoScore: 91,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Minimalist Home Bundle",
    slug: "minimalist-home-bundle",
    description: "<p><strong>Clean and simple</strong> aesthetic. Neutral candles, bamboo diffuser, and ceramic accessories.</p>",
    price: 4800,
    category: "Gift Sets",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800"],
    inStock: true,
    stockQuantity: 7,
    featured: false,
    specifications: {
      "Includes": "2 Candles, 1 Diffuser, 1 Vase",
      "Style": "Minimalist",
      "Colors": "Neutral Tones",
      "Packaging": "Eco Box"
    },
    seo: {
      metaTitle: "Minimalist Home Bundle | Aurea",
      metaDescription: "Clean minimalist home decor set. Neutral candles, bamboo diffuser, and ceramic vase. Eco-friendly packaging.",
      keywords: ["minimalist decor", "neutral home", "eco bundle", "simple living"],
      ogTitle: "Minimalist Home Bundle",
      ogDescription: "Clean minimalist decor set",
      ogImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1200",
      canonicalUrl: "/products/minimalist-home-bundle",
      imageAlt: "Minimalist home decor bundle",
      schemaType: "Product"
    },
    seoScore: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Wedding Gift Box",
    slug: "wedding-gift-box",
    description: "<p>Elegant <strong>wedding gift set</strong>. Rose candles, crystal vase, and brass holders. Luxury packaging.</p>",
    price: 6500,
    category: "Gift Sets",
    images: ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800"],
    inStock: true,
    stockQuantity: 5,
    featured: true,
    badge: "Premium",
    specifications: {
      "Includes": "2 Rose Candles, 1 Crystal Vase, 3 Brass Holders",
      "Occasion": "Weddings",
      "Packaging": "Luxury White Box",
      "Card": "Personalized Message Available"
    },
    seo: {
      metaTitle: "Elegant Wedding Gift Box | Aurea",
      metaDescription: "Luxury wedding gift set with rose candles, crystal vase, and brass holders. Beautifully packaged with personalized message option.",
      keywords: ["wedding gift", "luxury gift set", "bridal gift", "elegant gift"],
      ogTitle: "Wedding Gift Box",
      ogDescription: "Elegant luxury wedding gift",
      ogImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200",
      canonicalUrl: "/products/wedding-gift-box",
      imageAlt: "Elegant wedding gift box set",
      schemaType: "Product"
    },
    seoScore: 97,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("aurea_ecommerce");
    const collection = db.collection("products");

    // Clear existing products (optional - remove this if you want to keep existing)
    // await collection.deleteMany({});
    // console.log("🗑️  Cleared existing products");

    // Insert products
    const result = await collection.insertMany(products);
    console.log(`✅ Successfully inserted ${result.insertedCount} products!`);

    console.log("\n📦 Products added:");
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - PKR ${p.price} (${p.category})`);
    });

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await client.close();
    console.log("\n✅ Database connection closed");
  }
}

// Run the seed
seedDatabase();