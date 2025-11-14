import { getProductDetails } from "@/actions/products";
import ProductDetailClient from "@/components/products/product-details";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetails(slug);
  console.log(product);
  return <ProductDetailClient product={product.data} />;
}
