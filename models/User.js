// User model schema for MongoDB
export const UserSchema = {
  _id: "ObjectId",
  name: "String",
  email: "String", // Unique
  phone: "String",
  address: {
    street: "String",
    city: "String",
    province: "String",
    postalCode: "String",
    country: "String",
  },
  orders: ["ObjectId"], // References to Order documents
  wishlist: ["ObjectId"], // References to Product documents
  createdAt: "Date",
  updatedAt: "Date",
}
