"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Instagram, Mail, Phone, MapPin, Menu, X } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Link from "next/link"

interface Product {
  _id: string
  name: string
  slug:string
  price: number
  category: string
  images: string[]
  badge?: string
  description: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("/api/products?featured=true&limit=6")
      const data = await response.json()
      setFeaturedProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch featured products:", error)
      setFeaturedProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-serif text-foreground">Aurea</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Shop
            </Link>
            <a href="#collections" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Collections
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Contact
            </a>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <CartSidebar />
            <Button variant="outline" className="hidden sm:inline-flex bg-transparent text-sm">
              Sign In
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/shop" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <a 
                href="#collections" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link 
                href="/admin" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Button variant="outline" className="w-full sm:hidden">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-foreground mb-4 sm:mb-6 text-balance leading-tight">
              Transform Your Space with Candles & Décor
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty px-4">
              Discover our curated collection of handmade scented candles, elegant wall frames, and premium home
              accessories crafted with love in Pakistan.
            </p>
            <Button size="lg" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-3 sm:mb-4">Featured Products</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Handpicked favorites that bring warmth and elegance to every corner of your home
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="h-40 sm:h-56 md:h-64 bg-muted rounded-t-lg"></div>
                    <div className="p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 sm:h-6 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <Link href={`/product/${product._id}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.images?.[0] || product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-40 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <Badge className="absolute top-1.5 sm:top-2 md:top-3 left-1.5 sm:left-2 md:left-3 bg-accent text-accent-foreground text-[10px] sm:text-xs px-1.5 sm:px-2">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <div className="p-2 sm:p-4 md:p-6">
                      <Link href={`/product/${product.slug}`}>
                        <h4 className="font-medium text-foreground mb-1 sm:mb-2 hover:text-primary transition-colors text-xs sm:text-sm md:text-base line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <div className="flex items-center justify-between gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-primary">PKR {product.price.toLocaleString()}</span>
                        <AddToCartButton
                          product={{
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0] || "/placeholder.svg",
                            category: product.category,
                          }}
                          size="sm"
                          className="rounded-full text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 h-7 sm:h-8 md:h-9"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm sm:text-base">No featured products available at the moment.</p>
              <Button asChild className="mt-4">
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary/30" id="collections">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-3 sm:mb-4">Our Collections</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Explore our carefully curated collections designed to elevate your living spaces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Scented Candles",
                description: "Hand-poured with natural wax and premium fragrances",
                image: "/collection-of-elegant-scented-candles-in-various-s.jpg",
                count: "24 Products",
              },
              {
                title: "Wall Décor",
                description: "Handcrafted frames and artistic wall pieces",
                image: "/collection-of-handmade-decorative-wall-frames-and-.jpg",
                count: "18 Products",
              },
              {
                title: "Aroma Diffusers",
                description: "Premium reed diffusers for lasting fragrance",
                image: "/collection-of-elegant-aroma-diffusers-with-reed-st.jpg",
                count: "12 Products",
              },
              {
                title: "Gift Sets",
                description: "Thoughtfully curated gift collections",
                image: "/elegant-gift-sets-with-candles-and-home-accessorie.jpg",
                count: "15 Products",
              },
            ].map((collection, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-0">
                  <Link href={`/shop?category=${encodeURIComponent(collection.title)}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{collection.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">{collection.description}</p>
                      <span className="text-xs text-primary font-medium">{collection.count}</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-24" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4">Why Choose Aurea</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">🤲</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Handmade</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Every piece is carefully crafted by skilled artisans with attention to detail and love.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">⭐</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Premium Quality</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                We use only the finest materials and ingredients to ensure lasting beauty and fragrance.
              </p>
            </div>
            <div className="text-center px-4 sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">💎</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Affordable Luxury</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Experience premium home décor without breaking the bank. Luxury made accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4">What Our Customers Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Ayesha Khan",
                location: "Karachi",
                rating: 5,
                review:
                  "The jasmine candles are absolutely divine! They fill my entire living room with the most beautiful fragrance. Quality is exceptional.",
              },
              {
                name: "Fatima Ahmed",
                location: "Lahore",
                rating: 5,
                review:
                  "I ordered the geometric wall frame and it's even more beautiful in person. The craftsmanship is incredible. Highly recommend!",
              },
              {
                name: "Sara Ali",
                location: "Islamabad",
                rating: 5,
                review:
                  "Fast delivery and amazing packaging. The gift set I ordered was perfect for my sister's housewarming. She loved it!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 italic">"{testimonial.review}"</p>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-3 sm:mb-4">Stay Connected</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
              Subscribe to our newsletter and get 10% off your first order. Be the first to know about new collections
              and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 text-sm sm:text-base" 
              />
              <Button className="rounded-full px-6 sm:px-8 w-full sm:w-auto">Get 10% Off</Button>
            </div>

            <p className="text-xs text-muted-foreground mt-3 sm:mt-4 px-4">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 sm:py-12" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                
                <h4 className="text-lg sm:text-xl font-serif">Aurea</h4>
              </div>
              <p className="text-background/70 text-xs sm:text-sm">
                Transforming Pakistani homes with handcrafted candles, décor, and premium home accessories since 2020.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">About</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Artisans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-background/70">
                <li className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>+92 300 1234567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">hello@aurea.pk</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Karachi, Pakistan</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
              <p className="text-xs text-background/50 mt-3 sm:mt-4">@aurea.pk</p>
            </div>
          </div>

          <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-background/70">
              © 2025 Aurea All rights reserved. Made with ❤️ in Pakistan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}