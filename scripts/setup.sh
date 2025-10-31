#!/bin/bash

# Noor & Co. E-commerce Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Noor & Co. E-commerce Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env.local
    echo "📝 Please update .env.local with your MongoDB connection string"
    echo "   You can get a free MongoDB Atlas account at: https://www.mongodb.com/atlas"
else
    echo "✅ Environment file already exists"
fi

# Check if MongoDB connection string is set
if grep -q "mongodb+srv://<username>:<password>" .env.local 2>/dev/null; then
    echo "⚠️  Please update your MongoDB connection string in .env.local"
    echo "   Replace <username>, <password>, and <cluster-url> with your actual credentials"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Update your MongoDB connection string in .env.local"
echo "2. Run the database seeding script: node scripts/seed-database.js"
echo "3. Start the development server: npm run dev"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo "🌐 Your app will be available at: http://localhost:3000"
