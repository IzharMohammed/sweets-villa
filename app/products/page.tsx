"use client";

import { useProducts } from "@/lib/hooks/use-products";
import ProductCard from "@/components/products/product-card";
import BottomNav from "@/components/bottom-nav";

export default function Products() {
  const { data: productsResponse, isLoading, error } = useProducts();
  const products = productsResponse?.data || [];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to load products
          </h2>
          <p className="text-gray-600">
            {(error as any)?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <section className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 mb-6 text-center">
              Our Sweets
            </h1>
            <div className="products-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <section className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-800 mb-6 text-center animate-in fade-in slide-in-from-top-4 duration-700">
            Our Sweets
          </h1>

          {/* Vertical Products Grid */}
          <div className="products-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product: any, index: number) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <BottomNav />
      </section>
    </div>
  );
}
