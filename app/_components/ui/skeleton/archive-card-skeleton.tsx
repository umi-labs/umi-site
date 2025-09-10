import React from 'react';

interface ArchiveCardSkeletonProps {
  isFeatured?: boolean;
}

export default function ArchiveCardSkeleton({ isFeatured = false }: ArchiveCardSkeletonProps) {
  if (isFeatured) {
    return (
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <div className="relative h-64 md:h-80 xl:h-96 bg-gray-200 rounded-lg animate-pulse overflow-hidden">
          {/* Image skeleton */}
          <div className="absolute inset-0 bg-gray-300"></div>
          
          {/* Content overlay skeleton */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Text content skeleton */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <div className="h-6 bg-white/20 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/20 rounded-full w-16 animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded-full w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 bg-gray-200 rounded-lg animate-pulse overflow-hidden">
      {/* Image skeleton */}
      <div className="h-3/4 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="h-1/4 p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-300 rounded-full w-12 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ArchiveGridSkeleton({ count = 6, hasFeatured = false }: { count?: number; hasFeatured?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 w-full">
      {hasFeatured && <ArchiveCardSkeleton isFeatured={true} />}
      {Array.from({ length: hasFeatured ? count - 1 : count }).map((_, i) => (
        <ArchiveCardSkeleton key={i} />
      ))}
    </div>
  );
}
