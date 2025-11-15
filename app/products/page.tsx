import { getProducts } from "@/actions/products";
import ProductsVertical from "@/components/products/products-vertical";

export default async function Products() {
  const products = await getProducts();
  console.log("products", products);
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <ProductsVertical products={products.data} />
    </div>
  );
}
