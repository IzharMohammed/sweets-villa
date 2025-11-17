import { getProductDetails } from "@/actions/products";
import ProductDetailClient from "@/components/products/product-details";

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  hotSale: boolean;
  status: string;
  storeId: string;
  image: string[]; // array of image URLs
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  variants: Variant[];
}

export interface Variant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  quantity: number;
  sku: string;
  barcode: string;
  unit: string; // "GRAMS"
  discount: number;
  position: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getProductDetails(slug)) as ProductResponse;
  console.log(product);
  return <ProductDetailClient product={product.data} />;
}
