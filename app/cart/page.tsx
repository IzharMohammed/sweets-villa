import { getCartItems } from "@/actions/cart";
import CartClient from "@/components/cart/cart-client";
import BottomNav from "@/components/bottom-nav";
import { cookieManager } from "@/utils/authTools";

export const dynamic = 'force-dynamic';

export default async function Cart() {
  const cart = await getCartItems();
  const isAuthenticated = await cookieManager.isAuthenticated();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <CartClient cart={cart} isAuthenticated={isAuthenticated} />
      <BottomNav />
    </div>
  );
}
