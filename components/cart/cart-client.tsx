"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import CartItem from "./cart-item";
import OrderSummary from "./order-summary";
import EmptyCart from "./empty-cart";

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

interface CartItemData {
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
  data: CartItemData[];
  summary: {
    subtotal: number;
    totalDiscount: number;
    totalItems: number;
  };
  count: number;
  message: string;
}

export default function CartClient({
  cart,
  isAuthenticated,
}: {
  cart: CartData;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState(cart.data);
  const setCount = useCartStore((s) => s.setCount);

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
    return <EmptyCart />;
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
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* Order Summary - Right Side (1 column on desktop) */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              totalDiscount={cart.summary.totalDiscount}
              total={cart.summary.subtotal}
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess}
            />
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
    </>
  );
}
