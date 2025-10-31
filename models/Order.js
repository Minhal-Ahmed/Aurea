// Order model schema for MongoDB
export const OrderSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to User
  orderNumber: "String", // Unique order number
  items: [
    {
      productId: "ObjectId", // Reference to Product
      name: "String",
      price: "Number",
      quantity: "Number",
      image: "String",
    },
  ],
  subtotal: "Number",
  shipping: "Number",
  tax: "Number",
  total: "Number",
  status: "String", // pending, confirmed, shipped, delivered, cancelled
  shippingAddress: {
    name: "String",
    phone: "String",
    street: "String",
    city: "String",
    province: "String",
    postalCode: "String",
  },
  paymentMethod: "String", // cod, bank_transfer, etc.
  paymentStatus: "String", // pending, paid, failed
  createdAt: "Date",
  updatedAt: "Date",
}
