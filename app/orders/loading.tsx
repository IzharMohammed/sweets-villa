import { Skeleton } from "@/components/ui/skeleton";
import BottomNav from "@/components/bottom-nav";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-48 mb-8" />

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-amber-100"
            >
              {/* Order Header Skeleton */}
              <div className="bg-amber-50/50 px-6 py-4 border-b border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:gap-6">
                  <div>
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Order Items Skeleton */}
              <div className="p-6">
                <div className="space-y-6">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex items-start gap-4 sm:gap-6">
                      <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address Skeleton */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-full max-w-sm mb-1" />
                  <Skeleton className="h-4 w-2/3 max-w-xs" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
