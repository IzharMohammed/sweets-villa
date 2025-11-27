"use client";

import { useState } from "react";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
}

export default function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation(); // Stop event bubbling

    if (isAdding) return;
    setIsAdding(true);

    try {
      const result = await addToCart(productId, variantId, 1);
      if (result.success) {
        toast.success(result.message || "Item added to cart!");
      } else {
        toast.error(result.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="
        group w-full mt-2 relative overflow-hidden
        bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium
        shadow-md transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-yellow-700
      "
    >
      <span className="relative z-10">
        {isAdding ? "Adding..." : "Add"}
      </span>
    </button>
  );
}
