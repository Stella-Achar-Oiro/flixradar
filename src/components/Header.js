import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Grid, List, Moon, Sun, X } from 'lucide-react';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  darkMode, 
  onDarkModeToggle,
  activeSection,
  onSectionChange
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Search for your next favorite movie...",
    "Discover trending shows and films...",
    "Find top-rated movies and series...",
    "Explore the latest blockbusters...",
    "Search for hidden gems..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with gradient text and icon */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                FlixRadar
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Discover • Watch • Rate</p>
            </div>
          </div>
          
          {/* Navigation with hover effects */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onSectionChange('trending')}
              className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                activeSection === 'trending' ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              <TrendingUp size={20} className="text-orange-400" />
              <span className="font-medium">Trending</span>
            </button>
            <button 
              onClick={() => onSectionChange('top-rated')}
              className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                activeSection === 'top-rated' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">Top Rated</span>
            </button>
            <button 
              onClick={() => onSectionChange('watchlist')}
              className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                activeSection === 'watchlist' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
              }`}
            >
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Watchlist</span>
            </button>
          </nav>
          
          {/* Search bar with glass morphism */}
          <div className="relative group">
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                isSearchFocused ? 'text-blue-400 scale-110' : 'text-gray-400'
              }`} 
              size={20} 
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={placeholders[placeholderIndex]}
              className={`pl-10 pr-4 py-3 rounded-full bg-gray-700/60 backdrop-blur-md text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:bg-gray-700/80 transition-all duration-300 shadow-lg border border-gray-600/30 ${
                isSearchFocused ? 'w-[28rem] shadow-2xl ring-blue-400/50' : 'w-80'
              }`}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="relative p-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 hover:text-white hover:from-gray-600 hover:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="relative">
                {darkMode ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-blue-300" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;