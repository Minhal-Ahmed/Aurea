"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Loader2, Sparkles, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    price: 0,
    stockQuantity: 0,
    inStock: true,
    featured: false,
    badge: "",
    images: [] as string[],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonicalUrl: "",
      imageAlt: "",
      schemaType: "Product",
    },
  });

  const autoGenerateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const autoGenerateSEO = () => {
    const plainDesc = formData.description.replace(/<[^>]*>/g, "").substring(0, 155);

    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaTitle: `${formData.name} | Aurea`,
        metaDescription: plainDesc || `Shop ${formData.name} at the best price.`,
        ogTitle: formData.name,
        ogDescription: plainDesc || `Check out ${formData.name} in our store.`,
        imageAlt: `${formData.name} product image`,
        canonicalUrl: `/products/${formData.slug}`,
        ogImage: formData.images[0] || "",
      },
    }));

    toast.success("SEO fields generated!");
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }));
      setImageUrl("");
      toast.success("Image added!");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast.error("Please fill in required fields (Name, Price)");
      return;
    }

    if (!formData.slug) {
      toast.error("Please generate a slug from the product name");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add product");
      }

      const result = await response.json();

      toast.success(`Product added successfully! SEO Score: ${result.seoScore}/100`);

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="mb-4 border-amber-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>

          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">Create a new product with SEO optimization</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b bg-amber-50 px-6 py-4">
              <div className="flex gap-2">
                {["basic", "seo", "social", "advanced"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium transition-colors capitalize rounded-lg ${
                      activeTab === tab
                        ? "bg-amber-600 text-white"
                        : "text-gray-600 hover:bg-amber-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                          slug: autoGenerateSlug(e.target.value),
                        }));
                      }}
                      placeholder="e.g., Lavender Dreams Candle"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug *
                    </label>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="lavender-dreams-candle"
                      required
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-generated from name. Preview: aurea.com/products/{formData.slug}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                      modules={modules}
                      className="bg-white"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (PKR) *
                      </label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
                        }
                        placeholder="1200"
                        required
                        min="0"
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity
                      </label>
                      <Input
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stockQuantity: Number(e.target.value),
                          }))
                        }
                        placeholder="25"
                        min="0"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full border border-gray-300 rounded-lg p-2"
                    >
                      <option value="">Select Category</option>
                      <option value="Scented Candles">Scented Candles</option>
                      <option value="Wall Décor">Wall Décor</option>
                      <option value="Aroma Diffusers">Aroma Diffusers</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Gift Sets">Gift Sets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge (Optional)
                    </label>
                    <Input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, badge: e.target.value }))
                      }
                      placeholder="e.g., New, Bestseller, Sale"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 border-gray-300"
                      />
                      <Button type="button" onClick={addImage} variant="outline" className="border-amber-300">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {formData.images.map((img, index) => (
                          <div
                            key={index}
                            className="relative group border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <img
                              src={img}
                              alt={`Product ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-1 left-1 bg-amber-600 text-white text-xs px-2 py-0.5 rounded">
                                Main
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                        }
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm font-medium text-gray-700">In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                        }
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured Product</span>
                    </label>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900 mb-1">
                          AI SEO Assistant
                        </h3>
                        <p className="text-sm text-amber-700 mb-3">
                          Auto-generate SEO fields from your product information
                        </p>
                        <Button
                          type="button"
                          size="sm"
                          onClick={autoGenerateSEO}
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Generate SEO Fields
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <Input
                      value={formData.seo.metaTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, metaTitle: e.target.value },
                        }))
                      }
                      placeholder="Product Name | Aurea"
                      maxLength={60}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seo.metaTitle.length}/60 characters • Optimal: 50-60
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.seo.metaDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, metaDescription: e.target.value },
                        }))
                      }
                      rows={3}
                      maxLength={160}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
                      placeholder="Brief, compelling description for search engines..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seo.metaDescription.length}/160 characters • Optimal: 120-160
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Keywords (comma-separated)
                    </label>
                    <Input
                      value={formData.seo.keywords.join(", ")}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            keywords: e.target.value.split(",").map((k) => k.trim()),
                          },
                        }))
                      }
                      placeholder="lavender candle, scented candle, soy wax"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Keywords help search engines understand your product
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Alt Text
                    </label>
                    <Input
                      value={formData.seo.imageAlt}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, imageAlt: e.target.value },
                        }))
                      }
                      placeholder="Descriptive alt text for main product image"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Important for accessibility and image SEO
                    </p>
                  </div>

                  {/* Google Search Preview */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      📱 Google Search Preview
                    </h3>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                        {formData.seo.metaTitle || "Your Meta Title Here"}
                      </div>
                      <div className="text-sm text-green-700 mb-2">
                        https://aurea.com › products › {formData.slug || "product-slug"}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {formData.seo.metaDescription ||
                          "Your meta description will appear here. Make it compelling to increase click-through rates!"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Open Graph (Social Sharing)
                    </h3>
                    <p className="text-sm text-blue-700">
                      Control how your product looks when shared on Facebook, Twitter, LinkedIn,
                      etc.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Title
                    </label>
                    <Input
                      value={formData.seo.ogTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, ogTitle: e.target.value },
                        }))
                      }
                      placeholder="Title for social media shares"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Description
                    </label>
                    <textarea
                      value={formData.seo.ogDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, ogDescription: e.target.value },
                        }))
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
                      placeholder="Description for social media sharing..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Image URL
                    </label>
                    <Input
                      value={formData.seo.ogImage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, ogImage: e.target.value },
                        }))
                      }
                      placeholder="https://example.com/og-image.jpg"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 1200x630px for best results across platforms
                    </p>
                  </div>

                  {/* Social Media Preview */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      📲 Social Media Preview
                    </h3>
                    <div className="bg-white rounded-lg border overflow-hidden max-w-md mx-auto">
                      <div className="aspect-video bg-gray-200 flex items-center justify-center">
                        {formData.seo.ogImage || formData.images[0] ? (
                          <img
                            src={formData.seo.ogImage || formData.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-4">
                            <div className="text-4xl mb-2">🖼️</div>
                            <div className="text-sm">No image set</div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          AUREA.COM
                        </div>
                        <div className="font-bold text-gray-900 mb-1 line-clamp-2">
                          {formData.seo.ogTitle || formData.name || "Product Title"}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {formData.seo.ogDescription ||
                            formData.seo.metaDescription ||
                            "Product description"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === "advanced" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canonical URL
                    </label>
                    <Input
                      value={formData.seo.canonicalUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, canonicalUrl: e.target.value },
                        }))
                      }
                      placeholder="/products/product-slug"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Prevents duplicate content issues. Auto-filled from slug.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schema.org Type
                    </label>
                    <select
                      value={formData.seo.schemaType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          seo: { ...prev.seo, schemaType: e.target.value },
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Product">Product</option>
                      <option value="ItemList">Item List</option>
                      <option value="Offer">Offer</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Structured data helps search engines understand your content
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Schema.org JSON-LD Preview
                    </h3>
                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto font-mono">
{`{
  "@context": "https://schema.org",
  "@type": "${formData.seo.schemaType}",
  "name": "${formData.name || 'Product Name'}",
  "description": "${formData.seo.metaDescription || 'Product description'}",
  "image": "${formData.images[0] || 'image-url'}",
  "offers": {
    "@type": "Offer",
    "price": "${formData.price}",
    "priceCurrency": "PKR",
    "availability": "${formData.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}"
  },
  "brand": {
    "@type": "Brand",
    "name": "Aurea"
  }
}`}
                    </pre>
                    <p className="text-xs text-gray-500 mt-2">
                      This structured data will be added to your product page automatically
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Footer */}
            <div className="px-6 py-4 bg-amber-50 border-t flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
                disabled={saving}
                className="border-gray-300"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving || !formData.name || !formData.price}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Product
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}