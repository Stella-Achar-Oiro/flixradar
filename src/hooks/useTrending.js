import { useState, useEffect } from 'react';
import { getTrending } from '../services/api';

const useTrending = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrending = async (mediaType = 'all', timeWindow = 'week') => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTrending(mediaType, timeWindow);
      const results = response.results || [];
      
      // Add media_type to each item if not present
      const processedResults = results.map(item => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
      }));
      
      setTrending(processedResults);
    } catch (err) {
      setError(err);
      setTrending([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return {
    trending,
    isLoading,
    error,
    fetchTrending,
    refetch: () => fetchTrending()
  };
};

export default useTrending;