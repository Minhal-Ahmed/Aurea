# Admin Panel Guide

## Overview
The admin panel allows you to manage your store's products with full CRUD (Create, Read, Update, Delete) capabilities.

## Access
Navigate to `/admin` route on your website to access the admin panel.

## Features

### 1. Product Management Dashboard
- View all products in a table format
- See product images, names, categories, prices, and stock status
- Filter products using the search bar
- View statistics:
  - Total products
  - In-stock products
  - Featured products

### 2. Add New Products
Click the "Add Product" button to open the product form with the following fields:

**Basic Information:**
- Product Name (required)
- Description (required)
- Price in PKR (required)
- Category (select from predefined categories)

**Product Images:**
- Add multiple image URLs
- Images can be local paths (e.g., `/image.jpg`) or external URLs
- Click "Add Image" to add more image fields
- Remove unwanted image fields with the X button

**Stock & Status:**
- Stock Quantity (required)
- In Stock toggle (enables/disables product availability)
- Featured Product toggle (displays on homepage)
- Badge (optional: Best Seller, New, Popular, etc.)

**Specifications (Optional):**
- Material
- Dimensions
- Weight
- Fragrance (for candles/diffusers)
- Burn Time (for candles/diffusers)

### 3. Edit Products
- Click the Edit (pencil) icon next to any product
- Modify the product details in the form
- Click "Update Product" to save changes

### 4. Delete Products
- Click the Delete (trash) icon next to any product
- Confirm deletion in the dialog
- Product will be permanently removed from the database

## Setup Requirements

### Environment Variables
Make sure your `.env.local` file contains:
```
MONGODB_URI=your_mongodb_connection_string_here
```

### Database
The app uses MongoDB with a collection named `products` in the `noorco_ecommerce` database.

## Product Categories
- Scented Candles
- Wall Décor
- Aroma Diffusers
- Accessories
- Gift Sets

## Badge Options
- Best Seller
- New
- Popular
- Gift Set
- Handmade
- Luxury
- No Badge (leave empty)

## Tips
1. **Image URLs**: For best results, use high-quality images. You can upload images to your `/public` folder or use external hosting.
2. **Product Descriptions**: Write detailed descriptions to help customers make informed decisions.
3. **Stock Management**: Keep stock quantities updated to avoid overselling.
4. **Featured Products**: Mark your best products as featured to highlight them on the homepage.
5. **Badges**: Use badges strategically to draw attention to special products.

## Troubleshooting

### "Failed to fetch products"
- Check your MongoDB connection string in `.env.local`
- Ensure MongoDB is running and accessible
- Verify network connectivity

### "Failed to save product"
- Check all required fields are filled
- Ensure at least one image URL is provided
- Verify price and stock quantity are valid numbers

### Images not displaying
- Verify image paths are correct
- For local images, ensure they're in the `/public` folder
- For external URLs, ensure they're publicly accessible

## API Endpoints Used
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
