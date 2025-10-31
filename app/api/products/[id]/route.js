import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Calculate SEO score
function calculateSEOScore(product) {
  let score = 0;
  if (product.name) score += 5;
  if (product.description) score += 5;
  if (product.images?.length > 0) score += 5;
  if (product.seo?.metaTitle) score += 20;
  if (product.seo?.metaDescription) {
    score += product.seo.metaDescription.length >= 120 ? 20 : 10;
  }
  if (product.seo?.keywords?.length > 0) score += 15;
  if (product.seo?.imageAlt) score += 10;
  if (product.seo?.ogTitle) score += 8;
  if (product.seo?.ogDescription) score += 7;
  if (product.seo?.ogImage) score += 5;
  if (product.seo?.canonicalUrl) score += 5;
  return Math.min(score, 100);
}

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");
    const product = await db.collection("products").findOne({ _id: new ObjectId(params.slug) });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.images) {
      product.images = product.image ? [product.image] : [];
    }

    return Response.json(product);
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");
    const data = await request.json();

    // Prepare update with ALL fields including SEO
    const updateData = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      category: data.category,
      images: data.images,
      inStock: data.inStock,
      stockQuantity: data.stockQuantity,
      featured: data.featured,
      badge: data.badge,
      seo: data.seo || {},  // ✅ Include SEO
      updatedAt: new Date(),
    };

    // Calculate SEO score
    updateData.seoScore = calculateSEOScore(updateData);

    const result = await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(params.id) },
        { $set: updateData }
      );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "Product updated successfully",
      seoScore: updateData.seoScore,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }
}