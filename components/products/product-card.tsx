import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
      className="product-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-4 shadow-md">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 capitalize">{product.category}</p>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-gray-800">
            ₹{lowestPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.variants[0].price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
