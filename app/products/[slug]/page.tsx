import { getProductDetails } from "@/actions/products";
import { cookieManager } from "@/utils/authTools";
import ProductImageGallery from "@/components/products/product-image-gallery";
import ProductActions from "@/components/products/product-actions";
import { libre, montserrat, lato } from "@/lib/fonts";
import BottomNav from "@/components/bottom-nav";

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
  const response = (await getProductDetails(slug)) as ProductResponse;
  const product = response.data;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Check authentication status
  const isAuthenticated = await cookieManager.isAuthenticated();

  // Default variant logic if needed, but ProductActions handles it
  // const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE - Full Height Image Gallery (Client Component) */}
        <ProductImageGallery
          images={product.image}
          productName={product.name}
        />

        {/* RIGHT SIDE - Product Details (Server Rendered Static Content + Client Actions) */}
        <div className="px-6 py-8 sm:px-12 sm:py-12 lg:px-16">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-600">5.0</span>
          </div>

          {/* Product Name */}
          <h1
            className={`${libre.className} text-3xl sm:text-4xl font-normal text-gray-900 mb-3`}
          >
            {product.name}
          </h1>

          {/* Short Description */}
          <p
            className={`${montserrat.className} text-gray-700 mb-6 leading-relaxed text-base`}
          >
            {product.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2 mb-8">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Premium quality ingredients</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Freshly made daily</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5">•</span>
              <span>Traditional recipe</span>
            </div>
          </div>

          {/* Interactive Actions (Variants, Quantity, Cart, Accordion) */}
          <ProductActions
            productId={product.id}
            variants={product.variants}
            description={product.description}
            category={product.category}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
