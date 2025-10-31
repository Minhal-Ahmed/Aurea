"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Menu, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  
  const shippingCost = total > 0 ? (total >= 5000 ? 0 : 250) : 0
  const finalTotal = total + shippingCost

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">N</span>
            </div>
            <Link href="/" className="text-xl sm:text-2xl font-serif text-foreground hover:text-primary transition-colors">
              Aurea
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors text-sm lg:text-base">
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

      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Back Button */}
        <Link 
          href="/shop"
          className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-2">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-foreground mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
              Looks like you haven't added any items to your cart yet
            </p>
            <Button asChild size="lg" className="rounded-full text-sm sm:text-base">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.id}`}>
                              <h3 className="font-medium text-foreground hover:text-primary transition-colors text-sm sm:text-base md:text-lg line-clamp-2">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {item.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 sm:mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <span className="text-sm sm:text-base font-medium w-8 sm:w-10 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2">
                            {item.quantity > 1 && (
                              <span className="text-xs sm:text-sm text-muted-foreground">
                                PKR {item.price.toLocaleString()} each
                              </span>
                            )}
                            <span className="text-base sm:text-lg md:text-xl font-semibold text-primary">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-serif text-foreground mb-4 sm:mb-6">Order Summary</h2>

                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? "Free" : `PKR ${shippingCost.toLocaleString()}`}
                      </span>
                    </div>
                    {total < 5000 && total > 0 && (
                      <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 p-2 sm:p-3 rounded-lg">
                        💡 Add PKR {(5000 - total).toLocaleString()} more for free shipping!
                      </p>
                    )}
                    <div className="border-t border-border pt-3 sm:pt-4 flex justify-between">
                      <span className="text-base sm:text-lg font-semibold">Total</span>
                      <span className="text-lg sm:text-xl font-bold text-primary">
                        PKR {finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="text-sm sm:text-base"
                      />
                      <Button variant="outline" className="text-sm sm:text-base px-3 sm:px-4">
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
  <Button className="w-full rounded-full text-sm sm:text-base py-5 sm:py-6" size="lg">
    Proceed to Checkout
  </Button>
</Link>

                  <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                    Secure checkout with SSL encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}