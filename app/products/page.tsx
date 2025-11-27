import { getProducts } from "@/actions/products";
import ProductCard from "@/components/products/product-card";
import BottomNav from "@/components/bottom-nav";

export const dynamic = 'force-dynamic';

export default async function Products() {
  const productsResponse = await getProducts();
  const products = productsResponse?.data || [];

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
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
        <BottomNav />
      </section>
    </div>
  );
}
