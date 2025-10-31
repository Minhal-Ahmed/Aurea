import clientPromise from "@/lib/mongodb";

// Generate unique order number
function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Validation
    if (!data.items || data.items.length === 0) {
      return Response.json({ error: "No items in order" }, { status: 400 });
    }


 
     if (!data.shippingAddress?.firstName || !data.shippingAddress?.phone || !data.shippingAddress?.street) {
      return Response.json({ error: "Missing shipping address information" }, { status: 400 });
}


    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");

    // Prepare order data
    const orderData = {
      orderNumber: generateOrderNumber(),
      
      // User info (if you have auth, add userId here)
      userId: null, // Add user ID when you implement authentication
      
      // Items
      items: data.items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      
      // Pricing
      subtotal: data.subtotal,
      shipping: data.shipping,
      tax: data.tax || 0,
      total: data.total,
      
      // Status
      status: "pending", // pending, confirmed, shipped, delivered, cancelled
      paymentMethod: data.paymentMethod || "cod",
      paymentStatus: "pending", // pending, paid, failed
      
      // Shipping Address
      shippingAddress: {
      name: `${data.shippingAddress.firstName} ${data.shippingAddress.lastName || ""}`.trim(),
      email: data.shippingAddress.email || "",
      phone: data.shippingAddress.phone,
      street: data.shippingAddress.street,
      city: data.shippingAddress.city,
      province: data.shippingAddress.province,
      postalCode: data.shippingAddress.postalCode || "",

      },

      
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert order into database
    const result = await db.collection("orders").insertOne(orderData);

    return Response.json({
      success: true,
      message: "Order placed successfully",
      orderId: result.insertedId,
      orderNumber: orderData.orderNumber,
    }, { status: 201 });

  } catch (err) {
    console.error("Order Creation Error:", err);
    return Response.json(
      { error: "Failed to create order", details: err.message },
      { status: 500 }
    );
  }
}

// GET all orders (for admin)
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("aurea_ecommerce");

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const status = searchParams.get("status");

    // Build query
    let query = {};
    if (status) query.status = status;

    const orders = await db
      .collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return Response.json({ orders, count: orders.length });

  } catch (err) {
    console.error("Fetch Orders Error:", err);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}