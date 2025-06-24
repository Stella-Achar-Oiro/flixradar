import React from 'react';
import { Filter, X } from 'lucide-react';

const Filters = ({ 
  selectedGenres, 
  onGenreToggle, 
  selectedYear, 
  onYearChange, 
  selectedRating, 
  onRatingChange,
  onClearFilters,
  darkMode 
}) => {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const ratings = [7.0, 7.5, 8.0, 8.5, 9.0];

  const hasActiveFilters = selectedGenres.length > 0 || selectedYear || selectedRating;

  return (
    <div className={`p-4 rounded-lg shadow-md mb-6 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <h3 className={`font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Filters
          </h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 px-3 py-1 text-sm rounded-full 
                       bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          >
            <X size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      {/* Genre Pills */}
      <div className="mb-4">
        <h4 className={`text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Genres
        </h4>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id);
            return (
              <button
                key={genre.id}
                onClick={() => onGenreToggle(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-lg'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Year and Rating Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Year Filter */}
        <div>
          <h4 className={`text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Release Year
          </h4>
          <select
            value={selectedYear || ''}
            onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Any Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        {/* Rating Filter */}
        <div>
          <h4 className={`text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Minimum Rating
          </h4>
          <select
            value={selectedRating || ''}
            onChange={(e) => onRatingChange(e.target.value ? parseFloat(e.target.value) : null)}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Any Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ Stars
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
