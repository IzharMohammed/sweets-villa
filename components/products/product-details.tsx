"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { geist, lato, libre, montserrat, ubuntu } from "@/lib/fonts";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";

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

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string[];
  variants: Variant[];
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<SVGSVGElement>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants.find((v) => v.isDefault) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // const mainImageRef = useRef(null);
  const slidesRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const slideCount = product.image.length;
  const [isAdding, setIsAdding] = useState(false);

  const increment = useCartStore((s) => s.increment);

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product page

    if (isAdding) return; // Prevent double clicks

    setIsAdding(true);

    try {
      const result = await addToCart(product.id, selectedVariant.id, 1);

      if (result.success) {
        toast.success(result.message || "Item added to cart!");
        increment();
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

  // Initial mount animation
  useGSAP(() => {
    const tl = gsap.timeline();

    // Animate main image
    tl.from(
      mainImageRef.current,
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Animate product details
    tl.from(
      detailsRef.current,
      {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, []);

  // Handle image change animation
  const handleImageSelect = (index: number) => {
    if (index === selectedImage) return;

    const direction = index > selectedImage ? 1 : -1;
    setSelectedImage(index);

    // Slide to selected index
    gsap.to(".slides", {
      x: `-${index * 100}%`,
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

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

  // Toggle product details
  const toggleDetails = () => {
    const newState = !isDetailsOpen;
    setIsDetailsOpen(newState);

    if (newState) {
      // Transform + to X
      gsap.to(plusIconRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });

      // Expand description
      gsap.to(descriptionRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Transform X to +
      gsap.to(plusIconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Collapse description
      gsap.to(descriptionRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  // Move to specific slide
  const goToSlide = (index: number) => {
    setSlideIndex(index);

    gsap.to(slidesRef.current, {
      x: `-${index * 100}%`,
      duration: 0.5,
      ease: "power2.out",
    });

    animateIndicator(index);
  };

  // Detect swipe start
  const handleTouchStart = (e: any) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Track user finger
  const handleTouchMove = (e: any) => {
    if (!isDragging.current) return;

    currentX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // On release → determine direction
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;

    if (diff > 50) {
      // Swipe LEFT → Next
      if (slideIndex < slideCount - 1) goToSlide(slideIndex + 1);
    } else if (diff < -50) {
      // Swipe RIGHT → Prev
      if (slideIndex > 0) goToSlide(slideIndex - 1);
    }
  };

  useEffect(() => {
    const slider = mainImageRef.current!;

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    slider.addEventListener("mousedown", handleTouchStart);
    slider.addEventListener("mousemove", handleTouchMove);
    slider.addEventListener("mouseup", handleTouchEnd);
    slider.addEventListener("mouseleave", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);

      slider.removeEventListener("mousedown", handleTouchStart);
      slider.removeEventListener("mousemove", handleTouchMove);
      slider.removeEventListener("mouseup", handleTouchEnd);
      slider.removeEventListener("mouseleave", handleTouchEnd);
    };
  }, [slideIndex]);

  const animateIndicator = (index: number) => {
    gsap.to(".indicator-dot", {
      scale: 0.6,
      opacity: 0.4,
      duration: 0.3,
    });

    gsap.to(`.indicator-dot-${index}`, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const totalPrice = selectedVariant.price * quantity;

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE - Full Height Image */}
        <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0">
          {/* Image Gallery - Positioned at top - HIDE ON MOBILE */}
          <div
            ref={thumbnailsRef}
            className="hidden lg:flex absolute top-4 left-4 z-10 flex-col gap-2"
          >
            {product.image.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`thumbnail-item flex-shrink-0 w-20 h-20 bg-white p-0.5 overflow-hidden transition-all ${
                  selectedImage === index ? "border border-black" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image - Full Container with Swipe */}
          <div
            ref={mainImageRef}
            className="relative w-full h-full overflow-hidden touch-pan-y"
          >
            <div
              ref={slidesRef}
              className="slides flex w-full h-full"
              style={{ touchAction: "none" }}
            >
              {product.image.map((img, index) => (
                <div key={index} className="slide min-w-full h-full relative">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden z-20">
              {product.image.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator-dot indicator-dot-${idx} w-2 h-2 rounded-full bg-white/80`}
                  style={{
                    transform: slideIndex === idx ? "scale(1)" : "scale(0.6)",
                    opacity: slideIndex === idx ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Product Details */}
        <div ref={detailsRef} className="px-6 py-8 sm:px-12 sm:py-12 lg:px-16">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-600">5.0</span>
          </div>

          {/* Product Name */}
          <h1
            className={`${libre.className} text-3xl sm:text-4xl font-normal text-gray-900 mb-3`}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="price-display flex items-baseline gap-2 mb-6">
            <span className={`${lato.className}  font-bold text-gray-900`}>
              ₹{selectedVariant.price}
            </span>
            {/* <span className="text-gray-900 uppercase">
              / {selectedVariant.unit}
            </span> */}
          </div>

          {/* Short Description */}
          <p
            className={`${montserrat.className} text-gray-700 mb-6 leading-relaxed text-base`}
          >
            {product.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2 mb-8">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Premium quality ingredients</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Freshly made daily</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Traditional recipe</span>
            </div>
          </div>

          {/* Size/Variants */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quantity
            </h3>
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
            className={`w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3 text-sm uppercase tracking-wide ${montserrat.className}`}
          >
            ADD TO CART — ₹{totalPrice}
          </button>

          {/* Find Nearest Store */}
          <button
            className={`w-full border border-gray-900 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-8 text-sm uppercase tracking-wide ${montserrat.className}`}
          >
            FIND NEAREST STORE
          </button>

          {/* Product Details Accordion */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={toggleDetails}
              className="w-full cursor-pointer flex items-center justify-between text-left group"
            >
              <h3 className={`text-2xl text-gray-900 ${libre.className}`}>
                Product Details
              </h3>
              <svg
                ref={plusIconRef}
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <div ref={descriptionRef} className="overflow-hidden h-0 opacity-0">
              <div className="pt-4 pb-2">
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  {product.description}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Weight:</span>{" "}
                    {selectedVariant.quantity} {selectedVariant.unit}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Stock:</span>{" "}
                    {selectedVariant.stock} units available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
