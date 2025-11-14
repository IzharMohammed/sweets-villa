"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ProductCard from "./product-card";
import { ProductsClientProps } from "@/types/product";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsClient({ products }: ProductsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((p) => p.category === selectedCategory)
      : products;

  useGSAP(() => {
    // Animate title on mount
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        // toggleActions:"play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate category buttons
    gsap.fromTo(
      ".category-btn",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      },
      {
        opacity: 1,
      }
    );

    // Animate product cards on scroll
    gsap.from(".product-card", {
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Re-animate cards when category changes
  useGSAP(() => {
    if (selectedCategory !== null) {
      gsap.from(".product-card", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [selectedCategory]);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-center font-serif text-gray-800 mb-8 sm:mb-12"
        >
          The best sweets for every celebration—
          <br />
          find them at Sri Mahalakshmi
        </h1>

        {/* Category Filter */}
        <div
          ref={categoriesRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn text-black hover:bg-gray-800 hover:text-white  px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category ||
                (selectedCategory === null && category === "All")
                  ? "border border-black  shadow-lg scale-105"
                  : "  hover:bg-gray-100 shadow-md hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Shop All Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium">
            Shop all sweets
          </button>
        </div>
      </div>
    </section>
  );
}
