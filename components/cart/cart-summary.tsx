"use client";

import Link from "next/link";
import OTPDrawer from "../otp-drawer";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  summary: {
    subtotal: number;
    totalDiscount: number;
    totalItems: number;
  };
  isAuthenticated: boolean;
  className?: string;
}

export default function CartSummary({
  summary,
  isAuthenticated,
  className,
}: CartSummaryProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-md p-6", className)}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">₹{summary.subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span className="font-medium text-green-600">
            -₹{summary.totalDiscount}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="font-medium">FREE</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>₹{summary.subtotal}</span>
          </div>
        </div>
      </div>

      <OTPDrawer isAuthenticated={isAuthenticated} />

      <Link
        href="/products"
        className="w-full mt-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-medium transition-colors inline-block text-center"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
