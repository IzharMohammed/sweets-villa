"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Product, ProductsClientProps } from "@/types/product";
import { useRouter } from "next/navigation";
import BottomNav from "../bottom-nav";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsVertical({ products }: ProductsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Popular", "Chef special", "Gifting"];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" ? products : products; // In production, filter by actual category

  useGSAP(() => {
    // Animate category tabs
    // gsap.from(".category-tab", {
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top 80%",
    //   },
    //   y: 30,
    //   opacity: 0,
    //   duration: 0.8,
    //   stagger: 0.1,
    //   ease: "power3.out",
    // });

    // // Animate product cards on scroll
    gsap.from(".product-card-vertical", {
      scrollTrigger: {
        trigger: ".products-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selectedCategory]);

  return (
    <section ref={sectionRef} className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 mb-6 text-center">
          Our Sweets
        </h1>

        {/* Vertical Products Grid */}
        <div className="products-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCardVertical
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </section>
  );
}

function ProductCardVertical({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.discount > 0);

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product page

    if (isAdding) return; // Prevent double clicks

    setIsAdding(true);

    try {
      console.log(product.id);

      const result = await addToCart(product.id, 1);

      if (result.success) {
        toast.success(result.message || "Item added to cart!");

        // Optional: Add a quick scale animation
        gsap.to(cardRef.current, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
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
    <div
      ref={cardRef}
      className="product-card-vertical cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/products/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-3 shadow-lg">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1 px-1">
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 hover:text-amber-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-gray-800">
            ₹{lowestPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.variants[0].price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="
            group w-full mt-2 relative overflow-hidden
            bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium
            shadow-md transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span
            className="
              absolute inset-0 bg-yellow-700 
              translate-y-full group-hover:translate-y-0
              transition-transform duration-300
            "
          ></span>
          <span className="relative z-10">
            {isAdding ? "Adding..." : "Add"}
          </span>
        </button>
      </div>
    </div>
  );
}
