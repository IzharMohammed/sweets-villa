"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import { useCartStore } from "@/store/cart-store";
import OTPDrawer from "../otp-drawer";

interface Variant {
  id: string;
  displayName: string;
  finalPrice: number;
  price: number;
  discount: number;
  quantity: number;
  sku: string | null;
  stock: number;
  unit: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string[];
  category: string;
  status: string;
}

interface CartItem {
  id: string;
  addedAt: string;
  lineTotal: number;
  product: Product;
  quantity: number;
  variant: Variant;
  variantId: string;
}

interface CartData {
  success: boolean;
  data: CartItem[];
  summary: {
    subtotal: number;
    totalDiscount: number;
    totalItems: number;
  };
  count: number;
  message: string;
}

export default function CartClient({ cart, isAuthenticated }: { cart: CartData, isAuthenticated: boolean }) {
  const router = useRouter();
  const [items, setItems] = useState(cart.data);
  const setCount = useCartStore((s) => s.setCount);
  console.log("isAuthenticated",isAuthenticated);
  
  useEffect(() => {
    setCount(cart.count);
  }, [cart.count, setCount]);
  // Handle quantity change
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    // TODO: Call API to update quantity
    // await updateCartItemQuantity(itemId, newQuantity);
  };

  // Handle remove item
  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

    // TODO: Call API to remove item
    // await removeCartItem(itemId);
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Empty cart state
  if (!items || items.length === 0) {
    return (
      <>
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
        <BottomNav />
      </>
    );
  }

  // Handle successful login
  const handleLoginSuccess = () => {
    // Redirect to checkout or show success message
    console.log("Login successful, proceeding to checkout...");
    router.push("/checkout");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items - Left Side (2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4 mb-24 lg:mb-0">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl overflow-hidden">
                    <Image
                      src={item.product.image[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.variant.displayName}
                        </p>
                      </div>

                      {/* Remove Button - Desktop */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hidden sm:block text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-1.5 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-white rounded-md transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-gray-800 text-lg">
                          ₹{item.lineTotal}
                        </p>
                        {item.variant.discount > 0 && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{item.variant.price * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove Button - Mobile */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="sm:hidden flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Right Side (1 column on desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium text-green-600">
                    -₹{cart.summary.totalDiscount}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium">FREE</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{cart.summary.subtotal}</span>
                  </div>
                </div>
              </div>
            
              <OTPDrawer 
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess} />

              <button
                onClick={() => router.push("/products")}
                className="w-full mt-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Summary - Mobile Only */}
      <div className="hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{cart.summary.subtotal}
            </p>
          </div>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md">
            Checkout
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
