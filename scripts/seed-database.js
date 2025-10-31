import clientPromise from "../lib/mongodb.js"
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sampleProducts = [
  {
    name: "Jasmine Nights Candle",
    description:
      "Hand-poured soy wax candle with natural jasmine fragrance. Perfect for creating a relaxing ambiance in your bedroom or living room.",
    price: 1200,
    category: "Scented Candles",
    images: [
      "/elegant-jasmine-scented-candle-in-glass-jar.jpg",
      "/jasmine-candle-side-view.jpg",
      "/jasmine-candle-burning.jpg",
    ],
    inStock: true,
    stockQuantity: 25,
    featured: true,
    badge: "Best Seller",
    specifications: {
      material: "Soy Wax",
      dimensions: "8cm x 10cm",
      weight: "300g",
      fragrance: "Natural Jasmine",
      burnTime: "40-45 hours",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Handcrafted Geometric Frame",
    description: "Beautiful handmade wooden frame with intricate geometric patterns. Adds elegance to any wall space.",
    price: 2500,
    category: "Wall Décor",
    images: [
      "/handmade-geometric-wooden-wall-frame-with-intricat.jpg",
      "/geometric-frame-close-up.jpg",
      "/geometric-frame-on-wall.jpg",
    ],
    inStock: true,
    stockQuantity: 15,
    featured: true,
    badge: "New",
    specifications: {
      material: "Mango Wood",
      dimensions: "30cm x 40cm",
      weight: "800g",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rose Garden Diffuser",
    description: "Premium reed diffuser with natural rose fragrance. Long-lasting scent for up to 3 months.",
    price: 1800,
    category: "Aroma Diffusers",
    images: ["/elegant-rose-scented-reed-diffuser-with-wooden-sti.jpg"],
    inStock: true,
    stockQuantity: 20,
    featured: true,
    badge: "Popular",
    specifications: {
      material: "Glass Bottle, Rattan Reeds",
      dimensions: "12cm x 6cm",
      weight: "250g",
      fragrance: "Natural Rose",
      burnTime: "3 months",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Vintage Brass Lantern",
    description: "Handcrafted brass lantern with intricate cutout patterns. Perfect for outdoor or indoor decoration.",
    price: 3200,
    category: "Accessories",
    images: ["/vintage-brass-decorative-lantern-with-intricate-cu.jpg"],
    inStock: true,
    stockQuantity: 8,
    featured: true,
    badge: "",
    specifications: {
      material: "Brass",
      dimensions: "15cm x 25cm",
      weight: "1.2kg",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sandalwood Serenity Set",
    description:
      "Complete gift set with sandalwood candle, incense sticks, and wooden holder. Perfect for meditation and relaxation.",
    price: 2800,
    category: "Gift Sets",
    images: ["/sandalwood-candle-and-incense-gift-set-in-elegant-.jpg"],
    inStock: true,
    stockQuantity: 12,
    featured: true,
    badge: "Gift Set",
    specifications: {
      material: "Soy Wax, Natural Wood",
      dimensions: "Gift Box: 25cm x 20cm",
      weight: "600g",
      fragrance: "Sandalwood",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Calligraphy Wall Art",
    description: "Beautiful Urdu calligraphy in handcrafted wooden frame. Adds cultural elegance to your home.",
    price: 1900,
    category: "Wall Décor",
    images: ["/beautiful-urdu-calligraphy-wall-art-in-wooden-fram.jpg"],
    inStock: true,
    stockQuantity: 10,
    featured: true,
    badge: "Handmade",
    specifications: {
      material: "Wood, Canvas",
      dimensions: "35cm x 25cm",
      weight: "400g",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Additional products for shop page
  {
    name: "Lavender Dreams Candle",
    description: "Soothing lavender scented candle in elegant purple glass jar.",
    price: 1100,
    category: "Scented Candles",
    images: ["/lavender-scented-candle-in-purple-glass.jpg"],
    inStock: true,
    stockQuantity: 30,
    featured: false,
    badge: "",
    specifications: {
      material: "Soy Wax",
      dimensions: "8cm x 9cm",
      weight: "280g",
      fragrance: "Lavender",
      burnTime: "35-40 hours",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Luxury Oud Diffuser",
    description: "Premium oud reed diffuser with gold accents for sophisticated spaces.",
    price: 2200,
    category: "Aroma Diffusers",
    images: ["/luxury-oud-reed-diffuser-with-gold-accents.jpg"],
    inStock: true,
    stockQuantity: 15,
    featured: false,
    badge: "Luxury",
    specifications: {
      material: "Glass, Gold-plated accents",
      dimensions: "14cm x 7cm",
      weight: "300g",
      fragrance: "Oud",
      burnTime: "4 months",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("aurea_ecommerce")

    // Clear existing products
    console.log("Clearing existing products...")
    await db.collection("products").deleteMany({})

    // Insert sample products
    console.log("Inserting sample products...")
    const result = await db.collection("products").insertMany(sampleProducts)

    console.log(`Successfully inserted ${result.insertedCount} products`)
    console.log("Database seeded successfully!")

    // Create indexes for better performance
    console.log("Creating indexes...")
    await db.collection("products").createIndex({ name: "text", description: "text" })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("products").createIndex({ featured: 1 })
    await db.collection("products").createIndex({ price: 1 })

    console.log("Indexes created successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

seedDatabase()
