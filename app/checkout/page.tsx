import { getCartItems } from "@/actions/cart";
import CheckoutClient from "@/components/checkout/checkout-client";

export const dynamic = 'force-dynamic';

export default async function Checkout() {
  const cartItems = await getCartItems();

  return <CheckoutClient cartData={cartItems} />;
}