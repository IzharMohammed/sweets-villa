import { Skeleton } from "@/components/ui/skeleton";
import BottomNav from "@/components/bottom-nav";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Skeleton */}
        <div className="mb-6 lg:mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items Skeleton - Left Side */}
          <div className="lg:col-span-2 space-y-4 mb-24 lg:mb-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                <div className="flex gap-4">
                  {/* Product Image Skeleton */}
                  <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0" />

                  {/* Product Details Skeleton */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                      <Skeleton className="h-6 w-6 rounded" />
                    </div>

                    {/* Price and Quantity Controls Skeleton */}
                    <div className="flex items-center justify-between mt-3">
                      <Skeleton className="h-8 w-24 rounded-lg" />
                      <div className="text-right">
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-24">
              <Skeleton className="h-7 w-40 mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-xl mb-3" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
