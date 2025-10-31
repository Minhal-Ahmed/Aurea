# MongoDB Setup Guide

## Error: Authentication Failed

You're seeing this error because your MongoDB connection string needs to be configured.

## Quick Fix

1. **Open or create** `.env.local` file in the root directory
2. **Add your MongoDB connection string**:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/noorco_ecommerce?retryWrites=true&w=majority
```

## How to Get Your MongoDB Connection String

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new cluster (free tier available)
4. Click **"Connect"** on your cluster
5. Choose **"Connect your application"**
6. Copy the connection string
7. Replace `<password>` with your actual database password
8. Replace `<dbname>` with `noorco_ecommerce`

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/noorco_ecommerce?retryWrites=true&w=majority
```

### Option 2: Local MongoDB

If you have MongoDB installed locally:

```env
MONGODB_URI=mongodb://localhost:27017/noorco_ecommerce
```

## Common Issues

### 1. Special Characters in Password
If your password contains special characters, they need to be URL-encoded:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `[` → `%5B`
- `]` → `%5D`

### 2. Whitelist Your IP Address
In MongoDB Atlas:
- Go to **Network Access**
- Click **"Add IP Address"**
- Choose **"Allow Access from Anywhere"** (0.0.0.0/0) for development
- Or add your specific IP address

### 3. Check Database User Permissions
- Go to **Database Access** in MongoDB Atlas
- Ensure your user has **"Read and write to any database"** permission

## After Setup

1. **Restart your development server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

2. **Seed the database** (optional):
   ```bash
   node scripts/seed-database.js
   ```

3. **Visit** `http://localhost:3000` to see your store

## Example .env.local File

Create a file named `.env.local` in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/noorco_ecommerce?retryWrites=true&w=majority

# Add other environment variables as needed
```

## Verify Connection

Once you've added the correct connection string:
1. Restart your dev server
2. You should see no more authentication errors
3. The homepage should load products successfully
4. The admin panel at `/admin` should work

## Still Having Issues?

Check these:
- ✅ No spaces in the connection string
- ✅ Password is correctly URL-encoded
- ✅ Database name is specified (`noorco_ecommerce`)
- ✅ IP address is whitelisted in MongoDB Atlas
- ✅ User has proper permissions
- ✅ `.env.local` file is in the root directory (not in subdirectories)
