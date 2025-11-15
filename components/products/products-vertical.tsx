"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Product, ProductsClientProps } from "@/types/product";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsVertical({ products }: ProductsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Popular", "Chef special", "Gifting"];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" ? products : products; // In production, filter by actual category

  useGSAP(() => {
    // Animate category tabs
    gsap.from(".category-tab", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Animate product cards on scroll
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
  const router = useRouter();

  useGSAP(() => {
    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.discount > 0);

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
        <button className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
          Add
        </button>
      </div>
    </div>
  );
}
