"use client";

import { getCartItems } from "@/actions/cart";
import { useCartStore } from "@/store/cart-store";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.count);

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/cart")) return "cart";
    if (pathname.startsWith("/profile")) return "profile";
    return "home";
  };
  const activeTab = getActiveTab();

  return (
    <nav
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 
        w-[90%] max-w-md z-50 
        bg-white/20 backdrop-blur-xl 
        rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        border border-white/30 px-2 py-1"
    >
      <div className="flex items-center justify-around">
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
        >
          <div
            className={`transition-all duration-200 ${
              activeTab === "home" ? "scale-110" : "scale-100"
            }`}
          >
            <Home
              className={`w-6 h-6 transition-all duration-200 ${
                activeTab === "home"
                  ? "text-blue-600 fill-blue-600"
                  : "text-gray-700"
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-medium transition-all duration-200 ${
              activeTab === "home" ? "text-blue-600 scale-95" : "text-gray-700"
            }`}
          >
            Home
          </span>
        </button>

        <button
          onClick={() => router.push("/products")}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
        >
          <div
            className={`transition-all duration-200 ${
              activeTab === "products" ? "scale-110" : "scale-100"
            }`}
          >
            <ShoppingBag
              className={`w-6 h-6 transition-all duration-200 ${
                activeTab === "products"
                  ? "text-blue-600 fill-blue-600"
                  : "text-gray-700"
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-medium transition-all duration-200 ${
              activeTab === "products"
                ? "text-blue-600 scale-95"
                : "text-gray-700"
            }`}
          >
            Products
          </span>
        </button>

        <button
          onClick={() => router.push("/cart")}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200 relative"
        >
          <div
            className={`transition-all duration-200 ${
              activeTab === "cart" ? "scale-110" : "scale-100"
            }`}
          >
            <ShoppingCart
              className={`w-6 h-6 transition-all duration-200 ${
                activeTab === "cart"
                  ? "text-blue-600 fill-blue-600"
                  : "text-gray-700"
              }`}
            />
            <span className="absolute top-0 right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </div>
          <span
            className={`text-[10px] font-medium transition-all duration-200 ${
              activeTab === "cart" ? "text-blue-600 scale-95" : "text-gray-700"
            }`}
          >
            Cart
          </span>
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
        >
          <div
            className={`transition-all duration-200 ${
              activeTab === "profile" ? "scale-110" : "scale-100"
            }`}
          >
            <User
              className={`w-6 h-6 transition-all duration-200 ${
                activeTab === "profile"
                  ? "text-blue-600 fill-blue-600"
                  : "text-gray-700"
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-medium transition-all duration-200 ${
              activeTab === "profile"
                ? "text-blue-600 scale-95"
                : "text-gray-700"
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
}
