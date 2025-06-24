import { useState, useEffect } from 'react';
import { searchMovies, searchTVShows } from '../services/api';

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query, type = 'all') => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let searchResults = [];

      if (type === 'all' || type === 'movie') {
        const movieResults = await searchMovies(query);
        searchResults = [...searchResults, ...movieResults];
      }

      if (type === 'all' || type === 'tv') {
        const tvResults = await searchTVShows(query);
        searchResults = [...searchResults, ...tvResults];
      }

      // Sort by popularity
      searchResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

      setResults(searchResults);
    } catch (err) {
      setError(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    search
  };
};

export default useSearch;