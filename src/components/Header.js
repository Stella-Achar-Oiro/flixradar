import React, { useState } from 'react';
import { Search, TrendingUp, Grid, List, Moon, Sun } from 'lucide-react';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  darkMode, 
  onDarkModeToggle 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold gradient-text">
            FlixRadar
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 transition-colors duration-200">
              <TrendingUp size={20} />
              <span>Trending</span>
            </button>
          </nav>
          
          {/* Search Bar */}
          <div className="relative group">
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} 
              size={20} 
            />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search movies & TV shows..."
              className={`pl-10 pr-4 py-2 rounded-full bg-gray-700/50 backdrop-blur text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:bg-gray-700 transition-all duration-200 transform-gpu ${
                isSearchFocused ? 'w-80 shadow-lg' : 'w-64'
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
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
