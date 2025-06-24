export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_KEY';
export const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY || 'YOUR_OMDB_KEY';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const OMDB_BASE_URL = 'https://www.omdbapi.com';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const GENRES = [
  { id: 'all', name: 'All Genres' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' }
];
