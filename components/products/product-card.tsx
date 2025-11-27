import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.discount > 0);

  return (
    <div
      className="group relative bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: '700ms'
      }}
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl overflow-hidden mb-3">
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg z-10">
              SALE
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-1">
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
        </div>
      </Link>

      {/* Add to Cart Button */}
      <AddToCartButton productId={product.id} variantId={product.variants[0]?.id || ""} />
    </div>
  );
}
