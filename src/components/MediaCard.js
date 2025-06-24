import React, { useState } from 'react';
import { Star, Clock, Play, Heart, Calendar, Zap } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { IMG_BASE_URL } from '../utils/constants';

const MediaCard = ({ media, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const inWatchlist = isInWatchlist(media.id);
  const title = media.title || media.name;
  const releaseDate = media.release_date || media.first_air_date;
  const mediaType = media.media_type || (media.title ? 'movie' : 'tv');
  const rating = media.vote_average ? Math.round(media.vote_average * 10) / 10 : null;

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(media.id);
    } else {
      addToWatchlist({ ...media, media_type: mediaType });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const posterUrl = media.poster_path 
    ? `${IMG_BASE_URL}${media.poster_path}`
    : null;

  const formatYear = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div 
      className="media-card animate-fadeIn group"
      onClick={() => onClick && onClick(media)}
    >
      {/* Image Container */}
      <div className="media-card-image">
        {!imageLoaded && (
          <div className="skeleton w-full h-full flex items-center justify-center">
            <Zap className="text-gray-600" size={24} />
          </div>
        )}
        
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : imageLoaded && (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <div className="text-center p-4">
              <Zap className="text-gray-500 mx-auto mb-2" size={32} />
              <p className="text-gray-400 text-sm font-medium">{title}</p>
            </div>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
          <span className="text-xs font-semibold text-white uppercase tracking-wide">
            {mediaType === 'tv' ? 'TV' : 'Movie'}
          </span>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
            <Star className="text-yellow-400" size={12} fill="currentColor" />
            <span className={`text-xs font-bold ${getRatingColor(rating)}`}>
              {rating}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="media-card-overlay">
          <div className="media-card-content">
            {/* Title */}
            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
              {title}
            </h3>

            {/* Release Year */}
            {releaseDate && (
              <div className="flex items-center text-gray-300 text-xs mb-3">
                <Calendar size={12} className="mr-1" />
                <span>{formatYear(releaseDate)}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Watchlist Button */}
              <button
                onClick={handleWatchlistClick}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110 ${
                  inWatchlist 
                    ? 'bg-red-500/80 text-white hover:bg-red-600/80' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <Heart 
                  size={16} 
                  className={inWatchlist ? 'fill-current' : ''} 
                />
              </button>

              {/* Quick Play Button */}
              <button
                className="p-2 rounded-full bg-blue-500/80 text-white backdrop-blur-sm hover:bg-blue-600/80 transition-all duration-200 transform hover:scale-110"
                aria-label="Quick preview"
              >
                <Play size={16} fill="currentColor" />
              </button>

              {/* Watch Later Button */}
              <button
                className="p-2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                aria-label="Watch later"
              >
                <Clock size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer (Always Visible) */}
      <div className="p-3">
        <h4 className="font-semibold text-sm text-white truncate mb-1">
          {title}
        </h4>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatYear(releaseDate)}</span>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400" size={10} fill="currentColor" />
              <span className={getRatingColor(rating)}>{rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;