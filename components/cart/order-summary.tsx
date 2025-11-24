"use client";

import { useRouter } from "next/navigation";
import OTPDrawer from "../otp-drawer";

interface OrderSummaryProps {
  subtotal: number;
  totalDiscount: number;
  total: number;
  isAuthenticated: boolean;
  onLoginSuccess: () => void;
}

export default function OrderSummary({
  subtotal,
  totalDiscount,
  total,
  isAuthenticated,
  onLoginSuccess,
}: OrderSummaryProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span className="font-medium text-green-600">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="font-medium">FREE</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <OTPDrawer
        isAuthenticated={isAuthenticated}
        onLoginSuccess={onLoginSuccess}
      />

      <button
        onClick={() => router.push("/products")}
        className="w-full mt-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
