import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';

const WatchlistButton = ({ media, className = '' }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(media.id);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    if (inWatchlist) {
      removeFromWatchlist(media.id);
    } else {
      addToWatchlist(media);
    }
  };

  return (
    <button 
      className={`watchlist-button ${inWatchlist ? 'in-watchlist' : ''} ${className}`}
      onClick={handleClick}
      title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      <span className="watchlist-icon">
        {inWatchlist ? '❤️' : '🤍'}
      </span>
      <span className="watchlist-text">
        {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
      </span>
    </button>
  );
};

export default WatchlistButton;