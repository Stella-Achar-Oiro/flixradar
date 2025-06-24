import React, { useState } from 'react';
import MediaCard from './MediaCard';
import LoadingSkeleton from './LoadingSkeleton';
import DetailModal from './DetailModal';
import { Search, Frown, TrendingUp } from 'lucide-react';

const SearchResults = ({ results, isLoading, error, searchQuery }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleCardClick = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="grid-responsive">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <Frown className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-400 mb-4">
            {error.message || 'Failed to load results. Please try again.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state when no search has been made
  if (!searchQuery && (!results || results.length === 0)) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
              <Search className="text-white" size={32} />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-ping opacity-20"></div>
          </div>
          
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Discover Amazing Movies & TV Shows
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Search for your favorite movies and TV shows, discover new content, and build your personal watchlist.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <TrendingUp size={16} className="text-blue-400" />
              <span className="text-sm text-gray-300">Trending Now</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Search size={16} className="text-purple-400" />
              <span className="text-sm text-gray-300">Advanced Search</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Start typing in the search bar above to begin exploring!
          </p>
        </div>
      </div>
    );
  }

  // Show no results for search query
  if (searchQuery && (!results || results.length === 0)) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-400 mb-4">
            We couldn't find anything matching "<span className="text-blue-400 font-medium">{searchQuery}</span>"
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Try adjusting your search:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Check your spelling</li>
              <li>Use different keywords</li>
              <li>Try more general terms</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Show results
  return (
    <div className="container py-8">
      {/* Results Header */}
      {searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Search Results
          </h2>
          <p className="text-gray-400">
            Found <span className="text-blue-400 font-semibold">{results.length}</span> results for "
            <span className="text-white font-medium">{searchQuery}</span>"
          </p>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid-responsive">
        {results.map((media, index) => (
          <MediaCard
            key={`${media.id}-${index}`}
            media={media}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMedia && (
        <DetailModal
          media={selectedMedia}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SearchResults;