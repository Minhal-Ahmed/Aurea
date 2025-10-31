"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Package, Trash2, Search, Eye, AlertCircle, CheckCircle, XCircle, Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  badge?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    canonicalUrl: string;
    imageAlt: string;
    schemaType: string;
  };
  seoScore: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    slug: "",
    description: "",
    category: "",
    price: 0,
    stockQuantity: 0,
    inStock: true,
    featured: false,
    images: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonicalUrl: "",
      imageAlt: "",
      schemaType: "Product",
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products?limit=100");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast.success("Product deleted successfully");
      fetchProducts();
      setDeletingProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      seo: product.seo || {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        canonicalUrl: "",
        imageAlt: "",
        schemaType: "Product",
      },
    });
    setActiveTab("basic");
  };

  const closeEditDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      inStock: true,
      featured: false,
      images: [],
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        canonicalUrl: "",
        imageAlt: "",
        schemaType: "Product",
      },
    });
  };

  const autoGenerateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const autoGenerateSEO = () => {
    const plainDesc = formData.description?.replace(/<[^>]*>/g, "").substring(0, 155) || "";
    
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo!,
        metaTitle: `${formData.name} | Your Store`,
        metaDescription: plainDesc,
        ogTitle: formData.name || "",
        ogDescription: plainDesc,
        imageAlt: `${formData.name} product image`,
        canonicalUrl: `/products/${formData.slug}`,
      },
    }));

    toast.success("SEO fields generated!");
  };

  const handleSaveProduct = async () => {
    try {
      setSaving(true);

      if (!editingProduct) {
        toast.error("No product selected");
        return;
      }

      // Prepare data for API
      const updateData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        images: formData.images,
        inStock: formData.inStock,
        stockQuantity: formData.stockQuantity,
        featured: formData.featured,
        badge: formData.badge,
        seo: formData.seo,
      };

      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update product");
      }

      const result = await response.json();
      
      toast.success(`Product updated! SEO Score: ${result.seoScore}/100`);
      fetchProducts();
      closeEditDialog();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getSEOIssues = (product: Product) => {
    const issues: string[] = [];
    if (!product.seo?.metaTitle) issues.push("Missing meta title");
    if (!product.seo?.metaDescription) issues.push("Missing meta description");
    if (product.seo?.metaDescription && product.seo.metaDescription.length < 120)
      issues.push("Meta description too short");
    if (!product.seo?.keywords || product.seo.keywords.length === 0) issues.push("No keywords");
    if (!product.seo?.imageAlt) issues.push("Missing image alt text");
    if (!product.seo?.ogTitle) issues.push("Missing OG title");
    return issues;
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              SEO Admin Panel
            </h1>
            <p className="text-gray-600">Manage products with full SEO control</p>
          </div>
            <Link href="/admin/add-product">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600">
                <Plus className="w-5 h-5" />
                Add Product
                </Button>
            </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">SEO Optimized</p>
                <p className="text-3xl font-bold text-gray-900">
                  {products.filter((p) => (p.seoScore || 0) >= 80).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Need Attention</p>
                <p className="text-3xl font-bold text-gray-900">
                  {products.filter((p) => (p.seoScore || 0) < 80 && (p.seoScore || 0) >= 60).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Poor SEO</p>
                <p className="text-3xl font-bold text-gray-900">
                  {products.filter((p) => (p.seoScore || 0) < 60).length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>SEO Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const issues = getSEOIssues(product);
                  const seoScore = product.seoScore || 0;
                  return (
                    <TableRow key={product._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || "/placeholder.png"}
                            alt={product.seo?.imageAlt || product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">/{product.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        Rs. {product.price?.toLocaleString()}
                      </TableCell>
                      <TableCell>{product.stockQuantity || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${getSEOScoreColor(
                              seoScore
                            )}`}
                          >
                            {seoScore}
                          </div>
                          {issues.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {issues.length} issues
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {product.inStock ? (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          ) : (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                          {product.featured && (
                            <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(product)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Edit SEO
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeletingProductId(product._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Edit SEO Dialog */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
            <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
              <h2 className="text-2xl font-bold text-white">Edit Product SEO</h2>
              <p className="text-indigo-100 mt-1">{formData.name}</p>
            </div>

            <div className="p-6">
              {/* Tabs */}
              <div className="mb-6 border-b">
                <div className="flex gap-2">
                  {["basic", "seo", "social", "advanced"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium transition-colors capitalize ${
                        activeTab === tab
                          ? "border-b-2 border-indigo-600 text-indigo-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                {/* Basic Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-4">
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
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL) *
                      </label>
                      <Input
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, slug: e.target.value }))
                        }
                        placeholder="product-url-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Preview: yourstore.com/products/{formData.slug}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description?.replace(/<[^>]*>/g, "") || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: `<p>${e.target.value}</p>`,
                          }))
                        }
                        rows={6}
                        className="w-full border rounded-lg p-3"
                        placeholder="Enter product description..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (Rs.) *
                        </label>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              price: Number(e.target.value),
                            }))
                          }
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
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Input
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, category: e.target.value }))
                        }
                        placeholder="e.g., Candles, Clothing"
                      />
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">In Stock</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">Featured</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-indigo-900 mb-1">SEO Assistant</h3>
                          <p className="text-sm text-indigo-700 mb-3">
                            Auto-generate SEO fields from your product information
                          </p>
                          <Button
                            size="sm"
                            onClick={autoGenerateSEO}
                            className="bg-indigo-600 hover:bg-indigo-700"
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
                        value={formData.seo?.metaTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, metaTitle: e.target.value },
                          }))
                        }
                        placeholder="Product Name | Your Store"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.seo?.metaTitle?.length || 0}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.seo?.metaDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, metaDescription: e.target.value },
                          }))
                        }
                        rows={3}
                        maxLength={160}
                        className="w-full border rounded-lg p-3"
                        placeholder="Brief description for search engines..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.seo?.metaDescription?.length || 0}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords (comma-separated)
                      </label>
                      <Input
                        value={formData.seo?.keywords?.join(", ") || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: {
                              ...prev.seo!,
                              keywords: e.target.value.split(",").map((k) => k.trim()),
                            },
                          }))
                        }
                        placeholder="leather jacket, premium, winter wear"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Alt Text
                      </label>
                      <Input
                        value={formData.seo?.imageAlt}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, imageAlt: e.target.value },
                          }))
                        }
                        placeholder="Descriptive alt text for main image"
                      />
                    </div>

                    {/* Google Preview */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Google Search Preview
                      </h3>
                      <div className="bg-white p-4 rounded border">
                        <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {formData.seo?.metaTitle || "Meta Title"}
                        </div>
                        <div className="text-xs text-green-700 mt-1">
                          yourstore.com › products › {formData.slug}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {formData.seo?.metaDescription || "Meta description will appear here..."}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Tab */}
                {activeTab === "social" && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Open Graph (Social Media)
                      </h3>
                      <p className="text-sm text-blue-700">
                        Control how your product appears when shared on social media
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Title
                      </label>
                      <Input
                        value={formData.seo?.ogTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, ogTitle: e.target.value },
                          }))
                        }
                        placeholder="Title for social media shares"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                      </label>
                      <textarea
                        value={formData.seo?.ogDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, ogDescription: e.target.value },
                          }))
                        }
                        rows={3}
                        className="w-full border rounded-lg p-3"
                        placeholder="Description for social media..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Image URL
                      </label>
                      <Input
                        value={formData.seo?.ogImage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, ogImage: e.target.value },
                          }))
                        }
                        placeholder="https://..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                    </div>
                  </div>
                )}

                {/* Advanced Tab */}
                {activeTab === "advanced" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Canonical URL
                      </label>
                      <Input
                        value={formData.seo?.canonicalUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, canonicalUrl: e.target.value },
                          }))
                        }
                        placeholder="/products/product-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Prevents duplicate content issues
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Schema Type
                      </label>
                      <select
                        value={formData.seo?.schemaType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo!, schemaType: e.target.value },
                          }))
                        }
                        className="w-full border rounded-lg p-2"
                      >
                        <option value="Product">Product</option>
                        <option value="ItemList">Item List</option>
                        <option value="Offer">Offer</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <h3 className="font-semibold text-gray-900 mb-2">Schema.org Preview</h3>
                      <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "${formData.seo?.schemaType || 'Product'}",
  "name": "${formData.name || ''}",
  "description": "${formData.seo?.metaDescription || ''}",
  "image": "${formData.images?.[0] || ''}",
  "offers": {
    "@type": "Offer",
    "price": "${formData.price || 0}",
    "priceCurrency": "PKR",
    "availability": "${formData.inStock ? 'InStock' : 'OutOfStock'}"
  }
}`}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <Button variant="outline" onClick={closeEditDialog} disabled={saving}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveProduct}
                disabled={saving}
                className="bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingProductId}
        onOpenChange={() => setDeletingProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product from your store. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingProductId && handleDeleteProduct(deletingProductId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="top-center" richColors />
    </div>
  );
}