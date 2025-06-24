import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WatchlistContext = createContext();

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      if (state.find(item => item.id === action.payload.id)) {
        return state; // Item already exists
      }
      return [...state, { ...action.payload, addedAt: new Date().toISOString() }];
    
    case 'REMOVE_FROM_WATCHLIST':
      return state.filter(item => item.id !== action.payload);
    
    case 'CLEAR_WATCHLIST':
      return [];
    
    case 'LOAD_WATCHLIST':
      return action.payload || [];
    
    default:
      return state;
  }
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, dispatch] = useReducer(watchlistReducer, []);
  const [storedWatchlist, setStoredWatchlist] = useLocalStorage('flixradar-watchlist', []);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'LOAD_WATCHLIST', payload: storedWatchlist });
  }, [storedWatchlist]);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    setStoredWatchlist(watchlist);
  }, [watchlist, setStoredWatchlist]);

  const addToWatchlist = (item) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: item });
  };

  const removeFromWatchlist = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: itemId });
  };

  const clearWatchlist = () => {
    dispatch({ type: 'CLEAR_WATCHLIST' });
  };

  const isInWatchlist = (itemId) => {
    return watchlist.some(item => item.id === itemId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
    isInWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export default WatchlistContext;