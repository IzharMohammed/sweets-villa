export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-screen w-full bg-slate-800/50 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-slate-700/50 rounded-lg" />
      </div>

      {/* Products Skeleton */}
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {[1, 2].map((section) => (
            <div key={section} className="space-y-8">
              {/* Section Header */}
              <div className="h-10 w-64 bg-slate-700/50 rounded" />
              
              {/* Product Row */}
              <div className="flex gap-8 overflow-hidden">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex-none w-[260px] space-y-4">
                    <div className="aspect-[4/5] bg-slate-800 rounded-sm" />
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded mx-auto" />
                    <div className="h-4 w-1/2 bg-slate-700/50 rounded mx-auto" />
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
