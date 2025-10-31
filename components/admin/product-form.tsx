"use client"

import { useState, useEffect } from "react"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  inStock: boolean
  stockQuantity: number
  featured: boolean
  badge?: string
  specifications?: {
    material?: string
    dimensions?: string
    weight?: string
    fragrance?: string
    burnTime?: string
  }
}

interface ProductFormProps {
  product?: Product | null
  onSuccess?: () => void
}
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast, Toaster } from "sonner"
import { Loader2, Plus, X } from "lucide-react"

const categories = [
  "Scented Candles",
  "Wall Décor",
  "Aroma Diffusers",
  "Accessories",
  "Gift Sets",
]

const badges = ["none", "Best Seller", "New", "Popular", "Gift Set", "Handmade", "Luxury"]

export function ProductForm({ product = null, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(product?.images || [""])
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [featured, setFeatured] = useState(product?.featured ?? false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      category: product?.category || categories[0],
      stockQuantity: product?.stockQuantity || "",
      badge: product?.badge || "",
      specifications: {
        material: product?.specifications?.material || "",
        dimensions: product?.specifications?.dimensions || "",
        weight: product?.specifications?.weight || "",
        fragrance: product?.specifications?.fragrance || "",
        burnTime: product?.specifications?.burnTime || "",
      },
    },
  })

  const category = watch("category")

  useEffect(() => {
    if (product) {
      setValue("category", product.category)
    }
  }, [product, setValue])

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const addImageField = () => {
    setImages([...images, ""])
  }

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)

      // Filter out empty images
      const filteredImages = images.filter((img) => img.trim() !== "")

      if (filteredImages.length === 0) {
        toast.error("Please add at least one image URL")
        return
      }

      const productData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        images: filteredImages,
        inStock,
        stockQuantity: Number(data.stockQuantity),
        featured,
        badge: data.badge,
        specifications: data.specifications,
      }

      const url = product?._id ? `/api/products/${product._id}` : "/api/products"
      const method = product ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      toast.success(product ? "Product updated successfully" : "Product added successfully")
      onSuccess?.()
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error("Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Product name is required" })}
            placeholder="e.g., Jasmine Nights Candle"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Detailed product description..."
            rows={4}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (PKR) *</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              placeholder="1200"
            />
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={category}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Product Images</h3>
          <Button type="button" onClick={addImageField} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="/path/to/image.jpg or https://example.com/image.jpg"
            />
            {images.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeImageField(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <p className="text-sm text-gray-500">
          Add image paths (e.g., /image.jpg) or URLs (https://...)
        </p>
      </div>

      {/* Stock & Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Stock & Status</h3>

        <div className="space-y-2">
          <Label htmlFor="stockQuantity">Stock Quantity *</Label>
          <Input
            id="stockQuantity"
            type="number"
            {...register("stockQuantity", {
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock must be non-negative" },
            })}
            placeholder="25"
          />
          {errors.stockQuantity && (
            <p className="text-sm text-red-600">{errors.stockQuantity.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="inStock">In Stock</Label>
          <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="featured">Featured Product</Label>
          <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">Badge (Optional)</Label>
          <Select
            value={watch("badge")}
            onValueChange={(value) => setValue("badge", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a badge" />
            </SelectTrigger>
            <SelectContent>
              {badges.map((badge) => (
                <SelectItem key={badge} value={badge}>
                  {badge || "No Badge"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Specifications (Optional)</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              {...register("specifications.material")}
              placeholder="e.g., Soy Wax"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              {...register("specifications.dimensions")}
              placeholder="e.g., 8cm x 10cm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              {...register("specifications.weight")}
              placeholder="e.g., 300g"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fragrance">Fragrance</Label>
            <Input
              id="fragrance"
              {...register("specifications.fragrance")}
              placeholder="e.g., Natural Jasmine"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="burnTime">Burn Time (for candles/diffusers)</Label>
          <Input
            id="burnTime"
            {...register("specifications.burnTime")}
            placeholder="e.g., 40-45 hours"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="submit" disabled={loading} size="lg">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : product ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </div>
    </form>
  )
}
