// v1
// "use client";

// import { useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Image from "next/image";
// import ProductCard from "./product-card";
// import { ProductsClientProps } from "@/types/product";

// gsap.registerPlugin(ScrollTrigger);

// export default function ProductsClient({ products }: ProductsClientProps) {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const categoriesRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   // Get unique categories
//   const categories = [
//     "All",
//     ...Array.from(new Set(products.map((p) => p.category))),
//   ];

//   // Filter products based on selected category
//   const filteredProducts =
//     selectedCategory && selectedCategory !== "All"
//       ? products.filter((p) => p.category === selectedCategory)
//       : products;

//   useGSAP(() => {
//     // Animate title on mount
//     gsap.from(titleRef.current, {
//       scrollTrigger: {
//         trigger: titleRef.current,
//         start: "top 90%",
//       },
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });

//     // Animate category buttons
//     gsap.from(".category-btn", {
//       scrollTrigger: {
//         trigger: categoriesRef.current,
//         start: "top bottom",
//       },
//       y: 60,
//       opacity: 0,
//       duration: 1,
//       ease: "power1.out",
//     });

//     // Animate product cards on scroll
//     gsap.from(".product-card", {
//       scrollTrigger: {
//         trigger: gridRef.current,
//         start: "top 80%",
//         toggleActions: "play none none reverse",
//       },
//       y: 60,
//       opacity: 0,
//       scale: 0.9,
//       duration: 1.5,
//       stagger: 0.2,
//       ease: "power3.out",
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   // Re-animate cards when category changes
//   useGSAP(() => {
//     if (selectedCategory !== null) {
//       gsap.from(".product-card", {
//         y: 40,
//         opacity: 0,
//         scale: 0.95,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "power2.out",
//       });
//     }
//   }, [selectedCategory]);

//   return (
//     <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <h1
//           ref={titleRef}
//           className="text-3xl hidden  lg:block  lg:text-5xl text-center font-serif text-gray-800 mb-8 sm:mb-12"
//         >
//           The best sweets for every celebration—
//           <br />
//           find them at Sri Mahalakshmi
//         </h1>

//         {/* Category Filter */}
//         <div
//           ref={categoriesRef}
//           className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
//         >
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`category-btn relative overflow-hidden group  text-black hover:bg-gray-800 hover:text-white  px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
//                 selectedCategory === category ||
//                 (selectedCategory === null && category === "All")
//                   ? "border border-black  shadow-lg scale-105"
//                   : "  hover:bg-gray-100 shadow-md hover:shadow-lg"
//               }`}
//             >
//               {/* Background animation */}
//               <span className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-all duration-300"></span>

//               {/* Button label */}
//               <span className="relative z-10 group-hover:text-white transition-colors duration-300">
//                 {category}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Products Grid */}
//         <div
//           ref={gridRef}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
//         >
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {/* Shop All Button */}
//         <div className="flex justify-center">
//           <button className="px-8 py-3 relative overflow-hidden group border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium">
//             {/* Background animation */}
//             <span className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-all duration-300"></span>

//             {/* Button label */}
//             <span className="relative z-10 group-hover:text-white transition-colors duration-300">
//               Shop all sweets
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// v2
"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ProductsClientProps } from "@/types/product";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsClient({ products }: ProductsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories = ["Popular", "Chef special", "Gifting"];

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scroll = (category: string, direction: "left" | "right") => {
    const container = scrollRefs.current[category];
    if (!container) return;

    const scrollAmount = direction === "left" ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        {/* <div className="flex gap-2 sm:gap-4 mb-8 lg:mb-12 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-tab whitespace-nowrap px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-amber-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Products Container for Each Category */}
        {/* All Categories with Products */}
        {categories.map((category) => (
          <div key={category} className="mb-12 mt-12 lg:mb-16">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-serif text-gray-800">
                {category}
              </h2>

              {/* Desktop Navigation Arrows */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => scroll(category, "left")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => scroll(category, "right")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Products Scroll Container */}
            <div
              ref={(el) => {
                scrollRefs.current[category] = el;
              }}
              className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={`${category}-${product.id}`}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
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
      className="flex-none w-[195px] sm:w-[260px] lg:w-[280px] cursor-pointer"
      style={{ scrollSnapAlign: "start" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/products/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[1] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-2 shadow-lg">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="320px"
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1 px-1">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-amber-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">
            ₹{lowestPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.variants[0].price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full  bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
