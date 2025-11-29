"use client";

import { useCart } from "@/lib/hooks/use-cart";
import BottomNav from "@/components/bottom-nav";
import { getAuthStatus } from "@/actions/auth";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { useEffect, useState } from "react";

export default function Cart() {
  const { data: cart, isLoading } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    getAuthStatus().then(setIsAuthenticated);
  }, []);

  const items = cart?.data || [];
  const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mb-6 lg:mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4 mb-24 lg:mb-0">
            {items.map((item: any, index: number) => (
              <div 
                key={item.id} 
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-700">
              <CartSummary 
                summary={cart.summary} 
                isAuthenticated={isAuthenticated} 
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
