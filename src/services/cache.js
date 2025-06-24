import { CACHE_DURATION } from '../utils/constants';

// Cache management
const cache = new Map();

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const clearCache = () => {
  cache.clear();
};
