"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useUpdateCartQuantity } from "@/lib/hooks/use-update-cart-quantity";
import { useRemoveFromCart } from "@/lib/hooks/use-remove-from-cart";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: any; // Using any for now to match existing structure, should be typed properly
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const updateQuantityMutation = useUpdateCartQuantity();
  const removeFromCartMutation = useRemoveFromCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity); // Optimistic local update
    
    updateQuantityMutation.mutate({
      cartId: item.id,
      newQuantity,
    });
  };

  const handleRemove = () => {
    removeFromCartMutation.mutate(item.id);
  };

  const isPending = updateQuantityMutation.isPending || removeFromCartMutation.isPending;

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-300 border border-transparent hover:border-amber-100",
      isPending && "opacity-70 pointer-events-none"
    )}>
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
              onClick={handleRemove}
              disabled={isPending}
              className="hidden sm:block text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={quantity <= 1 || isPending}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium text-gray-800 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={isPending}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-bold text-gray-800 text-lg">
                ₹{item.lineTotal}
              </p>
              {item.variant.discount > 0 && (
                <p className="text-xs text-gray-400 line-through">
                  ₹{item.variant.price * quantity}
                </p>
              )}
            </div>
          </div>

          {/* Remove Button - Mobile */}
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="sm:hidden flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm mt-3 font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

