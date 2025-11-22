"use client";
import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/actions/razorpay";
import { createOrder } from "@/actions/order";
import { toast } from "sonner";
import Image from "next/image";
import { ShippingAddressDialog, AddressFormData } from "./shipping-address-dialog";

declare global {
  interface Window {
    Razorpay: any;
  }
}

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

export default function CheckoutClient({ cartData }: { cartData: CartData }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

//   console.log(cartData);

//   const handlePayment = async (address: AddressFormData) => {
//     setIsProcessing(true);

//     try {
//       // 1. Create Order
//       const { success, order, error } = await createRazorpayOrder(
//         cartData.summary.subtotal
//       );

//       if (!success || !order) {
//         toast.error(error || "Failed to create payment order");
//         setIsProcessing(false);
//         return;
//       }

//       // 2. Initialize Razorpay
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Sweets Villa",
//         description: "Payment for your order",
//         order_id: order.id,
//         handler: async function (response: any) {
//           // 3. Verify Payment
//           const verification = await verifyRazorpayPayment(
//             response.razorpay_order_id,
//             response.razorpay_payment_id,
//             response.razorpay_signature
//           );

//           if (verification.success) {
//             // 4. Create Order in Backend
//             const orderData = {
//               items: cartData.data.map((item) => ({
//                 productId: item.product.id,
//                 variantId: item.variantId,
//                 quantity: item.quantity,
//                 price: item.variant.price,
//               })),
//               totalAmount: cartData.summary.subtotal,
//               paymentId: response.razorpay_payment_id,
//               paymentMethod: "RAZORPAY",
//               shippingAddress: address,
//             };

//             const result = await createOrder(orderData);

//             if (result.success) {
//               toast.success("Order placed successfully!");
//               router.push("/orders");
//             } else {
//               toast.error(result.message || "Failed to place order");
//             }
//           } else {
//             toast.error("Payment verification failed");
//           }
//           setIsProcessing(false);
//         },
//         prefill: {
//           name: "Customer Name", // TODO: Get from user profile
//           email: "customer@example.com", // TODO: Get from user profile
//           contact: "9999999999", // TODO: Get from user profile
//         },
//         theme: {
//           color: "#D97706", // amber-600
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.on("payment.failed", function (response: any) {
//         toast.error(response.error.description || "Payment failed");
//         setIsProcessing(false);
//       });
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Something went wrong");
//       setIsProcessing(false);
//     }
//   };

  const handlePayment = async (address: AddressFormData) => {
    setIsProcessing(true);

     try {
            // 4. Create Order in Backend
            const orderData = {
              items: cartData.data.map((item) => ({
                productId: item.product.id,
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.variant.price,
              })),
              total: cartData.summary.subtotal,
              paymentId: "",
              paymentMethod: "RAZORPAY",
              shippingAddress: address,
            };
            console.log("orderData",orderData);
            
            const result = await createOrder(orderData);

            if (result.success) {
              toast.success("Order placed successfully!");
              router.push("/orders");
            } else {
              toast.error(result.message || "Failed to place order");
            }
          
          setIsProcessing(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="space-y-4">
             <h2 className="text-xl font-semibold mb-4">Your Items</h2>
             {cartData.data.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.variant.displayName}</p>
                    <div className="flex justify-between items-center mt-2">
                       <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                       <p className="font-semibold text-gray-900">₹{item.lineTotal}</p>
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
                <span className="text-green-600">-₹{cartData.summary.totalDiscount}</span>
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
                {isProcessing ? "Processing..." : "Pay with Razorpay"}
              </button>
            </ShippingAddressDialog>
          </div>
        </div>
      </div>
    </>
  );
}
