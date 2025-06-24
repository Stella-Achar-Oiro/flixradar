import React, { useEffect } from 'react';
import { X, Star, Clock, Check, Plus, Calendar, Film } from 'lucide-react';
import { IMG_BASE_URL } from '../utils/constants';

function DetailModal({ item, darkMode, isInWatchlist, isWatched, onClose, onToggleWatchlist, onToggleWatched }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const runtime = item.runtime || item.episode_run_time?.[0] || 'N/A';

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                    bg-black/80 backdrop-blur-sm animate-fadeIn"
         onClick={onClose}>
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg 
                   bg-gray-800 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Section */}
        <div className="relative">
          {/* Backdrop Image */}
          {item.backdrop_path && (
            <img
              src={`${IMG_BASE_URL}${item.backdrop_path}`}
              alt={title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white 
                       hover:bg-black/70 backdrop-blur-sm transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 -mt-32 relative">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : '/placeholder.jpg'}
                alt={title}
                className="w-48 h-72 object-cover rounded-lg shadow-2xl ring-4 ring-gray-700/50"
              />
            </div>
            
            {/* Details */}
            <div className="flex-1">
              {/* Title and Year */}
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <p className="text-gray-400 text-lg mb-4">{year}</p>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={onToggleWatchlist}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                             transform hover:scale-105 transition-all duration-200 ${
                    isInWatchlist
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                  <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                </button>
                
                <button
                  onClick={onToggleWatched}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                             transform hover:scale-105 transition-all duration-200 ${
                    isWatched
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                  }`}
                >
                  <Clock size={20} />
                  <span>{isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}</span>
                </button>
              </div>
              
              {/* Rating Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gray-700/50 backdrop-blur 
                               hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="text-sm text-gray-400">TMDB Rating</div>
                  <div className="flex items-center mt-1">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span className="font-semibold text-white">{rating}</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-gray-700/50 backdrop-blur 
                               hover:bg-gray-700 transition-colors">
                  <div className="text-sm text-gray-400">Runtime</div>
                  <div className="flex items-center mt-1">
                    <Clock size={16} className="text-blue-500 mr-1" />
                    <span className="font-semibold text-white">{runtime} min</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-gray-700/50 backdrop-blur 
                               hover:bg-gray-700 transition-colors">
                  <div className="text-sm text-gray-400">Release Date</div>
                  <div className="flex items-center mt-1">
                    <Calendar size={16} className="text-purple-500 mr-1" />
                    <span className="font-semibold text-white text-sm">{formatDate(date)}</span>
                  </div>
                </div>
              </div>
              
              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.overview || 'No overview available.'}
                </p>
              </div>
              
              {/* Genres */}
              {item.genres && item.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 
                                   text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Media Type */}
              <div className="flex items-center text-gray-400">
                <Film size={16} className="mr-2" />
                <span className="text-sm">
                  {item.media_type?.toUpperCase() || (item.title ? 'MOVIE' : 'TV SHOW')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
