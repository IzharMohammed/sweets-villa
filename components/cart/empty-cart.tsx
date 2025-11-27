import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/bottom-nav";

export default function EmptyCart() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added any sweets yet. 
          Start shopping to fill it up!
        </p>
        <Link
          href="/products"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Browse Products
        </Link>
      </div>
      <BottomNav />
    </>
  );
}
