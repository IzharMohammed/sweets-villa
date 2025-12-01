import { getCartItems } from "@/actions/cart";
import { getProductDetails } from "@/actions/products";
import CheckoutClient from "@/components/checkout/checkout-client";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; productId?: string; variantId?: string; quantity?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode;

  // Direct checkout mode
  if (mode === 'direct') {
    const variantId = params.variantId;
    const quantity = parseInt(params.quantity || '1');

    if (!variantId) {
      // Invalid params, redirect to products
      redirect('/products');
    }

    // We need to get the product ID from the variant ID
    // Since we don't have a direct variant endpoint, we'll fetch by productId
    // The productId is embedded in the URL from the product page
    // For now, we'll extract it from the product page context
    
    // Actually, we need to find which product this variant belongs to
    // This is a limitation - we'll need the productId passed in the URL too
    const productId = params.productId as string | undefined;
    
    if (!productId) {
      // Need productId to fetch product details
      redirect('/products');
    }

    try {
      // Fetch product details
      const response = await getProductDetails(productId);

      if (!response.success || !response.data) {
        redirect('/products');
      }

      const product = response.data;
      
      // Find the specific variant
      const variant = product.variants.find((v: any) => v.id === variantId);

      if (!variant) {
        // Variant not found in this product
        redirect('/products');
      }

      // Check stock availability
      if (variant.stock < quantity) {
        // Not enough stock, redirect
        redirect('/products');
      }

      // Calculate pricing
      const finalPrice = variant.price - variant.discount;
      const lineTotal = finalPrice * quantity;
      const totalDiscount = variant.discount * quantity;

      // Transform to cart-compatible format
      const productData = {
        success: true,
        data: [
          {
            id: `direct-${variantId}-${Date.now()}`,
            addedAt: new Date().toISOString(),
            lineTotal: lineTotal,
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.image,
              category: product.category,
              status: product.status,
            },
            quantity: quantity,
            variant: {
              id: variant.id,
              displayName: `${variant.quantity} ${variant.unit.toUpperCase()}`,
              finalPrice: finalPrice,
              price: variant.price,
              discount: variant.discount,
              quantity: variant.quantity,
              sku: variant.sku,
              stock: variant.stock,
              unit: variant.unit,
            },
            variantId: variant.id,
          },
        ],
        summary: {
          subtotal: lineTotal,
          totalDiscount: totalDiscount,
          totalItems: quantity,
        },
        count: 1,
        message: "Product data fetched successfully",
      };

      return <CheckoutClient cartData={productData} mode="direct" />;
    } catch (error) {
      console.error('Error fetching product for direct checkout:', error);
      redirect('/products');
    }
  }

  // Cart checkout mode (default)
  const cartItems = await getCartItems();

  // If cart is empty, redirect to cart page
  if (!cartItems.success || cartItems.count === 0) {
    redirect('/cart');
  }

  return <CheckoutClient cartData={cartItems} mode="cart" />;
}