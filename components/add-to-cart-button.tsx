"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
}

export function AddToCartButton({
  product,
  quantity = 1,
  size = "default",
  className,
  children,
  showIcon = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      quantity,
    )
  }

  return (
    <Button size={size} className={cn(className)} onClick={handleAddToCart}>
      {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
      {children || "Add to Cart"}
    </Button>
  )
}
