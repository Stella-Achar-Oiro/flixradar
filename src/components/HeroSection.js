import React, { useState } from 'react';
import { Play, Info, Star, Calendar, Clock } from 'lucide-react';
import { IMG_BASE_URL } from '../utils/constants';
import { useWatchlist } from '../context/WatchlistContext';

const HeroSection = ({ movie, onDetailsClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) return null;

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;
  const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null;
  const inWatchlist = isInWatchlist(movie.id);

  const formatYear = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl animate-fadeIn">
      {/* Background Image */}
      {backdropUrl && (
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="skeleton w-full h-full"></div>
          )}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container pb-8">
          <div className="max-w-2xl">
            {/* Media Type Badge */}
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-blue-500/80 backdrop-blur-sm rounded-full">
              <span className="text-xs font-semibold text-white uppercase tracking-wide">
                {movie.media_type === 'tv' ? 'TV Series' : 'Movie'} • Trending
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 line-clamp-2">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
              {releaseDate && (
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span className="text-sm">{formatYear(releaseDate)}</span>
                </div>
              )}
              
              {rating && (
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={16} fill="currentColor" />
                  <span className={`text-sm font-semibold ${getRatingColor(rating)}`}>
                    {rating}
                  </span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span className="text-sm">{movie.runtime} min</span>
                </div>
              )}
            </div>

            {/* Overview */}
            {movie.overview && (
              <p className="text-gray-200 text-lg mb-8 line-clamp-3 max-w-xl">
                {movie.overview}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onDetailsClick && onDetailsClick(movie)}
                className="btn btn-primary flex items-center space-x-2 px-6 py-3"
              >
                <Play size={20} fill="currentColor" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={() => onDetailsClick && onDetailsClick(movie)}
                className="btn btn-secondary flex items-center space-x-2 px-6 py-3"
              >
                <Info size={20} />
                <span>More Info</span>
              </button>

              <button
                onClick={handleWatchlistClick}
                className={`btn flex items-center space-x-2 px-6 py-3 ${
                  inWatchlist 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'btn-ghost'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${inWatchlist ? 'fill-current' : ''}`}
                  fill={inWatchlist ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Gradient for better text readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;