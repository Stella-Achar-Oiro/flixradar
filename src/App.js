import React, { useState, useEffect } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import MediaCard from './components/MediaCard';
import DetailModal from './components/DetailModal';
import Filters from './components/Filters';
import LoadingSkeleton from './components/LoadingSkeleton';
import Toast from './components/Toast';
import './App.css';

const FlixRadar = () => {
  // State management
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewMode, setViewMode] = useLocalStorage('viewMode', 'grid');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [watched, setWatched] = useLocalStorage('watched', []);
  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState('trending');
  
  // Filter states
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (debouncedSearchQuery.trim()) {
          url = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(debouncedSearchQuery)}`;
        } else {
          url = `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
        showToast('Failed to fetch movies', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [debouncedSearchQuery]);

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    // Genre filter
    if (selectedGenres.length > 0) {
      const movieGenres = movie.genre_ids || [];
      if (!selectedGenres.some(genreId => movieGenres.includes(genreId))) {
        return false;
      }
    }
    
    // Year filter
    if (selectedYear) {
      const movieYear = new Date(movie.release_date || movie.first_air_date).getFullYear();
      if (movieYear !== selectedYear) {
        return false;
      }
    }
    
    // Rating filter
    if (selectedRating) {
      if (movie.vote_average < selectedRating) {
        return false;
      }
    }
    
    return true;
  });

  // Event handlers
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleToggleWatchlist = (movieId) => {
    const isInWatchlist = watchlist.includes(movieId);
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(id => id !== movieId));
      showToast('Removed from watchlist', 'info');
    } else {
      setWatchlist([...watchlist, movieId]);
      showToast('Added to watchlist', 'success');
    }
  };

  const handleToggleWatched = (movieId) => {
    const isWatched = watched.includes(movieId);
    if (isWatched) {
      setWatched(watched.filter(id => id !== movieId));
      showToast('Marked as unwatched', 'info');
    } else {
      setWatched([...watched, movieId]);
      showToast('Marked as watched', 'success');
    }
  };

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedYear(null);
    setSelectedRating(null);
    showToast('Filters cleared', 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Filters
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          onClearFilters={handleClearFilters}
          darkMode={darkMode}
        />
        
        {/* Content */}
        {loading ? (
          <LoadingSkeleton viewMode={viewMode} darkMode={darkMode} />
        ) : error ? (
          <div className={`text-center py-12 ${
            darkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            <p className="text-lg font-medium">Oops! Something went wrong</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p className="text-lg font-medium">No movies found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'
            : 'space-y-4'
          }>
            {filteredMovies.map((movie) => (
              <MediaCard
                key={movie.id}
                item={movie}
                viewMode={viewMode}
                darkMode={darkMode}
                isInWatchlist={watchlist.includes(movie.id)}
                isWatched={watched.includes(movie.id)}
                onSelect={() => handleMovieSelect(movie)}
                onToggleWatchlist={() => handleToggleWatchlist(movie.id)}
                onToggleWatched={() => handleToggleWatched(movie.id)}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Detail Modal */}
      {selectedMovie && (
        <DetailModal
          item={selectedMovie}
          darkMode={darkMode}
          isInWatchlist={watchlist.includes(selectedMovie.id)}
          isWatched={watched.includes(selectedMovie.id)}
          onClose={handleCloseModal}
          onToggleWatchlist={() => handleToggleWatchlist(selectedMovie.id)}
          onToggleWatched={() => handleToggleWatched(selectedMovie.id)}
        />
      )}
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default FlixRadar;