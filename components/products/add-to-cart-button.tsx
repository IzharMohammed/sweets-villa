"use client";

import { useAddToCart } from "@/lib/hooks/use-add-to-cart";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
}

export default function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
  const addToCartMutation = useAddToCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation(); // Stop event bubbling

    addToCartMutation.mutate({
      productId,
      variantId,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={addToCartMutation.isPending}
      className="
        group w-full mt-2 relative overflow-hidden
        bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium
        shadow-md transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-yellow-700
      "
    >
      <span className="relative z-10">
        {addToCartMutation.isPending ? "Adding..." : "Add"}
      </span>
    </button>
  );
}
