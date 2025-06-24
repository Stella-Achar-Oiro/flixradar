import { TMDB_API_KEY, OMDB_API_KEY, TMDB_BASE_URL, OMDB_BASE_URL, IMG_BASE_URL } from '../utils/constants';
import { getCachedData, setCachedData } from './cache';

// API service

export const tmdbApi = {
  searchMulti: async (query) => {
    const url = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
    return fetchWithCache(url);
  },
  
  getTrending: async (mediaType = 'all', timeWindow = 'week') => {
    const url = `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_API_KEY}`;
    return fetchWithCache(url);
  },
  
  getDetails: async (mediaType, id) => {
    const url = `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
    return fetchWithCache(url);
  },
  
  getRecommendations: async (mediaType, id) => {
    const url = `${TMDB_BASE_URL}/${mediaType}/${id}/recommendations?api_key=${TMDB_API_KEY}`;
    return fetchWithCache(url);
  },
  
  getWatchProviders: async (mediaType, id) => {
    const url = `${TMDB_BASE_URL}/${mediaType}/${id}/watch/providers?api_key=${TMDB_API_KEY}`;
    return fetchWithCache(url);
  }
};

export const omdbApi = {
  getByImdbId: async (imdbId) => {
    const url = `${OMDB_BASE_URL}/?i=${imdbId}&apikey=${OMDB_API_KEY}`;
    return fetchWithCache(url);
  }
};

async function fetchWithCache(url) {
  const cached = getCachedData(url);
  if (cached) return cached;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    setCachedData(url, data);
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export { TMDB_API_KEY, OMDB_API_KEY, TMDB_BASE_URL, OMDB_BASE_URL, IMG_BASE_URL };
