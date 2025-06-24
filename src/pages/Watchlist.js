import React, { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MediaCard from '../components/MediaCard';

const Watchlist = () => {
  const { watchlist, clearWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState('addedAt');

  const exportWatchlist = (format) => {
    const data = watchlist.map(item => ({
      title: item.title || item.name,
      year: item.release_date ? new Date(item.release_date).getFullYear() : 
            item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A',
      type: item.media_type || (item.title ? 'movie' : 'tv'),
      rating: item.vote_average || 'N/A',
      addedAt: item.addedAt
    }));

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flixradar-watchlist.json';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = ['Title', 'Year', 'Type', 'Rating', 'Added Date'];
      const csvContent = [
        headers.join(','),
        ...data.map(item => [
          `"${item.title}"`,
          item.year,
          item.type,
          item.rating,
          new Date(item.addedAt).toLocaleDateString()
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flixradar-watchlist.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    switch (sortBy) {
      case 'addedAt':
        return new Date(b.addedAt) - new Date(a.addedAt);
      case 'title':
        return (a.title || a.name).localeCompare(b.title || b.name);
      case 'rating':
        return (b.vote_average || 0) - (a.vote_average || 0);
      default:
        return 0;
    }
  });

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-page">
        <h1>My Watchlist</h1>
        <div className="empty-watchlist">
          <p>Your watchlist is empty.</p>
          <p>Start adding movies and TV shows to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h1>My Watchlist ({watchlist.length} items)</h1>
        
        <div className="watchlist-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="addedAt">Sort by Date Added</option>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <div className="export-buttons">
            <button onClick={() => exportWatchlist('json')}>Export JSON</button>
            <button onClick={() => exportWatchlist('csv')}>Export CSV</button>
          </div>

          <button 
            onClick={clearWatchlist}
            className="clear-button"
            onClick={(e) => {
              if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
                clearWatchlist();
              }
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="watchlist-grid">
        {sortedWatchlist.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;