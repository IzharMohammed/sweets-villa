"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyAndCompleteOrder } from "@/actions/phonepe";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      setMessage("Invalid order ID");
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyAndCompleteOrder(orderId);
        if (result.success) {
          setStatus("success");
          setMessage("Payment successful! Your order has been placed.");
        } else {
          setStatus("failed");
          setMessage(
            result.message || "Payment failed or could not be verified."
          );
        }
      } catch (error) {
        setStatus("failed");
        setMessage("An error occurred while verifying payment.");
      }
    };

    verify();
  }, [orderId]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      {status === "loading" && (
        <>
          <Loader2 className="h-16 w-16 text-amber-600 animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Processing Payment
          </h1>
          <p className="text-gray-600">{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">{message}</p>
          <div className="flex gap-4">
            <Link
              href="/orders"
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      {status === "failed" && (
        <>
          <XCircle className="h-16 w-16 text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">{message}</p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/checkout")}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
