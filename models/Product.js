// models/Product.js
export default class Product {
  constructor({ name, price, description, image, category }) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
    this.createdAt = new Date();
  }
}
