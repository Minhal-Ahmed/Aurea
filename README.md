# Noor & Co. - E-commerce Website

A modern, elegant e-commerce platform for a Pakistani lifestyle and home décor brand specializing in scented candles, handmade decorative wall frames, aroma diffusers, and unique home accessories.

## 🚀 Features

- **Full E-commerce Functionality**: Product catalog, individual product pages, shopping cart, and checkout preparation
- **MongoDB Database Integration**: Complete product management with real-time data
- **Responsive Design**: Mobile-first approach with elegant Pakistani-inspired aesthetics
- **Shopping Cart**: Persistent cart with local storage, add/remove items, quantity management
- **Product Search & Filtering**: Search by name, filter by category, sort by price
- **Modern UI/UX**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Performance Optimized**: Fast loading with optimized images and caching

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI Components
- **Database**: MongoDB with native driver
- **State Management**: React Context API
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings), Inter (body)

## 📋 Prerequisites

Before setting up the project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas account** (free tier available)
- **Git** for version control

## 🔧 Local Development Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd noor-co-ecommerce
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier M0 is sufficient)

2. **Configure Database Access**:
   - Go to "Database Access" in your Atlas dashboard
   - Click "Add New Database User"
   - Create a user with username and password
   - Set permissions to "Read and write to any database"

3. **Configure Network Access**:
   - Go to "Network Access" in your Atlas dashboard
   - Click "Add IP Address"
   - For development, you can add `0.0.0.0/0` (allow access from anywhere)
   - For production, add only your server's IP address

4. **Get Connection String**:
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

#### Option B: Local MongoDB Installation

1. **Install MongoDB Community Edition**:
   - Follow the [official installation guide](https://docs.mongodb.com/manual/installation/)
   - Start MongoDB service: `mongod`
   - Your connection string will be: `mongodb://localhost:27017/noorco_ecommerce`

### 4. Environment Configuration

1. **Create Environment File**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. **Update Environment Variables**:
   \`\`\`env
   # .env.local
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/noorco_ecommerce?retryWrites=true&w=majority
   NODE_ENV=development
   \`\`\`

   Replace `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB credentials.

### 5. Seed the Database

Run the database seeding script to populate your MongoDB with sample products:

\`\`\`bash
node scripts/seed-database.js
\`\`\`

This will:
- Create the `noorco_ecommerce` database
- Add sample products with Pakistani-themed items
- Create necessary indexes for better performance

### 6. Start Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at `http://localhost:3000`

## 🌐 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`

3. **Configure MongoDB for Production**:
   - Update Network Access in MongoDB Atlas to include Vercel's IP ranges
   - Or use `0.0.0.0/0` for simplicity (less secure)

### Alternative Deployment Options

- **Netlify**: Similar process to Vercel
- **Railway**: Great for full-stack apps with database
- **DigitalOcean App Platform**: Scalable option
- **AWS Amplify**: If you prefer AWS ecosystem

## 📁 Project Structure

\`\`\`
noor-co-ecommerce/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── products/             # Product CRUD operations
│   │   └── orders/               # Order management
│   ├── cart/                     # Shopping cart page
│   ├── product/[id]/             # Dynamic product pages
│   ├── shop/                     # Product catalog
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn UI components
│   ├── add-to-cart-button.tsx    # Cart functionality
│   └── cart-sidebar.tsx          # Shopping cart sidebar
├── contexts/                     # React contexts
│   └── cart-context.tsx          # Shopping cart state
├── lib/                          # Utility functions
│   ├── mongodb.js                # Database connection
│   └── utils.ts                  # Helper functions
├── models/                       # Database schemas
│   ├── Product.js                # Product model
│   ├── User.js                   # User model
│   └── Order.js                  # Order model
├── scripts/                      # Database scripts
│   └── seed-database.js          # Sample data seeding
└── public/                       # Static assets
    └── images/                   # Product images
\`\`\`

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering and search
- `GET /api/products/[id]` - Get single product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get orders (with user filtering)
- `POST /api/orders` - Create new order

### Query Parameters for Products
- `category`: Filter by product category
- `search`: Search in product name and description
- `featured`: Show only featured products
- `limit`: Number of products per page (default: 20)
- `page`: Page number for pagination

## 🎨 Customization

### Colors and Branding
The design uses a warm, cozy color palette inspired by Pakistani aesthetics. To customize:

1. **Update Color Scheme**: Edit `app/globals.css` to change the CSS custom properties
2. **Change Fonts**: Modify `app/layout.tsx` to use different Google Fonts
3. **Update Logo**: Replace the "N" logo in headers with your brand logo

### Adding New Products
1. **Via Database**: Insert directly into MongoDB
2. **Via API**: Use the POST `/api/products` endpoint
3. **Via Seeding Script**: Add to `scripts/seed-database.js`

### Product Categories
Current categories: Scented Candles, Wall Décor, Aroma Diffusers, Accessories, Gift Sets

To add new categories:
1. Update the `categories` array in `app/shop/page.tsx`
2. Add corresponding products to your database

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env.local` to version control
- **Database Access**: Restrict MongoDB network access to your server IPs only
- **Input Validation**: API routes include basic validation
- **HTTPS**: Always use HTTPS in production (Vercel provides this automatically)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Check your connection string format
   - Verify username/password are correct
   - Ensure network access is configured in MongoDB Atlas

2. **Products Not Loading**:
   - Run the seeding script: `node scripts/seed-database.js`
   - Check browser console for API errors
   - Verify MongoDB connection in server logs

3. **Images Not Displaying**:
   - Ensure image files are in the `public/` directory
   - Check image paths in your product data
   - Verify image URLs are accessible

4. **Build Errors**:
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

### Development Tips

- **Hot Reload**: Changes to pages and components auto-reload
- **Database Changes**: Restart dev server after schema changes
- **API Testing**: Use tools like Postman or Thunder Client
- **Debugging**: Use browser dev tools and `console.log` statements

## 📞 Support

For issues and questions:
1. Check this README first
2. Look at the troubleshooting section
3. Check the [Next.js documentation](https://nextjs.org/docs)
4. Review [MongoDB documentation](https://docs.mongodb.com/)

## 📄 License

This project is for educational and commercial use. Feel free to customize it for your business needs.

---

**Made with ❤️ for Pakistani entrepreneurs and small businesses**
