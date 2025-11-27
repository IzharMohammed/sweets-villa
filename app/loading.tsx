import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[60vh] w-full bg-amber-100/50 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-amber-200/50 rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {[1, 2].map((section) => (
            <div key={section} className="space-y-6">
              {/* Section Header */}
              <Skeleton className="h-8 w-48 bg-amber-200/50" />
              
              {/* Product Row */}
              <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex-none w-[200px] sm:w-[260px] space-y-3">
                    <Skeleton className="aspect-[4/5] rounded-xl bg-amber-100" />
                    <Skeleton className="h-5 w-3/4 bg-amber-100" />
                    <Skeleton className="h-4 w-1/2 bg-amber-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
