"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

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

interface CartItemProps {
  item: CartItemData;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
}

export default function CartItem({ item, updateQuantity, removeItem }: CartItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
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
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
  );
}
