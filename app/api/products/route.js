import clientPromise from "@/lib/mongodb";



export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.price)
      return new Response("Missing fields", { status: 400 });

    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");

    const result = await db.collection("products").insertOne({
      name: data.name,
      price: parseFloat(data.price),
      description: data.description || "",
      images: data.image ? [data.image] : [],  // ✅ store as array
      category: data.category || "candles",
      inStock: data.inStock ?? true, // ✅ add this
      createdAt: new Date(),
    });

    return Response.json({ message: "✅ Product added!", id: result.insertedId });
  } catch (err) {
    console.error("Add Product Error:", err);
    return new Response("Error adding product", { status: 500 });
  }
}



export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");
    
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');  // ✅ NEW
    
    // If searching by slug
    if (slug) {
      const product = await db.collection("products").findOne({ slug });
      const fixedProduct = product ? {
        ...product,
        images: product.images || (product.image ? [product.image] : [])
      } : null;
      return Response.json({ products: fixedProduct ? [fixedProduct] : [] });
    }
    
    // Otherwise return all products (existing code)
    const products = await db.collection("products").find().toArray();
    
    const fixedProducts = products.map(product => ({
      ...product,
      images: product.images || (product.image ? [product.image] : [])
    }));

    return Response.json({ products: fixedProducts });

  } catch (err) {
    console.error("Database Error:", err);
    return new Response("Database Error", { status: 500 });
  }
}