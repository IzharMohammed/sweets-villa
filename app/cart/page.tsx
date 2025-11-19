import { getCartItems } from "@/actions/cart";
import CartClient from "@/components/cart/cart-client";

export default async function Cart() {
  const cart = await getCartItems();
  console.log(cart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <CartClient cart={cart} />
    </div>
  );
}
