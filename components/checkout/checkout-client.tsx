"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { initiatePhonePePayment } from "@/actions/phonepe";
import { createOrder } from "@/actions/order";
import { toast } from "sonner";
import Image from "next/image";
import {
  ShippingAddressDialog,
  AddressFormData,
} from "./shipping-address-dialog";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string[];
  category: string;
  status: string;
}

interface Variant {
  id: string;
  displayName: string;
  finalPrice: number;
  price: number;
  discount: number;
  quantity: number; // This might be weight/volume
  sku: string | null;
  stock: number;
  unit: string;
}

interface CartItem {
  id: string;
  addedAt: string;
  lineTotal: number;
  product: Product;
  quantity: number; // Quantity of the item in cart
  variant: Variant;
  variantId: string;
}

interface CartSummary {
  subtotal: number;
  totalDiscount: number;
  totalItems: number;
}

interface CartData {
  success: boolean;
  data: CartItem[];
  summary: CartSummary;
  count: number;
  message: string;
  guestToken?: string;
}

interface CheckoutClientProps {
  cartData: CartData;
  mode?: "cart" | "direct";
}

export default function CheckoutClient({
  cartData,
  mode = "cart",
}: CheckoutClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (address: AddressFormData) => {
    setIsProcessing(true);

    try {
      // Step 1: Create backend order with PENDING payment status
      const orderData = {
        items: cartData.data.map((item) => ({
          productId: item.product.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.variant.price,
        })),
        total: cartData.summary.subtotal,
        payment: {
          gateway: "PHONEPE",
          method: "OTHER",
          status: "PENDING", // Order created but payment not yet processed
          amount: cartData.summary.subtotal,
          currency: "INR",
        },
        shippingAddress: address,
        fromCart: mode === "cart",
      };

      console.log("📦 Creating backend order first...", orderData);

      // Create order in backend BEFORE opening PhonePe
      const backendOrderResult = await createOrder(orderData);

      if (!backendOrderResult.success || !backendOrderResult.data) {
        toast.error(backendOrderResult.message || "Failed to create order");
        setIsProcessing(false);
        return;
      }

      console.log("✅ Backend order created successfully", backendOrderResult);

      // Extract Order ID
      // Backend response: { success: true, data: { orderId: "...", ... }, ... }
      // backendOrderResult.data is the full backend response
      console.log("Debug Extraction:");
      console.log("backendOrderResult.data:", backendOrderResult.data);
      console.log(
        "backendOrderResult.data.data:",
        backendOrderResult.data?.data
      );
      console.log(
        "backendOrderResult.data.data.orderId:",
        backendOrderResult.data?.data?.orderId
      );

      const orderId =
        backendOrderResult.data?.data?.orderId ||
        backendOrderResult.data?.data?.id ||
        backendOrderResult.data?.id;

      if (!orderId) {
        console.error(
          "Could not extract order ID from result:",
          JSON.stringify(backendOrderResult, null, 2)
        );
        toast.error("Failed to retrieve order ID");
        setIsProcessing(false);
        return;
      }

      // Step 2: Initiate PhonePe payment
      const mobileNumber = address.phone || "9999999999"; // Fallback if not provided
      const phonePeResult = await initiatePhonePePayment(
        cartData.summary.subtotal,
        orderId,
        mobileNumber
      );

      if (!phonePeResult.success || !phonePeResult.redirectUrl) {
        toast.error(phonePeResult.error || "Failed to initiate payment");
        setIsProcessing(false);
        return;
      }

      // Step 3: Redirect to PhonePe
      console.log("Redirecting to PhonePe:", phonePeResult.redirectUrl);
      window.location.href = phonePeResult.redirectUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>
            {cartData.data.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.product.image[0] || "/placeholder.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.variant.displayName}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-semibold text-gray-900">
                      ₹{item.lineTotal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartData.summary.totalItems} items)</span>
                <span>₹{cartData.summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">
                  -₹{cartData.summary.totalDiscount}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                <span>Total Amount</span>
                <span>₹{cartData.summary.subtotal}</span>
              </div>
            </div>

            <ShippingAddressDialog onConfirm={handlePayment}>
              <button
                disabled={isProcessing}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Pay with PhonePe"}
              </button>
            </ShippingAddressDialog>
          </div>
        </div>
      </div>
    </>
  );
}
