"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Add some delicious sweets to get started!
      </p>
      <button
        onClick={() => router.push("/products")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
      >
        Browse Products
      </button>
    </div>
  );
}
