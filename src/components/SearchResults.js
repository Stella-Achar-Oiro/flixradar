import React from 'react';
import MediaCard from './MediaCard';
import LoadingSkeleton from './LoadingSkeleton';

const SearchResults = ({ results, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="search-results">
        <div className="results-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results error">
        <p>Error loading results: {error.message}</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="search-results empty">
        <p>No results found. Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-grid">
        {results.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;