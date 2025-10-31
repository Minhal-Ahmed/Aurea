"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, Menu, X } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/contexts/cart-context"
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

const categories = [
  { value: "all", label: "All Products" },
  { value: "Scented Candles", label: "Scented Candles" },
  { value: "Wall Décor", label: "Wall Décor" },
  { value: "Aroma Diffusers", label: "Aroma Diffusers" },
  { value: "Accessories", label: "Accessories" },
  { value: "Gift Sets", label: "Gift Sets" },
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy, searchQuery])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }
      if (searchQuery) {
        params.append("search", searchQuery)
      }
     
      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      const fetchedProducts = Array.isArray(data) ? data : data.products || []

      // Apply client-side sorting for non-featured sorts
      if (sortBy === "price-low") {
        fetchedProducts.sort((a: Product, b: Product) => a.price - b.price)
      } else if (sortBy === "price-high") {
        fetchedProducts.sort((a: Product, b: Product) => b.price - a.price)
      }

      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            
            <Link href="/" className="text-xl sm:text-2xl font-serif text-foreground hover:text-primary transition-colors">
              Aurea
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/shop" className="text-primary font-medium text-sm lg:text-base">
              Shop
            </Link>
            <Link href="/#collections" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Collections
            </Link>
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              About
            </Link>
            <Link href="/#contact" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
              Contact
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
                className="text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/#collections" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/#about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/#contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button variant="outline" className="w-full sm:hidden">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-3 sm:mb-4">Our Shop</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our complete collection of handcrafted candles, décor, and home accessories
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search Bar - Full Width on Mobile */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full text-sm sm:text-base"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex gap-2 sm:gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1 sm:w-44 text-sm">
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-sm">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 sm:w-44 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-sm">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-40 sm:h-56 md:h-64 bg-muted rounded-t-lg"></div>
                  <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
                    <div className="h-3 sm:h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-2 sm:h-3 bg-muted rounded w-full"></div>
                    <div className="h-4 sm:h-6 bg-muted rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {products.map((product) => (
                <Card
                  key={product._id}
                  className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.images?.[0] || product.images || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-40 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <Badge className="absolute top-1.5 sm:top-2 md:top-3 left-1.5 sm:left-2 md:left-3 bg-accent text-accent-foreground text-[10px] sm:text-xs px-1.5 sm:px-2">
                            {product.badge}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary" className="text-[10px] sm:text-xs">Out of Stock</Badge>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-2 sm:p-3 md:p-4">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-medium text-foreground mb-1 sm:mb-2 hover:text-primary transition-colors text-xs sm:text-sm md:text-base line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                        {product.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-primary">
                          PKR {product.price.toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          className="rounded-full text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 h-7 sm:h-8 md:h-9 w-full sm:w-auto"
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.preventDefault()
                            if (product.inStock) {
                              handleAddToCart(product)
                            }
                          }}
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {products.length === 0 && !loading && (
              <div className="text-center py-12 sm:py-16">
                <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3 sm:mb-4">No products found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="text-sm"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}