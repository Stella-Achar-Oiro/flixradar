import React from 'react';

const LoadingSkeleton = ({ viewMode = 'grid', count = 20, darkMode = true }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className={`flex items-center p-4 rounded-lg animate-pulse ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`}
          >
            <div className={`w-16 h-24 rounded-md ${
              darkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
            <div className="flex-1 ml-4 space-y-2">
              <div className={`h-4 rounded w-3/4 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
              <div className={`h-3 rounded w-1/2 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
              <div className={`h-3 rounded w-1/4 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className={`aspect-[2/3] rounded-lg mb-2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-4 rounded w-3/4 mb-2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-3 rounded w-1/2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;