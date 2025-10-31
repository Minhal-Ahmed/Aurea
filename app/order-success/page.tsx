"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || `ORD-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Order Number */}
              <div className="text-center pb-6 border-b">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  #ORD-{Math.floor(Math.random() * 10000)}
                </p>
              </div>

              {/* Next Steps */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Order Confirmation</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email confirmation with your order details
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Your order will be delivered within 3-5 business days
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Payment on Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Pay securely when you receive your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Need Help?</strong> Contact our customer
                  support at{" "}
                  <a href="mailto:support@aurea.com" className="text-primary hover:underline">
                    support@aurea.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+923001234567" className="text-primary hover:underline">
                    +92 300 1234567
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button asChild variant="outline" className="flex-1 rounded-full" size="lg">
            <Link href="/shop">
              <Package className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild className="flex-1 rounded-full" size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}