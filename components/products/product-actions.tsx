"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { lato, montserrat } from "@/lib/fonts";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";

import ProductAccordion from "./product-accordion";
import OTPDrawer from "@/components/otp-drawer";

interface Variant {
  id: string;
  discount: number;
  price: number;
  stock: number;
  unit: string;
  quantity: number;
  position: number;
  isDefault: boolean;
}

interface ProductActionsProps {
  productId: string;
  variants: Variant[];
  description: string;
  category: string;
  isAuthenticated: boolean;
}

export default function ProductActions({ productId, variants, description, category, isAuthenticated }: ProductActionsProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    variants.find((v) => v.isDefault) || variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showOtpDrawer, setShowOtpDrawer] = useState(false);
  const increment = useCartStore((s) => s.increment);

  // Handle variant selection
  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    setQuantity(1);

    // Animate price change
    gsap.from(".price-display", {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);

    try {
      const result = await addToCart(productId, selectedVariant.id, quantity);

      if (result.success) {
        toast.success(result.message || "Item added to cart!");
        increment();
      } else {
        toast.error(result.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to add item to cart";
      toast.error(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Show OTP drawer for unauthenticated users
      setShowOtpDrawer(true);
    } else {
      // Navigate to checkout with direct mode, including productId
      const checkoutUrl = `/checkout?mode=direct&productId=${productId}&variantId=${selectedVariant.id}&quantity=${quantity}`;
      router.push(checkoutUrl);
    }
  };

  const totalPrice = selectedVariant.price * quantity;

  return (
    <div>
      {/* Price */}
      <div className="price-display flex items-baseline gap-2 mb-6">
        <span className={`${lato.className} font-bold text-gray-900 text-2xl`}>
          ₹{selectedVariant.price}
        </span>
      </div>

      {/* Size/Variants */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleVariantSelect(variant)}
              className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                selectedVariant.id === variant.id
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
              }`}
            >
              {variant.quantity} {variant.unit.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-gray-900 hover:bg-gray-50 text-xl"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-medium text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(Math.min(selectedVariant.stock, quantity + 1))
              }
              className="w-12 h-12 flex items-center justify-center text-gray-900 hover:bg-gray-50 text-xl"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600">
            {selectedVariant.stock} available
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors mb-3 text-sm uppercase tracking-wide ${montserrat.className} ${
          isAdding ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isAdding ? "ADDING..." : `ADD TO CART — ₹${totalPrice}`}
      </button>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        disabled={isAdding}
        className={`w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors mb-3 text-sm uppercase tracking-wide ${montserrat.className} ${
          isAdding ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        BUY NOW — ₹{totalPrice}
      </button>

      {/* Find Nearest Store */}
      <button
        className={`w-full border border-gray-900 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-8 text-sm uppercase tracking-wide ${montserrat.className}`}
      >
        FIND NEAREST STORE
      </button>

      <ProductAccordion 
        description={description}
        category={category}
        weight={`${selectedVariant.quantity} ${selectedVariant.unit}`}
        stock={selectedVariant.stock}
      />

      {/* OTP Drawer for unauthenticated users */}
      <OTPDrawer
        isAuthenticated={isAuthenticated}
        redirectUrl={`/checkout?mode=direct&productId=${productId}&variantId=${selectedVariant.id}&quantity=${quantity}`}
        isOpen={showOtpDrawer}
        onOpenChange={setShowOtpDrawer}
      />
    </div>
  );
}
