import { Skeleton } from "@/components/ui/skeleton";
import BottomNav from "@/components/bottom-nav";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <section className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title Skeleton */}
          <div className="flex justify-center mb-6">
            <Skeleton className="h-10 w-48" />
          </div>

          {/* Vertical Products Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 shadow-sm border border-transparent"
              >
                {/* Image Container Skeleton */}
                <Skeleton className="w-full aspect-square rounded-xl mb-3" />

                {/* Product Info Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />

                  {/* Price Skeleton */}
                  <div className="flex items-center gap-2 pt-1">
                    <Skeleton className="h-6 w-16" />
                  </div>

                  {/* Add to Cart Button Skeleton */}
                  <Skeleton className="h-9 w-full rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </section>
    </div>
  );
}
