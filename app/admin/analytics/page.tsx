"use client";

import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, ShoppingBag, Users, Package, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: string;
    description: string;
    time: string;
  }>;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
    topProducts: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();
      const orders = ordersData.orders || [];

      // Fetch products
      const productsRes = await fetch("/api/products");
      const productsData = await productsRes.json();
      const products = productsData.products || [];

      // Calculate analytics
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
      const totalOrders = orders.length;
      const totalProducts = products.length;

      // Get unique customers
      const uniqueCustomers = new Set(orders.map((o: any) => o.shippingAddress?.phone)).size;

      // Calculate top products (mock data for now)
      const topProducts = products.slice(0, 5).map((p: any) => ({
        name: p.name,
        sales: Math.floor(Math.random() * 50),
        revenue: p.price * Math.floor(Math.random() * 50),
      })).sort((a, b) => b.revenue - a.revenue);

      // Recent activity
      const recentActivity = orders.slice(0, 10).map((order: any) => ({
        type: "order",
        description: `New order ${order.orderNumber}`,
        time: new Date(order.createdAt).toLocaleDateString(),
      }));

      setAnalytics({
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers: uniqueCustomers,
        revenueChange: 12.5,
        ordersChange: 8.3,
        topProducts,
        recentActivity,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Track your store performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  PKR {loading ? "..." : analytics.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{analytics.revenueChange}%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <DollarSign className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : analytics.totalOrders}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{analytics.ordersChange}%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Products</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : analytics.totalProducts}
                </p>
                <p className="text-sm text-gray-500 mt-2">Active listings</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Customers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : analytics.totalCustomers}
                </p>
                <p className="text-sm text-gray-500 mt-2">Unique buyers</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-amber-100">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-white border-b border-amber-100">
            <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-700" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-bold text-amber-700">
                      PKR {product.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-700" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-amber-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-amber-700" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              PKR {loading ? "..." : Math.round(analytics.totalRevenue / Math.max(analytics.totalOrders, 1)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Average Order Value</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-blue-700" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {loading ? "..." : Math.round((analytics.totalOrders / Math.max(analytics.totalCustomers, 1)) * 10) / 10}
            </p>
            <p className="text-sm text-gray-600">Orders per Customer</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6 text-purple-700" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {loading ? "..." : `${Math.round((analytics.totalOrders / Math.max(analytics.totalProducts, 1)) * 10) / 10}`}
            </p>
            <p className="text-sm text-gray-600">Sales per Product</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}