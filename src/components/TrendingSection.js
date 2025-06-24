import React, { useState } from 'react';
import { TrendingUp, Film, Tv, Calendar } from 'lucide-react';
import MediaCard from './MediaCard';
import LoadingSkeleton from './LoadingSkeleton';

const TrendingSection = ({ trending, isLoading, onMediaClick, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeWindow, setTimeWindow] = useState('week');

  const filters = [
    { id: 'all', label: 'All', icon: TrendingUp },
    { id: 'movie', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
  ];

  const timeFilters = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId, timeWindow);
    }
  };

  const handleTimeChange = (time) => {
    setTimeWindow(time);
    if (onFilterChange) {
      onFilterChange(activeFilter, time);
    }
  };

  const filteredTrending = trending.filter(item => {
    if (activeFilter === 'all') return true;
    return item.media_type === activeFilter;
  });

  if (isLoading) {
    return (
      <section className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="skeleton h-8 w-48 rounded"></div>
          <div className="skeleton h-10 w-32 rounded-full"></div>
        </div>
        <div className="grid-responsive">
          {Array.from({ length: 12 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8 animate-slideUp">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Trending {timeWindow === 'day' ? 'Today' : 'This Week'}
            </h2>
            <p className="text-gray-400">
              {filteredTrending.length} {activeFilter === 'all' ? 'titles' : activeFilter === 'movie' ? 'movies' : 'shows'} trending now
            </p>
          </div>
        </div>

        {/* Time Window Toggle */}
        <div className="hidden md:flex bg-white/10 rounded-full p-1 backdrop-blur-sm">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleTimeChange(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                timeWindow === filter.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const count = trending.filter(item => 
            filter.id === 'all' ? true : item.media_type === filter.id
          ).length;

          return (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Icon size={16} />
              <span>{filter.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.id 
                  ? 'bg-white/20' 
                  : 'bg-white/10'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Time Filter */}
      <div className="md:hidden mb-6">
        <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-sm">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleTimeChange(filter.id)}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                timeWindow === filter.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {filteredTrending.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            No {activeFilter === 'all' ? 'content' : activeFilter === 'movie' ? 'movies' : 'shows'} trending
          </h3>
          <p className="text-gray-400">
            Try selecting a different filter or check back later.
          </p>
        </div>
      ) : (
        <div className="grid-responsive">
          {filteredTrending.map((media, index) => (
            <MediaCard
              key={`${media.id}-${index}`}
              media={media}
              onClick={onMediaClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingSection;