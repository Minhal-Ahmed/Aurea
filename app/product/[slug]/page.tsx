"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  images: string[]
  badge?: string
  description: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
  specifications: {
    [key: string]: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const productSlug = params.slug as string  // ← CHANGED

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    if (productSlug) {
      fetchProduct()
    }
  }, [productSlug])  // ← CHANGED

  const fetchProduct = async () => {
    try {
      setLoading(true)
      // ← CHANGED: Fetch by slug
      const response = await fetch(`/api/products?slug=${productSlug}`)
      const data = await response.json()
      const productData = data.products?.[0]
      
      if (productData) {
        setProduct(productData)
      } else {
        setProduct(null)
      }
    } catch (error) {
      console.error("Failed to fetch product:", error)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (change: number) => {
    if (!product) return
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        category: product.category,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif text-foreground hover:text-primary transition-colors">
              Aurea
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-96 lg:h-[500px] bg-muted rounded-lg"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-12 bg-muted rounded w-1/3"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif text-foreground hover:text-primary transition-colors">
            Aurea
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-primary font-medium">Shop</Link>
            <Link href="/#collections" className="text-foreground hover:text-primary transition-colors">Collections</Link>
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/#contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartSidebar />
            <Button variant="outline" className="hidden sm:inline-flex bg-transparent">Sign In</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-secondary/20">
              <img
                src={product.images?.[selectedImage] || product.images?.[0] || "https://placehold.co/400x400?text=No+Image"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.badge}</Badge>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {(product.images || []).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "https://placehold.co/100x100?text=No+Image"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{product.category}</span>
                {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">PKR {product.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stockQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stockQuantity} in stock</span>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? `Add to Cart - PKR ${(product.price * quantity).toLocaleString()}` : "Out of Stock"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)} className={isWishlisted ? "text-red-500 border-red-500" : ""}>
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over PKR 5,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Quality Guarantee</p>
                  <p className="text-xs text-muted-foreground">Handmade with care</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Care Instructions</h3>
                    {product.category === "Scented Candles" ? (
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Trim wick to 1/4 inch before each use</li>
                        <li>• Burn for no more than 4 hours at a time</li>
                        <li>• Keep away from drafts and flammable materials</li>
                        <li>• Allow wax to cool completely before moving</li>
                        <li>• Clean jar with warm soapy water when finished</li>
                      </ul>
                    ) : (
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Dust regularly with a soft, dry cloth</li>
                        <li>• Avoid direct sunlight to prevent fading</li>
                        <li>• Handle with care due to handcrafted nature</li>
                        <li>• Use appropriate wall anchors for hanging</li>
                        <li>• Store in a dry place when not displayed</li>
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}