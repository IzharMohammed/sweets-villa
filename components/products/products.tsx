import { getProducts } from "@/actions/products";
import ProductsClient from "./product-client";

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <ProductsClient products={products.data} />
    </div>
  );
}
