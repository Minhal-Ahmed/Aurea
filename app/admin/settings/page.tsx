"use client";

import { useState } from "react";
import { Store, Truck, CreditCard, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Store Settings
    storeName: "Aurea",
    storeEmail: "info@aurea.com",
    storePhone: "+92 300 1234567",
    storeAddress: "Lahore, Punjab, Pakistan",
    
    // Shipping Settings
    freeShippingThreshold: 5000,
    standardShippingCost: 250,
    expressShippingCost: 500,
    
    // Payment Settings
    codEnabled: true,
    bankTransferEnabled: false,
    
    // Notifications
    orderNotifications: true,
    lowStockAlerts: true,
    reviewNotifications: true,
    
    // SEO Settings
    metaTitle: "Aurea - Transform Your Space with Candles & Décor",
    metaDescription: "Premium Pakistani lifestyle brand offering handmade scented candles, decorative wall frames, and unique home accessories.",
    metaKeywords: "candles, home decor, Pakistan, handmade",
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your store configuration</p>
      </div>

      {/* Store Information */}
      <Card className="border-amber-100">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-white border-b border-amber-100">
          <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-700" />
            Store Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <Input
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              placeholder="Your Store Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                placeholder="store@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <Input
                type="tel"
                value={settings.storePhone}
                onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                placeholder="+92 300 1234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Address
            </label>
            <Input
              value={settings.storeAddress}
              onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
              placeholder="Your store address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card className="border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
          <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-700" />
            Shipping Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Free Shipping Threshold (PKR)
            </label>
            <Input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
              placeholder="5000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Orders above this amount get free shipping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Standard Shipping Cost (PKR)
              </label>
              <Input
                type="number"
                value={settings.standardShippingCost}
                onChange={(e) => setSettings({ ...settings, standardShippingCost: Number(e.target.value) })}
                placeholder="250"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Express Shipping Cost (PKR)
              </label>
              <Input
                type="number"
                value={settings.expressShippingCost}
                onChange={(e) => setSettings({ ...settings, expressShippingCost: Number(e.target.value) })}
                placeholder="500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
          <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-700" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.codEnabled}
                onChange={(e) => setSettings({ ...settings, codEnabled: e.target.checked })}
                className="w-4 h-4 text-purple-600"
              />
              <div>
                <p className="font-medium text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.bankTransferEnabled}
                onChange={(e) => setSettings({ ...settings, bankTransferEnabled: e.target.checked })}
                className="w-4 h-4"
                disabled
              />
              <div>
                <p className="font-medium text-gray-900">Bank Transfer</p>
                <p className="text-sm text-gray-600">Coming soon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
          <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-700" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.orderNotifications}
                onChange={(e) => setSettings({ ...settings, orderNotifications: e.target.checked })}
                className="w-4 h-4 text-green-600"
              />
              <div>
                <p className="font-medium text-gray-900">Order Notifications</p>
                <p className="text-sm text-gray-600">Get notified about new orders</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.lowStockAlerts}
                onChange={(e) => setSettings({ ...settings, lowStockAlerts: e.target.checked })}
                className="w-4 h-4 text-green-600"
              />
              <div>
                <p className="font-medium text-gray-900">Low Stock Alerts</p>
                <p className="text-sm text-gray-600">Alert when products run low</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.reviewNotifications}
                onChange={(e) => setSettings({ ...settings, reviewNotifications: e.target.checked })}
                className="w-4 h-4 text-green-600"
              />
              <div>
                <p className="font-medium text-gray-900">Review Notifications</p>
                <p className="text-sm text-gray-600">Get notified about new reviews</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card className="border-indigo-100">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-100">
          <CardTitle className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-700" />
            SEO Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <Input
              value={settings.metaTitle}
              onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">{settings.metaTitle.length}/60 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              rows={3}
              maxLength={160}
              className="w-full border rounded-lg p-3"
            />
            <p className="text-xs text-gray-500 mt-1">{settings.metaDescription.length}/160 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <Input
              value={settings.metaKeywords}
              onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
              placeholder="candles, home decor, Pakistan"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="sticky bottom-6 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
          size="lg"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}