import React from 'react';
import { Star, Clock, Check, Plus } from 'lucide-react';
import { IMG_BASE_URL } from '../utils/constants';

function MediaCard({ item, viewMode, darkMode, isInWatchlist, isWatched, onSelect, onToggleWatchlist, onToggleWatched }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onSelect}
        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-white hover:bg-gray-50'
        } shadow-md hover:shadow-lg`}
      >
        <img
          src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : '/placeholder.jpg'}
          alt={title}
          className="w-16 h-24 object-cover rounded-md shadow-sm"
          loading="lazy"
        />
        <div className="flex-1 ml-4">
          <h3 className={`font-semibold text-lg ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {year} • {item.media_type?.toUpperCase() || 'MOVIE'}
          </p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {rating}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => handleActionClick(e, onToggleWatchlist)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isInWatchlist
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {isInWatchlist ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onSelect}
      className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      {/* Image Container */}
      <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
        <img
          src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : '/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Title */}
          <h3 className="font-semibold text-white transform translate-y-2 
                         group-hover:translate-y-0 transition-transform duration-300 mb-2">
            {title}
          </h3>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-300 mb-3 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <span>{year}</span>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-500 mr-1" />
              <span>{rating}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 delay-100">
            <button
              onClick={(e) => handleActionClick(e, onToggleWatchlist)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110 ${
                isInWatchlist
                  ? 'bg-blue-500/80 text-white hover:bg-blue-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isInWatchlist ? <Check size={16} /> : <Plus size={16} />}
            </button>
            <button
              onClick={(e) => handleActionClick(e, onToggleWatched)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110 ${
                isWatched
                  ? 'bg-green-500/80 text-white hover:bg-green-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Clock size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Indicators */}
      {(isInWatchlist || isWatched) && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {isInWatchlist && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          {isWatched && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaCard;
