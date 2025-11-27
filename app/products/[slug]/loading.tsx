export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image Skeleton */}
        <div className="h-[50vh] lg:h-screen bg-gray-200" />

        {/* Right Side - Details Skeleton */}
        <div className="px-6 py-8 sm:px-12 sm:py-12 lg:px-16 space-y-6">
          {/* Title */}
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          
          {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          {/* Variants */}
          <div className="flex gap-3">
            <div className="h-12 w-24 bg-gray-200 rounded" />
            <div className="h-12 w-24 bg-gray-200 rounded" />
          </div>

          {/* Add to Cart Button */}
          <div className="h-14 bg-gray-200 rounded w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
