import React from 'react';

const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`media-card animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="media-card-image">
        <div className="skeleton w-full h-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Title Skeleton */}
        <div className="skeleton h-4 w-3/4 rounded"></div>
        
        {/* Details Skeleton */}
        <div className="flex items-center justify-between">
          <div className="skeleton h-3 w-12 rounded"></div>
          <div className="flex items-center space-x-1">
            <div className="skeleton h-3 w-3 rounded-full"></div>
            <div className="skeleton h-3 w-6 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid of Loading Skeletons
export const LoadingGrid = ({ count = 12 }) => {
  return (
    <div className="grid-responsive">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
};

// Inline Loading Skeleton for lists
export const InlineLoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-3 p-4 animate-pulse">
      <div className="skeleton w-16 h-16 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded"></div>
        <div className="skeleton h-3 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

// Hero Section Loading
export const HeroLoadingSkeleton = () => {
  return (
    <div className="relative h-96 overflow-hidden rounded-xl animate-pulse">
      <div className="skeleton w-full h-full"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-8 left-8 space-y-4">
        <div className="skeleton h-8 w-64 rounded"></div>
        <div className="skeleton h-4 w-96 rounded"></div>
        <div className="flex space-x-3">
          <div className="skeleton h-10 w-24 rounded-lg"></div>
          <div className="skeleton h-10 w-24 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;