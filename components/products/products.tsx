import { getProducts } from "@/actions/products";
import ProductsClient from "./product-client";

export default async function Products() {
  const result = await getProducts();
  const products = result?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <ProductsClient products={products} />
    </div>
  );
}
